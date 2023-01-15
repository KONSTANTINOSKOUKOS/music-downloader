import { reactive } from "vue";

export interface Track {
    name: string,
    duration: number,
    id: string,
    artist: string,
    image: string
}

export interface Playlist {
    name: string,
    id: string,
    owner: string,
    tracks: Track[],
    image: string
}

export interface Album {
    name: string,
    id: string,
    artist: string,
    tracks: { name: string, duration: number, id: string, artist: string }[],
    image: string
}

export interface Search {
    tracks: Track[],
    playlists: Playlist[],
    albums: Album[]
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