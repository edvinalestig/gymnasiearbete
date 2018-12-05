let gameObject;
// Getting the last character in the url which is the player number
// Temporary, will be removed when websockets are implemented
const playerNumber = String(document.location)[String(document.location).length-1];

function preload() {
    getJson();
}

function setup() {
    setCss();
    setScores();
}

function playButton() {
    console.log("PLAY!");
    getJson();
}

function endButton() {
    console.log("END!");
    setCss();
    setScores();
}

function getJson() {
    gameObject = loadJSON("/getp" + playerNumber);
}

function setCss() {
    if (gameObject) {
        const currentTurn = gameObject.currentTurn;
        const player1 = document.getElementById("player1Score");
        const player2 = document.getElementById("player2Score");

        let me;
        for (let i = 0; i < gameObject.players.length; i++) {
            if (gameObject.players[i].isYou) {
                me = i;
                break;
            }
        }

        if (currentTurn == 0) {
            // Player 1's turn
            player1.classList.add("activePlayer");
            player2.classList.remove("activePlayer");
        } else {
            // Player 2's turn
            player1.classList.remove("activePlayer");
            player2.classList.add("activePlayer");
        }

        const playButtonDiv = document.getElementById("playButton");
        const playButtonText = document.getElementById("playButtonText");
        
        if (currentTurn == me) {
            playButtonDiv.classList.remove("oppoTurn");
            playButtonDiv.classList.add("myTurn");
            playButtonText.classList.remove("oppoTurn");
            playButtonText.classList.add("myTurn");
            
            playButtonDiv.onclick = () => playButton();
        } else {
            playButtonDiv.classList.add("oppoTurn");
            playButtonDiv.classList.remove("myTurn");
            playButtonText.classList.add("oppoTurn");
            playButtonText.classList.remove("myTurn");
            
            playButtonDiv.onclick = () => console.log("Deactivated");
        }
    }
}

function setScores() {
    if (gameObject) {
        const p1Element = document.getElementById("player1ScoreP");
        const p2Element = document.getElementById("player2ScoreP");
        const p1Points = gameObject.players[0].points;
        const p2Points = gameObject.players[1].points;
        p1Element.innerHTML = p1Points + "p";
        p2Element.innerHTML = p2Points + "p";
    }
}
