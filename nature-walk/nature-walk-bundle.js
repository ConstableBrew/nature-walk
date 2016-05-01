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

exports.default = {

   DRUID_RUN: new _sprite2.default(druidRun, 0, 0, 48, 48, 8),
   BG_MOUNTAIN: new _sprite2.default(bg_mountain, 0, 0, 1536, 767, 1),
   BG_HILL: new _sprite2.default(bg_hill, 0, 0, 1024, 306, 1),
   BG_CLOUD_00: new _sprite2.default(bg_cloud, 0, 0, 216, 48, 1),
   BG_CLOUD_01: new _sprite2.default(bg_cloud, 0, 48, 216, 64, 1),
   BG_CLOUD_02: new _sprite2.default(bg_cloud, 216, 0, 286, 48, 1),
   BG_CLOUD_03: new _sprite2.default(bg_cloud, 216, 48, 286, 64, 1),
   BG_CLOUD_04: new _sprite2.default(bg_cloud, 0, 112, 502, 72, 1),
   BG_CLOUD_05: new _sprite2.default(bg_cloud, 0, 184, 502, 72, 1)

};

},{"./sprite":7}],2:[function(require,module,exports){
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
		value: function update(dt, dx, dy) {
			this.dx += dt * dx;
			this.dy += dt * dy;
			this.x += dt * this.dx;
			this.y += dt * this.dy;
		}
	}]);

	return Entity;
}();

