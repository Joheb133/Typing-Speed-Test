const words = [
    'Machines', 'like', 'Robert', 'are', 'mainstays', 'of', 'science',
    'fiction-the', 'idea', 'of', 'a', 'robot', 'that', 'somehow', 'replicates',
    'consciousness', 'through', 'its', 'hardware', 'or', 'software', 'has',
    'been', 'around', 'so', 'long', 'it', 'feels', 'familiar.'
];
const wordsEl = document.getElementById("words-el");

let keyPosition = 0;
let wordsCurrentValue = wordsEl.children[keyPosition];

//function adds letters from words array to document
function documentLetters(item) {
    let letters = "";
    for (i = 0; i < item.length; i++) {
        letters += `<span>${item.charAt(i)}</span>`
    };
    letters += `<span> </span>`;
    wordsEl.innerHTML += letters;
};
words.forEach(documentLetters);
const paragraphLength = wordsEl.childElementCount;

// Two event listeners attached to document because: Keypress only listens for letters, numbers and punctuations. This stops the need to check for specific keys.
// I still need the backspace and that's what the second event listener is for.
document.addEventListener("keypress", userKeyPress);

function userKeyPress(e) {
    if (keyPosition < paragraphLength - 1) { // makes sure not to run function when there's no more letters
        keyPressValue = e.key;
        progressionForward();
    };
};

document.addEventListener("keydown", userKeyDown);

function userKeyDown(e) {
    keyUpValue = e.key
    if (keyUpValue === "Backspace" && keyPosition > 0) {
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
    }
};

// Code for when the user presses backspace
function progressionBackward() {
    keyPosition--;
    wordsCurrentValue = wordsEl.children[keyPosition]; //update var
    // indicate current user placement
    wordsCurrentValue.style.borderBottom = "solid blue";
    wordsEl.children[keyPosition + 1].style.borderBottom = "none";

    wordsCurrentValue.id = ""; // remove right/wrong styling
};

// Timer is being kept here for now since I see no reason for it to have its own file

const timerEl = document.getElementById("timer-el");
let time = 180;



// Quick function that starts timer when a key is pressed then kills itself

document.addEventListener("keydown", checkFirstInput);

function checkFirstInput() {
    // countdown timer
    let timeInterval = setInterval(function () {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            clearInterval(timeInterval);
            // Kill event listeners to end game
            document.removeEventListener("keypress", userKeyPress);
            document.removeEventListener("keydown", userKeyDown);
        };
    }, 1000);
    document.removeEventListener("keydown", checkFirstInput);
};