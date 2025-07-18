'use client';

import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function Gradient() {
   return (
      <ShaderGradientCanvas
         style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
         }}
      >
         <ShaderGradient
            control="props"
            animate="on"
            type="sphere"
            shader="defaults"
            uAmplitude={3.2}
            uDensity={0.8}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={0.3}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#73bfc4"
            color2="#ff810a"
            color3="#8da0ce"
            reflection={0.4}
            wireframe={false}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
         />
      </ShaderGradientCanvas>
   );
}
