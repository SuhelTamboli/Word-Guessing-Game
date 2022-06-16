import { WORDS } from "./words.js";

let player = {};

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded event listener");

  const startButton = document.getElementById("start-game-button");
  startButton.onclick = () => {
    checkCredentials();
    if (player.name && player.email) {
      const boardContainer = document.getElementById("board-container");
      const keyboardContainer = document.getElementById("keyboard-container");
      const creds = document.getElementById("credentials");
      boardContainer.style.visibility = "visible";
      keyboardContainer.style.visibility = "visible";
      creds.style.display = "none";
    } else {
      window.alert("Please enter valid name and email to start the game");
    }
  };

  function checkCredentials() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    player.name = name;
    player.email = email;
    player.score = 0;
  }

  createSquare();

  let guessedWords = [[]];
  let availableSpace = 1;

  let word = WORDS[Math.floor(Math.random() * WORDS.length)];
  console.log(word);
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWord(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr?.length < 5) {
      currentWordArr.push(letter);
    }

    const availableSpaceEl = document.getElementById(String(availableSpace));

    availableSpace++;
    availableSpaceEl.textContent = letter;
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "grey";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "green";
    }

    return "yellow";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr.length !== 5) {
      window.alert("Word must contain 5 letters");
    }

    const currentWord = currentWordArr.join("");

    const firstLetterId = guessedWordCount * 5 + 1;

    currentWordArr.forEach((letter, index) => {
      let tilecolor = getTileColor(letter, index);

      const letterId = firstLetterId + index;
      const letterEl = document.getElementById(letterId);
      letterEl.style = `background-color: ${tilecolor}`;
    });

    guessedWordCount++;

    if (currentWord === word) {
      window.alert("Congratulations!");
      player.score = 10;
      // var recipient = player.email;
      // var mail = "mailto:";
      // window.open(mail + recipient );

      
      // Email.send({
      //   Host: "smtp.yourisp.com",
      //   Username: "username",
      //   Password: "password",
      //   To: "them@website.com",
      //   From: "you@isp.com",
      //   Subject: "This is the subject",
      //   Body: "And this is the body",
      // }).then((message) => alert(message));
    }

    if (guessedWords.length === 6) {
      window.alert(`Sorry, you have no more guesses! The word is ${word}`);
    }

    guessedWords.push([]);
  }

  function createSquare() {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLeteer = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWord(letter);
    };
  }
});
