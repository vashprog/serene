import { useRef, useMemo } from "react";
import * as THREE from "three";

export function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);


  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(25, 32);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = Math.sin(x * 0.3) * 0.1 + Math.cos(y * 0.3) * 0.1;
      positions.setZ(i, z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* Main ground */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial 
          color="#5B8C5A" 
          flatShading 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Path/road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4, 4.8, 32]} />
        <meshStandardMaterial color="#D4C4A8" flatShading />
      </mesh>

      {/* Inner grass area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[3.8, 24]} />
        <meshStandardMaterial color="#7CB342" flatShading />
      </mesh>

      {/* Decorative patches */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.015, 1]}>
        <circleGeometry args={[0.5, 8]} />
        <meshStandardMaterial color="#8BC34A" flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.015, -1]}>
        <circleGeometry args={[0.4, 8]} />
        <meshStandardMaterial color="#9CCC65" flatShading />
      </mesh>

      {/* Small flowers/details */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 1.5 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0.05, z]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial 
              color={["#FFE082", "#F8BBD9", "#B2EBF2", "#FFFFFF"][i % 4]} 
              flatShading 
            />
          </mesh>
        );
      })}
    </group>
  );
}
