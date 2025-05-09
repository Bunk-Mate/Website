'use client';

import { useEffect, useRef, useState } from 'react';

export default function Coord() {
   const containerRef = useRef();
   const [dimer, setDim] = useState(0);
   const [parall, setParall] = useState('false');
   const scaleBoxRef = useRef(null);
   const scale = useRef(0);
   const dim = useRef(0);
   const cunt = useRef(0);

   useEffect(() => {
      const container = containerRef.current;
      const scalingEl = scaleBoxRef.current;
      // const textEl = textRef.current;

      // Set initial scale
      scalingEl.style.transform = 'scale(0)';
      scalingEl.style.transformOrigin = 'top center';

      const onScroll = () => {
         dim.current = container.getBoundingClientRect();
         cunt.current = scaleBoxRef.current.getBoundingClientRect();

         // console.log(dim.current.top)
         setDim(container.getBoundingClientRect());

         if (dim.current.top <= 0 && dim.current.bottom >= 0) {
            setParall('true');
            console.log('here', dim.current.top, dim.current.bottom);
         } else {
            setParall('false');
            console.log('here', dim.current.top);
            if (
               dim.current.top < window.innerHeight &&
               dim.current.bottom >= 0 &&
               1
               // cunt.current.bottom <= window.innerHeight
            ) {
               //scale
               // scalingEl.style.position = 'sticky';
               // scalingEl.style.bottom = '0px';
               const viewportHeight = window.innerHeight;
               const scrollProgress = 1 - dim.current.top / viewportHeight;
               scale.current = Math.max(scrollProgress, 0);
               console.log('scaling up ', scale.current, dim.current.top);
               scalingEl.style.transform = `scale(${scale.current})`;
            }
         }
      };

      onScroll();

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <div className="flex min-h-[300vh] flex-col bg-gradient-to-b from-black to-blue-300 px-10">
         <div
            ref={scaleBoxRef}
            className="sticky flex items-center justify-center rounded-full bg-gradient-to-b from-white to-green-500"
            style={{
               minHeight: Math.sqrt(
                  Math.pow(window.innerHeight, 2) +
                     Math.pow(window.innerWidth, 2)
               ),
               minWidth: Math.sqrt(
                  Math.pow(window.innerHeight, 2) +
                     Math.pow(window.innerWidth, 2)
               ),
               // top:
               //    -(
               //       Math.sqrt(
               //          Math.pow(window.innerHeight, 2) +
               //             Math.pow(window.innerWidth, 2)
               //       ) - window.innerHeight
               //    ) / 2,
            }}
         >
            <div
               ref={containerRef}
               style={{
                  minHeight: window.innerHeight,
                  minWidth: window.innerHeight,
               }}
               className="bg-gradient-to-b from-yellow-500 to-red-400"
            >
               hello
            </div>
         </div>
         <div className="fixed left-0 top-[20vh] bg-yellow-400 text-black">
            {dimer.top} <br />
            {parall}
         </div>
      </div>
   );
}
