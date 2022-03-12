# How to run?
```npm install```
```python3 -m http.server```
``` Open serverIP/index.html in your web browser```

Project Template Link for Github: ```git@github.com:udacity/Javascript.git```

### Project Description

Built an infographic that is derived from data that is provided, as well as user input data.  You will be pulling in information from a form and using it to complete an array of objects that will then be appended back to the DOM. 

This may not sound like a lot, but there are a fair amount of moving pieces that rely on each other to work. You’ll need to plan out the logic of what you are trying to accomplish before you begin developing. If you find this process to be quick, there’s a list of additional functionality that you can add that all strive to improve the users’ experience. 

For the project, you will generate a 3x3 grid of tiles (9 in total) with the human in the center tile. Each title will contain the species, an image, and a fact. For the human tile, you will display the name of the human rather than species and no fact is necessary for the human. When the user clicks to generate the infographic from the form, the grid will appear and the form will be hidden. The facts displayed should be random per dinosaur with an opportunity of displaying at least 6 different types of facts (3 should be from the methods you create). One of the titles should be for a pigeon in which the tile should always display, “All birds are considered dinosaurs.”


### Project Requirements

- [x] The form should contain a button which upon clicking, removes the form
- [x] The button should append a grid with 9 tiles to the DOM with the Human located in the center
- [x] The Human tile should display the name of the person and an image, the dino tiles should contain the species, an image and a fact, the bird title should contain the species, image, and "All birds are Dinosaurs."


Backend code must:

- [x] Contain a class and all necessary objects
- [x] Contain at least 3 methods for comparing dinosaurs to the human
- [x] Get user data from the DOM
- [x] Append tiles with object data to DOM

### Concepts and tools worked with
- Object oriented Javascript - Object-oriented javascript is great for working with complex data, but it’s not of much use without an interface to interact with.
- ESLint

### Enhancement ideas

- [ ] Validate the form data to ensure the data is acceptable and complete. 
- [ ] Allow the user to generate a new infographic. 
- [ ] Move the tile colors from CSS to JS for more control. 
- [x] Randomize the order of the tiles while keeping the human in the middle. 
- [ ] Create a hover state on the tiles that displays the rest of the species statistics. 
- [x] Create additional methods for comparing data. 
- [ ] Rewrite the project to use constructor functions, factory functions, the module pattern, and revealing module pattern. 
- [ ] Change out data and images to generate an infographic of your own choosing. Allow the user to select different units for the numbers and update your methods to account for this. Make changes to the CSS, and HTML.
