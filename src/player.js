import Scenery from './entity';

export default class Player extends Scenery {
	constructor(x, y, z, width, height, sprite, frameId){
		super(x, y, z, width, height, sprite, frameId);
		this.type = 'player';
	}

	update(dt){
		let ddx = dt * Math.log(this.frameId) * 100; // The rate that player is moving forward
		let ddy = config.GRAVITY;
		this.dx += dt * this.ddx;
		this.dy += dt * this.ddy;
		this.x  += dt * this.dx;
		this.y  += dt * this.dy;
	}
}