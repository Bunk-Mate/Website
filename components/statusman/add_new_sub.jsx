import { useEffect, useRef, useState } from 'react';
import Popup from '../popup/popup';
import Drop from '../drop_select/drop_select';
import CheckSvg from '../svg/check';
import XSvg from '../svg/x';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
   API_BASE_URL,
   ACCESS_TOKEN_NAME,
   ACCESS_TIMETABLE_NAME,
} from '@/app/_utils/apiConstants';
import SlideInNotifications from '../notifications/side_notification';

export default function AddNewSubs({
   dateCurr,
   dateQuery,
   refreshCont,
   setRefreshCont,
}) {
   const [addNewSub, setAddNewSub] = useState('');
   const [newSub, setNewSub] = useState('');
   const [optionList, setOptionList] = useState([]);
   const [message, setMessage] = useState('Add another subject');
   const router = useRouter();
   const notificationRef = useRef(null);

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
                        //console.log(response.data, 'response')
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
                     if (notificationRef.current) {
                        notificationRef.current.addNotif(
                           Math.random(),
                           'Request failed. Please try again.'
                        );
                     }
                     if (error.response && error.response.status == 401) {
                        router.push('/login');
                     }
                     //console.log(error.response.data);
                     //console.log(error.response.status)
                  });
            }
         } else {
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Please fill the subject name.'
               );
            }
            // alert('No empty subject name please.')
            //console.log(newSub, addNewSub, 'this')
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
               //console.log("subject updated")
               if (refreshCont == []) {
                  setRefreshCont(['hello']);
               } else {
                  setRefreshCont([]);
               }
               if (endpoint == 'schedule_selector') {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Schedule added.'
                     );
                  }
               } else if (endpoint == 'courses') {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'New course added.'
                     );
                  }
               } else {
                  if (notificationRef.current) {
                     notificationRef.current.addNotif(
                        Math.random(),
                        'Course added.'
                     );
                  }
               }
               setNewSub('');
               setAddNewSub('');
               sessionStorage.removeItem(ACCESS_TIMETABLE_NAME);
               //console.log('addnewsub getting reset again??')
            }
         })
         .catch((error) => {
            if (error.response) {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Request failed. Please try again.'
                  );
               }
               if (error.response.status == 401) {
                  router.push('/login');
               }
               //console.log(error.response.data);
               //console.log(error.response.status)
            }
         });
      //console.log(payload,'payload that posted');
      if (refreshCont == []) {
         setRefreshCont('Hello');
      } else {
         setRefreshCont([]);
      }
   };

   const handleUpdate = ({ data }) => {
      //console.log
      if (data != null) {
         setNewSub(data.value);
      } else {
         setNewSub('');
      }
   };

   return (
      <>
         <div
            className={`mt-1 flex h-[8.9vw] rounded-[1vw] border-[2px] border-dashed border-[#727272] bg-[#0c0c0c] hover:bg-black max-sm:h-[15vh]`}
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
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
               <Popup
                  compToPass={<CheckSvg />}
                  setDecisionCheck={setAddNewSub}
                  message={{
                     message: 'Are you sure you want to save the changes?',
                     opt: ['Cancel', 'Save'],
                  }}
               />
            </div>
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
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
         <SlideInNotifications ref={notificationRef} />
      </>
   );
}

function getOptions({ timetable }) {
   //console.log(timetable, 'here you go')
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
   //console.log(options, thirdparty)
   return options;
}
// function setOptions({setOptionList}){
//     var thirdparty=[];
//     var options=[]
//     const header={
//         'Authorization':'Token '+JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME))
//     }
//     axios.get(API_BASE_URL + '/courses', { headers: header })
//       .then(function(response){
//         if (response.status === 200) {
//             thirdparty=response.data;
//             for (let i=0; i<thirdparty.length; i++){
//                 if (!options.includes(thirdparty[i].name)){
//                     options.push({label: thirdparty[i]["name"], value: thirdparty[i]["name"]})
//                 }
//             }
//             setOptionList(options);
//           }
//         })
//         .catch(function(error) {
//           console.error("Error fetching data:", error);
//         }
//      );
// }
