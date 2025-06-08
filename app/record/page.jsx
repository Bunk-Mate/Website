'use client';

import Gradient from '@/components/ui/shader_grandient/gradient';

export default function Page() {
   return (
      <video
         autoPlay
         muted
         loop
         playsInline
         className="absolute left-0 top-0 z-[-1] h-full w-full object-cover"
      >
         <source src="/assets/gradient.mp4" type="video/webm" />
      </video>
   );
}
