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
var BASE_MARGIN = exports.BASE_MARGIN = WIDTH * 0.2; // How far from the left the player will appear
var HORIZON = exports.HORIZON = HEIGHT * 1; // Apparrent position of the horizon on the screen
var CAMERA_DISTANCE = exports.CAMERA_DISTANCE = 50; // Distance in meters that the camera is away form the plane of the player
var CAMERA_ANGLE_DEG = exports.CAMERA_ANGLE_DEG = 90;
var FIELD_OF_VIEW = exports.FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
var RUN_MAX_SPEED = exports.RUN_MAX_SPEED = 12.4; // meters per second
var RUN_TIME_TO_MAX_SPEED = exports.RUN_TIME_TO_MAX_SPEED = 1 * 60;
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
		this.player = new _player2.default(config.BASE_MARGIN, config.HORIZON, config.CAMERA_DISTANCE, null, null, this.assets['DRUID_RUN'], this.frameId);

		var sky = new _sky2.default(this.assets['BG_SKY']);
		var distantClouds = new _terrain2.default(0, config.HORIZON / 2, 50 * 1000, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var mountain = new _terrain2.default(0, config.HORIZON, 30 * 1000, [this.assets['BG_MOUNTAIN']]);
		var clouds = new _terrain2.default(0, config.HORIZON / 2, 20 * 1000, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var hill1 = new _terrain2.default(0, config.HORIZON, 1 * 1000, [this.assets['BG_HILL']]);
		var hill2 = new _terrain2.default(0, config.HORIZON, 100, [this.assets['BG_HILL']]);
		var ground = new _ground2.default();

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

	function Ground(x, y, z, sprites) {
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
				var endx = x + config.WIDTH;
				var endy = y + this.y * (0, _utils.normal_random)();

				var variance = config.WIDTH / 5 + config.WIDTH / 3 * (0, _utils.normal_random)();
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
			ctx.beginPath();
			ctx.moveTo(s.x, s.y);
			while (s) {
				ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.endx, s.endy);
				s = this.segments[++i];
			}
			ctx.closePath();
			ctx.strokeStyle = '#e2252c';
			ctx.fillStyle = '#2c6ba1';
			ctx.stroke();
			ctx.fill();

			// context.beginPath();
			// context.moveTo(284 + xoff, 119 + yoff);
			// context.bezierCurveTo(46 + xoff, 189 + yoff, 39 + xoff, 60 + yoff, 243 + xoff, 29 + yoff);
			// context.bezierCurveTo(46 + xoff, 189 + yoff, 39 + xoff, 60 + yoff, 284 + xoff, 119 + yoff);
			// context.closePath();
			// context.strokeStyle = "#e2252c"; // line color
			// context.fillStyle = "#2C6BA1";
			// context.stroke();
			// context.fill();
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
				segment.y += dt;
				segment.cp1x += dx;
				segment.cp1y += dy;
				segment.cp2x += dx;
				segment.cp2y += dy;
				segment.endx += dx;
				segment.endy += dy;
			});
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
					b = 0; // b: start value
					c = config.RUN_MAX_SPEED; // c: change in value
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
			var grd = ctx.createLinearGradient(0, 0, 0, config.HEIGHT);
			grd.addColorStop(0.5, 'rgba(171, 206, 227, 0.01)'); // Light blueish
			grd.addColorStop(1, 'rgba(117, 146, 163, 0.20)'); // Light blueish-gray
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
function asm() {
	'use asm';
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
	var exported = asm();
	exports.linearTween = linearTween = exported.linearTween;
	exports.easeInQuadTween = easeInQuadTween = exported.easeInQuadTween;
	exports.easeOutQuadTween = easeOutQuadTween = exported.easeOutQuadTween;
	exports.easeInOutQuadTween = easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
}();

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2NlbmVyeS5qcyIsInNyYy9zZXRwaWVjZS5qcyIsInNyYy9za3kuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksU0FBUyxJQUFiLEFBQWEsQUFBSTtBQUNqQixPQUFBLEFBQU8sTUFBUCxBQUFhOzs7O2NBTUQscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFB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QUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1A7QUFQRCxBQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbi8vPT09PT0gQ2xvdWRzPT09PT1cbnZhciBiZ19jbG91ZCA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJy9hc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50LnBuZyc7XG5cbnZhciBiZ19za3kgPSBuZXcgSW1hZ2UoKTtcbmJnX3NreS5zcmMgPSAnL2Fzc2V0cy9iZy1za3kucG5nJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpLFxuICAgIEJHX0NMT1VEXzAwOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAwLCAyMTYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgNDgsIDIxNiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzAyOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDAsIDI4NiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAzOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDQ4LCAyODYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wNDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTEyLCA1MDIsIDcyLCAxKSxcbiAgICBCR19DTE9VRF8wNTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTg0LCA1MDIsIDcyLCAxKSxcbiAgICBCR19TS1k6IG5ldyBTcHJpdGUoYmdfc2t5LCAwLCAwLCAxLCAxLCAxKVxuXG59OyIsIlxuZXhwb3J0IGNvbnN0IEZQUyAgPSAyNDtcbmV4cG9ydCBjb25zdCBTVEVQID0gMS9GUFM7XG5leHBvcnQgY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5leHBvcnQgY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5leHBvcnQgY29uc3QgTUVURVIgID0gMjQ7ICAgLy8gUGl4ZWxzIHBlciBtZXRlclxuZXhwb3J0IGNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuZXhwb3J0IGNvbnN0IEJBU0VfTUFSR0lOID0gV0lEVEggKiAwLjI7IC8vIEhvdyBmYXIgZnJvbSB0aGUgbGVmdCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgSE9SSVpPTiA9IEhFSUdIVCAqIDE7IC8vIEFwcGFycmVudCBwb3NpdGlvbiBvZiB0aGUgaG9yaXpvbiBvbiB0aGUgc2NyZWVuXG5leHBvcnQgY29uc3QgQ0FNRVJBX0RJU1RBTkNFID0gNTA7IC8vIERpc3RhbmNlIGluIG1ldGVycyB0aGF0IHRoZSBjYW1lcmEgaXMgYXdheSBmb3JtIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgQ0FNRVJBX0FOR0xFX0RFRyA9IDkwO1xuZXhwb3J0IGNvbnN0IEZJRUxEX09GX1ZJRVcgPSAyICogTWF0aC5zaW4oQ0FNRVJBX0FOR0xFX0RFRyAvIDIgKiAoTWF0aC5QSSAvIDE4MCkpICogQ0FNRVJBX0RJU1RBTkNFIC8gTWF0aC5zaW4oKDE4MCAtIDkwIC0gQ0FNRVJBX0FOR0xFX0RFRyAvIDIpICogKE1hdGguUEkgLyAxODApKTsgLy8gVmlzaWJsZSBhcmVhIG9uIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgUlVOX01BWF9TUEVFRCA9IDEyLjQ7IC8vIG1ldGVycyBwZXIgc2Vjb25kXG5leHBvcnQgY29uc3QgUlVOX1RJTUVfVE9fTUFYX1NQRUVEID0gMSAqIDYwO1xuZXhwb3J0IGNvbnN0IEdSQVZJVFkgPSAwKi05Ljg7IiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR3JvdW5kIGZyb20gJy4vZ3JvdW5kJztcbmltcG9ydCBUZXJyYWluIGZyb20gJy4vdGVycmFpbic7XG5pbXBvcnQgU2t5IGZyb20gJy4vc2t5JztcblxuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdHJlbmRlcmluZ0xheWVycyA9IFtdO1xuXHRzY2VuZXJ5ID0gW107XG5cdHBsYXllciA9IHt9O1xuXHRhc3NldHMgPSB7fTtcblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNYWluIEdhbWUgTG9vcFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XG5cdGZyYW1lSWQgPSAwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHRsZXQgc3RlcCA9IGNvbmZpZy5TVEVQO1xuXHRcdHRoaXMudCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLmR0ICs9IE1hdGgubWluKDEsICh0aGlzLnQgLSB0aGlzLnRwcmV2KSAvIDEwMDApO1xuXHRcdHdoaWxlKHRoaXMuZHQgPiBzdGVwKSB7XG5cdFx0XHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHRcdHRoaXMuZHQgLT0gc3RlcDtcblx0XHRcdHRoaXMudXBkYXRlKHN0ZXApO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBTZXR1cFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IGNvbmZpZy5XSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBjb25maWcuSEVJR0hUO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4ICAgICA9IHRoaXMub2ZmU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLm9uU2NyZWVuLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0ID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBjb25maWcuUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoXG5cdFx0XHRjb25maWcuQkFTRV9NQVJHSU4sXG5cdFx0XHRjb25maWcuSE9SSVpPTixcblx0XHRcdGNvbmZpZy5DQU1FUkFfRElTVEFOQ0UsXG5cdFx0XHRudWxsLFxuXHRcdFx0bnVsbCxcblx0XHRcdHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSxcblx0XHRcdHRoaXMuZnJhbWVJZFxuXHRcdCk7XG5cblx0XHRsZXQgc2t5ID0gbmV3IFNreSh0aGlzLmFzc2V0c1snQkdfU0tZJ10pO1xuXHRcdGxldCBkaXN0YW50Q2xvdWRzID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04gLyAyLCA1MCAqIDEwMDAsIFt0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDAnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAxJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMiddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDMnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA0J10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNSddXSk7XG5cdFx0bGV0IG1vdW50YWluID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04sIDMwICogMTAwMCwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSk7XG5cdFx0bGV0IGNsb3VkcyA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OIC8gMiwgMjAgKiAxMDAwLCBbdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAwJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMSddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDInXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAzJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNCddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDUnXV0pO1xuXHRcdGxldCBoaWxsMSA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OLCAxICogMTAwMCwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKTtcblx0XHRsZXQgaGlsbDIgPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiwgMTAwLCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0pO1xuXHRcdGxldCBncm91bmQgPSBuZXcgR3JvdW5kKCk7XG5cblx0XHR0aGlzLnNjZW5lcnkucHVzaChza3kpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKG1vdW50YWluKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChjbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChoaWxsMik7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goZ3JvdW5kKTtcblxuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goc2t5KTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobW91bnRhaW4pO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goY2xvdWRzKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGdyb3VuZCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHQvLyBUaGUgcGxheWVyJ3MgcG9zaXRpb24gZG9lc24ndCBtb3ZlLCBpbnN0ZWFkIHRoZSBwbGF5ZXIgY2hhbmdlcyB0aGUgc3RhZ2VEeCAmIHN0YWdlRHksXG5cdFx0Ly8gd2hpY2ggdGhlbiBpcyB1c2VkIHRvIHVwZGF0ZSBhbGwgdGhlIHNjZW5lcnlcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHQvLyBNYXRjaCB0aGUgd2lkdGggb2YgdGhlIHNjcmVlbiBhbmQgdGhlblxuXHRcdC8vIENlbnRlciB0aGUgc2NhbGVkIGltYWdlIHZlcnRpY2FsbHkgb24gdGhlIHNjcmVlblxuXHRcdGxldCB3ID0gY3ZzLndpZHRoO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodDtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQgZXh0ZW5kcyBTZXRQaWVjZSB7XG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaXRlcyl7XG5cdFx0c3VwZXIoeCwgeSwgeilcblx0XHR0aGlzLnNlZ21lbnRzID0gW107XG5cdFx0dGhpcy50eXBlID0gJ2dyb3VuZCc7XG5cblx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdHg6IDAsXG5cdFx0XHR5OiB0aGlzLnksXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogdGhpcy55LFxuXHRcdFx0Y3AyeDogY29uZmlnLldJRFRIICogMC41LFxuXHRcdFx0Y3AyeTogdGhpcy55LFxuXHRcdFx0ZW5keDogY29uZmlnLldJRFRILFxuXHRcdFx0ZW5keTogdGhpcy55XG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHRsZXQgbGFzdCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgY29uZmlnLldJRFRIO1xuXHRcdFx0bGV0IGVuZHkgPSB5ICsgdGhpcy55ICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgdmFyaWFuY2UgPSAoY29uZmlnLldJRFRIIC8gNSkgKyAoY29uZmlnLldJRFRIIC8gMykgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0XHRsZXQgY3AyeCA9IGVuZHggLSB2YXJpYW5jZTtcblx0XHRcdGxldCBjcDJ5ID0gZW5keSAtIHZhcmlhbmNlICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdFx0eDogeCxcblx0XHRcdFx0eTogeSxcblx0XHRcdFx0Y3AxeDogY3AxeCxcblx0XHRcdFx0Y3AxeTogY3AxeSxcblx0XHRcdFx0Y3AyeDogY3AyeCxcblx0XHRcdFx0Y3AyeTogY3AyeSxcblx0XHRcdFx0ZW5keDogZW5keCxcblx0XHRcdFx0ZW5keTogZW5keVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRcdGxhc3QgPSBzZWdtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0XHRpZiAoc2VnbWVudC5lbmR4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2VnbWVudHMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGxldCBpID0gMDtcblx0XHRsZXQgcyA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8ocy54LCBzLnkpO1xuXHRcdHdoaWxlIChzKXtcblx0XHRcdGN0eC5iZXppZXJDdXJ2ZVRvKHMuY3AxeCwgcy5jcDF5LCBzLmNwMngsIHMuY3AyeSwgcy5lbmR4LCBzLmVuZHkpO1xuXHRcdFx0cyA9IHRoaXMuc2VnbWVudHNbKytpXTtcblx0XHR9XG5cdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9ICcjZTIyNTJjJztcblx0XHRjdHguZmlsbFN0eWxlID0gJyMyYzZiYTEnO1xuXHRcdGN0eC5zdHJva2UoKTtcblx0XHRjdHguZmlsbCgpO1xuXG5cbi8vIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4vLyBjb250ZXh0Lm1vdmVUbygyODQgKyB4b2ZmLCAxMTkgKyB5b2ZmKTtcbi8vIGNvbnRleHQuYmV6aWVyQ3VydmVUbyg0NiArIHhvZmYsIDE4OSArIHlvZmYsIDM5ICsgeG9mZiwgNjAgKyB5b2ZmLCAyNDMgKyB4b2ZmLCAyOSArIHlvZmYpO1xuLy8gY29udGV4dC5iZXppZXJDdXJ2ZVRvKDQ2ICsgeG9mZiwgMTg5ICsgeW9mZiwgMzkgKyB4b2ZmLCA2MCArIHlvZmYsIDI4NCArIHhvZmYsIDExOSArIHlvZmYpO1xuLy8gY29udGV4dC5jbG9zZVBhdGgoKTtcbi8vIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIiNlMjI1MmNcIjsgLy8gbGluZSBjb2xvclxuLy8gY29udGV4dC5maWxsU3R5bGUgPSBcIiMyQzZCQTFcIjtcbi8vIGNvbnRleHQuc3Ryb2tlKCk7XG4vLyBjb250ZXh0LmZpbGwoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly8gTW92ZW1lbnQgcmVsYXRpdmUgdG8gdGhlIHN0YWdlXG5cdFx0Ly8gQ2FsY3VsYXRlIHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBwbGFuZSBiYXNlZCBvbiBpdHMgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhXG5cdFx0Ly8gQW5kIHRoZW4gd2UgbW92ZSBpdCBhIGZyYWN0aW9uIG9mIHRoZSBhbW91bnQgdGhlIHBsYXllcidzIHBsYW5lIG1vdmVzXG5cdFx0c3VwZXIudXBkYXRlKGR0KTtcblx0XHRsZXQgZHggPSB0aGlzLmR4ICogZHQ7XG5cdFx0bGV0IGR5ID0gdGhpcy5keSAqIGR0O1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR0O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuLy9nYW1lLmRlYnVnID0gdHJ1ZTtcbmdhbWUuc3RhcnQoKTsiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtlYXNlT3V0UXVhZFR3ZWVufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgU2NlbmVyeSB7XG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCl7XG5cdFx0c3VwZXIoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKTtcblx0XHR0aGlzLnR5cGUgPSAncGxheWVyJztcblx0XHR0aGlzLmVsYXBzZWRUaW1lID0gMDtcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0dGhpcy5lbGFwc2VkVGltZSArPSBkdDtcblx0XHRsZXQgdCwgYiwgYywgZCwgZHgsIGRkeTtcblx0XHRcblx0XHRpZiAodGhpcy5lbGFwc2VkVGltZSA+PSBjb25maWcuUlVOX1RJTUVfVE9fTUFYX1NQRUVEKSB7XG5cdFx0XHQvLyBObyBjaGFuZ2UgdG8gc3RhZ2VEeFxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBSYW1waW5nIHVwIHNwZWVkXG5cdFx0XHR0ID0gdGhpcy5lbGFwc2VkVGltZTsvLyB0OiBjdXJyZW50IHRpbWVcblx0XHRcdGIgPSAwOy8vIGI6IHN0YXJ0IHZhbHVlXG5cdFx0XHRjID0gY29uZmlnLlJVTl9NQVhfU1BFRUQ7Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdFx0XHRkID0gY29uZmlnLlJVTl9USU1FX1RPX01BWF9TUEVFRDsvLyBkOiBkdXJhaXRvblxuXHRcdFx0ZHggPSBlYXNlT3V0UXVhZFR3ZWVuKHQsIGIsIGMsIGQpOyAvLyBUaGUgcmF0ZSB0aGF0IHBsYXllciBpcyBtb3ZpbmcgZm9yd2FyZFxuXHRcdFx0dGhpcy5zdGFnZUR4ID0gZHg7XG5cdFx0fVxuXHRcdFxuXHRcdGRkeSA9IGNvbmZpZy5HUkFWSVRZO1xuXHRcdHRoaXMuc3RhZ2VEeSArPSBkdCAqIGRkeTtcblx0fVxufSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVyeSBleHRlbmRzIFNldFBpZWNlIHtcblxuXHQvLyBTY2VuZXJ5IGFyZSBzZXQgcGllY2VzIHRoYXQgaGF2ZSBhbmltYXRlZCBzcHJpdGVzXG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKXtcblx0XHRzdXBlcih4LCB5LCB6KTtcblxuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMudyA9IHdpZHRoICB8fCB0aGlzLnNwcml0ZS5zd3wwO1xuXHRcdHRoaXMuaCA9IGhlaWdodCB8fCB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHR0aGlzLnR5cGUgPSAnc2NlbmVyeSc7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueS10aGlzLmgsIHRoaXMudywgdGhpcy5oKTtcblxuXHRcdC8vIGFkZCBsaW5lYXIgZ3JhZGllbnQgZm9yIGF0bW9zcGhlcmljIGZhZGluZ1xuXHRcdGN0eC5yZWN0KDAsIDAsIGNvbmZpZy5XSURUSCwgY29uZmlnLkhFSUdIVCk7XG5cdFx0bGV0IGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjb25maWcuSEVJR0hUKTtcblx0XHRncmQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoMTcxLCAyMDYsIDIyNywgMC4wMSknKTsgLy8gTGlnaHQgYmx1ZWlzaFxuXHRcdGdyZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMTE3LCAxNDYsIDE2MywgMC4yMCknKTsgLy8gTGlnaHQgYmx1ZWlzaC1ncmF5XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGdyZDtcblx0XHRjdHguZmlsbCgpO1xuXHR9XG5cbn0iLCIvLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGUsIGFuZCBjYW1lcmEgc3R1ZmYgdG8gYSBjYW1lcmEgb2JqZWN0XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgdmFyIHN0YWdlRHggPSAwO1xuZXhwb3J0IHZhciBzdGFnZUR5ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGllY2Uge1xuXHRcblx0Ly8gQWxsIHNldCBwaWVjZXMgbW92ZSB0b2dldGhlciBpbiByZXNwb25zZSB0byB0aGUgcGxheWVyJ3MgbW92ZW1lbnRcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6KXtcblx0XHRpZiAobmV3LnRhcmdldCA9PT0gU2V0UGllY2UpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgaW5zdGFuY2VzIG9mIGFic3RyYWN0IGNsYXNzIFNldFBpZWNlJyk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhpcy5yZW5kZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3Qgb3ZlcnJpZGUgcmVuZGVyIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy54ID0geHx8MDtcblx0XHR0aGlzLnkgPSB5fHwwO1xuXHRcdHRoaXMueiA9IHp8fDA7XG5cdH1cblxuXHQvLyByZW5kZXIgbmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgYnkgY2hpbGQgY2xhc3Nlc1xuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly8gTW92ZW1lbnQgcmVsYXRpdmUgdG8gdGhlIHN0YWdlXG5cdFx0Ly8gQ2FsY3VsYXRlIHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBwbGFuZSBiYXNlZCBvbiBpdHMgZGlzdGFuY2UgZnJvbSB0aGUgY2FtZXJhXG5cdFx0Ly8gQW5kIHRoZW4gd2UgbW92ZSBpdCBhIGZyYWN0aW9uIG9mIHRoZSBhbW91bnQgdGhlIHBsYXllcidzIHBsYW5lIG1vdmVzXG5cdFx0bGV0IHpGaWVsZE9mVmlldyA9ICgyICogTWF0aC5zaW4oY29uZmlnLkNBTUVSQV9BTkdMRV9ERUcgLyAyICogKE1hdGguUEkgLyAxODApKSAqIHRoaXMueiAvIE1hdGguc2luKCgxODAgLSA5MCAtIGNvbmZpZy5DQU1FUkFfQU5HTEVfREVHIC8gMikgKiAoTWF0aC5QSSAvIDE4MCkpKTtcblx0XHRsZXQgekZhY3RvciA9IGNvbmZpZy5GSUVMRF9PRl9WSUVXIC8gekZpZWxkT2ZWaWV3O1xuXHRcdHRoaXMuZHggPSB0aGlzLnN0YWdlRHggKiB6RmFjdG9yO1xuXHRcdHRoaXMuZHkgPSB0aGlzLnN0YWdlRHkgKiB6RmFjdG9yO1xuXHRcdHRoaXMueCArPSB0aGlzLmR4ICogZHQ7XG5cdFx0dGhpcy55ICs9IHRoaXMuZHkgKiBkdDtcblx0fVxuXG5cdHNldCBzdGFnZUR4IChkeCl7XG5cdFx0c3RhZ2VEeCA9IGR4O1xuXHR9XG5cblx0Z2V0IHN0YWdlRHggKCl7XG5cdFx0cmV0dXJuIHN0YWdlRHg7XG5cdH1cblxuXHRzZXQgc3RhZ2VEeSAoZHkpe1xuXHRcdHN0YWdlRHkgPSBkeTtcblx0fVxuXG5cdGdldCBzdGFnZUR5ICgpe1xuXHRcdHJldHVybiBzdGFnZUR5O1xuXHR9XG59IiwiaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9zY2VuZXJ5JztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNreSBleHRlbmRzIFNjZW5lcnkge1xuXG5cdGNvbnN0cnVjdG9yKHNwcml0ZSl7XG5cdFx0c3VwZXIoMCwgMCwgMCwgV0lEVEgsIEhFSUdIVCwgc3ByaXRlLCAwKVxuXHRcdHRoaXMudHlwZSA9ICdza3knO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuXHR9XG5cdFxuXHR1cGRhdGUoKXtcblx0XHQvLyBub3Bcblx0fVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0Ly8gU3ByaXRlcyBkZWZpbmUgYSBzZXJpZXMgb2Yga2V5ZnJhbWUgYW5pbWF0aW9uc1xuXHRcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IHtub3JtYWxfcmFuZG9tfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuaW1wb3J0IFNldFBpZWNlLCB7c3RhZ2VEeCwgc3RhZ2VEeX0gZnJvbSAnLi9zZXRwaWVjZSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBTZXRQaWVjZXtcblxuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHNwcml0ZXMpe1xuXHRcdHN1cGVyKHgsIHksIHopXG5cdFx0dGhpcy5zY2VuZXJ5ID0gW107XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLnR5cGUgPSAndGVycmFpbic7XG5cdFx0dGhpcy5nZW5lcmF0ZSgtY29uZmlnLldJRFRIKTtcblx0fVxuXG5cdGNyZWF0ZVNjZW5lcnkoeG9mZnNldCl7XG5cdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1soTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpfDBdO1xuXHRcdGxldCB4ID0geG9mZnNldCArIHNwcml0ZS5zdyAqIDAuNzUgKyBzcHJpdGUuc3cgLyAyICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdGxldCB5ID0gdGhpcy55O1xuXHRcdGxldCB6ID0gdGhpcy56O1xuXHRcdGxldCB3ID0gc3ByaXRlLnN3O1xuXHRcdGxldCBoID0gc3ByaXRlLnNoO1xuXHRcdGxldCBmcmFtZUlkID0gMDtcblxuXHRcdGxldCBzY2VuZXJ5ID0gbmV3IFNjZW5lcnkoeCwgeSwgeiwgdywgaCwgc3ByaXRlLCBmcmFtZUlkKVxuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKHNjZW5lcnkpO1xuXHRcdHJldHVybiB4ICsgc3ByaXRlLnN3OyAvLyBSZXR1cm4gdGhlIGFtb3VudCBvZiBvZmZzZXRcdFx0XG5cdH1cblxuXHRnZW5lcmF0ZSh4b2Zmc2V0KXtcblx0XHQvLyBBZGQgbW9yZSBzY2VuZXJ5IHVudGlsIHdlIGFyZSBiZXlvbmQgdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlbiArIGRpc3RhbmNlIHNjZW5lIGR4XG5cdFx0aWYgKCF0aGlzLnNwcml0ZXMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRpZiAoIXhvZmZzZXQpXG5cdFx0XHR4b2Zmc2V0ID0gdGhpcy5zY2VuZXJ5LnJlZHVjZSgoeCwgcykgPT4gTWF0aC5tYXgoeCwgcy54ICsgcy53KSwgMCk7XG5cdFx0d2hpbGUoeG9mZnNldCA8IGNvbmZpZy5XSURUSCAqIDIgKyB0aGlzLnN0YWdlRHgpe1xuXHRcdFx0eG9mZnNldCA9IHRoaXMuY3JlYXRlU2NlbmVyeSh4b2Zmc2V0KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGxldCB4b2Zmc2V0ID0gMDtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNjZW5lcnkubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNjZW5lcnkgPSB0aGlzLnNjZW5lcnlbaV07XG5cdFx0XHRsZXQgeCA9IHNjZW5lcnkueCArIHNjZW5lcnkudztcblx0XHRcdGlmICh4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2NlbmVyeS5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygnY29sbGVjdGluZyBnYXJiYWdlJyk7XG5cdFx0XHR9XG5cdFx0XHR4b2Zmc2V0ID0gTWF0aC5tYXgoeG9mZnNldCwgeCk7XG5cdFx0fVxuXHRcdHRoaXMuZ2VuZXJhdGUoeG9mZnNldCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHQpe1xuXHRcdC8vc3VwZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKVxuXHRcdHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24oKTtcblx0fVxufSIsImZ1bmN0aW9uIGFzbSgpe1xuXHQndXNlIGFzbSc7XG5cdC8vIHQ6IGN1cnJlbnQgdGltZVxuXHQvLyBiOiBzdGFydCB2YWx1ZVxuXHQvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0Ly8gZDogZHVyYWl0b25cblxuXHRmdW5jdGlvbiBsaW5lYXJUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHJldHVybiArKGMqdC9kICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5RdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKGMqdCp0ICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKygtYyp0Kih0LTIpICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5PdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0IC89IGQvMjtcblx0XHRpZiAodCA8IDEpIHJldHVybiArKGMvMip0KnQgKyBiKTtcblx0XHQtLXQ7XG5cdFx0cmV0dXJuICsoLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGluZWFyVHdlZW46IGxpbmVhclR3ZWVuLFxuXHRcdGVhc2VJblF1YWRUd2VlbjogZWFzZUluUXVhZFR3ZWVuLFxuXHRcdGVhc2VPdXRRdWFkVHdlZW46IGVhc2VPdXRRdWFkVHdlZW4sXG5cdFx0ZWFzZUluT3V0UXVhZFR3ZWVuOiBlYXNlSW5PdXRRdWFkVHdlZW5cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsX3JhbmRvbSgpIHtcblx0Ly8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXG4gICAgdmFyIHUgPSAxIC0gTWF0aC5yYW5kb20oKTsgLy8gU3VidHJhY3Rpb24gdG8gZmxpcCBbMCwgMSkgdG8gKDAsIDFdLlxuICAgIHZhciB2ID0gMSAtIE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIE1hdGguc3FydCggLTIuMCAqIE1hdGgubG9nKCB1ICkgKSAqIE1hdGguY29zKCAyLjAgKiBNYXRoLlBJICogdiApO1xufVxuXG5leHBvcnQgdmFyIGxpbmVhclR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5RdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VPdXRRdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJbk91dFF1YWRUd2VlbjtcblxuIWZ1bmN0aW9uIGluaXQoKXtcblx0dmFyIGV4cG9ydGVkID0gYXNtKCk7XG5cdGxpbmVhclR3ZWVuID0gZXhwb3J0ZWQubGluZWFyVHdlZW47XG5cdGVhc2VJblF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJblF1YWRUd2Vlbjtcblx0ZWFzZU91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VPdXRRdWFkVHdlZW47XG5cdGVhc2VJbk91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJbk91dFF1YWRUd2Vlbjtcblx0cmV0dXJuIGV4cG9ydGVkO1xufSgpO1xuIl19
