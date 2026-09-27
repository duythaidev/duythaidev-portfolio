"use client";

import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { MyModel } from "./MyModel";

interface ExperienceProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export const Experience = ({ audioRef }: ExperienceProps) => {
  return (
    <>
      <OrbitControls />
      <MyModel audioRef={audioRef} />
      <Environment preset="warehouse" />
    </>
  );
};
