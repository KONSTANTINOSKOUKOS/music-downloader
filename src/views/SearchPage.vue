<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-searchbar color="light" mode="ios" />
      <ion-row>
        <ion-chip :class="cat == 'tracks' ? 'selected' : ''" @click="cat = 'tracks'" color="light">Tracks</ion-chip>
        <ion-chip :class="cat == 'playlists' ? 'selected' : ''" @click="cat = 'playlists'"
          color="light">Playlists</ion-chip>
        <ion-chip :class="cat == 'albums' ? 'selected' : ''" @click="cat = 'albums'" color="light">Albums</ion-chip>
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
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonSearchbar, IonList, IonRow, IonChip } from '@ionic/vue';
import TrackComp from '@/components/TrackComp.vue';
import PlaylistComp from '@/components/PlaylistComp.vue';
import AlbumComp from '@/components/AlbumComp.vue';
import { onMounted, ref } from "vue";

onMounted(() => {
  console.log('SearchPage mounted');
});

const cat = ref('tracks');
</script>
<style scoped>
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