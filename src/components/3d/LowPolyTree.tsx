import { useRef } from "react";
import * as THREE from "three";

interface LowPolyTreeProps {
  position: [number, number, number];
  scale?: number;
  variant?: "pine" | "round";
}

export function LowPolyTree({ position, scale = 1, variant = "pine" }: LowPolyTreeProps) {
  const groupRef = useRef<THREE.Group>(null);

  if (variant === "pine") {
    return (
      <group ref={groupRef} position={position} scale={scale}>
        {/* Trunk */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.6, 6]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        {/* Bottom layer */}
        <mesh position={[0, 0.8, 0]}>
          <coneGeometry args={[0.6, 0.8, 6]} />
          <meshStandardMaterial color="#2E7D32" flatShading />
        </mesh>
        {/* Middle layer */}
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.45, 0.7, 6]} />
          <meshStandardMaterial color="#388E3C" flatShading />
        </mesh>
        {/* Top layer */}
        <mesh position={[0, 1.7, 0]}>
          <coneGeometry args={[0.3, 0.6, 6]} />
          <meshStandardMaterial color="#43A047" flatShading />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 1.2, 0]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#66BB6A" flatShading />
      </mesh>
    </group>
  );
}
