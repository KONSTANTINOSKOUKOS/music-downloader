import { reactive } from "vue";

interface Track {
    name: string,
    duration: number,
    id: string,
    artist: string,
    image: string
}

interface Playlist {
    name: string,
    id: string,
    owner: string,
    tracks: Track[],
    image: string
}

interface Album {
    name: string,
    id: string,
    artist: string,
    tracks: { name: string, duration: number, id: string, artist: string }[],
    image: string
}

export const state = reactive({
    token: '',
    refresh: '',
    expire: 0,
    user: {
        name: '',
        image: '',
        tracks: [] as Track[],
        playlists: [] as Playlist[],
        albums: [] as Album[]
    }
});