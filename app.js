
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
    progressionRender();
});

// Render to show user progression. Probably going to change each active spans opacity
function progressionRender(){
    let inputPosition = (inputEl.value.length) - 1; // this gives current input position
    let inputCurrentValue = inputEl.value.charAt(inputPosition); // character at current input position
    let wordsCurrentValue = wordsEl.children[inputPosition].textContent; // span textContent at input position
    
    // If the letter at inputs position is at is equal to the span at the same position as input position then execute code 
    if(inputCurrentValue === wordsCurrentValue){
        console.log(true)
    } else{
        console.log(false)
    }
}




