'use client';

// import { useState } from 'react';
import Parallax from './parallax';
// import Circle from './circle';
// import HorizontalScrollCarousel from './dependent_horizontal_scroll';
import Coord from "./coord";

export default function NewCircle() {
   // const [isFill, setIsFill] = useState(false);
   return (
      <div className="min-h-[900vh] bg-gradient-to-r from-black to-white">
         <div className='min-h-[150vh]'></div>
         <Coord/>
         {/* <Parallax/> */}
         {/* <Circle/> */}
      </div>
   );
}
