

// TODO: Dynamically generate list of animals in animals folder
animals_folder = 'images/animals'
animals = [
  "monkey.png",
  "snek.png",
]

Handlebars.registerHelper('pick_random_animal', function(options) {
  pick = Math.floor(Math.random() * animals.length());
  return animals_folder + animals[pick];
});

// Landing position after hovering over image
Handlebars.registerHelper('pick_random_animal_position', function(options) {
  console.log('called');
  pick_hor = Math.floor(Math.random() * 2);
  pick_ver = Math.floor(Math.random() * 2);
  hor = ["left", "right"][pick_hor]
  ver = ["top", "bottom"][pick_ver]
  css = ver + ": 10%;";
  css += hor + ": 10%;";
  css += ".album-art:hover .hidden-image {"
  css = ver + ": -50%;";
  css += hor + ": -30%;";
  if (ver === "right") {
    css += "transform: rotate(40deg);";
  } else {
    css += "transform: rotate(-40deg);";
  }
  console.log(css);
  return css;
});
