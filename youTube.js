
//------------------initialization----------------
window.onload=init;

var initVariables = {
    "rotationAngle":65, //degrees
    "bgVideoPercent": 25, //percent should be calculated by window size!!
    "primaryVideoPercent":60 //percent
}

function init() {
    resetAll();
    $('.vidDiv').click( function(){
        if ($(this).data('vidNumber') != currentVideoIndex){
            if (videoPlaying) {
                $('#player').remove();
                window.videoPlaying = false
            }
                else {
                    previousVideoIndex = currentVideoIndex;
                    currentVideoIndex= $(this).data('vidNumber'); 
                    displayGallery();
                    }
        }
        else {
            playVideo();
        }
    });
        
}
function resetAll(){
    window.currentVideoIndex = 1;
    window.previousVideoIndex = currentVideoIndex;
    window.flipTimeouts = [];
    window.videoPlaying = false;
    var position = 1;
    $('.vidPreview').remove();
    //stores position in this list to each vid and the left position 
    $('.vidDiv').each( function() {
        $(this).data('vidNumber', position++);
        $(this).data('oldLeftPosition', 0);
    });
}



//----------------manipulating of video objects--------------
function getSong(searchString) {
    resetAll();
    var song = searchString.match(/\w+|"[^"]+"/g);
    var searchQuery = ""
    for (var i = 0; i<song.length; i++){
        searchQuery = searchQuery + song[i]+ "%20"
    }
    searchQuery = searchQuery.substring(0, searchQuery.length - 3);
        $.ajax({
            type: "GET",
            url: "https://gdata.youtube.com/feeds/api/videos/-/%7Bhttp%3A%2F%2Fgdata.youtube.com%2Fschemas%2F2007%2Fcategories.cat%7DMusic?alt=json&q=" + searchQuery+ "&orderby=viewCount&format=5",
            dataType: "jsonp",
            success: function(data) {
                    var feed = data.feed;
                    window.entries = feed.entry || [];
                    processVideos(entries);
            }
        });
    }

function processVideos(entries) {
  for (var i = 0; i< entries.length; i++) {
    var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url
    $('#video'+i).prepend('<img src=' + thumbnailUrl + ' class= "vidPreview"/>');
    }
    displayGallery();

}


function playVideo(){
        window.videoPlaying = true;
        var playerUrl = entries[currentVideoIndex-1].media$group.media$content[0].url;
        var autoplay = true;
        var obj = document.createElement('object');
        obj.setAttribute('id','player');
        //find the current video to append to
        $('.vidDiv').each( function(){
            if ($(this).data('vidNumber') === currentVideoIndex){
                $(this).prepend(obj)
            }
        });   
        $('#player').each(function() {
        swfobject.embedSWF(
          playerUrl + '&rel=1&border=0&fs=1&autoplay=' + 
          (autoplay?1:0)+ "?enablejsapi=1", 'player', '290', '240', '9.0.0', false, 
          false, {allowfullscreen: 'true'}, {id: 'player'});
        //add css to object
        swfobject.createCSS("#player", "width:100%; height:90%;");            
        });
 
    }

//--------------------displaying and manipulating gallery----------------
function displayGallery() {
    var thisVideoIndex = 1;
    var leftz = 1;
    var rightz = 24;
    var currentz = 25;
    var galleryWidth = $('#videoGallery').width();
    var galleryCenter =galleryWidth/2;
    //the number of pixels a background preview will move when prompted
    var moveDistance = ($(window).height()*initVariables.bgVideoPercent)/100; 
    //determines padding so video fits on screen
    var primaryVideoPadding=($(window).height()*initVariables.primaryVideoPercent)/100;
    while ( time = flipTimeouts.pop() ) clearTimeout(time);

    $('.vidDiv').each( function(){
        var thisVideo = $(this);
        if (thisVideoIndex < currentVideoIndex) {
            var leftPosition = ((galleryCenter) -
                                (currentVideoIndex*moveDistance)+ //moved to center of left most div
                                (thisVideoIndex*moveDistance)- //moved to center of current div
                                (thisVideo.width()/2)- //moved to left of current div
                                (primaryVideoPadding)) //added padding for primary div
            //begin rotation of div if needed
            if (thisVideoIndex > previousVideoIndex) {
                thisVideo.css( {
                  '-webkit-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)',
                  '-moz-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                        });
            }
            //wait the 10ms then begin moving
            var timeOut = setTimeout( function() {
                thisVideo.css( {
                    '-webkit-transition': '-webkit-transform .8s cubic-bezier(.1, .1, .001, 1)',
                    '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(' + initVariables.rotationAngle + 'deg)',
                    '-moz-transition': '-moz-transform .8s cubic-bezier(0, 0, .001, 1)',
                    '-moz-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(' + initVariables.rotationAngle + 'deg)'
                });
            }, 10 );
            flipTimeouts.push(timeOut);
            thisVideo.data('oldLeftPosition', leftPosition);
            thisVideo.css( {
                'z-index':  leftz});
            leftz += 1;
        }
        //determine rotation/location if video is on right
        else if (thisVideoIndex > currentVideoIndex) {
            var leftPosition = ((galleryCenter) +
                                (thisVideoIndex*moveDistance)-
                                (currentVideoIndex*moveDistance)-
                                (thisVideo.width()/2)+ 
                                (primaryVideoPadding))
            if (thisVideoIndex < previousVideoIndex) {
                thisVideo.css( {
                  '-webkit-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)',
                  '-moz-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                        });
            }
            var timeOut = setTimeout( function() {
                thisVideo.css( {
                    '-webkit-transition': '-webkit-transform .8s cubic-bezier(.1, .1, .001, 1)',
                    '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)',
                    '--moz-transition': '-moz-transform .8s cubic-bezier(0, 0, .001, 1)',
                    '-moz-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                });
            }, 10 );
            flipTimeouts.push(timeOut);
            thisVideo.data('oldLeftPosition', leftPosition);
            thisVideo.css( {
                    'z-index':  rightz});
            rightz-= 1 

        }
        else {
            var leftPosition = galleryCenter-(thisVideo.width()/2);
            thisVideo.css( {
                'z-index': currentz,
                '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,0) rotateY(0deg)',
                '-moz-transform': 'translate3d(' + leftPosition + 'px,0,0) rotateY(0deg)'

            });
            thisVideo.data('oldLeftPosition', leftPosition);
        }
    thisVideoIndex+=1;
    });

}

