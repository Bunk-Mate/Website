'use client';
import { useEffect, useRef, useState } from 'react';

export default function Parallax() {
   const containerRef = useRef(null);
   const scalingRef = useRef(null);
   const textRef = useRef(null);
   const [isFill, setIsFill] = useState(true);
   const [activate, setActivate] = useState(false);
   const scale = useRef(0);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setActivate(entry.isIntersecting);
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (scalingRef.current) {
         observer.observe(scalingRef.current);
         ////console.log('observing')
      }

      return () => {
         if (scalingRef.current) {
            observer.unobserve(scalingRef.current);
            ////console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      const container = containerRef.current;
      const scalingEl = scalingRef.current;
      const textEl = textRef.current;

      // Set initial scale
      scalingEl.style.transform = 'scale(0)';
      scalingEl.style.transformOrigin = 'top center';

      const onScroll = () => {
         // Use the container as a measuring point (doesn't get scaled)
         const containerRect = container.getBoundingClientRect();
         const textRect = textEl.getBoundingClientRect();

         // Handle text translation when div reaches top
         if (containerRect.top <= 0 && textRect.top <= 0) {
            setIsFill(true);
            textEl.style.transform = `translateX(${containerRect.top}px)`;
         }

         // Calculate scale factor based on container position
         if (containerRect.top < window.innerHeight) {
            // Linear scaling from 0 to 1 as trigger point enters viewport
            const viewportHeight = window.innerHeight;
            const scrollProgress = 1 - containerRect.top / viewportHeight;
            scale.current = Math.min(Math.max(scrollProgress, 0), 1);

            console.log("scaling up ", scale.current, containerRect.top)
            // console.log("thisi s offset ", (1-scale.current)*Math.sqrt(
            //             Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
            //          )/2)

            // Apply scale to the scaling element
            scalingEl.style.transform = `scale(${scale.current})`;
         }
      };

      // Run once to set initial state
      onScroll();

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <div
         ref={containerRef}
         className="relative flex max-w-[100vw] bg-red-500 min-h-[2px]"
         style={{
            // minHeight: Math.sqrt(
            //    Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
            // ),
         }}
      >
         {/* This invisible element helps measure scroll position without being affected by scaling */}
         <div
            ref={scalingRef}
            className={`absolute top-0 flex w-full ${isFill?'':'items-center rounded-full'} overflow-clip bg-gradient-to-r from-black to-blue-300`}
            style={
               !isFill
                  ? {
                       left: -(
                          Math.sqrt(
                             Math.pow(window.innerHeight, 2) +
                                Math.pow(window.innerWidth, 2)
                          ) /
                             2 -
                          window.innerWidth / 2
                       ),
                       minWidth: Math.sqrt(
                          Math.pow(window.innerHeight, 2) +
                             Math.pow(window.innerWidth, 2)
                       ),
                       minHeight: Math.sqrt(
                          Math.pow(window.innerHeight, 2) +
                             Math.pow(window.innerWidth, 2)
                       ),
                       maxWidth: Math.sqrt(
                          Math.pow(window.innerHeight, 2) +
                             Math.pow(window.innerWidth, 2)
                       ),
                       maxHeight: Math.sqrt(
                          Math.pow(window.innerHeight, 2) +
                             Math.pow(window.innerWidth, 2)
                       ),
                       top: `-${Math.sqrt(
                        Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
                     )/2-window.innerHeight/2}px`,
                    }
                  : {
                     // left: -(
                     //      Math.sqrt(
                     //         Math.pow(window.innerHeight, 2) +
                     //            Math.pow(window.innerWidth, 2)
                     //      ) /
                     //         2 -
                     //      window.innerWidth / 2
                     //   ),
                       minHeight: 2.5 * window.innerWidth,
                       maxHeight: 2.5 * window.innerWidth,
                    }
            }
         >
            <p
               ref={textRef}
               className={`sticky top-0 flex h-screen min-w-[250vw] items-center bg-white text-[25vw] text-black ${isFill ? '' : 'rounded-full'}`}
            >
               HELLO WORLD
            </p>
         </div>
      </div>
   );
}
