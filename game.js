//Handles the functionalities of the game logics
//Keeping console logs for testing purposes. 

import playerScores from './scores.js';
import { switchPlayer } from './switchPlayer.js';
import { is_set } from './is_set.js';
import {dealCards, setCurrentPlayer} from './main.js';

function removeFromBoard(selected) {
    selected.removeClass("selected").remove();
}

function removeSelection(selected) {
    selected.removeClass("selected");
}

function checkAnswer(currentPlayer) {
    console.log(`CurrentPlayer in check" ${currentPlayer}`);
    let selected = $(".selected");
    //only run checks once we have 3 cards selected
    if (selected.length === 3) {
        let cards = [];
        //grad card infos
        for (let i = 0; i < selected.length; i++) {
            const cardElement = $(selected[i]);
            const cardData = cardElement.data("card");
            cards.push(cardData);
        }
        console.log("selected cards:", cards);
        //runs isSet to check if set is valid, if so increment and update score for current player
        //remove cards in set from board
        if (is_set(cards[0], cards[1], cards[2])) {
            console.log("valid set found");
            console.log(`CurrentPlayer before increment" ${currentPlayer}`);
            playerScores.incrementScore(currentPlayer);
            playerScores.updateScore();

            console.log(`Player 1: ${playerScores[1]}`)
            console.log(`Player 2: ${playerScores[2]}`)
            //Set the player to neutral after each turn
            setCurrentPlayer(0);
            dealCards(selected);
            removeSelection(selected);
            // currentPlayer = switchPlayer(currentPlayer);
            return currentPlayer;
        } else {
            //if not, unselect cards but keep on board
            console.log("not valid set");
            removeSelection(selected);
            //Set the player to neutral after each turn
            setCurrentPlayer(0);
            return currentPlayer;
        }
    }
    return currentPlayer;
}

export { checkAnswer };