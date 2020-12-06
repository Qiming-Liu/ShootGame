function initMap() {
    $('.start').remove();
    let map = {width: 15, height: 30}
    let htmlStr = "";
    for (let i = 0; i < map.height; i++) {
        htmlStr += "<tr>";
        for (let j = 0; j < map.width; j++) {
            htmlStr += "<td class='void' id='x" + j + "y" + i + "'></td>";
        }
        htmlStr += "</tr>";
    }
    $('.xy').html(htmlStr);
}

function shake(time) {
    $('.ui').css('animation', 'shake ' + time + 's');
    setTimeout(function () {
        $('.ui').css('animation', '');
    }, time * 1000);
}