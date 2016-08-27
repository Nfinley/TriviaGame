// // Author: Nigel Finley. August 2016. UT Bootcamp Trivia Assisgnment

// TODO: 
    // -Fix the buttons so they display in a block of four two and two instead of stacked
    // -Get audio to play
    // -add gif for the photos instead of static images
    // -change answers to be p tags within bootstrap columns and add backgrounds and box shadows


    // - move splice function to the page load function 
    // - put the set Timeout functions into incorrect guesses and timer == 0 scenario


// Variables: 
var masterIndex;

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

    timerCount: 29,


    // This function loads the page and loads the timer
    pageLoad: {
        run: function() {
            counter = setInterval(this.decrement, 1000);
        },
        // The decremeent function.
        decrement: function() {
            
            // Show the number in the #show-number tag.
            $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + ' Seconds </h2>');
            // Decrease number by one.
            triviaObj.timerCount--;

            // // Once number hits zero...
            if (triviaObj.timerCount === -1) {
                // ...run the stop function.
                // put in the answer page function and stop
                
                triviaObj.emptyDivs();
                triviaObj.timesUp();
                triviaObj.unansweredGuesses++;
                console.log("Unanswered Guesses:" + triviaObj.unansweredGuesses); 
                triviaObj.spliceArray();
                // is the timeout function to automatically switch the page
                triviaObj.pageTimeout.timeout();

                // Move to the answer page
            }

        },
        // This stops the timer
        stop: function() {
            // Clears our "counter" interval.
            // We just pass the name of the interval
            // to the clearInterval function.
            clearInterval(counter);
        }   
    },
    // Timeout function
    pageTimeout: {
        
        timeout: function() {
            setTimeout (this.fiveSeconds, 1000 *5);
        },
        fiveSeconds: function() {
            triviaObj.emptyDivs();
            triviaObj.currentQuestion = [];
            console.log("This is the current question (should be blank): " + triviaObj.currentQuestion.length);
           
                    // game over
            if (triviaObj.masterQuestions.length == 0) {
                // Game is over and display progress
                // triviaObj.emptyDivs();
                triviaObj.summaryPage();
                triviaObj.pageLoad.stop();

            }
            else {
                triviaObj.questionLoad();
                // this resetart is not working
                // triviaObj.timerReset();
            }   
        }
    },

    timerReset: function() {
        var timerCount = 0;
        return timerCount;
         $('#timer').html('<h2>' + 'Time Remaining: ' + triviaObj.timerCount + ' Seconds </h2>');
    },

    questionLoad: function() {
        this.timerCount = 29;
         // Show the number in the #show-number tag.
        $('#timer').html('<h2>' + 'Time Remaining: ' + 30 + ' Seconds </h2>');
        this.pageLoad.run();
        // This pushes the random picked question object to the current question array
        this.currentQuestion.push(this.randomPick());

        console.log("Current Question: " + JSON.stringify(this.currentQuestion));
        $('#question').html('<h2>' + triviaObj.currentQuestion[0].question + '<h2>');

        // Setting the variable of current answers equal to the answers section with the current question array
        var currentAnswers = this.currentQuestion[0].answers

        // stores get element in variable parent 
        var parent = document.getElementById('answers');

        //  a for each function that runs for every answer in the array
        currentAnswers.forEach(function(answer, index, array){
            // creates a p element
            var p = document.createElement('p');
            // Add other classes to update the background
            p.setAttribute('class', 'guess center-block');
            
            // storing creating a text node of answer in text
            var text = document.createTextNode(answer);
            // appending text to the previously created p tag
            p.appendChild(text);
            // appending the child to the parent in this case the p tag to the parent variable
            parent.appendChild(p);
           
        });
    },

    randomPick: function() {
        // var questionIndex= Random.Range(0, (triviaObj.masterQuestions.length -1));
        masterIndex = Math.floor(Math.random() * this.masterQuestions.length);
        var initialPick = this.masterQuestions[masterIndex];
        
        console.log("Initial Pick: "  + JSON.stringify(initialPick));
        return initialPick;


    },

    // splice function to remove the current question object from the array so that it cannot be populated again
    spliceArray: function(){      
        // var masterIndex = triviaObj.currentQuestion;
        
        // if (removeIndex != 0) {
        triviaObj.masterQuestions.splice(masterIndex, 1);
        console.log("The remove index value is: " + JSON.stringify(masterIndex));
        console.log("masterQuestions should have been altered! It is now: " + JSON.stringify(triviaObj.masterQuestions));
        console.log("Master Questions length is: " + triviaObj.masterQuestions.length)
        console.log("Current Question Length: " + triviaObj.currentQuestion.length);
        // }   
    },
    // answerListener: function(event) {
    //     // grab id of the user click then compare it to the current answer
    //     var userguessClick = $(this).text();
    //     console.log("log within the function: " + userguessClick);

        
    // },
    // Function to empty currently populated divs with questions and answers
    emptyDivs: function () {
        $('#question').empty();
        $('#answers').empty();
        $('#fact').empty();
        $('#picture').empty();
        $('#correctAnswer').empty();
        $('#audioplayer').attr('src', '');

        
    },

    // The time up function
    timesUp: function() {
        $('#question').html('Times UP!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
        console.log(triviaObj.currentQuestion[0].correctAnswer);

        triviaObj.displayAssets();
        triviaObj.pageLoad.stop();
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
        $('#question').attr('style', 'font-size: 40px;').html('Wrong!');
        $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaObj.currentQuestion[0].correctAnswer + '</span>');
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
        $('#fact').html('<h4>'+'Fun Fact: ' + triviaObj.currentQuestion[0].fact+ '</h4>');
        

        // sets the audio on the page
        
        var audio = triviaObj.currentQuestion[0].sound;
        // audio.autoplay = true;
        audioplayer = $('#audioplayer');
        audioplayer.attr('src', audio);
        audioplayer.attr('autoplay', 'autoplay');
       
        // audio.play();
        // <audio src="assets/images/"yourmusic-file.mp3" controls autoplay></audio>

    },

    summaryPage: function() {
        
        $('#question').html('<h2>' + 'Thank you for playing. Here is your game summary: ' + '</h2>');

        // display correct guesses
        $('#answers').html("<p>" + "Correct Geusses: " + triviaObj.guessesCorrect + "</p>");
       
        // display incorrect guesses
         $('#answers').append("<p>" + "Incorrect Geusses: " + triviaObj.guessesIncorrect + "</p>");

        // display unanswered guesses
        $('#answers').append("<p>" + "Unanswered Geusses: " + triviaObj.unansweredGuesses+ "</p>");

    }
        // var parent = document.getElementById('answers');
        // var p = document.createElement('p');
        //     // Add other classes to update the background
        //     p.setAttribute('class', 'guess center-block');
        //     // USE DATA NAME INSTEAD OF ID
        //     // Looks at using .val()
        //     var text = document.createTextNode(answer);
        //     p.appendChild(text);

        //     parent.appendChild(p);
     



}

