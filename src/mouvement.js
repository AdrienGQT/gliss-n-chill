import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision";


let poseLandmarker = undefined;
let enableWebcamButton;
let palmX;
let palmY;
const videoHeight = "360px";
const videoWidth = "480px";

export function getPalmX() {
  return palmX;
}

export function getPalmY() {
  return palmY;
}

// export {palmX, palmY}


const createPoseLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: "GPU"
    },
    runningMode: 'VIDEO',
    numPoses: 2
  });

};
createPoseLandmarker();


const video = document.getElementById("webcam")
const canvasElement = document.getElementById(
  "output_canvas"
)
const canvasCtx = canvasElement.getContext("2d");
const drawingUtils = new DrawingUtils(canvasCtx);

// Check if webcam access is supported.
const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  enableWebcamButton = document.getElementById("webcamButton");
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start detection.
function enableCam(event) {
  if (!poseLandmarker) {
    console.log("Wait! poseLandmaker not loaded yet.");
    return;
  }

  // getUsermedia parameters.
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

let lastVideoTime = -1;
export function predictWebcam() {
  canvasElement.style.height = videoHeight;
  video.style.height = videoHeight;
  canvasElement.style.width = videoWidth;
  video.style.width = videoWidth;

  let startTimeMs = performance.now();
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime;
    poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // console.log(result)

      if (result.worldLandmarks.length > 0) {
        const palm = result.landmarks[0][20]
        palmX = palm.x;
        palmY = palm.y;
        // console.log(palmX,palmY)
        // console.log('palm x is', palm.x, 'palm y is', palm.y)
        canvasCtx.fillRect(100 * palm.x, 100 * palm.y, 15, 15)
        // console.log(palm.x,palm.y)
        // return(palmX,palmY);
        document.getElementById("webcamButton").innerText=palm.x
      }

      // skeleton drawing
      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark, {
          radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
        });
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      
      canvasCtx.restore();
    });
  }
  // Call this function again to keep predicting when the browser is ready.

  // window.requestAnimationFrame(predictWebcam);


}

