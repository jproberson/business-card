import * as THREE from "three";
import { createScene } from "./scene";
import { createBusinessCard } from "./businessCard";
import { setupControlsAndEvents } from "./controlsAndEvents";
import TWEEN from "three/addons/libs/tween.module.js";

let renderer, scene;
let container;
let group, cameraTarget;
let camera;
let canvas;
let businessCard;

// function adjustForMobileView() {
//   const canvasElement = document.getElementById("canvas");
//   if (window.innerWidth <= 768) {
//     // Assuming 768px as a breakpoint for mobile devices
//     canvasElement.style.transform = "rotateZ(90deg)"; // Rotate the canvas by 90 degrees
//   } else {
//     canvasElement.style.transform = ""; // Reset the transform for non-mobile views
//   }
// }
// adjustForMobileView();

function init() {
  group = new THREE.Group();
  group.position.set(0, 150, -250);

  businessCard = createBusinessCard(container);
  businessCard.rotation.x = -Math.PI / 8; // Tilt the card backwards by 22.5 degrees
  businessCard.scale.set(20, 20, 20);
  group.add(businessCard);
  scene = createScene(businessCard);
  // adjustForResponsiveView();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    5000, // Adjusted the far clipping plane
  );

  camera.position.set(0, 300, 400);

  camera.lookAt(scene.position);
  cameraTarget = new THREE.Vector3(0, 5, 0);

  //RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // renderer.setPixelRatio(window.devicePixelRatio);

  const pixelRatio = window.devicePixelRatio;
  renderer.setPixelRatio(pixelRatio * 1.5); // 1.5 times the device pixel ratio

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 1.0);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  canvas = document.getElementById("canvas").appendChild(renderer.domElement);

  scene.add(group);
  setupControlsAndEvents(canvas, camera, businessCard, renderer, group);
}

const animate = function () {
  requestAnimationFrame(animate);
  TWEEN.update();
  renderer.render(scene, camera);
  //   controls.update();
};

window.onload = function () {
  init();
  animate();
};

// window.addEventListener("resize", adjustForMobileView);
