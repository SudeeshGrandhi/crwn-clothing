import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//doc represents document
//getDoc and setDoc used to set documents data
const firebaseConfig = {
  apiKey: "AIzaSyBwfi18jUUU66kG8ax64s7CGxKWR31_cQ4",
  authDomain: "crwn-clothing-db-39e17.firebaseapp.com",
  projectId: "crwn-clothing-db-39e17",
  storageBucket: "crwn-clothing-db-39e17.appspot.com",
  messagingSenderId: "829995594941",
  appId: "1:829995594941:web:0a2952918837c461f6b3d4",
};
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
//the way application authenticates wont change so only new keyword is not used
const provider = new GoogleAuthProvider();
//here GoogleAuthProvider is a class where we can generate multiple based on conditions

provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, provider);

const database = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //to check the database whether it has any documents inside it
  //doc will have three arguments 1)Which database it shud check 2)collection 3)Unique identifier
  const userDocRef = doc(database, "users", userAuth.uid);

  //userSnapshot is userData
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
