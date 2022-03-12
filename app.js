/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */

const humanDataForm = document.getElementById('dino-compare');
const grid = document.getElementById('grid');

// Create Dino Constructor
function Dino(dinoObject) {
  this.species = dinoObject.species;
  this.weight = dinoObject.weight;
  this.height = dinoObject.height;
  this.diet = dinoObject.diet;
  this.where = dinoObject.where;
  this.when = dinoObject.when;
  this.fact = dinoObject.fact;
}

function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Create Dino Objects
const getDinoArray = (dinos) => dinos.map((dino) => new Dino(dino));

const getHumanData = () => {
  const name = document.getElementById('name').value;
  const height = parseFloat(document.getElementById('feet').value) * 12
    + parseFloat(document.getElementById('inches').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const diet = document.getElementById('diet').value;
  return new Human(name, height, weight, diet);
};

const getBeforeVowelWord = (nextWord, firstWord) => {
  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  let beforeVowel = 'a';
  if (vowelSet.has(nextWord[0].toLowerCase())) beforeVowel = 'an';
  if (firstWord) {
    beforeVowel = beforeVowel[0].toUpperCase() + beforeVowel.slice(1);
  }
  return beforeVowel;
};

// Create Dino Compare Method 1
Dino.prototype.compareWeight = function (human) {
  const dinoWeight = this.weight;
  const humanWeight = human.weight;
  const difference = dinoWeight - humanWeight;
  const comparison = difference < 0 ? 'lighter' : 'heavier';
  return `${getBeforeVowelWord(this.species, true)} ${
    this.species
  } weighs ${difference}lbs ${comparison} than you!`;
};

// Create Dino Compare Method 2

Dino.prototype.compareHeight = function (human) {
  const dinoHeight = this.height;
  const humanHeight = human.height;
  let difference = dinoHeight - humanHeight;
  const heightFacts = [];
  const diffCheck = difference < 0;
  difference = Math.floor(Math.abs(difference));
  if (diffCheck) {
    heightFacts.push(
      `You are ${difference}feet taller than ${getBeforeVowelWord(
        this.species,
        false,
      )} ${this.species}`,
    );
    heightFacts.push(
      `${getBeforeVowelWord(this.species, true)} ${
        this.species
      }is ${difference}feet shorter than you.`,
    );
  } else {
    heightFacts.push(
      `You are ${difference}feet shorter than a ${this.species}`,
    );
    heightFacts.push(
      `${getBeforeVowelWord(this.species, true)} ${
        this.species
      }is ${difference}feet taller than you.`,
    );
  }
  return heightFacts;
};

// Create Dino Compare Method 3
Dino.prototype.compareDiet = function (human) {
  const dinoDiet = this.diet[0].toUpperCase() + this.diet.slice(1);
  const humanDiet = human.diet[0].toUpperCase() + human.diet.slice(1);
  if (humanDiet.toLowerCase() === dinoDiet.toLowerCase()) {
    return 'Looks like I have the same diet as you!';
  }
  return `${this.species} is ${getBeforeVowelWord(
    dinoDiet,
    false,
  )} ${dinoDiet} whereas ${human.name} is ${getBeforeVowelWord(
    humanDiet,
    false,
  )} ${humanDiet}`;
};

Dino.prototype.whereDidILive = function () {
  return `I lived in ${this.where}.`;
};

Dino.prototype.whenDidILive = function () {
  return `I existed in the time period of ${this.when}.`;
};

const generateFacts = (animals, human) => {
  for (const animal of animals) {
    if (animal instanceof Human) {
      continue;
    }
    if (animal.species == 'Pigeon') {
      animal.facts = [animal.fact];
      delete animal.fact;
      continue;
    }
    const facts = [animal.fact];
    facts.push(animal.compareWeight(human));
    facts.concat(animal.compareHeight(human));
    facts.push(animal.compareDiet(human));
    facts.push(animal.whereDidILive());
    facts.push(animal.whenDidILive());
    animal.facts = facts;
    delete animal.fact;
  }
  return animals;
};

// Fetch image for animal
const getImage = (isHuman, path) => {
  if (isHuman) return '<img src="./images/human.png"/>';
  return `<img src="./images/${path}.png"/>`;
};

// Generate tile for each object
const generateTile = (obj) => {
  const randomFact = obj.facts
    ? `<p>${obj.facts[Math.floor(Math.random() * obj.facts.length)]}</p>`
    : '';

  const tile = document.createElement('div');
  tile.classList.add('grid-item');
  let htmlString = '';
  htmlString += obj.species ? `<h3>${obj.species}</h3>` : `<h3>${obj.name}</h3>`;
  htmlString += obj.species
    ? getImage(false, obj.species.toLowerCase())
    : getImage(true, null);
  htmlString += randomFact;
  tile.innerHTML = htmlString;
  grid.appendChild(tile);
};

// Randomize order of dino array
function randomizeArrayOrder(dinoArray) {
  const randomizedDinoArray = dinoArray;
  for (let i = randomizedDinoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = randomizedDinoArray[i];
    randomizedDinoArray[i] = randomizedDinoArray[j];
    randomizedDinoArray[j] = temp;
  }
  return dinoArray;
}

function getCombinedArray(dinos, human) {
  const randomlyOrderedDinos = randomizeArrayOrder(dinos);

  return randomlyOrderedDinos.slice(0, 4)
    .concat(human)
    .concat(randomlyOrderedDinos.slice(4, 8));
}

const makeGrid = (combinedArray) => combinedArray.forEach((animal) => generateTile(animal));

// Generate Tiles for each Dino in Array
const showGrid = (combinedArray) => {
  makeGrid(combinedArray);
  // Remove form from screen
  humanDataForm.style.display = 'none';
};

fetch('dino.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const dinos = getDinoArray(jsonData.Dinos);
    const compareButton = document.getElementById('btn');
    // On button click, prepare and display infographic
    compareButton.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        const human = getHumanData();
        const combinedArray = getCombinedArray(dinos, human);
        const combinedArrayWithFacts = generateFacts(combinedArray, human);
        showGrid(combinedArrayWithFacts);
      },
      false,
    );
  })
  .catch((error) => console.log('Error in fetching json : ', error));
