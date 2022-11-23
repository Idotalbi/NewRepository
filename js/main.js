'use strict'


const MOKESH = '💣'
const FLOOR = ''

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}

// console.log('gLevel.SIZE:', gLevel.SIZE)
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)

}


function buildBoard() {
    var size = gLevel.SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }

    }
     setMinesNegsCount(board)
    return board
}

function createCell() {
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}

function renderBoard(board,selector) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i <board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var str
            var className=`cell cell${i}-${j}`
            if (cell.isShown === true) {
                str = (cell.isMine) ? MOKESH : cell.minesAroundCount
                if (!cell.minesAroundCount) str = FLOOR

            } else {
                str = FLOOR
            }

            strHTML += `<td class"${className}" onclick="onCellClicked(this, ${i},${j})" >${str}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</table></tbody>'
    const elBoard = document.querySelector('.board-game')
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            const cell=board[i][j]
            if (cell.isMine) continue
            cell.minesAroundCount = countMokeshAround(board,i,j)
        }
    }

}

function countMokeshAround(board,cellI,cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}

console.log('count:', neighborsCount)


function onCellClicked(elCell, i, j) {
    var str
    if (gBoard[i][j].isMine) {
        str = MOKESH
    } else {
        str = gBoard[i][j].minesAroundCount
        if (str === 0) {
            str = FLOOR
        }
    }
    gBoard[i][j].isShown = true
    elCell.classList.add="show"
    elCell.innertext=str
    // elCell.innerHTML = cell.minesAroundCount
    // elCell.classList.replace('hide', 'show')

}

