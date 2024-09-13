
// Initialisation des variables pour les cartes
let playerHand = [];
let dealerHand = [];

// Fonction pour démarrer le jeu
function startGame() {
    // Simule des cartes tirées pour le joueur et le croupier
    playerHand = ['10♦', 'K♣'];
    dealerHand = ['9♠', 'J♥'];

    // Mise à jour de l'affichage des mains
    document.getElementById('player-hand').innerText = playerHand.join(' ');
    document.getElementById('dealer-hand').innerText = dealerHand.join(' ');

    // Message d'état de la partie
    document.getElementById('game-message').innerText = "Partie en cours...";
}

// Ajout d'un événement sur le bouton "Démarrer la partie"
document.getElementById('start-game').addEventListener('click', startGame);
