"use strict";

const soundFile = new Audio("resources/sounds/bark.wav");
let week7Color = "#000000aa", week7LinkColor = "#000000aa";
let dPressed, aPressed, wPressed, sPressed;
let vx = 0;
let vy = 0;
let xOffset = 0;
let yOffset = 68;
let backgroundPos = 0;
let lastScrollPos = 0;
let speed = 0.5;
let breathing = 0;
document.addEventListener("keydown", keyUpListener);
document.addEventListener("keyup", keyDownListener);
window.addEventListener("scroll", scrollListener);

setInterval(moveBackground, 50);
// setInterval(movePicture, 1);
setInterval(portraitColor, 150);
// setInterval(week9Color, 10);
// setInterval(week8Color, 10);

function scrollListener(event) {
    let scrollDiff = lastScrollPos - window.scrollY;
    if (scrollDiff < 0) {
        yOffset += Math.abs(scrollDiff);
        lastScrollPos = window.scrollY;
    } else {
        yOffset -= Math.abs(scrollDiff);
        lastScrollPos = window.scrollY;
    }

    // lastScrollPos = Math.abs(lastScrollPos - window.scrollY);
    // yOffset += Math.abs(lastScrollPos - window.scrollY);
    // lastScrollPos = window.scrollY;
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
    }
}

function keyDownListener(event) {

    if (event.keyCode == 68) {
        dPressed = false;
        vx /= 1.03;
    } if (event.keyCode == 87) {
        wPressed = false;
        vy /= 1.03;
    } if (event.keyCode == 83) {
        sPressed = false;
        vy /= 1.03;
    } if (event.keyCode == 65) {
        aPressed = false;
        vx /= 1.03;
    } if (event.keyCode == 16) {
        let answers = document.getElementsByClassName("answer");
        for (let answer of answers) {
            let r = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
            let g = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
            let b = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
            answer.style.color = `rgb(${r},${g},${b})`;
        }
        soundFile.play();
    }
}

function movePicture() {
    if (dPressed && !aPressed) {
        vx += speed;
    } else if (aPressed && !dPressed) {
        vx -= speed;
    }
    if (wPressed && !sPressed) {
        vy -= speed;
    } else if (sPressed && !wPressed) {
        vy += speed;
    }
    if ((!aPressed && !dPressed) || (aPressed && dPressed))
        vx /= 1.03;
    if ((!wPressed && !sPressed) || (wPressed && sPressed))
        vy /= 1.03;

    xOffset += vx;
    if (xOffset <= document.documentElement.clientWidth - document.getElementById("catGif").width) {
        document.getElementById("catGif").style.left = xOffset + "px";
    } else {
        xOffset = 0;
        document.getElementById("catGif").style.left = xOffset + "px";
    }
    if (xOffset >= 0) {
        document.getElementById("catGif").style.left = xOffset + "px";
    } else {
        xOffset = document.documentElement.clientWidth - document.getElementById("catGif").width;
        document.getElementById("catGif").style.left = xOffset + "px";
    }
    yOffset += vy;
    if (yOffset >= window.scrollY) {
        document.getElementById("catGif").style.top = yOffset + "px";
    } else {
        yOffset = document.documentElement.clientHeight + window.scrollY - document.getElementById("catGif").height;
        document.getElementById("catGif").style.top = yOffset + "px";
    }
    if (yOffset <= document.documentElement.clientHeight + window.scrollY - document.getElementById("catGif").height) {
        document.getElementById("catGif").style.top = yOffset + "px";
    } else {
        yOffset = window.scrollY;
        document.getElementById("catGif").style.top = yOffset + "px";
    }
}

function Color(r, g, b) {
    return "rgba(" + r + ", " + g + "," + b + ")";
}

function onClickWeek7() {
    let swap = document.getElementById("week7p").style.color;

    document.getElementById("week7p").style.color = week7Color;
    week7Color = swap;

    document.getElementById("week7Link").style.color = week7LinkColor;
    week7LinkColor = swap;
}

function onClickWeek8() {
    let array = document.getElementsByClassName(`week8p`)
    let swap = document.getElementById("week8p").style.color;

    for (let document of array) {
        document.style.color = week7Color;
        document.style.color = week7LinkColor;
    }
    week7Color = swap;
    week7LinkColor = swap;
}

function portraitColor() {
    document.getElementById("portraitTop").getElementsByTagName("span")[0].style.color = Color(Math.floor(Math.random() * (160 - 120)) + 120, Math.floor(Math.random() * (30 - 15)), Math.floor(Math.random() * (30 - 15)));
    let sinValue = Math.sin(breathing * 0.2);
    let breathingValue = Math.floor(((sinValue + 1) / 2 * 120));
    console.log(breathingValue)
    breathing++;
    document.getElementById("portraitBottom").getElementsByTagName("span")[0].style.color = Color(breathingValue, 0, 0);
}

function week9Color() {
    document.getElementById("week9p").style.color = Color(Math.floor(Math.random() * (200 - 80 + 1)) + 80, Math.floor(Math.random() * (30 - 15)), Math.floor(Math.random() * (30 - 15)));
    document.getElementById("portraitTop").getElementsByTagName("span")[0].style.color = Color(Math.floor(Math.random() * (255 - 150 + 1)) + 150, Math.floor(Math.random() * (255 - 150 + 1)) + 150, Math.floor(Math.random() * (255 - 150 + 1)) + 150);
    document.getElementById("week9Em").style.color = Color(Math.floor(Math.random() * (255 - 150 + 1)) + 150, Math.floor(Math.random() * (255 - 150 + 1)) + 150, Math.floor(Math.random() * (255 - 150 + 1)) + 150);
    // document.getElementById("week8Em2").style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
}

function moveBackground() {
    backgroundPos++;
    document.getElementById("body").style.backgroundPosition = `${backgroundPos}px ${backgroundPos}px`
}

// // document.getElementById("week6").innerHTML = "aaaaa";
// document.getElementById("catGif").src = "https://people.com/thmb/ZRvBpMf4KK7HjBnSrZOYyqDU4Mk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Dog-Birthday-Party-tout-052423-8cfd398176ce4a50b707ae8ec4406a12.jpg";
// if (document.getElementById("week6").style.color === "#e5ff00") {
// } else {
//     document.getElementById("week6").style.color = "#e5ff00";
// }
