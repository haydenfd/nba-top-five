export function countCorrectGuesses(selected, correctOrder, returnAccuracy) {

  let correctCount = 0;
    
    // Assume both lists are of the same length. If not, you may need additional checks.
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].id === correctOrder[i].id) {
        correctCount += 1;
      }
    }
    

  if (returnAccuracy) {
    return ((correctCount / selected.length) * 100)
  }

  else {
    return correctCount
  }
}

export const compareOrder = (correctOrder, selected) => {
  const selectedIds = selected.map(item => item.id); // Extract ids for easier comparison

  let countCorrect = 0; // Count of items with correctness == 0
  let countOffByOne = 0; // Count of items with correctness == 1

  const resultArray = correctOrder.map((correctItem, correctIndex) => {
    const selectedIndex = selectedIds.indexOf(correctItem.id);
    let correctness;

    if (correctIndex === selectedIndex) {
      correctness = 0; // Correct position
      countCorrect++; // Increment count of correct positions
    } else if (Math.abs(correctIndex - selectedIndex) === 1) {
      correctness = 1; // Off by one
      countOffByOne++; // Increment count of off by one positions
    } else {
      correctness = -1; // Completely incorrect
    }

    return { ...correctItem, correctness }; // Adding correctness field to each correct order item
  });

  return [resultArray, countCorrect, countOffByOne];
};