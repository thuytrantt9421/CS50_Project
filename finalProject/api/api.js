const processMusic = (music) => ({
  id: music.id,
  title: music.title,
  artist: music.artist,
  album: music.album,
  duration: music.duration,
  img: music.album.cover,
  type: music.type,
  preview: music.preview,
  md5_image: music.md5_image,
  link: music.link,
});

const processAlbum = (album) => ({
  id: album.id,
  title: album.title,
  img: album.cover_medium,
  artist: album.artist,
  type: album.type,
});
const processArtist = (album) => ({});

const url = "https://api.deezer.com/";

// api tìm kiếm, có thể tìm theo tên bài hát, tên album hoặc tên nghệ sĩ
export const search = async (field, query) => {
  try {
    const response = await fetch(`${url}search/${field}?q=${query}`);
    const { data, total } = await response.json();
    let allResults = data;
    //   console.log(allResults);
    return field === "track"
      ? allResults.map(processMusic)
      : field === "album"
      ? allResults.map(processAlbum)
      : allResults.map(processArtist);
  } catch (err) {
    return console.log(err);
  }
};

// api lấy thông tin chi tiết 1 bài hát
export const trackInfo = async (id) => {
  try {
    const response = await fetch(`${url}track/${id}`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
};

// api lấy thông tin chi tiết 1 album
export const albumInfo = async (id) => {
  try {
    const response = await fetch(`${url}album/${id}`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    return console.log(err);
  }
};
