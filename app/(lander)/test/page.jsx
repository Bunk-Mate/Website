'use client';

import Link from 'next/link';
import Image from 'next/image';
import Dashboard from '@/public/assets/dashboard.png';
import EditTable from '@/public/assets/edit_timetable.png';
import ContactFooter from '@/components/contact_us/contact_footer';
import Feature from '@/components/feature/feature';
import NameStrip from '@/components/name_strip/name_strip';
import FeatureStrip from '@/components/name_strip/feature_strip';
import { useEffect, useRef, useState } from 'react';
import HParallax from '@/components/scroll_shenanigans/horizontal_parallax';
import Gradient from '@/components/ui/shader_grandient/gradient';
import ChevronLeft from '@/components/svg/chevron_left';

export default function Home() {
   const featurePos = useRef(0);
   useEffect(() => {
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };
   });

   return (
      <div className="h-screen scroll-smooth">
         <>
            <div className="relative z-10 flex h-screen max-h-screen flex-1 flex-col items-center justify-center overflow-hidden backdrop-blur-lg max-md:h-screen">
               <div className="flex flex-1 flex-col">
                  <div className="flex-1"></div>
                  <div className="flex items-center justify-center">
                     <div className="flex-1">
                        <SineWave direction="left" />
                     </div>
                     <Link
                        href="/registration"
                        className="group flex items-center justify-center"
                     >
                        <div className="h-px flex-1 bg-white"></div>

                        <Image
                           src="/assets/logo.png"
                           width={1}
                           height={1}
                           className="size-[7vw]"
                           alt="logo"
                           unoptimized
                        />

                        <p className="max-w-0 scale-[0.7] overflow-hidden whitespace-nowrap text-[1.2vw] opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:scale-100 group-hover:opacity-100">
                           Get Started
                        </p>

                        <div className="ml-[-2vw] flex h-[6vw] text-[#ffffffb9] transition-all duration-700 group-hover:text-white">
                           <ChevronLeft />
                        </div>
                        <div className="ml-[-4vw] flex h-[6vw] text-[#ffffffb9] transition-all duration-700 group-hover:text-white">
                           <ChevronLeft />
                        </div>

                        <div className="h-px flex-1 bg-white"></div>
                     </Link>

                     <div className="h-px flex-1 bg-[#ffffffb9]"></div>
                  </div>
                  <div className="flex-1"></div>
                  <div className="mb-[2vw] flex text-[1.2vw] font-bold leading-[1.2vw] [&>*]:text-[#ffffffb9]">
                     <p className="flex flex-1 justify-start">MATE INC</p>
                     <p className="flex flex-1 justify-start">
                        CALCULATED RISK
                        <br />
                        SHITTY DESIGN
                     </p>
                     <p className="flex flex-1 justify-start">
                        SAFE BUNK?
                        <br />
                        BUNK CLASS??
                        <br />
                        BUNK DAY???
                        <br />
                     </p>
                     <p className="flex flex-1 justify-end text-end">
                        2025
                        <br />
                        HERE TO SERVE ALL YOUR BUNKING NEEDS {';)'}
                     </p>
                  </div>
                  <p className="text-[19vw] font-bold leading-[0.8] tracking-tighter max-md:text-[14vw]">
                     BUNK-MATE
                  </p>
               </div>
            </div>
            <Gradient />
         </>
         <div className="min-h-[300vh]"></div>
         {/* <div className="fixed left-0 top-[20vh] z-50 bg-yellow-400 text-black">
            <b>{rectRef.current.top}</b> rect top <br />
            <b>{rectRef.current.left}</b> rect left <br />
            <b>{rectRef.current.right}</b> rect right <br />
            <b>{rectRef.current.left - rectRef.current.right}</b> rect
            right-left <br />
            <b>{percent.current}</b> percent
         </div> */}
      </div>
   );
}

// import { useEffect, useRef, useState } from 'react';

const SineWave = () => {
   const width = 1000;
   const height = 80;
   const scaleY = height / 2;

   const [points, setPoints] = useState([]);
   const phaseRef = useRef(0);

   useEffect(() => {
      let animationFrame;

      const animate = () => {
         const newPoints = [];
         const phase = phaseRef.current;
         for (let x = 0; x <= width; x++) {
            const t = 1 - x / width;

            const frequency = (1 - t) ** 2 * 4;
            const amplitude = (1 - t) ** 4 * scaleY;

            const y =
               Math.sin(x * frequency * 0.001 * Math.PI * 2 - phase) *
                  amplitude +
               scaleY;

            newPoints.push(`${x},${y.toFixed(2)}`);
         }

         setPoints(newPoints);
         phaseRef.current += 0.05; // wave speed
         animationFrame = requestAnimationFrame(animate);
      };

      animate();

      return () => cancelAnimationFrame(animationFrame);
   }, []);

   return (
      <svg
         width="100%"
         height={height}
         viewBox={`0 0 ${width} ${height}`}
         preserveAspectRatio="none"
         className="rotate-180"
      >
         <polyline
            fill="none"
            stroke="#ffffffb9"
            strokeWidth="2"
            points={points.join(' ')}
         />
      </svg>
   );
};
