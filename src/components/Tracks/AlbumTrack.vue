<template>
    <ion-item :button="true" @click="play">
        <ion-label>
            <h2>{{ props.name }}</h2>
        </ion-label>
        <DlButtonComp :id="props.id" :trackname="props.name" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel, toastController } from "@ionic/vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
import { defineProps } from "vue";
import axios from "axios";
import { state } from "@/state";
import { FastAverageColor } from "fast-average-color";
const props = defineProps<{
    name: string,
    id: string,
    artist: string,
    image: string,
    duration: number
}>();

const c = new FastAverageColor();

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
ion-button {
    font-size: larger;
}
</style>