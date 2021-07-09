import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

function ReservationCalendar2(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [inline, setInline] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openReservation = (props) => {
    setIsOpen(true);
  };

  const closeReservation = () => {
    setIsOpen(false);
  };

  const ReservationCalendar = () => {
    // console.log(startDate);
    //console.log(reservation);
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
        minDate={new Date()}
        closeOnScroll={true}
      />
    );
  };

  //reservation modal object
  const Modal = (props) => {
    const [reservation, setReservation] = useState({});

    const handleSubmit = async (e) => {
      e.preventDefault();
      //console.log(reservation);
      axios
        .post("https://ironrest.herokuapp.com/boomboommacaron", {
          reservation,
          startDate,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(console.error);
    };

    const handleChange = (e) => {
      let copyReservation = { ...reservation };
      copyReservation[e.target.name] = e.target.value;
      setReservation(copyReservation);
      console.log(e.target.name, e.target.value);
    };

    return (
      <div className="revervation-modals">
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
                  <form onSubmit={handleSubmit}>
                    <h3>
                      {startDate.toLocaleString([], {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h3>
                    <span
                      className="contact-info-reso"
                      style={{ fontSize: "22px" }}
                    >
                      Enter contact information
                    </span>
                    <input
                      className="contact-info-reso"
                      onChange={handleChange}
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={reservation.name}
                    />
                    <input
                      className="contact-info-reso"
                      onChange={handleChange}
                      placeholder="Email"
                      name="email"
                      type="text"
                    />
                    <input
                      className="contact-info-reso"
                      onChange={handleChange}
                      placeholder="Phone"
                      name="phone"
                      type="text"
                    />
                    <input
                      className="contact-info-reso"
                      onChange={handleChange}
                      placeholder="Party size"
                      name="size"
                      type="number"
                    />
                    <button
                      className="contact-info-reso"
                      onClick={() => confirmation()}
                    >
                      Confirm
                    </button>
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

  const confirmation = (e) => {
    console.log("confirm");
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm reservation</h1>
            <p>We look forward to seeing you.</p>
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={() => {
                onClose();
                setIsOpen(false);
                setInline(false);
              }}
            >
              Confirm!
            </button>
          </div>
        );
      },
      // title: "Confirm reservation", // Title dialog
      // message: "We look forward to seeing you.", // Message dialog
      // childrenElement: () => <div></div>, // Custom UI or Component
      // cancelLabel: "Cancel", // Text button cancel
      // confirmLabel: "Confirm", // Text button confirm
      // onConfirm: () => setInline(true), // Action after Confirm
      // onCancel: () => alert("Action after Cancel"), // Action after Cancel
      // overlayClassName: "overlay-custom-class-name", // Custom overlay class name
    });
  };

  return (
    <div className="reservation-calendar">
      <div>
        <img
          onClick={() => setInline(!inline)}
          className="calendar-img"
          src="https://img.icons8.com/ios/50/000000/calendar--v2.png"
          alt="Make reservation"
        />
      </div>
      <div className="reservation-calendar">
        <ReservationCalendar />
      </div>
      <span>
        <Modal />
      </span>
    </div>
  );
}

export default ReservationCalendar2;
