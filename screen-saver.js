var x = 0, y = 0;
var xSpeed = 2;
var ySpeed = 3;
var logoImgSrc = './Dvd-video-logo.png';
var vewPoint;

var timer;
var intervalId;
var screenOffTime = 5000; //ms

var logoImg = new Image();

logoImg.onload = function(){
    vewPoint = document.getElementById('screen-saver');
    vewPoint.appendChild(logoImg);
    // setInterval(logoAnime, 25);
}

logoImg.src = logoImgSrc;
logoImg.style.cssText = 'display: none; width:20%; position:absolute; left:0px; top:16px;'

var logoAnime = function(){
    x += xSpeed;
    if (((x + logoImg.width) > window.innerWidth) || (x < 0)) xSpeed *= -1;
    if ((x + logoImg.width) > window.innerWidth) x=window.innerWidth-logoImg.width
    if (x < 0) x=0
    logoImg.style.left = x+"px";

    y += ySpeed;
    if (((y + logoImg.height) > window.innerHeight) || (y < 0)) ySpeed *= -1;
    if ((y + logoImg.height) > window.innerHeight) y=window.innerHeight-logoImg.height
    if (y < 0) y=0
    logoImg.style.top = y+"px";
}

var fadeIn = function(element, time, callback) {
    var fadeTime     = (time) ? time : 400,
        keyFrame     = 30,
        stepTime     = fadeTime / keyFrame,
        maxOpacity   = 1,
        stepOpacity  = maxOpacity / keyFrame,
        opacityValue = 0,
        sId          = '';
 
    if (!element) return;
 
    if (element.getAttribute('data-fade-stock-display') !== undefined &&
        element.getAttribute('data-fade-stock-display') !== null) {
        element.style.display = element.getAttribute('data-fade-stock-display');
    }
 
    var setOpacity = function(setNumber) {
        if ('opacity' in element.style) {
            element.style.opacity = setNumber;
        } else {
            element.style.filter = 'alpha(opacity=' + (setNumber * 100) + ')';
 
            if (navigator.userAgent.toLowerCase().match(/msie/) &&
                !window.opera && !element.currentStyle.hasLayout) {
                element.style.zoom = 1;
            }
        }
    };
 
    if (!callback || typeof callback !== 'function') {
        callback = function() {};
    }
 
    setOpacity(0);
 
    sId = setInterval(function() {
        opacityValue = Number((opacityValue + stepOpacity).toFixed(12));
 
        if (opacityValue > maxOpacity) {
            opacityValue = maxOpacity;
            clearInterval(sId);
        }
 
        setOpacity(opacityValue);
 
        if (opacityValue === maxOpacity) {
            callback();
        }
    }, stepTime);
 
    return element;
};

function countDown() {
    fadeIn(vewPoint, 1000);
    logoImg.style.display ="block";
    intervalId = setInterval(logoAnime, 25);
    return true;
}

function restartTimer() {
    logoImg.style.display  = "none";
    vewPoint.style.opacity = 0;
    clearInterval(intervalId);

    clearTimeout(timer);
    timer=setTimeout('countDown()',screenOffTime);
    return true;
}
function load() {
    timer=setTimeout('countDown()',screenOffTime);
    document.body.addEventListener("mousedown", restartTimer, false);
    document.body.addEventListener("keypress", restartTimer, false);
    window.addEventListener("scroll", restartTimer, false);
}
document.addEventListener("DOMContentLoaded", load, false);

