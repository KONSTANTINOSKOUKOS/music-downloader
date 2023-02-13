<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-spinner v-if="loading" name="crescent"></ion-spinner>
            <div v-else>
                <ion-col>
                    <img :src="data.image" />
                    <h1>{{ data.name }}</h1>
                    <h3>{{ data.artist }}</h3>
                </ion-col>
                <hr>
                <ion-list lines="none">
                    <AlbumTrack v-for="tr in data.tracks" :key="tr.id" :name="tr.name" :id="tr.id" :artist="data.artist"
                        :image="data.image" :duration="tr.duration" />
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCol, IonList, IonPage, IonContent, IonSpinner, onIonViewWillEnter } from "@ionic/vue";
import AlbumTrack from "@/components/Tracks/AlbumTrack.vue";
import { onMounted, ref } from "vue";
import { state, Album } from "@/state";
import axios from "axios";
import router from "@/router";

const data = ref<Album>({} as Album);
const loading = ref(true);

onIonViewWillEnter(async () => {
    state.token = localStorage.getItem('token') as string;
    state.refresh = localStorage.getItem('refresh') as string;

    loading.value = true;
    data.value = (await axios(`https://music-downloader-vercel.vercel.app/api/album?id=${router.currentRoute.value.query.id}&token=${state.token}`)).data;
    loading.value = false;
});
</script>

<style scoped>
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

ion-label {
    margin-left: 15%;
}

ion-button {
    font-size: larger;
}

h3 {
    color: rgba(255, 255, 255, .68);
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
</style>