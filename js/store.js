const initialValue = {
    currentGameMoves: [],
    gameHistory: {
        currentRoundGames: [],
        allGames: [],
    },
};

export default class Store  extends EventTarget {

    constructor(key, players) {
        super();
        this.storageKey = key;
        this.players = players;
    }

    get gameStats() {
        const state = this.#getState();

        return {
            playerStats: this.players.map((player) => {
                const wins = state.gameHistory.currentRoundGames.filter( // optional chaining operator
                    (game) => game.status.winner?.id === player.id
                ).length; // filter by player id, the games where player id  = winner
                    
                
                return {
                    ...player,
                    wins
                }
            }),

            ties: state.gameHistory.currentRoundGames.filter(
                game => game.status.winner === null
            ).length,
        };
    }

    get game() { 
        const state = this.#getState();

        const currentPlayer = this.players[state.currentGameMoves.length % 2]; // 0 || 1

        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let winner = null;

        for (const player of this.players) { // loop through players
            const selectedCellIds = state.currentGameMoves
                .filter((move) => move.player.id === player.id)
                .map((move) => move.cellId)
            
            for (const pattern of winningPatterns) {
                if (pattern.every((value) => selectedCellIds.includes(value))) {
                    winner = player;
                }
            }
        }
        
        return {
            gameMoves: state.currentGameMoves,
            currentPlayer,
            status: {
                isComplete: winner != null || state.currentGameMoves.length === 9,
                winner
            },
        };
    }
    // added getter so the function is called at runtime
    // and won't need to be recalled in module

    
    
    playerMove(cellId) {        
        const stateClone = structuredClone(this.#getState());// Created so I don't mutate state
        
        stateClone.currentGameMoves.push({
            cellId,
            player: this.game.currentPlayer,
        }); // update state clone
        
        this.#saveState(stateClone); // save updated state
    }

    reset() {
        const stateClone = structuredClone(this.#getState());
        const { status, gameMoves } = this.game;

        if (status.isComplete) {
            stateClone.gameHistory.currentRoundGames.push({
                gameMoves,
                status
            })
        } // if game is complete, set push gamesMoves and status to stateClone

        stateClone.currentGameMoves = [];// then empty gameMoves array

        this.#saveState(stateClone);
    }

    newGame() {
        this.reset();

        const stateClone = structuredClone(this.#getState());
        stateClone.gameHistory.allGames.push(...stateClone.gameHistory.currentRoundGames); //push current roud data to all games
        stateClone.gameHistory.currentRoundGames = [];// empty current round games

        this.#saveState(stateClone);
    }
    
    #getState() {
        const item = window.localStorage.getItem(this.storageKey);
        return item ? JSON.parse(item) : initialValue; // if item is found, parse, else return initial value
    }

    #saveState(stateOrFn) {
        const prevState = this.#getState();
        
        let newState;

        switch (typeof stateOrFn) {
            case "function":
                newState = stateOrFn(prevState);
                break;
            case "object":
                newState = stateOrFn;
                break;
            default:
                throw new Error("Invalid argument passed into saveState")
        }

        window.localStorage.setItem(this.storageKey, JSON.stringify(newState)); // save state to local storage
        this.dispatchEvent(new Event('stateChange'));// dispatch a 'stateChange event any time the state is saved'
    }
}