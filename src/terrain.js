import Entity from './entity';


// TODO: Move these to some config file
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size

export default class Terrain {

	density = 5;
	zFactor = 0.1; // Simulates distance, reducing the aparent movement of objects that are further away (0 for no movement)
	entities = [];
	sprites = [];

	constructor(zFactor, sprites, density){
		this.zFactor = zFactor;
		this.sprites = sprites || [];
		this.density = density|0 || this.density;
		this.generate();
	}

	generate(){
		while(this.entities.length < this.density && this.sprites.length){
			let sprite = this.sprites[Math.random() * this.sprites.length];
			let x = WIDTH + WIDTH * Math.random();
			let y = HEIGHT - sprite.sh;

			console.log('Generating terrain', x, y, this.zFactor);

			let entity = new Entity('terrain', {x: x, y: y, sprite: sprite})
			this.entities.push(entity);
		}
	}

	garbageCollection(){
		for(let i=0; i<this.entities.length; ++i){
			let entity = this.entities[i];
			if (entity.x + entity.w < 0){
				this.entities.splice(i--,1);
			}
		}
	}

	render(frameId, ctx){
		this.entities.forEach((entity) => entity.render(frameId, ctx));
	}

	update(dt, sceneDx, sceneDy){

		// Update positions
		dt = dt * this.zFactor;
		sceneDx = sceneDx * this.zFactor;
		sceneDy = sceneDy * this.zFactor;
		this.entities.forEach((entity) => entity.update(dt, sceneDx, sceneDy))

		this.garbageCollection();
		this.generate();
	}
}