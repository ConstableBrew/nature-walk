import Sprite from './sprite';

var druidRun = new Image();
druidRun.src = '/assets/run-cycle-test.png';

var bg_mountain = new Image();
bg_mountain.src = '/assets/bg-mountain.png';

var bg_hill = new Image();
bg_hill.src = '/assets/bg-hill.png';


//===== Clouds=====
var bg_cloud = new Image();
bg_cloud.src = '/assets/bg-clouds-transparent.png';

var bg_sky = new Image();
bg_sky.src = '/assets/bg-sky.png';



export default {

	DRUID_RUN: new Sprite(druidRun, 0, 0, 48, 48, 8),
    BG_MOUNTAIN: new Sprite(bg_mountain, 0, 0, 1536, 767, 1),
    BG_HILL: new Sprite(bg_hill, 0, 0, 1024, 306, 1),
    BG_CLOUD_00: new Sprite(bg_cloud, 0, 0, 216, 48, 1),
    BG_CLOUD_01: new Sprite(bg_cloud, 0, 48, 216, 64, 1),
    BG_CLOUD_02: new Sprite(bg_cloud, 216, 0, 286, 48, 1),
    BG_CLOUD_03: new Sprite(bg_cloud, 216, 48, 286, 64, 1),
    BG_CLOUD_04: new Sprite(bg_cloud, 0, 112, 502, 72, 1),
    BG_CLOUD_05: new Sprite(bg_cloud, 0, 184, 502, 72, 1),
    BG_SKY: new Sprite(bg_sky, 0, 0, 1, 1, 1)

};