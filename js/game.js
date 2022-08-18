import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
const music = new Audio('./music/music1.mp3')

const gameOvermusic = new Audio('./music/gameover.mp3');
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let hiscore = localStorage.getItem('hiscore')
let hiscoreval = 0;
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))

} else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "HighScore : " + hiscore
}

function main(currentTime) {
    music.play();
    if (gameOver) {
        gameOvermusic.play()
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood(hiscoreval, hiscore, hiscoreBox)
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}