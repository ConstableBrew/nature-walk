import Entity from './entity';

export default class Player extends Entity {
	constructor(config){
		let type = 'player';
		super(type, config);
	}

	update(dt, dx, dy){
		dx = 0;
		dy = 0;
		super.update(dt, dx, dy);
	}
}