
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
let keyPosition = 0;
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
document.addEventListener("keyup", function (event) {
    keyValue = event.key
    progressionRender();
});

// Render to show user progression. Probably going to change each active spans opacity
function progressionRender(){
    console.log(keyValue)
    if(keyValue === "Backspace" && keyPosition > 0){
        keyPosition--;
    } else {
        keyPosition++;
    }
    let wordsCurrentValue = wordsEl.children[keyPosition-1];
    
    // If the letter at inputs position is at is equal to the span at the same position as input position then execute code 
    if( keyValue === wordsCurrentValue.textContent){
        wordsCurrentValue.id = "right-span";
    } else{
        wordsCurrentValue.id = "wrong-span"
    }
};