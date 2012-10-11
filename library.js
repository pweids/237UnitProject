/* library.js
    Active on library.html
    Created by Paul Weidinger and Jeff Mich
*/

$(document).ready(function() {
    var currentSong = {
        name: null,
        artist: null
    };
    var currentTR;
    var playlists = [];
    
//Helper Functions
    //This makes the top bar width flexible and more accurate
    function setSizes() {
        var rightWidth = Math.max($('body').width() - 216, 400);
        $("#topbar").width(rightWidth);
        $('.songlist').width(rightWidth);
        $('.songlist > table').width(rightWidth);
    }


    //This clears the selection on the window to avoid double-click selection when interacting with elems
    function clearSelection() {
        if (document.selection && document.selection.empty) {
            document.selection.empty();
        } else if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    
    //This converts milliseconds to mins/secs
    function betterTime(songtime) {
        var x = songtime / 1000;
        var seconds = Math.round(x % 60);
        x /= 60;
        var minutes = Math.round(x % 60);

        return minutes + ((seconds < 10) ? ":0" : ":") + seconds;
    }

    //Main Functionality
    setSizes();
    
    
    //Parse the JSON in sessionStorage and add to library
    var songs = JSON.parse(sessionStorage.getItem("library"));
    if (!songs) {
        alert("Error! Bad Session Storage");
    } else {
        $.each(songs, function(key, value) {
            $('.songlist table').append('<tr><td>' + value.name + '</td><td>' + betterTime(value.time) + '</td><td>' + value.artist + '</td><td>' + value.album + '</td></tr>');
        });
    }
    
    

    //Event Handlers
    $(window).resize(function() {
        setSizes();
    });

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

    //When a user creates a new playlist, we create it, add to the list of playlists, and assign it event handlers
    $('#addPlaylist').click(function() {
        var plistname = prompt("Insert name for new playlist");
        if (plistname) {
            $('.plist.listblock ul').append('<li>' + plistname + '</li>');
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
        }
    });

    //Bring up the box that adds to playlists and plays the song
    $(".songlist tr").click(function(e) {
        var name = $(this).children(':nth-child(1)').text();
        var artist = $(this).children(':nth-child(3)').text();
        $("#addBox").css('left', e.pageX - 216).css('top', e.pageY - 40).show();
        currentSong.name = name;
        currentSong.artist = artist;
        currentTR = $(this);
    });

    //Fades the addbox away when the mouse cursor moves out of the div
    $("#addBox").mouseleave(function() {
        if (!$('#addBoxSelections').is(':focus')) $(this).fadeOut()
        $('.songlist .selected').removeClass('selected');
    })

    //Handles add-to-playlist selector
    $('#addBoxSelections').change(function() {
        selectedplist = $((':selected'), $(this)).text();
        currentTR.addClass('playlist-' + selectedplist);
        $(this).blur();
    })

    //handles play button
    $('#playit').click(function() {
        var searchString = currentSong.name + currentSong.artist;
            if (window.videoPlaying) {
                $('#player').remove();
                window.videoPlaying = false
            }
        getSong(searchString);
    })
    
    currentSong.name = $('.songlist tr:nth-child(1)').children(':nth-child(1)').text();
    currentSong.artist = $('.songlist tr:nth-child(1)').children(':nth-child(3)').text();
    var search = currentSong.name + currentSong.artist;
        if (window.videoPlaying) {
            $('#player').remove();
            window.videoPlaying = false
        }
    getSong(search);
});
