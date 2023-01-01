<template>
  <ion-app class="dark">
    <ion-router-outlet></ion-router-outlet>
    <TabsPage v-if="state.token != ''" />
  </ion-app>
</template>


<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TabsPage from "@/views/TabsPage.vue";
import { state } from "@/state";
</script>