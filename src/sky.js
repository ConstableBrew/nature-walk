import Scenery from './scenery';


// TODO: Move these to some config file
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size

export default class Sky extends Scenery {

	constructor(sprite){
		super(0, 0, 0, WIDTH, HEIGHT, sprite, 0)
		this.type = 'sky';
	}
	
	update(){
		// nop
	}
}