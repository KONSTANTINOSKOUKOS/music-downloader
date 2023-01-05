<template>
    <h1>{{ state.token }}</h1>
</template>
<script lang="ts" setup>import router from '@/router';
import { state } from '@/state';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
    console.log('CallbackPage mounted');
    const code = router.currentRoute.value.query.code;
    if (code) {
        console.log('code is ' + code);

        // const res = await axios.get(`https://music-downloader-server.vercel.app/token/${code}`);
        // console.log(res.data.access_token + '\n' + res.data.refresh_token);
        // state.token = res.data.token;
        // state.refresh = res.data.refresh;
        // state.expire = res.data.expire;
        (async () => {
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
        })();

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
});
</script>