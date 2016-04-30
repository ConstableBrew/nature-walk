import Sprite from './sprite';

export default class Entity {
	x = 0;
	y = 0;
	dx = 0;
	dy = 0;
	sprite = null;
	animationFrameId = 0;

	constructor(type, config){
		config = config || {};
		this.type = type + '';
		this.x = config.x|0;
		this.y = config.y|0;
		this.dx = config.dx|0;
		this.dy = config.dy|0;
		this.sprite = config.sprite;
		this.animationFrameId = 0;
	}

	setAnimation(frameId, sprite){
		this.sprite = sprite || {};
		this.animationFrameId = frameId|0;
	}

	getKeyFrame(frameId){
		if (!this.sprite && this.sprite.getKeyFrame) return {};

		return this.sprite.getKeyFrame(frameId - this.animationFrameId);
	}


}