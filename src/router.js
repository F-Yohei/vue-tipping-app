import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Login },
        { path: "/signup", component: SignUp },
        { path: "/home", component: Home },
    ],
});

export default router;