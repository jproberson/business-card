import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createScene } from "./scene";
import { createBusinessCard } from "./businessCard";
import { setupControlsAndEvents } from "./controlsAndEvents";

let group, cameraTarget;
let container;
let camera;

container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

const scene = createScene();

camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1500
);
camera.position.set(0, 400, 700);

camera.lookAt(scene.position);
cameraTarget = new THREE.Vector3(0, 5, 0);

//RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const canvas = renderer.domElement;
container.appendChild(canvas);

group = new THREE.Group();
group.position.set(0, 5, 0);

scene.add(group);

const businessCard = createBusinessCard(container);
businessCard.scale.set(20, 20, 20);

// businessCard.rotation.x = (-5 * Math.PI) / 180; // Rotate by degrees

group.add(businessCard);

const controlsAndEvents = setupControlsAndEvents(
  canvas,
  camera,
  businessCard,
  renderer
);

function render() {
  controlsAndEvents.updateRotation(group);
  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}

const animate = function () {
  requestAnimationFrame(animate);
  //   controls.update();
  renderer.render(scene, camera);
  render();
};

animate();
