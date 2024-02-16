import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import {
    CACHE_SIZE_UNLIMITED,
    connectFirestoreEmulator,
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

let firebaseApp: FirebaseApp;
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export const setupFirebase = () => {
    try {
        const firebaseConfig = getFirebaseConfig();
        firebaseApp = initializeApp(firebaseConfig);
        initializeFirestore(firebaseApp, {
            localCache: persistentLocalCache(
                /*settings*/ { cacheSizeBytes: CACHE_SIZE_UNLIMITED }
            ),
        });

        console.log("Firebase initialized successfully!");
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
};

const getFirebaseConfig = () => {
    return {
        apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASE_APPID,
    };
};

let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;
let analytics: ReturnType<typeof getAnalytics>;

export const handleAnalytics = () => {
    if (!analytics) {
        analytics = getAnalytics(firebaseApp);
    }
    return analytics;
};

export const handleAuth = () => {
    auth = getAuth(firebaseApp);
    if (useEmulator()) {
        connectAuthEmulator(auth, "http://localhost:9099");
    }
    return auth;
};

export const handleFirestore = () => {
    if (!firestore) {
        firestore = getFirestore();
        if (useEmulator()) {
            connectFirestoreEmulator(firestore, "localhost", 8080);
        }
    }
    return firestore;
};

export const handleStorage = () => {
    if (!storage) {
        storage = getStorage();
        if (useEmulator()) {
            connectStorageEmulator(storage, "localhost", 9199);
        }
    }
    return storage;
};
