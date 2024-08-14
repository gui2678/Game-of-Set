import { is_set } from './is_set.js';

// Function that checks whether the three selected cards form a set or not
function getAnswer(){ 
    const cards = $("#cards img");
    cards.removeClass("selected");
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                if (is_set($(cards[i]).data("card"), $(cards[j]).data("card"), $(cards[k]).data("card"))) {
                    $(cards[i]).toggleClass("highlighted");
                    $(cards[j]).toggleClass("highlighted");
                    $(cards[k]).toggleClass("highlighted");
                    return;
                }
            }
        }
    }
    alert("There is no matching cards set");
    return true;
}

export {getAnswer};

    