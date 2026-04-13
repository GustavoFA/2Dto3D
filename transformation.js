const BACKGROUND = "#000000"
const FOREGROUND = "#00ff04"
const FPS = 60;

let dz = 1;
let angle = 0;
let lastTime = null

// we can create a function that generate vertices array 
const vertices = [
    {x:  0.25, y:  0.25, z:  0.25},
    {x: -0.25, y:  0.25, z:  0.25},
    {x: -0.25, y: -0.25, z:  0.25},
    {x:  0.25, y: -0.25, z:  0.25},

    {x:  0.25, y:  0.25, z: -0.25},
    {x: -0.25, y:  0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x:  0.25, y: -0.25, z: -0.25}

]

const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
]

console.log(game)
// game.width = 800
// game.height = 800

// use this tool to draw
const ctx = game.getContext("2d") 
console.log(ctx)

// resize the window size
function resize() {
    game.width = window.innerWidth
    game.height = window.innerHeight
}

// Title in the middle
function drawTitle() {
    ctx.fillStyle = FOREGROUND
    ctx.font = "bold 32px monospace"
    ctx.textAlign = "center"
    ctx.fillText("The Cube", game.width/2, 40)
}

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

// Create a point
function point({x, y}) {
    const s = 20;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 3
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(p) {
    // -1 .. 1 => 0 .. w/h
    return {
        x: (p.x + 1)/2*game.width,
        y: (1 - (p.y + 1)/2)*game.height
    }
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z
    }
}



function translate_z({x, y, z}, dz) {
    return {x, y, z: z + dz}
}

function rotate_xz({x, y, z}, angle) {
    // based on the 2d vector we can use a transformation matrix to perform a rotation in Eucledian space
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - z*s,
        y,
        z: x*s + z*c
    };
}

// // animation loop
// function frame() {
//     const dt = 1/FPS;
//     // dz += 1*dt; // cube volume
//     angle += Math.PI*dt/8; // rotation speed
//     // for (const v of vertices) {
//         //     point(screen(project(translate_z(rotate_xz(v, angle), dz))))
//         // }
//     clear()
//     // Insert the title
//     drawTitle()
//     for (const f of faces) {
//         for (let i = 0; i < f.length; ++i) {
//             const a = vertices[f[i]];
//             const b = vertices[f[(i+1)%f.length]]; // trick that makes the last vertex wrap around and connect back to the first
//             line(screen(project(translate_z(rotate_xz(a, angle), dz))),
//                  screen(project(translate_z(rotate_xz(b, angle), dz)))
//             )   
//         }
//     }
//     setTimeout(frame, 1000/FPS) // call the function later
// }

// Animation function
function frame(timestamp) {
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 1/60
    lastTime = timestamp

    angle += Math.PI * dt / 4 

    clear()

    // Insert the title
    drawTitle()

    // Insert the lines 
    for (const f of faces) {
        for (let i = 0; i < f.length; ++i) {
            const a = vertices[f[i]];
            const b = vertices[f[(i+1)%f.length]]; // trick that makes the last vertex wrap around and connect back to the first
            line(screen(project(translate_z(rotate_xz(a, angle), dz))),
                 screen(project(translate_z(rotate_xz(b, angle), dz)))
            )   
        }
    }
    requestAnimationFrame(frame)
}

resize()
window.addEventListener("resize", resize)

// setTimeout(frame, 1000/FPS);
requestAnimationFrame(frame)