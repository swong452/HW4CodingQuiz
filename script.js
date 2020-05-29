var quizEl = document.querySelector("#Quiz");
var firstpgEl = document.querySelector("#firstpg");
var timerDisplay = document.querySelector("#timer");
var questionsDisplay = document.querySelector("#questions");
var questionContentDisplay = document.querySelector("#questionContent");


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

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;
var questionList =[q1,q2,q3];
var questionLen = questionList.length;
var livequestion;
var score = 0;
var tempwait;
var goOn = true;
var index = 0;

// User hit Start quiz, so closing first page
quizEl.addEventListener("click", closepage);

// After page is closed, kick off quiz questions.
function closepage(event) {
    console.log("Start questions page");
    firstpgEl.style.display = "none";
    startquiz(0);
     
}


function startquiz(i) {
  console.log("Starting i value is:", i);
  startTimer();
  
  questionsDisplay.style.display = "block";
  questionContentDisplay.innerHTML = "";
  //questionContentDisplay = " ";

  livequestion = "";
  livequestion = questionList[i];

  var ask = document.createElement("p");
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var correct = document.createElement("p");
  var wrong = document.createElement("p");

  ask.textContent = livequestion.question;
  console.log("The object we are dealing with is: ", questionList[i]);
  button1.textContent = livequestion.choice1;
  button1.setAttribute("data-index", 1);
  button2.textContent = livequestion.choice2;
  button2.setAttribute("data-index", 2);
  button3.textContent = livequestion.choice3;
  button3.setAttribute("data-index", 3);
  correct.textContent = "Correct, you are Smart !";
  wrong.textContent = "Sorry, you are WRONG ";
  
  questionContentDisplay.appendChild(ask);
  questionContentDisplay.appendChild(button1);
  questionContentDisplay.appendChild(button2);
  questionContentDisplay.appendChild(button3);
  console.log("Button 1 attribute: ", button1.getAttribute("data-index"));
  console.log("Button 2 attribute: ", button2.getAttribute("data-index"));
  console.log("Button 3 attribute: ", button3.getAttribute("data-index"));
  console.log("Correct answer (livequestion) supposed to be: ", livequestion.answer);

  //questionContentDisplay.addEventListener("click", function (event) {
  questionContentDisplay.addEventListener("click", checkAnswer);
  
  
  function checkAnswer (event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("A CLICK event occured - User clicked button");

    if (event.target.matches("button") == true) {  
      var userchoice = event.target.getAttribute("data-index");
      console.log("User clicked on choice:", userchoice);
      console.log("Correct Choice is:", livequestion.answer);
      if (userchoice == livequestion.answer) {
          score++;
          questionContentDisplay.appendChild(correct);
          alert("Right !");
          console.log("You got it Right ! current score: ", score);
      } else {
          secondsElapsed = secondsElapsed + 10;
          questionContentDisplay.appendChild(wrong);
          alert("wrong !");
          console.log("Wrong ans: current score: ", score);
      }
      console.log("Towards End of IF: Value of i before startquiz:", i);

      // sleep(500);

      if (questionLen > (i + 1)) {
        startquiz(++i);
      } else {
        console.log("Final score: ", score);
      }
    }// End Outer If 
  } //End Event Listener for click

} // End Function StartTime


// Utility Function

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    totalSeconds = 135;
    clearInterval(interval);
  
    // we only want to start the timer if minutes is > 0
    if (totalSeconds > 0) {    
      /* the "interval" variable here using "setInterval()" begins the recurring increment of the 
         secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function() {
          secondsElapsed++;
          //So renderTime() is called here once every second.
          renderTime();
        }, 1000);
    } else {
      alert("Minutes of work/rest must be greater than 0.")
    }
  }

  /* This function stops the interval and also resets secondsElapsed 
   and calls "setTime()" which effectively reset the timer 
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
    secondsElapsed = 0;
    clearInterval(interval);
    renderTime();
  }



//This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    // minutesDisplay.textContent = getFormattedMinutes();
    timerDisplay.textContent = "Timer: " + getFormattedSeconds();
  
   // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
      alert("Times Up");
      stopTimer();
    }
  }
  
function getFormattedSeconds() {
    //var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var secondsLeft = (totalSeconds - secondsElapsed)
  
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
  }





