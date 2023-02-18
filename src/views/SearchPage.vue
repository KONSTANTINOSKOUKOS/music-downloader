<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <form @submit.prevent="search">
        <ion-searchbar @ion-change="termchange" show-clear-button="focus" :value="term" color="light" mode="ios" />
      </form>
      <ion-spinner v-if="loading"></ion-spinner>
      <div v-else>
        <ion-row>
          <ion-chip :class="cat == 'tracks' ? 'selected' : ''" @click="cat = 'tracks'" color="light">Tracks</ion-chip>
          <ion-chip :class="cat == 'playlists' ? 'selected' : ''" @click="cat = 'playlists'"
            color="light">Playlists</ion-chip>
          <ion-chip :class="cat == 'albums' ? 'selected' : ''" @click="cat = 'albums'" color="light">Albums</ion-chip>
        </ion-row>
        <ion-list lines="none">
          <div v-if="cat == 'tracks'">
            <TrackComp v-for="tr in data.tracks" :key="tr.id" :name="tr.name" :artist="tr.artist" :id="tr.id"
              :image="tr.image" :duration="tr.duration" />
          </div>
          <div v-else-if="cat == 'playlists'">
            <PlaylistComp @click="$router.push(`/playlist/?id=${pl.id}`)" v-for="pl in data.playlists" :key="pl.id"
              :name="pl.name" :artist="pl.owner" :id="pl.id" :image="pl.image" />
          </div>
          <div v-else-if="cat == 'albums'">
            <AlbumComp @click="$router.push(`/album/?id=${al.id}`)" v-for="al in data.albums" :key="al.id"
              :name="al.name" :artist="al.artist" :id="al.id" :image="al.image" />
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonSearchbar, IonList, IonRow, IonChip, IonSpinner } from '@ionic/vue';
import TrackComp from '@/components/TrackComp.vue';
import PlaylistComp from '@/components/PlaylistComp.vue';
import AlbumComp from '@/components/AlbumComp.vue';
import { onMounted, ref } from "vue";
import { state, Search } from '@/state';
import axios from 'axios';

const loading = ref(false);
const term = ref('');
const data = ref<Search>({} as Search);

onMounted(() => {
  console.log('SearchPage mounted');
  state.token = localStorage.getItem('token') as string;
  state.refresh = localStorage.getItem('refresh') as string;
});
const cat = ref('tracks');

const search = async () => {
  if (term.value == '') return;
  loading.value = true;
  const str = encodeURI(term.value);
  data.value = (await axios.get(`https://music-downloader-vercel.vercel.app/api/search?term=${str}&token=${state.token}`)).data;
  loading.value = false;
}

const termchange = (e: any) => {
  term.value = e.target.value;
}

</script>
<style scoped>
ion-list {
  margin-bottom: 10rem;
}

ion-spinner {
  width: 4rem;
  height: 4rem;
  margin-top: calc((100vh - 8rem) / 2);
  margin-bottom: calc((100vh - 8rem) / 2);
  margin-left: calc((100vw - 8rem) / 2);
  margin-right: calc((100vw - 8rem) / 2);
}

ion-row {
  margin: 1rem 1rem;
  display: flex;
  align-items: center;
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