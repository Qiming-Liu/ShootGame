var map = require('./map');
var app = require('./app');
var setting = require('./setting');
var player = require('./player');

var bulletList = [];

exports.create = function (point, direction) {
    if (direction == '') return;
    let bullet = {
        position: {
            x: 0,
            y: 0
        },
        direction: direction
    };
    switch (direction) {
        case 'up': {
            bullet.position = {
                x: point.x,
                y: point.y - 1
            }
            break;
        }
        case 'down': {
            bullet.position = {
                x: point.x,
                y: point.y + 1
            }
            break;
        }
        case 'left': {
            bullet.position = {
                x: point.x - 1,
                y: point.y
            }
            break;
        }
        case 'right': {
            bullet.position = {
                x: point.x + 1,
                y: point.y
            }
            break;
        }
    }
    //bullet not out of map
    if (bullet.position.x >= 0 && bullet.position.y >= 0 && bullet.position.x < setting.map.width && bullet.position.y < setting.map.height) {
        map.getData()[bullet.position.x][bullet.position.y].bullet = bullet;
        bulletList.push(bullet);
    }
}

exports.tick = function () {
    for (let i = 0; i < bulletList.length; i++) {
        go(i);
    }
}

exports.cleanBullet = function () {
    bulletList.splice(0, bulletList.length);
}

function go(index) {
    let next = bulletList[index].position;
    switch (bulletList[index].direction) {
        case 'up': {
            next = {
                x: next.x,
                y: next.y - 1
            }
            break;
        }
        case 'down': {
            next = {
                x: next.x,
                y: next.y + 1
            }
            break;
        }
        case 'left': {
            next = {
                x: next.x - 1,
                y: next.y
            }
            break;
        }
        case 'right': {
            next = {
                x: next.x + 1,
                y: next.y
            }
            break;
        }
    }

    map.getData()[bulletList[index].position.x][bulletList[index].position.y].bullet = {};
    if(map.getData()[bulletList[index].position.x][bulletList[index].position.y].color != 'boss'){
        map.getData()[bulletList[index].position.x][bulletList[index].position.y].color = 'disable';
    }

    if (next.x >= 0 && next.y >= 0 && next.x < setting.map.width && next.y < setting.map.height) {//bullet not out of map

        bulletList[index].position = next;
        map.getData()[bulletList[index].position.x][bulletList[index].position.y].bullet = bulletList[index];//update map
        switch (map.getData()[bulletList[index].position.x][bulletList[index].position.y].color) {
            case 'void': {
                map.getData()[bulletList[index].position.x][bulletList[index].position.y].color = 'bullet';
                break;
            }
            case 'disable': {
                map.getData()[bulletList[index].position.x][bulletList[index].position.y].color = 'bullet';
                break;
            }
            case 'bullet': {
                break;
            }
            case 'bomb': {
                map.getData()[bulletList[index].position.x][bulletList[index].position.y].pu.trigger(bulletList[index].position, true);
                break;
            }
            case 'catalyst': {
                map.getData()[bulletList[index].position.x][bulletList[index].position.y].pu.trigger(player.getBoss());
                break;
            }
            case 'mate': {
                let newBoss = map.getData()[bulletList[index].position.x][bulletList[index].position.y].player;
                player.newBoss(newBoss);
                break;
            }
            case 'boss': {
                break;
            }
            default: {
                console.log('Unhandle bullet: ' + map.getData()[bulletList[index].position.x][bulletList[index].position.y].color);
                break;
            }
        }
    } else {//Out of map, remove bullet
        map.getData()[bulletList[index].position.x][bulletList[index].position.y].bullet = {};
        map.getData()[bulletList[index].position.x][bulletList[index].position.y].color = 'disable';
        bulletList.splice(index, 1);
        app.shake(0.2);
    }
}