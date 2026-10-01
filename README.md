# duythaidev - Portfolio

What's up, I'm Thai. This is my personal portfolio website showing my projects and experience with some cool animations and effects.

I built this one with Next.js, React, Three.js, shadcn combine with blocks from magicui, aceternity ui, these are some cool tools I use throughout my work so I decide to use them for my portfolio (also ).

**Made with ❤️ by [duythaidev](https://github.com/duythaidev) using modern web technologies**

## Features

- Responsive design
- 2 Themes (Neon and Amber)
- 3D model lip sync animation from audio using wawa-lipsync
- Voice generator with TTS service

## 3D Model

- Model Base: `voices and models/duythaidev.glb`
- About my model which looks like me, I use [metaperson](https://metaperson.avatarsdk.com/) to create avatar of me, because this tool create suitable meshes for face rigging
- I used Blender to rig, optimize model, though I am not a 3D artist, cause I used to learn Blender in high school for fun 😂. I used this knowledge to rig face and export glb file for lipsync
- For body animation (idle.fbx, greeting.fbx) I use [mixamo](https://www.mixamo.com/) to animate
- Optimize Model with `gltf-transform` (from 10.86MB to 2.42MB)
- Parse glb model to React component using `gltfjsx`
