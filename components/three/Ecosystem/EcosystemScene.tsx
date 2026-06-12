"use client";

import { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ModuleNode } from "./ModuleNode";
import { ConnectionLines } from "./ConnectionLines";
import { ECOSYSTEM_MODULES } from "@/data/modules";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EcosystemSceneProps {
  selectedModule: string | null;
  onSelectModule: (id: string | null) => void;
}

/**
 * Interactive 3D ecosystem ring.
 * 5 modules orbit the center. Hover = scale up + label. Click = select (detail panel in parent).
 */
export function EcosystemScene({ selectedModule, onSelectModule }: EcosystemSceneProps) {
  const reducedMotion = useReducedMotion();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    // Gentle camera orbit
    if (reducedMotion) return;
    const time = Date.now() * 0.0003;
    const radius = 9;
    const x = Math.sin(time) * radius;
    const z = Math.cos(time) * radius;
    camera.position.lerp(new THREE.Vector3(x * 0.3, 1.5, z * 0.3 + 7), 0.02);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.25} color="#080820" />
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#3B82F6" decay={2} />
      <pointLight position={[4, -1, 3]} intensity={1} color="#8B5CF6" decay={2} />
      <pointLight position={[-3, -1, -3]} intensity={0.8} color="#14B8A6" decay={2} />

      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Connection lines between modules */}
      <ConnectionLines visible reducedMotion={reducedMotion} />

      {/* Module nodes */}
      {ECOSYSTEM_MODULES.map((mod, i) => (
        <ModuleNode
          key={mod.id}
          id={mod.id}
          title={mod.title}
          color={mod.color}
          orbitRadius={mod.orbitRadius}
          orbitSpeed={mod.orbitSpeed}
          angle={(i / ECOSYSTEM_MODULES.length) * Math.PI * 2}
          isHovered={hoveredModule === mod.id}
          isSelected={selectedModule === mod.id}
          onHover={setHoveredModule}
          onSelect={onSelectModule}
          reducedMotion={reducedMotion}
        />
      ))}
    </>
  );
}
