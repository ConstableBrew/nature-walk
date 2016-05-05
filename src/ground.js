import {normal_random} from './utils';
import * as config from './config';

export default class Ground {

	segments = [];

	
	constructor(){
		this.type = 'ground';
		let segment = {
			x: 0,
			y: config.BASE_LINE,
			cp1x: 0,
			cp1y: config.BASE_LINE,
			cp2x: config.WIDTH * 0.6667,
			cp2y: config.BASE_LINE,
			endx: config.WIDTH,
			endy: config.BASE_LINE
		};
		this.segments.push(segment);
		console.log(segment);
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
			let endy = y + config.HEIGHT * normal_random();

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
		ctx.stroke();
	}

	update(dx, dy){
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
	}
}