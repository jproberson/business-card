import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js";
import { createRoom } from "./backgrounds/room-background";

const activeTweens = new Map();

export function createScene(businessCard) {
  const scene = new THREE.Scene();

  const width = 3000;
  const height = 1000;
  const depth = 3000;

  const room = createRoom(width, height, depth);
  room.position.set(0, height / 2, 0);
  scene.add(room);

  // scene.background = new THREE.Color(0x000000);
  // scene.fog = new Fog(0x000000, 1, 1000);

  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(10000, 10000),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xffffff,
  //     opacity: 0,
  //     transparent: true,
  //   }),
  // );
  // plane.position.y = 100;
  // plane.rotation.x = -Math.PI / 2;
  //
  // scene.add(plane);

  //(red, green, blue)
  // scene.add(new THREE.AxesHelper(1000)); // TEMP FOR TESTING

  setupSpotlights(scene, businessCard);
  return scene;
}

function setupSpotlights(scene, businessCard) {
  const spotLight1 = createSpotlight(0xff5555);
  const spotLight2 = createSpotlight(0x55ff55);
  const spotLight3 = createSpotlight(0x5555ff);

  spotLight1.position.set(1.5, 150, 4.5);
  spotLight2.position.set(0, 150, 3.5);
  spotLight3.position.set(-1.5, 150, 4.5);

  // spotLight1.target = businessCard; // Pointing the spotlights to the business card
  // spotLight2.target = businessCard;
  // spotLight3.target = businessCard;

  spotLight1.target.position.set(1.5, 20, 4.5); // Pointing slightly below the card
  spotLight2.target.position.set(0, 20, 3.5);
  spotLight3.target.position.set(-1.5, 20, 4.5);

  scene.add(spotLight1, spotLight2, spotLight3);

  const lightHelper1 = new THREE.SpotLightHelper(spotLight1);
  const lightHelper2 = new THREE.SpotLightHelper(spotLight2);
  const lightHelper3 = new THREE.SpotLightHelper(spotLight3);
  scene.add(lightHelper1, lightHelper2, lightHelper3);

  tween(spotLight1);
  tween(spotLight2);
  tween(spotLight3);

  // Reduce the intensity of the ambient light
  const ambientLight = new THREE.AmbientLight(0x555555, 0.2); // Intensity reduced to 0.2
  scene.add(ambientLight);
}

function createSpotlight(color) {
  const newObj = new THREE.SpotLight(color, 5); // Reduced intensity to 5
  newObj.castShadow = true;
  newObj.angle = 0.5; // Wider angle
  newObj.penumbra = 0.7; // Softer edge
  newObj.decay = 2;
  newObj.distance = 4000;

  newObj.shadow.mapSize.width = 1024; // Adjust as needed
  newObj.shadow.mapSize.height = 1024; // Adjust as needed
  newObj.shadow.camera.near = 10; // Adjust as needed
  newObj.shadow.camera.far = 1000; // Adjust as needed
  newObj.shadow.camera.fov = 30; // Adjust as needed
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
