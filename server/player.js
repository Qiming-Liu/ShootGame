var map = require('./map');
var setting = require('./setting');
var bullet = require('./bullet');
var app = require('./app');

var players = [];

exports.list = function () {
    return players;
}

exports.create = function (id) {
    let createPlayer = {}
    //if the newPlayer is the only Player in the map, he is the Boss
    if (players.length == 0) {
        createPlayer = {
            id: id,
            position: {
                x: 0,
                y: 0
            },
            isBoss: true,
            direction: 'down', //only work for boss
            moving: '',
            shooting: false
        }
    } else {//random position & not the Boss
        let arr2 = map.getVoidMap();
        //2D array to 1D array
        let arr1 = [].concat.apply([], arr2);

        let point = {};
        try {
            point = arr1[randomNum(0, arr1.length - 1)].position;
        } catch (e) {
            console.log();
        }

        createPlayer = {
            id: id,
            position: point,
            isBoss: false,
            direction: 'down', //only for boss
            moving: '',
            shooting: false
        }
    }

    players.push(createPlayer);
    map.signIn(createPlayer);
}

exports.remove = function (id) {
    let removePlayer = {};
    let index = getIndexId(id);
    //delete player

    removePlayer = players[index];
    players.splice(index, 1);

    map.signOut(removePlayer);

    if (!haveBossHere()) {
        if (players.length != 0) {
            //random one be the boss
            let newBoss = players[randomNum(0, players.length - 1)];
            this.newBoss(newBoss);
        }
    }
}

exports.bossGo = function (id) {
    let index = getIndexId(id);
    if (players[index].isBoss) {
        //only boss need this to define the direction of bullet
        players[index].direction = players[index].moving;
        map.getData()[players[index].position.x][players[index].position.y].player = players[index];
        return true;
    }
    return false;
}

exports.setMove = function (id, state) {
    let index = getIndexId(id);

    players[index].moving = state;
    if(state == ''){
        players[index].moving = false;
    }
}

exports.setShoot = function (id, state) {
    let index = getIndexId(id);

    players[index].shooting = state;
    if(state == false){
        players[index].moving = '';
    }
}

exports.tick = function () {
    for (let i = 0; i < players.length; i++) {
        //check player move
        if (players[i].moving != '') {
            go(i);
        }
        //check boss shoot
        if (players[i].isBoss && players[i].shooting) {
            shoot(i);
        }
    }
}

exports.getBoss = function () {
    for (let i = 0; i < players.length; i++) {
        if (players[i].isBoss == true) {
            return players[i];
        }
    }
}

exports.cleanBoss = function () {
    for (let i = 0; i < players.length; i++) {
        if (players[i].isBoss == true) {
            players[i].isBoss = false;
            map.getData()[players[i].position.x][players[i].position.y].color = 'mate';
        }
    }
}

exports.newBoss = function (newBoss) {
    this.cleanBoss();
    try {
        newBoss.isBoss = true;
    } catch (e) {
        console.log();
    }
    map.cleanMap();
    bullet.cleanBullet();

    map.signOut(newBoss);
    map.signIn(newBoss);

    map.getData()[newBoss.position.x][newBoss.position.y].color = 'boss';
    app.shake(1);
}

function go(index) {
    let destination = {}

    switch (players[index].moving) {
        case 'up': {
            destination = {
                x: players[index].position.x,
                y: players[index].position.y - 1
            }
            break;
        }
        case 'down': {
            destination = {
                x: players[index].position.x,
                y: players[index].position.y + 1
            }
            break;
        }
        case 'left': {
            destination = {
                x: players[index].position.x - 1,
                y: players[index].position.y
            }
            break;
        }
        case 'right': {
            destination = {
                x: players[index].position.x + 1,
                y: players[index].position.y
            }
            break;
        }
    }
    //not edge
    if (destination.x >= 0 && destination.y >= 0 && destination.x < setting.map.width && destination.y < setting.map.height) {
        //color ok
        if (players[index].isBoss) {//Boss only access disable
            switch (map.getData()[destination.x][destination.y].color) {
                case 'disable': {// if destination is disable
                    //signOut: remove player from map
                    map.getData()[players[index].position.x][players[index].position.y].player = {};
                    map.getData()[players[index].position.x][players[index].position.y].color = 'disable';

                    //update player.position
                    players[index].position = destination;

                    //signIn: add back player to the destination
                    map.getData()[destination.x][destination.y].player = players[index];
                    map.getData()[destination.x][destination.y].color = 'boss';
                    break;
                }
            }
        } else {//Mate only access white
            switch (map.getData()[destination.x][destination.y].color) {
                case 'void': {// if destination is disable
                    //signOut
                    map.getData()[players[index].position.x][players[index].position.y].player = {};
                    map.getData()[players[index].position.x][players[index].position.y].color = 'void';

                    //update player
                    players[index].position = destination;

                    //signIn
                    map.getData()[destination.x][destination.y].player = players[index];
                    map.getData()[destination.x][destination.y].color = 'mate';
                    break;
                }
                case 'bomb': {
                    map.getData()[destination.x][destination.y].pu.trigger(destination, false);
                    app.shake(0.2);
                    break;
                }
                case 'catalyst': {
                    let boss;
                    for (let i = 0; i < players.length; i++) {
                        if (players[i].isBoss == true) {
                            boss = players[i];
                        }
                    }
                    map.getData()[destination.x][destination.y].pu.trigger(boss);
                    break;
                }
            }
        }
    }
}

function shoot(index) {
    bullet.create(players[index].position, players[index].direction);
}

function getIndexId(id) {
    for (let i = 0; i < players.length; i++) {
        if (id == players[i].id) {
            return i;
        }
    }
}

function haveBossHere() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].isBoss) {
            return true;
        }
    }
    return false;
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

module.exports.playerList = players;