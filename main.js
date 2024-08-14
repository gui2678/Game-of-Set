import Card from './card.js'
import {checkAnswer} from './game.js';
import {getHint} from './hint.js';
import { getAnswer } from './answer.js';
import { gameOver } from './gameover.js'; 


//hold currentPlayer in main
let currentPlayer = 0;

export const getCurrentPlayer = () => currentPlayer;

export const setCurrentPlayer = (player) => {
    currentPlayer = player;
    const player1 = document.getElementById("glow1");
    const player2 = document.getElementById("glow2");

    player1.classList.remove('currentPlayer');
    player2.classList.remove('currentPlayer');

if (currentPlayer == 1) {
    player1.classList.add('currentPlayer');
} else if (currentPlayer == 2) {
    player2.classList.add('currentPlayer');
}

};

export function parseFileName(fileName) {
    // Format: [quantity][color][object][attribute].png
    const nameWithoutExtension = fileName.replace('.png', '');

    // quantity
    const quantity = nameWithoutExtension.charAt(0);

    // other attributes
    const remaining = nameWithoutExtension.substring(1);

    // dictionary for attributes
    const colors = ["blue", "pink", "green"];
    const objects = ["fish", "octopus", "turtle"];
    const attributes = ["bubbles", "seaweed", "anchor"];

    let color = '';
    let object = '';
    let attribute = '';

    // get color
    for (let i = 0; i < colors.length; i++) {
        if (remaining.indexOf(colors[i]) === 0) {
            color = colors[i];
            break;
        }
    }

    // remove color from string
    let remainingWithoutColor = remaining.substring(color.length);

    // get object
    for (let i = 0; i < objects.length; i++) {
        if (remainingWithoutColor.indexOf(objects[i]) === 0) {
            object = objects[i];
            break;
        }
    }

    // remove object from remaining string
    let remainingWithoutObjectAndColor = remainingWithoutColor.substring(object.length);

    // get attribute
    for (let i = 0; i < attributes.length; i++) {
        if (remainingWithoutObjectAndColor.indexOf(attributes[i]) === 0) {
            attribute = attributes[i];
            break;
        }
    }

    // Return error if any part is not found
    if (!color || !object || !attribute) {
        return {
            error: "Invalid filename format"
        };
    }

    return {
        quantity: quantity,
        color: color,
        object: object,
        attribute: attribute,
        fileName: fileName,
    };
}

// Other game-related functions

const STARTED = 1;
const STOPPED = 0;

let deck = createDeck();
let active = [];
let gameStatus = STOPPED;
let time = 0;
let timer;

function startTimer() {
    const timerElement = $("#time");

    timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedTime = (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

        timerElement.text(formattedTime);
    }, 1000);
}

function stopTimer() {
    time = 0;
    clearInterval(timer);
}

function createDeck() {
    let p = 0;
    const cardArray = [];
    const numbers = ["1", "2", "3"];
    const colors = ["pink", "blue", "green"];
    const shapes = ["fish", "octopus", "turtle"];
    const textures = ["anchor", "bubbles", "seaweed"];
    for (let i = 0; i < 81; i++) {
        cardArray[i] = [];
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let q = 0; q < 3; q++) {
                    cardArray[p] = [numbers[k], colors[i], shapes[q], textures[j]];
                    p++;
                }
            }
        }
    }
    return cardArray;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Deal 12 empty cards before beginning of the game, after stop game
function fillEmptyCards() {
    if (gameStatus === STOPPED){
        $("#cards img").remove();
        active = [];
        for (let i = 0; i < 12; i++) {
            active.push(printCard(null, i));
        }
    }
}

function printCard(card, cardId) {
    const cardsDiv = $("#cards");
    let cardElement = cardsDiv.find(`[cardid=${cardId}]`)[0];
    
    if (cardElement == null || card == null) {
        $("<img src='images/empty.png' class='empty' cardId='" + cardId + "' />").appendTo(cardsDiv);
    } else if (card != null) {
        const path = card.join("");
        $(cardElement).attr("src", "images/" + path + ".png");
        $(cardElement).attr("class", card.join(" "));
        $(cardElement).data("card", new Card(card[0], card[1], card[2], path));
    }
    return card;
}



async function loadCards() {
    // Show 12 random cards one by one
    for (var i = 0; i < 12; i++) {
        active.unshift(printCard(deck.pop(), i));
    }
    active = active.slice(0, 12);
}


/////////////////////////////////////////////////////////////

function init() {
    shuffle(deck);
    fillEmptyCards();
}

function initEvent() {
    // Add event listner to start button
    var startButton = $("#startButton");
    startButton.on("click", async function() {
        toggleGame();
    });

    $("#clueButton").on("click", function() {
        if (gameStatus == STARTED)
        {
            const hint = getHint();
            $("#clueButton").text(hint);
        }
    });
    
    $("#answerButton").on("click", function() {
        if (gameStatus == STARTED)
            getAnswer();
    });

    // Add action to cards when they are clicked
    $("#cards").on("click", "img:not(.empty)", function() {
        if (currentPlayer == 0){
            alert("No Player Selected.");
            return;
        }
        $(this).toggleClass("selected");
        checkAnswer(currentPlayer);
    });
}

async function toggleGame() {
    if (gameStatus == STOPPED) {
        gameStatus = STARTED;
        $("#clueButton, #answerButton").removeClass("disabled");
        $("#startButton").text("Stop");
        startTimer();
        loadCards();
    } else {
        gameStatus = STOPPED;
        $("#clueButton, #answerButton").addClass("disabled");
        //When game is stopped, the Hint goes away
        $("#clueButton").text("Hint(Clue)")
        $("#startButton").text("Start");
        stopTimer();
        fillEmptyCards();
    }
}


// Deal 3 cards when a player picks correct set of cards, and shuffle them
export function dealCards(selected) {
    if (deck.length < 3) {
        gameOver(document.getElementById('player1Score').textContent, document.getElementById('player2Score').textContent);
        toggleGame();
        return;
    }
    
    var selectedIds = selected.map(function() {
        return Number($(this).attr("cardid"));
    }).get();

    // remove selected card from active cards
    var temp = [];
    for(let i=0; i<12; i++) {
        if (!selectedIds.includes(i))
            temp.push(active[i]);
    }

    // add new 3 cards from deck
    for (let i = 0; i < 3; i++) {
        temp.push(deck.pop());
    }

    // shuffle and print cards
    active = shuffle(temp);
    for (let i = 0; i < 12; i++) {
        printCard(active[i], i);
    }
}

init();
initEvent();