console.log("hi");

// assigning values to object with id, name, pic src keys
// pushing object to arrayOfPokes
// barebones appending of poke image to dom
// ------------------------------------------------------

let pokeNums = [];
let usedNums = [];
let arrayOfPokes = [];

//need to fetch pokemon before click, then use the fetched object after being clicked to generate
// the cards. instead of clicking and loading them all

function rdmNum() {
  let rdm = Math.floor(Math.random() * (151 - 1 + 1) + 1);
  return rdm;
}
function arrTester() {
  let newNum = rdmNum();
  if (usedNums.includes(newNum)) {
    arrTester();
  } else {
    pokeNums.push(newNum);
    usedNums.push(newNum);
  }
}
for (let i = 0; i < 5; i++) {
  arrTester();
}
// fetches array of pokeObj on load, preps the array to be iterated through to add card elements
// then addes pokeObj to array of Pokes
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

document.getElementById("btn_id").addEventListener("click", () => {
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
    // if already pulled 150, should only pull one more
  });
  if (usedNums.length === 150) {
    arrTester();
  } else {
    for (let i = 0; i < 5; i++) {
      arrTester();
    }
  }
});

let form = document.getElementById("pokeForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  console.log(e.target);
  for (let i = 1; i < 6; i++) {
    if (
      document.getElementById(`guess_${i}`).value.toLowerCase() ===
      arrayOfPokes[i - 1].name.toLowerCase()
    ) {
      console.log(document.getElementById(`guess_${i}`).value);
    }
  }
});
