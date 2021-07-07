import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationCalendar2(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <img
        src="https://img.icons8.com/ios/50/000000/calendar--v2.png"
        alt="Make reservation"
      />
      <DatePicker
        selected="{startDate}"
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy "
      />
    </div>
  );
}

export default ReservationCalendar2;
