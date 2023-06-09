/***************************************************************************************
*    Title: different depths
*    Author: Sophia (fractal kitty)
*    Date: n.d.
*    Code version: 1.0
*    Availability: https://codepen.io/fractalkitty/pen/RwJzMeM
*
***************************************************************************************/

//variables
let three;
let drops = []; 
let timer = 5;
let button;

function preload() {
  // LOAD SOUND
  three = loadSound("THREE.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); 
  setAttributes("alpha", true);
  three.play();
  three.loop();
}
function draw() {
  //animation for visual
  t = frameCount / 4000 + 50; 
  background(255, 255, 255, 255 * abs(cos(t / 2))); 
  orbitControl(); 
  rotateX(t / 2); 
  rotateY(t / 3);
  rotateZ(t / 4); 

  if (drops.length < 105) {
    
    drops.push(new Drops()); 
  }

  for (let i = 0; i < drops.length; i++) {
    drops[i].display(); 
    if (drops[i].r > 255) {
      drops.splice(i, 1); 
//timer
      if (frameCount % 60 == 0 && timer > 0) {
      
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
            "https://tashatan1.github.io/let-s-breath/";
        });
      }
    }
  }
}

class Drops {
  constructor() {
    this.x = random(-width / 2, width / 2); 
    this.y = random(-height * 2, -height / 2);
    this.z = random(-height / 2, height / 2);
    this.s = random(1, 10); 
    this.stop = random(100, height / 2); 
    this.c = random(5, 10); 
    this.fall = true; 
    this.r = 0; 
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
  
  if (keyCode === 32) {
    drops = [];
    setup();
    draw();
  }
}
