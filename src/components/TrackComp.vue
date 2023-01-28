<template>
    <ion-item @click="" button="true">
        <svg v-if="playing" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff"
            viewBox="0 0 16 16">
            <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
        <img class="track-img" :src="props.image">
        <ion-label text-wrap>
            <h2>{{ props.name }}</h2>
            <h3>{{ props.artist }}</h3>
        </ion-label>
        <DlButtonComp :trackname="props.name" :id="props.id" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel } from "@ionic/vue";
import { defineProps, ref } from "vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
const props = defineProps<{
    name: string,
    artist: string,
    id: string,
    image: string
}>();

const playing = ref(false);

const play = () => {
    playing.value = true;
}
</script>

<style scoped>
img {
    width: 3rem;
    height: 3rem;
}

img:hover {
    filter: brightness(40%);
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