console.log("hi");

// testing fetch with test array.
// assigning values to object with id, name, pic src keys
// pushing object to arrayOfPokes
// ------------------------------------------------------
let pokeNums = [4, 8, 12, 130];
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
    });
});
