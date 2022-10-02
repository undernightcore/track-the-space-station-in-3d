import { Injectable } from '@angular/core';
import {AudioLoader, TextureLoader} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  #textureLoader: TextureLoader;
  #modelLoader: GLTFLoader;
  #audioLoader: AudioLoader;

  constructor() {
    this.#textureLoader = new TextureLoader();
    this.#modelLoader = new GLTFLoader();
    this.#audioLoader = new AudioLoader();
  }

  loadTexture(url: string) {
    return from(this.#textureLoader.loadAsync(url));
  }

  loadModel(url: string) {
    return from(this.#modelLoader.loadAsync(url));
  }

  loadAudio(url: string) {
    return from(this.#audioLoader.loadAsync(url));
  }
}
