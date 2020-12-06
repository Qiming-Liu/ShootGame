var http = require('http').createServer();
var socketIo = require('socket.io')(http);

var player = require('./player');
var setting = require('./setting');
var gameMap = require('./map');
var bullet = require('./bullet');
var powerUps = require('./powerups');

const {fromEvent, interval} = require('rxjs');
const {map, filter} = require('rxjs/operators');

let connection$ = fromEvent(socketIo, 'connection');
connection$.subscribe((socket) => {
    console.log('connected:' + socket.id);
    player.create(socket.id);

    emit(gameMap.getData());//new player

    let data$ = fromEvent(socket, 'data');
    let action$ = data$.pipe(map(val => val.action));
    action$ = action$.pipe(filter(action => (action.action !== undefined)));

    action$.subscribe((res) => {
        if (res.action === 'shoot') {
            if (res.type === 'touchstart' || res.type === 'mousedown') {
                player.setShoot(socket.id, true);
            } else {
                player.setShoot(socket.id, false);
            }
        } else {//move
            //if mover is boss
            if (player.bossGo(socket.id)) {
                emit(gameMap.getData());//boss
            }
            if (res.type === 'touchstart' || res.type === 'mousedown') {
                player.setMove(socket.id, res.action);
            } else {
                player.setMove(socket.id, '');
            }
        }
    });

    let disconnect$ = fromEvent(socket, 'disconnect');
    disconnect$.subscribe(() => {
        console.log('disconnected:' + socket.id);
        player.remove(socket.id);

        emit(gameMap.getData());//dis player
    });
});

function emit(data) {
    socketIo.emit('data', {data: data});
}

exports.shake = function (time) {
    socketIo.emit('shake', time);
}

//tick
const source = interval(setting.tick);
source.subscribe((tick) => {
    bullet.tick();
    if (tick % 3 === 0) {
        player.tick();
        if (!powerUps.has()) {
            powerUps.create();
        }
    }

    emit(gameMap.getData());
});

http.listen(setting.port);



