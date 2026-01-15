import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Cloud, Environment } from "@react-three/drei";
import * as THREE from "three";
import { LowPolyTree } from "./LowPolyTree";
import { Cyclist } from "./Cyclist";
import { DestinationMarker } from "./DestinationMarker";
import { Mountains } from "./Mountains";
import { Ground } from "./Ground";
import { UserGoal, goalOptions } from "@/lib/personalization";

interface PeacefulTownSceneProps {
  selectedGoal: UserGoal | null;
  onGoalSelect: (goal: UserGoal) => void;
}

const destinationPositions: Record<UserGoal, [number, number, number]> = {
  calm: [-6, 0.1, -6],
  focus: [6, 0.1, -6],
  grow: [-6, 0.1, 6],
  connect: [6, 0.1, 6],
};


function CameraController({ targetPosition }: { targetPosition: [number, number, number] | null }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (targetPosition) {
      targetRef.current.lerp(
        new THREE.Vector3(targetPosition[0] * 0.3, 2, targetPosition[2] * 0.3),
        0.02
      );
    } else {
      targetRef.current.lerp(new THREE.Vector3(0, 0, 0), 0.02);
    }
    camera.lookAt(targetRef.current);
  });

  return null;
}


function AnimatedClouds() {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    }
  });

  return (
    <group ref={cloudsRef}>
      <Cloud position={[-8, 8, -10]} speed={0.2} opacity={0.7} />
      <Cloud position={[10, 9, -8]} speed={0.1} opacity={0.5} />
      <Cloud position={[0, 10, -12]} speed={0.15} opacity={0.6} />
      <Cloud position={[-12, 7, -6]} speed={0.1} opacity={0.4} />
      <Cloud position={[8, 8, -5]} speed={0.2} opacity={0.5} />
    </group>
  );
}


function MovingCyclist({ targetGoal }: { targetGoal: UserGoal | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(4.4, 0.05, 0));
  const targetPos = useRef(new THREE.Vector3(4.4, 0.05, 0));
  const isMovingToTarget = useRef(false);
  const circleAngle = useRef(0);

  
  useMemo(() => {
    if (targetGoal) {
      const dest = destinationPositions[targetGoal];
      const direction = new THREE.Vector3(dest[0], 0.05, dest[2]).normalize();
      targetPos.current.set(dest[0] - direction.x * 1.5, 0.05, dest[2] - direction.z * 1.5);
      isMovingToTarget.current = true;
    } else {
      isMovingToTarget.current = false;
    }
  }, [targetGoal]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isMovingToTarget.current && targetGoal) {
        const distance = currentPos.current.distanceTo(targetPos.current);
        
        if (distance > 0.1) {
          const direction = new THREE.Vector3()
            .subVectors(targetPos.current, currentPos.current)
            .normalize();
          

          const speed = 3;
          currentPos.current.add(direction.multiplyScalar(delta * speed));
          

          groupRef.current.position.copy(currentPos.current);
          

          const angle = Math.atan2(direction.x, direction.z);
          groupRef.current.rotation.y = angle;
        } else {

          const dest = destinationPositions[targetGoal];
          const lookDir = new THREE.Vector3(dest[0], 0, dest[2]).sub(currentPos.current);
          groupRef.current.rotation.y = Math.atan2(lookDir.x, lookDir.z);
        }
      } else {

        circleAngle.current += delta * 0.3;
        const radius = 4.4;
        currentPos.current.x = Math.cos(circleAngle.current) * radius;
        currentPos.current.z = Math.sin(circleAngle.current) * radius;
        currentPos.current.y = 0.05;
        
        groupRef.current.position.copy(currentPos.current);
        groupRef.current.rotation.y = -circleAngle.current + Math.PI / 2;
      }
    }
  });

  return (
    <group ref={groupRef} position={[4.4, 0.05, 0]}>
      <Cyclist position={[0, 0, 0]} />
    </group>
  );
}


function SceneContent({ selectedGoal, onGoalSelect }: PeacefulTownSceneProps) {
  const destinationColors: Record<UserGoal, string> = {
    calm: "#87CEEB",
    focus: "#FFD700",
    grow: "#90EE90",
    connect: "#FFB6C1",
  };

  
  const trees = useMemo(() => {
    const treeList = [];
    const treeCount = 40;

    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < treeCount; i++) {
      const angle = (i / treeCount) * Math.PI * 2 + seededRandom(i * 1.1) * 0.5;
      const radius = 10 + seededRandom(i * 2.2) * 12;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.6 + seededRandom(i * 3.3) * 0.8;
      const variant = seededRandom(i * 4.4) > 0.3 ? "pine" : "round";
      treeList.push({ x, z, scale, variant, key: i });
    }
    return treeList;
  }, []);

  const innerTrees = useMemo(() => [
    { x: 1.5, z: 1.5, scale: 0.5, variant: "pine" as const },
    { x: -1, z: 2, scale: 0.4, variant: "round" as const },
    { x: 2, z: -1, scale: 0.45, variant: "pine" as const },
    { x: -2, z: -0.5, scale: 0.5, variant: "round" as const },
  ], []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#FFE4B5" />

      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
        rayleigh={0.5}
      />

      {/* Environment for reflections */}
      <Environment preset="sunset" />

      {/* Clouds */}
      <AnimatedClouds />

      {/* Camera controller */}
      <CameraController
        targetPosition={selectedGoal ? destinationPositions[selectedGoal] : null}
      />

      {/* Ground and terrain */}
      <Ground />

      {/* Mountains in background */}
      <Mountains />

      {/* Outer forest trees */}
      {trees.map((tree) => (
        <LowPolyTree
          key={tree.key}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
          variant={tree.variant}
        />
      ))}

      {/* Inner decorative trees */}
      {innerTrees.map((tree, i) => (
        <LowPolyTree
          key={`inner-${i}`}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
          variant={tree.variant}
        />
      ))}

      {/* Destination markers */}
      {goalOptions.map((option) => (
        <DestinationMarker
          key={option.value}
          position={destinationPositions[option.value]}
          goal={option.value}
          label={option.label}
          icon={option.icon}
          isSelected={selectedGoal === option.value}
          onSelect={onGoalSelect}
          color={destinationColors[option.value]}
        />
      ))}

      {/* Animated cyclist */}
      <MovingCyclist targetGoal={selectedGoal} />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}


function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#5B8C5A" wireframe />
    </mesh>
  );
}

export function PeacefulTownScene({ selectedGoal, onGoalSelect }: PeacefulTownSceneProps) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{
          position: [12, 10, 12],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneContent selectedGoal={selectedGoal} onGoalSelect={onGoalSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
}
