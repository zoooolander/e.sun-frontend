import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminPanel from '../components/AdminPanel.vue';
import VotingPage from '../components/VotingPage.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminPanel },
  { path: '/vote', component: VotingPage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
