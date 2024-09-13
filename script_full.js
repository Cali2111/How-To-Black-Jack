
// Initialisation du sabot de 4 jeux de cartes (208 cartes)
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameActive = false;

// Fonction pour créer le sabot
function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    deck = [];
    for (let i = 0; i < 4; i++) { // 4 jeux de cartes
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value });
            }
        }
    }

    // Mélanger le deck
    deck = deck.sort(() => Math.random() - 0.5);
}

// Fonction pour tirer une carte du sabot
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

    // Ajuster le score si on dépasse 21 et qu'il y a des As
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

// Fonction pour démarrer une nouvelle partie
function startGame() {
    if (!gameActive) {
        createDeck();
        playerHand = [];
        dealerHand = [];
        gameActive = true;

        // Distribution des cartes initiales
        playerHand.push(drawCard());
        dealerHand.push(drawCard());
        playerHand.push(drawCard());

        // Mettre à jour l'affichage
        updateDisplay();
        document.getElementById('game-message').innerText = "Partie en cours...";

        // Activer les boutons de contrôle
        document.getElementById('btn-hit').disabled = false;
        document.getElementById('btn-stand').disabled = false;
        document.getElementById('btn-split').disabled = false;
        document.getElementById('btn-abandon').disabled = false;
    }
}

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    document.getElementById('player-hand').innerHTML = playerHand.map(card => displayCard(card)).join(' ');
    document.getElementById('dealer-hand').innerHTML = dealerHand.map(card => displayCard(card)).join(' ');
}

// Fonction pour afficher une carte visuellement
function displayCard(card) {
    return `<div class="card">${card.value}${card.suit}</div>`;
}

// Actions après distribution
document.getElementById('start-game').addEventListener('click', startGame);
