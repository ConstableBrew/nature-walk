import Sprite from './sprite';

export default class Entity {
	x = 0;
	y = 0;
	dx = 0;
	dy = 0;
	w = 0;
	h = 0;
	sprite = null;
	animationFrameId = 0;

	constructor(type, config){
		config = config || {};
		this.type = type + '';
		this.x = config.x|0;
		this.y = config.y|0;
		this.dx = config.dx|0;
		this.dy = config.dy|0;
		this.sprite = config.sprite || {};
		this.w = this.sprite.sw|0;
		this.h = this.sprite.sh|0;
		this.animationFrameId = 0;
	}

	setAnimation(frameId, sprite){
		this.sprite = sprite || {};
		this.animationFrameId = frameId|0;
	}

	getKeyFrame(frameId){
		if (!this.sprite || !this.sprite.getKeyFrame) return {};

		return this.sprite.getKeyFrame(frameId - this.animationFrameId);
	}

	render(frameId, ctx){
		let kf = this.getKeyFrame(frameId);
		if (!kf || !kf.image) return;
		ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, kf.sw, kf.sh);
	}

	update(dt, dx, dy){
		this.dx += dt * dx;
		this.dy += dt * dy;
		this.x  += dt * this.dx;
		this.y  += dt * this.dy;
	}

}