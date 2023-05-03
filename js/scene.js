import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Fog } from "three";

export function createScene() {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x000000);
  scene.fog = new Fog(0x000000, 1, 1000);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0,
      transparent: true,
    })
  );
  plane.position.y = 100;
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);

  //(red, green, blue)
  // scene.add(new THREE.AxesHelper(1000)); // TEMP FOR TESTING

  // setupSpotlights(scene);
  setupLightsTest(scene);
  return scene;
}

function setupSpotlights(scene) {
  // Create a spotlight
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 300, 500);
  spotLight.angle = Math.PI / 8;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 2000;

  // Add the spotlight to the scene
  scene.add(spotLight);

  // Add a helper to visualize the spotlight
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  // Add a point light for subtle, general illumination
  const pointLight = new THREE.PointLight(0xffffff, 0.3);
  // pointLight.position.set(500, 500, 500);
  scene.add(pointLight);
}

function setupLightsTest(scene) {
  const pointLight1 = new THREE.PointLight(0xffffff, 1);
  pointLight1.position.set(100, 100, 100);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
  pointLight2.position.set(-100, 100, 100);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffffff, 0.5);
  pointLight3.position.set(100, -100, 100);
  scene.add(pointLight3);
}

export function setupBloom(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // strength
    0.4, // radius
    0.85 // threshold
  );
  composer.addPass(bloomPass);

  return composer;
}
