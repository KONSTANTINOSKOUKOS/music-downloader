<template>
    <ion-button @click="dlbutton" fill="clear">🔽</ion-button>
</template>

<script lang="ts" setup>
import { IonButton, toastController } from "@ionic/vue";
import { defineProps } from "vue";
const props = defineProps<{
    trackname: number
}>();
const dlbutton = async () => {
    const toast = await toastController.create({ message: `${props.trackname} has been saved in your downloads!`, animated: true, duration: 1300 });
    await toast.present();
}
</script>
