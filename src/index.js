import Game from './game'
import assets from './assets'

let game = new Game(document.getElementById('canvas'), assets);
game.debug = true;
game.start();