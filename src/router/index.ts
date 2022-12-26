import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SearchPage from "@/views/SearchPage.vue";
import LibraryPage from "@/views/LibraryPage.vue";
import PlaylistPage from "@/views/PlaylistPage.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dl'
  },
  {
    path: '/dl',
    name:'search',
    component: SearchPage
  },
  {
    path: '/library',
    name:'lib',
    component: () => import('@/views/LibraryPage.vue')
  },
  {
    path: '/playlist/:id',
    name:'playlist',
    component: () => import('@/views/PlaylistPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
