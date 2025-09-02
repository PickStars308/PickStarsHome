import {createMemoryHistory, createRouter} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/About',
        name: 'About',
        component: () => import('@/views/About.vue')
    },
    {
        path: '/FriendLinks',
        name: 'FriendLinks',
        component: () => import('@/views/FriendLinks.vue')
    }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;

