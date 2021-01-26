
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
    ["a","b","c","d"],
    ["a","b","c","d"],
    ["a","b","c","d"],
    ["a","b","c","d"],
    ["a","b","c","d"],
    ["a","b","c","d"]
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


function questionroulette(){
++questionsNo;
if (questionsNo >= questions.length){
    alert("You are done!  Breathe!!!!");
} else {
    document.querySelector(".nextQuestion").innerHTML = questions[questionsNo];
    // document.querySelector('questionresponses').value = ""
}

}















startBtn.addEventListener("click", startGame)
