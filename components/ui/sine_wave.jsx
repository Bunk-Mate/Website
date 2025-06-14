import { useEffect, useRef, useState } from 'react';

export const SineWave = () => {
   const width = 1000;
   const height = 80;
   const scaleY = height / 2;

   const [points, setPoints] = useState([]);
   const phaseRef = useRef(0);

   useEffect(() => {
      let animationFrame;

      const animate = () => {
         const newPoints = [];
         const phase = phaseRef.current;
         for (let x = 0; x <= width; x++) {
            const t = 1 - x / width;
            const sm = window.innerWidth < 680 ? 0.5 : 1;

            const frequency = (1 - t) ** 2 * 4 * sm;
            const amplitude = (1 - t) ** 4 * scaleY;

            const y =
               Math.sin(x * frequency * 0.001 * Math.PI * 2 - phase) *
                  amplitude +
               scaleY;

            newPoints.push(`${x},${y.toFixed(2)}`);
         }

         setPoints(newPoints);
         phaseRef.current += 0.05; // wave speed
         animationFrame = requestAnimationFrame(animate);
      };

      animate();

      return () => cancelAnimationFrame(animationFrame);
   }, []);

   return (
      <svg
         width="100%"
         height={height}
         viewBox={`0 0 ${width} ${height}`}
         preserveAspectRatio="none"
         className="rotate-180"
      >
         <polyline
            fill="none"
            stroke="#ffffffb9"
            strokeWidth="2"
            points={points.join(' ')}
         />
      </svg>
   );
};
