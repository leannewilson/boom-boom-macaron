import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

function ReservationCalendar2(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [inline, setInline] = useState(false);
  const [reservation, setReservation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openReservation = (props) => {
    setIsOpen(true);
  };

  const closeReservation = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    let copyReservation = { ...reservation };
    copyReservation[e.target.name] = e.target.value;
    setReservation(copyReservation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reservation);
    axios
      .post("https://ironrest.herokuapp.com/boomboommacaron", reservation)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  const ReservationCalendar = () => {
    console.log(startDate);
    console.log(reservation);
    return (
      <DatePicker
        inline={inline}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    );
  };

  const submit = (e) => {
    e.preventDefault();
  };

  //reservation modal object
  const Modal = (props) => {
    return (
      <div className="App">
        {isOpen && (
          <>
            <div className="overlay"></div>
            <div className="modal-reso">
              <header className="modal__header-reso">
                <h2>Make a reservation</h2>
                <button
                  onClick={closeReservation}
                  className="close-button-reso"
                >
                  &times;
                </button>
              </header>

              <main className="modal__main-reso">
                <div className="contact-info-reso">
                  <form onSubmit={props.handleSubmit}>
                    <h3>{startDate.toLocaleString()}</h3>
                    <span
                      className="contact-info-reso"
                      style={{ fontSize: "22px" }}
                    >
                      Enter contact information
                    </span>
                    <input
                      className="contact-info-reso"
                      onChange={props.handleChange}
                      placeholder="Name"
                      name="name"
                      type="text"
                    />
                    <input
                      className="contact-info-reso"
                      onChange={props.handleChange}
                      placeholder="Email"
                      name="email"
                      type="text"
                    />
                    <input
                      className="contact-info-reso"
                      onChange={props.handleChange}
                      placeholder="Phone"
                      name="phone"
                      type="text"
                    />
                    <input
                      className="contact-info-reso"
                      onChange={props.handleChange}
                      placeholder="Party size"
                      name="size"
                      type="number"
                    />
                    <button className="contact-info-reso">Confirm</button>
                  </form>
                </div>
              </main>
            </div>
          </>
        )}
        <button className="button-reso" onClick={openReservation}>
          Make a reservation
        </button>
      </div>
    );
  };

  return (
    <div className="reservation-calendar">
      <div>
        <img
          onClick={() => setInline(!inline)}
          src="https://img.icons8.com/ios/50/000000/calendar--v2.png"
          alt="Make reservation"
        />
      </div>
      <div className="reservation-calendar">
        <ReservationCalendar />
        <Modal />
      </div>
    </div>
  );
}

export default ReservationCalendar2;

// function ReservationCalendar2(props) {
//   const [startDate, setStartDate] = useState(new Date());
//   const [inline, setInline] = useState(false);
//   const [reservation, setReservation] = useState({
//     name: null,
//     phone: null,
//     email: null,
//     date: new Date(),
//     time: null,
//     size: null,
//   });

//   const submit = (e) => {
//     confirmAlert({
//       title: "Confirm reservation", // Title dialog
//       message: "We look forward to seeing you.", // Message dialog
//       childrenElement: () => <div></div>, // Custom UI or Component

//       cancelLabel: "Cancel", // Text button cancel
//       confirmLabel: "Confirm", // Text button confirm
//       onConfirm: () => alert("Action after Confirm"), // Action after Confirm
//       onCancel: () => alert("Action after Cancel"), // Action after Cancel
//       overlayClassName: "overlay-custom-class-name", // Custom overlay class name
//     });
//   };

//   function makeReservation(reservation) {
//     console.log(reservation);
//     axios
//       .post("https://ironrest.herokuapp.com/boomboommacarom", reservation)
//       .then((res) => console.log(res.data));
//   }

//   const ConfirmReservation = (props) => {
//     console.log("testres");
//     const submit = (e) => {
//       e.preventDefault();
//     };

//     return (
//       <div>
//         <form onSubmit={ConfirmReservation}>
//           <span style={{ fontSize: "22px" }}>Enter contact information</span>
//           <input
//             onChange={(e) => setReservation(e.target.value)}
//             placeholder="Name"
//             name="name"
//             type="text"
//             value={reservation.name}
//           />
//           <input
//             onChange={(e) => setReservation(e.target.value)}
//             placeholder="Email"
//             name="email"
//             type="text"
//             value={reservation.email}
//           />
//           <input
//             onChange={(e) => setReservation(e.target.value)}
//             placeholder="Phone"
//             name="phone"
//             type="text"
//             value={reservation.phone}
//           />
//           <button>Confirm</button>
//         </form>
//       </div>
//     );
//   };

//   console.log("test");
//   return (
//     <div>
//       <img
//         onClick={() => setInline(!inline)}
//         src="https://img.icons8.com/ios/50/000000/calendar--v2.png"
//         alt="Make reservation"
//       />
//       <DatePicker
//         inline={inline}
//         // selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         showTimeSelect
//         timeFormat="HH:mm"
//         timeIntervals={15}
//         timeCaption="when"
//         dateFormat="MMMM d, yyyy h:mm aa"
//       />

//       <div className="container">
//         <button onClick={submit}>Confirm dialog</button>
//       </div>
//       <ConfirmReservation />
//     </div>
//   );
// }

// export default ReservationCalendar2;
