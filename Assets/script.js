
//start
var startBtn = document.querySelector("#goTime");
console.log("Page Loaded")

//global variables to be used for entire JS

var questionsAndAnswers = [
  {
    Question: "1. JavaScript is a ___ -side programming language",
    Answers: ["Client","Server","Both","None"],
    CorrectAnswer: "Both",
  },
  {
    Question:  "2. How to write an if statement in javaScript?",
    Answers:  ["if i = 5","if i == 5 then","if i = 5 then","if (i==5)"],
    CorrectAnswer: "if (i==5)",
  },
  {
    Question: "3. What will 'Boolean(3 < 7)' return?",
    Answers:  ["true","false","NaN","SyntaxError"],
    CorrectAnswer:  "true",

  },
  {
    Question: "4. How do you write a comment in javaScript?",
    Answers: ['\\Like this-->', "Like this", "//Like this"],
    CorrectAnswer:  "//Like this",
 
  },
  {
    Question: "5. What is the correct why to write if 'i' is not equal to 8",
    Answers: ["if (i !=8)", "if i <> 8", "if i = ! 8 then", "if (i<>8)"],
    CorrectAnswer:  "if (i !=8)",
   
  },
  {
    Question: "6. How do you call a function named 'myFunction?",
    Answers: ["call myFunction()","myFunction()","call function myFunction()"],
    CorrectAnswer:  "myFunction()"
  }
]

var score
var timer
var personsname

function startGame(){
    console.log ("Start button pressed")
    //set counters to base values
    timer = 90
    score = 0
    questionNo = 0
    
    //hide eveything but the start button to start the game
    document.querySelector('#timer').classList.remove('d-none')
    document.querySelector('#timerheader').classList.remove('d-none')
    document.querySelector('#goTime').classList.add('d-none')
    document.querySelector('#startMessage').classList.add('d-none')

    document.querySelector('#score').classList.remove('d-none')
    document.querySelector('#scoreheader').classList.remove('d-none')
    document.querySelector('#timer').textContent = timer
    document.querySelector('#score').textContent = score


    timeercountdown = setInterval(timerFunction, 1000)

    // questionroulette()
    nextQuestion()

}

function nextQuestion(){
  var questionEL = document.querySelector('.nextQuestion')
  var nextQuestion = questionsAndAnswers[questionNo]
    questionEL.innerHTML = `
    <h3>${nextQuestion.Question}</h3><br><br>
    `

  for( var i=0; i<nextQuestion.Answers.length; i++){
    questionEL.innerHTML += 
    `<button onClick="selectAnswer(event, '${nextQuestion.Answers[i]}')" class="btn btn-primary mx-1" type="button">${nextQuestion.Answers[i]}</button>`
  }
}



function selectAnswer( event,selectedAnswer ){
    event.preventDefault()
    console.log( `question answer id: ${selectedAnswer}` )
    if( selectedAnswer===questionsAndAnswers[questionNo].CorrectAnswer ){
      console.log( `Nice! Correct answer: ${selectedAnswer}` )
      scoreCounter(1)
    } else {
      console.log( `Nope, penatly, -10 seconds` )
      timerFunction(10)
    }
    questionNo++
    // show next question or quit game if there are no further questions left
    if( questionNo<questionsAndAnswers.length )
      nextQuestion()
    else
      done()
  }



  function timerFunction( decreaseby=1 ){
    // decrease by the value passed in, or if nothing, by 1
    timer -= decreaseby
    document.querySelector('#timer').textContent = timer
    if( timer<1 )
      done()
  }

  function scoreCounter( increaseby=1 ){
    // decrease by the value passed in, or if nothing, by 1
    score += increaseby
    document.querySelector('#score').textContent = score
  }



function done(){
    console.log("Congratulations you finished! Now breathe!")
    document.querySelector('#quizOver').classList.remove('d-none')
    document.querySelector('#questioncards').classList.add('d-none')

    clearInterval(timeercountdown)
    
    //save the scores to local storage
    function savescoreboard(){
      //call local storage
      var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
      console.log(scoreboard)
      //add current inform to scoreboard - via push
      var yourscore = {
        name: personsname,
        score: score,
      };
      console.log(yourscore)
      //this is the push
      scoreboard.push(yourscore);
      //put new scoreboard back into local storage
      localStorage.scoreboard=JSON.stringify(scoreboard);

      scoreboard.sort(function(a,b){
        return b.score - a.score;
      });
      scoreboard.forEach(function(item){
        document.querySelector('#scoreboard').innerHTML +=`
        <li class="list-group-item px-5">${item.name} <span class="float-end">${item.score}</span></li>
        `
      })


    }
    savescoreboard()
   
}

function restart(event){
  event.preventDefault();
  
    location.reload();
}


startBtn.addEventListener("click", function(event){
  event.preventDefault();
  personsname = document.querySelector('#name').value
 startGame()

})