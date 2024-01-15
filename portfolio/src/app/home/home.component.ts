import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private frameId: number | null = null;
  private controls!: OrbitControls;

  constructor() { }
  async ngOnDestroy(): Promise<void> {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  async ngOnInit(): Promise<void> {
    this.home_initScene();
    this.home_animate();
    this.removeHomeLink();
    this.removeHomeLinkMobile();
    this.redirect();
  }

  removeHomeLink(){
    const link = document.querySelector('app-navbar .navbar .navbar-nav ') as HTMLElement;
    const proj_link = link.children[1]  as HTMLElement;
    const about_link =  link.children[2]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    proj_link.style.display='block';
    about_link.style.display='none';
    home_link.style.display='none';
    contact_link.style.display='block';
  }

  removeHomeLinkMobile(){
    const link = document.querySelector('#dropdown ul') as HTMLElement;
    const proj_link = link.children[1]  as HTMLElement;
    const about_link =  link.children[2]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    proj_link.style.display='block';
    about_link.style.display='block';
    home_link.style.display='none';
    contact_link.style.display='block';

  }

  async redirect() {
    if (!localStorage.getItem('1direct')) {
      localStorage.setItem('1direct', 'no reload')
      setTimeout(() => {
        location.reload();
      }
        );
    } else {
      localStorage.removeItem('1direct');


    }
  }

  @HostListener('window:resize', ['$event'])
  async home_update_camera(){
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.camera.position.z = 0;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async home_initScene(): Promise<void> {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('threejs-home-container');
    if (container) {
      container.appendChild(this.renderer.domElement);
    }



    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('/../assets/penguins/mystic_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('/../assets/penguins/mystic_bk.jpg');
    let texture_up= new THREE.TextureLoader().load('/../assets/penguins/mystic_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('/../assets/penguins/mystic_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('/../assets/penguins/mystic_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('/../assets/penguins/mystic_lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}));

    for(let i = 0; i< materialArray.length; i++){
      materialArray[i].side = THREE.BackSide;
    }

    const geometry = new THREE.BoxGeometry(700,700,700);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, materialArray);
    this.scene.add(this.cube);

    this.camera.position.z = 150;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => {
      // Handle the change event here
      // For example, you can trigger rendering or other actions
      this.renderer.render(this.scene, this.camera);
    });
  }

  async home_animate(): Promise<void> {
    this.frameId = requestAnimationFrame(() => {
      this.home_animate();
    });

    // if (this.cube) {
    //   this.cube.rotation.x += 0.01;
       this.cube.rotation.y += 0.005;
    // }

    if (this.renderer && this.scene && this.camera) {
     this.renderer.render(this.scene, this.camera);
    }
  }
}







