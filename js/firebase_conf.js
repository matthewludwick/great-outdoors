import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { 
  getFirestore, getDocs, collection, query, where, addDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZOrM0lwRV95U6F2M_haRWECfpKNSF3Ys",
  authDomain: "greatoutdoors2026-9bb57.firebaseapp.com",
  projectId: "greatoutdoors2026-9bb57",
  storageBucket: "greatoutdoors2026-9bb57.firebasestorage.app",
  messagingSenderId: "211146039825",
  appId: "1:211146039825:web:835e7658a54ab074e847b0"
};

const app = initializeApp(firebaseConfig);

window._firebaseAuth  = getAuth(app);
window._firebaseDb    = getFirestore(app);
window._firestoreFns  = { getDocs, collection, query, where };
window._firestoreWriteFns = { addDoc };