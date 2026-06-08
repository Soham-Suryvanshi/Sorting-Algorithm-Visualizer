// engine.js

class AnimationEngine {
  constructor() {
    this.frames = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.intervalId = null;
    this.speed = 1000; // time in ms per step
  }

  loadFrames(generatedFrames) {
    this.pause();
    this.frames = generatedFrames;
    this.currentIndex = 0;
    this.renderCurrent();
  }

  renderCurrent() {
    if (this.frames.length === 0) return;
    const currentFrame = this.frames[this.currentIndex];
    
    // Hand the frame data off to the visual renderer
    UIRenderer.drawFrame(currentFrame);
  }

  stepForward() {
    if (this.currentIndex < this.frames.length - 1) {
      this.currentIndex++;
      this.renderCurrent();
    }
  }

  stepBackward() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderCurrent();
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    
    this.intervalId = setInterval(() => {
      if (this.currentIndex >= this.frames.length - 1) {
        this.pause();
      } else {
        this.stepForward();
      }
    }, this.speed);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }
}

// Global instance of our playback engine
const visualizerEngine = new AnimationEngine();

// WIRE EVENT LISTENERS TO HTML BUTTONS
document.getElementById("bubble-btn").addEventListener("click", () => {
  const randomArray = [Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)]; // You can grab dynamic input here later
  
  // 1. Generate the snapshots
  const recordedFrames = generateBubbleSortFrames(randomArray);
  
  // 2. Load into playback track
  visualizerEngine.loadFrames(recordedFrames);
  
  // 3. Start auto-playback
  visualizerEngine.play();
});

document.getElementById("pause-btn").addEventListener("click", () => visualizerEngine.pause());
document.getElementById("play-btn").addEventListener("click", () => visualizerEngine.play());
document.getElementById("forward-btn").addEventListener("click", () => visualizerEngine.stepForward());
document.getElementById("backward-btn").addEventListener("click", () => visualizerEngine.stepBackward());