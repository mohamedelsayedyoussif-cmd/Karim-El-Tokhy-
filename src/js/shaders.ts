// Custom WebGL Shaders
export const customVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const customFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  void main() {
    gl_FragColor = vec4(vUv.x, vUv.y, sin(time), 1.0);
  }
`;
