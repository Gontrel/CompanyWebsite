import React, { useEffect, useState } from 'react';
import { handleFirestore } from '../../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import Loader from '/assets/icons/Loader.png';
import GontrelLogo from '/assets/icons/GontrelLogo.svg';
import Heart from '/assets/icons/Heart.svg';
import Squiggle from '/assets/icons/Squiggle.svg';
import Instagram from '/assets/icons/Instagram.png';
import Snapchat from '/assets/icons/Snapchat.png';
import Facebook from '/assets/icons/Facebook.png';
import Twitter from '/assets/icons/Twitter.png';
import './LandingPage.scss';

const LandingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [emailValidText, setEmailValidText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitText, setSubmitText] = useState('');
    const emailInput = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && !isLoading && emailValidText.length > 0) {
            const waitingListCollection = collection(
                handleFirestore(),
                'waitingList'
            );
            try {
                setIsLoading(true);
                await setDoc(doc(waitingListCollection, email), {
                    email
                });
                setEmail('');
                setIsLoading(false);
                console.log('Email added to waiting list!');
                setSubmitText('Email added to waiting list!');
                emailInput.current?.focus();
            } catch (error) {
                console.error('Error adding email: ', error);
                setEmailErrorText('Error adding email.');
            } finally {
                setTimeout(() => {
                    setEmailValidText('');
                    setEmailErrorText('');
                    setSubmitText('');
                }, 5000);
            }
        }
    };

    useEffect(() => {
        emailInput.current?.focus();
    }, []);

    // email validation
    useEffect(() => {
        if (email) {
            // check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailErrorText('Please enter a valid email!');
                setEmailValidText('');
            } else {
                setEmailErrorText('');
                setEmailValidText('Valid email!');
            }
        } else {
            setEmailErrorText('');
            setEmailValidText('');
        }
    }, [email, isLoading]);

    return (
        <div id="landingPage" className="w-screen min-h-screen sm:h-screen">
            <div className="relative flex flex-col justify-between w-auto px-4 pt-10 pb-16 sm:h-screen sm:ps-28 sm:pt-12">
                <div className="flex-shrink mb-10 logo">
                    <img
                        className="h-auto w-100"
                        src={GontrelLogo}
                        alt="Company Logo"
                    />
                </div>
                <div id="hero--content" className="flex items-start ">
                    <div className="flex flex-col gap-y-4 content--section">
                        <div className="flex mb-6 gap-x-3 coming-soon--section">
                            <div className="flex items-center justify-center gap-3 px-6 py-2 border-solid pointer-events-none select-none coming-soon--pill">
                                <span className="coming-soon--text">
                                    App coming soon!
                                </span>
                                <span className="coming-soon--emoji">👀</span>
                                <span className="coming-soon--emoji">🔥</span>
                            </div>
                            <div>
                                <img
                                    className="coming-soon--icon"
                                    alt="heart icon"
                                    src={Heart}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col max-w-sm sm:max-w-md hero--text gap-y-4">
                            <h1>
                                Discover,
                                <br />
                                experience and share with
                                <span className="text-gontrel-blue">
                                    {' '}
                                    Gontrel
                                </span>
                            </h1>
                            <div className="my-1 squiggle-container">
                                <img src={Squiggle} alt="squiggle"></img>
                            </div>
                            <p>
                                The ultimate way to explore exciting events,
                                thrilling activities, and delicious meals in
                                your area or wherever you go.
                            </p>
                        </div>
                        <form
                            className="flex flex-col max-w-sm mt-8 sm:max-w-md hero--form"
                            onSubmit={handleSubmit}
                        >
                            <h6>
                                Interested?! Keep up-to date with Gontrel below
                            </h6>
                            <div
                                className={`input--container p-2 flex justify-between gap-x-8 mt-4 mb-1
                                    ${
                                        emailErrorText.length > 0
                                            ? 'invalid'
                                            : ''
                                    }
                                    ${
                                        emailValidText.length > 0 ||
                                        submitText.length > 0
                                            ? 'valid'
                                            : ''
                                    }
                                    `}
                            >
                                <div className="flex flex-col flex-grow pt-2 ps-8 input-container--text">
                                    <input
                                        type="email"
                                        className="email--input"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onInput={e =>
                                            setEmail(e.currentTarget.value)
                                        }
                                        ref={emailInput}
                                    />
                                    <div className="input-helper--text min-h-4">
                                        {emailErrorText.length > 0 && (
                                            <span className="error--text">
                                                {emailErrorText}
                                            </span>
                                        )}
                                        {emailValidText.length > 0 && (
                                            <span className="valid--text">
                                                {emailValidText}
                                            </span>
                                        )}
                                        {submitText.length > 0 && (
                                            <span className="valid--text">
                                                {submitText}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="flex items-center justify-center h-12 px-6 py-4 text-white rounded-md min-w-24 submit--button bg-gontrel-blue"
                                    type="submit"
                                    disabled={
                                        emailErrorText.length > 0 ||
                                        email.length === 0
                                    }
                                >
                                    {isLoading ? (
                                        <img
                                            src={Loader}
                                            alt="loading"
                                            className="loader animate-spin-reverse"
                                        />
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-shrink hero--footer">
                    <div className="flex-row hidden sm:flex icon--container gap-x-9">
                        <img
                            className="w-10 h-10"
                            alt="heart icon"
                            src={Instagram}
                            onClick={() =>
                                window.open(
                                    'https://www.instagram.com/gontrel.app/',
                                    '_blank'
                                )
                            }
                        />
                        <img
                            className="w-10 h-10"
                            alt="heart icon"
                            src={Snapchat}
                            onClick={() =>
                                window.open(
                                    'https://www.snapchat.com/gontrel.app/',
                                    '_blank'
                                )
                            }
                        />
                        <img
                            className="w-10 h-10"
                            alt="heart icon"
                            src={Facebook}
                            onClick={() =>
                                window.open(
                                    'https://www.facebook.com/gontrel.app/',
                                    '_blank'
                                )
                            }
                        />
                        <img
                            className="w-10 h-10"
                            alt="heart icon"
                            src={Twitter}
                            onClick={() =>
                                window.open(
                                    'https://www.twitter.com/gontrel.app/',
                                    '_blank'
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
