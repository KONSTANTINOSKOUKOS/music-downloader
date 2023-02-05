<template>
    <audio :src="state.url"></audio>
    <ion-item color="warning">
        <img :src="state.track.image">
        <ion-label text-wrap>
            <h2>{{ state.track.name }}</h2>
            <h3>{{ state.track.artist }}</h3>
        </ion-label>
        <ion-spinner name="crescent" v-if="state.trackloading"></ion-spinner>
        <button v-else @click="toggle">
            <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff"
                class="bi bi-play-fill" viewBox="0 0 16 16">
                <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff"
                class="bi bi-pause-fill" viewBox="0 0 16 16">
                <path
                    d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
        </button>
    </ion-item>
    <!-- <ion-range></ion-range> -->
</template>
<script lang="ts" setup>
import { state } from "@/state";
import { IonItem, IonRange, IonLabel, IonButton, IonSpinner } from "@ionic/vue";
import { onMounted, ref } from "vue";
const audio = ref<HTMLAudioElement | null>(null);
const playing = ref(false);

onMounted(() => {
    audio.value = document.querySelector('audio');
    if (!audio.value) return;
    audio.value.oncanplaythrough = () => { state.trackloading = false; audio.value?.pause(); playing.value = false; };
    audio.value.onpause = () => playing.value = false;
    audio.value.onplay = () => playing.value = true;
});

const toggle = () => {
    if (audio.value?.paused)
        audio.value?.play();
    else
        audio.value?.pause();
}

</script>
<style scoped>
ion-range {
    width: 95vw;
    height: 10px;
    margin: 0 auto;
}

ion-item {
    width: 95vw;
    margin: auto;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
}

img {
    width: 3rem;
    height: 3rem;
}

ion-label {
    margin: .5rem 1rem;
}

h3 {
    color: rgba(255, 255, 255, .68);
}

button {
    background: transparent;
}
</style>