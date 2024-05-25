const getSearchAny=async(accessToken,type,searchTerm)=>{
    const searchArtistUrl=`https://api.spotify.com/v1/search?q=${searchTerm}&type=${type}`;

    const res=await fetch(searchArtistUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();
    // console.log(data);
    return data;
};
const getTopTrack=async(accessToken,artistId)=>{
    const popularUrl=`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`;

    const res=await fetch(popularUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();
    // console.log(data);
    return data;
}
// ----------------------------------

const loadSearchArtist=async(searchTerm)=>{
    const token=await getToken();
    const artistDataOnly=await getSearchAny(token,'artist',searchTerm);

    const artistCard=document.querySelector('.cool-ele1');
    
    const artistData=artistDataOnly.artists.items[0];
    artistCard.setAttribute('onclick',`window.location.href="/artist/${artistData.id}"`)
    artistCard.innerHTML=`
        <div class="cool-img">
            <img src="${artistData.images[0].url}" alt="" srcset="">
        </div>
        <div class="cool-info">
            <h2>${artistData.name}</h2>
            <p>Rank ${artistData.popularity}</p>
            <p>Artist</p>
        </div>
        <div class="cool-play">
            <i class="fa fa-circle-play"></i>
        </div>`;

    loadTopTrack(artistData.id);
};
const loadTopTrack=async(artistId)=>{
    const token=await getToken();
    const topData=await getTopTrack(token,artistId);

    const threeBox=document.querySelector('.cool-ele2');
    threeBox.innerHTML=``;
   
    let limit=screen.width>600?38:28;
    for(let i=0;i<3;i++){
        let item=topData.tracks[i];
        threeBox.innerHTML+=`
                <div class="cool-card" onclick="playOnTrack('${item.id}')">
                    <img src="${item.album.images[0].url}" alt="">
                    <div class="cool-title">
                        <h3>${setText(item.name,limit)}</h3>
                        <p>${item.artists[0].name}</p>
                    </div>
                    <div class="cool-time">
                        <p>${getMin(item.duration_ms/1000)}</p>
                    </div>
                </div>`;
    }

}
const loadSearchTrack=async(searchTerm)=>{
    const token=await getToken();
    const tracksData=await getSearchAny(token,'track',searchTerm);

    const tracksBox=document.querySelector('.song-list');
    tracksBox.innerHTML=``;

    let limit=screen.width>600?100:28;
    for(let i=0;i<tracksData.tracks.limit;i++){
        let track=tracksData.tracks.items[i];
        tracksBox.innerHTML+=`
                <div class="song-list-ele" onclick="playOnTrack('${track.id}')">
                    <img src="${track.album.images[0].url}" alt="">
                    <div class="cool-title">
                        <h3>${setText(track.name,limit)}</h3>
                        <p>${track.artists[0].name}</p>
                    </div>
                   
                    <div class="cool-time">
                        <p>${getMin(track.duration_ms/1000)}</p>
                    </div>
                </div>`;
    }
}

const searchTerm=document.querySelector('#searchTerm');
searchTerm.addEventListener('input',()=>{
    if(searchTerm!=""){
        loadSearchArtist(searchTerm.value);
        loadSearchTrack(searchTerm.value); 
    }
});
