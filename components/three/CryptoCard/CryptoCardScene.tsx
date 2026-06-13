"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ANIMATION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CryptoCardSceneProps {
  scrollProgress?: number;
}

const CARD_WIDTH = 2.8;
const CARD_HEIGHT = 1.8;
const CARD_DEPTH = 0.06;
const CARD_RADIUS = 0.12;

/**
 * Crypto Card scene — a sleek 3D card with aurora metallic finish.
 * Gently rotates and floats. Mouse parallax for subtle tilt.
 * Scroll illumates the card and brings particles in.
 */
export function CryptoCardScene({ scrollProgress = 0 }: CryptoCardSceneProps) {
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const { size, camera } = useThree();
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const handleMouseMove = (e: MouseEvent) => {
    mouseTarget.current.x = (e.clientX / size.width) * 2 - 1;
    mouseTarget.current.y = -(e.clientY / size.height) * 2 + 1;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#16162A"),
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 0.8,
        envMapIntensity: 0.6,
      }),
    []
  );

  const stripeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3B82F6"),
        metalness: 0.6,
        roughness: 0.1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color("#3B82F6"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  const particleCount = reducedMotion ? 0 : 400;
  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 6,
      speed: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      size: 0.01 + Math.random() * 0.03,
    }));
  }, [particleCount]);

  const particleRefs = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const time = Date.now() * 0.001;

    if (!reducedMotion) {
      // Auto-rotate card
      groupRef.current.rotation.y += delta * 0.25;

      // Mouse parallax tilt
      const targetRotX = mouseTarget.current.y * 0.3;
      const targetRotY = mouseTarget.current.x * 0.5;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;

      // Float
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.15;
      groupRef.current.position.z = scrollProgress * 0.5;
    }

    // Animate floating particles
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = particleData[i];
      mesh.position.y = p.y + Math.sin(time * 2 + p.phase) * 0.6;
      mesh.position.x = p.x + Math.cos(time * 1.5 + p.phase) * 0.4;
      mesh.position.z = p.z + Math.sin(time * 1.8 + p.phase) * 0.4;
      const opacity = 0.15 + Math.sin(time * 3 + p.phase) * 0.1 + scrollProgress * 0.3;
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.6, opacity);
    });

    // Camera gentle drift
    const camTargetX = mouseTarget.current.x * 0.2;
    const camTargetY = mouseTarget.current.y * 0.15;
    (camera as THREE.PerspectiveCamera).position.x += (camTargetX - (camera as THREE.PerspectiveCamera).position.x) * 0.01;
    (camera as THREE.PerspectiveCamera).position.y += (camTargetY - (camera as THREE.PerspectiveCamera).position.y) * 0.01;
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#0A0A20" />

      {/* Key light */}
      <pointLight position={[4, 2, 3]} intensity={3} color="#FFFFFF" decay={2} />
      {/* Aurora fill lights */}
      <pointLight position={[-3, -1, 2]} intensity={1.5} color="#3B82F6" decay={2} />
      <pointLight position={[1, 3, -2]} intensity={1} color="#8B5CF6" decay={2} />
      <pointLight position={[-2, -2, -1]} intensity={0.8} color="#14B8A6" decay={2} />

      <group ref={groupRef}>
        {/* Card body */}
        <RoundedBox
          args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
          radius={CARD_RADIUS}
          material={bodyMaterial}
        />

        {/* Aurora accent stripe across the card */}
        <RoundedBox
          args={[CARD_WIDTH * 0.7, CARD_HEIGHT * 0.08, CARD_DEPTH * 1.2]}
          radius={0.03}
          material={stripeMaterial}
          position={[CARD_WIDTH * 0.1, CARD_HEIGHT * 0.2, CARD_DEPTH * 0.55]}
        />

        {/* Second accent stripe */}
        <RoundedBox
          args={[CARD_WIDTH * 0.4, CARD_HEIGHT * 0.05, CARD_DEPTH * 1.2]}
          radius={0.02}
          material={stripeMaterial}
          position={[-CARD_WIDTH * 0.05, -CARD_HEIGHT * 0.15, CARD_DEPTH * 0.55]}
        />

        {/* Chip block */}
        <RoundedBox
          args={[CARD_WIDTH * 0.25, CARD_HEIGHT * 0.2, CARD_DEPTH * 0.8]}
          radius={0.04}
          position={[-CARD_WIDTH * 0.25, CARD_HEIGHT * 0.05, CARD_DEPTH * 0.55]}
        >
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.1}
            emissive="#B8860B"
            emissiveIntensity={0.3}
          />
        </RoundedBox>
      </group>

      {/* Floating particles */}
      {particleData.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el!;
          }}
          position={[p.x, p.y, p.z]}
        >
          <sphereGeometry args={[p.size, 4, 4]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#14B8A6"}
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <fog attach="fog" args={["#050510", 5, 14]} />
    </>
  );
}
