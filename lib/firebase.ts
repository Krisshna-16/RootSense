// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMcaqSb18tvwzfzEdpHYkytx_gy6JU6lQ",
    authDomain: "rootsense-bcf52.firebaseapp.com",
    projectId: "rootsense-bcf52",
    storageBucket: "rootsense-bcf52.appspot.com", // ✅ FIXED BUCKET
    messagingSenderId: "257835913265",
    appId: "1:257835913265:web:53e1538f19bf7beaf24510",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
