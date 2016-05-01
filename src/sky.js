import Entity from './entity';
import Sprite from './sprite';


// TODO: Move these to some config file
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size

export default class Sky extends Entity {

	constructor(sprite){
		super('sky', {sprite: sprite})
		this.w = WIDTH;
		this.h = HEIGHT;
	}

	render(frameId, ctx){
		let kf = this.getKeyFrame(frameId);
		if (!kf || !kf.image) return;
		ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, this.w, this.h);
	}
	
	update(dt, sceneDx, sceneDy){
		// nop
	}
}