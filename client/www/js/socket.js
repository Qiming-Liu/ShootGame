var socketIo;

function connect(url) {
    socketIo = io.connect(url, {reconnection: false});

    let connect$ = fromEvent(socketIo, 'connect');
    connect$.subscribe(() => {
        let data$ = fromEvent(socketIo, 'data');
        data$.subscribe((data) => {

            updateMap(data.data);
        });

        let shake$ = fromEvent(socketIo, 'shake');
        shake$.subscribe((time) => {
            shake(time);
        });

        gameStart();
    });

    let disconnect$ = fromEvent(socketIo, 'disconnect');
    disconnect$.subscribe(() => {
        window.location.reload();
    });

    let error$ = fromEvent(socketIo, 'connect_error');
    error$.subscribe((error) => {
        console.log(error);
        reSureUrl(url);
    });
}

function updateMap(mapData) {
    for (let i = 0; i < mapData.length; i++) {//x
        for (let j = 0; j < mapData[i].length; j++) {//y
            let position = '#x' + mapData[i][j].position.x + 'y' + mapData[i][j].position.y;
            let Class = '';
            if (mapData[i][j].player.id == socketIo.id) {
                if (mapData[i][j].player.isBoss) {
                    Class += 'selfBoss'
                } else {
                    Class += 'self'
                }
            } else {
                Class += mapData[i][j].color;
            }

            if (mapData[i][j].player.isBoss) {
                Class += ' ' + mapData[i][j].player.direction;
            }

            $(position).attr('class', Class);
        }
    }
}

function action(a) {
    socketIo.emit('data', {action: a});
}

