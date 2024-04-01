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