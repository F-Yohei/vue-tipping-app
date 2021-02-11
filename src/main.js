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


router.beforeEach((to, from, next) => {
    if (to.path === '/home') {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                next()
            } else {
                next('/')
            }
        })
    } else {
        next();
    }
});