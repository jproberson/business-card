import { Raycaster, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
let businessCard;
let pointerX = 0;
let pointerXOnPointerDown = 0;
let windowHalfX = window.innerWidth / 2;
const interactableMeshNames = ["github", "linkedin", "emailGroup"];
const raycaster = new Raycaster();
const mouse = new Vector2();
let _renderer, _camera;

export function setupControlsAndEvents(
  canvas,
  camera,
  card,
  renderer,
  groupObj,
) {
  businessCard = card;
  _renderer = renderer;
  _camera = camera;

  canvas.addEventListener("mousemove", (event) =>
    onMouseMove(event, canvas, camera),
  );
  window.addEventListener("resize", onWindowResize);
  canvas.addEventListener("click", (event) =>
    onMouseClick(event, canvas, camera),
  );

  //   canvas.style.touchAction = "none";
  canvas.addEventListener("pointerdown", onPointerDown);

  setupOrbitControls(camera, renderer, groupObj);

  return {
    // updateRotation: (group) => {
    // group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
    // },
  };
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;

  _camera.aspect = window.innerWidth / window.innerHeight;
  _camera.updateProjectionMatrix();

  _renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - windowHalfX;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}
function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - windowHalfX;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function onMouseClick(event, canvas, camera) {
  mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(businessCard.children, true);

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    switch (clickedMesh.name) {
      case "github":
        window.open("https://github.com/jproberson", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/jacob-roberson-23b813149",
          "_blank",
        );
        break;
      case "email":
        window.open("mailto:jroberson@jprcode.com", "_blank");
        break;
    }
  }
}
function onMouseMove(event, canvas, camera) {
  mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(businessCard.children, true);

  let isHovered = false;

  interactableMeshNames.forEach((meshName) => {
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
          (intersect) => intersect.object === object,
        );
      }

      if (intersected) {
        document.body.style.cursor = "pointer";
        isHovered = true;
      } else {
        // Remove hover effect
      }
    }
  });

  document.body.style.cursor = isHovered ? "pointer" : "default";
}

function setupOrbitControls(camera, renderer, group) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(group.position.x, group.position.y, group.position.z);

  controls.enablePan = true;
  controls.enableZoom = true;
  controls.minDistance = 400; // Minimum zoom distance
  controls.maxDistance = 700; // Maximum zoom distance

  controls.update();
  controls.maxPolarAngle = Math.PI * 0.5;
  controls.autoRotateSpeed = 0.25;

  // Restrict horizontal rotation to view only the front of the card
  controls.minAzimuthAngle = -Math.PI / 4; // -45 degrees
  controls.maxAzimuthAngle = Math.PI / 4; // 45 degrees
}
