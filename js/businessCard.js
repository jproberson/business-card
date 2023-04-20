import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const cardWidth = 14;
const cardHeight = 8;
const depth = 0.1;
const whiteColor = "#fefefe";
const darkColor = "#262D35";
const lightBlue = "#0CA8E2";
const lightBlueDarker = "#0094D8";
const darkBlue = "#026FB4";

const card = new THREE.Group();

const whiteMaterial = new THREE.MeshPhongMaterial({ color: whiteColor });
const darkMaterial = new THREE.MeshPhongMaterial({ color: darkColor });
const lightBlueMaterial = new THREE.MeshPhongMaterial({ color: lightBlue });
const darkBlueMaterial = new THREE.MeshPhongMaterial({ color: darkBlue });
const lightBlueDarkerMaterial = new THREE.MeshPhongMaterial({
  color: lightBlueDarker,
});
const blackMaterial = new THREE.MeshPhongMaterial({
  color: "black",
});

export function createBusinessCard() {
  cardRender();

  createCardTextAndLogo();

  return card;
}

function cardRender() {
  const leftSideMesh = createLeftSideOfCard();
  leftSideMesh.position.set(0, 0, 0);

  card.add(leftSideMesh);

  const middleMeshes = createMiddleOfCard();

  middleMeshes.forEach((mesh) => {
    mesh.position.set(0, 0, 0);
    card.add(mesh);
  });

  const rightSideMesh = createRightSideOfCard();
  rightSideMesh.position.set(0, 0, 0);
  card.add(rightSideMesh);
}

function createLeftSideOfCard() {
  const coordinatesList = [
    new THREE.Vector2(-cardWidth / 2, -cardHeight / 2),
    new THREE.Vector2(0, -cardHeight / 2),
    new THREE.Vector2(-cardWidth / 12, 0),
    new THREE.Vector2(0, cardHeight / 2),
    new THREE.Vector2(-cardWidth / 2, cardHeight / 2),
  ];

  const shape = new THREE.Shape(coordinatesList);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const mesh = new THREE.Mesh(geometry, whiteMaterial);

  return mesh;
}

function createMiddleOfCard() {
  const bottomCoordinatesList = [
    new THREE.Vector2(0, -cardHeight / 2),
    new THREE.Vector2(cardWidth / 24, -cardHeight / 2),
    new THREE.Vector2(-cardWidth / 72, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 18, -cardHeight / 6),
  ];

  const middleCoordinatesList = [
    new THREE.Vector2(-cardWidth / 18, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 72, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 24, 0),
    new THREE.Vector2(-cardWidth / 72, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 18, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 12, 0),
  ];

  const middleLeftCoordinatesList = [
    new THREE.Vector2(-cardWidth / 18, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 72 - cardWidth / 48, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 24 - cardWidth / 48, 0),
    new THREE.Vector2(-cardWidth / 72 - cardWidth / 48, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 18, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 12, 0),
  ];

  const middleRightCoordinatesList = [
    new THREE.Vector2(-cardWidth / 72 - cardWidth / 48, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 72, -cardHeight / 6),
    new THREE.Vector2(-cardWidth / 24, 0),
    new THREE.Vector2(-cardWidth / 72, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 72 - cardWidth / 48, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 24 - cardWidth / 48, 0),
  ];

  const topCoordinatesList = [
    new THREE.Vector2(-cardWidth / 18, cardHeight / 6),
    new THREE.Vector2(-cardWidth / 72, cardHeight / 6),
    new THREE.Vector2(cardWidth / 24, cardHeight / 2),
    new THREE.Vector2(0, cardHeight / 2),
  ];

  //THIS IS THE FULL MIDDLE BUT THIS IS THE OLD WIDER VERSION
  // const fullCoordList = [
  //   new THREE.Vector2(0, -cardHeight / 2),
  //   new THREE.Vector2(cardWidth / 12, -cardHeight / 2),
  //   new THREE.Vector2(0, 0),
  //   new THREE.Vector2(cardWidth / 12, cardHeight / 2),
  //   new THREE.Vector2(0, cardHeight / 2),
  //   new THREE.Vector2(-cardWidth / 12, 0),
  // ];

  // const fullShape = new THREE.Shape(fullCoordList);
  // const fullGeometry = new THREE.ExtrudeGeometry(fullShape, extrudeSettings);
  // const fullMesh = new THREE.Mesh(fullGeometry, material);

  const bottomShape = new THREE.Shape(bottomCoordinatesList);
  const middleLeftShape = new THREE.Shape(middleLeftCoordinatesList);
  const middleRightShape = new THREE.Shape(middleRightCoordinatesList);

  const topShape = new THREE.Shape(topCoordinatesList);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: false,
  };

  const bottomGeometry = new THREE.ExtrudeGeometry(
    bottomShape,
    extrudeSettings
  );
  // const middleGeomtry = new THREE.ExtrudeGeometry(middleShape, extrudeSettings);
  const middleLeftGeomtry = new THREE.ExtrudeGeometry(
    middleLeftShape,
    extrudeSettings
  );
  const middleRightGeomtry = new THREE.ExtrudeGeometry(
    middleRightShape,
    extrudeSettings
  );

  const topGeomtry = new THREE.ExtrudeGeometry(topShape, extrudeSettings);

  const bottomMesh = new THREE.Mesh(bottomGeometry, darkBlueMaterial);
  // const middleMesh = new THREE.Mesh(middleGeomtry, lightMaterial);
  const middleLeftMesh = new THREE.Mesh(middleLeftGeomtry, lightBlueMaterial);
  const middleRightMesh = new THREE.Mesh(
    middleRightGeomtry,
    lightBlueDarkerMaterial
  );

  const topMesh = new THREE.Mesh(topGeomtry, darkBlueMaterial);
  return [bottomMesh, middleLeftMesh, middleRightMesh, topMesh];
}

