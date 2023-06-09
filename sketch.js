/***************************************************************************************
*    Title: different depths
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/RwJzMeM
*
***************************************************************************************/

//press space to reset - codepen challenge - rain

let three;
let drops = []; //let there be drops
let timer = 5;
let button;

function preload() {
  // LOAD SOUND
  three = loadSound("THREE.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //to fall within this space
  setAttributes("alpha", true); //allowed to fade
  three.play();
  three.loop();
}
function draw() {
  t = frameCount / 4000 + 50; //and move in time
  background(255, 255, 255, 255 * abs(cos(t / 2))); //with the light of day
  orbitControl(); //in your perspective
  rotateX(t / 2); //that turns
  rotateY(t / 3); //on
  rotateZ(t / 4); //these axes

  if (drops.length < 105) {
    //less is more
    drops.push(new Drops()); //more is more
  }

  for (let i = 0; i < drops.length; i++) {
    drops[i].display(); //a call to being
    if (drops[i].r > 255) {
      drops.splice(i, 1); //a call to cease

      if (frameCount % 60 == 0 && timer > 0) {
        // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
      }
      //  console.log(timer);
      if (timer == 0) {
        button = createButton("Carry on Listening");
        button.position(200, height/2);
        button.mousePressed(function goToAnotherPage() {
          window.location.href =
            "https://editor.p5js.org/natashatan/sketches/_KLoOBCzN";
        });
        button = createButton("Let's Breath");
        button.position(425, height/2);
        button.mousePressed(function goToAnotherPage() {
          window.location.href =
            "https://editor.p5js.org/natashatan/sketches/gxSMDJpDT";
        });
      }
    }
  }
}

class Drops {
  constructor() {
    this.x = random(-width / 2, width / 2); //we all have coordinates
    this.y = random(-height * 2, -height / 2);
    this.z = random(-height / 2, height / 2);
    this.s = random(1, 10); //that change
    this.stop = random(100, height / 2); //or end
    this.c = random(5, 10); //with filters
    this.fall = true; //we begin at our fall
    this.r = 0; //and grow in our death through what we leave behind
  }
  display() {
    if (this.y < this.stop) {
      this.fall = true;
    } else {
      this.fall = false;
    }
    if (this.fall) {
      this.y += this.s * 1;
      push();
      noStroke();
      fill(150 + this.c, 150 + this.c * 2, 150 + this.c * 4);
      translate(this.x, this.y, this.z);
      sphere(3, 20, 20);
      pop();
    } else {
      push();
      fill(200 + this.c, 200 + this.c * 2, 200 + this.c * 4, 255 - this.r);
      translate(this.x, this.stop, this.z);
      rotateX(PI / 2);
      this.r += 2;
      torus(this.r, 0.5, 50, 50);
      pop();
    }
  }
}
function keyPressed() {
  //a reset in time
  if (keyCode === 32) {
    drops = [];
    setup();
    draw();
  }
}
