import axios from 'axios';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '@/app/_utils/apiConstants';
import DropTimetable from '../drop_select/drop_timetable_select';
import LoadTimetable from './load_timetable';
import { useNotifications } from '@/app/_contexts/notification';

async function getPublicTimetable({ addNotification }) {
   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };
   try {
      const response = await axios.get(API_BASE_URL + '/collections', {
         headers: header,
      });

      if (response.status === 200) {
         var timetable_list = [];
         for (var i = 0; i < response.data.length; i++) {
            timetable_list[i] = {
               value: response.data[i].name,
               label: response.data[i].name,
               id: response.data[i].id,
            };
         }
         return timetable_list;
      } else {
         addNotification('Failed to fetch preset timetable list');
         return [];
      }
   } catch (error) {
      addNotification('Error fetching preset timetable list');
      return [];
   }
}

export default function SearchTimetable({ router }) {
   const [optionList, setOptionList] = useState([]);
   const [selectedOption, setSelectedOption] = useState();
   const { addNotification } = useNotifications();

   useEffect(() => {
      async function getData() {
         const data = await getPublicTimetable({ addNotification });
         setOptionList(data);
      }
      getData();
   }, []);

   return (
      <div className="my-[2vw] flex text-[1.1vw] max-sm:text-lg max-[400px]:text-base sm:items-center sm:justify-center max-sm:flex-col max-sm:items-end px-4">
         <div className='max-sm:flex max-sm:justify-center max-sm:w-full sm:flex sm:items-center sm:justify-center'>
            <div className="mr-[1vw] flex flex-col sm:items-end max-sm:max-w-[37vw]">
               Load timetable
               <br />
               <span className="text-[#727272]">Use public timetable presets</span>
            </div>
            <DropTimetable
               optionList={optionList}
               selectedOption={selectedOption}
               setSelectedOption={setSelectedOption}
            />
         </div>
         <button
            type="button"
            onClick={() => {
               LoadTimetable({ selectedOption, router, addNotification });
            }}
            className="ml-[1vw] h-[3vw] max-sm:min-h-14 min-w-[5vw] rounded-md border border-solid border-[#3c3c3c] transition duration-300 hover:bg-white hover:text-black max-sm:min-w-32"
         >
            Load
         </button>
      </div>
   );
}
