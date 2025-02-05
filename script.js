var chances = 3,
  highestScore = 0,
  score = JSON.parse(localStorage.getItem("score")) | 0,
  randomNumber,
  colorArray = ["red", "blue", "green", "purple", "yellow", "orange"];

const welcomeSection = document.getElementById("welcome-section"),
  gameSection = document.getElementById("game-section"),
  chancesSpan = document.getElementById("chances"),
  scoreSpan = document.getElementById("score"),
  chosenColorDiv = document.getElementById("chosen-color"),
  chosenColorName = document.getElementById("chosen-color-name"),
  restartGameBtn = document.getElementById("restartGame"),
  Options = document.getElementById("options");

const setSuccess = (bg) => {
  chosenColorDiv.style.backgroundColor = bg;
  chosenColorName.style.color = "white";
};
const setMessage = (mess, color) => {
  chosenColorDiv.style.border = `2px solid ${color}`;
  chosenColorName.textContent = mess;
  chosenColorName.style.color = color;
};

const increaseScore = () => {
  score += 1;
  localStorage.setItem("score", score);
  scoreSpan.textContent = `0${score}`;
};

const gameOver = () => {
  document.querySelectorAll("#options div").forEach((option) => {
    console.log(option);
    option.style.pointerEvents = "none"; // Disable clicking
    option.style.opacity = 0.1; // Reduce opacity
    option.style.cursor = "not-allowed"; // Change cursor style
  });
  restartGameBtn.style.display = "block";
};

const checkOption = (opt) => {
  const pickedGuess = colorArray[randomNumber];
  console.log(randomNumber);
  if (opt === pickedGuess) {
    setMessage(`Correct! Guessed color is ${opt}!`, "green");
    setSuccess(pickedGuess);
    increaseScore();
    gameOver();
  } else {
    chances -= 1;
    if (chances > 0) {
      setMessage(
        `Wrong guess! You have ${chances} chance(s) left. Kindly try again!`,
        "red"
      );
    } else {
      setMessage(`Game over! The correct guess was ${pickedGuess}!.`, "red");
      gameOver();
    }
  }
  chancesSpan.textContent = `0${chances}`;
};

const sortGuesses = () => {
  randomNumber = Math.floor(Math.random() * 6);
  Options.innerHTML = "";

  colorArray.forEach((option) => {
    Options.innerHTML += `<div
          class="rounded-xl w-full h-32 cursor-pointer hover:scale-105 flex justify-center items-center font-bold text-white transition duration-300"
          style="background: ${option};"
          onClick="checkOption('${option}')"
          data-testid="colorOption"
          id="option"

        >
          <span>${option}</span>
        </div>`;
  });
};

const startGame = () => {
  // Show game section
  gameSection.classList.add("active");
  gameSection.classList.remove("inactive");

  // Hide welcome section
  welcomeSection.classList.remove("active");
  welcomeSection.classList.add("inactive");

  chancesSpan.textContent = `0${chances}`;
  scoreSpan.textContent = `0${score}`;

  sortGuesses();
};

const restartGame = () => {
  restartGameBtn.style.display = "none";
  setMessage("Guess what I am!", "black");
  chosenColorDiv.style.border = "none";
  chosenColorDiv.style.backgroundColor = "white";
  document.querySelectorAll("#options div").forEach((option) => {
    option.style.pointerEvents = "all"; // Disable clicking
    option.style.opacity = 1; // Reduce opacity
    option.style.cursor = "default"; // Change cursor style
  });
  chances = 3;
};

document.getElementById("startGame").addEventListener("click", function () {
  console.log("start game");
  startGame();
});
document.getElementById("restartGame").addEventListener("click", function () {
  restartGame();
  sortGuesses();
});
