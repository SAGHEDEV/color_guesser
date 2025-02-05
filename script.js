let chances = 3,
  score = JSON.parse(localStorage.getItem("score")) || 0,
  highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0,
  randomNumber,
  colorArray = ["red", "blue", "green", "purple", "yellow", "orange"];

const elements = {
  welcomeSection: document.getElementById("welcome-section"),
  gameSection: document.getElementById("game-section"),
  chancesSpan: document.getElementById("chances"),
  scoreSpan: document.getElementById("score"),
  highestScoreDiv: document.getElementById("highest-score"),
  chosenColorDiv: document.getElementById("chosen-color"),
  chosenColorName: document.getElementById("chosen-color-name"),
  restartGameBtn: document.getElementById("restartGame"),
  resetGameBtn: document.getElementById("resetGame"),
  options: document.getElementById("options"),
  startGameBtn: document.getElementById("startGame"),
};

const audios = {
  click: new Audio("click.mp3"),
  error: new Audio("error.mp3"),
  game_over: new Audio("game-over.mp3"),
  start_game: new Audio("start-game.mp3"),
  success: new Audio("success.mp3"),
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
  audios.game_over.play();
};

const checkOption = (opt) => {
  const pickedGuess = colorArray[randomNumber];
  if (opt === pickedGuess) {
    audios.success.play();
    setMessage(`Correct! Guessed color is ${opt}!`, "green");
    setSuccess();
    increaseScore();
    gameOver();
  } else {
    audios.error.play();
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
  elements.highestScoreDiv.textContent = `0${highestScore}`;
  sortGuesses();
  audios.start_game.play();

  if (score > 0) {
    elements.resetGameBtn.style.display = "block";
  }
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
  audios.start_game.play();
  if (score > 0) {
    elements.resetGameBtn.style.display = "block";
  }
};

const startNewGame = () => {
  if (highestScore == 0 || highestScore < score) {
    console.log("true");
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
  }
  localStorage.setItem("score", 0);
  window.location.reload();
};

elements.startGameBtn.addEventListener("click", startGame);
elements.restartGameBtn.addEventListener("click", () => {
  restartGame();
  sortGuesses();
});
