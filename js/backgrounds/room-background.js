import * as THREE from "three";

export function createRoom(width, height, depth) {
  // Create the box geometry
  const geometry = new THREE.BoxGeometry(width, height, depth);

  // Create the material for the room

  const roomMaterial = new THREE.MeshPhongMaterial({
    color: "black",
    side: THREE.BackSide,
  });

  // Create the room mesh
  const room = new THREE.Mesh(geometry, roomMaterial);

  room.receiveShadow = true;
  // Flip the normals by scaling on the x-axis with a negative value
  room.scale.x = -1;

  return room;
}
