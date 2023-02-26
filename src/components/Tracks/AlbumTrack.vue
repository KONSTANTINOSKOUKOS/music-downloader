<template>
    <ion-item :button="true" @click="play">
        <ion-label>
            <h2>{{ props.name }}</h2>
        </ion-label>
        <DlButtonComp :id="props.id" :trackname="props.name" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel } from "@ionic/vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
import { defineProps } from "vue";
import { state } from "@/state";
const props = defineProps<{
    name: string,
    id: string,
    artist: string,
    image: string,
    duration: number
}>();

const play = async () => {
    state.track = { name: props.name, artist: props.artist, image: props.image, id: props.id, duration: props.duration };
}
</script>

<style scoped>
ion-button {
    font-size: larger;
}
</style>