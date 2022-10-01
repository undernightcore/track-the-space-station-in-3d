import {AdditiveBlending, BackSide, Mesh, Scene, ShaderMaterial, SphereGeometry} from "three";

export class Atmosphere {
  mesh: Mesh;
  geometry: SphereGeometry;
  material: ShaderMaterial;

  constructor(private scene: Scene) {
    this.geometry = new SphereGeometry(6371, 100, 100);
    this.material = new ShaderMaterial({
      vertexShader:
        "varying vec3 vertexNormal; void main() {vertexNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}",
      fragmentShader:
        "varying vec3 vertexNormal ; void main ( ) {float intensity = pow(0.4 - dot (vertexNormal , vec3 ( 0 , 0 , 1.0 ) ) , 2.0 ) ; gl_FragColor = vec4 ( 0.3 , 0.6 , 1.0 , 1.0 ) * intensity ; }",
      blending: AdditiveBlending,
      side: BackSide
    })
    this.mesh = new Mesh(this.geometry, this.material);
    this.#initialize();
  }

  #initialize() {
    this.mesh.scale.set(1.3, 1.3, 1.3);
    this.mesh.position.set(0, 0, 150000000);
    this.scene.add(this.mesh);
  }
}
