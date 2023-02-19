import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { state } from '@/state';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/CallbackPage.vue')
  },
  {
    path: '/',
    redirect: '/dl'
  },
  {
    path: '/dl',
    name: 'dl',
    component: () => import('@/views/SearchPage.vue')
  },
  {
    path: '/library',
    name: 'lib',
    component: () => import('@/views/LibraryPage.vue')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/PlaylistPage.vue')
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('@/views/AlbumPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (state.token == '') {
    if (to.name != 'login' && to.name != 'callback') {//login doesn't need token
      return '/login';
    }
  }
});

router.afterEach((to) => {
  if (to.name == 'login' || to.name == 'callback') return;
  state.token = localStorage.getItem('token') as string;
  state.refresh = localStorage.getItem('refresh') as string;
});

export default router
