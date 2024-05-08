import { initializeApp } from "firebase/app";

export const environment = {
  production: true,
  apiUrl: 'http://vtesapp.duckdns.org:3000',
  firebaseConfig : {
    apiKey: "AIzaSyAQwn0Ez3iUke7plRTZhhCVT1KeCJAbHoY",
    authDomain: "vtesimage.firebaseapp.com",
    projectId: "vtesimage",
    storageBucket: "vtesimage.appspot.com",
    messagingSenderId: "895034302185",
    appId: "1:895034302185:web:77221e3dafb8683a7b1a78"
  }
};


// Initialize Firebase
const firebaseConfig = environment.firebaseConfig;
export const app = initializeApp(firebaseConfig);
