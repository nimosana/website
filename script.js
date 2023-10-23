let week7Color = "#000000aa", week7LinkColor = "#000000aa";

function onClickWeek7() {
    let swap = document.getElementById("week7p").style.color;

    document.getElementById("week7p").style.color = week7Color;
    week7Color = swap;

    document.getElementById("week7Link").style.color = week7LinkColor;
    week7LinkColor = swap;
}


// // document.getElementById("week6").innerHTML = "aaaaa";
// document.getElementById("catGif").src = "https://people.com/thmb/ZRvBpMf4KK7HjBnSrZOYyqDU4Mk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/Dog-Birthday-Party-tout-052423-8cfd398176ce4a50b707ae8ec4406a12.jpg";
// if (document.getElementById("week6").style.color === "#e5ff00") {
// } else {
//     document.getElementById("week6").style.color = "#e5ff00";
// }
