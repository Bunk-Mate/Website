import { useEffect, useState, useContext } from 'react';
import { RefreshContext } from '@/app/_contexts/refresh';
import Popup from '../popup/popup';
import Drop from '../drop_select/drop_select';
import CheckSvg from '../svg/check';
import XSvg from '../svg/circle_x';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
   API_BASE_URL,
   ACCESS_TOKEN_NAME,
   ACCESS_TIMETABLE_NAME,
} from '@/app/_utils/api_constants';
import { useNotifications } from '@/app/_contexts/notification';

export default function AddNewSubs({ dateCurr, dateQuery }) {
   const [addNewSub, setAddNewSub] = useState('');
   const [newSub, setNewSub] = useState('');
   const [optionList, setOptionList] = useState([]);
   const [message, setMessage] = useState('Add another subject');
   const router = useRouter();
   const { addNotification } = useNotifications();
   // eslint-disable-next-line prettier/prettier
   const { refreshCourseList, setRefreshCourseList } =
      useContext(RefreshContext);

   useEffect(() => {
      if (dateQuery.length == 0) {
         setOptionList([
            { label: 'Monday', value: 1 },
            { label: 'Tuesday', value: 2 },
            { label: 'Wednesday', value: 3 },
            { label: 'Thursday', value: 4 },
            { label: 'Friday', value: 5 },
         ]);
         setMessage("Choose which week-day's timetable to use");
      } else if (message != 'Add another subject') {
         if (sessionStorage.getItem(ACCESS_TIMETABLE_NAME) != null) {
            const timetable = JSON.parse(
               sessionStorage.getItem(ACCESS_TIMETABLE_NAME)
            ).courses_data;
            setOptionList(getOptions({ timetable }));
         }
         setMessage('Add another subject');
      }
   }, [dateQuery]);

   useEffect(() => {
      if (addNewSub == 'Save') {
         if (newSub != '') {
            var payload = {};
            var endpoint = '';
            var [YYYY, MM, DD] = dateCurr.format('YYYY-MM-DD').split('-');
            var mydate = new Date(YYYY, MM - 1, DD);
            const header = {
               Authorization:
                  'Token ' +
                  JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
            };
            if (dateQuery.length == 0) {
               payload = {
                  day_of_week: newSub,
                  date: dateCurr.format('YYYY-MM-DD'),
               };
               endpoint = 'schedule_selector';
               sendDetailsToServer(endpoint, payload, header);
            } else {
               axios
                  .get(API_BASE_URL + '/courses', {
                     headers: header,
                  })
                  .then((response) => {
                     if (response.status == 200) {
                        let flag = false;
                        for (let i = 0; i < response.data.length; i++) {
                           if (response.data[i].name == newSub) {
                              payload = {
                                 date: dateCurr.format('YYYY-MM-DD'),
                                 course: response.data[i].id,
                                 status: 'present',
                              };
                              endpoint = 'sessions';
                              flag = true;
                              break;
                           }
                        }
                        if (!flag) {
                           payload = {
                              name: newSub,
                              schedules: {
                                 day_of_week: mydate.getDay(),
                              },
                           };
                           endpoint = 'courses';
                        }
                        sendDetailsToServer(endpoint, payload, header);
                     }
                  })
                  .catch((error) => {
                     addNotification('Request failed. Please try again.');
                     if (error.response && error.response.status == 401) {
                        router.push('/login');
                     }
                  });
            }
         } else {
            addNotification('Please fill the subject name.');
         }
      }
   }, [addNewSub]);

   const sendDetailsToServer = (endpoint, payload, header) => {
      axios
         .post(API_BASE_URL + '/' + endpoint, payload, {
            headers: header,
         })
         .then((response) => {
            if (response.status === 201) {
               if (endpoint == 'schedule_selector') {
                  addNotification('Schedule added.');
               } else if (endpoint == 'courses') {
                  addNotification('New course added.');
               } else {
                  addNotification('Course added.');
               }

               if (refreshCourseList == []) {
                  setRefreshCourseList(['hello']);
               } else {
                  setRefreshCourseList([]);
               }
               setNewSub('');
               setAddNewSub('');
               sessionStorage.removeItem(ACCESS_TIMETABLE_NAME);
            }
         })
         .catch((error) => {
            if (error.response) {
               addNotification('Request failed. Please try again.');
               if (error.response.status == 401) {
                  router.push('/login');
               }
            }
         });
   };

   const handleUpdate = ({ data }) => {
      if (data != null) {
         setNewSub(data.value);
      } else {
         setNewSub('');
      }
   };

   return (
      <>
         <div
            className={`mt-1 flex h-[8.9vw] rounded-[1vw] border-2 border-dashed border-[#727272] bg-[#0c0c0c] hover:bg-black max-sm:h-[15vh]`}
         >
            {addNewSub == '' ||
            addNewSub == 'Discard' ||
            addNewSub == 'Save' ? (
               <button
                  className={`flex flex-1 items-center rounded-l-lg px-[3vw] text-[1.5vw] text-[#727272] hover:text-white max-sm:text-3xl max-sm:font-light`}
                  onClick={() => {
                     setAddNewSub('Cancel');
                  }}
               >
                  {message}
               </button>
            ) : (
               <Drop
                  tableData={[{}]}
                  handleUpdate={handleUpdate}
                  row={0}
                  col={0}
                  statusman={true}
                  optionList={optionList}
                  setOptionList={setOptionList}
               ></Drop>
            )}
         </div>
         <div
            className={`flex justify-end ${addNewSub == '' || addNewSub == 'Discard' || addNewSub == 'Save' ? 'hidden' : ''}`}
         >
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
               <Popup
                  compToPass={<CheckSvg />}
                  setDecisionCheck={setAddNewSub}
                  message={{
                     message: 'Are you sure you want to save the changes?',
                     opt: ['Cancel', 'Save'],
                  }}
               />
            </div>
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
               <Popup
                  compToPass={<XSvg />}
                  setDecisionCheck={setAddNewSub}
                  message={{
                     message: 'Are you sure you want to discard the changes?',
                     opt: ['Cancel', 'Discard'],
                  }}
               />
            </div>
         </div>
      </>
   );
}

function getOptions({ timetable }) {
   var thirdparty = [];
   var options = [];
   for (let i = 0; i < timetable.length; i++) {
      for (let j = 0; j < timetable[i].length; j++) {
         if (!thirdparty.includes(timetable[i][j])) {
            thirdparty.push(timetable[i][j]);
         }
      }
   }
   for (let i = 0; i < thirdparty.length; i++) {
      if (thirdparty[i] != '') {
         options.push({ label: thirdparty[i], value: thirdparty[i] });
      }
   }
   return options;
}
