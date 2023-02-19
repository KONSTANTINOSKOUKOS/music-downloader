<template>
    <div class="cont">
        <audio :src="state.url"></audio>
        <div :style="{ backgroundColor: state.color.rgb }" class="item" color="warning">
            <ion-item lines="none" :color="state.color.rgb">
                <img :src="state.track.image">
                <ion-label :style="{ color: state.color.isDark ? 'white' : 'black' }" text-wrap>
                    <h2>{{ state.track.name }}</h2>
                    <h3>{{ state.track.artist }}</h3>
                </ion-label>
                <ion-spinner name="crescent" v-if="state.trackloading"></ion-spinner>
                <ion-button fill="clear" color="transparent" slot="end" v-else @click="toggle">
                    <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        :fill="state.color.isDark ? 'white' : 'black'" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        :fill="state.color.isDark ? 'white' : 'black'" class="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                    </svg>
                </ion-button>
            </ion-item>
            <ion-range
                :style="{ '--bar-background': state.color.isDark ? changecolor(state.color.hex, 30) : changecolor(state.color.hex, -30) }"
                @ion-knob-move-end="change" :max="duration" class="range"></ion-range>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { state } from "@/state";
import { IonRangeCustomEvent } from "@ionic/core";
import { IonRange, IonLabel, IonSpinner, IonItem, IonButton, RangeChangeEventDetail } from "@ionic/vue";
import { onMounted, ref } from "vue";
const audio = ref<HTMLAudioElement | null>(null);
const duration = ref(60);
//eslint-disable-next-line
const range = ref<HTMLIonRangeElement | null>(null);
const playing = ref(false);

onMounted(() => {
    audio.value = document.querySelector('audio');
    range.value = document.querySelector('ion-range');
    if (!audio.value) return;
    if (!range.value) return;
    audio.value.oncanplaythrough = () => {
        if (!range.value) return; // mandatory for eslint
        console.log('playable');
        if (state.trackloading) {
            state.trackloading = false;
            duration.value = audio.value?.duration as number;
            console.log(duration.value);
            audio.value?.pause();
            playing.value = false;
            range.value.value = 0;
        }
    };
    audio.value.onpause = () => playing.value = false;
    audio.value.onplay = () => playing.value = true;

    setInterval(() => {
        if (!range.value) return;
        if (!playing.value) return;
        range.value.value = range.value.value as number + 1;
    }, 1000);
});

const toggle = () => {
    if (audio.value?.paused)
        audio.value?.play();
    else
        audio.value?.pause();
}

const change = async (e: IonRangeCustomEvent<RangeChangeEventDetail>) => {
    if (!audio.value) return;
    audio.value.currentTime = range.value?.value as number;
    console.log('change');
}

const changecolor = (hexColor: string, magnitude: number) => {
    hexColor = hexColor.replace('#', '');
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};
</script>
<style scoped>
.cont {
    margin-bottom: 3.35rem;
}

.item {
    z-index: 9999;
    background-color: transparent;
    margin: 0 auto;
    width: 95vw;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
}

ion-label {
    margin-left: 1rem;
}

.range {
    z-index: 99999999;
    padding: 0 .7rem 0 .7rem;
    max-height: 5px;
    /* --bar-background: white; */
    --bar-border-radius: 10rem;
}

img {
    width: 3rem;
    height: 3rem;
}

h3 {
    filter: opacity(68%);
}

ion-button {
    background: transparent;
    box-shadow: none;
}
</style>