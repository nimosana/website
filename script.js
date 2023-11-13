"use strict";

const soundFile = new Audio("resources/sounds/bark.wav");
let week7Color = "#000000aa", week7LinkColor = "#000000aa";
let randomColorR, randomColorG, randomColorB, randomColorREm, randomColorGEm, randomColorBEm;
let horizontalOffset = 0;
let verticalOffset = 0;

let rightKey = false;
let leftKey = false;
let upKey = false;
let downKey = false;
let interval = setInterval(movePicture, 20);
setInterval(week8Color, 500);
setInterval(week9Color, 10);
let posXOffset = 0, posYOffset = 0;


setInterval(week8Color, 10);
document.addEventListener("keydown", keyUpListener);
document.addEventListener("keyup", keyDownListener);

function keyUpListener(event) {

    if (event.keyCode == 68) {
        rightKey = true;
    } else if (event.keyCode == 87) {
        upKey = true;
    } else if (event.keyCode == 83) {
        downKey = true;
    } else if (event.keyCode == 65) {
        leftKey = true;
    } else if (vent.keyCode == 192) {
        window.alert("foshizzle");
    }
}

function keyDownListener(event) {

    if (event.keyCode == 68) {
        rightKey = false;
    } else if (event.keyCode == 87) {
        upKey = false;
    } else if (event.keyCode == 83) {
        downKey = false;
    } else if (event.keyCode == 65) {
        leftKey = false;
    } else if (event.keyCode == 192) {
        window.alert("haeoifhaeoi");
    } else if (event.keyCode == 16) {
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


    if (rightKey) {
        document.getElementById("moveimage").style.left = horizontalOffset + "px";
        if (horizontalOffset <= 1000) {
            horizontalOffset += 10;
        } else {
            horizontalOffset = 0
        }
    }

    if (leftKey) {
        document.getElementById("moveimage").style.left = horizontalOffset + "px";
        if (horizontalOffset >= 0) {
            horizontalOffset -= 10;
        } else {
            horizontalOffset = 1000
        }
    }

    if (upKey) {
        document.getElementById("moveimage").style.top = verticalOffset + "px";
        if (verticalOffset >= 0) {
            verticalOffset -= 10;
        } else {
            verticalOffset = 1000
        }
    }

    if (downKey) {
        document.getElementById("moveimage").style.top = verticalOffset + "px";
        if (verticalOffset <= 1000) {
            verticalOffset += 10;
        } else {
            verticalOffset = 0
        }
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
