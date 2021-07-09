import React, { useState } from "react";

function Reviews(props) {
  const [reviews, setReviews] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openReviews = (props) => {
    setIsOpen(true);
  };

  const closeReviews = () => {
    setIsOpen(false);
  };

  let OpenReviews = () => {
    return (
      <button className="button-reso" onClick={openReviews}>
        See reviews
      </button>
    );
  };

  return (
    <div className="reviews">
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal-reso">
            <header className="modal__header-reso">
              <h2>Reviews: </h2>
              <button onClick={closeReviews} className="close-button-reso">
                &times;
              </button>
            </header>

            <main className="modal__main-reso">
              <div className="contact-info-reso">
                <button className="contact-info-reso">See more...</button>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;
