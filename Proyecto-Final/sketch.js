// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];
let catSound; // Variable to hold the cat sound

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();

  // Load the cat sound
  catSound = loadSound('soundcat.mp3'); // Replace with the actual path to your sound file
}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
  console.log(results);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];

    if (object.label === 'cat') { // Check if the detected object is a cat
      stroke(0, 255, 0);
      strokeWeight(4);
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill(255);
      textSize(24);
      text(object.label, object.x + 10, object.y + 24);

      // Play the cat sound when a cat is detected
      catSound.play(); 
     
    }
  }
}
