import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';

const ParticleSystem = () => {
  const particles = useRef();
  const { particles: particleData, updateParticles } = useGameStore();

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    if (particleData && particleData.length > 0) {
      const positions = new Float32Array(particleData.flatMap(p => [p.position.x, p.position.y, p.position.z]));
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
    return geometry;
  }, [particleData]);

  useFrame(() => {
    updateParticles();
    if (particles.current && particleData && particleData.length > 0) {
      const positions = particles.current.geometry.attributes.position.array;
      particleData.forEach((p, i) => {
        positions[i * 3] = p.position.x;
        positions[i * 3 + 1] = p.position.y;
        positions[i * 3 + 2] = p.position.z;
      });
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <primitive object={particleGeometry} />
      <pointsMaterial size={0.1} color="#ffffff" />
    </points>
  );
};

export default ParticleSystem;
