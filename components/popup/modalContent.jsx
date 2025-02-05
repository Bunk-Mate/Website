export default function ModalContent({
   setShowModal,
   setDecisionCheck,
   props,
}) {
   return (
      <div className="absolute top-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
         <div className="flex min-h-36 min-w-[300px] flex-col bg-black md:min-h-[200px] md:min-w-[500px]">
            <div className="flex flex-1 items-center justify-center">
               {props.message}
            </div>
            <div className="flex">
               <button
                  className="m-3 flex-1"
                  onClick={() => {
                     setShowModal(false), setDecisionCheck(props.opt[0]);
                  }}
               >
                  {props.opt ? props.opt[0] : 'No'}
               </button>
               <button
                  className="m-3 flex-1 rounded-lg bg-red-400 py-3"
                  onClick={() => {
                     setShowModal(false), setDecisionCheck(props.opt[1]);
                  }}
               >
                  {props.opt ? props.opt[1] : 'Yes'}
               </button>
            </div>
         </div>
      </div>
   );
}
