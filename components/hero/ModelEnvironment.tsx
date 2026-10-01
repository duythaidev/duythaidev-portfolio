"use client";

import { OrbitControls, Environment } from "@react-three/drei";
import { MyModel } from "./MyModel";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";

const LOOK_AT = new Vector3(0.02, 1.35, 0.02);

interface ModelEnvironmentProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export const ModelEnvironment = ({ audioRef }: ModelEnvironmentProps) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <OrbitControls enableDamping target={LOOK_AT} />

      <ambientLight intensity={0.5} color={"#00cacb"} />
      <MyModel audioRef={audioRef} />
      <Environment preset="warehouse" />
    </>
  );
};
