import {normal_random} from './utils';
import * as config from './config';
import SetPiece from './setpiece';

export default class Ground extends SetPiece {

	constructor(x, y, z, sprites){
		super(x, y, z)
		this.segments = [];
		this.type = 'ground';

		let segment = {
			x: 0,
			y: this.y,
			cp1x: 0,
			cp1y: this.y,
			cp2x: config.WIDTH * 0.5,
			cp2y: this.y,
			endx: config.WIDTH,
			endy: this.y
		};
		this.segments.push(segment);
		this.generate();
	}

	generate(){
		let last = this.segments[this.segments.length-1];
		while (this.segments.length < 3){
			let x = last.endx;
			let y = last.endy;
			let cp1x = x + (x - last.cp2x);
			let cp1y = y + (y - last.cp2y);
			let endx = x + config.WIDTH;
			let endy = y + this.y * normal_random();

			let variance = (config.WIDTH / 5) + (config.WIDTH / 3) * normal_random();
			let cp2x = endx - variance;
			let cp2y = endy - variance * normal_random();

			let segment = {
				x: x,
				y: y,
				cp1x: cp1x,
				cp1y: cp1y,
				cp2x: cp2x,
				cp2y: cp2y,
				endx: endx,
				endy: endy
			};
			this.segments.push(segment);
			last = segment;
		}
	}

	garbageCollection(){
		for(let i=0; i<this.segments.length; ++i){
			let segment = this.segments[i];
			if (segment.endx < 0){
				this.segments.splice(i--,1);
				this.generate();
			}
		}
	}

	render(frameId, ctx){
		if (!this.segments.length) return;

		let i = 0;
		let s = this.segments[i];
		ctx.beginPath();
		ctx.moveTo(s.x, s.y);
		while (s){
			ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.endx, s.endy);
			s = this.segments[++i];
		}
		ctx.closePath();
		ctx.strokeStyle = '#e2252c';
		ctx.fillStyle = '#2c6ba1';
		ctx.stroke();
		ctx.fill();


// context.beginPath();
// context.moveTo(284 + xoff, 119 + yoff);
// context.bezierCurveTo(46 + xoff, 189 + yoff, 39 + xoff, 60 + yoff, 243 + xoff, 29 + yoff);
// context.bezierCurveTo(46 + xoff, 189 + yoff, 39 + xoff, 60 + yoff, 284 + xoff, 119 + yoff);
// context.closePath();
// context.strokeStyle = "#e2252c"; // line color
// context.fillStyle = "#2C6BA1";
// context.stroke();
// context.fill();
	}

	update(dt){
		// Movement relative to the stage
		// Calculate the field of view of the plane based on its distance from the camera
		// And then we move it a fraction of the amount the player's plane moves
		super.update(dt);
		let dx = this.dx * dt;
		let dy = this.dy * dt;
		this.segments.forEach((segment) => {
			segment.x += dx;
			segment.y += dt;
			segment.cp1x += dx;
			segment.cp1y += dy;
			segment.cp2x += dx;
			segment.cp2y += dy;
			segment.endx += dx;
			segment.endy += dy;
		});
	}
}