import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { displayVideoDetections } from "./displaydetection";

let faceDetector;
let runningMode = "IMAGE";

const video = document.querySelector("#webcam");
const enableWebcamButton = document.querySelector("#webcamButton");

const initializefaceDetector = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
  });
  enableWebcamButton.disabled = false;
};
initializefaceDetector();

// Check if webcam access is supported.
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start detection.
async function enableCam() {
  if (!faceDetector) {
    alert("Face Detector is still loading. Please try again..");
    return;
  }

  // Hide the button.
  enableWebcamButton.classList.add("display-none");

  // getUsermedia parameters
  const constraints = {
    audio: false,
    video: {
      width: { min: 640, ideal: 800, max: 1280 },
      height: { min: 480, ideal: 600, max: 720 },
      frameRate: { ideal: 10, max: 15 },
    },
  };

  // Activate the webcam stream.
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    })
    .catch((err) => {
      console.error(err);
    });
}

let lastVideoTime = -1;
async function predictWebcam() {
  // if image mode is initialized, create a new classifier with video runningMode
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO";
    await faceDetector.setOptions({ runningMode: "VIDEO" });
  }
  let startTimeMs = performance.now();

  // Detect faces using detectForVideo
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const detections = faceDetector.detectForVideo(
      video,
      startTimeMs
    ).detections;
    displayVideoDetections(detections);
  }

  // Call this function again to keep predicting when the browser is ready
  window.requestAnimationFrame(predictWebcam);
}
