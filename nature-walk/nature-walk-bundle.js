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
'use strict';

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
	var heap = new stdlib.Float64Array(buffer);

	// Tween function parameters
	// t: current time
	// b: start value
	// c: change in value
	// d: duraiton

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

	/* based on http://mysite.verizon.net/res148h4j/javascript/script_exact_cubic.html#the%20source%20code */
	function cubicRoots(P0, P1, P2, P3) {
		var a = +P0;
		var b = +P1;
		var c = +P2;
		var d = +P3;

		var A = +b / a;
		var B = +c / a;
		var C = +d / a;

		var Q = 0.0;
		var R = 0.0;
		var D = 0.0;
		var S = 0.0;
		var T = 0.0;
		var Im = 0.0;

		Q = +(3 * B - +pow(A, 2)) / 9;
		R = +(9 * A * B - 27 * C - 2 * +pow(A, 3)) / 54;
		D = +pow(Q, 3) + +pow(R, 2); // polynomial discriminant

		var t = new stdlib.Float64Array(4);
		var A3 = +(-A / 3);

		if (D >= 0) {
			// complex or duplicate roots
			var sqrtD = +sqrt(D);
			var S = +sgn(R + +sqrtD) * +pow(+abs(R + +sqrtD), 0.3333333333333333);
			var T = +sgn(R - +sqrtD) * +pow(+abs(R - +sqrtD), 0.3333333333333333);
			var ST = +(S + T);

			t[0] = A3 + ST; // real root
			t[1] = A3 - ST / 2; // real part of complex root
			t[2] = A3 - ST / 2; // real part of complex root
			Im = +abs(0.8660254037844386 * (S - T)); // complex part of root pair (0.866... is == sqrt(3)/2 )

			/*discard complex roots*/
			if (Im != 0) {
				t[1] = -1;
				t[2] = -1;
			}
		} else {
			// distinct real roots
			var th = +acos(R / +sqrt(-pow(Q, 3)));
			var sqrtQ = +sqrt(-Q);

			t[0] = 2 * sqrtQ * cos(th / 3) + A3;
			t[1] = 2 * sqrtQ * cos((th + 2 * PI) / 3) + A3;
			t[2] = 2 * sqrtQ * cos((th + 4 * PI) / 3) + A3;
			Im = 0.0;
		}

		/*discard out of spec roots*/
		var p = 0,
		    q = 0;
		for (p = 0 << 3, q = 3 << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
			if (+t[p >> 3] < 0.0 || +t[p >> 3] > 1.0) t[p >> 3] = -1.0;
		}

		/*sort but place -1 at the end*/
		t = sortSpecial(t);
		return t;
	}

	function sortSpecial(A) {
		var a = new stdlib.Float64Array(A);
		var flip = 0;
		var temp = 0.0;

		do {
			flip = 0;

			var p = 0,
			    q = 0,
			    r = 0;
			for (p = 0 << 3, q = (a.length | 0) << 3; (p | 0) < (q | 0); p = p + 8 | 0) {
				r = p + 8 | 0;
				if (+a[r >> 3] >= 0.0 && +a[p >> 3] > +a[r >> 3] || +a[p >> 3] < 0.0 && +a[r >> 3] >= 0.0) {
					flip = 1;
					temp = +a[p >> 3];
					a[p >> 3] = +a[r >> 3];
					a[r >> 3] = +temp;
				}
			}
		} while (flip != 0);
		return a;
	}

	return {
		linearTween: linearTween,
		easeInQuadTween: easeInQuadTween,
		easeOutQuadTween: easeOutQuadTween,
		easeInOutQuadTween: easeInOutQuadTween,
		cubicRoots: cubicRoots
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
	var heap = new ArrayBuffer(0x10000);
	var exported = asm(window, null, heap);
	exports.linearTween = linearTween = exported.linearTween;
	exports.easeInQuadTween = easeInQuadTween = exported.easeInQuadTween;
	exports.easeOutQuadTween = easeOutQuadTween = exported.easeOutQuadTween;
	exports.easeInOutQuadTween = easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
}();

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2NlbmVyeS5qcyIsInNyYy9zZXRwaWVjZS5qcyIsInNyYy9za3kuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksU0FBUyxJQUFiLEFBQWEsQUFBSTtBQUNqQixPQUFBLEFBQU8sTUFBUCxBQUFhOzs7O2NBTUQscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFB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QUUsS0FBYixBQUFXLEFBQUssQUFDaEI7T0FBRSxLQUFGLEFBQUssS0FBSyxDQUFWLEFBQVcsQUFDWDtBQUNEO0FBQ0Q7QUFmRCxXQWVTLFFBZlQsQUFlaUIsQUFDakI7U0FBQSxBQUFPLEFBQ1A7QUFFQTs7O2VBQU8sQUFDTyxBQUNiO21CQUZNLEFBRVcsQUFDakI7b0JBSE0sQUFHWSxBQUNsQjtzQkFKTSxBQUljLEFBQ3BCO2NBTEQsQUFBTyxBQUtNLEFBRWI7QUFQTyxBQUNOOzs7QUFRSyxTQUFBLEFBQVMsZ0JBQWdCLEFBRTVCOztLQUFJLElBQUksSUFBSSxLLEFBQVosQUFBWSxBQUFLLEFBQ2pCO0tBQUksSUFBSSxJQUFJLEtBQVosQUFBWSxBQUFLLEFBQ2pCO1FBQU8sS0FBQSxBQUFLLEtBQU0sQ0FBQSxBQUFDLE1BQU0sS0FBQSxBQUFLLElBQXZCLEFBQWtCLEFBQVUsTUFBUSxLQUFBLEFBQUssSUFBSyxNQUFNLEtBQU4sQUFBVyxLQUFoRSxBQUEyQyxBQUEwQixBQUN4RTs7O0FBRU0sSUFBSSxvQ0FBSjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFUCxDQUFDLFNBQUEsQUFBUyxPQUFNLEFBQ2Y7S0FBSSxPQUFPLElBQUEsQUFBSSxZQUFmLEFBQVcsQUFBZ0IsQUFDM0I7S0FBSSxXQUFXLElBQUEsQUFBSSxRQUFKLEFBQVksTUFBM0IsQUFBZSxBQUFrQixBQUNqQztTQVJVLEFBUVYsNEJBQWMsU0FBZCxBQUF1QixBQUN2QjtTQVJVLEFBUVYsb0NBQWtCLFNBQWxCLEFBQTJCLEFBQzNCO1NBUlUsQUFRVixzQ0FBbUIsU0FBbkIsQUFBNEIsQUFDNUI7U0FSVSxBQVFWLDBDQUFxQixTQUFyQixBQUE4QixBQUM5QjtRQUFBLEFBQU8sQUFDUDtBQVJELEFBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuLy89PT09PSBDbG91ZHM9PT09PVxudmFyIGJnX2Nsb3VkID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnL2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQucG5nJztcblxudmFyIGJnX3NreSA9IG5ldyBJbWFnZSgpO1xuYmdfc2t5LnNyYyA9ICcvYXNzZXRzL2JnLXNreS5wbmcnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KSxcbiAgICBCR19NT1VOVEFJTjogbmV3IFNwcml0ZShiZ19tb3VudGFpbiwgMCwgMCwgMTUzNiwgNzY3LCAxKSxcbiAgICBCR19ISUxMOiBuZXcgU3ByaXRlKGJnX2hpbGwsIDAsIDAsIDEwMjQsIDMwNiwgMSksXG4gICAgQkdfQ0xPVURfMDA6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDAsIDIxNiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAxOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCA0OCwgMjE2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDI6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgMCwgMjg2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDM6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgNDgsIDI4NiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzA0OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxMTIsIDUwMiwgNzIsIDEpLFxuICAgIEJHX0NMT1VEXzA1OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxODQsIDUwMiwgNzIsIDEpLFxuICAgIEJHX1NLWTogbmV3IFNwcml0ZShiZ19za3ksIDAsIDAsIDEsIDEsIDEpXG5cbn07IiwiXG5leHBvcnQgY29uc3QgRlBTICA9IDI0O1xuZXhwb3J0IGNvbnN0IFNURVAgPSAxL0ZQUztcbmV4cG9ydCBjb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBNRVRFUiAgPSAyNDsgICAvLyBQaXhlbHMgcGVyIG1ldGVyXG5leHBvcnQgY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5leHBvcnQgY29uc3QgUExBWUVSX0xFRlQgPSBXSURUSCAqIDAuMjsgLy8gSG93IGZhciBmcm9tIHRoZSBsZWZ0IHRoZSBwbGF5ZXIgd2lsbCBhcHBlYXJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVE9QID0gSEVJR0hUICogMC44OyAvLyBIb3cgZmFyIGZyb20gdGhlIHRvcCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgSE9SSVpPTiA9IEhFSUdIVCAqIDE7IC8vIEFwcGFycmVudCBwb3NpdGlvbiBvZiB0aGUgaG9yaXpvbiBvbiB0aGUgc2NyZWVuXG5leHBvcnQgY29uc3QgQ0FNRVJBX0RJU1RBTkNFID0gNTA7IC8vIERpc3RhbmNlIGluIG1ldGVycyB0aGF0IHRoZSBjYW1lcmEgaXMgYXdheSBmb3JtIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgQ0FNRVJBX0FOR0xFX0RFRyA9IDkwO1xuZXhwb3J0IGNvbnN0IEZJRUxEX09GX1ZJRVcgPSAyICogTWF0aC5zaW4oQ0FNRVJBX0FOR0xFX0RFRyAvIDIgKiAoTWF0aC5QSSAvIDE4MCkpICogQ0FNRVJBX0RJU1RBTkNFIC8gTWF0aC5zaW4oKDE4MCAtIDkwIC0gQ0FNRVJBX0FOR0xFX0RFRyAvIDIpICogKE1hdGguUEkgLyAxODApKTsgLy8gVmlzaWJsZSBhcmVhIG9uIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgUlVOX1NUQVJUX1NQRUVEID0gMTAgKiBNRVRFUjtcbmV4cG9ydCBjb25zdCBSVU5fTUFYX1NQRUVEID0gMjAwOyAvLyBtZXRlcnMgcGVyIHNlY29uZCAoMTIuNCBtL3MgaXMgdGhlIHdvcmxkIHJlY29yZClcbmV4cG9ydCBjb25zdCBSVU5fVElNRV9UT19NQVhfU1BFRUQgPSA2ICogNjA7XG5leHBvcnQgY29uc3QgR1JBVklUWSA9IDAqLTkuODsiLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHcm91bmQgZnJvbSAnLi9ncm91bmQnO1xuaW1wb3J0IFRlcnJhaW4gZnJvbSAnLi90ZXJyYWluJztcbmltcG9ydCBTa3kgZnJvbSAnLi9za3knO1xuXG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0cmVuZGVyaW5nTGF5ZXJzID0gW107XG5cdHNjZW5lcnkgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdGxldCBzdGVwID0gY29uZmlnLlNURVA7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IHN0ZXApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBzdGVwO1xuXHRcdFx0dGhpcy51cGRhdGUoc3RlcCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gY29uZmlnLldJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIGNvbmZpZy5SQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihcblx0XHRcdGNvbmZpZy5QTEFZRVJfTEVGVCxcblx0XHRcdGNvbmZpZy5QTEFZRVJfVE9QLFxuXHRcdFx0Y29uZmlnLkNBTUVSQV9ESVNUQU5DRSxcblx0XHRcdG51bGwsXG5cdFx0XHRudWxsLFxuXHRcdFx0dGhpcy5hc3NldHNbJ0RSVUlEX1JVTiddLFxuXHRcdFx0dGhpcy5mcmFtZUlkXG5cdFx0KTtcblxuXHRcdGxldCBza3kgPSBuZXcgU2t5KHRoaXMuYXNzZXRzWydCR19TS1knXSk7XG5cdFx0bGV0IGRpc3RhbnRDbG91ZHMgPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiAvIDIsIDUwICogMTAwMCwgW3RoaXMuYXNzZXRzWydCR19DTE9VRF8wMCddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDEnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAyJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMyddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDQnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA1J11dKTtcblx0XHRsZXQgbW91bnRhaW4gPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiwgMzAgKiAxMDAwLCBbdGhpcy5hc3NldHNbJ0JHX01PVU5UQUlOJ11dKTtcblx0XHRsZXQgY2xvdWRzID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04gLyAyLCAxMCAqIDEwMDAsIFt0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDAnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAxJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMiddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDMnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA0J10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNSddXSk7XG5cdFx0bGV0IGhpbGwxID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04sIDMgKiAxMDAwLCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0pO1xuXHRcdGxldCBoaWxsMiA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OLCAwLjUqMTAwMCwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKTtcblx0XHRsZXQgZ3JvdW5kID0gbmV3IEdyb3VuZCgwLCBjb25maWcuUExBWUVSX1RPUCwgY29uZmlnLkNBTUVSQV9ESVNUQU5DRSk7XG5cblx0XHR0aGlzLnNjZW5lcnkucHVzaChza3kpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKG1vdW50YWluKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChjbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChoaWxsMik7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goZ3JvdW5kKTtcblxuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goc2t5KTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobW91bnRhaW4pO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goY2xvdWRzKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGdyb3VuZCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHQvLyBUaGUgcGxheWVyJ3MgcG9zaXRpb24gZG9lc24ndCBtb3ZlLCBpbnN0ZWFkIHRoZSBwbGF5ZXIgY2hhbmdlcyB0aGUgc3RhZ2VEeCAmIHN0YWdlRHksXG5cdFx0Ly8gd2hpY2ggdGhlbiBpcyB1c2VkIHRvIHVwZGF0ZSBhbGwgdGhlIHNjZW5lcnlcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHQvLyBNYXRjaCB0aGUgd2lkdGggb2YgdGhlIHNjcmVlbiBhbmQgdGhlblxuXHRcdC8vIENlbnRlciB0aGUgc2NhbGVkIGltYWdlIHZlcnRpY2FsbHkgb24gdGhlIHNjcmVlblxuXHRcdGxldCB3ID0gY3ZzLndpZHRoO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodDtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQgZXh0ZW5kcyBTZXRQaWVjZSB7XG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeil7XG5cdFx0c3VwZXIoeCwgeSwgeilcblx0XHR0aGlzLnNlZ21lbnRzID0gW107XG5cdFx0dGhpcy50eXBlID0gJ2dyb3VuZCc7XG5cblx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdHg6IDAsXG5cdFx0XHR5OiB0aGlzLnksXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogdGhpcy55LFxuXHRcdFx0Y3AyeDogY29uZmlnLldJRFRIICogMC41LFxuXHRcdFx0Y3AyeTogdGhpcy55LFxuXHRcdFx0ZW5keDogY29uZmlnLldJRFRILFxuXHRcdFx0ZW5keTogdGhpcy55XG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHRsZXQgbGFzdCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgY29uZmlnLldJRFRIICogMjtcblx0XHRcdGxldCBlbmR5ID0geSArIGNvbmZpZy5IRUlHSFQgKiBub3JtYWxfcmFuZG9tKCkgLyAzO1xuXG5cdFx0XHRsZXQgdmFyaWFuY2UgPSAoY29uZmlnLldJRFRIICogMC4yNSkgKyAoY29uZmlnLldJRFRIICogMC4xKSAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRcdGxldCBjcDJ4ID0gZW5keCAtIHZhcmlhbmNlO1xuXHRcdFx0bGV0IGNwMnkgPSBlbmR5IC0gdmFyaWFuY2UgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0XHR4OiB4LFxuXHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRjcDF4OiBjcDF4LFxuXHRcdFx0XHRjcDF5OiBjcDF5LFxuXHRcdFx0XHRjcDJ4OiBjcDJ4LFxuXHRcdFx0XHRjcDJ5OiBjcDJ5LFxuXHRcdFx0XHRlbmR4OiBlbmR4LFxuXHRcdFx0XHRlbmR5OiBlbmR5XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdFx0bGFzdCA9IHNlZ21lbnQ7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNlZ21lbnRzLmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBzZWdtZW50ID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHRcdGlmIChzZWdtZW50LmVuZHggPCAwKXtcblx0XHRcdFx0dGhpcy5zZWdtZW50cy5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0aWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0bGV0IGkgPSAwO1xuXHRcdGxldCBzID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHR3aGlsZSAocyl7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHgubW92ZVRvKHMueCwgcy55KTtcblx0XHRcdGN0eC5iZXppZXJDdXJ2ZVRvKHMuY3AxeCwgcy5jcDF5LCBzLmNwMngsIHMuY3AyeSwgcy5lbmR4LCBzLmVuZHkpO1xuXHRcdFx0Y3R4LmxpbmVUbyhzLmVuZHgsIHMuZW5keSArIGNvbmZpZy5IRUlHSFQpO1xuXHRcdFx0Y3R4LmxpbmVUbyhzLngsIHMuZW5keSArIGNvbmZpZy5IRUlHSFQpO1xuXHRcdFx0Y3R4LmxpbmVUbyhzLngsIHMueSk7XG5cdFx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSAnI2EzOGU3NSc7XG5cdFx0XHRsZXQgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHMueCwgcy55ICsgY29uZmlnLkhFSUdIVCwgcy5lbmR4LCBzLmVuZHkgKyBjb25maWcuSEVJR0hUKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC4wLCAnI2EzOGU3NScpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjEsICcjYjhhNDhmJyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuMiwgJyNhMzhlNzUnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC4zLCAnI2I4YTQ4ZicpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjQsICcjYTM4ZTc1Jyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuNSwgJyNiOGE0OGYnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC42LCAnI2EzOGU3NScpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgwLjcsICcjYjhhNDhmJyk7XG5cdFx0XHRncmQuYWRkQ29sb3JTdG9wKDAuOCwgJyNhMzhlNzUnKTtcblx0XHRcdGdyZC5hZGRDb2xvclN0b3AoMC45LCAnI2I4YTQ4ZicpO1xuXHRcdFx0Z3JkLmFkZENvbG9yU3RvcCgxLjAsICcjYTM4ZTc1Jyk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gZ3JkO1xuXHRcdFx0Y3R4LnN0cm9rZSgpO1xuXHRcdFx0Y3R4LmZpbGwoKTtcblx0XHRcdHMgPSB0aGlzLnNlZ21lbnRzWysraV07XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHQvLyBNb3ZlbWVudCByZWxhdGl2ZSB0byB0aGUgc3RhZ2Vcblx0XHQvLyBDYWxjdWxhdGUgdGhlIGZpZWxkIG9mIHZpZXcgb2YgdGhlIHBsYW5lIGJhc2VkIG9uIGl0cyBkaXN0YW5jZSBmcm9tIHRoZSBjYW1lcmFcblx0XHQvLyBBbmQgdGhlbiB3ZSBtb3ZlIGl0IGEgZnJhY3Rpb24gb2YgdGhlIGFtb3VudCB0aGUgcGxheWVyJ3MgcGxhbmUgbW92ZXNcblx0XHRzdXBlci51cGRhdGUoZHQpO1xuXHRcdGxldCBkeCA9IHRoaXMuZHggKiBkdDtcblx0XHRsZXQgZHkgPSB0aGlzLmR5ICogZHQ7XG5cdFx0dGhpcy5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50KSA9PiB7XG5cdFx0XHRzZWdtZW50LnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMXggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMXkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmVuZHggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmVuZHkgKz0gZHk7XG5cdFx0fSk7XG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuLy9nYW1lLmRlYnVnID0gdHJ1ZTtcbmdhbWUuc3RhcnQoKTsiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtlYXNlT3V0UXVhZFR3ZWVufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgU2NlbmVyeSB7XG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCl7XG5cdFx0c3VwZXIoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKTtcblx0XHR0aGlzLnR5cGUgPSAncGxheWVyJztcblx0XHR0aGlzLmVsYXBzZWRUaW1lID0gMDtcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0dGhpcy5lbGFwc2VkVGltZSArPSBkdDtcblx0XHRsZXQgdCwgYiwgYywgZCwgZHgsIGRkeTtcblx0XHRcblx0XHRpZiAodGhpcy5lbGFwc2VkVGltZSA+PSBjb25maWcuUlVOX1RJTUVfVE9fTUFYX1NQRUVEKSB7XG5cdFx0XHQvLyBObyBjaGFuZ2UgdG8gc3RhZ2VEeFxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSYW1waW5nIHVwIHNwZWVkXG5cdFx0XHR0ID0gdGhpcy5lbGFwc2VkVGltZTsvLyB0OiBjdXJyZW50IHRpbWVcblx0XHRcdGIgPSAtY29uZmlnLlJVTl9TVEFSVF9TUEVFRDsvLyBiOiBzdGFydCB2YWx1ZVxuXHRcdFx0YyA9IC1jb25maWcuUlVOX01BWF9TUEVFRCAqIGNvbmZpZy5NRVRFUjsvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0XHRcdGQgPSBjb25maWcuUlVOX1RJTUVfVE9fTUFYX1NQRUVEOy8vIGQ6IGR1cmFpdG9uXG5cdFx0XHRkeCA9IGVhc2VPdXRRdWFkVHdlZW4odCwgYiwgYywgZCk7IC8vIFRoZSByYXRlIHRoYXQgcGxheWVyIGlzIG1vdmluZyBmb3J3YXJkXG5cdFx0XHR0aGlzLnN0YWdlRHggPSBkeDtcblx0XHR9XG5cdFx0XG5cdFx0ZGR5ID0gY29uZmlnLkdSQVZJVFk7XG5cdFx0dGhpcy5zdGFnZUR5ICs9IGR0ICogZGR5O1xuXHR9XG59IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5pbXBvcnQgU2V0UGllY2UgZnJvbSAnLi9zZXRwaWVjZSc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZXJ5IGV4dGVuZHMgU2V0UGllY2Uge1xuXG5cdC8vIFNjZW5lcnkgYXJlIHNldCBwaWVjZXMgdGhhdCBoYXZlIGFuaW1hdGVkIHNwcml0ZXNcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpe1xuXHRcdHN1cGVyKHgsIHksIHopO1xuXG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gd2lkdGggIHx8IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gaGVpZ2h0IHx8IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHRoaXMudHlwZSA9ICdzY2VuZXJ5Jztcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm47XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LXRoaXMuaCwgdGhpcy53LCB0aGlzLmgpO1xuXG5cdFx0Ly8gYWRkIGxpbmVhciBncmFkaWVudCBmb3IgYXRtb3NwaGVyaWMgZmFkaW5nXG5cdFx0Y3R4LnJlY3QoMCwgMCwgY29uZmlnLldJRFRILCBjb25maWcuSEVJR0hUKTtcblx0XHRsZXQgZGVuc2l0eSA9IE1hdGguYXRhbihNYXRoLmxvZyhNYXRoLmxvZyh0aGlzLnopKSkvTWF0aC5QSTtcblx0XHRsZXQgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNvbmZpZy5IRUlHSFQpO1xuXHRcdGdyZC5hZGRDb2xvclN0b3AoMC41LCAncmdiYSgxNzEsIDIwNiwgMjI3LCAnICsgKGRlbnNpdHkgKiAwLjAxKSArICcpJyk7IC8vIExpZ2h0IGJsdWVpc2hcblx0XHRncmQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDExNywgMTQ2LCAxNjMsICcgKyAoZGVuc2l0eSAqIDAuNTApICsgJyknKTsgLy8gTGlnaHQgYmx1ZWlzaC1ncmF5XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGdyZDtcblx0XHRjdHguZmlsbCgpO1xuXHR9XG5cbn0iLCIvLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGUsIGFuZCBjYW1lcmEgc3R1ZmYgdG8gYSBjYW1lcmEgb2JqZWN0XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgdmFyIHN0YWdlRHggPSAwO1xuZXhwb3J0IHZhciBzdGFnZUR5ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGllY2Uge1xuXHRcblx0Ly8gQWxsIHNldCBwaWVjZXMgbW92ZSB0b2dldGhlciBpbiByZXNwb25zZSB0byB0aGUgcGxheWVyJ3MgbW92ZW1lbnRcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6KXtcblx0XHRpZiAobmV3LnRhcmdldCA9PT0gU2V0UGllY2UpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgaW5zdGFuY2VzIG9mIGFic3RyYWN0IGNsYXNzIFNldFBpZWNlJyk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhpcy5yZW5kZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3Qgb3ZlcnJpZGUgcmVuZGVyIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy54ID0geHx8MDtcblx0XHR0aGlzLnkgPSB5fHwwO1xuXHRcdHRoaXMueiA9IHp8fDA7XG5cdH1cblxuXHQvLyByZW5kZXIgbmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgYnkgY2hpbGQgY2xhc3Nlc1xuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly8gTW92ZW1lbnQgcmVsYXRpdmUgdG8gdGhlIHN0YWdlXG5cdFx0Ly8gQ2FsY3VsYXRlIHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBwbGFuZSBiYXNlZCBvbiBpdHMgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhXG5cdFx0Ly8gQW5kIHRoZW4gd2UgbW92ZSBpdCBhIGZyYWN0aW9uIG9mIHRoZSBhbW91bnQgdGhlIHBsYXllcidzIHBsYW5lIG1vdmVzXG5cdFx0bGV0IHpGaWVsZE9mVmlldyA9ICgyICogTWF0aC5zaW4oY29uZmlnLkNBTUVSQV9BTkdMRV9ERUcgLyAyICogKE1hdGguUEkgLyAxODApKSAqIHRoaXMueiAvIE1hdGguc2luKCgxODAgLSA5MCAtIGNvbmZpZy5DQU1FUkFfQU5HTEVfREVHIC8gMikgKiAoTWF0aC5QSSAvIDE4MCkpKTtcblx0XHRsZXQgekZhY3RvciA9IGNvbmZpZy5GSUVMRF9PRl9WSUVXIC8gekZpZWxkT2ZWaWV3O1xuXHRcdHRoaXMuZHggPSB0aGlzLnN0YWdlRHggKiB6RmFjdG9yO1xuXHRcdHRoaXMuZHkgPSB0aGlzLnN0YWdlRHkgKiB6RmFjdG9yO1xuXHRcdHRoaXMueCArPSB0aGlzLmR4ICogZHQ7XG5cdFx0dGhpcy55ICs9IHRoaXMuZHkgKiBkdDtcblx0fVxuXG5cdHNldCBzdGFnZUR4IChkeCl7XG5cdFx0c3RhZ2VEeCA9IGR4O1xuXHR9XG5cblx0Z2V0IHN0YWdlRHggKCl7XG5cdFx0cmV0dXJuIHN0YWdlRHg7XG5cdH1cblxuXHRzZXQgc3RhZ2VEeSAoZHkpe1xuXHRcdHN0YWdlRHkgPSBkeTtcblx0fVxuXG5cdGdldCBzdGFnZUR5ICgpe1xuXHRcdHJldHVybiBzdGFnZUR5O1xuXHR9XG59IiwiaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9zY2VuZXJ5JztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNreSBleHRlbmRzIFNjZW5lcnkge1xuXG5cdGNvbnN0cnVjdG9yKHNwcml0ZSl7XG5cdFx0c3VwZXIoMCwgMCwgMCwgV0lEVEgsIEhFSUdIVCwgc3ByaXRlLCAwKVxuXHRcdHRoaXMudHlwZSA9ICdza3knO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuXHR9XG5cdFxuXHR1cGRhdGUoKXtcblx0XHQvLyBub3Bcblx0fVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0Ly8gU3ByaXRlcyBkZWZpbmUgYSBzZXJpZXMgb2Yga2V5ZnJhbWUgYW5pbWF0aW9uc1xuXHRcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IHtub3JtYWxfcmFuZG9tfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuaW1wb3J0IFNldFBpZWNlLCB7c3RhZ2VEeCwgc3RhZ2VEeX0gZnJvbSAnLi9zZXRwaWVjZSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBTZXRQaWVjZXtcblxuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHNwcml0ZXMpe1xuXHRcdHN1cGVyKHgsIHksIHopXG5cdFx0dGhpcy5zY2VuZXJ5ID0gW107XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLnR5cGUgPSAndGVycmFpbic7XG5cdFx0dGhpcy5nZW5lcmF0ZSgtY29uZmlnLldJRFRIKTtcblx0fVxuXG5cdGNyZWF0ZVNjZW5lcnkoeG9mZnNldCl7XG5cdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1soTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpfDBdO1xuXHRcdGxldCB4ID0geG9mZnNldCArIHNwcml0ZS5zdyAqIDAuNzUgKyBzcHJpdGUuc3cgLyAyICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdGxldCB5ID0gdGhpcy55O1xuXHRcdGxldCB6ID0gdGhpcy56O1xuXHRcdGxldCB3ID0gc3ByaXRlLnN3O1xuXHRcdGxldCBoID0gc3ByaXRlLnNoO1xuXHRcdGxldCBmcmFtZUlkID0gMDtcblxuXHRcdGxldCBzY2VuZXJ5ID0gbmV3IFNjZW5lcnkoeCwgeSwgeiwgdywgaCwgc3ByaXRlLCBmcmFtZUlkKVxuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKHNjZW5lcnkpO1xuXHRcdHJldHVybiB4ICsgc3ByaXRlLnN3OyAvLyBSZXR1cm4gdGhlIGFtb3VudCBvZiBvZmZzZXRcdFx0XG5cdH1cblxuXHRnZW5lcmF0ZSh4b2Zmc2V0KXtcblx0XHQvLyBBZGQgbW9yZSBzY2VuZXJ5IHVudGlsIHdlIGFyZSBiZXlvbmQgdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlbiArIGRpc3RhbmNlIHNjZW5lIGR4XG5cdFx0aWYgKCF0aGlzLnNwcml0ZXMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRpZiAoIXhvZmZzZXQpXG5cdFx0XHR4b2Zmc2V0ID0gdGhpcy5zY2VuZXJ5LnJlZHVjZSgoeCwgcykgPT4gTWF0aC5tYXgoeCwgcy54ICsgcy53KSwgMCk7XG5cdFx0d2hpbGUoeG9mZnNldCA8IGNvbmZpZy5XSURUSCAqIDIgKyB0aGlzLnN0YWdlRHgpe1xuXHRcdFx0eG9mZnNldCA9IHRoaXMuY3JlYXRlU2NlbmVyeSh4b2Zmc2V0KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGxldCB4b2Zmc2V0ID0gMDtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNjZW5lcnkubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNjZW5lcnkgPSB0aGlzLnNjZW5lcnlbaV07XG5cdFx0XHRsZXQgeCA9IHNjZW5lcnkueCArIHNjZW5lcnkudztcblx0XHRcdGlmICh4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2NlbmVyeS5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygnY29sbGVjdGluZyBnYXJiYWdlJyk7XG5cdFx0XHR9XG5cdFx0XHR4b2Zmc2V0ID0gTWF0aC5tYXgoeG9mZnNldCwgeCk7XG5cdFx0fVxuXHRcdHRoaXMuZ2VuZXJhdGUoeG9mZnNldCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHQpe1xuXHRcdC8vc3VwZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKVxuXHRcdHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24oKTtcblx0fVxufSIsImZ1bmN0aW9uIGFzbShzdGRsaWIsIGZvcmVpZ24sIGJ1ZmZlcil7XG5cdCd1c2UgYXNtJztcblxuXG5cdHZhciBleHAgPSBzdGRsaWIuTWF0aC5leHA7XG5cdHZhciBsb2cgPSBzdGRsaWIuTWF0aC5sb2c7XG5cdHZhciBzcXJ0ID0gc3RkbGliLk1hdGguc3FydDtcblx0dmFyIHBvdyA9IHN0ZGxpYi5NYXRoLnBvdztcblx0dmFyIGFicyA9IHN0ZGxpYi5NYXRoLmFicztcblx0dmFyIGFjb3MgPSBzdGRsaWIuTWF0aC5hY29zO1xuXHR2YXIgY29zID0gc3RkbGliLk1hdGguY29zO1xuXHR2YXIgUEkgPSBzdGRsaWIuTWF0aC5QSTtcblx0dmFyIGhlYXAgPSBuZXcgc3RkbGliLkZsb2F0NjRBcnJheShidWZmZXIpO1xuXG5cdC8vIFR3ZWVuIGZ1bmN0aW9uIHBhcmFtZXRlcnNcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblxuXHQvKiBiYXNlZCBvbiBodHRwOi8vbXlzaXRlLnZlcml6b24ubmV0L3JlczE0OGg0ai9qYXZhc2NyaXB0L3NjcmlwdF9leGFjdF9jdWJpYy5odG1sI3RoZSUyMHNvdXJjZSUyMGNvZGUgKi9cblx0ZnVuY3Rpb24gY3ViaWNSb290cyhQMCwgUDEsIFAyLCBQMyl7XG5cdFx0dmFyIGE9K1AwO1xuXHRcdHZhciBiPStQMTtcblx0XHR2YXIgYz0rUDI7XG5cdFx0dmFyIGQ9K1AzO1xuXG5cdFx0dmFyIEE9K2IvYTtcblx0XHR2YXIgQj0rYy9hO1xuXHRcdHZhciBDPStkL2E7XG5cblx0XHR2YXIgUT0wLjA7XG5cdFx0dmFyIFI9MC4wO1xuXHRcdHZhciBEPTAuMDtcblx0XHR2YXIgUz0wLjA7XG5cdFx0dmFyIFQ9MC4wO1xuXHRcdHZhciBJbT0wLjA7XG5cblx0XHRRID0gKygzKkIgLSArcG93KEEsIDIpKS85O1xuXHRcdFIgPSArKDkqQSpCIC0gMjcqQyAtIDIqK3BvdyhBLCAzKSkvNTQ7XG5cdFx0RCA9ICtwb3coUSwgMykgKyArcG93KFIsIDIpOyAvLyBwb2x5bm9taWFsIGRpc2NyaW1pbmFudFxuXG5cdFx0dmFyIHQgPSBuZXcgc3RkbGliLkZsb2F0NjRBcnJheSg0KTtcblx0XHR2YXIgQTMgPSArKC1BLzMpO1xuXG5cdFx0aWYgKEQgPj0gMCkge1xuXHRcdFx0Ly8gY29tcGxleCBvciBkdXBsaWNhdGUgcm9vdHNcblx0XHRcdHZhciBzcXJ0RCA9ICtzcXJ0KEQpO1xuXHRcdFx0dmFyIFMgPSArc2duKFIgKyArc3FydEQpKitwb3coK2FicyhSICsgK3NxcnREKSwwLjMzMzMzMzMzMzMzMzMzMzMpO1xuXHRcdFx0dmFyIFQgPSArc2duKFIgLSArc3FydEQpKitwb3coK2FicyhSIC0gK3NxcnREKSwwLjMzMzMzMzMzMzMzMzMzMzMpO1xuXHRcdFx0dmFyIFNUID0gKyhTICsgVCk7XG5cblx0XHRcdHRbMF0gPSBBMyArIFNUOyAgICAgICAgICAgICAgICAgICAgLy8gcmVhbCByb290XG5cdFx0XHR0WzFdID0gQTMgLSBTVC8yOyAgICAgICAgICAgICAgICAgIC8vIHJlYWwgcGFydCBvZiBjb21wbGV4IHJvb3Rcblx0XHRcdHRbMl0gPSBBMyAtIFNULzI7ICAgICAgICAgICAgICAgICAgLy8gcmVhbCBwYXJ0IG9mIGNvbXBsZXggcm9vdFxuXHRcdFx0SW0gPSArYWJzKDAuODY2MDI1NDAzNzg0NDM4NiooUyAtIFQpKTsgLy8gY29tcGxleCBwYXJ0IG9mIHJvb3QgcGFpciAoMC44NjYuLi4gaXMgPT0gc3FydCgzKS8yICkgXG5cblx0XHRcdC8qZGlzY2FyZCBjb21wbGV4IHJvb3RzKi9cblx0XHRcdGlmIChJbSE9MCkge1xuXHRcdFx0XHR0WzFdPS0xO1xuXHRcdFx0XHR0WzJdPS0xO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGRpc3RpbmN0IHJlYWwgcm9vdHNcblx0XHRcdHZhciB0aCA9ICthY29zKFIvK3NxcnQoLXBvdyhRLCAzKSkpO1xuXHRcdFx0dmFyIHNxcnRRID0gK3NxcnQoLVEpO1xuXG5cdFx0XHR0WzBdID0gMipzcXJ0USpjb3ModGgvMykgKyBBMztcblx0XHRcdHRbMV0gPSAyKnNxcnRRKmNvcygodGggKyAyKlBJKS8zKSArIEEzO1xuXHRcdFx0dFsyXSA9IDIqc3FydFEqY29zKCh0aCArIDQqUEkpLzMpICsgQTM7XG5cdFx0XHRJbSA9IDAuMDtcblx0XHR9XG5cblx0XHQvKmRpc2NhcmQgb3V0IG9mIHNwZWMgcm9vdHMqL1xuXHRcdHZhciBwID0gMCwgcSA9IDA7XG5cdFx0Zm9yIChwID0gMCA8PCAzLCBxID0gMyA8PCAzOyAocHwwKSA8IChxfDApOyBwID0gKHAgKyA4KXwwKSB7XG5cdFx0XHRpZiAoK3RbcD4+M108MC4wIHx8ICt0W3A+PjNdPjEuMClcblx0XHRcdFx0dFtwPj4zXT0tMS4wO1xuXHRcdH1cblxuXHRcdC8qc29ydCBidXQgcGxhY2UgLTEgYXQgdGhlIGVuZCovXG5cdFx0dD1zb3J0U3BlY2lhbCh0KTtcblx0XHRyZXR1cm4gdDtcblx0fVxuXG5mdW5jdGlvbiBzb3J0U3BlY2lhbChBKSB7XG5cdHZhciBhID0gbmV3IHN0ZGxpYi5GbG9hdDY0QXJyYXkoQSk7XG5cdHZhciBmbGlwID0gMDtcblx0dmFyIHRlbXAgPSAwLjA7XG5cblx0ZG8ge1xuXHRcdGZsaXAgPSAwO1xuXG5cdFx0dmFyIHAgPSAwLCBxID0gMCwgciA9IDA7XG5cdFx0Zm9yIChwID0gMCA8PCAzLCBxID0gKGEubGVuZ3RofDApIDw8IDM7IChwfDApIDwgKHF8MCk7IHAgPSAocCArIDgpfDApIHtcblx0XHRcdHIgPSAocCArIDgpfDA7XG5cdFx0XHRpZiAoKCthW3I+PjNdID49IDAuMCAmJiArYVtwPj4zXSA+ICthW3I+PjNdKSB8fFxuXHRcdFx0XHQoK2FbcD4+M10gPCAwLjAgJiYgK2Fbcj4+M10gPj0gMC4wKVxuXHRcdFx0KXtcblx0XHRcdFx0ZmxpcCA9IDE7XG5cdFx0XHRcdHRlbXAgPSArYVtwPj4zXTtcblx0XHRcdFx0YVtwPj4zXSA9ICthW3I+PjNdO1xuXHRcdFx0XHRhW3I+PjNdID0gK3RlbXA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IHdoaWxlIChmbGlwICE9IDApO1xuXHRyZXR1cm4gYTtcbn1cblxuXHRyZXR1cm4ge1xuXHRcdGxpbmVhclR3ZWVuOiBsaW5lYXJUd2Vlbixcblx0XHRlYXNlSW5RdWFkVHdlZW46IGVhc2VJblF1YWRUd2Vlbixcblx0XHRlYXNlT3V0UXVhZFR3ZWVuOiBlYXNlT3V0UXVhZFR3ZWVuLFxuXHRcdGVhc2VJbk91dFF1YWRUd2VlbjogZWFzZUluT3V0UXVhZFR3ZWVuLFxuXHRcdGN1YmljUm9vdHM6IGN1YmljUm9vdHNcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsX3JhbmRvbSgpIHtcblx0Ly8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXG4gICAgdmFyIHUgPSAxIC0gTWF0aC5yYW5kb20oKTsgLy8gU3VidHJhY3Rpb24gdG8gZmxpcCBbMCwgMSkgdG8gKDAsIDFdLlxuICAgIHZhciB2ID0gMSAtIE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIE1hdGguc3FydCggLTIuMCAqIE1hdGgubG9nKCB1ICkgKSAqIE1hdGguY29zKCAyLjAgKiBNYXRoLlBJICogdiApO1xufVxuXG5leHBvcnQgdmFyIGxpbmVhclR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5RdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VPdXRRdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJbk91dFF1YWRUd2VlbjtcblxuIWZ1bmN0aW9uIGluaXQoKXtcblx0dmFyIGhlYXAgPSBuZXcgQXJyYXlCdWZmZXIoMHgxMDAwMCk7XG5cdHZhciBleHBvcnRlZCA9IGFzbSh3aW5kb3csIG51bGwsIGhlYXApO1xuXHRsaW5lYXJUd2VlbiA9IGV4cG9ydGVkLmxpbmVhclR3ZWVuO1xuXHRlYXNlSW5RdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5RdWFkVHdlZW47XG5cdGVhc2VPdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlT3V0UXVhZFR3ZWVuO1xuXHRlYXNlSW5PdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5PdXRRdWFkVHdlZW47XG5cdHJldHVybiBleHBvcnRlZDtcbn0oKTtcbiJdfQ==
