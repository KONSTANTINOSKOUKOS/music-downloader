<template>
    <ion-button @click="dlbutton" fill="clear">
        <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff"
            class="bi bi-download" viewBox="0 0 16 16">
            <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
        </svg>
        <ion-spinner v-else name="crescent"></ion-spinner>
    </ion-button>
</template>

<script lang="ts" setup>
import { state } from "@/state";
import { IonButton, toastController, IonSpinner } from "@ionic/vue";
import axios from "axios";
import { defineProps, ref } from "vue";
const props = defineProps<{
    trackname: string,
    id: string
}>();

const loading = ref(false);

const dlbutton = async () => {
    loading.value = true;
    const data = (await axios.get(`https://music-downloader-vercel.vercel.app/api/dl?id=${props.id}&token=${state.token}`)).data;
    axios.get(data.url, {
        method: 'GET', responseType: 'blob'
    }).then(async res => {
        console.log(res);
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${props.trackname}.mp3`;
        link.click();
        URL.revokeObjectURL(url);
        loading.value = false;
        const toast = await toastController.create({ message: `${props.trackname} has been saved in your downloads!`, animated: true, duration: 1300 });
        await toast.present();
    });
}
</script>
<style scoped>

</style>
