import "./style.css";
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// debugger
const gui = new GUI();

// setup
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xAFCAE3 ); // changeing scene color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

// Orbit controls
//const controls = new OrbitControls(camera, renderer.domElement);

camera.position.y = -80;
camera.position.z = 30;
camera.rotation.x = 90 * Math.PI / 180;

//pos
// x: -11.886, y: -85.45, z: 59.673
//rotation
// x: 1.23, y: -2.334, z: 6.590

// create light
const light = new THREE.PointLight(0xFFFFF); // soft white light
light.position.setY(-4)
scene.add(light);


const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize );
scene.add( pointLightHelper );

// light gui
const lightGui = gui.addFolder("Light");

lightGui.add(light.position, "x").min(-10).max(100).step(0.1).name("position x");
lightGui.add(light.position, "y").min(-1000).max(100).step(0.1).name("position y");
lightGui.add(light.position, "z").min(0).max(100).step(0.1).name("position z");

// Create plane
const planeGeometry = new THREE.PlaneGeometry(200, 75);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xD83A3A, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
// Plane gui
const planeGui = gui.addFolder("Plane");

planeGui.add(plane.scale, "x").min(0).max(10).step(0.1);//2.9
planeGui.add(plane.scale, "y").min(0).max(10).step(0.1);//1.2

// create cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xA34CF4 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

cube.position.setZ(cube.geometry.parameters.height / 2);
light.position.setZ(10 + cube.geometry.parameters.height)


// gui.add(cube.scale, 'x');
let speed = grossWpm;
renderer.render(scene, camera);
let cubeDirection = 1;
function animator() {
    // Update objects
    cube.position.x += (grossWpm / 100) * cubeDirection;
    //camera.position.setX(cube.position.x); // follow cube
    light.position.setX(cube.position.x)
    //controls.update(); // update camera controls

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animator)
};

animator();

// countdown timer checks cube position every 1s instead of checking in animator which checks I think 144/s
setInterval(function () {
    if(cube.position.x > 10){
        cubeDirection = -1;
    } else if(cube.position.x < -10){
        cubeDirection = 1;
    }
    speed = grossWpm;
}, 100);


