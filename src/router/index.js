import { createRouter, createWebHistory } from 'vue-router';

// Importação das páginas
import LoginView from '../views/LoginView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductDetailsView from '../views/ProductDetailsView.vue';
import CartsView from '../views/CartsView.vue';
import CartDetailsView from '../views/CartDetailsView.vue';
import UsersView from '../views/UsersView.vue';
import UserDetailsView from '../views/UserDetailsView.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    name: 'product-details',
    component: ProductDetailsView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/carts',
    name: 'carts',
    component: CartsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/carts/:id',
    name: 'cart-details',
    component: CartDetailsView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: '/users/:id',
    name: 'user-details',
    component: UserDetailsView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('authToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
