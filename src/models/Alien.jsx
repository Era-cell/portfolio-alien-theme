import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import alien from '../assets/mei.glb';

export const Alien = ({isRotating, ...props}) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(alien);
  const { actions } = useAnimations(animations, ref);
  // console.log(actions['Take 001'].play());
  useEffect(() => {
    if (isRotating) {
      actions['Take 001'].play();
    }else{
      actions['Take 001'].stop();
    }
  }, [actions, isRotating]);

  return <primitive object={scene} ref={ref} {...props}/>;
};
