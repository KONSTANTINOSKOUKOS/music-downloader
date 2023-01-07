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
import { onMounted, ref } from "vue";

onMounted(() => {
    state.token = '';
    state.refresh = '';
    console.log('LoginPage mounted');
});

const login = async () => {
    console.log('redirecting...');

    //RANDOM 64 CHAR STRING
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 64; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('codeverifier', text);
    // ENCODE WITH SHA-256
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    const challenge = btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=05b24fb8ffde41c384ac3d5b54f97cf2&scope=playlist-read-private%20user-read-private%20user-library-read&redirect_uri=https://music-downloader-pi.vercel.app/callback&state=state&code_challenge_method=S256&code_challenge=${challenge}`;
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