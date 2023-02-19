<template>
    <ion-item @click="play" :button="true">
        <img :src="props.image">
        <ion-label text-wrap>
            <h2>{{ props.name }}</h2>
            <h3>{{ props.artist }}</h3>
        </ion-label>
        <DlButtonComp :trackname="props.name" :id="props.id" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel, toastController } from "@ionic/vue";
import { defineProps, ref } from "vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
import axios from "axios";
import { state } from "@/state";
import { FastAverageColor } from "fast-average-color";
const props = defineProps<{
    name: string,
    artist: string,
    id: string,
    image: string,
    duration: number
}>();

const c = new FastAverageColor();

const playing = ref(false);

const play = async () => {
    state.url = '';
    document.querySelector('audio')?.pause();
    state.trackloading = true;
    state.color = (await c.getColorAsync(props.image, { crossOrigin: 'anonymous', algorithm: 'simple' }));
    state.track = { name: props.name, artist: props.artist, image: props.image, id: props.id, duration: props.duration };
    try {
        const data = (await axios.get(`https://music-downloader-vercel.vercel.app/api/dl?id=${props.id}&token=${state.token}`)).data;
        state.url = data.url;
    } catch (error) {
        state.trackloading = false;
        const toast = await toastController.create({ message: 'An error happened during loading. Please click it again.', animated: true, duration: 1700 })
        await toast.present();
    }
}
</script>

<style scoped>
img {
    width: 3rem;
    height: 3rem;
}

ion-label {
    margin-left: 10%;
}

ion-button {
    font-size: larger;
}

h3 {
    color: rgba(255, 255, 255, .68);
}
</style>