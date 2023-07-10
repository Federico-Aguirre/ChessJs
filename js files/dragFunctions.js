import { checkForWin } from './checkForCheck.js';
import { pieceMovements } from './pieceMovements.js';
import { changePlayer, playerGo } from './changePlayer.js';

export const allSquares = document.querySelectorAll("#gameboard .square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

export let startPositionId
export let draggedElement

export let whitePremoveSquareHistory = []
export let whitePremoveHistory = []
let whitePremoveHistoryCount = 0

export let blackPremoveSquareHistory = []
export let blackPremoveHistory = []
let blackPremoveHistoryCount = 0

export function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    const currentSquare = e.target.parentNode
    e.target.setAttribute('draggable', true)
    draggedElement = e.target

    if (playerGo === 'white') {
        //this remove the dragStarting move if it doesn`t have a drop finish move 
        if (whitePremoveHistoryCount % 2 != 0) {
            whitePremoveSquareHistory.splice(-1, 1)
            whitePremoveHistory.splice(-1, 1)
            whitePremoveHistoryCount--
        }
        //this add yellow color to both sides last moves starting square position
        currentSquare.firstChild.classList.contains('white') &&
            currentSquare.classList.add("whitePiecesBgColor")
    }

    if (playerGo === 'black') {
        //this remove the dragStarting move if it doesn`t have a drop finish move 
        if (blackPremoveHistoryCount % 2 != 0) {
            blackPremoveSquareHistory.splice(-1, 1)
            blackPremoveHistory.splice(-1, 1)
            blackPremoveHistoryCount--
        }
        //this add yellow color to both sides last moves starting square position
        currentSquare.firstChild.classList.contains('black') &&
            currentSquare.classList.add("blackPiecesBgColor")
    }

    const correctGo = draggedElement.classList.contains(playerGo)
    const opponentGo = playerGo === 'black' ? 'white' : 'black'

    if (!correctGo && playerGo === 'black') {
        if (whitePremoveHistoryCount % 2 != 0) {
            whitePremoveSquareHistory.splice(-1, 1)
            whitePremoveHistory.splice(-1, 1)
            whitePremoveHistoryCount--
        }
        if (whitePremoveSquareHistory.lenght != 0 && whitePremoveHistory[1]) {
            whitePremoveSquareHistory.splice(whitePremoveSquareHistory.length, 0, whitePremoveHistory[whitePremoveHistoryCount - 1])
            whitePremoveHistory.splice(whitePremoveHistory.length, 0, e.target.getAttribute('unique-id'))
            whitePremoveHistoryCount++
        } else {
            whitePremoveSquareHistory.splice(whitePremoveSquareHistory.length, 0, e.target.parentNode.getAttribute('square-id'))
            whitePremoveHistory.splice(whitePremoveHistory.length, 0, e.target.getAttribute('unique-id'))
            whitePremoveHistoryCount++
        }
    }

    if (!correctGo && playerGo === 'white') {
        if (blackPremoveHistoryCount % 2 != 0) {
            blackPremoveSquareHistory.splice(-1, 1)
            blackPremoveHistory.splice(-1, 1)
            blackPremoveHistoryCount--
        }
        e.target.parentNode.classList.add('blackPremoveBgColor')
        if (blackPremoveSquareHistory.lenght != 0 && blackPremoveHistory[1]) {
            blackPremoveSquareHistory.splice(blackPremoveSquareHistory.length, 0, blackPremoveHistory[blackPremoveHistoryCount - 1])
            blackPremoveHistory.splice(blackPremoveHistory.length, 0, e.target.getAttribute('unique-id'))
            blackPremoveHistoryCount++
        } else {
            blackPremoveSquareHistory.splice(blackPremoveSquareHistory.length, 0, e.target.parentNode.getAttribute('square-id'))
            blackPremoveHistory.splice(blackPremoveHistory.length, 0, e.target.getAttribute('unique-id'))
            blackPremoveHistoryCount++
        }
    }
}

export function dragOver(e) {
    e.preventDefault()
}

export function dragDrop(e) {
    const valid = pieceMovements(e.target)
    e.stopPropagation()
    const correctGo = draggedElement.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const opponentGo = playerGo === 'black' ? 'white' : 'black'
    const takenByOpponent = e.target.classList.contains(opponentGo)

    if (correctGo) {
        if (takenByOpponent && valid) {
            allSquares.forEach((square, i) => playerGo === 'white' ? square.classList.remove("blackPiecesBgColor") : square.classList.remove("whitePiecesBgColor"))
            e.target.parentNode.append(draggedElement)
            allSquares.forEach((square, i) => playerGo === 'white' ? e.target.parentNode.classList.add("whitePiecesBgColor") : e.target.parentNode.classList.add("blackPiecesBgColor"))

            e.target.remove()
            checkForWin()
            changePlayer()
            return
        }
        if (taken && !takenByOpponent) {
            allSquares.forEach((square, i) => playerGo == 'white' ? square.classList.remove("whitePiecesBgColor") : square.classList.remove("blackPiecesBgColor"))
            infoDisplay.textContent = "You can't go on top of your pieces"
            setTimeout(() => infoDisplay.textContent = "", 2000)
            return
        }
        if (valid) {
            allSquares.forEach((square, i) => playerGo === 'white' ? square.classList.remove("blackPiecesBgColor") : square.classList.remove("whitePiecesBgColor"))
            playerGo === 'white' ? e.target.classList.add("whitePiecesBgColor") : e.target.classList.add("blackPiecesBgColor")
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }

    const endPositionId = e.target.getAttribute('square-id')
    const endPositionIdWithPiece = e.target.parentNode.getAttribute('square-id')

    if (!correctGo && playerGo === 'black' && endPositionId != whitePremoveHistory[whitePremoveHistory.length - 1]) {
        if (e.target.firstChild) {
            e.target.parentNode.classList.add('whitePremoveBgColor')
            whitePremoveHistory.splice(whitePremoveHistory.length, 0, endPositionIdWithPiece)
            whitePremoveHistoryCount++
            return
        }

        e.target.classList.add('whitePremoveBgColor')
        whitePremoveHistory.splice(whitePremoveHistory.length, 0, endPositionId)
        whitePremoveHistoryCount++
    }

    if (!correctGo && playerGo === 'white' && endPositionId != blackPremoveHistory[blackPremoveHistory.length - 1]) {
        if (e.target.firstChild) {
            e.target.parentNode.classList.add('blackPremoveBgColor')
            blackPremoveHistory.splice(blackPremoveHistory.length, 0, endPositionIdWithPiece)
            blackPremoveHistoryCount++
            return
        }

        e.target.classList.add('blackPremoveBgColor')
        blackPremoveHistory.splice(blackPremoveHistory.length, 0, endPositionId)
        blackPremoveHistoryCount++
    }
}