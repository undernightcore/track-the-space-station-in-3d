import {BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene} from "three";

export class Stars {

  points!: Points;
  geometry: BufferGeometry;
  material: PointsMaterial;

  constructor(private scene: Scene, private amount: number) {
    this.geometry = new BufferGeometry();
    this.material = new PointsMaterial({color: 0xffffff})
    this.#initialize();
  }

  #initialize() {
    let coods: number[] = new Array(this.amount * 3).fill(0)
      .map(() => (Math.random() - 0.5) * 2000000000);
    this.geometry.setAttribute('position', new Float32BufferAttribute(coods, 3));
    this.geometry.scale ( 90, 90, 90);
    this.points = new Points(this.geometry, this.material);
    this.scene.add(this.points);
  }
}
