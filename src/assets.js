import Sprite from './sprite';

var druidRun = new Image();
druidRun.src = '/assets/run-cycle-test.png';

var bg_mountain = new Image();
bg_mountain.src = '/assets/bg-mountain.png';

var bg_hill = new Image();
bg_hill.src = '/assets/bg-hill.png';


//===== Clouds=====
var bg_cloud_00 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';

var bg_cloud_01 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';

var bg_cloud_02 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';

var bg_cloud_03 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';

var bg_cloud_04 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';

var bg_cloud_05 = new Image();
bg_cloud.src = 'assets/bg-clouds-transparent';



export default {

	DRUID_RUN: new Sprite(druidRun, 0, 0, 48, 48, 8),
    BG_MOUNTAIN: new Sprite(bg_mountain, 0, 0, 1536, 767, 1),
    BG_HILL: new Sprite(bg_hill, 0, 0, 1024, 306, 1)
};