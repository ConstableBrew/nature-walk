export default class Sprite {
	keyFrames = [];

	constructor (image, sx, sy, sw, sh, numKeyFrames) {
		this.image = image;
		this.sx = sx|0;
		this.sy = sy|0;
		this.sw = sw|0;
		this.sh = sh|0;
		this.numKeyFrames = Math.max(numKeyFrames|0, 1);

		for(let i=0; i<this.numKeyFrames; ++i){
			let keyFrame = {
				image: this.image,
				sx: this.sx + this.sw * i,
				sy: this.sy,
				sw: this.sw,
				sh: this.sh
			};
			this.keyFrames.push(keyFrame);
		}
	}

	getKeyFrame(frameId){
		frameId = frameId|0;
		return this.keyFrames[frameId % this.numKeyFrames];
	}
}
