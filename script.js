let button_click_status = false;
let jokes = [];
let currentJokeBox = null;

readCSV();
// setTimeout(() => {
//     console.log("Random Joke:", get_random_joke());
// }, 1000);

function readCSV() {
    fetch('./shortjokes.csv')
        .then(response => response.text())
        .then(data => {
            parseCSV(data);
        })
        .catch(error => {
            console.error('Error reading the file:', error);
        });
}

function parseCSV(csvContent) {
    const rows = csvContent.split('\n');
    rows.shift(); // Remove the header row ("ID","Joke")
    rows.forEach((row) => {
        const columns = row.split(/,(.+)/); // Split into two parts: ID and Joke
        if (columns.length > 1) {
            let joke = columns[1].trim(); // Extract the joke (second column)
            joke = joke.replace(/^"|"$/g, ''); // Remove the first and last double quotes
            jokes.push(joke);
        }
    });
}

function button_was_clicked() {
    button_click_status = true;
    const button = document.getElementById('button');
    button.remove();
    h1.remove();
    joke_appears();
}

function button_was_dragged() {
    if (!button_click_status) {
        const button = document.getElementById('button');
        button.innerText = "Do you wanna hear a joke?";
    } 
}

function reset_button() {
    if (!button_click_status ) {
        const button = document.getElementById('button');
        button.innerText = "Don't be shy";
        button.style.background = "";
    }
}

function another_joke_button(box) {
    let button = document.getElementById('another-joke-button');
    if (!button) {
        button = document.createElement('button');
        button.innerText = 'Do you want another bad joke?';
        button.id = 'another-joke-button';
        button.className = 'another-joke-button';
        
        button.addEventListener('click', () => {
            console.log('Another joke button clicked');
            if (currentJokeBox) {
                currentJokeBox.remove();
            }
            joke_appears();
        });

        document.body.appendChild(button);
    }

    box.insertAdjacentElement('afterend', button);
}

like_dislike_button() {
    const box = document.createElement('div');  // WORKING HERE, creating the like and dislike button
    box.className = 'like-box';
    box.innerText = like;

    document.body.appendChild(box);
}

joke_box_creation(joke) {
    const box = document.createElement('div');
    box.className = 'joke-box';
    box.innerText = joke;

    document.body.appendChild(box);

    currentJokeBox = box;
}

function joke_appears() {
    let joke = get_random_joke();
    joke_box_creation(joke);
    like_dislike_button();
    another_joke_button(box);
}

function get_random_joke() {
    if (jokes.length === 0) { 
        console.error("No jokes available. Make sure the CSV file is loaded");
        return "No jokes available";
    }
    const randomIndex = Math.floor(Math.random() * jokes.length); 
    return jokes[randomIndex];
}