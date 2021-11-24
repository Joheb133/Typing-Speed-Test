const words = ['Machines', 'like', 'Robert', 'are', 'mainstays', 'of', 'science', 'fiction-the', 'idea', 'of', 'a', 'robot', 'that', 
'somehow', 'replicates', 'consciousness', 'through', 'its', 'hardware', 'or', 'software', 'has', 'been', 'around', 'so', 'long', 'it', 
'feels', 'familiar.', 'Margolis', 'wrote', 'the', 'paper', 'with', 'senior', 'author', 'Pulkit', 'Agrawal,', 'who', 'heads', 'the', 
'Improbable', 'AI', 'lab', 'at', 'MIT', 'and', 'is', 'the', 'Steven', 'G.', 'and', 'Renee', 'Finn', 'Career', 'Development', 'Assistant', 
'Professor', 'in', 'the', 'Department', 'of', 'Electrical', 'Engineering', 'and', 'Computer', 'Science;', 'Professor', 'Sangbae', 
'Kim', 'in', 'the', 'Department', 'of', 'Mechanical', 'Engineering', 'at', 'MIT;', 'and', 'fellow', 'graduate', 'students', 'Tao', 
'Chen', 'and', 'Xiang', 'Fu', 'at', 'MIT.', 'Other', 'co-authors', 'include', 'Kartik', 'Paigwar,', 'a', 'graduate', 'student', 'at', 
'Arizona', 'State', 'University.'];
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
let grossWpm = 0;




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
        uncorrectedErrors++;
        errorStreak++;
    };
};

// Code for no progression since two inputs in a row are wrong
function stopProgression() {
    wordsCurrentValue = wordsEl.children[keyPosition];
    wordsEl.children[keyPosition].style.borderBottom = "solid red"; // let user know their current input was wrong and they cant move on
    if(keyPressValue === wordsCurrentValue.textContent){
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
    if (wordsCurrentValue.id === "wrong-span"){ // Using this condition so user isn't punished for fixed mistakes
        uncorrectedErrors--;
        errorStreak = 0;
    };
    wordsCurrentValue.id = ""; // remove right/wrong styling
};

// WPM function
function wpm(){
    //let grossWpm = ((keyPosition/5) - uncorrectedErrors) / (timeElapsed/60); 

    let wpm = (keyPosition/5) / (timeElapsed/60);
    let accuracy = (((keyPosition - uncorrectedErrors)/keyPosition));
    grossWpm = wpm * accuracy;
    wpmEl.textContent = Math.round(grossWpm);
};

// Timer is being kept here for now since I see no reason for it to have its own file
// Quick function that starts timer when a key is pressed then kills the event listener

document.addEventListener("keydown", checkFirstInput);

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
    document.removeEventListener("keydown", checkFirstInput);
};