import {Geometry} from "three/examples/jsm/deprecated/Geometry";
import {Mesh, MeshBasicMaterial, PointLight, Scene, Texture} from "three";
import {ParametricGeometries} from "three/examples/jsm/geometries/ParametricGeometries";
import SphereGeometry = ParametricGeometries.SphereGeometry;

export class Sun {

  geometry!: SphereGeometry;
  material!: MeshBasicMaterial;
  mesh!: Mesh;
  light!: PointLight;

  constructor(private scene: Scene, private texture: Texture) {
    this.geometry = new SphereGeometry(695700, 100, 100);
    this.material = new MeshBasicMaterial({
      map: this.texture
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.light = new PointLight('#ffffff');
    this.#initialize();
  }

  #initialize() {
    this.scene.add(this.light);
    this.scene.add(this.mesh);
  }

}
