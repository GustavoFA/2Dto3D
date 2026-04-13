import { vertices, faces } from "./geometry.js"
import { rotate_xz, translate_z, project, screen } from "./transform.js"

const BACKGROUND = "#000000"
const FOREGROUND = "#00ff04"

const game = document.getElementById("game")
console.log("canvas:", game)          // should print: <canvas id="game">
console.log("size:", game.width, game.height)  // should print numbers
const ctx = game.getContext("2d")
console.log("ctx:", ctx)              // should print: CanvasRenderingContext2D

function resize() {
    game.width = window.innerWidth
    game.height = window.innerHeight
}
resize()
window.addEventListener("resize", resize)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function drawTitle() {
    ctx.fillStyle = FOREGROUND
    ctx.font = "bold 32px monospace"
    ctx.textAlign = "center"
    ctx.fillText("The Cube", game.width/2, 40)
}

function point({x, y}) {
    const s = 20
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 3
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}

function transform(v, angle, dz) {
    return screen(project(translate_z(rotate_xz(v, angle), dz)), game.width, game.height)
}

const dz = 1
let angle = 0
let lastTime = null

function frame(timestamp) {
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 1/60
    lastTime = timestamp
    angle += Math.PI * dt / 8

    clear()
    drawTitle()

    for (const f of faces) {
        for (let i = 0; i < f.length; ++i) {
            const a = transform(vertices[f[i]], angle, dz)
            const b = transform(vertices[f[(i+1) % f.length]], angle, dz)
            // point(a)
            // point(b)
            line(a, b)
        }
    }

    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)