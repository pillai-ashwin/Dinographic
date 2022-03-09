
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

    // Create Dino Objects
    let dinos;
    async function getDinoArray() {
        let allDinos = [];
        allDinos = await fetch('dino.json')
        .then(response => response.json())
        .then(jsonData => {
            allDinos = jsonData.Dinos.map(obj => new Dino(obj));
            dinos = allDinos;
        })
        .catch(error => console.log("Error in fetching json file: ", error));
    }

    dinos = getDinoArray();
    
    // Create Human Object
    const getHumanData = (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const height = parseFloat(document.getElementById("feet").value) * 12 + parseFloat(document.getElementById("inches").value);
            const weight = parseFloat(document.getElementById("weight").value);
            const diet = document.getElementById("diet").value;

            function Human(name, height, weight, diet) {
                this.name = name;
                this.height = height;
                this.weight = weight;
                this.diet = diet;
            }

            return new Human(name, height, weight, diet);
    };

    // Use IIFE to get human data from form
    let human;
    (function() {
        const compareButton = document.getElementById("btn");
        compareButton.addEventListener("click", (e) => {
            human = getHumanData(e);
            makeGrid(3,3, dinos, human);
        }, false);
    })();

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    Dino.prototype.compareWeight = function(dino, human) {
        const dinoWeight = dino.weight;
        const humanWeight = human.weight;
        console.log("Comparing weights for dino & human...\ndino weighs -> ", dinoWeight, "\nhuman weighs -> ", humanWeight);
    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    Dino.prototype.compareSpecies = function(dino, human) {
        const dinoSpecies = dino.species;
        const humanSpecies = human.species;
        const humanSpeciesComparisonResponse = (function(humanSpecies) {
            if(humanSpecies === undefined) return "\nUnfortunately human species isn't specified here... but I can tell you that humans of this generation are from the species of -> Homo Sapiens";
            console.log("\nhuman is from the species of -> " + humanSpecies);
        })(humanSpecies);
        const comparisonResponse = "Comparing species for dino & human...\ndino is from the species of -> " + dinoSpecies + humanSpeciesComparisonResponse;
        console.log(comparisonResponse);
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareDiet = function(dino, human) {
        const dinoDiet = dino.diet;
        const humanDiet = human.diet;
        if(humanDiet === dinoDiet) {
            return "Looks like you both have the same diet!";
        } else {
            return "Nope, you eat different stuff." + dino.species + " is a " + dinoDiet + " whereas this human is a " + humanDiet;
        }
    }

    // Generate Tiles for each Dino in Array
    const makeGrid = (rows, cols, dinos, human) => {
        let dinoTiles; 
        let humanTile;
        const midRowIndex = Math.floor(rows / 2);
        const midColIndex = Math.floor(rows / 2);
        
        const generateTile = (obj) => {
            const getImage = (path) => {
                return '<img classsrc="'+imagesDirectory+obj.species.toLowerCase()+'.png"/>'
            }
            const imagesDirectory = './images/';
            let html = '';
            html += obj.species ? '<h3>' + obj.species + '</h3>' : '<h3>'+obj.name+'</h3>'
            html += obj.species ? '<img src="'+imagesDirectory+obj.species.toLowerCase()+'.png"/>' : '<img src="'+imagesDirectory+'human.png"/>'
            html += obj.fact ? '<p>' +obj.fact+'</p>' : ''
            return html;
        }
        
        const generateTiles = async () => {
            dinoTiles = await dinos.map(dino => generateTile(dino));
            humanTile = await generateTile(human);
        };
        generateTiles().then(() => {
        // Add tiles to DOM
            let container = document.getElementById("grid");
            container.innerHTML = '';
            for(let i=0; i<rows; i++) {
                for(let j=0; j<cols; j++) {
                    let cell = document.createElement("div");
                    // cell.className = "grid-item";
                    cell.id = 'row:' + i +',col:' + j;
                    let tile = '';
                    if(i == midRowIndex && j == midColIndex) {
                        tile = humanTile;
                    } else {
                        let index = Math.floor(Math.random()*dinoTiles.length);
                        tile = dinoTiles[index];
                        dinoTiles.splice(index, 1);
                    }
                    cell.innerHTML = tile;
                    cell.className = "grid-item";
                    container.appendChild(cell);
                }
                // container.appendChild(currentRow);
            }
            return container;
        })
        .then(()=> document.getElementById("dino-compare").style.display="none")
        .catch((error) => console.log("Error generating tiles: "+error));
    }
    // Remove form from screen

// On button click, prepare and display infographic
