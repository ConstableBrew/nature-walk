(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) {
   return obj && obj.__esModule ? obj : { default: obj };
}

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

exports.default = {

   DRUID_RUN: new _sprite2.default(druidRun, 0, 0, 48, 48, 8),
   BG_MOUNTAIN: new _sprite2.default(bg_mountain, 0, 0, 1536, 767, 1),
   BG_HILL: new _sprite2.default(bg_hill, 0, 0, 1024, 306, 1),
   BG_CLOUD_00: new _sprite2.default(bg_cloud, 0, 0, 216, 48, 1),
   BG_CLOUD_01: new _sprite2.default(bg_cloud, 0, 48, 216, 64, 1),
   BG_CLOUD_02: new _sprite2.default(bg_cloud, 216, 0, 286, 48, 1),
   BG_CLOUD_03: new _sprite2.default(bg_cloud, 216, 48, 286, 64, 1),
   BG_CLOUD_04: new _sprite2.default(bg_cloud, 0, 112, 502, 72, 1),
   BG_CLOUD_05: new _sprite2.default(bg_cloud, 0, 184, 502, 72, 1),
   BG_SKY: new _sprite2.default(bg_sky, 0, 0, 1, 1, 1)

};

},{"./sprite":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FPS = exports.FPS = 24;
var STEP = exports.STEP = 1 / FPS;
var WIDTH = exports.WIDTH = 1024; // Offscreen rendering size
var HEIGHT = exports.HEIGHT = 768; // Offscreen rendering size
var METER = exports.METER = 24; // Pixels per meter
var RATIO = exports.RATIO = HEIGHT / WIDTH;
var PLAYER_LEFT = exports.PLAYER_LEFT = WIDTH * 0.2; // How far from the left the player will appear
var PLAYER_TOP = exports.PLAYER_TOP = HEIGHT * 0.8; // How far from the top the player will appear
var HORIZON = exports.HORIZON = HEIGHT * 1; // Apparrent position of the horizon on the screen
var CAMERA_DISTANCE = exports.CAMERA_DISTANCE = 50; // Distance in meters that the camera is away form the plane of the player
var CAMERA_ANGLE_DEG = exports.CAMERA_ANGLE_DEG = 90;
var FIELD_OF_VIEW = exports.FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
var RUN_START_SPEED = exports.RUN_START_SPEED = 10 * METER;
var RUN_MAX_SPEED = exports.RUN_MAX_SPEED = 200; // meters per second (12.4 m/s is the world record)
var RUN_TIME_TO_MAX_SPEED = exports.RUN_TIME_TO_MAX_SPEED = 6 * 60;
var GRAVITY = exports.GRAVITY = 0 * -9.8;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _terrain = require('./terrain');

var _terrain2 = _interopRequireDefault(_terrain);

var _sky = require('./sky');

var _sky2 = _interopRequireDefault(_sky);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Game = function () {
	_createClass(Game, [{
		key: 'frame',

		// ========================================================================
		// Main Game Loop
		// ========================================================================

		value: function frame() {
			var step = config.STEP;
			this.t = window.performance.now();
			this.dt += Math.min(1, (this.t - this.tprev) / 1000);
			while (this.dt > step) {
				this.frameId = this.frameId + 1 | 0;
				this.dt -= step;
				this.update(step);
			}
			this.tprev = this.t;
			this.render();

			if (this.paused) return;
			requestAnimationFrame(this.frame.bind(this), this.onScreen);
		}

		// ========================================================================
		// Setup
		// ========================================================================

	}]);

	function Game(canvas, assets) {
		_classCallCheck(this, Game);

		this.gameReady = false;
		this.paused = false;
		this.debug = false;
		this.onScreen = null;
		this.offScreen = null;
		this.onScreenCtx = null;
		this.offScreenCtx = null;
		this.renderingLayers = [];
		this.scenery = [];
		this.player = {};
		this.assets = {};
		this.frameId = 0;
		this.tprev = window.performance.now();
		this.t = this.tprev;
		this.dt = 0;

		this.onScreen = canvas;
		this.offScreen = document.createElement('canvas');

		this.offScreen.width = config.WIDTH;
		this.offScreen.height = config.HEIGHT;
		this.offScreenCtx = this.offScreen.getContext('2d');
		this.offScreenCtx.imageSmoothingEnabled = false;

		this.onScreen.width = window.innerWidth;
		this.onScreen.height = Math.min(window.innerHeight, config.RATIO * window.innerWidth);
		this.onScreenCtx = this.onScreen.getContext('2d');
		this.onScreenCtx.imageSmoothingEnabled = false;

		this.assets = assets;
		this.player = new _player2.default(config.PLAYER_LEFT, config.PLAYER_TOP, config.CAMERA_DISTANCE, null, null, this.assets['DRUID_RUN'], this.frameId);

		var sky = new _sky2.default(this.assets['BG_SKY']);
		var distantClouds = new _terrain2.default(0, config.HORIZON / 2, 50 * 1000, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var mountain = new _terrain2.default(0, config.HORIZON, 30 * 1000, [this.assets['BG_MOUNTAIN']]);
		var clouds = new _terrain2.default(0, config.HORIZON / 2, 10 * 1000, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var hill1 = new _terrain2.default(0, config.HORIZON, 3 * 1000, [this.assets['BG_HILL']]);
		var hill2 = new _terrain2.default(0, config.HORIZON, 0.5 * 1000, [this.assets['BG_HILL']]);
		var ground = new _ground2.default(0, config.PLAYER_TOP, config.CAMERA_DISTANCE);

		this.scenery.push(sky);
		this.scenery.push(distantClouds);
		this.scenery.push(mountain);
		this.scenery.push(clouds);
		this.scenery.push(hill1);
		this.scenery.push(hill2);
		this.scenery.push(ground);

		this.renderingLayers.push(sky);
		this.renderingLayers.push(distantClouds);
		this.renderingLayers.push(mountain);
		this.renderingLayers.push(clouds);
		this.renderingLayers.push(hill1);
		this.renderingLayers.push(hill2);
		this.renderingLayers.push(this.player);
		this.renderingLayers.push(ground);
	}

	_createClass(Game, [{
		key: 'start',
		value: function start() {
			// Begins the main game loop
			this.frameId = 0;
			requestAnimationFrame(this.frame.bind(this), this.onScreen);
		}

		// ========================================================================
		// Update
		// ========================================================================

	}, {
		key: 'update',
		value: function update(dt) {
			// The player's position doesn't move, instead the player changes the stageDx & stageDy,
			// which then is used to update all the scenery
			var x = this.player.x;
			var y = this.player.y;

			this.player.update(dt);
			this.scenery.forEach(function (scenery) {
				return scenery.update(dt);
			});
		}

		// ========================================================================
		// Render
		// ========================================================================

	}, {
		key: 'render',
		value: function render() {
			var cvs = this.offScreen;
			var ctx = this.offScreenCtx;

			var scale = Math.max(this.onScreen.height / cvs.height, this.onScreen.width / cvs.width);
			// Match the width of the screen and then
			// Center the scaled image vertically on the screen
			var w = cvs.width;
			var h = cvs.height;
			var x = 0;
			var y = (this.offScreen.height - h) / 2;

			ctx.clearRect(0, 0, cvs.width, cvs.height);

			this.renderLayers();

			if (this.debug) {
				ctx.fillStyle = 'rgba(0,0,0,0.75)';
				ctx.fillRect(0, 0, 300, cvs.height);
				ctx.fillStyle = 'gold';
				var fontSize = 32;
				var lineHeight = fontSize * 1.33;
				var linePos = y;
				ctx.font = fontSize + 'px sans-serif';
				ctx.fillText('frameId: ' + this.frameId, 0, linePos += lineHeight);
			}

			this.onScreenCtx.clearRect(0, 0, this.onScreen.width, this.onScreen.height);;
			this.onScreenCtx.drawImage(cvs, x, y, w, h, 0, 0, this.onScreen.width, this.onScreen.height);
		}
	}, {
		key: 'renderLayers',
		value: function renderLayers() {
			var _this = this;

			this.renderingLayers.forEach(function (layer) {
				return layer.render(_this.frameId, _this.offScreenCtx);
			});
		}
	}]);

	return Game;
}();

exports.default = Game;

},{"./config":2,"./ground":4,"./player":6,"./sky":9,"./terrain":11,"./utils":12}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ("value" in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

var _utils = require('./utils');

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _setpiece = require('./setpiece');

var _setpiece2 = _interopRequireDefault(_setpiece);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Ground = function (_SetPiece) {
	_inherits(Ground, _SetPiece);

	function Ground(x, y, z) {
		_classCallCheck(this, Ground);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ground).call(this, x, y, z));

		_this.segments = [];
		_this.type = 'ground';

		var segment = {
			x: 0,
			y: _this.y,
			cp1x: 0,
			cp1y: _this.y,
			cp2x: config.WIDTH * 0.5,
			cp2y: _this.y,
			endx: config.WIDTH,
			endy: _this.y
		};
		_this.segments.push(segment);
		_this.generate();
		return _this;
	}

	_createClass(Ground, [{
		key: 'generate',
		value: function generate() {
			var last = this.segments[this.segments.length - 1];
			while (this.segments.length < 3) {
				var x = last.endx;
				var y = last.endy;
				var cp1x = x + (x - last.cp2x);
				var cp1y = y + (y - last.cp2y);
				var endx = x + config.WIDTH * 2;
				var endy = y + config.HEIGHT * (0, _utils.normal_random)() / 3;

				var variance = config.WIDTH * 0.25 + config.WIDTH * 0.1 * (0, _utils.normal_random)();
				var cp2x = endx - variance;
				var cp2y = endy - variance * (0, _utils.normal_random)();

				var segment = {
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
	}, {
		key: 'garbageCollection',
		value: function garbageCollection() {
			for (var i = 0; i < this.segments.length; ++i) {
				var segment = this.segments[i];
				if (segment.endx < 0) {
					this.segments.splice(i--, 1);
					this.generate();
				}
			}
		}
	}, {
		key: 'render',
		value: function render(frameId, ctx) {
			if (!this.segments.length) return;

			var i = 0;
			var s = this.segments[i];
			while (s) {
				ctx.beginPath();
				ctx.moveTo(s.x, s.y);
				ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.endx, s.endy);
				ctx.lineTo(s.endx, s.endy + config.HEIGHT);
				ctx.lineTo(s.x, s.endy + config.HEIGHT);
				ctx.lineTo(s.x, s.y);
				ctx.closePath();
				ctx.strokeStyle = '#a38e75';
				var grd = ctx.createLinearGradient(s.x, s.y + config.HEIGHT, s.endx, s.endy + config.HEIGHT);
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
	}, {
		key: 'update',
		value: function update(dt) {
			// Movement relative to the stage
			// Calculate the field of view of the plane based on its distance from the camera
			// And then we move it a fraction of the amount the player's plane moves
			_get(Object.getPrototypeOf(Ground.prototype), 'update', this).call(this, dt);
			var dx = this.dx * dt;
			var dy = this.dy * dt;
			this.segments.forEach(function (segment) {
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
	}]);

	return Ground;
}(_setpiece2.default);

exports.default = Ground;

},{"./config":2,"./setpiece":8,"./utils":12}],5:[function(require,module,exports){
'use strict';

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var game = new _game2.default(document.getElementById('canvas'), _assets2.default);

!function waitForContent() {
	// Wait for content to be retreived by the browser
	return new Promise(function (resolve, reject) {
		// TODO...
	});
}().then(game.start);

//game.debug = true;
game.start();

},{"./assets":1,"./game":3}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _utils = require('./utils');

var _scenery = require('./scenery');

var _scenery2 = _interopRequireDefault(_scenery);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Player = function (_Scenery) {
	_inherits(Player, _Scenery);

	function Player(x, y, z, width, height, sprite, frameId) {
		_classCallCheck(this, Player);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, x, y, z, width, height, sprite, frameId));

		_this.type = 'player';
		_this.elapsedTime = 0;
		return _this;
	}

	_createClass(Player, [{
		key: 'update',
		value: function update(dt) {
			this.elapsedTime += dt;
			var t = void 0,
			    b = void 0,
			    c = void 0,
			    d = void 0,
			    dx = void 0,
			    ddy = void 0;

			if (this.elapsedTime >= config.RUN_TIME_TO_MAX_SPEED) {
				// No change to stageDx
			} else {
					// Ramping up speed
					t = this.elapsedTime; // t: current time
					b = -config.RUN_START_SPEED; // b: start value
					c = -config.RUN_MAX_SPEED * config.METER; // c: change in value
					d = config.RUN_TIME_TO_MAX_SPEED; // d: duraiton
					dx = (0, _utils.easeOutQuadTween)(t, b, c, d); // The rate that player is moving forward
					this.stageDx = dx;
				}

			ddy = config.GRAVITY;
			this.stageDy += dt * ddy;
		}
	}]);

	return Player;
}(_scenery2.default);

exports.default = Player;

},{"./config":2,"./scenery":7,"./utils":12}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _setpiece = require('./setpiece');

var _setpiece2 = _interopRequireDefault(_setpiece);

var _config = require('./config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Scenery = function (_SetPiece) {
	_inherits(Scenery, _SetPiece);

	// Scenery are set pieces that have animated sprites

	function Scenery(x, y, z, width, height, sprite, frameId) {
		_classCallCheck(this, Scenery);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scenery).call(this, x, y, z));

		_this.sprite = sprite || {};
		_this.w = width || _this.sprite.sw | 0;
		_this.h = height || _this.sprite.sh | 0;
		_this.animationFrameId = frameId | 0;
		_this.type = 'scenery';
		return _this;
	}

	_createClass(Scenery, [{
		key: 'setAnimation',
		value: function setAnimation(frameId, sprite) {
			this.sprite = sprite || {};
			this.animationFrameId = frameId | 0;
		}
	}, {
		key: 'getKeyFrame',
		value: function getKeyFrame(frameId) {
			if (!this.sprite || !this.sprite.getKeyFrame) return;

			return this.sprite.getKeyFrame(frameId - this.animationFrameId);
		}
	}, {
		key: 'render',
		value: function render(frameId, ctx) {
			var kf = this.getKeyFrame(frameId);
			if (!kf || !kf.image) return;
			ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y - this.h, this.w, this.h);

			// add linear gradient for atmospheric fading
			ctx.rect(0, 0, config.WIDTH, config.HEIGHT);
			var density = Math.atan(Math.log(Math.log(this.z))) / Math.PI;
			var grd = ctx.createLinearGradient(0, 0, 0, config.HEIGHT);
			grd.addColorStop(0.5, 'rgba(171, 206, 227, ' + density * 0.01 + ')'); // Light blueish
			grd.addColorStop(1, 'rgba(117, 146, 163, ' + density * 0.50 + ')'); // Light blueish-gray
			ctx.fillStyle = grd;
			ctx.fill();
		}
	}]);

	return Scenery;
}(_setpiece2.default);

exports.default = Scenery;

},{"./config":2,"./setpiece":8,"./sprite":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stageDy = exports.stageDx = undefined;

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}(); // TODO: Move these to some config file, and camera stuff to a camera object

var _config = require('./config');

var config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var stageDx = exports.stageDx = 0;
var stageDy = exports.stageDy = 0;

var SetPiece = function () {

	// All set pieces move together in response to the player's movement

	function SetPiece(x, y, z) {
		_classCallCheck(this, SetPiece);

		if (new.target === SetPiece) {
			throw new TypeError('Cannot create instances of abstract class SetPiece');
		} else if (typeof this.render !== 'function') {
			throw new TypeError('Must override render function');
		}

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	// render needs to be implemented by child classes

	_createClass(SetPiece, [{
		key: 'update',
		value: function update(dt) {
			// Movement relative to the stage
			// Calculate the field of view of the plane based on its distance from the camera
			// And then we move it a fraction of the amount the player's plane moves
			var zFieldOfView = 2 * Math.sin(config.CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * this.z / Math.sin((180 - 90 - config.CAMERA_ANGLE_DEG / 2) * (Math.PI / 180));
			var zFactor = config.FIELD_OF_VIEW / zFieldOfView;
			this.dx = this.stageDx * zFactor;
			this.dy = this.stageDy * zFactor;
			this.x += this.dx * dt;
			this.y += this.dy * dt;
		}
	}, {
		key: 'stageDx',
		set: function set(dx) {
			exports.stageDx = stageDx = dx;
		},
		get: function get() {
			return stageDx;
		}
	}, {
		key: 'stageDy',
		set: function set(dy) {
			exports.stageDy = stageDy = dy;
		},
		get: function get() {
			return stageDy;
		}
	}]);

	return SetPiece;
}();

exports.default = SetPiece;

},{"./config":2}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _scenery = require('./scenery');

var _scenery2 = _interopRequireDefault(_scenery);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// TODO: Move these to some config file
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size

var Sky = function (_Scenery) {
	_inherits(Sky, _Scenery);

	function Sky(sprite) {
		_classCallCheck(this, Sky);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sky).call(this, 0, 0, 0, WIDTH, HEIGHT, sprite, 0));

		_this.type = 'sky';
		return _this;
	}

	_createClass(Sky, [{
		key: 'render',
		value: function render(frameId, ctx) {
			var kf = this.getKeyFrame(frameId);
			if (!kf || !kf.image) return;
			ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, this.w, this.h);
		}
	}, {
		key: 'update',
		value: function update() {
			// nop
		}
	}]);

	return Sky;
}(_scenery2.default);

exports.default = Sky;

},{"./scenery":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Sprite = function () {
	function Sprite(image, sx, sy, sw, sh, numKeyFrames) {
		_classCallCheck(this, Sprite);

		this.keyFrames = [];

		this.image = image;
		this.sx = sx | 0;
		this.sy = sy | 0;
		this.sw = sw | 0;
		this.sh = sh | 0;
		this.numKeyFrames = Math.max(numKeyFrames | 0, 1);

		for (var i = 0; i < this.numKeyFrames; ++i) {
			var keyFrame = {
				image: this.image,
				sx: this.sx + this.sw * i,
				sy: this.sy,
				sw: this.sw,
				sh: this.sh
			};
			this.keyFrames.push(keyFrame);
		}
	}
	// Sprites define a series of keyframe animations

	_createClass(Sprite, [{
		key: "getKeyFrame",
		value: function getKeyFrame(frameId) {
			frameId = frameId | 0;
			return this.keyFrames[frameId % this.numKeyFrames];
		}
	}]);

	return Sprite;
}();

exports.default = Sprite;

},{}],11:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _utils = require('./utils');

var _config = require('./config');

var config = _interopRequireWildcard(_config);

