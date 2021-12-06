import React, { useState, useEffect } from "react";
import "./Slides.css";
import { NavLink } from "react-router-dom";

function Slides({
  width,
  gradientColor,
  textColor,
  Heading__1,
  Heading__2,
  Heading__3,
  sub,
  imageURL,
  buttonColor,
}) {
  const [styles, setStyles] = useState("");
  const onWindowResize = (event) => {
    if (event.target.innerWidth >= 992) {
      setStyles(
        `linear-gradient(90deg, #${gradientColor} 75%, rgba(255, 255, 255, 0))`
      );
    } else {
      setStyles(
        `linear-gradient(to top, #${gradientColor} 65%, rgba(255, 255, 255, 0)`
      );
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setStyles(
        `linear-gradient(90deg, #${gradientColor} 75%, rgba(255, 255, 255, 0))`
      );
    } else {
      setStyles(
        `linear-gradient(to top, #${gradientColor} 65%, rgba(255, 255, 255, 0)`
      );
    }

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div className="carouselItem" style={{ width, marginTop: "13vh" }}>
      <div className="gradient" style={{ background: styles }}>
        <div
          className="text"
          style={{
            width: "70%",
            marginLeft: "0",
          }}
        >
          <h2 id="slidingOffer__h2" style={{ color: `#${textColor}` }}>
            {Heading__1}
            <br />
            {Heading__2}
            <br />
            {Heading__3}
          </h2>

          <p id="slidingOffer__secondText" style={{ color: `#${textColor}` }}>
            {sub}
          </p>
          {/* start */}

          <NavLink
            className="mr-2 mb-2 ml-8"
            id="Enquiryclass"
            to="/user/enquiry"
            style={{ backgroundColor: `${buttonColor}` }}
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
            marginLeft: "40vw",
          }}
        />
      </div>
    </div>
  );
}
export default Slides;
