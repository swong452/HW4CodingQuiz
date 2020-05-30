var firstpageEl = document.querySelector("#firstpage");
var viewscoreEl = document.querySelector("#viewscore");
var quizEl = document.querySelector("#quiz");
var questionsDisplay = document.querySelector("#question-container");
var questionEl = document.querySelector("#questions");
var choicesDisplay = document.querySelector("#choices");
var choiceAEl = document.querySelector("#choiceA");
var choiceBEl = document.querySelector("#choiceB");
var choiceCEl = document.querySelector("#choiceC");
var resultEl = document.querySelector("#result");
var timerDisplay = document.querySelector("#timer");
var finalscoreDisplay = document.querySelector("#finalscore");
var userinputEl = document.querySelector("#userinput");
var scoreEl = document.querySelector("#score");
var submitNameEl = document.querySelector("#submitName");
var highscoreDisplay = document.querySelector("#highscore");
var playerListDisplay = document.querySelector("#playerlist");
var goBackMenuEl = document.querySelector("#goBackMenu");
var clearScoreEl = document.querySelector("#clearScore");


// Define Variable
var q1 = {
    question: "Gandlaf The Gray Full Time job ?",
    choice1:"1. Wizard",
    choice2:"2. Witch",
    choice3:"3. Gardner",
    answer:"1"
}

var q2 = {
    question: " Samwise Gamgie Full Time job ?",
    choice1: "1. Fighter",
    choice2: "2. Waiting for Lucy",
    choice3: "3. Gardner",
    answer:"3"
}

var q3 = {
  question: "Frodo's Full Time job ?",
  choice1: "1. Book Worm",
  choice2: "2. Destroy the ring",
  choice3: "3. Clean house for Bilbo",
  answer:"2"
}

var playerList = [{name:"Nobody", score:77}];

var totalSeconds;
var secondsElapsed = 0;
var interval;
var score = 0;
var questionList =[q1,q2,q3];
var questionLen = questionList.length - 1;
var index = 0;
var livequestion;
var gameover // Flag to prevent "ALLDone/HighScore" screen flipped during timeout 


// User hit Start quiz, so closing first page
//quizEl.addEventListener("click", startQuiz);
quizEl.addEventListener("click", startQuiz);

// After page is closed, kick off quiz questions.
function startQuiz(event) {
    gameover = false;
    console.log("Start questions page");
    firstpageEl.style.display = "none";
    questionsDisplay.style.display = "block";
    startTimer();
    renderQuestion(); // display only
}


function renderQuestion() {
  console.log("Start Render Question");
  //choicesDisplay.innerHTML = "";
  livequestion = questionList[index];
  
  console.log("The object we are dealing with is: ", questionList[index]);
  
  questionEl.textContent = livequestion.question;
  choiceAEl.textContent = livequestion.choice1;
  choiceBEl.textContent = livequestion.choice2;
  choiceCEl.textContent = livequestion.choice3;
  resultEl.textContent = "";
  // console.log("question is: ", questionList[index].question);
  // console.log("Choice 1 is : ", questionList[index].choice1);
  // console.log("Choice 2 is : ", questionList[index].choice2);
  // console.log("Choice 3 is : ", questionList[index].choice3);
  // console.log("Choice 1 attribute: ", choiceAEl.getAttribute("data-index"));
  // console.log("Choice 2 attribute: ", choiceBEl.getAttribute("data-index"));
  // console.log("Choice 3 attribute: ", choiceCEl.getAttribute("data-index"));
  // console.log("Correct answer (livequestion) supposed to be: ", livequestion.answer);
}

choicesDisplay.addEventListener("click", checkAnswer);

