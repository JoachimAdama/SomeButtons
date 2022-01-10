document.addEventListener("DOMContentLoaded", function(e) {
// This eventListener allows to make sure that the JS runs after the whole DOM is loaded. 

    // Manually set name of sounds since I cannot setup node js to read my file names through browser
    catSounds = ["Meow 1", "Meow 2", "Meow 3", "Meow 4" ,"Meow 5", "Meow 6", "Meow 7" ,"Meow 8" ,"Meow 9", "Meow 10", "Meow 11", "Meow 12", "Purr Long", "Angry Growl","Hiss Angry Short", "Short Hiss" ];

    // Insert as many pad-buttons as there are sounds
    const playerPadElement = document.getElementById('player_pad');
    for (const catSound of catSounds) {
        
        // Long expression... appendChild returns the child element created... setAttribute sets it's class
        playerPadElement.appendChild(document.createElement('button')).setAttribute('class', 'pad-button')
        // Updates textContent
        playerPadElement.lastChild.textContent = catSound; 

    } 

    // Define button elements
    const playButton = document.getElementById("play");
    const recordButton = document.getElementById("record");
    const undoButton = document.getElementById("undo");
    const resetButton = document.getElementById("reset");
    const sequenceText = document.getElementById("sequence");
    const padButtons = document.getElementsByClassName('pad-button');

    // Define variable that will store all button clicked upon recording
    const sequenceItems = [];
    const mapSequenceSound = new Map(); // Searchable index that will be filled with unique sequence name and HTMLAudioElement instanciated

    // Define functions that'll be called by eventListeners
    const soundAudio = new Audio();
    const makeSound = el => {
        soundAudio.pause();
        soundAudio.currentTime = 0; // useful here since i can play the same file
        soundAudio.src = `sound/cat/${el.textContent}.mp3` ;
        soundAudio.play();
        // el.textContent = `Duration is: ${soundAudio.duration}sec`;
        }

    const writeItem = el => {
        // Add the new item to the sequence and saves the whole sequence in a new entry of the array
        if (el === "") {
            sequenceText.textContent = "";
        } else {
            sequenceText.textContent += (sequenceItems.length > 0 ? " - " : "") + el.textContent;
        }
        // push sequenceText in sequenceItems
        sequenceItems.push(sequenceText.textContent);
    }

    const undoAction = () => {
        sequenceItems.splice(sequenceItems.length-1, 1);
        sequenceText.textContent = sequenceItems[sequenceItems.length-1];
    }

    const playAction = sequence => {
        // Spilt the sequence content to extract soundNames
        const sequenceArr = sequence.split(' - ');
        console.log(sequenceArr);

            soundAudio.pause();
            soundAudio.currentTime = 0; // useful here since i can play the same file

            // plays the first element
            let i = 0;
            soundAudio.src = `sound/cat/${sequenceArr[i]}.mp3` ;
            soundAudio.play();
            console.log(`${sequenceArr[i]} playing`);

            // Defines an event listener that will monitor if the sound ended and launch the next one
            soundAudio.onended = () => { 
                i+=1;
                if (i<sequenceArr.length) {
                    soundAudio.src = `sound/cat/${sequenceArr[i]}.mp3` ;
                    soundAudio.play();
                    console.log(`${sequenceArr[i]} playing`);
                }
            };

    }

    // Define eventListeners
    undoButton.addEventListener("click", function(){undoAction()});

    resetButton.addEventListener('click', function() {writeItem("")});

    for (const button of padButtons) {
        button.addEventListener("click", function(){
            writeItem(button);
            makeSound(button)
        });
    };

    playButton.addEventListener('click', function() {
        if(sequenceItems.length>0) playAction(sequenceText.textContent)}
        );

    console.log('script ended');

})