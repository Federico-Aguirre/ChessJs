import { allSquares } from './dragFunctions.js'

const infoDisplay = document.querySelector("#info-display")

export function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'))

    if (!kings.some(king => king.classList.contains('white'))) {
        infoDisplay.innerHTML = "Black player wins!"
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }

    if (!kings.some(king => king.classList.contains('black'))) {
        infoDisplay.innerHTML = "White player wins!"
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }
}