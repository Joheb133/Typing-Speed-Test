
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
]
let words = [
    "hello", "world", "think", "iron",
]
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

inputEl.addEventListener("keyup", function () {
    if (inputEl.value === words[0]) {
        words.splice(0, 1)
        render()
        inputEl.value = ""
    }
})

function render() {
    let listItems = ""
    for (i = 0; i < words.length; i++) {
        listItems += `
        <li> ${words[i]} </li>
        `
    }
    ulEl.innerHTML = listItems
    inputEl.placeholder = words[0]
}

render()

