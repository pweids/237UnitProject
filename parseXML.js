$(document).ready(function() {

    var songs = [];

    var libParser = function(xml) {

            var songNodes = $(xml).find("dict>dict>dict");
            songNodes.each(function(index) {
                var newSong = {
                    id: index
                };

                newSong.name = $(':nth-child(4)', $(this)).text();
                newSong.artist = $(':nth-child(6)', $(this)).text();
                newSong.album = $(':nth-child(10)', $(this)).text();
                newSong.time = $(':nth-child(18)', $(this)).text();;

                songs.push(newSong);

            })
        }


    var libraryXML = $.get('Library.xml', libParser, 'xml');
    libraryXML.complete(function(){
        console.log(JSON.stringify(songs));
        sessionStorage.setItem("library", JSON.stringify(songs));
        //window.location.replace('library.html'); 
    });

});
