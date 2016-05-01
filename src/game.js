import * as utils from './utils';
import Player from './player';
import Terrain from './terrain';

utils.init();

// TODO: Move these to some config file
const FPS  = 24;
const STEP = 1/FPS;
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size
const RATIO  = HEIGHT / WIDTH;

class Game {
	gameReady = false;
	paused = false;
	debug  = false;

	onScreen  = null;
	offScreen = null;
	onScreenCtx  = null;
	offScreenCtx = null;

	layers = [];
	player = {};
	assets = {};


	// ========================================================================
	// Main Game Loop
	// ========================================================================
	
	frameId = 0|0;
	tprev = window.performance.now();
	t = this.tprev;
	dt = 0;

	frame() {
		this.t = window.performance.now();
		this.dt += Math.min(1, (this.t - this.tprev) / 1000);
		while(this.dt > STEP) {
			this.frameId = (this.frameId + 1)|0;
			this.dt -= STEP;
			this.update(STEP);
		}
		this.tprev = this.t;
		this.render();
		
		if (this.paused) return;
		requestAnimationFrame(this.frame.bind(this), this.onScreen);
	}


	// ========================================================================
	// Setup
	// ========================================================================

	constructor(canvas, assets){
		this.onScreen  = canvas;
		this.offScreen = document.createElement('canvas');

		this.offScreen.width  = WIDTH;
		this.offScreen.height = HEIGHT;
		this.offScreenCtx     = this.offScreen.getContext('2d');
		this.offScreenCtx.imageSmoothingEnabled = false;

		this.onScreen.width  = window.innerWidth;
		this.onScreen.height = Math.min(window.innerHeight, RATIO * window.innerWidth);
		this.onScreenCtx     = this.onScreen.getContext('2d');
		this.onScreenCtx.imageSmoothingEnabled  = false;

		this.assets = assets;
		this.player = new Player({x: WIDTH/2, y:HEIGHT/2});
		this.player.setAnimation(this.frameId|0, this.assets['DRUID_RUN'])
		
		this.layers.push(new Terrain(0.1, [this.assets['BG_MOUNTAIN']]));
		this.layers.push(this.player);
	}

	start() {
		// Begins the main game loop
		this.frameId = 0;
		requestAnimationFrame(this.frame.bind(this), this.onScreen);
	}





	// ========================================================================
	// Update
	// ========================================================================

	update(dt) {
		let dx = -Math.log(this.frameId) * 7; // The rate that things are scrolling left
		let dy = 0;
		this.layers.forEach((layer) => layer.update(dt, dx, dy));
	}


	// ========================================================================
	// Render
	// ========================================================================

	render() {
		let cvs = this.offScreen;
		let ctx = this.offScreenCtx;

		let scale = Math.max(
			this.onScreen.height/cvs.height,
			this.onScreen.width/cvs.width
		);
		let w = cvs.width * scale;
		let h = cvs.height * scale;
		let x = 0;
		let y = (this.offScreen.height - h) / 2;

		ctx.clearRect(0, 0, cvs.width, cvs.height);

		this.renderLayers();


		if (this.debug) {
			ctx.fillStyle = 'rgba(0,0,0,0.75)';
			ctx.fillRect(0, 0, 300, cvs.height);
			ctx.fillStyle = 'gold';
			let fontSize = 32;
			let lineHeight = fontSize * 1.33;
			let linePos = y;
			ctx.font = fontSize + 'px sans-serif';
			ctx.fillText('frameId: ' + this.frameId, 0, linePos += lineHeight);
		}

		this.onScreenCtx.clearRect(0, 0, this.onScreen.width, this.onScreen.height);;
		this.onScreenCtx.drawImage(
			cvs,
			x, y, w, h,
			0, 0, this.onScreen.width, this.onScreen.height
		);
	}

	renderLayers(){
		this.layers.forEach((layer) => layer.render(this.frameId, this.offScreenCtx));
	}


}

export default Game;