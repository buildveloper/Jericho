"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CHAINS } from "@/data/chains";

interface BlockchainRingsProps {
  visible?: boolean;
  radius?: number;
  reducedMotion?: boolean;
}

/**
 * Orbiting chain nodes with animated connection lines.
 * 6 chains orbiting the wallet in concentric rings.
 */
export function BlockchainRings({
  visible = true,
  radius = 3.5,
  reducedMotion = false,
}: BlockchainRingsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodeCountPerChain = 8;

  // Generate ring positions for each chain
  const chainRings = useMemo(() => {
    return CHAINS.map((chain, chainIdx) => {
      const ringRadius = radius + chainIdx * 0.4;
      const tiltX = (chainIdx - 2.5) * 0.3;
      const tiltZ = chainIdx * Math.PI * 0.3;
      const nodes: THREE.Vector3[] = [];

      for (let i = 0; i < nodeCountPerChain; i++) {
        const angle = (i / nodeCountPerChain) * Math.PI * 2;
        const x = Math.cos(angle) * ringRadius;
        const z = Math.sin(angle) * ringRadius;
        const y = 0;

        // Apply ring tilt
        const rotated = new THREE.Vector3(x, y, z);
        rotated.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX);
        rotated.applyAxisAngle(new THREE.Vector3(0, 0, 1), tiltZ);
        nodes.push(rotated);
      }

      return {
        chain,
        nodes,
        ringRadius,
        tiltX,
        tiltZ,
        color: new THREE.Color(chain.color),
      };
    });
  }, [radius]);

  // Build lines connecting adjacent nodes within each chain
  const lineGeometries = useMemo(() => {
    return chainRings.map((ring) => {
      const verts: number[] = [];
      for (let i = 0; i < ring.nodes.length; i++) {
        const a = ring.nodes[i];
        const b = ring.nodes[(i + 1) % ring.nodes.length];
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(verts, 3)
      );
      return geo;
    });
  }, [chainRings]);

  // Node materials
  const nodeMaterials = useMemo(() => {
    return chainRings.map(
      (ring) =>
        new THREE.MeshBasicMaterial({
          color: ring.color,
          transparent: true,
          opacity: visible ? 0.9 : 0,
          depthWrite: false,
        })
    );
  }, [chainRings, visible]);

  // Pulsing and rotating
  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x += delta * 0.03;
  });

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.06, 8, 8), []);

  return (
    <group ref={groupRef}>
      {chainRings.map((ring, ringIdx) => (
        <group key={ring.chain.id}>
          {/* Connection lines */}
          <lineSegments geometry={lineGeometries[ringIdx]}>
            <lineBasicMaterial
              color={ring.color}
              transparent
              opacity={visible ? 0.3 : 0}
              depthWrite={false}
            />
          </lineSegments>

          {/* Nodes */}
          {ring.nodes.map((pos, nodeIdx) => (
            <mesh
              key={nodeIdx}
              position={pos}
              geometry={nodeGeo}
              material={nodeMaterials[ringIdx]}
            />
          ))}

          {/* Pulsing ring highlights */}
          {ring.nodes.map((pos, nodeIdx) => {
            const pulsePhase = (nodeIdx / nodeCountPerChain) * Math.PI * 2;
            return (
              <mesh key={`glow-${nodeIdx}`} position={pos}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial
                  color={ring.color}
                  transparent
                  opacity={visible ? 0.25 : 0}
                  depthWrite={false}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
