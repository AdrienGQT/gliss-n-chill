// Import necessary modules from the MediaPipe library
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

// Initialize variables
let poseLandmarker = undefined;
let enableWebcamButton;
let palmX;
let palmY;
let rightPalmTracked = true;

// Set video dimensions
const videoHeight = "275px";
const videoWidth = "480px";

const switchHand = () => {
  console.log('switch hand')
  if(rightPalmTracked){
    rightPalmTracked = false
  }else{
    rightPalmTracked = true
  }
}

document.querySelector('#handSwitchButton').addEventListener('click', switchHand)


// Function to get the x-coordinate of the palm
export function getPalmX() {
  return palmX;
}

// Function to get the y-coordinate of the palm
export function getPalmY() {
  return palmY;
}

// Asynchronous function to create a PoseLandmarker instance
const createPoseLandmarker = async () => {
  try {
    // Resolve the fileset for vision tasks
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    // Create the PoseLandmarker instance with specified options
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "GPU", // Use GPU for faster processing
      },
      runningMode: "VIDEO", // Run in video mode
      numPoses: 2, // Detect up to 2 poses
    });
    console.log("PoseLandmarker loaded successfully.");
  } catch (error) {
    console.error("Error loading PoseLandmarker:", error);
  }
};

// Call the function to initialize the PoseLandmarker
createPoseLandmarker();

// Get references to the video and canvas elements
const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const drawingUtils = new DrawingUtils(canvasCtx);

// Check if the browser supports webcam access
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// If webcam access is supported, add event listener to the button
if (hasGetUserMedia()) {
  enableWebcamButton = document.getElementById("webcamButton");
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// Function to enable the webcam and start detection
function enableCam(event) {
  if (!poseLandmarker) {
    console.log("Wait! PoseLandmarker is not loaded yet.");
    return;
  }

  console.log("Camera activated");
  document.getElementById("webcamButton").innerText = "Camera active";

  // Get user media parameters
  const constraints = {
    video: true,
  };

  // Activate the webcam stream
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        requestAnimationFrame(predictWebcam);
      };
    })
    .catch((error) => {
      console.error("Error accessing the webcam:", error);
    });
}

// Variable to keep track of the last video time
let lastVideoTime = -1;

// Function to draw the pose landmarks on the canvas
function drawResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  results.landmarks.forEach((landmarks, index) => {
    drawingUtils.drawLandmarks(landmarks, {
      radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
    });
    drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS);
  });
  canvasCtx.restore();
}

// Function to predict poses from the webcam feed
export function predictWebcam() {
  if (!video.paused && !video.ended) {
    let startTimeMs = performance.now();

    // Check if the video time has changed to avoid redundant processing
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;

      if (poseLandmarker) {
        poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
          if (result.landmarks.length > 0) {
            let palm;
            // Extract the palm landmark coordinates
            if (rightPalmTracked) {
              palm = result.landmarks[0][20];
            }else{
              palm = result.landmarks[0][19];
            }
            palmX = palm.x;
            palmY = palm.y;

            // Draw the results on the canvas
            drawResults(result);
          }
        });
      }
    }
    requestAnimationFrame(predictWebcam);
  }
}
