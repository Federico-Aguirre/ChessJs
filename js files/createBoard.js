import * as Pieces from "./pieces.js"
export const gameBoard = document.querySelector("#gameboard")

//this is the gameboard
export const startPieces = [
    Pieces.forbidden, Pieces.forbidden, Pieces.blackRookLong, Pieces.blackKnight, Pieces.blackBishop, Pieces.blackQueen, Pieces.blackKing, Pieces.blackBishop, Pieces.blackKnight, Pieces.blackRookShort, Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.blackPawn, Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, '', '', '', '', '', '', '', '', Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, '', '', '', '', '', '', '', '', Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, '', '', '', '', '', '', '', '', Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, '', '', '', '', '', '', '', '', Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.whitePawn, Pieces.forbidden, Pieces.forbidden,
    Pieces.forbidden, Pieces.forbidden, Pieces.whiteRookLong, Pieces.whiteKnight, Pieces.whiteBishop, Pieces.whiteQueen, Pieces.whiteKing, Pieces.whiteBishop, Pieces.whiteKnight, Pieces.whiteRookShort, Pieces.forbidden, Pieces.forbidden
]

export function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.firstChild?.setAttribute('unique-id', i + 100)
        square.setAttribute('square-id', i)

        //this let us create conditionals by checking the matrix
        const row = Math.floor((95 - i) / 12) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "brightSquare" : "darkSquare")
        } else {
            square.classList.add(i % 2 === 0 ? "darkSquare" : "brightSquare")
        }

        if (i < 24) { square.firstChild.classList.add('black') }

        if (i > 71) { square.firstChild.classList.add('white') }

        //selecting every forbidden square outside the gameboard
        if (i < 2 || i > 9 && i < 14 || i > 21 && i < 26 || i > 33 && i < 38 ||
            i > 45 && i < 50 || i > 57 && i < 62 || i > 69 && i < 74 || i > 81 && i < 86 || i > 93
        ) {
            square.classList.add('forbidden')
        }

        gameBoard.append(square)
    })
}
createBoard()