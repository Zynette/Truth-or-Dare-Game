document.addEventListener('DOMContentLoaded', () => {
    const instructionsOverlay = document.getElementById('instructions-overlay');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('game-container');
    const playerNameInput = document.getElementById('player-name');
    const readyBtn = document.getElementById('ready-btn');
    const coin = document.getElementById('coin');
    const coinText = document.getElementById('coin-text');
    const resultContainer = document.getElementById('result-container');
    const timerContainer = document.getElementById('timer-container');
    const doneBtn = document.getElementById('done-btn');
    const historyList = document.getElementById('history-list');

    const truths = [
        'What is your deepest fear?',
        'Have you ever seen a ghost?',
        'What is the scariest dream you’ve ever had?',
        'In a zombie apocalypse, what would be your weapon of choice?',
        'Have you ever felt like you were being watched when you were alone?',
        'Have you ever seen something you could not explain or thought was supernatural?'
    ];
    const dares = [
        'Go into a dark room alone for 2 minutes.',
        'Tell a scary story to everyone.',
        'Turn off all the lights and play hide and seek.',
        'Walk around the outside of your house alone at midnight.',
        'Spend 10 minutes in complete silence in a room known for strange occurrences.',
        'Watch a horror movie alone in the dark and describe your feelings afterward.'
    ];

    let currentPlayerName = '';
    let timer;
    let timerStart;

    function startTimer() {
        timerStart = Date.now();
        timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - timerStart) / 1000);
            timerContainer.textContent = `Time: ${elapsed}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function flipCoin() {
        const isTruth = Math.random() < 0.5;
        coinText.textContent = isTruth ? 'Truth' : 'Dare';
        resultContainer.textContent = isTruth ? 'Truth' : 'Dare';

        const question = isTruth ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        resultContainer.textContent += `: ${question}`;
        
        startTimer();
        doneBtn.style.display = 'block';

        return { isTruth, question };
    }

    function handleReadyClick() {
        currentPlayerName = playerNameInput.value.trim();
        if (currentPlayerName === '') {
            alert('Please enter your name.');
            return;
        }
        readyBtn.style.display = 'none';
        playerNameInput.style.display = 'none';
        flipCoin();
    }

    function handleDoneClick() {
        const { textContent: resultText } = resultContainer;
        stopTimer();
        doneBtn.style.display = 'none';
        const elapsed = Math.floor((Date.now() - timerStart) / 1000);
        historyList.innerHTML += `<li>${currentPlayerName}: ${resultText}, Time: ${elapsed}s</li>`;
        resultContainer.textContent = '';
        timerContainer.textContent = '';
        readyBtn.style.display = 'block';
        playerNameInput.style.display = 'inline';
    }

    startGameBtn.addEventListener('click', () => {
        instructionsOverlay.style.display = 'none';
        gameContainer.style.display = 'block';
    });

    readyBtn.addEventListener('click', handleReadyClick);
    doneBtn.addEventListener('click', handleDoneClick);

    coin.addEventListener('click', () => {
        coin.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            coin.style.transform = '';
            flipCoin();
        }, 500);
    });
});
