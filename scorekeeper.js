var button1 = document.querySelector("#p1");
var button2 = document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");
var customize = document.querySelector("#customize");
var forms = document.querySelector("#forms");
var p1Name = document.querySelector("#p1Name");
var p2Name = document.querySelector("#p2Name");
var body = document.querySelector("body");
var theme = document.querySelector("#theme");
var change = document.querySelector(".change");
var vs = document.querySelector("#vs");
var h1 = document.querySelector("h1");
var race = document.querySelector("#race");

var p1wins = document.querySelector("#p1wins");
var p2wins = document.querySelector("#p2wins");

var p1Score = 0;
var p2Score = 0;
var winningScore = 5;
var gameOver = false;

button1.addEventListener("click", function() {
  if (!gameOver) {
    p1Score++;
  }
  if (p1Score === winningScore) {
    p1Display.classList.add("winner");
    p1wins.classList.add("show");
    p1wins.classList.remove("hide");
    p1wins.innerHTML = `${p1Name.value || "Player 1"}  wins`;
    gameOver = true;
  }
  p1Display.textContent = p1Score;
});

button2.addEventListener("click", function() {
  if (!gameOver) {
    p2Score++;
  }
  if (p2Score === winningScore) {
    p2Display.classList.add("winner");
    p2wins.classList.add("show");
    p2wins.classList.remove("hide");
    p2wins.innerHTML = `${p2Name.value || "Player 2"} wins`;
    gameOver = true;
  }
  p2Display.textContent = p2Score;
});

function reset() {
  p1Score = 0;
  p2Score = 0;
  p1Display.textContent = 0;
  p2Display.textContent = 0;
  gameOver = false;
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  p1wins.classList.remove("show");
  p2wins.classList.remove("show");
  p1wins.classList.add("hide");
  p2wins.classList.add("hide");
}

resetButton.addEventListener("click", function() {
  reset();
});

numInput.addEventListener("change", function() {
  if (numInput.value >= 1) {
    winningScoreDisplay.textContent = numInput.value;
    winningScore = Number(numInput.value);
    reset();
  } else {
    alert("Winning Score should be 1 point or more. ");
  }
});

// additional codes for improvement

customize.addEventListener("click", function() {
  forms.classList.toggle("hide");
});

// change button display to input vale
p1Name.addEventListener("change", function() {
  button1.textContent = p1Name.value;
});
p2Name.addEventListener("change", function() {
  button2.textContent = p2Name.value;
});

// if player 1 wins.. alert or animate vice versa

// themes using imgur as daabase

function changeStyle() {
  h1.style.color = "white";
  vs.style.color = "white";
  p1wins.style.color = "white";
  p2wins.style.color = "white";
  customize.style.color = "white";
  race.style.color = "white";
}

function changeBg1() {
  body.style.backgroundImage = "url('https://i.imgur.com/wqidQwn.jpg')";
  changeStyle();
}
function changeBg2() {
  body.style.backgroundImage = "url('https://i.imgur.com/dHnaWSY.jpg')";
  changeStyle();
}
function changeBg3() {
  body.style.backgroundImage = "url('https://i.imgur.com/qIVTvRG.jpg')";
  changeStyle();
}
function changeBg4() {
  body.style.backgroundImage = "url('https://i.imgur.com/kcDySO8.jpg')";
  changeStyle();
}
function changeBg5() {
  body.style.backgroundImage = "url('https://i.imgur.com/P7BkwIq.jpg')";
  changeStyle();
}

// $('#theme').on('change', function() {
//   value = $(this).val() - 1;
//   $('body').css({
//     'background-image': 'url(' + bgArray[value] + ')'
//   });
// });

// instructions at the bottom
// footer
