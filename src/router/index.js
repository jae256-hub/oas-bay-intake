import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
    { path: "/", name: "Login", component: Login },
    {
        path: "/intake", name: "intake",
        component: () => import('../views/IntakeView.vue')
    },
    {
        path: "/parts", name: 'PartCard',
        component: () => import('../views/PartCard.vue')
    },
    {
        path: "/job/:plate", name: 'JobCardForm',
        component: () => import('../views/JobCardForm.vue')
    },
    {
        path: "/bays", name: "ConfirmationCard",
        component: () => import('../views/ConfirmationCard.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to) => {
    const saved = localStorage.getItem("user");
    const loggedIn = saved ? JSON.parse(saved) : null;

    if (to.name !== 'Login' && !loggedIn) {
        return { name: 'Login' }
    }
});

export default router;
