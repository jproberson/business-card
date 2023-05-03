import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  // const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(50, 100, 90);
  scene.add(pointLight);

  const sphereSize = 1; // TEMP FOR TESTING
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize); // TEMP FOR TESTING
  scene.add(pointLightHelper); // TEMP FOR TESTING

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
  scene.add(new THREE.AxesHelper(1000)); // TEMP FOR TESTING

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
  scene.add(ambientLight);

  return scene;
}
