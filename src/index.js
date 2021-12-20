import "./style.css";
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

let renderer, scene, camera;
let plane, planeTwo;
let planePosition, planeTwoPosition;
let planeWidth, planeTwoWidth;
let textExample, car, light;
let controls;
let camDist;



init();
function init() {
    // debugger
    const gui = new GUI();
    //// setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAFCAE3); // changeing scene color
    //renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector("#bg")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    //document.body.appendChild( renderer.domElement ); // for orbit controls

    // Setting up Orthographic camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    camDist = 20;
    camera = new THREE.OrthographicCamera(- camDist * aspectRatio, camDist * aspectRatio, camDist, - camDist, 1, 1000);

    // Setting up Perspective camera camera
    // camera = new THREE.PerspectiveCamera( 45, aspectRatio, 1, 10000 );
    // camera.position.set(0, 50, 0)
    // camera.lookAt(scene.position);
    // //scene.add( camera );
    // controls = new OrbitControls( camera, renderer.domElement );

    //// create light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0); // soft white light
    light.position.setY(10)
    scene.add(light);

    const sphereSize = 1; // light helper
    const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    scene.add(pointLightHelper);
    // light gui
    const lightGui = gui.addFolder("Light");
    lightGui.add(light.position, "x").min(-10).max(100).step(0.1).name("position x");
    lightGui.add(light.position, "y").min(-1000).max(100).step(0.1).name("position y");
    lightGui.add(light.position, "z").min(0).max(100).step(0.1).name("position z");

    // Create plane
    const planeGeometry = new THREE.PlaneGeometry(500, 50);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x525252, side: THREE.DoubleSide });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    planeWidth = plane.geometry.parameters.width;
    planePosition = plane.position.x;
    // 2nd Plane
    const planeTwoGeometry = new THREE.PlaneGeometry(500, 50);
    const planeTwoMaterial = new THREE.MeshBasicMaterial({ color: 0x525252, side: THREE.DoubleSide });
    planeTwo = new THREE.Mesh(planeTwoGeometry, planeTwoMaterial);
    planeTwo.rotation.x = Math.PI / 2;
    scene.add(planeTwo);

    planeTwoWidth = planeTwo.geometry.parameters.width;
    planeTwo.position.setX((planeWidth + planeTwoWidth) / 2)
    planeTwoPosition = planeTwo.position.x;

    renderer.render(scene, camera);
}

//// Loaders
// loader manager
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onLoad = function () {
    console.log('Loading complete!');
    animator(); // start animator after asset is loaded
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

loaders();
function loaders() {
    // Load asset
    const GLTFloader = new GLTFLoader(manager);
    GLTFloader.load('models/low_poly_car/scene.gltf', function (gltf) {
        car = gltf.scene.children[0];
        car.position.set(-220, 0, 0)
        car.rotation.z = -45 * Math.PI / 2;
        car.scale.set(0.1, 0.1, 0.1)

        scene.add(gltf.scene);
        light.position.setZ(5 + car.position.y);
        camera.position.set(car.position.x - camDist, camDist, camDist);
        camera.lookAt(car.position.x, 0, 0);

    });
    // Load text
    const passages = {
        ai: "AI systems have the ability to learn and adapt as they make decisions. In the transportation area, for example, semi-autonomous vehicles have tools that let drivers and vehicles know about upcoming congestion, potholes, highway construction, or other possible traffic impediments. Vehicles can take advantage of the experience of other vehicles on the road, without human involvement, and the entire corpus of their achieved “experience” is immediately and fully transferable to other similarly configured vehicles. Their advanced algorithms, sensors, and cameras incorporate experience in current operations, and use dashboards and visual displays to present information in real time so human drivers are able to make sense of ongoing traffic and vehicular conditions. And in the case of fully autonomous vehicles, advanced systems can completely control the car or truck, and make all the navigational decisions.",
        supernova: "A supernova is a powerful and luminous stellar explosion. This transient astronomical event occurs during the last evolutionary stages of a massive star or when a white dwarf is triggered into runaway nuclear fusion. The original object, called the progenitor, either collapses to a neutron star or black hole, or is completely destroyed. The peak optical luminosity of a supernova can be comparable to that of an entire galaxy before fading over several weeks or months. The most recent directly observed supernova in the Milky Way was Kepler's Supernova in 1604, but the remnants of more recent supernovae have been found. Observations of supernovae in other galaxies suggest they occur in the Milky Way on average about three times every century. These supernovae would almost certainly be observable with modern astronomical telescopes. The most recent naked-eye supernova was SN 1987A, the explosion of a blue supergiant star in the Large Magellanic Cloud, a satellite of the Milky Way."
    };
    const fontLoader = new FontLoader(manager);
    fontLoader.load("fonts/Lucida Sans Typewriter_Regular.json", function (font) {
        let geometrySetting = {
            font: font,
            size: 1.5,
            height: 0,
            curveSegments: 20,
        }
        const textGeometry = new TextGeometry(passages.supernova, geometrySetting);
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        textExample = new THREE.Mesh(textGeometry, textMaterial);

        textExample.position.set(-220, 1, 5);
        textExample.rotation.x = (-45 * Math.PI / 2);
        scene.add(textExample)
    });
}


function animator() {
    // Update objects
    car.position.x += (grossWpm / 100);
    camera.position.setX(car.position.x - camDist); // follow car
    camera.lookAt(car.position.x, 0, 0);
    light.position.setX(car.position.x);
    textExample.position.setX(car.position.x);
    //controls.update(); // update camera controls

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animator)
}





// countdown timer checks cube position every 100ms instead of checking in animator which checks I presume is 144/s
setInterval(function () {
    // Code checks if plane is beneath cube, if not then move the plane in front since its not being seen
    // This prevents the need to load in an extremely long plane to ensure theres always a plane beneath the cube
    // This works by teleporting the plane out of view in front of the plane in view.
    if (car.position.x >= planeWidth / 2 + planePosition) {
        plane.position.setX((planeWidth + planeTwoWidth) / 2 + planeTwoPosition);
        planePosition = plane.position.x;
    }
    else if (car.position.x >= planeTwoWidth / 2 + planeTwoPosition) {
        planeTwo.position.setX((planeWidth + planeTwoWidth) / 2 + planePosition);
        planeTwoPosition = planeTwo.position.x;
    }
}, 1000);

// make function above load after loading assets

