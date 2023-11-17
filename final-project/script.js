"use strict";

const soundFile = new Audio("../resources/sounds/bark.wav");
let week7Color = "#000000aa", week7LinkColor = "#000000aa";
let randomColorR, randomColorG, randomColorB, randomColorREm, randomColorGEm, randomColorBEm;
let dPressed, aPressed, wPressed, sPressed;
let vx = 0;
let vy = 0;
let xOffset = 0;
let yOffset = 0;

setInterval(movePicture, 5);
document.addEventListener("keydown", keyUpListener);
document.addEventListener("keyup", keyDownListener);

setInterval(week8Color, 500);
setInterval(week9Color, 10);
setInterval(week8Color, 10);

function keyUpListener(event) {

    if (event.keyCode == 68) {
        dPressed = true;
        vx += 1;
    } if (event.keyCode == 87) {
        wPressed = true;
        vy -= 1;
    } if (event.keyCode == 83) {
        sPressed = true;
        vy += 1;
    } if (event.keyCode == 65) {
        aPressed = true;
        vx -= 1;
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
    } if (event.keyCode == 192) {
        window.alert("haeoifhaeoi");
    } if (event.keyCode == 16) {
        let array = document.getElementsByClassName("answer");
        for (let i = 0; i < array.length; i = i + 1) {
            console.log(`efheighrui`);
            let r = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
            let g = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
            let b = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
            array[i].style.color = `rgb(${r},${g},${b})`;
        }
        soundFile.play();
    }
}

function movePicture() {
    if (!aPressed && !dPressed) {
        vx /= 1.03;
    }
    if (!wPressed && !sPressed) {
        vy /= 1.03;
    }
    document.getElementById("catGif").style.left = xOffset + "px";
    if (xOffset <= 1000) {
        xOffset += vx;
    } else {
        xOffset = 0;
    }

    document.getElementById("catGif").style.left = xOffset + "px";
    if (xOffset >= 0) {
        xOffset += vx;
    } else {
        xOffset = 1000;
    }

    document.getElementById("catGif").style.top = yOffset + "px";
    if (yOffset >= 0) {
        yOffset += vy;
    } else {
        yOffset = 1000;
    }

    document.getElementById("catGif").style.top = yOffset + "px";
    if (yOffset <= 1000) {
        yOffset += vy;
    } else {
        yOffset = 0;
    }
}

function Color(r, g, b) {
    return "rgb(" + r + ", " + g + "," + b + ")";
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

function week8Color() {
    randomColorR = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorG = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorB = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorREm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    randomColorGEm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    randomColorBEm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    document.getElementById("week8p").style.color = Color(randomColorR, randomColorG, randomColorB);
    document.getElementById("week8H").getElementsByTagName("span")[0].style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
    document.getElementById("week8Em").style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
    document.getElementById("week8Em2").style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
}

function week9Color() {
    randomColorR = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorG = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorB = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
    randomColorREm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    randomColorGEm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    randomColorBEm = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    document.getElementById("week9p").style.color = Color(randomColorR, randomColorG, randomColorB);
    document.getElementById("week9H").getElementsByTagName("span")[0].style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
    document.getElementById("week9Em").style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
    // document.getElementById("week8Em2").style.color = Color(randomColorREm, randomColorGEm, randomColorBEm);
}

// // document.getElementById("week6").innerHTML = "aaaaa";
// document.getElementById("catGif").src = "https://people.com/thmb/ZRvBpMf4KK7HjBnSrZOYyqDU4Mk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Dog-Birthday-Party-tout-052423-8cfd398176ce4a50b707ae8ec4406a12.jpg";
// if (document.getElementById("week6").style.color === "#e5ff00") {
// } else {
//     document.getElementById("week6").style.color = "#e5ff00";
// }
