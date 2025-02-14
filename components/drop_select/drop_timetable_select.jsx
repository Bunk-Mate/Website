'use client';

import Select from 'react-select';
import { useEffect, useState } from 'react';

export default function DropTimetable({
   selectedOption,
   setSelectedOption,
   optionList,
}) {
   const [windowWidth, setWindowWidth] = useState(641);
   useEffect(() => {
      setWindowWidth(window.innerWidth);
   }, []);

   function handleSelect(data) {
      setSelectedOption(data);
   }

   return (
      <div>
         <Select
            options={optionList}
            placeholder={'Search Timetable'}
            value={selectedOption}
            onChange={handleSelect}
            isClearable={true}
            isSearchable={true}
            styles={{
               control: (baseStyles, state) =>
                  windowWidth < 640
                     ? {
                          ...baseStyles,
                          borderColor: state.isFocused ? 'white' : '#3a3a3a',
                          height: '56px',
                          width: '55vw',
                          backgroundColor: 'black',
                          color: '',
                          display: 'flex',
                          flexDirection: 'row',
                          overflow: 'scroll',
                          fontSize: '',
                          //wordBreak:"break-all"
                       }
                     : {
                          ...baseStyles,
                          borderColor: state.isFocused ? 'white' : '#3a3a3a',
                          height: '3vw',
                          width: '30vw',
                          backgroundColor: '',
                          display: 'flex',
                          fontSize: '',
                       },
               valueContainer: (baseStyles) =>
                  windowWidth < 640
                     ? {
                          ...baseStyles,
                          overflow: 'scroll',
                       }
                     : {
                          ...baseStyles,
                          overflow: 'auto',
                       },
               menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'black',
               }),
               option: (baseStyles, { isFocused, isSelected }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                     ? 'green'
                     : isFocused
                       ? '#00AA4A'
                       : undefined,
                  fontSize: '',
               }),
               placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: '#727272',
               }),
               singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: '#99FF9B',
               }),
               input: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                  fontSize: '',
               }),
            }}
         />
      </div>
   );
}
