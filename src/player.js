import Entity from './entity';

export default class Player extends Entity {
	constructor(config){
		let type = 'player';
		super(type, config);
	}

	update(dt, ddx, ddy){
		this.ddx = dt * ddx;
		this.ddy = dt * ddy;
		this.dx += dt * this.ddx;
		this.dy += dt * this.ddy;
		this.x  += dt * this.dx;
		this.y  += dt * this.dy;
		console.log(this.dx, this.dy, this.x, this.y)
	}
}