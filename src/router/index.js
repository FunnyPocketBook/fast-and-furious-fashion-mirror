import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import DevPage from "../views/DevPage.vue";
// const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/dev',
        name: 'Develop',
        component: DevPage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

export default router;
