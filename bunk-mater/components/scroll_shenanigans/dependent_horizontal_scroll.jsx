'use client'

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(ref.current.clientWidth-window.innerWidth);
  }, [setHeight]);

  return (
    <section ref={targetRef} className="relative text-black"
    style={{minHeight:`${height}px`}}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden ">
        <motion.div style={{ x }} className="flex whitespace-nowrap">
          <p ref={ref} className="text-[80vh] ml-[100vw] h-screen bg-white flex items-center">LET'S GO BUNKMATE</p>
          <div className="bg-white min-w-[100vw] min-h-[100vh] -mr-[100vw]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;