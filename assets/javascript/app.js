// // Author: Nigel Finley. August 2016. UT Bootcamp Trivia Assisgnment

// TODO: 
    // -Fix the buttons so they display in a block of four two and two instead of stacked
    // -Get audio to play


// Variables: 

triviaObj = {


    masterQuestions: [{
            question: "How old was Mozart when he wrote his first symphony?",
            answers: ["8 Years Old", "19 Years Old", "6 Years Old", "12 Years Old"],
            correctAnswer: "8 Years Old",
            visual: 'assets/images/mozart.jpg',
            sound: 'assets/audio/mozart.m4a',
            fact: "Over his short life span Mozart wrote XX symphonies"

        }, 
        {
            question: "What is best-selling single of all time?",
            answers: ["My Heart Will Go On by Celine Dion", "It's Now Or Never by Elvis Presley", "I Will Survive by Gloria Gaynor", "White Christmas by Bing Crosby"],
            correctAnswer: "White Christmas by Bing Crosby",
            visual: 'assets/images/bing.jpg',
            sound: 'assets/audio/bing.m4a',
            fact: "This single has sold more than ...."
        },
         {
           question: "What was The Beatles first hit single in America?",
            answers: ["Twist And Shout", "I Want To Hold Your Hand", "Love Me Do", "I Saw Her Standing There"],
            correctAnswer: "I Want To Hold Your Hand",
            visual: 'assets/images/beatles.jpg',
            sound: 'assets/audio/hand.m4a',
            fact: "This song was released in 1964..."

        },
        {
           question: "What artist has acheived the highest sales in history of an album in its first week?",
            answers: ["Taylor Swift", "NSYNC", "Adele", "Britney Spears"],
            correctAnswer: "Adele",
            visual: 'assets/images/adele.jpg',
            sound: 'assets/audio/hello.m4a',
            fact: "Adele sold 3.38 million copies of her album 25 in the first week of its release"

        } 
        // {
        //    question: "Streaming question",
        //     answers: ["Twist And Shout", "I Want To Hold Your Hand", "Love Me Do", "I Saw Her Standing There"],
        //     correctAnswer: "I Want To Hold Your Hand",
        //     visual: 'assets/images/beatles.jpg',
        //     sound: "'assets/audio/hand.m4a'"
        //     fact: '',

        // } 
    ],

    // Push the correct guess here and then get the length of the array and display that number at end
    guessesCorrect: 0,

    // Push the incorrect guesses here and then displayed
    guessesIncorrect: 0,

    // If the timer goes off before you guess it falls into this catagory
    unansweredGuesses: 0, 
        // unansweredGuesses: triviaObj.masterQuestions.length - (guessesCorrect + guessesIncorrect),

    // This will house the current question selected at random and removed from the master question once the masterQuestions array is empty move onto the final answer page
    currentQuestion: [],

    currentGuess:"",

    userGuess: "",

    timerCount: 30,

    randomPick: function() {
        // var questionIndex= Random.Range(0, (triviaObj.masterQuestions.length -1));
        var initialPick = this.masterQuestions[Math.floor(Math.random() * this.masterQuestions.length)];
        return initialPick;


    },
    answerListener: function(event) {
        // Need to add the stop counter function here as well 

        // grab id of the user click then compare it to the current answer

        var userguessClick = $(this).html();
        console.log(userguessClick);

        
    },
    // Function to empty currently populated divs with questions and answers
    emptyDivs: function () {
        $('#question').empty();
        $('#answers').empty();
    },

    // This is the set Timout function that automatically advances the page after the answer page
      // setTimeout(function() {}, 10);
      timeOut: function () {
        setTimeout (fiveSeconds, 1000 *5);
        // Step 3:
        // Fill in the blanks to these functions.
        function fiveSeconds() {
            alert("Five Seconds have passed");
            $('#time-left').html('5 Seconds have passed');
            // Once five seconds pass, send an alert and state the time remaining in the "time-left" div.
        }
    }

    // The time up function
    timesUp: function() {
        $('#question').html('Times UP!');
        $('#correctAnswer').html('The Correct Answer Was: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        console.log(triviaObj.currentQuestion[0].correctAnswer);

        triviaObj.displayAssets();
        
        // add the timout function

    } ,      
// Correct Guess function
    correctGuess: function() {
        $('#question').html('Correct!');
        triviaObj.displayAssets();
        // Timer also stays at the top of the page
        // Add the set timout method
    },

// Incorrect guess function
    incorrectGuess: function() {
        $('#question').html('Wrong!');
        ('#correctAnswer').html('The Correct Answer Was: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        triviaObj.displayAssets();

        // add the timout function
    },

// Create displayAssets function to display the selected audio and video assets for the questions guesses. This would be added to win, times up and loss display
    displayAssets: function(){
        // Sets the image on the screen
        var img = $('<img>');
        img.attr('src', triviaObj.currentQuestion[0].visual);
        img.attr('class', 'center-block');
        $('#picture').html(img);
        
        // Sets the fun fact
        $('#fact').html('<p>'+'Fun Fact: ' + triviaObj.currentQuestion[0].fact+ '</p>');;
        

        // sets the audio on the page
        // var audio = triviaObj.currentQuestion[0].sound;
        // // audio.autoplay = true;
        // // audio.attr('src', triviaObj.currentQuestion[0].sound);
        // audio.play();

    }



}

// random pick function is not working. 


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
        // run();
        // // This pushes the random picked question object to the current question array
        // triviaObj.currentQuestion.push(triviaObj.randomPick());

        // console.log("Current Question: " + JSON.stringify(triviaObj.currentQuestion));
        // $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // // Setting the variable of current answers equal to the answers section with the current question array
        // var currentAnswers = triviaObj.currentQuestion[0].answers

        // // Ultimately run this in a function
        // var parent = document.getElementById('answers');

        // currentAnswers.forEach(function(answer, index, array){
        //     var button = document.createElement('button');
        //     button.setAttribute('class', 'guess btn btn-primary center-block');
        //     // USE DATA NAME INSTEAD OF ID
        //     // Looks at using .val()
        //     var text = document.createTextNode(answer);
        //     button.appendChild(text);
        //     parent.appendChild(button);
        //     // button.on('click', answerListener);

        }); 
        // This initiates the user click/guess after the buttons are created on the screen
        $('.guess').on('click', triviaObj.answerListener); 
        // Need to add timer stop (but can only add here after the run function is turned into method)
        // stop();
    // it is not getting to here the click is not registering
        triviaObj.userGuess = triviaObj.answerListener();
        console.log("This is what you just clicked: " + triviaObj.userGuess);
        
         if (triviaObj.userGuess== triviaObj.currentQuestion[0].correctAnswer) {
            stop();
            triviaObj.emptyDivs();
            triviaObj.correctGuess();
            console.log("This is the user pick: " + triviaObj.answerListener());
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);

     // need to empty all curent ids 

        // call method to run the correct answer page

        // increment the correct guesses  by one

         // call the setTimeout function to stay on this page for 5 seconds before moving on to next page then start timer again

        }     
       
    
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
                triviaObj.emptyDivs();
                triviaObj.timesUp();
                triviaObj.unansweredGuesses++;
                var audio = triviaObj.currentQuestion[0].sound;
        // audio.autoplay = true;
        // audio.attr('src', triviaObj.currentQuestion[0].sound);
                audio.play();
                console.log(triviaObj.unansweredGuesses);
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


   //  // incorrect guess
   // if  (triviaObj.answerListener()!= triviaObj.masterQuestions.correctAnswer) {
   //          // need to empty all curent ids 

   //          // call method to run the incorrect answer page

   //          // increment the  incorrect guesses  by one

   //           // call the setTimeout function to stay on this page for 5 seconds before moving on to next page then start timer again
   //  }

   //  // Game is over and display progress
   //  else if (triviaObj.masterQuestions.length == 0) {
   //       // need to empty all curent ids 

   //          // call method to to display the totals guesses
   //          // maybe play success or failure music
   //          // stop timer

   //  }
     

    });

    // STAGE 2: User guesses the answer
    // Times up scenario
    // if (triviaObj.timerCount === 0) {
    //             // ...run the stop function.
    //             // put in the answer page function and stop
    //         stop();
    //         triviaObj.emptyDivs();
            // need to empty all curent ids 

            // call method to run times up answer page

            // increment the unanswered by one

            // call the setTimeout function to stay on this page for 5 seconds before moving on to next page then start timer again

    
    // correct guess
   




// subsequent questions

// answer pages (3 types): 


// If user guesses wrong
// Display the text: Incorrect!
// Then display the correct answer ("The correct answer is: " triviaObj.question.correctAnswer)
// Display image or gif










});

