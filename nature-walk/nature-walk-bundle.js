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

			SetPiece.stageDx = x - this.player.x;
			SetPiece.stageDy = y - this.player.y;

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

			while (xoffset < config.WIDTH + _setpiece2.default.stateDx) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9lbnRpdHkuanMiLCJzcmMvZ2FtZS5qcyIsInNyYy9ncm91bmQuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcGxheWVyLmpzIiwic3JjL3NjZW5lcnkuanMiLCJzcmMvc2V0cGllY2UuanMiLCJzcmMvc2t5LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy90ZXJyYWluLmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFXLElBQWYsQUFBZSxBQUFJO0FBQ25CLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsWUFBQSxBQUFZLE1BQVosQUFBa0I7O0FBRWxCLElBQUksVUFBVSxJQUFkLEFBQWMsQUFBSTtBQUNsQixRQUFBLEFBQVEsTUFBUixBQUFjOzs7QUFJZCxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLFNBQVMsSUFBYixBQUFhLEFBQUk7QUFDakIsT0FBQSxBQUFPLE1BQVAsQUFBYTs7OztjQU1ELHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJQUY1QixBQUVILEFBQW1DLEFBQzNDO2dCQUFhLHFCQUFBLEFBQVcsYUFBWCxBQUF3QixHQUF4QixBQUEyQixHQUEzQixBQUE4QixNQUE5QixBQUFvQyxLQUh0QyxBQUdFLEFBQXlDLEFBQ3REO1lBQVMscUJBQUEsQUFBVyxTQUFYLEFBQW9CLEdBQXBCLEFBQXVCLEdBQXZCLEFBQTBCLE1BQTFCLEFBQWdDLEtBSjlCLEFBSUYsQUFBcUMsQUFDOUM7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJC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O01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7T0FBSyxJQUFMLEFBQU8sQUFDUDtNQUFJLElBQUosQUFBUSxHQUFHLE9BQU8sRUFBRSxJQUFBLEFBQUUsSUFBRixBQUFJLElBQUosQUFBTSxJQUFmLEFBQU8sQUFBWSxBQUM5QjtJQUFBLEFBQUUsQUFDRjtTQUFPLEVBQUUsQ0FBQSxBQUFDLElBQUQsQUFBRyxLQUFLLEtBQUcsSUFBSCxBQUFLLEtBQWIsQUFBa0IsS0FBM0IsQUFBTyxBQUF5QixBQUNoQztBQUVEOzs7ZUFBTyxBQUNPLEFBQ2I7bUJBRk0sQUFFVyxBQUNqQjtvQkFITSxBQUdZLEFBQ2xCO3NCQUpELEFBQU8sQUFJYyxBQUVyQjtBQU5PLEFBQ047OztBQU9LLFNBQUEsQUFBUyxnQkFBZ0IsQUFFNUI7O0tBQUksSUFBSSxJQUFJLEssQUFBWixBQUFZLEFBQUssQUFDakI7S0FBSSxJQUFJLElBQUksS0FBWixBQUFZLEFBQUssQUFDakI7UUFBTyxLQUFBLEFBQUssS0FBTSxDQUFBLEFBQUMsTUFBTSxLQUFBLEFBQUssSUFBdkIsQUFBa0IsQUFBVSxNQUFRLEtBQUEsQUFBSyxJQUFLLE1BQU0sS0FBTixBQUFXLEtBQWhFLEFBQTJDLEFBQTBCLEFBQ3hFOzs7QUFFTSxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVBLFNBQUEsQUFBUyxPQUFNLEFBQ3JCO0tBQUksV0FBSixBQUFlLEFBQ2Y7U0FQVSxBQU9WLDRCQUFjLFNBQWQsQUFBdUIsQUFDdkI7U0FQVSxBQU9WLG9DQUFrQixTQUFsQixBQUEyQixBQUMzQjtTQVBVLEFBT1Ysc0NBQW1CLFNBQW5CLEFBQTRCLEFBQzVCO1NBUFUsQUFPViwwQ0FBcUIsU0FBckIsQUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1AiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuLy89PT09PSBDbG91ZHM9PT09PVxudmFyIGJnX2Nsb3VkID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnL2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQucG5nJztcblxudmFyIGJnX3NreSA9IG5ldyBJbWFnZSgpO1xuYmdfc2t5LnNyYyA9ICcvYXNzZXRzL2JnLXNreS5wbmcnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KSxcbiAgICBCR19NT1VOVEFJTjogbmV3IFNwcml0ZShiZ19tb3VudGFpbiwgMCwgMCwgMTUzNiwgNzY3LCAxKSxcbiAgICBCR19ISUxMOiBuZXcgU3ByaXRlKGJnX2hpbGwsIDAsIDAsIDEwMjQsIDMwNiwgMSksXG4gICAgQkdfQ0xPVURfMDA6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDAsIDIxNiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAxOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCA0OCwgMjE2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDI6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgMCwgMjg2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDM6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgNDgsIDI4NiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzA0OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxMTIsIDUwMiwgNzIsIDEpLFxuICAgIEJHX0NMT1VEXzA1OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxODQsIDUwMiwgNzIsIDEpLFxuICAgIEJHX1NLWTogbmV3IFNwcml0ZShiZ19za3ksIDAsIDAsIDEsIDEsIDEpXG5cbn07IiwiXG5leHBvcnQgY29uc3QgRlBTICA9IDI0O1xuZXhwb3J0IGNvbnN0IFNURVAgPSAxL0ZQUztcbmV4cG9ydCBjb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmV4cG9ydCBjb25zdCBSQVRJTyAgPSBIRUlHSFQgLyBXSURUSDtcbmV4cG9ydCBjb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjY2NzsgLy8gSG93IGZhciBmcm9tIHRoZSB0b3AgdGhlIHBsYXllciB3aWxsIGFwcGVhclxuZXhwb3J0IGNvbnN0IEJBU0VfTUFSR0lOID0gV0lEVEggKiAwLjI7IC8vIEhvdyBmYXIgZnJvbSB0aGUgbGVmdCB0aGUgcGxheWVyIHdpbGwgYXBwZWFyXG5leHBvcnQgY29uc3QgSE9SSVpPTiA9IEhFSUdIVCAvIDI7IC8vIEFwcGFyZW50IHBvc2l0aW9uIG9mIHRoZSBob3Jpem9uIG9uIHRoZSBzY3JlZW5cbmV4cG9ydCBjb25zdCBDQU1FUkFfRElTVEFOQ0UgPSAxMDA7IC8vIERpc3RhbmNlIGluIGZlZXQgdGhhdCB0aGUgY2FtZXJhIGlzIGF3YXkgZm9ybSB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IENBTUVSQV9BTkdMRV9ERUcgPSA5MDtcbmV4cG9ydCBjb25zdCBGSUVMRF9PRl9WSUVXID0gMiAqIE1hdGguc2luKENBTUVSQV9BTkdMRV9ERUcgLyAyICogKE1hdGguUEkgLyAxODApKSAqIENBTUVSQV9ESVNUQU5DRSAvIE1hdGguc2luKCgxODAgLSA5MCAtIENBTUVSQV9BTkdMRV9ERUcgLyAyKSAqIChNYXRoLlBJIC8gMTgwKSk7IC8vIFZpc2libGUgYXJlYSBvbiB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuZXhwb3J0IGNvbnN0IEdSQVZJVFkgPSAwKjk4NzsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcblx0eCA9IDA7XG5cdHkgPSAwO1xuXHRkeCA9IDA7XG5cdGR5ID0gMDtcblx0dyA9IDA7XG5cdGggPSAwO1xuXHRzcHJpdGUgPSBudWxsO1xuXHRhbmltYXRpb25GcmFtZUlkID0gMDtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlLCBjb25maWcpe1xuXHRcdGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0XHR0aGlzLnR5cGUgPSB0eXBlICsgJyc7XG5cdFx0dGhpcy54ID0gY29uZmlnLnh8MDtcblx0XHR0aGlzLnkgPSBjb25maWcueXwwO1xuXHRcdHRoaXMuZHggPSBjb25maWcuZHh8MDtcblx0XHR0aGlzLmR5ID0gY29uZmlnLmR5fDA7XG5cdFx0dGhpcy5zcHJpdGUgPSBjb25maWcuc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMudyA9IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gdGhpcy5zcHJpdGUuc2h8MDtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSB8fCAhdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybiB7fTtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZUlkKTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnksIGtmLnN3LCBrZi5zaCk7XG5cdH1cblxuXHR1cGRhdGUoZHgsIGR5KXtcblx0XHR0aGlzLmR4ID0gZHg7XG5cdFx0dGhpcy5keSA9IGR5O1xuXHRcdHRoaXMueCAgKz0gdGhpcy5keDtcblx0XHR0aGlzLnkgICs9IHRoaXMuZHk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdyb3VuZCBmcm9tICcuL2dyb3VuZCc7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuaW1wb3J0IFNreSBmcm9tICcuL3NreSc7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5cblxuY2xhc3MgR2FtZSB7XG5cdGdhbWVSZWFkeSA9IGZhbHNlO1xuXHRwYXVzZWQgPSBmYWxzZTtcblx0ZGVidWcgID0gZmFsc2U7XG5cblx0b25TY3JlZW4gID0gbnVsbDtcblx0b2ZmU2NyZWVuID0gbnVsbDtcblx0b25TY3JlZW5DdHggID0gbnVsbDtcblx0b2ZmU2NyZWVuQ3R4ID0gbnVsbDtcblxuXHRyZW5kZXJpbmdMYXllcnMgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdGxldCBzdGVwID0gY29uZmlnLnN0ZXA7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IHN0ZXApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBzdGVwO1xuXHRcdFx0dGhpcy51cGRhdGUoc3RlcCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gY29uZmlnLldJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IGNvbmZpZy5IRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIGNvbmZpZy5SQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihcblx0XHRcdGNvbmZpZy5CQVNFX01BUkdJTixcblx0XHRcdGNvbmZpZy5CQVNFX0xJTkUsXG5cdFx0XHRjb25maWcuQ0FNRVJBX0RJU1RBTkNFLFxuXHRcdFx0bnVsbCxcblx0XHRcdG51bGwsXG5cdFx0XHR0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10sXG5cdFx0XHR0aGlzLmZyYW1lSWRcblx0XHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChuZXcgU2t5KHRoaXMuYXNzZXRzWydCR19TS1knXSkpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMCwgMCwgMCwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSkpO1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMCwgMCwgMCwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKSk7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdFx0dGhpcy5yZW5kZXJpbmdMYXllcnMucHVzaChuZXcgR3JvdW5kKCkpO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0Ly8gQmVnaW5zIHRoZSBtYWluIGdhbWUgbG9vcFxuXHRcdHRoaXMuZnJhbWVJZCA9IDA7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBVcGRhdGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0dXBkYXRlKGR0KSB7XG5cdFx0Ly8gVXBkYXRlIHRoZSBwbGF5ZXIgZmlyc3QsIHRoZW4gbW92ZSB0aGUgcGxheWVyIGJhY2sgdG8gdGhlIHN0YXRpYyBwb3NpdGlvbi4gVXNlIHRoZSBkZWx0YSBvZiB0aGUgcGxheWVyIHRvIGFkanVzdCB0aGUgb3RoZXIgbGF5ZXJzXG5cdFx0bGV0IHggPSB0aGlzLnBsYXllci54O1xuXHRcdGxldCB5ID0gdGhpcy5wbGF5ZXIueTtcblxuXHRcdHRoaXMucGxheWVyLnVwZGF0ZShkdCk7XG5cblx0XHRTZXRQaWVjZS5zdGFnZUR4ID0geCAtIHRoaXMucGxheWVyLng7XG5cdFx0U2V0UGllY2Uuc3RhZ2VEeSA9IHkgLSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIueCA9IHg7XG5cdFx0dGhpcy5wbGF5ZXIueSA9IHk7XG5cblxuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XG5cdFx0XHRpZiAobGF5ZXIudHlwZSAhPT0gJ3BsYXllcicpXG5cdFx0XHRcdGxheWVyLnVwZGF0ZShkdClcblx0XHR9KTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHQvLyBNYXRjaCB0aGUgd2lkdGggb2YgdGhlIHNjcmVlbiBhbmQgdGhlblxuXHRcdC8vIENlbnRlciB0aGUgc2NhbGVkIGltYWdlIHZlcnRpY2FsbHkgb24gdGhlIHNjcmVlblxuXHRcdGxldCB3ID0gY3ZzLndpZHRoO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodDtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMucmVuZGVyaW5nTGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQge1xuXG5cdHNlZ21lbnRzID0gW107XG5cblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhpcy50eXBlID0gJ2dyb3VuZCc7XG5cdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogY29uZmlnLkJBU0VfTElORSxcblx0XHRcdGNwMXg6IDAsXG5cdFx0XHRjcDF5OiBjb25maWcuQkFTRV9MSU5FLFxuXHRcdFx0Y3AyeDogY29uZmlnLldJRFRIICogMC42NjY3LFxuXHRcdFx0Y3AyeTogY29uZmlnLkJBU0VfTElORSxcblx0XHRcdGVuZHg6IGNvbmZpZy5XSURUSCxcblx0XHRcdGVuZHk6IGNvbmZpZy5CQVNFX0xJTkVcblx0XHR9O1xuXHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRjb25zb2xlLmxvZyhzZWdtZW50KTtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXG5cdFx0bGV0IGxhc3QgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoLTFdO1xuXHRcdHdoaWxlICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA8IDMpe1xuXHRcdFx0bGV0IHggPSBsYXN0LmVuZHg7XG5cdFx0XHRsZXQgeSA9IGxhc3QuZW5keTtcblx0XHRcdGxldCBjcDF4ID0geCArICh4IC0gbGFzdC5jcDJ4KTtcblx0XHRcdGxldCBjcDF5ID0geSArICh5IC0gbGFzdC5jcDJ5KTtcblx0XHRcdGxldCBlbmR4ID0geCArIGNvbmZpZy5XSURUSDtcblx0XHRcdGxldCBlbmR5ID0geSArIGNvbmZpZy5IRUlHSFQgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCB2YXJpYW5jZSA9IChjb25maWcuV0lEVEggLyA1KSArIChjb25maWcuV0lEVEggLyAzKSAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRcdGxldCBjcDJ4ID0gZW5keCAtIHZhcmlhbmNlO1xuXHRcdFx0bGV0IGNwMnkgPSBlbmR5IC0gdmFyaWFuY2UgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0XHR4OiB4LFxuXHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRjcDF4OiBjcDF4LFxuXHRcdFx0XHRjcDF5OiBjcDF5LFxuXHRcdFx0XHRjcDJ4OiBjcDJ4LFxuXHRcdFx0XHRjcDJ5OiBjcDJ5LFxuXHRcdFx0XHRlbmR4OiBlbmR4LFxuXHRcdFx0XHRlbmR5OiBlbmR5XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdFx0bGFzdCA9IHNlZ21lbnQ7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNlZ21lbnRzLmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBzZWdtZW50ID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHRcdGlmIChzZWdtZW50LmVuZHggPCAwKXtcblx0XHRcdFx0dGhpcy5zZWdtZW50cy5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0aWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0bGV0IGkgPSAwO1xuXHRcdGxldCBzID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4Lm1vdmVUbyhzLngsIHMueSk7XG5cdFx0d2hpbGUgKHMpe1xuXHRcdFx0Y3R4LmJlemllckN1cnZlVG8ocy5jcDF4LCBzLmNwMXksIHMuY3AyeCwgcy5jcDJ5LCBzLmVuZHgsIHMuZW5keSk7XG5cdFx0XHRzID0gdGhpcy5zZWdtZW50c1srK2ldO1xuXHRcdH1cblx0XHRjdHguc3Ryb2tlKCk7XG5cdH1cblxuXHR1cGRhdGUoZHgsIGR5KXtcblx0XHR0aGlzLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQpID0+IHtcblx0XHRcdHNlZ21lbnQueCArPSBkeDtcblx0XHRcdHNlZ21lbnQueSArPSBkeTtcblx0XHRcdHNlZ21lbnQuY3AxeCArPSBkeDtcblx0XHRcdHNlZ21lbnQuY3AxeSArPSBkeTtcblx0XHRcdHNlZ21lbnQuY3AyeCArPSBkeDtcblx0XHRcdHNlZ21lbnQuY3AyeSArPSBkeTtcblx0XHRcdHNlZ21lbnQuZW5keCArPSBkeDtcblx0XHRcdHNlZ21lbnQuZW5keSArPSBkeTtcblx0XHR9KTtcblx0fVxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMnXG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLCBhc3NldHMpO1xuXG5cbiFmdW5jdGlvbiB3YWl0Rm9yQ29udGVudCgpe1xuXHQvLyBXYWl0IGZvciBjb250ZW50IHRvIGJlIHJldHJlaXZlZCBieSB0aGUgYnJvd3NlclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG5cdFx0Ly8gVE9ETy4uLlxuXHR9KTtcbn0oKVxuLnRoZW4oZ2FtZS5zdGFydCk7XG5cbi8vZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0IFNjZW5lcnkgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBTY2VuZXJ5IHtcblx0Y29uc3RydWN0b3IoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKXtcblx0XHRzdXBlcih4LCB5LCB6LCB3aWR0aCwgaGVpZ2h0LCBzcHJpdGUsIGZyYW1lSWQpO1xuXHRcdHRoaXMudHlwZSA9ICdwbGF5ZXInO1xuXHR9XG5cblx0dXBkYXRlKGR0KXtcblx0XHRsZXQgZGR4ID0gZHQgKiBNYXRoLmxvZyh0aGlzLmZyYW1lSWQpICogMTAwOyAvLyBUaGUgcmF0ZSB0aGF0IHBsYXllciBpcyBtb3ZpbmcgZm9yd2FyZFxuXHRcdGxldCBkZHkgPSBjb25maWcuR1JBVklUWTtcblx0XHR0aGlzLmR4ICs9IGR0ICogdGhpcy5kZHg7XG5cdFx0dGhpcy5keSArPSBkdCAqIHRoaXMuZGR5O1xuXHRcdHRoaXMueCAgKz0gZHQgKiB0aGlzLmR4O1xuXHRcdHRoaXMueSAgKz0gZHQgKiB0aGlzLmR5O1xuXHR9XG59IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5pbXBvcnQgU2V0UGllY2UgZnJvbSAnLi9zZXRwaWVjZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lcnkgZXh0ZW5kcyBTZXRQaWVjZSB7XG5cblx0Ly8gU2NlbmVyeSBhcmUgc2V0IHBpZWNlcyB0aGF0IGhhdmUgYW5pbWF0ZWQgc3ByaXRlc1xuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHdpZHRoLCBoZWlnaHQsIHNwcml0ZSwgZnJhbWVJZCl7XG5cdFx0c3VwZXIoeCwgeSwgeik7XG5cblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLncgPSB3aWR0aCAgfHwgdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSBoZWlnaHQgfHwgdGhpcy5zcHJpdGUuc2h8MDtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0dGhpcy50eXBlID0gJ3NjZW5lcnknO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSB8fCAhdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybjtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZUlkKTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKTtcblx0fVxuXG59IiwiLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlLCBhbmQgY2FtZXJhIHN0dWZmIHRvIGEgY2FtZXJhIG9iamVjdFxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhPUklaT04gPSBIRUlHSFQgLyAyOyAvLyBBcHBhcmVudCBwb3NpdGlvbiBvZiB0aGUgaG9yaXpvbiBvbiB0aGUgc2NyZWVuXG5jb25zdCBDQU1FUkFfRElTVEFOQ0UgPSAxMDA7IC8vIERpc3RhbmNlIGluIGZlZXQgdGhhdCB0aGUgY2FtZXJhIGlzIGF3YXkgZm9ybSB0aGUgcGxhbmUgb2YgdGhlIHBsYXllclxuY29uc3QgQ0FNRVJBX0FOR0xFX0RFRyA9IDkwO1xuY29uc3QgRklFTERfT0ZfVklFVyA9IDIgKiBNYXRoLnNpbihDQU1FUkFfQU5HTEVfREVHIC8gMiAqIChNYXRoLlBJIC8gMTgwKSkgKiBDQU1FUkFfRElTVEFOQ0UgLyBNYXRoLnNpbigoMTgwIC0gOTAgLSBDQU1FUkFfQU5HTEVfREVHIC8gMikgKiAoTWF0aC5QSSAvIDE4MCkpOyAvLyBWaXNpYmxlIGFyZWEgb24gdGhlIHBsYW5lIG9mIHRoZSBwbGF5ZXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGllY2Uge1xuXHRcblx0Ly8gQWxsIHNldCBwaWVjZXMgbW92ZSB0b2dldGhlciBpbiByZXNwb25zZSB0byB0aGUgcGxheWVyJ3MgbW92ZW1lbnRcblx0c3RhdGljIHN0YWdlRHggPSAwO1xuXHRzdGF0aWMgc3RhZ2VEeSA9IDA7XG5cblx0Y29uc3RydWN0b3IoeCwgeSwgeil7XG5cdFx0aWYgKG5ldy50YXJnZXQgPT09IFNldFBpZWNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY3JlYXRlIGluc3RhbmNlcyBvZiBhYnN0cmFjdCBjbGFzcyBTZXRQaWVjZScpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucmVuZGVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IG92ZXJyaWRlIHJlbmRlciBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdHRoaXMueCA9IHh8fDA7XG5cdFx0dGhpcy55ID0geXx8MDtcblx0XHR0aGlzLnogPSB6fHwwO1xuXHR9XG5cblx0Ly8gcmVuZGVyIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGJ5IGNoaWxkIGNsYXNzZXNcblxuXHR1cGRhdGUoZHQpe1xuXHRcdC8vIE1vdmVtZW50IHJlbGF0aXZlIHRvIHRoZSBzdGFnZVxuXHRcdGxldCB6RmFjdG9yID0gdGhpcy56IC8gRklFTERfT0ZfVklFVztcblx0XHRsZXQgZHggPSBTZXRQaWVjZS5zdGFnZUR4ICogekZhY3Rvcjtcblx0XHRsZXQgZHkgPSBTZXRQaWVjZS5zdGFnZUR5ICogekZhY3Rvcjtcblx0XHR0aGlzLnggKz0gZHggKiBkdDtcblx0XHR0aGlzLnkgKz0gZHkgKiBkdDtcblx0fVxufSIsImltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa3kgZXh0ZW5kcyBTY2VuZXJ5IHtcblxuXHRjb25zdHJ1Y3RvcihzcHJpdGUpe1xuXHRcdHN1cGVyKDAsIDAsIDAsIFdJRFRILCBIRUlHSFQsIHNwcml0ZSwgMClcblx0XHR0aGlzLnR5cGUgPSAnc2t5Jztcblx0fVxuXHRcblx0dXBkYXRlKCl7XG5cdFx0Ly8gbm9wXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuXHQvLyBTcHJpdGVzIGRlZmluZSBhIHNlcmllcyBvZiBrZXlmcmFtZSBhbmltYXRpb25zXG5cdFxuXHRrZXlGcmFtZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3RvciAoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBudW1LZXlGcmFtZXMpIHtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy5zeCA9IHN4fDA7XG5cdFx0dGhpcy5zeSA9IHN5fDA7XG5cdFx0dGhpcy5zdyA9IHN3fDA7XG5cdFx0dGhpcy5zaCA9IHNofDA7XG5cdFx0dGhpcy5udW1LZXlGcmFtZXMgPSBNYXRoLm1heChudW1LZXlGcmFtZXN8MCwgMSk7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLm51bUtleUZyYW1lczsgKytpKXtcblx0XHRcdGxldCBrZXlGcmFtZSA9IHtcblx0XHRcdFx0aW1hZ2U6IHRoaXMuaW1hZ2UsXG5cdFx0XHRcdHN4OiB0aGlzLnN4ICsgdGhpcy5zdyAqIGksXG5cdFx0XHRcdHN5OiB0aGlzLnN5LFxuXHRcdFx0XHRzdzogdGhpcy5zdyxcblx0XHRcdFx0c2g6IHRoaXMuc2hcblx0XHRcdH07XG5cdFx0XHR0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcblx0XHR9XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRmcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHJldHVybiB0aGlzLmtleUZyYW1lc1tmcmFtZUlkICUgdGhpcy5udW1LZXlGcmFtZXNdO1xuXHR9XG59XG4iLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBTY2VuZXJ5IGZyb20gJy4vc2NlbmVyeSc7XG5pbXBvcnQgU2V0UGllY2UgZnJvbSAnLi9zZXRwaWVjZSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcnJhaW4gZXh0ZW5kcyBTZXRQaWVjZXtcblxuXG5cdGNvbnN0cnVjdG9yKHgsIHksIHosIHNwcml0ZXMpe1xuXHRcdHN1cGVyKHgsIHksIHopXG5cdFx0dGhpcy5zY2VuZXJ5ID0gW107XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLnR5cGUgPSAndGVycmFpbic7XG5cblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdH1cblxuXHRnZW5lcmF0ZSh4b2Zmc2V0KXtcblx0XHQvLyBBZGQgbW9yZSBzY2VuZXJ5IHVudGlsIHdlIGFyZSBiZXlvbmQgdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlbiArIGRpc3RhbmNlIHNjZW5lIGR4XG5cdFx0aWYgKCF0aGlzLnNwcml0ZXMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRpZiAoIXhvZmZzZXQpXG5cdFx0XHR4b2Zmc2V0ID0gdGhpcy5zY2VuZXJ5LnJlZHVjZSgoeCwgcykgPT4gTWF0aC5tYXgoeCwgcy54ICsgcy53KSwgMCk7XG5cblx0XHR3aGlsZSh4b2Zmc2V0IDwgY29uZmlnLldJRFRIICsgU2V0UGllY2Uuc3RhdGVEeCl7XG5cdFx0XHRsZXQgc3ByaXRlID0gdGhpcy5zcHJpdGVzWyhNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aCl8MF07XG5cdFx0XHRsZXQgeCA9IHhvZmZzZXQgKyBzcHJpdGUudyArIHNwcml0ZS53IC8gMiAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRcdGxldCB5ID0gdGhpcy55O1xuXHRcdFx0bGV0IHogPSB0aGlzLno7XG5cblx0XHRcdGxldCBzY2VuZXJ5ID0gbmV3IFNjZW5lcnkoeCwgeSwgeiwgd2lkdGgsIGhlaWdodCwgc3ByaXRlLCBmcmFtZUlkKVxuXHRcdFx0dGhpcy5zY2VuZXJ5LnB1c2goc2NlbmVyeSk7XG5cblx0XHRcdHhvZmZzZXQgPSB4ICsgc3ByaXRlLnc7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRsZXQgeG9mZnNldCA9IDA7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zY2VuZXJ5Lmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBzY2VuZXJ5ID0gdGhpcy5zY2VuZXJ5W2ldO1xuXHRcdFx0bGV0IHggPSBzY2VuZXJ5LnggKyBzY2VuZXJ5Lnc7XG5cdFx0XHRpZiAoeCA8IDApe1xuXHRcdFx0XHR0aGlzLnNjZW5lcnkuc3BsaWNlKGktLSwxKTtcblx0XHRcdH1cblx0XHRcdHhvZmZzZXQgPSBNYXRoLm1heCh4b2Zmc2V0LCB4KTtcblx0XHR9XG5cdFx0dGhpcy5nZW5lcmF0ZSh4b2Zmc2V0KTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdHRoaXMuc2NlbmVyeS5mb3JFYWNoKChzY2VuZXJ5KSA9PiBzY2VuZXJ5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCl7XG5cdFx0c3VwZXIudXBkYXRlKGR0KTtcblx0XHR0aGlzLnNjZW5lcnkuZm9yRWFjaCgoc2NlbmVyeSkgPT4gc2NlbmVyeS51cGRhdGUoZHQpKVxuXHRcdHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24oKTtcblx0fVxufSIsImZ1bmN0aW9uIGFzbSgpe1xuXHQndXNlIGFzbSc7XG5cdC8vIHQ6IGN1cnJlbnQgdGltZVxuXHQvLyBiOiBzdGFydCB2YWx1ZVxuXHQvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0Ly8gZDogZHVyYWl0b25cblxuXHRmdW5jdGlvbiBsaW5lYXJUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHJldHVybiArKGMqdC9kICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5RdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKGMqdCp0ICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKygtYyp0Kih0LTIpICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5PdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0IC89IGQvMjtcblx0XHRpZiAodCA8IDEpIHJldHVybiArKGMvMip0KnQgKyBiKTtcblx0XHQtLXQ7XG5cdFx0cmV0dXJuICsoLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGluZWFyVHdlZW46IGxpbmVhclR3ZWVuLFxuXHRcdGVhc2VJblF1YWRUd2VlbjogZWFzZUluUXVhZFR3ZWVuLFxuXHRcdGVhc2VPdXRRdWFkVHdlZW46IGVhc2VPdXRRdWFkVHdlZW4sXG5cdFx0ZWFzZUluT3V0UXVhZFR3ZWVuOiBlYXNlSW5PdXRRdWFkVHdlZW5cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsX3JhbmRvbSgpIHtcblx0Ly8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXG4gICAgdmFyIHUgPSAxIC0gTWF0aC5yYW5kb20oKTsgLy8gU3VidHJhY3Rpb24gdG8gZmxpcCBbMCwgMSkgdG8gKDAsIDFdLlxuICAgIHZhciB2ID0gMSAtIE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIE1hdGguc3FydCggLTIuMCAqIE1hdGgubG9nKCB1ICkgKSAqIE1hdGguY29zKCAyLjAgKiBNYXRoLlBJICogdiApO1xufVxuXG5leHBvcnQgdmFyIGxpbmVhclR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5RdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VPdXRRdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJbk91dFF1YWRUd2VlbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKXtcblx0dmFyIGV4cG9ydGVkID0gYXNtKCk7XG5cdGxpbmVhclR3ZWVuID0gZXhwb3J0ZWQubGluZWFyVHdlZW47XG5cdGVhc2VJblF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJblF1YWRUd2Vlbjtcblx0ZWFzZU91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VPdXRRdWFkVHdlZW47XG5cdGVhc2VJbk91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJbk91dFF1YWRUd2Vlbjtcblx0cmV0dXJuIGV4cG9ydGVkO1xufTtcbiJdfQ==
