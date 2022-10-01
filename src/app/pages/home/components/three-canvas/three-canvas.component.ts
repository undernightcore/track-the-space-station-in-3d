import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Camera, Renderer, Scene} from "three";
import {RendererService} from "../../../../services/renderer.service";
import {debounceTime, delay, forkJoin, fromEvent, startWith} from "rxjs";
import {Earth} from "../../../../models/earth.model";
import {LoaderService} from "../../../../services/loader.service";
import {Sun} from "../../../../models/sun.model";

@Component({
  selector: 'app-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements AfterViewInit {

  renderer!: Renderer;
  camera!: Camera;
  scene!: Scene;
  earth!: Earth;
  sun!: Sun;

  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  constructor(private rendererService: RendererService, private loaderService: LoaderService) { }

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
    this.scene = new Scene();
    this.renderer = this.rendererService.renderer;
    this.camera = this.rendererService.camera;
    this.#createCanvasContainer();
    this.rendererService.resizeRenderer();
  }

  #initializeObjects() {
    forkJoin({
        earth: this.#getEarth(),
        sun: this.#getSun()
      }).pipe(delay(2000),startWith(null)).subscribe((textures)=>{
        if (textures === null){
          console.log('loading')
        }else{
          console.log('not loading')
          this.sun = new Sun(this.scene,textures.sun)
          this.earth = new Earth(this.scene, textures.earth)
        }
      }
    )
  }

  #getEarth() {
    return this.loaderService.loadTexture('assets/textures/8k_earth_daymap.jpeg')
  }

  #getSun() {
    return this.loaderService.loadTexture('assets/textures/8k_sun.jpeg')
  }

  #createCanvasContainer() {
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  #startThreeLoop = () => {
    requestAnimationFrame( this.#startThreeLoop );
    this.renderer.render( this.scene, this.camera );
  }

}
