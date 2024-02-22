import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFire } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icon
import "./webpage.css";
import { handleFirestore } from "../../lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Webpage: React.FC = () => {
  function handleSubmit() {
    const emailInput = document.querySelector(
      ".emailInput"
    ) as HTMLInputElement;

    if (emailInput) {
      const email = emailInput.value;
      const emailsCollection = collection(handleFirestore(), "emails");
      addDoc(emailsCollection, { email })
        .then(() => console.log("Email added successfully"))
        .catch((error) => console.error("Error adding email: ", error));
    } else {
      alert("Email field is empty.");
    }
  }

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

          <div className="inputWithButton">
            <input
              type="text"
              className="emailInput"
              placeholder="Enter email here"
            />
            <button className="submitButton" onClick={handleSubmit}>
              Submit
            </button>
          </div>
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
