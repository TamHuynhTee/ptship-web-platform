import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCQomrV8KjqEkx9WW_mQKA8f7LVE1ngJ7s',
    authDomain: 'ptship-web-platform.firebaseapp.com',
    projectId: 'ptship-web-platform',
    storageBucket: 'ptship-web-platform.appspot.com',
    messagingSenderId: '478020605166',
    appId: '1:478020605166:web:fa5c854614bd3754074fff',
    measurementId: 'G-YK47QHD3V3',
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
