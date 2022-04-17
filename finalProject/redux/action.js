//action types
export const TRACK = "TRACK";
export const ALBUM = "ALBUM";
export const PLAYTRACK = "playTrack";
export const PLAYALBUM = "playAlbum";

export const getTrack = (track) => ({
  type: TRACK,
  payload: track,
});

export const getAlbum = (album) => ({
  type: ALBUM,
  payload: album,
});

export const getType = (type) => ({
    type: type,
    payload: type
})