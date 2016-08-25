// // Author: Nigel Finley. August 2016. UT Bootcamp Trivia Assisgnment

//             // Once number hits zero...
//             if (number === 0){
//                 // ...run the stop function.
//                 stop();
//                 // Alert the user that time is up.
//                 alert('Time Up!')
//                 // Then display the correct answer 
//             }
//         }
//         // This is the coutdown
//          setTimeout (timeUp, 1000 *15);

//            function timeUp(){
//             alert("you have no time left")
//              $('#time-left').html('Your time is up');
//             // Once Fifteen seconds pass, time is up! 
//             // Send an alert and have the "time-left" div let the user know.

//             // The following line will play the audio file you linked to above.
//             audio.play();
//         }


// Variables: 

triviaObj = {


    masterQuestions: [{
            question: "How old was Mozart when he wrote his first symphony?",
            answers: [8, 19, 6, 12],
            correctAnswer: 8,
            visual: 'assets/images/mozart.jpg',
            sound: 'assets/audio/mozart.m4a'

        }, 
        {
            question: "What is best-selling single of all time?",
            answers: ["My Heart Will Go On by Celine Dion", "It's Now Or Never by Elvis Presley", "I Will Survive by Gloria Gaynor", "White Christmas by Bing Crosby"],
            correctAnswer: "White Christmas by Bing Crosby",
            visual: 'assets/images/bing.jpg',
            sound: "'assets/audio/bing.m4a'"
        },
         {
           question: "What is the name of the man who is considered to be the 'fifth' Beatle, of The Beatles?",
            answers: ["James", "Bob", "Sir George Henry Martin", "Sir Ben Franklin"],
            correctAnswer: "Sir George Henry Martin",
            visual: 'assets/images/george.jpg',
            sound: "'assets/audio/heyjude.m4a'"

        } 
        // {
        //     question: 
        //     answers: 
        //     correctAnswer: 
        //     visual:

        // } {
        //     question: 
        //     answers: 
        //     correctAnswer: 
        //     visual:

        // } {
        //     question: 
        //     answers: 
        //     correctAnswer: 
        //     visual:

        // }
    ],



    // Set up the timer function (see previous class work for this.) Do a start and stop piece. See set interval and timeout exercises. 

    // Question Page function
    // This will display: 
    // 1. New Timer (reset) make sure to reset it
    // 2. The question pulled from the questions array in order by incrementing by 1 everytime it runs
    // 3. The answers are populated as well


    // create an Answers page function that displays all of the answers. 
    // It should create a ul li list and then pull the array length of each array below and the dynamically display it on the screen
    // It needs to also have a reset button to bring you back to the first question

    // Push the correct guess here and then get the length of the array and display that number at end
    guessesCorrect: 0,

    // Push the incorrect guesses here and then displayed
    guessesIncorrect: 0,

    // If the timer goes off before you guess it falls into this catagory
    // unansweredGuesses: triviaObj.masterQuestions.length - (guessesCorrect + guessesIncorrect),

    // This will house the current question selected at random and removed from the master question once the masterQuestions array is empty move onto the final answer page
    currentQuestion: [],

    // currentAnswers: [],

    timerCount: 30,

    // This function populates the question and answers on the page based on the
    // putQuestion: function(){
    //     // look into masterQuestions and pull out a random question and then display it on the page
    //     triviaObj.currentQuestion = triviaObj.randomPick();
    //     $('#question').html('<h2>' + triviaObj.masterQuestions[0].question + '<h2>');
    // },

    //     putAnswers: function(){


    //     },
    // // This function will check to see if what was clicked in the userguess array is correct. On user click
    //     checkAnswer function
    // loop the userGuess against answer array



    randomPick: function() {
        // var questionIndex= Random.Range(0, (triviaObj.masterQuestions.length -1));
        var initialPick = this.masterQuestions[Math.floor(Math.random() * this.masterQuestions.length)];
        return initialPick


    }




}

