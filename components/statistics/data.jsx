'use client';

import {
   ACCESS_TOKEN_NAME,
   API_BASE_URL,
   ACCESS_TIMETABLE_NAME,
} from '@/app/_utils/apiConstants';
import axios from 'axios';
import Graph from './graph';
import { useState, useEffect } from 'react';
import HeightLimit from '../height_limit_scrollable/heightLimit';
import { useRouter } from 'next/navigation';

export default function Data({ refreshCont }) {
   const [hw, setHw] = useState('50vh');
   const smRatio = 297;
   const lgRatio = 0.218;
   const [statData, setStatData] = useState([]);
   const [name, setName] = useState('');
   const [threshold, setThreshold] = useState(0);
   const router = useRouter();
   const header = {
      Authorization:
         'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
   };

   useEffect(() => {
      axios
         .get(API_BASE_URL + '/statquery', { headers: header })
         .then(function (response) {
            if (response.status === 200) {
               setStatData(response.data);
               //console.log("statdata", response.data)
            }
         })
         .catch(function (error) {
            console.error('Error fetching data:', error);
            if (error.response.status == 401) {
               router.push('/login');
            }
         });
   }, [refreshCont]);

   useEffect(() => {
      HeightLimit({ setHw, smRatio, lgRatio });
      //console.log('data')
      return () => {
         window.removeEventListener('resize', {});
      };
   }, []);

   useEffect(() => {
      const header = {
         Authorization:
            'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
      };
      axios
         .get(API_BASE_URL + '/collection', { headers: header })
         .then(function (response) {
            if (response.status === 200) {
               sessionStorage.setItem(
                  ACCESS_TIMETABLE_NAME,
                  JSON.stringify(response.data)
               );
               //console.log(response.data,'check this out')
               const str = response.data.name;
               if (str.indexOf(' ') != -1) {
                  var list = [
                     str.substring(0, str.indexOf(' ')),
                     str.substring(str.indexOf(' ') + 1),
                  ];
               } else {
                  var list = [str];
               }
               setName(list);
               setThreshold(response.data.threshold);
            } else {
               //console.log(response.data,'hhhhhh')
            }
         })
         .catch(function (error) {
            if (error.response.status == 401) {
               router.push('/login');
            }
            //console.log((error),'mmmmmm');
         });
   }, []);

   const avg = (key) => {
      let sum = 0;
      statData.forEach((sub) => {
         sum += sub[key];
      });
      return key == 'percentage' ? (sum / statData.length).toFixed(0) : sum;
   };

   return (
      <div className="mx-[3vw] flex h-full flex-1 flex-col font-light max-sm:m-5 max-sm:mb-0">
         <div className="mb-[1.5vw] max-sm:mb-2">
            <p className="text-[6vw] max-sm:text-6xl">
               {name[0]} <span className="font-thin">{name[1]}</span>
            </p>
         </div>
         <div className="flex">
            <div className="flex flex-[2] items-center">
               <p className="text-[4.3vw] leading-[1] max-sm:text-5xl">
                  {avg('percentage')}
                  <span className="text-[3vw] max-sm:text-4xl">%</span>
               </p>
               <p className="ml-4 text-[1.4vw] leading-[1.8vw] max-sm:ml-1 max-sm:text-sm max-sm:leading-4">
                  Overall
                  <br />
                  attendance
               </p>
            </div>
            <div className="flex flex-[3] items-center justify-start max-sm:justify-center">
               <p className="text-[4.3vw] leading-[1] max-sm:text-5xl">
                  {avg('bunks_available')}
                  <span className="text-[3vw] max-sm:text-4xl">b</span>
               </p>
               <p className="ml-4 text-[1.5vw] leading-[2vw] max-sm:ml-1 max-sm:text-sm max-sm:leading-4">
                  Overall
                  <br />
                  bunks left
               </p>
            </div>
            <div className="flex items-center text-center">
               <p className="ml-4 text-[1.5vw] leading-[2vw] max-sm:ml-1 max-sm:text-sm max-sm:leading-4">
                  Bunks
                  <br />
                  left
               </p>
            </div>
         </div>
         <div className="flex h-full flex-1" id="victimer">
            <div
               className="no-scrollbar flex h-full flex-1 overflow-auto"
               style={{ height: hw }}
            >
               <Graph
                  statData={statData}
                  threshold={threshold}
                  setThreshold={setThreshold}
               />
            </div>
         </div>
      </div>
   );
}
