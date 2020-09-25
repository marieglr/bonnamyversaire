const princesseLeia = new Image();
princesseLeia.src = "./img/princesse-leia.png"

const nerd = new Image();
nerd.src = "./img/nerd.png"

const feminisme = new Image();
feminisme.src = "./img/feminisme.png"

const velo = new Image();
velo.src = "./img/velo.png"

const sevenWonders = new Image();
sevenWonders.src = "./img/7wonders.png"

const yoga = new Image();
yoga.src = "./img/yoga.png"

const renard = new Image();
renard.src = "./img/renard.png"

const cannoloSiciliano = new Image();
cannoloSiciliano.src = "./img/cannolo-siciliano.png"

const marioKart = new Image();
marioKart.src = "./img/mario-kart.png"

const machineACoudre = new Image();
machineACoudre.src = "./img/machine-a-coudre.png"


const images = [
  princesseLeia,
  nerd,
  feminisme,
  velo,
  sevenWonders,
  yoga,
  renard,
  cannoloSiciliano,
  marioKart,
  machineACoudre,
  princesseLeia,
  nerd,
  feminisme,
  velo,
  sevenWonders,
  yoga,
  renard,
  cannoloSiciliano,
  marioKart,
  machineACoudre,
];


let moves = 0;
let pairs = 0;


function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("perload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.sound.imageElement = document.getElementById("sound");
  this.sound.imageElement.addEventListener("click", handleMusic)
  this.play = function(){
    this.sound.play();
    this.isPlaying = true;
    this.sound.imageElement.setAttribute("src", "./img/mute.png");
  }
  this.stop = function(){
    this.sound.pause();
    this.isPlaying = false;
    this.sound.imageElement.setAttribute("src", "./img/sound.png" )
  }
}

const gino_paoli = new Sound("./sounds/GINO_PAOLI.mp3");

function handleMusic(){
  gino_paoli.isPlaying ? gino_paoli.stop() : gino_paoli.play();
}

let isFirstClick = true

window.onload = (function() {
  const imagesMix = images.sort(function(a, b) {
    return 0.5 - Math.random();
  });

  const cards = document.querySelectorAll(".image");
  cards.forEach(card => card.addEventListener("click", uncover));

  let cardsUncovered = [];

  function uncover(event) {
    
    if (!gino_paoli.isPlaying && !gino_paoli.isPaused){
      gino_paoli.play()
      isFirstClick = false
    }

    let { id } = event.target;

    let card = document.querySelector(`[id="${event.target.id}"]`);

    cardsUncovered.push(id);

    if (cardsUncovered.length === 1) {
      card.style.background = `url("${imagesMix[id].src}")`;
      card.style.backgroundSize = "cover";

      card.removeEventListener("click", uncover);

      moves++;
      document.getElementById("moves").innerHTML = moves;

      return;
    }

    if (cardsUncovered.length === 2) {
      card.removeEventListener("click", uncover);

      card.style.background = `url("${imagesMix[id].src}")`;
      card.style.backgroundSize = "cover";

      let cardOne = imagesMix[cardsUncovered[0]];
      let cardTwo = imagesMix[cardsUncovered[1]];

      if (cardOne === cardTwo) {

        pairs++;
        document.getElementById("selectedCards").innerHTML = pairs + "/10";

        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.background = `url("${imagesMix[cardsUncovered[0]].src}")`;
        document.querySelector(
          `[id="${cardsUncovered[0]}"]`
        ).style.backgroundSize = "cover";

        document.querySelector(
          `[id="${cardsUncovered[1]}"]`
        ).style.background = `url("${imagesMix[cardsUncovered[1]].src}")`;
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

          document
            .querySelector(`[id="${cardsUncovered[0]}"]`)
            .addEventListener("click", uncover);
          document
            .querySelector(`[id="${cardsUncovered[1]}"]`)
            .addEventListener("click", uncover);

          cardsUncovered.pop();
          cardsUncovered.pop();
          cardsUncovered.pop();
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
<div id="close" onclick="hideWin()">X</div><h2>Forever 29!</h2>
   Temps: <span class="b"> ${minutes + " : " + seconds}</span><br>
   Nombre de coups: <span class="b"> ${moves} </span></p>
   <button class="aside-btn zegar" onclick="startAgain()">Rejouer</button>`;
}

function hideWin() {
  document.querySelector("#overlay").style.display = "none";
}
