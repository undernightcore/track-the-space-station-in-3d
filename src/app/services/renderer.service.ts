import {Injectable} from '@angular/core';
import {Audio, AudioListener, AudioLoader, PerspectiveCamera, Vector3, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  #camera: PerspectiveCamera;
  #controls: OrbitControls;
  #renderer: WebGLRenderer;
  #listener: AudioListener;
  #audioLoader: AudioLoader;
  #bgSound: Audio;

  constructor() {
    this.#renderer = new WebGLRenderer({antialias: true});
    this.#listener = new AudioListener();
    this.#audioLoader = new AudioLoader();
    this.#bgSound = new Audio(this.#listener);
    this.#camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 900000000);
    this.#camera.add(this.#listener);
    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    this.#initialize();
  }

  #initialize() {
    this.#controls.target = new Vector3(0, 0, 150000000);
    this.#controls.enableDamping = true;
    this.#controls.dampingFactor = 0.05;
    this.#audioLoader.load('assets/music/bgMusic.mp3', (buffer)=>{
      this.#bgSound.setBuffer(buffer);
      this.#bgSound.setLoop(true);
      this.#bgSound.setVolume(0.4);
    })
    this.resizeRenderer();
  }

  get renderer() {
    return this.#renderer;
  }

  get camera() {
    return this.#camera;
  }

  get controls() {
    return this.#controls;
  }

  get backSound() {
    return this.#bgSound;
  }

  resizeRenderer() {
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    this.#camera.updateProjectionMatrix();
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
