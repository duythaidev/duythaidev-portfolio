"use client";

import * as THREE from "three";
import React, { JSX, useEffect, useRef, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { lipsyncManager } from "./ModelSide";
import { VISEMES } from "wawa-lipsync";

type GLTFResult = GLTF & {
  nodes: {
    AvatarBody: THREE.SkinnedMesh;
    glasses: THREE.SkinnedMesh;
    outfit_bottom: THREE.SkinnedMesh;
    outfit_shoes: THREE.SkinnedMesh;
    outfit_top: THREE.SkinnedMesh;
    AvatarEyelashes: THREE.SkinnedMesh;
    AvatarHead: THREE.SkinnedMesh;
    AvatarLeftCornea: THREE.SkinnedMesh;
    AvatarLeftEyeball: THREE.SkinnedMesh;
    AvatarRightCornea: THREE.SkinnedMesh;
    AvatarRightEyeball: THREE.SkinnedMesh;
    AvatarTeethLower: THREE.SkinnedMesh;
    AvatarTeethUpper: THREE.SkinnedMesh;
    Hips: THREE.Bone;
    ["MCH-eyes_parent"]: THREE.Bone;
    ["DEF-face"]: THREE.Bone;
  };
  materials: {
    AvatarBody: THREE.MeshStandardMaterial;
    glasses: THREE.MeshStandardMaterial;
    outfit_bottom: THREE.MeshStandardMaterial;
    outfit_shoes: THREE.MeshStandardMaterial;
    outfit_top: THREE.MeshStandardMaterial;
    AvatarEyelashes: THREE.MeshStandardMaterial;
    AvatarHead: THREE.MeshStandardMaterial;
    AvatarLeftCornea: THREE.MeshStandardMaterial;
    AvatarLeftEyeball: THREE.MeshStandardMaterial;
    AvatarRightCornea: THREE.MeshStandardMaterial;
    AvatarRightEyeball: THREE.MeshStandardMaterial;
    AvatarTeethLower: THREE.MeshStandardMaterial;
    AvatarTeethUpper: THREE.MeshStandardMaterial;
  };
};

const ANIMATIONS_URL = {
  idle: "/animations/idle.fbx",
};

const ANIMATION_NAMES = {
  idle: "Idle",
};

export interface AvatarProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export function MyModel(props: JSX.IntrinsicElements["group"] & AvatarProps) {
  const { audioRef, ...groupProps } = props;

  const { scene } = useGLTF("/models/duythaidev.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

  const [currentAnimation, setCurrentAnimation] = useState(
    ANIMATION_NAMES.idle,
  );

  const { animations: idle } = useFBX(ANIMATIONS_URL.idle);

  if (idle && idle[0]) {
    idle[0].name = ANIMATION_NAMES.idle;
  }

  const modelRef = useRef<THREE.Group | null>(null);

  const { actions } = useAnimations(idle && idle[0] ? [idle[0]] : [], modelRef);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio || !audio.src) return;
    lipsyncManager.connectAudio(audio);
  }, [audioRef?.current?.src]);

  useEffect(() => {
    if (!actions || !actions[currentAnimation]) return;
    actions[currentAnimation].reset().fadeIn(0.5).play();
    return () => {
      actions[currentAnimation]?.fadeOut(0.5);
    };
  }, [currentAnimation, actions]);

  useFrame(() => {
    const audio = audioRef?.current;
    if (!audio || audio.paused || audio.ended) return;

    const head = nodes.AvatarHead;
    const dict = head?.morphTargetDictionary;
    if (!dict) return;

    if (lipsyncManager) {
      lipsyncManager.processAudio();
    }
    const viseme = lipsyncManager?.viseme;

    const activeTargetName = viseme
      ? viseme.startsWith("viseme_")
        ? viseme
        : `viseme_${viseme}`
      : "viseme_sil";

    // Danh sách các mesh có morph targets cần áp dụng viseme
    const morphMeshes = [
      nodes.AvatarHead,
      nodes.AvatarTeethLower,
      nodes.AvatarTeethUpper,
    ];

    morphMeshes.forEach((mesh) => {
      if (!mesh || !mesh.morphTargetDictionary || !mesh.morphTargetInfluences)
        return;
      const meshDict = mesh.morphTargetDictionary;

      Object.values(VISEMES).forEach((visemeName) => {
        const idxViseme = meshDict[visemeName];
        if (idxViseme === undefined) return;

        const targetValue = visemeName === activeTargetName ? 1 : 0;

        if (!mesh.morphTargetInfluences) return;

        mesh.morphTargetInfluences[idxViseme] = THREE.MathUtils.lerp(
          mesh.morphTargetInfluences[idxViseme],
          targetValue,
          0.15,
        );
      });
    });
  });

  return (
    <group ref={modelRef} {...groupProps} dispose={null}>
      <group name="AvatarRoot">
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.AvatarBody.geometry}
          material={materials.AvatarBody}
          skeleton={nodes.AvatarBody.skeleton}
        />
        <skinnedMesh
          geometry={nodes.glasses.geometry}
          material={materials.glasses}
          skeleton={nodes.glasses.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_bottom.geometry}
          material={materials.outfit_bottom}
          skeleton={nodes.outfit_bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_shoes.geometry}
          material={materials.outfit_shoes}
          skeleton={nodes.outfit_shoes.skeleton}
        />
        <skinnedMesh
          geometry={nodes.outfit_top.geometry}
          material={materials.outfit_top}
          skeleton={nodes.outfit_top.skeleton}
        />
        <skinnedMesh
          name="AvatarEyelashes"
          geometry={nodes.AvatarEyelashes.geometry}
          material={materials.AvatarEyelashes}
          skeleton={nodes.AvatarEyelashes.skeleton}
          morphTargetDictionary={nodes.AvatarEyelashes.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarEyelashes.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarHead"
          geometry={nodes.AvatarHead.geometry}
          material={materials.AvatarHead}
          skeleton={nodes.AvatarHead.skeleton}
          morphTargetDictionary={nodes.AvatarHead.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarHead.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarLeftCornea"
          geometry={nodes.AvatarLeftCornea.geometry}
          material={materials.AvatarLeftCornea}
          skeleton={nodes.AvatarLeftCornea.skeleton}
          morphTargetDictionary={nodes.AvatarLeftCornea.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarLeftCornea.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarLeftEyeball"
          geometry={nodes.AvatarLeftEyeball.geometry}
          material={materials.AvatarLeftEyeball}
          skeleton={nodes.AvatarLeftEyeball.skeleton}
          morphTargetDictionary={nodes.AvatarLeftEyeball.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarLeftEyeball.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarRightCornea"
          geometry={nodes.AvatarRightCornea.geometry}
          material={materials.AvatarRightCornea}
          skeleton={nodes.AvatarRightCornea.skeleton}
          morphTargetDictionary={nodes.AvatarRightCornea.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarRightCornea.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarRightEyeball"
          geometry={nodes.AvatarRightEyeball.geometry}
          material={materials.AvatarRightEyeball}
          skeleton={nodes.AvatarRightEyeball.skeleton}
          morphTargetDictionary={nodes.AvatarRightEyeball.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarRightEyeball.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarTeethLower"
          geometry={nodes.AvatarTeethLower.geometry}
          material={materials.AvatarTeethLower}
          skeleton={nodes.AvatarTeethLower.skeleton}
          morphTargetDictionary={nodes.AvatarTeethLower.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarTeethLower.morphTargetInfluences}
        />
        <skinnedMesh
          name="AvatarTeethUpper"
          geometry={nodes.AvatarTeethUpper.geometry}
          material={materials.AvatarTeethUpper}
          skeleton={nodes.AvatarTeethUpper.skeleton}
          morphTargetDictionary={nodes.AvatarTeethUpper.morphTargetDictionary}
          morphTargetInfluences={nodes.AvatarTeethUpper.morphTargetInfluences}
        />
      </group>
      <group position={[0, 1.559, 0.14]}>
        <primitive object={nodes["MCH-eyes_parent"]} />
        <primitive object={nodes["DEF-face"]} />
      </group>
    </group>
  );
}

export { MyModel as Model };
export default MyModel;

useGLTF.preload("/models/duythaidev.glb");
