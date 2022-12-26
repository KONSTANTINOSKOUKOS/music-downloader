<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-col>
                <div class="img"></div>
                <h1>Playlist {{ $route.params.id }}</h1>
            </ion-col>
            <hr>
            <ion-list>
                <TrackCompVue v-for="a in 10" :key="a" :artist="a" :name="a" :id="a" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCol, IonList, IonPage, IonContent } from "@ionic/vue";
import TrackCompVue from "@/components/TrackComp.vue";
</script>

<style scoped>
.img {
    width: 7rem;
    height: 7rem;
    background-color: red;
}

hr {
    background-color: rgba(255, 255, 255, 0.25);
}

ion-col {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>