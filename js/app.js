import View from './view.js';
import Store from './store.js';

// const App = { //Object refactor, namespace
//     // Selected DOM elements that trigger events
//     $: { //
//         menu: document.querySelector('[data-id="menu"]'),
//         menuBtn: document.querySelector('[data-id="menu-btn"]'),
//         menuItems: document.querySelector('[data-id="menu-items"]'),
//         resetBtn: document.querySelector('[data-id="reset-btn"]'),
//         newGameBtn: document.querySelector('[data-id="new-game-btn"]'),
//         cells: document.querySelectorAll('[data-id="cell"]'),
//         modal: document.querySelector('[data-id="modal"]'),
//         modalIcon: document.querySelector('[data-id="modal-icon"]'),
//         modalText: document.querySelector('[data-id="modal-text"]'),
//         modalBtn: document.querySelector('[data-id="modal-btn"]'),
//         turn: document.querySelector('[data-id="turn"]'),
//     },

//     state: {
//         gameMoves: [], 
//     },

//     gameStatus(gameMoves) {
//         // Takes gameMoves.cellId as arguments, returns progress status and win status
//         // Filter the gameMoves array into player 1 and 2 moves
//         const playerOneMoves = gameMoves
//             .filter((move) => move.playerId === 1)
//             .map(move => +move.cellId);
//         const playerTwoMoves = gameMoves
//             .filter((move) => move.playerId === 2)
//             .map(move => +move.cellId);
//         const winningPatterns = [
//             [1, 2, 3],
//             [1, 5, 9],
//             [1, 4, 7],
//             [2, 5, 8],
//             [3, 6, 9],
//             [3, 5, 7],
//             [4, 5, 6],
//             [7, 8, 9],
//         ];

//         let winner = null;

//         winningPatterns.forEach(pattern => {
//             // Check if playerOneMoves contains all the values of one of the patterns in winningPatterns
//             const playerOneWins = pattern.every(value => playerOneMoves.includes(value))// t or f
//             const playerTwoWins = pattern.every(value => playerTwoMoves.includes(value))

//             // winner = null by default, update to
//             if (playerOneWins) winner = 1
//             if (playerTwoWins) winner = 2

//         })

//         return {
//             status: gameMoves.length === 9 || winner != null ? 'complete' : 'in-progress',
//             winner
//         }
//     },

//     // Add event listeners to function
//     registerEventListeners() {
//         // Toggle menu
//         App.$.menu.addEventListener('click', (event) => {
//             App.$.menuBtn.classList.toggle('border');
//             App.$.menuItems.classList.toggle('hidden');
//         });
            
//         App.$.resetBtn.addEventListener('click', event => {
//             console.log('RESET');
//         });
        
//         App.$.newGameBtn.addEventListener('click', event => {
//             console.log('NEW GAME');
//         });

//         App.$.cells.forEach(cell => {
//             cell.addEventListener('click', event => {
//                 const cellPlayed = (cellId) => {
//                     // Takes cellId as argument and returns false if cellId isnt in gameMoves[] and vice versa
//                     const existingMove = App.state.gameMoves.find(move => move.cellId === cellId);
//                     return existingMove !== undefined
//                 }

//                 console.log(cellPlayed(+cell.id))

//                 // if cellPlayed(+cell.id) is true, return early
//                 if (cellPlayed(+cell.id)) {
//                     return;
//                 }
                
//                 // if cellPlayed(+cell.id) is false, continue
//                 const cellIcon = document.createElement('i');
//                 const turnIcon = document.createElement('i');
//                 const turnLabel = document.createElement('p');
//                 turnLabel.innerText = "You're up!";

                
//                 // Get last entry of gameMoves array
//                 const lastMove = App.state.gameMoves.at(-1);
//                 // Helper method to switch currentPlayer
//                 const switchPlayer = (player) => (player === 1 ? 2 : 1);
//                 // If gameMoves array is empty, currentPlayer = 1, else switch to opposite player after last move
//                 const currentPlayer = App.state.gameMoves.length === 0 ? 1 : switchPlayer(lastMove.playerId);
//                 const nextPlayer = switchPlayer(currentPlayer);
                
