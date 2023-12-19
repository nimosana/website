"use strict";

const soundFile = new Audio("resources/sounds/bark.wav");
let week7Color = "#000000aa", week7LinkColor = "#000000aa";
let dPressed, aPressed, wPressed, sPressed, ctrlPressed;
let vx = 0;
let vy = 0;
let xOffset = 0;
let yOffset = 68;
let backgroundPos = 0;
let lastScrollPos = 0;
let speed = 0.05;
let breathing = 0;
let logoX = 0;
let logoVx = 0;
let logoY = 0;
let logoVy = 0;
let mouseX = 0;
let mouseY = 0;
let bgCount = 0;
let pulsing = 150;
let hue = 0;
document.addEventListener('mousemove', mouseListener);
document.addEventListener("keydown", keyUpListener);
document.addEventListener("keyup", keyDownListener);
window.addEventListener("scroll", scrollListener);

setInterval(moveBackground, 50);
setInterval(movePicture, 1);
setInterval(followMouse2, 1);
setInterval(titleColors, 1);
setInterval(vidBorders, 150)

function mouseListener(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

}

function scrollListener(event) {
    let scrollDiff = lastScrollPos - window.scrollY;
    if (scrollDiff < 0) {
        logoY += Math.abs(scrollDiff);
        lastScrollPos = window.scrollY;
    } else {
        logoY -= Math.abs(scrollDiff);
        lastScrollPos = window.scrollY;
    }
}

function keyUpListener(event) {

    if (event.keyCode == 68) {
        dPressed = true;
    } if (event.keyCode == 87) {
        wPressed = true;
    } if (event.keyCode == 83) {
        sPressed = true;
    } if (event.keyCode == 65) {
        aPressed = true;
    } if (event.keyCode == 192) {
        window.alert("frrrrrr");
    } if (event.keyCode == 17) {
        ctrlPressed = true
    }
}

function keyDownListener(event) {

    if (event.keyCode == 68) {
        dPressed = false;
    } if (event.keyCode == 87) {
        wPressed = false;
    } if (event.keyCode == 83) {
        sPressed = false;
    } if (event.keyCode == 65) {
        aPressed = false;
    } if (event.keyCode == 16) {
        soundFile.play();
    } if (event.keyCode == 17) {
        ctrlPressed = false
    }
}

function movePicture() {
    if (dPressed && !aPressed) {
        logoVx += speed;
    } else if (aPressed && !dPressed) {
        logoVx -= speed;
    }
    if (wPressed && !sPressed) {
        logoVy -= speed;
    } else if (sPressed && !wPressed) {
        logoVy += speed;
    }
    if (ctrlPressed) {
        logoVx /= 1.1;
        logoVy /= 1.1;
    }
}

function Color(r, g, b) {
    return "rgb(" + r + ", " + g + "," + b + ")";
}

function titleColors() {
    document.getElementById("portraitTop").getElementsByTagName("span")[0].style.color = Color(Math.floor(Math.random() * (160 - 100)) + 100, Math.floor(Math.random() * (30 - 15)), Math.floor(Math.random() * (30 - 15)));
    let sinValue = Math.sin(breathing * 0.005);
    let breathingValue = Math.floor(((sinValue + 1) / 2 * 120));
    breathing++;
    document.getElementById("portraitBottom").getElementsByTagName("span")[0].style.color = Color(breathingValue, 0, 0);
    pulsing -= 0.4;
    if (pulsing < 0) {
        pulsing = 150;
    }
    document.getElementById("questionTruth").getElementsByTagName("span")[0].style.color = Color(Math.floor(Math.random() * (160 - 100)) + 100, Math.floor(Math.random() * (60)), Math.floor(Math.random() * (60)));
    document.getElementById("yourInterests").getElementsByTagName("span")[0].style.color = Color(pulsing, 0, 0);

    hue++;
    if (hue > 360) {
        hue = 0
    }
    document.getElementById("whatsNext").getElementsByTagName("span")[0].style.color = `hsl(${hue},100%,50%)`;
    let rainbowyLetterz = document.getElementsByClassName("em11")
    for (let text of rainbowyLetterz) {
        text.style.color = `hsl(${hue},100%,50%)`;
    }
    document.getElementById("rights").style.color = `hsl(${hue},100%,50%)`;

}

function moveBackground() {
    if (bgCount === 0) {
        backgroundPos++;
        document.getElementById("body").style.backgroundPosition = `${backgroundPos}px ${backgroundPos}px`
    } else {
        backgroundPos--;
        document.getElementById("body").style.backgroundPosition = `${backgroundPos}px ${backgroundPos}px`
    }
}

function followMouse2() {
    if (logoX + (document.getElementById("logo").width / 2) < mouseX) {
        logoVx += 0.05;
    } else {
        logoVx -= 0.05;
    }
    if (logoY + (document.getElementById("logo").width / 2) < mouseY + window.scrollY) {
        logoVy += 0.05;
    } else {
        logoVy -= 0.05;
    }
    if (logoX < 0) {
        logoX = 0;
        logoVx *= -0.5;
    }
    if (logoX > document.documentElement.clientWidth - document.getElementById("logo").width) {
        logoX = document.documentElement.clientWidth - document.getElementById("logo").width;
        logoVx *= -0.5;
    }
    if (logoY < 0 + window.scrollY) {
        logoY = 0 + window.scrollY;
        logoVy *= -0.5;
    }
    if (logoY > document.documentElement.clientHeight + window.scrollY - document.getElementById("logo").height) {
        logoY = document.documentElement.clientHeight + window.scrollY - document.getElementById("logo").height;
        logoVy *= -0.5;
    }
    logoX += logoVx;
    logoY += logoVy;
    document.getElementById("logo").style.top = `${logoY}px`
    document.getElementById("logo").style.left = `${logoX}px`
}

function vidBorders() {
    let vidz = document.getElementsByClassName("ytVid")
    for (let vid of vidz) {
        let r = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
        let g = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
        let b = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
        vid.style.color = `rgb(${r},${g},${b})`;
    }
}

function swapBackground() {
    if (bgCount === 0) {
        document.getElementById("body").style.backgroundImage = `url('resources/nimosana_inverted.gif')`
        bgCount++;
    } else {
        document.getElementById("body").style.backgroundImage = `url('resources/nimosana_darker.gif')`
        bgCount = 0;
    }
}