import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import skyScene from '../assets/space_race_vr.glb'
import { useFrame } from "@react-three/fiber";

export const Sky = ({isRotating}) => {
  const skyRef = useRef();
  const sky = useGLTF(skyScene);

  useFrame((_, delta)=>{
    if(isRotating){
      skyRef.current.rotation.y += 0.15 * delta;
    }
  })

  return <mesh ref={skyRef} renderOrder={-1}>
    <primitive object={sky.scene} />
  </mesh>;
};
