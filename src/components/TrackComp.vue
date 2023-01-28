<template>
    <ion-item>
        <img :src="props.image" alt="">
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
const props = defineProps<{
    name: string,
    artist: string,
    id: string,
    image: string
}>();
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