'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function HParallax() {
   const [h, setH] = useState(0);
   const [w, setW] = useState(0);
   const [activate, setActivate] = useState(false);
   const circleRef = useRef(null);
   const scrollDir = useRef('scrolling down');
   const offs = useRef(0);
   const winH = useRef(0);
   const winW = useRef(0);
   const prev = useRef(0);
   const [windH, setWindH] = useState(0);
   const horiRef = useRef(null);
   const [scrolledPast, setScrolledPast] = useState(false);
   const [stop, setStop] = useState(false);

   const scaleOffs = useRef(0);
   const hParallaxOffs = useRef(0);
   const hParallaxEnd = useRef(0);

   const [isFill, setIsFill] = useState(false);

   useEffect(() => {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateScrollDir = () => {
         const scrollY = window.scrollY;
         if (Math.abs(scrollY - lastScrollY) < 5) {
            ticking = false;
            return;
         }
         scrollDir.current =
            scrollY > lastScrollY ? 'scrolling down' : 'scrolling up';
         lastScrollY = scrollY > 0 ? scrollY : 0;
         ticking = false;
      };

      const onScroll = () => {
         if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
         }
      };

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   // this side effect deals with window dimension change events @OUTDATED
   useEffect(() => {
      winH.current = window.innerHeight;
      winW.current = window.innerWidth;
      ////console.log('setting windows', winH.current, winW.current)
      const handleResize = () => {
         setTimeout(() => {
            prev.current = winH.current;
            winH.current = window.innerHeight;
            winW.current = window.innerWidth;
            if (winH.current - prev.current != 0) {
               offs.current = offs.current + winH.current - prev.current;
            }
            ////console.log('firing resize', scrollY, offs.current, prev.current)
         }, 10);
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      //console.log('dir change to ', scrollDir);
   }, [scrollDir]);

   const handleScroll = () => {
      if (window.innerHeight >= window.innerWidth) {
         setH(
            () =>
               // (winH.current / winW.current) * (window.scrollY - offs.current)
               window.scrollY - offs.current
         );
         setW(
            () =>
               // (winH.current / winW.current) * (window.scrollY - offs.current)
               window.scrollY - offs.current
         );
         // //console.log('addition', scrollDir)
      } else {
         setH(
            () =>
               // (winW.current / winH.current) * (window.scrollY - offs.current)
               window.scrollY - offs.current
         );
         setW(() => window.scrollY - offs.current);
         // //console.log('subtraction', scrollDir)
      }
      //console.log(window.scrollY - offs.current, offs.current, window.scrollY);
      // //console.log(h,w)
   };

   useEffect(() => {
      if (offs.current == 0) {
         offs.current = window.scrollY;
      }
      console.log(activate, 'activate');
      if (activate) {
         //  console.log(activate,'activate')
         window.addEventListener('scroll', handleScroll);
      } else {
         setH(0);
         setW(0);
         window.removeEventListener('scroll', handleScroll);
      }
      return () => {
         setH(0);
         setW(0);
         window.removeEventListener('scroll', handleScroll);
      };
   }, [activate]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setActivate(entry.isIntersecting);
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (circleRef.current) {
         observer.observe(circleRef.current);
         ////console.log('observing')
      }

      return () => {
         if (circleRef.current) {
            observer.unobserve(circleRef.current);
            ////console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      setWindH(window.innerHeight);
      const handleResize = () => {
         setTimeout(() => {
            setWindH(window.innerHeight);
         }, 10);
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      if (h > Math.sqrt(Math.pow(windH, 2) + Math.pow(window.innerWidth, 2))) {
         if (!isFill) {
            setIsFill(true);
         }
      } else setIsFill(false);
      //console.log('fill status', isFill, horizontalOffs.current);
   }, [h, w]);

   useEffect(() => {
      if (isFill && scrolledPast) {
         scaleOffs.current = h / 1000;
         hParallaxOffs.current = h;
      }
      //   console.log(h - hParallaxOffs.current, 'here is translate offsest');
      //console.log("this is not supposed to be called like this", isFill)
   }, [isFill]);

   useEffect(() => {
      console.log('scrolled par', scrolledPast);
   }, [scrolledPast]);

   useEffect(() => {
      const onScroll = () => {
         if (horiRef.current) {
            const rect = horiRef.current.getBoundingClientRect();
            setScrolledPast(rect.left < 0); // top has gone above the screen
            //  console.log(rect.top, rect.left)
         }
         if (circleRef.current) {
            const rectEnd = circleRef.current.getBoundingClientRect();
            setStop(rectEnd.bottom < window.innerHeight);
            hParallaxEnd.current = h - hParallaxOffs.current;
            // console.log(rectEnd.right, "her eis end");
         }
      };

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   useEffect(() => {
      console.log('changed end ref', stop);
   }, [stop]);
   return (
      <div
         style={{
            minHeight: `${2.3 * window.innerWidth + Math.sqrt(Math.pow(windH, 2) + Math.pow(window.innerWidth, 2))}px`,
         }}
      >
         <div
            className={`flex justify-center`}
            ref={circleRef}
            style={{
               minHeight: `${2.3 * window.innerWidth + Math.sqrt(Math.pow(windH, 2) + Math.pow(window.innerWidth, 2))}px`,
            }}
         >
            <div
               // either make it sticky when not isFill and alter the circle size increase rate on smaller screens or go with curr
               className={`${!stop ? 'fixed' : 'sticky'} ${isFill ? '' : 'rounded-full'} bg-white ${h > windH ? (stop ? 'top-[50vh]' : 'top-[50vh] -translate-y-1/2') : 'bottom-0'} flex items-center justify-center overflow-hidden text-black`}
               style={{
                  minHeight: isFill ? '100vh' : `${h}px`,
                  maxHeight: isFill ? '100vh' : `${h}px`,
                  minWidth: isFill ? '0vw' : `${w}px`,
                  maxWidth: isFill ? '' : `${w}px`,
               }}
            >
               <div
                  className="text-[25vw]"
                  style={{
                     scale: isFill ? `${scaleOffs.current}` : `${h / 1000}`,
                     transform: !isFill
                        ? '0'
                        : !stop
                          ? `translate(-${h - hParallaxOffs.current}px)`
                          : `translate(-${hParallaxEnd.current}px)`,
                  }}
               >
                  <p
                     className=""
                     style={{
                        opacity: activate
                           ? isFill
                              ? 1
                              : Math.min(
                                   (2 * h) /
                                      Math.sqrt(
                                         windH ** 2 + window.innerWidth ** 2
                                      ),
                                   1
                                )
                           : 0,
                        transition: 'opacity 0.5s ease-in-out',
                     }}
                  >
                     <span ref={horiRef} className="invisible">
                        LET&apos;S&nbsp;GO&nbsp;BUNKMA
                     </span>
                     LET&apos;S&nbsp;GO&nbsp;BUNKMATE
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
