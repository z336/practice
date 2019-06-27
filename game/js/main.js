const choices = document.querySelectorAll('.choice');
const score = document.querySelector('#score');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};
// Play game

function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  showWinner(winner, computerChoice);
}

// Get computer's choice

function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  } else if (playerChoice === 'rock') {
    if (computerChoice === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (playerChoice === 'paper') {
    if (computerChoice === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (playerChoice === 'scissors') {
    if (computerChoice === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // increment player score
    scoreboard.player++;
    // show modal result
    result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong> ${computerChoice.charAt(0).toUpperCase() +
          computerChoice.slice(1)}</strong></p>
        `;
  } else if (winner === 'computer') {
    // increment computer score
    scoreboard.computer++;
    // show modal result
    result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong> ${computerChoice.charAt(0).toUpperCase() +
          computerChoice.slice(1)}</strong></p>
        `;
  } else {
    result.innerHTML = `
    <h1>It's A Draw</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong> ${computerChoice.charAt(0).toUpperCase() +
      computerChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
  <p>Player: ${scoreboard.player}</p>
  <p>Computer: ${scoreboard.computer}</p>
  `;

  modal.style.display = 'block';
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
  restart.style.display = 'none';
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
