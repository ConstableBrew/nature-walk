// TODO: Move these to some config file, and camera stuff to a camera object
import * as config from './config';

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
		// Calculate the field of view of the plane based on its distance from the camera
		// And then we move it a fraction of the amount the player's plane moves
		let zFieldOfView = (2 * Math.sin(config.CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * this.z / Math.sin((180 - 90 - config.CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)));
		let zFactor = config.FIELD_OF_VIEW / zFieldOfView;
		this.dx = this.stageDx * zFactor;
		this.dy = this.stageDy * zFactor;
		this.x += this.dx * dt;
		this.y += this.dy * dt;
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