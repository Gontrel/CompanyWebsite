import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFire } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icon
import "./webpage.css";

const Webpage: React.FC = () => {
  return (
    <div className="webPage">
      <div>
        <img src="./src/assets/GontrelLogo.png" alt="Logo" className="logo" />
        <button className="roundedButton">
          App coming soon <FontAwesomeIcon icon={faEye} />
          <FontAwesomeIcon icon={faFire} style={{ color: "#ff0000" }} />
        </button>
        <div className="webPageText">
          <h1>
            Discover,
            <br />
            Experience and Share with <span className="blueText">Gontrel</span>
          </h1>
          <br />
          <p>
            The ultimate way to explore exciting events, thrilling
            <br />
            activities, and delicious meals in your area or wherever you
            <br />
            go.
          </p>
          <h6>Interested?! Keep up-to date with Gontrel below</h6>
          <button className="submitButton">Enter email here </button>
        </div>
      </div>
      <img
        src="./src/assets/landing-background.png"
        alt="Description"
        className="rightImage"
      />
    </div>
  );
};

export default Webpage;
