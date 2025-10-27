// Game state
let credits = 100;
let bet = 10;
let isSpinning = false;

// Available symbols
const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '⭐'];

// Payout multipliers
const payouts = {
    '🍒🍒🍒': 50,
    '🍋🍋🍋': 40,
    '🍊🍊🍊': 30,
    '🍇🍇🍇': 25,
    '🍉🍉🍉': 20,
    '⭐⭐⭐': 100
};

// DOM elements
const creditsDisplay = document.getElementById('credits');
const betDisplay = document.getElementById('bet');
const winDisplay = document.getElementById('win');
const messageDisplay = document.getElementById('message');
const spinBtn = document.getElementById('spinBtn');
const increaseBetBtn = document.getElementById('increaseBet');
const decreaseBetBtn = document.getElementById('decreaseBet');
const resetBtn = document.getElementById('resetBtn');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

// Initialize the game
function init() {
    updateDisplay();
    attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
    spinBtn.addEventListener('click', spin);
    increaseBetBtn.addEventListener('click', increaseBet);
    decreaseBetBtn.addEventListener('click', decreaseBet);
    resetBtn.addEventListener('click', resetGame);
}

// Update all displays
function updateDisplay() {
    creditsDisplay.textContent = credits;
    betDisplay.textContent = bet;

    // Disable buttons if not enough credits
    spinBtn.disabled = credits < bet || isSpinning;
    decreaseBetBtn.disabled = bet <= 5 || isSpinning;
    increaseBetBtn.disabled = bet >= credits || bet >= 50 || isSpinning;
}

// Increase bet
function increaseBet() {
    if (bet < 50 && bet < credits) {
        bet += 5;
        updateDisplay();
    }
}

// Decrease bet
function decreaseBet() {
    if (bet > 5) {
        bet -= 5;
        updateDisplay();
    }
}

// Get random symbol
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Update reel symbol
function updateReelSymbol(reel, symbol) {
    const symbolElement = reel.querySelector('.symbol');
    symbolElement.textContent = symbol;
}

// Spin animation
function animateReel(reel, duration) {
    return new Promise((resolve) => {
        reel.classList.add('spinning');
        const symbolElement = reel.querySelector('.symbol');

        let elapsed = 0;
        const interval = 100;

        const animation = setInterval(() => {
            symbolElement.textContent = getRandomSymbol();
            elapsed += interval;

            if (elapsed >= duration) {
                clearInterval(animation);
                reel.classList.remove('spinning');
                resolve();
            }
        }, interval);
    });
}

// Main spin function
async function spin() {
    if (isSpinning || credits < bet) {
        return;
    }

    // Deduct bet
    credits -= bet;
    isSpinning = true;

    // Clear previous messages
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    winDisplay.textContent = '0';

    updateDisplay();

    // Spin reels with different durations
    const results = [];

    // Spin all reels
    await Promise.all([
        animateReel(reel1, 1000).then(() => {
            const symbol = getRandomSymbol();
            updateReelSymbol(reel1, symbol);
            results[0] = symbol;
        }),
        animateReel(reel2, 1500).then(() => {
            const symbol = getRandomSymbol();
            updateReelSymbol(reel2, symbol);
            results[1] = symbol;
        }),
        animateReel(reel3, 2000).then(() => {
            const symbol = getRandomSymbol();
            updateReelSymbol(reel3, symbol);
            results[2] = symbol;
        })
    ]);

    // Check for wins
    checkWin(results);

    isSpinning = false;
    updateDisplay();
}

// Check for winning combinations
function checkWin(results) {
    const combination = results.join('');
    let winAmount = 0;
    let message = '';

    // Check for three of a kind
    if (results[0] === results[1] && results[1] === results[2]) {
        const multiplier = payouts[combination] || 15;
        winAmount = bet * multiplier;

        if (results[0] === '⭐') {
            message = 'JACKPOT! ' + winAmount + ' CREDITS!';
            messageDisplay.className = 'message jackpot';
        } else {
            message = 'BIG WIN! ' + winAmount + ' CREDITS!';
            messageDisplay.className = 'message win';
        }
    }
    // Check for two of a kind
    else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        winAmount = bet * 2;
        message = 'Small Win! ' + winAmount + ' CREDITS!';
        messageDisplay.className = 'message win';
    }
    else {
        message = 'No win. Try again!';
        messageDisplay.className = 'message';
    }

    // Update credits and display
    if (winAmount > 0) {
        credits += winAmount;
        winDisplay.textContent = winAmount;

        // Celebrate animation
        celebrateWin(winAmount);
    }

    messageDisplay.textContent = message;

    // Check if game over
    if (credits < 5) {
        setTimeout(() => {
            messageDisplay.textContent = 'GAME OVER! Click Reset to play again.';
            messageDisplay.className = 'message';
        }, 2000);
    }
}

// Celebration animation
function celebrateWin(amount) {
    // Add some visual feedback
    const reels = [reel1, reel2, reel3];
    let bounces = 0;
    const maxBounces = 3;

    const bounceInterval = setInterval(() => {
        reels.forEach(reel => {
            reel.style.transform = bounces % 2 === 0 ? 'scale(1.1)' : 'scale(1)';
        });

        bounces++;
        if (bounces > maxBounces * 2) {
            clearInterval(bounceInterval);
            reels.forEach(reel => {
                reel.style.transform = 'scale(1)';
            });
        }
    }, 200);
}

// Reset game
function resetGame() {
    credits = 100;
    bet = 10;
    isSpinning = false;
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    winDisplay.textContent = '0';

    // Reset reels to default
    updateReelSymbol(reel1, '🍒');
    updateReelSymbol(reel2, '🍋');
    updateReelSymbol(reel3, '🍊');

    updateDisplay();
}

// Initialize game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
