import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDate } from '../context/DatePickerContext';
import { format } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css';


const MyDatePicker = ({onDateChange}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { updateDates } = useDate();


  const handleChange = (date) => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
  
    updateDates({ startDate: start, endDate: end });
  
    if (start && end) {
      console.log('start date:', format(start, 'yyyy-MM-dd'));
      console.log('end date:', format(end, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className='date-picker'>
      <DatePicker
        placeholderText='Check-in date - Check-out date'
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        selectsRange={true}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        filterDate={date=> date.getDay() !=0 && date.getDay() !=1 && date.getDay() !=2}
      />
    </div>
    


  );
};

export default MyDatePicker;
















