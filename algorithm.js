// algorithms.js

function generateBubbleSortFrames(originalArray) {
  const frames = [];
  const arr = [...originalArray]; // Create a copy so we don't manipulate the live array
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      
      // FRAME A: Highlight the two items we are COMPARING
      frames.push({
        array: [...arr],
        highlights: [j, j + 1],
        actionType: "compare",
        codeLine: 2,
        explanation: `Comparing index ${j} (${arr[j]}) and index ${j+1} (${arr[j+1]})`
      });

      if (arr[j] > arr[j + 1]) {
        // Swap values
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // FRAME B: Highlight the same items showing a SWAP occurred
        frames.push({
          array: [...arr],
          highlights: [j, j + 1],
          actionType: "swap",
          codeLine: 3,
          explanation: `Swapped ${arr[j+1]} and ${arr[j]} because ${arr[j+1]} > ${arr[j]}`
        });
      }
    }
  }

  // FINAL FRAME: Sorting is finished
  frames.push({
    array: [...arr],
    highlights: [],
    actionType: "sorted",
    codeLine: 0,
    explanation: "Sorting complete! The array is fully ordered."
  });

  return frames;
}