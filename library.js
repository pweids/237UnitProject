$(document).ready(function() {
    var currentSong = {name:null, artist:null};
    var currentTR;
    var playlists = [];
//Helper Functions

    //This makes the top bar width flexible and more accurate
    function setSizes() {
       var rightWidth = Math.max($('body').width()-216, 400);
       $("#topbar").width(rightWidth);
       $('.songlist').width(rightWidth);
       $('.songlist > table').width(rightWidth);
    }
    
    
    //This clears the selection on the window to avoid double-click selection when interacting with elems
    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    
    function getReadableTime(songtime) {
        x = songtime / 1000;
        seconds = Math.round(x % 60);
        x /= 60;
        minutes = Math.round(x % 60);
        
        return minutes + ((seconds<10) ? ":0" : ":") + seconds ;
    }
    
//Main Functionality
    setSizes();
    var songs = JSON.parse(sessionStorage.getItem("library"));
    if (!songs) {
        alert("Error! Bad Session Storage");
    }
    else {
        $.each(songs, function(key, value) {
            $('.songlist table').append('<tr><td>' + value.name + 
            '</td><td>' + getReadableTime(value.time) + '</td><td>' + value.artist + 
            '</td><td>' + value.album + '</td></tr>');
        });
    }
        

    
//Event Handlers

    $(window).resize(function() { setSizes(); });
    
    // When the "Playlist" button is hit it shows the listblock
    $(".expander.plist").click(function() {
        $(".plist.listblock").toggle();
        clearSelection();
    });
    
    //When the browse button is hit, it shows the listblock
    $(".expander.lib").click(function() {
        $(".lib.listblock").toggle();
        clearSelection();
    });
    
    //When a playlist is selected
    
    //when the library is selected
    $(".lib.listblock").click(function() {
        $('.plist ul').find('li').removeClass('selected');
        $(this).addClass('selected');
        $('.songlist tr').show();
    });
    
    $('#addPlaylist').click(function() {
        var plistname = prompt("Insert name for new playlist");
        $('.plist.listblock ul').append('<li>'+plistname+'</li>');
        $('#addBoxSelections').append($('<option></option>').text(plistname));
        $(".plist.listblock").toggle();
        playlists.push(plistname);
        $(".plist li").click(function() {
            $(this).parent().find('li').removeClass('selected');
            $('.lib').removeClass('selected');
            $(this).addClass('selected');
            $('.songlist tr').hide();
            classname = '.playlist-' + $(this).text();
            $(classname).show();
        });
    });
    
    $(".songlist tr").click(function(e) {
        var name = $(this).children(':nth-child(1)').text();
        var artist = $(this).children(':nth-child(3)').text();
        $("#addBox").css('left', e.pageX-216).css('top', e.pageY-10).show();
        $(this).addClass('selected');
        currentSong.name=name;
        currentSong.artist=artist;
        currentTR = $(this);
    });
    
    $("#addBox").mouseleave( function() {
        if (!$('#addBoxSelections').is(':focus'))
            $(this).fadeOut()
        $('.songlist .selected').removeClass('selected');
    })
    
    $('#addBoxSelections').change(function() {
        selectedplist = $((':selected'), $(this)).text();
        currentTR.addClass('playlist-' + selectedplist);
        $(this).blur();
    })
});