
let wordsBuffer = [
    'Machines', 'like', 'Robert', 'are', 'mainstays', 'of', 'science', 
    'fiction-the', 'idea', 'of', 'a', 'robot', 'that', 'somehow', 'replicates', 
    'consciousness', 'through', 'its', 'hardware', 'or', 'software', 'has', 
    'been', 'around', 'so', 'long', 'it', 'feels', 'familiar.']
;
let words = [
    "hello", "world", "think", "iron",
];
let keyPosition = 0;
const wordsEl = document.getElementById("words-el");
let wordsCurrentValue = wordsEl.children[keyPosition];

words = wordsBuffer;

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

// keypress doesnt register keys like backspace and arrows
document.addEventListener("keypress", function (event) {
    keyPressValue = event.key
    progressionRender();
});
// keypressed for backspace
document.addEventListener("keyup", function (event) {
    keyUpValue = event.key
    if (keyUpValue === "Backspace" && keyPosition > 0) {
        keyPosition--;
        wordsCurrentValue = wordsEl.children[keyPosition];
        wordsCurrentValue.id = "";
    }
});

// Render to show user progression. Probably going to change each active spans opacity
function progressionRender() {
    wordsCurrentValue = wordsEl.children[keyPosition];
    // If the letter at inputs position is at is equal to the span at the same position as input position then execute code
    if (keyPressValue === wordsCurrentValue.textContent) {
        wordsCurrentValue.id = "right-span";
    } else {
        wordsCurrentValue.id = "wrong-span";
    }
    keyPosition++;

};