function checkAnswer(event) {
  event.stopPropagation();
  console.log(" Enter Function checkAnswered");

  //if (event.target.matches("button") == true) {
      
  let userchoice = event.target.getAttribute("data-index");
  console.log("User clicked on choice:", userchoice);
  console.log("Correct Choice is:", livequestion.answer);

  if (userchoice == livequestion.answer) {
      score++;
      resultEl.textContent="YOU ARE CORRECT";
      console.log("You got it Right ! current score: ", score);
  } else {
      secondsElapsed = secondsElapsed + 5;
      resultEl.textContent="YOU ARE WRONG. Boo";
      console.log("Wrong ans: - 5 sec. current score: ", score);
  }
  setTimeout(nextQuestions, 1000);
} //End If

function nextQuestions () {
  if (index < questionLen) {
    // Continue to play to next question / object
    index++;
    renderQuestion();
  } else {
    // Game over
    stopTimer();
    renderFinalscore();
    
  }
}

function renderFinalscore() {
  gameover = true;
  questionsDisplay.style.display = "none";
  finalscoreDisplay.style.display = "block";
  scoreEl.textContent = score;
  //console.log("user name is ", userinputEl.getAttribute("name"));

}

submitNameEl.addEventListener("click", function (event){
  event.preventDefault();
  event.stopPropagation();
  console.log("FORM submit clicked:", userinputEl.value );
  finalscoreDisplay.style.display = "none";
  addPersonToList();
  highscoreDisplay.style.display = "block";
  renderHighscore();
} )


function addPersonToList() {
  event.preventDefault();
  var name = userinputEl.value;
  playerList.push({ "name": name, "score": score });
  console.log("Player list array content: ", playerListDisplay);
  
}

function renderHighscore () {
  console.log("renderHighScore, score is: ", score);
  var name = userinputEl.value;
  var li = document.createElement("li");
  li.id = playerList.length;
  li.textContent = name + ":  " + score;
  playerListDisplay.append(li);
}

goBackMenuEl.addEventListener("click", goBackMenu);

function goBackMenu () {
  console.log("Inside GoBack Menu");
  highscoreDisplay.style.display = "none";
  firstpageEl.style.display = "block";
  score=0;
  index=0;
  totalSeconds = 0;
  secondsElapsed = 0;
  scoreEl.textContent = 0; // Re-initialze score display value before next round start
  userinputEl.value=""; // Re-Intialize Players Name to nothing, else next round, old name remains.
}

clearScoreEl.addEventListener("click", emptyscore);

function emptyscore () {
  event.preventDefault();
  event.stopPropagation();
  playerListDisplay.innerHTML = "";
  playerList = [];
  console.log("clear score entered. Array Playerlist should be nothing: ", playerListDisplay);
}

viewscoreEl.addEventListener("click", function(event) {
  console.log("User clicked Top Corner View High Score");
  stopTimer();
  firstpageEl.style.display = "none";
  questionsDisplay.style.display = "none";
  finalscoreDisplay.style.display = "none";
  highscoreDisplay.style.display = "block";
})



// ##############  Timer Related Function ###########

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    totalSeconds = 25;
    clearInterval(interval);
  
    if (totalSeconds > 0) {    
      /* the "interval" variable here using "setInterval()" begins the recurring increment of the 
         secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function() {
          secondsElapsed++;
          //So renderTime() is called here once every second.
          renderTime();
          checkTimeout();
        }, 1000);
    }
  } // End startTimer


// This function stops the interval and also resets secondsElapsed 
function stopTimer() {
    secondsElapsed = 0;
    clearInterval(interval);
    renderTime(); // Added
  }


// Display time in HTML on certain format
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    timerDisplay.textContent = "Timer: " + getFormattedSeconds();
} // End renderTime()

function checkTimeout() {
   // checks to see if the time has run out
   if (secondsElapsed >= totalSeconds) {
    alert("Times Up");
    stopTimer();
    // If while playing game, times out (gameover == false) -> flip screen to FinalScore
    if (gameover == false) {
      questionsDisplay.style.display = "none";
      finalscoreDisplay.style.display = "block";
    }
    console.log("Times up - current score:", score);
  }
} // End checkTimeout()


  
function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed)
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
  }





