import { TimetableProvider } from '@/app/_contexts/timetable';

export default function Layout({ children }) {
   return (
      <div className="h-full bg-black">
         <TimetableProvider>{children}</TimetableProvider>
      </div>
   );
}
