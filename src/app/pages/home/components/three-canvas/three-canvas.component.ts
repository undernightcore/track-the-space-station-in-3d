import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Camera, Renderer, Scene} from "three";
import {RendererService} from "../../../../services/renderer.service";
import {debounceTime, fromEvent} from "rxjs";

@Component({
  selector: 'app-three-canvas',
  templateUrl: './three-canvas.component.html',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements AfterViewInit {

  renderer!: Renderer;
  camera!: Camera;
  scene!: Scene;

  @ViewChild('canvasContainer') canvasContainer!: ElementRef;

  constructor(private rendererService: RendererService) { }

  ngAfterViewInit(): void {
    this.#initializeThree();
    this.#handleResizing();
    this.#startThreeLoop();
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

  #createCanvasContainer() {
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  #startThreeLoop = () => {
    requestAnimationFrame( this.#startThreeLoop );
    this.renderer.render( this.scene, this.camera );
  }

}
