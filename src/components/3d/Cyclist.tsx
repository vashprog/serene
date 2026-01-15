import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyclistProps {
  position: [number, number, number];
  rotation?: number;
}

export function Cyclist({ position, rotation = 0 }: CyclistProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelFrontRef = useRef<THREE.Mesh>(null);
  const wheelBackRef = useRef<THREE.Mesh>(null);
  const legsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelFrontRef.current) {
      wheelFrontRef.current.rotation.x += delta * 3;
    }
    if (wheelBackRef.current) {
      wheelBackRef.current.rotation.x += delta * 3;
    }
    if (legsRef.current) {
      legsRef.current.rotation.z = Math.sin(Date.now() * 0.005) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Bike Frame */}
      <group>
        {/* Back wheel */}
        <mesh ref={wheelBackRef} position={[-0.3, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Front wheel */}
        <mesh ref={wheelFrontRef} position={[0.3, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.2, 0.03, 8, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Frame - main bar */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.04]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
        {/* Seat post */}
        <mesh position={[-0.1, 0.5, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.04, 0.25, 0.04]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
        {/* Handle bar post */}
        <mesh position={[0.25, 0.45, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>
        {/* Handle bars */}
        <mesh position={[0.3, 0.55, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.25]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Seat */}
        <mesh position={[-0.15, 0.6, 0]}>
          <boxGeometry args={[0.15, 0.04, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>

      {/* Rider */}
      <group position={[0, 0.6, 0]}>
        {/* Body */}
        <mesh position={[0, 0.35, 0]}>
          <capsuleGeometry args={[0.12, 0.25, 4, 8]} />
          <meshStandardMaterial color="#3498DB" flatShading />
        </mesh>
        {/* Head */}
        <mesh position={[0.1, 0.65, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#FDBF60" flatShading />
        </mesh>
        {/* Hair/Helmet */}
        <mesh position={[0.1, 0.72, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#E74C3C" flatShading />
        </mesh>
        {/* Legs group for animation */}
        <group ref={legsRef}>
          {/* Left leg */}
          <mesh position={[-0.1, 0, 0.08]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
            <meshStandardMaterial color="#2C3E50" flatShading />
          </mesh>
          {/* Right leg */}
          <mesh position={[-0.1, 0, -0.08]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
            <meshStandardMaterial color="#2C3E50" flatShading />
          </mesh>
        </group>
        {/* Arms */}
        <mesh position={[0.15, 0.35, 0.12]} rotation={[0, 0, 0.8]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial color="#3498DB" flatShading />
        </mesh>
        <mesh position={[0.15, 0.35, -0.12]} rotation={[0, 0, 0.8]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial color="#3498DB" flatShading />
        </mesh>
      </group>
    </group>
  );
}
