
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;
let wins = 0;
let losses = 0;
let ties = 0;
let totalGames = 0;

// Fonction pour créer un paquet de 208 cartes (4 jeux de 52 cartes)
function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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

// Fonction pour afficher une carte
function displayCard(card) {
    return `<div class="card">${card.value}${card.suit}</div>`;
}

// Fonction pour mettre à jour les statistiques
function updateStats(result) {
    totalGames++;
    if (result === 'win') {
        wins++;
    } else if (result === 'loss') {
        losses++;
    } else {
        ties++;
    }

    document.getElementById('total-games').innerText = totalGames;
    document.getElementById('wins').innerText = wins;
    document.getElementById('losses').innerText = losses;
    document.getElementById('ties').innerText = ties;

    document.getElementById('win-percent').innerText = `${((wins / totalGames) * 100).toFixed(2)}%`;
    document.getElementById('loss-percent').innerText = `${((losses / totalGames) * 100).toFixed(2)}%`;
    document.getElementById('tie-percent').innerText = `${((ties / totalGames) * 100).toFixed(2)}%`;
}

// Démarrer la partie au chargement de la page
createDeck();
