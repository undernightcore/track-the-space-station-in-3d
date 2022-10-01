import { Injectable } from '@angular/core';
import { TextureLoader} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  #textureLoader: TextureLoader;
  #modelLoader: GLTFLoader;

  constructor() {
    this.#textureLoader = new TextureLoader();
    this.#modelLoader = new GLTFLoader();
  }

  loadTexture(url: string) {
    return from(this.#textureLoader.loadAsync(url));
  }

  loadModel(url: string) {
    return from(this.#modelLoader.loadAsync(url));
  }
}
