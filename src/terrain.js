import Entity from './entity';


// TODO: Move these to some config file
const WIDTH  = 1024; // Offscreen rendering size
const HEIGHT = 768;  // Offscreen rendering size

export default class Terrain {

	density = 5;
	yOffset = 0;
	zFactor = 1; // Simulates distance, reducing the aparent movement of objects that are further away (0 for no movement)
	entities = [];
	sprites = [];

	constructor(zFactor, sprites, density, yOffset){
		this.zFactor = zFactor;
		this.sprites = sprites || [];
		this.density = density|0 || this.density;
		this.yOffset = yOffset|0;
		this.generate();
		this.entities.forEach((entity) => entity.x -= 1.5*WIDTH);
	}

	generate(){
		while(this.entities.length < this.density && this.sprites.length){
			let sprite = this.sprites[(Math.random() * this.sprites.length)|0];
			let x = WIDTH + WIDTH * Math.random();
			let y = HEIGHT - this.yOffset - sprite.sh;

			let entity = new Entity('terrain', {x: x, y: y, sprite: sprite})
			this.entities.push(entity);
		}
	}

	garbageCollection(){
		for(let i=0; i<this.entities.length; ++i){
			let entity = this.entities[i];
			if (entity.x + entity.w < 0){
				this.entities.splice(i--,1);
				this.generate();
			}
		}
	}

	render(frameId, ctx){
		this.entities.forEach((entity) => entity.render(frameId, ctx));
	}

	update(dx, dy){

		// Update positions
		dx = this.zFactor * dx;
		dy = this.zFactor * dy;
		this.entities.forEach((entity) => entity.update(dx, dy))

		this.garbageCollection();
	}
}