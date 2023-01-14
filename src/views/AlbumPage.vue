<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-col>
                <div class="img"></div>
                <h1>Album {{ $route.params.id }}</h1>
                <h3>Artist</h3>
            </ion-col>
            <hr>
            <ion-list>
                <AlbumTrack v-for="a in 10" :key="a" :name="a" :id="a" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCol, IonList, IonPage, IonContent } from "@ionic/vue";
import AlbumTrack from "@/components/Tracks/AlbumTrack.vue";
import { onMounted } from "vue";
import { state } from "@/state";

onMounted(() => {
  state.token = localStorage.getItem('token') as string;
  state.refresh = localStorage.getItem('refresh') as string;
});
</script>

<style scoped>
.img {
    width: 7rem;
    height: 7rem;
    background-color: red;
}

.imgg {
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