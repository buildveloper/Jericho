"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConnectionLinesProps {
  visible?: boolean;
  reducedMotion?: boolean;
}

/**
 * Dashed animated lines connecting all 5 ecosystem modules.
 * Pulsing energy flows between them.
 */
export function ConnectionLines({ visible = true, reducedMotion = false }: ConnectionLinesProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Precompute connection vertex pairs (all-to-all = 10 connections)
  const connections = useMemo(() => {
    const verts: number[] = [];
    const r = 4.5;
    const count = 5;

    // Module positions at a snapshot
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        verts.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    }

    return verts;
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(connections, 3));
    return geo;
  }, [connections]);

  // Dashed line material
  const dashMaterial = useMemo(() => {
    return new THREE.LineDashedMaterial({
      color: "#FFFFFF",
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
      dashSize: 0.5,
      gapSize: 0.3,
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  // Need to compute line distances for dashed lines
  useMemo(() => {
    lineGeo.computeBoundingSphere();
    const line = new THREE.Line(lineGeo, dashMaterial);
    line.computeLineDistances();
    lineGeo.dispose();
    dashMaterial.dispose();
  }, [lineGeo, dashMaterial]);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={visible ? 0.12 : 0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Pulsing dot at the center */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
