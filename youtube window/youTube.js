

var videos = ["AlbumArt/img1.jpg", "AlbumArt/img2.jpg", "AlbumArt/img3.jpg", "AlbumArt/img4.jpg", "AlbumArt/img5.jpg", "AlbumArt/img6.jpg", "AlbumArt/img7.jpg"];
    $('#video0').prepend('<img src=' + videos[0] + ' class= "vidPreview"/>');
    $('#video1').prepend('<img src=' + videos[1] + ' class= "vidPreview"/>');
    $('#video2').prepend('<img src=' + videos[2] + ' class= "vidPreview"/>');
    $('#video3').prepend('<img src=' + videos[3] + ' class= "vidPreview"/>');
    $('#video4').prepend('<img src=' + videos[4] + ' class= "vidPreview"/>');
    $('#video5').prepend('<img src=' + videos[5] + ' class= "vidPreview"/>');
    $('#video6').prepend('<img src=' + videos[6] + ' class= "vidPreview"/>');

    $('#leftButton').click(function() {
    });

var initVariables = {
    "rotationAngle":65, //degrees
    "bgVideoPercent": 15, //percent should be calculated by window size!!
    "primaryVideoPercent":70 //percent
}
//dynamic variables
var currentVideoIndex = 4;
var previousVideoIndex = currentVideoIndex;
var flipTimeouts = [];
$(window).load(init); //initialize upon loading of images


function init() {
    var position = 1;
    //stores position in this list to each vid and the left position 
    $('.vidDiv').each( function() {
        $(this).data('vidNumber', position++);
        $(this).data('oldLeftPosition', 0);
    });
    $('.vidDiv').click( function(){
        console.log('before move')
        $('.vidDiv').each( function() {
            console.log($(this).data('vidNumber'));
            console.log($(this).data('oldLeftPosition'));
            });  
        previousVideoIndex = currentVideoIndex;
        currentVideoIndex= $(this).data('vidNumber'); 
        displayGallery();
        console.log('after move')
        $('.vidDiv').each( function() {
            console.log($(this).data('vidNumber'));
            console.log($(this).data('oldLeftPosition'));
            });  
    });
    displayGallery();
        
}

function displayGallery() {
    var thisVideoIndex = 1
    var galleryWidth = $('#videoGallery').width();
    var galleryCenter =galleryWidth/2;
    var windowHeight = $(window).height();
    //the number of pixels a background preview will move when prompted
    var moveDistance = (windowHeight*initVariables.bgVideoPercent)/100; 
    var primaryVideoPadding=(windowHeight*initVariables.primaryVideoPercent)/100;
    while ( time = flipTimeouts.pop() ) clearTimeout(time);

    $('.vidDiv').each( function(){
        var thisVideo = $(this);
        if (thisVideoIndex < currentVideoIndex) {
            var leftPosition = ((galleryCenter) -
                                (currentVideoIndex*moveDistance)+
                                (thisVideoIndex*moveDistance)-
                                (thisVideo.width()/2)- 
                                (primaryVideoPadding))
            if (thisVideoIndex > previousVideoIndex) {
                thisVideo.css( {
                  '-webkit-transition': 'none',
                  '-webkit-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                        });
            }
            var timeOut = setTimeout( function() {
                thisVideo.css( {
                  '-webkit-transition': '-webkit-transform .8s cubic-bezier(0, 0, .001, 1)',
                  '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(' + initVariables.rotationAngle + 'deg)'
                });
            }, 10 );
            flipTimeouts.push(timeOut);
            thisVideo.data('oldLeftPosition', leftPosition);

        }
        else if (thisVideoIndex > currentVideoIndex) {
            var leftPosition = ((galleryCenter) +
                                (thisVideoIndex*moveDistance)-
                                (currentVideoIndex*moveDistance)-
                                (thisVideo.width()/2)+ 
                                (primaryVideoPadding))
            if (thisVideoIndex < previousVideoIndex) {
                thisVideo.css( {
                  '-webkit-transition': 'none',
                  '-webkit-transform': 'translate3d(' + thisVideo.data('oldLeftPosition') + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                        });
            }
            var timeOut = setTimeout( function() {
                thisVideo.css( {
                  '-webkit-transition': '-webkit-transform .8s cubic-bezier(0, 0, .001, 1)',
                  '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,-' + (100+parseInt(thisVideo.width()/1.5)) + 'px) rotateY(-' + initVariables.rotationAngle + 'deg)'
                });
            }, 10 );
            flipTimeouts.push(timeOut);
            thisVideo.data('oldLeftPosition', leftPosition);            

        }
        else {
            var leftPosition = galleryCenter-(thisVideo.width()/2);
            thisVideo.css( {
                '-webkit-transform': 'translate3d(' + leftPosition + 'px,0,0) rotateY(0deg)'
            });
            thisVideo.data('oldLeftPosition', leftPosition);
        }
    thisVideoIndex+=1;
    });
}


