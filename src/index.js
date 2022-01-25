import "./style.css";
import * as THREE from 'three';
import { color, GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Group } from "three";

let renderer, scene, camera;
let plane, planeTwo;
let planePosition, planeTwoPosition;
let planeWidth, planeTwoWidth;
let line, textGroup, car, light;
let camDist;
let aspectRatio = window.innerWidth / window.innerHeight;
const passages = {
    ai: "AI systems have the ability to learn and adapt as they make decisions. In the transportation area, for example, semi-autonomous vehicles have tools that let drivers and vehicles know about upcoming congestion, potholes, highway construction, or other possible traffic impediments. Vehicles can take advantage of the experience of other vehicles on the road, without human involvement, and the entire corpus of their achieved “experience” is immediately and fully transferable to other similarly configured vehicles. Their advanced algorithms, sensors, and cameras incorporate experience in current operations, and use dashboards and visual displays to present information in real time so human drivers are able to make sense of ongoing traffic and vehicular conditions. And in the case of fully autonomous vehicles, advanced systems can completely control the car or truck, and make all the navigational decisions.",
    supernova: "A supernova is a powerful and luminous stellar explosion. This transient astronomical event occurs during the last evolutionary stages of a massive star or when a white dwarf is triggered into runaway nuclear fusion. The original object, called the progenitor, either collapses to a neutron star or black hole, or is completely destroyed. The peak optical luminosity of a supernova can be comparable to that of an entire galaxy before fading over several weeks or months. The most recent directly observed supernova in the Milky Way was Kepler's Supernova in 1604, but the remnants of more recent supernovae have been found. Observations of supernovae in other galaxies suggest they occur in the Milky Way on average about three times every century. These supernovae would almost certainly be observable with modern astronomical telescopes. The most recent naked-eye supernova was SN 1987A, the explosion of a blue supergiant star in the Large Magellanic Cloud, a satellite of the Milky Way."
};
const paragraph = passages.supernova;




window.addEventListener("resize", onWindowResize, false);
function onWindowResize(){
    aspectRatio = window.innerWidth / window.innerHeight;
    camera.left = -camDist * aspectRatio;
    camera.right = camDist * aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

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

    // Setting up Orthographic camera
    camDist = 20;
    camera = new THREE.OrthographicCamera(- camDist * aspectRatio, camDist * aspectRatio, camDist, - camDist, 1, 1000);
    //// create light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0); // soft white light
    light.position.setY(10)
    scene.add(light);

    const sphereSize = 1; // light helper
    const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    scene.add(pointLightHelper);
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


    // Line
    const lineGeometry = new THREE.BoxGeometry(1.25, 0, 0.25)
    const lineMat = new THREE.MeshBasicMaterial({color: 0x001ec9})
    line = new THREE.Mesh(lineGeometry, lineMat);
    scene.add(line);
    line.position.set(-219.4, 1, 5.25)

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
    const fontLoader = new FontLoader(manager);
    fontLoader.load("fonts/Lucida Sans Typewriter_Regular.json", function (font) {
        let geometrySetting = {
            font: font,
            size: 1.5,
            height: 0,
            curveSegments: 20,
        }

        //testing whether i can create letters that can be individually manipulated but still able to act as part of a list/group
        textGroup = new THREE.Group();
        for(let i=0; i < paragraph.length; i++){
            const letterGeometry = new TextGeometry(paragraph.charAt(i), geometrySetting);
            const letterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
            const letter = new THREE.Mesh(letterGeometry, letterMaterial);
            letter.position.setX(i * 1.25);
            textGroup.add(letter);
        }
        scene.add(textGroup);
        textGroup.position.set(-220, 1, 5);
        textGroup.rotation.x = (-45 * Math.PI / 2);
    });
}


function animator() {
    updateObjects();
    movePlane();
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(animator)
}

function movePlane() {
    // Code checks if plane is beneath cube, if not then move the plane in front since its not being seen
    // This prevents the need to load in an extremely long plane to ensure theres always a plane beneath the cube
    // This works by teleporting the plane out of view in front of the plane in view.
    if (car.position.x >= planeWidth + planePosition) {
        plane.position.setX((planeWidth + planeTwoWidth) / 2 + planeTwoPosition);
        planePosition = plane.position.x;
    }
    else if (car.position.x >= planeTwoWidth + planeTwoPosition) {
        planeTwo.position.setX((planeWidth + planeTwoWidth) / 2 + planePosition);
        planeTwoPosition = planeTwo.position.x;
    }
}

