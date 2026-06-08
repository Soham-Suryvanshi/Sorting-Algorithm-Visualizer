// renderer.js

const UIRenderer = {
  // Master function called by the engine
  drawFrame(frame) {
    this.drawBars(frame.array, frame.highlights, frame.actionType);
    this.updateExplanation(frame.explanation);
    this.highlightCode(frame.codeLine);
  },

  drawBars(array, highlights, actionType) {
    const container = document.getElementById("bars-container");
    container.innerHTML = ""; // Wipe the container clean

    array.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.style.height = `${value * 3}px`; // Adjust scaling as needed
      bar.style.width = "20px";
      bar.style.margin = "0 2px";
      bar.style.display = "inline-block";
      
      // Default color
      bar.style.backgroundColor = "#3498db"; 

      // Apply conditional coloring based on the active frame's state
      // Clean alternative inside your renderer's bar loop:
if (highlights.includes(index)) {
  if (actionType === "compare") bar.style.backgroundColor = "var(--color-compare)";
  if (actionType === "swap") bar.style.backgroundColor = "var(--color-swap)";
} else if (actionType === "sorted") {
  bar.style.backgroundColor = "var(--color-sorted)";
} else {
  bar.style.backgroundColor = "var(--color-default)";
}

      container.appendChild(bar);
    });
  },

  updateExplanation(text) {
    document.getElementById("explanation-box").innerText = text;
  },

  highlightCode(lineNumber) {
    // Clear previous highlights
    document.querySelectorAll(".code-line").forEach(line => {
      line.style.backgroundColor = "transparent";
      line.style.fontWeight = "normal";
    });

    // Highlight active pseudo-code row
    const activeLine = document.querySelector(`.code-line[data-line="${lineNumber}"]`);
    if (activeLine) {
      activeLine.style.backgroundColor = "#ffeb3b";
      activeLine.style.fontWeight = "bold";
    }
  }
};