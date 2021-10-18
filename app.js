
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
const ulEl = document.getElementById("ul-el");
const ulOverlayEl = document.getElementById("ul-overlay-el");

//words = wordsBuffer;

(function() {
    let listItems = "";
    for (i = 0; i < words.length; i++) {
        listItems += `<li>${words[i]} </li>`
    };
    ulEl.innerHTML = listItems;
}());


inputEl.addEventListener("keyup", function () {
    // *if input letter = letter from array in corresponding location
    const inputPosition = (inputEl.value.length) - 1; // stores position in index
    const inputCurrentValue = inputEl.value.charAt(inputPosition); // this stores the last input character
    if(inputCurrentValue === words[0].charAt(inputPosition) && inputCurrentValue != ""){ // if the letters are equal at the same position
        console.log(words[0].charAt(inputPosition))
    }


    if (inputEl.value === words[0]) {
        words.splice(0, 1);
        //ulEl.firstElementChild.remove();
        inputEl.value = "";
    };
});



