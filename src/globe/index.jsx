import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, useTexture, Plane } from '@react-three/drei'
import { MeshBasicMaterial, MeshPhongMaterial } from 'three'
import {useRef, useEffect} from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'

extend({ EffectComposer, RenderPass, GlitchPass })

export default function Expenses() {

  function Globe(){
    const [matcap1] = useTexture(['earthmap10k.jpg'])
    return<mesh name='earth'>
    <sphereGeometry args={[1, 30, 30]} />
    {/* <meshNormalMaterial wireframe/> */}
    <meshPhongMaterial map={matcap1} />
    </mesh>
  }

  function Clouds(){
    const [cloudTexture] = useTexture(['fair_clouds_4k.png'])
    return <mesh name='earth'>
    <sphereGeometry args={[1.03, 30, 30]} />
    {/* <meshNormalMaterial wireframe/> */}
    <meshBasicMaterial
      map={cloudTexture}
      transparent={true}
    />
    </mesh>
  }

  function Background(){
    const [bgTexture] = useTexture(['starry_background.jpg'])

    return <Plane
      args={[1, 1]}
      scale={[window.innerWidth * 2, window.innerHeight * 2, 1]}
      position={[0,0,-100]}
    >
      <meshBasicMaterial map={bgTexture} />
    </Plane>
  }

  function CustomiseCamera(){
    return <orthographicCamera
      left={-window.innerWidth}
      right={window.innerWidth}
      top={-window.innerHeight}
      bottom={window.innerHeight}
      near={-10000}
      far={10000}
      position={[0,0,50]}
    />
  }

  function Effect(){
    const { scene, gl, size, camera } = useThree();
    // const composer = useRef()
    // useEffect(() => void composer.current.setSize(size.width, size.height), [size])
    // useFrame(() => composer.current.render(), 1)
    return(
      <effectComposer args={[gl]}>
        <renderPass args={[scene, camera]} />
        <glitchPass renderToScreen />
      </effectComposer>
    )
  }

  return (
    <Canvas style={{height:'50em'}} camera={CustomiseCamera}>
      <Globe />
      <Clouds />
      <ambientLight color="0x111111" />
      <directionalLight color="0xffffff" position={[100, 10, -50]}/>
      {/* <OrbitControls /> */}
      <Effect />
      <Background />
    </Canvas>
  );
}