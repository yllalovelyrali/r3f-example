import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { MeshBasicMaterial, MeshPhongMaterial } from 'three'


export default function Expenses() {

  function Globe(){
    const [matcap1] = useTexture(['earthmap10k.jpg'])
    return<mesh name='earth'>
    <sphereGeometry args={[4, 30, 30]} />
    {/* <meshNormalMaterial wireframe/> */}
    <meshPhongMaterial map={matcap1} />
    <sphereGeometry args={[4.01, 20, 20]} />
    </mesh>
  }

  function Clouds(){
    const [cloudTexture] = useTexture(['fair_clouds_4k.png'])
    return <mesh name='earth'>
    <sphereGeometry args={[4.05, 30, 30]} />
    {/* <meshNormalMaterial wireframe/> */}
    <meshBasicMaterial
      map={cloudTexture}
      transparent={true}
    />
    </mesh>
  }

  return (
    <Canvas style={{height:'50em'}}>
      <Globe />
      <Clouds />
      <ambientLight color="0x111111" />
      <OrbitControls />
    </Canvas>
  );
}