<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-spinner v-if="loading" name="crescent"></ion-spinner>
            <div v-else>
                <ion-col>
                    <img :src="data.image">
                    <h1>{{ data.name }}</h1>
                    <h3>{{ data.owner }}</h3>
                </ion-col>
                <hr>
                <ion-list lines="none">
                    <TrackComp v-for="tr in data.tracks" :key="tr.id" :artist="tr.artist" :name="tr.name" :id="tr.id"
                        :image="tr.image" :duration="tr.duration" />
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCol, IonList, IonPage, IonContent, IonSpinner, onIonViewWillEnter } from "@ionic/vue";
import TrackComp from "@/components/TrackComp.vue";
import { ref } from "vue";
import { Playlist, state } from "@/state";
import router from "@/router";
import axios from "axios";

const loading = ref(true);
const data = ref<Playlist>({} as Playlist);

onIonViewWillEnter(async () => {
    state.token = localStorage.getItem('token') as string;
    state.refresh = localStorage.getItem('refresh') as string;

    loading.value = true;
    data.value = (await axios.get(`https://music-downloader-vercel.vercel.app/api/playlist?id=${router.currentRoute.value.query.id}&token=${state.token}`)).data;
    loading.value = false;
});
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

img {
    width: 7rem;
    height: 7rem;
}

hr {
    background-color: rgba(255, 255, 255, 0.25);
}

ion-col {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h3 {
    color: rgba(255, 255, 255, .68);
}
</style>