function gameStart() {
    const body = document.body;
    const colors = ["#ff5500", "#ffe500", "#ffeb3b", "#fff59e", "#DCDDD8"];
    $('a.enter').text('Connected.Initializing...');
    setTimeout(function () {
        body.style.backgroundColor = colors[0]
    }, 400);
    setTimeout(function () {
        body.style.backgroundColor = colors[1]
    }, 800);
    setTimeout(function () {
        body.style.backgroundColor = colors[2]
    }, 1200);
    setTimeout(function () {
        body.style.backgroundColor = colors[3]
    }, 1600);
    setTimeout(function () {
        body.style.backgroundColor = colors[4]
    }, 2000);
    setTimeout(function () {
        initMap();
        createGamepad();
    }, 2000);

}

