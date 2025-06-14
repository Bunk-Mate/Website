export default function LineGradient() {
   return (
      //   <div className="flex min-w-full flex-col">
      //      {[...Array(8)].map((_, i) => {
      //         const height = 10 - i * 1.2; // decreasing height
      //         const marginY = 0.5 + i * 0.5; // increasing margin
      //         const color = `rgb(${255 - i * 10}, ${255 - i * 10}, ${255 - i * 10})`; // fading from white to dark
      //         return (
      //            <div
      //               key={i}
      //               className="min-w-full"
      //               style={{
      //                  height: `${height}vw`,
      //                  marginTop: `${marginY}vw`,
      //                  marginBottom: `${marginY}vw`,
      //                  backgroundColor: color,
      //                  width: '28vw',
      //                  borderRadius: '0.5vw',
      //               }}
      //            />
      //         );
      //      })}
      //   </div>
      <div className="max-w-[100vw] overflow-x-hidden">
         <div className="ml-[-10vw] flex min-h-[30vw] min-w-[120vw] justify-center overflow-hidden bg-white ">
            {/* <p className="text-black bg-red-400">FEATURE</p> */}
         </div>
         <div className="ml-[-5vw] mt-[-4vw] min-h-[6vw] min-w-[120vw] rotate-[5deg] justify-center overflow-hidden bg-white "></div>
      </div>
   );
}
