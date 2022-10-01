import {Mesh, MeshStandardMaterial, Scene, SphereGeometry, Texture} from "three";
import {Atmosphere} from "./atmosphere.model";
import {DateTime, Interval} from "luxon";

export class Earth {
  mesh: Mesh;
  geometry: SphereGeometry;
  material: MeshStandardMaterial;
  atmosphere: Atmosphere;

  constructor(private scene: Scene, texture: Texture) {
    this.geometry = new SphereGeometry(6371, 100, 100);
    this.material = new MeshStandardMaterial({
      map: texture
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.atmosphere = new Atmosphere(this.scene);
    this.#initialize();
  }

  #initialize() {
    this.mesh.rotateY(1.57 * 3);
    this.mesh.rotateY(this.#getAngleFromDate());
    this.mesh.position.set(0, 0, 150000000);
    this.scene.add(this.mesh);
  }

  #getAngleFromDate() {
    const startOfDay = DateTime.now().toUTC().startOf('day');
    const now = DateTime.now().toUTC();
    return Interval.fromDateTimes(startOfDay, now).length('seconds') * 0.00007272205;
  }

}