function updateObjects(){
    car.position.x += (grossWpm / 200);
    camera.position.setX(car.position.x - camDist); // follow car
    camera.lookAt(car.position.x, 0, 0);
    light.position.setX(car.position.x);
    textGroup.position.setX((car.position.x - 0.6) - linePos);
    line.position.setX(car.position.x);
}


// wpm js

const timerEl = document.getElementById("timer-el");
const wpmEl = document.getElementById("wpm-el");
let keyPosition = 0;
let countdown = 60;
let timeElapsed = 1;
let uncorrectedErrors = 0;
let errorStreak = 0;
let wordsCurrentValue = paragraph.charAt(keyPosition);
let keyPressValue;
let grossWpm = 0;
let linePos = 0



timerEl.textContent = countdown; // * countdown


// Two event listeners attached to document because: Keypress only listens for letters, numbers and punctuations. This stops the need to check for specific keys.
// I still need the backspace and that's what the second event listener is for.
document.addEventListener("keypress", userKeyPress);
document.addEventListener("keydown", userKeyDown);

function userKeyPress(e) {
    keyPressValue = e.key;
    if (errorStreak < 1) { // makes sure not to run function when users made too many mistakes
        progressionForward();
    } else {
        stopProgression();
    };
};

function userKeyDown(e) {
    let keyUpValue = e.key
    if (keyUpValue === "Backspace" && keyPosition > 1) {
        progressionBackward();
    };
};

// Code for when the user presses a key
function progressionForward() {
    
    wordsCurrentValue = paragraph.charAt(keyPosition); // update var since key position changes
    keyPosition++;
    linePos += 1.25;

    // conditional statements check if user input is right/wrong
    if (keyPressValue !== wordsCurrentValue){
        textGroup.children[keyPosition-1].material.color.setHex(0xc42100);// * indicate input wrong
        textGroup.children[keyPosition-1].name = "wrong-input";
        uncorrectedErrors++;
        errorStreak++;
    };
};

// Code for no progression since two inputs in a row are wrong
function stopProgression() {
    wordsCurrentValue = paragraph.charAt(keyPosition);
    line.material.color.setHex(0xc42100);// * indicate current user placement // let user know their current input was wrong and they cant move on
    if (keyPressValue === wordsCurrentValue) {
        errorStreak = 0;
        keyPosition++;
        uncorrectedErrors--;
        linePos += 1.25;
        line.material.color.setHex(0x001ec9);// * indicate current user placement
    };
};

// Code for when the user presses backspace
function progressionBackward() {
    keyPosition--;
    wordsCurrentValue = paragraph.charAt(keyPosition); //update var
    linePos -= 1.25;
    if (textGroup.children[keyPosition].name === "wrong-input") { // Using this condition so user isn't punished for fixed mistakes
        textGroup.children[keyPosition].name = "";
        textGroup.children[keyPosition].material.color.setHex(0xffffff);
        uncorrectedErrors--;
        errorStreak = 0;
    };
};

// WPM function
function wpm() {
    let wpm = (keyPosition / 5) / (timeElapsed / 60);
    let accuracy = (keyPosition - uncorrectedErrors) / keyPosition;
    grossWpm = Math.round(wpm * accuracy);
    wpmEl.textContent = grossWpm;
};

// Timer is being kept here for now since I see no reason for it to have its own file
// Quick function that starts timer when a key is pressed then kills the event listener

/* MIGHT NOT NEED BELOW, I think i could just use the animator instead of using the timer */

document.addEventListener("keypress", checkFirstInput);

function checkFirstInput() {
    let wpmTimeInterval = setInterval(wpm, 100);
    // countdown timer
    let timeInterval = setInterval(function () {
        timeElapsed++;
        countdown--;
        timerEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(wpmTimeInterval);
            clearInterval(timeInterval);// stop timer
            // Kill event listeners to end game
            document.removeEventListener("keypress", userKeyPress);
            document.removeEventListener("keydown", userKeyDown);
            // Notify user
            
        };
    }, 1000);
    document.removeEventListener("keypress", checkFirstInput);
};



// console.log(paragraph.charAt(0))

