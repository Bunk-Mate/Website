import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Calender from '@/public/assets/calender-light.png';
import Image from 'next/image';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function ButtonField(props) {
   const {
      setOpen,
      // eslint-disable-next-line no-unused-vars
      label,
      id,
      disabled,
      InputProps: { ref } = {},
      inputProps: { 'aria-label': ariaLabel } = {},
   } = props;

   return (
      <Button
         id={id}
         title="Rewind Time"
         disabled={disabled}
         ref={ref}
         aria-label={ariaLabel}
         onClick={() => setOpen?.((prev) => !prev)}
      >
         <Image src={Calender} className="w-[3.8vw] max-sm:w-[55px]"></Image>
      </Button>
   );
}

function ButtonDatePicker(props) {
   const [open, setOpen] = useState(false);

   return (
      <DatePicker
         slots={{ ...props.slots, field: ButtonField }}
         slotProps={{ ...props.slotProps, field: { setOpen } }}
         {...props}
         open={open}
         onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
      />
   );
}

export default function PickerWithButtonField({ setDateCurr }) {
   const [value, setValue] = useState(dayjs());
   useEffect(() => {
      setDateCurr(value);
   }, [value]);

   const darkTheme = createTheme({
      palette: {
         mode: 'dark',
      },
   });

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <ThemeProvider theme={darkTheme}>
            <CssBaseline>
               <ButtonDatePicker
                  label={value == null ? null : value}
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
               />
            </CssBaseline>
         </ThemeProvider>
      </LocalizationProvider>
   );
}
