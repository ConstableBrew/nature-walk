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

},{"./sprite":11}],2:[function(require,module,exports){
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

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Entity = function () {
	function Entity(type, config) {
		_classCallCheck(this, Entity);

		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.w = 0;
		this.h = 0;
		this.sprite = null;
		this.animationFrameId = 0;

		config = config || {};
		this.type = type + '';
		this.x = config.x | 0;
		this.y = config.y | 0;
		this.dx = config.dx | 0;
		this.dy = config.dy | 0;
		this.sprite = config.sprite || {};
		this.w = this.sprite.sw | 0;
		this.h = this.sprite.sh | 0;
		this.animationFrameId = 0;
	}

	_createClass(Entity, [{
		key: 'setAnimation',
		value: function setAnimation(frameId, sprite) {
			this.sprite = sprite || {};
			this.animationFrameId = frameId | 0;
		}
	}, {
		key: 'getKeyFrame',
		value: function getKeyFrame(frameId) {
			if (!this.sprite || !this.sprite.getKeyFrame) return {};

			return this.sprite.getKeyFrame(frameId - this.animationFrameId);
		}
	}, {
		key: 'render',
		value: function render(frameId, ctx) {
			var kf = this.getKeyFrame(frameId);
			if (!kf || !kf.image) return;
			ctx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, this.x, this.y, kf.sw, kf.sh);
		}
	}, {
		key: 'update',
		value: function update(dx, dy) {
			this.dx = dx;
			this.dy = dy;
			this.x += this.dx;
			this.y += this.dy;
		}
	}]);

	return Entity;
}();

exports.default = Entity;

},{"./sprite":11}],4:[function(require,module,exports){
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

utils.init();

// TODO: Move these to some config file

var Game = function () {
	_createClass(Game, [{
		key: 'frame',

		// ========================================================================
		// Main Game Loop
		// ========================================================================

		value: function frame() {
			var step = config.step;
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

		this.renderingLayers.push(new _sky2.default(this.assets['BG_SKY']));
		this.renderingLayers.push(new _terrain2.default(0, 0, 0, [this.assets['BG_MOUNTAIN']]));
		this.renderingLayers.push(new _terrain2.default(0, 0, 0, [this.assets['BG_HILL']]));
		this.renderingLayers.push(this.player);
		this.renderingLayers.push(new _ground2.default());
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

			SetPiece.dx = x - this.player.x;
			SetPiece.dy = y - this.player.y;

			this.player.x = x;
			this.player.y = y;

			this.renderingLayers.forEach(function (layer) {
				if (layer.type !== 'player') layer.update(dt);
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

},{"./config":2,"./ground":5,"./player":7,"./sky":10,"./terrain":12,"./utils":13}],5:[function(require,module,exports){
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

},{"./config":2,"./utils":13}],6:[function(require,module,exports){
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

},{"./assets":1,"./game":4}],7:[function(require,module,exports){
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

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

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

var Player = function (_Scenery) {
	_inherits(Player, _Scenery);

	function Player(x, y, z, width, height, sprite, frameId) {
		_classCallCheck(this, Player);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, x, y, z, width, height, sprite, frameId));

		_this.type = 'player';
		return _this;
	}

	_createClass(Player, [{
		key: 'update',
		value: function update(dt) {
			var ddx = dt * Math.log(this.frameId) * 100; // The rate that player is moving forward
			var ddy = config.GRAVITY;
			this.dx += dt * this.ddx;
			this.dy += dt * this.ddy;
			this.x += dt * this.dx;
			this.y += dt * this.dy;
		}
	}]);

	return Player;
}(_entity2.default);

exports.default = Player;

},{"./entity":3}],8:[function(require,module,exports){
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

},{"./setpiece":9,"./sprite":11}],9:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

// TODO: Move these to some config file, and camera stuff to a camera object
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size
var HORIZON = HEIGHT / 2; // Apparent position of the horizon on the screen
var CAMERA_DISTANCE = 100; // Distance in feet that the camera is away form the plane of the player
var CAMERA_ANGLE_DEG = 90;
var FIELD_OF_VIEW = 2 * Math.sin(CAMERA_ANGLE_DEG / 2 * (Math.PI / 180)) * CAMERA_DISTANCE / Math.sin((180 - 90 - CAMERA_ANGLE_DEG / 2) * (Math.PI / 180)); // Visible area on the plane of the player

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
			var zFactor = this.z / FIELD_OF_VIEW;
			var dx = SetPiece.stageDx * zFactor;
			var dy = SetPiece.stageDy * zFactor;
			this.x += dx * dt;
			this.y += dy * dt;
		}
	}]);

	return SetPiece;
}();

