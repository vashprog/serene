interface MountainsProps {
  position?: [number, number, number];
}

export function Mountains({ position = [0, 0, -15] }: MountainsProps) {
  return (
    <group position={position}>
      {/* Main large mountain */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[8, 6, 6]} />
        <meshStandardMaterial color="#6B7B8C" flatShading />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 4.8, 0]}>
        <coneGeometry args={[2.5, 1.5, 6]} />
        <meshStandardMaterial color="#FFFFFF" flatShading />
      </mesh>

      {/* Left mountain */}
      <mesh position={[-10, 2, 2]}>
        <coneGeometry args={[6, 5, 6]} />
        <meshStandardMaterial color="#5D6D7E" flatShading />
      </mesh>
      <mesh position={[-10, 4, 2]}>
        <coneGeometry args={[2, 1.2, 6]} />
        <meshStandardMaterial color="#ECF0F1" flatShading />
      </mesh>

      {/* Right mountain */}
      <mesh position={[12, 1.8, 3]}>
        <coneGeometry args={[5, 4.5, 6]} />
        <meshStandardMaterial color="#7F8C8D" flatShading />
      </mesh>
      <mesh position={[12, 3.5, 3]}>
        <coneGeometry args={[1.8, 1, 6]} />
        <meshStandardMaterial color="#F8F9FA" flatShading />
      </mesh>

      {/* Far background mountains */}
      <mesh position={[-5, 1.5, 5]}>
        <coneGeometry args={[4, 3.5, 6]} />
        <meshStandardMaterial color="#8E99A4" flatShading />
      </mesh>
      <mesh position={[6, 1.3, 6]}>
        <coneGeometry args={[3.5, 3, 6]} />
        <meshStandardMaterial color="#95A5A6" flatShading />
      </mesh>
    </group>
  );
}
