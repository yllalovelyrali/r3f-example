import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


export default function Expenses() {
  return (
    <Canvas style={{height:'50em'}}>
      <mesh name='earth'>
      <sphereGeometry args={[4, 20, 20]} />
      <meshNormalMaterial wireframe/>
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}