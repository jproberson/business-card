import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();

  // scene.background = new THREE.Color(0x000000);
  // scene.fog = new Fog(0x000000, 1, 1000);

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

  setupSpotlights(scene);
  return scene;
}

function setupSpotlights(scene) {
  // Create a spotlight
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 500, 500);
  spotLight.angle = Math.PI / 16;
  spotLight.penumbra = 0.1;
  spotLight.decay = 1.5;
  spotLight.distance = 1000;

  // Add the spotlight to the scene
  scene.add(spotLight);

  // Add a helper to visualize the spotlight
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

  // Add a point light for subtle, general illumination
  const pointLight = new THREE.PointLight(0xffffff, 0.3);
  // pointLight.position.set(500, 500, 500);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
}
