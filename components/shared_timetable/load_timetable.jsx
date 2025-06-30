import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/api_constants';

export default async function LoadTimetable({
   selectedOption,
   router,
   addNotification,
}) {
   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };
   const payload = { copy_id: selectedOption.id };
   try {
      addNotification('Loading Timetable...');
      const response = await axios.post(
         API_BASE_URL + '/collection_selector',
         payload,
         { headers: header }
      );
      if (response.status === 201) {
         addNotification('Preset timetable loaded successfully');
         router.push('/dashboard');
      } else {
         addNotification('Failed to load timetable');
      }
   } catch (error) {
      addNotification('Error loading timetable');
   }
}
