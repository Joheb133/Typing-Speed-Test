// Need some kind of input
// input is fed to js
// input has to match output

let words = [
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
]
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

const charMax = arrayStringMax(words)
const charMin = arrayStringMin(words)

// Array character max
function arrayStringMax(arr) { 
    let max = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length > max) {
            max = arr[i].length;
        }
    }
    return max
}

// Array character min
function arrayStringMin(arr) { 
    let min = Infinity;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].length < min) {
            min = arr[i].length
        }
    }
    return min
}

// If key pressed run through loop
inputEl.addEventListener("keyup", function () {
        for (i = 0; i < words.length; i++) {
            if (inputEl.value === words[i]) {
                words.splice(i, 1)
                render()
                inputEl.value = ""
            }
        }
})

function render() {
    let listItems = "";
    for (i = 0; i < words.length; i++) {
        listItems += `
        <li> ${words[i]} </li>
        `
    }
    ulEl.innerHTML = listItems
}

render()

