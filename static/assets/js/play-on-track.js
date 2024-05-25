
const getTrack=async (acessToken,TrackId)=>{
    const trackUrl=`https://api.spotify.com/v1/tracks/${TrackId}`;
  
    const res=await fetch(trackUrl,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${acessToken}`
      }
    });
    
    const data=await res.json();
    return data;
  }

const musicBg=document.querySelector('.desk-full img');
const musicImg=document.querySelector('.music-img img');
const mobBg=document.querySelector('.mob-bg');
const mobCover=document.querySelector('.mob-cover img');

const musicArtistSub=document.querySelectorAll('#music-artist-sub');

function updateImgs(url){
  musicBg.src=url;
  musicImg.src=url;

  mobPlay.style=`
      background:url('${url}');
      background-size:cover;
      background-position:center;
      `;
  mobBg.style=`
      background: url('${url}');
      background-size: cover;
      background-position: center;
      `;
  mobCover.src=url;
}

function playAllThree(){
  webPlayBtn.className='fa-solid fa-pause';
  playMob.style.display='';
          pauseMob.style.display='block';
          mobBtn.className='fa-solid fa-pause';
  mobBtn.className='fa-solid fa-pause';
          playMob.style.display='';
          pauseMob.style.display='block';
}

function updateTimes(timo){
  musicTime.textContent=`0:00 / ${getMin(timo)}`;
  mobrr.textContent=getMin(timo);
}

async function playOnTrack(id){
    let token=await getToken();
    let data=await getTrack(token,id);
    // console.log(data);
    let width=screen.width;
    let marset=28;

    marset=width<=600?20:28;
    musicArtistSub.forEach(e=>{
      e.innerHTML=`
      <h3>${marText(data.name,marset)}</h3>
      <p>${data.artists[0].name}</p>
      `;
    });
    updateImgs(data.album.images[0].url);
    playAllThree();


    if(data.preview_url!=null){
      realController.src=data.preview_url;
      webTrack.max=29;
      mobFullTrack.max=29;
      updateTimes(29);
    }else{
      realController.src='';
      webTrack.max=3;
      mobFullTrack.max=3;
      updateTimes(3);
    }
    
    realController.play();

    let allLike=document.querySelectorAll('.music-like');

    let isLiked=await fetch(`/likeApi/${id}`);
    let likeData=await isLiked.json();
    
    
    allLike.forEach(e=>{
      e.setAttribute('get-data',`/likeSong?mid=${id}&img_url=${data.album.images[0].url}&title=${data.name}&name=${data.artists[0].name}&duration=${getMin(data.duration_ms/1000)}`);

      let icon=e.querySelector('i');
      icon.className=likeData.isLikedSong?'fa fa-heart':'fa-regular fa-heart';
    })

}

