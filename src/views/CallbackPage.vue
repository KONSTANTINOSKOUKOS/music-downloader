<template>
    <h1>{{ state.token }}</h1>
</template>
<script lang="ts" setup>import router from '@/router';
import { state } from '@/state';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(async () => {
    console.log('CallbackPage mounted');
    const code = router.currentRoute.value.query.code;
    if (code) {
        console.log('code is ' + code);

        // const res = await axios.post('https://accounts.spotify.com/api/token', {
        //     code: code,
        //     redirect_uri: 'https://music-downloader-pi.vercel.app/callback',
        //     grant_type: 'authorization_code'
        // }, {
        //     headers: {
        //         'Authorization': `Basic ${btoa(`05b24fb8ffde41c384ac3d5b54f97cf2:55eb2f966f0d401493f46a1c3c7b7ddd`)}`,
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // });
        // console.log(res + '\n' + res.data.access_token + '\n' + res.data.refresh_token);

        // state.token = res.data.token;
        // state.refresh = res.data.refresh;
        // state.expire = res.data.expire;
    }
});
</script>