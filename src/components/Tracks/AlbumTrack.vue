<template>
    <ion-item>
        <div class="img"></div>
        <ion-label>
            <h2>Track {{ props.name }}</h2>
        </ion-label>
        <DlButtonComp :trackname="props.name" />
    </ion-item>
</template>

<script lang="ts" setup>
import { IonItem, IonLabel } from "@ionic/vue";
import DlButtonComp from "@/components/Tracks/DlButtonComp.vue";
import { defineProps } from "vue";
const props = defineProps<{
    name: number,
    id: number
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
</style>