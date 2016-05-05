// TODO: Move these to some config file, and camera stuff to a camera object
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size
const HORIZON = HEIGHT / 2; // Apparent position of the horizon on the screen
const CAMERA_DISTANCE = 100; // Distance in feet that the camera is away form the plane of the player
const CAMERA_ANGLE_DEG = 90;
const FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player

export default class SetPiece {
	
	// All set pieces move together in response to the player's movement
	static stageDx = 0;
	static stageDy = 0;

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
		let zFactor = this.z / FIELD_OF_VIEW;
		let dx = SetPiece.stageDx * zFactor;
		let dy = SetPiece.stageDy * zFactor;
		this.x += dx * dt;
		this.y += dy * dt;
	}
}