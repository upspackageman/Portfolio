import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private frameId: number | null = null;
  private controls!: OrbitControls;
  toshow:boolean= false;

  constructor(private ngZone: NgZone) { }
  async ngOnDestroy(): Promise<void> {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  async ngOnInit(): Promise<void> {
    this.removeProjectLinkMobile();
      this.removeProjectLink();
    this.redirect();
    
  }

  @HostListener('window:resize', ['$event'])
  async project_update_camera(){
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.camera.position.z = 0;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async project_initScene(): Promise<void> {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('threejs-projects-container');
    if (container) {
      container.appendChild(this.renderer.domElement);
    }



    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('/../assets/envmap/stormydays_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('/../assets/envmap/stormydays_bk.jpg');
    let texture_up= new THREE.TextureLoader().load('/../assets/envmap/stormydays_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('/../assets/envmap/stormydays_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('/../assets/envmap/stormydays_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('/../assets/envmap/stormydays_lf.jpg');

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
    this.controls.enabled = false;
    // this.controls.addEventListener('change', () => {
    //   // Handle the change event here
    //   // For example, you can trigger rendering or other actions
    //   this.renderer.render(this.scene, this.camera);
    // });
  }

  async redirect() {
    if (!localStorage.getItem('_direct')) {
    
      localStorage.setItem('_direct', 'no reload')
     
      setTimeout(() => {
        location.reload();
        this.project_isMobile();
        this.selectedProject(5);
        this.project_animate();
      }
        , 0);
    } else {
        localStorage.removeItem('_direct');
        this.project_initScene();
        this.project_animate();
        this.selectedProject();
        this.project_isMobile();


    }
  }

  async project_animate(): Promise<void> {
    this.frameId = requestAnimationFrame(() => {
      this.project_animate();
    });

    if (this.cube) {
      //this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.005;
    }

    if (this.renderer && this.scene && this.camera) {
     this.renderer.render(this.scene, this.camera);
    }
  }


  @HostListener('window:resize', ['$event'])
  project_isMobile(){
    const proj1 = document.getElementById('project-one') as HTMLElement;
    const proj2 = document.getElementById('project-two') as HTMLElement;;
    const proj3 = document.getElementById('project-three') as HTMLElement;;
    const projList = document.getElementById('proj-list') as HTMLElement;
    if (window.matchMedia('(max-width:640px)').matches) {
      proj1.style.display='none';
      proj2.style.display = 'none';
      proj3.style.display = 'none';
      projList.style.display = 'none';
    }

  }

  removeProjectLink(){

    const link = document.querySelector('app-navbar .navbar .navbar-nav ') as HTMLElement;
    const proj_link = link.children[1]  as HTMLElement;
    const about_link =  link.children[2]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    proj_link.style.display='none';
    about_link.style.display='block';
    home_link.style.display='block';
    contact_link.style.display='block';
  }

  removeProjectLinkMobile(){
    const link = document.querySelector('#dropdown ul') as HTMLElement;
    const proj_link = link.children[1]  as HTMLElement;
    const about_link =  link.children[2]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    proj_link.style.display='none';
    about_link.style.display='block';
    home_link.style.display='block';
    contact_link.style.display='block';

  }

  closeProjectDetails(){
    const proj1 = document.getElementById('project-one-myDialog') as HTMLDialogElement;
    const proj2 = document.getElementById('project-two-myDialog') as HTMLDialogElement;
    const proj3 = document.getElementById('project-three-myDialog') as HTMLDialogElement;
    const proj4 = document.getElementById('project-four-myDialog') as HTMLDialogElement;
    const mobile_selct =  document.getElementById('mobile-selection') as HTMLDialogElement;


      proj1.close();
      proj2.close();
      proj3.close();
      proj4.close();
      mobile_selct.style.display='flex';

  }

  openProjectDetails(num:number = 1){
    const proj1 = document.getElementById('project-one-myDialog') as HTMLDialogElement;
    const proj2 = document.getElementById('project-two-myDialog') as HTMLDialogElement;
    const proj3 = document.getElementById('project-three-myDialog') as HTMLDialogElement;
    const proj4 = document.getElementById('project-four-myDialog') as HTMLDialogElement;
    const mobile_selct =  document.getElementById('mobile-selection') as HTMLDialogElement;
    const scroll1 = document.getElementById('project-one-myDialog-scroll') as HTMLDialogElement;
    const scroll2 = document.getElementById('project-two-myDialog-scroll') as HTMLDialogElement;
    const scroll3 = document.getElementById('project-three-myDialog-scroll') as HTMLDialogElement;
    const scroll4 = document.getElementById('project-four-myDialog-scroll') as HTMLDialogElement;
    // console.log(getscroll[0]);
    // console.log(getscroll[0].scrollTop = 0);
    // for(let i = 0; i < getscroll.length; i++){
    //   if (getscroll.length > 0) {
    //     getscroll[i].scrollTop = 0;
    //   }
     
    // }

    if(num===1){
     
      proj1.showModal();
      scroll1.scrollTo(0, 0);
      proj2.close();
      proj3.close();
      mobile_selct.style.display='none';
    }
    if(num===2){

      proj1.close();
      proj2.showModal();
      scroll2.scrollTo(0, 0);
      proj3.close();
      mobile_selct.style.display='none';
    }
    if(num===3){

      proj1.close();
      proj2.close();
      proj3.showModal();
      scroll3.scroll(0, 0);
      mobile_selct.style.display='none';
    }
    if(num===4){
      mobile_selct.style.display='none';
      proj1.close();
      proj2.close();
      proj3.close();
      proj4.showModal();
      scroll4.scroll(0, 0);
      
    }

  }

  selectedProject(num:number =1){
    const proj1 = document.getElementById('project-one') as HTMLElement ;
    const proj2 = document.getElementById('project-two')  as HTMLElement;
    const proj3 = document.getElementById('project-three')  as HTMLElement;
    const proj4 = document.getElementById('project-four')  as HTMLElement;
    if ((num===5)){
      proj1.style.display='none';
      proj2.style.display = 'none';
      proj3.style.display = 'none';
      proj4.style.display = 'none';
    }

    if(num===1){
      proj1.style.display='flex';
      proj2.style.display = 'none';
      proj3.style.display = 'none';
      proj4.style.display = 'none';

    }
    if(num===2){
      proj1.style.display='none';
      proj2.style.display = 'flex';
      proj3.style.display = 'none';
      proj4.style.display = 'none';
    }
    if(num===3){
      proj1.style.display='none';
      proj2.style.display = 'none';
      proj3.style.display = 'flex';
      proj4.style.display = 'none';
    }

    if(num===4){
      proj1.style.display='none';
      proj2.style.display = 'none';
      proj3.style.display = 'none';
      proj4.style.display = 'flex';
      console.log(proj4)
    }

  }
}







