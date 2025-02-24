import "./style.css";

const playSound = (path, volume) => {
  let tag = document.createElement("audio");
  tag.src = path;
  tag.volume = volume;
  tag.loop = true;
  document.body.appendChild(tag);
  tag.play();
};

const onClick = () => {
  playSound("/sounds/ambiance/ambiance01.mpeg", 0.4);
  playSound("/sounds/ambiance/ambiance02.mp3", 0.6);
  playSound("/sounds/ambiance/ambiance03.mp3", 1);
  window.removeEventListener("click", onClick, true);
};

window.addEventListener("click", onClick, true);
