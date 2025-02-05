import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function BasicDatePicker({ mssg, setDateCurr }) {
   const darkTheme = createTheme({
      palette: {
         mode: 'dark',
      },
      components: {
         MuiOutlinedInput: {
            styleOverrides: {
               root: {
                  // margin: '0px'
               },
            },
         },
         MuiFormLabel: {
            styleOverrides: {
               root: {
                  color: 'red',
                  fontSize: '1.1vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               },
            },
         },
      },
   });
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['DatePicker']}>
            <ThemeProvider theme={darkTheme}>
               <DatePicker
                  label={mssg}
                  //value={dateCurr.format("DD-MM-YYYY")===dayjs().format("DD-MM-YYYY")?null:dateCurr}
                  onChange={(newValue) => setDateCurr(newValue)}
                  slotProps={{
                     textField: {
                        required: true,
                     },
                  }}
                  sx={{
                     '& .MuiInputBase-root': {
                        height: '3.5vw',
                        width: '20vw',
                        // fontSize: '10px'
                     },
                  }}
               />
            </ThemeProvider>
         </DemoContainer>
      </LocalizationProvider>
   );
}
