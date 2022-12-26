import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SearchPage from "@/views/SearchPage.vue";
import LibraryPage from "@/views/LibraryPage.vue";
import PlaylistPage from "@/views/PlaylistPage.vue";
import AlbumPage from '@/views/AlbumPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dl'
  },
  {
    path: '/dl',
    name: 'search',
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

export default router
