"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function NeonSphere({
  position,
  color,
  speed = 2,
  size = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#0a0a0f", 5, 30]} />
      <ambientLight intensity={0.1} />
      <pointLight
        position={[5, 5, 5]}
        color="#ff00ff"
        intensity={3}
        distance={20}
      />
      <pointLight
        position={[-5, 3, -5]}
        color="#00ffff"
        intensity={3}
        distance={20}
      />
      <pointLight
        position={[0, -2, 3]}
        color="#9d00ff"
        intensity={2}
        distance={15}
      />

      <NeonSphere position={[0, 0.5, 0]} color="#ff00ff" size={1.2} />
      <NeonSphere
        position={[3, 1.5, -3]}
        color="#00ffff"
        size={0.8}
        speed={1.5}
      />
      <NeonSphere
        position={[-3, 0, -2]}
        color="#9d00ff"
        size={0.6}
        speed={2.5}
      />
      <NeonSphere position={[2, -1, 2]} color="#39ff14" size={0.4} speed={3} />

      <gridHelper args={[40, 40, "#00ffff", "#00ffff"]} position={[0, -3, 0]} />
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  );
};

export default HeroScene;
