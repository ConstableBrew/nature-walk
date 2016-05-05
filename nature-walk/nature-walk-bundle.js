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
var HORIZON = exports.HORIZON = HEIGHT / 2; // Apparent position of the horizon on the screen
var CAMERA_DISTANCE = exports.CAMERA_DISTANCE = 100; // Distance in feet that the camera is away form the plane of the player
var CAMERA_ANGLE_DEG = exports.CAMERA_ANGLE_DEG = 90;
var FIELD_OF_VIEW = exports.FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player
var RUN_MAX_SPEED = exports.RUN_MAX_SPEED = -WIDTH * 5;
var RUN_TIME_TO_MAX_SPEED = exports.RUN_TIME_TO_MAX_SPEED = 5 * 60;
var GRAVITY = exports.GRAVITY = 0 * 987;

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
			//while(this.dt > step) {
			//	this.frameId = (this.frameId + 1)|0;
			//	this.dt -= step;
			this.update(step);
			//}
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
		this.player = new _player2.default(config.BASE_MARGIN, config.BASE_LINE, config.CAMERA_DISTANCE, null, null, this.assets['DRUID_RUN'], this.frameId);

		var sky = new _sky2.default(this.assets['BG_SKY']);
		var mountain = new _terrain2.default(0, 0, 30 * 5280, [this.assets['BG_MOUNTAIN']]);
		var hill1 = new _terrain2.default(0, 0, 5 * 5280, [this.assets['BG_HILL']]);
		var hill2 = new _terrain2.default(0, 0, 1 * 5280, [this.assets['BG_HILL']]);
		var ground = new _ground2.default();

		this.scenery.push(sky);
		this.scenery.push(mountain);
		this.scenery.push(hill1);
		this.scenery.push(hill2);
		this.scenery.push(ground);

		this.renderingLayers.push(sky);
		this.renderingLayers.push(mountain);
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
			// Update the player first, then move the player back to the static position. Use the delta of the player to adjust the other layers
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

var Ground = function () {
	function Ground() {
		_classCallCheck(this, Ground);

		this.segments = [];

		this.type = 'ground';
		var segment = {
			x: 0,
			y: config.BASE_LINE,
			cp1x: 0,
			cp1y: config.BASE_LINE,
			cp2x: config.WIDTH * 0.6667,
			cp2y: config.BASE_LINE,
			endx: config.WIDTH,
			endy: config.BASE_LINE
		};
		this.segments.push(segment);
		console.log(segment);
		this.generate();
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
				var endy = y + config.HEIGHT * (0, _utils.normal_random)();

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
		value: function update(dx, dy) {
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
		}
	}]);

	return Ground;
}();

