<template>
    <ion-item>
        <div class="img"></div>
        <ion-label>
            <h2>Track {{ props.name }}</h2>
            <h3>artist {{ props.artist }}</h3>
        </ion-label>
        <DlButtonComp :trackname="props.name" :id="props.id" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel } from "@ionic/vue";
import { defineProps } from "vue";
import DlButtonComp from "./DlButtonComp.vue";
const props = defineProps<{
    name: string,
    artist: string,
    id: string
}>();
</script>

<style scoped>
.img {
    width: 2rem;
    height: 2rem;
    background-color: red;
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
</style>