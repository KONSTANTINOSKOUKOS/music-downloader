<template>
    <ion-item>
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
const props = defineProps<{
    name: string,
    id: string,
}>();
</script>

<style scoped>
.img {
    width: 2rem;
    height: 2rem;
    background-color: red;
}

ion-button {
    font-size: larger;
}
</style>