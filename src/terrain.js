import {normal_random} from './utils';
import * as config from './config';
import Scenery from './scenery';
import SetPiece, {stageDx, stageDy} from './setpiece';


// TODO: Move these to some config file

export default class Terrain extends SetPiece{


	constructor(x, y, z, sprites){
		super(x, y, z)
		this.scenery = [];
		this.sprites = sprites || [];
		this.type = 'terrain';
		this.generate(-config.WIDTH);
	}

	createScenery(xoffset){
		let sprite = this.sprites[(Math.random() * this.sprites.length)|0];
		let x = xoffset + sprite.sw * 0.75 + sprite.sw / 2 * normal_random();
		let y = this.y;
		let z = this.z;
		let w = sprite.sw;
		let h = sprite.sh;
		let frameId = 0;

		let scenery = new Scenery(x, y, z, w, h, sprite, frameId)
		this.scenery.push(scenery);
		return x + sprite.sw; // Return the amount of offset		
	}

	generate(xoffset){
		// Add more scenery until we are beyond the edge of the screen + distance scene dx
		if (!this.sprites.length) return;

		if (!xoffset)
			xoffset = this.scenery.reduce((x, s) => Math.max(x, s.x + s.w), 0);
		while(xoffset < config.WIDTH * 2 + this.stageDx){
			xoffset = this.createScenery(xoffset);
		}
	}

	garbageCollection(){
		let xoffset = 0;
		for(let i=0; i<this.scenery.length; ++i){
			let scenery = this.scenery[i];
			let x = scenery.x + scenery.w;
			if (x < 0){
				this.scenery.splice(i--,1);
				console.log('collecting garbage');
			}
			xoffset = Math.max(xoffset, x);
		}
		this.generate(xoffset);
	}

	render(frameId, ctx){
		this.scenery.forEach((scenery) => scenery.render(frameId, ctx));
	}

	update(dt){
		//super.update(dt);
		this.scenery.forEach((scenery) => scenery.update(dt))
		this.garbageCollection();
	}
}