export default function fiddler() {
   return (
      <>
         fiddler2
         <div className="flex">
            <div class="relative m-auto flex h-[5vw] w-[5vw] justify-center overflow-hidden">
               <div class="m-auto h-[11vw] w-[5vw] translate-x-[7px] rotate-45 bg-blue-400"></div>
            </div>
            <div class="m-auto h-[5vw] w-[5vw] bg-blue-400">d</div>
            <div class="relative m-auto flex h-[5vw] w-[5vw] justify-center overflow-hidden">
               <div class="m-auto h-[11vw] w-[5vw] -translate-x-[7px] -rotate-45 bg-blue-400"></div>
            </div>
            <div class="flex-1"></div>
         </div>
      </>
   );
}
