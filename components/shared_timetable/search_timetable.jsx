import axios from 'axios';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '@/app/_utils/api_constants';
import DropTimetable from '@/components/drop_select/drop_timetable_select';
import LoadTimetable from '@/components/shared_timetable/load_timetable';
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
      <div className="my-[2vw] flex px-4 text-[1.1vw] max-sm:flex-col max-sm:items-end max-sm:text-lg max-[400px]:text-base sm:items-center sm:justify-center">
         <div className="max-sm:flex max-sm:w-full max-sm:justify-center sm:flex sm:items-center sm:justify-center">
            <div className="mr-[1vw] flex flex-col max-sm:max-w-[37vw] sm:items-end">
               Load timetable
               <br />
               <span className="text-[#727272]">
                  Use public timetable presets
               </span>
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
            className="ml-[1vw] h-[3vw] min-w-[5vw] rounded-md border border-solid border-[#3c3c3c] transition duration-300 hover:bg-white hover:text-black max-sm:min-h-14 max-sm:min-w-32"
         >
            Load
         </button>
      </div>
   );
}
