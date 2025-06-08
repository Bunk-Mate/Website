'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ArrowUp from '../svg/arrow';
import WhiteX from '../svg/white_x';

export default function Description() {
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
      <div
         className="flex max-h-screen min-h-screen flex-col gap-[1vw] rounded-t-[2vw] bg-white p-[1vw]"
         ref={ref}
      >
         <div className="flex">
            <div className={`flex items-start text-black`} ref={victim}>
               <p
                  className="my-[-2vw] text-[7vw] transition-all duration-300"
                  ref={textRef}
               >
                  <span className="font-extralight">SAFE</span> BUNKING
               </p>
            </div>
            <div className="flex flex-1 justify-end text-center text-[1.5vw] font-light text-black transition-all duration-300">
               <p ref={descRef} className="max-w-[40vw]">
                  Say goodbye to{' '}
                  <span className="font-bold">manual calculations</span> and{' '}
                  <span className="font-bold">attendance anxiety</span>—BunkMate
                  shows you the safest way to skip.
                  <br />
                  {/* <span>Discover more </span>
                  <span className="max-h-[3vw] max-w-[3vw] overflow-hidden rounded-full border border-solid border-white p-1">
                     <ArrowUp />
                  </span> */}
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
                     src={'/assets/bunkmate-mobile.png'}
                     fill
                     alt="placeholder"
                     className="rounded-[1vw] object-cover"
                     unoptimized
                  />
                  <div className="absolute flex w-full justify-end">
                     <div className="m-[1vw] flex min-h-[3vw] min-w-[3vw] rounded-full border border-solid border-white p-1">
                        <ArrowUp />
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex flex-1 flex-col gap-[1vw]">
               <div
                  style={{
                     marginTop: `${35 * percent.current}vw`,
                     marginLeft: `${35 * percent.current}vw`,
                  }}
                  className="flex flex-[2] flex-col rounded-[1vw] bg-green-900"
               >
                  <p className="m-[2vw] mb-[-2vw] text-[3vw]">WHAT? WHY?</p>
                  <p className="m-[2vw] text-[1.5vw]">
                     Bunk Mate helps you track your attendance and plan your
                     bunks. Who else is better to rely on than oneself..
                  </p>
                  <div className="absolute flex w-[48.5vw] justify-end p-[1vw]">
                     <WhiteX />
                  </div>
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
                     src={'/assets/bunkmate-mac.png'}
                     alt="placeholder"
                     fill
                     unoptimized
                     className="rounded-[1vw] object-cover"
                  />
                  <div className="absolute flex w-full justify-end">
                     <div className="m-[1vw] flex min-h-[3vw] min-w-[3vw] rounded-full border border-solid border-white p-1">
                        <ArrowUp />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
