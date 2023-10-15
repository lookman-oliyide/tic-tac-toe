import View from './view.js';
import Store from './store.js';

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
    const store = new Store('lskey', players);

    // Current tab state changes
    store.addEventListener("stateChange", () => { // 'stateChange event renders/re-renders view'
        view.render(store.game, store.gameStats);
    })

    // Initialised here to update with state data on first load
    view.render(store.game, store.gameStats); 

    // Different tab state changes
    window.addEventListener("storage", () => {
        view.render(store.game, store.gameStats); // listen for storage event and update view
    }); 

    view.bindResetEvent((event) => {
        store.reset();
    });

    view.bindNewGameEvent((event) => {
        store.newGame();
    });

    view.bindPlayerMoveEvent((cell) => { 

        // To ensure we can't perform a game move in a cell that has been played on
        const existingMove = store.game.gameMoves.find(
            (gameMove) => gameMove.cellId === +cell.id)
        
        if (existingMove) {
            return;
        }
        
        // Update state by pushing a move to the gameMoves array
        store.playerMove(+cell.id)// + casted to number

        if (store.game.status.isComplete) {

            view.handleModalIcon(store.game.status.winner, players);

            return;
        }
    });
}

window.addEventListener('load', init);


