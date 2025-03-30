export default function FileTab({ props }) {
   return (
      <div className="flex">
         <div className="relative m-auto flex size-[5vw] justify-center overflow-hidden">
            <div className="m-auto h-[11vw] w-[5vw] translate-x-[7px] rotate-45 bg-black"></div>
         </div>
         <div className="flex h-[5vw] items-center bg-black">{props}</div>
         <div className="relative m-auto flex size-[5vw] justify-center overflow-hidden">
            <div className="m-auto h-[11vw] w-[5vw] translate-x-[-7px] -rotate-45 bg-black"></div>
         </div>
      </div>
   );
}
