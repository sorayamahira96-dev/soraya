const board = document.getElementById('board');
const rollDiceButton = document.getElementById('rollDice');
const notification = document.getElementById('notification');
const playersPanel = document.getElementById('playersPanel');

let players = [];
let currentPlayerIndex = 0;
let positions = [];
const ladders = { 3: 22, 5: 8, 11: 26, 20: 29, 27: 1, 36: 6, 63: 81, 68: 86 };
const snakes = { 17: 4, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78 };
const questions = [
    "Apa itu K3?",
    "Sebutkan 3 prinsip dasar K3!",
    "Apa saja manfaat K3?",
    // Tambahkan lebih banyak pertanyaan sesuai kebutuhan
];

function initializeGame() {
    for (let i = 0; i < 10; i++) {
        players.push(`Pemain \${i + 1}`);
        positions.push(0);
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerText = `Pemain \${i + 1}: Posisi \${positions[i]}`;
        playersPanel.appendChild(playerDiv);
    }
    updatePlayerPanel();
}

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    notification.innerText = `Pemain \${currentPlayerIndex + 1} menggulir dadu: \${diceValue}`;
    movePlayer(diceValue);
}

function movePlayer(diceValue) {
    const newPosition = positions[currentPlayerIndex] + diceValue;
    if (newPosition > 100) {
        notification.innerText = `Pemain \${currentPlayerIndex + 1} harus tepat di 100 untuk menang!`;
        return;
    }
    positions[currentPlayerIndex] = newPosition;

    if (ladders[newPosition]) {
        positions[currentPlayerIndex] = ladders[newPosition];
        notification.innerText = `Pemain \${currentPlayerIndex + 1} naik tangga!`;
    } else if (snakes[newPosition]) {
        positions[currentPlayerIndex] = snakes[newPosition];
        askK3Question();
    }

    updatePlayerPanel();
    checkWin();
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
}

function askK3Question() {
    const question = questions[Math.floor(Math.random() * questions.length)];
    notification.innerText = `Pemain \${currentPlayerIndex + 1}, jawab pertanyaan: \${question}`;
}

function checkWin() {
    if (positions[currentPlayerIndex] === 100) {
        notification.innerText = `Pemain \${currentPlayerIndex + 1} menang!`;
        rollDiceButton.disabled = true;
    }
}

function updatePlayerPanel() {
    playersPanel.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerText = `${players[i]}: Posisi \${positions[i]}`;
        playersPanel.appendChild(playerDiv);
    }
}

rollDiceButton.addEventListener('click', rollDice);
initializeGame();
