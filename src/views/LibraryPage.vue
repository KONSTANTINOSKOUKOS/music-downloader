<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="logincont" v-if="state.token == ''">
        <button><b>Log in with your Spotify account</b></button>
      </div>
      <div v-else>
        <ion-row>
          <div class="img"></div>
          <h1>User Name</h1>
        </ion-row>
        <ion-row>
          <ion-chip :class="cat == 'tracks' ? 'selected' : ''" @click="cat = 'tracks'" color="success">Tracks</ion-chip>
          <ion-chip :class="cat == 'playlists' ? 'selected' : ''" @click="cat = 'playlists'"
            color="success">Playlists</ion-chip>
          <ion-chip :class="cat == 'albums' ? 'selected' : ''" @click="cat = 'albums'" color="success">Albums</ion-chip>
        </ion-row>
        <ion-list lines="none">
          <div v-if="cat == 'tracks'">
            <TrackComp v-for="a in 10" :key="a" :name="a" :artist="a" :id="a" />
          </div>
          <div v-else-if="cat == 'playlists'">
            <PlaylistComp @click="$router.push(`/playlist/${a}`)" v-for="a in 10" :key="a" :name="a" :artist="a"
              :id="a" />
          </div>
          <div v-else-if="cat == 'albums'">
            <AlbumComp @click="$router.push(`/album/${a}`)" v-for="a in 10" :key="a" :name="a" :artist="a" :id="a" />
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonRow, IonChip, IonList } from '@ionic/vue';
import TrackComp from '@/components/TrackComp.vue';
import PlaylistComp from '@/components/PlaylistComp.vue';
import AlbumComp from '@/components/AlbumComp.vue';
import { ref } from 'vue';
import { state } from "@/state";

const cat = ref('tracks');
</script>

<style scoped>
ion-row {
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
}

.img {
  width: 3rem;
  height: 3rem;
  background-color: red;
  border-radius: 50%;
}

h1 {
  margin-left: 15%;
}

.selected {
  background-color: #2dd36f;
  color: #121212;
  /* color: white; */
}

.logincont {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

button {
  font-size: larger;
  color: black;
  background-color: #2dd36f;
  padding: 1rem 1rem;
  border-radius: 5rem;
}

button:active {
  background-color: #28ba62;
}
</style>
