'use strict'


const MINE = '💣'
const FLOOR = ''
const FLAG = '🚩'
const LIFE = '❤️'

var gTime
var gStartTime
var gInterval
var gBoard
var gLevel
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

gLevel = {
    SIZE: 4,
    MINES: 2,
    LIFE: 2
}


function onInit() {
    if (gInterval) clearInterval(gInterval)
    gGame.isOn=true
    createLife(gLevel.LIFE)
    gGame.markedCount = 0
    gGame.shownCount = 0
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    // resetTime()
    
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
    // console.log('count:', neighborsCount)
    return neighborsCount
}



function onCellClicked(elCell) {
    if (gGame.isOn){
    
        
        var location = {
            i: elCell.dataset.i,
            j: elCell.dataset.j
        }
        const cell = gBoard[location.i][location.j]
        
        
        if (gGame.shownCount === 0) {
            startTimer()
        }
        if (cell.isMarked) return
        if (cell.isShown) return
        cell.isShown = true
        gGame.shownCount++
        // console.log('gGame.shownCount:', gGame.shownCount)
        renderCell(location)
        
        
        if (cell.isMine) {
            if (gLevel.LIFE > 0)
            gLevel.LIFE--
            createLife()
            checkGameOver() 
            
            if (gLevel.LIFE === 0) {
                if (gInterval) clearInterval(gInterval)
                gameOver()
            }
        }
        
    }

    checkGameOver()
}




function checkGameOver() {
    if (gGame.shownCount === (gLevel.SIZE ** 2) - gLevel.MINES && gGame.markedCount === gLevel.MINES) victory()
}



function restart() {
    createLife(gLevel.LIFE)
    var elSmile = document.querySelector('.smile')
    elSmile.innerText = '😊'
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
        gLevel.LIFE = 2
    }

    if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 9
        gLevel.LIFE = 3

    }
    if (level === 'hard') {
        gLevel.SIZE = 10
        gLevel.MINES = 20
        gLevel.LIFE = 5
    }
    createLife()
    gBoard = buildBoard()
    renderBoard(gBoard)


}

function createLife() {
    const elLife = document.querySelector('.life span')
    elLife.innerText = LIFE.repeat(gLevel.LIFE)
}

function victory() {
    gGame.isOn = false
    var elSmile = document.querySelector('.smile')
    elSmile.innerText = '🤩'
    if (gInterval) clearInterval(gInterval)
}

function gameOver() {
    gLevel.LIFE++
    gGame.isOn = false
    var elSmile = document.querySelector('.smile')
    elSmile.innerText = '😵'

}




function cellMarked(elFlag, location) {
    if (!gGame.isOn) return
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
        gGame.markedCount++
    }
    if (cell.isMarked) {
        elFlag.innerText = ''
        gGame.markedCount--
    }
    console.log(' gGame.markedCount:', gGame.markedCount)

    cell.isMarked = !cell.isMarked

}


// expandShown(gBoard, i, j)
// function expandShown(board, i, j) {
//     var location = countMokeshAround(board, i, j)
//     for (var i = 0; i < location.length; i++) {
//         const neighborsLocation = location[i]
//         const neighborsCell = board[location.i][location.j]
//         shown(neighborsLocation)
//         gGame.shownCount++
//         neighborsCell.isShown = true
//         renderCell(neighborsLocation)

//         console.log('neighborsCell.minesAroundCount:', neighborsCell)
        
//         if (neighborsCell.minesAroundCount === 0) {
//             neighborsCell.innerText = ''
//             expandShown(board, i, j)
//         } else {
//             neighborsCell.innerText = neighborsCell.minesAroundCount

//         }

//     }
// }

// function shown() {
//     var elCurrCell = document.querySelector(`.cell-${i}-${j},`)
//     elCurrCell.classList.add('shown')

// }








