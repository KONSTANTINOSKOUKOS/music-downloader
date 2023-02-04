<template>
    <audio></audio>
    <ion-item color="warning">
        <img src="https://i.scdn.co/image/ab67616d0000b273339f780dfdbc38558ea0761d">
        <ion-label>
            <h2>{{ state.track.name }}Track</h2>
            <h3>{{ state.track.artist }}Artist</h3>
        </ion-label>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" class="bi bi-play-fill"
                viewBox="0 0 16 16">
                <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" class="bi bi-pause-fill"
                viewBox="0 0 16 16">
                <path
                    d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
        </button>
    </ion-item>
</template>
<script lang="ts" setup>
import { state } from "@/state";
import { IonItem, IonProgressBar, IonLabel, IonButton } from "@ionic/vue";
import { onMounted, ref } from "vue";
const audio = ref<HTMLAudioElement | null>(null);
onMounted(() => {
    audio.value = document.querySelector('audio');
    if (!audio.value) return;
    audio.value.src = state.url;
});
</script>
<style scoped>
ion-item {
    width: 95vw;
    margin:auto;
    border-radius: .5rem;
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