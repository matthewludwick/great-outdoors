import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { 
  getFirestore, getDocs, collection, query, where, addDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyCbBLJOfLI0nSZaBKsiBxy1QycJ0yKMaF8",

  authDomain: "it115-greatoutdoors.firebaseapp.com",

  projectId: "it115-greatoutdoors",

  storageBucket: "it115-greatoutdoors.firebasestorage.app",

  messagingSenderId: "317621110901",

  appId: "1:317621110901:web:f29e9f294e647143ed103c"

};


const app = initializeApp(firebaseConfig);

window._firebaseAuth  = getAuth(app);
window._firebaseDb    = getFirestore(app);
window._firestoreFns  = { getDocs, collection, query, where };
window._firestoreWriteFns = { addDoc };