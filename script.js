var quizEl = document.querySelector("#Quiz");
var firstpgEl = document.querySelector("#firstpg");
var timerDisplay = document.querySelector("#timer");
var questionsDisplay = document.querySelector("#questions");
var questionContentDisplay = document.querySelector("#questionContent");

// Create a user with Name and final score
// var user = {
//     name: username.value.trim();
//     finalscore: score;
// }
// localStorage.setItem('user', user);

var q1 = {
    question: "What does Gandlaf Full Time job ?",
    choice1:"1. Wizard",
    choice2:"2. Witch",
    choice3:"3. Gardner",
    answer:1
}

var q2 = {
    question: "What does Samwise Gamgie Full Time job ?",
    choice1: "1. Wizard",
    choice2: "2. Witch",
    choice3: "3. Gardner",
    answer:3
}

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;
var questionList =[q1];
var score = 0;


quizEl.addEventListener("click", closepage);



function closepage(event) {
    console.log("Start questions page");
    firstpgEl.style.display = "none";
    startquiz();
}

function startquiz() {
    startTimer();
    questionsDisplay.style.display = "block";

    //dynamically loop thru each questions, display
    // store user ans
    // if incorrect, update timer, show incorrect
    
    for (var i = 0; i < questionList.length; i++) {

        var livequestion = questionList[i];
    
        var ask = document.createElement("p");
        var button1 = document.createElement("button");
        var button2 = document.createElement("button");
        var button3 = document.createElement("button");
        var correct = document.createElement("p");
        var wrong = document.createElement("p");

        ask.textContent = livequestion.question;
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

        questionContentDisplay.addEventListener("click", function (event) {
            event.stopPropagation();
            if (event.target.matches("button") == true) {
                var userchoice = event.target.getAttribute("data-index");
                console.log("User clicked on choice:", userchoice);
                if (userchoice == livequestion.answer) {
                    score++;
                    questionContentDisplay.appendChild(correct);
                    console.log("current score: ", score);
                } else {
                    secondsElapsed = secondsElapsed + 10;
                    questionContentDisplay.appendChild(wrong);
                    console.log("current score: ", score);
                }
            }
        })


      }
}


// Utility Function

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
    totalSeconds = 35;
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





