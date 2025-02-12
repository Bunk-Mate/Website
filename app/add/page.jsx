'use client';

import { useState, useEffect, useRef } from 'react';
import PlusSvg from '../../components/svg/plus.jsx';
import TrashSvg from '../../components/svg/trash.jsx';
import Drop from '../../components/drop_select/drop_select.jsx';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import DateRangePicker from '@/components/date_range_picker/date_range_picker_legit.jsx';
import MinSubAttendance from '@/components/min_sub_attendance/min_sub_attendance.js';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../_utils/apiConstants.js';
import axios from 'axios';
import SlideInNotifications from '@/components/notifications/side_notification.jsx';
import CheckboxIcon from '@/components/ui/checkbox.jsx';

export default function Add() {
   const [tableData, setTableData] = useState([[null, null, null, null, null]]);

   const router = useRouter();
   const [name, setName] = useState('');
   const [optionList, setOptionList] = useState([]);
   const [interval, setInterval] = useState({
      start_date: '',
      end_date: '',
   });
   const [checked, setChecked] = useState(false);
   const [range, setRange] = useState(0);
   const [criteria, setCriteria] = useState({ value: 75 });
   const notificationRef = useRef(null);

   useEffect(() => {
      if (interval.start_date != '' && interval.end_date != '') {
         const start_date = new Date(interval.start_date);
         const end_date = new Date(interval.end_date);
         const time_range = Math.floor(
            (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24)
         );
         setRange(time_range);
      }
   }, [interval]);

   const handleUpdate = ({ data, row, col }) => {
      var thirdparty = tableData;
      if (data != null) {
         thirdparty[row][col] = data.label;
      } else {
         thirdparty[row][col] = '';
      }
      setTableData(thirdparty);
   };

   const handleSubmit = () => {
      const payload = {
         name: name,
         start_date: interval.start_date,
         end_date: interval.end_date,
         threshold: criteria.value,
         courses_data: removeNull(tableData),
         shared: checked,
      };
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      if (notificationRef.current) {
         notificationRef.current.addNotif(
            Math.random(),
            'Request sent. Please wait.'
         );
      }
      axios
         .post(API_BASE_URL + '/collection', payload, {
            headers: header,
         })
         .then(function (response) {
            if (response.status === 201) {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Created timetable.'
                  );
               }
               router.push('/dashboard/home');
            } else {
               if (notificationRef.current) {
                  notificationRef.current.addNotif(
                     Math.random(),
                     'Creation failed. Please try again.'
                  );
               }
            }
         })
         .catch(function (error) {
            if (error.response.status == 401) {
               router.push('/login');
            }
            if (notificationRef.current) {
               notificationRef.current.addNotif(
                  Math.random(),
                  'Request failed. Please try again.'
               );
            }
         });
   };

   const handleName = (e) => {
      setName(e.target.value);
   };
   const addRow = (index) => {
      const thirdparty = tableData;
      setTableData(
         thirdparty.toSpliced(index, 0, [null, null, null, null, null])
      );
   };

   const delRow = (index) => {
      const thirdparty = tableData;
      setTableData(thirdparty.toSpliced(index, 1));
   };

   return (
      <form className="no-scrollbar flex flex-1 flex-col overflow-auto">
         <div className="absolute bottom-0 z-[9] h-[10vh] w-screen bg-gradient-to-t from-black"></div>
         <div className="flex-1 pt-[3vw]"></div>
         <div className="flex sm:justify-center">
            <div className="mb-[1vw] w-[62vw]">
               <p className="text-[3vw] max-sm:mb-2 max-sm:ml-[4vw] max-sm:mt-6 max-sm:text-3xl">
                  Get started...
               </p>
            </div>
         </div>
         <div className="my-[2vw] flex flex-col text-[1.1vw] max-sm:text-lg max-[400px]:text-base sm:items-center sm:justify-center">
            <div className="mb-[2vw] flex justify-center max-sm:items-center">
               <div className="flex justify-center max-sm:flex-1">
                  <input
                     type="text"
                     id="table_name"
                     onChange={handleName}
                     value={name}
                     placeholder="Timetable Name"
                     className="mx-[1vw] min-w-[15vw] border-[1px] border-[#3a3a3a] bg-black pl-4 hover:border-white max-sm:min-h-14 max-sm:w-[45vw]"
                     required
                  />
               </div>
               <p className="max-sm:flex-1">
                  Timetable Name
                  <br />
                  <span className="text-[#727272]">
                     A name for your wonderful timetable.
                  </span>
               </p>
            </div>
            <div className="flex justify-center max-sm:flex-col sm:items-center">
               <div className="flex items-center max-sm:my-5 max-sm:flex-row-reverse">
                  <div className="mx-[2vw] flex flex-col items-center justify-center max-sm:flex-1">
                     <DateRangePicker
                        interval={interval}
                        setInterval={setInterval}
                     />
                  </div>
                  <p className="max-sm:flex-1 max-sm:text-right sm:max-w-[20vw]">
                     Timetable duration.
                     <br />
                     <span className="text-[#727272]">
                        Years? Months? Weeks? Days?
                     </span>
                  </p>
               </div>
               <MinSubAttendance
                  criteria={criteria}
                  setCriteria={setCriteria}
               />
            </div>
            <div className="mb-[6vw] mt-[2vw] text-[3vw] max-sm:flex max-sm:justify-center max-sm:py-7 max-sm:text-[40px]">
               {range} days
            </div>
         </div>
         <div className="sticky top-0 flex justify-center">
            <table>
               <thead>
                  <tr className="text-[4vw] text-[#737373] max-sm:text-4xl">
                     <th className="w-[13vw] font-light max-sm:w-[19.5vw]">
                        Mon
                     </th>
                     <th className="w-[13vw] font-light max-sm:w-[19.5vw]">
                        Tue
                     </th>
                     <th className="w-[13vw] font-light max-sm:w-[19.5vw]">
                        Wed
                     </th>
                     <th className="w-[13vw] font-light max-sm:w-[19.5vw]">
                        Thu
                     </th>
                     <th className="w-[13vw] font-light max-sm:w-[19.5vw]">
                        Fri
                     </th>
                  </tr>
               </thead>
            </table>
         </div>
         <div
            className="flex flex-[9] items-center justify-center"
            //id="victim"
         >
            {/* <div className="h-16 w-16"></div> */}
            <div
            //className="overflow-auto no-scrollbar"
            // style={{maxHeight:`${hw}`}}
            >
               <table className="w-[70.4vw] table-fixed border-separate max-sm:w-full">
                  <tbody>
                     {tableData.map((rowVal, rowId) => (
                        <Fragment key={rowId}>
                           <tr className="w-[4.7vw] max-sm:h-10 max-sm:w-full sm:hidden sm:h-[19.5vw]">
                              <td className="flex h-10 flex-1 items-end justify-center overflow-hidden rounded-full sm:h-16 sm:w-16">
                                 <button
                                    type="button"
                                    onClick={() => {
                                       addRow(rowId);
                                    }}
                                 >
                                    <PlusSvg />
                                 </button>
                              </td>
                              <td className="w-[19.5vw]"></td>
                              <td className="w-[19.5vw]"></td>
                              <td className="w-[19.5vw]"></td>
                              <td className="flex h-10 flex-1 items-end justify-center overflow-hidden rounded-full sm:h-16 sm:w-16">
                                 <button
                                    type="button"
                                    onClick={() => {
                                       delRow(rowId);
                                    }}
                                 >
                                    <TrashSvg />
                                 </button>
                              </td>
                           </tr>
                           <tr
                              key={rowId}
                              className="text-[1.5vw] font-light max-sm:text-lg"
                           >
                              <td className="flex w-[4.7vw] flex-col items-end justify-center max-sm:hidden">
                                 <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                                    <button
                                       type="button"
                                       onClick={() => {
                                          addRow(rowId);
                                       }}
                                    >
                                       <PlusSvg />
                                    </button>
                                 </div>
                                 <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                                    <button
                                       type="button"
                                       onClick={() => {
                                          delRow(rowId);
                                       }}
                                    >
                                       <TrashSvg />
                                    </button>
                                 </div>
                              </td>
                              {Object.values(rowVal).map(
                                 (cellValue, colIndex) => (
                                    <td
                                       key={colIndex}
                                       className={`h-[13vw] w-[13vw] text-center max-sm:h-[19.5vw] max-sm:w-[19.5vw] ${tableData[rowId][colIndex] == null ? 'bg-[#0d0e0f] hover:bg-[#202224]' : 'bg-[#202224] hover:bg-[#292b2e]'} border border-black`}
                                    >
                                       <div>
                                          <Drop
                                             tableData={tableData}
                                             handleUpdate={handleUpdate}
                                             row={rowId}
                                             col={colIndex}
                                             optionList={optionList}
                                             setOptionList={setOptionList}
                                          />
                                       </div>
                                    </td>
                                 )
                              )}
                           </tr>
                        </Fragment>
                     ))}
                     <tr className="text-[1.5vw] font-light">
                        <td className="max-sm:hidden"></td>
                        <td className="flex h-[13vw] w-[13vw] border border-black text-center max-sm:h-[19.5vw] max-sm:w-[19.5vw]">
                           <button
                              type="button"
                              className="flex-1 bg-[#0d0e0f] hover:bg-[#202224] max-sm:bg-[#202224] max-sm:text-3xl"
                              onClick={() => {
                                 addRow(tableData.length);
                              }}
                           >
                              +
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className="w-[2.7vw]"></div>
         </div>
         <div className="flex justify-center">
            <div className="flex items-center max-sm:mr-6 sm:w-[62vw] my-[1vw]">
               <CheckboxIcon checked={checked} setChecked={setChecked}/>
               <p className="ml-[1vw] text-[1.1vw] max-sm:text-lg max-[400px]:text-base">
                  Share timetable? <br />
                  <span className="text-[#727272]">
                     Make this timetable template public for everyone to use
                  </span>
               </p>
            </div>
         </div>
         <div className="flex justify-end sm:justify-center">
            <div className="flex justify-end max-sm:mr-6 sm:w-[62vw]">
               <button
                  type="button"
                  className="border-b-blueviolet border-r-blueviolet text-blueviolet hover:border-t-blueviolet hover:border-l-blueviolet rounded-lg border-[1px] border-l-white border-t-white bg-black p-4 text-[1.5vw] font-light transition duration-1000 hover:border-b-[#ee67ee] hover:border-r-[#ee67ee] hover:bg-white hover:text-black hover:shadow-[5px_5px_rgba(240,46,170,0.4),10px_10px_rgba(240,46,170,0.3),15px_15px_rgba(240,46,170,0.2)] max-sm:text-lg"
                  onClick={handleSubmit}
               >
                  Save Timetable
               </button>
            </div>
         </div>
         <div className="min-h-[20vh]"></div>
         <SlideInNotifications ref={notificationRef} />
      </form>
   );
}

function removeNull(tableData) {
   var nullLessTableData = tableData;
   for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < 5; j++) {
         if (nullLessTableData[i][j] == null) {
            nullLessTableData[i][j] = '';
         }
      }
   }
   return nullLessTableData;
}