//Create an array that used as an indexer for your object
// var indexer=[];
// for(var i=0;i<masterQuestions.length;++i){
//     indexer.push(i);
// }

// Initial set up
// Throw up a start button and when clicked it displays the first question page
$(document).ready(function() {
    // Intial page load with the button created dynamically
    var b = $('<button>');
    b.addClass('waves-effect waves-light btn-lg text-center');
    b.html('START TRIVIA!');

    $('#start').append(b);


// STAGE 1: Loads the page after a user click and displays first question and timer

    // Look at storing the entire load page in a function
    // triviaLoad();
    $('#start').on('click', function(event) {
        $(this).hide();
        run();
        // This pushes the random picked question object to the current question array
        triviaObj.currentQuestion.push(triviaObj.randomPick());

        console.log(triviaObj.currentQuestion);
        $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // Setting the variable of current answers equal to the answers section with the current question array
        var currentAnswers = triviaObj.currentQuestion[0].answers

        // Ultimately run this in a function
        var parent = document.getElementById('answers');

        currentAnswers.forEach(function(answer, index, array){
            var button = document.createElement('button');
            button.setAttribute('class', 'guess');
            // USE DATA NAME INSTEAD OF ID
            // Looks at using .val()
            var text = document.createTextNode(answer);
            button.appendChild(text);
            parent.appendChild(button);
            // button.on('click', answerListener);

        }); 
        $('.guess').on('click', answerListener); 
    
        // splice function to remove the current question object from the array so that it cannot be populated again
        var removeIndex = triviaObj.masterQuestions.indexOf(triviaObj.currentQuestion);
            if (removeIndex != 1) {
                triviaObj.masterQuestions.splice(removeIndex, 1);
                console.log("masterQuestions should have been altered! It is now: " + JSON.stringify(triviaObj.masterQuestions));
            }   

        // Fix the timing of when the timer shows so it shows right away
        function run() {
            counter = setInterval(decrement, 1000);
        }
        // The decremeent function.
        function decrement() {
            // Decrease number by one.
            triviaObj.timerCount--;
            // Show the number in the #show-number tag.
            $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + ' Seconds </h2>');

            // // Once number hits zero...
            if (triviaObj.timerCount === 0) {
                // ...run the stop function.
                // put in the answer page function and stop
                stop();
                // Move to the answer page
            }
        }
        // This stops the timer
        function stop() {
            // Clears our "counter" interval.
            // We just pass the name of the interval
            // to the clearInterval function.
            clearInterval(counter);
        }




        // Set the first question to the page
    });

    // STAGE 2: User guesses the answer
    function answerListener(event) {
        // Need to add the stop counter function here as well 

        // grab id of the user click then compare it to the current answer

        var userguessClick = $(this).html();
        console.log(userguessClick);
        // Or you can take what was clicked and pull the content as a string and then compare it to the correct answer

        // Scenario 1: timer runs out
         // if (triviaObj.timerCount === 0) {
         //        // ...run the stop function.
         //        // put in the answer page function and stop
         //        stop();
         //        // Move to the answer page
         //    }
        
        // Display the text: Times Up!
        // Then display the correct answer ("The correct answer is: " triviaObj.question.correctAnswer)
        // Display image or gif

        // scenario 2: correct guess
         // if (userguessClick == triviaObj.masterQuestions.correctAnswer)



        // scenario 3:  wrong answer

// Question page
// Use the quesiton function 
// To get to the answer page: 
// Either the timer runs out
// User selects right asnwer
// User selects wrong answer

// subsequent questions

// answer pages (3 types): 
// if user guesses right
// Display the text: "Correct"
// Then display the Image or gif
// Timer also stays at the top of the page

// If user guesses wrong
// Display the text: Incorrect!
// Then display the correct answer ("The correct answer is: " triviaObj.question.correctAnswer)
// Display image or gif



    };






});





// Final display of answers
// Timer stops
