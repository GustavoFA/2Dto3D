import { vertices, faces, line, point} from "./geometry.js"
import { rotate_xz, translate_z, translate_y, project, screen } from "./transform.js"

const BACKGROUND = "#000000"
const FOREGROUND = "#00ff04"

const game = document.getElementById("game")
const ctx = game.getContext("2d")

const dz = 1
let angle = 0
let lastTime = null

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

function drawTitle(title="The object", fontsize=32) {
    ctx.fillStyle = FOREGROUND
    ctx.font = `bold ${fontsize}px monospace`
    ctx.textAlign = "center"
    ctx.fillText(title, game.width/2, 1.25*fontsize)
}


function transform(v, angle, dz) {
    return screen(project(translate_y(rotate_xz(v, angle), dz)), game.width, game.height)
}

function frame(timestamp) {
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 1/60
    lastTime = timestamp
    angle += Math.PI * dt / 8

    clear()
    drawTitle("The Cube", 64)

    for (const f of faces) {
        for (let i = 0; i < f.length; ++i) {
            const a = transform(vertices[f[i]], angle, dz)
            const b = transform(vertices[f[(i+1) % f.length]], angle, dz)
            line(ctx, FOREGROUND, a, b, 3)
        }
    }

    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)