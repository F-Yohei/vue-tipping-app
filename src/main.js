import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'
import firebase from 'firebase';
import config from './firebase.config';


firebase.initializeApp(config);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');