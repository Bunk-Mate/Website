import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/apiConstants';

export default async function LoadTimetable({
   selectedOption,
   router,
   notificationRef,
}) {
   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };
   const payload = { copy_id: selectedOption.id };
   try {
      if (notificationRef.current) {
         notificationRef.current.addNotif(
            Math.random(),
            'Loading Timetable...'
         );
      }
      const response = await axios.post(
         API_BASE_URL + '/collection_selector',
         payload,
         { headers: header }
      );
      if (response.status === 201) {
         if (notificationRef.current) {
            notificationRef.current.addNotif(
               Math.random(),
               'Preset timetable loaded successfully'
            );
         }
         router.push('/dashboard');
      } else {
         if (notificationRef.current) {
            notificationRef.current.addNotif(
               Math.random(),
               'Failed to load timetable'
            );
         }
      }
   } catch (error) {
      if (notificationRef.current) {
         notificationRef.current.addNotif(
            Math.random(),
            'Error loading timetable'
         );
      }
   }
}
