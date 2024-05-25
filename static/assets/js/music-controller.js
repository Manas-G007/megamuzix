const realController=document.querySelector('#real-controller');
const webPlayBtn=document.querySelector('#p');
const webTrack=document.querySelector('#web-track');
const musicTime=document.querySelector('.music-time p');
const volTrack=document.querySelector('.vol-track');

// mob track -------------------------
const mobFullTrack=document.querySelector('#mob-full-track');
const mobll=document.querySelector('#mob-ll');
const mobrr=document.querySelector('#mob-rr');
// end -------------------------------

webPlayBtn.addEventListener('click',()=>{

    let checkState=realController.src==window.location.href;
    let ppstate=webPlayBtn.className=='fa-solid fa-play';
    if(!checkState){
       if(ppstate){
        realController.play();
        webPlayBtn.className='fa-solid fa-pause';
        }else{
            realController.pause();
            webPlayBtn.className='fa-solid fa-play'
        } 
    }
    
})

realController.addEventListener('timeupdate',()=>{
    let currentT=realController.currentTime;
    webTrack.value=currentT;
    mobFullTrack.value=currentT;
    musicTime.textContent=`${getMin(realController.currentTime)} / ${getMin(realController.duration)}`;
    // ----------------------------------------
    mobll.textContent=getMin(realController.currentTime);
})
// ----------------------------
mobFullTrack.addEventListener('input',()=>{
    realController.currentTime=mobFullTrack.value;
})
// ----------------------------

webTrack.addEventListener('input',()=>{
    realController.currentTime=webTrack.value;
});
// ------------------------------------
volTrack.addEventListener('input',()=>{
    // console.log(volTrack.value);
    realController.volume=volTrack.value/100;
})

function getMin(secs){
    let Min=Math.floor(secs/60);
    let Sec=Math.floor(secs%60);

    if(Sec<10){
        Sec=`0${Sec}`;
    }
    return `${Min}:${Sec}`;
}

// ------------------------


const mobPlay=document.querySelector('#mob-play');
const finalMob=document.querySelector('.final-mob');
const pauseMob=document.querySelector('#pause-gif');
const playMob=document.querySelector('#mob-play-i');
const mobBtn=document.querySelector('#mob-p');

mobPlay.addEventListener('click',()=>{
    
    let checkState=realController.src==window.location.href;
    if(!checkState){
       finalMob.style='opacity:1';
        if(pauseMob.style.display==""){
            realController.play();
            playMob.style.display='';
            pauseMob.style.display='block';
            mobBtn.className='fa-solid fa-pause';
        }else{
            realController.pause();
            playMob.style.display='block';
            pauseMob.style.display='';
            mobBtn.className='fa-solid fa-play';
        } 
    }
    
})

mobBtn.addEventListener('click',()=>{
    let checkp=mobBtn.className=='fa-solid fa-play';
    if(checkp){
        realController.play();
        mobBtn.className='fa-solid fa-pause';
        // -----------------------
        playMob.style.display='';
        pauseMob.style.display='block';
    }else{
        realController.pause();
        mobBtn.className='fa-solid fa-play';
        // -----------------------
        playMob.style.display='block';
        pauseMob.style.display='';
    }
})

const downClose=document.querySelector('.full-title i');
downClose.addEventListener('click',()=>{
    finalMob.style='opacity:0';
})
