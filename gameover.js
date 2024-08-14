/*ends game and has restart button that refreshes page*/
export function gameOver(player1Score, player2Score) {
    console.log("Game Over function called"); // says if the function is called
    // show the overlay
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
    const winner = document.getElementById('winner');
    if(player1Score>player2Score){
    winner.textContent = "Player 1 Wins!";
    }else if (player1Score<player2Score){
        winner.textContent = "Player 2 Wins!";
    }else{
        winner.textContent = "It's a tie!";
    }
    // create restart button that reloads page
    if (!document.getElementById('restartButton')) {
        const restartButton = document.createElement('button');
        restartButton.id = 'restartButton';
        restartButton.textContent = 'Restart';
        restartButton.style.position = 'absolute';
        restartButton.style.top = '70%';
        restartButton.style.left = '50%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.fontSize = '60px';
        restartButton.style.padding = '10px 20px';
        
        restartButton.addEventListener('click', function() {
            location.reload();
        });

        overlay.appendChild(restartButton);
    }

    const gifContainer = document.createElement('div');
    gifContainer.id = 'gifContainer';
    const bottomGif = document.createElement('img');
    bottomGif.src = 'https://i.giphy.com/2dK0W3oUksQk0Xz8OK.webp';
    bottomGif.alt = 'GIF';
    bottomGif.id = 'bottomGif';
    gifContainer.appendChild(bottomGif);
    document.body.appendChild(gifContainer);
}