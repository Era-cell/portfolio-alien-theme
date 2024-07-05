import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import ship from '../assets/ships/retro_spaceship_purple.glb';

export const Ship = ({currentAnimation, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(ship);
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    if (currentAnimation === "typing") {
      actions['Armature|Idle'].play();
    }else{
      actions['Armature|Idle'].stop();
    }
  }, [actions, currentAnimation]);

  return <primitive object={scene} ref={ref} {...props} />;
};
