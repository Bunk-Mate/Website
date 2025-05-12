export default function FileTab({ props }) {
   return (
      <div className="relative z-10 flex">
         {/* <div className="relative flex h-[5vw] justify-center bg-red-100 overflow-hidden">
            <div className="m-auto h-[11vw] w-[5vw] translate-x-[7px] rotate-45 bg-black"></div>
         </div> */}
         <div className="flex h-[3vw] items-center rounded-tl-[20px] border-l border-t border-solid border-[#333333] bg-black/90 backdrop-blur-lg max-sm:h-[50px]">
            {props}
         </div>
         <div className="relative flex size-[3vw] justify-center overflow-hidden max-sm:size-[50px]">
            <div className="m-auto h-[6.5vw] w-[5vw] translate-x-[-7px] -rotate-45 border-r border-solid border-[#333333] bg-black/90 backdrop-blur-lg max-sm:min-h-[110px] max-sm:w-[50px]"></div>
         </div>
      </div>
   );
}
