
const paragraph = "AI systems have the ability to learn and adapt as they make decisions. In the transportation area, for example, semi-autonomous vehicles have tools that let drivers and vehicles know about upcoming congestion, potholes, highway construction, or other possible traffic impediments. Vehicles can take advantage of the experience of other vehicles on the road, without human involvement, and the entire corpus of their achieved “experience” is immediately and fully transferable to other similarly configured vehicles. Their advanced algorithms, sensors, and cameras incorporate experience in current operations, and use dashboards and visual displays to present information in real time so human drivers are able to make sense of ongoing traffic and vehicular conditions. And in the case of fully autonomous vehicles, advanced systems can completely control the car or truck, and make all the navigational decisions.";
let outputParagraph = [];
let lastLetter = 0;
let tempLetterHold = "";

function generateWords(inputParagraph) {
    for (i = 0; i < inputParagraph.length; i++) {
        if (inputParagraph.charAt(i) !== " ") {// if no space that means char is a letter
            tempLetterHold += inputParagraph.charAt(i)
        } else if(inputParagraph.charAt(i) === " "){// if space that means previous letter sequence = a word
            outputParagraph.push(tempLetterHold);
            tempLetterHold = "";
        }
    }
};

generateWords(paragraph)
// another function below to save data to array
