import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {RendererService} from "../../../../services/renderer.service";
import {debounceTime, delay, forkJoin, fromEvent, startWith} from "rxjs";
import {Earth} from "../../../../models/earth.model";
import {LoaderService} from "../../../../services/loader.service";
import {Sun} from "../../../../models/sun.model";
import {Stars} from "../../../../models/stars.model";
import {TLEService} from "../../../../services/tle.service";
import {ISS} from "../../../../models/iss.model";
import {AppManagerService} from "../../../../services/app-manager.service";
import {gsap} from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
  selector: 'app-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements AfterViewInit {

  renderer!: WebGLRenderer;
  camera!: PerspectiveCamera;
  controls!: OrbitControls;
  scene!: Scene;
  earth?: Earth;
  sun!: Sun;
  stars!: Stars;
  iss!: ISS;

  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  constructor(
    private rendererService: RendererService,
    private loaderService: LoaderService,
    private appManagerService: AppManagerService,
    private tleService: TLEService
  ) {
  }

  ngAfterViewInit(): void {
    this.#initializeThree();
    this.#handleResizing();
    this.#startThreeLoop();
    this.#initializeObjects();


  }


  #handleResizing() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.rendererService.resizeRenderer();
      })
  }

  #initializeThree() {
    this.tleService.storeISSTLEnow();
    this.scene = new Scene();
    this.renderer = this.rendererService.renderer;
    this.camera = this.rendererService.camera;
    this.controls = this.rendererService.controls;
    this.#createCanvasContainer();
    this.rendererService.resizeRenderer();
  }

  #initializeObjects() {
    forkJoin({
      earth: this.#getEarth(),
      darkEarth: this.#getDarkEarth(),
      sun: this.#getSun(),
      iss: this.#getISS(),
      audio: this.#getAudio()
    }).pipe(delay(2000), startWith(null)).subscribe((textures) => {
        if (!textures) return;
        this.rendererService.setMusic(textures.audio);
        this.appManagerService.loading.next(false);
        this.sun = new Sun(this.scene, textures.sun)
        this.earth = new Earth(this.scene, textures.earth, textures.darkEarth)
        this.stars = new Stars(this.scene, 5000)
        this.iss = new ISS(this.scene, textures.iss)
        this.appManagerService.ready.subscribe((status) => {
          if (!status) return;
          this.#startZoomAnimation()
          this.#playMusic();
        })
      }
    )
  }

  #playMusic() {
    this.rendererService.backSound.play();
  }

  #getAudio() {
    return this.loaderService.loadAudio('assets/music/bgMusic.mp3');
  }

  #getEarth() {
    return this.loaderService.loadTexture('assets/textures/8k_earth_daymap.jpeg')
  }

  #getDarkEarth() {
    return this.loaderService.loadTexture('assets/textures/8k_earth_nightmap.jpeg')
  }

  #getSun() {
    return this.loaderService.loadTexture('assets/textures/8k_sun.jpeg')
  }

  #getISS() {
    return this.loaderService.loadModel('assets/models/ISS_stationary.glb')
  }

  #startZoomAnimation() {
    gsap.fromTo(this.camera.position,
      {
        z: 149800000
      },
      {
        z: 150000000 - 6371 - 20000,
        duration: 3,
        onStart: () => {
          this.rendererService.controls.update();
        },
        onUpdate: () => {
          this.camera.updateProjectionMatrix();
        }
      }
    )
  }


  #createCanvasContainer() {
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  #updateISSposition() {
    const earthPosition = this.earth?.mesh.position
    const ISScords = this.tleService.getGeocentricISSCords();

    if (earthPosition && typeof ISScords === "object") {
      const issFinalCords = {
        x: earthPosition.x + ISScords.x,
        y: earthPosition.y + ISScords.y,
        z: earthPosition.z + ISScords.z,
      }
      this.iss.gltf.scene.position.set(issFinalCords.x, issFinalCords.y, issFinalCords.z)
    }
  }


  #rotateEarth() {
    this.earth?.mesh.rotateY(0.00007292123513278419 / 60);
  }

  #startThreeLoop = () => {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
      this.#rotateEarth();
      this.#updateISSposition();
      this.controls.update();
      this.tleService.issPosition.next(this.tleService.getISSLatLongTLEnow())
    })
  }

}
