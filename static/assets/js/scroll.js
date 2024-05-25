const moveLeft=document.querySelectorAll('#move-left');
const moveRight=document.querySelectorAll('#move-right');


moveRight.forEach(e=>{
    e.addEventListener('click',()=>{
            let scroller=e.parentNode.parentNode.parentNode.children[2];
            scroller.scrollLeft+=scroller.offsetWidth*0.4;        
    })
})
moveLeft.forEach(e=>{
    e.addEventListener('click',()=>{
        let scroller=e.parentNode.parentNode.parentNode.children[2];
        scroller.scrollLeft-=scroller.offsetWidth*0.4; 
    })
})