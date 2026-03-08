// This file acts as the central Three.js setup if we were using vanilla JS.
// Since we are using @react-three/fiber, the Canvas is embedded in the Hero component.
// We export a helper or configuration here to match the requested structure.
export const sceneConfig = {
  camera: { position: [0, 0, 8] as [number, number, number], fov: 45 },
  ambientLight: { intensity: 0.5 },
  directionalLight: { position: [10, 10, 5] as [number, number, number], intensity: 1 },
};
