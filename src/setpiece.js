// TODO: Move these to some config file, and camera stuff to a camera object
import * as config from './config';

console.log('SetPiece');

export var stageDx = 0;
export var stageDy = 0;

export default class SetPiece {
	
	// All set pieces move together in response to the player's movement

	constructor(x, y, z){
		if (new.target === SetPiece) {
			throw new TypeError('Cannot create instances of abstract class SetPiece');
		} else if (typeof this.render !== 'function') {
			throw new TypeError('Must override render function');
		}

		this.x = x||0;
		this.y = y||0;
		this.z = z||0;
	}

	// render needs to be implemented by child classes

	update(dt){
		// Movement relative to the stage
		let zFactor = this.z / config.FIELD_OF_VIEW;
		let dx = this.stageDx * zFactor;
		let dy = this.stageDy * zFactor;
		this.x += dx * dt;
		this.y += dy * dt;
	}

	set stageDx (dx){
		stageDx = dx;
	}

	get stageDx (){
		return stageDx;
	}

	set stageDy (dy){
		stageDy = dy;
	}

	get stageDy (){
		return stageDy;
	}
}