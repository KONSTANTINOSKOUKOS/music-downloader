<template>
  <div v-if="state.token" class="cont">
    <nav>
      <button @click="$router.push('/dl')">
        <svg v-if="$route.path == '/dl'" fill="#ffffff" role="img" height="24" width="24" aria-hidden="true"
          viewBox="0 0 24 24" data-encore-id="icon">
          <path
            d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z">
          </path>
          <path
            d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z">
          </path>
        </svg>
        <svg v-else fill="#ffffff80" role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24"
          data-encore-id="icon">
          <path
            d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z">
          </path>
        </svg>
        <ion-label :style="{ color: $route.path == '/dl' ? 'white' : '#ffffff80' }">Search</ion-label>
      </button>
      <button @click="$router.push('/library')">
        <svg v-if="$route.path == '/library'" fill="#ffffff" role="img" height="24" width="24" aria-hidden="true"
          viewBox="0 0 24 24" data-encore-id="icon">
          <path
            d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z">
          </path>
        </svg>
        <svg v-else fill="#ffffff80" role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24"
          data-encore-id="icon">
          <path
            d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z">
          </path>
        </svg>
        <ion-label :style="{ color: $route.path == '/library' ? 'white' : '#ffffff80' }">Library</ion-label>
      </button>
    </nav>
    <MiniPlayer v-if="state.track.id" class="mp"></MiniPlayer>
  </div>
</template>

<script lang="ts" setup>
import { IonLabel } from '@ionic/vue';
import { state } from "@/state";
import MiniPlayer from '@/components/MiniPlayer.vue';
</script>

<style scoped>
.cont {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

nav {
  position: absolute;
  bottom: 0;
  width: 100vw;
  z-index: 100;
  background-color: #121212;
  display: flex;
  flex-direction: row;
  align-items: center;
}

button {
  margin: .5rem auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-label {
  color: white;
}
</style>