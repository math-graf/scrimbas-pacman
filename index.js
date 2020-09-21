const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0
let dotsEaten = 0

/* ==== Layout =====
    28 * 28 = 784

    0 - dots
    1 - wall
    2 - ghost lair
    3 - power-pellet
    4 - empty

================== */

const level01 = [
    1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
    1,  1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,
    1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  4,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  4,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  4,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,
    1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,
    1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,
    0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  3,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  3,  1,  1,
    1,  1,  0,  1,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  1,  0,  1,  1,
    1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,
    1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,
    1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,
    1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  3,  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  3,  1,  1,  1,  0,  1,  1,
    1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,
    1,  1,  3,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,
    1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
]


/* =================
Create board
================== */

function createBoard() {
    for (let i = 0; i < level01.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        
        let typeClass
        
        switch (level01[i]) {
            case 0: typeClass = 'pac-dot'; break
            case 1: typeClass = 'wall'; break
            case 2: typeClass = 'ghost-lair'; break
            case 3: typeClass = 'power-pellet'; break
            case 4: typeClass = 'empty'; break
        }
        
        squares[i].classList.add(`${typeClass}`)
    }
}
createBoard()

let totalDots = 0
for (let square of squares) {
    if (square.classList.contains('pac-dot')) {
        totalDots++
    }
}

let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// keyCode is a method that codifies keys pressed on the keyboard
/* ============
    Key Codes

    left - 37
    up - 38
    right - 39
    down - 40

============== */

function control(e) {

    const leftKeyPressed = e.keyCode === 37
    const upKeyPressed = e.keyCode === 38
    const rightKeyPressed = e.keyCode === 39
    const downKeyPressed = e.keyCode === 40

    const noLeftWallOrGhostLair = pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
    const noUpWallOrGhostLair = (pacmanCurrentIndex - width) >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
    const noRightWallOrGhostLair = (pacmanCurrentIndex + 1) % width !== 0 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
    const noDownWallOrGhostLair = (pacmanCurrentIndex + width) < 784 && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')

    const leftTeleport = pacmanCurrentIndex === 308
    const rightTeleport = pacmanCurrentIndex === 335

    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch (true) {
        case leftKeyPressed && leftTeleport:
            pacmanCurrentIndex = 335
        break
        case rightKeyPressed && rightTeleport:
            pacmanCurrentIndex = 308
        break
        case leftKeyPressed && noLeftWallOrGhostLair:
            pacmanCurrentIndex--
        break
        case upKeyPressed && noUpWallOrGhostLair:
            pacmanCurrentIndex -= width
        break
        case rightKeyPressed && noRightWallOrGhostLair:
            pacmanCurrentIndex++
        break
        case downKeyPressed && noDownWallOrGhostLair:
            pacmanCurrentIndex += width    
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    powerPelletEaten()
}
document.addEventListener('keyup', control)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        dotsEaten++
        scoreDisplay.innerHTML = score
    }
    checkForWin()
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(function() {
            ghosts.forEach(ghost => ghost.isScared = false)
        }, 10000)
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

/* ==================
    Drawing Ghosts
=================== */

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    ghost.timerId = setInterval(function() {
        const squareIsNotWall = !squares[ghost.currentIndex + direction].classList.contains('wall')
        const squareIsNotGhost = !squares[ghost.currentIndex + direction].classList.contains('ghost')
        const pacmanIsThere = squares[ghost.currentIndex].classList.contains('pacman')

        if (squareIsNotWall && squareIsNotGhost) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        if (ghost.isScared && pacmanIsThere) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed)
}

function checkForGameOver() {
    const notScaredGhostGotPacman = squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')

    if (notScaredGhostGotPacman) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = 'You LOSE'
    }
}

function checkForWin() {
    if (dotsEaten === totalDots) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML += ' You WIN'
    }
}