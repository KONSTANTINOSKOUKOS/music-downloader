<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-row>
        <img :src="state.user.image">
        <h1>{{ state.user.name }}</h1>
      </ion-row>
      <ion-row>
        <ion-chip :class="cat == 'tracks' ? 'selected' : ''" @click="cat = 'tracks'" color="light">Tracks</ion-chip>
        <ion-chip :class="cat == 'playlists' ? 'selected' : ''" @click="cat = 'playlists'"
          color="light">Playlists</ion-chip>
        <ion-chip :class="cat == 'albums' ? 'selected' : ''" @click="cat = 'albums'" color="light">Albums</ion-chip>
      </ion-row>
      <ion-list lines="none">
        <div v-if="cat == 'tracks'">
          <TrackComp v-for="tr in state.user.tracks" :key="tr.id" :name="tr.name" :artist="tr.artist" :id="tr.id"
            :image="tr.image" />
        </div>
        <div v-else-if="cat == 'playlists'">
          <PlaylistComp @click="$router.push(`/playlist/${pl.id}`)" v-for="pl in state.user.playlists" :key="pl.id"
            :name="pl.name" :artist="pl.owner" :id="pl.id" :image="pl.image" />
        </div>
        <div v-else-if="cat == 'albums'">
          <AlbumComp @click="$router.push(`/album/${al.id}`)" v-for="al in state.user.playlists" :key="al.id"
            :name="al.name" :artist="al.owner" :id="al.id" :image="al.image" />
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonRow, IonChip, IonList } from '@ionic/vue';
import TrackComp from '@/components/TrackComp.vue';
import PlaylistComp from '@/components/PlaylistComp.vue';
import AlbumComp from '@/components/AlbumComp.vue';
import { onMounted, ref } from 'vue';
import { state } from "@/state";
import axios from 'axios';


onMounted(async () => {
  const user = (await axios.get(`https://music-downloader-server.vercel.app/${state.token}/me`)).data;
  state.user.name = user.name;
  state.user.image = user.image;
  const trs = (await axios.get(`https://music-downloader-server.vercel.app/${state.token}/usertrs`)).data;
  state.user.tracks = trs;
  const pls = (await axios.get(`https://music-downloader-server.vercel.app/${state.token}/userpls`)).data;
  state.user.playlists = pls;
  const als = (await axios.get(`https://music-downloader-server.vercel.app/${state.token}/userals`)).data;
  state.user.albums = als;
});
const cat = ref('tracks');
</script>

<style scoped>
ion-row {
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
}

img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

h1 {
  margin-left: 15%;
}

ion-chip {
  --ion-color-light-shade: #ffffff;
}

.selected {
  background-color: #2dd36f;
  color: #121212;
  /* color: white; */
}
</style>
