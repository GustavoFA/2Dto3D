# 2D to 3D — Canvas Experiments

A study in simulating 3D graphics using only the browser's 2D Canvas API. No libraries, no WebGL — just math and pixels.

Inspired by [tsoding/formula](https://github.com/tsoding/formula/tree/main).

## Demo

A rotating wireframe cube rendered entirely with `<canvas>` and vanilla JavaScript.

## How it works

The core idea is that 3D can be *faked* on a 2D surface by applying a series of mathematical transformations to each vertex before drawing:

```
3D vertex → rotate → translate → project → screen coords → draw
```

1. **Rotation** — a transformation matrix rotates the vertex around an axis
2. **Translation** — moves the vertex along the Z axis (depth)
3. **Perspective projection** — divides X and Y by Z, making far objects appear smaller
4. **Screen mapping** — converts the `-1..1` normalized range into actual pixel coordinates

## Project structure

```
project/
  index.html       # canvas element and script entry point
  main.js          # render loop, drawing functions
  geometry.js      # vertices and faces of 3D shapes
  transform.js     # pure math functions (rotate, project, translate, screen)
```

## Running locally

Because the project uses ES Modules (`import/export`), it must be served over HTTP — not opened directly as a `file://` URL.

**With Python (recommended on Linux/Mac):**
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

**With Node.js:**
```bash
npx serve .
```

## Concepts explored

- 2D Canvas API (`fillRect`, `strokeStyle`, `beginPath`, etc.)
- Perspective projection
- Rotation matrices in Euclidean space
- Game loop with `requestAnimationFrame`
- ES Modules (`import` / `export`)
- Frame-rate independent animation using delta time (`dt`)

## Roadmap

- [ ] More 3D shapes (pyramid, sphere approximation)
- [ ] Rotation on multiple axes (Y, Z)
- [ ] Mouse/touch drag to rotate
- [ ] Filled faces with basic lighting
- [ ] Load shapes from external JSON files

## References

- [tsoding/formula](https://github.com/tsoding/formula/tree/main) — original inspiration
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Rotation matrix — Wikipedia](https://en.wikipedia.org/wiki/Rotation_matrix)