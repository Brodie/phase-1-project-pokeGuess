console.log("hi");

let arr = [4, 8, 12, 130];
let arrayEl = [];
arr.forEach((num) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
    .then((res) => res.json())
    .then((data) => {
      let pokeObj = {};
      pokeObj.id = num;
      pokeObj.name = data.name;
      pokeObj.img = data.sprites.front_default;
      arrayEl.push(pokeObj);
    });
});
console.log(arrayEl);
arrayEl.forEach((el) => console.log(el));
