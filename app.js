
let wordsBuffer = [
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
    "hello", "world", "think", "iron",
];
let words = [
    "hello", "world", "think", "iron",
];
const inputEl = document.getElementById("input-el");
const wordsEl = document.getElementById("words-el")

//words = wordsBuffer;

//function adds letters from words array to document
function documentLetters(item){
    let letters = "";
    for(i = 0; i < item.length; i++){
        letters += `<span>${item.charAt(i)}</span>`
    };
    letters += `<span> </span>`;
    wordsEl.innerHTML += letters;
};
words.forEach(documentLetters);

// key is pressed in input
inputEl.addEventListener("keyup", function () {
    
});

// Render to show user progression. Probably going to change each active spans opacity
function progressionRender(){
    const inputPosition = (inputEl.value.length) - 1; // stores position in index
    // const inputCurrentValue = inputEl.value.charAt(inputPosition); // this stores the last input character

}



