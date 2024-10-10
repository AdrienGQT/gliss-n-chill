let video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");

// Keep a reference of all the child elements we create
// so we can remove them easily on each render.
var children = [];

export function displayVideoDetections(detections) {
  // Remove any highlighting from previous frame.
  for (let child of children) {
    liveView.removeChild(child);
  }
  children.splice(0);

  // Iterate through predictions and draw them to the live view
  for (let detection of detections) {
    const highlighter = document.createElement("div");
    highlighter.setAttribute("class", "highlighter");
    const p = document.createElement("p");
    p.innerText =
      "Confidence: " + Math.round(detection.categories[0].score * 100) + "% .";
    if (detection.boundingBox) {
      const { height, width, originX, originY } = detection.boundingBox;
      p.style.left = `${video.offsetWidth - width - originX}px`;
      p.style.top = `${originY - 30}px`;
      p.style.width = `${width - 10}px`;
      p.style.height = "20px";

      highlighter.style.left = `${video.offsetWidth - width - originX}px`;
      highlighter.style.top = `${originY}px`;
      highlighter.style.width = `${width}px`;
      highlighter.style.height = `${height}px`;
    }
    liveView.appendChild(highlighter);
    liveView.appendChild(p);

    // Store drawn objects in memory so they are queued to delete at next call
    children.push(highlighter);
    children.push(p);
    for (let keypoint of detection.keypoints) {
      const keypointEl = document.createElement("span");
      keypointEl.className = "key-point";
      keypointEl.style.top = `${keypoint.y * video.offsetHeight - 3}px`;
      keypointEl.style.left = `${
        video.offsetWidth - keypoint.x * video.offsetWidth - 3
      }px`;
      liveView.appendChild(keypointEl);
      children.push(keypointEl);
    }
  }
}
