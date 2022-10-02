import {Scene} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

export class ISS {
  gltf: GLTF;

  constructor(private scene: Scene, model: GLTF) {
    this.gltf = model
    this.#initialize();
  }

  #initialize() {
    this.gltf.scene.position.set(0, 0, 0)
    this.gltf.scene.scale.set(5, 5, 5)
    this.scene.add(this.gltf.scene);
  }
}
