import * as config from './config';
import {easeInOutQuadTween} from './utils';
import Scenery from './scenery';


export default class Player extends Scenery {
	constructor(x, y, z, width, height, sprite, frameId){
		super(x, y, z, width, height, sprite, frameId);
		this.type = 'player';
		this.elapsedTime = 0;
	}

	update(dt){
		this.elapsedTime += dt;
		let t = this.elapsedTime;// t: current time
		let b = 0;// b: start value
		let c = config.RUN_MAX_SPEED;// c: change in value
		let d = config.RUN_TIME_TO_MAX_SPEED;// d: duraiton
		let ddx = easeInOutQuadTween(t, b, c, d); // The rate that player is moving forward
		let ddy = config.GRAVITY;
		console.log('ddx:', ddx, 'ddy:', ddy);
		this.stageDx += dt * ddx;
		this.stageDy += dt * ddy;
	}
}