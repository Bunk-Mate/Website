'use client';

import { motion, useScroll } from 'framer-motion';

export default function CircleScale() {
   const { scrollYProgress } = useScroll();

   return (
      <div className="h-[500vh]">
         <div className="flex h-[50vh] items-center justify-center"></div>
         <motion.div
            className="fixed top-[50vh] min-h-10 min-w-10 translate-y-1/2 bg-white"
            style={{
               scaleX: scrollYProgress,
               scaleY: scrollYProgress,
            }}
         ></motion.div>
         {/* <div className="flex justify-center h-[200vh] -mb-[100vh] max-sm:-mb-[150vh]" ref={circleRef}
        //style={{height:`${Math.round(Math.sqrt((window.innerHeight)**2+(window.innerWidth)**2))}px`}}
        >
            <div className={`bg-white rounded-full fixed ${h>window.innerHeight?'transform -translate-y-1/2 top-[50vh]':'bottom-0'}`}
            style={{minHeight: `${h}px`, minWidth: `${w}px`}}
            ></div>
        </div> */}
         {/* <div className={`flex justify-center bg-blue-600 transform ${h>window.innerHeight?"fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-[50vh]":"bottom-0"}`}>
            <div ref={circleRef} className="bg-white transition rounded-full" style={{minHeight: `${h}px`, minWidth: `${w}px`}}></div>
        </div> */}
         {/* <div className="h-[200vh]"></div> */}
      </div>
   );
}
