'use client';

import { useState, useEffect, useContext } from 'react';
import XSvg from '@/components/svg/circle_x.jsx';
import CheckSvg from '@/components/svg/check.jsx';
import PlusSvg from '@/components/svg/plus.jsx';
import TrashSvg from '@/components/svg/trash.jsx';
import Drop from '@/components/drop_select/drop_select.jsx';
import Popup from '@/components/popup/popup.jsx';
import { useRouter } from 'next/navigation';
import HeightLimit from '@/components/height_limit_scrollable/heightLimit.js';
import { Fragment } from 'react';
import {
   ACCESS_TIMETABLE_NAME,
   API_BASE_URL,
   ACCESS_TOKEN_NAME,
} from '@/app/_utils/api_constants.js';
import axios from 'axios';
import { TimetableContext } from '@/app/_contexts/timetable';
import { useNotifications } from '@/app/_contexts/notification';

export default function EditTable() {
   const [tableData, setTableData] = useState([[]]);
   const [optionList, setOptionList] = useState([{}]);
   const router = useRouter();
   const [popupDecision, setPopupDecision] = useState(null);
   const [maxHeight, setMaxHeight] = useState('50vh');
   const smRatio = 212;
   const lgRatio = 0.1415;
   const { timetable, setTimetable } = useContext(TimetableContext);
   const { addNotification } = useNotifications();

   useEffect(() => {
      HeightLimit({ setHw: setMaxHeight, smRatio, lgRatio });
      return () => {
         window.removeEventListener('resize', {});
      };
   }, []);

   useEffect(() => {
      if (
         JSON.stringify(timetable) !=
         JSON.stringify([[null, null, null, null, null]])
      ) {
         setTableData(timetable);
         setOptionList(getOptions({ timetable }));
      }
   }, [timetable]);

   useEffect(() => {
      if (popupDecision == 'Save') {
         handleSaveTimetable();
      } else if (popupDecision == 'Discard') {
         addNotification('Changes discarded.');
         router.push('/dashboard/table');
      }
   }, [popupDecision]);

   const handleSaveTimetable = () => {
      const nullLessTableData = removeNull(tableData)
      addNotification('Request sent. Please wait.');
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      axios
         .patch(
            API_BASE_URL + '/collection',
            { courses_data: nullLessTableData },
            { headers: header }
         )
         .then((response) => {
            if (response.status == 200) {
               setTimetable(tableData);
               sessionStorage.removeItem(ACCESS_TIMETABLE_NAME);
               notify('Timetable updated.');
            }
            router.push('/dashboard/table');
         })
         .catch((error) => {
            notify('Request failed. Please try again.');
            if (error) {
               if (error?.response?.status == 401) {
                  router.push('/login');
               }
            }
         });
   };

   const notify = (message) => {
      addNotification(message);
   };

   const handleUpdate = ({ data, row, col }) => {
      var updatedTable = [...tableData];
      if (data != null) {
         updatedTable[row][col] = data.label;
      } else {
         updatedTable[row][col] = '';
      }
      setTableData(updatedTable);
   };

   const addRow = (rowIndex) => {
      const updatedTable = [...tableData];
      setTableData(
         updatedTable.toSpliced(rowIndex, 0, [null, null, null, null, null])
      );
   };

   const delRow = (rowIndex) => {
      const updatedTable = [...tableData];
      setTableData(updatedTable.toSpliced(rowIndex, 1));
   };

   return (
      <div className="flex h-full flex-col pt-[3vw]">
         {/* Mobile Save Options */}
         <div className="mb-5 mt-2 flex sm:hidden">
            <div className="mr-1 flex flex-1 items-center justify-end overflow-hidden rounded-full">
               <Popup
                  compToPass={
                     <div className="flex h-14 w-24 items-center justify-center rounded-full bg-[#1c1c1c]">
                        Save
                     </div>
                  }
                  setDecisionCheck={setPopupDecision}
                  message={{
                     message: 'Are you sure you want to save the changes?',
                     opt: ['Cancel', 'Save'],
                  }}
               />
            </div>
            <div className="ml-1 flex flex-1 items-center justify-start overflow-hidden rounded-full">
               <Popup
                  compToPass={
                     <div className="flex h-14 w-24 items-center justify-center rounded-full bg-[#2b1f1f]">
                        Cancel
                     </div>
                  }
                  setDecisionCheck={setPopupDecision}
                  message={{
                     message: 'Are you sure you want to discard the changes?',
                     opt: ['Cancel', 'Discard'],
                  }}
               />
            </div>
         </div>

         {/* Table Header */}
         <div className="flex justify-center">
            <table>
               <thead>
                  <tr className="text-[4vw] text-[#737373] max-sm:text-4xl">
                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                        <th
                           key={day}
                           className="w-[13vw] text-center font-light max-sm:w-[19.5vw]"
                        >
                           {day}
                        </th>
                     ))}
                  </tr>
               </thead>
            </table>
         </div>
         <div className="flex flex-[9] justify-center" id="victim">
            {/* Table Body */}
            <div
               className="no-scrollbar overflow-auto"
               style={{ maxHeight: `${maxHeight}` }}
            >
               <table className="w-[70.4vw] table-fixed border-separate max-sm:w-full">
                  <tbody>
                     {tableData.map((rowVal, rowId) => (
                        <Fragment key={rowId}>
                           {/* Row Mobile Options */}
                           <tr className="w-[4.7vw] max-sm:h-10 max-sm:w-full sm:hidden sm:h-[19.5vw]">
                              <td className="flex h-10 flex-1 items-end justify-center overflow-hidden rounded-full sm:size-16">
                                 <button
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
                              <td className="flex h-10 flex-1 items-end justify-center overflow-hidden rounded-full sm:size-16">
                                 <button
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
                              {/* Row Desktop Options */}
                              <td className="flex w-[4.7vw] flex-col items-end justify-center max-sm:hidden">
                                 <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
                                    <button
                                       onClick={() => {
                                          addRow(rowId);
                                       }}
                                       title="Add row"
                                    >
                                       <PlusSvg />
                                    </button>
                                 </div>
                                 <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
                                    <button
                                       onClick={() => {
                                          delRow(rowId);
                                       }}
                                       title="Delete row"
                                    >
                                       <TrashSvg />
                                    </button>
                                 </div>
                              </td>

                              {Object.values(rowVal).map(
                                 (cellValue, colIndex) => (
                                    <td
                                       key={colIndex}
                                       className={`size-[13vw] text-center max-sm:size-[19.5vw] ${tableData[rowId][colIndex] == null ? 'bg-[#0d0e0f] hover:bg-[#202224]' : 'bg-[#202224] hover:bg-[#292b2e]'} border border-black`}
                                    >
                                       <div>
                                          <Drop
                                             tableData={tableData}
                                             handleUpdate={handleUpdate}
                                             row={rowId}
                                             col={colIndex}
                                             statusman={false}
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

                     {/* Add Row At The End Option */}
                     <tr className="text-[1.5vw] font-light">
                        <td className="max-sm:hidden"></td>
                        <td className="flex size-[13vw] border border-black text-center max-sm:size-[19.5vw]">
                           <button
                              className="flex-1 bg-[#0d0e0f] hover:bg-[#202224] max-sm:bg-[#202224] max-sm:text-3xl"
                              onClick={() => {
                                 addRow(tableData.length);
                              }}
                           >
                              +
                           </button>
                        </td>
                     </tr>
                     <tr className="h-[50vh]"></tr>
                  </tbody>
               </table>
            </div>

            {/* Desktop Save Option */}
            <div className="max-sm:hidden">
               <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
                  <Popup
                     compToPass={<CheckSvg />}
                     setDecisionCheck={setPopupDecision}
                     message={{
                        message:
                           'Are you sure you want to save the changes? Warning: All the data of the previous timetable will be lost!',
                        opt: ['Cancel', 'Save'],
                     }}
                  />
               </div>
               <div className="flex size-16 items-center justify-center overflow-hidden rounded-full">
                  <Popup
                     compToPass={<XSvg />}
                     setDecisionCheck={setPopupDecision}
                     message={{
                        message:
                           'Are you sure you want to discard the changes?',
                        opt: ['Cancel', 'Discard'],
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
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
