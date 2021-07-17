const gameBoard = (function() {
    const createIntro = function() {
        const introContainer = document.createElement("div");
        introContainer.setAttribute("id", "intro-container");

        const introText = document.createElement("h1");
        introText.textContent = "Крестики-нолики";
        introContainer.appendChild(introText);

        const playButton = document.createElement("span");
        playButton.classList.add("button");
        playButton.setAttribute("id", "play-button");
        playButton.textContent = "Играть";
        playButton.addEventListener("click", (e) => {
            document.body.removeChild(document.querySelector("#intro-container"));
            createBoard();
        });
        introContainer.appendChild(playButton);

        document.body.appendChild(introContainer);
    };


    const createBoard = function() {
        let isNextTurnX = true;
        const currCombX = []; 
        const currCombO = [];

        const cellEventHandler = function(e) {

            const winChecker = function() {
                const winningCombs = [
                    // rows
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    // columns
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 6, 9],
                    //diagonals
                    [1, 5, 9],
                    [3, 5, 7]
                ];

                
                const isWinningComb = function(arr) {
                    for (let winningComb of winningCombs) {
                        let counter = 0;

                        for (let item of arr) {
                            if (winningComb.includes(item)) {
                                counter += 1
                            }

                            if (counter == 3) {
                                const boardCells = document.querySelectorAll(".board-cell");
                                boardCells.forEach(cell => {
                                    cell.removeEventListener("click", cellEventHandler);
                                })
                                return true;
                            }
                        }
                    }
                    return false;   
                }

                const checkedCells = document.querySelectorAll(".checked");

                if (isWinningComb(currCombX)) {
                    winningText.textContent = "X wins";
                    createReplayButton(gameContainer);
                } else if (isWinningComb(currCombO)) {
                    winningText.textContent = "O wins";
                    createReplayButton(gameContainer);
                } else if (checkedCells.length == 9) {
                    winningText.textContent = "Ничья";
                    createReplayButton(gameContainer);
                }
                
            }

            if (!e.target.firstChild) {    
                const text = document.createElement("span");
                if (isNextTurnX) {
                    text.textContent = "X";
                    currCombX.push(Number(e.target.getAttribute("data-cell-number")));
                    isNextTurnX = false;
                } else {
                    text.textContent = "O";
                    currCombO.push(Number(e.target.getAttribute("data-cell-number")));
                    isNextTurnX  = true;
                };
                e.target.classList.add("checked");
                winChecker();
                e.target.appendChild(text);
            }
        }

        const createReplayButton = function(parent) {
            const replayButton = document.createElement("span");
            replayButton.classList.add("button");
            replayButton.setAttribute("id", "replay-button");
            replayButton.textContent = "Играть заново";
            replayButton.addEventListener("click", (e) => {
                document.body.removeChild(e.target.parentElement);
                createBoard();
            })
            
            parent.appendChild(replayButton);
        }

        const gameContainer = document.createElement("div");
        gameContainer.setAttribute("id", "game-container");
        document.body.appendChild(gameContainer);

        const winningText = document.createElement("p");
        winningText.setAttribute("id", "winning-text");
        gameContainer.appendChild(winningText);

        const boardContainer = document.createElement("div");
        boardContainer.setAttribute("id", "board-container");
        gameContainer.appendChild(boardContainer);

        for (let i = 1; i < 10; i++) {
            const cell = document.createElement("div");
            cell.classList.add("board-cell");
            cell.setAttribute("data-cell-number", i);
            cell.addEventListener("click", cellEventHandler);
            boardContainer.appendChild(cell);
        }

    }
    
    createIntro();

    return {createBoard};
})();

