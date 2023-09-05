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

function init() {
  group = new THREE.Group();
  group.position.set(0, 50, -250);

  const businessCard = createBusinessCard(container);

  businessCard.rotation.x = -Math.PI / 8; // Tilt the card backwards by 22.5 degrees
  businessCard.castShadow = true;
  businessCard.receiveShadow = true;

  businessCard.scale.set(20, 20, 20);

  group.add(businessCard);
  scene = createScene(businessCard);

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    5000, // Adjusted the far clipping plane
  );

  camera.position.set(0, 400, 800);

  camera.lookAt(scene.position);
  cameraTarget = new THREE.Vector3(0, 5, 0);

  //RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  canvas = document.getElementById("canvas").appendChild(renderer.domElement);

  scene.add(group);
  setupControlsAndEvents(canvas, camera, businessCard, renderer, group);

  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);
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
