/**
 * Rotates a 3D point around the Y-axis (XZ plane)
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} angle - Rotation angle in radians
 * @returns {{x:number, y:number, z:number}} Rotated point
 */
export function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle), s = Math.sin(angle)
    return { x: x*c - z*s, y, z: x*s + z*c }
}

/**
 * Rotates a 3D point around the Z-axis (XY plane)
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} angle - Rotation angle in radians
 * @returns {{x:number, y:number, z:number}} Rotated point
 */
export function rotate_xy({x, y, z}, angle) {
    const c = Math.cos(angle), s = Math.sin(angle)
    return { x: x*c - y*s, y: x*s + y*c, z }
}

/**
 * Rotates a 3D point around the X-axis (YZ plane)
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} angle - Rotation angle in radians
 * @returns {{x:number, y:number, z:number}} Rotated point
 */
export function rotate_yz({x, y, z}, angle) {
    const c = Math.cos(angle), s = Math.sin(angle)
    return {
        x,
        y: y*c - z*s,
        z: y*s + z*c
    }
}

/**
 * Translates a 3D point along the Z-axis
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} dz - Translation distance along Z
 * @returns {{x:number, y:number, z:number}} Translated point
 */
export function translate_z({x, y, z}, dz) {
    return { x, y, z: z + dz }
}

/**
 * Translates a 3D point along the Y-axis
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} dy - Translation distance along Y
 * @returns {{x:number, y:number, z:number}} Translated point
 */
export function translate_y({x, y, z}, dy) {
    return { x, y: y + dy, z }
}

/**
 * Translates a 3D point along the X-axis
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @param {number} dy - Translation distance along X
 * @returns {{x:number, y:number, z:number}} Translated point
 */
export function translate_x({x, y, z}, dx) {
    return { x: x + dx, y, z }
}

/**
 * Projects a 3D point into 2D using perspective projection
 * (simple pinhole camera model)
 * @param {{x:number, y:number, z:number}} point - Input 3D point
 * @returns {{x:number, y:number}} 2D projected point
 * @warning z must be != 0 (and typically > 0 for visible points)
 */
export function project({x, y, z}) {
    return { x: x / z, y: y / z }
}

/**
 * Converts normalized 2D coordinates [-1, 1] into screen space (pixels)
 * @param {{x:number, y:number}} p - Normalized 2D point
 * @param {number} width - Screen width in pixels
 * @param {number} height - Screen height in pixels
 * @returns {{x:number, y:number}} Screen coordinates (pixels)
 */
export function screen(p, width, height) {
    return {
        x: (p.x + 1) / 2 * width,
        y: (1 - (p.y + 1) / 2) * height
    }
}