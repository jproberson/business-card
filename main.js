import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createScene } from "./scene";
import { createBusinessCard } from "./businessCard";
import { Raycaster, Vector2 } from "three";

let targetRotationOnPointerDown = 0;
let targetRotation = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;
let group, cameraTarget;
let windowHalfX = window.innerWidth / 2;
let container;

container = document.createElement("div");
document.body.appendChild(container);

//SCENE & background & lights
const scene = createScene();

const camera = new THREE.PerspectiveCamera(
  90, //75
  window.innerWidth / window.innerHeight,
  1, //.1
  1500 //1000
);

// camera.position.set(0, 10, 12); //this is what i was useing before trying to look straight on
camera.position.set(0, 5, 8);
camera.lookAt(scene.position);
cameraTarget = new THREE.Vector3(0, 5, 0);

//WHAT IS THIS FOR??
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10000, 10000),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true,
  })
);
plane.position.y = 100;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

//RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const canvas = renderer.domElement;
container.appendChild(canvas);

group = new THREE.Group();
group.position.y = 5;
scene.add(group);

const businessCard = createBusinessCard(container);
// businessCard.rotation.x = (-5 * Math.PI) / 180; // Rotate by degrees

group.add(businessCard);

//THE FOLLOWING COMMENTED CODE USES THE ORBITAL CONTROLS TO ALLOW MOVEMENT
//STILL HAVENT DECIDED WHICH I PREFER
/*
Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = businessCard.position;
controls.enablePan = false;
controls.update();
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 0.1;
controls.maxDistance = 100;
// controls.autoRotate = true;
controls.autoRotateSpeed = 0.25;
controls.update();
*/

//EVENTS
container.style.touchAction = "none";
container.addEventListener("pointerdown", onPointerDown);

// Create the animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Update the controls
  //   controls.update();

  render();
};

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}
function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - windowHalfX;

  targetRotation =
    targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function render() {
  group.rotation.y += (targetRotation - group.rotation.y) * 0.05;

  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}

const interactableMeshNames = ["github", "linkedin", "emailGroup"];

function onMouseMove(event, canvas, camera) {
  // Calculate mouse coordinates
  mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(businessCard.children, true);

  // Initialize a flag to track if any interactable mesh is hovered
  let isHovered = false;

  // Loop through the list of interactable mesh names
  interactableMeshNames.forEach((meshName) => {
    // Get the mesh or group with the current name
    const object = businessCard.getObjectByName(meshName);

    if (object) {
      let intersected = false;

      if (meshName === "emailGroup") {
        object.traverse((child) => {
          if (
            child.type === "Mesh" &&
            child.geometry.type === "PlaneGeometry" &&
            intersects.some((intersect) => intersect.object === child)
          ) {
            intersected = true;
          }
        });
      } else {
        intersected = intersects.some(
          (intersect) => intersect.object === object
        );
      }

      if (intersected) {
        // Apply hover effect
        document.body.style.cursor = "pointer";
        isHovered = true;

        // Perform any additional hover effect here, e.g. changing the texture
      } else {
        // Remove hover effect
        // Perform any additional unhover effect here, e.g. resetting the texture
      }
    }
  });

  // Update the cursor style based on the isHovered flag
  document.body.style.cursor = isHovered ? "pointer" : "default";
}

function onMouseClick(event, canvas, camera) {
  // Calculate mouse coordinates
  mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(businessCard.children, true);

  // Check if an icon is intersected
  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    // Open specific website based on the clicked icon's name
    switch (clickedMesh.name) {
      case "github":
        window.open("https://github.com/jproberson", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/jacob-roberson-23b813149",
          "_blank"
        );
        break;
      case "email":
        window.open("mailto:jroberson@jprcode.com", "_blank");
        break;
      // Add more cases for other icons
    }
  }
}

const raycaster = new Raycaster();
const mouse = new Vector2();

// //MOUSE EVENT FOR CONTANT BUTTONS
canvas.addEventListener("mousemove", (event) =>
  onMouseMove(event, canvas, camera)
);

window.addEventListener("resize", onWindowResize);
canvas.addEventListener("click", (event) =>
  onMouseClick(event, canvas, camera)
);

// Start the animation loop
animate();
