export function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle), s = Math.sin(angle)
    return { x: x*c - z*s, y, z: x*s + z*c }
}

export function translate_z({x, y, z}, dz) {
    return { x, y, z: z + dz }
}

export function project({x, y, z}) {
    return { x: x/z, y: y/z }
}

export function screen(p, width, height) {
    return {
        x: (p.x + 1)/2 * width,
        y: (1 - (p.y + 1)/2) * height
    }
}