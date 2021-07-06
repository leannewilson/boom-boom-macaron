// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
const API_KEY =
  "zBeFhr-sk0sMFQM3qcHPF5t75MlBr6RYCBvFvt4W336rlYvW3T8pEyf2cTIeYSSZUJOJ9bzf7DuzSGnsCZoEvU9wMM2P_K_6KjYmqN8RSSGEU3gvZCz5tQOjYnLfYHYx";

function App(props) {
  let [term, setTerm] = useState("");
  let [location, setLocation] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [amountResults, setAmountResults] = useState();
  const [reviews, setReviews] = useState([]);

  const search = () => {
    console.log("yelp api");

    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setBusinesses(res.data.businesses);
        setAmountResults(res.data.total);
        getReviews(res.data.businesses);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const getReviews = (allBusinesses) => {
    let allReviews = allBusinesses
      .map(async (eachBusiness) => {
        // console.log(eachBusiness);
        return await axios.get(
          `https://iron-cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${eachBusiness.id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
      })
      .then((res) => {
        // console.log(res);
        setReviews(res.data);
      });
  };
  console.log(reviews);
  console.log(businesses);
  // console.log(amountResults);

  const submit = (e) => {
    e.preventDefault();
    search();
  };

  // let Sentiment = require("sentiment");
  // let sentiment = new Sentiment();
  // let result = sentiment.analyze("Bad yelp reviews.");
  // console.log(result);

  // show all businesses
  const ShowBusinesses = () => {
    return businesses.map((b) => {
      return (
        <div
          key={b.id}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "2em",
          }}
        >
          <img
            src={b.image_url}
            style={{ width: "220px", paddingRight: "2em" }}
            alt="business images"
          />
          <span style={{ width: "15%", paddingRight: "2em" }}>
            <h2>{b.name}</h2>
            <h4>Rating: {b.rating}</h4>
            <h4>Price: {b.price}</h4>
            <h4>Total reviews: {b.review_count}</h4>
          </span>
          <span style={{ width: "15%", paddingLeft: "2em" }}>
            <h4>{b.location.display_address[0]}</h4>
            <h4>{b.location.display_address[1]}</h4>
            <h4>{b.display_phone}</h4>
          </span>
        </div>
      );
    });
  };

  // show 3 revies of each business
  const ShowReviews = () => {
    return reviews.map((r, index) => {
      console.log(r.data.reviews[0].text);
      return (
        <div key={index} style={{ width: "50%", margin: "auto" }}>
          <h4>{r.data.reviews[0].text}</h4>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={submit}>
          <span>Search</span>
          <input
            onChange={(e) => setTerm(e.target.value)}
            name="term"
            placeholder="Coffee, Sushi, Dessert..."
            type="text"
            value={term}
          />
          <span>Near</span>
          <input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="San Diego"
            name="location"
            type="text"
            value={location}
          />
          <button>🍩</button>
        </form>
      </div>
      <span>
        {term} near {location}
      </span>
      <div>
        {" "}
        Showing {businesses.length} of {amountResults}{" "}
      </div>
      <ShowBusinesses />
      <ShowReviews />
    </div>
  );
}

export default App;
