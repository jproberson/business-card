import * as THREE from "three";
import { createScene } from "./scene";
import { createBusinessCard } from "./businessCard";
import { setupControlsAndEvents } from "./controlsAndEvents";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/RenderPass.js";
import { AfterimagePass } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/AfterimagePass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/ShaderPass.js";
import { PixelShader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/shaders/PixelShader.js";

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
renderer.setClearColor(0x11151c);

const canvas = renderer.domElement;
container.appendChild(canvas);

group = new THREE.Group();
group.position.set(0, 5, 0);

scene.add(group);

const businessCard = createBusinessCard(container);
businessCard.scale.set(20, 20, 20);

businessCard.material = hand_mat;
group.add(businessCard);

const controlsAndEvents = setupControlsAndEvents(
  canvas,
  camera,
  businessCard,
  renderer
);

// ------------------
const hdrEquirect = new RGBELoader()
  .setPath("https://miroleon.github.io/daily-assets/")
  .load("gradient_13.hdr", function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
  });
scene.environment = hdrEquirect;
scene.fog = new THREE.Fog(0x11151c, 1, 100);
scene.fog = new THREE.FogExp2(0x11151c, 0.14);
var theta1 = 0;

const pointlight = new THREE.PointLight(0x85ccb8, 2, 20);
pointlight.position.set(0, 3, 2);
scene.add(pointlight);

const pointlight2 = new THREE.PointLight(0x85ccb8, 2, 20);
pointlight2.position.set(0, 3, 2);
scene.add(pointlight2);

const textureLoader = new THREE.TextureLoader();

var surf_imp = textureLoader.load(
  "https://miroleon.github.io/daily-assets/surf_imp_02.jpg"
);
surf_imp.wrapT = THREE.RepeatWrapping;
surf_imp.wrapS = THREE.RepeatWrapping;

var hand_mat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 1,
  metalness: 1,
  roughnessMap: surf_imp,
  transparent: true,
  opacity: 1,
});

// POST PROCESSING
const renderScene = new RenderPass(scene, camera);

const afterimagePass = new AfterimagePass();
afterimagePass.uniforms["damp"].value = 0.95;

const bloomparams = {
  exposure: 1,
  bloomStrength: 1,
  bloomThreshold: 0.1,
  bloomRadius: 1,
};

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = bloomparams.bloomThreshold;
bloomPass.strength = bloomparams.bloomStrength;
bloomPass.radius = bloomparams.bloomRadius;

const pixelPass = new ShaderPass(PixelShader);
pixelPass.uniforms["resolution"].value = new THREE.Vector2(
  window.innerWidth,
  window.innerHeight
);
pixelPass.uniforms["resolution"].value.multiplyScalar(window.devicePixelRatio);
pixelPass.uniforms["pixelSize"].value = 20;
let composer;

composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(afterimagePass);
composer.addPass(bloomPass);

var update = function () {
  theta1 += 0.007;

  camera.position.x = Math.sin(theta1) * 2;
  camera.position.y = 2.5 * Math.cos(theta1) + 1;

  pointlight.position.x = Math.sin(theta1 + 1) * 11;
  pointlight.position.z = Math.cos(theta1 + 1) * 11;
  pointlight.position.y = 2 * Math.cos(theta1 - 3) + 3;

  pointlight2.position.x = -Math.sin(theta1 + 1) * 11;
  pointlight2.position.z = -Math.cos(theta1 + 1) * 11;
  pointlight2.position.y = 2 * -Math.cos(theta1 - 3) - 6;

  camera.lookAt(0, 0, 0);
};
// ---------

function render() {
  controlsAndEvents.updateRotation(group);
  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}

const animate = function () {
  requestAnimationFrame(animate);
  //   controls.update();
  renderer.render(scene, camera);
  render();
  if (composer) {
    composer.render();
  }
};

animate();
