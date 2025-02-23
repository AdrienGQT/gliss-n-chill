// Import Matter.js modules from the installed npm package
import {
  Engine,
  Render,
  Constraint,
  Composites,
  Composite,
  Runner,
  Bodies,
  Body,
  World,
  Vector,
  Events,
} from "matter-js";


import {getPalmX, getPalmY, predictWebcam} from "../src/mouvement.js";

import sprite_col1_var1_1 from "/sprites/01sprites/sprite_var1_1.png";
import sprite_col1_var1_2 from "/sprites/01sprites/sprite_var1_2.png";
import sprite_col1_var1_3 from "/sprites/01sprites/sprite_var1_3.png";
import sprite_col1_var1_4 from "/sprites/01sprites/sprite_var1_4.png";
import sprite_col1_var1_5 from "/sprites/01sprites/sprite_var1_5.png";

import sprite_col2_var1_1 from "/sprites/02sprites/sprite_var1_1.png";
import sprite_col2_var1_2 from "/sprites/02sprites/sprite_var1_2.png";
import sprite_col2_var1_3 from "/sprites/02sprites/sprite_var1_3.png";
import sprite_col2_var1_4 from "/sprites/02sprites/sprite_var1_4.png";
import sprite_col2_var1_5 from "/sprites/02sprites/sprite_var1_5.png";

import sprite_col3_var1_1 from "/sprites/03sprites/sprite_var1_1.png";
import sprite_col3_var1_2 from "/sprites/03sprites/sprite_var1_2.png";
import sprite_col3_var1_3 from "/sprites/03sprites/sprite_var1_3.png";
import sprite_col3_var1_4 from "/sprites/03sprites/sprite_var1_4.png";
import sprite_col3_var1_5 from "/sprites/03sprites/sprite_var1_5.png";

import sprite_col4_var1_1 from "/sprites/04sprites/sprite_var1_1.png";
import sprite_col4_var1_2 from "/sprites/04sprites/sprite_var1_2.png";
import sprite_col4_var1_3 from "/sprites/04sprites/sprite_var1_3.png";
import sprite_col4_var1_4 from "/sprites/04sprites/sprite_var1_4.png";
import sprite_col4_var1_5 from "/sprites/04sprites/sprite_var1_5.png";

import sprite_col5_var1_1 from "/sprites/05sprites/sprite_var1_1.png";
import sprite_col5_var1_2 from "/sprites/05sprites/sprite_var1_2.png";
import sprite_col5_var1_3 from "/sprites/05sprites/sprite_var1_3.png";
import sprite_col5_var1_4 from "/sprites/05sprites/sprite_var1_4.png";
import sprite_col5_var1_5 from "/sprites/05sprites/sprite_var1_5.png";

import sprite_col6_var1_1 from "/sprites/06sprites/sprite_var1_1.png";
import sprite_col6_var1_2 from "/sprites/06sprites/sprite_var1_2.png";
import sprite_col6_var1_3 from "/sprites/06sprites/sprite_var1_3.png";
import sprite_col6_var1_4 from "/sprites/06sprites/sprite_var1_4.png";
import sprite_col6_var1_5 from "/sprites/06sprites/sprite_var1_5.png";

import sprite_col7_var1_1 from "/sprites/07sprites/sprite_var1_1.png";
import sprite_col7_var1_2 from "/sprites/07sprites/sprite_var1_2.png";
import sprite_col7_var1_3 from "/sprites/07sprites/sprite_var1_3.png";
import sprite_col7_var1_4 from "/sprites/07sprites/sprite_var1_4.png";
import sprite_col7_var1_5 from "/sprites/07sprites/sprite_var1_5.png";

import sprite_col1_var2_1 from "/sprites/01sprites/sprite_var2_1.png";
import sprite_col1_var2_2 from "/sprites/01sprites/sprite_var2_2.png";
import sprite_col1_var2_3 from "/sprites/01sprites/sprite_var2_3.png";
import sprite_col1_var2_4 from "/sprites/01sprites/sprite_var2_4.png";
import sprite_col1_var2_5 from "/sprites/01sprites/sprite_var2_5.png";

