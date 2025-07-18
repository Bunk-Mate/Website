export default function HeightLimit({ setHw, smRatio, lgRatio }) {
   if (window.innerWidth > 640) {
      setHw(
         parseInt(window.innerHeight - lgRatio * window.innerWidth).toString() +
            'px'
      );
   } else {
      setHw(parseInt(window.innerHeight - smRatio).toString() + 'px');
   }
   window.addEventListener('resize', () => {
      setTimeout(() => {
         if (window.innerWidth > 640) {
            setHw(
               parseInt(
                  window.innerHeight - lgRatio * window.innerWidth
               ).toString() + 'px'
            );
         } else {
            setHw(parseInt(window.innerHeight - smRatio).toString() + 'px');
         }
      }, 10);
   });
}
