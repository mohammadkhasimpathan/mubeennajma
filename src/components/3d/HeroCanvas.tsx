import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 3000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.3;
      ref.current.rotation.z = clock.getElapsedTime() * 0.2;
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[2, 0, -2]}>
      <torusGeometry args={[0.8, 0.08, 16, 80]} />
      <meshStandardMaterial color="#8B5CF6" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
      ref.current.position.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3 - 2;
      ref.current.position.y = Math.cos(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[-2, 0, -1]}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial color="#3B82F6" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

/** Three.js hero canvas with particle field and floating wireframe geometry */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 2)}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3B82F6" />
      <ParticleField />
      <FloatingRing />
      <FloatingSphere />
    </Canvas>
  );
}
