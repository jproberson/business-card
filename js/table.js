import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const tableTopWidth = 16;
const tableTopHeight = 0.5;
const tableTopDepth = 9;
const legWidth = 3;
const legHeight = 9;
const legDepth = 3;

// export function createTable() {
//   const tableGroup = new THREE.Group();

//   const tableTopGeometry = new THREE.BoxGeometry(
//     tableTopWidth,
//     tableTopHeight,
//     tableTopDepth
//   );
//   const tableTopMaterial = new THREE.MeshStandardMaterial({ color: "brown" });
//   const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);

//   const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);
//   const legMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

//   const leg1 = new THREE.Mesh(legGeometry, legMaterial);
//   const leg2 = new THREE.Mesh(legGeometry, legMaterial);
//   const leg3 = new THREE.Mesh(legGeometry, legMaterial);
//   const leg4 = new THREE.Mesh(legGeometry, legMaterial);

//   // leg1.position.set(x1, y1, z1);
//   // leg2.position.set(x2, y2, z2);
//   // leg3.position.set(x3, y3, z3);
//   // leg4.position.set(x4, y4, z4);

//   tableGroup.add(tableTop);
//   tableGroup.add(leg1);
//   tableGroup.add(leg2);
//   tableGroup.add(leg3);
//   tableGroup.add(leg4);

//   return tableGroup;
// }

export function createTable() {
  return new Promise((resolve, reject) => {
    const loader = new OBJLoader();

    loader.load(
      "../models/table/Desk OBJ.obj",
      (object) => {
        resolve(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred while loading the model:", error);
        reject(error);
      }
    );
  });
}
