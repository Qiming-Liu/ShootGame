const {of, merge, fromEvent} = rxjs;
const {map, filter} = rxjs.operators;

var startLabel = $('.start');
var mouseup$ = fromEvent(document, 'mouseup');
var mousedown$ = fromEvent(document, 'mousedown');
var touchstart$ = fromEvent(document, 'touchstart');
var touchend$ = fromEvent(document, 'touchend');
var input$ = merge(mouseup$, mousedown$, touchstart$, touchend$);

var aLabel$ = mouseup$.pipe(map(x => x.target));
aLabel$.subscribe((x) => {
    switch (x) {
        case $('a.s1')[0]: {
            enSureUrl('http://localhost:3000/');
            console.log('localhost')
            break;
        }
        case $('a.s2')[0]: {
            enSureUrl('http://10.0.2.2:3000/');
            console.log('android')
            break;
        }
        case $('a.s3')[0]: {
            enSureUrl('http://13.58.163.143:3000/');
            console.log('cloud')
            break;
        }
        case $('a.s4')[0]: {
            enSureUrl('');
            console.log('custom')
            break;
        }
        case $('a.enter')[0]: {
            $('a.back').remove();
            $('input')[0].disabled = 'disabled';
            $('a.enter').text('Connecting...');

            console.log('Connecting to ' + $('input')[0].value)
            connect($('input')[0].value);
            break;
        }
        case $('a.back')[0]: {
            startLabel.html('<b class="s0">Please Choose Server</b>\n' +
                '        <a class="s1">Localhost</a>\n' +
                '        <a class="s2">Android</a>\n' +
                '        <a class="s3">Cloud</a>\n' +
                '        <a class="s4">Custom</a>');
            break;
        }
        case $('a.musicOff')[0]: {
            playMusic();
            break;
        }
    }
});

function enSureUrl(url) {
    startLabel.html('<b class="s0">Server Url:</b><input type="text" value="' + url + '"><a class="enter">Enter</a><a class="back">back</a><a class="' + getMusicState() + '">BGM (Unstoppable)</a>');
}

function reSureUrl(url) {
    startLabel.html('<b class="s0">Connect error:</b><input type="text" value="' + url + '"><a class="enter">Enter</a><a class="back">back</a><a class="' + getMusicState() + '">BGM (Unstoppable)</a>');
}

function getMusicState() {
    return playing ? 'musicOn' : 'musicOff';
}

$('body').attr('oncontextmenu', 'self.event.returnValue=false');