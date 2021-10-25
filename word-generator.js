
//const paragraph = "Machines like Robert are mainstays of science fiction-the idea of a robot that somehow replicates consciousness through its hardware or software has been around so long it feels familiar. ";
let outputParagraph = [];
let lastLetter = 0;
let tempLetterHold = "";

function generateWords(inputParagraph) {
    for (i = 0; i < inputParagraph.length; i++) {
        if (inputParagraph.charAt(i) !== " ") {
            tempLetterHold += inputParagraph.charAt(i)
        } else if(inputParagraph.charAt(i) === " "){
            outputParagraph.push(tempLetterHold);
            tempLetterHold = "";
        }
    }
};

// another function below to save data to array