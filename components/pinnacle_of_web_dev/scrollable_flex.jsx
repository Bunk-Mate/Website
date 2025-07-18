export default function Scrollable_Flex() {
   return (
      <main className="flex min-h-screen text-black">
         <div className="flex h-screen flex-col">
            <header className="flex h-12 items-center justify-center bg-gray-700 text-white">
               Header
            </header>
            <div className="flex grow overflow-hidden">
               <aside className="w-48 overflow-y-auto bg-gray-200">
                  <ul>
                     {Array.from({ length: 30 }).map((_, idx) => (
                        <li key={idx} className="p-2">
                           Menu Entry
                        </li>
                     ))}
                  </ul>
               </aside>
               <main className="flex flex-1 flex-col overflow-y-auto">
                  <div className="grow p-4">Large stuff here</div>
               </main>
               <aside className="w-48 overflow-y-auto bg-gray-200">
                  Another sidebar
               </aside>
            </div>
            <footer className="flex h-12 items-center justify-center bg-gray-700 text-white">
               Footer
            </footer>
         </div>
      </main>
   );
}