//                 // play x for player 1 and y for player 2
//                 if (currentPlayer === 1) {
//                     cellIcon.classList.add('fa-solid', 'fa-x', 'secondary');
//                     turnIcon.classList.add('fa-solid', 'fa-o', 'tetriary');
//                     turnLabel.classList = 'tetriary';
//                 } else {
//                     cellIcon.classList.add('fa-solid', 'fa-o', 'tetriary');
//                     turnIcon.classList.add('fa-solid', 'fa-x', 'secondary');
//                     turnLabel.classList = 'secondary';
//                 }
                
//                 App.$.turn.replaceChildren(turnIcon, turnLabel)

//                 // Every time a cell is clicked, push the cell id and player id to the gameMoves array
//                 App.state.gameMoves.push({
//                     cellId: +cell.id,
//                     playerId: +currentPlayer,
//                 })

//                 console.log(App.state.gameMoves)
                
//                 cell.replaceChildren(cellIcon)


//                 // Check game status
//                 const game = App.gameStatus(App.state.gameMoves)
//                 console.log(game.status, game.winner)
                

//                 if (game.status === 'complete') {
//                     let message = '';
//                     App.$.modal.classList.remove('hidden');

//                     const x = document.createElement('i');
//                     x.classList.add('fa-solid', 'fa-x', 'secondary');
//                     const o = document.createElement('i');
//                     o.classList.add('fa-solid', 'fa-o', 'tetriary');

                

//                     if (game.winner) {
//                         message = 'winner!';
//                         if (game.winner === 1) {
//                             App.$.modalIcon.appendChild(x)
//                         } else {
//                             App.$.modalIcon.appendChild(o)

//                         }

//                     } else {
//                         message = 'draw!';
//                         App.$.modalIcon.appendChild(x);
//                         App.$.modalIcon.appendChild(o);
//                     }
                    
//                     App.$.modalText.textContent = message;
//                 }
//             });
//         });

//         App.$.modalBtn.addEventListener('click', event => {
//             App.state.gameMoves = [];
//             App.$.modal.classList.add('hidden');
//             App.$.modalIcon.innerHTML = '';
//             App.$.cells.forEach(cell => cell.replaceChildren());
//         });
//     },

//     init() {
//         App.registerEventListeners();
//     },

// };

// window.addEventListener('load', App.init);

const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "secondary",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "tetriary",
    }
]

function init() {
    //Initializing the View class, creating an instance

    const view = new View();
    const store = new Store(players);

    view.bindResetEvent((event) => {
        view.closeAll();
        store.reset();
        view.clearGameMoves();
        view.setTurnIndicator(store.game.currentPlayer);

        view.updateScoreBoard(
            store.gameStats.playerStats[0].wins,
            store.gameStats.playerStats[1].wins,
            store.gameStats.ties,
        );
        // console.log(store.gameStats);
    });

    view.bindNewGameEvent((event) => {
        store.newGame();

        view.closeAll();
        view.clearGameMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        view.updateScoreBoard(
            store.gameStats.playerStats[0].wins,
            store.gameStats.playerStats[1].wins,
            store.gameStats.ties,
        ); 
    });

    view.bindPlayerMoveEvent((cell) => { 

        // To ensure we can't perform a game move in a cell that has been played on
        const existingMove = store.game.gameMoves.find(
            gameMove => gameMove.cellId === +cell.id)
        
        if (existingMove) {
            return;
        }
        
        // Place an icon of the current player in a cell
        view.handlePlayerMove(cell, store.game.currentPlayer);
        
        // Update state by pushing a move to the gameMoves array
        store.playerMove(+cell.id)// + casted to number

        if (store.game.status.isComplete) {


            view.openModal(store.game.status.winner
                // ? `${store.game.status.winner.name} wins!`
                ? `You win!`
                : "Tie!"
            );

            view.handleModalIcon(store.game.status.winner, players);
            
            return;
        }

        // Update the turn indicator based on current state
        view.setTurnIndicator(store.game.currentPlayer);
    });

    
}

window.addEventListener('load', init);