import sprite_col2_var2_1 from "/sprites/02sprites/sprite_var2_1.png";
import sprite_col2_var2_2 from "/sprites/02sprites/sprite_var2_2.png";
import sprite_col2_var2_3 from "/sprites/02sprites/sprite_var2_3.png";
import sprite_col2_var2_4 from "/sprites/02sprites/sprite_var2_4.png";
import sprite_col2_var2_5 from "/sprites/02sprites/sprite_var2_5.png";

import sprite_col3_var2_1 from "/sprites/03sprites/sprite_var2_1.png";
import sprite_col3_var2_2 from "/sprites/03sprites/sprite_var2_2.png";
import sprite_col3_var2_3 from "/sprites/03sprites/sprite_var2_3.png";
import sprite_col3_var2_4 from "/sprites/03sprites/sprite_var2_4.png";
import sprite_col3_var2_5 from "/sprites/03sprites/sprite_var2_5.png";

import sprite_col4_var2_1 from "/sprites/04sprites/sprite_var2_1.png";
import sprite_col4_var2_2 from "/sprites/04sprites/sprite_var2_2.png";
import sprite_col4_var2_3 from "/sprites/04sprites/sprite_var2_3.png";
import sprite_col4_var2_4 from "/sprites/04sprites/sprite_var2_4.png";
import sprite_col4_var2_5 from "/sprites/04sprites/sprite_var2_5.png";

import sprite_col5_var2_1 from "/sprites/05sprites/sprite_var2_1.png";
import sprite_col5_var2_2 from "/sprites/05sprites/sprite_var2_2.png";
import sprite_col5_var2_3 from "/sprites/05sprites/sprite_var2_3.png";
import sprite_col5_var2_4 from "/sprites/05sprites/sprite_var2_4.png";
import sprite_col5_var2_5 from "/sprites/05sprites/sprite_var2_5.png";

import sprite_col6_var2_1 from "/sprites/06sprites/sprite_var2_1.png";
import sprite_col6_var2_2 from "/sprites/06sprites/sprite_var2_2.png";
import sprite_col6_var2_3 from "/sprites/06sprites/sprite_var2_3.png";
import sprite_col6_var2_4 from "/sprites/06sprites/sprite_var2_4.png";
import sprite_col6_var2_5 from "/sprites/06sprites/sprite_var2_5.png";

import sprite_col7_var2_1 from "/sprites/07sprites/sprite_var2_1.png";
import sprite_col7_var2_2 from "/sprites/07sprites/sprite_var2_2.png";
import sprite_col7_var2_3 from "/sprites/07sprites/sprite_var2_3.png";
import sprite_col7_var2_4 from "/sprites/07sprites/sprite_var2_4.png";
import sprite_col7_var2_5 from "/sprites/07sprites/sprite_var2_5.png";

import foreground from "/decorations/foreground.png";
import background from "/decorations/background.png";

// Set variables
let handX;
let pHandX;
let handY;
let pHandY;
let mousePos;
let palmX;
let palmY;

let object1Id = [];
let object2Id = [];
let object3Id = [];
let object4Id = [];
let object5Id = [];
let object6Id = [];
let object7Id = [];
let objectsIds = [object1Id,object2Id,object3Id,object4Id,object5Id,object6Id,object7Id]

let objectSpacing = -250;
let objectQuantity = 7;


