export function getHint() {
    const hints = [
        "In Set, a 'set' consists of three cards where, for each feature (color, shape, number, and shading), the three cards are either all the same or all different.",
        "Look for patterns in the cards to identify potential sets. For example, if two cards have the same color and the third card has a different color, that could be a set.",
        "Remember, each feature can be either all the same or all different. Pay attention to all four features when identifying sets.",
        "When stuck, try focusing on one feature at a time (e.g., color) and looking for sets based on that feature.",
        "It's important to practice and develop a strategy for quickly identifying sets within the cards on the table."
    ];

    // Randomly select a hint from the hints array
    const randomIndex = Math.floor(Math.random() * hints.length);
    return hints[randomIndex];
}
