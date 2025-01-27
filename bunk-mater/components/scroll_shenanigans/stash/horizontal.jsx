'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function HorizontalScroll({ activate, setActivate }) {
   const ref = useRef(null);
   const [scrollDir, setScrollDir] = useState('scrolling down');
   const offs = useRef(0);
   const [scrollerX, setScrollerX] = useState(0);
   const whiteRef = useRef(false);

   useEffect(() => {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateScrollDir = () => {
         const scrollY = window.scrollY;
         if (Math.abs(scrollY - lastScrollY) < 5) {
            ticking = false;
            return;
         }
         setScrollDir(
            scrollY > lastScrollY ? 'scrolling down' : 'scrolling up'
         );
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
      const observer = new IntersectionObserver(
         ([entry]) => {
            setActivate(entry.isIntersecting);
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (ref.current) {
         observer.observe(ref.current);
         //console.log('observing')
      }

      return () => {
         if (ref.current) {
            observer.unobserve(ref.current);
            //console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            //console.log('window updating white ref', entry.isIntersecting)
            whiteRef.current = entry.isIntersecting;
         },
         { root: null, rootMargin: '0px', threshold: 0 }
      );

      if (whiteRef.current) {
         observer.observe(whiteRef.current);
         //console.log('observing')
      }

      return () => {
         if (ref.current) {
            observer.unobserve(whiteRef.current);
            //console.log('not observing')
         }
      };
   }, []);

   useEffect(() => {
      //console.log('here is activate',activate,'\nhere is scroll',scrollDir)
      offs.current = window.scrollY;
      if (activate) {
         if (scrollDir == 'scrolling down') {
            window.addEventListener('scroll', handleScroll);
            //console.log('added window listener')
         } else if (scrollDir == 'scrolling up') {
            window.removeEventListener('scroll', handleScroll);
            //console.log('removed window listener')
         }
      } else if (whiteRef.current == true) {
         if (scrollDir) {
            window.addEventListener('scroll', handleScroll);
            //console.log('added in elseif window listener', whiteRef.current)
         }
      } else {
         window.removeEventListener('scroll', handleScroll);
      }
      return () => {
         //console.log('flushing window');
         window.removeEventListener('scroll', handleScroll);
      };
   }, [activate, scrollDir]);

   const handleScroll = () => {
      if (whiteRef.current == true) {
         //console.log('effect in place', whiteRef.current)
         if (scrollDir.current == 'scrolling down') {
            setScrollerX((scrollerX) => 1 * (window.scrollY - offs.current));
            //console.log('addition', scrollDir)
         } else {
            setScrollerX((scrollerX) => 1 * (window.scrollY - offs.current));
            //console.log('subttraction', scrollDir)
         }
         //console.log(window.scrollY-offs.current)
      }
   };

   return (
      <>
         <div className="h-[200vh]"></div>
         <div className="flex h-[100vh] w-[500vw] items-end bg-white text-3xl text-black">
            <div ref={ref} className="h-full w-[100vw] bg-blue-500"></div>
            <p
               ref={whiteRef}
               className="h-full bg-red-600"
               //style={{transform: `translateX(-${scrollerX}px)`}}
            >
               Text goes here Text goes here Text goes here Text goes here Text
               goes here Text goes here Text goes here Text goes here Text goes
               here
            </p>
            <div className="h-2 w-2 bg-blue-500"></div>
         </div>
         <div className="h-[200vh]"></div>
      </>
   );
}
