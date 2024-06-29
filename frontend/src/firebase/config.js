import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD9u345P-zkGJFqeKtT-PbW_CJ4_NLc_oE",
    authDomain: "crud-8dcdc.firebaseapp.com",
    projectId: "crud-8dcdc",
    storageBucket: "crud-8dcdc.appspot.com",
    messagingSenderId: "301594376552",
    appId: "1:301594376552:web:874695b1dd6514b7347edd",
    measurementId: "G-V01MBM1FVY"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
