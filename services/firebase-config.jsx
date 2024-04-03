import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA4TwsCxC2_Bifx5PJe-R-RTnjefqzojqE",
	authDomain: "quiz-d-38741.firebaseapp.com",
	projectId: "quiz-d-38741",
	storageBucket: "quiz-d-38741.appspot.com",
	messagingSenderId: "78723670225",
	appId: "1:78723670225:web:015f89afae332f126865f0",
	measurementId: "G-7L77BW998T",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
