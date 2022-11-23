'use strict'


const MOKESH = '💣'
const FLOOR = ''
const FLAG = '🚩'

var gTime
var gStartTime
var gInterval
var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    if (gInterval) clearInterval(gInterval)
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    resetTime()

}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (!cell.isMine) {
                cell.minesAroundCount = countMokeshAround(board, i, j)
            }
        }
    }
}

function countMokeshAround(board, cellI, cellJ) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) neighborsCount++
        }
    }
    console.log('count:', neighborsCount)
    return neighborsCount
}



function onCellClicked(elCell) {

    var location = {
        i: elCell.dataset.i,
        j: elCell.dataset.j
    }
    const cell = gBoard[location.i][location.j]
    cell.isShown = true
    renderCell(location)
    startTimer()
}


function restart() {
    resetTime()
    onInit()
}

function startTimer() {
    gStartTime = Date.now()
    gInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elH2 = document.querySelector('.time')
        elH2.innerText = seconds.toFixed(3)

    }, 1);
}

function resetTime() {
    var elH2 = document.querySelector('.time')
    elH2.innerText = '0.000'
}

function changeLevel(level) {
    if (level === 'easy') {
        gLevel.SIZE = 6
        gLevel.MINES = 5
        gBoard = buildBoard(gLevel.SIZE)
        renderBoard(gBoard)
    }

    if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 9
        gBoard = buildBoard(gLevel.SIZE)
        renderBoard(gBoard)

    }
    if (level === 'hard') {
        gLevel.SIZE = 10
        gLevel.MINES = 20
        gBoard = buildBoard(gLevel.SIZE)
        renderBoard(gBoard)
    }

    // onInit(gLevel.SIZE)

}

function victory() {

}

function cellMarked(elFlag, location) {
    var location = {
        i: elFlag.dataset.i,
        j: elFlag.dataset.j
    }
    const cell = gBoard[location.i][location.j]
    if (cell.isShown) {
        return
    }
    if (cell.isMarked === false) {
        elFlag.innerText = FLAG
    }
    if (cell.isMarked){
        elFlag.innerText = ''
    }
    cell.isMarked=!cell.isMarked

}