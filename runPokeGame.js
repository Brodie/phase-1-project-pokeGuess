console.log("hi");

// arrays for performing fetch
let pokeNums = [];
let usedNums = [];
let arrayOfPokes = [];

// random number between 1 and 151
// might add variables and add dom content way to change at some point. guess more pokemon!
function rdmNum() {
  let rdm = Math.floor(Math.random() * (151 - 1 + 1) + 1);
  return rdm;
}
// generates random number to be fetched
// adds numbers to used nums array if number has not been generated yet
// if number has not been generated, is added to pokeNums array
// if number exists, recursively calls self to generate new number and try again
function generatePokeNums() {
  let newNum = rdmNum();
  if (usedNums.includes(newNum)) {
    generatePokeNums();
  } else {
    pokeNums.push(newNum);
    usedNums.push(newNum);
  }
}
// generate 5 numbers
for (let i = 0; i < 5; i++) {
  generatePokeNums();
}
// fetches array of pokeObj on load, preps the array to be iterated through to add card elements
// then addes pokeObj to arrayOfPokes
pokeNums.forEach((num) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
    .then((res) => res.json())
    .then((pokemon) => {
      let pokeObj = {};
      pokeObj.id = num;
      pokeObj.name = pokemon.name;
      pokeObj.img = pokemon.sprites.front_default;

      if (pokemon.types.length === 2) {
        pokeObj.typeOne = pokemon.types[0].type.name;
        pokeObj.typeTwo = pokemon.types[1].type.name;
      } else {
        pokeObj.typeOne = pokemon.types[0].type.name;
      }

      arrayOfPokes.push(pokeObj);
      console.log(arrayOfPokes);
    });
});
//--------------------------------------------------------------
// Code above runs on load, Code below is Interactions with page
//--------------------------------------------------------------

// button to start game
document.getElementById("btn_id").addEventListener("click", () => {
  // build pokemon card
  arrayOfPokes.forEach((pokeObj, index) => {
    let card = document.getElementById(`poke_${index + 1}`);

    let cardTitle = document.createElement("h2");
    cardTitle.textContent = `Pokemon Number ${index + 1}`;
    card.append(cardTitle);

    let pokeImg = document.createElement("img");
    pokeImg.src = pokeObj.img;
    card.append(pokeImg);

    let pokeNameFoot = document.createElement("footer");
    pokeNameFoot.textContent = pokeObj.name.toUpperCase();
    pokeNameFoot.style.visibility = "hidden";
    card.append(pokeNameFoot);

    // clear poke nums for fetching of new pokes on second round
    pokeNums.shift();
  });

  // if already pulled 150, should only pull one more
  // generate new 5 nums for next round
  if (usedNums.length === 150) {
    generatePokeNums();
  } else {
    for (let i = 0; i < 5; i++) {
      generatePokeNums();
    }
  }
});

let form = document.getElementById("pokeForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // for loop to check each guess starting with 1
  for (let i = 1; i < 6; i++) {
    // assigning needed variables for evaluations
    let guess = document.getElementById(`guess_${i}`).value.toLowerCase();
    let answer = arrayOfPokes[i - 1].name.toLowerCase();
    let typeOneGuess = document.getElementById(`guess_${i}_type1`).value;
    let typeTwoGuess = document.getElementById(`guess_${i}_type2`).value;
    let types = Object.values(arrayOfPokes[i - 1]).slice(3);

    console.log(typeOneGuess);
    console.log(typeTwoGuess);
    console.log(types);

    if (guess === answer) {
      console.log(`Correct!: ${guess}`);
    } else {
      console.log(`WRONG! Correct Answer: ${answer}`);
    }
  }
});
