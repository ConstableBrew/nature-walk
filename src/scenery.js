import Sprite from './sprite';
import SetPiece from './setpiece';

export default class Scenery extends SetPiece {

	// Scenery are set pieces that have animated sprites

	constructor(x, y, z, width, height, sprite, frameId){
		super(x, y, z);

		this.sprite = sprite || {};
		this.w = width  || this.sprite.sw|0;
		this.h = height || this.sprite.sh|0;
		this.animationFrameId = frameId|0;
		this.type = 'scenery';
	}

	setAnimation(frameId, sprite){
		this.sprite = sprite || {};
		this.animationFrameId = frameId|0;
	}

	getKeyFrame(frameId){
		if (!this.sprite || !this.sprite.getKeyFrame) return;

		return this.sprite.getKeyFrame(frameId - this.animationFrameId);
	}

	render(frameId, ctx){
		let kf = this.getKeyFrame(frameId);
		if (!kf || !kf.image) return;
		ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y-this.h, this.w, this.h);
	}

}