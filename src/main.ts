import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Man } from "./man.js";
import { whiteMaterial } from "./materials.js";

const loader = new GLTFLoader();
const clock = new THREE.Clock();

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  32,
  window.innerWidth / window.innerHeight
);
camera.position.set(0.53, 0.5, 3);
// const controls = new OrbitControls(camera, renderer.domElement);

camera.updateProjectionMatrix();

const light = new THREE.DirectionalLight();
light.castShadow = true;
light.intensity = 3;
light.position.set(3, 2, 4);
light.lookAt(0.4, 0.2, 0);

const ambientLight = new THREE.AmbientLight(0xf7fdff, 0.3);

const textModel = await loader.loadAsync("/gmtext.glb");
const backgroundModel = await loader.loadAsync("/background.glb");

const gmMesh = textModel.scene.children[0] as THREE.Mesh;
gmMesh.material = whiteMaterial;
gmMesh.castShadow = true;
gmMesh.position.y = -0.08;

const backgroundMesh = backgroundModel.scene.children[0] as THREE.Mesh;
backgroundMesh.material = whiteMaterial;
backgroundMesh.receiveShadow = true;

const dancingMan = await Man.init("/dancingdude.glb", [0.02, 0.978, 0]);
const sittingMan = await Man.init("/sittingdude.glb", [0.8, 0, 0.13]);

scene.add(
  light,
  textModel.scene,
  backgroundModel.scene,
  dancingMan.scene,
  sittingMan.scene,
  ambientLight
);

renderer.setAnimationLoop(render);
function render() {
  const delta = clock.getDelta();
  dancingMan.update(delta);
  sittingMan.update(delta);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});
window.addEventListener("click", () => {
  dancingMan.animation("Armature.003");
  sittingMan.animation("Armature.003");
});
document.body.appendChild(renderer.domElement);
