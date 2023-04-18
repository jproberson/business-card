import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  //  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 20, 20);
  scene.add(pointLight);

  const sphereSize = 1; // TEMP FOR TESTING
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize); // TEMP FOR TESTING
  scene.add(pointLightHelper); // TEMP FOR TESTING

  return scene;
}
