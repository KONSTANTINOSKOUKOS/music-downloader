<template>
  <ion-app class="dark">
    <TabsPage />
  </ion-app>
</template>


<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TabsPage from "@/views/TabsPage.vue";
import { state } from "@/state";
import { App } from "@capacitor/app";
import router from './router';

App.addListener('appUrlOpen', e => {
  const slug = e.url.split('.app').pop();// http://example.com{{/playlist/BQa4H6CFpK7}}
  if (slug) {
    router.push(slug);
  }
});
</script>
<style scoped>
</style>