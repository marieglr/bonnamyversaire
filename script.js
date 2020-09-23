
const images = [
  "princesse-leia.png",
  "nerd.png",
  "feminisme.png",
  "velo.png",
  "7wonders.png",
  "yoga.png",
  "renard.png",
  "cannolo-siciliano.png",
  "mario-kart.png",
  "machine-a-coudre.png",
  "princesse-leia.png",
  "nerd.png",
  "feminisme.png",
  "velo.png",
  "7wonders.png",
  "yoga.png",
  "renard.png",
  "cannolo-siciliano.png",
  "mario-kart.png",
  "machine-a-coudre.png"
];

let moves = 0;

let pairs = 0;

window.onload = (function() {
  const imagesMix = images.sort(function(a, b) {
    return 0.5 - Math.random();
  });

  const cards = document.querySelectorAll(".image");
  cards.forEach(card => card.addEventListener("click", uncover));

  let cardsUncovered = [];

  function uncover(event) {
    let isCover = event.target.dataset.iscover;

    let { id } = event.target;

    let card = document.querySelector(`[id="${event.target.id}"]`);

    cardsUncovered.push(id);

    if (cardsUncovered.length === 1) {
      card.style.background = `url("img/${imagesMix[id]}")`;
      card.style.backgroundSize = "cover";

      card.removeEventListener("click", uncover);

      moves++;
      document.getElementById("moves").innerHTML = moves;

      return;
    }

    if (cardsUncovered.length === 2) {
      card.removeEventListener("click", uncover);

      card.style.background = `url("img/${imagesMix[id]}")`;
      card.style.backgroundSize = "cover";

      let cardOne = imagesMix[cardsUncovered[0]];
      let cardTwo = imagesMix[cardsUncovered[1]];

      if (cardOne === cardTwo) {

        pairs++;
        document.getElementById("selectedCards").innerHTML = pairs + "/10";

        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.background = `url("img/y${imagesMix[cardsUncovered[0]]}")`;
        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.backgroundSize = "cover";

        document.querySelector(
          `[id="${cardsUncovered[1]}"]`
        ).style.background = `url("img/y${imagesMix[cardsUncovered[1]]}")`;
        document.querySelector(
          `[id="${cardsUncovered[1]}"]`
        ).style.backgroundSize = "cover";

        document
          .querySelector(`[id="${cardsUncovered[1]}"]`)
          .removeEventListener("click", uncover);

        if (pairs === 10) {
          timerPause();
          win();
        }

        cardsUncovered.pop();
        cardsUncovered.pop();
        cardsUncovered.pop();
      } else {
        setTimeout(hide, 700);

        function hide() {
          //hide cards
          document.querySelector(
            `[id="${cardsUncovered[0]}"]`
          ).style.background = `url("img/images.png")`;
          document.querySelector(
            `[id="${cardsUncovered[1]}"]`
          ).style.background = `url("img/images.png")`;
          document.querySelector(
            `[id="${cardsUncovered[0]}"]`
          ).style.backgroundSize = "cover";
          document.querySelector(
            `[id="${cardsUncovered[1]}"]`
          ).style.backgroundSize = "cover";

          //add listener uncover
          document
            .querySelector(`[id="${cardsUncovered[0]}"]`)
            .addEventListener("click", uncover);
          document
            .querySelector(`[id="${cardsUncovered[1]}"]`)
            .addEventListener("click", uncover);

          cardsUncovered.pop();
          cardsUncovered.pop();
          cardsUncovered.pop();
          console.log(cardsUncovered);
        }
      }
    }
  }
})();

function startAgain() {
  location.reload();
}

let sec = 0;
let min = 0;
let seconds = 0;
let minutes = 0;
var timer;
time();

function time() {
  timer = setInterval(startTimer, 1000);

  function startTimer() {
    sec++;

    if (sec === 60) {
      min++;
      sec = 0;
    }

    if (sec < 10) {
      seconds = "0" + sec;
    } else {
      seconds = sec;
    }

    if (min < 10) {
      minutes = "0" + min;
    } else {
      minutes = min;
    }
    document.querySelector("#time").innerHTML = minutes + " : " + seconds;
    if (min === 60) {
      alert("Oops! You run out of time!");
      timerPause();
      document.querySelector(
        ".btn-timer"
      ).innerHTML = `<button  onclick="" class="aside-btn btn-disable zegar" style="cursor: not-allowed" ><span class="glyphicon glyphicon-play" aria-hidden="true"></span> play timer</button>`;
    }
  }
}

function timerPlay() {
  document.querySelector(
    ".btn-timer"
  ).innerHTML = `<button  onclick="timerPause()" class="aside-btn zegar" id="zegar"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span> pause </button> `;
  time();
}

function timerPause() {
  clearInterval(timer);
  document.querySelector(
    ".btn-timer"
  ).innerHTML = `<button  onclick="timerPlay()" class="aside-btn zegar" ><span class="glyphicon glyphicon-play" aria-hidden="true"></span> Play</button>`;
}

function win() {
  document.querySelector("#overlay").style.display = "block";

  document.querySelector("#popup").innerHTML = `
<div id="close" onclick="hideWin()">X</div><h2>Congratulations!</h2>
   <br><p>You found all pairs<br><br>
   Your time: <span class="b"> ${minutes + " : " + seconds}</span><br>
   Number of moves: <span class="b"> ${moves} </span></p>
   <button class="aside-btn zegar" onclick="startAgain()">Rejouer</button>`;
}

function hideWin() {
  document.querySelector("#overlay").style.display = "none";
}
