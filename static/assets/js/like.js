const likeBtns=document.querySelectorAll('.music-like');

likeBtns.forEach(e=>{
    e.addEventListener('click',()=>{
        let lstate=e.children[0].className=='fa-regular fa-heart';
        e.children[0].className=lstate?
        'fa fa-heart':'fa-regular fa-heart';
        let getUrl=e.getAttribute('get-data');
        $.ajax({
            type: 'GET',
            url: getUrl,  // Replace with your view URL
            success: function(response) {
                // console.log(response);
            },
            error: function(error) {
                console.error(error);
            }
        });
    })
});

