const passages = {
    ai: "AI systems have the ability to learn and adapt as they make decisions. In the transportation area, for example, semi-autonomous vehicles have tools that let drivers and vehicles know about upcoming congestion, potholes, highway construction, or other possible traffic impediments. Vehicles can take advantage of the experience of other vehicles on the road, without human involvement, and the entire corpus of their achieved “experience” is immediately and fully transferable to other similarly configured vehicles. Their advanced algorithms, sensors, and cameras incorporate experience in current operations, and use dashboards and visual displays to present information in real time so human drivers are able to make sense of ongoing traffic and vehicular conditions. And in the case of fully autonomous vehicles, advanced systems can completely control the car or truck, and make all the navigational decisions.",
    supernova: "A supernova is a powerful and luminous stellar explosion. This transient astronomical event occurs during the last evolutionary stages of a massive star or when a white dwarf is triggered into runaway nuclear fusion. The original object, called the progenitor, either collapses to a neutron star or black hole, or is completely destroyed. The peak optical luminosity of a supernova can be comparable to that of an entire galaxy before fading over several weeks or months. The most recent directly observed supernova in the Milky Way was Kepler's Supernova in 1604, but the remnants of more recent supernovae have been found. Observations of supernovae in other galaxies suggest they occur in the Milky Way on average about three times every century. These supernovae would almost certainly be observable with modern astronomical telescopes. The most recent naked-eye supernova was SN 1987A, the explosion of a blue supergiant star in the Large Magellanic Cloud, a satellite of the Milky Way."
};
const wordsEl = document.getElementById("words-el");
const timerEl = document.getElementById("timer-el");
const wpmEl = document.getElementById("wpm-el");
const wpmElTest = document.getElementById("wpm-test-el");
let keyPosition = 0;
let countdown = 60;
let timeElapsed = 1;
let uncorrectedErrors = 0;
let errorStreak = 0;
let typedEntries = 0;
let wordsCurrentValue = wordsEl.children[keyPosition];
global.grossWpm = 0;

console.log(passages.supernova.length)


//function adds letters from words array to document
function documentLetters(item) {
    let letters = "";
    for (i = 0; i < item.length; i++) {
        letters += `<span>${item.charAt(i)}</span>`
    };
    wordsEl.innerHTML += letters;
};
documentLetters(passages.supernova)
//words.forEach(documentLetters);
const paragraphLength = wordsEl.childElementCount;
timerEl.textContent = countdown;

// Two event listeners attached to document because: Keypress only listens for letters, numbers and punctuations. This stops the need to check for specific keys.
// I still need the backspace and that's what the second event listener is for.
document.addEventListener("keypress", userKeyPress);
document.addEventListener("keydown", userKeyDown);

function userKeyPress(e) {
    keyPressValue = e.key;
    if (errorStreak < 1) { // makes sure not to run function when there's no more letters
        progressionForward();
    } else {
        stopProgression();
    };
};

function userKeyDown(e) {
    keyUpValue = e.key
    if (keyUpValue === "Backspace" && keyPosition > 1) {
        progressionBackward();
    };
};

// Code for when the user presses a key
function progressionForward() {
    wordsCurrentValue = wordsEl.children[keyPosition]; // update var since key position changes
    keyPosition++; // increase keyPosition since a key was pressed

    // code below is less for function but more about giving the user feedback
    // indicate current user placement
    wordsEl.children[keyPosition].style.borderBottom = "solid blue";
    wordsCurrentValue.style.borderBottom = "none";

    // conditional statements check if user input is right/wrong
    if (keyPressValue === wordsCurrentValue.textContent) {
        wordsCurrentValue.id = "right-span";
    } else {
        wordsCurrentValue.id = "wrong-span";
        uncorrectedErrors++;
        errorStreak++;
    };
};

// Code for no progression since two inputs in a row are wrong
function stopProgression() {
    wordsCurrentValue = wordsEl.children[keyPosition];
    wordsEl.children[keyPosition].style.borderBottom = "solid red"; // let user know their current input was wrong and they cant move on
    if (keyPressValue === wordsCurrentValue.textContent) {
        errorStreak = 0;
        keyPosition++;
        uncorrectedErrors--;
        wordsCurrentValue.id = "right-span";
        wordsCurrentValue.style.borderBottom = "none";
        wordsEl.children[keyPosition].style.borderBottom = "solid blue";
    };
};

// Code for when the user presses backspace
function progressionBackward() {
    keyPosition--;
    wordsCurrentValue = wordsEl.children[keyPosition]; //update var
    // indicate current user placement
    wordsCurrentValue.style.borderBottom = "solid blue";
    wordsEl.children[keyPosition + 1].style.borderBottom = "none";
    if (wordsCurrentValue.id === "wrong-span") { // Using this condition so user isn't punished for fixed mistakes
        uncorrectedErrors--;
        errorStreak = 0;
    };
    wordsCurrentValue.id = ""; // remove right/wrong styling
};

// WPM function
function wpm() {
    //let grossWpm = ((keyPosition/5) - uncorrectedErrors) / (timeElapsed/60); // other forumula

    let wpm = (keyPosition / 5) / (timeElapsed / 60);
    let accuracy = (keyPosition - uncorrectedErrors) / keyPosition;
    grossWpm = Math.round(wpm * accuracy);
    wpmEl.textContent = grossWpm;
};

// Timer is being kept here for now since I see no reason for it to have its own file
// Quick function that starts timer when a key is pressed then kills the event listener

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
            wordsEl.textContent = "Time's Up";
        };
    }, 1000);
    document.removeEventListener("keypress", checkFirstInput);
};