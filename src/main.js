import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';
import config from './firebase.config';


firebase.initializeApp(config);

const app = createApp(App);
app.use(router);
app.mount('#app');