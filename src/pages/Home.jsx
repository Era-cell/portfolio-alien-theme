import React, { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Island, Alien, Sky } from "../models";
import { Loader } from "../components";
import HomeInfo from "../components/HomeInfo";

const adjustModelForScreenSize = () => {
  let screenScale;
  let screenPosition = [0, 0, 0];
  const rotation = [0, 0, 0];

  if (window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];
  } else {
    screenScale = [1, 1, 1];
  }
  return [screenScale, screenPosition, rotation];
}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState();
  const [islandScale, islandPosition, islandRotation] = adjustModelForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
      {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas className={`w-full ${isRotating?'cursor-grabbing': 'cursor-grab'}`} camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <Sky isRotating={isRotating}/>
          <PerspectiveCamera makeDefault position={[0, 6, 18]} />
          <ambientLight intensity={3} />
          <pointLight position={[0, 0, 0]} />
          <hemisphereLight skyColor="#8B4513" groundColor="#000000" intensity={1} />
          <Island isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage} scale={islandScale} position={islandPosition} rotation={islandRotation} />
          <Alien  scale={0.01} isRotating={isRotating} position={[0, 0, 8.5]} rotation={[0, 1.57, 0]} />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