var _scenery = require('./scenery');

var _scenery2 = _interopRequireDefault(_scenery);

var _setpiece = require('./setpiece');

var _setpiece2 = _interopRequireDefault(_setpiece);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// TODO: Move these to some config file

var Terrain = function (_SetPiece) {
	_inherits(Terrain, _SetPiece);

	function Terrain(x, y, z, sprites) {
		_classCallCheck(this, Terrain);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Terrain).call(this, x, y, z));

		_this.scenery = [];
		_this.sprites = sprites || [];
		_this.type = 'terrain';
		_this.generate(-config.WIDTH);
		return _this;
	}

	_createClass(Terrain, [{
		key: 'createScenery',
		value: function createScenery(xoffset) {
			var sprite = this.sprites[Math.random() * this.sprites.length | 0];
			var x = xoffset + sprite.sw * 0.75 + sprite.sw / 2 * (0, _utils.normal_random)();
			var y = this.y;
			var z = this.z;
			var w = sprite.sw;
			var h = sprite.sh;
			var frameId = 0;

			var scenery = new _scenery2.default(x, y, z, w, h, sprite, frameId);
			this.scenery.push(scenery);
			return x + sprite.sw; // Return the amount of offset		
		}
	}, {
		key: 'generate',
		value: function generate(xoffset) {
			// Add more scenery until we are beyond the edge of the screen + distance scene dx
			if (!this.sprites.length) return;

			if (!xoffset) xoffset = this.scenery.reduce(function (x, s) {
				return Math.max(x, s.x + s.w);
			}, 0);
			while (xoffset < config.WIDTH * 2 + this.stageDx) {
				xoffset = this.createScenery(xoffset);
			}
		}
	}, {
		key: 'garbageCollection',
		value: function garbageCollection() {
			var xoffset = 0;
			for (var i = 0; i < this.scenery.length; ++i) {
				var scenery = this.scenery[i];
				var x = scenery.x + scenery.w;
				if (x < 0) {
					this.scenery.splice(i--, 1);
					console.log('collecting garbage');
				}
				xoffset = Math.max(xoffset, x);
			}
			this.generate(xoffset);
		}
	}, {
		key: 'render',
		value: function render(frameId, ctx) {
			this.scenery.forEach(function (scenery) {
				return scenery.render(frameId, ctx);
			});
		}
	}, {
		key: 'update',
		value: function update(dt) {
			//super.update(dt);
			this.scenery.forEach(function (scenery) {
				return scenery.update(dt);
			});
			this.garbageCollection();
		}
	}]);

	return Terrain;
}(_setpiece2.default);

