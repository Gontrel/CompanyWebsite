import React, { useEffect, useRef, useState } from 'react';
import HelperText from '../../components/HelperText/HelperText';
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
import HeroImage from '/assets/images/LandingBackground.png';

const LandingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [errorHelperText, setErrorHelperText] = useState('');
    const [validHelperText, setValidHelperText] = useState('');
    const [submitHelperText, setSubmitHelperText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const emailInput = useRef<HTMLInputElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && !isLoading && validHelperText.length > 0) {
            const waitingListCollection = collection(
                handleFirestore(),
                'waitingList'
            );

            try {
                setIsLoading(true);
                const trimmedEmail = email.trim().toLowerCase();
                await setDoc(doc(waitingListCollection, trimmedEmail), {
                    email: trimmedEmail
                });

                console.log('Email added to waiting list!');

                setEmail('');
                setIsLoading(false);
                setSubmitHelperText('Email added to waiting list!');

                emailInput.current?.focus();
            } catch (error) {
                console.error('Error adding email: ', error);

                setIsLoading(false);
                setErrorHelperText('');
                setSubmitHelperText('Error adding email!');
            } finally {
                setTimeout(() => {
                    setErrorHelperText(text => (text.length > 0 ? text : ''));
                    setValidHelperText(text => (text.length > 0 ? text : ''));
                    setSubmitHelperText('');
                }, 5000);
            }
        }
    };

    useEffect(() => {
        emailInput.current?.focus();
    }, []);

    // email validation
    useEffect(() => {
        // Clear the previous timeout if it exists
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout
        debounceTimeout.current = setTimeout(() => {
            if (email) {
                // check if email is valid
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    setValidHelperText('');
                    setErrorHelperText('Please enter a valid email!');
                } else {
                    setErrorHelperText('');
                    setValidHelperText('Valid email!');
                }
            } else {
                setErrorHelperText('');
                setValidHelperText('');
            }
        }, 1000); // 1 second delay
    }, [email, isLoading]);

    return (
        <div
            id="landingPage"
            className="flex w-screen min-h-screen md:h-screen"
        >
            <div className="flex flex-1 landing-page--left 2xl:items-center 2xl:justify-end">
                <div className="flex flex-col items-center justify-between w-screen px-4 pt-10 pb-16 2xl:w-auto md:items-start md:h-screen md:ps-28 md:pt-12">
                    <div className="flex-shrink mb-10 logo md:pe-80 md:me-4">
                        <img
                            className="w-auto h-auto"
                            src={GontrelLogo}
                            alt="Company Logo"
                        />
                    </div>
                    <div id="hero--content" className="flex items-start ">
                        <div className="flex flex-col gap-y-4 content--section">
                            <div className="flex md:mb-6 gap-x-3 coming-soon--section">
                                <div className="flex items-center justify-center gap-3 px-6 py-2 border-solid pointer-events-none select-none coming-soon--pill">
                                    <span className="coming-soon--text">
                                        App coming soon!
                                    </span>
                                    <span className="coming-soon--emoji">
                                        👀
                                    </span>
                                    <span className="coming-soon--emoji">
                                        🔥
                                    </span>
                                </div>
                                <div>
                                    <img
                                        className="coming-soon--icon"
                                        alt="heart icon"
                                        src={Heart}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col max-w-sm md:max-w-md hero--text gap-y-4 md:gap-y-5">
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
                                className="flex flex-col max-w-sm mt-4 md:mt-8 md:max-w-md hero--form"
                                onSubmit={handleSubmit}
                            >
                                <h6>
                                    Interested?! Keep up-to date with Gontrel
                                    below
                                </h6>
                                <div
                                    className={`input--container p-2 flex justify-between gap-x-8 mt-4 mb-1
                                    ${
                                        validHelperText.length > 0 ||
                                        submitHelperText.length > 0
                                            ? 'valid'
                                            : ''
                                    }
                                    ${
                                        errorHelperText.length > 0
                                            ? 'invalid'
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
                                            onChange={e =>
                                                setEmail(e.target.value)
                                            }
                                            onInput={e =>
                                                setEmail(e.currentTarget.value)
                                            }
                                            ref={emailInput}
                                        />
                                        <div className="input-helper--text min-h-4">
                                            <HelperText
                                                errorText={errorHelperText}
                                                validText={validHelperText}
                                                submitText={submitHelperText}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center justify-center h-12 px-6 py-4 text-white rounded-md min-w-24 submit--button bg-gontrel-blue"
                                        type="submit"
                                        disabled={
                                            errorHelperText.length > 0 ||
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
                        <div className="flex-row hidden md:flex icon--container gap-x-9">
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
            <div className="w-1/12"></div>
            <div className="relative hidden landing-page--right 2xl:flex 2xl:flex-1 2xl:me-28">
                <img
                    className="absolute top-0 bottom-0 left-0 m-auto max-w-max w-max hero--image"
                    alt="hero image"
                    src={HeroImage}
                />
            </div>
        </div>
    );
};

export default LandingPage;
