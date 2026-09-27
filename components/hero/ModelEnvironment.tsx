"use client";

import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { MyModel } from "./MyModel";

interface ModelEnvironmentProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export const ModelEnvironment = ({ audioRef }: ModelEnvironmentProps) => {
  return (
    <>
      <OrbitControls />
      <MyModel audioRef={audioRef} />
      <Environment preset="warehouse" />
    </>
  );
};
