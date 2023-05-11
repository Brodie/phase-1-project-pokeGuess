/*ToDo: 
add win and lose screens
code that checks if counter is at zero
---
style
dropdown for gens
    - what are we going to have to do with our PRELOADED arrayOfPokes on dropdown change?
*/
console.log("hi");

// arrays for performing fetch
let pokeNums = [];
let usedNums = [];
let arrayOfPokes = [];

// random number between 1 and 151 (number of pokemon in original generation)
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
let livesCounter = 3;
let pokeScore = 0;

// button to start game
document.getElementById("btn_id").addEventListener("click", () => {
  // delete lets play button
  document.getElementById("btn_id").remove();
  // Update lives container and score container
  // make all elements visible
  let lives = document.getElementById("lives_container");
  lives.style.visibility = "visible";
  lives.textContent = `Lives:💟 ${livesCounter}`;

  let score = document.getElementById("score_container");
  score.style.visibility = "visible";
  score.textContent = `Score: ${pokeScore}`;

  let pokeContainer = document.getElementById("poke_container");
  pokeContainer.style.visibility = "visible";
  let pokeForm = document.getElementById("poke_form");
  pokeForm.style.visibility = "visible";

  // build pokemon card
  arrayOfPokes.forEach((pokeObj, index) => {
    let card = document.getElementById(`poke_${index + 1}`);

    let cardTitle = document.createElement("h2");
    cardTitle.textContent = `Pokemon ${index + 1}`;
    card.append(cardTitle);

    let pokeImg = document.createElement("img");
    pokeImg.src = pokeObj.img;
    card.append(pokeImg);
    pokeImg.classList.add("pokemonPic");

    let pokeNameFoot = document.createElement("h2");
    pokeNameFoot.classList.add("poke_name", "poke_answers");
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

// Code below is form handling/score handling/ fetch to prep next round
//
let form = document.getElementById("poke_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // for loop to check each guess starting with 1
  for (let i = 1; i < 6; i++) {
    // reveal names of pokemon
    let footerAnswer = document.getElementsByClassName("poke_name")[i - 1];
    footerAnswer.style.visibility = "visible";
    footerAnswer.style.backgroundColor = "gray";

    // assigning needed variables for evaluations
    let guess = document.getElementById(`guess_${i}`).value.toLowerCase();
    let answer = arrayOfPokes[i - 1].name.toLowerCase();
    let typeOneGuess = document.getElementById(`guess_${i}_type1`).value;
    let typeTwoGuess = document.getElementById(`guess_${i}_type2`).value;
    let types = Object.values(arrayOfPokes[i - 1]).slice(3);

    // update poke card to display types
    let pokeCard = document.getElementById(`poke_${i}`);
    let typesText = document.createElement("h3");
    let typesAnswered = document.createElement("h3");
    typesText.classList.add("poke_answers");
    typesText.style.backgroundColor = "gray";
    typesAnswered.style.backgroundColor = "gray";
    typesAnswered.style.color = "white";

    if (types.length === 2) {
      typesText.textContent = `Types: ${types[0].toUpperCase()}, ${types[1].toUpperCase()}`;
      typesAnswered.textContent = `Types Guessed: ${typeOneGuess.toUpperCase()} ${typeTwoGuess.toUpperCase()}`;
    } else {
      typesText.textContent = `Type: ${types[0].toUpperCase()}`;
      typesAnswered.textContent = `Type Guessed: ${typeOneGuess.toUpperCase()}`;
    }
    pokeCard.append(typesText);
    pokeCard.append(typesAnswered);

    // Answer checking
    if (guess === answer) {
      pokeScore += 1;
      footerAnswer.textContent = "Correct! " + `${footerAnswer.textContent}`;
      footerAnswer.style.color = "aqua";
    } else {
      livesCounter -= 1;
      footerAnswer.textContent =
        "Sorry, the answer is: " +
        `${footerAnswer.textContent}` +
        ` You guessed ${guess.toUpperCase()}`;
      footerAnswer.style.color = "orange";
    }
    // type checking no lives taken
    if (types.includes(typeOneGuess)) {
      pokeScore += 1;
      if (types.includes(typeTwoGuess)) {
        pokeScore += 1;
        typesText.style.color = "cyan";
        typesText.textContent = typesText.textContent + " | + 2 points!";
      } else if (!types.includes(typeTwoGuess)) {
        typesText.style.color = "cyan";
        typesText.textContent = typesText.textContent + " | + 1 point!";
      }
    } else if (!types.includes(typeOneGuess)) {
      if (types.includes(typeTwoGuess)) {
        typesText.style.color = "cyan";
        typesText.textContent = typesText.textContent + " | + 1 point!";
      } else {
        typesText.style.color = "orange";
        typesText.textContent =
          typesText.textContent + " | incorrect, no points!";
      }
    }
  } // end of for loop
  //------------------

  // update score and lives
  document.getElementById("lives_container").textContent = `Lives:💟 ${
    livesCounter <= 0 ? 0 : livesCounter
  }`;
  document.getElementById(
    "score_container"
  ).textContent = `Score: ${pokeScore}`;

  // create button to do next round
  let nextRound = document.createElement("button");
  nextRound.textContent = "Next Round!";
  document.querySelector("section").append(nextRound);
  nextRound.addEventListener("click", startSecondRound);

  // fetch next round!
  // almost identical to previous fetch. but removes first element
  // on each iteration so that card building code can be reused
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
        arrayOfPokes.shift();
        console.log(arrayOfPokes);
      });
  });
  // hide submit button so you cant click it without first loading the next round
  document.getElementById("submit_guess").style.visibility = "hidden";
  //reset form
  form.reset();
  // check lives remaining. If <0, give lose screen
  if (livesCounter <= 0) {
    document.getElementById("container_title").textContent =
      "Out Of Lives! You Lose ";
    // remove poke images
    for (let i = 1; i < 6; i++) {
      pokeNode = document.getElementById(`poke_${i}`);
      while (pokeNode.firstChild) {
        pokeNode.removeChild(pokeNode.lastChild);
      }
    }
    // create endgame gif
    let endGameEle = document.createElement("img");
    // thanks giphy for the gif
    endGameEle.src = "https://media.giphy.com/media/LkJCuaohj4CLm/giphy.gif";
    document.getElementById("container_title").append(endGameEle);

    // remove next round button
    nextRound.remove();
    document.getElementById("card_list").remove();
  }
});

// actually just plays next round continuously
function startSecondRound(e) {
  // make submit visible
  document.getElementById("submit_guess").style.visibility = "visible";
  // remove poke cards
  for (let i = 1; i < 6; i++) {
    pokeNode = document.getElementById(`poke_${i}`);
    while (pokeNode.firstChild) {
      pokeNode.removeChild(pokeNode.lastChild);
    }
  }
  // remove next round button
  e.target.remove();
  // load new pokemon!
  // can maybe be refactored into a function
  arrayOfPokes.forEach((pokeObj, index) => {
    let card = document.getElementById(`poke_${index + 1}`);

    let cardTitle = document.createElement("h2");
    cardTitle.textContent = `Pokemon  ${index + 1}`;
    card.append(cardTitle);

    let pokeImg = document.createElement("img");
    pokeImg.src = pokeObj.img;
    card.append(pokeImg);
    pokeImg.classList.add("pokemonPic");

    let pokeNameFoot = document.createElement("h2");
    pokeNameFoot.classList.add("poke_name", "poke_answers");
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
}
