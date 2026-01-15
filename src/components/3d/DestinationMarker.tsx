import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { UserGoal } from "@/lib/personalization";

interface DestinationMarkerProps {
  position: [number, number, number];
  goal: UserGoal;
  label: string;
  icon: string;
  isSelected: boolean;
  onSelect: (goal: UserGoal) => void;
  color: string;
}

export function DestinationMarker({
  position,
  goal,
  label,
  isSelected,
  onSelect,
  color,
}: DestinationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (groupRef.current) {

      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + floatOffset.current) * 0.1;

      groupRef.current.rotation.y += 0.005;
    }
  });


  const renderBuilding = () => {
    switch (goal) {
      case "calm":
        // Peaceful cottage/spa
        return (
          <group>
            {/* Main building */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.8, 0.6, 0.6]} />
              <meshStandardMaterial color="#E8D5B7" flatShading />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 0.85, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.7, 0.5, 4]} />
              <meshStandardMaterial color="#8B4513" flatShading />
            </mesh>
            {/* Hot spring */}
            <mesh position={[0.6, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.3, 8]} />
              <meshStandardMaterial color="#87CEEB" flatShading />
            </mesh>
          </group>
        );
      case "focus":
        // Lighthouse/tower
        return (
          <group>
            {/* Tower base */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 1, 8]} />
              <meshStandardMaterial color="#F5F5DC" flatShading />
            </mesh>
            {/* Top section */}
            <mesh position={[0, 1.1, 0]}>
              <cylinderGeometry args={[0.3, 0.25, 0.3, 8]} />
              <meshStandardMaterial color="#2C3E50" flatShading />
            </mesh>
            {/* Light */}
            <mesh position={[0, 1.35, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      case "grow":
        // Greenhouse/garden
        return (
          <group>
            {/* Glass house frame */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.9, 0.6, 0.6]} />
              <meshStandardMaterial color="#90EE90" transparent opacity={0.6} flatShading />
            </mesh>
            {/* Frame lines */}
            <mesh position={[0, 0.75, 0]}>
              <boxGeometry args={[0.95, 0.05, 0.65]} />
              <meshStandardMaterial color="#2E7D32" />
            </mesh>
            {/* Small plants inside */}
            <mesh position={[-0.2, 0.2, 0]}>
              <coneGeometry args={[0.1, 0.25, 6]} />
              <meshStandardMaterial color="#228B22" flatShading />
            </mesh>
            <mesh position={[0.2, 0.25, 0]}>
              <coneGeometry args={[0.12, 0.3, 6]} />
              <meshStandardMaterial color="#32CD32" flatShading />
            </mesh>
          </group>
        );
      case "connect":
        // Community center / cafe
        return (
          <group>
            {/* Main building */}
            <mesh position={[0, 0.35, 0]}>
              <boxGeometry args={[1, 0.5, 0.7]} />
              <meshStandardMaterial color="#DEB887" flatShading />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[1.1, 0.1, 0.8]} />
              <meshStandardMaterial color="#CD853F" flatShading />
            </mesh>
            {/* Tables outside */}
            <mesh position={[0.6, 0.15, 0.5]}>
              <cylinderGeometry args={[0.15, 0.15, 0.05, 8]} />
              <meshStandardMaterial color="#8B4513" flatShading />
            </mesh>
            {/* Umbrella */}
            <mesh position={[0.6, 0.4, 0.5]}>
              <coneGeometry args={[0.25, 0.15, 8]} />
              <meshStandardMaterial color="#E74C3C" flatShading />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={() => onSelect(goal)}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Platform */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.15, 12]} />
        <meshStandardMaterial
          color={isSelected ? color : hovered ? "#A8E6CF" : "#8FBC8F"}
          flatShading
        />
      </mesh>

      {/* Building */}
      {renderBuilding()}

      {/* Selection glow */}
      {(isSelected || hovered) && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label */}
      <Html
        position={[0, 1.8, 0]}
        center
        style={{
          transition: "all 0.3s ease",
          opacity: hovered || isSelected ? 1 : 0.8,
          transform: `scale(${hovered || isSelected ? 1.1 : 1})`,
          pointerEvents: "auto",
        }}
      >
        <div
          className={`
            px-2 py-1 sm:px-4 sm:py-2 rounded-full whitespace-nowrap font-medium text-xs sm:text-sm
            ${isSelected 
              ? "bg-primary text-primary-foreground shadow-lg" 
              : "bg-white/90 text-gray-800 shadow-md"
            }
            backdrop-blur-sm transition-all cursor-pointer
          `}
          onClick={() => onSelect(goal)}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
