export const vertices = [
    {x:  0.25, y:  0.25, z:  0.25},
    {x: -0.25, y:  0.25, z:  0.25},
    {x: -0.25, y: -0.25, z:  0.25},
    {x:  0.25, y: -0.25, z:  0.25},
    {x:  0.25, y:  0.25, z: -0.25},
    {x: -0.25, y:  0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x:  0.25, y: -0.25, z: -0.25}
]

export const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4], [1, 5], [2, 6], [3, 7]
]

export function point(ctx, color, {x, y}, size=20) {
    const s = size
    ctx.fillStyle = color
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

export function line(ctx, color, p1, p2, thickness=3) {
    ctx.lineWidth = thickness
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}