'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ArrowUp from '@/components/svg/arrow';

export default function Description() {
   const [windW, setWindW] = useState(0);
   // eslint-disable-next-line no-unused-vars
   const [h, setH] = useState(0);
   // eslint-disable-next-line no-unused-vars
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

   const handleResize = () => {
      setWindW(window.innerWidth);
   };

   useEffect(() => {
      setWindW(window.innerWidth);
      if (offs.current == 0) {
         offs.current = window.scrollY;
      }

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

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
   // eslint-disable-next-line no-unused-vars
   const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
   // eslint-disable-next-line no-unused-vars
   const easeInOutQuart = (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
   // eslint-disable-next-line no-unused-vars
   const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
   // eslint-disable-next-line no-unused-vars
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
                  transform:
                     window.innerWidth > 680
                        ? `translateX(${newPercent * (window.innerWidth / 2 - descBound.left - 1.15 * descBound.width)}px) translateY(${newPercent * 12}vw)`
                        : `translateY(${newPercent * 12}vw)`,
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
      <div
         className="flex max-h-[95vh] min-h-[95vh] max-w-[100vw] flex-col gap-[1vw] overflow-hidden rounded-t-[2vw] bg-white p-[1vw] max-md:max-h-[94vh] max-md:min-h-[94vh]"
         ref={ref}
      >
         <div className="flex max-md:flex-col">
            <div className={`flex items-start text-black`} ref={victim}>
               <p
                  className="my-[-2vw] text-[7vw] transition-all duration-300 max-md:text-[12vw]"
                  ref={textRef}
               >
                  <span className="font-extralight">SAFE</span> BUNKING
               </p>
            </div>
            <div className="flex flex-1 justify-end text-center text-[1.5vw] font-light text-black transition-all duration-300 max-md:justify-center max-md:text-[4vw]">
               <p
                  ref={descRef}
                  style={
                     windW < 680
                        ? {
                             maxWidth: `${100 * (1 - 0.5 * percent.current + 0.25)}vw`,
                          }
                        : {}
                  }
                  className="md:max-w-[40vw]"
               >
                  Say goodbye to{' '}
                  <span className="font-bold">manual calculations</span> and{' '}
                  <span className="font-bold">attendance anxiety</span>—BunkMate
                  shows you the safest way to skip.
                  <br />
               </p>
            </div>
         </div>
         <div className="flex flex-1 gap-[1vw] max-md:flex-col">
            <div className="flex flex-1">
               <div
                  style={{
                     rotate: `${-0.3 * percent.current * 90}deg`,
                     scale: `${1 - 0.8 * percent.current}`,
                     marginTop: `${(windW > 680 ? -1 : 30) * percent.current}vw`,
                     marginLeft: `${3 * percent.current}vw`,
                     transformOrigin: 'top left',
                  }}
                  className="flex-1"
               >
                  <Image
                     src={'/assets/bunkmate-mobile.png'}
                     fill
                     alt="placeholder"
                     className="rounded-[1vw] object-cover"
                     unoptimized
                  />
                  <div className="absolute flex w-full justify-end">
                     <div className="m-[1vw] flex min-h-[3vw] min-w-[3vw] rounded-full border border-solid border-white p-1 max-md:min-h-[9vw] max-md:min-w-[9vw]">
                        <ArrowUp />
                     </div>
                  </div>
               </div>
               <div className="min-w-[15vw] md:hidden"></div>
            </div>
            <div className="flex flex-1 gap-[1vw] md:flex-col">
               <div className="min-w-[5vw] md:hidden"></div>
               <div
                  style={{
                     marginTop: `${35 * percent.current}vw`,
                     marginLeft: `${35 * percent.current}vw`,
                  }}
                  className="flex flex-[2] flex-col rounded-[1vw] bg-green-900 max-md:hidden"
               >
                  <p className="m-[2vw] mb-[-2vw] text-[3vw]">WHAT? WHY?</p>
                  <p className="m-[2vw] text-[1.5vw]">
                     Bunk Mate helps you track your attendance and plan your
                     bunks. Who else is better to rely on than oneself..
                  </p>
               </div>
               <div
                  style={{
                     rotate: `${0.3 * percent.current * 90}deg`,
                     scale: `${1 - 0.8 * percent.current}`,
                     marginTop: `${(windW > 680 ? -35 : -35) * 2 * percent.current}vw`,
                     marginRight: `${3 * percent.current}vw`,
                     transformOrigin: 'top right',
                     maxHeight: '100vw',
                  }}
                  className="flex flex-[3]"
               >
                  <Image
                     src={'/assets/bunkmate-mac.png'}
                     alt="placeholder"
                     fill
                     unoptimized
                     className="rounded-[1vw] object-cover"
                  />
                  <div className="absolute flex w-full justify-end">
                     <div className="m-[1vw] flex min-h-[3vw] min-w-[3vw] rounded-full border border-solid border-white p-1 max-md:min-h-[9vw] max-md:min-w-[9vw]">
                        <ArrowUp />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
