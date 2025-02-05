// import { useEffect, useRef } from "react"

// export default function Scroller(){
//     const scrollRef = useRef(null);
//     useEffect(()=>{
//         const handleScroll=()=>{
//             console.log('here')
//         }
//         window.addEventListener(scroll,handleScroll())
//         return(()=>{
//             window.removeEventListener(scroll, handleScroll())
//         })
//     },[])
//     return(
//         <div ref={scrollRef}></div>
//     )
// }
'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function HorizontalScroll({ activate, setActivate }) {
   // const ref = useRef(null);
   // const [scrollerX, setScrollerX] = useState(0);
   // // const [activate, setActivate] = useState(false);
   // let test = 0
   // useEffect(()=>{
   //     console.log('something comes up')
   //     const handleScroll=(event)=>{
   //         setTimeout(()=>{

   //             const { deltaX, deltaY } = event;
   //             setScrollerX(scrollerX => scrollerX-deltaY)

   //             // Log the values of deltaX and deltaY
   //             console.log('deltaX:', deltaX);
   //             console.log('deltaY:', deltaY);
   //             console.log(deltaX,deltaY,"print deltay here")
   //             // ref.translate(10)
   //         },100)
   //     }
   //     if(activate){
   //         window.addEventListener("wheel", handleScroll)
   //     }else{
   //         window.removeEventListener("wheel", handleScroll)
   //     }
   //     return(()=>{
   //         window.removeEventListener("wheel", handleScroll)
   //     })
   // },[activate])

   // useEffect(()=>{
   //     console.log(activate,'activate?')
   // },[activate])

   // useEffect(() => {
   //     const observer = new IntersectionObserver(
   //       ([entry]) => {
   //         setActivate(entry.isIntersecting);
   //       },
   //       { root: null, rootMargin: '0px', threshold: 0 }
   //     );

   //     if (ref.current) {
   //       observer.observe(ref.current);
   //       console.log('observing')
   //     }

   //     return () => {
   //       if (ref.current) {
   //         observer.unobserve(ref.current);
   //         console.log('not observing')
   //       }
   //     };
   //   }, []);
   const [scrollerX, setScrollerX] = useState(10);
   // const [w, setW] = useState(10);
   // const [activate, setActivate] = useState(true)
   const ref = useRef(null);
   const startRef = useRef(false);
   const stopRef = useRef(false);
   const scrollDir = useRef('scrolling down');
   const offs = useRef(null);

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

   useEffect(() => {
      //console.log('dir change to ', scrollDir)
   }, [scrollDir]);
   const handleScroll = () => {
      // console.log('here')
      if (scrollDir.current == 'scrolling down') {
         setScrollerX((scrollerX) => 1 * (window.scrollY - offs.current));
         // setW(w => 1*(window.scrollY-offs.current));
         //console.log('addition', scrollDir)
      } else {
         setScrollerX((scrollerX) => 1 * (window.scrollY - offs.current));
         // setW(w => 1*(window.scrollY-offs.current));
         //console.log('subttraction', scrollDir)
      }
      //console.log(window.scrollY-offs.current)
      // console.log(h,w)
   };
   useEffect(() => {
      offs.current = window.scrollY;

      if (activate) {
         if (scrollDir.current == 'scrolling down') {
            //console.log(activate,'activate')
            window.addEventListener('scroll', handleScroll);
         }
      } else {
         if (scrollDir.current == 'scrolling up') {
            //console.log(activate,'activate dea')
            window.removeEventListener('scroll', handleScroll);
         }
      }
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [activate]);

   // useEffect(() => {
   //     const observer = new IntersectionObserver(
   //         ([entry]) => {
   //         setActivate(entry.isIntersecting);
   //         },
   //         { root: null, rootMargin: '0px', threshold: 0 }
   //     );

   //     if (ref.current) {
   //         observer.observe(ref.current);
   //         console.log('observing')
   //     }

   //     return () => {
   //         if (ref.current) {
   //         observer.unobserve(ref.current);
   //         console.log('not observing')
   //         }
   //     };
   //     }, []);

   useEffect(() => {
      const startObserver = new IntersectionObserver(
         ([entry]) => {
            startRef.current = entry.isIntersecting;
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      const stopObserver = new IntersectionObserver(
         ([entry]) => {
            stopRef.current = entry.isIntersecting;
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (startRef.current) {
         startObserver.observe(startRef.current);
         //console.log('observing')
      }
      if (stopRef.current) {
         stopObserver.observe(stopRef.current);
         //console.log('observing')
      }

      return () => {
         if (startRef.current || stopRef.current) {
            startObserver.unobserve(startRef.current);
            stopObserver.unobserve(stopRef.current);
            //console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      //console.log(activate,'here is activate')
   }, [activate]);

   return (
      <div className="flex h-[800vh] flex-col justify-center overflow-x-hidden">
         <div className="flex-1">
            <div className="min-h-[20vh] min-w-[20vh] bg-white"></div>
            <div className="min-h-[20vh] min-w-[20vh] bg-red-600"></div>
         </div>
         <div className={`${activate ? 'fixed bottom-0' : 'block'}`}>
            <div
               ref={ref}
               className={`flex items-center justify-center bg-white text-[3vw] text-black`}
               style={{
                  transform: `translateX(-${scrollerX}px)`,
               }}
            >
               <div ref={startRef} className="h-[100vh] w-2 bg-blue-600"></div>
               <p className="h-screen w-[400vh]">
                  (Your text goes here. Your text goes here. Your text goes
                  here. Your text goes here.)
               </p>
               <div ref={stopRef} className="h-[100vh] w-2 bg-blue-600"></div>
            </div>
         </div>
         <div className="flex flex-1 items-end">
            <div className="min-h-[20vh] min-w-[20vh] bg-white"></div>
            <div className="min-h-[20vh] min-w-[20vh] bg-blue-900"></div>
         </div>
      </div>
   );
}
