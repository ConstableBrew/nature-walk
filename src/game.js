import * as utils from './utils';
import * as config from './config';
import Player from './player';
import Ground from './ground';
import Terrain from './terrain';
import Sky from './sky';

utils.init();

// TODO: Move these to some config file


class Game {
	gameReady = false;
	paused = false;
	debug  = false;

	onScreen  = null;
	offScreen = null;
	onScreenCtx  = null;
	offScreenCtx = null;

	renderingLayers = [];
	player = {};
	assets = {};


	// ========================================================================
	// Main Game Loop
	// ========================================================================
	
	frameId = 0;
	tprev = window.performance.now();
	t = this.tprev;
	dt = 0;

	frame() {
		let step = config.step;
		this.t = window.performance.now();
		this.dt += Math.min(1, (this.t - this.tprev) / 1000);
		while(this.dt > step) {
			this.frameId = (this.frameId + 1)|0;
			this.dt -= step;
			this.update(step);
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

		this.offScreen.width  = config.WIDTH;
		this.offScreen.height = config.HEIGHT;
		this.offScreenCtx     = this.offScreen.getContext('2d');
		this.offScreenCtx.imageSmoothingEnabled = false;

		this.onScreen.width  = window.innerWidth;
		this.onScreen.height = Math.min(window.innerHeight, config.RATIO * window.innerWidth);
		this.onScreenCtx     = this.onScreen.getContext('2d');
		this.onScreenCtx.imageSmoothingEnabled  = false;

		this.assets = assets;
		this.player = new Player(
			config.BASE_MARGIN,
			config.BASE_LINE,
			config.CAMERA_DISTANCE,
			null,
			null,
			this.assets['DRUID_RUN'],
			this.frameId
		);

		this.renderingLayers.push(new Sky(this.assets['BG_SKY']));
		this.renderingLayers.push(new Terrain(0, 0, 0, [this.assets['BG_MOUNTAIN']]));
		this.renderingLayers.push(new Terrain(0, 0, 0, [this.assets['BG_HILL']]));
		this.renderingLayers.push(this.player);
		this.renderingLayers.push(new Ground());
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
		// Update the player first, then move the player back to the static position. Use the delta of the player to adjust the other layers
		let x = this.player.x;
		let y = this.player.y;

		this.player.update(dt);

		SetPiece.stageDx = x - this.player.x;
		SetPiece.stageDy = y - this.player.y;

		this.player.x = x;
		this.player.y = y;


		this.renderingLayers.forEach((layer) => {
			if (layer.type !== 'player')
				layer.update(dt)
		});
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
		// Match the width of the screen and then
		// Center the scaled image vertically on the screen
		let w = cvs.width;
		let h = cvs.height;
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
		this.renderingLayers.forEach((layer) => layer.render(this.frameId, this.offScreenCtx));
	}


}

export default Game;