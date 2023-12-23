import {
  AnimationClip,
  AnimationMixer,
  Group,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { blueMaterial, brownMaterial, skinMaterial } from "./materials.js";

function setMaterial(c: Group, name: string, material: MeshStandardMaterial) {
  const item = c.getObjectByName(name);
  if (item != null && item instanceof Mesh) {
    item.material = material;
  }
}

export class Man {
  #mixer: AnimationMixer;
  #clips: AnimationClip[];
  #gltf: GLTF;
  private constructor(gltf: GLTF, clips: AnimationClip[]) {
    this.#gltf = gltf;
    this.#clips = clips;
    this.#mixer = new AnimationMixer(this.#gltf.scene);
  }

  static async init(
    file: string,
    position: [number, number, number]
  ): Promise<Man> {
    const loader = new GLTFLoader();
    const model = await loader.loadAsync(file);
    model.scene.position.set(position[0], position[1], position[2]);

    setMaterial(model.scene, "Scruffy_Jacket003", blueMaterial);
    setMaterial(model.scene, "Scruffy_Hat003", blueMaterial);
    setMaterial(model.scene, "Scruffy_Body003", skinMaterial);
    setMaterial(model.scene, "Scruffy_Mustache009", brownMaterial);
    setMaterial(model.scene, "Scruffy_Mustache010", brownMaterial);
    setMaterial(model.scene, "Scruffy_Mustache011", brownMaterial);

    // Pants are a group.
    setMaterial(model.scene, "Plane018", blueMaterial);
    setMaterial(model.scene, "Plane022", blueMaterial);

    // setMaterial(model.scene, blueMaterial);
    const clips = model.animations;
    return new Man(model, clips);
  }

  get scene() {
    return this.#gltf.scene;
  }
  update(deltaTime: number) {
    this.#mixer.update(deltaTime * this.#mixer.timeScale);
  }
  animation(name: string) {
    console.log(this.#clips);
    const clip = AnimationClip.findByName(this.#clips, name);
    const action = this.#mixer.clipAction(clip);
    action.play();
  }
}
