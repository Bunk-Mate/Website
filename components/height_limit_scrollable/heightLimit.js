export default function HeightLimit({ setHw, smRatio, lgRatio }) {
   // const elem=document.getElementById('victim');
   // const rect=elem.getBoundingClientRect();
   // const thirdparty=(Math.floor(rect["height"])).toString()+"px";
   // setHw(thirdparty);
   // const rcvr=document.getElementById("reciever")
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
         // //console.log(window.innerHeight-0.1*window.innerWidth, "hw:",hw);
         if (window.innerWidth > 640) {
            setHw(
               parseInt(
                  window.innerHeight - lgRatio * window.innerWidth
               ).toString() + 'px'
            );
         } else {
            setHw(parseInt(window.innerHeight - smRatio).toString() + 'px');
         }
         //reciever.style.height=(parseInt(window.innerHeight-0.14*window.innerWidth-2)).toString()+"px";
         //ref.current.style.height=(parseInt(window.innerHeight-0.14*window.innerWidth-2)).toString()+"px";
      }, 10);
   });
}
