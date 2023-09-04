import * as THREE from "three";
import { createScene } from "./scene";
import { createBusinessCard } from "./businessCard";
import { setupControlsAndEvents } from "./controlsAndEvents";

let renderer, scene;
let container;
let group, cameraTarget;
let camera;
let canvas;

function init() {
  scene = createScene();

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1500
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
  canvas = document.getElementById("canvas").appendChild(renderer.domElement);

  group = new THREE.Group();
  group.position.set(0, 25, 0);

  const businessCard = createBusinessCard(container);
  businessCard.scale.set(20, 20, 20);

  group.add(businessCard);
  scene.add(group);
  setupControlsAndEvents(canvas, camera, businessCard, renderer);

  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);
}

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //   controls.update();
};

window.onload = function () {
  init();
  animate();
};
