import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function BasicDatePicker({ dateCurr, setDateCurr }) {
   // //console.log(typeof (dateCurr), dateCurr.format("DD-MM-YYYY"), "in basicdatepicker")
   const color = 'white';
   const newTheme = (theme) =>
      createTheme({
         ...theme,
         components: {
            MuiOutlinedInput: {
               styleOverrides: {
                  root: {
                     color: '#1c1c1c',
                     borderRadius: '2px',
                     borderWidth: '1px',
                     borderColor: '#1c1c1c',
                     border: '1px solid',
                     backgroundColor: '#1c1c1c',
                  },
               },
            },
            MuiInputLabel: {
               styleOverrides: {
                  root: {
                     color,
                  },
               },
            },
            MuiIconButton: {
               styleOverrides: {
                  root: {
                     color,
                  },
               },
            },
            MuiOutlinedInput: {
               styleOverrides: {
                  root: {
                     color,
                  },
               },
            },
         },
      });
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['DatePicker']}>
            <ThemeProvider theme={newTheme}>
               <DatePicker
                  label="REWIND TIME"
                  value={
                     dateCurr.format('DD-MM-YYYY') ===
                     dayjs().format('DD-MM-YYYY')
                        ? null
                        : dateCurr
                  }
                  onChange={(newValue) => setDateCurr(newValue)}
               />
            </ThemeProvider>
         </DemoContainer>
      </LocalizationProvider>
   );
}
