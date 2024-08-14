# Game-of-Set

## Installation
Clone the repository:
 git clone https://github.com/gui2678/Game-of-Set.git
 
Navigate to the project directory

Open index.html in your preferred web browser.

## Rules
Select three cards by clicking them to form a set. For each one of the four categories of features — color, number, animal, and attribute (seaweed, anchor, bubbles) — the three cards must display that feature as either a) all the same, or b) all different.

## Features
This version of the game has a feature to switch players by splitting the keyboard, if player one finds a set he should click any key on the left side of the keyboard (from Q-T, A-G, Z-V) so that he is assigned points for finding a set, same goes for player 2 but with the right side of the keyboard (from Y-[, H-;, B-.). There also are 2 different hint features one that give the players a a message with general instructions of how to find a set, and another which reveals a set on the board. To start playing all one has to do is click start, activating the timer so players can see how fast they find a set, then hit their side of the keyboard to get assigned their points correctly when they find a set. 


## Files and Directories
- index.html: The main HTML file that sets up the game interface.
- style.css: The CSS file that styles the game interface.
- main.js: The main JavaScript file that initializes the game and handles card dealing and events.
- card.js: Contains the Card class representing a card in the game.
- is_set.js: Contains the is_set function that checks whether three selected cards form a valid set.
- game.js: Handles the game logic, including checking for valid sets and updating scores.
- answer.js: Contains the getAnswer function that highlights a valid set if available.
- hint.js: Contains the getHint function that provides hints for finding sets.
- dealingFunction.js: Handles the logic for dealing new cards.
- scores.js: Manages player scores and updates the score display.
- switchPlayer.js: Handles switching between players using keyboard input.
- images/: Directory containing the card images used in the game.
