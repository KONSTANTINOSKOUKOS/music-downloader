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
import { IonItem, IonLabel } from "@ionic/vue";
import { defineProps } from "vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
import { state } from "@/state";
const props = defineProps<{
    name: string,
    artist: string,
    id: string,
    image: string,
    duration: number
}>();

const play = async () => {
    state.track = { name: props.name, artist: props.artist, image: props.image, id: props.id, duration: props.duration };
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