import { getCurrentPlayer, setCurrentPlayer } from './main.js';

const player1Keys = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', '1', '2', '3', '4', '5', '6'];
const player2Keys = ['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'b', 'n', 'm', '7', '8', '9', '0', ';', ',', '.', '['];

const playerColor = {1: 'red', 2: 'blue'}; //player 1 is red color and player 2 is blur color 

export function switchPlayer(event) {
  const key = event.key.toLowerCase();

  // Check which player key was pressed
  if (player1Keys.includes(key)) {
    setCurrentPlayer(1);
    updatePlayerTurnIndicator();

  } else if (player2Keys.includes(key)) {
    setCurrentPlayer(2);
    updatePlayerTurnIndicator();
  }

  console.log(`Current Player: ${getCurrentPlayer()}`);
}
function updatePlayerTurnIndicator(){
  const playerTurnIndicator = document.getElementById("playerIndicator");
  const currentPlayer = getCurrentPlayer();
  if(playerTurnIndicator){
    // Update the background color and text content for the player indicator
    playerTurnIndicator.style.backgroundColor = playerColor[currentPlayer];
    playerTurnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
  }
}
document.addEventListener('keydown', switchPlayer);
