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
var RATIO = exports.RATIO = HEIGHT / WIDTH;
var BASE_LINE = exports.BASE_LINE = HEIGHT * 0.667; // How far from the top the player will appear
var BASE_MARGIN = exports.BASE_MARGIN = WIDTH * 0.2; // How far from the left the player will appear
var HORIZON = exports.HORIZON = HEIGHT * 0.8; // Apparent position of the horizon on the screen
var CAMERA_DISTANCE = exports.CAMERA_DISTANCE = 100; // Distance in feet that the camera is away form the plane of the player
var CAMERA_ANGLE_DEG = exports.CAMERA_ANGLE_DEG = 90;
var FIELD_OF_VIEW = exports.FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
var RUN_MAX_SPEED = exports.RUN_MAX_SPEED = -WIDTH * 1.5;
var RUN_TIME_TO_MAX_SPEED = exports.RUN_TIME_TO_MAX_SPEED = 3 * 60;
var GRAVITY = exports.GRAVITY = 0 * -98.7;

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
		var distantClouds = new _terrain2.default(0, config.HORIZON / 2, 50 * 5280, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var mountain = new _terrain2.default(0, config.HORIZON, 30 * 5280, [this.assets['BG_MOUNTAIN']]);
		var clouds = new _terrain2.default(0, config.HORIZON / 2, 20 * 5280, [this.assets['BG_CLOUD_00'], this.assets['BG_CLOUD_01'], this.assets['BG_CLOUD_02'], this.assets['BG_CLOUD_03'], this.assets['BG_CLOUD_04'], this.assets['BG_CLOUD_05']]);
		var hill1 = new _terrain2.default(0, config.HORIZON, 1 * 5280, [this.assets['BG_HILL']]);
		var hill2 = new _terrain2.default(0, config.HORIZON, config.CAMERA_DISTANCE, [this.assets['BG_HILL']]);
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
			ctx.stroke();
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
		}
	}]);

	return Scenery;
}(_setpiece2.default);

