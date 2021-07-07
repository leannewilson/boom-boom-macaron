import React from "react";
import { FaStar } from "react-icons/fa";

function StarRating(props) {
  return (
    <div>
      <div>
        {/* {[
          ...Array(5).map((star) => {
            return;
          }),
        ]} */}
        <FaStar size={15} />
      </div>
    </div>
  );
}

export default StarRating;
