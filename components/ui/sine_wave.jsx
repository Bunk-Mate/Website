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

export const SineWaveStatic = () => {
   const containerRef = useRef(null);
   const [points, setPoints] = useState([]);
   const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

   useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver(() => {
         const renderWidth = 150; // more points = smoother wave
         const viewHeight = 20;

         const amplitude = viewHeight * 0.4;
         const scaleY = viewHeight / 2;
         const wavelength = 40;
         const frequency = (2 * Math.PI) / wavelength;

         const newPoints = [];
         for (let x = 0; x <= renderWidth; x++) {
            const y = Math.sin(x * frequency) * amplitude + scaleY;
            newPoints.push(`${x},${y.toFixed(2)}`);
         }

         setPoints(newPoints);
         setDimensions({ width: renderWidth, height: viewHeight });
      });

      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
   }, []);

   return (
      <div ref={containerRef} className="h-[20px] w-full">
         <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
         >
            <polyline
               fill="none"
               stroke="#585858"
               strokeWidth="1"
               strokeLinejoin="round"
               strokeLinecap="round"
               points={points.join(' ')}
            />
         </svg>
      </div>
   );
};
