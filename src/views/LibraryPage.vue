<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-row>
        <img v-if="state.user.image != ''" :src="state.user.image">
        <h1>{{ state.user.name }}</h1>
      </ion-row>
      <ion-row>
        <ion-chip :class="cat == 'tracks' ? 'selected' : ''" @click="cat = 'tracks'" color="light">Tracks</ion-chip>
        <ion-chip :class="cat == 'playlists' ? 'selected' : ''" @click="cat = 'playlists'"
          color="light">Playlists</ion-chip>
        <ion-chip :class="cat == 'albums' ? 'selected' : ''" @click="cat = 'albums'" color="light">Albums</ion-chip>
      </ion-row>
      <ion-spinner v-if="loading" name="crescent"></ion-spinner>
      <ion-list v-else lines="none">
        <div v-if="cat == 'tracks'">
          <p v-if="state.user.tracks.length == 0">You have no saved tracks in your Spotify account!</p>
          <TrackComp v-else v-for="tr in state.user.tracks" :key="tr.id" :name="tr.name" :artist="tr.artist" :id="tr.id"
            :image="tr.image" :duration="tr.duration" />
        </div>
        <div v-else-if="cat == 'playlists'">
          <p v-if="state.user.playlists.length == 0">You have no saved playlists in your Spotify account!</p>
          <PlaylistComp v-else @click="nav(`/playlist?id=${pl.id}`)" v-for="pl in state.user.playlists" :key="pl.id"
            :name="pl.name" :artist="pl.owner" :id="pl.id" :image="pl.image" />
        </div>
        <div v-else-if="cat == 'albums'">
          <p v-if="state.user.albums.length == 0">You have no saved albums in your Spotify account!</p>
          <AlbumComp v-else @click="nav(`/album?id=${al.id}`)" v-for="al in state.user.albums" :key="al.id"
            :name="al.name" :artist="al.artist" :id="al.id" :image="al.image" />
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonRow, IonChip, IonList, IonSpinner, IonRefresher, IonRefresherContent, toastController } from '@ionic/vue';
import TrackComp from '@/components/TrackComp.vue';
import PlaylistComp from '@/components/PlaylistComp.vue';
import AlbumComp from '@/components/AlbumComp.vue';
import { onMounted, ref } from 'vue';
import { state } from "@/state";
import axios from 'axios';
import router from '@/router';
import { IonRefresherCustomEvent, RefresherEventDetail } from '@ionic/core';

const cat = ref('tracks');
const loading = ref(true);

onMounted(() => {
  state.token = localStorage.getItem('token') as string;
  state.refresh = localStorage.getItem('refresh') as string;

  console.log('LibraryPage mounted');
  fetch();
});

const fetch = async () => {
  loading.value = true;
  try {
    const [user, trs, pls, als] = await Promise.all([
      axios.get(`https://music-downloader-vercel.vercel.app/api/me?token=${state.token}`),
      axios.get(`https://music-downloader-vercel.vercel.app/api/usertrs?token=${state.token}`),
      axios.get(`https://music-downloader-vercel.vercel.app/api/userpls?token=${state.token}`),
      axios.get(`https://music-downloader-vercel.vercel.app/api/userals?token=${state.token}`)
    ]);

    state.user.name = user.data.name;
    state.user.image = user.data.image ? user.data.image : '';

    state.user.tracks = trs.data.trs;
    state.user.playlists = pls.data.pls;
    state.user.albums = als.data.als;

  } catch (error) {
    loading.value = false;
    const toast = await toastController.create({ message: 'An error happened during loading. Please swipe down to retry.', animated: true, duration: 1700 })
    await toast.present();
  }

  loading.value = false;
}

const nav = (url: string) => {
  router.push(url);
}

const refresh = async (e: IonRefresherCustomEvent<RefresherEventDetail>) => {
  await fetch();
  e.target.complete();
}
</script>

<style scoped>
ion-list {
  margin-bottom: 10rem;
}

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

ion-spinner {
  width: 4rem;
  height: 4rem;
  margin-left: 40vw;
  margin-top: 30vh;
}
</style>
