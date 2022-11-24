'use strict'

function buildBoard() {
    var size = gLevel.SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {
        const idxI = getRandomInt(0, gLevel.SIZE)
        const idxJ = getRandomInt(0, gLevel.SIZE)
        board[idxI][idxJ].isMine = true
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

function renderBoard(board, selector) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var str
            var className = `cell cell-${i}-${j}`

            if (cell.isShown) {
                if (cell.isMine) {
                    str = MINE
                }
                else if (cell.minesAroundCount) {
                    str = cell.minesAroundCount
                }
                else str = ''
            } else {
                str = ''
            }

            strHTML += `<td class="${className}" onclick="onCellClicked(this)"oncontextmenu=" cellMarked(this)" data-i="${i}" data-j="${j}">${str}</td>`

        }
        strHTML += '</tr>'
    }

    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML

}

function renderCell(location) {
    var str
    const cell = gBoard[location.i][location.j]
    if (cell.isShown) {
        if (cell.isShown) {
            if (cell.isMine) str = MINE
            else if (cell.minesAroundCount) str = cell.minesAroundCount
            else str = ''
        }
    }
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerText = str
    elCell.style.backgroundColor='lightGrey'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
