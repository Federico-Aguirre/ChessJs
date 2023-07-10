import { checkForWin } from './checkForCheck.js';
import {
    whitePremoveHistory, whitePremoveSquareHistory,
    blackPremoveHistory, blackPremoveSquareHistory
} from './dragFunctions.js'
import { pieceMovements } from './pieceMovements.js'

export let playerGo = 'white'
export const playerDisplay = document.querySelector('#player')
export let eventChange = null

playerDisplay.textContent = 'white'

export function changePlayer() {
    if (playerGo === 'white') {
        playerGo = 'black'
        playerDisplay.textContent = 'black'
        if (playerGo === 'black' && blackPremoveHistory[1]) {
            eventChange = "activateBlackPremove"
            let blackTargetPiece = document.querySelector(`[unique-id="${blackPremoveHistory[0]}"]`)
            let blackTargetGoal = document.querySelector(`[square-id="${blackPremoveHistory[1]}"]`)
            let valid = pieceMovements(blackTargetGoal)
            if (valid) {
                if (blackTargetGoal.firstChild && blackTargetGoal.firstChild.classList.contains('white')) {
                    blackTargetGoal.firstChild.remove()
                }

                if (blackTargetGoal.firstChild && blackTargetGoal.firstChild.classList.contains('black')) {
                    document.querySelectorAll(".square").forEach(obj => obj.classList.remove("blackPremoveBgColor"));
                    document.querySelectorAll(".square").forEach(obj => obj.classList.remove("blackPiecesBgColor"));
                    blackPremoveHistory.length = 0
                    blackPremoveSquareHistory.length = 0
                } else {
                    blackTargetGoal.append(blackTargetPiece)
                    checkForWin()
                    document.querySelectorAll('.blackPiecesBgColor').forEach(el => el.classList.remove('blackPiecesBgColor'));
                    document.querySelectorAll('.whitePiecesBgColor').forEach(el => el.classList.remove('whitePiecesBgColor'));
                    document.querySelector(`[square-id="${blackPremoveSquareHistory[0]}"]`).classList.remove('blackPremoveBgColor')
                    document.querySelector(`[square-id="${blackPremoveSquareHistory[0]}"]`).classList.add('blackPiecesBgColor')
                    blackPremoveSquareHistory.splice(0, 1)
                    blackTargetPiece.parentNode.classList.remove('blackPremoveBgColor')
                    blackTargetPiece.parentNode.classList.add('blackPiecesBgColor')
                    blackPremoveHistory.splice(1, 1)
                    blackPremoveHistory.splice(0, 1)
                    playerGo = 'white'
                    playerDisplay.textContent = 'white'
                }
            }

            // if black premove is not valid this will delete black premove square color 
            // and remove black premove move list
            if (!valid) {
                document.querySelectorAll(".blackPremoveBgColor").forEach(obj => obj.classList.remove("blackPremoveBgColor"));
                document.querySelectorAll(".blackPiecesBgColor").forEach(obj => obj.classList.remove("blackPiecesBgColor"));
                blackPremoveHistory.length = 0
                blackPremoveSquareHistory.length = 0
            }
            eventChange = null
        }
    }

    else {
        playerGo = 'white'
        playerDisplay.textContent = 'white'

        if (playerGo === 'white' && whitePremoveHistory[1]) {
            eventChange = "activateWhitePremove"
            const whiteTargetPiece = document.querySelector(`[unique-id="${whitePremoveHistory[0]}"]`)
            const whiteTargetGoal = document.querySelector(`[square-id="${whitePremoveHistory[1]}"]`)
            let valid = pieceMovements(whiteTargetGoal)
            if (valid) {
                document.querySelectorAll(".square").forEach(obj => obj.classList.remove("whitePiecesBgColor"));
                if (whiteTargetGoal.firstChild && whiteTargetGoal.firstChild.classList.contains('black')) {
                    whiteTargetGoal.firstChild.remove();
                }

                if (whiteTargetGoal.firstChild && whiteTargetGoal.firstChild.classList.contains('white')) {
                    document.querySelectorAll(".square").forEach(obj => obj.classList.remove("whitePremoveBgColor"));
                    document.querySelectorAll(".square").forEach(obj => obj.classList.remove("whitePiecesBgColor"));
                    whitePremoveHistory.length = 0
                    whitePremoveSquareHistory.lenght = 0
                } else {
                    whiteTargetGoal.append(whiteTargetPiece)
                    checkForWin()
                    const brightList = document.querySelectorAll('.blackPiecesBgColor, .whitePiecesBgColor');
                    brightList.forEach(el => el.classList.remove('blackPiecesBgColor'));
                    brightList.forEach(el => el.classList.remove('whitePiecesBgColor'));
                    document.querySelector(`[square-id="${whitePremoveSquareHistory[0]}"]`).classList.remove('whitePremoveBgColor')
                    document.querySelector(`[square-id="${whitePremoveSquareHistory[0]}"]`).classList.add('whitePiecesBgColor')
                    whitePremoveSquareHistory.splice(0, 1)
                    whiteTargetGoal.classList.remove('whitePremoveBgColor')
                    whiteTargetGoal.classList.add('whitePiecesBgColor')
                    whitePremoveHistory.splice(1, 1)
                    whitePremoveHistory.splice(0, 1)
                    playerGo = 'black'
                    playerDisplay.textContent = 'black'
                }
            }
            // if white premove is not valid this will delete white premove square color 
            // and remove white premove move list
            if (!valid) {
                document.querySelectorAll(".whitePremoveBgColor").forEach(obj => obj.classList.remove("whitePremoveBgColor"));
                document.querySelectorAll(".whitePiecesBgColor").forEach(obj => obj.classList.remove("whitePiecesBgColor"));
                whitePremoveHistory.length = 0
                whitePremoveSquareHistory.lenght = 0
            }
            eventChange = null
        }
    }
}