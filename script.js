'use strict';

//selecting items
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

//start
let scores;
let currentScore;
let activePlayer;
let playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

//switch player fun
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. random number 1-6
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;

    //3. check rolled number,
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //1 = switch
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;

    //2. finish >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceElement.classList.add('hidden');
    } else {
      //3. switch player
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener('click', init);
