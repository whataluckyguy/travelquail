import React, { useState, useEffect } from "react";
import "./Slides.css";
import { NavLink } from "react-router-dom";

function Slides({
  isReverse,
  children,
  width,
  gradientColor,
  textColor,
  direction,
  margin,
  headone,
  headtwo,
  format,
  imageURL,
}) {
  const [styles, setStyles] = useState("");
  const onWindowResize = (event) => {
    if (event.target.innerWidth >= 992) {
      setStyles(
        `linear-gradient(${direction}, #${gradientColor} 75%, transparent)`
      );
    } else {
      setStyles(`linear-gradient(to top, #${gradientColor} 65%, transparent`);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setStyles(
        `linear-gradient(${direction}, #${gradientColor} 75%, transparent)`
      );
    } else {
      setStyles(`linear-gradient(to top, #${gradientColor} 65%, transparent`);
    }

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div className="carouselItem" style={{ width, marginTop: "13vh" }}>
      <div className={isReverse} style={{ background: styles }}>
        <div
          className="text"
          style={{
            width: "70%",
            marginLeft: `${format}`,
          }}
        >
          <h2 id="slidingOffer__h2" style={{ color: `#${textColor}` }}>
            {headone}
          </h2>
          <p id="slidingOffer__secondText" style={{ color: `#${textColor}` }}>
            {headtwo}
          </p>
          {/* start */}

          <NavLink
            className="mr-2 mb-2 ml-8"
            id="Enquiryclass"
            to="/user/enquiry"
          >
            ENQUIRE NOW
          </NavLink>
          <p id="slidingOffer__accExisted" style={{ color: `#${textColor}` }}>
            Already have an account?{" "}
            <NavLink style={{ color: `#${textColor}` }} to="/user/login">
              Sign In
            </NavLink>
          </p>

          {/* end */}
        </div>
      </div>
      <div className="image">
        <img
          src={imageURL}
          alt="Travel Quail"
          style={{
            marginLeft: `${margin}`,
          }}
        />
      </div>
    </div>
  );
}
export default Slides;
