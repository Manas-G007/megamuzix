const deskFull=document.querySelector('.desk-full');
const fullBtn=document.querySelector('.music-right i');

fullBtn.addEventListener('click',()=>{
    let checkState=realController.src==window.location.href;
    if(!checkState){
       let fcheck=fullBtn.className;
        if(fcheck=='fa fa-circle-chevron-up'){
            fullBtn.className='fa fa-circle-chevron-down';
            deskFull.style='height:100%';
        }else{
            fullBtn.className='fa fa-circle-chevron-up';
            deskFull.style='height:0';
        } 
    }
    
})

