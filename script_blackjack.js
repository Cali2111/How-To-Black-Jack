
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isGameActive = false;

// Fonction pour créer un jeu de cartes (4 jeux de 52 cartes)
function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    deck = [];
    for (let i = 0; i < 4; i++) {
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
    }

    // Mélanger le deck
    deck.sort(() => Math.random() - 0.5);
}

// Fonction pour tirer une carte du jeu
function drawCard() {
    return deck.pop();
}

// Fonction pour calculer le score d'une main
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            score += 11;
            aceCount++;
        } else {
            score += parseInt(card.value);
        }
    });

    // Gérer les As
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

// Fonction pour démarrer une nouvelle partie
function startGame() {
    if (!isGameActive) {
        createDeck();
        playerHand = [];
        dealerHand = [];
        isGameActive = true;

        // Distribution initiale
        playerHand.push(drawCard());
        dealerHand.push(drawCard());
        playerHand.push(drawCard());

        updateDisplay();
        document.getElementById('game-message').innerText = "Partie en cours...";
        document.getElementById('btn-hit').disabled = false;
        document.getElementById('btn-stand').disabled = false;
    }
}

// Fonction pour mettre à jour l'affichage des cartes et des scores
function updateDisplay() {
    document.getElementById('player-hand').innerText = playerHand.map(card => `${card.value}${card.suit}`).join(' ');
    document.getElementById('dealer-hand').innerText = dealerHand.map(card => `${card.value}${card.suit}`).join(' ');

    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
}

// Fonction pour tirer une carte pour le joueur
function hitCard() {
    if (isGameActive) {
        playerHand.push(drawCard());
        updateDisplay();
        if (playerScore > 21) {
            document.getElementById('game-message').innerText = "Vous avez perdu!";
            endGame();
        }
    }
}

// Fonction pour rester (passer au croupier)
function stand() {
    if (isGameActive) {
        while (dealerScore < 17) {
            dealerHand.push(drawCard());
            dealerScore = calculateScore(dealerHand);
            updateDisplay();
        }

        if (dealerScore > 21 || playerScore > dealerScore) {
            document.getElementById('game-message').innerText = "Vous avez gagné!";
        } else if (dealerScore === playerScore) {
            document.getElementById('game-message').innerText = "Égalité!";
        } else {
            document.getElementById('game-message').innerText = "Le croupier a gagné!";
        }

        endGame();
    }
}

// Fonction pour terminer la partie
function endGame() {
    document.getElementById('btn-hit').disabled = true;
    document.getElementById('btn-stand').disabled = true;
    isGameActive = false;
}

// Ajouter des événements sur les boutons
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('btn-hit').addEventListener('click', hitCard);
document.getElementById('btn-stand').addEventListener('click', stand);
