"use strict";

let week7Color = "#000000aa", week7LinkColor = "#000000aa";
let randomColorR, randomColorG, randomColorB, randomColorREm, randomColorGEm, randomColorBEm;
setInterval(week8Color, 500);
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


// // document.getElementById("week6").innerHTML = "aaaaa";
// document.getElementById("catGif").src = "https://people.com/thmb/ZRvBpMf4KK7HjBnSrZOYyqDU4Mk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Dog-Birthday-Party-tout-052423-8cfd398176ce4a50b707ae8ec4406a12.jpg";
// if (document.getElementById("week6").style.color === "#e5ff00") {
// } else {
//     document.getElementById("week6").style.color = "#e5ff00";
// }
