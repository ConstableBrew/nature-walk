import Scenery from './scenery';


// TODO: Move these to some config file
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size

export default class Sky extends Scenery {

	constructor(sprite){
		super(0, 0, 0, WIDTH, HEIGHT, sprite, 0)
		this.type = 'sky';
	}

	render(frameId, ctx){
		let kf = this.getKeyFrame(frameId);
		if (!kf || !kf.image) return;
		ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, this.w, this.h);
	}
	
	update(){
		// nop
	}

}