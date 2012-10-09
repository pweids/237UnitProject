

var canvas = document.getElementById("myCanvas");
image = document.getElementById("image");
$('#image').css({'display': 'none'});
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var imageHeight = image.height;
var imageWidth = image.width;
var tileWidth = imageWidth/10;
var tileHeight = imageWidth/10;
var scalar = 1;
var tiles = 100;
var xOff = -1 * imageWidth / 2;
var yOff = -1 * imageHeight / 2;

function init() {
    drawTiles();
}

function drawTiles(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.save();
    ctx.translate(canvasWidth/2, canvasHeight/2);
    ctx.scale = scalar;
    ctx.rotate(scalar - 1);
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var tileX = i * tileWidth;
            var tileY = j * tileHeight;
            ctx.drawImage(image, tileX, tileY, tileWidth, tileHeight,
                          scalar * (xOff + tileX),
                          scalar * (yOff + tileY), tileWidth, tileHeight);
        }
    }
    playButton = new Image();
    playButton.src = 'Images/youtube-play.jpg';
    ctx.drawImage(playButton, 0, 0);
    ctx.restore();
}

$("#myCanvas").click(function boom() {
    scalar += 0.1;
    drawTiles();
    if (scalar < 7.2){
        window.setTimeout(boom, 50);
    }
    else{
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        $('#myCanvas').remove()
        $("body").css("overflow", "visible");
    }
});
init();
