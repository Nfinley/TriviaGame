// Author: Nigel Finley. August 2016. UT Bootcamp Trivia Assisgnment


// Use for the countdown timer in game on each page
function run(){
            counter = setInterval(decrement, 1000);
        }

            // The decremeent function.
        function decrement(){
            // Decrease number by one.
            number--;
            // Show the number in the #show-number tag.
            $('#show-number').html('<h2>' + number + '</h2>');

            // Once number hits zero...
            if (number === 0){
                // ...run the stop function.
                stop();
                // Alert the user that time is up.
                alert('Time Up!')
            }
        }