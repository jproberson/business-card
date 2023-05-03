import { Raycaster, Vector2 } from "three";

let businessCard;
let targetRotationOnPointerDown = 0;
let targetRotation = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;
let windowHalfX = window.innerWidth / 2;
const interactableMeshNames = ["github", "linkedin", "emailGroup"];
const raycaster = new Raycaster();
const mouse = new Vector2();
let _renderer, _camera;

export function setupControlsAndEvents(canvas, camera, card, renderer) {
  businessCard = card;
  _renderer = renderer;
  _camera = camera;

  canvas.addEventListener("mousemove", (event) =>
    onMouseMove(event, canvas, camera)
  );
  window.addEventListener("resize", onWindowResize);
  canvas.addEventListener("click", (event) =>
    onMouseClick(event, canvas, camera)
  );

  //   canvas.style.touchAction = "none";
  canvas.addEventListener("pointerdown", onPointerDown);

  return {
    updateRotation: (group) => {
      group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
    },
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
          "_blank"
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
          (intersect) => intersect.object === object
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

//THE FOLLOWING COMMENTED CODE USES THE ORBITAL CONTROLS TO ALLOW MOVEMENT
//STILL HAVENT DECIDED WHICH I PREFER
/*
// Set up OrbitControls
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
