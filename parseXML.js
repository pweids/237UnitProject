$(document).ready(function() {

    var songs = [];

    var libParser = function(xml) {

            var songNodes = $(xml).find("dict>dict>dict");
            songNodes.each(function(index) {
                var newSong = {};


                newSong.id = $('key:contains("Track ID")', $(this)).next().text();
                newSong.name = $('key:contains("Name")', $(this)).next().text();
                newSong.artist = $('key:contains("Artist")', $(this)).next().text();
                newSong.album = $('key:contains("Album")', $(this)).next().text();
                newSong.time = $('key:contains("Total Time")', $(this)).next().text();

                songs.push(newSong);
            });
        }


    var libraryXML = $.get('Library.xml', libParser, 'xml');
    libraryXML.complete(function() {
        sessionStorage.clear();
        sessionStorage.setItem("library", JSON.stringify(songs));
        window.location.replace('library.html');
    });

});
