import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SearchPage from "@/views/SearchPage.vue";
import LibraryPage from "@/views/LibraryPage.vue";
import PlaylistPage from "@/views/PlaylistPage.vue";
import AlbumPage from '@/views/AlbumPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import CallbackPage from '@/views/CallbackPage.vue';
import { state } from '@/state';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/callback',
    name: 'callback',
    component: CallbackPage
  },
  {
    path: '/',
    redirect: '/dl'
  },
  {
    path: '/dl',
    name: 'dl',
    component: SearchPage
  },
  {
    path: '/library',
    name: 'lib',
    component: LibraryPage
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: () => PlaylistPage
  },
  {
    path: '/album/:id',
    name: 'album',
    component: () => AlbumPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeResolve((to, from) => {
  if (state.token == '') {
    if (to.name != 'login' && to.name != 'callback')//login doesn't need token
      //return '/login';
  }
  if ((to.name == 'login' || to.name == 'callback') && state.token != '') {//when token is ok go to /dl
    //return '/dl';
  }
});

router.afterEach((to, from) => {
  if (to.name == 'login' || to.name == 'callback') return;
  state.token = localStorage.getItem('token') as string;
  state.refresh = localStorage.getItem('refresh') as string;
});

export default router
