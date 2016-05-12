import Game from './game'
import assets from './assets'

let game = new Game(document.getElementById('canvas'), assets);


!function waitForContent(){
	// Wait for content to be retreived by the browser
	return new Promise(function (resolve, reject){
		// TODO...
	});
}()
.then(game.start);

//game.debug = true;
game.start();