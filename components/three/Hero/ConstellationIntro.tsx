"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConstellationIntroProps {
  visible?: boolean; // Controls fade in/out
  nodeCount?: number;
  reducedMotion?: boolean;
}

/**
 * Glowing neural network / constellation effect.
 * Randomly positioned glowing nodes with connecting lines.
 * Appears briefly during the dark intro phase.
 */
export function ConstellationIntro({
  visible = true,
  nodeCount = 40,
  reducedMotion = false,
}: ConstellationIntroProps) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodePositions, lineGeometry } = useMemo(() => {
    // Generate random nodes in a 3D volume
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4 - 1
        )
      );
    }

    // Connect nearby nodes
    const lineVerts: number[] = [];
    const MAX_DIST = 2.5;
    const MAX_LINES = 80;

    const shuffled = [...positions].sort(() => Math.random() - 0.5);
    let lineCount = 0;

    for (let i = 0; i < shuffled.length && lineCount < MAX_LINES; i++) {
      for (let j = i + 1; j < shuffled.length && lineCount < MAX_LINES; j++) {
        const dist = shuffled[i].distanceTo(shuffled[j]);
        if (dist < MAX_DIST && Math.random() < 0.4) {
          lineVerts.push(
            shuffled[i].x,
            shuffled[i].y,
            shuffled[i].z,
            shuffled[j].x,
            shuffled[j].y,
            shuffled[j].z
          );
          lineCount++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lineVerts, 3)
    );

    return { nodePositions: positions, lineGeometry: geo };
  }, [nodeCount]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={visible ? 0.15 : 0}
          depthWrite={false}
        />
      </lineSegments>

      {/* Glowing nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#14B8A6"}
            transparent
            opacity={visible ? 0.8 : 0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
