<template>
    <h1>{{ state.token }}</h1>
</template>
<script lang="ts" setup>
import router from '@/router';
import { state } from '@/state';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(async () => {
    console.log('CallbackPage mounted');
    const code = router.currentRoute.value.query.code;

    if (code) {
        console.log('code is ' + code);

        const res = await axios.post('https://accounts.spotify.com/api/token', {
            code: code,
            redirect_uri: window.location.origin + '/callback',
            grant_type: 'authorization_code',
            client_id: '05b24fb8ffde41c384ac3d5b54f97cf2',
            code_verifier: localStorage.getItem('codeverifier')
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(JSON.stringify(res) + '\n' + res.data.access_token + '\n' + res.data.refresh_token);

        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('refresh', res.data.refresh_token);

        state.token = res.data.token;
        state.refresh = res.data.refresh_token;
        state.expire = res.data.expires_in;

        setInterval(async () => {
            const refreshres = await axios.post('https://accounts.spotify.com/api/token', {
                refresh_token: state.refresh,
                grant_type: 'refresh_token',
                client_id: '05b24fb8ffde41c384ac3d5b54f97cf2',
                code_verifier: localStorage.getItem('codeverifier')
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            localStorage.setItem('token', refreshres.data.access_token);
            localStorage.setItem('refresh', refreshres.data.refresh_token);

            state.token = refreshres.data.token;
            state.refresh = refreshres.data.refresh;
            state.expire = refreshres.data.expires_in;

        }, state.expire * 1000 / 2);

        router.push('/library');
    }
});
</script>