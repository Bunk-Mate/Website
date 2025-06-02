'use client';
import { useEffect, useRef, useState } from 'react';

export default function Parallax() {
   const containerRef = useRef(null);
   const scalingRef = useRef(null);
   const textRef = useRef(null);
   const [isFill, setIsFill] = useState(true);
   const [setActivate] = useState(false);
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
      }

      return () => {
         if (scalingRef.current) {
            observer.unobserve(scalingRef.current);
         }
      };
   }, []);

   useEffect(() => {
      const container = containerRef.current;
      const scalingEl = scalingRef.current;
      // const textEl = textRef.current;

      // Set initial scale
      scalingEl.style.transform = 'scale(0)';
      scalingEl.style.transformOrigin = 'top center';

      const onScroll = () => {
         // Use the container as a measuring point (doesn't get scaled)
         const containerRect = container.getBoundingClientRect();
         // const textRect = textEl.getBoundingClientRect();

         if (containerRect.top <= window.innerHeight) { // if container is scrolled past
            if (containerRect.top <= -1*((Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)) - window.innerHeight))){ // if greater than inscription radius
               // setIsFill(true);
               // console.log(containerRect.top, -1*((Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)) - window.innerHeight)/2))
            } else { // scale till inscription radius
               setIsFill(false);
               const viewportHeight = window.innerHeight;
               const scrollProgress = 1 - containerRect.top / viewportHeight;
               scale.current = (Math.max(scrollProgress, 0));
               // console.log('scaling up ', scale.current, containerRect.top);
               scalingEl.style.transform = `scale(${scale.current})`;
            }
         }
      };

      onScroll();

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <div
         ref={containerRef}
         className="relative flex min-h-[2px] max-w-[100vw] bg-red-500"
         style={{}}
      >
         <div
            ref={scalingRef}
            // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
            className={`absolute flex w-full overflow-clip rounded-full bg-gradient-to-r from-black to-blue-300`}
            style={
               isFill?{}:
               {
                  minHeight: window.innerHeight,
                  minWidth: window.innerHeight,
                  // left: -window.innerWidth/2
                  // left: -(
                  //    Math.sqrt(
                  //       Math.pow(window.innerHeight, 2) +
                  //          Math.pow(window.innerWidth, 2)
                  //    ) /
                  //       2 -
                  //    window.innerWidth / 2
                  // ),
               }
            }
         >
            <p
               ref={textRef}
               className={`sticky top-0 flex min-w-[250vw] items-center bg-white text-[25vw] text-black`}
            >
               HELLO WORLD
            </p>
         </div>
      </div>
   );
}
