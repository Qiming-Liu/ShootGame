var setting = require('./setting');
var powerUps = require('./powerups');

//create mapData
var map = [setting.map.width];
for (let i = 0; i < setting.map.width; i++) {
    map[i] = [setting.map.height];
    for (let j = 0; j < setting.map.height; j++) {
        map[i][j] = {
            player: {},
            bullet: {},
            pu: {},
            position: {
                x: i,
                y: j
            },
            color: 'void'
        };
    }
}
var voidMap = [setting.map.width];

exports.getData = function () {
    return map;
}

exports.getVoidMap = function () {
    voidMap = [];
    for (let i = 0; i < map.length; i++) {//x
        voidMap[i] = [];
        for (let j = 0; j < map[i].length; j++) {//y
            if (map[i][j].color == 'void') {
                voidMap[i].push(map[i][j]);
            }
        }
    }
    return voidMap;
}

exports.cleanMap = function () {//Non-player cleaner
    for (let i = 0; i < setting.map.width; i++) {
        for (let j = 0; j < setting.map.height; j++) {
            map[i][j].bullet = {};
            map[i][j].pu = {};
            powerUps.noExist();
            if (map[i][j].color == 'disable' || map[i][j].color == 'disable' || map[i][j].color == 'bomb' || map[i][j].color == 'catalyst' || map[i][j].color == 'bullet') {
                map[i][j].color = 'void';
            }
        }
    }
}

exports.signIn = function (player) {
    map[player.position.x][player.position.y].player = player;
    map[player.position.x][player.position.y].color = player.isBoss ? 'boss' : 'mate';
}

exports.signOut = function (player) {
    map[player.position.x][player.position.y].player = {};
    map[player.position.x][player.position.y].color = 'void';
}