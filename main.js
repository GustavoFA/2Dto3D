import { vertices, faces, line, point} from "./geometry.js"
import { rotate_xz, rotate_xy, rotate_yz, translate_z, translate_y, translate_x, project, screen } from "./transform.js"

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
    // return screen(project(translate_z(rotate_xz(v, angle), dz)), game.width, game.height)
    // return screen(project(trrotate_xz(v, angle)), game.width, game.height)
    return screen(project(v), game.width, game.height)
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
            point(ctx, FOREGROUND, a)
            point(ctx, FOREGROUND, b)
            line(ctx, FOREGROUND, a, b, 1)
        }
    }

    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)