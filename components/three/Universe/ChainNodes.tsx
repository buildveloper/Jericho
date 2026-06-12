"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { CHAINS } from "@/data/chains";
import type { ChainData } from "@/types";

interface ChainNodesProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

/**
 * Floating chain-representative spheres.
 * Six chains distributed in 3D space. Each has:
 * - A main colored sphere
 * - Glow ring
 * - Label text
 * - Subtle float animation
 * Scroll drives camera approach.
 */
export function ChainNodes({
  scrollProgress = 0,
  reducedMotion = false,
}: ChainNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredChain, setHoveredChain] = useState<string | null>(null);

  // Position chains in a distributed 3D arrangement
  const nodeData = useMemo(() => {
    return CHAINS.map((chain, i) => {
      const angle = (i / CHAINS.length) * Math.PI * 2;
      const radius = 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i % 3) * 1.5 - 1.5;
      return {
        chain,
        position: new THREE.Vector3(x, y, z),
        color: new THREE.Color(chain.color),
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodeData.map(({ chain, position, color }) => (
        <ChainNode
          key={chain.id}
          chain={chain}
          position={position}
          color={color}
          scrollProgress={scrollProgress}
          isHovered={hoveredChain === chain.id}
          onHover={setHoveredChain}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

function ChainNode({
  chain,
  position,
  color,
  scrollProgress,
  isHovered,
  reducedMotion,
}: {
  chain: ChainData;
  position: THREE.Vector3;
  color: THREE.Color;
  scrollProgress: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  reducedMotion: boolean;
}) {
  const nodeRef = useRef<THREE.Group>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);

  const scale = isHovered ? 1.3 : 1;

  useFrame((_, delta) => {
    if (!nodeRef.current || reducedMotion) return;

    // Gentle float
    const time = Date.now() * 0.001;
    const floatY = Math.sin(time * 1.5 + position.x) * 0.3;
    nodeRef.current.position.y = position.y + floatY;

    // Glow ring pulse
    if (glowRingRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.15;
      glowRingRef.current.scale.setScalar(pulse * scale);
      glowRingRef.current.material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isHovered ? 0.5 : 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    }
  });

  return (
    <group
      ref={nodeRef}
      position={position}
      scale={scale}
      onPointerEnter={(e) => {
        e.stopPropagation();
        // onHover handles state
      }}
      onPointerLeave={() => {
        // handled above
      }}
    >
      {/* Main sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.03, 16, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer orbit ring */}
      <mesh rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
        <torusGeometry args={[0.55, 0.015, 8, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.55, 0]}
        fontSize={0.18}
        color={color.getStyle()}
        anchorX="center"
        anchorY="top"
        font="/fonts/Satoshi-Variable.woff2"
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
      >
        {chain.name}
      </Text>
    </group>
  );
}