SetPiece.stageDx = 0;
SetPiece.stageDy = 0;
exports.default = SetPiece;

},{}],10:[function(require,module,exports){
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

},{"./scenery":8}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
			debugger;

			while (xoffset < config.WIDTH + _setpiece2.default.dx) {
				var sprite = this.sprites[Math.random() * this.sprites.length | 0];
				var x = xoffset + sprite.w + sprite.w / 2 * (0, _utils.normal_random)();
				var y = this.y;
				var z = this.z;

				var scenery = new _scenery2.default(x, y, z, width, height, sprite, frameId);
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

},{"./config":2,"./scenery":8,"./setpiece":9,"./utils":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normal_random = normal_random;
exports.init = init;
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

function init() {
	var exported = asm();
	exports.linearTween = linearTween = exported.linearTween;
	exports.easeInQuadTween = easeInQuadTween = exported.easeInQuadTween;
	exports.easeOutQuadTween = easeOutQuadTween = exported.easeOutQuadTween;
	exports.easeInOutQuadTween = easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
};

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9lbnRpdHkuanMiLCJzcmMvZ2FtZS5qcyIsInNyYy9ncm91bmQuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcGxheWVyLmpzIiwic3JjL3NjZW5lcnkuanMiLCJzcmMvc2V0cGllY2UuanMiLCJzcmMvc2t5LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy90ZXJyYWluLmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFXLElBQWYsQUFBZSxBQUFJO0FBQ25CLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsWUFBQSxBQUFZLE1BQVosQUFBa0I7O0FBRWxCLElBQUksVUFBVSxJQUFkLEFBQWMsQUFBSTtBQUNsQixRQUFBLEFBQVEsTUFBUixBQUFjOzs7QUFJZCxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLFNBQVMsSUFBYixBQUFhLEFBQUk7QUFDakIsT0FBQSxBQUFPLE1BQVAsQUFBYTs7OztjQU1ELHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJQUY1QixBQUVILEFBQW1DLEFBQzNDO2dCQUFhLHFCQUFBLEFBQVcsYUFBWCxBQUF3QixHQUF4QixBQUEyQixHQUEzQixBQUE4QixNQUE5QixBQUFvQyxLQUh0QyxBQUdFLEFBQXlDLEFBQ3REO1lBQVMscUJBQUEsQUFBVyxTQUFYLEFBQW9CLEdBQXBCLEFBQXVCLEdBQXZCLEFBQTBCLE1BQTFCLEFBQWdDLEtBSjlCLEFBSUYsQUFBcUMsQUFDOUM7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJC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bixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuLy89PT09PSBDbG91ZHM9PT09PVxudmFyIGJnX2Nsb3VkID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnL2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQucG5nJztcblxudmFyIGJnX3NreSA9IG5ldyBJbWFnZSgpO1xuYmdfc2t5LnNyYyA9ICcvYXNzZXRzL2JnLXNreS5wbmcnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KSxcbiAgICBCR19NT1VOVEFJTjogbmV3IFNwcml0ZShiZ19tb3VudGFpbiwgMCwgMCwgMTUzNiwgNzY3LCAxKSxcbiAgICBCR19ISUxMOiBuZXcgU3ByaXRlKGJnX2hpbGwsIDAsIDAsIDEwMjQsIDMwNiwgMSksXG4gICAgQkdfQ0xPVURfMDA6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDAsIDIxNiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAxOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCA0OCwgMjE2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDI6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgMCwgMjg2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDM6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgNDgsIDI4NiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzA0OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxMTIsIDUwMiwgNzIsIDEpLFxuICAgIEJHX0NMT1VEXzA1OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxODQsIDUwMiwgNzIsIDEpLFxuICAgIEJHX1NLWTogbmV3IFNwcml0ZShiZ19za3ksIDAsIDAsIDEsIDEsIDEpXG5cbn07IiwiXG5leHBvcnQgY29uc3QgRlBTICA9IDI0O1xuZXhwb3J0IGNvbnN0IFNURVAgPSAxL0ZQUztcbmV4cG9ydCBjb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBSQVRJTyAgPSBIRUlHSFQgLyBXSURUSDtcbmV4cG9ydCBjb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjY2NzsgLy8gSG93IGZhciBmcm9tIHRoZSB0b3AgdGhlIHBsYXllciB3aWxsIGFwcGVhclxuZXhwb3J0IGNvbnN0IEJBU0VfTUFSR0lOID0gV0lEVEggKiAwLjI7IC8vIEhvdyBmYXIgZnJvbSB0aGUgbGVmdCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgSE9SSVpPTiA9IEhFSUdIVCAvIDI7IC8vIEFwcGFyZW50IHBvc2l0aW9uIG9mIHRoZSBob3Jpem9uIG9uIHRoZSBzY3JlZW5cbmV4cG9ydCBjb25zdCBDQU1FUkFfRElTVEFOQ0UgPSAxMDA7IC8vIERpc3RhbmNlIGluIGZlZXQgdGhhdCB0aGUgY2FtZXJhIGlzIGF3YXkgZm9ybSB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IENBTUVSQV9BTkdMRV9ERUcgPSA5MDtcbmV4cG9ydCBjb25zdCBGSUVMRF9PRl9WSUVXID0gMiAqIE1hdGguc2luKENBTUVSQV9BTkdMRV9ERUcgLyAyICogKE1hdGguUEkgLyAxODApKSAqIENBTUVSQV9ESVNUQU5DRSAvIE1hdGguc2luKCgxODAgLSA5MCAtIENBTUVSQV9BTkdMRV9ERUcgLyAyKSAqIChNYXRoLlBJIC8gMTgwKSk7IC8vIFZpc2libGUgYXJlYSBvbiB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IEdSQVZJVFkgPSAwKjk4NzsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcblx0eCA9IDA7XG5cdHkgPSAwO1xuXHRkeCA9IDA7XG5cdGR5ID0gMDtcblx0dyA9IDA7XG5cdGggPSAwO1xuXHRzcHJpdGUgPSBudWxsO1xuXHRhbmltYXRpb25GcmFtZUlkID0gMDtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlLCBjb25maWcpe1xuXHRcdGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0XHR0aGlzLnR5cGUgPSB0eXBlICsgJyc7XG5cdFx0dGhpcy54ID0gY29uZmlnLnh8MDtcblx0XHR0aGlzLnkgPSBjb25maWcueXwwO1xuXHRcdHRoaXMuZHggPSBjb25maWcuZHh8MDtcblx0XHR0aGlzLmR5ID0gY29uZmlnLmR5fDA7XG5cdFx0dGhpcy5zcHJpdGUgPSBjb25maWcuc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMudyA9IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gdGhpcy5zcHJpdGUuc2h8MDtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSB8fCAhdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybiB7fTtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZUlkKTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnksIGtmLnN3LCBrZi5zaCk7XG5cdH1cblxuXHR1cGRhdGUoZHgsIGR5KXtcblx0XHR0aGlzLmR4ID0gZHg7XG5cdFx0dGhpcy5keSA9IGR5O1xuXHRcdHRoaXMueCAgKz0gdGhpcy5keDtcblx0XHR0aGlzLnkgICs9IHRoaXMuZHk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdyb3VuZCBmcm9tICcuL2dyb3VuZCc7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuaW1wb3J0IFNreSBmcm9tICcuL3NreSc7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5cblxuY2xhc3MgR2FtZSB7XG5cdGdhbWVSZWFkeSA9IGZhbHNlO1xuXHRwYXVzZWQgPSBmYWxzZTtcblx0ZGVidWcgID0gZmFsc2U7XG5cblx0b25TY3JlZW4gID0gbnVsbDtcblx0b2ZmU2NyZWVuID0gbnVsbDtcblx0b25TY3JlZW5DdHggID0gbnVsbDtcblx0b2ZmU2NyZWVuQ3R4ID0gbnVsbDtcblxuXHRyZW5kZXJpbmdMYXllcnMgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdGxldCBzdGVwID0gY29uZmlnLnN0ZXA7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IHN0ZXApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBzdGVwO1xuXHRcdFx0dGhpcy51cGRhdGUoc3RlcCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gY29uZmlnLldJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIGNvbmZpZy5SQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihcblx0XHRcdGNvbmZpZy5CQVNFX01BUkdJTixcblx0XHRcdGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRjb25maWcuQ0FNRVJBX0RJU1RBTkNFLFxuXHRcdFx0bnVsbCxcblx0XHRcdG51bGwsXG5cdFx0XHR0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10sXG5cdFx0XHR0aGlzLmZyYW1lSWRcblx0XHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChuZXcgU2t5KHRoaXMuYXNzZXRzWydCR19TS1knXSkpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMCwgMCwgMCwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSkpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMCwgMCwgMCwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKSk7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChuZXcgR3JvdW5kKCkpO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0Ly8gQmVnaW5zIHRoZSBtYWluIGdhbWUgbG9vcFxuXHRcdHRoaXMuZnJhbWVJZCA9IDA7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBVcGRhdGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0dXBkYXRlKGR0KSB7XG5cblx0XHQvLyBVcGRhdGUgdGhlIHBsYXllciBmaXJzdCwgdGhlbiBtb3ZlIHRoZSBwbGF5ZXIgYmFjayB0byB0aGUgc3RhdGljIHBvc2l0aW9uLiBVc2UgdGhlIGRlbHRhIG9mIHRoZSBwbGF5ZXIgdG8gYWRqdXN0IHRoZSBvdGhlciBsYXllcnNcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKGR0KTtcblxuXHRcdFNldFBpZWNlLmR4ID0geCAtIHRoaXMucGxheWVyLng7XG5cdFx0U2V0UGllY2UuZHkgPSB5IC0gdGhpcy5wbGF5ZXIueTtcblxuXHRcdHRoaXMucGxheWVyLnggPSB4O1xuXHRcdHRoaXMucGxheWVyLnkgPSB5O1xuXG5cblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xuXHRcdFx0aWYgKGxheWVyLnR5cGUgIT09ICdwbGF5ZXInKVxuXHRcdFx0XHRsYXllci51cGRhdGUoZHQpXG5cdFx0fSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0Ly8gTWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYW5kIHRoZW5cblx0XHQvLyBDZW50ZXIgdGhlIHNjYWxlZCBpbWFnZSB2ZXJ0aWNhbGx5IG9uIHRoZSBzY3JlZW5cblx0XHRsZXQgdyA9IGN2cy53aWR0aDtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQ7XG5cdFx0bGV0IHggPSAwO1xuXHRcdGxldCB5ID0gKHRoaXMub2ZmU2NyZWVuLmhlaWdodCAtIGgpIC8gMjtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KTtcblxuXHRcdHRoaXMucmVuZGVyTGF5ZXJzKCk7XG5cblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC43NSknO1xuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgY3ZzLmhlaWdodCk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ2dvbGQnO1xuXHRcdFx0bGV0IGZvbnRTaXplID0gMzI7XG5cdFx0XHRsZXQgbGluZUhlaWdodCA9IGZvbnRTaXplICogMS4zMztcblx0XHRcdGxldCBsaW5lUG9zID0geTtcblx0XHRcdGN0eC5mb250ID0gZm9udFNpemUgKyAncHggc2Fucy1zZXJpZic7XG5cdFx0XHRjdHguZmlsbFRleHQoJ2ZyYW1lSWQ6ICcgKyB0aGlzLmZyYW1lSWQsIDAsIGxpbmVQb3MgKz0gbGluZUhlaWdodCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vblNjcmVlbkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHQpOztcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmRyYXdJbWFnZShcblx0XHRcdGN2cyxcblx0XHRcdHgsIHksIHcsIGgsXG5cdFx0XHQwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJMYXllcnMoKXtcblx0XHR0aGlzLnJlbmRlcmluZ0xheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIucmVuZGVyKHRoaXMuZnJhbWVJZCwgdGhpcy5vZmZTY3JlZW5DdHgpKTtcblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kIHtcblxuXHRzZWdtZW50cyA9IFtdO1xuXG5cdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMudHlwZSA9ICdncm91bmQnO1xuXHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogY29uZmlnLkJBU0VfTElORSxcblx0XHRcdGNwMng6IGNvbmZpZy5XSURUSCAqIDAuNjY2Nyxcblx0XHRcdGNwMnk6IGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRlbmR4OiBjb25maWcuV0lEVEgsXG5cdFx0XHRlbmR5OiBjb25maWcuQkFTRV9MSU5FXG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0Y29uc29sZS5sb2coc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblxuXHRcdGxldCBsYXN0ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aC0xXTtcblx0XHR3aGlsZSAodGhpcy5zZWdtZW50cy5sZW5ndGggPCAzKXtcblx0XHRcdGxldCB4ID0gbGFzdC5lbmR4O1xuXHRcdFx0bGV0IHkgPSBsYXN0LmVuZHk7XG5cdFx0XHRsZXQgY3AxeCA9IHggKyAoeCAtIGxhc3QuY3AyeCk7XG5cdFx0XHRsZXQgY3AxeSA9IHkgKyAoeSAtIGxhc3QuY3AyeSk7XG5cdFx0XHRsZXQgZW5keCA9IHggKyBjb25maWcuV0lEVEg7XG5cdFx0XHRsZXQgZW5keSA9IHkgKyBjb25maWcuSEVJR0hUICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgdmFyaWFuY2UgPSAoY29uZmlnLldJRFRIIC8gNSkgKyAoY29uZmlnLldJRFRIIC8gMykgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0XHRsZXQgY3AyeCA9IGVuZHggLSB2YXJpYW5jZTtcblx0XHRcdGxldCBjcDJ5ID0gZW5keSAtIHZhcmlhbmNlICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdFx0eDogeCxcblx0XHRcdFx0eTogeSxcblx0XHRcdFx0Y3AxeDogY3AxeCxcblx0XHRcdFx0Y3AxeTogY3AxeSxcblx0XHRcdFx0Y3AyeDogY3AyeCxcblx0XHRcdFx0Y3AyeTogY3AyeSxcblx0XHRcdFx0ZW5keDogZW5keCxcblx0XHRcdFx0ZW5keTogZW5keVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRcdGxhc3QgPSBzZWdtZW50O1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0XHRpZiAoc2VnbWVudC5lbmR4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2VnbWVudHMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGxldCBpID0gMDtcblx0XHRsZXQgcyA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8ocy54LCBzLnkpO1xuXHRcdHdoaWxlIChzKXtcblx0XHRcdGN0eC5iZXppZXJDdXJ2ZVRvKHMuY3AxeCwgcy5jcDF5LCBzLmNwMngsIHMuY3AyeSwgcy5lbmR4LCBzLmVuZHkpO1xuXHRcdFx0cyA9IHRoaXMuc2VnbWVudHNbKytpXTtcblx0XHR9XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9XG5cblx0dXBkYXRlKGR4LCBkeSl7XG5cdFx0dGhpcy5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50KSA9PiB7XG5cdFx0XHRzZWdtZW50LnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMXggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMXkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmVuZHggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmVuZHkgKz0gZHk7XG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5pbXBvcnQgYXNzZXRzIGZyb20gJy4vYXNzZXRzJ1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSwgYXNzZXRzKTtcblxuXG4hZnVuY3Rpb24gd2FpdEZvckNvbnRlbnQoKXtcblx0Ly8gV2FpdCBmb3IgY29udGVudCB0byBiZSByZXRyZWl2ZWQgYnkgdGhlIGJyb3dzZXJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuXHRcdC8vIFRPRE8uLi5cblx0fSk7XG59KClcbi50aGVuKGdhbWUuc3RhcnQpO1xuXG4vL2dhbWUuZGVidWcgPSB0cnVlO1xuZ2FtZS5zdGFydCgpOyIsImltcG9ydCBTY2VuZXJ5IGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgU2NlbmVyeSB7XG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCl7XG5cdFx0c3VwZXIoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKTtcblx0XHR0aGlzLnR5cGUgPSAncGxheWVyJztcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0bGV0IGRkeCA9IGR0ICogTWF0aC5sb2codGhpcy5mcmFtZUlkKSAqIDEwMDsgLy8gVGhlIHJhdGUgdGhhdCBwbGF5ZXIgaXMgbW92aW5nIGZvcndhcmRcblx0XHRsZXQgZGR5ID0gY29uZmlnLkdSQVZJVFk7XG5cdFx0dGhpcy5keCArPSBkdCAqIHRoaXMuZGR4O1xuXHRcdHRoaXMuZHkgKz0gZHQgKiB0aGlzLmRkeTtcblx0XHR0aGlzLnggICs9IGR0ICogdGhpcy5keDtcblx0XHR0aGlzLnkgICs9IGR0ICogdGhpcy5keTtcblx0fVxufSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZXJ5IGV4dGVuZHMgU2V0UGllY2Uge1xuXG5cdC8vIFNjZW5lcnkgYXJlIHNldCBwaWVjZXMgdGhhdCBoYXZlIGFuaW1hdGVkIHNwcml0ZXNcblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpe1xuXHRcdHN1cGVyKHgsIHksIHopO1xuXG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gd2lkdGggIHx8IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gaGVpZ2h0IHx8IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHRoaXMudHlwZSA9ICdzY2VuZXJ5Jztcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm47XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG5cdH1cblxufSIsIi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZSwgYW5kIGNhbWVyYSBzdHVmZiB0byBhIGNhbWVyYSBvYmplY3RcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIT1JJWk9OID0gSEVJR0hUIC8gMjsgLy8gQXBwYXJlbnQgcG9zaXRpb24gb2YgdGhlIGhvcml6b24gb24gdGhlIHNjcmVlblxuY29uc3QgQ0FNRVJBX0RJU1RBTkNFID0gMTAwOyAvLyBEaXN0YW5jZSBpbiBmZWV0IHRoYXQgdGhlIGNhbWVyYSBpcyBhd2F5IGZvcm0gdGhlIHBsYW5lIG9mIHRoZSBwbGF5ZXJcbmNvbnN0IENBTUVSQV9BTkdMRV9ERUcgPSA5MDtcbmNvbnN0IEZJRUxEX09GX1ZJRVcgPSAyICogTWF0aC5zaW4oQ0FNRVJBX0FOR0xFX0RFRyAvIDIgKiAoTWF0aC5QSSAvIDE4MCkpICogQ0FNRVJBX0RJU1RBTkNFIC8gTWF0aC5zaW4oKDE4MCAtIDkwIC0gQ0FNRVJBX0FOR0xFX0RFRyAvIDIpICogKE1hdGguUEkgLyAxODApKTsgLy8gVmlzaWJsZSBhcmVhIG9uIHRoZSBwbGFuZSBvZiB0aGUgcGxheWVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldFBpZWNlIHtcblx0XG5cdC8vIEFsbCBzZXQgcGllY2VzIG1vdmUgdG9nZXRoZXIgaW4gcmVzcG9uc2UgdG8gdGhlIHBsYXllcidzIG1vdmVtZW50XG5cdHN0YXRpYyBzdGFnZUR4ID0gMDtcblx0c3RhdGljIHN0YWdlRHkgPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHope1xuXHRcdGlmIChuZXcudGFyZ2V0ID09PSBTZXRQaWVjZSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNyZWF0ZSBpbnN0YW5jZXMgb2YgYWJzdHJhY3QgY2xhc3MgU2V0UGllY2UnKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBvdmVycmlkZSByZW5kZXIgZnVuY3Rpb24nKTtcblx0XHR9XG5cblx0XHR0aGlzLnggPSB4fHwwO1xuXHRcdHRoaXMueSA9IHl8fDA7XG5cdFx0dGhpcy56ID0genx8MDtcblx0fVxuXG5cdC8vIHJlbmRlciBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBieSBjaGlsZCBjbGFzc2VzXG5cblx0dXBkYXRlKGR0KXtcblx0XHQvLyBNb3ZlbWVudCByZWxhdGl2ZSB0byB0aGUgc3RhZ2Vcblx0XHRsZXQgekZhY3RvciA9IHRoaXMueiAvIEZJRUxEX09GX1ZJRVc7XG5cdFx0bGV0IGR4ID0gU2V0UGllY2Uuc3RhZ2VEeCAqIHpGYWN0b3I7XG5cdFx0bGV0IGR5ID0gU2V0UGllY2Uuc3RhZ2VEeSAqIHpGYWN0b3I7XG5cdFx0dGhpcy54ICs9IGR4ICogZHQ7XG5cdFx0dGhpcy55ICs9IGR5ICogZHQ7XG5cdH1cbn0iLCJpbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2t5IGV4dGVuZHMgU2NlbmVyeSB7XG5cblx0Y29uc3RydWN0b3Ioc3ByaXRlKXtcblx0XHRzdXBlcigwLCAwLCAwLCBXSURUSCwgSEVJR0hULCBzcHJpdGUsIDApXG5cdFx0dGhpcy50eXBlID0gJ3NreSc7XG5cdH1cblx0XG5cdHVwZGF0ZSgpe1xuXHRcdC8vIG5vcFxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0Ly8gU3ByaXRlcyBkZWZpbmUgYSBzZXJpZXMgb2Yga2V5ZnJhbWUgYW5pbWF0aW9uc1xuXHRcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IHtub3JtYWxfcmFuZG9tfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgU2NlbmVyeSBmcm9tICcuL3NjZW5lcnknO1xuaW1wb3J0IFNldFBpZWNlIGZyb20gJy4vc2V0cGllY2UnO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIGV4dGVuZHMgU2V0UGllY2V7XG5cblxuXHRjb25zdHJ1Y3Rvcih4LCB5LCB6LCBzcHJpdGVzKXtcblx0XHRzdXBlcih4LCB5LCB6KVxuXHRcdHRoaXMuc2NlbmVyeSA9IFtdO1xuXHRcdHRoaXMuc3ByaXRlcyA9IHNwcml0ZXMgfHwgW107XG5cdFx0dGhpcy50eXBlID0gJ3RlcnJhaW4nO1xuXG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoeG9mZnNldCl7XG5cdFx0Ly8gQWRkIG1vcmUgc2NlbmVyeSB1bnRpbCB3ZSBhcmUgYmV5b25kIHRoZSBlZGdlIG9mIHRoZSBzY3JlZW4gKyBkaXN0YW5jZSBzY2VuZSBkeFxuXHRcdGlmICghdGhpcy5zcHJpdGVzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0aWYgKCF4b2Zmc2V0KVxuXHRcdFx0eG9mZnNldCA9IHRoaXMuc2NlbmVyeS5yZWR1Y2UoKHgsIHMpID0+IE1hdGgubWF4KHgsIHMueCArIHMudyksIDApO1xuXHRcdGRlYnVnZ2VyO1xuXG5cdFx0d2hpbGUoeG9mZnNldCA8IGNvbmZpZy5XSURUSCArIFNldFBpZWNlLmR4KXtcblx0XHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRcdGxldCB4ID0geG9mZnNldCArIHNwcml0ZS53ICsgc3ByaXRlLncgLyAyICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdFx0bGV0IHkgPSB0aGlzLnk7XG5cdFx0XHRsZXQgeiA9IHRoaXMuejtcblxuXHRcdFx0bGV0IHNjZW5lcnkgPSBuZXcgU2NlbmVyeSh4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpXG5cdFx0XHR0aGlzLnNjZW5lcnkucHVzaChzY2VuZXJ5KTtcblxuXHRcdFx0eG9mZnNldCA9IHggKyBzcHJpdGUudztcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGxldCB4b2Zmc2V0ID0gMDtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNjZW5lcnkubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNjZW5lcnkgPSB0aGlzLnNjZW5lcnlbaV07XG5cdFx0XHRsZXQgeCA9IHNjZW5lcnkueCArIHNjZW5lcnkudztcblx0XHRcdGlmICh4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2NlbmVyeS5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0fVxuXHRcdFx0eG9mZnNldCA9IE1hdGgubWF4KHhvZmZzZXQsIHgpO1xuXHRcdH1cblx0XHR0aGlzLmdlbmVyYXRlKHhvZmZzZXQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0dGhpcy5zY2VuZXJ5LmZvckVhY2goKHNjZW5lcnkpID0+IHNjZW5lcnkucmVuZGVyKGZyYW1lSWQsIGN0eCkpO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHRzdXBlci51cGRhdGUoZHQpO1xuXHRcdHRoaXMuc2NlbmVyeS5mb3JFYWNoKChzY2VuZXJ5KSA9PiBzY2VuZXJ5LnVwZGF0ZShkdCkpXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxfcmFuZG9tKCkge1xuXHQvLyBTdGFuZGFyZCBOb3JtYWwgdmFyaWF0ZSB1c2luZyBCb3gtTXVsbGVyIHRyYW5zZm9ybS5cbiAgICB2YXIgdSA9IDEgLSBNYXRoLnJhbmRvbSgpOyAvLyBTdWJ0cmFjdGlvbiB0byBmbGlwIFswLCAxKSB0byAoMCwgMV0uXG4gICAgdmFyIHYgPSAxIC0gTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCAtMi4wICogTWF0aC5sb2coIHUgKSApICogTWF0aC5jb3MoIDIuMCAqIE1hdGguUEkgKiB2ICk7XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
