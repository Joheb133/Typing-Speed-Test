import "./style.css";
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// debugger
const gui = new GUI();

// setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAFCAE3); // changeing scene color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.y = -80;
camera.position.z = 30;
camera.rotation.x = 80 * Math.PI / 180;


// create light
const light = new THREE.PointLight(0xFFFFF); // soft white light
light.position.setY(-4)
scene.add(light);


const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
scene.add(pointLightHelper);

// light gui
const lightGui = gui.addFolder("Light");

lightGui.add(light.position, "x").min(-10).max(100).step(0.1).name("position x");
lightGui.add(light.position, "y").min(-1000).max(100).step(0.1).name("position y");
lightGui.add(light.position, "z").min(0).max(100).step(0.1).name("position z");

// Create plane
const planeGeometry = new THREE.PlaneGeometry(500, 50);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xD83A3A, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const planeWidth = plane.geometry.parameters.width;
let planePosition = plane.position.x;

// 2nd Plane
const planeTwoGeometry = new THREE.PlaneGeometry(500, 50);
const planeTwoMaterial = new THREE.MeshBasicMaterial({ color: 0x4573d6, side: THREE.DoubleSide });
const planeTwo = new THREE.Mesh(planeTwoGeometry, planeTwoMaterial);
scene.add(planeTwo);

const planeTwoWidth = planeTwo.geometry.parameters.width;

planeTwo.position.setX((planeWidth + planeTwoWidth) / 2)
let planeTwoPosition = planeTwo.position.x;

// create cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xA34CF4 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

cube.position.setZ(cube.geometry.parameters.height / 2);
cube.position.setX(-220);
light.position.setZ(10 + cube.geometry.parameters.height);


// gui.add(cube.scale, 'x');
renderer.render(scene, camera);
let cubeDirection = 1;
function animator() {
    // Update objects
    cube.position.x += (grossWpm / 100) * cubeDirection;
    camera.position.setX(cube.position.x); // follow cube
    light.position.setX(cube.position.x)
    //controls.update(); // update camera controls

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animator)
};

animator();

// countdown timer checks cube position every 1s instead of checking in animator which checks I presume is 144/s
setInterval(function () {
    // Code checks if plane is beneath cube, if not then move the plane in front since its not being seen
    // This prevents the need to load in an extremely long plane to ensure theres always a plane beneath the cube 
    // This works by teleporting the plane out of view in front of the plane in view.
    if (cube.position.x >= planeWidth / 2 + planePosition) {
        plane.position.setX((planeWidth + planeTwoWidth) / 2 + planeTwoPosition);
        planePosition = plane.position.x;
    }
    else if (cube.position.x >= planeTwoWidth / 2 + planeTwoPosition) {
        planeTwo.position.setX((planeWidth + planeTwoWidth) / 2 + planePosition);
        planeTwoPosition = planeTwo.position.x;
    }
}, 100);


