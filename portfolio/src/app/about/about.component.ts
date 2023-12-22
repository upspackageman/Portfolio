import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private composer!:EffectComposer;
  private cube!: THREE.Mesh;
 // private composer!:
  cloudParticles:any=[];
  constructor() { }

  ngOnInit(): void {
    this.removeAboutLink();
    this.removeAboutLinkMobile();
    this.initScene();
   // this. redirect();
    this.initHideDetails();
  }

  // @HostListener('window:resize', ['$event'])
  // async update_camera(){
  //   this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .01, 0);
  //   this.camera.position.z = 0;
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  // }
  async redirect() {
    if (!localStorage.getItem('direct')) {
      localStorage.setItem('direct', 'no reload')
      setTimeout(() => {
        location.reload();
      }
        , 1);
    } else {
      localStorage.removeItem('direct');


    }
  }

  @HostListener('window:resize', ['$event'])
  async update_camera(){
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.001, 0);
    this.camera.position.z = 0;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  initScene(){
      this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .001, 0);
      this.camera.position.z = 0;
      this.camera.position.x= 1.16;
      this.camera.rotation.y = -0.12;
      this.camera.rotation.z = 0.27;
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer();
      this.composer = new EffectComposer(this.renderer);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.scene.fog = new THREE.FogExp2(0x03544e, 0.001);
      this.scene.fog.color = new THREE.Color(0x000000);
      this.renderer.setClearColor(this.scene.fog.color);

      let directionalLight = new THREE.DirectionalLight(0xff8c19);
      directionalLight.position.set(0,0,1);
      this.scene.add(directionalLight);
      let orangeLight = new THREE.PointLight(0xFF9A00,101,690,.19);
      orangeLight.position.set(200,300,100);
      this.scene.add(orangeLight);

      let redLight = new THREE.PointLight(0xd8547e,9000,450,.2);
      redLight.position.set(100,300,200);
      this.scene.add(redLight);

      let blueLight = new THREE.PointLight(0x3677,30000,250,.1);
      blueLight.position.set(200,100,1);
      this.scene.add(blueLight);
      let ambient = new THREE.AmbientLight(0xfffff9);
      this.scene.add(ambient);
      let loader = new THREE.TextureLoader();
      const width = 500; // Width of the plane
      const height = 500; // Height of the plane
      const widthSegments = 500; // Number of segments along the width
      const heightSegments = 500; // Number of segments along the height
      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
      this.composer.addPass(bloomPass);


    //   let materialArray = [];
    //   let texture_ft = new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_ft.png');
    //   let texture_bk = new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_bk.png');
    //   let texture_up= new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_up.png');
    //   let texture_dn = new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_dn.png');
    //   let texture_rt = new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_rt.png');
    //   let texture_lf = new THREE.TextureLoader().load('/../assets/ulukai/ulukai/sun_lf.png');

    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_ft}));
    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_bk}));
    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_up}));
    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_dn}));
    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_rt}));
    //   materialArray.push(new THREE.MeshBasicMaterial({map:texture_lf}));

    // for(let i = 0; i< materialArray.length; i++){
    //   materialArray[i].side = THREE.BackSide;
    // }

    // const geometry = new THREE.BoxGeometry(7,7,7);
    // //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // this.cube = new THREE.Mesh(geometry, materialArray);
    // this.scene.add(this.cube);



    loader.load('/../assets/skybox/smoke.png',(texture)=>{
      let cloudGeo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
      let cloudGeoBuffer =new THREE.BufferGeometry();
      cloudGeoBuffer.setAttribute('position', new THREE.BufferAttribute(cloudGeo.attributes['position'].array, 3));
      cloudGeoBuffer.setAttribute('normal', new THREE.BufferAttribute(cloudGeo.attributes['normal'].array, 3));
      cloudGeoBuffer.setAttribute('uv', new THREE.BufferAttribute(cloudGeo.attributes['uv'].array, 2));
     // console.log(cloudGeoBuffer);
      const container = document.getElementById('threejs-about-container');
      if (container) {

        container.appendChild(this.renderer.domElement);
      }
      let cloudMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        transparent:true
      });

    for(let i=0; i<50; i++){
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(Math.random()*2200-600,-25,Math.random() *100-500);
      cloud.rotation.x = .46;
      cloud.rotation.y = -0.2;
      cloud.rotation.z = Math.random()*2*Math.PI;
      cloud.material.opacity = 0.55;
      // cloud.position.x = -.1;
     //  cloud.position.y = .3;
     // console.log(cloud);
      this.cloudParticles.push(cloud);
      this.scene.add(cloud);

    }



  })

 // loader.load('/../assets/skybox/stars3.jpg',(texture)=>{
    // const backgroundMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true,opacity: .85 });
    // const planeGeometry = new THREE.PlaneGeometry(3, 3);

    // const backgroundPlane = new THREE.Mesh(planeGeometry, backgroundMaterial);
    // backgroundPlane.scale.set(this.camera.aspect, 1, 1);
    // backgroundPlane.position.z = -1;
    // backgroundPlane.position.x =1;
    // backgroundPlane.position.y =0;
    // backgroundPlane.renderOrder = -1;

    // const textureEffect:any = new TextureEffect({
    //   blendFunction: BlendFunction.COLOR_DODGE,
    //   texture: texture
    // });

    // textureEffect.blendMode.opacity.value = 0.2;

    // const bloomEffect:any = new BloomEffect({
    //   blendFunction: BlendFunction.COLOR_DODGE,
    //   kernelSize: KernelSize.SMALL,
    //   luminanceThreshold: 0.3,
    //   luminanceSmoothing: 0.75
    // });
    // bloomEffect.blendMode.opacity.value = 1.5;

    // let effectPass:any = new EffectPass(
    //   this.camera,
    //   bloomEffect,
    //   textureEffect
    // );
    // effectPass.renderToScreen = true;
  //  this.composer.addPass(effectPass);
  //  this.composer.addPass(textureEffect);
   // this.composer.addPass(bloomEffect);
  //  this.composer.addPass(effectPass);
  //   this.scene.add(backgroundPlane);
 // });

 //  const starGeometry = new THREE.BufferGeometry();
