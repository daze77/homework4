
//start
var startBtn = document.querySelector("#goTime");
console.log("Page Loaded")


function startGame(){
    console.log ("Start button pressed")
    document.querySelector('#goTime').innerHTML="Next"
    questionroulette()

}

var questions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6"
];

var questionresponses = [
    ["1","2","3","4"],
    ["a","b","c","d"],
    ["z","x","v","n"],
    ["q","w","e","r"],
    ["y","u","i","o"],
    ["7","8","9","0"]
]


var questionanswers = [
    "a",
    "b",
    "c",
    "a",
    "d",
    "b"
]




var questionsNo = -1
var score = 0
var index = 0


function questionroulette(){
    ++questionsNo;
    if (questionsNo >= questions.length){
        alert("You are done!  Breathe!!!!");
    } else {
        document.querySelector(".nextQuestion").innerHTML = questions[questionsNo];
        document.querySelector(".questionresponses").innerHTML= array()


        }
    }

    function array(){
    for (var i=0; i < questionresponses[index].length; i++){
        document.querySelector(".questionresponses").innerHTML += '<input type="radio" name="ans" value="' + questionresponses[index][i] + '"/>' + '<label>' + questionresponses[index][i] + '</label>'
    }

console.log("did this work?")
index++

    }




// function questionRouletteResponses(){
//     for (var i=0; i < questionresponses[index].length; i++){
//         document.querySelector(".questionresponses").innerHTML += '<input type="radio" name="ans" value="' + questionresponses[index][i] + '"/>' + '<label>' + questionresponses[index][i] + '</label>'
//     }
// index++
// console.log("did this work?")
// }













startBtn.addEventListener("click", startGame)