exports.default = Scenery;

},{"./setpiece":8,"./sprite":10}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2NlbmVyeS5qcyIsInNyYy9zZXRwaWVjZS5qcyIsInNyYy9za3kuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksU0FBUyxJQUFiLEFBQWEsQUFBSTtBQUNqQixPQUFBLEFBQU8sTUFBUCxBQUFhOzs7O2NBTUQscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFB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Rk0sQUFFVyxBQUNqQjtvQkFITSxBQUdZLEFBQ2xCO3NCQUpELEFBQU8sQUFJYyxBQUVyQjtBQU5PLEFBQ047OztBQU9LLFNBQUEsQUFBUyxnQkFBZ0IsQUFFNUI7O0tBQUksSUFBSSxJQUFJLEssQUFBWixBQUFZLEFBQUssQUFDakI7S0FBSSxJQUFJLElBQUksS0FBWixBQUFZLEFBQUssQUFDakI7UUFBTyxLQUFBLEFBQUssS0FBTSxDQUFBLEFBQUMsTUFBTSxLQUFBLEFBQUssSUFBdkIsQUFBa0IsQUFBVSxNQUFRLEtBQUEsQUFBSyxJQUFLLE1BQU0sS0FBTixBQUFXLEtBQWhFLEFBQTJDLEFBQTBCLEFBQ3hFOzs7QUFFTSxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVQLENBQUMsU0FBQSxBQUFTLE9BQU0sQUFDZjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQO0FBUEQsQUFBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxudmFyIGRydWlkUnVuID0gbmV3IEltYWdlKCk7XG5kcnVpZFJ1bi5zcmMgPSAnL2Fzc2V0cy9ydW4tY3ljbGUtdGVzdC5wbmcnO1xuXG52YXIgYmdfbW91bnRhaW4gPSBuZXcgSW1hZ2UoKTtcbmJnX21vdW50YWluLnNyYyA9ICcvYXNzZXRzL2JnLW1vdW50YWluLnBuZyc7XG5cbnZhciBiZ19oaWxsID0gbmV3IEltYWdlKCk7XG5iZ19oaWxsLnNyYyA9ICcvYXNzZXRzL2JnLWhpbGwucG5nJztcblxuXG4vLz09PT09IENsb3Vkcz09PT09XG52YXIgYmdfY2xvdWQgPSBuZXcgSW1hZ2UoKTtcbmJnX2Nsb3VkLnNyYyA9ICcvYXNzZXRzL2JnLWNsb3Vkcy10cmFuc3BhcmVudC5wbmcnO1xuXG52YXIgYmdfc2t5ID0gbmV3IEltYWdlKCk7XG5iZ19za3kuc3JjID0gJy9hc3NldHMvYmctc2t5LnBuZyc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0RFJVSURfUlVOOiBuZXcgU3ByaXRlKGRydWlkUnVuLCAwLCAwLCA0OCwgNDgsIDgpLFxuICAgIEJHX01PVU5UQUlOOiBuZXcgU3ByaXRlKGJnX21vdW50YWluLCAwLCAwLCAxNTM2LCA3NjcsIDEpLFxuICAgIEJHX0hJTEw6IG5ldyBTcHJpdGUoYmdfaGlsbCwgMCwgMCwgMTAyNCwgMzA2LCAxKSxcbiAgICBCR19DTE9VRF8wMDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMCwgMjE2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDE6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDQ4LCAyMTYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wMjogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCAwLCAyODYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMzogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCA0OCwgMjg2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDQ6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDExMiwgNTAyLCA3MiwgMSksXG4gICAgQkdfQ0xPVURfMDU6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDE4NCwgNTAyLCA3MiwgMSksXG4gICAgQkdfU0tZOiBuZXcgU3ByaXRlKGJnX3NreSwgMCwgMCwgMSwgMSwgMSlcblxufTsiLCJcbmV4cG9ydCBjb25zdCBGUFMgID0gMjQ7XG5leHBvcnQgY29uc3QgU1RFUCA9IDEvRlBTO1xuZXhwb3J0IGNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuZXhwb3J0IGNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuZXhwb3J0IGNvbnN0IEJBU0VfTElORSA9IEhFSUdIVCAqIDAuNjY3OyAvLyBIb3cgZmFyIGZyb20gdGhlIHRvcCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgQkFTRV9NQVJHSU4gPSBXSURUSCAqIDAuMjsgLy8gSG93IGZhciBmcm9tIHRoZSBsZWZ0IHRoZSBwbGF5ZXIgd2lsbCBhcHBlYXJcbmV4cG9ydCBjb25zdCBIT1JJWk9OID0gSEVJR0hUICogMC44OyAvLyBBcHBhcmVudCBwb3NpdGlvbiBvZiB0aGUgaG9yaXpvbiBvbiB0aGUgc2NyZWVuXG5leHBvcnQgY29uc3QgQ0FNRVJBX0RJU1RBTkNFID0gMTAwOyAvLyBEaXN0YW5jZSBpbiBmZWV0IHRoYXQgdGhlIGNhbWVyYSBpcyBhd2F5IGZvcm0gdGhlIHBsYW5lIG9mIHRoZSBwbGF5ZXJcbmV4cG9ydCBjb25zdCBDQU1FUkFfQU5HTEVfREVHID0gOTA7XG5leHBvcnQgY29uc3QgRklFTERfT0ZfVklFVyA9IDIgKiBNYXRoLnNpbihDQU1FUkFfQU5HTEVfREVHIC8gMiAqIChNYXRoLlBJIC8gMTgwKSkgKiBDQU1FUkFfRElTVEFOQ0UgLyBNYXRoLnNpbigoMTgwIC0gOTAgLSBDQU1FUkFfQU5HTEVfREVHIC8gMikgKiAoTWF0aC5QSSAvIDE4MCkpOyAvLyBWaXNpYmxlIGFyZWEgb24gdGhlIHBsYW5lIG9mIHRoZSBwbGF5ZXJcbmV4cG9ydCBjb25zdCBSVU5fTUFYX1NQRUVEID0gLVdJRFRIICogMS41O1xuZXhwb3J0IGNvbnN0IFJVTl9USU1FX1RPX01BWF9TUEVFRCA9IDMgKiA2MDtcbmV4cG9ydCBjb25zdCBHUkFWSVRZID0gMCotOTguNzsiLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHcm91bmQgZnJvbSAnLi9ncm91bmQnO1xuaW1wb3J0IFRlcnJhaW4gZnJvbSAnLi90ZXJyYWluJztcbmltcG9ydCBTa3kgZnJvbSAnLi9za3knO1xuXG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0cmVuZGVyaW5nTGF5ZXJzID0gW107XG5cdHNjZW5lcnkgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdGxldCBzdGVwID0gY29uZmlnLlNURVA7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IHN0ZXApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBzdGVwO1xuXHRcdFx0dGhpcy51cGRhdGUoc3RlcCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gY29uZmlnLldJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIGNvbmZpZy5SQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihcblx0XHRcdGNvbmZpZy5CQVNFX01BUkdJTixcblx0XHRcdGNvbmZpZy5IT1JJWk9OLFxuXHRcdFx0Y29uZmlnLkNBTUVSQV9ESVNUQU5DRSxcblx0XHRcdG51bGwsXG5cdFx0XHRudWxsLFxuXHRcdFx0dGhpcy5hc3NldHNbJ0RSVUlEX1JVTiddLFxuXHRcdFx0dGhpcy5mcmFtZUlkXG5cdFx0KTtcblxuXHRcdGxldCBza3kgPSBuZXcgU2t5KHRoaXMuYXNzZXRzWydCR19TS1knXSk7XG5cdFx0bGV0IGRpc3RhbnRDbG91ZHMgPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiAvIDIsIDUwICogNTI4MCwgW3RoaXMuYXNzZXRzWydCR19DTE9VRF8wMCddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDEnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAyJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMyddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDQnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA1J11dKTtcblx0XHRsZXQgbW91bnRhaW4gPSBuZXcgVGVycmFpbigwLCBjb25maWcuSE9SSVpPTiwgMzAgKiA1MjgwLCBbdGhpcy5hc3NldHNbJ0JHX01PVU5UQUlOJ11dKTtcblx0XHRsZXQgY2xvdWRzID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04gLyAyLCAyMCAqIDUyODAsIFt0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDAnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzAxJ10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wMiddLCB0aGlzLmFzc2V0c1snQkdfQ0xPVURfMDMnXSwgdGhpcy5hc3NldHNbJ0JHX0NMT1VEXzA0J10sIHRoaXMuYXNzZXRzWydCR19DTE9VRF8wNSddXSk7XG5cdFx0bGV0IGhpbGwxID0gbmV3IFRlcnJhaW4oMCwgY29uZmlnLkhPUklaT04sIDEgKiA1MjgwLCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0pO1xuXHRcdGxldCBoaWxsMiA9IG5ldyBUZXJyYWluKDAsIGNvbmZpZy5IT1JJWk9OLCBjb25maWcuQ0FNRVJBX0RJU1RBTkNFLCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0pO1xuXHRcdGxldCBncm91bmQgPSBuZXcgR3JvdW5kKCk7XG5cblx0XHR0aGlzLnNjZW5lcnkucHVzaChza3kpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKG1vdW50YWluKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChjbG91ZHMpO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChoaWxsMik7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goZ3JvdW5kKTtcblxuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goc2t5KTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGRpc3RhbnRDbG91ZHMpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobW91bnRhaW4pO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goY2xvdWRzKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGdyb3VuZCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHQvLyBUaGUgcGxheWVyJ3MgcG9zaXRpb24gZG9lc24ndCBtb3ZlLCBpbnN0ZWFkIHRoZSBwbGF5ZXIgY2hhbmdlcyB0aGUgc3RhZ2VEeCAmIHN0YWdlRHksXG5cdFx0Ly8gd2hpY2ggdGhlbiBpcyB1c2VkIHRvIHVwZGF0ZSBhbGwgdGhlIHNjZW5lcnlcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHQvLyBNYXRjaCB0aGUgd2lkdGggb2YgdGhlIHNjcmVlbiBhbmQgdGhlblxuXHRcdC8vIENlbnRlciB0aGUgc2NhbGVkIGltYWdlIHZlcnRpY2FsbHkgb24gdGhlIHNjcmVlblxuXHRcdGxldCB3ID0gY3ZzLndpZHRoO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodDtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQgZXh0ZW5kcyBTZXRQaWVjZSB7XG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaXRlcyl7XG5cdFx0c3VwZXIoeCwgeSwgeilcblx0XHR0aGlzLnNlZ21lbnRzID0gW107XG5cdFx0dGhpcy50eXBlID0gJ2dyb3VuZCc7XG5cblx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdHg6IDAsXG5cdFx0XHR5OiB0aGlzLnksXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogdGhpcy55LFxuXHRcdFx0Y3AyeDogY29uZmlnLldJRFRIICogMC41LFxuXHRcdFx0Y3AyeTogdGhpcy55LFxuXHRcdFx0ZW5keDogY29uZmlnLldJRFRILFxuXHRcdFx0ZW5keTogdGhpcy55XG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHRsZXQgbGFzdCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgY29uZmlnLldJRFRIO1xuXHRcdFx0bGV0IGVuZHkgPSB5ICsgdGhpcy55ICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgdmFyaWFuY2UgPSAoY29uZmlnLldJRFRIIC8gNSkgKyAoY29uZmlnLldJRFRIIC8gMykgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0XHRsZXQgY3AyeCA9IGVuZHggLSB2YXJpYW5jZTtcblx0XHRcdGxldCBjcDJ5ID0gZW5keSAtIHZhcmlhbmNlICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdFx0eDogeCxcblx0XHRcdFx0eTogeSxcblx0XHRcdFx0Y3AxeDogY3AxeCxcblx0XHRcdFx0Y3AxeTogY3AxeSxcblx0XHRcdFx0Y3AyeDogY3AyeCxcblx0XHRcdFx0Y3AyeTogY3AyeSxcblx0XHRcdFx0ZW5keDogZW5keCxcblx0XHRcdFx0ZW5keTogZW5keVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRcdGxhc3QgPSBzZWdtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0XHRpZiAoc2VnbWVudC5lbmR4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2VnbWVudHMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGxldCBpID0gMDtcblx0XHRsZXQgcyA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8ocy54LCBzLnkpO1xuXHRcdHdoaWxlIChzKXtcblx0XHRcdGN0eC5iZXppZXJDdXJ2ZVRvKHMuY3AxeCwgcy5jcDF5LCBzLmNwMngsIHMuY3AyeSwgcy5lbmR4LCBzLmVuZHkpO1xuXHRcdFx0cyA9IHRoaXMuc2VnbWVudHNbKytpXTtcblx0XHR9XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHQvLyBNb3ZlbWVudCByZWxhdGl2ZSB0byB0aGUgc3RhZ2Vcblx0XHQvLyBDYWxjdWxhdGUgdGhlIGZpZWxkIG9mIHZpZXcgb2YgdGhlIHBsYW5lIGJhc2VkIG9uIGl0cyBkaXN0YW5jZSBmcm9tIHRoZSBjYW1lcmFcblx0XHQvLyBBbmQgdGhlbiB3ZSBtb3ZlIGl0IGEgZnJhY3Rpb24gb2YgdGhlIGFtb3VudCB0aGUgcGxheWVyJ3MgcGxhbmUgbW92ZXNcblx0XHRzdXBlci51cGRhdGUoZHQpO1xuXHRcdGxldCBkeCA9IHRoaXMuZHggKiBkdDtcblx0XHRsZXQgZHkgPSB0aGlzLmR5ICogZHQ7XG5cdFx0dGhpcy5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50KSA9PiB7XG5cdFx0XHRzZWdtZW50LnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LnkgKz0gZHQ7XG5cdFx0XHRzZWdtZW50LmNwMXggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMXkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmVuZHggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmVuZHkgKz0gZHk7XG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5pbXBvcnQgYXNzZXRzIGZyb20gJy4vYXNzZXRzJ1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSwgYXNzZXRzKTtcblxuXG4hZnVuY3Rpb24gd2FpdEZvckNvbnRlbnQoKXtcblx0Ly8gV2FpdCBmb3IgY29udGVudCB0byBiZSByZXRyZWl2ZWQgYnkgdGhlIGJyb3dzZXJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuXHRcdC8vIFRPRE8uLi5cblx0fSk7XG59KClcbi50aGVuKGdhbWUuc3RhcnQpO1xuXG4vL2dhbWUuZGVidWcgPSB0cnVlO1xuZ2FtZS5zdGFydCgpOyIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2Vhc2VPdXRRdWFkVHdlZW59IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9zY2VuZXJ5JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBTY2VuZXJ5IHtcblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKXtcblx0XHRzdXBlcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpO1xuXHRcdHRoaXMudHlwZSA9ICdwbGF5ZXInO1xuXHRcdHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHR0aGlzLmVsYXBzZWRUaW1lICs9IGR0O1xuXHRcdGxldCB0LCBiLCBjLCBkLCBkeCwgZGR5O1xuXHRcdFxuXHRcdGlmICh0aGlzLmVsYXBzZWRUaW1lID49IGNvbmZpZy5SVU5fVElNRV9UT19NQVhfU1BFRUQpIHtcblx0XHRcdC8vIE5vIGNoYW5nZSB0byBzdGFnZUR4XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIFJhbXBpbmcgdXAgc3BlZWRcblx0XHRcdHQgPSB0aGlzLmVsYXBzZWRUaW1lOy8vIHQ6IGN1cnJlbnQgdGltZVxuXHRcdFx0YiA9IDA7Ly8gYjogc3RhcnQgdmFsdWVcblx0XHRcdGMgPSBjb25maWcuUlVOX01BWF9TUEVFRDsvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0XHRcdGQgPSBjb25maWcuUlVOX1RJTUVfVE9fTUFYX1NQRUVEOy8vIGQ6IGR1cmFpdG9uXG5cdFx0XHRkeCA9IGVhc2VPdXRRdWFkVHdlZW4odCwgYiwgYywgZCk7IC8vIFRoZSByYXRlIHRoYXQgcGxheWVyIGlzIG1vdmluZyBmb3J3YXJkXG5cdFx0XHR0aGlzLnN0YWdlRHggPSBkeDtcblx0XHR9XG5cdFx0XG5cdFx0ZGR5ID0gY29uZmlnLkdSQVZJVFk7XG5cdFx0dGhpcy5zdGFnZUR5ICs9IGR0ICogZGR5O1xuXHR9XG59IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5pbXBvcnQgU2V0UGllY2UgZnJvbSAnLi9zZXRwaWVjZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lcnkgZXh0ZW5kcyBTZXRQaWVjZSB7XG5cblx0Ly8gU2NlbmVyeSBhcmUgc2V0IHBpZWNlcyB0aGF0IGhhdmUgYW5pbWF0ZWQgc3ByaXRlc1xuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCl7XG5cdFx0c3VwZXIoeCwgeSwgeik7XG5cblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLncgPSB3aWR0aCAgfHwgdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSBoZWlnaHQgfHwgdGhpcy5zcHJpdGUuc2h8MDtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0dGhpcy50eXBlID0gJ3NjZW5lcnknO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSB8fCAhdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybjtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZUlkKTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnktdGhpcy5oLCB0aGlzLncsIHRoaXMuaCk7XG5cdH1cblxufSIsIi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZSwgYW5kIGNhbWVyYSBzdHVmZiB0byBhIGNhbWVyYSBvYmplY3RcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmV4cG9ydCB2YXIgc3RhZ2VEeCA9IDA7XG5leHBvcnQgdmFyIHN0YWdlRHkgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXRQaWVjZSB7XG5cdFxuXHQvLyBBbGwgc2V0IHBpZWNlcyBtb3ZlIHRvZ2V0aGVyIGluIHJlc3BvbnNlIHRvIHRoZSBwbGF5ZXIncyBtb3ZlbWVudFxuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHope1xuXHRcdGlmIChuZXcudGFyZ2V0ID09PSBTZXRQaWVjZSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNyZWF0ZSBpbnN0YW5jZXMgb2YgYWJzdHJhY3QgY2xhc3MgU2V0UGllY2UnKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSByZW5kZXIgZnVuY3Rpb24nKTtcblx0XHR9XG5cblx0XHR0aGlzLnggPSB4fHwwO1xuXHRcdHRoaXMueSA9IHl8fDA7XG5cdFx0dGhpcy56ID0genx8MDtcblx0fVxuXG5cdC8vIHJlbmRlciBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBieSBjaGlsZCBjbGFzc2VzXG5cblx0dXBkYXRlKGR0KXtcblx0XHQvLyBNb3ZlbWVudCByZWxhdGl2ZSB0byB0aGUgc3RhZ2Vcblx0XHQvLyBDYWxjdWxhdGUgdGhlIGZpZWxkIG9mIHZpZXcgb2YgdGhlIHBsYW5lIGJhc2VkIG9uIGl0cyBkaXN0YW5jZSBmcm9tIHRoZSBjYW1lcmFcblx0XHQvLyBBbmQgdGhlbiB3ZSBtb3ZlIGl0IGEgZnJhY3Rpb24gb2YgdGhlIGFtb3VudCB0aGUgcGxheWVyJ3MgcGxhbmUgbW92ZXNcblx0XHRsZXQgekZpZWxkT2ZWaWV3ID0gKDIgKiBNYXRoLnNpbihjb25maWcuQ0FNRVJBX0FOR0xFX0RFRyAvIDIgKiAoTWF0aC5QSSAvIDE4MCkpICogdGhpcy56IC8gTWF0aC5zaW4oKDE4MCAtIDkwIC0gY29uZmlnLkNBTUVSQV9BTkdMRV9ERUcgLyAyKSAqIChNYXRoLlBJIC8gMTgwKSkpO1xuXHRcdGxldCB6RmFjdG9yID0gY29uZmlnLkZJRUxEX09GX1ZJRVcgLyB6RmllbGRPZlZpZXc7XG5cdFx0dGhpcy5keCA9IHRoaXMuc3RhZ2VEeCAqIHpGYWN0b3I7XG5cdFx0dGhpcy5keSA9IHRoaXMuc3RhZ2VEeSAqIHpGYWN0b3I7XG5cdFx0dGhpcy54ICs9IHRoaXMuZHggKiBkdDtcblx0XHR0aGlzLnkgKz0gdGhpcy5keSAqIGR0O1xuXHR9XG5cblx0c2V0IHN0YWdlRHggKGR4KXtcblx0XHRzdGFnZUR4ID0gZHg7XG5cdH1cblxuXHRnZXQgc3RhZ2VEeCAoKXtcblx0XHRyZXR1cm4gc3RhZ2VEeDtcblx0fVxuXG5cdHNldCBzdGFnZUR5IChkeSl7XG5cdFx0c3RhZ2VEeSA9IGR5O1xuXHR9XG5cblx0Z2V0IHN0YWdlRHkgKCl7XG5cdFx0cmV0dXJuIHN0YWdlRHk7XG5cdH1cbn0iLCJpbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2t5IGV4dGVuZHMgU2NlbmVyeSB7XG5cblx0Y29uc3RydWN0b3Ioc3ByaXRlKXtcblx0XHRzdXBlcigwLCAwLCAwLCBXSURUSCwgSEVJR0hULCBzcHJpdGUsIDApXG5cdFx0dGhpcy50eXBlID0gJ3NreSc7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG5cdH1cblx0XG5cdHVwZGF0ZSgpe1xuXHRcdC8vIG5vcFxuXHR9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuXHQvLyBTcHJpdGVzIGRlZmluZSBhIHNlcmllcyBvZiBrZXlmcmFtZSBhbmltYXRpb25zXG5cdFxuXHRrZXlGcmFtZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3RvciAoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBudW1LZXlGcmFtZXMpIHtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy5zeCA9IHN4fDA7XG5cdFx0dGhpcy5zeSA9IHN5fDA7XG5cdFx0dGhpcy5zdyA9IHN3fDA7XG5cdFx0dGhpcy5zaCA9IHNofDA7XG5cdFx0dGhpcy5udW1LZXlGcmFtZXMgPSBNYXRoLm1heChudW1LZXlGcmFtZXN8MCwgMSk7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLm51bUtleUZyYW1lczsgKytpKXtcblx0XHRcdGxldCBrZXlGcmFtZSA9IHtcblx0XHRcdFx0aW1hZ2U6IHRoaXMuaW1hZ2UsXG5cdFx0XHRcdHN4OiB0aGlzLnN4ICsgdGhpcy5zdyAqIGksXG5cdFx0XHRcdHN5OiB0aGlzLnN5LFxuXHRcdFx0XHRzdzogdGhpcy5zdyxcblx0XHRcdFx0c2g6IHRoaXMuc2hcblx0XHRcdH07XG5cdFx0XHR0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcblx0XHR9XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRmcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHJldHVybiB0aGlzLmtleUZyYW1lc1tmcmFtZUlkICUgdGhpcy5udW1LZXlGcmFtZXNdO1xuXHR9XG59XG4iLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5pbXBvcnQgU2V0UGllY2UsIHtzdGFnZUR4LCBzdGFnZUR5fSBmcm9tICcuL3NldHBpZWNlJztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVycmFpbiBleHRlbmRzIFNldFBpZWNle1xuXG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaXRlcyl7XG5cdFx0c3VwZXIoeCwgeSwgeilcblx0XHR0aGlzLnNjZW5lcnkgPSBbXTtcblx0XHR0aGlzLnNwcml0ZXMgPSBzcHJpdGVzIHx8IFtdO1xuXHRcdHRoaXMudHlwZSA9ICd0ZXJyYWluJztcblx0XHR0aGlzLmdlbmVyYXRlKC1jb25maWcuV0lEVEgpO1xuXHR9XG5cblx0Y3JlYXRlU2NlbmVyeSh4b2Zmc2V0KXtcblx0XHRsZXQgc3ByaXRlID0gdGhpcy5zcHJpdGVzWyhNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aCl8MF07XG5cdFx0bGV0IHggPSB4b2Zmc2V0ICsgc3ByaXRlLnN3ICogMC43NSArIHNwcml0ZS5zdyAvIDIgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0bGV0IHkgPSB0aGlzLnk7XG5cdFx0bGV0IHogPSB0aGlzLno7XG5cdFx0bGV0IHcgPSBzcHJpdGUuc3c7XG5cdFx0bGV0IGggPSBzcHJpdGUuc2g7XG5cdFx0bGV0IGZyYW1lSWQgPSAwO1xuXG5cdFx0bGV0IHNjZW5lcnkgPSBuZXcgU2NlbmVyeSh4LCB5LCB6LCB3LCBoLCBzcHJpdGUsIGZyYW1lSWQpXG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goc2NlbmVyeSk7XG5cdFx0cmV0dXJuIHggKyBzcHJpdGUuc3c7IC8vIFJldHVybiB0aGUgYW1vdW50IG9mIG9mZnNldFx0XHRcblx0fVxuXG5cdGdlbmVyYXRlKHhvZmZzZXQpe1xuXHRcdC8vIEFkZCBtb3JlIHNjZW5lcnkgdW50aWwgd2UgYXJlIGJleW9uZCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuICsgZGlzdGFuY2Ugc2NlbmUgZHhcblx0XHRpZiAoIXRoaXMuc3ByaXRlcy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGlmICgheG9mZnNldClcblx0XHRcdHhvZmZzZXQgPSB0aGlzLnNjZW5lcnkucmVkdWNlKCh4LCBzKSA9PiBNYXRoLm1heCh4LCBzLnggKyBzLncpLCAwKTtcblx0XHR3aGlsZSh4b2Zmc2V0IDwgY29uZmlnLldJRFRIICogMiArIHRoaXMuc3RhZ2VEeCl7XG5cdFx0XHR4b2Zmc2V0ID0gdGhpcy5jcmVhdGVTY2VuZXJ5KHhvZmZzZXQpO1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0bGV0IHhvZmZzZXQgPSAwO1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2NlbmVyeS5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2NlbmVyeSA9IHRoaXMuc2NlbmVyeVtpXTtcblx0XHRcdGxldCB4ID0gc2NlbmVyeS54ICsgc2NlbmVyeS53O1xuXHRcdFx0aWYgKHggPCAwKXtcblx0XHRcdFx0dGhpcy5zY2VuZXJ5LnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdjb2xsZWN0aW5nIGdhcmJhZ2UnKTtcblx0XHRcdH1cblx0XHRcdHhvZmZzZXQgPSBNYXRoLm1heCh4b2Zmc2V0LCB4KTtcblx0XHR9XG5cdFx0dGhpcy5nZW5lcmF0ZSh4b2Zmc2V0KTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdHRoaXMuc2NlbmVyeS5mb3JFYWNoKChzY2VuZXJ5KSA9PiBzY2VuZXJ5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly9zdXBlci51cGRhdGUoZHQpO1xuXHRcdHRoaXMuc2NlbmVyeS5mb3JFYWNoKChzY2VuZXJ5KSA9PiBzY2VuZXJ5LnVwZGF0ZShkdCkpXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxfcmFuZG9tKCkge1xuXHQvLyBTdGFuZGFyZCBOb3JtYWwgdmFyaWF0ZSB1c2luZyBCb3gtTXVsbGVyIHRyYW5zZm9ybS5cbiAgICB2YXIgdSA9IDEgLSBNYXRoLnJhbmRvbSgpOyAvLyBTdWJ0cmFjdGlvbiB0byBmbGlwIFswLCAxKSB0byAoMCwgMV0uXG4gICAgdmFyIHYgPSAxIC0gTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCAtMi4wICogTWF0aC5sb2coIHUgKSApICogTWF0aC5jb3MoIDIuMCAqIE1hdGguUEkgKiB2ICk7XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG4hZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59KCk7XG4iXX0=
