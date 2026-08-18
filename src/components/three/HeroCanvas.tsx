"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reducedMotion;
}

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.5}
      rotationIntensity={prefersReducedMotion ? 0 : 0.4}
      floatIntensity={prefersReducedMotion ? 0 : 0.8}
    >
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#C8232A"
          roughness={0.3}
          metalness={0.8}
          distort={0.3}
          speed={prefersReducedMotion ? 0 : 2}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 150;
  const prefersReducedMotion = useReducedMotion();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#F1E9D8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!ctx) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Fallback: animated gradient background
    return (
      <div
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,35,42,0.15) 0%, transparent 60%)",
        }}
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        // Handle WebGL context loss gracefully
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setHasWebGL(false);
        });
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F1E9D8" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#C8232A" />
      <FloatingShape />
      <Particles />
    </Canvas>
  );
}
