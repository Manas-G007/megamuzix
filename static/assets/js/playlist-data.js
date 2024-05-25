const getPlaylist=async(accessToken,playlistId)=>{
    const playlistUrl=`https://api.spotify.com/v1/playlists/${playlistId}`;

    const res=await fetch(playlistUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();

    // console.log(data);
    return data;
}
const getAlbum=async(accessToken,albumId)=>{
    const playlistUrl=`https://api.spotify.com/v1/albums/${albumId}`;

    const res=await fetch(playlistUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();

    // console.log(data);
    return data;
}
//---------------------
const loadPlaylist=async(playlistId)=>{
    const token = await getToken(); 
   
    const playlistData=await getPlaylist(token,playlistId);
    const playlistCart=document.querySelector('#top-card-data');

    
    let totalSong=playlistData.tracks.total;

    let limited=screen.width>600?30:14;
    playlistCart.innerHTML=`
        <div class="back-img-bg"
            style="
            background: url('${playlistData.images[0].url}');
            background-size: cover;
            background-position: center;">
        </div>
        <div class="front-play-info">
            <img src="${playlistData.images[0].url}" alt="">
            <div class="front-info">
                <p>${playlistData.public?"Public":"Private"}</p>
                <h1>${setText(playlistData.name,limited)}</h1>
                <p>${playlistData.owner.display_name}</p>
                <p>${totalSong} Songs</p>
            </div>
        </div>
    `;

    let gett=document.querySelector('#card-like');
    gett.setAttribute('get-data',`/likeCard?cid=${playlistData.id}&img_url=${playlistData.images[0].url}&title=${playlistData.name}&name=playlist`)

    const playlistBox=document.querySelector('#playlist-song-data');
    totalSong=totalSong>100?100:totalSong;

    let screenWidth=screen.width;
    let limit=screenWidth>600?36:24;
    for(let n=0;n<totalSong;n++){
        let song=playlistData.tracks.items[n].track;
        playlistBox.innerHTML+=`
            <div class="artist-song-ele" onclick="playOnTrack('${song.id}')">
                <div class="ppp">
                    <rank>${n+1}</rank>
                </div>
                <img src="${song.album.images[0].url}" alt="">
                <div class="music-col">
                    <h3>${setText(song.name,limit)}</h3>
                    <p>${song.artists[0].name}</p>
                </div>
                <div class="ppp" id="ax">
                    <p>${setText(song.album.name,36)}</p>
                </div>
                <div class="ppp">
                    <p>${getMin(song.duration_ms/1000)}</p>
                </div>
            </div>
        `;
    }

    const loads=document.querySelectorAll('#load');
    loads.forEach(e=>{
        e.style='display:none';
    })

}

const loadAlbum=async(albumId)=>{
    const token = await getToken(); 
   
    const albumData=await getAlbum(token,albumId);
    const playlistCart=document.querySelector('#top-card-data');

    
    let totalSong=albumData.total_tracks;
    
    let limited=screen.width>600?30:14;
    playlistCart.innerHTML=`
        <div class="back-img-bg"
            style="
            background: url('${albumData.images[0].url}');
            background-size: cover;
            background-position: center;">
        </div>
        <div class="front-play-info">
            <img src="${albumData.images[0].url}" alt="">
            <div class="front-info">
                <p>${albumData.album_type}</p>
                <h1>${setText(albumData.name,limited)}</h1>
                <p>${albumData.artists[0].name}</p>
                <p>${totalSong} Songs</p>
            </div>
        </div>
    `;

    let gett=document.querySelector('#card-like');
    gett.setAttribute('get-data',`/likeCard?cid=${albumData.id}&img_url=${albumData.images[0].url}&title=${albumData.name}&name=${albumData.album_type}`)

    const playlistBox=document.querySelector('#playlist-song-data');
    totalSong=totalSong>100?100:totalSong;

    let screenWidth=screen.width;
    let limit=screenWidth>600?36:24;
    for(let n=0;n<totalSong;n++){
        let song=albumData.tracks.items[n];
        playlistBox.innerHTML+=`
            <div class="artist-song-ele" onclick="playOnTrack('${song.id}')">
                <div class="ppp">
                    <rank>${n+1}</rank>
                </div>
                <img src="${albumData.images[0].url}" alt="">
                <div class="music-col">
                    <h3>${setText(song.name,limit)}</h3>
                    <p>${song.artists[0].name}</p>
                </div>
                <div class="ppp" id="ax">
                    <p>${setText(albumData.name,36)}</p>
                </div>
                <div class="ppp">
                    <p>${getMin(song.duration_ms/1000)}</p>
                </div>
            </div>
        `;
    }

    const loads=document.querySelectorAll('#load');
    loads.forEach(e=>{
        e.style='display:none';
    })

}

// (async()=>{
//     try{
        // const playlistId=document.querySelector('#playlist').value;
        // const albumId=document.querySelector('#album').value;

        // if(playlistId!=""){
        //     loadPlaylist(playlistId);
        // }else{
        //     loadAlbum(albumId);
        // }
//     }catch(e){
//         console.error(e);
//     }
   
// })();