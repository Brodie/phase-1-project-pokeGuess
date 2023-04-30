console.log("hi");

// testing random array generator
// assigning values to object with id, name, pic src keys
// pushing object to arrayOfPokes
// barebones appending of poke image to dom
// ------------------------------------------------------

let pokeNums = []
for (let i = 0; i < 5; i++) {
    pokeNums.push(Math.floor(Math.random() * (151 - 1 + 1) + 1))
}

let arrayOfPokes = [];

pokeNums.forEach((num) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
    .then((res) => res.json())
    .then((data) => {
      let pokeObj = {};
      pokeObj.id = num;
      pokeObj.name = data.name;
      pokeObj.img = data.sprites.front_default;
      arrayOfPokes.push(pokeObj);
      console.log(arrayOfPokes);
      let card = document.createElement("div")
      let pokeImg = document.createElement("img")
      pokeImg.src = pokeObj.img
      card.append(pokeImg)
      document.querySelector("body").append(card)
    });
});
