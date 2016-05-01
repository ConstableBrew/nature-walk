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

exports.default = {

   DRUID_RUN: new _sprite2.default(druidRun, 0, 0, 48, 48, 8),
   BG_MOUNTAIN: new _sprite2.default(bg_mountain, 0, 0, 1536, 767, 1),
   BG_HILL: new _sprite2.default(bg_hill, 0, 0, 1024, 306, 1)
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
		this.player = new _player2.default({ x: WIDTH / 2, y: HEIGHT / 2 });
		this.player.setAnimation(this.frameId | 0, this.assets['DRUID_RUN']);

		this.layers.push(new _terrain2.default(0.75, [this.assets['BG_MOUNTAIN']], 3));
		this.layers.push(new _terrain2.default(0.9, [this.assets['BG_HILL']], 5));
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
			var dx = -Math.log(this.frameId) * 7; // The rate that things are scrolling left
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

var BASE_LINE = HEIGHT - 100;

var Ground = function () {
	function Ground() {
		_classCallCheck(this, Ground);

		this.segments = [];

		var segment = {
			x: 0,
			y: BASE_LINE,
			cp1x: 0,
			cp1y: 0,
			cp2x: WIDTH,
			cp2y: BASE_LINE,
			endx: WIDTH,
			endy: BASE_LINE
		};
		this.segments.push(segment);
		this.generate();
	}

	_createClass(Ground, [{
		key: 'generate',
		value: function generate() {

			var last = this.segments[segments.length - 1];
			while (this.segments.length < 3) {
				var x = last.endx;
				var y = last.endy;
				var cp1x = x + (x - last.cp2x);
				var cp1y = y + (y - last.cp2y);
				var endx = x + WIDTH;
				var endy = y + HEIGHT * (0, _utils.normal_random)();

				var variance = WIDTH / 3 * (0, _utils.normal_random)();
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
			sceneDx = sceneDx * this.zFactor;
			sceneDy = sceneDy * this.zFactor;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc3ByaXRlLmpzIiwic3JjL3RlcnJhaW4uanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixZQUFBLEFBQVksTUFBWixBQUFrQjs7QUFFbEIsSUFBSSxVQUFVLElBQWQsQUFBYyxBQUFJO0FBQ2xCLFFBQUEsQUFBUSxNQUFSLEFBQWM7OztBQUlkLElBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJO0FBQ3RCLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJO0FBQ3RCLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLGNBQWMsSUFBbEIsQUFBa0IsQUFBSTtBQUN0QixTQUFBLEFBQVMsTUFBVCxBQUFlOzs7O2NBTUgscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRjVCLEFBRUgsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBSHRDLEFBR0UsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsSyxBQUo5QixBQUlGLEFBQXFDO0FBSm5DLEFBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0Q7Ozs7Ozs7Ozs7Ozs7O0ksQUFFcUIscUJBVXBCO2lCQUFBLEFBQVksTUFBWixBQUFrQixRQUFPO3dCQUFBOztPQVR6QixBQVN5QixJQVRyQixBQVNxQjtPQVJ6QixBQVF5QixJQVJyQixBQVFxQjtPQVB6QixBQU95QixLQVBwQixBQU9vQjtPQU56QixBQU15QixLQU5wQixBQU1vQjtPQUx6QixBQUt5QixJQUxyQixBQUtxQjtPQUp6QixBQUl5QixJQUpyQixBQUlxQjtPQUh6QixBQUd5QixTQUhoQixBQUdnQjtPQUZ6QixBQUV5QixtQkFGTixBQUVNLEFBQ3hCOztXQUFTLFVBQVQsQUFBbUIsQUFDbkI7T0FBQSxBQUFLLE9BQU8sT0FBWixBQUFtQixBQUNuQjtPQUFBLEFBQUssSUFBSSxPQUFBLEFBQU8sSUFBaEIsQUFBa0IsQUFDbEI7T0FBQSxBQUFLLElBQUksT0FBQSxBQUFPLElBQWhCLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxLQUFLLE9BQUEsQUFBTyxLQUFqQixBQUFvQixBQUNwQjtPQUFBLEFBQUssS0FBSyxPQUFBLEFBQU8sS0FBakIsQUFBb0IsQUFDcEI7T0FBQSxBQUFLLFNBQVMsT0FBQSxBQUFPLFVBQXJCLEFBQStCLEFBQy9CO09BQUEsQUFBSyxJQUFJLEtBQUEsQUFBSyxPQUFMLEFBQVksS0FBckIsQUFBd0IsQUFDeEI7T0FBQSxBQUFLLElBQUksS0FBQSxBQUFLLE9BQUwsQUFBWSxLQUFyQixBQUF3QixBQUN4QjtPQUFBLEFBQUssbUJBQUwsQUFBd0IsQUFDeEI7Ozs7OytCLEFBRVksUyxBQUFTLFFBQU8sQUFDNUI7UUFBQSxBQUFLLFNBQVMsVUFBZCxBQUF3QixBQUN4QjtRQUFBLEFBQUssbUJBQW1CLFVBQXhCLEFBQWdDLEFBQ2hDOzs7OzhCLEFBRVcsU0FBUSxBQUNuQjtPQUFJLENBQUMsS0FBRCxBQUFNLFVBQVUsQ0FBQyxLQUFBLEFBQUssT0FBMUIsQUFBaUMsYUFBYSxPQUFBLEFBQU8sQUFFckQ7O1VBQU8sS0FBQSxBQUFLLE9BQUwsQUFBWSxZQUFZLFVBQVUsS0FBekMsQUFBTyxBQUF1QyxBQUM5Qzs7Ozt5QixBQUVNLFMsQUFBUyxLQUFJLEFBQ25CO09BQUksS0FBSyxLQUFBLEFBQUssWUFBZCxBQUFTLEFBQWlCLEFBQzFCO09BQUksQ0FBQSxBQUFDLE1BQU0sQ0FBQyxHQUFaLEFBQWUsT0FBTyxBQUN0QjtPQUFBLEFBQUksVUFBVSxHQUFkLEFBQWlCLE9BQU8sR0FBeEIsQUFBMkIsSUFBSSxHQUEvQixBQUFrQyxJQUFJLEdBQXRDLEFBQXlDLElBQUksR0FBN0MsQUFBZ0QsSUFBSSxLQUFwRCxBQUF5RCxHQUFHLEtBQTVELEFBQWlFLEdBQUcsR0FBcEUsQUFBdUUsSUFBSSxHQUEzRSxBQUE4RSxBQUM5RTs7Ozt5QixBQUVNLEksQUFBSSxJLEFBQUksSUFBRyxBQUNqQjtRQUFBLEFBQUssTUFBTSxLQUFYLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSyxNQUFNLEtBQVgsQUFBZ0IsQUFDaEI7UUFBQSxBQUFLLEtBQU0sS0FBSyxLQUFoQixBQUFxQixBQUNyQjtRQUFBLEFBQUssS0FBTSxLQUFLLEtBQWhCLEFBQXFCLEFBQ3JCOzs7Ozs7O2tCLEFBN0NtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZyQjs7SSxBQUFZOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFBLEFBQU07OztBQUdOLElBQU0sTUFBTixBQUFhO0FBQ2IsSUFBTSxPQUFPLElBQWIsQUFBZTtBQUNmLElBQU0sUSxBQUFOLEFBQWU7QUFDZixJQUFNLFMsQUFBTixBQUFlO0FBQ2YsSUFBTSxRQUFTLFNBQWYsQUFBd0I7O0ksQUFFbEI7Ozs7Ozs7OzBCQXdCRyxBQUNQO1FBQUEsQUFBSyxJQUFJLE9BQUEsQUFBTyxZQUFoQixBQUFTLEFBQW1CLEFBQzVCO1FBQUEsQUFBSyxNQUFNLEtBQUEsQUFBSyxJQUFMLEFBQVMsR0FBRyxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQVYsQUFBZSxTQUF0QyxBQUFXLEFBQW9DLEFBQy9DO1VBQU0sS0FBQSxBQUFLLEtBQVgsQUFBZ0IsTUFBTSxBQUNyQjtTQUFBLEFBQUssVUFBVyxLQUFBLEFBQUssVUFBTixBQUFnQixJQUEvQixBQUFrQyxBQUNsQztTQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1g7U0FBQSxBQUFLLE9BQUwsQUFBWSxBQUNaO0FBQ0Q7UUFBQSxBQUFLLFFBQVEsS0FBYixBQUFrQixBQUNsQjtRQUFBLEFBQUssQUFFTDs7T0FBSSxLQUFKLEFBQVMsUUFBUSxBQUNqQjt5QkFBc0IsS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUFqQyxBQUFzQixBQUFnQixPQUFPLEtBQTdDLEFBQWtELEFBQ2xEO0FBT0Q7Ozs7Ozs7O2VBQUEsQUFBWSxRQUFaLEFBQW9CLFFBQU87d0JBQUE7O09BM0MzQixBQTJDMkIsWUEzQ2YsQUEyQ2U7T0ExQzNCLEFBMEMyQixTQTFDbEIsQUEwQ2tCO09BekMzQixBQXlDMkIsUUF6Q2xCLEFBeUNrQjtPQXZDM0IsQUF1QzJCLFdBdkNmLEFBdUNlO09BdEMzQixBQXNDMkIsWUF0Q2YsQUFzQ2U7T0FyQzNCLEFBcUMyQixjQXJDWixBQXFDWTtPQXBDM0IsQUFvQzJCLGVBcENaLEFBb0NZO09BbEMzQixBQWtDMkIsU0FsQ2xCLEFBa0NrQjtPQWpDM0IsQUFpQzJCLFNBakNsQixBQWlDa0I7T0FoQzNCLEFBZ0MyQixTQWhDbEIsQUFnQ2tCO09BekIzQixBQXlCMkIsVUF6QmpCLElBQUUsQUF5QmU7T0F4QjNCLEFBd0IyQixRQXhCbkIsT0FBQSxBQUFPLFlBQVAsQUFBbUIsQUF3QkE7T0F2QjNCLEFBdUIyQixJQXZCdkIsS0FBSyxBQXVCa0I7T0F0QjNCLEFBc0IyQixLQXRCdEIsQUFzQnNCLEFBQzFCOztPQUFBLEFBQUssV0FBTCxBQUFpQixBQUNqQjtPQUFBLEFBQUssWUFBWSxTQUFBLEFBQVMsY0FBMUIsQUFBaUIsQUFBdUIsQUFFeEM7O09BQUEsQUFBSyxVQUFMLEFBQWUsUUFBZixBQUF3QixBQUN4QjtPQUFBLEFBQUssVUFBTCxBQUFlLFNBQWYsQUFBd0IsQUFDeEI7T0FBQSxBQUFLLGVBQW1CLEtBQUEsQUFBSyxVQUFMLEFBQWUsV0FBdkMsQUFBd0IsQUFBMEIsQUFDbEQ7T0FBQSxBQUFLLGFBQUwsQUFBa0Isd0JBQWxCLEFBQTBDLEFBRTFDOztPQUFBLEFBQUssU0FBTCxBQUFjLFFBQVMsT0FBdkIsQUFBOEIsQUFDOUI7T0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFTLEtBQUEsQUFBSyxJQUFJLE9BQVQsQUFBZ0IsYUFBYSxRQUFRLE9BQTVELEFBQXVCLEFBQTRDLEFBQ25FO09BQUEsQUFBSyxjQUFrQixLQUFBLEFBQUssU0FBTCxBQUFjLFdBQXJDLEFBQXVCLEFBQXlCLEFBQ2hEO09BQUEsQUFBSyxZQUFMLEFBQWlCLHdCQUFqQixBQUEwQyxBQUUxQzs7T0FBQSxBQUFLLFNBQUwsQUFBYyxBQUNkO09BQUEsQUFBSyxTQUFTLHFCQUFXLEVBQUMsR0FBRyxRQUFKLEFBQVUsR0FBRyxHQUFFLFNBQXhDLEFBQWMsQUFBVyxBQUFzQixBQUMvQztPQUFBLEFBQUssT0FBTCxBQUFZLGFBQWEsS0FBQSxBQUFLLFVBQTlCLEFBQXNDLEdBQUcsS0FBQSxBQUFLLE9BQTlDLEFBQXlDLEFBQVksQUFFckQ7O09BQUEsQUFBSyxPQUFMLEFBQVksS0FBSyxzQkFBQSxBQUFZLE1BQU0sQ0FBQyxLQUFBLEFBQUssT0FBeEIsQUFBa0IsQUFBQyxBQUFZLGlCQUFoRCxBQUFpQixBQUFnRCxBQUNqRTtPQUFBLEFBQUssT0FBTCxBQUFZLEtBQUssc0JBQUEsQUFBWSxLQUFLLENBQUMsS0FBQSxBQUFLLE9BQXZCLEFBQWlCLEFBQUMsQUFBWSxhQUEvQyxBQUFpQixBQUEyQyxBQUM1RDtPQUFBLEFBQUssT0FBTCxBQUFZLEtBQUssS0FBakIsQUFBc0IsQUFDdEI7T0FBQSxBQUFLLE9BQUwsQUFBWSxLQUFLLGFBQWpCLEFBQ0E7Ozs7OzBCQUVPLEFBRVA7O1FBQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjt5QkFBc0IsS0FBQSxBQUFLLE1BQUwsQUFBVyxLQUFqQyxBQUFzQixBQUFnQixPQUFPLEtBQTdDLEFBQWtELEFBQ2xEOzs7Ozs7Ozs7eUIsQUFVTSxJQUFJLEFBQ1Y7T0FBSSxLQUFLLENBQUMsS0FBQSxBQUFLLElBQUksS0FBVixBQUFDLEFBQWMsVyxBQUF4QixBQUFtQyxBQUNuQztPQUFJLEtBQUosQUFBUyxBQUNUO1FBQUEsQUFBSyxPQUFMLEFBQVksUUFBUSxVQUFBLEFBQUMsT0FBRDtXQUFXLE1BQUEsQUFBTSxPQUFOLEFBQWEsSUFBYixBQUFpQixJQUE1QixBQUFXLEFBQXFCO0FBQXBELEFBQ0E7Ozs7Ozs7OzsyQkFPUSxBQUNSO09BQUksTUFBTSxLQUFWLEFBQWUsQUFDZjtPQUFJLE1BQU0sS0FBVixBQUFlLEFBRWY7O09BQUksUUFBUSxLQUFBLEFBQUssSUFDaEIsS0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFPLElBRFYsQUFDYyxRQUN6QixLQUFBLEFBQUssU0FBTCxBQUFjLFFBQU0sSUFGckIsQUFBWSxBQUVhLEFBRXpCO09BQUksSUFBSSxJQUFBLEFBQUksUUFBWixBQUFvQixBQUNwQjtPQUFJLElBQUksSUFBQSxBQUFJLFNBQVosQUFBcUIsQUFDckI7T0FBSSxJQUFKLEFBQVEsQUFDUjtPQUFJLElBQUksQ0FBQyxLQUFBLEFBQUssVUFBTCxBQUFlLFNBQWhCLEFBQXlCLEtBQWpDLEFBQXNDLEFBRXRDOztPQUFBLEFBQUksVUFBSixBQUFjLEdBQWQsQUFBaUIsR0FBRyxJQUFwQixBQUF3QixPQUFPLElBQS9CLEFBQW1DLEFBRW5DOztRQUFBLEFBQUssQUFHTDs7T0FBSSxLQUFKLEFBQVMsT0FBTyxBQUNmO1FBQUEsQUFBSSxZQUFKLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSSxTQUFKLEFBQWEsR0FBYixBQUFnQixHQUFoQixBQUFtQixLQUFLLElBQXhCLEFBQTRCLEFBQzVCO1FBQUEsQUFBSSxZQUFKLEFBQWdCLEFBQ2hCO1FBQUksV0FBSixBQUFlLEFBQ2Y7UUFBSSxhQUFhLFdBQWpCLEFBQTRCLEFBQzVCO1FBQUksVUFBSixBQUFjLEFBQ2Q7UUFBQSxBQUFJLE9BQU8sV0FBWCxBQUFzQixBQUN0QjtRQUFBLEFBQUksU0FBUyxjQUFjLEtBQTNCLEFBQWdDLFNBQWhDLEFBQXlDLEdBQUcsV0FBNUMsQUFBdUQsQUFDdkQ7QUFFRDs7UUFBQSxBQUFLLFlBQUwsQUFBaUIsVUFBakIsQUFBMkIsR0FBM0IsQUFBOEIsR0FBRyxLQUFBLEFBQUssU0FBdEMsQUFBK0MsT0FBTyxLQUFBLEFBQUssU0FBM0QsQUFBb0UsUUFBUSxBQUM1RTtRQUFBLEFBQUssWUFBTCxBQUFpQixVQUFqQixBQUNDLEtBREQsQUFFQyxHQUZELEFBRUksR0FGSixBQUVPLEdBRlAsQUFFVSxHQUZWLEFBR0MsR0FIRCxBQUdJLEdBQUcsS0FBQSxBQUFLLFNBSFosQUFHcUIsT0FBTyxLQUFBLEFBQUssU0FIakMsQUFHMEMsQUFFMUM7Ozs7aUNBRWE7ZUFDYjs7UUFBQSxBQUFLLE9BQUwsQUFBWSxRQUFRLFVBQUEsQUFBQyxPQUFEO1dBQVcsTUFBQSxBQUFNLE9BQU8sTUFBYixBQUFrQixTQUFTLE1BQXRDLEFBQVcsQUFBZ0M7QUFBL0QsQUFDQTs7Ozs7OztrQixBQUthOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpmOzs7Ozs7Ozs7QUFHQSxJQUFNLFEsQUFBTixBQUFlO0FBQ2YsSUFBTSxTLEFBQU4sQUFBZTs7QUFFZixJQUFNLFlBQVksU0FBbEIsQUFBMkI7O0ksQUFFTixxQkFLcEI7bUJBQWE7d0JBQUE7O09BSGIsQUFHYSxXQUhGLEFBR0UsQUFDWjs7TUFBSTtNQUFVLEFBQ1YsQUFDSDtNQUZhLEFBRVYsQUFDSDtTQUhhLEFBR1AsQUFDTjtTQUphLEFBSVAsQUFDTjtTQUxhLEFBS1AsQUFDTjtTQU5hLEFBTVAsQUFDTjtTQVBhLEFBT1AsQUFDTjtTQVJELEFBQWMsQUFRUCxBQUVQO0FBVmMsQUFDYjtPQVNELEFBQUssU0FBTCxBQUFjLEtBQWQsQUFBbUIsQUFDbkI7T0FBQSxBQUFLLEFBQ0w7Ozs7OzZCQUVTLEFBRVQ7O09BQUksT0FBTyxLQUFBLEFBQUssU0FBUyxTQUFBLEFBQVMsU0FBbEMsQUFBVyxBQUE4QixBQUN6QztVQUFPLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBckIsQUFBOEIsR0FBRSxBQUMvQjtRQUFJLElBQUksS0FBUixBQUFhLEFBQ2I7UUFBSSxJQUFJLEtBQVIsQUFBYSxBQUNiO1FBQUksT0FBTyxLQUFLLElBQUksS0FBcEIsQUFBVyxBQUFjLEFBQ3pCO1FBQUksT0FBTyxLQUFLLElBQUksS0FBcEIsQUFBVyxBQUFjLEFBQ3pCO1FBQUksT0FBTyxJQUFYLEFBQWUsQUFDZjtRQUFJLE9BQU8sSUFBSSxTQUFTLFdBQXhCLEFBRUE7O1FBQUksV0FBWSxRQUFELEFBQVMsSUFBSyxXQUE3QixBQUNBO1FBQUksT0FBTyxPQUFYLEFBQWtCLEFBQ2xCO1FBQUksT0FBTyxPQUFPLFdBQVcsV0FBN0IsQUFFQTs7UUFBSTtRQUFVLEFBQ1YsQUFDSDtRQUZhLEFBRVYsQUFDSDtXQUhhLEFBR1AsQUFDTjtXQUphLEFBSVAsQUFDTjtXQUxhLEFBS1AsQUFDTjtXQU5hLEFBTVAsQUFDTjtXQVBhLEFBT1AsQUFDTjtXQVJELEFBQWMsQUFRUCxBQUVQO0FBVmMsQUFDYjtTQVNELEFBQUssU0FBTCxBQUFjLEtBQWQsQUFBbUIsQUFDbkI7V0FBQSxBQUFPLEFBQ1A7QUFDRDs7OztzQ0FFa0IsQUFDbEI7UUFBSSxJQUFJLElBQVIsQUFBVSxHQUFHLElBQUUsS0FBQSxBQUFLLFNBQXBCLEFBQTZCLFFBQVEsRUFBckMsQUFBdUMsR0FBRSxBQUN4QztRQUFJLFVBQVUsS0FBQSxBQUFLLFNBQW5CLEFBQWMsQUFBYyxBQUM1QjtRQUFJLFFBQUEsQUFBUSxPQUFaLEFBQW1CLEdBQUUsQUFDcEI7VUFBQSxBQUFLLFNBQUwsQUFBYyxPQUFkLEFBQXFCLEtBQXJCLEFBQXlCLEFBQ3pCO1VBQUEsQUFBSyxBQUNMO0FBQ0Q7QUFDRDs7Ozt5QixBQUVNLFMsQUFBUyxLQUFJLEFBQ25CO09BQUksQ0FBQyxLQUFBLEFBQUssU0FBVixBQUFtQixRQUFRLEFBRTNCOztPQUFJLElBQUosQUFBUSxBQUNSO09BQUksSUFBSSxLQUFBLEFBQUssU0FBYixBQUFRLEFBQWMsQUFDdEI7T0FBQSxBQUFJLEFBQ0o7T0FBQSxBQUFJLE9BQU8sRUFBWCxBQUFhLEdBQUcsRUFBaEIsQUFBa0IsQUFDbEI7VUFBQSxBQUFPLEdBQUUsQUFDUjtRQUFBLEFBQUksY0FBYyxFQUFsQixBQUFvQixNQUFNLEVBQTFCLEFBQTRCLE1BQU0sRUFBbEMsQUFBb0MsTUFBTSxFQUExQyxBQUE0QyxNQUFNLEVBQWxELEFBQW9ELE1BQU0sRUFBMUQsQUFBNEQsQUFDNUQ7UUFBSSxLQUFBLEFBQUssU0FBUyxFQUFsQixBQUFJLEFBQWdCLEFBQ3BCO0FBQ0Q7T0FBQSxBQUFJLEFBQ0o7Ozs7eUIsQUFFTSxJLEFBQUksSSxBQUFJLElBQUcsQUFDakI7UUFBSyxLQUFMLEFBQVUsQUFDVjtRQUFLLEtBQUwsQUFBVSxBQUNWO1FBQUEsQUFBSyxTQUFMLEFBQWMsUUFBUSxVQUFBLEFBQUMsU0FBWSxBQUNsQztZQUFBLEFBQVEsS0FBUixBQUFhLEFBQ2I7WUFBQSxBQUFRLEtBQVIsQUFBYSxBQUNiO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO1lBQUEsQUFBUSxRQUFSLEFBQWdCLEFBQ2hCO0FBVEQsQUFVQTs7Ozs7OztrQixBQXZGbUI7Ozs7O0FDUnJCOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSSxPQUFPLG1CQUFTLFNBQUEsQUFBUyxlQUFsQixBQUFTLEFBQXdCLG9CQUE1Qzs7QUFHQSxDQUFDLFNBQUEsQUFBUyxpQkFBZ0IsQUFFekI7O1lBQU8sQUFBSSxRQUFRLFVBQUEsQUFBVSxTQUFWLEFBQW1CLFFBQU8sQUFFNUM7O0FBRkQsQUFBTyxBQUdQLEVBSE87QUFGUCxJQUFBLEFBTUEsS0FBSyxLQU5OLEFBQUMsQUFNVTs7QUFFWCxLQUFBLEFBQUssUUFBTCxBQUFhO0FBQ2IsS0FBQSxBQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0ksQUFFcUI7bUJBQ3BCOztpQkFBQSxBQUFZLFFBQU87d0JBQ2xCOztNQUFJLE9BRGMsQUFDbEIsQUFBVzttRkFETyxBQUVaLE1BRlksQUFFTixBQUNaOzs7Ozt5QixBQUVNLEksQUFBSSxJLEFBQUksSUFBRyxBQUNqQjtRQUFBLEFBQUssQUFDTDtRQUFBLEFBQUssQUFDTDs0RUFBQSxBQUFhLElBQWIsQUFBaUIsSUFBakIsQUFBcUIsQUFDckI7Ozs7Ozs7a0IsQUFWbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQ0ZBLHFCQUdwQjtpQkFBQSxBQUFhLE9BQWIsQUFBb0IsSUFBcEIsQUFBd0IsSUFBeEIsQUFBNEIsSUFBNUIsQUFBZ0MsSUFBaEMsQUFBb0MsY0FBYzt3QkFBQTs7T0FGbEQsQUFFa0QsWUFGdEMsQUFFc0MsQUFDakQ7O09BQUEsQUFBSyxRQUFMLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssZUFBZSxLQUFBLEFBQUssSUFBSSxlQUFULEFBQXNCLEdBQTFDLEFBQW9CLEFBQXlCLEFBRTdDOztPQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFmLEFBQW9CLGNBQWMsRUFBbEMsQUFBb0MsR0FBRSxBQUNyQztPQUFJO1dBQ0ksS0FETyxBQUNGLEFBQ1o7UUFBSSxLQUFBLEFBQUssS0FBSyxLQUFBLEFBQUssS0FGTCxBQUVVLEFBQ3hCO1FBQUksS0FIVSxBQUdMLEFBQ1Q7UUFBSSxLQUpVLEFBSUwsQUFDVDtRQUFJLEtBTEwsQUFBZSxBQUtMLEFBRVY7QUFQZSxBQUNkO1FBTUQsQUFBSyxVQUFMLEFBQWUsS0FBZixBQUFvQixBQUNwQjtBQUNEOzs7Ozs4QixBQUVXLFNBQVEsQUFDbkI7YUFBVSxVQUFWLEFBQWtCLEFBQ2xCO1VBQU8sS0FBQSxBQUFLLFVBQVUsVUFBVSxLQUFoQyxBQUFPLEFBQThCLEFBQ3JDOzs7Ozs7O2tCLEFBMUJtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsSUFBTSxRLEFBQU4sQUFBZTtBQUNmLElBQU0sUyxBQUFOLEFBQWU7O0ksQUFFTSxzQkFRcEI7OztrQkFBQSxBQUFZLFNBQVosQUFBcUIsU0FBckIsQUFBOEIsU0FBOUIsQUFBdUMsU0FBUTt3QkFBQTs7T0FOL0MsQUFNK0MsVUFOckMsQUFNcUM7T0FML0MsQUFLK0MsVUFMckMsQUFLcUM7T0FKL0MsQUFJK0MsVUFKckMsQUFJcUM7T0FIL0MsQUFHK0MsV0FIcEMsQUFHb0M7T0FGL0MsQUFFK0MsVUFGckMsQUFFcUMsQUFDOUM7O09BQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjtPQUFBLEFBQUssVUFBVSxXQUFmLEFBQTBCLEFBQzFCO09BQUEsQUFBSyxVQUFVLFVBQUEsQUFBUSxLQUFLLEtBQTVCLEFBQWlDLEFBQ2pDO09BQUEsQUFBSyxVQUFVLFVBQWYsQUFBdUIsQUFDdkI7T0FBQSxBQUFLLEFBQ0w7T0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFRLFVBQUEsQUFBQyxRQUFEO1VBQVksT0FBQSxBQUFPLEtBQUssTUFBeEIsQUFBNEI7QUFBbEQsQUFDQTs7Ozs7NkJBRVMsQUFDVDtVQUFNLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBUyxLQUF2QixBQUE0QixXQUFXLEtBQUEsQUFBSyxRQUFsRCxBQUEwRCxRQUFPLEFBQ2hFO1FBQUksU0FBUyxLQUFBLEFBQUssUUFBUyxLQUFBLEFBQUssV0FBVyxLQUFBLEFBQUssUUFBdEIsQUFBOEIsU0FBeEQsQUFBYSxBQUFtRCxBQUNoRTtRQUFJLElBQUksUUFBUSxRQUFRLEtBQXhCLEFBQXdCLEFBQUssQUFDN0I7UUFBSSxJQUFJLFNBQVMsS0FBVCxBQUFjLFVBQVUsT0FBaEMsQUFBdUMsQUFFdkM7O1FBQUksU0FBUyxxQkFBQSxBQUFXLFdBQVcsRUFBQyxHQUFELEFBQUksR0FBRyxHQUFQLEFBQVUsR0FBRyxRQUFoRCxBQUFhLEFBQXNCLEFBQXFCLEFBQ3hEO1NBQUEsQUFBSyxTQUFMLEFBQWMsS0FBZCxBQUFtQixBQUNuQjtBQUNEOzs7O3NDQUVrQixBQUNsQjtRQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFBLEFBQUssU0FBcEIsQUFBNkIsUUFBUSxFQUFyQyxBQUF1QyxHQUFFLEFBQ3hDO1FBQUksU0FBUyxLQUFBLEFBQUssU0FBbEIsQUFBYSxBQUFjLEFBQzNCO1FBQUksT0FBQSxBQUFPLElBQUksT0FBWCxBQUFrQixJQUF0QixBQUEwQixHQUFFLEFBQzNCO1VBQUEsQUFBSyxTQUFMLEFBQWMsT0FBZCxBQUFxQixLQUFyQixBQUF5QixBQUN6QjtVQUFBLEFBQUssQUFDTDtBQUNEO0FBQ0Q7Ozs7eUIsQUFFTSxTLEFBQVMsS0FBSSxBQUNuQjtRQUFBLEFBQUssU0FBTCxBQUFjLFFBQVEsVUFBQSxBQUFDLFFBQUQ7V0FBWSxPQUFBLEFBQU8sT0FBUCxBQUFjLFNBQTFCLEFBQVksQUFBdUI7QUFBekQsQUFDQTs7Ozt5QixBQUVNLEksQUFBSSxTLEFBQVMsU0FBUSxBQUczQjs7O1FBQUssS0FBSyxLQUFWLEFBQWUsQUFDZjthQUFVLFVBQVUsS0FBcEIsQUFBeUIsQUFDekI7YUFBVSxVQUFVLEtBQXBCLEFBQXlCLEFBQ3pCO1FBQUEsQUFBSyxTQUFMLEFBQWMsUUFBUSxVQUFBLEFBQUMsUUFBRDtXQUFZLE9BQUEsQUFBTyxPQUFQLEFBQWMsSUFBZCxBQUFrQixTQUE5QixBQUFZLEFBQTJCO0FBQTdELEFBRUE7O1FBQUEsQUFBSyxBQUNMOzs7Ozs7O2tCLEFBbkRtQjs7Ozs7Ozs7USxBQ2lETCxnQixBQUFBO1EsQUFZQSxPLEFBQUE7QUFwRWhCLFNBQUEsQUFBUyxNQUFLLEFBQ2I7QUFNQTs7Ozs7O1VBQUEsQUFBUyxZQUFULEFBQXNCLEdBQXRCLEFBQXlCLEdBQXpCLEFBQTRCLEdBQTVCLEFBQStCLEdBQUcsQUFDakM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7U0FBTyxFQUFFLElBQUEsQUFBRSxJQUFGLEFBQUksSUFBYixBQUFPLEFBQVUsQUFDakI7QUFFRDs7VUFBQSxBQUFTLGdCQUFULEFBQTBCLEdBQTFCLEFBQTZCLEdBQTdCLEFBQWdDLEdBQWhDLEFBQW1DLEdBQUcsQUFDckM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7TUFBSSxJQUFKLEFBQU0sQUFDTjtTQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFiLEFBQU8sQUFBVSxBQUNqQjtBQUVEOztVQUFBLEFBQVMsaUJBQVQsQUFBMkIsR0FBM0IsQUFBOEIsR0FBOUIsQUFBaUMsR0FBakMsQUFBb0MsR0FBRyxBQUN0QztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztNQUFJLElBQUosQUFBTSxBQUNOO1NBQU8sRUFBRSxDQUFBLEFBQUMsSUFBRCxBQUFHLEtBQUcsSUFBTixBQUFRLEtBQWpCLEFBQU8sQUFBZSxBQUN0QjtBQUVEOztVQUFBLEFBQVMsbUJBQVQsQUFBNkIsR0FBN0IsQUFBZ0MsR0FBaEMsQUFBbUMsR0FBbkMsQUFBc0MsR0FBRyxBQUN4QztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztPQUFLLElBQUwsQUFBTyxBQUNQO01BQUksSUFBSixBQUFRLEdBQUcsT0FBTyxFQUFFLElBQUEsQUFBRSxJQUFGLEFBQUksSUFBSixBQUFNLElBQWYsQUFBTyxBQUFZLEFBQzlCO0lBQUEsQUFBRSxBQUNGO1NBQU8sRUFBRSxDQUFBLEFBQUMsSUFBRCxBQUFHLEtBQUssS0FBRyxJQUFILEFBQUssS0FBYixBQUFrQixLQUEzQixBQUFPLEFBQXlCLEFBQ2hDO0FBRUQ7OztlQUFPLEFBQ08sQUFDYjttQkFGTSxBQUVXLEFBQ2pCO29CQUhNLEFBR1ksQUFDbEI7c0JBSkQsQUFBTyxBQUljLEFBRXJCO0FBTk8sQUFDTjs7O0FBT0ssU0FBQSxBQUFTLGdCQUFnQixBQUU1Qjs7S0FBSSxJQUFJLElBQUksSyxBQUFaLEFBQVksQUFBSyxBQUNqQjtLQUFJLElBQUksSUFBSSxLQUFaLEFBQVksQUFBSyxBQUNqQjtRQUFPLEtBQUEsQUFBSyxLQUFNLENBQUEsQUFBQyxNQUFNLEtBQUEsQUFBSyxJQUF2QixBQUFrQixBQUFVLE1BQVEsS0FBQSxBQUFLLElBQUssTUFBTSxLQUFOLEFBQVcsS0FBaEUsQUFBMkMsQUFBMEIsQUFDeEU7OztBQUVNLElBQUksb0NBQUo7QUFDQSxJQUFJLDRDQUFKO0FBQ0EsSUFBSSw4Q0FBSjtBQUNBLElBQUksa0RBQUo7O0FBRUEsU0FBQSxBQUFTLE9BQU0sQUFDckI7S0FBSSxXQUFKLEFBQWUsQUFDZjtTQVBVLEFBT1YsNEJBQWMsU0FBZCxBQUF1QixBQUN2QjtTQVBVLEFBT1Ysb0NBQWtCLFNBQWxCLEFBQTJCLEFBQzNCO1NBUFUsQUFPVixzQ0FBbUIsU0FBbkIsQUFBNEIsQUFDNUI7U0FQVSxBQU9WLDBDQUFxQixTQUFyQixBQUE4QixBQUM5QjtRQUFBLEFBQU8sQUFDUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxudmFyIGRydWlkUnVuID0gbmV3IEltYWdlKCk7XG5kcnVpZFJ1bi5zcmMgPSAnL2Fzc2V0cy9ydW4tY3ljbGUtdGVzdC5wbmcnO1xuXG52YXIgYmdfbW91bnRhaW4gPSBuZXcgSW1hZ2UoKTtcbmJnX21vdW50YWluLnNyYyA9ICcvYXNzZXRzL2JnLW1vdW50YWluLnBuZyc7XG5cbnZhciBiZ19oaWxsID0gbmV3IEltYWdlKCk7XG5iZ19oaWxsLnNyYyA9ICcvYXNzZXRzL2JnLWhpbGwucG5nJztcblxuXG4vLz09PT09IENsb3Vkcz09PT09XG52YXIgYmdfY2xvdWRfMDAgPSBuZXcgSW1hZ2UoKTtcbmJnX2Nsb3VkLnNyYyA9ICdhc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50JztcblxudmFyIGJnX2Nsb3VkXzAxID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnYXNzZXRzL2JnLWNsb3Vkcy10cmFuc3BhcmVudCc7XG5cbnZhciBiZ19jbG91ZF8wMiA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJ2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQnO1xuXG52YXIgYmdfY2xvdWRfMDMgPSBuZXcgSW1hZ2UoKTtcbmJnX2Nsb3VkLnNyYyA9ICdhc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50JztcblxudmFyIGJnX2Nsb3VkXzA0ID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnYXNzZXRzL2JnLWNsb3Vkcy10cmFuc3BhcmVudCc7XG5cbnZhciBiZ19jbG91ZF8wNSA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJ2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KSxcbiAgICBCR19NT1VOVEFJTjogbmV3IFNwcml0ZShiZ19tb3VudGFpbiwgMCwgMCwgMTUzNiwgNzY3LCAxKSxcbiAgICBCR19ISUxMOiBuZXcgU3ByaXRlKGJnX2hpbGwsIDAsIDAsIDEwMjQsIDMwNiwgMSlcbn07IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG5cdHggPSAwO1xuXHR5ID0gMDtcblx0ZHggPSAwO1xuXHRkeSA9IDA7XG5cdHcgPSAwO1xuXHRoID0gMDtcblx0c3ByaXRlID0gbnVsbDtcblx0YW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cblx0Y29uc3RydWN0b3IodHlwZSwgY29uZmlnKXtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0dGhpcy50eXBlID0gdHlwZSArICcnO1xuXHRcdHRoaXMueCA9IGNvbmZpZy54fDA7XG5cdFx0dGhpcy55ID0gY29uZmlnLnl8MDtcblx0XHR0aGlzLmR4ID0gY29uZmlnLmR4fDA7XG5cdFx0dGhpcy5keSA9IGNvbmZpZy5keXwwO1xuXHRcdHRoaXMuc3ByaXRlID0gY29uZmlnLnNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLncgPSB0aGlzLnNwcml0ZS5zd3wwO1xuXHRcdHRoaXMuaCA9IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gMDtcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm4ge307XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCBrZi5zdywga2Yuc2gpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdHRoaXMuZHggKz0gZHQgKiBkeDtcblx0XHR0aGlzLmR5ICs9IGR0ICogZHk7XG5cdFx0dGhpcy54ICArPSBkdCAqIHRoaXMuZHg7XG5cdFx0dGhpcy55ICArPSBkdCAqIHRoaXMuZHk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR3JvdW5kIGZyb20gJy4vZ3JvdW5kJztcbmltcG9ydCBUZXJyYWluIGZyb20gJy4vdGVycmFpbic7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0bGF5ZXJzID0gW107XG5cdHBsYXllciA9IHt9O1xuXHRhc3NldHMgPSB7fTtcblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNYWluIEdhbWUgTG9vcFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XG5cdGZyYW1lSWQgPSAwfDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdHRoaXMudCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLmR0ICs9IE1hdGgubWluKDEsICh0aGlzLnQgLSB0aGlzLnRwcmV2KSAvIDEwMDApO1xuXHRcdHdoaWxlKHRoaXMuZHQgPiBTVEVQKSB7XG5cdFx0XHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHRcdHRoaXMuZHQgLT0gU1RFUDtcblx0XHRcdHRoaXMudXBkYXRlKFNURVApO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBTZXR1cFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IFdJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IEhFSUdIVDtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eCAgICAgPSB0aGlzLm9mZlNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vblNjcmVlbi53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe3g6IFdJRFRILzIsIHk6SEVJR0hULzJ9KTtcblx0XHR0aGlzLnBsYXllci5zZXRBbmltYXRpb24odGhpcy5mcmFtZUlkfDAsIHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSlcblxuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC43NSwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSwgMykpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC45LCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0sIDUpKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBHcm91bmQoKSk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHRsZXQgZHggPSAtTWF0aC5sb2codGhpcy5mcmFtZUlkKSAqIDc7IC8vIFRoZSByYXRlIHRoYXQgdGhpbmdzIGFyZSBzY3JvbGxpbmcgbGVmdFxuXHRcdGxldCBkeSA9IDA7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnVwZGF0ZShkdCwgZHgsIGR5KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuY29uc3QgQkFTRV9MSU5FID0gSEVJR0hUIC0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQge1xuXG5cdHNlZ21lbnRzID0gW107XG5cblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogQkFTRV9MSU5FLFxuXHRcdFx0Y3AxeDogMCxcblx0XHRcdGNwMXk6IDAsXG5cdFx0XHRjcDJ4OiBXSURUSCxcblx0XHRcdGNwMnk6IEJBU0VfTElORSxcblx0XHRcdGVuZHg6IFdJRFRILFxuXHRcdFx0ZW5keTogQkFTRV9MSU5FXG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblxuXHRcdGxldCBsYXN0ID0gdGhpcy5zZWdtZW50c1tzZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgV0lEVEg7XG5cdFx0XHRsZXQgZW5keSA9IHkgKyBIRUlHSFQgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCB2YXJpYW5jZSA9IChXSURUSCAvIDMpICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdFx0bGV0IGNwMnggPSBlbmR4IC0gdmFyaWFuY2U7XG5cdFx0XHRsZXQgY3AyeSA9IGVuZHkgLSB2YXJpYW5jZSAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHRcdHg6IHgsXG5cdFx0XHRcdHk6IHksXG5cdFx0XHRcdGNwMXg6IGNwMXgsXG5cdFx0XHRcdGNwMXk6IGNwMXksXG5cdFx0XHRcdGNwMng6IGNwMngsXG5cdFx0XHRcdGNwMnk6IGNwMnksXG5cdFx0XHRcdGVuZHg6IGVuZHgsXG5cdFx0XHRcdGVuZHk6IGVuZHlcblx0XHRcdH07XG5cdFx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0XHRsYXN0ID0gc2VnbWVudDtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2VnbWVudHMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdFx0aWYgKHNlZ21lbnQuZW5keCA8IDApe1xuXHRcdFx0XHR0aGlzLnNlZ21lbnRzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRsZXQgaSA9IDA7XG5cdFx0bGV0IHMgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHgubW92ZVRvKHMueCwgcy55KTtcblx0XHR3aGlsZSAocyl7XG5cdFx0XHRjdHguYmV6aWVyQ3VydmVUbyhzLmNwMXgsIHMuY3AxeSwgcy5jcDJ4LCBzLmNwMnksIHMuZW5keCwgcy5lbmR5KTtcblx0XHRcdHMgPSB0aGlzLnNlZ21lbnRzWysraV07XG5cdFx0fVxuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IGR0ICogZHg7XG5cdFx0ZHkgPSBkdCAqIGR5O1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0bGV0IHR5cGUgPSAncGxheWVyJztcblx0XHRzdXBlcih0eXBlLCBjb25maWcpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdGR4ID0gMDtcblx0XHRkeSA9IDA7XG5cdFx0c3VwZXIudXBkYXRlKGR0LCBkeCwgZHkpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIHtcblxuXHRkZW5zaXR5ID0gNTtcblx0eU9mZnNldCA9IDA7XG5cdHpGYWN0b3IgPSAxOyAvLyBTaW11bGF0ZXMgZGlzdGFuY2UsIHJlZHVjaW5nIHRoZSBhcGFyZW50IG1vdmVtZW50IG9mIG9iamVjdHMgdGhhdCBhcmUgZnVydGhlciBhd2F5ICgwIGZvciBubyBtb3ZlbWVudClcblx0ZW50aXRpZXMgPSBbXTtcblx0c3ByaXRlcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKHpGYWN0b3IsIHNwcml0ZXMsIGRlbnNpdHksIHlPZmZzZXQpe1xuXHRcdHRoaXMuekZhY3RvciA9IHpGYWN0b3I7XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLmRlbnNpdHkgPSBkZW5zaXR5fDAgfHwgdGhpcy5kZW5zaXR5O1xuXHRcdHRoaXMueU9mZnNldCA9IHlPZmZzZXR8MDtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS54IC09IDEuNSpXSURUSCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXHRcdHdoaWxlKHRoaXMuZW50aXRpZXMubGVuZ3RoIDwgdGhpcy5kZW5zaXR5ICYmIHRoaXMuc3ByaXRlcy5sZW5ndGgpe1xuXHRcdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1soTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpfDBdO1xuXHRcdFx0bGV0IHggPSBXSURUSCArIFdJRFRIICogTWF0aC5yYW5kb20oKTtcblx0XHRcdGxldCB5ID0gSEVJR0hUIC0gdGhpcy55T2Zmc2V0IC0gc3ByaXRlLnNoO1xuXG5cdFx0XHRsZXQgZW50aXR5ID0gbmV3IEVudGl0eSgndGVycmFpbicsIHt4OiB4LCB5OiB5LCBzcHJpdGU6IHNwcml0ZX0pXG5cdFx0XHR0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuZW50aXRpZXMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG5cdFx0XHRpZiAoZW50aXR5LnggKyBlbnRpdHkudyA8IDApe1xuXHRcdFx0XHR0aGlzLmVudGl0aWVzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSl7XG5cblx0XHQvLyBVcGRhdGUgcG9zaXRpb25zXG5cdFx0ZHQgPSBkdCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR4ID0gc2NlbmVEeCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR5ID0gc2NlbmVEeSAqIHRoaXMuekZhY3Rvcjtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSkpXG5cblx0XHR0aGlzLmdhcmJhZ2VDb2xsZWN0aW9uKCk7XG5cdH1cbn0iLCJmdW5jdGlvbiBhc20oKXtcblx0J3VzZSBhc20nO1xuXHQvLyB0OiBjdXJyZW50IHRpbWVcblx0Ly8gYjogc3RhcnQgdmFsdWVcblx0Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdC8vIGQ6IGR1cmFpdG9uXG5cblx0ZnVuY3Rpb24gbGluZWFyVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHRyZXR1cm4gKyhjKnQvZCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluUXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKyhjKnQqdCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZU91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoLWMqdCoodC0yKSArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCAvPSBkLzI7XG5cdFx0aWYgKHQgPCAxKSByZXR1cm4gKyhjLzIqdCp0ICsgYik7XG5cdFx0LS10O1xuXHRcdHJldHVybiArKC1jLzIgKiAodCoodC0yKSAtIDEpICsgYik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxpbmVhclR3ZWVuOiBsaW5lYXJUd2Vlbixcblx0XHRlYXNlSW5RdWFkVHdlZW46IGVhc2VJblF1YWRUd2Vlbixcblx0XHRlYXNlT3V0UXVhZFR3ZWVuOiBlYXNlT3V0UXVhZFR3ZWVuLFxuXHRcdGVhc2VJbk91dFF1YWRUd2VlbjogZWFzZUluT3V0UXVhZFR3ZWVuXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbF9yYW5kb20oKSB7XG5cdC8vIFN0YW5kYXJkIE5vcm1hbCB2YXJpYXRlIHVzaW5nIEJveC1NdWxsZXIgdHJhbnNmb3JtLlxuICAgIHZhciB1ID0gMSAtIE1hdGgucmFuZG9tKCk7IC8vIFN1YnRyYWN0aW9uIHRvIGZsaXAgWzAsIDEpIHRvICgwLCAxXS5cbiAgICB2YXIgdiA9IDEgLSBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoIC0yLjAgKiBNYXRoLmxvZyggdSApICkgKiBNYXRoLmNvcyggMi4wICogTWF0aC5QSSAqIHYgKTtcbn1cblxuZXhwb3J0IHZhciBsaW5lYXJUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluUXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlT3V0UXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5PdXRRdWFkVHdlZW47XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCl7XG5cdHZhciBleHBvcnRlZCA9IGFzbSgpO1xuXHRsaW5lYXJUd2VlbiA9IGV4cG9ydGVkLmxpbmVhclR3ZWVuO1xuXHRlYXNlSW5RdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5RdWFkVHdlZW47XG5cdGVhc2VPdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlT3V0UXVhZFR3ZWVuO1xuXHRlYXNlSW5PdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5PdXRRdWFkVHdlZW47XG5cdHJldHVybiBleHBvcnRlZDtcbn07XG4iXX0=