const sprites01 = [sprite_col1_var1_1, sprite_col1_var1_2, sprite_col1_var1_3, sprite_col1_var1_4, sprite_col1_var1_5,sprite_col1_var2_1, sprite_col1_var2_2, sprite_col1_var2_3, sprite_col1_var2_4, sprite_col1_var2_5];
const sprites02 = [sprite_col2_var1_1, sprite_col2_var1_2, sprite_col2_var1_3, sprite_col2_var1_4, sprite_col2_var1_5, sprite_col2_var2_1, sprite_col2_var2_2, sprite_col2_var2_3, sprite_col2_var2_4, sprite_col2_var2_5];
const sprites03 = [sprite_col3_var1_1, sprite_col3_var1_2, sprite_col3_var1_3, sprite_col3_var1_4, sprite_col3_var1_5, sprite_col3_var2_1, sprite_col3_var2_2, sprite_col3_var2_3, sprite_col3_var2_4, sprite_col3_var2_5];
const sprites04 = [sprite_col4_var1_1, sprite_col4_var1_2, sprite_col4_var1_3, sprite_col4_var1_4, sprite_col4_var1_5, sprite_col4_var2_1, sprite_col4_var2_2, sprite_col4_var2_3, sprite_col4_var2_4, sprite_col4_var2_5];
const sprites05 = [sprite_col5_var1_1, sprite_col5_var1_2, sprite_col5_var1_3, sprite_col5_var1_4, sprite_col5_var1_5, sprite_col5_var2_1, sprite_col5_var2_2, sprite_col5_var2_3, sprite_col5_var2_4, sprite_col5_var2_5];
const sprites06 = [sprite_col6_var1_1, sprite_col6_var1_2, sprite_col6_var1_3, sprite_col6_var1_4, sprite_col6_var1_5, sprite_col6_var2_1, sprite_col6_var2_2, sprite_col6_var2_3, sprite_col6_var2_4, sprite_col6_var2_5];
const sprites07 = [sprite_col7_var1_1, sprite_col7_var1_2, sprite_col7_var1_3, sprite_col7_var1_4, sprite_col7_var1_5, sprite_col7_var2_1, sprite_col7_var2_2, sprite_col7_var2_3, sprite_col7_var2_4, sprite_col7_var2_5];

const sprites = [sprites01,sprites02,sprites03,sprites04,sprites05,sprites06,sprites07]

// Set engine
let engine = Engine.create();

console.log(window.innerHeight, window.innerWidth)

let sizes = {
  windowWidth : window.innerWidth,
  windowHeight : window.innerHeight
}

// Set render
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1820,
    height: 980,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false,
    wireframes: false,
  },
});

// Set gravity value
engine.world.gravity.y = 4;



// Function to create a composite object with rectangles
function createObject(x, y, i) {
  let object = Composite.create();

  let initialWidth = 150;
  let initialHeight = 100;
  let reductionStep = 13;

  // Create a stack with the five rectangles
  let stack = Composites.stack(x, y, 1, 5, 5, 5, function (x, y, column, row) {
    let currentWidth = initialWidth - row * reductionStep;
    let currentHeight = initialHeight + Math.random() * (12 - (-15)) + (-15);

    let spriteRandom = Math.round(Math.random())
    if(spriteRandom == 0){{
      row+=5
    }}

    return Bodies.rectangle(x + Math.random() * (60 - (-60)) + (-60), y, currentWidth, currentHeight, {
      frictionAir: 0.01,
      density: 200,
      isStatic: false,
      render: {
        sprite: {
          texture: sprites[i][row],
          xScale: 0.3,
          yScale: 0.4,
        },
      },
      objectId: i,
    });
  });

  // Chain the five rectangles together
  Composites.chain(stack, 0, 0.5, 0, -0.5, { stiffness: 1, length: 3 });

  // Stick the whole object to the top of viewport with a constraint
  Composite.add(
    stack,
    Constraint.create({
      pointA: { x: x, y: y },
      bodyB: stack.bodies[0],
      pointB: { x: 0, y: -55 },
      stiffness: 0.5,
      length: 90,
    })
  );

  Composite.add(object, stack);

  return object;
}

// Manually place the 7 objects in line using the function above
for (let i = 0; i < objectQuantity; i++) {
  let object = createObject(1650 + i * objectSpacing + Math.random() * (10 - (-10)) + (-10), 125,i);
  for (let j = 0; j < 5; j++){
    objectsIds[i].push(i*5+j)
  }
  World.add(engine.world, object);
}

// Create the hand shape
let hand = Bodies.circle(100, 100, 25, {
  render: {
    strokeStyle:'white',
    fillStyle:'rgba(255,255,255,0.5)'
  },
  isStatic: true,
  isSensor: true,
});


let foregroundBody = Bodies.rectangle(910, 490, 1820, 980, {
  isStatic: true,
  isSensor: true, // Désactive les collisions tout en maintenant le rendu
  render: {
    sprite: {
      texture: foreground,
      xScale: 1,
    },
  }
});

let backgroundBody = Bodies.rectangle(910, 490, 1820, 980, {
  isStatic: true,
  render: {
    sprite: {
      texture: background,
      xScale: 1,
      yScale: 1
    },
  },
  collisionFilter: {
    category: 0x0001, // Catégorie arbitraire pour éviter toute collision
    mask: 0x0000 // Aucune autre catégorie ne pourra entrer en collision avec cet objet
  }
});
World.add(engine.world, [backgroundBody, foregroundBody]);


