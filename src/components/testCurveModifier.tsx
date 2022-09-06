import React, { useRef, useMemo, Suspense, useEffect } from 'react'
import { BufferGeometry, CatmullRomCurve3, LineBasicMaterial, LineLoop, Vector3 } from 'three'
import { FontLoader, TextGeometry, TextGeometryParameters } from 'three-stdlib'
import { extend, useFrame, useLoader } from '@react-three/fiber'
import { CurveModifier, CurveModifierRef, useTexture } from '@react-three/drei'

extend({ StdText: TextGeometry })

function CurveModifierScene(){
  const curveRef = useRef()
  const geomRef = useRef()
  const font = useLoader(FontLoader, 'font1.json')

  const handlePos = useMemo(
    ()=>
    [
      { x: 10, y: 0, z: -10 },
      { x: 10, y: 0, z: 10 },
      { x: -10, y: 0, z: 10 },
      { x: -10, y: 0, z: -10 },
    ].map((hand)=>new Vector3(...Object.values(hand))),
    []
  )

  const curve = useMemo(()=> new CatmullRomCurve3(handlePos, true, 'centripetal'), [handlePos])

  const line = useMemo(()=>
  new LineLoop(new BufferGeometry().setFromPoints(curve.getPoints(50)), new LineBasicMaterial({color: 0x00ff00})),
  [curve])

  useFrame(()=>{
    if(curveRef.current){
      curveRef.current?.moveAlongCurve(0.001)
    }
  }, [])

  useEffect(()=>{
    // geomRef.current.rotateX(Math.PI)
  }, [])

  function Globe(){
    const [matcap1] = useTexture(['earthmap10k.jpg'])
    return<mesh name='earth'>
    <sphereGeometry args={[1, 30, 30]} />
    {/* <meshNormalMaterial wireframe/> */}
    <meshPhongMaterial map={matcap1} />
    </mesh>
  }

  return (
    <>
      <CurveModifier ref={curveRef} curve={curve}>
        <mesh>
        <Globe ref={geomRef}/>
          {/* <stdText
            attach="geometry"
            args={[
              '医院',
              {
                font,
                size: 2,
                height: 0.05,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.01,
                bevelOffset:0,
                bevelSegments: 5
              },
            ]}
            ref={geomRef}
          />
          <meshNormalMaterial attach="material" /> */}
        </mesh>
      </CurveModifier>
      <primitive object={line} />
    </>
  )
}

export const CurveModifierSt = (()=>(
  <Suspense fallback={null}>
    <CurveModifierScene />
  </Suspense>
))