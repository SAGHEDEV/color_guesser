let chances = 3,
  highestScore = 0,
  score = JSON.parse(localStorage.getItem("score")) || 0,
  randomNumber,
  colorArray = ["red", "blue", "green", "purple", "yellow", "orange"];

const elements = {
  welcomeSection: document.getElementById("welcome-section"),
  gameSection: document.getElementById("game-section"),
  chancesSpan: document.getElementById("chances"),
  scoreSpan: document.getElementById("score"),
  chosenColorDiv: document.getElementById("chosen-color"),
  chosenColorName: document.getElementById("chosen-color-name"),
  restartGameBtn: document.getElementById("restartGame"),
  options: document.getElementById("options"),
  startGameBtn: document.getElementById("startGame"),
};

const setSuccess = () => {
  elements.chosenColorDiv.style.backgroundColor = "green";
  elements.chosenColorName.style.color = "white";
};

const setMessage = (mess, color) => {
  elements.chosenColorDiv.style.border = `2px solid ${color}`;
  elements.chosenColorName.textContent = mess;
  elements.chosenColorName.style.color = color;
};

const increaseScore = () => {
  score += 1;
  localStorage.setItem("score", score);
  elements.scoreSpan.textContent = `0${score}`;
};

const gameOver = () => {
  Array.from(elements.options.children).forEach((option) => {
    option.style.pointerEvents = "none";
    option.style.opacity = 0.1;
    option.style.cursor = "not-allowed";
  });
  elements.restartGameBtn.style.display = "block";
};

const checkOption = (opt) => {
  const pickedGuess = colorArray[randomNumber];
  if (opt === pickedGuess) {
    setMessage(`Correct! Guessed color is ${opt}!`, "green");
    setSuccess();
    increaseScore();
    gameOver();
  } else {
    chances -= 1;
    if (chances > 0) {
      setMessage(
        `Wrong guess! You have ${chances} chance(s) left. Try again!`,
        "red"
      );
    } else {
      setMessage(`Game over! The correct guess was ${pickedGuess}.`, "red");
      gameOver();
    }
  }
  elements.chancesSpan.textContent = `0${chances}`;
};

const sortGuesses = () => {
  randomNumber = Math.floor(Math.random() * colorArray.length);
  elements.options.innerHTML = colorArray
    .map(
      (option) =>
        `<div class="rounded-xl w-full h-32 cursor-pointer hover:scale-105 flex justify-center items-center font-bold text-white transition duration-300" style="background: ${option};" onClick="checkOption('${option}')"></div>`
    )
    .join("");
};

const startGame = () => {
  elements.gameSection.classList.replace("inactive", "active");
  elements.welcomeSection.classList.replace("active", "inactive");
  elements.chancesSpan.textContent = `0${chances}`;
  elements.scoreSpan.textContent = `0${score}`;
  sortGuesses();
};

const restartGame = () => {
  elements.restartGameBtn.style.display = "none";
  setMessage("Guess the correct color!!", "black");
  elements.chosenColorDiv.style.border = "none";
  elements.chosenColorDiv.style.backgroundColor = "white";
  Array.from(elements.options.children).forEach((option) => {
    option.style.pointerEvents = "all";
    option.style.opacity = 1;
    option.style.cursor = "default";
  });
  chances = 3;
  elements.chancesSpan.textContent = `0${chances}`;
};

elements.startGameBtn.addEventListener("click", startGame);
elements.restartGameBtn.addEventListener("click", () => {
  restartGame();
  sortGuesses();
});
