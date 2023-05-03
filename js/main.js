import * as THREE from "three";
import { createScene, setupBloom } from "./scene";
import { createBusinessCard } from "./businessCard";
import { setupControlsAndEvents } from "./controlsAndEvents";
import { createBasicGround } from "./backgrounds/basicGround";

let group, cameraTarget;
let container;
let camera;

container = document.createElement("div");
document.body.appendChild(container);

const scene = createScene();

camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1500
);
camera.position.set(0, 300, 800);

camera.lookAt(scene.position);
cameraTarget = new THREE.Vector3(0, 5, 0);

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

const ground = createBasicGround();
ground.position.set(0, -4 * 20, 0);
scene.add(ground);

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

const composer = setupBloom(renderer, scene, camera);

const animate = function () {
  requestAnimationFrame(animate);
  //   controls.update();
  renderer.render(scene, camera);
  composer.render();

  render();
};

animate();
