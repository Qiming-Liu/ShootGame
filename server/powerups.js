var map = require('./map');
var bullet = require('./bullet');
var player = require('./player');

var exist = false;

exports.has = function () {
 return exist;
}
exports.noExist = function () {
    exist = false;
}
const bomb = {
    name: 'bomb',
    trigger: (position, isBoss) => {
        if (isBoss) {
            bullet.create(position, 'up');
            bullet.create(position, 'down');
            bullet.create(position, 'left');
            bullet.create(position, 'right');
        } else {
            map.cleanMap();
        }
        exist = false;
    }
}

const catalyst = {
    name: 'catalyst',
    trigger: (p) => {
        if (p.isBoss) {
            //copy object
            let pl = [];
            for (let i = 0; i < player.playerList.length; i++) {
                pl[i] = player.playerList[i];
            }
            //except boss
            for (let i = 0; i < pl.length; i++) {
                if (pl[i].isBoss) {
                    pl.splice(i, 1);
                }
            }
            //random one be the boss
            let newBoss = pl[randomNum(0, pl.length - 1)];
            player.newBoss(newBoss);
        } else {
            player.newBoss(p);
        }
        exist = false;
    }
}

exports.create = function () {
    let puList = [bomb, catalyst];

    let pu = puList[randomNum(0, puList.length - 1)];
    let arr2 = map.getVoidMap();
    //2D array to 1D array
    let arr1 = [].concat.apply([], arr2);

    let point = {};
    try {
        point = arr1[randomNum(0, arr1.length - 1)].position;
    } catch (e) {
        console.log();
    }
    map.getData()[point.x][point.y].pu = pu;
    map.getData()[point.x][point.y].color = pu.name;
    exist = true;
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}