exports.default = Entity;

},{"./sprite":7}],3:[function(require,module,exports){
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

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _terrain = require('./terrain');

var _terrain2 = _interopRequireDefault(_terrain);

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
var FPS = 24;
var STEP = 1 / FPS;
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size
var RATIO = HEIGHT / WIDTH;
var BASE_LINE = HEIGHT * 0.75;
var BASE_MARGIN = WIDTH * 0.2;

var Game = function () {
	_createClass(Game, [{
		key: 'frame',

		// ========================================================================
		// Main Game Loop
		// ========================================================================

		value: function frame() {
			this.t = window.performance.now();
			this.dt += Math.min(1, (this.t - this.tprev) / 1000);
			while (this.dt > STEP) {
				this.frameId = this.frameId + 1 | 0;
				this.dt -= STEP;
				this.update(STEP);
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
		this.layers = [];
		this.player = {};
		this.assets = {};
		this.frameId = 0 | 0;
		this.tprev = window.performance.now();
		this.t = this.tprev;
		this.dt = 0;

		this.onScreen = canvas;
		this.offScreen = document.createElement('canvas');

		this.offScreen.width = WIDTH;
		this.offScreen.height = HEIGHT;
		this.offScreenCtx = this.offScreen.getContext('2d');
		this.offScreenCtx.imageSmoothingEnabled = false;

		this.onScreen.width = window.innerWidth;
		this.onScreen.height = Math.min(window.innerHeight, RATIO * window.innerWidth);
		this.onScreenCtx = this.onScreen.getContext('2d');
		this.onScreenCtx.imageSmoothingEnabled = false;

		this.assets = assets;
		this.player = new _player2.default({ x: BASE_MARGIN, y: BASE_LINE });
		this.player.setAnimation(this.frameId | 0, this.assets['DRUID_RUN']);

		this.layers.push(new _terrain2.default(0.5, [this.assets['BG_MOUNTAIN']], 3));
		this.layers.push(new _terrain2.default(0.75, [this.assets['BG_HILL']], 5));
		this.layers.push(this.player);
		this.layers.push(new _ground2.default());
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
			var dx = -Math.log(this.frameId) * 50; // The rate that things are scrolling left
			var dy = 0;
			this.layers.forEach(function (layer) {
				return layer.update(dt, dx, dy);
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
			var w = cvs.width * scale;
			var h = cvs.height * scale;
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

			this.layers.forEach(function (layer) {
				return layer.render(_this.frameId, _this.offScreenCtx);
			});
		}
	}]);

	return Game;
}();

exports.default = Game;

},{"./ground":4,"./player":6,"./terrain":8,"./utils":9}],4:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

// TODO: Move these to some config file
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size
var BASE_LINE = HEIGHT * 0.75;

var Ground = function () {
	function Ground() {
		_classCallCheck(this, Ground);

		this.segments = [];

		var segment = {
			x: 0,
			y: BASE_LINE,
			cp1x: 0,
			cp1y: BASE_LINE,
			cp2x: WIDTH * 0.6667,
			cp2y: BASE_LINE,
			endx: WIDTH,
			endy: BASE_LINE
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
				var endx = x + WIDTH;
				var endy = y + HEIGHT * (0, _utils.normal_random)();

				var variance = WIDTH / 5 + WIDTH / 3 * (0, _utils.normal_random)();
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
				console.log(segment);
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
		value: function update(dt, dx, dy) {
			dx = dt * dx;
			dy = dt * dy;
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

},{"./utils":9}],5:[function(require,module,exports){
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

game.debug = true;
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

var GRAVITY = -10;

var Player = function (_Entity) {
	_inherits(Player, _Entity);

	function Player(config) {
		_classCallCheck(this, Player);

		var type = 'player';
		return _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, type, config));
	}

	_createClass(Player, [{
		key: 'update',
		value: function update(dt, dx, dy) {
			dx = 0;
			dy = 0;
			_get(Object.getPrototypeOf(Player.prototype), 'update', this).call(this, dt, dx, dy);
		}
	}]);

	return Player;
}(_entity2.default);

exports.default = Player;

},{"./entity":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

// TODO: Move these to some config file
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size

var Terrain = function () {
	// Simulates distance, reducing the aparent movement of objects that are further away (0 for no movement)

	function Terrain(zFactor, sprites, density, yOffset) {
		_classCallCheck(this, Terrain);

		this.density = 5;
		this.yOffset = 0;
		this.zFactor = 1;
		this.entities = [];
		this.sprites = [];

		this.zFactor = zFactor;
		this.sprites = sprites || [];
		this.density = density | 0 || this.density;
		this.yOffset = yOffset | 0;
		this.generate();
		this.entities.forEach(function (entity) {
			return entity.x -= 1.5 * WIDTH;
		});
	}

	_createClass(Terrain, [{
		key: 'generate',
		value: function generate() {
			while (this.entities.length < this.density && this.sprites.length) {
				var sprite = this.sprites[Math.random() * this.sprites.length | 0];
				var x = WIDTH + WIDTH * Math.random();
				var y = HEIGHT - this.yOffset - sprite.sh;

				var entity = new _entity2.default('terrain', { x: x, y: y, sprite: sprite });
				this.entities.push(entity);
			}
		}
	}, {
		key: 'garbageCollection',
		value: function garbageCollection() {
			for (var i = 0; i < this.entities.length; ++i) {
				var entity = this.entities[i];
				if (entity.x + entity.w < 0) {
					this.entities.splice(i--, 1);
					this.generate();
				}
			}
		}
	}, {
		key: 'render',
		value: function render(frameId, ctx) {
			this.entities.forEach(function (entity) {
				return entity.render(frameId, ctx);
			});
		}
	}, {
		key: 'update',
		value: function update(dt, sceneDx, sceneDy) {

			// Update positions
			dt = dt * this.zFactor;
			sceneDx = dt * sceneDx;
			sceneDy = dt * sceneDy;
			this.entities.forEach(function (entity) {
				return entity.update(dt, sceneDx, sceneDy);
			});

			this.garbageCollection();
		}
	}]);

	return Terrain;
}();

exports.default = Terrain;

},{"./entity":2}],9:[function(require,module,exports){
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOzs7O2NBTUgscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FKOUIsQUFJRixBQUFxQyxBQUM5QztnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsR0FBeEIsQUFBMkIsS0FBM0IsQUFBZ0MsSUFMbEMsQUFLRSxBQUFvQyxBQUNqRDtnQkFBYSxxQkFBQSxBQUFXLFVBQVgsQUFBcUIsR0FBckIsQUFBd0IsSUFBeEIsQUFBNEIsS0FBNUIsQUFBaUMsSUFO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SjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFQSxTQUFBLEFBQVMsT0FBTSxBQUNyQjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbi8vPT09PT0gQ2xvdWRzPT09PT1cbnZhciBiZ19jbG91ZCA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJy9hc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50LnBuZyc7XG5cblxuXG5leHBvcnQgZGVmYXVsdCB7XG5cblx0RFJVSURfUlVOOiBuZXcgU3ByaXRlKGRydWlkUnVuLCAwLCAwLCA0OCwgNDgsIDgpLFxuICAgIEJHX01PVU5UQUlOOiBuZXcgU3ByaXRlKGJnX21vdW50YWluLCAwLCAwLCAxNTM2LCA3NjcsIDEpLFxuICAgIEJHX0hJTEw6IG5ldyBTcHJpdGUoYmdfaGlsbCwgMCwgMCwgMTAyNCwgMzA2LCAxKSxcbiAgICBCR19DTE9VRF8wMDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMCwgMjE2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDE6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDQ4LCAyMTYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wMjogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCAwLCAyODYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMzogbmV3IFNwcml0ZShiZ19jbG91ZCwgMjE2LCA0OCwgMjg2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDQ6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDExMiwgNTAyLCA3MiwgMSksXG4gICAgQkdfQ0xPVURfMDU6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDE4NCwgNTAyLCA3MiwgMSksXG5cbn07IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG5cdHggPSAwO1xuXHR5ID0gMDtcblx0ZHggPSAwO1xuXHRkeSA9IDA7XG5cdHcgPSAwO1xuXHRoID0gMDtcblx0c3ByaXRlID0gbnVsbDtcblx0YW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cblx0Y29uc3RydWN0b3IodHlwZSwgY29uZmlnKXtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0dGhpcy50eXBlID0gdHlwZSArICcnO1xuXHRcdHRoaXMueCA9IGNvbmZpZy54fDA7XG5cdFx0dGhpcy55ID0gY29uZmlnLnl8MDtcblx0XHR0aGlzLmR4ID0gY29uZmlnLmR4fDA7XG5cdFx0dGhpcy5keSA9IGNvbmZpZy5keXwwO1xuXHRcdHRoaXMuc3ByaXRlID0gY29uZmlnLnNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLncgPSB0aGlzLnNwcml0ZS5zd3wwO1xuXHRcdHRoaXMuaCA9IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gMDtcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm4ge307XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCBrZi5zdywga2Yuc2gpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdHRoaXMuZHggKz0gZHQgKiBkeDtcblx0XHR0aGlzLmR5ICs9IGR0ICogZHk7XG5cdFx0dGhpcy54ICArPSBkdCAqIHRoaXMuZHg7XG5cdFx0dGhpcy55ICArPSBkdCAqIHRoaXMuZHk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR3JvdW5kIGZyb20gJy4vZ3JvdW5kJztcbmltcG9ydCBUZXJyYWluIGZyb20gJy4vdGVycmFpbic7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5jb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjc1O1xuY29uc3QgQkFTRV9NQVJHSU4gPSBXSURUSCAqIDAuMjtcblxuY2xhc3MgR2FtZSB7XG5cdGdhbWVSZWFkeSA9IGZhbHNlO1xuXHRwYXVzZWQgPSBmYWxzZTtcblx0ZGVidWcgID0gZmFsc2U7XG5cblx0b25TY3JlZW4gID0gbnVsbDtcblx0b2ZmU2NyZWVuID0gbnVsbDtcblx0b25TY3JlZW5DdHggID0gbnVsbDtcblx0b2ZmU2NyZWVuQ3R4ID0gbnVsbDtcblxuXHRsYXllcnMgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDB8MDtcblx0dHByZXYgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdHQgPSB0aGlzLnRwcmV2O1xuXHRkdCA9IDA7XG5cblx0ZnJhbWUoKSB7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IFNURVApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBTVEVQO1xuXHRcdFx0dGhpcy51cGRhdGUoU1RFUCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gV0lEVEg7XG5cdFx0dGhpcy5vZmZTY3JlZW4uaGVpZ2h0ID0gSEVJR0hUO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4ICAgICA9IHRoaXMub2ZmU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLm9uU2NyZWVuLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0ID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBSQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7eDogQkFTRV9NQVJHSU4sIHk6QkFTRV9MSU5FfSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0QW5pbWF0aW9uKHRoaXMuZnJhbWVJZHwwLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBUZXJyYWluKDAuNSwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSwgMykpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC43NSwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dLCA1KSk7XG5cdFx0dGhpcy5sYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgR3JvdW5kKCkpO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0Ly8gQmVnaW5zIHRoZSBtYWluIGdhbWUgbG9vcFxuXHRcdHRoaXMuZnJhbWVJZCA9IDA7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBVcGRhdGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0dXBkYXRlKGR0KSB7XG5cdFx0bGV0IGR4ID0gLU1hdGgubG9nKHRoaXMuZnJhbWVJZCkgKiA1MDsgLy8gVGhlIHJhdGUgdGhhdCB0aGluZ3MgYXJlIHNjcm9sbGluZyBsZWZ0XG5cdFx0bGV0IGR5ID0gMDtcblx0XHR0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIudXBkYXRlKGR0LCBkeCwgZHkpKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHRsZXQgdyA9IGN2cy53aWR0aCAqIHNjYWxlO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodCAqIHNjYWxlO1xuXHRcdGxldCB4ID0gMDtcblx0XHRsZXQgeSA9ICh0aGlzLm9mZlNjcmVlbi5oZWlnaHQgLSBoKSAvIDI7XG5cblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGN2cy53aWR0aCwgY3ZzLmhlaWdodCk7XG5cblx0XHR0aGlzLnJlbmRlckxheWVycygpO1xuXG5cblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNzUpJztcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCAzMDAsIGN2cy5oZWlnaHQpO1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdnb2xkJztcblx0XHRcdGxldCBmb250U2l6ZSA9IDMyO1xuXHRcdFx0bGV0IGxpbmVIZWlnaHQgPSBmb250U2l6ZSAqIDEuMzM7XG5cdFx0XHRsZXQgbGluZVBvcyA9IHk7XG5cdFx0XHRjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IHNhbnMtc2VyaWYnO1xuXHRcdFx0Y3R4LmZpbGxUZXh0KCdmcmFtZUlkOiAnICsgdGhpcy5mcmFtZUlkLCAwLCBsaW5lUG9zICs9IGxpbmVIZWlnaHQpO1xuXHRcdH1cblxuXHRcdHRoaXMub25TY3JlZW5DdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0KTs7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRjdnMsXG5cdFx0XHR4LCB5LCB3LCBoLFxuXHRcdFx0MCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHRcblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyTGF5ZXJzKCl7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnJlbmRlcih0aGlzLmZyYW1lSWQsIHRoaXMub2ZmU2NyZWVuQ3R4KSk7XG5cdH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IHtub3JtYWxfcmFuZG9tfSBmcm9tICcuL3V0aWxzJztcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgQkFTRV9MSU5FID0gSEVJR0hUICogMC43NTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kIHtcblxuXHRzZWdtZW50cyA9IFtdO1xuXG5cdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IEJBU0VfTElORSxcblx0XHRcdGNwMXg6IDAsXG5cdFx0XHRjcDF5OiBCQVNFX0xJTkUsXG5cdFx0XHRjcDJ4OiBXSURUSCAqIDAuNjY2Nyxcblx0XHRcdGNwMnk6IEJBU0VfTElORSxcblx0XHRcdGVuZHg6IFdJRFRILFxuXHRcdFx0ZW5keTogQkFTRV9MSU5FXG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0Y29uc29sZS5sb2coc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblxuXHRcdGxldCBsYXN0ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aC0xXTtcblx0XHR3aGlsZSAodGhpcy5zZWdtZW50cy5sZW5ndGggPCAzKXtcblx0XHRcdGxldCB4ID0gbGFzdC5lbmR4O1xuXHRcdFx0bGV0IHkgPSBsYXN0LmVuZHk7XG5cdFx0XHRsZXQgY3AxeCA9IHggKyAoeCAtIGxhc3QuY3AyeCk7XG5cdFx0XHRsZXQgY3AxeSA9IHkgKyAoeSAtIGxhc3QuY3AyeSk7XG5cdFx0XHRsZXQgZW5keCA9IHggKyBXSURUSDtcblx0XHRcdGxldCBlbmR5ID0geSArIEhFSUdIVCAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHZhcmlhbmNlID0gKFdJRFRIIC8gNSkgKyAoV0lEVEggLyAzKSAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRcdGxldCBjcDJ4ID0gZW5keCAtIHZhcmlhbmNlO1xuXHRcdFx0bGV0IGNwMnkgPSBlbmR5IC0gdmFyaWFuY2UgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0XHR4OiB4LFxuXHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRjcDF4OiBjcDF4LFxuXHRcdFx0XHRjcDF5OiBjcDF5LFxuXHRcdFx0XHRjcDJ4OiBjcDJ4LFxuXHRcdFx0XHRjcDJ5OiBjcDJ5LFxuXHRcdFx0XHRlbmR4OiBlbmR4LFxuXHRcdFx0XHRlbmR5OiBlbmR5XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdFx0bGFzdCA9IHNlZ21lbnQ7XG5cdFx0XHRjb25zb2xlLmxvZyhzZWdtZW50KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2VnbWVudHMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdFx0aWYgKHNlZ21lbnQuZW5keCA8IDApe1xuXHRcdFx0XHR0aGlzLnNlZ21lbnRzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRsZXQgaSA9IDA7XG5cdFx0bGV0IHMgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHgubW92ZVRvKHMueCwgcy55KTtcblx0XHR3aGlsZSAocyl7XG5cdFx0XHRjdHguYmV6aWVyQ3VydmVUbyhzLmNwMXgsIHMuY3AxeSwgcy5jcDJ4LCBzLmNwMnksIHMuZW5keCwgcy5lbmR5KTtcblx0XHRcdHMgPSB0aGlzLnNlZ21lbnRzWysraV07XG5cdFx0fVxuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IGR0ICogZHg7XG5cdFx0ZHkgPSBkdCAqIGR5O1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmNvbnN0IEdSQVZJVFkgPSAtMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0bGV0IHR5cGUgPSAncGxheWVyJztcblx0XHRzdXBlcih0eXBlLCBjb25maWcpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdGR4ID0gMDtcblx0XHRkeSA9IDA7XG5cdFx0c3VwZXIudXBkYXRlKGR0LCBkeCwgZHkpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIHtcblxuXHRkZW5zaXR5ID0gNTtcblx0eU9mZnNldCA9IDA7XG5cdHpGYWN0b3IgPSAxOyAvLyBTaW11bGF0ZXMgZGlzdGFuY2UsIHJlZHVjaW5nIHRoZSBhcGFyZW50IG1vdmVtZW50IG9mIG9iamVjdHMgdGhhdCBhcmUgZnVydGhlciBhd2F5ICgwIGZvciBubyBtb3ZlbWVudClcblx0ZW50aXRpZXMgPSBbXTtcblx0c3ByaXRlcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKHpGYWN0b3IsIHNwcml0ZXMsIGRlbnNpdHksIHlPZmZzZXQpe1xuXHRcdHRoaXMuekZhY3RvciA9IHpGYWN0b3I7XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLmRlbnNpdHkgPSBkZW5zaXR5fDAgfHwgdGhpcy5kZW5zaXR5O1xuXHRcdHRoaXMueU9mZnNldCA9IHlPZmZzZXR8MDtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS54IC09IDEuNSpXSURUSCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXHRcdHdoaWxlKHRoaXMuZW50aXRpZXMubGVuZ3RoIDwgdGhpcy5kZW5zaXR5ICYmIHRoaXMuc3ByaXRlcy5sZW5ndGgpe1xuXHRcdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1soTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpfDBdO1xuXHRcdFx0bGV0IHggPSBXSURUSCArIFdJRFRIICogTWF0aC5yYW5kb20oKTtcblx0XHRcdGxldCB5ID0gSEVJR0hUIC0gdGhpcy55T2Zmc2V0IC0gc3ByaXRlLnNoO1xuXG5cdFx0XHRsZXQgZW50aXR5ID0gbmV3IEVudGl0eSgndGVycmFpbicsIHt4OiB4LCB5OiB5LCBzcHJpdGU6IHNwcml0ZX0pXG5cdFx0XHR0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuZW50aXRpZXMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG5cdFx0XHRpZiAoZW50aXR5LnggKyBlbnRpdHkudyA8IDApe1xuXHRcdFx0XHR0aGlzLmVudGl0aWVzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSl7XG5cblx0XHQvLyBVcGRhdGUgcG9zaXRpb25zXG5cdFx0ZHQgPSBkdCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR4ID0gZHQgKiBzY2VuZUR4O1xuXHRcdHNjZW5lRHkgPSBkdCAqIHNjZW5lRHk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS51cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpKVxuXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxfcmFuZG9tKCkge1xuXHQvLyBTdGFuZGFyZCBOb3JtYWwgdmFyaWF0ZSB1c2luZyBCb3gtTXVsbGVyIHRyYW5zZm9ybS5cbiAgICB2YXIgdSA9IDEgLSBNYXRoLnJhbmRvbSgpOyAvLyBTdWJ0cmFjdGlvbiB0byBmbGlwIFswLCAxKSB0byAoMCwgMV0uXG4gICAgdmFyIHYgPSAxIC0gTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCAtMi4wICogTWF0aC5sb2coIHUgKSApICogTWF0aC5jb3MoIDIuMCAqIE1hdGguUEkgKiB2ICk7XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
