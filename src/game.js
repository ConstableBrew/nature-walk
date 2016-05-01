import * as utils from './utils';
import Entity from './entity';

utils.init();

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

	player = {};
	entities = [];
	assets = {};

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
		this.player = new Entity('player', {x: WIDTH/2, y:HEIGHT/2});
		this.player.setAnimation(this.frameId|0, this.assets['DRUID_RUN'])
	}

	start() {
		// Begins the main game loop
		requestAnimationFrame(this.frame.bind(this), this.onScreen);
	}

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
		console.clear();
		while(this.dt > STEP) {
			console.log(this.dt, this.frameId);
			this.dt -= STEP;
			//this.update(STEP);
			this.frameId = (this.frameId + 1)|0;
		}
		this.tprev = this.t;
		this.render();
		
		if (this.paused) return;
		requestAnimationFrame(this.frame.bind(this), this.onScreen);
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

		this.renderPlayer();

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

	renderPlayer(){
		this.renderCreature(this.player);
	}

	renderCreature(entity) {
		let kf = entity.getKeyFrame(this.frameId);
		
		this.offScreenCtx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, entity.x, entity.y, kf.sw, kf.sh);
		
	}

}

export default Game;