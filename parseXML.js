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
            console.log(songs);
            sessionStorage.clear();
            sessionStorage.setItem('library', JSON.stringify(songs));
            window.location.replace('library.html');
        }
        
    $('#fileInput').on('change', function(e) {
        var file = this.files[0];
        if (file !== null){
            var fr = new FileReader();
            fr.onloadend = function(evt) {
                  if (evt.target.readyState == FileReader.DONE) {
                    libParser(evt.target.result);
                  }
                };
            fr.onerror = function (evt) {
                console.log(evt.target.error);
            }
            fr.readAsText(file);
        }
        else alert("Document error. Of type " + file.type)
    });
        
    /*
    PLEASE NOTE == THE BELOW IS FOR TESTING IN CHROME ONLY
    FileReader WILL NOT RUN WITH LOCAL FILES IN CHROME
    
    var libraryXML = $.get('Library.xml', libParser, 'xml');
    libraryXML.complete(function() {
        sessionStorage.clear();
        sessionStorage.setItem("library", JSON.stringify(songs));
        window.location.replace('library.html');
    });
*/
});
