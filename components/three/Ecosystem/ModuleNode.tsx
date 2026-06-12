"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ModuleNodeProps {
  id: string;
  title: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  reducedMotion: boolean;
}

export function ModuleNode({
  id,
  title,
  color,
  orbitRadius,
  orbitSpeed,
  angle: baseAngle,
  isHovered,
  isSelected,
  onHover,
  onSelect,
  reducedMotion,
}: ModuleNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const threeColor = new THREE.Color(color);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const time = Date.now() * 0.001;

    // Orbit around center
    const angle = baseAngle + time * orbitSpeed;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const floatY = Math.sin(time * 1.2 + baseAngle) * 0.2;

    groupRef.current.position.set(x, floatY, z);

    // Smooth scale transition
    const targetScale = isSelected ? 1.4 : isHovered ? 1.2 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2.5 + baseAngle) * 0.1;
      glowRef.current.scale.setScalar(pulse * (isHovered ? 1.3 : 1));
    }
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron core */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); onHover(id); }}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : id); }}
      >
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color={threeColor}
          emissive={threeColor}
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={threeColor} transparent opacity={isHovered ? 0.18 : 0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 32]} />
        <meshBasicMaterial color={threeColor} transparent opacity={0.15} depthWrite={false} />
      </mesh>

      {/* Label — appears on hover */}
      {isHovered && (
        <Text
          position={[0, -0.65, 0]}
          fontSize={0.2}
          color={threeColor.getStyle()}
          anchorX="center"
          anchorY="top"
          font="/fonts/Satoshi-Variable.woff2"
        >
          {title}
        </Text>
      )}
    </group>
  );
}
