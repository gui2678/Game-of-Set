import Card from "./card.js"

 // Helper function to check uniqueness
 function check_uniqueness(values) {
    return _.uniq(values).length == 1 || _.uniq(values).length == 3;
}

// Function that checks whether the three selected cards form a set or not
function is_set(card1, card2, card3){ 
    // For test
    //return true;
    
    const attributes = ['number', 'color', 'shape', 'attr'];
    for (const attr of attributes) {
        const values = [card1[attr], card2[attr], card3[attr]];
        if (!check_uniqueness(values)) return false;
    }

    return true;
}

export {is_set};

    



// test cases:

// case 1 --> expected output: true
const card1 = new Card(1, 'red', 'fish', 'anchor', 'image1');
const card2 = new Card(1, 'red', 'fish', 'anchor', 'image2');
const card3 = new Card(1, 'red', 'fish', 'anchor', 'image3');
console.log(is_set(card1, card2, card3));

// case 2 --> expected output: true
const card4 = new Card(1, 'red', 'fish', 'anchor', 'image4');
const card5 = new Card(2, 'green', 'octopus', 'bubble', 'image5');
const card6 = new Card(3, 'blue', 'turtle', 'seaweed', 'image6');
console.log(is_set(card4, card5, card6));

// case 3 --> expected output: false
const card7 = new Card(1, 'red', 'fish', 'anchor', 'image7');
const card8 = new Card(2, 'red', 'octopus', 'bubble', 'image8');
const card9 = new Card(1, 'red', 'turtle', 'seaweed', 'image9');
console.log(is_set(card7, card8, card9));