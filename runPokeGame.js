console.log("hi");

// testing random array generator
// trying to test array against values already generated to avoid duplicate fetches
// assigning values to object with id, name, pic src keys
// pushing object to arrayOfPokes
// barebones appending of poke image to dom
// ------------------------------------------------------

let pokeNums = []
let usedNums = []
function rdmNum (){
    let rdm = Math.floor(Math.random() * (151 - 1 + 1) + 1)
    console.log(rdm)
    return rdm
}
for (let i = 0; i < 5; i++) {
    let newNum = rdmNum()
    if(usedNums.includes(newNum)) {
        // regenerate new num and try again
        // recursive calling of this for loop?
    }else{
        pokeNums.push(newNum)
        usedNums.push(newNum)
    }
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
