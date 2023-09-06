import * as THREE from "three";

export function createBasicGround(size) {
  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  }); // DoubleSide ensures the plane is visible from both sides
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
  floor.receiveShadow = true;
  return floor;
}