// Vitesse de transition de la main (ajuste cette valeur pour obtenir la fluidité souhaitée)
let handSpeed = 0.3; // 0.1 est une vitesse relativement lente, tu peux augmenter pour plus de rapidité

// Fonction pour interpoler la position de la main vers palmX et palmY
const refreshHand = () => {
  // Appelle la fonction qui met à jour palmX et palmY
  predictWebcam();
  palmX = getPalmX();
  palmY = getPalmY();

  // Si palmX et palmY sont définis
  if (palmX !== undefined && palmY !== undefined) {
    // Définir les coordonnées cibles
    let targetX = palmX * 2000; // Conversion en coordonnées de la scène
    let targetY = palmY * 1100; // Conversion en coordonnées de la scène

    // Appliquer une interpolation progressive pour déplacer la main
    let newX = hand.position.x + (targetX - hand.position.x) * handSpeed;
    let newY = hand.position.y + (targetY - hand.position.y) * handSpeed;

    // Déplacer la main vers la nouvelle position interpolée
    Body.setPosition(hand, { x: newX, y: newY });
  }
};

// Call refreshHand at each engine tick (beforeUpdate event)
Events.on(engine, "beforeUpdate", function () {
  refreshHand(); // Update hand position before each engine update
});


// Variables about the object in collision with the hand
let currentCollidingBodyId = null;
let collidingBody = null;

// Loop function that is called during collisions
function giveVelocity() {
  if (collidingBody) {
    handX = hand.position.x; // Get position of the hand on X and Y
    handY = hand.position.y;

    // Calculate the movement of the hand (on X and Y) between n-1 and n
    let xMove = handX - pHandX;
    let yMove = handY - pHandY;

    // Set velocity to the body
    Body.setVelocity(collidingBody, { x: xMove / 3.7, y: yMove / 7 });

    // Store hand position at n to use it in n+1
    pHandX = hand.position.x;
    pHandY = hand.position.y;
  }
}

let collisionInterval = null;

const onSoundEnd = (e) => {
  e.target.remove();
}

const playSound = (path) => {
  let tag = document.createElement('audio');
  tag.src = path;
  tag.volume = 0.7;
  document.body.appendChild(tag);
  tag.play();
  tag.addEventListener('ended', onSoundEnd)
}

// Collision start detector
Events.on(engine, "collisionStart", (event) => {
  // Get the two bodies involved in the collision
  let pairs = event.pairs;

  pairs.forEach(function (pair) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    // Check if "hand" is involved in the collision
    if (bodyA === hand || bodyB === hand) {
      let otherBody = bodyA === hand ? bodyB : bodyA;

      // Store the colliding object and its ID
      currentCollidingBodyId = otherBody.objectId;
      collidingBody = otherBody;

      if (!collisionInterval) {
        // Start interval if not already
        pHandX = hand.position.x;
        pHandY = hand.position.y;
        collisionInterval = setInterval(giveVelocity, 5);
        // console.log(currentCollidingBodyId);
        // console.log(currentCollidingBodyId)
        for(let i = 0; i < objectQuantity; i++){
          playSound(`sounds/notes/note0${currentCollidingBodyId + 1}.mp3`)
        }
      }
    }
  });
});



// Collision end detector
Events.on(engine, "collisionEnd", (event) => {
  let pairs = event.pairs;

  pairs.forEach(function (pair) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    // Check if hand is involved in the collision
    if (bodyA === hand || bodyB === hand) {
      if (collisionInterval) {
        // Stop if collision has ended
        clearInterval(collisionInterval);
        collisionInterval = null; // Reset the var
        collidingBody = null; // Reset colliding body
        currentCollidingBodyId = null; // Reset the ID of colliding body
      }
    }
  });
});

World.add(engine.world, [hand]);



// Create Runner
let runner = Runner.create();
Runner.run(runner, engine);

// Run engine and render
Engine.run(engine);
Render.run(render);

// const foregroundHTML = document.querySelector('.foreground')
// const canvasPosition = document.querySelectorAll('canvas')[1].getBoundingClientRect()
// console.log(`${canvasPosition.y}px`)
// foregroundHTML.style.top = `${canvasPosition.y}px`


