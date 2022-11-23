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
    // console.table(board)
    board[0][0] = MOKESH
    board[0][1] = MOKESH
    // board = setMinesNegsCount(board)
    return board
}

function createCell() {
    const cell = {
        minesAroundCount: 0,
        isShown: true,
        isMine: true,
        isMarked: true
    }
    return cell
}

function renderBoard(board) {
    var size = gLevel.SIZE
    var strHTML = '<table><tbody>'
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            var cell = board[i][j]
            var str
            var className
            if (cell.isShown === true) {
                str = cell.isMine ? MOKESH : cell.minesAroundCount
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
            const pos = { i, j }
            if (board[i][j].isMine) continue
            board[i][j].minesAroundCount = countMokeshAround(board, pos)
        }
    }
    return board

}

function countMokeshAround(board, pos) {
    var count = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

console.log('count:', count)


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

