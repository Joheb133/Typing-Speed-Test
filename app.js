// Need some kind of input
// input is fed to js
// input has to match output

let words = [
    "hello", "world", "think", "iron",
    "love", "music", "genius", "prevent",
]
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

inputEl.addEventListener("keyup", function() {
    for(i = 0; i < words.length; i++){
        if(inputEl.value === words[i]){
            words.splice(i, 1)
            render()
            inputEl.value = ""
        }
    }
})

function render(){
    let listItems = "";
    for(i = 0; i < words.length; i++){
        listItems += `
        <li> ${words[i]} </li>
        `
    }
    ulEl.innerHTML = listItems
}

render()

function arrayStringMax(arr){ // Array highest characters
    let max = 0;
    for(i = 0; i < arr.length; i++){
        if(arr[i].length > max){
        max = arr[i].length;
        }
    }
    return max
}

function arrayStringMin(arr){ // Array lowest characters
    let min = Infinity;
    for(i = 0; i < arr.length; i++){
        if(arr[i].length < min){
            min = arr[i].length
        }
    }
    return min
}




