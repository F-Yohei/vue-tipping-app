import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCWpbXUYPg2TMkHbYCp1-RhjaldoP_PMPY",
    authDomain: "vue-nagesen-app.firebaseapp.com",
    projectId: "vue-nagesen-app",
    storageBucket: "vue-nagesen-app.appspot.com",
    messagingSenderId: "825653445237",
    appId: "1:825653445237:web:5ce8057c3fe34bcd1b2e3c"
};

firebase.initializeApp(config);

const app = createApp(App);
app.use(router);
app.mount('#app');