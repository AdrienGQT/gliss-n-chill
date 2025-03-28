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

import gsap from "gsap";

import { getPalmX, getPalmY, predictWebcam } from "../src/mouvement.js";

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
let objectsIds = [
  object1Id,
  object2Id,
  object3Id,
  object4Id,
  object5Id,
  object6Id,
  object7Id,
];

// Set engine
const engine = Engine.create();

const sizes = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
};

const scales = {
  decorationX: sizes.windowWidth / 1820,
  decorationY: sizes.windowHeight / 980,
  min: Math.min(sizes.windowWidth / 1820, sizes.windowHeight / 980),
  max: Math.max(sizes.windowWidth / 1820, sizes.windowHeight / 980),
};

// const objectSpacing = -250 * scales.decorationX;
const objectQuantity = 7;

// Set render
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: sizes.windowWidth,
    height: sizes.windowHeight,
    hasBounds: true, // Enable viewport culling
    pixelRatio: window.devicePixelRatio || 1, // Optimize for device pixel ratio
    wireframes: false, // Already set, but emphasize
    showDebug: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false,
  },
});

// Set gravity value
engine.world.gravity.y = 4;

// Function to create a composite object with rectangles
function createObject(x, y, i) {
  const object = Composite.create();

  const initialWidth = 150 * scales.decorationX;
  const initialHeight = 100 * scales.decorationX;
  const reductionStep = 13;

  // Create a stack with the five rectangles
  const stack = Composites.stack(
    x,
    y,
    1,
    5,
    5,
    5,
    function (x, y, column, row) {
      const currentWidth = initialWidth - row * reductionStep;
      const currentHeight =
        initialHeight +
        gsap.utils.random(-15 * scales.decorationY, 15 * scales.decorationY);

      return Bodies.rectangle(
        x +
          gsap.utils.random(
            -120 * scales.decorationX,
            120 * scales.decorationX
          ),
        y,
        currentWidth,
        currentHeight,
        {
          frictionAir: 0.01,
          density: 200,
          isStatic: false,
          render: {
            sprite: {
              texture: `/sprites/0${i + 1}sprites/sprite_var${Math.round(
                gsap.utils.random(1, 3)
              )}_${row + 1}.png`,
              xScale: 0.3 * scales.decorationX,
              yScale: 0.4 * scales.decorationX,
            },
          },
          objectId: i,
        }
      );
    }
  );

  // Chain the five rectangles together
  Composites.chain(stack, 0, 0.5, 0, -0.5, {
    stiffness: 1,
    length: 3 * scales.decorationY,
    render: {
      visible: false,
    },
  });

  // Stick the whole object to the top of viewport with a constraint
  Composite.add(
    stack,
    Constraint.create({
      pointA: { x: x, y: y },
      bodyB: stack.bodies[0],
      pointB: { x: 0, y: -55 },
      stiffness: 0.5,
      length: 90 * scales.decorationY,
      render: {
        visible: false,
      },
    })
  );

  Composite.add(object, stack);
  return object;
}

// Place the 7 flowers
for (let i = 0; i < objectQuantity; i++) {
  const object = createObject(
    sizes.windowWidth -
      200 * scales.decorationX +
      (i + 0.5) *
        ((-1 * (sizes.windowWidth - 400 * scales.decorationX)) /
          objectQuantity),
    105 * scales.decorationY,
    i
  );
  for (let j = 0; j < 5; j++) {
    objectsIds[i].push(i * 5 + j);
  }
  World.add(engine.world, object);
}

// Create the hand shape
const hand = Bodies.circle(100, 100, 25, {
  render: {
    strokeStyle: "white",
    fillStyle: "rgba(255,255,255,0.5)",
  },
  isStatic: true,
  isSensor: true,
});

const foregroundBody = Bodies.rectangle(
  sizes.windowWidth / 2,
  sizes.windowHeight / 2,
  sizes.windowWidth,
  sizes.windowHeight,
  {
    isStatic: true,
    isSensor: true,
    render: {
      sprite: {
        texture: foreground,
        xScale: scales.max,
        yScale: scales.max,
      },
    },
  }
);

const backgroundBody = Bodies.rectangle(
  sizes.windowWidth / 2,
  sizes.windowHeight / 2,
  sizes.windowWidth,
  sizes.windowHeight,
  {
    isStatic: true,
    render: {
      sprite: {
        texture: background,
        xScale: scales.max,
        yScale: scales.max,
      },
    },
    collisionFilter: {
      category: 0x0001, // Catégorie arbitraire pour éviter toute collision
      mask: 0x0000, // Aucune autre catégorie ne pourra entrer en collision avec cet objet
    },
  }
);
World.add(engine.world, [backgroundBody, foregroundBody]);

// Vitesse de transition de la main (ajuste cette valeur pour obtenir la fluidité souhaitée)
const handSpeed = 0.1; // 0.1 est une vitesse relativement lente

// Fonction pour interpoler la position de la main vers palmX et palmY
const refreshHand = () => {
  // Récupérer palmX et palmY
  palmX = getPalmX();
  palmY = getPalmY();

  // Si palmX et palmY sont définis
  if (palmX !== undefined && palmY !== undefined) {
    // Définir les coordonnées cibles
    const targetX = palmX * 2000; // Conversion en coordonnées de la scène
    const targetY = palmY * 1100; // Conversion en coordonnées de la scène

    // Appliquer une interpolation progressive pour déplacer la main
    const newX = hand.position.x + (targetX - hand.position.x) * handSpeed;
    const newY = hand.position.y + (targetY - hand.position.y) * handSpeed;

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
};

const playSound = (path) => {
  const tag = document.createElement("audio");
  tag.src = path;
  tag.volume = 0.7;
  document.body.appendChild(tag);
  tag.play();
  tag.addEventListener("ended", onSoundEnd);
};

// Collision start detector
Events.on(engine, "collisionStart", (event) => {
  console.log('collision')
  // Get the two bodies involved in the collision
  const pairs = event.pairs;

  pairs.forEach(function (pair) {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;

    if (bodyA != hand && bodyB != hand) return;

    const otherBody = bodyA === hand ? bodyB : bodyA;

    // Store the colliding object and its ID
    currentCollidingBodyId = otherBody.objectId;
    collidingBody = otherBody;

    if (!collisionInterval) {
      // Start interval if not already
      pHandX = hand.position.x;
      pHandY = hand.position.y;
      collisionInterval = setInterval(giveVelocity, 5);
      playSound(`sounds/notes/note0${currentCollidingBodyId + 1}.mp3`);
    }
    // // Check if "hand" is involved in the collision
    // if (bodyA === hand || bodyB === hand) {

    // }
  });
});

// Collision end detector
Events.on(engine, "collisionEnd", (event) => {
  const pairs = event.pairs;

  pairs.forEach(function (pair) {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;

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
const runner = Runner.create();
Runner.run(runner, engine);

// Run engine and render
Runner.run(engine);
Render.run(render);
