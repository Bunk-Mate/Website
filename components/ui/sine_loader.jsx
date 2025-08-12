import { useState, useRef, useEffect } from 'react';

export const SineWaveLoader = ({ progress = 0.5 }) => {
   const containerRef = useRef(null);
   const [width, setWidth] = useState(0);
   const height = 25;
   const scaleY = height / 2;
   const strokeWidth = 8;
   const [points, setPoints] = useState([]);
   const phaseRef = useRef(0);

   useEffect(() => {
      const updateWidth = () => {
         if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
         }
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
   }, []);

   useEffect(() => {
      if (width === 0) return;

      let animationFrame;

      const animate = () => {
         const newPoints = [];
         const phase = phaseRef.current;
         const sm = window.innerWidth < 680 ? 0.5 : 1;

         const cycles = sm * 8; // number of peaks(crest and trough)
         const frequency = (cycles * 2 * Math.PI) / width;
         const amplitude = scaleY - strokeWidth;

         const endX = strokeWidth + (width - strokeWidth * 2) * progress;

         for (let x = strokeWidth; x <= endX; x++) {
            const y = Math.sin(x * frequency - phase) * amplitude + scaleY;
            newPoints.push(`${x},${y.toFixed(2)}`);
         }

         setPoints(newPoints);
         phaseRef.current += 0.1; // wave speed
         animationFrame = requestAnimationFrame(animate);
      };

      animate();
      return () => cancelAnimationFrame(animationFrame);
   }, [width, progress, scaleY]);

   return (
      <div ref={containerRef} className="w-full">
         {width > 0 && (
            <svg
               width="100%"
               height={height}
               viewBox={`0 0 ${width} ${height}`}
               preserveAspectRatio="none"
            >
               <polyline
                  fill="none"
                  stroke="#ffffffb9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={strokeWidth}
                  points={points.join(' ')}
               />
               <rect
                  x={`${
                     strokeWidth +
                     (width - strokeWidth * 2) * progress +
                     strokeWidth
                  }`}
                  y={height / 2 - strokeWidth / 2}
                  width={
                     strokeWidth +
                     (width - strokeWidth * 2) * (1 - progress) -
                     strokeWidth
                  }
                  height={1.2 * strokeWidth}
                  rx={strokeWidth / 2}
                  fill="#4B5563"
               />
            </svg>
         )}
      </div>
   );
};
