if(window.location.pathname=='/'){
    loadTracks();
    loadArtists();
    loadNewRelease();
    loadFeaturedPlaylist();
}

$(document).on("click", "a", function(event) {
    event.preventDefault();

    const url = $(this).attr("href");
    
    let filepath = new URL(`${window.location.href}${url}`);
    
    $.ajax({
        url: url,
        method: "GET",
        success: function(data) {
            const content = $(data).find("#content");
            $("#content").html(content.html());
            
            if (url == '/') {
                loadTracks();
                loadArtists();
                loadNewRelease();
                loadFeaturedPlaylist();
            } else if (url == '/explore') {
                loadTrackz();
                loadMegaHits();
                loadBestz();
                loadGerne();
            } else if (filepath.pathname == '//search') {
                turnSearch();
                if (searchTerm != "") {
                    loadSearchArtist(searchTerm.value);
                    loadSearchTrack(searchTerm.value);
                }
            } else if (filepath.pathname == '//card') {
                const playlistId = document.querySelector('#playlist').value;
                const albumId = document.querySelector('#album').value;

                if (playlistId != "") {
                    loadPlaylist(playlistId);
                } else {
                    loadAlbum(albumId);
                }
            } else if(url.split('/')[1]=='artist'){
                let artistId=document.querySelector('#artistId').value;
                loadArtist(artistId);
                loadSimilar(artistId);
                loadAlbums(artistId);
                loadPopular(artistId,5);
                const toggleBtn=document.querySelector('#toggleMore');
                toggleBtn.addEventListener('click',()=>{
                    let val=toggleBtn.textContent=='See More';
                    let artistId=document.querySelector('#artistId').value;
                    if(val){
                        loadPopular(artistId,10);
                        toggleBtn.textContent='See Less';
                    }else{
                        loadPopular(artistId,5);
                        toggleBtn.textContent='See More';
                    }
                })
            }
        }
    });
});
