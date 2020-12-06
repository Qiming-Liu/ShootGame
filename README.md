# Shoot Game
Based on:  
1. Cordova  
2. Socket.io  
3. Rxjs  
4. Node.js  
## Introduction  

![](https://github.com/Qiming-Liu/ShootGame/raw/main/res/intro.gif)   
  
A web game similar to INVERSUS.
The game only allow the boss player to shoot.
The bullet fired by the boss player will change the colour of the ground.

The game is playing on a 30x15 table, the class of the table records the point coordinates, and the top left
corner is x0y0.

Red: The boss player,
Blue: The local players,
Yellow: Other non-boss players.
Players cannot stand in the same position.

The boss player can only move on the grey grid.
Non-boss players can only move on the white grid.

At the beginning of the game, except for the position of the boss, all other positions are white grids.
The bullet fired by the boss is black, and the grid where the bullet passes will change to a grey grid.

Power-ups:
1. Bomb: Purple
    The Boss player bullet hit: Fire 4 bullets in 4 directions around the bomb.
    The Non-boss player touch: Clear all bullets and grey grids on the map.

2. Catalyst: Green
    The Boss player bullet hit: Randomly let another player become the new boss.
    The Non-boss player touch: Become the new boss.
    
## Installation  
Client:  
```   
cd Client  
npm install   
```  

Server:  
```  
cd Server  
npm install  
```  

## Start  
Please start the server first.  
```  
cd Server  
npm i -g pm2  
npm start   
```  
If you wanna stop the server.  
```  
//To stop the server  
npm stop 
```   
Then start the client.   
Now you can just directly open index.html in the /www directory.  
Or you want to run on the Android by cordova.  
```  
cd client  
cordova platform add android  
cordova run android  
```  


## Connection  
Local: http://localhost:3000/  
Android studio emulator: http://10.0.2.2:3000/ (android:usesCleartextTraffic="true")  
Cloud server: http://13.58.163.143:3000/ (This is my cloud server, disable for now)  
Custom: null (Enter your custom server url)  