exports.default = Terrain;

},{"./config":2,"./scenery":7,"./setpiece":8,"./utils":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normal_random = normal_random;
function asm(stdlib, foreign, buffer) {
	'use asm';

	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var sqrt = stdlib.Math.sqrt;
	var pow = stdlib.Math.pow;
	var abs = stdlib.Math.abs;
	var acos = stdlib.Math.acos;
	var cos = stdlib.Math.cos;
	var PI = stdlib.Math.PI;

	var heap64 = new stdlib.Float64Array(buffer);
	var heap32 = new stdlib.Int32Array(buffer);
	var heap_$base = 0;
	var heap_BLOCK_SIZE = 4 << 2; // $prev, $next, isFree, length
	var _prev = 0 << 2;
	var _next = 1 << 2;
	var _free = 2 << 2;
	var _size = 3 << 2;
	var _data = 4 << 2;

	heap32[heap_$base + _prev >> 2] = -1;
	heap32[heap_$base + _next >> 2] = -1;
	heap32[heap_$base + _free >> 2] = 1;
	heap32[heap_$base + _size >> 2] = heap.length - heap_BLOCK_SIZE;

	// Tween function parameters
	// t: current time
	// b: start value
	// c: change in value
	// d: duration

	function linearTween(t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		return +(c * t / d + b);
	}

	function easeInQuadTween(t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t = t / d;
		return +(c * t * t + b);
	}

	function easeOutQuadTween(t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t = t / d;
		return +(-c * t * (t - 2) + b);
	}

	function easeInOutQuadTween(t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t /= d / 2;
		if (t < 1) return +(c / 2 * t * t + b);
		--t;
		return +(-c / 2 * (t * (t - 2) - 1) + b);
	}

	/*computes intersection between a cubic spline and a line segment*/
	function computeIntersections(px, py, lx, ly) {
		var X = Array();

		var A = ly[1] - ly[0]; //A=y2-y1
		var B = lx[0] - lx[1]; //B=x1-x2
		var C = lx[0] * (ly[0] - ly[1]) + ly[0] * (lx[1] - lx[0]); //C=x1*(y1-y2)+y1*(x2-x1)

		var bx = bezierCoeffs(px[0], px[1], px[2], px[3]);
		var by = bezierCoeffs(py[0], py[1], py[2], py[3]);

		var P = Array();
		P[0] = A * bx[0] + B * by[0]; /*t^3*/
		P[1] = A * bx[1] + B * by[1]; /*t^2*/
		P[2] = A * bx[2] + B * by[2]; /*t*/
		P[3] = A * bx[3] + B * by[3] + C; /*1*/

		var r = cubicRoots(P);

		/*verify the roots are in bounds of the linear segment*/
		for (var i = 0; i < 3; i++) {
			t = r[i];

			X[0] = bx[0] * t * t * t + bx[1] * t * t + bx[2] * t + bx[3];
			X[1] = by[0] * t * t * t + by[1] * t * t + by[2] * t + by[3];

			/*above is intersection point assuming infinitely long line segment,
   make sure we are also in bounds of the line*/
			var s;
			if (lx[1] - lx[0] != 0) /*if not vertical line*/
				s = (X[0] - lx[0]) / (lx[1] - lx[0]);else s = (X[1] - ly[0]) / (ly[1] - ly[0]);

			/*in bounds?*/
			if (t < 0 || t > 1.0 || s < 0 || s > 1.0) {
				X[0] = -100; /*move off screen*/
				X[1] = -100;
			}

			/*move intersection point*/
			I[i].setAttributeNS(null, "cx", X[0]);
			I[i].setAttributeNS(null, "cy", X[1]);
		}
	}

	/* based on http://mysite.verizon.net/res148h4j/javascript/script_exact_cubic.html#the%20source%20code */
	function cubicRoots(P) {}

	function bezierCoeffs(P0, P1, P2, P3) {
		P0 = +P0;
		P1 = +P1;
		P2 = +P2;
		P3 = +P3;
		var $Z = alloc(4);
		heap64[$Z + (0 << 3) >> 3] = +(-P0 + 3.0 * P1 + -3.0 * P2 + P3);
		heap64[$Z + (1 << 3) >> 3] = +(3.0 * P0 - 6.0 * P1 + 3.0 * P2);
		heap64[$Z + (2 << 3) >> 3] = +(-3.0 * P0 + 3.0 * P1);
		heap64[$Z + (3 << 3) >> 3] = +P0;
		return Z;
	}

	/* sorts $array in place, ascending, except negative values are moved to the end. */
	function sortSpecial($array, length) {
		$array = $array | 0;
		length = length | 0;
		var flip = 0;
		var i = 0;
		var $a = 0;
		var $b = 0;
		var a = 0.0;
		var b = 0.0;
		var limit = 0;
		limit = length - 1 | 0;

		do {
			flip = 0;
			for (i = 0; i < limit; i = i + 1 | 0) {
				$a = (i << 3) + $array | 0;
				$b = (i + 1 << 3) + $array | 0;
				a = +heap64[$a >> 3];
				b = +heap64[$b >> 3];

				if (b >= 0 && a > b || a < 0 && b >= 0) {
					flip = 1;
					heap64[$a >> 3] = +b;
					heap64[$b >> 3] = +a;
				}
			}
		} while (flip === 1);
		return;
	}

	// ========================================================================
	// Heap management
	// ========================================================================

	function alloc(length) {
		// Allocates a block of space on the heap
		length = length | 0;
		var $block = 0;
		var $data = 0;

		$block = heap_findFirstFreeBlock(length) | 0;

		if ($block > -1) {
			heap_splitBlock($block, length);
			heap32[$block + _free >> 2] = 0;
		}
		$data = $block + _data | 0;
		return $data;
	}

	function free($data) {
		$data = $data | 0;
		var $block = 0;

		$block = $data - _data | 0;
		heap32[$block + _free >> 2] = 1; // isFree?
		heap_fusion($block);
	}

	function heap_findFirstFreeBlock(length) {
		// Returns address of large enough data block or -1 if none.
		length = length | 0;
		var len = 0;
		var $block = 0;
		len = length << 3; // Float64 data blocks (8 bytes)
		$block = heap_$base | 0;
		while ($block !== -1 && !(heap32[$block + _free >> 2] | 0 // isFree?
		 && len <= heap32[$block + _size >> 2] | 0 // length
		)) {
			$block = heap32[$block + _next >> 2] | 0; // $next
		}
		return $block | 0;
	}

	function heap_splitBlock($block, length) {
		// Splits a block into two parts at the specified length
		$block = $block | 0;
		length = length | 0;
		var $new = 0;
		var len = 0;

		$new = $block + heap_BLOCK_SIZE + length;
		len = length << 3; // Float64 data blocks (8 bytes)

		heap32[$new + _prev >> 2] = $block | 0; // $prev
		heap32[$new + _next >> 2] = heap32[$block + _next >> 2] | 0; // $next
		heap32[$new + _free >> 2] = 1; // isFree?
		heap32[$new + _size >> 2] = heap32[$block + _size >> 2] | 0 - len - heap_BLOCK_SIZE; // length
		heap32[$block + _next >> 2] = $new; // $next
		heap32[$block + _size >> 2] = len;
		return;
	}

	function heap_fusion($block) {
		// Merges neighboring free blocks
		$block = $block | 0;
		var $next = 0;
		var $prev = 0;

		$next = heap32[$block + _next >> 2] | 0;
		$prev = heap32[$block + _prev >> 2] | 0;

		if ($next > -1 && heap32[$next + _free >> 2] | 0 !== 0) {
			heap32[$block + _next >> 2] = heap32[$next + _next >> 2] | 0;
			heap32[$block + _size >> 2] = heap32[$block + _size >> 2] | 0 + heap32[$next + _size >> 2] | 0 + heap_BLOCK_SIZE;
		}
		if ($prev > -1 && heap32[$prev + _free >> 2] | 0 !== 0) {
			$block = heap_fusion($block) | 0;
		}
		return $block | 0;
	}

	return {
		linearTween: linearTween,
		easeInQuadTween: easeInQuadTween,
		easeOutQuadTween: easeOutQuadTween,
		easeInOutQuadTween: easeInOutQuadTween
	};
}

function normal_random() {
	// Standard Normal variate using Box-Muller transform.
	var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
	var v = 1 - Math.random();
	return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

var linearTween = exports.linearTween = undefined;
var easeInQuadTween = exports.easeInQuadTween = undefined;
var easeOutQuadTween = exports.easeOutQuadTween = undefined;
var easeInOutQuadTween = exports.easeInOutQuadTween = undefined;

!function init() {
	var buffer = new ArrayBuffer(0x10000);
	var exported = asm(window, null, buffer);
	exports.linearTween = linearTween = exported.linearTween;
	exports.easeInQuadTween = easeInQuadTween = exported.easeInQuadTween;
	exports.easeOutQuadTween = easeOutQuadTween = exported.easeOutQuadTween;
	exports.easeInOutQuadTween = easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
}();

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2NlbmVyeS5qcyIsInNyYy9zZXRwaWVjZS5qcyIsInNyYy9za3kuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksU0FBUyxJQUFiLEFBQWEsQUFBSTtBQUNqQixPQUFBLEFBQU8sTUFBUCxBQUFhOzs7O2NBTUQscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFBMkIsS0FBM0IsQUFBZ0MsSUFMbEMsQUFLRSxBQUFvQyxBQUNqRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsSUFBeEIsQUFBNEIsS0FBNUIsQUFBaUMsSUFObkMsQUFNRSxBQUFxQyxBQUNsRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsS0FBckIsQUFBMEIsR0FBMUIsQUFBNkIsS0FBN0IsQUFBa0MsSUFQcEMsQUFPRSxBQUFzQyxBQUNuRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsS0FBckIsQUFBMEIsSUFBMUIsQUFBOEIsS0FBOUIsQUFBbUMsSUFSckMsQUFRRSxBQUF1QyxBQUNwRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsS0FBeEIsQUFBNkIsS0FBN0IsQUFBa0MsSUFUcEMsQUFTRSxBQUFzQyxBQUNuRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsS0FBeEIsQUFBNkIsS0FBN0IsQUFBa0MsSUFWcEMsQUFVRSxBQUFzQyxBQUNuRDtXQUFRLHFCQUFBLEFBQVcsUUFBWCxBQUFtQixHQUFuQixBQUFzQixHQUF0QixBQUF5QixHQUF6QixBQUE0QixHLEFBWHpCLEFBV0gsQUFBK0I7O0FBWDVCLEFBRWQ7Ozs7Ozs7O0FDdEJNLElBQU0sb0JBQU4sQUFBYTtBQUNiLElBQU0sc0JBQU8sSUFBYixBQUFlO0FBQ2YsSUFBTSx3QixBQUFOLEFBQWU7QUFDZixJQUFNLDBCLEFBQU4sQUFBZTtBQUNmLElBQU0sd0IsQUFBTixBQUFlO0FBQ2YsSUFBTSx3QkFBUyxTQUFmLEFBQXdCO0FBQ3hCLElBQU0sb0NBQWMsUSxBQUFwQixBQUE0QjtBQUM1QixJQUFNLGtDQUFhLFMsQUFBbkIsQUFBNEI7QUFDNUIsSUFBTSw0QkFBVSxTLEFBQWhCLEFBQXlCO0FBQ3pCLElBQU0sNEMsQUFBTixBQUF3QjtBQUN4QixJQUFNLDhDQUFOLEFBQXlCO0FBQ3pCLElBQU0sd0NBQWdCLElBQUksS0FBQSxBQUFLLElBQUksbUJBQUEsQUFBbUIsS0FBSyxLQUFBLEFBQUssS0FBMUMsQUFBSSxBQUFTLEFBQWtDLFFBQS9DLEFBQXVELGtCQUFrQixLQUFBLEFBQUssSUFBSSxDQUFDLE1BQUEsQUFBTSxLQUFLLG1CQUFaLEFBQStCLE1BQU0sS0FBQSxBQUFLLEssQUFBbEosQUFBK0YsQUFBUyxBQUErQztBQUN2SixJQUFNLDRDQUFrQixLQUF4QixBQUE2QjtBQUM3QixJQUFNLHdDLEFBQU4sQUFBc0I7QUFDdEIsSUFBTSx3REFBd0IsSUFBOUIsQUFBa0M7QUFDbEMsSUFBTSw0QkFBVSxJQUFFLENBQWxCLEFBQW1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEIxQjs7SSxBQUFZOztBQUNaOztJLEFBQVk7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFHTTs7Ozs7Ozs7MEJBeUJHLEFBQ1A7T0FBSSxPQUFPLE9BQVgsQUFBa0IsQUFDbEI7UUFBQSxBQUFLLElBQUksT0FBQSxBQUFPLFlBQWhCLEFBQVMsQUFBbUIsQUFDNUI7UUFBQSxBQUFLLE1BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLENBQUMsS0FBQSxBQUFLLElBQUksS0FBVixBQUFlLFNBQXRDLEFBQVcsQUFBb0MsQUFDL0M7VUFBTSxLQUFBLEFBQUssS0FBWCxBQUFnQixNQUFNLEFBQ3JCO1NBQUEsQUFBSyxVQUFXLEtBQUEsQUFBSyxVQUFOLEFBQWdCLElBQS9CLEFBQWtDLEFBQ2xDO1NBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWDtTQUFBLEFBQUssT0FBTCxBQUFZLEFBQ1o7QUFDRDtRQUFBLEFBQUssUUFBUSxLQUFiLEFBQWtCLEFBQ2xCO1FBQUEsQUFBSyxBQUVMOztPQUFJLEtBQUosQUFBUyxRQUFRLEFBQ2pCO3lCQUFzQixLQUFBLEFBQUssTUFBTCxBQUFXLEtBQWpDLEFBQXNCLEFBQWdCLE9BQU8sS0FBN0MsQUFBa0QsQUFDbEQ7QUFPRDs7Ozs7Ozs7ZUFBQSxBQUFZLFFBQVosQUFBb0IsUUFBTzt3QkFBQTs7T0E3QzNCLEFBNkMyQixZQTdDZixBQTZDZTtPQTVDM0IsQUE0QzJCLFNBNUNsQixBQTRDa0I7T0EzQzNCLEFBMkMyQixRQTNDbEIsQUEyQ2tCO09BekMzQixBQXlDMkIsV0F6Q2YsQUF5Q2U7T0F4QzNCLEFBd0MyQixZQXhDZixBQXdDZTtPQXZDM0IsQUF1QzJCLGNBdkNaLEFBdUNZO09BdEMzQixBQXNDMkIsZUF0Q1osQUFzQ1k7T0FwQzNCLEFBb0MyQixrQkFwQ1QsQUFvQ1M7T0FuQzNCLEFBbUMyQixVQW5DakIsQUFtQ2lCO09BbEMzQixBQWtDMkIsU0FsQ2xCLEFBa0NrQjtPQWpDM0IsQUFpQzJCLFNBakNsQixBQWlDa0I7T0ExQjNCLEFBMEIyQixVQTFCakIsQUEwQmlCO09BekIzQixBQXlCMkIsUUF6Qm5CLE9BQUEsQUFBTyxZQUFQLEFBQW1CLEFBeUJBO09BeEIzQixBQXdCMkIsSUF4QnZCLEtBQUssQUF3QmtCO09BdkIzQixBQXVCMkIsS0F2QnRCLEFBdUJzQixBQUMxQjs7T0FBQSxBQUFLLFdBQUwsQUFBaUIsQUFDakI7T0FBQSxBQUFLLFlBQVksU0FBQSxBQUFTLGNBQTFCLEFBQWlCLEFBQXVCLEFBRXhDOztPQUFBLEFBQUssVUFBTCxBQUFlLFFBQVMsT0FBeEIsQUFBK0IsQUFDL0I7T0FBQSxBQUFLLFVBQUwsQUFBZSxTQUFTLE9BQXhCLEFBQStCLEFBQy9CO09BQUEsQUFBSyxlQUFtQixLQUFBLEFBQUssVUFBTCxBQUFlLFdBQXZDLEFBQXdCLEFBQTBCLEFBQ2xEO09BQUEsQUFBSyxhQUFMLEFBQWtCLHdCQUFsQixBQUEwQyxBQUUxQzs7T0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFTLE9BQXZCLEFBQThCLEFBQzlCO09BQUEsQUFBSyxTQUFMLEFBQWMsU0FBUyxLQUFBLEFBQUssSUFBSSxPQUFULEFBQWdCLGFBQWEsT0FBQSxBQUFPLFFBQVEsT0FBbkUsQUFBdUIsQUFBbUQsQUFDMUU7T0FBQSxBQUFLLGNBQWtCLEtBQUEsQUFBSyxTQUFMLEFBQWMsV0FBckMsQUFBdUIsQUFBeUIsQUFDaEQ7T0FBQSxBQUFLLFlBQUwsQUFBaUIsd0JBQWpCLEFBQTBDLEFBRTFDOztPQUFBLEFBQUssU0FBTCxBQUFjLEFBQ2Q7T0FBQSxBQUFLLFNBQVMscUJBQ2IsT0FEYSxBQUNOLGFBQ1AsT0FGYSxBQUVOLFlBQ1AsT0FIYSxBQUdOLGlCQUhNLEFBSWIsTUFKYSxBQUtiLE1BQ0EsS0FBQSxBQUFLLE9BTlEsQUFNYixBQUFZLGNBQ1osS0FQRCxBQUFjLEFBT1IsQUFHTjs7TUFBSSxNQUFNLGtCQUFRLEtBQUEsQUFBSyxPQUF2QixBQUFVLEFBQVEsQUFBWSxBQUM5QjtNQUFJLGdCQUFnQixzQkFBQSxBQUFZLEdBQUcsT0FBQSxBQUFPLFVBQXRCLEFBQWdDLEdBQUcsS0FBbkMsQUFBd0MsTUFBTSxDQUFDLEtBQUEsQUFBSyxPQUFOLEFBQUMsQUFBWSxnQkFBZ0IsS0FBQSxBQUFLLE9BQWxDLEFBQTZCLEFBQVksZ0JBQWdCLEtBQUEsQUFBSyxPQUE5RCxBQUF5RCxBQUFZLGdCQUFnQixLQUFBLEFBQUssT0FBMUYsQUFBcUYsQUFBWSxnQkFBZ0IsS0FBQSxBQUFLLE9BQXRILEFBQWlILEFBQVksZ0JBQWdCLEtBQUEsQUFBSyxPQUFwTixBQUFvQixBQUE4QyxBQUE2SSxBQUFZLEFBQzNOO01BQUksV0FBVyxzQkFBQSxBQUFZLEdBQUcsT0FBZixBQUFzQixTQUFTLEtBQS9CLEFBQW9DLE1BQU0sQ0FBQyxLQUFBLEFBQUssT0FBL0QsQUFBZSxBQUEwQyxBQUFDLEFBQVksQUFDdEU7TUFBSSxTQUFTLHNCQUFBLEFBQVksR0FBRyxPQUFBLEFBQU8sVUFBdEIsQUFBZ0MsR0FBRyxLQUFuQyxBQUF3QyxNQUFNLENBQUMsS0FBQSxBQUFLLE9BQU4sQUFBQyxBQUFZLGdCQUFnQixLQUFBLEFBQUssT0FBbEMsQUFBNkIsQUFBWSxnQkFBZ0IsS0FBQSxBQUFLLE9BQTlELEFBQXlELEFBQVksZ0JBQWdCLEtBQUEsQUFBSyxPQUExRixBQUFxRixBQUFZLGdCQUFnQixLQUFBLEFBQUssT0FBdEgsQUFBaUgsQUFBWSxnQkFBZ0IsS0FBQSxBQUFLLE9BQTdNLEFBQWEsQUFBOEMsQUFBNkksQUFBWSxBQUNwTjtNQUFJLFFBQVEsc0JBQUEsQUFBWSxHQUFHLE9BQWYsQUFBc0IsU0FBUyxJQUEvQixBQUFtQyxNQUFNLENBQUMsS0FBQSxBQUFLLE9BQTNELEFBQVksQUFBeUMsQUFBQyxBQUFZLEFBQ2xFO01BQUksUUFBUSxzQkFBQSxBQUFZLEdBQUcsT0FBZixBQUFzQixTQUFTLE1BQS9CLEFBQW1DLE1BQU0sQ0FBQyxLQUFBLEFBQUssT0FBM0QsQUFBWSxBQUF5QyxBQUFDLEFBQVksQUFDbEU7TUFBSSxTQUFTLHFCQUFBLEFBQVcsR0FBRyxPQUFkLEFBQXFCLFlBQVksT0FBOUMsQUFBYSxBQUF3QyxBQUVyRDs7T0FBQSxBQUFLLFFBQUwsQUFBYSxLQUFiLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxRQUFMLEFBQWEsS0FBYixBQUFrQixBQUNsQjtPQUFBLEFBQUssUUFBTCxBQUFhLEtBQWIsQUFBa0IsQUFDbEI7T0FBQSxBQUFLLFFBQUwsQUFBYSxLQUFiLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxRQUFMLEFBQWEsS0FBYixBQUFrQixBQUNsQjtPQUFBLEFBQUssUUFBTCxBQUFhLEtBQWIsQUFBa0IsQUFDbEI7T0FBQSxBQUFLLFFBQUwsQUFBYSxLQUFiLEFBQWtCLEFBRWxCOztPQUFBLEFBQUssZ0JBQUwsQUFBcUIsS0FBckIsQUFBMEIsQUFDMUI7T0FBQSxBQUFLLGdCQUFMLEFBQXFCLEtBQXJCLEFBQTBCLEFBQzFCO09BQUEsQUFBSyxnQkFBTCxBQUFxQixLQUFyQixBQUEwQixBQUMxQjtPQUFBLEFBQUssZ0JBQUwsQUFBcUIsS0FBckIsQUFBMEIsQUFDMUI7T0FBQSxBQUFLLGdCQUFMLEFBQXFCLEtBQXJCLEFBQTBCLEFBQzFCO09BQUEsQUFBSyxnQkFBTCxBQUFxQixLQUFyQixBQUEwQixBQUMxQjtPQUFBLEFBQUssZ0JBQUwsQUFBcUIsS0FBSyxLQUExQixBQUErQixBQUMvQjtPQUFBLEFBQUssZ0JBQUwsQUFBcUIsS0FBckIsQUFBMEIsQUFDMUI7Ozs7OzBCQUVPLEFBRVA7O1FBQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjt5QkFBc0IsS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUFqQyxBQUFzQixBQUFnQixPQUFPLEtBQTdDLEFBQWtELEFBQ2xEOzs7Ozs7Ozs7eUIsQUFVTSxJQUFJLEFBR1Y7OztPQUFJLElBQUksS0FBQSxBQUFLLE9BQWIsQUFBb0IsQUFDcEI7T0FBSSxJQUFJLEtBQUEsQUFBSyxPQUFiLEFBQW9CLEFBRXBCOztRQUFBLEFBQUssT0FBTCxBQUFZLE9BQVosQUFBbUIsQUFDbkI7UUFBQSxBQUFLLFFBQUwsQUFBYSxRQUFRLFVBQUEsQUFBQyxTQUFEO1dBQWEsUUFBQSxBQUFRLE9BQXJCLEFBQWEsQUFBZTtBQUFqRCxBQUNBOzs7Ozs7Ozs7MkJBT1EsQUFDUjtPQUFJLE1BQU0sS0FBVixBQUFlLEFBQ2Y7T0FBSSxNQUFNLEtBQVYsQUFBZSxBQUVmOztPQUFJLFFBQVEsS0FBQSxBQUFLLElBQ2hCLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBTyxJQURWLEFBQ2MsUUFDekIsS0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFNLElBRnJCLEFBQVksQUFFYSxBQUl6Qjs7O09BQUksSUFBSSxJQUFSLEFBQVksQUFDWjtPQUFJLElBQUksSUFBUixBQUFZLEFBQ1o7T0FBSSxJQUFKLEFBQVEsQUFDUjtPQUFJLElBQUksQ0FBQyxLQUFBLEFBQUssVUFBTCxBQUFlLFNBQWhCLEFBQXlCLEtBQWpDLEFBQXNDLEFBRXRDOztPQUFBLEFBQUksVUFBSixBQUFjLEdBQWQsQUFBaUIsR0FBRyxJQUFwQixBQUF3QixPQUFPLElBQS9CLEFBQW1DLEFBRW5DOztRQUFBLEFBQUssQUFHTDs7T0FBSSxLQUFKLEFBQVMsT0FBTyxBQUNmO1FBQUEsQUFBSSxZQUFKLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSSxTQUFKLEFBQWEsR0FBYixBQUFnQixHQUFoQixBQUFtQixLQUFLLElBQXhCLEFBQTRCLEFBQzVCO1FBQUEsQUFBSSxZQUFKLEFBQWdCLEFBQ2hCO1FBQUksV0FBSixBQUFlLEFBQ2Y7UUFBSSxhQUFhLFdBQWpCLEFBQTRCLEFBQzVCO1FBQUksVUFBSixBQUFjLEFBQ2Q7UUFBQSxBQUFJLE9BQU8sV0FBWCxBQUFzQixBQUN0QjtRQUFBLEFBQUksU0FBUyxjQUFjLEtBQTNCLEFBQWdDLFNBQWhDLEFBQXlDLEdBQUcsV0FBNUMsQUFBdUQsQUFDdkQ7QUFFRDs7UUFBQSxBQUFLLFlBQUwsQUFBaUIsVUFBakIsQUFBMkIsR0FBM0IsQUFBOEIsR0FBRyxLQUFBLEFBQUssU0FBdEMsQUFBK0MsT0FBTyxLQUFBLEFBQUssU0FBM0QsQUFBb0UsUUFBUSxBQUM1RTtRQUFBLEFBQUssWUFBTCxBQUFpQixVQUFqQixBQUNDLEtBREQsQUFFQyxHQUZELEFBRUksR0FGSixBQUVPLEdBRlAsQUFFVSxHQUZWLEFBR0MsR0FIRCxBQUdJLEdBQUcsS0FBQSxBQUFLLFNBSFosQUFHcUIsT0FBTyxLQUFBLEFBQUssU0FIakMsQUFHMEMsQUFFMUM7Ozs7aUNBRWE7ZUFDYjs7UUFBQSxBQUFLLGdCQUFMLEFBQXFCLFFBQVEsVUFBQSxBQUFDLE9BQUQ7V0FBVyxNQUFBLEFBQU0sT0FBTyxNQUFiLEFBQWtCLFNBQVMsTUFBdEMsQUFBVyxBQUFnQztBQUF4RSxBQUNBOzs7Ozs7O2tCLEFBS2E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwTGY7O0FBQ0E7O0ksQUFBWTs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQUVxQjttQkFFcEI7O2lCQUFBLEFBQVksR0FBWixBQUFlLEdBQWYsQUFBa0IsR0FBRTt3QkFBQTs7d0ZBQUEsQUFDYixHQURhLEFBQ1YsR0FEVSxBQUNQLEFBQ1o7O1FBQUEsQUFBSyxXQUFMLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSyxPQUFMLEFBQVksQUFFWjs7TUFBSTtNQUFVLEFBQ1YsQUFDSDtNQUFHLE1BRlUsQUFFTCxBQUNSO1NBSGEsQUFHUCxBQUNOO1NBQU0sTUFKTyxBQUlGLEFBQ1g7U0FBTSxPQUFBLEFBQU8sUUFMQSxBQUtRLEFBQ3JCO1NBQU0sTUFOTyxBQU1GLEFBQ1g7U0FBTSxPQVBPLEFBT0EsQUFDYjtTQUFNLE1BUlAsQUFBYyxBQVFGLEFBRVo7QUFWYyxBQUNiO1FBU0QsQUFBSyxTQUFMLEFBQWMsS0FBZCxBQUFtQixBQUNuQjtRQWhCbUIsQUFnQm5CLEFBQUs7U0FDTDs7Ozs7NkJBRVMsQUFDVDtPQUFJLE9BQU8sS0FBQSxBQUFLLFNBQVMsS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUF2QyxBQUFXLEFBQW1DLEFBQzlDO1VBQU8sS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFyQixBQUE4QixHQUFFLEFBQy9CO1FBQUksSUFBSSxLQUFSLEFBQWEsQUFDYjtRQUFJLElBQUksS0FBUixBQUFhLEFBQ2I7UUFBSSxPQUFPLEtBQUssSUFBSSxLQUFwQixBQUFXLEFBQWMsQUFDekI7UUFBSSxPQUFPLEtBQUssSUFBSSxLQUFwQixBQUFXLEFBQWMsQUFDekI7UUFBSSxPQUFPLElBQUksT0FBQSxBQUFPLFFBQXRCLEFBQThCLEFBQzlCO1FBQUksT0FBTyxJQUFJLE9BQUEsQUFBTyxTQUFTLFdBQWhCLG1CQUFmLEFBQWlELEFBRWpEOztRQUFJLFdBQVksT0FBQSxBQUFPLFFBQVIsQUFBZ0IsT0FBUyxPQUFBLEFBQU8sUUFBUixBQUFnQixNQUFPLFdBQTlELEFBQ0E7UUFBSSxPQUFPLE9BQVgsQUFBa0IsQUFDbEI7UUFBSSxPQUFPLE9BQU8sV0FBVyxXQUE3QixBQUVBOztRQUFJO1FBQVUsQUFDVixBQUNIO1FBRmEsQUFFVixBQUNIO1dBSGEsQUFHUCxBQUNOO1dBSmEsQUFJUCxBQUNOO1dBTGEsQUFLUCxBQUNOO1dBTmEsQUFNUCxBQUNOO1dBUGEsQUFPUCxBQUNOO1dBUkQsQUFBYyxBQVFQLEFBRVA7QUFWYyxBQUNiO1NBU0QsQUFBSyxTQUFMLEFBQWMsS0FBZCxBQUFtQixBQUNuQjtXQUFBLEFBQU8sQUFDUDtBQUNEOzs7O3NDQUVrQixBQUNsQjtRQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFBLEFBQUssU0FBcEIsQUFBNkIsUUFBUSxFQUFyQyxBQUF1QyxHQUFFLEFBQ3hDO1FBQUksVUFBVSxLQUFBLEFBQUssU0FBbkIsQUFBYyxBQUFjLEFBQzVCO1FBQUksUUFBQSxBQUFRLE9BQVosQUFBbUIsR0FBRSxBQUNwQjtVQUFBLEFBQUssU0FBTCxBQUFjLE9BQWQsQUFBcUIsS0FBckIsQUFBeUIsQUFDekI7VUFBQSxBQUFLLEFBQ0w7QUFDRDtBQUNEOzs7O3lCLEFBRU0sUyxBQUFTLEtBQUksQUFDbkI7T0FBSSxDQUFDLEtBQUEsQUFBSyxTQUFWLEFBQW1CLFFBQVEsQUFFM0I7O09BQUksSUFBSixBQUFRLEFBQ1I7T0FBSSxJQUFJLEtBQUEsQUFBSyxTQUFiLEFBQVEsQUFBYyxBQUN0QjtVQUFBLEFBQU8sR0FBRSxBQUNSO1FBQUEsQUFBSSxBQUNKO1FBQUEsQUFBSSxPQUFPLEVBQVgsQUFBYSxHQUFHLEVBQWhCLEFBQWtCLEFBQ2xCO1FBQUEsQUFBSSxjQUFjLEVBQWxCLEFBQW9CLE1BQU0sRUFBMUIsQUFBNEIsTUFBTSxFQUFsQyxBQUFvQyxNQUFNLEVBQTFDLEFBQTRDLE1BQU0sRUFBbEQsQUFBb0QsTUFBTSxFQUExRCxBQUE0RCxBQUM1RDtRQUFBLEFBQUksT0FBTyxFQUFYLEFBQWEsTUFBTSxFQUFBLEFBQUUsT0FBTyxPQUE1QixBQUFtQyxBQUNuQztRQUFBLEFBQUksT0FBTyxFQUFYLEFBQWEsR0FBRyxFQUFBLEFBQUUsT0FBTyxPQUF6QixBQUFnQyxBQUNoQztRQUFBLEFBQUksT0FBTyxFQUFYLEFBQWEsR0FBRyxFQUFoQixBQUFrQixBQUNsQjtRQUFBLEFBQUksQUFDSjtRQUFBLEFBQUksY0FBSixBQUFrQixBQUNsQjtRQUFJLE1BQU0sSUFBQSxBQUFJLHFCQUFxQixFQUF6QixBQUEyQixHQUFHLEVBQUEsQUFBRSxJQUFJLE9BQXBDLEFBQTJDLFFBQVEsRUFBbkQsQUFBcUQsTUFBTSxFQUFBLEFBQUUsT0FBTyxPQUE5RSxBQUFVLEFBQTJFLEFBQ3JGO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxhQUFKLEFBQWlCLEtBQWpCLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxZQUFKLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSSxBQUNKO1FBQUEsQUFBSSxBQUNKO1FBQUksS0FBQSxBQUFLLFNBQVMsRUFBbEIsQUFBSSxBQUFnQixBQUNwQjtBQUNEOzs7O3lCLEFBRU0sSUFBRyxBQUlUOzs7OzRFQUFBLEFBQWEsQUFDYjtPQUFJLEtBQUssS0FBQSxBQUFLLEtBQWQsQUFBbUIsQUFDbkI7T0FBSSxLQUFLLEtBQUEsQUFBSyxLQUFkLEFBQW1CLEFBQ25CO1FBQUEsQUFBSyxTQUFMLEFBQWMsUUFBUSxVQUFBLEFBQUMsU0FBWSxBQUNsQztZQUFBLEFBQVEsS0FBUixBQUFhLEFBQ2I7WUFBQSxBQUFRLEtBQVIsQUFBYSxBQUNiO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO0FBVEQsQUFVQTtRQUFBLEFBQUssQUFDTDs7Ozs7OztrQixBQS9HbUI7Ozs7O0FDSnJCOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSSxPQUFPLG1CQUFTLFNBQUEsQUFBUyxlQUFsQixBQUFTLEFBQXdCLG9CQUE1Qzs7QUFHQSxDQUFDLFNBQUEsQUFBUyxpQkFBZ0IsQUFFekI7O1lBQU8sQUFBSSxRQUFRLFVBQUEsQUFBVSxTQUFWLEFBQW1CLFFBQU8sQUFFNUM7O0FBRkQsQUFBTyxBQUdQLEVBSE87QUFGUCxJQUFBLEFBTUEsS0FBSyxLQU5OLEFBQUMsQUFNVTs7O0FBR1gsS0FBQSxBQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmTDs7SSxBQUFZOztBQUNaOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFBR3FCO21CQUNwQjs7aUJBQUEsQUFBWSxHQUFaLEFBQWUsR0FBZixBQUFrQixHQUFsQixBQUFxQixPQUFyQixBQUE0QixRQUE1QixBQUFvQyxRQUFwQyxBQUE0QyxTQUFRO3dCQUFBOzt3RkFBQSxBQUM3QyxHQUQ2QyxBQUMxQyxHQUQwQyxBQUN2QyxHQUR1QyxBQUNwQyxPQURvQyxBQUM3QixRQUQ2QixBQUNyQixRQURxQixBQUNiLEFBQ3RDOztRQUFBLEFBQUssT0FBTCxBQUFZLEFBQ1o7UUFBQSxBQUFLLGNBSDhDLEFBR25ELEFBQW1CO1NBQ25COzs7Ozt5QixBQUVNLElBQUcsQUFDVDtRQUFBLEFBQUssZUFBTCxBQUFvQixBQUNwQjtPQUFJLFNBQUo7T0FBTyxTQUFQO09BQVUsU0FBVjtPQUFhLFNBQWI7T0FBZ0IsVUFBaEI7T0FBb0IsV0FBcEIsQUFFQTs7T0FBSSxLQUFBLEFBQUssZUFBZSxPQUF4QixBQUErQix1QkFBdUIsQUFFckQ7O0FBRkQsVUFFTyxBQUVOOztTQUFJLEssQUFBSixBQUFTLEFBQ1Q7U0FBSSxDQUFDLE8sQUFBTCxBQUFZLEFBQ1o7U0FBSSxDQUFDLE9BQUQsQUFBUSxnQkFBZ0IsTyxBQUE1QixBQUFtQyxBQUNuQztTQUFJLE8sQUFBSixBQUFXLEFBQ1g7VUFBSyw2QkFBQSxBQUFpQixHQUFqQixBQUFvQixHQUFwQixBQUF1QixHLEFBQTVCLEFBQUssQUFBMEIsQUFDL0I7VUFBQSxBQUFLLFVBQUwsQUFBZSxBQUNmO0FBRUQ7O1NBQU0sT0FBTixBQUFhLEFBQ2I7UUFBQSxBQUFLLFdBQVcsS0FBaEIsQUFBcUIsQUFDckI7Ozs7Ozs7a0IsQUF6Qm1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMckI7Ozs7QUFDQTs7OztBQUNBOztJLEFBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFBRVM7b0JBSXBCOzs7O2tCQUFBLEFBQVksR0FBWixBQUFlLEdBQWYsQUFBa0IsR0FBbEIsQUFBcUIsT0FBckIsQUFBNEIsUUFBNUIsQUFBb0MsUUFBcEMsQUFBNEMsU0FBUTt3QkFBQTs7eUZBQUEsQUFDN0MsR0FENkMsQUFDMUMsR0FEMEMsQUFDdkMsQUFFWjs7UUFBQSxBQUFLLFNBQVMsVUFBZCxBQUF3QixBQUN4QjtRQUFBLEFBQUssSUFBSSxTQUFVLE1BQUEsQUFBSyxPQUFMLEFBQVksS0FBL0IsQUFBa0MsQUFDbEM7UUFBQSxBQUFLLElBQUksVUFBVSxNQUFBLEFBQUssT0FBTCxBQUFZLEtBQS9CLEFBQWtDLEFBQ2xDO1FBQUEsQUFBSyxtQkFBbUIsVUFBeEIsQUFBZ0MsQUFDaEM7UUFBQSxBQUFLLE9BUDhDLEFBT25ELEFBQVk7U0FDWjs7Ozs7K0IsQUFFWSxTLEFBQVMsUUFBTyxBQUM1QjtRQUFBLEFBQUssU0FBUyxVQUFkLEFBQXdCLEFBQ3hCO1FBQUEsQUFBSyxtQkFBbUIsVUFBeEIsQUFBZ0MsQUFDaEM7Ozs7OEIsQUFFVyxTQUFRLEFBQ25CO09BQUksQ0FBQyxLQUFELEFBQU0sVUFBVSxDQUFDLEtBQUEsQUFBSyxPQUExQixBQUFpQyxhQUFhLEFBRTlDOztVQUFPLEtBQUEsQUFBSyxPQUFMLEFBQVksWUFBWSxVQUFVLEtBQXpDLEFBQU8sQUFBdUMsQUFDOUM7Ozs7eUIsQUFFTSxTLEFBQVMsS0FBSSxBQUNuQjtPQUFJLEtBQUssS0FBQSxBQUFLLFlBQWQsQUFBUyxBQUFpQixBQUMxQjtPQUFJLENBQUEsQUFBQyxNQUFNLENBQUMsR0FBWixBQUFlLE9BQU8sQUFDdEI7T0FBQSxBQUFJLFVBQVUsR0FBZCxBQUFpQixPQUFPLEdBQXhCLEFBQTJCLElBQUksR0FBL0IsQUFBa0MsSUFBSSxHQUF0QyxBQUF5QyxJQUFJLEdBQTdDLEFBQWdELElBQUksS0FBcEQsQUFBeUQsR0FBRyxLQUFBLEFBQUssSUFBRSxLQUFuRSxBQUF3RSxHQUFHLEtBQTNFLEFBQWdGLEdBQUcsS0FBbkYsQUFBd0YsQUFHeEY7OztPQUFBLEFBQUksS0FBSixBQUFTLEdBQVQsQUFBWSxHQUFHLE9BQWYsQUFBc0IsT0FBTyxPQUE3QixBQUFvQyxBQUNwQztPQUFJLFVBQVUsS0FBQSxBQUFLLEtBQUssS0FBQSxBQUFLLElBQUksS0FBQSxBQUFLLElBQUksS0FBNUIsQUFBVSxBQUFTLEFBQWMsT0FBSyxLQUFwRCxBQUF5RCxBQUN6RDtPQUFJLE1BQU0sSUFBQSxBQUFJLHFCQUFKLEFBQXlCLEdBQXpCLEFBQTRCLEdBQTVCLEFBQStCLEdBQUcsT0FBNUMsQUFBVSxBQUF5QyxBQUNuRDtPQUFBLEFBQUksYUFBSixBQUFpQixLQUFLLHlCQUEwQixVQUExQixBQUFvQyxPLEFBQTFELEFBQWtFLEFBQ2xFO09BQUEsQUFBSSxhQUFKLEFBQWlCLEdBQUcseUJBQTBCLFVBQTFCLEFBQW9DLE8sQUFBeEQsQUFBZ0UsQUFDaEU7T0FBQSxBQUFJLFlBQUosQUFBZ0IsQUFDaEI7T0FBQSxBQUFJLEFBQ0o7Ozs7Ozs7a0IsQUF0Q21COzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hyQjs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVMLElBQUksNEJBQUosQUFBYztBQUNkLElBQUksNEJBQUosQUFBYzs7SSxBQUVBLHVCQUlwQjs7OzttQkFBQSxBQUFZLEdBQVosQUFBZSxHQUFmLEFBQWtCLEdBQUU7d0JBQ25COztNQUFJLElBQUEsQUFBSSxXQUFSLEFBQW1CLFVBQVUsQUFDNUI7U0FBTSxJQUFBLEFBQUksVUFBVixBQUFNLEFBQWMsQUFDcEI7QUFGRCxTQUVPLElBQUksT0FBTyxLQUFQLEFBQVksV0FBaEIsQUFBMkIsWUFBWSxBQUM3QztTQUFNLElBQUEsQUFBSSxVQUFWLEFBQU0sQUFBYyxBQUNwQjtBQUVEOztPQUFBLEFBQUssSUFBSSxLQUFULEFBQVksQUFDWjtPQUFBLEFBQUssSUFBSSxLQUFULEFBQVksQUFDWjtPQUFBLEFBQUssSUFBSSxLQUFULEFBQVksQUFDWjs7Ozs7Ozt5QixBQUlNLElBQUcsQUFJVDs7OztPQUFJLGVBQWdCLElBQUksS0FBQSxBQUFLLElBQUksT0FBQSxBQUFPLG1CQUFQLEFBQTBCLEtBQUssS0FBQSxBQUFLLEtBQWpELEFBQUksQUFBUyxBQUF5QyxRQUFRLEtBQTlELEFBQW1FLElBQUksS0FBQSxBQUFLLElBQUksQ0FBQyxNQUFBLEFBQU0sS0FBSyxPQUFBLEFBQU8sbUJBQW5CLEFBQXNDLE1BQU0sS0FBQSxBQUFLLEtBQXJKLEFBQTJGLEFBQVMsQUFBc0QsQUFDMUo7T0FBSSxVQUFVLE9BQUEsQUFBTyxnQkFBckIsQUFBcUMsQUFDckM7UUFBQSxBQUFLLEtBQUssS0FBQSxBQUFLLFVBQWYsQUFBeUIsQUFDekI7UUFBQSxBQUFLLEtBQUssS0FBQSxBQUFLLFVBQWYsQUFBeUIsQUFDekI7UUFBQSxBQUFLLEtBQUssS0FBQSxBQUFLLEtBQWYsQUFBb0IsQUFDcEI7UUFBQSxBQUFLLEtBQUssS0FBQSxBQUFLLEtBQWYsQUFBb0IsQUFDcEI7Ozs7b0IsQUFFWSxJQUFHLEFBQ2Y7V0FsQ1MsQUFrQ1Qsb0JBQUEsQUFBVSxBQUNWO0E7c0JBRWEsQUFDYjtVQUFBLEFBQU8sQUFDUDs7OztvQixBQUVZLElBQUcsQUFDZjtXQXpDUyxBQXlDVCxvQkFBQSxBQUFVLEFBQ1Y7QTtzQkFFYSxBQUNiO1VBQUEsQUFBTyxBQUNQOzs7Ozs7O2tCLEFBNUNtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNLFEsQUFBTixBQUFlO0FBQ2YsSUFBTSxTLEFBQU4sQUFBZTs7SSxBQUVNO2dCQUVwQjs7Y0FBQSxBQUFZLFFBQU87d0JBQUE7O3FGQUFBLEFBQ1osR0FEWSxBQUNULEdBRFMsQUFDTixHQURNLEFBQ0gsT0FERyxBQUNJLFFBREosQUFDWSxRQURaLEFBQ29CLEFBQ3RDOztRQUFBLEFBQUssT0FGYSxBQUVsQixBQUFZO1NBQ1o7Ozs7O3lCLEFBRU0sUyxBQUFTLEtBQUksQUFDbkI7T0FBSSxLQUFLLEtBQUEsQUFBSyxZQUFkLEFBQVMsQUFBaUIsQUFDMUI7T0FBSSxDQUFBLEFBQUMsTUFBTSxDQUFDLEdBQVosQUFBZSxPQUFPLEFBQ3RCO09BQUEsQUFBSSxVQUFVLEdBQWQsQUFBaUIsT0FBTyxHQUF4QixBQUEyQixJQUFJLEdBQS9CLEFBQWtDLElBQUksR0FBdEMsQUFBeUMsSUFBSSxHQUE3QyxBQUFnRCxJQUFJLEtBQXBELEFBQXlELEdBQUcsS0FBNUQsQUFBaUUsR0FBRyxLQUFwRSxBQUF5RSxHQUFHLEtBQTVFLEFBQWlGLEFBQ2pGOzs7OzJCQUVPLEFBRVA7Ozs7Ozs7O2tCLEFBZm1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUNQQSxxQkFLcEI7aUJBQUEsQUFBYSxPQUFiLEFBQW9CLElBQXBCLEFBQXdCLElBQXhCLEFBQTRCLElBQTVCLEFBQWdDLElBQWhDLEFBQW9DLGNBQWM7d0JBQUE7O09BRmxELEFBRWtELFlBRnRDLEFBRXNDLEFBQ2pEOztPQUFBLEFBQUssUUFBTCxBQUFhLEFBQ2I7T0FBQSxBQUFLLEtBQUssS0FBVixBQUFhLEFBQ2I7T0FBQSxBQUFLLEtBQUssS0FBVixBQUFhLEFBQ2I7T0FBQSxBQUFLLEtBQUssS0FBVixBQUFhLEFBQ2I7T0FBQSxBQUFLLEtBQUssS0FBVixBQUFhLEFBQ2I7T0FBQSxBQUFLLGVBQWUsS0FBQSxBQUFLLElBQUksZUFBVCxBQUFzQixHQUExQyxBQUFvQixBQUF5QixBQUU3Qzs7T0FBSSxJQUFJLElBQVIsQUFBVSxHQUFHLElBQUUsS0FBZixBQUFvQixjQUFjLEVBQWxDLEFBQW9DLEdBQUUsQUFDckM7T0FBSTtXQUNJLEtBRE8sQUFDRixBQUNaO1FBQUksS0FBQSxBQUFLLEtBQUssS0FBQSxBQUFLLEtBRkwsQUFFVSxBQUN4QjtRQUFJLEtBSFUsQUFHTCxBQUNUO1FBQUksS0FKVSxBQUlMLEFBQ1Q7UUFBSSxLQUxMLEFBQWUsQUFLTCxBQUVWO0FBUGUsQUFDZDtRQU1ELEFBQUssVUFBTCxBQUFlLEtBQWYsQUFBb0IsQUFDcEI7QUFDRDs7Ozs7OzhCLEFBRVcsU0FBUSxBQUNuQjthQUFVLFVBQVYsQUFBa0IsQUFDbEI7VUFBTyxLQUFBLEFBQUssVUFBVSxVQUFVLEtBQWhDLEFBQU8sQUFBOEIsQUFDckM7Ozs7Ozs7a0IsQUE1Qm1COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBckI7O0FBQ0E7O0ksQUFBWTs7QUFDWjs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFLcUI7b0JBR3BCOztrQkFBQSxBQUFZLEdBQVosQUFBZSxHQUFmLEFBQWtCLEdBQWxCLEFBQXFCLFNBQVE7d0JBQUE7O3lGQUFBLEFBQ3RCLEdBRHNCLEFBQ25CLEdBRG1CLEFBQ2hCLEFBQ1o7O1FBQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjtRQUFBLEFBQUssVUFBVSxXQUFmLEFBQTBCLEFBQzFCO1FBQUEsQUFBSyxPQUFMLEFBQVksQUFDWjtRQUFBLEFBQUssU0FBUyxDQUFDLE9BTGEsQUFLNUIsQUFBc0I7U0FDdEI7Ozs7O2dDLEFBRWEsU0FBUSxBQUNyQjtPQUFJLFNBQVMsS0FBQSxBQUFLLFFBQVMsS0FBQSxBQUFLLFdBQVcsS0FBQSxBQUFLLFFBQXRCLEFBQThCLFNBQXhELEFBQWEsQUFBbUQsQUFDaEU7T0FBSSxJQUFJLFVBQVUsT0FBQSxBQUFPLEtBQWpCLEFBQXNCLE9BQU8sT0FBQSxBQUFPLEtBQVAsQUFBWSxJQUFJLFdBQXJELEFBQ0E7T0FBSSxJQUFJLEtBQVIsQUFBYSxBQUNiO09BQUksSUFBSSxLQUFSLEFBQWEsQUFDYjtPQUFJLElBQUksT0FBUixBQUFlLEFBQ2Y7T0FBSSxJQUFJLE9BQVIsQUFBZSxBQUNmO09BQUksVUFBSixBQUFjLEFBRWQ7O09BQUksVUFBVSxzQkFBQSxBQUFZLEdBQVosQUFBZSxHQUFmLEFBQWtCLEdBQWxCLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLFFBQXpDLEFBQWMsQUFBbUMsQUFDakQ7UUFBQSxBQUFLLFFBQUwsQUFBYSxLQUFiLEFBQWtCLEFBQ2xCO1VBQU8sSUFBSSxPLEFBQVgsQUFBa0IsQUFDbEI7Ozs7MkIsQUFFUSxTQUFRLEFBRWhCOztPQUFJLENBQUMsS0FBQSxBQUFLLFFBQVYsQUFBa0IsUUFBUSxBQUUxQjs7T0FBSSxDQUFKLEFBQUssd0JBQ00sQUFBSyxRQUFMLEFBQWEsT0FBTyxVQUFBLEFBQUMsR0FBRCxBQUFJLEdBQUo7V0FBVSxLQUFBLEFBQUssSUFBTCxBQUFTLEdBQUcsRUFBQSxBQUFFLElBQUksRUFBNUIsQUFBVSxBQUFvQjtBQUFsRCxJQUFBLEVBQVYsQUFBVSxBQUFzRCxBQUNqRSxFQURDO1VBQ0ssVUFBVSxPQUFBLEFBQU8sUUFBUCxBQUFlLElBQUksS0FBbkMsQUFBd0MsU0FBUSxBQUMvQztjQUFVLEtBQUEsQUFBSyxjQUFmLEFBQVUsQUFBbUIsQUFDN0I7QUFDRDs7OztzQ0FFa0IsQUFDbEI7T0FBSSxVQUFKLEFBQWMsQUFDZDtRQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFBLEFBQUssUUFBcEIsQUFBNEIsUUFBUSxFQUFwQyxBQUFzQyxHQUFFLEFBQ3ZDO1FBQUksVUFBVSxLQUFBLEFBQUssUUFBbkIsQUFBYyxBQUFhLEFBQzNCO1FBQUksSUFBSSxRQUFBLEFBQVEsSUFBSSxRQUFwQixBQUE0QixBQUM1QjtRQUFJLElBQUosQUFBUSxHQUFFLEFBQ1Q7VUFBQSxBQUFLLFFBQUwsQUFBYSxPQUFiLEFBQW9CLEtBQXBCLEFBQXdCLEFBQ3hCO2FBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUNEO2NBQVUsS0FBQSxBQUFLLElBQUwsQUFBUyxTQUFuQixBQUFVLEFBQWtCLEFBQzVCO0FBQ0Q7UUFBQSxBQUFLLFNBQUwsQUFBYyxBQUNkOzs7O3lCLEFBRU0sUyxBQUFTLEtBQUksQUFDbkI7UUFBQSxBQUFLLFFBQUwsQUFBYSxRQUFRLFVBQUEsQUFBQyxTQUFEO1dBQWEsUUFBQSxBQUFRLE9BQVIsQUFBZSxTQUE1QixBQUFhLEFBQXdCO0FBQTFELEFBQ0E7Ozs7eUIsQUFFTSxJQUFHLEFBRVQ7O1FBQUEsQUFBSyxRQUFMLEFBQWEsUUFBUSxVQUFBLEFBQUMsU0FBRDtXQUFhLFFBQUEsQUFBUSxPQUFyQixBQUFhLEFBQWU7QUFBakQsQUFDQTtRQUFBLEFBQUssQUFDTDs7Ozs7OztrQixBQTFEbUI7Ozs7Ozs7O1EsQUN5UUwsZ0IsQUFBQTtBQWpSaEIsU0FBQSxBQUFTLElBQVQsQUFBYSxRQUFiLEFBQXFCLFNBQXJCLEFBQThCLFFBQU8sQUFDcEM7QUFFQTs7S0FBSSxNQUFNLE9BQUEsQUFBTyxLQUFqQixBQUFzQixBQUN0QjtLQUFJLE1BQU0sT0FBQSxBQUFPLEtBQWpCLEFBQXNCLEFBQ3RCO0tBQUksT0FBTyxPQUFBLEFBQU8sS0FBbEIsQUFBdUIsQUFDdkI7S0FBSSxNQUFNLE9BQUEsQUFBTyxLQUFqQixBQUFzQixBQUN0QjtLQUFJLE1BQU0sT0FBQSxBQUFPLEtBQWpCLEFBQXNCLEFBQ3RCO0tBQUksT0FBTyxPQUFBLEFBQU8sS0FBbEIsQUFBdUIsQUFDdkI7S0FBSSxNQUFNLE9BQUEsQUFBTyxLQUFqQixBQUFzQixBQUN0QjtLQUFJLEtBQUssT0FBQSxBQUFPLEtBQWhCLEFBQXFCLEFBRXJCOztLQUFJLFNBQVMsSUFBSSxPQUFKLEFBQVcsYUFBeEIsQUFBYSxBQUF3QixBQUNyQztLQUFJLFNBQVMsSUFBSSxPQUFKLEFBQVcsV0FBeEIsQUFBYSxBQUFzQixBQUNuQztLQUFJLGFBQUosQUFBaUIsQUFDakI7S0FBSSxrQkFBa0IsSyxBQUF0QixBQUEyQixBQUMzQjtLQUFJLFFBQVEsS0FBWixBQUFpQixBQUNqQjtLQUFJLFFBQVEsS0FBWixBQUFpQixBQUNqQjtLQUFJLFFBQVEsS0FBWixBQUFpQixBQUNqQjtLQUFJLFFBQVEsS0FBWixBQUFpQixBQUNqQjtLQUFJLFFBQVEsS0FBWixBQUFpQixBQUVqQjs7UUFBUSxhQUFELEFBQWMsU0FBckIsQUFBK0IsS0FBSyxDQUFwQyxBQUFxQyxBQUNyQztRQUFRLGFBQUQsQUFBYyxTQUFyQixBQUErQixLQUFLLENBQXBDLEFBQXFDLEFBQ3JDO1FBQVEsYUFBRCxBQUFjLFNBQXJCLEFBQStCLEtBQS9CLEFBQXFDLEFBQ3JDO1FBQVEsYUFBRCxBQUFjLFNBQXJCLEFBQStCLEtBQUssS0FBQSxBQUFLLFNBQXpDLEFBQWtELEFBUWxEOzs7Ozs7OztVQUFBLEFBQVMsWUFBVCxBQUFzQixHQUF0QixBQUF5QixHQUF6QixBQUE0QixHQUE1QixBQUErQixHQUFHLEFBQ2pDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O1NBQU8sRUFBRSxJQUFBLEFBQUUsSUFBRixBQUFJLElBQWIsQUFBTyxBQUFVLEFBQ2pCO0FBRUQ7O1VBQUEsQUFBUyxnQkFBVCxBQUEwQixHQUExQixBQUE2QixHQUE3QixBQUFnQyxHQUFoQyxBQUFtQyxHQUFHLEFBQ3JDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O01BQUksSUFBSixBQUFNLEFBQ047U0FBTyxFQUFFLElBQUEsQUFBRSxJQUFGLEFBQUksSUFBYixBQUFPLEFBQVUsQUFDakI7QUFFRDs7VUFBQSxBQUFTLGlCQUFULEFBQTJCLEdBQTNCLEFBQThCLEdBQTlCLEFBQWlDLEdBQWpDLEFBQW9DLEdBQUcsQUFDdEM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7TUFBSSxJQUFKLEFBQU0sQUFDTjtTQUFPLEVBQUUsQ0FBQSxBQUFDLElBQUQsQUFBRyxLQUFHLElBQU4sQUFBUSxLQUFqQixBQUFPLEFBQWUsQUFDdEI7QUFFRDs7VUFBQSxBQUFTLG1CQUFULEFBQTZCLEdBQTdCLEFBQWdDLEdBQWhDLEFBQW1DLEdBQW5DLEFBQXNDLEdBQUcsQUFDeEM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7T0FBSyxJQUFMLEFBQU8sQUFDUDtNQUFJLElBQUosQUFBUSxHQUFHLE9BQU8sRUFBRSxJQUFBLEFBQUUsSUFBRixBQUFJLElBQUosQUFBTSxJQUFmLEFBQU8sQUFBWSxBQUM5QjtJQUFBLEFBQUUsQUFDRjtTQUFPLEVBQUUsQ0FBQSxBQUFDLElBQUQsQUFBRyxLQUFLLEtBQUcsSUFBSCxBQUFLLEtBQWIsQUFBa0IsS0FBM0IsQUFBTyxBQUF5QixBQUNoQztBQUdEOzs7VUFBQSxBQUFTLHFCQUFULEFBQThCLElBQTlCLEFBQWlDLElBQWpDLEFBQW9DLElBQXBDLEFBQXVDLElBQUksQUFDMUM7TUFBSSxJQUFKLEFBQU0sQUFFTjs7TUFBSSxJQUFFLEdBQUEsQUFBRyxLQUFHLEcsQUFBWixBQUFZLEFBQUcsQUFDZjtNQUFJLElBQUUsR0FBQSxBQUFHLEtBQUcsRyxBQUFaLEFBQVksQUFBRyxBQUNmO01BQUksSUFBRSxHQUFBLEFBQUcsTUFBSSxHQUFBLEFBQUcsS0FBRyxHQUFiLEFBQWEsQUFBRyxNQUN0QixHQUFBLEFBQUcsTUFBSSxHQUFBLEFBQUcsS0FBRyxHLEFBRGIsQUFDQSxBQUFhLEFBQUcsQUFFaEI7O01BQUksS0FBSyxhQUFhLEdBQWIsQUFBYSxBQUFHLElBQUcsR0FBbkIsQUFBbUIsQUFBRyxJQUFHLEdBQXpCLEFBQXlCLEFBQUcsSUFBRyxHQUF4QyxBQUFTLEFBQStCLEFBQUcsQUFDM0M7TUFBSSxLQUFLLGFBQWEsR0FBYixBQUFhLEFBQUcsSUFBRyxHQUFuQixBQUFtQixBQUFHLElBQUcsR0FBekIsQUFBeUIsQUFBRyxJQUFHLEdBQXhDLEFBQVMsQUFBK0IsQUFBRyxBQUUzQzs7TUFBSSxJQUFKLEFBQVEsQUFDUjtJQUFBLEFBQUUsS0FBSyxJQUFFLEdBQUYsQUFBRSxBQUFHLEtBQUcsSUFBRSxHLEFBQWpCLEFBQWlCLEFBQUcsQUFDcEI7SUFBQSxBQUFFLEtBQUssSUFBRSxHQUFGLEFBQUUsQUFBRyxLQUFHLElBQUUsRyxBQUFqQixBQUFpQixBQUFHLEFBQ3BCO0lBQUEsQUFBRSxLQUFLLElBQUUsR0FBRixBQUFFLEFBQUcsS0FBRyxJQUFFLEcsQUFBakIsQUFBaUIsQUFBRyxBQUNwQjtJQUFBLEFBQUUsS0FBSyxJQUFFLEdBQUYsQUFBRSxBQUFHLEtBQUcsSUFBRSxHQUFWLEFBQVUsQUFBRyxLLEFBQXBCLEFBQXlCLEFBRXpCOztNQUFJLElBQUUsV0FBTixBQUFNLEFBQVcsQUFHakI7OztPQUFLLElBQUksSUFBVCxBQUFXLEdBQUUsSUFBYixBQUFlLEdBQWYsQUFBaUIsS0FDakIsQUFDQTtPQUFFLEVBQUYsQUFBRSxBQUFFLEFBRUo7O0tBQUEsQUFBRSxLQUFHLEdBQUEsQUFBRyxLQUFILEFBQU0sSUFBTixBQUFRLElBQVIsQUFBVSxJQUFFLEdBQUEsQUFBRyxLQUFILEFBQU0sSUFBbEIsQUFBb0IsSUFBRSxHQUFBLEFBQUcsS0FBekIsQUFBNEIsSUFBRSxHQUFuQyxBQUFtQyxBQUFHLEFBQ3RDO0tBQUEsQUFBRSxLQUFHLEdBQUEsQUFBRyxLQUFILEFBQU0sSUFBTixBQUFRLElBQVIsQUFBVSxJQUFFLEdBQUEsQUFBRyxLQUFILEFBQU0sSUFBbEIsQUFBb0IsSUFBRSxHQUFBLEFBQUcsS0FBekIsQUFBNEIsSUFBRSxHQUFuQyxBQUFtQyxBQUFHLEFBSXRDOzs7O09BQUEsQUFBSSxBQUNKO09BQUssR0FBQSxBQUFHLEtBQUcsR0FBUCxBQUFPLEFBQUcsTSxBQUFkLEFBQW1CLEFBQ25CO1FBQUUsQ0FBQyxFQUFBLEFBQUUsS0FBRyxHQUFOLEFBQU0sQUFBRyxPQUFLLEdBQUEsQUFBRyxLQUFHLEdBRHRCLEFBQ0EsQUFBRSxBQUFvQixBQUFHLFNBRXpCLElBQUUsQ0FBQyxFQUFBLEFBQUUsS0FBRyxHQUFOLEFBQU0sQUFBRyxPQUFLLEdBQUEsQUFBRyxLQUFHLEdBQXRCLEFBQUUsQUFBb0IsQUFBRyxBQUd6Qjs7O09BQUksSUFBQSxBQUFFLEtBQUssSUFBUCxBQUFTLE9BQU8sSUFBaEIsQUFBa0IsS0FBSyxJQUEzQixBQUE2QixLQUM3QixBQUNBO01BQUEsQUFBRSxLQUFHLEMsQUFBTCxBQUFNLEFBQ047TUFBQSxBQUFFLEtBQUcsQ0FBTCxBQUFNLEFBQ0w7QUFHRDs7O0tBQUEsQUFBRSxHQUFGLEFBQUssZUFBTCxBQUFvQixNQUFwQixBQUF5QixNQUFLLEVBQTlCLEFBQThCLEFBQUUsQUFDaEM7S0FBQSxBQUFFLEdBQUYsQUFBSyxlQUFMLEFBQW9CLE1BQXBCLEFBQXlCLE1BQUssRUFBOUIsQUFBOEIsQUFBRSxBQUMvQjtBQUNEO0FBR0Q7OztVQUFBLEFBQVMsV0FBVCxBQUFvQixHQUFFLEFBQ3JCLENBR0Q7O1VBQUEsQUFBUyxhQUFULEFBQXNCLElBQXRCLEFBQXlCLElBQXpCLEFBQTRCLElBQTVCLEFBQStCLElBQUcsQUFDakM7T0FBSyxDQUFMLEFBQU0sQUFDTjtPQUFLLENBQUwsQUFBTSxBQUNOO09BQUssQ0FBTCxBQUFNLEFBQ047T0FBSyxDQUFMLEFBQU0sQUFDTjtNQUFJLEtBQUssTUFBVCxBQUFTLEFBQU0sQUFDZjtTQUFRLE1BQU0sS0FBUCxBQUFDLEFBQVcsTUFBbkIsQUFBMEIsS0FBSyxFQUFFLENBQUEsQUFBQyxLQUFLLE1BQU4sQUFBVSxLQUFLLENBQUEsQUFBQyxNQUFoQixBQUFvQixLQUFyRCxBQUErQixBQUEyQixBQUMxRDtTQUFRLE1BQU0sS0FBUCxBQUFDLEFBQVcsTUFBbkIsQUFBMEIsS0FBSyxFQUFFLE1BQUEsQUFBSSxLQUFLLE1BQVQsQUFBYSxLQUFLLE1BQW5ELEFBQStCLEFBQXdCLEFBQ3ZEO1NBQVEsTUFBTSxLQUFQLEFBQUMsQUFBVyxNQUFuQixBQUEwQixLQUFLLEVBQUUsQ0FBQSxBQUFDLE1BQUQsQUFBSyxLQUFLLE1BQTNDLEFBQStCLEFBQWdCLEFBQy9DO1NBQVEsTUFBTSxLQUFQLEFBQUMsQUFBVyxNQUFuQixBQUEwQixLQUFLLENBQS9CLEFBQWlDLEFBQ2pDO1NBQUEsQUFBTyxBQUNQO0FBR0Q7OztVQUFBLEFBQVMsWUFBVCxBQUFxQixRQUFyQixBQUE2QixRQUFRLEFBQ3BDO1dBQVMsU0FBVCxBQUFnQixBQUNoQjtXQUFTLFNBQVQsQUFBZ0IsQUFDaEI7TUFBSSxPQUFKLEFBQVcsQUFDWDtNQUFJLElBQUosQUFBUSxBQUNSO01BQUksS0FBSixBQUFTLEFBQ1Q7TUFBSSxLQUFKLEFBQVMsQUFDVDtNQUFJLElBQUosQUFBUSxBQUNSO01BQUksSUFBSixBQUFRLEFBQ1I7TUFBSSxRQUFKLEFBQVksQUFDWjtVQUFTLFNBQUQsQUFBVSxJQUFsQixBQUFxQixBQUVyQjs7S0FBRyxBQUNGO1VBQUEsQUFBTyxBQUNQO1FBQUssSUFBTCxBQUFPLEdBQUcsSUFBVixBQUFZLE9BQU8sSUFBRyxJQUFELEFBQUcsSUFBeEIsQUFBMkIsR0FBRyxBQUM3QjtTQUFNLENBQUMsS0FBRCxBQUFNLEtBQVAsQUFBWSxTQUFqQixBQUF5QixBQUN6QjtTQUFNLENBQUUsSUFBRCxBQUFLLEtBQU4sQUFBWSxLQUFiLEFBQWtCLFNBQXZCLEFBQStCLEFBQy9CO1FBQUksQ0FBQyxPQUFPLE1BQVosQUFBSyxBQUFhLEFBQ2xCO1FBQUksQ0FBQyxPQUFPLE1BQVosQUFBSyxBQUFhLEFBRWxCOztRQUFLLEtBQUEsQUFBSyxLQUFLLElBQVgsQUFBZSxLQUFPLElBQUEsQUFBSSxLQUFLLEtBQW5DLEFBQXdDLEdBQUksQUFDM0M7WUFBQSxBQUFPLEFBQ1A7WUFBTyxNQUFQLEFBQWEsS0FBSyxDQUFsQixBQUFtQixBQUNuQjtZQUFPLE1BQVAsQUFBYSxLQUFLLENBQWxCLEFBQW1CLEFBQ25CO0FBQ0Q7QUFDRDtBQWRELFdBY1MsU0FkVCxBQWNrQixBQUNsQjtBQUNBO0FBVUQ7Ozs7OztVQUFBLEFBQVMsTUFBVCxBQUFlLFFBQU8sQUFFckI7O1dBQVMsU0FBVCxBQUFnQixBQUNoQjtNQUFJLFNBQUosQUFBYSxBQUNiO01BQUksUUFBSixBQUFZLEFBRVo7O1dBQVMsd0JBQUEsQUFBd0IsVUFBakMsQUFBeUMsQUFFekM7O01BQUksU0FBUyxDQUFiLEFBQWMsR0FBRyxBQUNoQjttQkFBQSxBQUFnQixRQUFoQixBQUF3QixBQUN4QjtVQUFRLFNBQUQsQUFBVSxTQUFqQixBQUEyQixLQUEzQixBQUFnQyxBQUNoQztBQUNEO1VBQVMsU0FBRCxBQUFVLFFBQWxCLEFBQXlCLEFBQ3pCO1NBQUEsQUFBTyxBQUNQO0FBRUQ7O1VBQUEsQUFBUyxLQUFULEFBQWMsT0FBTSxBQUNuQjtVQUFRLFFBQVIsQUFBYyxBQUNkO01BQUksU0FBSixBQUFhLEFBRWI7O1dBQVUsUUFBRCxBQUFTLFFBQWxCLEFBQXlCLEFBQ3pCO1NBQVEsU0FBRCxBQUFVLFNBQWpCLEFBQTJCLEssQUFBM0IsQUFBZ0MsQUFDaEM7Y0FBQSxBQUFZLEFBQ1o7QUFFRDs7VUFBQSxBQUFTLHdCQUFULEFBQWlDLFFBQU8sQUFFdkM7O1dBQVMsU0FBVCxBQUFnQixBQUNoQjtNQUFJLE1BQUosQUFBVSxBQUNWO01BQUksU0FBSixBQUFhLEFBQ2I7UUFBTSxVLEFBQU4sQUFBZ0IsQUFDaEI7V0FBUyxhQUFULEFBQW9CLEFBQ3BCO1NBQU8sV0FBVyxDQUFYLEFBQVksY0FDVixTQUFELEFBQVUsU0FBakIsQUFBMkIsSyxBQUEzQixBQUE4QjtBQUE5QixNQUNHLE9BQU8sT0FBUSxTQUFELEFBQVUsU0FBeEIsQUFBTyxBQUEyQixLLEFBRnRDLEFBQXdCLEFBRWlCO0FBRmpCLEtBR3JCLEFBQ0Y7WUFBUyxPQUFRLFNBQUQsQUFBVSxTQUFqQixBQUEyQixLLEFBQXBDLEFBQXVDLEFBQ3ZDO0FBQ0Q7U0FBTyxTQUFQLEFBQWMsQUFDZDtBQUVEOztVQUFBLEFBQVMsZ0JBQVQsQUFBeUIsUUFBekIsQUFBaUMsUUFBTyxBQUV2Qzs7V0FBUyxTQUFULEFBQWdCLEFBQ2hCO1dBQVMsU0FBVCxBQUFnQixBQUNoQjtNQUFJLE9BQUosQUFBVyxBQUNYO01BQUksTUFBSixBQUFVLEFBRVY7O1NBQU8sU0FBQSxBQUFTLGtCQUFoQixBQUFrQyxBQUNsQztRQUFNLFUsQUFBTixBQUFnQixBQUVoQjs7U0FBUSxPQUFELEFBQVEsU0FBZixBQUF5QixLQUFLLFMsQUFBOUIsQUFBcUMsQUFDckM7U0FBUSxPQUFELEFBQVEsU0FBZixBQUF5QixLQUFLLE9BQVEsU0FBRCxBQUFVLFNBQWpCLEFBQTJCLEssQUFBekQsQUFBNEQsQUFDNUQ7U0FBUSxPQUFELEFBQVEsU0FBZixBQUF5QixLLEFBQXpCLEFBQThCLEFBQzlCO1NBQVEsT0FBRCxBQUFRLFNBQWYsQUFBeUIsS0FBSyxPQUFRLFNBQUQsQUFBVSxTQUFqQixBQUEyQixLQUFHLElBQUEsQUFBSSxNLEFBQWhFLEFBQXNFLEFBQ3RFO1NBQVEsU0FBRCxBQUFVLFNBQWpCLEFBQTJCLEssQUFBM0IsQUFBZ0MsQUFDaEM7U0FBUSxTQUFELEFBQVUsU0FBakIsQUFBMkIsS0FBM0IsQUFBZ0MsQUFDaEM7QUFDQTtBQUVEOztVQUFBLEFBQVMsWUFBVCxBQUFxQixRQUFPLEFBRTNCOztXQUFTLFNBQVQsQUFBZ0IsQUFDaEI7TUFBSSxRQUFKLEFBQVksQUFDWjtNQUFJLFFBQUosQUFBWSxBQUVaOztVQUFRLE9BQVEsU0FBRCxBQUFVLFNBQWpCLEFBQTJCLEtBQW5DLEFBQXNDLEFBQ3RDO1VBQVEsT0FBUSxTQUFELEFBQVUsU0FBakIsQUFBMkIsS0FBbkMsQUFBc0MsQUFFdEM7O01BQUksUUFBUSxDQUFSLEFBQVMsS0FBSyxPQUFRLFFBQUQsQUFBUyxTQUFoQixBQUEwQixLQUFHLE1BQS9DLEFBQXFELEdBQUcsQUFDdkQ7VUFBUSxTQUFELEFBQVUsU0FBakIsQUFBMkIsS0FBSyxPQUFRLFFBQUQsQUFBUyxTQUFoQixBQUEwQixLQUExRCxBQUE2RCxBQUM3RDtVQUFRLFNBQUQsQUFBVSxTQUFqQixBQUEyQixLQUFLLE9BQVEsU0FBRCxBQUFVLFNBQWpCLEFBQTJCLEtBQUcsSUFBSSxPQUFRLFFBQUQsQUFBUyxTQUFsRCxBQUFrQyxBQUEwQixLQUFHLElBQS9GLEFBQW1HLEFBQ25HO0FBQ0Q7TUFBSSxRQUFRLENBQVIsQUFBUyxLQUFLLE9BQVEsUUFBRCxBQUFTLFNBQWhCLEFBQTBCLEtBQUcsTUFBL0MsQUFBcUQsR0FBRyxBQUN2RDtZQUFTLFlBQUEsQUFBWSxVQUFyQixBQUE2QixBQUM3QjtBQUNEO1NBQU8sU0FBUCxBQUFjLEFBQ2Q7QUFRRDs7O2VBQU8sQUFDTyxBQUNiO21CQUZNLEFBRVcsQUFDakI7b0JBSE0sQUFHWSxBQUNsQjtzQkFKRCxBQUFPLEFBSWMsQUFFckI7QUFOTyxBQUNOOzs7QUFPSyxTQUFBLEFBQVMsZ0JBQWdCLEFBRTVCOztLQUFJLElBQUksSUFBSSxLLEFBQVosQUFBWSxBQUFLLEFBQ2pCO0tBQUksSUFBSSxJQUFJLEtBQVosQUFBWSxBQUFLLEFBQ2pCO1FBQU8sS0FBQSxBQUFLLEtBQU0sQ0FBQSxBQUFDLE1BQU0sS0FBQSxBQUFLLElBQXZCLEFBQWtCLEFBQVUsTUFBUSxLQUFBLEFBQUssSUFBSyxNQUFNLEtBQU4sQUFBVyxLQUFoRSxBQUEyQyxBQUEwQixBQUN4RTs7O0FBRU0sSUFBSSxvQ0FBSjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFUCxDQUFDLFNBQUEsQUFBUyxPQUFNLEFBQ2Y7S0FBSSxTQUFTLElBQUEsQUFBSSxZQUFqQixBQUFhLEFBQWdCLEFBQzdCO0tBQUksV0FBVyxJQUFBLEFBQUksUUFBSixBQUFZLE1BQTNCLEFBQWUsQUFBa0IsQUFDakM7U0FSVSxBQVFWLDRCQUFjLFNBQWQsQUFBdUIsQUFDdkI7U0FSVSxBQVFWLG9DQUFrQixTQUFsQixBQUEyQixBQUMzQjtTQVJVLEFBUVYsc0NBQW1CLFNBQW5CLEFBQTRCLEFBQzVCO1NBUlUsQUFRViwwQ0FBcUIsU0FBckIsQUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1A7QUFSRCxBQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbi8vPT09PT0gQ2xvdWRzPT09PT1cbnZhciBiZ19jbG91ZCA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJy9hc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50LnBuZyc7XG5cbnZhciBiZ19za3kgPSBuZXcgSW1hZ2UoKTtcbmJnX3NreS5zcmMgPSAnL2Fzc2V0cy9iZy1za3kucG5nJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpLFxuICAgIEJHX0NMT1VEXzAwOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAwLCAyMTYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgNDgsIDIxNiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzAyOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDAsIDI4NiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAzOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDQ4LCAyODYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wNDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTEyLCA1MDIsIDcyLCAxKSxcbiAgICBCR19DTE9VRF8wNTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTg0LCA1MDIsIDcyLCAxKSxcbiAgICBCR19TS1k6IG5ldyBTcHJpdGUoYmdfc2t5LCAwLCAwLCAxLCAxLCAxKVxuXG59OyIsIlxuZXhwb3J0IGNvbnN0IEZQUyAgPSAyNDtcbmV4cG9ydCBjb25zdCBTVEVQID0gMS9GUFM7XG5leHBvcnQgY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5leHBvcnQgY29uc3QgTUVURVIgID0gMjQ7ICAgLy8gUGl4ZWxzIHBlciBtZXRlclxuZXhwb3J0IGNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9MRUZUID0gV0lEVEggKiAwLjI7IC8vIEhvdyBmYXIgZnJvbSB0aGUgbGVmdCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgUExBWUVSX1RPUCA9IEhFSUdIVCAqIDAuODsgLy8gSG93IGZhciBmcm9tIHRoZSB0b3AgdGhlIHBsYXllciB3aWxsIGFwcGVhclxuZXhwb3J0IGNvbnN0IEhPUklaT04gPSBIRUlHSFQgKiAxOyAvLyBBcHBhcnJlbnQgcG9zaXRpb24gb2YgdGhlIGhvcml6b24gb24gdGhlIHNjcmVlblxuZXhwb3J0IGNvbnN0IENBTUVSQV9ESVNUQU5DRSA9IDUwOyAvLyBEaXN0YW5jZSBpbiBtZXRlcnMgdGhhdCB0aGUgY2FtZXJhIGlzIGF3YXkgZm9ybSB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IENBTUVSQV9BTkdMRV9ERUcgPSA5MDtcbmV4cG9ydCBjb25zdCBGSUVMRF9PRl9WSUVXID0gMiAqIE1hdGguc2luKENBTUVSQV9BTkdMRV9ERUcgLyAyICogKE1hdGguUEkgLyAxODApKSAqIENBTUVSQV9ESVNUQU5DRSAvIE1hdGguc2luKCgxODAgLSA5MCAtIENBTUVSQV9BTkdMRV9ERUcgLyAyKSAqIChNYXRoLlBJIC8gMTgwKSk7IC8vIFZpc2libGUgYXJlYSBvbiB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IFJVTl9TVEFSVF9TUEVFRCA9IDEwICogTUVURVI7XG5leHBvcnQgY29uc3QgUlVOX01BWF9TUEVFRCA9IDIwMDsgLy8gbWV0ZXJzIHBlciBzZWNvbmQgKDEyLjQgbS9zIGlzIHRoZSB3b3JsZCByZWNvcmQpXG5leHBvcnQgY29uc3QgUlVOX1RJTUVfVE9fTUFYX1NQRUVEID0gNiAqIDYwO1xuZXhwb3J0IGNvbnN0IEdSQVZJVFkgPSAwKi05Ljg7IiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR3JvdW5kIGZyb20gJy4vZ3JvdW5kJztcbmltcG9ydCBUZXJyYWluIGZyb20gJy4vdGVycmFpbic7XG5pbXBvcnQgU2t5IGZyb20gJy4vc2t5JztcblxuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdHJlbmRlcmluZ0xheWVycyA9IFtdO1xuXHRzY2VuZXJ5ID0gW107XG5cdHBsYXllciA9IHt9O1xuXHRhc3NldHMgPSB7fTtcblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNYWluIEdhbWUgTG9vcFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XG5cdGZyYW1lSWQgPSAwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHRsZXQgc3RlcCA9IGNvbmZpZy5TVEVQO1xuXHRcdHRoaXMudCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLmR0ICs9IE1hdGgubWluKDEsICh0aGlzLnQgLSB0aGlzLnRwcmV2KSAvIDEwMDApO1xuXHRcdHdoaWxlKHRoaXMuZHQgPiBzdGVwKSB7XG5cdFx0XHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHRcdHRoaXMuZHQgLT0gc3RlcDtcblx0XHRcdHRoaXMudXBkYXRlKHN0ZXApO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBTZXR1cFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IGNvbmZpZy5XSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBjb25maWcuSEVJR0hUO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4ICAgICA9IHRoaXMub2ZmU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLm9uU2NyZWVuLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0ID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBjb25maWcuUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoXG5cdFx0XHRjb25maWcuUExBWUVSX0xFRlQsXG5cdFx0XHRjb25maWcuUExBWUVSX1RPUCxcblx0XHRcdGNvbmZpZy5DQU1FUkFfRElTVEFOQ0UsXG5cdFx0XHRudWxsLFxuXHRcdFx0bnVsbCxcblx0XHRcdHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSxcblx0XHRcdHRoaXMuZnJhbWVJZFxuXHRcdCk7XG5cblx0XHRsZXQgc2t5ID0gbmV3IFNreSh0aGlzLmFzc2V0c1snQkdfU0tZJ10pO1xuXHRcdGxldCBkaXN0YW50Q2xvdWRzID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04gLyAyLCA1MCAqIDEwMDAsIFt0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDAnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAxJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMiddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDMnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA0J10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNSddXSk7XG5cdFx0bGV0IG1vdW50YWluID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04sIDMwICogMTAwMCwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSk7XG5cdFx0bGV0IGNsb3VkcyA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OIC8gMiwgMTAgKiAxMDAwLCBbdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAwJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMSddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDInXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAzJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNCddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDUnXV0pO1xuXHRcdGxldCBoaWxsMSA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OLCAzICogMTAwMCwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKTtcblx0XHRsZXQgaGlsbDIgPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiwgMC41KjEwMDAsIFt0aGlzLmFzc2V0c1snQkdfSElMTCddXSk7XG5cdFx0bGV0IGdyb3VuZCA9IG5ldyBHcm91bmQoMCwgY29uZmlnLlBMQVlFUl9UT1AsIGNvbmZpZy5DQU1FUkFfRElTVEFOQ0UpO1xuXG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goc2t5KTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChkaXN0YW50Q2xvdWRzKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChtb3VudGFpbik7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goY2xvdWRzKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChoaWxsMSk7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goaGlsbDIpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGdyb3VuZCk7XG5cblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKHNreSk7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChkaXN0YW50Q2xvdWRzKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKG1vdW50YWluKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGNsb3Vkcyk7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChoaWxsMSk7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChoaWxsMik7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChncm91bmQpO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0Ly8gQmVnaW5zIHRoZSBtYWluIGdhbWUgbG9vcFxuXHRcdHRoaXMuZnJhbWVJZCA9IDA7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBVcGRhdGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0dXBkYXRlKGR0KSB7XG5cdFx0Ly8gVGhlIHBsYXllcidzIHBvc2l0aW9uIGRvZXNuJ3QgbW92ZSwgaW5zdGVhZCB0aGUgcGxheWVyIGNoYW5nZXMgdGhlIHN0YWdlRHggJiBzdGFnZUR5LFxuXHRcdC8vIHdoaWNoIHRoZW4gaXMgdXNlZCB0byB1cGRhdGUgYWxsIHRoZSBzY2VuZXJ5XG5cdFx0bGV0IHggPSB0aGlzLnBsYXllci54O1xuXHRcdGxldCB5ID0gdGhpcy5wbGF5ZXIueTtcblxuXHRcdHRoaXMucGxheWVyLnVwZGF0ZShkdCk7XG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkudXBkYXRlKGR0KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0Ly8gTWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYW5kIHRoZW5cblx0XHQvLyBDZW50ZXIgdGhlIHNjYWxlZCBpbWFnZSB2ZXJ0aWNhbGx5IG9uIHRoZSBzY3JlZW5cblx0XHRsZXQgdyA9IGN2cy53aWR0aDtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQ7XG5cdFx0bGV0IHggPSAwO1xuXHRcdGxldCB5ID0gKHRoaXMub2ZmU2NyZWVuLmhlaWdodCAtIGgpIC8gMjtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KTtcblxuXHRcdHRoaXMucmVuZGVyTGF5ZXJzKCk7XG5cblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC43NSknO1xuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgY3ZzLmhlaWdodCk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ2dvbGQnO1xuXHRcdFx0bGV0IGZvbnRTaXplID0gMzI7XG5cdFx0XHRsZXQgbGluZUhlaWdodCA9IGZvbnRTaXplICogMS4zMztcblx0XHRcdGxldCBsaW5lUG9zID0geTtcblx0XHRcdGN0eC5mb250ID0gZm9udFNpemUgKyAncHggc2Fucy1zZXJpZic7XG5cdFx0XHRjdHguZmlsbFRleHQoJ2ZyYW1lSWQ6ICcgKyB0aGlzLmZyYW1lSWQsIDAsIGxpbmVQb3MgKz0gbGluZUhlaWdodCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vblNjcmVlbkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHQpOztcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmRyYXdJbWFnZShcblx0XHRcdGN2cyxcblx0XHRcdHgsIHksIHcsIGgsXG5cdFx0XHQwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJMYXllcnMoKXtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIucmVuZGVyKHRoaXMuZnJhbWVJZCwgdGhpcy5vZmZTY3JlZW5DdHgpKTtcblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBTZXRQaWVjZSBmcm9tICcuL3NldHBpZWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kIGV4dGVuZHMgU2V0UGllY2Uge1xuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHope1xuXHRcdHN1cGVyKHgsIHksIHopXG5cdFx0dGhpcy5zZWdtZW50cyA9IFtdO1xuXHRcdHRoaXMudHlwZSA9ICdncm91bmQnO1xuXG5cdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogdGhpcy55LFxuXHRcdFx0Y3AxeDogMCxcblx0XHRcdGNwMXk6IHRoaXMueSxcblx0XHRcdGNwMng6IGNvbmZpZy5XSURUSCAqIDAuNSxcblx0XHRcdGNwMnk6IHRoaXMueSxcblx0XHRcdGVuZHg6IGNvbmZpZy5XSURUSCxcblx0XHRcdGVuZHk6IHRoaXMueVxuXHRcdH07XG5cdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0fVxuXG5cdGdlbmVyYXRlKCl7XG5cdFx0bGV0IGxhc3QgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoLTFdO1xuXHRcdHdoaWxlICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA8IDMpe1xuXHRcdFx0bGV0IHggPSBsYXN0LmVuZHg7XG5cdFx0XHRsZXQgeSA9IGxhc3QuZW5keTtcblx0XHRcdGxldCBjcDF4ID0geCArICh4IC0gbGFzdC5jcDJ4KTtcblx0XHRcdGxldCBjcDF5ID0geSArICh5IC0gbGFzdC5jcDJ5KTtcblx0XHRcdGxldCBlbmR4ID0geCArIGNvbmZpZy5XSURUSCAqIDI7XG5cdFx0XHRsZXQgZW5keSA9IHkgKyBjb25maWcuSEVJR0hUICogbm9ybWFsX3JhbmRvbSgpIC8gMztcblxuXHRcdFx0bGV0IHZhcmlhbmNlID0gKGNvbmZpZy5XSURUSCAqIDAuMjUpICsgKGNvbmZpZy5XSURUSCAqIDAuMSkgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0XHRsZXQgY3AyeCA9IGVuZHggLSB2YXJpYW5jZTtcblx0XHRcdGxldCBjcDJ5ID0gZW5keSAtIHZhcmlhbmNlICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdFx0eDogeCxcblx0XHRcdFx0eTogeSxcblx0XHRcdFx0Y3AxeDogY3AxeCxcblx0XHRcdFx0Y3AxeTogY3AxeSxcblx0XHRcdFx0Y3AyeDogY3AyeCxcblx0XHRcdFx0Y3AyeTogY3AyeSxcblx0XHRcdFx0ZW5keDogZW5keCxcblx0XHRcdFx0ZW5keTogZW5keVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRcdGxhc3QgPSBzZWdtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0XHRpZiAoc2VnbWVudC5lbmR4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2VnbWVudHMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGxldCBpID0gMDtcblx0XHRsZXQgcyA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0d2hpbGUgKHMpe1xuXHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0Y3R4Lm1vdmVUbyhzLngsIHMueSk7XG5cdFx0XHRjdHguYmV6aWVyQ3VydmVUbyhzLmNwMXgsIHMuY3AxeSwgcy5jcDJ4LCBzLmNwMnksIHMuZW5keCwgcy5lbmR5KTtcblx0XHRcdGN0eC5saW5lVG8ocy5lbmR4LCBzLmVuZHkgKyBjb25maWcuSEVJR0hUKTtcblx0XHRcdGN0eC5saW5lVG8ocy54LCBzLmVuZHkgKyBjb25maWcuSEVJR0hUKTtcblx0XHRcdGN0eC5saW5lVG8ocy54LCBzLnkpO1xuXHRcdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdFx0Y3R4LnN0cm9rZVN0eWxlID0gJyNhMzhlNzUnO1xuXHRcdFx0bGV0IGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChzLngsIHMueSArIGNvbmZpZy5IRUlHSFQsIHMuZW5keCwgcy5lbmR5ICsgY29uZmlnLkhFSUdIVCk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuMCwgJyNhMzhlNzUnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC4xLCAnI2I4YTQ4ZicpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjIsICcjYTM4ZTc1Jyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuMywgJyNiOGE0OGYnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC40LCAnI2EzOGU3NScpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjUsICcjYjhhNDhmJyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuNiwgJyNhMzhlNzUnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC43LCAnI2I4YTQ4ZicpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjgsICcjYTM4ZTc1Jyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuOSwgJyNiOGE0OGYnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMS4wLCAnI2EzOGU3NScpO1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGdyZDtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHRcdGN0eC5maWxsKCk7XG5cdFx0XHRzID0gdGhpcy5zZWdtZW50c1srK2ldO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly8gTW92ZW1lbnQgcmVsYXRpdmUgdG8gdGhlIHN0YWdlXG5cdFx0Ly8gQ2FsY3VsYXRlIHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBwbGFuZSBiYXNlZCBvbiBpdHMgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhXG5cdFx0Ly8gQW5kIHRoZW4gd2UgbW92ZSBpdCBhIGZyYWN0aW9uIG9mIHRoZSBhbW91bnQgdGhlIHBsYXllcidzIHBsYW5lIG1vdmVzXG5cdFx0c3VwZXIudXBkYXRlKGR0KTtcblx0XHRsZXQgZHggPSB0aGlzLmR4ICogZHQ7XG5cdFx0bGV0IGR5ID0gdGhpcy5keSAqIGR0O1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHRcdHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24oKTtcblx0fVxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMnXG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLCBhc3NldHMpO1xuXG5cbiFmdW5jdGlvbiB3YWl0Rm9yQ29udGVudCgpe1xuXHQvLyBXYWl0IGZvciBjb250ZW50IHRvIGJlIHJldHJlaXZlZCBieSB0aGUgYnJvd3NlclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG5cdFx0Ly8gVE9ETy4uLlxuXHR9KTtcbn0oKVxuLnRoZW4oZ2FtZS5zdGFydCk7XG5cbi8vZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7ZWFzZU91dFF1YWRUd2Vlbn0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIFNjZW5lcnkge1xuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpe1xuXHRcdHN1cGVyKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCk7XG5cdFx0dGhpcy50eXBlID0gJ3BsYXllcic7XG5cdFx0dGhpcy5lbGFwc2VkVGltZSA9IDA7XG5cdH1cblxuXHR1cGRhdGUoZHQpe1xuXHRcdHRoaXMuZWxhcHNlZFRpbWUgKz0gZHQ7XG5cdFx0bGV0IHQsIGIsIGMsIGQsIGR4LCBkZHk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuZWxhcHNlZFRpbWUgPj0gY29uZmlnLlJVTl9USU1FX1RPX01BWF9TUEVFRCkge1xuXHRcdFx0Ly8gTm8gY2hhbmdlIHRvIHN0YWdlRHhcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gUmFtcGluZyB1cCBzcGVlZFxuXHRcdFx0dCA9IHRoaXMuZWxhcHNlZFRpbWU7Ly8gdDogY3VycmVudCB0aW1lXG5cdFx0XHRiID0gLWNvbmZpZy5SVU5fU1RBUlRfU1BFRUQ7Ly8gYjogc3RhcnQgdmFsdWVcblx0XHRcdGMgPSAtY29uZmlnLlJVTl9NQVhfU1BFRUQgKiBjb25maWcuTUVURVI7Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdFx0XHRkID0gY29uZmlnLlJVTl9USU1FX1RPX01BWF9TUEVFRDsvLyBkOiBkdXJhaXRvblxuXHRcdFx0ZHggPSBlYXNlT3V0UXVhZFR3ZWVuKHQsIGIsIGMsIGQpOyAvLyBUaGUgcmF0ZSB0aGF0IHBsYXllciBpcyBtb3ZpbmcgZm9yd2FyZFxuXHRcdFx0dGhpcy5zdGFnZUR4ID0gZHg7XG5cdFx0fVxuXHRcdFxuXHRcdGRkeSA9IGNvbmZpZy5HUkFWSVRZO1xuXHRcdHRoaXMuc3RhZ2VEeSArPSBkdCAqIGRkeTtcblx0fVxufSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVyeSBleHRlbmRzIFNldFBpZWNlIHtcblxuXHQvLyBTY2VuZXJ5IGFyZSBzZXQgcGllY2VzIHRoYXQgaGF2ZSBhbmltYXRlZCBzcHJpdGVzXG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKXtcblx0XHRzdXBlcih4LCB5LCB6KTtcblxuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMudyA9IHdpZHRoICB8fCB0aGlzLnNwcml0ZS5zd3wwO1xuXHRcdHRoaXMuaCA9IGhlaWdodCB8fCB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHR0aGlzLnR5cGUgPSAnc2NlbmVyeSc7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueS10aGlzLmgsIHRoaXMudywgdGhpcy5oKTtcblxuXHRcdC8vIGFkZCBsaW5lYXIgZ3JhZGllbnQgZm9yIGF0bW9zcGhlcmljIGZhZGluZ1xuXHRcdGN0eC5yZWN0KDAsIDAsIGNvbmZpZy5XSURUSCwgY29uZmlnLkhFSUdIVCk7XG5cdFx0bGV0IGRlbnNpdHkgPSBNYXRoLmF0YW4oTWF0aC5sb2coTWF0aC5sb2codGhpcy56KSkpL01hdGguUEk7XG5cdFx0bGV0IGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjb25maWcuSEVJR0hUKTtcblx0XHRncmQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoMTcxLCAyMDYsIDIyNywgJyArIChkZW5zaXR5ICogMC4wMSkgKyAnKScpOyAvLyBMaWdodCBibHVlaXNoXG5cdFx0Z3JkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgxMTcsIDE0NiwgMTYzLCAnICsgKGRlbnNpdHkgKiAwLjUwKSArICcpJyk7IC8vIExpZ2h0IGJsdWVpc2gtZ3JheVxuXHRcdGN0eC5maWxsU3R5bGUgPSBncmQ7XG5cdFx0Y3R4LmZpbGwoKTtcblx0fVxuXG59IiwiLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlLCBhbmQgY2FtZXJhIHN0dWZmIHRvIGEgY2FtZXJhIG9iamVjdFxuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IHZhciBzdGFnZUR4ID0gMDtcbmV4cG9ydCB2YXIgc3RhZ2VEeSA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldFBpZWNlIHtcblx0XG5cdC8vIEFsbCBzZXQgcGllY2VzIG1vdmUgdG9nZXRoZXIgaW4gcmVzcG9uc2UgdG8gdGhlIHBsYXllcidzIG1vdmVtZW50XG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeil7XG5cdFx0aWYgKG5ldy50YXJnZXQgPT09IFNldFBpZWNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY3JlYXRlIGluc3RhbmNlcyBvZiBhYnN0cmFjdCBjbGFzcyBTZXRQaWVjZScpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucmVuZGVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IG92ZXJyaWRlIHJlbmRlciBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdHRoaXMueCA9IHh8fDA7XG5cdFx0dGhpcy55ID0geXx8MDtcblx0XHR0aGlzLnogPSB6fHwwO1xuXHR9XG5cblx0Ly8gcmVuZGVyIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGJ5IGNoaWxkIGNsYXNzZXNcblxuXHR1cGRhdGUoZHQpe1xuXHRcdC8vIE1vdmVtZW50IHJlbGF0aXZlIHRvIHRoZSBzdGFnZVxuXHRcdC8vIENhbGN1bGF0ZSB0aGUgZmllbGQgb2YgdmlldyBvZiB0aGUgcGxhbmUgYmFzZWQgb24gaXRzIGRpc3RhbmNlIGZyb20gdGhlIGNhbWVyYVxuXHRcdC8vIEFuZCB0aGVuIHdlIG1vdmUgaXQgYSBmcmFjdGlvbiBvZiB0aGUgYW1vdW50IHRoZSBwbGF5ZXIncyBwbGFuZSBtb3Zlc1xuXHRcdGxldCB6RmllbGRPZlZpZXcgPSAoMiAqIE1hdGguc2luKGNvbmZpZy5DQU1FUkFfQU5HTEVfREVHIC8gMiAqIChNYXRoLlBJIC8gMTgwKSkgKiB0aGlzLnogLyBNYXRoLnNpbigoMTgwIC0gOTAgLSBjb25maWcuQ0FNRVJBX0FOR0xFX0RFRyAvIDIpICogKE1hdGguUEkgLyAxODApKSk7XG5cdFx0bGV0IHpGYWN0b3IgPSBjb25maWcuRklFTERfT0ZfVklFVyAvIHpGaWVsZE9mVmlldztcblx0XHR0aGlzLmR4ID0gdGhpcy5zdGFnZUR4ICogekZhY3Rvcjtcblx0XHR0aGlzLmR5ID0gdGhpcy5zdGFnZUR5ICogekZhY3Rvcjtcblx0XHR0aGlzLnggKz0gdGhpcy5keCAqIGR0O1xuXHRcdHRoaXMueSArPSB0aGlzLmR5ICogZHQ7XG5cdH1cblxuXHRzZXQgc3RhZ2VEeCAoZHgpe1xuXHRcdHN0YWdlRHggPSBkeDtcblx0fVxuXG5cdGdldCBzdGFnZUR4ICgpe1xuXHRcdHJldHVybiBzdGFnZUR4O1xuXHR9XG5cblx0c2V0IHN0YWdlRHkgKGR5KXtcblx0XHRzdGFnZUR5ID0gZHk7XG5cdH1cblxuXHRnZXQgc3RhZ2VEeSAoKXtcblx0XHRyZXR1cm4gc3RhZ2VEeTtcblx0fVxufSIsImltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa3kgZXh0ZW5kcyBTY2VuZXJ5IHtcblxuXHRjb25zdHJ1Y3RvcihzcHJpdGUpe1xuXHRcdHN1cGVyKDAsIDAsIDAsIFdJRFRILCBIRUlHSFQsIHNwcml0ZSwgMClcblx0XHR0aGlzLnR5cGUgPSAnc2t5Jztcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKTtcblx0fVxuXHRcblx0dXBkYXRlKCl7XG5cdFx0Ly8gbm9wXG5cdH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XG5cdC8vIFNwcml0ZXMgZGVmaW5lIGEgc2VyaWVzIG9mIGtleWZyYW1lIGFuaW1hdGlvbnNcblx0XG5cdGtleUZyYW1lcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yIChpbWFnZSwgc3gsIHN5LCBzdywgc2gsIG51bUtleUZyYW1lcykge1xuXHRcdHRoaXMuaW1hZ2UgPSBpbWFnZTtcblx0XHR0aGlzLnN4ID0gc3h8MDtcblx0XHR0aGlzLnN5ID0gc3l8MDtcblx0XHR0aGlzLnN3ID0gc3d8MDtcblx0XHR0aGlzLnNoID0gc2h8MDtcblx0XHR0aGlzLm51bUtleUZyYW1lcyA9IE1hdGgubWF4KG51bUtleUZyYW1lc3wwLCAxKTtcblxuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMubnVtS2V5RnJhbWVzOyArK2kpe1xuXHRcdFx0bGV0IGtleUZyYW1lID0ge1xuXHRcdFx0XHRpbWFnZTogdGhpcy5pbWFnZSxcblx0XHRcdFx0c3g6IHRoaXMuc3ggKyB0aGlzLnN3ICogaSxcblx0XHRcdFx0c3k6IHRoaXMuc3ksXG5cdFx0XHRcdHN3OiB0aGlzLnN3LFxuXHRcdFx0XHRzaDogdGhpcy5zaFxuXHRcdFx0fTtcblx0XHRcdHRoaXMua2V5RnJhbWVzLnB1c2goa2V5RnJhbWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0cmV0dXJuIHRoaXMua2V5RnJhbWVzW2ZyYW1lSWQgJSB0aGlzLm51bUtleUZyYW1lc107XG5cdH1cbn1cbiIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9zY2VuZXJ5JztcbmltcG9ydCBTZXRQaWVjZSwge3N0YWdlRHgsIHN0YWdlRHl9IGZyb20gJy4vc2V0cGllY2UnO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIGV4dGVuZHMgU2V0UGllY2V7XG5cblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCBzcHJpdGVzKXtcblx0XHRzdXBlcih4LCB5LCB6KVxuXHRcdHRoaXMuc2NlbmVyeSA9IFtdO1xuXHRcdHRoaXMuc3ByaXRlcyA9IHNwcml0ZXMgfHwgW107XG5cdFx0dGhpcy50eXBlID0gJ3RlcnJhaW4nO1xuXHRcdHRoaXMuZ2VuZXJhdGUoLWNvbmZpZy5XSURUSCk7XG5cdH1cblxuXHRjcmVhdGVTY2VuZXJ5KHhvZmZzZXQpe1xuXHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRsZXQgeCA9IHhvZmZzZXQgKyBzcHJpdGUuc3cgKiAwLjc1ICsgc3ByaXRlLnN3IC8gMiAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRsZXQgeSA9IHRoaXMueTtcblx0XHRsZXQgeiA9IHRoaXMuejtcblx0XHRsZXQgdyA9IHNwcml0ZS5zdztcblx0XHRsZXQgaCA9IHNwcml0ZS5zaDtcblx0XHRsZXQgZnJhbWVJZCA9IDA7XG5cblx0XHRsZXQgc2NlbmVyeSA9IG5ldyBTY2VuZXJ5KHgsIHksIHosIHcsIGgsIHNwcml0ZSwgZnJhbWVJZClcblx0XHR0aGlzLnNjZW5lcnkucHVzaChzY2VuZXJ5KTtcblx0XHRyZXR1cm4geCArIHNwcml0ZS5zdzsgLy8gUmV0dXJuIHRoZSBhbW91bnQgb2Ygb2Zmc2V0XHRcdFxuXHR9XG5cblx0Z2VuZXJhdGUoeG9mZnNldCl7XG5cdFx0Ly8gQWRkIG1vcmUgc2NlbmVyeSB1bnRpbCB3ZSBhcmUgYmV5b25kIHRoZSBlZGdlIG9mIHRoZSBzY3JlZW4gKyBkaXN0YW5jZSBzY2VuZSBkeFxuXHRcdGlmICghdGhpcy5zcHJpdGVzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0aWYgKCF4b2Zmc2V0KVxuXHRcdFx0eG9mZnNldCA9IHRoaXMuc2NlbmVyeS5yZWR1Y2UoKHgsIHMpID0+IE1hdGgubWF4KHgsIHMueCArIHMudyksIDApO1xuXHRcdHdoaWxlKHhvZmZzZXQgPCBjb25maWcuV0lEVEggKiAyICsgdGhpcy5zdGFnZUR4KXtcblx0XHRcdHhvZmZzZXQgPSB0aGlzLmNyZWF0ZVNjZW5lcnkoeG9mZnNldCk7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRsZXQgeG9mZnNldCA9IDA7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zY2VuZXJ5Lmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBzY2VuZXJ5ID0gdGhpcy5zY2VuZXJ5W2ldO1xuXHRcdFx0bGV0IHggPSBzY2VuZXJ5LnggKyBzY2VuZXJ5Lnc7XG5cdFx0XHRpZiAoeCA8IDApe1xuXHRcdFx0XHR0aGlzLnNjZW5lcnkuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NvbGxlY3RpbmcgZ2FyYmFnZScpO1xuXHRcdFx0fVxuXHRcdFx0eG9mZnNldCA9IE1hdGgubWF4KHhvZmZzZXQsIHgpO1xuXHRcdH1cblx0XHR0aGlzLmdlbmVyYXRlKHhvZmZzZXQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkucmVuZGVyKGZyYW1lSWQsIGN0eCkpO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHQvL3N1cGVyLnVwZGF0ZShkdCk7XG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkudXBkYXRlKGR0KSlcblx0XHR0aGlzLmdhcmJhZ2VDb2xsZWN0aW9uKCk7XG5cdH1cbn0iLCJmdW5jdGlvbiBhc20oc3RkbGliLCBmb3JlaWduLCBidWZmZXIpe1xuXHQndXNlIGFzbSc7XG5cblx0dmFyIGV4cCA9IHN0ZGxpYi5NYXRoLmV4cDtcblx0dmFyIGxvZyA9IHN0ZGxpYi5NYXRoLmxvZztcblx0dmFyIHNxcnQgPSBzdGRsaWIuTWF0aC5zcXJ0O1xuXHR2YXIgcG93ID0gc3RkbGliLk1hdGgucG93O1xuXHR2YXIgYWJzID0gc3RkbGliLk1hdGguYWJzO1xuXHR2YXIgYWNvcyA9IHN0ZGxpYi5NYXRoLmFjb3M7XG5cdHZhciBjb3MgPSBzdGRsaWIuTWF0aC5jb3M7XG5cdHZhciBQSSA9IHN0ZGxpYi5NYXRoLlBJO1xuXG5cdHZhciBoZWFwNjQgPSBuZXcgc3RkbGliLkZsb2F0NjRBcnJheShidWZmZXIpO1xuXHR2YXIgaGVhcDMyID0gbmV3IHN0ZGxpYi5JbnQzMkFycmF5KGJ1ZmZlcik7XG5cdHZhciBoZWFwXyRiYXNlID0gMDtcblx0dmFyIGhlYXBfQkxPQ0tfU0laRSA9IDQgPDwgMjsgLy8gJHByZXYsICRuZXh0LCBpc0ZyZWUsIGxlbmd0aFxuXHR2YXIgX3ByZXYgPSAwIDw8IDI7XG5cdHZhciBfbmV4dCA9IDEgPDwgMjtcblx0dmFyIF9mcmVlID0gMiA8PCAyO1xuXHR2YXIgX3NpemUgPSAzIDw8IDI7XG5cdHZhciBfZGF0YSA9IDQgPDwgMjtcblxuXHRoZWFwMzJbKGhlYXBfJGJhc2UgKyBfcHJldikgPj4gMl0gPSAtMTtcblx0aGVhcDMyWyhoZWFwXyRiYXNlICsgX25leHQpID4+IDJdID0gLTE7XG5cdGhlYXAzMlsoaGVhcF8kYmFzZSArIF9mcmVlKSA+PiAyXSA9ICAxO1xuXHRoZWFwMzJbKGhlYXBfJGJhc2UgKyBfc2l6ZSkgPj4gMl0gPSBoZWFwLmxlbmd0aCAtIGhlYXBfQkxPQ0tfU0laRTtcblxuXHQvLyBUd2VlbiBmdW5jdGlvbiBwYXJhbWV0ZXJzXG5cdC8vIHQ6IGN1cnJlbnQgdGltZVxuXHQvLyBiOiBzdGFydCB2YWx1ZVxuXHQvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0Ly8gZDogZHVyYXRpb25cblxuXHRmdW5jdGlvbiBsaW5lYXJUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHJldHVybiArKGMqdC9kICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5RdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKGMqdCp0ICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKygtYyp0Kih0LTIpICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5PdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0IC89IGQvMjtcblx0XHRpZiAodCA8IDEpIHJldHVybiArKGMvMip0KnQgKyBiKTtcblx0XHQtLXQ7XG5cdFx0cmV0dXJuICsoLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiKTtcblx0fVxuXG5cdC8qY29tcHV0ZXMgaW50ZXJzZWN0aW9uIGJldHdlZW4gYSBjdWJpYyBzcGxpbmUgYW5kIGEgbGluZSBzZWdtZW50Ki9cblx0ZnVuY3Rpb24gY29tcHV0ZUludGVyc2VjdGlvbnMocHgscHksbHgsbHkpIHtcblx0XHR2YXIgWD1BcnJheSgpO1xuXG5cdFx0dmFyIEE9bHlbMV0tbHlbMF07XHQgICAgLy9BPXkyLXkxXG5cdFx0dmFyIEI9bHhbMF0tbHhbMV07XHQgICAgLy9CPXgxLXgyXG5cdFx0dmFyIEM9bHhbMF0qKGx5WzBdLWx5WzFdKSArIFxuXHRcdGx5WzBdKihseFsxXS1seFswXSk7XHQvL0M9eDEqKHkxLXkyKSt5MSooeDIteDEpXG5cblx0XHR2YXIgYnggPSBiZXppZXJDb2VmZnMocHhbMF0scHhbMV0scHhbMl0scHhbM10pO1xuXHRcdHZhciBieSA9IGJlemllckNvZWZmcyhweVswXSxweVsxXSxweVsyXSxweVszXSk7XG5cblx0XHR2YXIgUCA9IEFycmF5KCk7XG5cdFx0UFswXSA9IEEqYnhbMF0rQipieVswXTtcdFx0Lyp0XjMqL1xuXHRcdFBbMV0gPSBBKmJ4WzFdK0IqYnlbMV07XHRcdC8qdF4yKi9cblx0XHRQWzJdID0gQSpieFsyXStCKmJ5WzJdO1x0XHQvKnQqL1xuXHRcdFBbM10gPSBBKmJ4WzNdK0IqYnlbM10gKyBDO1x0LyoxKi9cblxuXHRcdHZhciByPWN1YmljUm9vdHMoUCk7XG5cblx0XHQvKnZlcmlmeSB0aGUgcm9vdHMgYXJlIGluIGJvdW5kcyBvZiB0aGUgbGluZWFyIHNlZ21lbnQqL1xuXHRcdGZvciAodmFyIGk9MDtpPDM7aSsrKVxuXHRcdHtcblx0XHR0PXJbaV07XG5cblx0XHRYWzBdPWJ4WzBdKnQqdCp0K2J4WzFdKnQqdCtieFsyXSp0K2J4WzNdO1xuXHRcdFhbMV09YnlbMF0qdCp0KnQrYnlbMV0qdCp0K2J5WzJdKnQrYnlbM107ICAgICAgICAgICAgXG5cblx0XHQvKmFib3ZlIGlzIGludGVyc2VjdGlvbiBwb2ludCBhc3N1bWluZyBpbmZpbml0ZWx5IGxvbmcgbGluZSBzZWdtZW50LFxuXHRcdG1ha2Ugc3VyZSB3ZSBhcmUgYWxzbyBpbiBib3VuZHMgb2YgdGhlIGxpbmUqL1xuXHRcdHZhciBzO1xuXHRcdGlmICgobHhbMV0tbHhbMF0pIT0wKSAgICAgICAgICAgLyppZiBub3QgdmVydGljYWwgbGluZSovXG5cdFx0cz0oWFswXS1seFswXSkvKGx4WzFdLWx4WzBdKTtcblx0XHRlbHNlXG5cdFx0cz0oWFsxXS1seVswXSkvKGx5WzFdLWx5WzBdKTtcblxuXHRcdC8qaW4gYm91bmRzPyovICAgIFxuXHRcdGlmICh0PDAgfHwgdD4xLjAgfHwgczwwIHx8IHM+MS4wKVxuXHRcdHtcblx0XHRYWzBdPS0xMDA7ICAvKm1vdmUgb2ZmIHNjcmVlbiovXG5cdFx0WFsxXT0tMTAwO1xuXHRcdH1cblxuXHRcdC8qbW92ZSBpbnRlcnNlY3Rpb24gcG9pbnQqL1xuXHRcdElbaV0uc2V0QXR0cmlidXRlTlMobnVsbCxcImN4XCIsWFswXSk7XG5cdFx0SVtpXS5zZXRBdHRyaWJ1dGVOUyhudWxsLFwiY3lcIixYWzFdKTtcblx0XHR9XG5cdH1cblxuXHQvKiBiYXNlZCBvbiBodHRwOi8vbXlzaXRlLnZlcml6b24ubmV0L3JlczE0OGg0ai9qYXZhc2NyaXB0L3NjcmlwdF9leGFjdF9jdWJpYy5odG1sI3RoZSUyMHNvdXJjZSUyMGNvZGUgKi9cblx0ZnVuY3Rpb24gY3ViaWNSb290cyhQKXtcblx0fVxuXG5cdFxuXHRmdW5jdGlvbiBiZXppZXJDb2VmZnMoUDAsUDEsUDIsUDMpe1xuXHRcdFAwID0gK1AwO1xuXHRcdFAxID0gK1AxO1xuXHRcdFAyID0gK1AyO1xuXHRcdFAzID0gK1AzO1xuXHRcdHZhciAkWiA9IGFsbG9jKDQpO1xuXHRcdGhlYXA2NFsoJFogKyAoMCA8PCAzKSkgPj4gM10gPSArKC1QMCArIDMuMCpQMSArIC0zLjAqUDIgKyBQMyk7IFxuXHRcdGhlYXA2NFsoJFogKyAoMSA8PCAzKSkgPj4gM10gPSArKDMuMCpQMCAtIDYuMCpQMSArIDMuMCpQMik7XG5cdFx0aGVhcDY0WygkWiArICgyIDw8IDMpKSA+PiAzXSA9ICsoLTMuMCpQMCArIDMuMCpQMSk7XG5cdFx0aGVhcDY0WygkWiArICgzIDw8IDMpKSA+PiAzXSA9ICsoUDApO1xuXHRcdHJldHVybiBaO1xuXHR9XG5cblx0Lyogc29ydHMgJGFycmF5IGluIHBsYWNlLCBhc2NlbmRpbmcsIGV4Y2VwdCBuZWdhdGl2ZSB2YWx1ZXMgYXJlIG1vdmVkIHRvIHRoZSBlbmQuICovXG5cdGZ1bmN0aW9uIHNvcnRTcGVjaWFsKCRhcnJheSwgbGVuZ3RoKSB7XG5cdFx0JGFycmF5ID0gJGFycmF5fDA7XG5cdFx0bGVuZ3RoID0gbGVuZ3RofDA7XG5cdFx0dmFyIGZsaXAgPSAwO1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgJGEgPSAwO1xuXHRcdHZhciAkYiA9IDA7XG5cdFx0dmFyIGEgPSAwLjA7XG5cdFx0dmFyIGIgPSAwLjA7XG5cdFx0dmFyIGxpbWl0ID0gMDtcblx0XHRsaW1pdCA9IChsZW5ndGggLSAxKXwwO1xuXG5cdFx0ZG8ge1xuXHRcdFx0ZmxpcCA9IDA7XG5cdFx0XHRmb3IgKGk9MDsgaTxsaW1pdDsgaT0oaSsxKXwwKSB7XG5cdFx0XHRcdCRhID0gKChpIDw8IDMpICsgJGFycmF5KXwwO1xuXHRcdFx0XHQkYiA9ICgoKGkgKyAxKSA8PCAzKSArICRhcnJheSl8MDtcblx0XHRcdFx0YSA9ICtoZWFwNjRbJGEgPj4gM107XG5cdFx0XHRcdGIgPSAraGVhcDY0WyRiID4+IDNdO1xuXG5cdFx0XHRcdGlmICgoYiA+PSAwICYmIGEgPiBiKSB8fCAoYSA8IDAgJiYgYiA+PSAwKSkge1xuXHRcdFx0XHRcdGZsaXAgPSAxO1xuXHRcdFx0XHRcdGhlYXA2NFskYSA+PiAzXSA9ICtiO1xuXHRcdFx0XHRcdGhlYXA2NFskYiA+PiAzXSA9ICthO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSB3aGlsZSAoZmxpcCA9PT0gMSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdFxuXG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gSGVhcCBtYW5hZ2VtZW50XG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cblx0ZnVuY3Rpb24gYWxsb2MobGVuZ3RoKXtcblx0XHQvLyBBbGxvY2F0ZXMgYSBibG9jayBvZiBzcGFjZSBvbiB0aGUgaGVhcFxuXHRcdGxlbmd0aCA9IGxlbmd0aHwwO1xuXHRcdHZhciAkYmxvY2sgPSAwO1xuXHRcdHZhciAkZGF0YSA9IDA7XG5cblx0XHQkYmxvY2sgPSBoZWFwX2ZpbmRGaXJzdEZyZWVCbG9jayhsZW5ndGgpfDA7XG5cblx0XHRpZiAoJGJsb2NrID4gLTEpIHtcblx0XHRcdGhlYXBfc3BsaXRCbG9jaygkYmxvY2ssIGxlbmd0aCk7XG5cdFx0XHRoZWFwMzJbKCRibG9jayArIF9mcmVlKSA+PiAyXSA9IDA7XG5cdFx0fVxuXHRcdCRkYXRhID0gKCRibG9jayArIF9kYXRhKXwwO1xuXHRcdHJldHVybiAkZGF0YTtcblx0fVxuXG5cdGZ1bmN0aW9uIGZyZWUoJGRhdGEpe1xuXHRcdCRkYXRhID0gJGRhdGF8MDtcblx0XHR2YXIgJGJsb2NrID0gMDtcblxuXHRcdCRibG9jayA9ICgkZGF0YSAtIF9kYXRhKXwwO1xuXHRcdGhlYXAzMlsoJGJsb2NrICsgX2ZyZWUpID4+IDJdID0gMTsgLy8gaXNGcmVlP1xuXHRcdGhlYXBfZnVzaW9uKCRibG9jayk7XG5cdH1cblxuXHRmdW5jdGlvbiBoZWFwX2ZpbmRGaXJzdEZyZWVCbG9jayhsZW5ndGgpe1xuXHRcdC8vIFJldHVybnMgYWRkcmVzcyBvZiBsYXJnZSBlbm91Z2ggZGF0YSBibG9jayBvciAtMSBpZiBub25lLlxuXHRcdGxlbmd0aCA9IGxlbmd0aHwwO1xuXHRcdHZhciBsZW4gPSAwO1xuXHRcdHZhciAkYmxvY2sgPSAwO1xuXHRcdGxlbiA9IGxlbmd0aCA8PCAzOyAvLyBGbG9hdDY0IGRhdGEgYmxvY2tzICg4IGJ5dGVzKVxuXHRcdCRibG9jayA9IGhlYXBfJGJhc2V8MDtcblx0XHR3aGlsZSAoJGJsb2NrICE9PSAtMSAmJiAhKFxuXHRcdFx0aGVhcDMyWygkYmxvY2sgKyBfZnJlZSkgPj4gMl18MCAvLyBpc0ZyZWU/XG5cdFx0XHQmJiBsZW4gPD0gaGVhcDMyWygkYmxvY2sgKyBfc2l6ZSkgPj4gMl18MCAvLyBsZW5ndGhcblx0XHQpKSB7XG5cdFx0XHQkYmxvY2sgPSBoZWFwMzJbKCRibG9jayArIF9uZXh0KSA+PiAyXXwwOyAvLyAkbmV4dFxuXHRcdH0gXG5cdFx0cmV0dXJuICRibG9ja3wwO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGVhcF9zcGxpdEJsb2NrKCRibG9jaywgbGVuZ3RoKXtcblx0XHQvLyBTcGxpdHMgYSBibG9jayBpbnRvIHR3byBwYXJ0cyBhdCB0aGUgc3BlY2lmaWVkIGxlbmd0aFxuXHRcdCRibG9jayA9ICRibG9ja3wwO1xuXHRcdGxlbmd0aCA9IGxlbmd0aHwwO1xuXHRcdHZhciAkbmV3ID0gMDtcblx0XHR2YXIgbGVuID0gMDtcblxuXHRcdCRuZXcgPSAkYmxvY2sgKyBoZWFwX0JMT0NLX1NJWkUgKyBsZW5ndGg7XG5cdFx0bGVuID0gbGVuZ3RoIDw8IDM7IC8vIEZsb2F0NjQgZGF0YSBibG9ja3MgKDggYnl0ZXMpXG5cblx0XHRoZWFwMzJbKCRuZXcgKyBfcHJldikgPj4gMl0gPSAkYmxvY2t8MDsgLy8gJHByZXZcblx0XHRoZWFwMzJbKCRuZXcgKyBfbmV4dCkgPj4gMl0gPSBoZWFwMzJbKCRibG9jayArIF9uZXh0KSA+PiAyXXwwOyAvLyAkbmV4dFxuXHRcdGhlYXAzMlsoJG5ldyArIF9mcmVlKSA+PiAyXSA9IDE7IC8vIGlzRnJlZT9cblx0XHRoZWFwMzJbKCRuZXcgKyBfc2l6ZSkgPj4gMl0gPSBoZWFwMzJbKCRibG9jayArIF9zaXplKSA+PiAyXXwwIC0gbGVuIC0gaGVhcF9CTE9DS19TSVpFOyAvLyBsZW5ndGhcblx0XHRoZWFwMzJbKCRibG9jayArIF9uZXh0KSA+PiAyXSA9ICRuZXc7IC8vICRuZXh0XG5cdFx0aGVhcDMyWygkYmxvY2sgKyBfc2l6ZSkgPj4gMl0gPSBsZW47XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gaGVhcF9mdXNpb24oJGJsb2NrKXtcblx0XHQvLyBNZXJnZXMgbmVpZ2hib3JpbmcgZnJlZSBibG9ja3Ncblx0XHQkYmxvY2sgPSAkYmxvY2t8MDtcblx0XHR2YXIgJG5leHQgPSAwO1xuXHRcdHZhciAkcHJldiA9IDA7XG5cblx0XHQkbmV4dCA9IGhlYXAzMlsoJGJsb2NrICsgX25leHQpID4+IDJdfDA7XG5cdFx0JHByZXYgPSBoZWFwMzJbKCRibG9jayArIF9wcmV2KSA+PiAyXXwwO1xuXG5cdFx0aWYgKCRuZXh0ID4gLTEgJiYgaGVhcDMyWygkbmV4dCArIF9mcmVlKSA+PiAyXXwwICE9PSAwKSB7XG5cdFx0XHRoZWFwMzJbKCRibG9jayArIF9uZXh0KSA+PiAyXSA9IGhlYXAzMlsoJG5leHQgKyBfbmV4dCkgPj4gMl18MDtcblx0XHRcdGhlYXAzMlsoJGJsb2NrICsgX3NpemUpID4+IDJdID0gaGVhcDMyWygkYmxvY2sgKyBfc2l6ZSkgPj4gMl18MCArIGhlYXAzMlsoJG5leHQgKyBfc2l6ZSkgPj4gMl18MCArIGhlYXBfQkxPQ0tfU0laRTtcblx0XHR9XG5cdFx0aWYgKCRwcmV2ID4gLTEgJiYgaGVhcDMyWygkcHJldiArIF9mcmVlKSA+PiAyXXwwICE9PSAwKSB7XG5cdFx0XHQkYmxvY2sgPSBoZWFwX2Z1c2lvbigkYmxvY2spfDA7XG5cdFx0fVxuXHRcdHJldHVybiAkYmxvY2t8MDtcblx0fVxuXG5cblxuXG5cblxuXG5cdHJldHVybiB7XG5cdFx0bGluZWFyVHdlZW46IGxpbmVhclR3ZWVuLFxuXHRcdGVhc2VJblF1YWRUd2VlbjogZWFzZUluUXVhZFR3ZWVuLFxuXHRcdGVhc2VPdXRRdWFkVHdlZW46IGVhc2VPdXRRdWFkVHdlZW4sXG5cdFx0ZWFzZUluT3V0UXVhZFR3ZWVuOiBlYXNlSW5PdXRRdWFkVHdlZW5cblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbF9yYW5kb20oKSB7XG5cdC8vIFN0YW5kYXJkIE5vcm1hbCB2YXJpYXRlIHVzaW5nIEJveC1NdWxsZXIgdHJhbnNmb3JtLlxuICAgIHZhciB1ID0gMSAtIE1hdGgucmFuZG9tKCk7IC8vIFN1YnRyYWN0aW9uIHRvIGZsaXAgWzAsIDEpIHRvICgwLCAxXS5cbiAgICB2YXIgdiA9IDEgLSBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoIC0yLjAgKiBNYXRoLmxvZyggdSApICkgKiBNYXRoLmNvcyggMi4wICogTWF0aC5QSSAqIHYgKTtcbn1cblxuZXhwb3J0IHZhciBsaW5lYXJUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluUXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlT3V0UXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5PdXRRdWFkVHdlZW47XG5cbiFmdW5jdGlvbiBpbml0KCl7XG5cdHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoMHgxMDAwMCk7XG5cdHZhciBleHBvcnRlZCA9IGFzbSh3aW5kb3csIG51bGwsIGJ1ZmZlcik7XG5cdGxpbmVhclR3ZWVuID0gZXhwb3J0ZWQubGluZWFyVHdlZW47XG5cdGVhc2VJblF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJblF1YWRUd2Vlbjtcblx0ZWFzZU91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VPdXRRdWFkVHdlZW47XG5cdGVhc2VJbk91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJbk91dFF1YWRUd2Vlbjtcblx0cmV0dXJuIGV4cG9ydGVkO1xufSgpO1xuIl19
