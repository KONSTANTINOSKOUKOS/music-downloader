<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="logincont">
                <h1>To use the app,</h1>
                <button @click="login"><b>Log in with your Spotify account</b></button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import router from "@/router";
import { state } from "@/state";
import { IonPage, IonContent } from "@ionic/vue";
import axios from "axios";
import { onMounted } from "vue";

onMounted(async () => {
    const code = router.currentRoute.value.query.code;
    if (code) {
        const res = await axios.get(`https://music-downloader-server.vercel.app/token/${code}`);
        state.token = res.data.token;
        state.refresh = res.data.refresh;
        router.push({name:'dl'})
    }
});

const login = async () => {
    console.log('ok');
    const res = await axios.get('https://music-downloader-server.vercel.app/login');
    const win = window.open(res.data, '_self');
}
</script>

<style scoped>
.logincont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

button {
    font-size: larger;
    color: black;
    background-color: #2dd36f;
    padding: 1rem 1rem;
    border-radius: 5rem;
}

button:active {
    background-color: #28ba62;
}
</style>