import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll() {
   const ref = useRef(null);
   const [scrollDir, setScrollDir] = useState('scrolling down');
   const offs = useRef(0);
   const [scrollerX, setScrollerX] = useState(0);
   const [activate, setActivate] = useState(false);
   const [height, setHeight] = useState(0);

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

   //   useEffect(()=>{
   //     if(window && height!=0){
   //     console.log(Math.floor(window.innerWidth*100/height-1)/100,'hello',height, window.innerWidth)}
   //   })

   useEffect(() => {
      let observer;
      if (height != 0) {
         observer = new IntersectionObserver(
            ([entry]) => {
               setActivate(entry.isIntersecting);
            },
            { root: null, rootMargin: '0px', threshold: 0 }
         );

         if (ref.current) {
            observer.observe(ref.current);
            //console.log('observing')
         }
      }

      return () => {
         if (ref.current && observer != undefined) {
            observer.unobserve(ref.current);
            //console.log('not observing')
         }
      };
   }, [height]);

   useEffect(() => {
      //console.log('here is activate',activate,'\nhere is scroll',scrollDir)
      offs.current = window.scrollY;
      if (activate) {
         //console.log("adding event listener")
         window.addEventListener('scroll', handleScroll);
      } else {
         window.removeEventListener('scroll', handleScroll);
      }
      return () => {
         //console.log('flushing window');
         window.removeEventListener('scroll', handleScroll);
      };
   }, [activate]);

   const handleScroll = () => {
      //console.log('effect in place')
      if (offs.current < window.scrollY) {
         setScrollerX((scrollerX) => -window.scrollY + offs.current);
      } else {
         setScrollerX(
            (scrollerX) =>
               -window.scrollY + offs.current - height - window.innerHeight
         );
      }
      //console.log('addition', scrollDir)
      //console.log(window.scrollY-offs.current)
   };

   useEffect(() => {
      setHeight(ref.current.clientWidth - window.innerWidth);
   }, [setHeight]);

   useEffect(() => {
      window.onbeforeunload = () => {
         window.scrollTo(0, 0);
      };
   });

   return (
      <div className="h-[500vh]">
         <div className="h-[150vh]"></div>
         <div style={{ minHeight: `${height}px` }}>
            <div
               ref={ref}
               className="sticky top-0 inline-block h-screen whitespace-nowrap bg-blue-600 text-[60vw]"
               style={{ transform: `translate(${scrollerX}px)` }}
            >
               <p
                  className="flex h-full items-center"
                  style={{
                     paddingLeft: `${window.innerHeight + window.innerWidth}px`,
                     paddingRight: `${window.innerHeight + window.innerWidth}px`,
                  }}
               >
                  LET&apos;S GO BUNK-MATE
               </p>
            </div>
         </div>
         <div className="h-[150vh] bg-red-600"></div>
      </div>
   );
}
