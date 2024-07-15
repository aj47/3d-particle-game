"use client";

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleSystem from '../components/ParticleSystem';
import PlayerControls from '../components/PlayerControls';
import { useGameStore } from '../store/gameStore';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { initializeGame } = useGameStore();

  useEffect(() => {
    setIsClient(true);
    initializeGame();
  }, [initializeGame]);

  if (!isClient) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleSystem />
        <PlayerControls />
      </Canvas>
    </main>
  );
}
