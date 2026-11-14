import { useEffect, useRef } from 'react';

const BAYER_4X4 = [
  0.0, 0.5, 0.125, 0.625,
  0.75, 0.25, 0.875, 0.375,
  0.1875, 0.6875, 0.0625, 0.5625,
  0.9375, 0.4375, 0.8125, 0.3125,
];

function start2DFallback(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let rafId = 0;
  const scale = 2;
  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return () => {};

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offscreen.width = Math.max(1, Math.floor(canvas.width / scale));
    offscreen.height = Math.max(1, Math.floor(canvas.height / scale));
  };

  window.addEventListener('resize', resize);
  resize();

  const t0 = performance.now();

  const hash = (x: number, y: number) => {
    const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return h - Math.floor(h);
  };

  const noise = (x: number, y: number) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  };

  const fbm = (x: number, y: number) => {
    let value = 0;
    let amp = 0.5;
    let px = x;
    let py = y;
    for (let i = 0; i < 4; i++) {
      value += amp * noise(px, py);
      px *= 2;
      py *= 2;
      amp *= 0.5;
    }
    return value;
  };

  const render = () => {
    const t = (performance.now() - t0) / 1000;
    const w = offscreen.width;
    const h = offscreen.height;
    const img = offCtx.createImageData(w, h);
    const data = img.data;
    const aspect = w / Math.max(h, 1);

    for (let y = 0; y < h; y++) {
      const sy = (y / h) * 3.0 + t * 0.025;
      const by = y & 3;
      for (let x = 0; x < w; x++) {
        const sx = (x / w) * aspect * 3.0 + t * 0.06;
        let n = fbm(sx, sy);
        n = Math.min(1, Math.max(0, (n - 0.1) / 0.7));
        n = n * n * (3 - 2 * n);
        const limit = BAYER_4X4[(by << 2) | (x & 3)];
        const val = n >= limit ? 255 : 0;
        const idx = (y * w + x) << 2;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }

    offCtx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    rafId = requestAnimationFrame(render);
  };

  rafId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  };
}

export function DitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      return start2DFallback(canvas);
    }

    const resizeDither = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeDither);
    resizeDither();

    const vertexSource = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `;

    const fragmentSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float hash(vec2 p) {
        p = fract(p * vec2(233.14, 113.23));
        p += dot(p, p.yx + 19.19);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 st = uv;
        st.x *= u_resolution.x / max(u_resolution.y, 1.0);

        float n = fbm(st * 3.0 + vec2(u_time * 0.06, u_time * 0.025));
        n = smoothstep(0.1, 0.8, n);

        int bx = int(mod(gl_FragCoord.x, 4.0));
        int by = int(mod(gl_FragCoord.y, 4.0));
        float limit = 0.0;
        if(bx==0 && by==0) limit = 0.0000;
        if(bx==1 && by==0) limit = 0.5000;
        if(bx==2 && by==0) limit = 0.1250;
        if(bx==3 && by==0) limit = 0.6250;
        if(bx==0 && by==1) limit = 0.7500;
        if(bx==1 && by==1) limit = 0.2500;
        if(bx==2 && by==1) limit = 0.8750;
        if(bx==3 && by==1) limit = 0.3750;
        if(bx==0 && by==2) limit = 0.1875;
        if(bx==1 && by==2) limit = 0.6875;
        if(bx==2 && by==2) limit = 0.0625;
        if(bx==3 && by==2) limit = 0.5625;
        if(bx==0 && by==3) limit = 0.9375;
        if(bx==1 && by==3) limit = 0.4375;
        if(bx==2 && by==3) limit = 0.8125;
        if(bx==3 && by==3) limit = 0.3125;

        float stepVal = step(limit, n);
        vec3 colorInk = vec3(0.0, 0.0, 0.0);
        vec3 colorPaper = vec3(1.0, 1.0, 1.0);
        gl_FragColor = vec4(mix(colorInk, colorPaper, stepVal), 1.0);
      }
    `;

    const compileShader = (src: string, type: number) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(vertexSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      window.removeEventListener('resize', resizeDither);
      return start2DFallback(canvas);
    }

    const prog = gl.createProgram();
    if (!prog) {
      window.removeEventListener('resize', resizeDither);
      return start2DFallback(canvas);
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      window.removeEventListener('resize', resizeDither);
      gl.deleteProgram(prog);
      return start2DFallback(canvas);
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(prog, 'u_resolution');
    const timeLoc = gl.getUniformLocation(prog, 'u_time');

    const t0 = Date.now();
    let rafId = 0;

    const renderDither = () => {
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (Date.now() - t0) / 1000.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(renderDither);
    };

    renderDither();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeDither);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} id="dither-canvas" aria-hidden="true" data-testid="dither-canvas" />;
}
