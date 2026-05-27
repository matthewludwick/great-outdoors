import { auth, db } from "firebase_conf.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

async function getUsers() {
  const snapshot = await getDocs(collection(db, "users"));
  snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}

getUsers();