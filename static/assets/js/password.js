const lock=document.querySelectorAll('#lock');

lock.forEach(e=>{
    e.addEventListener('click',()=>{
        let passput=e.parentNode.querySelector('.passput');
        if(e.className=='fa fa-lock'){
            e.className='fa fa-unlock-keyhole';
            passput.type="text";
        }else{
            e.className='fa fa-lock';
            passput.type="password"; 
        }
    })
})