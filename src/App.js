import logo from "./logo.png";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { promises } from "stream";
import StarRating from "./StarRating";
import searchButton from "./searchButton.png";
import Price from "./Price";
import ReservationCalendar2 from "./ReservationCalendar2";
import ReviewModal from "./ReviewModal";

const API_KEY =
  "zBeFhr-sk0sMFQM3qcHPF5t75MlBr6RYCBvFvt4W336rlYvW3T8pEyf2cTIeYSSZUJOJ9bzf7DuzSGnsCZoEvU9wMM2P_K_6KjYmqN8RSSGEU3gvZCz5tQOjYnLfYHYx";

function App(props) {
  let [term, setTerm] = useState("");
  let [location, setLocation] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [amountResults, setAmountResults] = useState();
  const [reviews, setReviews] = useState([]);

  const search = () => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setBusinesses(res.data.businesses);
        setAmountResults(res.data.total);
        getReviews(res.data.businesses);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  console.log(businesses);

  const getReviews = (allBusinesses) => {
    let allReviews = allBusinesses.map(async (eachBusiness) => {
      // console.log(eachBusiness);
      return await axios.get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${eachBusiness.id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
    });
    Promise.all(allReviews).then((res) => {
      // console.log(res);
      setReviews(res);
    });
  };

  // console.log(reviews);
  // console.log(businesses);
  // console.log(amountResults);

  const submit = (e) => {
    e.preventDefault();
    search();
  };

  const ShowBusinesses = () => {
    return businesses.map((b) => {
      return (
        <div>
          <div className="results-all" key={b.id}>
            <img
              className="result-img"
              src={b.image_url}
              alt="business images"
            />
            <span>
              <h2 className="result-name">{b.name}</h2>
              <h4 className="result-rating">
                Rating: <StarRating />
                {b.rating}
              </h4>
              <h4 className="result-price">Price: {b.price}</h4>

              <button id="myBtn">
                <h4 className="result-reviews">
                  Total reviews: {b.review_count}
                </h4>
              </button>

              {/* <ReviewModal /> */}

              <div className="result-contact">
                <span className="result-address">
                  <h4 className="result-address">
                    {b.location.display_address[0]}
                  </h4>
                  <h4 className="result-address">
                    {b.location.display_address[1]}
                  </h4>
                  <h4 className="result-address">
                    {b.location.display_address[2]}
                  </h4>
                </span>
                <span className="contact">
                  <h4 className="result-phone">{b.display_phone}</h4>
                </span>
              </div>
            </span>
          </div>
          <div className="reso-overlay">
            <ReservationCalendar2 />
          </div>
        </div>
      );
    });
  };

  // const tag = () => {
  //   return businesses.map((catagory) => {
  //     return (
  //     <div key={businesses.id + catagory.title}>{catagory.title}</div>
  //     )}
  //     }

  const ShowReviews = () => {
    return reviews.map((r, index) => {
      // console.log(r.data);
      return (
        <div key={index} style={{ width: "50%", margin: "auto" }}>
          <h4>{r.data.reviews[0].rating}</h4>
          <h4>{r.data.reviews[0].time_created}</h4>
          <h4>{r.data.reviews[0].user.name}</h4>
          <h4>{r.data.reviews[0].text}</h4>
          <img
            src="https://randomuser.me/api/portraits/thumb/women/5.jpg"
            alt="user photo"
          ></img>
        </div>
      );
    });
  };

  const TotalResults = () => {
    if (amountResults > 0) {
      return (
        <div>
          Showing {businesses.length} of {amountResults}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <div>
        <img
          src={logo} //logo sizing, main page
          style={{ width: "60vw", paddingTop: "2em" }}
          alt="BBM logo"
        />
      </div>
      <div>
        <form onSubmit={submit}>
          <span style={{ fontSize: "22px" }}>Find</span>
          <input
            className="input"
            style={{
              width: "20vw",
              height: "35px",
              marginTop: "2em",
              paddingTop: "5px",
              borderRadius: "4px",
              fontSize: "22px",
            }}
            onChange={(e) => setTerm(e.target.value)}
            name="term"
            placeholder="Coffee, Sushi, Dessert..."
            type="text"
            value={term}
          />
          <span style={{ fontSize: "22px" }}>Near</span>
          <input
            className="input"
            style={{
              width: "20vw",
              height: "35px",
              marginTop: "2em",
              paddingTop: "5px",
              borderRadius: "4px",
              fontSize: "22px",
              paddingRight: "0",
              marginRight: "0",
            }}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="San Diego"
            name="location"
            type="text"
            value={location}
          />
          <button
            style={{
              height: "43px",
              marginTop: "15px",
              paddingBottom: "0",
              marginBottom: "0",
            }}
          >
            <img
              style={{
                height: "35px",
                borderRadius: "4px",
              }}
              src={searchButton} //logo sizing, main page
              alt="Search button"
            />
          </button>
        </form>
        <Price />
        <button>Open Now</button>
        <button>Make Reservation</button>
      </div>
      <TotalResults />
      <ShowBusinesses />
      <ShowReviews />
    </div>
  );
}

export default App;
