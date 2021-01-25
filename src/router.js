import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login';
import SignUp from './components/SignUp';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Login },
        { path: "/signup", component: SignUp },
    ],
});

export default router;