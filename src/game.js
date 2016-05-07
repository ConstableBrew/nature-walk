import * as utils from './utils';
import * as config from './config';
import Player from './player';
import Ground from './ground';
import Terrain from './terrain';
import Sky from './sky';


class Game {
	gameReady = false;
	paused = false;
	debug  = false;

	onScreen  = null;
	offScreen = null;
	onScreenCtx  = null;
	offScreenCtx = null;

	renderingLayers = [];
	scenery = [];
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
		let step = config.STEP;
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
			config.HORIZON,
			config.CAMERA_DISTANCE,
			null,
			null,
			this.assets['DRUID_RUN'],
			this.frameId
		);

		let sky = new Sky(this.assets['BG_SKY']);
		let distantClouds = new Terrain(0, config.HORIZON / 2, 50 * 5280, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		let mountain = new Terrain(0, config.HORIZON, 30 * 5280, [this.assets['BG_MOUNTAIN']]);
		let clouds = new Terrain(0, config.HORIZON / 2, 20 * 5280, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		let hill1 = new Terrain(0, config.HORIZON, 1 * 5280, [this.assets['BG_HILL']]);
		let hill2 = new Terrain(0, config.HORIZON, config.CAMERA_DISTANCE, [this.assets['BG_HILL']]);
		let ground = new Ground();

		this.scenery.push(sky);
		this.scenery.push(distantClouds);
		this.scenery.push(mountain);
		this.scenery.push(clouds);
		this.scenery.push(hill1);
		this.scenery.push(hill2);
		this.scenery.push(ground);

		this.renderingLayers.push(sky);
		this.renderingLayers.push(distantClouds);
		this.renderingLayers.push(mountain);
		this.renderingLayers.push(clouds);
		this.renderingLayers.push(hill1);
		this.renderingLayers.push(hill2);
		this.renderingLayers.push(this.player);
		this.renderingLayers.push(ground);
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
		// The player's position doesn't move, instead the player changes the stageDx & stageDy,
		// which then is used to update all the scenery
		let x = this.player.x;
		let y = this.player.y;

		this.player.update(dt);
		this.scenery.forEach((scenery) => scenery.update(dt));
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