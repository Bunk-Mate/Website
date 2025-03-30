export default function FileTab({ props }) {
   return (
      <div className="flex relative z-10">
         {/* <div className="relative flex h-[5vw] justify-center bg-red-100 overflow-hidden">
            <div className="m-auto h-[11vw] w-[5vw] translate-x-[7px] rotate-45 bg-black"></div>
         </div> */}
         <div className="flex h-[3vw] max-sm:h-[50px] items-center rounded-tl-[20px] backdrop-blur-lg bg-black/90 border-t-[1px] border-l-[1px] border-[#333333] border-solid">{props}</div>
         <div className="relative flex size-[3vw] max-sm:size-[50px] justify-center overflow-hidden">
            <div className="m-auto h-[6.5vw] w-[5vw] max-sm:w-[50px] max-sm:min-h-[110px] -translate-x-[7px] -rotate-45 backdrop-blur-lg bg-black/90 border-r-[1px] border-[#333333] border-solid"></div>
         </div>
      </div>
   );
}
