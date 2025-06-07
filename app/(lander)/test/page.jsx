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

export default function Home() {
   const featurePos = useRef(0);
   useEffect(() => {
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };
   });

   const [h, setH] = useState(0);
   const [w, setW] = useState(0);
   const offs = useRef(0);
   const handleScroll = () => {
      if (window.innerHeight >= window.innerWidth) {
         setH(() => window.scrollY - offs.current);
         setW(() => window.scrollY - offs.current);
      } else {
         setH(() => window.scrollY - offs.current);
         setW(() => window.scrollY - offs.current);
      }
   };

   useEffect(() => {
      if (offs.current == 0) {
         offs.current = window.scrollY;
      }

      window.addEventListener('scroll', handleScroll);
      // window.removeEventListener('scroll', handleScroll);

      return () => {
         {
            setH(0);
            setW(0);
         }
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const rectRef = useRef(0);
   const ref = useRef();
   const victim = useRef();
   const descRef = useRef();
   const percent = useRef(0);
   const textRef = useRef(0);
   const RISE_LEVEL = 0.6;

   const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
   const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
   const easeInOutQuart = (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
   const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
   const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

   useEffect(() => {
      const onScroll = () => {
         const rect = ref.current.getBoundingClientRect();
         const textBound = textRef.current.getBoundingClientRect();
         const descBound = descRef.current.getBoundingClientRect();
         const linearPercent =
            rect.top <= 0
               ? 0
               : rect.top <= RISE_LEVEL * window.innerHeight
                 ? rect.top / (RISE_LEVEL * window.innerHeight)
                 : 1;

         const newPercent = easeInOutCubic(linearPercent);

         percent.current = newPercent;
         rectRef.current = rect;

         victim.current.animate(
            [
               {
                  transform: `translateX(${(newPercent / 2) * (window.innerWidth + (textBound.left - textBound.right))}px)`,
               },
            ],
            {
               duration: 100,
               fill: 'forwards',
            }
         );

         textRef.current.animate(
            [
               {
                  transform: `translateY(${newPercent * 5}vw)`,
               },
            ],
            {
               duration: 100,
               fill: 'forwards',
            }
         );

         descRef.current.animate(
            [
               {
                  transform: `translateX(${newPercent * (window.innerWidth / 2 - descBound.left - 1.15 * descBound.width)}px) translateY(${newPercent * 12}vw)`,
               },
            ],
            {
               duration: 100,
               fill: 'forwards',
            }
         );
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <div className="h-screen scroll-smooth">
         <div className="flex h-screen flex-1 flex-col items-center justify-center bg-black/80 max-md:h-screen">
            <p className="m-[-1vw] text-[2vw] max-md:text-[5vw]">Welcome to</p>
            <p className="text-[7vw] max-md:text-[14vw]">Bunk-Mate</p>
            <Link
               href="/registration"
               className="rounded-full border border-l-white border-t-white bg-black p-4 text-[1.5vw] font-light transition duration-1000 hover:border-b-[#ee67ee] hover:border-r-[#ee67ee] hover:bg-white hover:text-black hover:shadow-[5px_5px_rgba(240,46,170,0.4),10px_10px_rgba(240,46,170,0.3),15px_15px_rgba(240,46,170,0.2)] max-sm:text-lg"
            >
               Get Started
            </Link>
            {/* <div className="fixed top-0 -z-20 min-h-screen min-w-[100vw]">
               <Image
                  src={'/assets/lander-bg.png'}
                  alt="bg-lander"
                  className="min-h-screen min-w-[100vw] invert blur-md"
                  width={1}
                  height={1}
                  unoptimized
               />
            </div> */}
            {/* <div className="relative h-screen w-full overflow-hidden"> */}
               <div className="gradient-bg -z-10" />
               <div className="relative z-10 p-10 text-4xl text-white">
                  Hello from Next.js + Tailwind Gradient!
               </div>
            </div>
         {/* </div> */}
         <div
            className="flex max-h-screen min-h-screen flex-col gap-[1vw] rounded-t-[2vw] bg-white p-[1vw]"
            ref={ref}
         >
            <div className="flex">
               <div className={`flex items-start text-black`} ref={victim}>
                  {/* <p className="-mb-[1vw] text-[1vw] transition-all duration-300">
                     HERE TO SERVE ALL YOU
                  </p> */}
                  <p
                     className="my-[-2vw] text-[7vw] transition-all duration-300"
                     ref={textRef}
                  >
                     <span className="font-extralight">YOUR</span> BUNKING
                  </p>
               </div>
               <div className="flex flex-1 justify-end text-center text-[1.5vw] font-light text-black transition-all duration-300">
                  <p ref={descRef} className="max-w-[40vw]">
                     This could be some random text explaining some not so
                     relevant bullshit. Engrave bunkmate on my gravestone or
                     <br />
                     <span>Discover more {'->'}</span>
                  </p>
               </div>
            </div>
            <div className="flex flex-1 gap-[1vw]">
               <div className="flex flex-1">
                  <div
                     style={{
                        rotate: `${-0.3 * percent.current * 90}deg`,
                        scale: `${1 - 0.8 * percent.current}`,
                        marginTop: `${-1 * percent.current}vw`,
                        marginLeft: `${3 * percent.current}vw`,
                        transformOrigin: 'top left',
                     }}
                     className="flex-1"
                  >
                     <Image
                        src={'/assets/placeholder-1.png'}
                        fill
                        alt="placeholder"
                        className="rounded-[1vw] object-cover"
                        unoptimized
                     />
                  </div>
               </div>
               <div className="flex flex-1 flex-col gap-[1vw]">
                  <div
                     style={{
                        marginTop: `${35 * percent.current}vw`,
                        marginLeft: `${35 * percent.current}vw`,
                     }}
                     className="flex-[2] rounded-[1vw] bg-blue-900"
                  >
                     <p className="m-[2vw] text-[1.5vw]">
                        I dont know man honestly. Ive been working on this for
                        so long, even though this bullshit shouldnt be taking
                        much time. Its a bunch of bogus honestly
                     </p>
                  </div>
                  <div
                     style={{
                        rotate: `${0.3 * percent.current * 90}deg`,
                        scale: `${1 - 0.8 * percent.current}`,
                        marginTop: `${-35 * 2 * percent.current}vw`,
                        marginRight: `${3 * percent.current}vw`,
                        transformOrigin: 'top right',
                     }}
                     className="flex flex-[3]"
                  >
                     <Image
                        src={'/assets/placeholder-2.png'}
                        alt="placeholder"
                        fill
                        unoptimized
                        className="rounded-[1vw] object-cover"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="min-h-[300vh]"></div>
         <div className="fixed left-0 top-[20vh] z-50 bg-yellow-400 text-black">
            <b>{rectRef.current.top}</b> rect top <br />
            <b>{rectRef.current.left}</b> rect left <br />
            <b>{rectRef.current.right}</b> rect right <br />
            <b>{rectRef.current.left - rectRef.current.right}</b> rect
            right-left <br />
            <b>{percent.current}</b> percent
         </div>
      </div>
   );
}
