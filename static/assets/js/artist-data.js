const getArtistz=async(accessToken,artistId)=>{
    const artistUrl=`https://api.spotify.com/v1/artists/${artistId}`;

    const res=await fetch(artistUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();
    // console.log(data);
    return data;
}
const getPopular=async(accessToken,artistId)=>{
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
const getAlbums=async(accessToken,artistId)=>{
    const albumsUrl=`https://api.spotify.com/v1/artists/${artistId}/albums`;

    const res=await fetch(albumsUrl,{
        method:'GET',
        headers:{
            'authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();
    // console.log(data);
    return data;
}
const getArtistRelated=async(accessToken,artistId)=>{
    const relatedUrl=`https://api.spotify.com/v1/artists/${artistId}/related-artists`;

    const res=await fetch(relatedUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data=await res.json();
    // console.log(data);
    return data;
}
// --------------------------------

const loadArtist=async(artistId)=>{
    const token=await getToken();
    const artistData=await getArtistz(token,artistId);
    const artistTop=document.querySelector('.artist-top');

    artistTop.innerHTML=`
    <img src="${artistData.images[0].url}" alt="">
    <div class="artist-fo">
        <h1>${artistData.name}</h1>
        <p>${addComma(artistData.followers.total.toString())} Monthly Listeners</p>
    </div>`;

    const btnFollow=document.querySelector('.p-f button');
    btnFollow.setAttribute('get-data',`/follow?aid=${artistData.id}&img_url=${artistData.images[0].url}&name=${artistData.name}`);

}

const loadPopular=async(artistId,quantity)=>{
    const token=await getToken();
    const popularData=await getPopular(token,artistId);

    const popularBox=document.querySelector('#popular-list-data');
    popularBox.innerHTML=``;

    let screenWidth=screen.width;
    let limit=screenWidth>600?36:24;
    for(let i=0;i<quantity;i++){
        let track=popularData.tracks[i];
        popularBox.innerHTML+=`
            <div class="artist-song-ele" onclick="playOnTrack('${track.id}')">
                <div class="ppp">
                    <rank>${i+1}</rank>
                </div>
                <img src="${track.album.images[0].url}" alt="">
                <div class="music-col">
                    <h3>${setText(track.name,limit)}</h3>
                    <p>${track.artists[0].name}</p>
                </div>
                <div class="ppp" id="ax">
                    <p>${setText(track.album.name,36)}</p>
                </div>
                <div class="ppp">
                    <p>${getMin(track.duration_ms/1000)}</p>
                </div>
            </div>
           `;
    }
}

const loadAlbums=async(artistId)=>{
    const token=await getToken();
    const albumsData=await getAlbums(token,artistId);

    const albumsBox=document.querySelector('#artist-album-data');

    for(let i=0;i<albumsData.items.length;i++){
        let album=albumsData.items[i];
        albumsBox.innerHTML+=`
            <a href='/card?type=album&id=${album.id}'>
            <div class="web2-ele">
                <img src="${album.images[0].url}" alt="">
                <div class="web2-title">
                    <h3>${album.name}</h3>  
                    <p>${album.album_type}</p>
                </div>
            </div>
            </a>`;

    }

       
    const load=albumsBox.parentNode.children[1];
    load.style.display="none";
}

const loadSimilar=async(artistId)=>{
    const token=await getToken();
    const similarData=await getArtistRelated(token,artistId);

    const similarBox=document.querySelector('#similar-artist-data');

    for(let i=0;i<similarData.artists.length;i++){
        let artist=similarData.artists[i];
        similarBox.innerHTML+=`
            <a href='/artist/${artist.id}'>
                <div class="web3-ele">
                    <img src="${artist.images[0].url}" alt="">
                    <div class="web2-title">
                        <center>
                            <h3>${artist.name}</h3>
                        </center>
                    </div>
                </div> 
            </a>
        `;
    }

        
    const load=similarBox.parentNode.children[1];
    load.style.display="none";


}



// (async()=>{
//     try{
//         let artistId=document.querySelector('#artistId').value;
//         loadArtist(artistId);
//         loadSimilar(artistId);
//         loadAlbums(artistId);
//         loadPopular(artistId,5);
//     }catch(e){
//         console.error(e);
//     }

// })();

