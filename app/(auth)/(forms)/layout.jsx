import Carousel from '@/components/carousels/carousel';

export default function Layout({ children }) {
   return (
      <div className="flex min-h-screen max-md:flex-col">
         <div className="flex flex-1 md:items-center md:justify-end md:pl-[5vw]">
            <Carousel />
         </div>
         {children}
      </div>
   );
}
