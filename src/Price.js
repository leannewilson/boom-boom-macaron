import React, { useState, useEffect, useRef } from "react";

function Price({ setPrice }) {
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

  return (
    <div className="price-container " ref={container}>
      <button type="button" className="button" onClick={() => setOpen(!open)}>
        Price ▼
      </button>
      {open && (
        <div className="price-dropdown ">
          <button onClick={() => setPrice("$")}>$</button>
          <button onClick={() => setPrice("$$")}>$$</button>
          <button onClick={() => setPrice("$$$")}>$$$</button>
          <button onClick={() => setPrice("$$$$")}>$$$$</button>
        </div>
      )}
    </div>
  );
}

export default Price;
