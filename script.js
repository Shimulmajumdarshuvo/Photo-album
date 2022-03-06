const elementById = (id) => {
  return document.getElementById(id);

};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showArtists(data));
};

const showArtists = (data) => {
  const artistContainer = elementById('artists');
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "Not Available"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not Availble"}</p>
    <p>Style: ${artist.strStyle ? artist.strStyle : "Not Availble"}</p>
  </div>
  <button onclick="fetchAlbums('${artist.idArtist}')" class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p  class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";


};

const showAlbum = (album) => {

  const albumContainer = elementById("albums");
  album.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
