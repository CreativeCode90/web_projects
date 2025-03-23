import variable from "./variable.js";
import Keys from "./Key.js";
import { keyButtons, textPera } from "./List.js";
// object decleration
const variables = new variable();
const Mykey = new Keys();

// show random pera function
const ShowRandomText = () => {
  const rText = Math.floor(Math.random() * textPera.length);
  Mykey.randomText = textPera[rText];
  variables.pera.innerText = Mykey.randomText;
  // reset all time
  Mykey.currentIndex = 0; // Reset index when a new paragraph is loaded
  Mykey.correctCount = 0; // Reset correct count
  Mykey.totalTyped = 0; // Reset total typed count
  Mykey.startTime = null; // Reset timer
  updateStats(0, 0, 0); // Reset stats display
};
// create a toggle effect on start button
variables.startbutton.addEventListener("click", () => {
  Mykey.startToggle = !Mykey.startToggle;
  if (Mykey.startToggle) {
    variables.startbutton.innerText = "Stop";
    // call randomtext function
    ShowRandomText();
  } else if (!Mykey.startToggle) {
    variables.startbutton.innerText = "Start";
  }
});
let timerInterval; 
window.addEventListener("keypress", (e) => {
  if (!Mykey.startTime) {
    Mykey.startTime = new Date(); // Start timer on first keypress

    // Start updating time every second
    timerInterval = setInterval(() => {
      let elapsedTime = Math.floor((new Date() - Mykey.startTime) / 1000); // Time in seconds
      document.querySelector(".timep").innerText = `${elapsedTime} sec`;
    }, 1000);
  }

  Mykey.totalTyped++; // Increase total typed characters count
  Mykey.key = keyButtons.includes(e.code);

  if (Mykey.key) {
    document.querySelector(`.${e.code}`).style.backgroundColor = "pink";

    if (Mykey.startToggle) {
      let textArray = variables.pera.innerText.split(""); // Convert text to an array

      if (
        Mykey.currentIndex < textArray.length &&
        e.key === textArray[Mykey.currentIndex]
      ) {
        textArray.splice(Mykey.currentIndex, 1); // Remove the correct letter
        variables.pera.innerText = textArray.join(""); // Update the text
        Mykey.correctCount++;

        // If all letters are typed correctly, stop the timer and show results
        if (variables.pera.innerText === "") {
          clearInterval(timerInterval); // Stop the timer
          
          let endTime = new Date();
          let timeTaken = (endTime - Mykey.startTime) / 1000; // Time in seconds
          let wpm = Math.round((Mykey.correctCount / 5) / (timeTaken / 60)); // WPM calculation
          let accuracy = Math.round((Mykey.correctCount / Mykey.totalTyped) * 100); // Accuracy calculation
          variables.t.textContent = `Time: ${timeTaken.toFixed(2)} sec`;
          variables.w.textContent = `WPM: ${wpm}`;
          variables.a.textContent = `Accuracy: ${accuracy}%`;
          // Reset variables
          Mykey.startToggle = false;
          Mykey.startTime = null;
          Mykey.correctCount = 0;
          Mykey.totalTyped = 0;
          Mykey.currentIndex = 0;
          document.querySelector(`.${e.code}`).style = "";
          variables.container.classList.add("showc")
          variables.close.addEventListener("click",()=>{
            variables.container.classList.remove("showc")
          })
        }
      }
    }
  }
});


window.addEventListener("keyup", (e) => {
  Mykey.key = keyButtons.includes(e.code);
  if (Mykey.key) {
    document.querySelector(`.${e.code}`).style = "";
  }
});

// Function to update stats (WPM & Accuracy)
function updateStats(correct, total, start) {
  if (!start) return;

  let elapsedTime = (new Date() - start) / 1000; // In seconds
  variables.timeElement.innerText = `${Math.floor(elapsedTime)} sec`;

  // Calculate WPM (average word length = 5 chars)
  let wordsTyped = correct / 5;
  let wpm = Math.round((wordsTyped / elapsedTime) * 60);
  variables.wpmElement.innerText = wpm > 0 ? wpm : 0;

  // Calculate Accuracy
  let accuracy = Math.round((correct / total) * 100);
  variables.accuracyElement.innerText = accuracy > 0 ? accuracy + "%" : "0%";
}
