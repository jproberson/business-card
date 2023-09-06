import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js";
import { createRoom } from "./backgrounds/room-background";
import { createBasicGround } from "./backgrounds/basicGround";

const activeTweens = new Map();

export function createScene(businessCard) {
  const scene = new THREE.Scene();

  // const width = 3000;
  // const height = 1000;
  // const depth = 3000;

  // room.position.set(0, height / 2, 0);
  // scene.add(room);
  //(red, green, blue)
  // scene.add(new THREE.AxesHelper(1000)); // TEMP FOR TESTING

  const size = 3000;
  const floor = createBasicGround(size);
  scene.add(floor);

  const fogColor = 0x000000; // Black fog color to match the background
  scene.fog = new THREE.FogExp2(fogColor, 0.0012); // The second parameter is the density of the fog. Adjust as needed.

  setupSpotlights(scene, businessCard);
  return scene;
}

function setupSpotlights(scene, businessCard) {
  // const spotLight1 = createSpotlight(0xff5555);
  // const spotLight2 = createSpotlight(0x55ff55);
  // const spotLight3 = createSpotlight(0x5555ff);

  const spotLight1 = createSpotlight(0xffa500, 3); // Orange
  const spotLight2 = createSpotlight(0x00ffff, 3); // Cyan
  const spotLight3 = createSpotlight(0x800080, 3); // Purple

  spotLight1.position.set(1.5, 300, 4.5);
  spotLight2.position.set(0, 300, 3.5);
  spotLight3.position.set(-1.5, 300, 4.5);

  spotLight1.target = businessCard; // Pointing the spotlights to the business card
  spotLight2.target = businessCard;
  spotLight3.target = businessCard;

  scene.add(spotLight1, spotLight2, spotLight3);

  // const lightHelper1 = new THREE.SpotLightHelper(spotLight1);
  // const lightHelper2 = new THREE.SpotLightHelper(spotLight2);
  // const lightHelper3 = new THREE.SpotLightHelper(spotLight3);
  // scene.add(lightHelper1, lightHelper2, lightHelper3);

  tween(spotLight1);
  tween(spotLight2);
  tween(spotLight3);

  // Reduce the intensity of the ambient light
  const ambientLight = new THREE.AmbientLight(0x444444, 1.8);
  scene.add(ambientLight);

  const ambientLight2ForTest = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight2ForTest);
}

function createSpotlight(color) {
  const newObj = new THREE.SpotLight(color, 1);
  newObj.castShadow = true;
  newObj.angle = 0.7;
  newObj.penumbra = 0.7;
  newObj.decay = 2;
  newObj.distance = 4000;

  newObj.shadow.mapSize.width = 2048; //was 1024
  newObj.shadow.mapSize.height = 2048; //was 1024
  newObj.shadow.camera.near = 1;
  newObj.shadow.camera.far = 5000;
  newObj.shadow.camera.fov = 30;
  return newObj;
}

function tween(light) {
  // Stop any active tweens for this light's angle
  if (activeTweens.has(light.uuid + "-angle")) {
    activeTweens.get(light.uuid + "-angle").stop();
  }

  const angleTween = new TWEEN.Tween(light)
    .to(
      {
        angle: Math.random() * 0.5 + 0.1,
        penumbra: Math.random() * 0.5 + 0.5,
      },
      Math.random() * 3000 + 2000,
    )
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(() => {
      tween(light); // Recursive call
    })
    .start();

  // Store the active tween for this light's angle
  activeTweens.set(light.uuid + "-angle", angleTween);

  // Stop any active tweens for this light's position
  if (activeTweens.has(light.uuid + "-position")) {
    activeTweens.get(light.uuid + "-position").stop();
  }

  const positionTween = new TWEEN.Tween(light.position)
    .to(
      {
        x: Math.random() * 500 - 250,
        y: Math.random() * 200 + 600,
        z: Math.random() * 500 - 250,
      },
      Math.random() * 3000 + 2000,
    )
    .easing(TWEEN.Easing.Quadratic.Out)
    .onComplete(() => {
      tween(light); // Recursive call
    })
    .start();

  // Store the active tween for this light's position
  activeTweens.set(light.uuid + "-position", positionTween);
}
