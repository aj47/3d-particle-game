import { create } from 'zustand';
import * as THREE from 'three';

const PARTICLE_COUNT = 1000;

const createParticle = () => ({
  position: new THREE.Vector3(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  ),
  velocity: new THREE.Vector3(
    Math.random() * 0.02 - 0.01,
    Math.random() * 0.02 - 0.01,
    Math.random() * 0.02 - 0.01
  ),
  mass: Math.random() * 0.5 + 0.5,
});

export const useGameStore = create((set, get) => ({
  particles: [],
  playerPosition: new THREE.Vector3(),

  initializeGame: () => {
    const particles = Array(PARTICLE_COUNT).fill().map(createParticle);
    set({ particles });
  },

  updateParticles: () => {
    set(state => {
      const updatedParticles = state.particles.map(particle => {
        const newPosition = particle.position.clone().add(particle.velocity);
        
        // Apply gravity
        particle.velocity.y -= 0.001 * particle.mass;

        // Bounce off walls
        if (Math.abs(newPosition.x) > 5) particle.velocity.x *= -0.9;
        if (Math.abs(newPosition.y) > 5) particle.velocity.y *= -0.9;
        if (Math.abs(newPosition.z) > 5) particle.velocity.z *= -0.9;

        return {
          ...particle,
          position: newPosition,
        };
      });

      return { particles: updatedParticles };
    });
  },

  updatePlayerPosition: (position) => {
    set({ playerPosition: position });
  },
}));