// random pick function is not working. 


// GAME BEGINS with Initial setup of page and start click push

// Throw up a start button and when clicked it displays the first question page
$(document).ready(function() {
    // Intial page load with the button created dynamically
    var b = $('<button>');
    b.addClass('waves-effect waves-light btn-lg text-center');
    b.html('START TRIVIA!');

    $('#start').append(b);


// STAGE 1: Loads the page after a user click and displays first question and timer
    $('#start').on('click', function(event) {
        $(this).hide();
        triviaObj.questionLoad();

    }); 
        
    // STAGE 2: User guesses 

    // This initiates the user click/guess after the buttons are created on the screen
    $(document.body).on('click', '.guess', function(event) {
        var click = $(this).text(); 
        


        // triviaObj.splice();
        // console.log("you clicked: " + click);
        triviaObj.pageLoad.stop();

        // correct guess
        if (click == triviaObj.currentQuestion[0].correctAnswer) {

            triviaObj.emptyDivs();
            triviaObj.correctGuess();
            triviaObj.guessesCorrect++; 
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses Correct: " + triviaObj.guessesCorrect);
            triviaObj.spliceArray();
            // is the timeout function to automatically switch the page
            triviaObj.pageTimeout.timeout();

           
        }
        // incorrect guess
        else if (click != triviaObj.currentQuestion[0].correctAnswer){
            triviaObj.emptyDivs();
            triviaObj.incorrectGuess();
            triviaObj.guessesIncorrect++; 
            console.log("This is the user pick: " + click);
            console.log("This is the correct answer: " + triviaObj.currentQuestion[0].correctAnswer);
            console.log("Guesses incorrect: " + triviaObj.guessedIncorrect);
            triviaObj.spliceArray();
             // is the timeout function to automatically switch the page
            triviaObj.pageTimeout.timeout();

        }
    });

    

});
        
  