//   const sparkleVertexShader = `
//   uniform vec3 color;
//   varying vec3 vColor;

//   void main() {
//     vColor = color;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const sparkleFragmentShader = `
//   uniform float time;
//   varying vec3 vColor;

//   void main() {
//     float sparkleIntensity = abs(sin(time * 5.0)) * 0.5 + 0.5; // Adjust this for desired intensity
//     gl_FragColor = vec4(vColor * sparkleIntensity, 1.0);
//   }
// `;

// const sparkleMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     time: { value: 0.0 },
//     color: { value: new THREE.Color(0xFFFFFF) },
//   },
//   vertexShader: sparkleVertexShader,
//   fragmentShader: sparkleFragmentShader,
//   transparent: true
// });
// const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.01  });

//   const starVertices = [];
//   const numStars = 100000; // Adjust the number of stars as needed

//   for (let i = 0; i < numStars; i++) {
//     //sparkleMaterial.uniforms['time'].value += 0.01;
//     starVertices.push(this.generateRandomStarPosition());
//   }

//   starGeometry.setFromPoints(starVertices);
//   const stars = new THREE.Points(starGeometry,starMaterial);
//   console.log(stars)
//   this.scene.add(stars);




    this.render();


  }

  render(){
    for(let i =0; i <this.cloudParticles.length; i++){
      this.cloudParticles[i].rotation.z -= 0.005;
    }
    this.composer.render(.01);
    requestAnimationFrame(this.render.bind(this))
  }

  generateRandomStarPosition() {
    const range = 8000; // Adjust this value to control the range of star positions
    const x = (Math.random() * range - range / 2);
    const y = (Math.random() * range - range / 2);
    const z = (Math.random() * range - (range) / 2);
    return new THREE.Vector3(x, y, z);
  }

  closeAboutDetails(){
    const link = document.querySelector('app-navbar .navbar') as HTMLElement;
    const proj1 = document.getElementById('about-one-myDialog') as HTMLDialogElement;
    const proj2 = document.getElementById('about-two-myDialog') as HTMLDialogElement;
    const proj3 = document.getElementById('about-three-myDialog') as HTMLDialogElement;
    const mobile_selct =  document.getElementById('select-about') as HTMLDialogElement;


      proj1.close();
      proj2.close();
      proj3.close();
      link.style.display='block';
      mobile_selct.style.display='flex';

  }

  removeAboutLink(){
    const link = document.querySelector('app-navbar .navbar .navbar-nav ') as HTMLElement;
    const about_link = link.children[2]  as HTMLElement;
    const proj_link =  link.children[1]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    about_link.style.display='none';
    proj_link.style.display='block';
    home_link.style.display='block';
    contact_link.style.display='block';
  }

  removeAboutLinkMobile(){
    const link = document.querySelector('#dropdown ul') as HTMLElement;
    const about_link = link.children[2]  as HTMLElement;
    const proj_link =  link.children[1]  as HTMLElement;
    const home_link =  link.children[0]  as HTMLElement;
    const contact_link =  link.children[3]  as HTMLElement;
    about_link.style.display='none';
    proj_link.style.display='block';
    home_link.style.display='block';
    contact_link.style.display='block';
  }


  openAboutDetails(num:number = 1){
    const link = document.querySelector('app-navbar .navbar') as HTMLElement;
    const proj1 = document.getElementById('about-one-myDialog') as HTMLDialogElement;
    const proj2 = document.getElementById('about-two-myDialog') as HTMLDialogElement;
    const proj3 = document.getElementById('about-three-myDialog') as HTMLDialogElement;
    const mobile_selct =  document.getElementById('select-about') as HTMLDialogElement;
    
    
    
    if(num===1){
      link.style.display='none';
      proj1.showModal();
      proj2.close();
      proj3.close();
      mobile_selct.style.display='none';
    }
    if(num===2){
      link.style.display='none';
      proj1.close();
      proj2.showModal();
      proj3.close();
      mobile_selct.style.display='none';
    }
    if(num===3){
      link.style.display='none';
      proj1.close();
      proj2.close();
      proj3.showModal();
      mobile_selct.style.display='none';
    }

  }
  @HostListener('window:resize', ['$event'])
  programDetails(num:number = 0){
    const prog_c = document.getElementById('prog_c') as HTMLElement;
    const prog_php = document.getElementById('prog_php') as HTMLElement;
    const prog_js = document.getElementById('prog_js') as HTMLElement;
    const prog_ts = document.getElementById('prog_ts') as HTMLElement;
    const prog_ang = document.getElementById('prog_ang') as HTMLElement;
    const prog_py = document.getElementById('prog_py') as HTMLElement;
    const prog_jsx = document.getElementById('prog_jsx') as HTMLElement;
    const prog_node = document.getElementById('prog_node') as HTMLElement;

    const test_cypress = document.getElementById('test_cypress') as HTMLElement;
    const test_selen = document.getElementById('test_selen') as HTMLElement;
    const test_jenkins = document.getElementById('test_jenkins') as HTMLElement;
    const test_equiv = document.getElementById('test_equiv') as HTMLElement;
    const test_usecase = document.getElementById('test_usecase') as HTMLElement;
    const test_state  = document.getElementById('test_state') as HTMLElement;
    const test_cross = document.getElementById('test_cross') as HTMLElement;

    const prog_c_mobile = document.getElementById('prog_c_mobile') as HTMLElement;
    const prog_php_mobile = document.getElementById('prog_php_mobile') as HTMLElement;
    const prog_js_mobile = document.getElementById('prog_js_mobile') as HTMLElement;
    const prog_ts_mobile = document.getElementById('prog_ts_mobile') as HTMLElement;
    const prog_ang_mobile = document.getElementById('prog_ang_mobile') as HTMLElement;
    const prog_py_mobile = document.getElementById('prog_py_mobile') as HTMLElement;
    const prog_jsx_mobile = document.getElementById('prog_jsx_mobile') as HTMLElement;
    const prog_node_mobile = document.getElementById('prog_node_mobile') as HTMLElement;

    prog_c_mobile.style.display = 'none';
    prog_php_mobile.style.display = 'none';
    prog_js_mobile.style.display = 'none';
    prog_ts_mobile.style.display = 'none';
    prog_ang_mobile.style.display = 'none';
    prog_py_mobile.style.display = 'none';
    prog_jsx_mobile.style.display = 'none';
    prog_node_mobile.style.display = 'none';

    test_cypress.style.display = 'none';
    test_selen.style.display = 'none';
    test_jenkins.style.display = 'none';
    test_equiv.style.display = 'none';
    test_usecase.style.display = 'none';
    test_state.style.display = 'none';
    test_cross.style.display = 'none';

    if(num==1 && window.matchMedia('(max-width:480px)').matches){
      prog_c_mobile.style.display = 'inline';
      prog_c.style.display = 'block';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==2 && window.matchMedia('(max-width:480px)').matches){
      prog_php_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'block';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==3 && window.matchMedia('(max-width:480px)').matches){
      prog_js_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'block';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==4 && window.matchMedia('(max-width:480px)').matches){
      prog_ts_mobile.style.display = 'inline';
      prog_c.style.display = 'none';

      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'block';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==5 && window.matchMedia('(max-width:480px)').matches){
      prog_ang_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'block';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';


    }
    if(num==6 && window.matchMedia('(max-width:480px)').matches){
      prog_py_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'block';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==7 && window.matchMedia('(max-width:480px)').matches){
      prog_jsx_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'block';
      prog_node.style.display = 'none';

    }
    if(num==8 && window.matchMedia('(max-width:480px)').matches){
      prog_node_mobile.style.display = 'inline';
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'block';

    }

    if(num==1 ){
      prog_c.style.display = 'block';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==2){
      prog_c.style.display = 'none';
      prog_php.style.display = 'block';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==3){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'block';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==4){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'block';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==5){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'block';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';


    }
    if(num==6){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'block';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'none';

    }
    if(num==7){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'block';
      prog_node.style.display = 'none';

    }
    if(num==8){
      prog_c.style.display = 'none';
      prog_php.style.display = 'none';
      prog_js.style.display = 'none';
      prog_ts.style.display = 'none';
      prog_ang.style.display = 'none';
      prog_py.style.display = 'none';
      prog_jsx.style.display = 'none';
      prog_node.style.display = 'block';

    }

  }
  @HostListener('window:resize', ['$event'])
  testDetails(num:number = 0){

    const test_cypress = document.getElementById('test_cypress') as HTMLElement;
    const test_selen = document.getElementById('test_selen') as HTMLElement;
    const test_jenkins = document.getElementById('test_jenkins') as HTMLElement;
    const test_equiv = document.getElementById('test_equiv') as HTMLElement;
    const test_usecase = document.getElementById('test_usecase') as HTMLElement;
    const test_state  = document.getElementById('test_state') as HTMLElement;
    const test_cross = document.getElementById('test_cross') as HTMLElement;

    const prog_c = document.getElementById('prog_c') as HTMLElement;
    const prog_php = document.getElementById('prog_php') as HTMLElement;
    const prog_js = document.getElementById('prog_js') as HTMLElement;
    const prog_ts = document.getElementById('prog_ts') as HTMLElement;
    const prog_ang = document.getElementById('prog_ang') as HTMLElement;
    const prog_py = document.getElementById('prog_py') as HTMLElement;
    const prog_jsx = document.getElementById('prog_jsx') as HTMLElement;
    const prog_node = document.getElementById('prog_node') as HTMLElement;



    const test_cypress_mobile = document.getElementById('test_cypress_mobile') as HTMLElement;
    const test_selen_mobile = document.getElementById('test_selen_mobile') as HTMLElement;
    const test_jenkins_mobile = document.getElementById('test_jenkins_mobile') as HTMLElement;
    const test_equiv_mobile = document.getElementById('test_equiv_mobile') as HTMLElement;
    const test_usecase_mobile = document.getElementById('test_usecase_mobile') as HTMLElement;
    const test_state_mobile  = document.getElementById('test_state_mobile') as HTMLElement;
    const test_cross_mobile = document.getElementById('test_cross_mobile') as HTMLElement;


    prog_c.style.display = 'none';
    prog_php.style.display = 'none';
    prog_js.style.display = 'none';
    prog_ts.style.display = 'none';
    prog_ang.style.display = 'none';
    prog_py.style.display = 'none';
    prog_jsx.style.display = 'none';
    prog_node.style.display = 'none';

    if(num==1 && window.matchMedia('(max-width:480px)').matches){
      test_cypress.style.display = 'block';
      test_cypress_mobile.style.display = 'inline';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==2 && window.matchMedia('(max-width:480px)').matches){
      test_cypress.style.display = 'none';
      test_selen_mobile.style.display = 'inline';
      test_selen.style.display = 'block';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==3 && window.matchMedia('(max-width:480px)').matches){
      test_jenkins_mobile.style.display = 'inline';
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'block';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==4 && window.matchMedia('(max-width:480px)').matches){
      test_equiv_mobile.style.display = 'inline';
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'block';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==5 && window.matchMedia('(max-width:480px)').matches){
      test_usecase_mobile.style.display = 'inline';
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'block';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==6 && window.matchMedia('(max-width:480px)').matches){
      test_state_mobile.style.display = 'inline';
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'block';
      test_cross.style.display = 'none';
    }
    if(num==7 && window.matchMedia('(max-width:480px)').matches){
      test_cypress.style.display = 'none';
      test_cross_mobile.style.display = 'inline';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'block';
    }


    if(num==1){
      test_cypress.style.display = 'block';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==2){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'block';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==3){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'block';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==4){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'block';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==5){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'block';
      test_state.style.display = 'none';
      test_cross.style.display = 'none';
    }
    if(num==6){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'block';
      test_cross.style.display = 'none';
    }
    if(num==7){
      test_cypress.style.display = 'none';
      test_selen.style.display = 'none';
      test_jenkins.style.display = 'none';
      test_equiv.style.display = 'none';
      test_usecase.style.display = 'none';
      test_state.style.display = 'none';
      test_cross.style.display = 'block';
    }

  }

  mobileCloseBtn(){
    const prog_c_mobile = document.getElementById('prog_c_mobile') as HTMLElement;
    const prog_php_mobile = document.getElementById('prog_php_mobile') as HTMLElement;
    const prog_js_mobile = document.getElementById('prog_js_mobile') as HTMLElement;
    const prog_ts_mobile = document.getElementById('prog_ts_mobile') as HTMLElement;
    const prog_ang_mobile = document.getElementById('prog_ang_mobile') as HTMLElement;
    const prog_py_mobile = document.getElementById('prog_py_mobile') as HTMLElement;
    const prog_jsx_mobile = document.getElementById('prog_jsx_mobile') as HTMLElement;
    const prog_node_mobile = document.getElementById('prog_node_mobile') as HTMLElement;

    const test_cypress_mobile = document.getElementById('test_cypress_mobile') as HTMLElement;
    const test_selen_mobile = document.getElementById('test_selen_mobile') as HTMLElement;
    const test_jenkins_mobile = document.getElementById('test_jenkins_mobile') as HTMLElement;
    const test_equiv_mobile = document.getElementById('test_equiv_mobile') as HTMLElement;
    const test_usecase_mobile = document.getElementById('test_usecase_mobile') as HTMLElement;
    const test_state_mobile  = document.getElementById('test_state_mobile') as HTMLElement;
    const test_cross_mobile = document.getElementById('test_cross_mobile') as HTMLElement;


    console.log(test_cypress_mobile);

    prog_c_mobile.style.display = 'none';
    prog_php_mobile.style.display = 'none';
    prog_js_mobile.style.display = 'none';
    prog_ts_mobile.style.display = 'none';
    prog_ang_mobile.style.display = 'none';
    prog_py_mobile.style.display = 'none';
    prog_jsx_mobile.style.display = 'none';
    prog_node_mobile.style.display = 'none';


    test_cypress_mobile.style.display = 'none';
    test_selen_mobile.style.display = 'none';
    test_jenkins_mobile.style.display = 'none';
    test_equiv_mobile.style.display = 'none';
    test_usecase_mobile.style.display = 'none';
    test_state_mobile.style.display = 'none';
    test_cross_mobile.style.display = 'none';


  }

  initHideDetails(){
    const prog_c = document.getElementById('prog_c') as HTMLElement;
    const prog_php = document.getElementById('prog_php') as HTMLElement;
    const prog_js = document.getElementById('prog_js') as HTMLElement;
    const prog_ts = document.getElementById('prog_ts') as HTMLElement;
    const prog_ang = document.getElementById('prog_ang') as HTMLElement;
    const prog_py = document.getElementById('prog_py') as HTMLElement;
    const prog_jsx = document.getElementById('prog_jsx') as HTMLElement;
    const prog_node = document.getElementById('prog_node') as HTMLElement;

    const test_cypress = document.getElementById('test_cypress') as HTMLElement;
    const test_selen = document.getElementById('test_selen') as HTMLElement;
    const test_jenkins = document.getElementById('test_jenkins') as HTMLElement;
    const test_equiv = document.getElementById('test_equiv') as HTMLElement;
    const test_usecase = document.getElementById('test_usecase') as HTMLElement;
    const test_state  = document.getElementById('test_state') as HTMLElement;
    const test_cross = document.getElementById('test_cross') as HTMLElement;



    prog_c.style.display = 'none';
    prog_php.style.display = 'none';
    prog_js.style.display = 'none';
    prog_ts.style.display = 'none';
    prog_ang.style.display = 'none';
    prog_py.style.display = 'none';
    prog_jsx.style.display = 'none';
    prog_node.style.display = 'none';


    test_cypress.style.display = 'none';
    test_selen.style.display = 'none';
    test_jenkins.style.display = 'none';
    test_equiv.style.display = 'none';
    test_usecase.style.display = 'none';
    test_state.style.display = 'none';
    test_cross.style.display = 'none';

    this.mobileCloseBtn();


  }

}
