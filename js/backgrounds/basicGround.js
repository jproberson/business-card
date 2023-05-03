import * as THREE from "three";

export function createBasicGround() {
  const geometry = new THREE.PlaneGeometry(2000, 2000);
  const material = new THREE.MeshLambertMaterial({ color: 0x808080 });

  const groundMesh = new THREE.Mesh(geometry, material);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.receiveShadow = true;
  return groundMesh;
}
