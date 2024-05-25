const getGenres=async(accessToken)=>{
    const genreUrl='https://api.spotify.com/v1/browse/categories?limit=10&country=US';

    const res = await fetch(genreUrl,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${accessToken}`
        }
    })

    const data= await res.json();
    
    // console.log(data);
    return data;
}

const getTrackz=async(accessToken)=>{
    const trackUrl=`https://api.spotify.com/v1/recommendations?limit=15&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop%2Cnew-release&seed_tracks=0c6xIDDpzE81m2q797ordA`;

  const res=await fetch(trackUrl,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${accessToken}`
    }
  });
  
  const data=await res.json();
  // console.log(data);
  return data;
}

const getBestz=async(accessToken)=>{
    const trackUrl=`https://api.spotify.com/v1/recommendations?limit=15&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop%2Cj-pop&seed_tracks=0c6xIDDpzE81m2q797ordA`;

  const res=await fetch(trackUrl,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${accessToken}`
    }
  });
  
  const data=await res.json();
  // console.log(data);
  return data;
}
const getMegaHits=async (accessToken)=>{
    const featuredUrl='https://api.spotify.com/v1/browse/featured-playlists?country=US';
  
    const res=await fetch(featuredUrl,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${accessToken}`
      }
    })
  
    const data=await res.json();
    // console.log(data);
    return data;
  }
// ----------------------

const loadGerne=async()=>{
  const token=await getToken();
  const genreData=await getGenres(token);

  const genreBox=document.querySelector('#genres-list-data');

  
  const load=genreBox.parentNode.children[1];
  load.style.display="none";

  for(n=0;n<genreData.categories.items.length;n++){
    let genreItem=genreData.categories.items[n];
    genreBox.innerHTML+=`
      <div class="web3-ele">
          <img src="${genreItem.icons[0].url}" alt="">
          <div class="web2-title">
              <center>
                  <h3>${genreItem.name}</h3>
              </center>
          </div>
      </div> 
    `;
  }

};
const loadTrackz=async()=>{
    const token =await getToken();
    const tracksData=await getTrackz(token);
  
    const trackBox=document.querySelector('#trending-music-data');
     
    const load=trackBox.parentNode.children[1];
    load.style.display="none";

    for(item=0;item<tracksData.tracks.length;item++){
        let track=tracksData.tracks[item];
        
        trackBox.innerHTML+=`
          <div class="web1-grid-ele" onclick="playOnTrack('${track.id}')">
            <img src="${track.album.images[0].url}" alt="">
            <div class="music-col1">
                <h3>${setText(track.name,24)}</h3>
                <p>${setText(track.artists[0].name,30)}</p>
            </div>
            <div class="web1-icon">
                <i class="fa-solid fa-circle-play"></i>
                <p>${getMin(track.duration_ms)}</p>
            </div>
        </div> 
        `;
    };
  
};

const loadMegaHits=async ()=>{

    const token=await getToken();
    const items=await getMegaHits(token);
    const featuredBox=document.querySelector('#mega-hits-data');
    
    const load=featuredBox.parentNode.children[1];
    load.style.display="none";
  
    for(n=0;n<8;n++){
      let item=items.playlists.items[n];
      featuredBox.innerHTML+=`
      <a href='/card?type=playlist&id=${item.id}'>
        <div class="web2-ele">
            <img src="${item.images[0].url}" alt="">
            <div class="web2-title">
                <h3>${setText(item.name,22)}</h3>
                <p>Playlist</p>
            </div>
        </div>
      </a>
      `;
    }
};

const loadBestz=async()=>{
    const token =await getToken();
    const tracksData=await getBestz(token);
  
    const trackBox=document.querySelector('#best-music-data');

    const load=trackBox.parentNode.children[1];
    load.style.display="none";
    

    for(item=0;item<tracksData.tracks.length;item++){
        let track=tracksData.tracks[item];
        
        trackBox.innerHTML+=`
          <div class="web1-grid-ele" onclick="playOnTrack('${track.id}')">
            <img src="${track.album.images[0].url}" alt="">
            <div class="music-col1">
                <h3>${setText(track.name,24)}</h3>
                <p>${setText(track.artists[0].name,30)}</p>
            </div>
            <div class="web1-icon">
                <i class="fa-solid fa-circle-play"></i>
                <p>${getMin(track.duration_ms)}</p>
            </div>
        </div> 
        `;
    };
  
};
// (
//     async()=>{
//         try{
//             loadTrackz();
//             loadMegaHits();
//             loadBestz();
//             loadGerne();
//         }catch(e){
//             console.error(e);
//         }
//     }
// )();
