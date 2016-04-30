import Sprite from './sprite';

var druidRun = new Image();
druidRun.src = '/assets/run-cycle-test.png';
export default {
	DRUID_RUN: new Sprite(druidRun, 0, 0, 48, 48, 8)
};