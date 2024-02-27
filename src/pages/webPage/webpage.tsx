import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFire } from "@fortawesome/free-solid-svg-icons"; // Import the necessary icon
import "./webpage.scss";
import { handleFirestore } from "../../lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Webpage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [emailSuccess, setEmailSuccess] = useState(false);
    function handleSubmit() {
        if (email) {
            const emailsCollection = collection(handleFirestore(), "emails");
            addDoc(emailsCollection, { email })
                .then(() => {
                    console.log("Email added successfully");
                    setEmailSuccess(true);
                })
                .catch((error) => console.error("Error adding email: ", error))
                .finally(() => {
                    setTimeout(() => {
                        setEmail("");
                    }, 3000);
                });
        }
    }

    useEffect(() => {
        if (email) {
            // check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailErrorText(
                    "Email is invalid! Please enter a valid email."
                );
                setEmailSuccess(false);
            } else {
                setEmailErrorText("");
            }
        } else {
            setEmailErrorText("");
            setEmailSuccess(false);
        }
    }, [email]);

    return (
        <div className="webPage">
            <div>
                <img
                    src="./src/assets/GontrelLogo.png"
                    alt="Logo"
                    className="logo"
                />
                <button className="roundedButton">
                    App coming soon <FontAwesomeIcon icon={faEye} />
                    <FontAwesomeIcon
                        icon={faFire}
                        style={{ color: "#ff0000" }}
                    />
                </button>
                <div className="webPageText">
                    <h1>
                        Discover,
                        <br />
                        experience and share with
                        <span className="blueText"> Gontrel</span>
                    </h1>
                    <br />
                    <p>
                        The ultimate way to explore exciting events, thrilling
                        <br />
                        activities, and delicious meals in your area or wherever
                        you
                        <br />
                        go.
                    </p>
                    <h6>Interested?! Keep up-to date with Gontrel below</h6>

                    <div
                        className={`inputWithButton
                        ${emailErrorText.length > 0 ? "border-red-500" : ""}
                        ${
                            email.length > 0 && emailErrorText.length == 0
                                ? "border-green-500"
                                : ""
                        }
                        `}>
                        <input
                            type="text"
                            className="emailInput"
                            placeholder="Enter email here"
                            value={email}
                            onChange={(e) =>
                                setEmail((e.target as HTMLInputElement).value)
                            }
                            onInput={(e) =>
                                setEmail((e.target as HTMLInputElement).value)
                            }
                        />
                        <button
                            onClick={handleSubmit}
                            className="submitButton"
                            disabled={
                                emailErrorText.length > 0 || email.length === 0
                            }>
                            Submit
                        </button>
                    </div>
                    {emailErrorText.length > 0 && (
                        <p
                            className={`errorText
                            ${emailErrorText.length > 0 ? "visible" : "hidden"}
                            `}>
                            {emailErrorText}
                        </p>
                    )}
                    {{ emailSuccess } && (
                        <p
                            className={`successText
                            ${emailSuccess ? "visible" : "hidden"}
                            `}>
                            Email submitted successfully!
                        </p>
                    )}
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
