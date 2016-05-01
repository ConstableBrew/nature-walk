export default class Layer {
	entities = [];
	zFactor = 0; // Simulates distance, reducing the aparent movement of objects that are further away (0 for no movement)

	constructor(zFactor){
		this.zFactor = zFactor|0;
	}

	addEntity(entity){
		this.entities.push(entity);
	}

	render(frameId, ctx){
		this.entities.forEach((entity) => entity.render(frameId, ctx));
	}

	update(dt, ddx, ddy){
		dt = dt * this.zFactor;
		ddx = ddx * this.zFactor;
		ddy = ddy * this.zFactor;
		this.entities.forEach((entity) => entity.update(dt, ddx, ddy))
	}
}