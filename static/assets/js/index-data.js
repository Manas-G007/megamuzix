
// ------------getting data ---------------------------------------------


const getTrackList=async (acessToken)=>{
  const trackUrl=`https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop%2Cnew-release&seed_tracks=0c6xIDDpzE81m2q797ordA`;

  const res=await fetch(trackUrl,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${acessToken}`
    }
  });
  
  const data=await res.json();
  // console.log(data);
  return data;
}

const getNewRelease=async(acessToken)=>{
  const url='https://api.spotify.com/v1/browse/new-releases?country=US';
  const res=await fetch(url,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${acessToken}`
    }
  });
  const data=await res.json();
  // console.log(data);
  return data;
}

const getArtist=async (acessToken,artistId)=>{
  const trackUrl=`https://api.spotify.com/v1/artists/${artistId}`;

  const res=await fetch(trackUrl,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${acessToken}`
    }
  });
  
  const data=res.json();
  return data;
}

const getFeaturedPlaylist=async (accessToken)=>{
  const featuredUrl='https://api.spotify.com/v1/browse/featured-playlists?country=UA';

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
// ------- loading data -----------------------------------------------

const loadTracks=async()=>{
  const token =await getToken();
  const tracksData=await getTrackList(token);

  const trackBox=document.querySelector('#top-track-lists');
   
  const load=trackBox.parentNode.children[1];
  load.style.display="none";
  
  for(item=0;item<10;item++){
      let track=tracksData.tracks[item];
      // console.log(track);
      
      trackBox.innerHTML+=`
        <div class="web1-grid-ele" onclick="playOnTrack('${track.id}')">
          <img src="${track.album.images[0].url}" alt="">
          <div class="music-col1">
              <h3>${setText(track.name,24)}</h3>
              <p>${setText(track.artists[0].name,30)}</p>
          </div>
          <div class="web1-icon">
              <i class="fa-solid fa-circle-play"></i>
              <p>${getMin(track.duration_ms/1000)}</p>
          </div>
      </div> 
      `;
  };

}

const ArtistList=['246dkjvS1zLTtiykXe5h60','64KEffDW9EtZ1y2vBYgq8T','6VuMaDnrHyPL1p4EHjYLi7','6M2wZ9GZgrQXHCFfjv46we','6qqNVTkY8uBg9cP3Jd7DAH','4nDoRrQiYLoBzwC5BhVJzF'];

const loadArtists=async()=>{
  const artistBox=document.querySelector('#artist-data-list');
   
  const load=artistBox.parentNode.children[1];
  load.style.display="none";
  
  for(let item=0;item<ArtistList.length;item++){
    let token =await getToken();
    let data=await getArtist(token,ArtistList[item]);
    
    artistBox.innerHTML+=`
    <a href='/artist/${data.id}'>
      <div class="web3-ele">
          <img src="${data.images[0].url}" alt="">
          <div class="web2-title">
              <center>
                  <h3>${data.name}</h3>
              </center>
          </div>
      </div> 
    `;
  }
}

const loadNewRelease=async()=>{
  const token=await getToken();
  const albumList=await getNewRelease(token);
  // console.log(albumList.albums.items);
  const newReleaseBox=document.querySelector('#newReleaseData');
   
  const load=newReleaseBox.parentNode.children[1];
  load.style.display="none";
  
  for(item=0;item<9;item++){

    let album=albumList.albums.items[item];
    let limit=screen.width<=600?17:22;
    newReleaseBox.innerHTML+=`
    <a href=/card?type=album&id=${album.id}>
      <div class="web2-ele">
          <img src="${album.images[0].url}" alt="">
          <div class="web2-title">
              <h3>${setText(album.name,limit)}</h3>
              <p>${album.album_type}</p>
          </div>
      </div>
    </a>
    `;
  }
}

const loadFeaturedPlaylist=async ()=>{

  const token=await getToken();
  const items=await getFeaturedPlaylist(token);
  const featuredBox=document.querySelector('#featuredPlaylist');
   
  const load=featuredBox.parentNode.children[1];
  load.style.display="none";

  for(n=0;n<8;n++){
    let item=items.playlists.items[n];
    featuredBox.innerHTML+=`
    <a href=/card?type=playlist&id=${item.id}>
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

// -------------------------
// (

//   async ()=>{

//     try{
//       loadTracks();
//       loadArtists();
//       loadNewRelease();
//       loadFeaturedPlaylist();
//     }catch(e){
//       console.error(e);
//     }
//   }
// )();