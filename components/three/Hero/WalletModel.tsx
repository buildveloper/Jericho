"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { WALLET_DIMENSIONS } from "@/lib/constants";

interface WalletModelProps {
  assemblyProgress?: number; // 0 = particles, 1 = fully formed
  wireframe?: boolean;
  isHovered?: boolean;
  reducedMotion?: boolean;
}

export function WalletModel({
  assemblyProgress = 1,
  wireframe = false,
  isHovered = false,
  reducedMotion = false,
}: WalletModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const { width, height, depth, cornerRadius } = WALLET_DIMENSIONS;

  // PBR material with subtle iridescence
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.35,
        roughness: 0.2,
        clearcoat: 0.15,
        clearcoatRoughness: 0.3,
        reflectivity: 0.5,
        envMapIntensity: 0.4,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3B82F6"),
        metalness: 0.5,
        roughness: 0.15,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        emissive: new THREE.Color("#3B82F6"),
        emissiveIntensity: 0.1,
      }),
    []
  );

  // Gentle float + slow rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    // Scale based on assembly progress
    if (materialRef.current) {
      const scale = 0.3 + assemblyProgress * 0.7;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main wallet body */}
      <RoundedBox
        args={[width, height * 0.7, depth]}
        radius={cornerRadius}
        material={bodyMaterial}
        position={[0, 0, 0]}
      >
        {wireframe && (
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.15}
          />
        )}
      </RoundedBox>

      {/* Top wallet fold/flap */}
      <RoundedBox
        args={[width * 0.85, height * 0.25, depth * 0.8]}
        radius={cornerRadius * 0.8}
        material={bodyMaterial}
        position={[0, height * 0.22, depth * 0.15]}
        rotation={[-0.05, 0, 0]}
      />

      {/* Front accent stripe */}
      <RoundedBox
        args={[width * 0.6, height * 0.08, depth * 1.1]}
        radius={0.04}
        material={accentMaterial}
        position={[0, -height * 0.15, depth * 0.55]}
      />

      {/* Side bezel details */}
      <Cylinder
        args={[depth * 0.4, depth * 0.4, height * 0.68, 16]}
        material={accentMaterial}
        position={[width * 0.48, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Cylinder
        args={[depth * 0.4, depth * 0.4, height * 0.68, 16]}
        material={accentMaterial}
        position={[-width * 0.48, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </group>
  );
}
