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

const mounted = ref(false);

onMounted(async () => {
    if (mounted.value) return;
    console.log('LoginPage mounted');
    const code = router.currentRoute.value.query.code;
    if (code) {
        console.log('code is ' + code);
        // const res = await axios.get(`https://music-downloader-server.vercel.app/token/${code}`);
        // state.token = res.data.token;
        // state.refresh = res.data.refresh;
        // state.expire = res.data.expire;

        const res = await axios.post('https://accounts.spotify.com/api/token', {
            code: code,
            redirect_uri: 'https://music-downloader-pi.vercel.app/login',
            grant_type: 'authorization_code'
        }, {
            headers: {
                'Authorization': `Basic ${btoa(`05b24fb8ffde41c384ac3d5b54f97cf2:55eb2f966f0d401493f46a1c3c7b7ddd`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(res.data.access_token + '\n' + res.data.refresh_token);

        state.token = res.data.token;
        state.refresh = res.data.refresh;
        state.expire = res.data.expire;

        // console.log(state.token + '\n' + state.refresh);


        //CLOSURE TO ENSURE API IS FASTER THAN state.expire
        // (function refresh() {
        //     setTimeout(async () => {
        //         const ress = await axios.get(`https://music-downloader-server.vercel.app/refresh/${state.refresh}`);
        //         state.token = ress.data.token;
        //         state.refresh = ress.data.refresh;
        //         state.expire = ress.data.expire;
        //         refresh();
        //     }, state.expire * 1000 / 2);
        // })();

        // router.push({ name: 'dl' });
    }
    mounted.value = true;
});

const login = async () => {
    console.log('redirecting...');
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