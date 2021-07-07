import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReservationCalendar() {
  const [date, setDate] = useState(new Date());
  //   const [userResults, setUserResults] = useState([]);
  const [open, setOpen] = useState(false);
  const container = useRef(null);

  const handleClickOutside = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function onChange(date) {
    // change results based on calendar date click
    setDate(date);

    // const filteredResults = userResults.filter((result) => {
    //   const newResultFormat = new Date(result.created_at)
    //     .toLocaleString()
    //     .split(",")[0];
    //   const newCalDateFormat = date.toLocaleString().split(",")[0];
    //   return newResultFormat === newCalDateFormat;
    // });
  }
  console.log(date);
  return (
    <div className="react-calendar" onClick={() => setOpen(!open)}>
      <img
        src="https://img.icons8.com/ios/50/000000/calendar--v2.png"
        alt="Make reservation"
      />
      {open && (
        <section className="react-calendar" className="calender-dropdown">
          <Calendar onChange={onChange} value={date} />
        </section>
      )}
    </div>
  );
}

export default ReservationCalendar;
