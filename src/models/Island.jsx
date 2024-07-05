import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

import islandScene from "../assets/alien_world_explorer.glb";


export const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { nodes, materials } = useGLTF(islandScene);
  const SoftBrown = new THREE.MeshStandardMaterial({ color: '#8B4513' });

  const { gl, viewport } = useThree();

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // Calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      if (islandRef.current) {
        islandRef.current.rotation.y += 0.005 * Math.PI;
      }
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      if (islandRef.current) {
        islandRef.current.rotation.y -= 0.005 * Math.PI;
      }
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    if (islandRef.current) {
      // If not rotating, apply damping to slow down the rotation (smoothly)
      if (!isRotating) {
        // Apply damping factor
        rotationSpeed.current *= dampingFactor;

        // Stop rotation when speed is very small
        if (Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }

        islandRef.current.rotation.y += rotationSpeed.current;
      } else {
        // When rotating, determine the current stage based on island's orientation
        const rotation = islandRef.current.rotation.y;

        // Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI]
        const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Set the current stage based on the island's orientation
        switch (true) {
          case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
            setCurrentStage(4);
            break;
          case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
            setCurrentStage(3);
            break;
          case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
            setCurrentStage(2);
            break;
          case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
            setCurrentStage(1);
            break;
          default:
            setCurrentStage(null);
        }
      }
    }
  });

  // Adjust the positions of elements manually if necessary
  return (
    <a.group renderOrder={1} ref={islandRef} {...props} dispose={null}>
      <group position={[-2.609, -0.57, -1.764]} rotation={[0.133, 0.239, -0.25]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface198_EyePlants1_0.geometry}
          material={materials.EyePlants1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface199_EyePlants1_0.geometry}
          material={materials.EyePlants1}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PeacockPlant1_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Peacock1_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PeacockPlant4_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface105_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface107_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
        position={[3.649, -0.352, -1.033]}
        scale={1.549}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface108_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
        position={[3.764, -0.188, -0.876]}
        scale={1.549}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface256_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface197_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface128_BigMushrooms_0.geometry}
        material={materials.BigMushrooms}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface129_BigMushrooms_0.geometry}
        material={materials.BigMushrooms}
        position={[-3.666, 0, 7.341]}
        rotation={[0, 1.449, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface151_Rocks_0.geometry}
        material={materials.Rocks}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface154_Rocks_0.geometry}
        material={materials.Rocks}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface155_Rocks_0.geometry}
        material={materials.Rocks}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface156_Rocks_0.geometry}
        material={materials.Rocks}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface160_Rocks_0.geometry}
        material={materials.Rocks}
        position={[-3.469, 0, -2.562]}
        rotation={[0, 0.585, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface334_Rocks_0.geometry}
        material={materials.Rocks}
        position={[0.731, 0, 8.634]}
        rotation={[0, -1.416, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface162_ground1_0.geometry}
        material={materials.ground1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pealeaf3_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pSphere13_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
        position={[-1.404, 2.094, -1.844]}
        scale={0.703}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pealeaf1_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pealeaf5_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tentacle_LP1_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pealeaf4_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pealeaf2_LP_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AlienRock1_LP_Rocks2_0.geometry}
        material={materials.Rocks2}
        position={[-0.626, -0.247, 0.026]}
        rotation={[-Math.PI, 1.471, -Math.PI]}
        scale={0.991}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AlienRock2__LP_Rocks2_0.geometry}
        material={materials.Rocks2}
        position={[0, -0.076, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mushy1_LP_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mushy2_LP_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Biig_LP_BigMushrooms_0.geometry}
        material={materials.BigMushrooms}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rocks_LP_Rocks_0.geometry}
        material={materials.Rocks}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AlienRock2__LP1_Rocks2_0.geometry}
        material={materials.Rocks2}
        position={[-1.621, 0.268, 0.941]}
        rotation={[0, 0.313, -0.079]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mushy2_LP1_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
        position={[-2.169, 0.526, 0.985]}
        rotation={[-0.064, -0.325, 0.228]}
        scale={0.622}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mushy2_LP2_Mushrooms1_0.geometry}
        material={materials.Mushrooms1}
        position={[-0.593, 0.577, 2.416]}
        rotation={[-0.137, 0.404, -0.174]}
        scale={0.885}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface290_grass_0.geometry}
        material={materials.grass}
        position={[-12.622, 0.055, -3.055]}
        rotation={[0.075, 0.967, -0.075]}
        scale={[-1.376, 1.376, 1.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface293_grass_0.geometry}
        material={materials.grass}
        position={[2.509, -0.327, -1.04]}
        rotation={[0.013, -0.917, -0.034]}
        scale={[-1.376, 1.376, 1.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface295_grass_0.geometry}
        material={materials.grass}
        position={[-4.593, -0.602, 18.474]}
        rotation={[-3.107, -0.183, -3.11]}
        scale={2.061}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface296_grass_0.geometry}
        material={materials.grass}
        position={[5.192, -0.244, 4.643]}
        rotation={[0, -1.569, 0]}
        scale={1.487}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface306_grass_0.geometry}
        material={materials.grass}
        position={[-3.488, -0.122, 2.715]}
        rotation={[0, 1.386, 0]}
        scale={1.021}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface307_grass_0.geometry}
        material={materials.grass}
        position={[1.317, -0.362, -1.379]}
        rotation={[-0.045, 0.489, 0.047]}
        scale={0.939}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface308_grass_0.geometry}
        material={materials.grass}
        position={[4.521, 0.5, 0.238]}
        rotation={[0.08, 0.489, 0.047]}
        scale={0.675}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface309_grass_0.geometry}
        material={materials.grass}
        position={[1.048, -0.842, 12.297]}
        rotation={[-3.03, 0.45, 3.095]}
        scale={1.243}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface310_grass_0.geometry}
        material={materials.grass}
        position={[-2.89, -0.5, 1.514]}
        rotation={[-0.199, 1.314, 0.178]}
        scale={1.349}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface311_grass_0.geometry}
        material={materials.grass}
        position={[7.29, 0.015, 2.568]}
        rotation={[0, -0.516, 0]}
        scale={[-0.421, 0.421, 0.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface312_grass_0.geometry}
        material={materials.grass}
        position={[2.313, -0.277, 4.693]}
        rotation={[-2.01, 1.457, 1.984]}
        scale={[-0.421, 0.421, 0.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface313_grass_0.geometry}
        material={materials.grass}
        position={[-9.735, -0.333, 1.43]}
        rotation={[-0.071, 1.222, 0.081]}
        scale={[-0.851, 0.851, 0.851]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface314_grass_0.geometry}
        material={materials.grass}
        position={[-8.643, -0.204, 3.317]}
        rotation={[-0.171, 1.428, 0.184]}
        scale={[-0.618, 0.618, 0.618]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface315_grass_0.geometry}
        material={materials.grass}
        position={[-7.351, -0.121, 3.832]}
        rotation={[-0.171, 1.428, 0.184]}
        scale={[-0.43, 0.43, 0.43]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface317_grass_0.geometry}
        material={materials.grass}
        position={[7.802, -0.88, -6.106]}
        rotation={[-0.318, -1.436, -0.295]}
        scale={[-1.691, 1.691, 1.691]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface318_grass_0.geometry}
        material={materials.grass}
        position={[-4.725, -0.896, -18.085]}
        rotation={[-0.043, 0.202, 0.029]}
        scale={[-1.691, 1.691, 1.691]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface319_grass_0.geometry}
        material={materials.grass}
        position={[-2.455, 0.24, 0.084]}
        rotation={[3.074, 1.058, -3.117]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface320_grass_0.geometry}
        material={materials.grass}
        position={[-1.452, 0.256, 2.267]}
        rotation={[3.102, 0.6, 3.13]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface321_grass_0.geometry}
        material={materials.grass}
        position={[-3.599, -0.05, 4.329]}
        rotation={[0, 1.547, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface322_grass_0.geometry}
        material={materials.grass}
        position={[-1.092, 0.045, 12.105]}
        rotation={[3.115, 0.48, 3.024]}
        scale={1.121}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface326_grass_0.geometry}
        material={materials.grass}
        position={[-1.055, 0.066, 2.198]}
        rotation={[-Math.PI, 0.281, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface327_grass_0.geometry}
        material={materials.grass}
        position={[-7.36, 0.081, 6.091]}
        rotation={[-Math.PI, 0.149, -Math.PI]}
        scale={1.623}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface328_grass_0.geometry}
        material={materials.grass}
        position={[-2.491, 2.006, 10.834]}
        rotation={[3, 0.193, -3.06]}
        scale={2.262}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface329_grass_0.geometry}
        material={materials.grass}
        position={[-7.341, 0.547, -8.254]}
        rotation={[0.105, 0.68, -0.043]}
        scale={[-0.727, 0.727, 0.727]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface330_grass_0.geometry}
        material={materials.grass}
        position={[-2.574, 0.329, -4.364]}
        rotation={[0.082, -0.129, 0.034]}
        scale={[-0.576, 0.576, 0.576]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface331_grass_0.geometry}
        material={materials.grass}
        position={[4.816, 0.329, -1.112]}
        rotation={[0.082, -0.129, 0.034]}
        scale={[-0.576, 0.576, 0.576]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface332_grass_0.geometry}
        material={materials.grass}
        position={[7.848, -0.361, -4.085]}
        rotation={[-0.03, -0.648, -0.003]}
        scale={[-0.851, 0.851, 0.851]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface333_grass_0.geometry}
        material={materials.grass}
        position={[-1.528, -1.056, 1.494]}
        rotation={[-3.011, -0.224, -3.108]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface347_grass_0.geometry}
        material={materials.grass}
        position={[-7.8, -0.057, -1.157]}
        rotation={[0.025, 1.002, 0.062]}
        scale={[-0.576, 0.576, 0.576]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface348_grass_0.geometry}
        material={materials.grass}
        position={[-4.328, 0.101, 1.071]}
        rotation={[0.043, 0.8, 0.048]}
        scale={[-0.576, 0.576, 0.576]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder34_DroneBase_0.geometry}
        material={materials.DroneBase}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder34_mesh1_0.geometry}
        material={materials.mesh1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder34_scout_dronelambert3_0.geometry}
        material={materials.scout_dronelambert3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder34_Light_0.geometry}
        material={materials.Light}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface204_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface207_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface218_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface219_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface220_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface193_EyePlants1_0.geometry}
        material={materials.EyePlants1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface255_LeafPlants_0.geometry}
        material={materials.LeafPlants}
        position={[0.55, 0, 1.113]}
        rotation={[0, 0.196, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface265_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
        position={[-0.931, 0.536, -0.719]}
        scale={0.802}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Fmid1_LP_LeafPlants_0.geometry}
        material={materials.LeafPlants}
        position={[6.904, 0.411, -3.994]}
        rotation={[0.006, -0.316, 0.043]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface280_LeafPlants_0.geometry}
        material={materials.LeafPlants}
        position={[0.794, 0.085, 1.939]}
        rotation={[-3.135, -0.746, -3.135]}
        scale={0.916}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface264_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
        position={[-0.044, 1.115, -1.806]}
        rotation={[0, 0.239, 0]}
        scale={0.734}
      />
      {/* Grounddd*/}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.groundBlack_Black_0.geometry}
        material={SoftBrown}
        position={[0, -0.7, 0]}
        scale={9.3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface302_grass_0.geometry}
        material={materials.grass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface303_grass_0.geometry}
        material={materials.grass}
        position={[-8.354, 0.14, -2.599]}
        rotation={[0, 1.538, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface304_grass_0.geometry}
        material={materials.grass}
        position={[-4.856, 0.142, 8.453]}
        rotation={[-Math.PI, -1.511, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface305_grass_0.geometry}
        material={materials.grass}
        position={[-10.323, 0.136, 3.686]}
        rotation={[-Math.PI, 0.156, -Math.PI]}
        scale={0.64}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface323_grass_0.geometry}
        material={materials.grass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.polySurface325_grass_0.geometry}
        material={materials.grass}
        position={[5.541, 0.399, -0.908]}
        rotation={[0, 1.424, 0]}
        scale={0.5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pSphere15_PeacockPlant_0.geometry}
        material={materials.PeacockPlant}
        position={[-0.002, 0, 2.51]}
        rotation={[0, 1.126, 0]}
      />
    </a.group>
  )
};
