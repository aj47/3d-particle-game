import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

const PlayerControls = () => {
  const { camera } = useThree();
  const { updatePlayerPosition } = useGameStore();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const vector = new THREE.Vector3(mousePos.current.x, mousePos.current.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      updatePlayerPosition(pos);
    }, 1000 / 60); // 60 fps

    return () => clearInterval(updateInterval);
  }, [camera, updatePlayerPosition]);

  return null;
};

export default PlayerControls;
