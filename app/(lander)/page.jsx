'use client';

import Link from 'next/link';
import Image from 'next/image';
import ContactFooter from '@/components/contact_us/contact_footer';
import Feature from '@/components/feature/feature';
import NameStrip from '@/components/carousels/name_strip/name_strip';
import FeatureStrip from '@/components/carousels/name_strip/feature_strip';
import { useEffect, useRef } from 'react';
import HParallax from '@/components/scroll_shenanigans/horizontal_parallax';
import Description from '@/components/scroll_shenanigans/description';
import { SineWave } from '@/components/ui/sine_wave';
import ChevronLeft from '@/components/svg/chevron_left';
import Gradient from '@/components/ui/shader_grandient/gradient';
import LineGradient from '@/components/ui/line_transition';

export default function Home() {
   const featurePos = useRef(0);
   useEffect(() => {
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };
   });
   return (
      <div className="scroll-smooth">
         {/* Hero */}
         <div
            id="hero"
            className="relative z-10 flex h-dvh max-h-dvh flex-1 flex-col items-center justify-center overflow-hidden backdrop-blur-lg max-md:h-screen"
         >
            <div className="flex flex-1 flex-col">
               <div className="flex flex-1 items-center justify-center">
                  <div className="flex-1">
                     <SineWave direction="left" />
                  </div>
                  <Link
                     href="/registration"
                     className="group flex items-center justify-center"
                  >
                     <div className="h-px flex-1 bg-white"></div>

                     <div className="relative size-[7vw] max-md:size-[20vw]">
                        <Image
                           src="/assets/logo.png"
                           fill
                           className="object-contain"
                           alt="logo"
                           unoptimized
                        />
                     </div>

                     <p className="max-w-0 scale-[0.7] overflow-hidden whitespace-nowrap text-[1.2vw] opacity-0 transition-all duration-500 ease-in-out group-hover:mr-[0.5vw] group-hover:max-w-[200px] group-hover:scale-100 group-hover:opacity-100 max-md:text-[5vw]">
                        Get Started
                     </p>

                     <div className="ml-[-2vw] flex h-[6vw] text-[#ffffffb9] transition-all duration-700 group-hover:text-white max-md:ml-[-6vw] max-md:h-[17vw]">
                        <ChevronLeft />
                     </div>
                     <div className="ml-[-4vw] flex h-[6vw] text-[#ffffffb9] transition-all duration-700 group-hover:text-white max-md:ml-[-12vw] max-md:h-[17vw]">
                        <ChevronLeft />
                     </div>

                     <div className="h-px flex-1 bg-white"></div>
                  </Link>

                  <div className="h-px flex-1 bg-[#ffffffb9]"></div>
               </div>
               <div className="mb-[2vw] flex text-[1.2vw] font-bold leading-[1.2vw] max-md:mx-[2vw] max-md:text-[4vw] max-md:leading-tight [&>*]:text-[#ffffffb9]">
                  <p className="flex flex-1 justify-start max-md:hidden">
                     MATE INC
                  </p>
                  <p className="flex flex-1 justify-start max-md:hidden">
                     CALCULATED RISK
                     <br />
                     SHITTY DESIGN
                  </p>
                  <p className="flex flex-1 justify-start max-md:flex-[2]">
                     SAFE BUNK?
                     <br />
                     BUNK CLASS??
                     <br />
                     BUNK DAY???
                     <br />
                  </p>
                  <p className="flex flex-1 justify-end text-end max-md:flex-[3]">
                     2025
                     <br />
                     HERE TO SERVE ALL YOUR BUNKING NEEDS {';)'}
                  </p>
               </div>
               <p className="text-[19vw] font-bold leading-[0.8] tracking-tighter max-md:flex max-md:flex-col max-md:items-start max-md:text-[39vw]">
                  <span className="ml-[-1vw] max-md:flex max-md:items-center">
                     BUNK
                     <span className="ml-[-2vw] inline-block min-h-[10vw] min-w-[10vw] rounded-full bg-white md:hidden"></span>
                  </span>
                  <span className="max-md:hidden">-</span>
                  <span className="md:hidden"></span>
                  MATE
               </p>
            </div>
         </div>
         <Gradient />

         <Description />

         <LineGradient />
         <div className="mb-[-13vw] mt-[-23vw] max-w-[100vw]">
            <FeatureStrip />
         </div>
         <div id="feature" ref={featurePos}>
            <Feature />
         </div>

         <HParallax featurePos={featurePos} />

         <div className="max-w-[100vw] bg-white">
            <NameStrip />
         </div>
         <ContactFooter />
      </div>
   );
}
