import { useRef } from 'react';
import {
   motion,
   useScroll,
   useSpring,
   useTransform,
   useMotionValue,
   useVelocity,
   useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

function ParallaxText({ children, baseVelocity = 100 }) {
   const baseX = useMotionValue(0);
   const { scrollY } = useScroll();
   const scrollVelocity = useVelocity(scrollY);
   const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
   });
   const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
   });

   const x = useTransform(baseX, (v) => `${wrap(0, -40, v)}%`);

   const directionFactor = useRef(1);
   useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
         directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
         directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
   });

   return (
      <div className="parallax min-w-[101vw] overflow-x-hidden">
         <motion.div className="scroller flex" style={{ x }}>
            <span>{children} </span>
            <span>{children} </span>
            <span>{children} </span>
            <span>{children} </span>
         </motion.div>
      </div>
   );
}

export default function FeatureStrip() {
   return (
      <section className="flex min-h-[34vw] flex-col items-center justify-center overflow-hidden">
         <div className="flex rotate-[-5deg] bg-neutral-500 text-black">
            <ParallaxText baseVelocity={-5}>
               <div className="flex items-center text-black">
                  <p className="ml-[2vw] text-[5vw]">BUNKMATE</p>
                  <div className="ml-[2vw] min-h-[4vw] min-w-[4vw] rounded-full bg-black"></div>
                  <p className="ml-[2vw] text-[5vw]">FEATURE</p>
                  <div className="ml-[2vw] min-h-[4vw] min-w-[4vw] rounded-full bg-black"></div>
               </div>
            </ParallaxText>
         </div>
         <div className="h-[23vw] w-[110vw] rotate-[5deg]"></div>
         <div className="mt-[-21vw] flex rotate-[5deg] bg-neutral-950 text-neutral-500">
            <ParallaxText baseVelocity={5}>
               <div className="flex items-center">
                  <p className="ml-[2vw] text-[5vw]">BUNKMATE</p>
                  <div className="ml-[2vw] min-h-[4vw] min-w-[4vw] rounded-full bg-neutral-500"></div>
                  <p className="ml-[2vw] text-[5vw]">FEATURE</p>
                  <div className="ml-[2vw] min-h-[4vw] min-w-[4vw] rounded-full bg-neutral-500"></div>
               </div>
            </ParallaxText>
         </div>
      </section>
   );
}
