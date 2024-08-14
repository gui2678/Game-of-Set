//Handles the scoring updates

//Object to store the scores
const playerScores = { 
    1: 0, 2: 0,
    //pass in the current player - should work with our new keyboard option once implemented too
    incrementScore(currentPlayer){
            this[currentPlayer]++;
            console.log(`Increment Score for Player ${currentPlayer}`);

    }, 
    //update the scoreID in index.html
    updateScore() {
        $("#player1Score").text(this[1]);
        $("#player2Score").text(this[2]);
        console.log(`Update Score - ${this[1]}, , ${this[2]}`)
    }
};

export default playerScores;