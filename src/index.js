import "./style.css";
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// debugger
const gui = new GUI();

// setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAFCAE3); // changeing scene color
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.y = -10;
camera.position.z = 5;
camera.rotation.x = 80 * Math.PI / 180;

// create light
const light = new THREE.PointLight(0xFFFFF); // soft white light
light.position.setY(-8)
scene.add(light);


const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
scene.add(pointLightHelper);

// light gui
const lightGui = gui.addFolder("Light");

lightGui.add(light.position, "x").min(-10).max(100).step(0.1).name("position x");
lightGui.add(light.position, "y").min(-1000).max(100).step(0.1).name("position y");
lightGui.add(light.position, "z").min(0).max(100).step(0.1).name("position z");

// Ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFF);
scene.add(ambientLight);
ambientLight.intensity = 0.4;

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

// Load asset
const loader = new GLTFLoader();
let golf_vw;
loader.load('models/golf_vw.gltf', function (gltf) {
    golf_vw = gltf.scene.children[0];
    golf_vw.position.set(-220, 0, 0.5);
    golf_vw.rotation.z = Math.PI / 2;
    golf_vw.rotation.x = 180 * Math.PI / 2;

    scene.add(gltf.scene);
    light.position.setZ(10 + golf_vw.position.y);
    //controls.target = golf_vw;
    animator(); // start animator after asset is

}, undefined, function (error) {
	console.error(error);
});

// Load text
const fontLoader = new FontLoader();
fontLoader.load("fonts/Lucida Sans Typewriter_Regular.json", function(font){
    let geometrySetting = {
        font: font,
        size: 1,
        height: 0,
        curveSegments: 20,
    }
    const textGeometry = new TextGeometry("game", geometrySetting);
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
    const textExample = new THREE.Mesh(textGeometry, textMaterial);

    textExample.position.set(-221, -3, 0.01);
    scene.add(textExample)
});






renderer.render(scene, camera);
function animator() {
    // Update objects
    golf_vw.position.x += (grossWpm / 100);
    camera.position.setX(golf_vw.position.x); // follow car
    light.position.setX(golf_vw.position.x)
    //controls.update(); // update camera controls

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animator)
};



// countdown timer checks cube position every 100ms instead of checking in animator which checks I presume is 144/s
setInterval(function () {
    // Code checks if plane is beneath cube, if not then move the plane in front since its not being seen
    // This prevents the need to load in an extremely long plane to ensure theres always a plane beneath the cube 
    // This works by teleporting the plane out of view in front of the plane in view.
    if (golf_vw.position.x >= planeWidth / 2 + planePosition) {
        plane.position.setX((planeWidth + planeTwoWidth) / 2 + planeTwoPosition);
        planePosition = plane.position.x;
    }
    else if (golf_vw.position.x >= planeTwoWidth / 2 + planeTwoPosition) {
        planeTwo.position.setX((planeWidth + planeTwoWidth) / 2 + planePosition);
        planeTwoPosition = planeTwo.position.x;
    }
}, 100);


