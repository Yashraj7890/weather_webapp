var today = new Date();
var hours = today.getHours();

if (0 <= hours && hours < 7) {
    document.querySelector(".contain").style.backgroundImage = " url('early-morning.jpg')";
}
else if (7 <= hours && hours < 12) {
    document.querySelector(".contain").style.backgroundImage = " url('morning.jpg')";
}
else if (12 <= hours && hours < 16) {
    document.querySelector(".contain").style.backgroundImage = " url('afternoon.jpg')";
}
else if (16 <= hours && hours < 19) {
    document.querySelector(".contain").style.backgroundImage = " url('evening.jpg')";
}
else if (19 <= hours && hours < 24) {
    document.querySelector(".contain").style.backgroundImage = " url('night.jpg')";
}


