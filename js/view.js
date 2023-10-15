export default class View {

    $ = {};
    $$ = {};

    constructor(){
        this.$.menu = this.#qs('[data-id="menu"]');
        this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
        this.$.menuItems = this.#qs('[data-id="menu-items"]');
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
        this.$.newGameBtn = this.#qs('[data-id="new-game-btn"]');
        this.$.modal = this.#qs('[data-id="modal"]');
        this.$.modalIcon = this.#qs('[data-id="modal-icon"]');
        this.$.modalText = this.#qs('[data-id="modal-text"]');
        this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
        this.$.turn = this.#qs('[data-id="turn"]');
        this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
        this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
        this.$.ties = this.#qs('[data-id="ties"]');
        
        this.$$.cells = this.#qsAll('[data-id="cell"]');

        // (UI-only event listeners) The event lsiteners that don't control state can be registered here
        this.$.menuBtn.addEventListener("click", (event) => {
            this.#toggleMenu()
        });

        this.$.menuBtn.addEventListener("mouseover", (event) => {
            this.#addHover()
        });

        this.$.menuBtn.addEventListener("mouseout", (event) => {
            this.#removeHover()
        })

    }

    /**
     * Register all event Listeners
     */

    // To handle event listeners that control state within the controller instead of the view
    // They will take a handler callback functions
    bindResetEvent(handler) {// regsiter all buttons that perform this event
        this.$.resetBtn.addEventListener("click", handler);
        this.$.modalBtn.addEventListener("click", handler);
    }

    bindNewGameEvent(handler) {
        this.$.newGameBtn.addEventListener("click", handler);
    }

    bindPlayerMoveEvent(handler) {
        this.$$.cells.forEach((cell) => {
            cell.addEventListener("click", () => handler(cell));
        });
    }

    /**
     * DOM helper methods
     */

    openModal(message) {
        this.$.modal.classList.remove("hidden");
        this.$.modalText.innerText = message;
    }

    #closeModal() {
        this.$.modal.classList.add("hidden");
        this.$.modalIcon.replaceChildren();
    }

    closeAll() {
        this.#closeModal();
        this.#closeMenu();
    }

    clearGameMoves() {
        this.$$.cells.forEach((cell) => {
            cell.replaceChildren();
        });
    }

    persistGameMoves(gameMoves) {
        this.$$.cells.forEach(cell => {
            const existingMove = gameMoves.find(gameMove => gameMove.cellId === +cell.id)

            if (existingMove) {
                this.handlePlayerMove(cell, existingMove.player)
            }
        })
    }

    handleModalIcon(winner, players) {
        const x = document.createElement('i');
        x.classList
            .add("fa-solid",
                players[0].iconClass,
                players[0].colorClass);
        const o = document.createElement('i');
        o.classList
            .add("fa-solid",
                players[1].iconClass,
                players[1].colorClass);
    

        if (winner) {
            const icon = document.createElement("i");
            icon.classList.add("fa-solid",
                winner.iconClass,
                winner.colorClass);
        
            this.$.modalIcon.appendChild(icon);    
        } else {
            this.$.modalIcon.appendChild(x);
            this.$.modalIcon.appendChild(o);
        }   
    }

    updateScoreBoard(p1Wins, p2Wins, ties) {
        this.$.p1Wins.innerText = `${p1Wins} wins`;
        this.$.p2Wins.innerText = `${p2Wins} wins`;
        this.$.ties.innerText = `${ties}`;
    }

    #toggleMenu() {
        this.$.menuItems.classList.toggle("hidden");

        const icon = this.$.menuBtn.querySelector("i");
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
    }

    #closeMenu() {
        this.$.menuItems.classList.add("hidden");

        const icon = this.$.menuBtn.querySelector("i");
        icon.classList.add("fa-chevron-down");
        icon.classList.remove("fa-chevron-up");
    }

    #addHover() {
        this.$.menuBtn.classList.add("border");
    }

    #removeHover() {
        this.$.menuBtn.classList.remove("border");
    }

    // function to handle error with invalid selector
    // allows us to set parent as argument but defaults to "document"
    #qs(selector, parent) {
        const el = parent
            ? parent.querySelector(selector)
            : document.querySelector(selector);

        if (!el) throw new Error(`Could not find ${selector}`);

        return el;
    }

    #qsAll(selector) {
        const elList = document.querySelectorAll(selector);

        if (!elList) throw new Error(`Could not find ${selector}`);
        return elList;
    }

    setTurnIndicator(player) {
        const icon = document.createElement("i");
        const label = document.createElement("p");

        icon.classList.add("fa-solid",
            player.iconClass,
            player.colorClass);
        label.classList.add(player.colorClass);
        label.innerText = `${player.name}, your turn!`;
        // label.innerText = `Your turn!`;


        this.$.turn.replaceChildren(icon, label);
    }

    handlePlayerMove(clickedCell, player) {
        const icon = document.createElement("i");
        
        icon.classList.add("fa-solid",
            player.iconClass,
            player.colorClass);
        clickedCell.replaceChildren(icon);
    }

    
}