function createRightSideOfCard() {
  const coordinatesList = [
    new THREE.Vector2(cardWidth / 24, -cardHeight / 2),
    new THREE.Vector2(cardWidth / 2, -cardHeight / 2),
    new THREE.Vector2(cardWidth / 2, cardHeight / 2),
    new THREE.Vector2(cardWidth / 24, cardHeight / 2),
    new THREE.Vector2(-cardWidth / 24, 0),
  ];

  const shape = new THREE.Shape(coordinatesList);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const mesh = new THREE.Mesh(geometry, darkMaterial);

  return mesh;
}

function createCardTextAndLogo() {
  const companyFontSize = (cardHeight / cardWidth) * 1.2;
  const nameFontSize = (cardHeight / cardWidth) * 1;
  const sloganFontSize = (cardHeight / cardWidth) * 0.6;
  const titleFontSize = (cardHeight / cardWidth) * 0.45;
  const contactFontSize = (cardHeight / cardWidth) * 0.4;
  const companyNameY = -cardHeight * 0.1;

  const loader = new FontLoader();

  // Helper function to load fonts
  function loadFont(url) {
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });
  }

  // Load both fonts
  Promise.all([
    loadFont(
      "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
    ),
    loadFont(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
    ),
    loadFont("https://threejs.org/examples/fonts/gentilis_bold.typeface.json"),
    loadFont(
      "https://threejs.org/examples/fonts/gentilis_regular.typeface.json"
    ),
    loadFont(
      "https://threejs.org/examples/fonts/gentilis_regular.typeface.json"
    ),
    loadFont("https://threejs.org/examples/fonts/optimer_bold.typeface.json"),
    loadFont(
      "https://threejs.org/examples/fonts/optimer_regular.typeface.json"
    ),
  ]).then(
    ([
      helvetiker_bold,
      helvetiker_regularFont,
      gentilis_bold,
      gentilis_regular,
      optimer_bold,
      optimer_regular,
    ]) => {
      const companyNameShapes = helvetiker_bold.generateShapes(
        "JPR CODE",
        companyFontSize,
        5
      );
      const companyNameGeometry = new THREE.ShapeGeometry(companyNameShapes);

      const companyNameMesh = new THREE.Mesh(
        companyNameGeometry,
        blackMaterial
      );
      companyNameMesh.position.set(
        -cardWidth * 0.46,
        companyNameY,
        depth + 0.01
      );
      card.add(companyNameMesh);

      const sloganShape = gentilis_regular.generateShapes(
        "Transforming ideas into reality",
        sloganFontSize,
        5
      );
      const sloganGeometry = new THREE.ShapeGeometry(sloganShape);

      const sloganMesh = new THREE.Mesh(sloganGeometry, blackMaterial);
      sloganMesh.position.set(
        -cardWidth * 0.49,
        companyNameY - 1,
        depth + 0.01
      );
      card.add(sloganMesh);

      const firstNameShapes = gentilis_bold.generateShapes(
        "Jacob",
        nameFontSize,
        5
      );
      const firstNameGeometry = new THREE.ShapeGeometry(firstNameShapes);

      const firstNameMesh = new THREE.Mesh(firstNameGeometry, whiteMaterial);
      firstNameMesh.position.set(1, 0.9, depth + 0.01);
      card.add(firstNameMesh);

      const lastNameShapes = gentilis_regular.generateShapes(
        "Roberson",
        nameFontSize,
        5
      );
      const lastNameGeometry = new THREE.ShapeGeometry(lastNameShapes);

      const lastNameMesh = new THREE.Mesh(
        lastNameGeometry,
        lightBlueDarkerMaterial
      );

      // Adjust the position based on the width of the first word
      let firstNameWidth = 0;
      firstNameShapes.forEach((shape) => {
        shape.getPoints().forEach((point) => {
          if (point.x > firstNameWidth) {
            firstNameWidth = point.x;
          }
        });
      });

      lastNameMesh.position.set(1 + firstNameWidth + 0.1, 0.9, depth + 0.01);
      card.add(lastNameMesh);

      const title1Shapes = gentilis_regular.generateShapes(
        "Founder | Software Engineer",
        titleFontSize,
        5
      );
      const title1Geometry = new THREE.ShapeGeometry(title1Shapes);

      const title1Mesh = new THREE.Mesh(title1Geometry, whiteMaterial);
      title1Mesh.position.set(1.3, 0.4, depth + 0.01);
      card.add(title1Mesh);

      const emailGroup = new THREE.Group();
      emailGroup.name = "emailGroup";

      const emailIconMesh = createLogoMesh(0.5, 0.5, "./icons/email.png");
      emailIconMesh.position.set(1.3, -1 + 0.13, depth + 0.01);
      emailGroup.add(emailIconMesh);

      const emailShape = helvetiker_regularFont.generateShapes(
        "jroberson@jprcode.com",
        contactFontSize,
        5
      );
      const emailGeomtry = new THREE.ShapeGeometry(emailShape);

      const emailMesh = new THREE.Mesh(emailGeomtry, whiteMaterial);
      emailMesh.position.set(emailIconMesh.position.x + 0.4, -1, depth + 0.01);
      emailGroup.add(emailMesh);

      const planeWidth = 4.2;
      const planeHeight = 0.6;
      const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
      });
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      planeMesh.position.set(3.1, -0.9, depth + 0.002);
      emailGroup.add(planeMesh);

      card.add(emailGroup);
    }
  );

  const companyLogoWidth = 2;
  const companyLogoHeight = 2;

  const logoMesh = createLogoMesh(
    companyLogoWidth,
    companyLogoHeight,
    "./icons/logo.png"
  );
  logoMesh.name = "logo";

  logoMesh.position.set(-cardWidth / 3.3, companyNameY + 2.1, depth + 0.01);
  card.add(logoMesh);

  const githubLogoWidth = 1;
  const githubLogoHeight = 1;

  const githubLogoMesh = createLogoMesh(
    githubLogoWidth,
    githubLogoHeight,
    "./icons/github3.png"
  );
  githubLogoMesh.name = "github";

  githubLogoMesh.position.set(cardWidth / 7, -cardHeight / 4, depth + 0.01);
  card.add(githubLogoMesh);

  const linkedInLogoWidth = 1;
  const linkedInLogoHeight = 1;

  const linkedInLogoMesh = createLogoMesh(
    linkedInLogoWidth,
    linkedInLogoHeight,
    "./icons/linkedin.png"
  );
  linkedInLogoMesh.name = "linkedin";

  linkedInLogoMesh.position.set(cardWidth / 4, -cardHeight / 4, depth + 0.01);
  card.add(linkedInLogoMesh);
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D logoTexture;
  uniform vec3 tint;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(logoTexture, vUv);
    gl_FragColor = vec4(texColor.rgb * tint, texColor.a);
  }
`;

function createLogoMesh(width, height, filePath) {
  const logoTexture = new THREE.TextureLoader().load(filePath);

  const logoMaterial = new THREE.ShaderMaterial({
    uniforms: {
      logoTexture: { value: logoTexture },
      tint: { value: new THREE.Color(1, 1, 1) }, // Initial tint color (white, no tint)
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
  });

  const geometry = new THREE.PlaneGeometry(width, height);

  const logoMesh = new THREE.Mesh(geometry, logoMaterial);

  return logoMesh;
}
