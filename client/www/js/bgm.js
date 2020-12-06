var playing = false;

function playMusic() {
    if (playing) return;
    new Howl({
        src: ['res/bgm.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    playing = true;
    $('a.musicOff').toggleClass('musicOn');
}