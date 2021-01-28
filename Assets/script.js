
//start
var startBtn = document.querySelector("#goTime");
console.log("Page Loaded")



//global variables to be used for entire JS

var questions = [
    "1. JavaScript is a ___ -side programming language",
    "2. How to write an if statement in javaScript?",
    "3. What will 'Boolean(3 < 7)' return?",
    "4. How do you write a comment in javaScript?",
    "5. What is the correct why to write if 'i' is not equal to 8",
    "6. How do you call a function named 'myFunction?'"
];

var questionresponses = [
    ["Client","Server","Both","None"],
    ["if i = 5","if i == 5 then","if i = 5 then","if (i==5)"],
    ["true","false","NaN","SyntaxError"],
    ['\\Like this-->', "Like this", "//Like this"],
    ["if (i !=8)", "if i <> 8", "if i = ! 8 then", "if (i<>8)"],
    ["call myFunction()","myFunction()","call function myFunction()"]
]

var questionanswers = [
    "Both",
    "if (i==5)",
    "true",
    "//Like this",
    "if (i !=8)",
    "myFunction()"
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
    document.querySelector('#score').classList.remove('d-none')
    document.querySelector('#scoreheader').classList.remove('d-none')
    document.querySelector('#timer').textContent = timer
    document.querySelector('#score').textContent = score


    timeercountdown = setInterval(timerFunction, 1000)

    questionroulette()

}

function questionroulette(){
    var currentquestion = questions[questionNo]
    var questionEl = document.querySelector('.nextQuestion')
    // display the question within the <h3> header
    questionEl.innerHTML = `<h3>${currentquestion}</h3><br><br>`
  
    // loop through and show each answer as a button
    for( var i=0; i < questionresponses[questionNo].length; i++ ){
      var availableresponses = questionresponses[questionNo][i]
      
      questionEl.innerHTML += 
      `<button onClick="selectAnswer(event,'${availableresponses}')" class="btn btn-primary mx-1" type="button">${availableresponses}</button>`
    }
}


function selectAnswer( event,availableresponses ){
    event.preventDefault()
    console.log( `question answer id: ${availableresponses}` )
    if( availableresponses===questionanswers[questionNo] ){
      console.log( `Nice! Correct answer: ${availableresponses}` )
      scoreCounter(1)
    } else {
      console.log( `Nope, penatly, -10 seconds` )
      timerFunction(10)
    }
    questionNo++
    // show next question or quit game if there are no further questions left
    if( questionNo<questions.length )
      questionroulette()
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
        scoreboardname: personsname,
        scoreboardscore: score,
      };
      console.log(yourscore)
      //this is the push
      scoreboard.push(yourscore);
      //put new scoreboard back into local storage
      localStorage.setItem("scoreboard", JSON.stringify(scoreboard));

      scoreboard.sort(function(a,b){
        return b.scoreboardscore - a.scoreboardscore;
      });
      scoreboard.forEach(function(scoreboardscore){
        var litag = document.createElement("li");
        litag.textContent= scoreboardscore.scoreboardname + "-" + scoreboardscore.scoreboardscore;
        var lsb = document.querySelector("#scoreboard");
        lsb.appendChild(litag);
      })


    }
    savescoreboard()
   
}

function restart(event){
  event.preventDefault();
  
    location.reload();
}

//new code I forgot to build - log user name and score



// var scoreboard = {
//   scoreboardname: document.querySelector("#name").value,
//   scoreboardscore: document.querySelector("#score").value,
//   }

 
// console.log( `scoreboard contents: `, scoreboard )
// localStorage.scoreboard = JSON.stringify( scoreboard )
// console.log( `.. scoreboard saved as: `, localStorage.scoreboard )




// if( localStorage.scoreboard ){
//   var scoreboard = JSON.parse( localStorage.scoreboard )
//   console.log( ` found saved Scoreboard: `, scoreboard )
// }



startBtn.addEventListener("click", function(event){
  event.preventDefault();
  personsname = document.querySelector('#name').value
 startGame()

})