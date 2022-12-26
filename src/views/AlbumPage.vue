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
                <ion-item v-for="a in 10" :key="a">
                    <div class="imgg"></div>
                    <ion-label>
                        <h2>Track {{ a }}</h2>
                    </ion-label>
                    <ion-button fill="clear">🔽</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCol, IonList, IonPage, IonContent, IonItem, IonLabel, IonButton } from "@ionic/vue";
</script>

<style scoped>
.img {
    width: 7rem;
    height: 7rem;
    background-color: red;
}

.imgg{
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