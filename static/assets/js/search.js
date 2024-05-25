const searchIcon=document.querySelector('.menu-ele-icon');
const menu=document.querySelector('.menu');
const menuEle=document.querySelectorAll('.menu-ele');
const inputSearch=document.querySelector('.input-search');

let state=true;
searchIcon.addEventListener('click',()=>{
    let mobile=screen.width;
    // console.log(mobile);
    if(state && mobile>600){
        menu.style=`
            grid-template-columns: 90% 10%;
        `;
        menuEle.forEach(e=>{
            e.style=`
                display:none;
            `;
        })
        inputSearch.style="display:block";
        state=false;
    }else if(!state && mobile>600){
        menu.style=`
            grid-template-columns: repeat(3,30%) 10%;
        `;
        menuEle.forEach(e=>{
            e.style=`
                display:block;
            `;
        })
        inputSearch.style="display:none";
        state=true;
    }
});

function turnSearch(){
    menu.style=`
            grid-template-columns: 90% 10%;
        `;
    menuEle.forEach(e=>{
        e.style=`
            display:none;
        `;
    })
    inputSearch.style="display:block";
    state=false;
}