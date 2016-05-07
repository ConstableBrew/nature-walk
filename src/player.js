import * as config from './config';
import {easeOutQuadTween} from './utils';
import Scenery from './scenery';


export default class Player extends Scenery {
	constructor(x, y, z, width, height, sprite, frameId){
		super(x, y, z, width, height, sprite, frameId);
		this.type = 'player';
		this.elapsedTime = 0;
	}

	update(dt){
		this.elapsedTime += dt;
		let t, b, c, d, dx, ddy;
		
		if (this.elapsedTime >= config.RUN_TIME_TO_MAX_SPEED) {
			// No change to stageDx
		} else {
			// Ramping up speed
			t = this.elapsedTime;// t: current time
			b = 0;// b: start value
			c = config.RUN_MAX_SPEED;// c: change in value
			d = config.RUN_TIME_TO_MAX_SPEED;// d: duraiton
			dx = easeOutQuadTween(t, b, c, d); // The rate that player is moving forward
			this.stageDx = dx;
		}
		
		ddy = config.GRAVITY;
		this.stageDy += dt * ddy;
	}
}