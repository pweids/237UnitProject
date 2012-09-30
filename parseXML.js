xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","library.xml",false);
xmlhttp.send();
libraryXML=xmlhttp.responseXML;
var songNodes = libraryXML.getElementsByTagName('key');
var songs = []
for (var i = 0; i <songNodes.length; i++) {
        if (songNodes[i].firstChild.data === "Name") {
            var song = {
                "Song" : songNodes[i].nextSibling,
                "Artist": songNodes[i+1].nextSibling,
                "Album": songNodes[i+3].nextSibling,
                "Time": songNodes[i+7].nextSibling,
            }
        }
        songs.push(song);
    }
console.log(songs);
