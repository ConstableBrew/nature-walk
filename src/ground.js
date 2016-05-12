import {normal_random} from './utils';
import * as config from './config';
import SetPiece from './setpiece';

export default class Ground extends SetPiece {

	constructor(x, y, z){
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
			let endx = x + config.WIDTH * 2;
			let endy = y + config.HEIGHT * normal_random() / 3;

			let variance = (config.WIDTH * 0.25) + (config.WIDTH * 0.1) * normal_random();
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
		while (s){
			ctx.beginPath();
			ctx.moveTo(s.x, s.y);
			ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.endx, s.endy);
			ctx.lineTo(s.endx, s.endy + config.HEIGHT);
			ctx.lineTo(s.x, s.endy + config.HEIGHT);
			ctx.lineTo(s.x, s.y);
			ctx.closePath();
			ctx.strokeStyle = '#a38e75';
			let grd = ctx.createLinearGradient(s.x, s.y + config.HEIGHT, s.endx, s.endy + config.HEIGHT);
			grd.addColorStop(0.0, '#a38e75');
			grd.addColorStop(0.1, '#b8a48f');
			grd.addColorStop(0.2, '#a38e75');
			grd.addColorStop(0.3, '#b8a48f');
			grd.addColorStop(0.4, '#a38e75');
			grd.addColorStop(0.5, '#b8a48f');
			grd.addColorStop(0.6, '#a38e75');
			grd.addColorStop(0.7, '#b8a48f');
			grd.addColorStop(0.8, '#a38e75');
			grd.addColorStop(0.9, '#b8a48f');
			grd.addColorStop(1.0, '#a38e75');
			ctx.fillStyle = grd;
			ctx.stroke();
			ctx.fill();
			s = this.segments[++i];
		}
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
			segment.y += dy;
			segment.cp1x += dx;
			segment.cp1y += dy;
			segment.cp2x += dx;
			segment.cp2y += dy;
			segment.endx += dx;
			segment.endy += dy;
		});
		this.garbageCollection();
	}
}