exports.default = Ground;

},{"./config":2,"./utils":12}],5:[function(require,module,exports){
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
			var t = this.elapsedTime; // t: current time
			var b = 0; // b: start value
			var c = config.RUN_MAX_SPEED; // c: change in value
			var d = config.RUN_TIME_TO_MAX_SPEED; // d: duraiton
			var ddx = (0, _utils.easeInOutQuadTween)(t, b, c, d); // The rate that player is moving forward
			var ddy = config.GRAVITY;
			console.log('ddx:', ddx, 'ddy:', ddy);
			this.stageDx += dt * ddx;
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
			ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, this.w, this.h);
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

console.log('SetPiece');

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
			var zFactor = this.z / config.FIELD_OF_VIEW;
			var dx = this.stageDx * zFactor;
			var dy = this.stageDy * zFactor;
			this.x += dx * dt;
			this.y += dy * dt;
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

		_this.generate();
		return _this;
	}

	_createClass(Terrain, [{
		key: 'generate',
		value: function generate(xoffset) {
			// Add more scenery until we are beyond the edge of the screen + distance scene dx
			if (!this.sprites.length) return;

			if (!xoffset) xoffset = this.scenery.reduce(function (x, s) {
				return Math.max(x, s.x + s.w);
			}, 0);

			while (xoffset < config.WIDTH + _setpiece.stageDx) {
				var sprite = this.sprites[Math.random() * this.sprites.length | 0];
				var x = xoffset + sprite.w + sprite.w / 2 * (0, _utils.normal_random)();
				var y = this.y;
				var z = this.z;
				var w = sprite.w;
				var h = sprite.h;
				var frameId = 0;

				var scenery = new _scenery2.default(x, y, z, w, h, sprite, frameId);
				this.scenery.push(scenery);

				xoffset = x + sprite.w;
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
			_get(Object.getPrototypeOf(Terrain.prototype), 'update', this).call(this, dt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2NlbmVyeS5qcyIsInNyYy9zZXRwaWVjZS5qcyIsInNyYy9za3kuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksU0FBUyxJQUFiLEFBQWEsQUFBSTtBQUNqQixPQUFBLEFBQU8sTUFBUCxBQUFhOzs7O2NBTUQscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFB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SCxBQUFLLEtBQWIsQUFBa0IsS0FBM0IsQUFBTyxBQUF5QixBQUNoQztBQUVEOzs7ZUFBTyxBQUNPLEFBQ2I7bUJBRk0sQUFFVyxBQUNqQjtvQkFITSxBQUdZLEFBQ2xCO3NCQUpELEFBQU8sQUFJYyxBQUVyQjtBQU5PLEFBQ047OztBQU9LLFNBQUEsQUFBUyxnQkFBZ0IsQUFFNUI7O0tBQUksSUFBSSxJQUFJLEssQUFBWixBQUFZLEFBQUssQUFDakI7S0FBSSxJQUFJLElBQUksS0FBWixBQUFZLEFBQUssQUFDakI7UUFBTyxLQUFBLEFBQUssS0FBTSxDQUFBLEFBQUMsTUFBTSxLQUFBLEFBQUssSUFBdkIsQUFBa0IsQUFBVSxNQUFRLEtBQUEsQUFBSyxJQUFLLE1BQU0sS0FBTixBQUFXLEtBQWhFLEFBQTJDLEFBQTBCLEFBQ3hFOzs7QUFFTSxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVQLENBQUMsU0FBQSxBQUFTLE9BQU0sQUFDZjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQO0FBUEQsQUFBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxudmFyIGRydWlkUnVuID0gbmV3IEltYWdlKCk7XG5kcnVpZFJ1bi5zcmMgPSAnL2Fzc2V0cy9ydW4tY3ljbGUtdGVzdC5wbmcnO1xuXG52YXIgYmdfbW91bnRhaW4gPSBuZXcgSW1hZ2UoKTtcbmJnX21vdW50YWluLnNyYyA9ICcvYXNzZXRzL2JnLW1vdW50YWluLnBuZyc7XG5cbnZhciBiZ19oaWxsID0gbmV3IEltYWdlKCk7XG5iZ19oaWxsLnNyYyA9ICcvYXNzZXRzL2JnLWhpbGwucG5nJztcblxuXG4vLz09PT09IENsb3Vkcz09PT09XG52YXIgYmdfY2xvdWQgPSBuZXcgSW1hZ2UoKTtcbmJnX2Nsb3VkLnNyYyA9ICcvYXNzZXRzL2JnLWNsb3Vkcy10cmFuc3BhcmVudC5wbmcnO1xuXG52YXIgYmdfc2t5ID0gbmV3IEltYWdlKCk7XG5iZ19za3kuc3JjID0gJy9hc3NldHMvYmctc2t5LnBuZyc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0RFJVSURfUlVOOiBuZXcgU3ByaXRlKGRydWlkUnVuLCAwLCAwLCA0OCwgNDgsIDgpLFxuICAgIEJHX01PVU5UQUlOOiBuZXcgU3ByaXRlKGJnX21vdW50YWluLCAwLCAwLCAxNTM2LCA3NjcsIDEpLFxuICAgIEJHX0hJTEw6IG5ldyBTcHJpdGUoYmdfaGlsbCwgMCwgMCwgMTAyNCwgMzA2LCAxKSxcbiAgICBCR19DTE9VRF8wMDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMCwgMjE2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDE6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDQ4LCAyMTYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wMjogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCAwLCAyODYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMzogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCA0OCwgMjg2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDQ6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDExMiwgNTAyLCA3MiwgMSksXG4gICAgQkdfQ0xPVURfMDU6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDE4NCwgNTAyLCA3MiwgMSksXG4gICAgQkdfU0tZOiBuZXcgU3ByaXRlKGJnX3NreSwgMCwgMCwgMSwgMSwgMSlcblxufTsiLCJcbmV4cG9ydCBjb25zdCBGUFMgID0gMjQ7XG5leHBvcnQgY29uc3QgU1RFUCA9IDEvRlBTO1xuZXhwb3J0IGNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuZXhwb3J0IGNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuZXhwb3J0IGNvbnN0IEJBU0VfTElORSA9IEhFSUdIVCAqIDAuNjY3OyAvLyBIb3cgZmFyIGZyb20gdGhlIHRvcCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgQkFTRV9NQVJHSU4gPSBXSURUSCAqIDAuMjsgLy8gSG93IGZhciBmcm9tIHRoZSBsZWZ0IHRoZSBwbGF5ZXIgd2lsbCBhcHBlYXJcbmV4cG9ydCBjb25zdCBIT1JJWk9OID0gSEVJR0hUIC8gMjsgLy8gQXBwYXJlbnQgcG9zaXRpb24gb2YgdGhlIGhvcml6b24gb24gdGhlIHNjcmVlblxuZXhwb3J0IGNvbnN0IENBTUVSQV9ESVNUQU5DRSA9IDEwMDsgLy8gRGlzdGFuY2UgaW4gZmVldCB0aGF0IHRoZSBjYW1lcmEgaXMgYXdheSBmb3JtIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgQ0FNRVJBX0FOR0xFX0RFRyA9IDkwO1xuZXhwb3J0IGNvbnN0IEZJRUxEX09GX1ZJRVcgPSAyICogTWF0aC5zaW4oQ0FNRVJBX0FOR0xFX0RFRyAvIDIgKiAoTWF0aC5QSSAvIDE4MCkpICogQ0FNRVJBX0RJU1RBTkNFIC8gTWF0aC5zaW4oKDE4MCAtIDkwIC0gQ0FNRVJBX0FOR0xFX0RFRyAvIDIpICogKE1hdGguUEkgLyAxODApKTsgLy8gVmlzaWJsZSBhcmVhIG9uIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5leHBvcnQgY29uc3QgUlVOX01BWF9TUEVFRCA9IC1XSURUSCAqIDU7XG5leHBvcnQgY29uc3QgUlVOX1RJTUVfVE9fTUFYX1NQRUVEID0gNSAqIDYwO1xuZXhwb3J0IGNvbnN0IEdSQVZJVFkgPSAwKjk4NzsiLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHcm91bmQgZnJvbSAnLi9ncm91bmQnO1xuaW1wb3J0IFRlcnJhaW4gZnJvbSAnLi90ZXJyYWluJztcbmltcG9ydCBTa3kgZnJvbSAnLi9za3knO1xuXG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0cmVuZGVyaW5nTGF5ZXJzID0gW107XG5cdHNjZW5lcnkgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdGxldCBzdGVwID0gY29uZmlnLlNURVA7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0Ly93aGlsZSh0aGlzLmR0ID4gc3RlcCkge1xuXHRcdC8vXHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHQvL1x0dGhpcy5kdCAtPSBzdGVwO1xuXHRcdFx0dGhpcy51cGRhdGUoc3RlcCk7XG5cdFx0Ly99XG5cdFx0dGhpcy50cHJldiA9IHRoaXMudDtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFxuXHRcdGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gU2V0dXBcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0Y29uc3RydWN0b3IoY2FudmFzLCBhc3NldHMpe1xuXHRcdHRoaXMub25TY3JlZW4gID0gY2FudmFzO1xuXHRcdHRoaXMub2ZmU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHR0aGlzLm9mZlNjcmVlbi53aWR0aCAgPSBjb25maWcuV0lEVEg7XG5cdFx0dGhpcy5vZmZTY3JlZW4uaGVpZ2h0ID0gY29uZmlnLkhFSUdIVDtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eCAgICAgPSB0aGlzLm9mZlNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vblNjcmVlbi53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgY29uZmlnLlJBVElPICogd2luZG93LmlubmVyV2lkdGgpO1xuXHRcdHRoaXMub25TY3JlZW5DdHggICAgID0gdGhpcy5vblNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub25TY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkICA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hc3NldHMgPSBhc3NldHM7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKFxuXHRcdFx0Y29uZmlnLkJBU0VfTUFSR0lOLFxuXHRcdFx0Y29uZmlnLkJBU0VfTElORSxcblx0XHRcdGNvbmZpZy5DQU1FUkFfRElTVEFOQ0UsXG5cdFx0XHRudWxsLFxuXHRcdFx0bnVsbCxcblx0XHRcdHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSxcblx0XHRcdHRoaXMuZnJhbWVJZFxuXHRcdCk7XG5cblx0XHRsZXQgc2t5ID0gbmV3IFNreSh0aGlzLmFzc2V0c1snQkdfU0tZJ10pO1xuXHRcdGxldCBtb3VudGFpbiA9IG5ldyBUZXJyYWluKDAsIDAsIDMwICogNTI4MCwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSk7XG5cdFx0bGV0IGhpbGwxID0gbmV3IFRlcnJhaW4oMCwgMCwgNSAqIDUyODAsIFt0aGlzLmFzc2V0c1snQkdfSElMTCddXSk7XG5cdFx0bGV0IGhpbGwyID0gbmV3IFRlcnJhaW4oMCwgMCwgMSAqIDUyODAsIFt0aGlzLmFzc2V0c1snQkdfSElMTCddXSk7XG5cdFx0bGV0IGdyb3VuZCA9IG5ldyBHcm91bmQoKTtcblxuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKHNreSk7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2gobW91bnRhaW4pO1xuXHRcdHRoaXMuc2NlbmVyeS5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnNjZW5lcnkucHVzaChoaWxsMik7XG5cdFx0dGhpcy5zY2VuZXJ5LnB1c2goZ3JvdW5kKTtcblxuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2goc2t5KTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKG1vdW50YWluKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwxKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGhpbGwyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5wdXNoKGdyb3VuZCk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHQvLyBVcGRhdGUgdGhlIHBsYXllciBmaXJzdCwgdGhlbiBtb3ZlIHRoZSBwbGF5ZXIgYmFjayB0byB0aGUgc3RhdGljIHBvc2l0aW9uLiBVc2UgdGhlIGRlbHRhIG9mIHRoZSBwbGF5ZXIgdG8gYWRqdXN0IHRoZSBvdGhlciBsYXllcnNcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcblxuXG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkudXBkYXRlKGR0KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0Ly8gTWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYW5kIHRoZW5cblx0XHQvLyBDZW50ZXIgdGhlIHNjYWxlZCBpbWFnZSB2ZXJ0aWNhbGx5IG9uIHRoZSBzY3JlZW5cblx0XHRsZXQgdyA9IGN2cy53aWR0aDtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQ7XG5cdFx0bGV0IHggPSAwO1xuXHRcdGxldCB5ID0gKHRoaXMub2ZmU2NyZWVuLmhlaWdodCAtIGgpIC8gMjtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KTtcblxuXHRcdHRoaXMucmVuZGVyTGF5ZXJzKCk7XG5cblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC43NSknO1xuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgY3ZzLmhlaWdodCk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ2dvbGQnO1xuXHRcdFx0bGV0IGZvbnRTaXplID0gMzI7XG5cdFx0XHRsZXQgbGluZUhlaWdodCA9IGZvbnRTaXplICogMS4zMztcblx0XHRcdGxldCBsaW5lUG9zID0geTtcblx0XHRcdGN0eC5mb250ID0gZm9udFNpemUgKyAncHggc2Fucy1zZXJpZic7XG5cdFx0XHRjdHguZmlsbFRleHQoJ2ZyYW1lSWQ6ICcgKyB0aGlzLmZyYW1lSWQsIDAsIGxpbmVQb3MgKz0gbGluZUhlaWdodCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vblNjcmVlbkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHQpOztcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmRyYXdJbWFnZShcblx0XHRcdGN2cyxcblx0XHRcdHgsIHksIHcsIGgsXG5cdFx0XHQwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJMYXllcnMoKXtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIucmVuZGVyKHRoaXMuZnJhbWVJZCwgdGhpcy5vZmZTY3JlZW5DdHgpKTtcblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kIHtcblxuXHRzZWdtZW50cyA9IFtdO1xuXG5cdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMudHlwZSA9ICdncm91bmQnO1xuXHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogY29uZmlnLkJBU0VfTElORSxcblx0XHRcdGNwMng6IGNvbmZpZy5XSURUSCAqIDAuNjY2Nyxcblx0XHRcdGNwMnk6IGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRlbmR4OiBjb25maWcuV0lEVEgsXG5cdFx0XHRlbmR5OiBjb25maWcuQkFTRV9MSU5FXG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0Y29uc29sZS5sb2coc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHRsZXQgbGFzdCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgY29uZmlnLldJRFRIO1xuXHRcdFx0bGV0IGVuZHkgPSB5ICsgY29uZmlnLkhFSUdIVCAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHZhcmlhbmNlID0gKGNvbmZpZy5XSURUSCAvIDUpICsgKGNvbmZpZy5XSURUSCAvIDMpICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdFx0bGV0IGNwMnggPSBlbmR4IC0gdmFyaWFuY2U7XG5cdFx0XHRsZXQgY3AyeSA9IGVuZHkgLSB2YXJpYW5jZSAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHRcdHg6IHgsXG5cdFx0XHRcdHk6IHksXG5cdFx0XHRcdGNwMXg6IGNwMXgsXG5cdFx0XHRcdGNwMXk6IGNwMXksXG5cdFx0XHRcdGNwMng6IGNwMngsXG5cdFx0XHRcdGNwMnk6IGNwMnksXG5cdFx0XHRcdGVuZHg6IGVuZHgsXG5cdFx0XHRcdGVuZHk6IGVuZHlcblx0XHRcdH07XG5cdFx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0XHRsYXN0ID0gc2VnbWVudDtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2VnbWVudHMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdFx0aWYgKHNlZ21lbnQuZW5keCA8IDApe1xuXHRcdFx0XHR0aGlzLnNlZ21lbnRzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRsZXQgaSA9IDA7XG5cdFx0bGV0IHMgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHgubW92ZVRvKHMueCwgcy55KTtcblx0XHR3aGlsZSAocyl7XG5cdFx0XHRjdHguYmV6aWVyQ3VydmVUbyhzLmNwMXgsIHMuY3AxeSwgcy5jcDJ4LCBzLmNwMnksIHMuZW5keCwgcy5lbmR5KTtcblx0XHRcdHMgPSB0aGlzLnNlZ21lbnRzWysraV07XG5cdFx0fVxuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxuXG5cdHVwZGF0ZShkeCwgZHkpe1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuLy9nYW1lLmRlYnVnID0gdHJ1ZTtcbmdhbWUuc3RhcnQoKTsiLCJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtlYXNlSW5PdXRRdWFkVHdlZW59IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9zY2VuZXJ5JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBTY2VuZXJ5IHtcblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKXtcblx0XHRzdXBlcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpO1xuXHRcdHRoaXMudHlwZSA9ICdwbGF5ZXInO1xuXHRcdHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHR0aGlzLmVsYXBzZWRUaW1lICs9IGR0O1xuXHRcdGxldCB0ID0gdGhpcy5lbGFwc2VkVGltZTsvLyB0OiBjdXJyZW50IHRpbWVcblx0XHRsZXQgYiA9IDA7Ly8gYjogc3RhcnQgdmFsdWVcblx0XHRsZXQgYyA9IGNvbmZpZy5SVU5fTUFYX1NQRUVEOy8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHRcdGxldCBkID0gY29uZmlnLlJVTl9USU1FX1RPX01BWF9TUEVFRDsvLyBkOiBkdXJhaXRvblxuXHRcdGxldCBkZHggPSBlYXNlSW5PdXRRdWFkVHdlZW4odCwgYiwgYywgZCk7IC8vIFRoZSByYXRlIHRoYXQgcGxheWVyIGlzIG1vdmluZyBmb3J3YXJkXG5cdFx0bGV0IGRkeSA9IGNvbmZpZy5HUkFWSVRZO1xuXHRcdGNvbnNvbGUubG9nKCdkZHg6JywgZGR4LCAnZGR5OicsIGRkeSk7XG5cdFx0dGhpcy5zdGFnZUR4ICs9IGR0ICogZGR4O1xuXHRcdHRoaXMuc3RhZ2VEeSArPSBkdCAqIGRkeTtcblx0fVxufSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZXJ5IGV4dGVuZHMgU2V0UGllY2Uge1xuXG5cdC8vIFNjZW5lcnkgYXJlIHNldCBwaWVjZXMgdGhhdCBoYXZlIGFuaW1hdGVkIHNwcml0ZXNcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpe1xuXHRcdHN1cGVyKHgsIHksIHopO1xuXG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gd2lkdGggIHx8IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gaGVpZ2h0IHx8IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHRoaXMudHlwZSA9ICdzY2VuZXJ5Jztcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm47XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG5cdH1cblxufSIsIi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZSwgYW5kIGNhbWVyYSBzdHVmZiB0byBhIGNhbWVyYSBvYmplY3RcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnNvbGUubG9nKCdTZXRQaWVjZScpO1xuXG5leHBvcnQgdmFyIHN0YWdlRHggPSAwO1xuZXhwb3J0IHZhciBzdGFnZUR5ID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGllY2Uge1xuXHRcblx0Ly8gQWxsIHNldCBwaWVjZXMgbW92ZSB0b2dldGhlciBpbiByZXNwb25zZSB0byB0aGUgcGxheWVyJ3MgbW92ZW1lbnRcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6KXtcblx0XHRpZiAobmV3LnRhcmdldCA9PT0gU2V0UGllY2UpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgaW5zdGFuY2VzIG9mIGFic3RyYWN0IGNsYXNzIFNldFBpZWNlJyk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdGhpcy5yZW5kZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3Qgb3ZlcnJpZGUgcmVuZGVyIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy54ID0geHx8MDtcblx0XHR0aGlzLnkgPSB5fHwwO1xuXHRcdHRoaXMueiA9IHp8fDA7XG5cdH1cblxuXHQvLyByZW5kZXIgbmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgYnkgY2hpbGQgY2xhc3Nlc1xuXG5cdHVwZGF0ZShkdCl7XG5cdFx0Ly8gTW92ZW1lbnQgcmVsYXRpdmUgdG8gdGhlIHN0YWdlXG5cdFx0bGV0IHpGYWN0b3IgPSB0aGlzLnogLyBjb25maWcuRklFTERfT0ZfVklFVztcblx0XHRsZXQgZHggPSB0aGlzLnN0YWdlRHggKiB6RmFjdG9yO1xuXHRcdGxldCBkeSA9IHRoaXMuc3RhZ2VEeSAqIHpGYWN0b3I7XG5cdFx0dGhpcy54ICs9IGR4ICogZHQ7XG5cdFx0dGhpcy55ICs9IGR5ICogZHQ7XG5cdH1cblxuXHRzZXQgc3RhZ2VEeCAoZHgpe1xuXHRcdHN0YWdlRHggPSBkeDtcblx0fVxuXG5cdGdldCBzdGFnZUR4ICgpe1xuXHRcdHJldHVybiBzdGFnZUR4O1xuXHR9XG5cblx0c2V0IHN0YWdlRHkgKGR5KXtcblx0XHRzdGFnZUR5ID0gZHk7XG5cdH1cblxuXHRnZXQgc3RhZ2VEeSAoKXtcblx0XHRyZXR1cm4gc3RhZ2VEeTtcblx0fVxufSIsImltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa3kgZXh0ZW5kcyBTY2VuZXJ5IHtcblxuXHRjb25zdHJ1Y3RvcihzcHJpdGUpe1xuXHRcdHN1cGVyKDAsIDAsIDAsIFdJRFRILCBIRUlHSFQsIHNwcml0ZSwgMClcblx0XHR0aGlzLnR5cGUgPSAnc2t5Jztcblx0fVxuXHRcblx0dXBkYXRlKCl7XG5cdFx0Ly8gbm9wXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuXHQvLyBTcHJpdGVzIGRlZmluZSBhIHNlcmllcyBvZiBrZXlmcmFtZSBhbmltYXRpb25zXG5cdFxuXHRrZXlGcmFtZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3RvciAoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBudW1LZXlGcmFtZXMpIHtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy5zeCA9IHN4fDA7XG5cdFx0dGhpcy5zeSA9IHN5fDA7XG5cdFx0dGhpcy5zdyA9IHN3fDA7XG5cdFx0dGhpcy5zaCA9IHNofDA7XG5cdFx0dGhpcy5udW1LZXlGcmFtZXMgPSBNYXRoLm1heChudW1LZXlGcmFtZXN8MCwgMSk7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLm51bUtleUZyYW1lczsgKytpKXtcblx0XHRcdGxldCBrZXlGcmFtZSA9IHtcblx0XHRcdFx0aW1hZ2U6IHRoaXMuaW1hZ2UsXG5cdFx0XHRcdHN4OiB0aGlzLnN4ICsgdGhpcy5zdyAqIGksXG5cdFx0XHRcdHN5OiB0aGlzLnN5LFxuXHRcdFx0XHRzdzogdGhpcy5zdyxcblx0XHRcdFx0c2g6IHRoaXMuc2hcblx0XHRcdH07XG5cdFx0XHR0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcblx0XHR9XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRmcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHJldHVybiB0aGlzLmtleUZyYW1lc1tmcmFtZUlkICUgdGhpcy5udW1LZXlGcmFtZXNdO1xuXHR9XG59XG4iLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5pbXBvcnQgU2V0UGllY2UsIHtzdGFnZUR4LCBzdGFnZUR5fSBmcm9tICcuL3NldHBpZWNlJztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVycmFpbiBleHRlbmRzIFNldFBpZWNle1xuXG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgc3ByaXRlcyl7XG5cdFx0c3VwZXIoeCwgeSwgeilcblx0XHR0aGlzLnNjZW5lcnkgPSBbXTtcblx0XHR0aGlzLnNwcml0ZXMgPSBzcHJpdGVzIHx8IFtdO1xuXHRcdHRoaXMudHlwZSA9ICd0ZXJyYWluJztcblxuXHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0fVxuXG5cdGdlbmVyYXRlKHhvZmZzZXQpe1xuXHRcdC8vIEFkZCBtb3JlIHNjZW5lcnkgdW50aWwgd2UgYXJlIGJleW9uZCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuICsgZGlzdGFuY2Ugc2NlbmUgZHhcblx0XHRpZiAoIXRoaXMuc3ByaXRlcy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGlmICgheG9mZnNldClcblx0XHRcdHhvZmZzZXQgPSB0aGlzLnNjZW5lcnkucmVkdWNlKCh4LCBzKSA9PiBNYXRoLm1heCh4LCBzLnggKyBzLncpLCAwKTtcblxuXHRcdHdoaWxlKHhvZmZzZXQgPCBjb25maWcuV0lEVEggKyBzdGFnZUR4KXtcblx0XHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRcdGxldCB4ID0geG9mZnNldCArIHNwcml0ZS53ICsgc3ByaXRlLncgLyAyICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdFx0bGV0IHkgPSB0aGlzLnk7XG5cdFx0XHRsZXQgeiA9IHRoaXMuejtcblx0XHRcdGxldCB3ID0gc3ByaXRlLnc7XG5cdFx0XHRsZXQgaCA9IHNwcml0ZS5oO1xuXHRcdFx0bGV0IGZyYW1lSWQgPSAwO1xuXG5cdFx0XHRsZXQgc2NlbmVyeSA9IG5ldyBTY2VuZXJ5KHgsIHksIHosIHcsIGgsIHNwcml0ZSwgZnJhbWVJZClcblx0XHRcdHRoaXMuc2NlbmVyeS5wdXNoKHNjZW5lcnkpO1xuXG5cdFx0XHR4b2Zmc2V0ID0geCArIHNwcml0ZS53O1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0bGV0IHhvZmZzZXQgPSAwO1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2NlbmVyeS5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2NlbmVyeSA9IHRoaXMuc2NlbmVyeVtpXTtcblx0XHRcdGxldCB4ID0gc2NlbmVyeS54ICsgc2NlbmVyeS53O1xuXHRcdFx0aWYgKHggPCAwKXtcblx0XHRcdFx0dGhpcy5zY2VuZXJ5LnNwbGljZShpLS0sMSk7XG5cdFx0XHR9XG5cdFx0XHR4b2Zmc2V0ID0gTWF0aC5tYXgoeG9mZnNldCwgeCk7XG5cdFx0fVxuXHRcdHRoaXMuZ2VuZXJhdGUoeG9mZnNldCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHQpe1xuXHRcdHN1cGVyLnVwZGF0ZShkdCk7XG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkudXBkYXRlKGR0KSlcblx0XHR0aGlzLmdhcmJhZ2VDb2xsZWN0aW9uKCk7XG5cdH1cbn0iLCJmdW5jdGlvbiBhc20oKXtcblx0J3VzZSBhc20nO1xuXHQvLyB0OiBjdXJyZW50IHRpbWVcblx0Ly8gYjogc3RhcnQgdmFsdWVcblx0Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdC8vIGQ6IGR1cmFpdG9uXG5cblx0ZnVuY3Rpb24gbGluZWFyVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHRyZXR1cm4gKyhjKnQvZCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluUXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKyhjKnQqdCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZU91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoLWMqdCoodC0yKSArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCAvPSBkLzI7XG5cdFx0aWYgKHQgPCAxKSByZXR1cm4gKyhjLzIqdCp0ICsgYik7XG5cdFx0LS10O1xuXHRcdHJldHVybiArKC1jLzIgKiAodCoodC0yKSAtIDEpICsgYik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxpbmVhclR3ZWVuOiBsaW5lYXJUd2Vlbixcblx0XHRlYXNlSW5RdWFkVHdlZW46IGVhc2VJblF1YWRUd2Vlbixcblx0XHRlYXNlT3V0UXVhZFR3ZWVuOiBlYXNlT3V0UXVhZFR3ZWVuLFxuXHRcdGVhc2VJbk91dFF1YWRUd2VlbjogZWFzZUluT3V0UXVhZFR3ZWVuXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbF9yYW5kb20oKSB7XG5cdC8vIFN0YW5kYXJkIE5vcm1hbCB2YXJpYXRlIHVzaW5nIEJveC1NdWxsZXIgdHJhbnNmb3JtLlxuICAgIHZhciB1ID0gMSAtIE1hdGgucmFuZG9tKCk7IC8vIFN1YnRyYWN0aW9uIHRvIGZsaXAgWzAsIDEpIHRvICgwLCAxXS5cbiAgICB2YXIgdiA9IDEgLSBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoIC0yLjAgKiBNYXRoLmxvZyggdSApICkgKiBNYXRoLmNvcyggMi4wICogTWF0aC5QSSAqIHYgKTtcbn1cblxuZXhwb3J0IHZhciBsaW5lYXJUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluUXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlT3V0UXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5PdXRRdWFkVHdlZW47XG5cbiFmdW5jdGlvbiBpbml0KCl7XG5cdHZhciBleHBvcnRlZCA9IGFzbSgpO1xuXHRsaW5lYXJUd2VlbiA9IGV4cG9ydGVkLmxpbmVhclR3ZWVuO1xuXHRlYXNlSW5RdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5RdWFkVHdlZW47XG5cdGVhc2VPdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlT3V0UXVhZFR3ZWVuO1xuXHRlYXNlSW5PdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5PdXRRdWFkVHdlZW47XG5cdHJldHVybiBleHBvcnRlZDtcbn0oKTtcbiJdfQ==
