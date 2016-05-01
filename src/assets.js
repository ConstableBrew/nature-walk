import Sprite from './sprite';

var druidRun = new Image();
druidRun.src = '/assets/run-cycle-test.png';

var bg_mountain = new Image();
bg_mountain.src = '/assets/bg-mountain.png';

var bg_hill = new Image();
bg_hill.src = '/assets/bg-hill.png';


export default {
	DRUID_RUN: new Sprite(druidRun, 0, 0, 48, 48, 8),
    BG_MOUNTAIN: new Sprite(bg_mountain, 0, 0, 1536, 767, 1),
    BG_HILL: new Sprite(bg_hill, 0, 0, 1024, 306, 1)
};