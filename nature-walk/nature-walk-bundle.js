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

},{"./sprite":8}],2:[function(require,module,exports){
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

},{"./sprite":8}],3:[function(require,module,exports){
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

		this.layers.push(new _sky2.default(this.assets['BG_SKY']));
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

},{"./ground":4,"./player":6,"./sky":7,"./terrain":9,"./utils":10}],4:[function(require,module,exports){
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

},{"./utils":10}],5:[function(require,module,exports){
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

var Sky = function (_Entity) {
	_inherits(Sky, _Entity);

	function Sky(sprite) {
		_classCallCheck(this, Sky);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sky).call(this, 'sky', { sprite: sprite }));

		_this.w = WIDTH;
		_this.h = HEIGHT;
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
		value: function update(dt, sceneDx, sceneDy) {
			// nop
		}
	}]);

	return Sky;
}(_entity2.default);

exports.default = Sky;

},{"./entity":2,"./sprite":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./entity":2}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2t5LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy90ZXJyYWluLmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFXLElBQWYsQUFBZSxBQUFJO0FBQ25CLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsWUFBQSxBQUFZLE1BQVosQUFBa0I7O0FBRWxCLElBQUksVUFBVSxJQUFkLEFBQWMsQUFBSTtBQUNsQixRQUFBLEFBQVEsTUFBUixBQUFjOzs7QUFJZCxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLFNBQVMsSUFBYixBQUFhLEFBQUk7QUFDakIsT0FBQSxBQUFPLE1BQVAsQUFBYTs7OztjQU1ELHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJQUY1QixBQUVILEFBQW1DLEFBQzNDO2dCQUFhLHFCQUFBLEFBQVcsYUFBWCxBQUF3QixHQUF4QixBQUEyQixHQUEzQixBQUE4QixNQUE5QixBQUFvQyxLQUh0QyxBQUdFLEFBQXlDLEFBQ3REO1lBQVMscUJBQUEsQUFBVyxTQUFYLEFBQW9CLEdBQXBCLEFBQXVCLEdBQXZCLEFBQTBCLE1BQTFCLEFBQWdDLEtBSjlCLEFBSUYsQUFBcUMsQUFDOUM7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLEtBQTNCLEFBQWdDLElBTGxDLEFBS0UsQUFBb0MsQUFDakQ7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLElBQXhCLEFBQTRCLEtBQTVCLEFBQWlDLElBTm5DLEFBTUUsQUFBcUMsQUFDbEQ7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEtBQXJCLEFBQTBCLEdBQTFCLEFBQTZCLEtBQTdCLEFBQWtDLElBUHBDLEFBT0UsQUFBc0MsQUFDbkQ7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEtBQXJCLEFBQTBCLElBQTFCLEFBQThCLEtBQTlCLEFBQW1DLElBUnJDLEFBUUUsQUFBdUMsQUFDcEQ7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEtBQXhCLEFBQTZCLEtBQTdCLEFBQWtDLElBVHBDLEFBU0UsQUFBc0MsQUFDbkQ7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEtBQXhCLEFBQTZCLEtBQTdCLEFBQWtDLElBVnBDLEFBVUUsQUFBc0MsQUFDbkQ7V0FBUSxxQkFBQSxBQUFXLFFBQVgsQUFBbUIsR0FBbkIsQUFBc0IsR0FBdEIsQUFBeUIsR0FBekIsQUFBNEIsRyxBQVh6QixBQVdILEFBQStCOztBQVg1QixBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJEOzs7Ozs7Ozs7Ozs7OztJLEFBRXFCLHFCQVVwQjtpQkFBQSxBQUFZLE1BQVosQUFBa0IsUUFBTzt3QkFBQTs7T0FUekIsQUFTeUIsSUFUckIsQUFTcUI7T0FSekIsQUFReUIsSUFSckIsQUFRcUI7T0FQekIsQUFPeUIsS0FQcEIsQUFPb0I7T0FOekIsQUFNeUIsS0FOcEIsQUFNb0I7T0FMekIsQUFLeUIsSUFMckIsQUFLcUI7T0FKekIsQUFJeUIsSUFKckIsQUFJcUI7T0FIekIsQUFHeUIsU0FIaEIsQUFHZ0I7T0FGekIsQUFFeUIsbUJBRk4sQUFFTSxBQUN4Qjs7V0FBUyxVQUFULEFBQW1CLEFBQ25CO09BQUEsQUFBSyxPQUFPLE9BQVosQUFBbUIsQUFDbkI7T0FBQSxBQUFLLElBQUksT0FBQSxBQUFPLElBQWhCLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxJQUFJLE9BQUEsQUFBTyxJQUFoQixBQUFrQixBQUNsQjtPQUFBLEFBQUssS0FBSyxPQUFBLEFBQU8sS0FBakIsQUFBb0IsQUFDcEI7T0FBQSxBQUFLLEtBQUssT0FBQSxBQUFPLEtBQWpCLEFBQW9CLEFBQ3BCO09BQUEsQUFBSyxTQUFTLE9BQUEsQUFBTyxVQUFyQixBQUErQixBQUMvQjtPQUFBLEFBQUssSUFBSSxLQUFBLEFBQUssT0FBTCxBQUFZLEtBQXJCLEFBQXdCLEFBQ3hCO09BQUEsQUFBSyxJQUFJLEtBQUEsQUFBSyxPQUFMLEFBQVksS0FBckIsQUFBd0IsQUFDeEI7T0FBQSxBQUFLLG1CQUFMLEFBQXdCLEFBQ3hCOzs7OzsrQixBQUVZLFMsQUFBUyxRQUFPLEFBQzVCO1FBQUEsQUFBSyxTQUFTLFVBQWQsQUFBd0IsQUFDeEI7UUFBQSxBQUFLLG1CQUFtQixVQUF4QixBQUFnQyxBQUNoQzs7Ozs4QixBQUVXLFNBQVEsQUFDbkI7T0FBSSxDQUFDLEtBQUQsQUFBTSxVQUFVLENBQUMsS0FBQSxBQUFLLE9BQTFCLEFBQWlDLGFBQWEsT0FBQSxBQUFPLEFBRXJEOztVQUFPLEtBQUEsQUFBSyxPQUFMLEFBQVksWUFBWSxVQUFVLEtBQXpDLEFBQU8sQUFBdUMsQUFDOUM7Ozs7eUIsQUFFTSxTLEFBQVMsS0FBSSxBQUNuQjtPQUFJLEtBQUssS0FBQSxBQUFLLFlBQWQsQUFBUyxBQUFpQixBQUMxQjtPQUFJLENBQUEsQUFBQyxNQUFNLENBQUMsR0FBWixBQUFlLE9BQU8sQUFDdEI7T0FBQSxBQUFJLFVBQVUsR0FBZCxBQUFpQixPQUFPLEdBQXhCLEFBQTJCLElBQUksR0FBL0IsQUFBa0MsSUFBSSxHQUF0QyxBQUF5QyxJQUFJLEdBQTdDLEFBQWdELElBQUksS0FBcEQsQUFBeUQsR0FBRyxLQUE1RCxBQUFpRSxHQUFHLEdBQXBFLEFBQXVFLElBQUksR0FBM0UsQUFBOEUsQUFDOUU7Ozs7eUIsQUFFTSxJLEFBQUksSSxBQUFJLElBQUcsQUFDakI7UUFBQSxBQUFLLE1BQU0sS0FBWCxBQUFnQixBQUNoQjtRQUFBLEFBQUssTUFBTSxLQUFYLEFBQWdCLEFBQ2hCO1FBQUEsQUFBSyxLQUFNLEtBQUssS0FBaEIsQUFBcUIsQUFDckI7UUFBQSxBQUFLLEtBQU0sS0FBSyxLQUFoQixBQUFxQixBQUNyQjs7Ozs7OztrQixBQTdDbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGckI7O0ksQUFBWTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFBLEFBQU07OztBQUdOLElBQU0sTUFBTixBQUFhO0FBQ2IsSUFBTSxPQUFPLElBQWIsQUFBZTtBQUNmLElBQU0sUSxBQUFOLEFBQWU7QUFDZixJQUFNLFMsQUFBTixBQUFlO0FBQ2YsSUFBTSxRQUFTLFNBQWYsQUFBd0I7QUFDeEIsSUFBTSxZQUFZLFNBQWxCLEFBQTJCO0FBQzNCLElBQU0sY0FBYyxRQUFwQixBQUE0Qjs7SSxBQUV0Qjs7Ozs7Ozs7MEJBd0JHLEFBQ1A7UUFBQSxBQUFLLElBQUksT0FBQSxBQUFPLFlBQWhCLEFBQVMsQUFBbUIsQUFDNUI7UUFBQSxBQUFLLE1BQU0sS0FBQSxBQUFLLElBQUwsQUFBUyxHQUFHLENBQUMsS0FBQSxBQUFLLElBQUksS0FBVixBQUFlLFNBQXRDLEFBQVcsQUFBb0MsQUFDL0M7VUFBTSxLQUFBLEFBQUssS0FBWCxBQUFnQixNQUFNLEFBQ3JCO1NBQUEsQUFBSyxVQUFXLEtBQUEsQUFBSyxVQUFOLEFBQWdCLElBQS9CLEFBQWtDLEFBQ2xDO1NBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWDtTQUFBLEFBQUssT0FBTCxBQUFZLEFBQ1o7QUFDRDtRQUFBLEFBQUssUUFBUSxLQUFiLEFBQWtCLEFBQ2xCO1FBQUEsQUFBSyxBQUVMOztPQUFJLEtBQUosQUFBUyxRQUFRLEFBQ2pCO3lCQUFzQixLQUFBLEFBQUssTUFBTCxBQUFXLEtBQWpDLEFBQXNCLEFBQWdCLE9BQU8sS0FBN0MsQUFBa0QsQUFDbEQ7QUFPRDs7Ozs7Ozs7ZUFBQSxBQUFZLFFBQVosQUFBb0IsUUFBTzt3QkFBQTs7T0EzQzNCLEFBMkMyQixZQTNDZixBQTJDZTtPQTFDM0IsQUEwQzJCLFNBMUNsQixBQTBDa0I7T0F6QzNCLEFBeUMyQixRQXpDbEIsQUF5Q2tCO09BdkMzQixBQXVDMkIsV0F2Q2YsQUF1Q2U7T0F0QzNCLEFBc0MyQixZQXRDZixBQXNDZTtPQXJDM0IsQUFxQzJCLGNBckNaLEFBcUNZO09BcEMzQixBQW9DMkIsZUFwQ1osQUFvQ1k7T0FsQzNCLEFBa0MyQixTQWxDbEIsQUFrQ2tCO09BakMzQixBQWlDMkIsU0FqQ2xCLEFBaUNrQjtPQWhDM0IsQUFnQzJCLFNBaENsQixBQWdDa0I7T0F6QjNCLEFBeUIyQixVQXpCakIsSUFBRSxBQXlCZTtPQXhCM0IsQUF3QjJCLFFBeEJuQixPQUFBLEFBQU8sWUFBUCxBQUFtQixBQXdCQTtPQXZCM0IsQUF1QjJCLElBdkJ2QixLQUFLLEFBdUJrQjtPQXRCM0IsQUFzQjJCLEtBdEJ0QixBQXNCc0IsQUFDMUI7O09BQUEsQUFBSyxXQUFMLEFBQWlCLEFBQ2pCO09BQUEsQUFBSyxZQUFZLFNBQUEsQUFBUyxjQUExQixBQUFpQixBQUF1QixBQUV4Qzs7T0FBQSxBQUFLLFVBQUwsQUFBZSxRQUFmLEFBQXdCLEFBQ3hCO09BQUEsQUFBSyxVQUFMLEFBQWUsU0FBZixBQUF3QixBQUN4QjtPQUFBLEFBQUssZUFBbUIsS0FBQSxBQUFLLFVBQUwsQUFBZSxXQUF2QyxBQUF3QixBQUEwQixBQUNsRDtPQUFBLEFBQUssYUFBTCxBQUFrQix3QkFBbEIsQUFBMEMsQUFFMUM7O09BQUEsQUFBSyxTQUFMLEFBQWMsUUFBUyxPQUF2QixBQUE4QixBQUM5QjtPQUFBLEFBQUssU0FBTCxBQUFjLFNBQVMsS0FBQSxBQUFLLElBQUksT0FBVCxBQUFnQixhQUFhLFFBQVEsT0FBNUQsQUFBdUIsQUFBNEMsQUFDbkU7T0FBQSxBQUFLLGNBQWtCLEtBQUEsQUFBSyxTQUFMLEFBQWMsV0FBckMsQUFBdUIsQUFBeUIsQUFDaEQ7T0FBQSxBQUFLLFlBQUwsQUFBaUIsd0JBQWpCLEFBQTBDLEFBRTFDOztPQUFBLEFBQUssU0FBTCxBQUFjLEFBQ2Q7T0FBQSxBQUFLLFNBQVMscUJBQVcsRUFBQyxHQUFELEFBQUksYUFBYSxHQUExQyxBQUFjLEFBQVcsQUFBbUIsQUFDNUM7T0FBQSxBQUFLLE9BQUwsQUFBWSxhQUFhLEtBQUEsQUFBSyxVQUE5QixBQUFzQyxHQUFHLEtBQUEsQUFBSyxPQUE5QyxBQUF5QyxBQUFZLEFBRXJEOztPQUFBLEFBQUssT0FBTCxBQUFZLEtBQUssa0JBQVEsS0FBQSxBQUFLLE9BQTlCLEFBQWlCLEFBQVEsQUFBWSxBQUNyQztPQUFBLEFBQUssT0FBTCxBQUFZLEtBQUssc0JBQUEsQUFBWSxLQUFLLENBQUMsS0FBQSxBQUFLLE9BQXZCLEFBQWlCLEFBQUMsQUFBWSxpQkFBL0MsQUFBaUIsQUFBK0MsQUFDaEU7T0FBQSxBQUFLLE9BQUwsQUFBWSxLQUFLLHNCQUFBLEFBQVksTUFBTSxDQUFDLEtBQUEsQUFBSyxPQUF4QixBQUFrQixBQUFDLEFBQVksYUFBaEQsQUFBaUIsQUFBNEMsQUFDN0Q7T0FBQSxBQUFLLE9BQUwsQUFBWSxLQUFLLEtBQWpCLEFBQXNCLEFBQ3RCO09BQUEsQUFBSyxPQUFMLEFBQVksS0FBSyxhQUFqQixBQUNBOzs7OzswQkFFTyxBQUVQOztRQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2Y7eUJBQXNCLEtBQUEsQUFBSyxNQUFMLEFBQVcsS0FBakMsQUFBc0IsQUFBZ0IsT0FBTyxLQUE3QyxBQUFrRCxBQUNsRDs7Ozs7Ozs7O3lCLEFBVU0sSUFBSSxBQUNWO09BQUksS0FBSyxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQVYsQUFBQyxBQUFjLFcsQUFBeEIsQUFBbUMsQUFDbkM7T0FBSSxLQUFKLEFBQVMsQUFDVDtRQUFBLEFBQUssT0FBTCxBQUFZLFFBQVEsVUFBQSxBQUFDLE9BQUQ7V0FBVyxNQUFBLEFBQU0sT0FBTixBQUFhLElBQWIsQUFBaUIsSUFBNUIsQUFBVyxBQUFxQjtBQUFwRCxBQUNBOzs7Ozs7Ozs7MkJBT1EsQUFDUjtPQUFJLE1BQU0sS0FBVixBQUFlLEFBQ2Y7T0FBSSxNQUFNLEtBQVYsQUFBZSxBQUVmOztPQUFJLFFBQVEsS0FBQSxBQUFLLElBQ2hCLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBTyxJQURWLEFBQ2MsUUFDekIsS0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFNLElBRnJCLEFBQVksQUFFYSxBQUV6QjtPQUFJLElBQUksSUFBQSxBQUFJLFFBQVosQUFBb0IsQUFDcEI7T0FBSSxJQUFJLElBQUEsQUFBSSxTQUFaLEFBQXFCLEFBQ3JCO09BQUksSUFBSixBQUFRLEFBQ1I7T0FBSSxJQUFJLENBQUMsS0FBQSxBQUFLLFVBQUwsQUFBZSxTQUFoQixBQUF5QixLQUFqQyxBQUFzQyxBQUV0Qzs7T0FBQSxBQUFJLFVBQUosQUFBYyxHQUFkLEFBQWlCLEdBQUcsSUFBcEIsQUFBd0IsT0FBTyxJQUEvQixBQUFtQyxBQUVuQzs7UUFBQSxBQUFLLEFBR0w7O09BQUksS0FBSixBQUFTLE9BQU8sQUFDZjtRQUFBLEFBQUksWUFBSixBQUFnQixBQUNoQjtRQUFBLEFBQUksU0FBSixBQUFhLEdBQWIsQUFBZ0IsR0FBaEIsQUFBbUIsS0FBSyxJQUF4QixBQUE0QixBQUM1QjtRQUFBLEFBQUksWUFBSixBQUFnQixBQUNoQjtRQUFJLFdBQUosQUFBZSxBQUNmO1FBQUksYUFBYSxXQUFqQixBQUE0QixBQUM1QjtRQUFJLFVBQUosQUFBYyxBQUNkO1FBQUEsQUFBSSxPQUFPLFdBQVgsQUFBc0IsQUFDdEI7UUFBQSxBQUFJLFNBQVMsY0FBYyxLQUEzQixBQUFnQyxTQUFoQyxBQUF5QyxHQUFHLFdBQTVDLEFBQXVELEFBQ3ZEO0FBRUQ7O1FBQUEsQUFBSyxZQUFMLEFBQWlCLFVBQWpCLEFBQTJCLEdBQTNCLEFBQThCLEdBQUcsS0FBQSxBQUFLLFNBQXRDLEFBQStDLE9BQU8sS0FBQSxBQUFLLFNBQTNELEFBQW9FLFFBQVEsQUFDNUU7UUFBQSxBQUFLLFlBQUwsQUFBaUIsVUFBakIsQUFDQyxLQURELEFBRUMsR0FGRCxBQUVJLEdBRkosQUFFTyxHQUZQLEFBRVUsR0FGVixBQUdDLEdBSEQsQUFHSSxHQUFHLEtBQUEsQUFBSyxTQUhaLEFBR3FCLE9BQU8sS0FBQSxBQUFLLFNBSGpDLEFBRzBDLEFBRTFDOzs7O2lDQUVhO2VBQ2I7O1FBQUEsQUFBSyxPQUFMLEFBQVksUUFBUSxVQUFBLEFBQUMsT0FBRDtXQUFXLE1BQUEsQUFBTSxPQUFPLE1BQWIsQUFBa0IsU0FBUyxNQUF0QyxBQUFXLEFBQWdDO0FBQS9ELEFBQ0E7Ozs7Ozs7a0IsQUFLYTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNKZjs7Ozs7Ozs7O0FBR0EsSUFBTSxRLEFBQU4sQUFBZTtBQUNmLElBQU0sUyxBQUFOLEFBQWU7QUFDZixJQUFNLFlBQVksU0FBbEIsQUFBMkI7O0ksQUFFTixxQkFLcEI7bUJBQWE7d0JBQUE7O09BSGIsQUFHYSxXQUhGLEFBR0UsQUFDWjs7TUFBSTtNQUFVLEFBQ1YsQUFDSDtNQUZhLEFBRVYsQUFDSDtTQUhhLEFBR1AsQUFDTjtTQUphLEFBSVAsQUFDTjtTQUFNLFFBTE8sQUFLQyxBQUNkO1NBTmEsQUFNUCxBQUNOO1NBUGEsQUFPUCxBQUNOO1NBUkQsQUFBYyxBQVFQLEFBRVA7QUFWYyxBQUNiO09BU0QsQUFBSyxTQUFMLEFBQWMsS0FBZCxBQUFtQixBQUNuQjtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7T0FBQSxBQUFLLEFBQ0w7Ozs7OzZCQUVTLEFBRVQ7O09BQUksT0FBTyxLQUFBLEFBQUssU0FBUyxLQUFBLEFBQUssU0FBTCxBQUFjLFNBQXZDLEFBQVcsQUFBbUMsQUFDOUM7VUFBTyxLQUFBLEFBQUssU0FBTCxBQUFjLFNBQXJCLEFBQThCLEdBQUUsQUFDL0I7UUFBSSxJQUFJLEtBQVIsQUFBYSxBQUNiO1FBQUksSUFBSSxLQUFSLEFBQWEsQUFDYjtRQUFJLE9BQU8sS0FBSyxJQUFJLEtBQXBCLEFBQVcsQUFBYyxBQUN6QjtRQUFJLE9BQU8sS0FBSyxJQUFJLEtBQXBCLEFBQVcsQUFBYyxBQUN6QjtRQUFJLE9BQU8sSUFBWCxBQUFlLEFBQ2Y7UUFBSSxPQUFPLElBQUksU0FBUyxXQUF4QixBQUVBOztRQUFJLFdBQVksUUFBRCxBQUFTLElBQU0sUUFBRCxBQUFTLElBQUssV0FBM0MsQUFDQTtRQUFJLE9BQU8sT0FBWCxBQUFrQixBQUNsQjtRQUFJLE9BQU8sT0FBTyxXQUFXLFdBQTdCLEFBRUE7O1FBQUk7UUFBVSxBQUNWLEFBQ0g7UUFGYSxBQUVWLEFBQ0g7V0FIYSxBQUdQLEFBQ047V0FKYSxBQUlQLEFBQ047V0FMYSxBQUtQLEFBQ047V0FOYSxBQU1QLEFBQ047V0FQYSxBQU9QLEFBQ047V0FSRCxBQUFjLEFBUVAsQUFFUDtBQVZjLEFBQ2I7U0FTRCxBQUFLLFNBQUwsQUFBYyxLQUFkLEFBQW1CLEFBQ25CO1dBQUEsQUFBTyxBQUNQO1lBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQUNEOzs7O3NDQUVrQixBQUNsQjtRQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFBLEFBQUssU0FBcEIsQUFBNkIsUUFBUSxFQUFyQyxBQUF1QyxHQUFFLEFBQ3hDO1FBQUksVUFBVSxLQUFBLEFBQUssU0FBbkIsQUFBYyxBQUFjLEFBQzVCO1FBQUksUUFBQSxBQUFRLE9BQVosQUFBbUIsR0FBRSxBQUNwQjtVQUFBLEFBQUssU0FBTCxBQUFjLE9BQWQsQUFBcUIsS0FBckIsQUFBeUIsQUFDekI7VUFBQSxBQUFLLEFBQ0w7QUFDRDtBQUNEOzs7O3lCLEFBRU0sUyxBQUFTLEtBQUksQUFDbkI7T0FBSSxDQUFDLEtBQUEsQUFBSyxTQUFWLEFBQW1CLFFBQVEsQUFFM0I7O09BQUksSUFBSixBQUFRLEFBQ1I7T0FBSSxJQUFJLEtBQUEsQUFBSyxTQUFiLEFBQVEsQUFBYyxBQUN0QjtPQUFBLEFBQUksQUFDSjtPQUFBLEFBQUksT0FBTyxFQUFYLEFBQWEsR0FBRyxFQUFoQixBQUFrQixBQUNsQjtVQUFBLEFBQU8sR0FBRSxBQUNSO1FBQUEsQUFBSSxjQUFjLEVBQWxCLEFBQW9CLE1BQU0sRUFBMUIsQUFBNEIsTUFBTSxFQUFsQyxBQUFvQyxNQUFNLEVBQTFDLEFBQTRDLE1BQU0sRUFBbEQsQUFBb0QsTUFBTSxFQUExRCxBQUE0RCxBQUM1RDtRQUFJLEtBQUEsQUFBSyxTQUFTLEVBQWxCLEFBQUksQUFBZ0IsQUFDcEI7QUFDRDtPQUFBLEFBQUksQUFDSjs7Ozt5QixBQUVNLEksQUFBSSxJLEFBQUksSUFBRyxBQUNqQjtRQUFLLEtBQUwsQUFBVSxBQUNWO1FBQUssS0FBTCxBQUFVLEFBQ1Y7UUFBQSxBQUFLLFNBQUwsQUFBYyxRQUFRLFVBQUEsQUFBQyxTQUFZLEFBQ2xDO1lBQUEsQUFBUSxLQUFSLEFBQWEsQUFDYjtZQUFBLEFBQVEsS0FBUixBQUFhLEFBQ2I7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7WUFBQSxBQUFRLFFBQVIsQUFBZ0IsQUFDaEI7QUFURCxBQVVBOzs7Ozs7O2tCLEFBekZtQjs7Ozs7QUNQckI7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLE9BQU8sbUJBQVMsU0FBQSxBQUFTLGVBQWxCLEFBQVMsQUFBd0Isb0JBQTVDOztBQUdBLENBQUMsU0FBQSxBQUFTLGlCQUFnQixBQUV6Qjs7WUFBTyxBQUFJLFFBQVEsVUFBQSxBQUFVLFNBQVYsQUFBbUIsUUFBTyxBQUU1Qzs7QUFGRCxBQUFPLEFBR1AsRUFITztBQUZQLElBQUEsQUFNQSxLQUFLLEtBTk4sQUFBQyxBQU1VOztBQUVYLEtBQUEsQUFBSyxRQUFMLEFBQWE7QUFDYixLQUFBLEFBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFVBQVUsQ0FBaEIsQUFBaUI7O0ksQUFFSTttQkFDcEI7O2lCQUFBLEFBQVksUUFBTzt3QkFDbEI7O01BQUksT0FEYyxBQUNsQixBQUFXO21GQURPLEFBRVosTUFGWSxBQUVOLEFBQ1o7Ozs7O3lCLEFBRU0sSSxBQUFJLEksQUFBSSxJQUFHLEFBQ2pCO1FBQUEsQUFBSyxBQUNMO1FBQUEsQUFBSyxBQUNMOzRFQUFBLEFBQWEsSUFBYixBQUFpQixJQUFqQixBQUFxQixBQUNyQjs7Ozs7OztrQixBQVZtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sUSxBQUFOLEFBQWU7QUFDZixJQUFNLFMsQUFBTixBQUFlOztJLEFBRU07Z0JBRXBCOztjQUFBLEFBQVksUUFBTzt3QkFBQTs7cUZBQUEsQUFDWixPQUFPLEVBQUMsUUFESSxBQUNMLEFBQVMsQUFDdEI7O1FBQUEsQUFBSyxJQUFMLEFBQVMsQUFDVDtRQUFBLEFBQUssSUFIYSxBQUdsQixBQUFTO1NBQ1Q7Ozs7O3lCLEFBRU0sUyxBQUFTLEtBQUksQUFDbkI7T0FBSSxLQUFLLEtBQUEsQUFBSyxZQUFkLEFBQVMsQUFBaUIsQUFDMUI7T0FBSSxDQUFBLEFBQUMsTUFBTSxDQUFDLEdBQVosQUFBZSxPQUFPLEFBQ3RCO09BQUEsQUFBSSxVQUFVLEdBQWQsQUFBaUIsT0FBTyxHQUF4QixBQUEyQixJQUFJLEdBQS9CLEFBQWtDLElBQUksR0FBdEMsQUFBeUMsSUFBSSxHQUE3QyxBQUFnRCxJQUFJLEtBQXBELEFBQXlELEdBQUcsS0FBNUQsQUFBaUUsR0FBRyxLQUFwRSxBQUF5RSxHQUFHLEtBQTVFLEFBQWlGLEFBQ2pGOzs7O3lCLEFBRU0sSSxBQUFJLFMsQUFBUyxTQUFRLEFBRTNCOzs7Ozs7OztrQixBQWhCbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQ1JBLHFCQUdwQjtpQkFBQSxBQUFhLE9BQWIsQUFBb0IsSUFBcEIsQUFBd0IsSUFBeEIsQUFBNEIsSUFBNUIsQUFBZ0MsSUFBaEMsQUFBb0MsY0FBYzt3QkFBQTs7T0FGbEQsQUFFa0QsWUFGdEMsQUFFc0MsQUFDakQ7O09BQUEsQUFBSyxRQUFMLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssZUFBZSxLQUFBLEFBQUssSUFBSSxlQUFULEFBQXNCLEdBQTFDLEFBQW9CLEFBQXlCLEFBRTdDOztPQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFmLEFBQW9CLGNBQWMsRUFBbEMsQUFBb0MsR0FBRSxBQUNyQztPQUFJO1dBQ0ksS0FETyxBQUNGLEFBQ1o7UUFBSSxLQUFBLEFBQUssS0FBSyxLQUFBLEFBQUssS0FGTCxBQUVVLEFBQ3hCO1FBQUksS0FIVSxBQUdMLEFBQ1Q7UUFBSSxLQUpVLEFBSUwsQUFDVDtRQUFJLEtBTEwsQUFBZSxBQUtMLEFBRVY7QUFQZSxBQUNkO1FBTUQsQUFBSyxVQUFMLEFBQWUsS0FBZixBQUFvQixBQUNwQjtBQUNEOzs7Ozs4QixBQUVXLFNBQVEsQUFDbkI7YUFBVSxVQUFWLEFBQWtCLEFBQ2xCO1VBQU8sS0FBQSxBQUFLLFVBQVUsVUFBVSxLQUFoQyxBQUFPLEFBQThCLEFBQ3JDOzs7Ozs7O2tCLEFBMUJtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsSUFBTSxRLEFBQU4sQUFBZTtBQUNmLElBQU0sUyxBQUFOLEFBQWU7O0ksQUFFTSxzQkFRcEI7OztrQkFBQSxBQUFZLFNBQVosQUFBcUIsU0FBckIsQUFBOEIsU0FBOUIsQUFBdUMsU0FBUTt3QkFBQTs7T0FOL0MsQUFNK0MsVUFOckMsQUFNcUM7T0FML0MsQUFLK0MsVUFMckMsQUFLcUM7T0FKL0MsQUFJK0MsVUFKckMsQUFJcUM7T0FIL0MsQUFHK0MsV0FIcEMsQUFHb0M7T0FGL0MsQUFFK0MsVUFGckMsQUFFcUMsQUFDOUM7O09BQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjtPQUFBLEFBQUssVUFBVSxXQUFmLEFBQTBCLEFBQzFCO09BQUEsQUFBSyxVQUFVLFVBQUEsQUFBUSxLQUFLLEtBQTVCLEFBQWlDLEFBQ2pDO09BQUEsQUFBSyxVQUFVLFVBQWYsQUFBdUIsQUFDdkI7T0FBQSxBQUFLLEFBQ0w7T0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFRLFVBQUEsQUFBQyxRQUFEO1VBQVksT0FBQSxBQUFPLEtBQUssTUFBeEIsQUFBNEI7QUFBbEQsQUFDQTs7Ozs7NkJBRVMsQUFDVDtVQUFNLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBUyxLQUF2QixBQUE0QixXQUFXLEtBQUEsQUFBSyxRQUFsRCxBQUEwRCxRQUFPLEFBQ2hFO1FBQUksU0FBUyxLQUFBLEFBQUssUUFBUyxLQUFBLEFBQUssV0FBVyxLQUFBLEFBQUssUUFBdEIsQUFBOEIsU0FBeEQsQUFBYSxBQUFtRCxBQUNoRTtRQUFJLElBQUksUUFBUSxRQUFRLEtBQXhCLEFBQXdCLEFBQUssQUFDN0I7UUFBSSxJQUFJLFNBQVMsS0FBVCxBQUFjLFVBQVUsT0FBaEMsQUFBdUMsQUFFdkM7O1FBQUksU0FBUyxxQkFBQSxBQUFXLFdBQVcsRUFBQyxHQUFELEFBQUksR0FBRyxHQUFQLEFBQVUsR0FBRyxRQUFoRCxBQUFhLEFBQXNCLEFBQXFCLEFBQ3hEO1NBQUEsQUFBSyxTQUFMLEFBQWMsS0FBZCxBQUFtQixBQUNuQjtBQUNEOzs7O3NDQUVrQixBQUNsQjtRQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFBLEFBQUssU0FBcEIsQUFBNkIsUUFBUSxFQUFyQyxBQUF1QyxHQUFFLEFBQ3hDO1FBQUksU0FBUyxLQUFBLEFBQUssU0FBbEIsQUFBYSxBQUFjLEFBQzNCO1FBQUksT0FBQSxBQUFPLElBQUksT0FBWCxBQUFrQixJQUF0QixBQUEwQixHQUFFLEFBQzNCO1VBQUEsQUFBSyxTQUFMLEFBQWMsT0FBZCxBQUFxQixLQUFyQixBQUF5QixBQUN6QjtVQUFBLEFBQUssQUFDTDtBQUNEO0FBQ0Q7Ozs7eUIsQUFFTSxTLEFBQVMsS0FBSSxBQUNuQjtRQUFBLEFBQUssU0FBTCxBQUFjLFFBQVEsVUFBQSxBQUFDLFFBQUQ7V0FBWSxPQUFBLEFBQU8sT0FBUCxBQUFjLFNBQTFCLEFBQVksQUFBdUI7QUFBekQsQUFDQTs7Ozt5QixBQUVNLEksQUFBSSxTLEFBQVMsU0FBUSxBQUczQjs7O1FBQUssS0FBSyxLQUFWLEFBQWUsQUFDZjthQUFVLEtBQVYsQUFBZSxBQUNmO2FBQVUsS0FBVixBQUFlLEFBQ2Y7UUFBQSxBQUFLLFNBQUwsQUFBYyxRQUFRLFVBQUEsQUFBQyxRQUFEO1dBQVksT0FBQSxBQUFPLE9BQVAsQUFBYyxJQUFkLEFBQWtCLFNBQTlCLEFBQVksQUFBMkI7QUFBN0QsQUFFQTs7UUFBQSxBQUFLLEFBQ0w7Ozs7Ozs7a0IsQUFuRG1COzs7Ozs7OztRLEFDaURMLGdCLEFBQUE7USxBQVlBLE8sQUFBQTtBQXBFaEIsU0FBQSxBQUFTLE1BQUssQUFDYjtBQU1BOzs7Ozs7VUFBQSxBQUFTLFlBQVQsQUFBc0IsR0FBdEIsQUFBeUIsR0FBekIsQUFBNEIsR0FBNUIsQUFBK0IsR0FBRyxBQUNqQztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztTQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFiLEFBQU8sQUFBVSxBQUNqQjtBQUVEOztVQUFBLEFBQVMsZ0JBQVQsQUFBMEIsR0FBMUIsQUFBNkIsR0FBN0IsQUFBZ0MsR0FBaEMsQUFBbUMsR0FBRyxBQUNyQztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztNQUFJLElBQUosQUFBTSxBQUNOO1NBQU8sRUFBRSxJQUFBLEFBQUUsSUFBRixBQUFJLElBQWIsQUFBTyxBQUFVLEFBQ2pCO0FBRUQ7O1VBQUEsQUFBUyxpQkFBVCxBQUEyQixHQUEzQixBQUE4QixHQUE5QixBQUFpQyxHQUFqQyxBQUFvQyxHQUFHLEFBQ3RDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O01BQUksSUFBSixBQUFNLEFBQ047U0FBTyxFQUFFLENBQUEsQUFBQyxJQUFELEFBQUcsS0FBRyxJQUFOLEFBQVEsS0FBakIsQUFBTyxBQUFlLEFBQ3RCO0FBRUQ7O1VBQUEsQUFBUyxtQkFBVCxBQUE2QixHQUE3QixBQUFnQyxHQUFoQyxBQUFtQyxHQUFuQyxBQUFzQyxHQUFHLEFBQ3hDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O09BQUssSUFBTCxBQUFPLEFBQ1A7TUFBSSxJQUFKLEFBQVEsR0FBRyxPQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFKLEFBQU0sSUFBZixBQUFPLEFBQVksQUFDOUI7SUFBQSxBQUFFLEFBQ0Y7U0FBTyxFQUFFLENBQUEsQUFBQyxJQUFELEFBQUcsS0FBSyxLQUFHLElBQUgsQUFBSyxLQUFiLEFBQWtCLEtBQTNCLEFBQU8sQUFBeUIsQUFDaEM7QUFFRDs7O2VBQU8sQUFDTyxBQUNiO21CQUZNLEFBRVcsQUFDakI7b0JBSE0sQUFHWSxBQUNsQjtzQkFKRCxBQUFPLEFBSWMsQUFFckI7QUFOTyxBQUNOOzs7QUFPSyxTQUFBLEFBQVMsZ0JBQWdCLEFBRTVCOztLQUFJLElBQUksSUFBSSxLLEFBQVosQUFBWSxBQUFLLEFBQ2pCO0tBQUksSUFBSSxJQUFJLEtBQVosQUFBWSxBQUFLLEFBQ2pCO1FBQU8sS0FBQSxBQUFLLEtBQU0sQ0FBQSxBQUFDLE1BQU0sS0FBQSxBQUFLLElBQXZCLEFBQWtCLEFBQVUsTUFBUSxLQUFBLEFBQUssSUFBSyxNQUFNLEtBQU4sQUFBVyxLQUFoRSxBQUEyQyxBQUEwQixBQUN4RTs7O0FBRU0sSUFBSSxvQ0FBSjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFQSxTQUFBLEFBQVMsT0FBTSxBQUNyQjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbi8vPT09PT0gQ2xvdWRzPT09PT1cbnZhciBiZ19jbG91ZCA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJy9hc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50LnBuZyc7XG5cbnZhciBiZ19za3kgPSBuZXcgSW1hZ2UoKTtcbmJnX3NreS5zcmMgPSAnL2Fzc2V0cy9iZy1za3kucG5nJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpLFxuICAgIEJHX0NMT1VEXzAwOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAwLCAyMTYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgNDgsIDIxNiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzAyOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDAsIDI4NiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAzOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDQ4LCAyODYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wNDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTEyLCA1MDIsIDcyLCAxKSxcbiAgICBCR19DTE9VRF8wNTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTg0LCA1MDIsIDcyLCAxKSxcbiAgICBCR19TS1k6IG5ldyBTcHJpdGUoYmdfc2t5LCAwLCAwLCAxLCAxLCAxKVxuXG59OyIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuXHR4ID0gMDtcblx0eSA9IDA7XG5cdGR4ID0gMDtcblx0ZHkgPSAwO1xuXHR3ID0gMDtcblx0aCA9IDA7XG5cdHNwcml0ZSA9IG51bGw7XG5cdGFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGUsIGNvbmZpZyl7XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHRcdHRoaXMudHlwZSA9IHR5cGUgKyAnJztcblx0XHR0aGlzLnggPSBjb25maWcueHwwO1xuXHRcdHRoaXMueSA9IGNvbmZpZy55fDA7XG5cdFx0dGhpcy5keCA9IGNvbmZpZy5keHwwO1xuXHRcdHRoaXMuZHkgPSBjb25maWcuZHl8MDtcblx0XHR0aGlzLnNwcml0ZSA9IGNvbmZpZy5zcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuIHt9O1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwga2Yuc3csIGtmLnNoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHR0aGlzLmR4ICs9IGR0ICogZHg7XG5cdFx0dGhpcy5keSArPSBkdCAqIGR5O1xuXHRcdHRoaXMueCAgKz0gZHQgKiB0aGlzLmR4O1xuXHRcdHRoaXMueSAgKz0gZHQgKiB0aGlzLmR5O1xuXHR9XG5cbn0iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdyb3VuZCBmcm9tICcuL2dyb3VuZCc7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuaW1wb3J0IFNreSBmcm9tICcuL3NreSc7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5jb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjc1O1xuY29uc3QgQkFTRV9NQVJHSU4gPSBXSURUSCAqIDAuMjtcblxuY2xhc3MgR2FtZSB7XG5cdGdhbWVSZWFkeSA9IGZhbHNlO1xuXHRwYXVzZWQgPSBmYWxzZTtcblx0ZGVidWcgID0gZmFsc2U7XG5cblx0b25TY3JlZW4gID0gbnVsbDtcblx0b2ZmU2NyZWVuID0gbnVsbDtcblx0b25TY3JlZW5DdHggID0gbnVsbDtcblx0b2ZmU2NyZWVuQ3R4ID0gbnVsbDtcblxuXHRsYXllcnMgPSBbXTtcblx0cGxheWVyID0ge307XG5cdGFzc2V0cyA9IHt9O1xuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1haW4gR2FtZSBMb29wXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHRcblx0ZnJhbWVJZCA9IDB8MDtcblx0dHByZXYgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdHQgPSB0aGlzLnRwcmV2O1xuXHRkdCA9IDA7XG5cblx0ZnJhbWUoKSB7XG5cdFx0dGhpcy50ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdHRoaXMuZHQgKz0gTWF0aC5taW4oMSwgKHRoaXMudCAtIHRoaXMudHByZXYpIC8gMTAwMCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IFNURVApIHtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdFx0dGhpcy5kdCAtPSBTVEVQO1xuXHRcdFx0dGhpcy51cGRhdGUoU1RFUCk7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFNldHVwXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgYXNzZXRzKXtcblx0XHR0aGlzLm9uU2NyZWVuICA9IGNhbnZhcztcblx0XHR0aGlzLm9mZlNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5cdFx0dGhpcy5vZmZTY3JlZW4ud2lkdGggID0gV0lEVEg7XG5cdFx0dGhpcy5vZmZTY3JlZW4uaGVpZ2h0ID0gSEVJR0hUO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4ICAgICA9IHRoaXMub2ZmU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLm9uU2NyZWVuLndpZHRoICA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0ID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBSQVRJTyAqIHdpbmRvdy5pbm5lcldpZHRoKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4ICAgICA9IHRoaXMub25TY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCAgPSBmYWxzZTtcblxuXHRcdHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcih7eDogQkFTRV9NQVJHSU4sIHk6QkFTRV9MSU5FfSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0QW5pbWF0aW9uKHRoaXMuZnJhbWVJZHwwLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBTa3kodGhpcy5hc3NldHNbJ0JHX1NLWSddKSk7XG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgVGVycmFpbigwLjUsIFt0aGlzLmFzc2V0c1snQkdfTU9VTlRBSU4nXV0sIDMpKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBUZXJyYWluKDAuNzUsIFt0aGlzLmFzc2V0c1snQkdfSElMTCddXSwgNSkpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2godGhpcy5wbGF5ZXIpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IEdyb3VuZCgpKTtcblx0fVxuXG5cdHN0YXJ0KCkge1xuXHRcdC8vIEJlZ2lucyB0aGUgbWFpbiBnYW1lIGxvb3Bcblx0XHR0aGlzLmZyYW1lSWQgPSAwO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gVXBkYXRlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHVwZGF0ZShkdCkge1xuXHRcdGxldCBkeCA9IC1NYXRoLmxvZyh0aGlzLmZyYW1lSWQpICogNTA7IC8vIFRoZSByYXRlIHRoYXQgdGhpbmdzIGFyZSBzY3JvbGxpbmcgbGVmdFxuXHRcdGxldCBkeSA9IDA7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnVwZGF0ZShkdCwgZHgsIGR5KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEJBU0VfTElORSA9IEhFSUdIVCAqIDAuNzU7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VuZCB7XG5cblx0c2VnbWVudHMgPSBbXTtcblxuXHRcblx0Y29uc3RydWN0b3IoKXtcblx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdHg6IDAsXG5cdFx0XHR5OiBCQVNFX0xJTkUsXG5cdFx0XHRjcDF4OiAwLFxuXHRcdFx0Y3AxeTogQkFTRV9MSU5FLFxuXHRcdFx0Y3AyeDogV0lEVEggKiAwLjY2NjcsXG5cdFx0XHRjcDJ5OiBCQVNFX0xJTkUsXG5cdFx0XHRlbmR4OiBXSURUSCxcblx0XHRcdGVuZHk6IEJBU0VfTElORVxuXHRcdH07XG5cdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdGNvbnNvbGUubG9nKHNlZ21lbnQpO1xuXHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0fVxuXG5cdGdlbmVyYXRlKCl7XG5cblx0XHRsZXQgbGFzdCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGgtMV07XG5cdFx0d2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoIDwgMyl7XG5cdFx0XHRsZXQgeCA9IGxhc3QuZW5keDtcblx0XHRcdGxldCB5ID0gbGFzdC5lbmR5O1xuXHRcdFx0bGV0IGNwMXggPSB4ICsgKHggLSBsYXN0LmNwMngpO1xuXHRcdFx0bGV0IGNwMXkgPSB5ICsgKHkgLSBsYXN0LmNwMnkpO1xuXHRcdFx0bGV0IGVuZHggPSB4ICsgV0lEVEg7XG5cdFx0XHRsZXQgZW5keSA9IHkgKyBIRUlHSFQgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCB2YXJpYW5jZSA9IChXSURUSCAvIDUpICsgKFdJRFRIIC8gMykgKiBub3JtYWxfcmFuZG9tKCk7XG5cdFx0XHRsZXQgY3AyeCA9IGVuZHggLSB2YXJpYW5jZTtcblx0XHRcdGxldCBjcDJ5ID0gZW5keSAtIHZhcmlhbmNlICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgc2VnbWVudCA9IHtcblx0XHRcdFx0eDogeCxcblx0XHRcdFx0eTogeSxcblx0XHRcdFx0Y3AxeDogY3AxeCxcblx0XHRcdFx0Y3AxeTogY3AxeSxcblx0XHRcdFx0Y3AyeDogY3AyeCxcblx0XHRcdFx0Y3AyeTogY3AyeSxcblx0XHRcdFx0ZW5keDogZW5keCxcblx0XHRcdFx0ZW5keTogZW5keVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRcdGxhc3QgPSBzZWdtZW50O1xuXHRcdFx0Y29uc29sZS5sb2coc2VnbWVudCk7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnNlZ21lbnRzLmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBzZWdtZW50ID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHRcdGlmIChzZWdtZW50LmVuZHggPCAwKXtcblx0XHRcdFx0dGhpcy5zZWdtZW50cy5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0aWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0bGV0IGkgPSAwO1xuXHRcdGxldCBzID0gdGhpcy5zZWdtZW50c1tpXTtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4Lm1vdmVUbyhzLngsIHMueSk7XG5cdFx0d2hpbGUgKHMpe1xuXHRcdFx0Y3R4LmJlemllckN1cnZlVG8ocy5jcDF4LCBzLmNwMXksIHMuY3AyeCwgcy5jcDJ5LCBzLmVuZHgsIHMuZW5keSk7XG5cdFx0XHRzID0gdGhpcy5zZWdtZW50c1srK2ldO1xuXHRcdH1cblx0XHRjdHguc3Ryb2tlKCk7XG5cdH1cblxuXHR1cGRhdGUoZHQsIGR4LCBkeSl7XG5cdFx0ZHggPSBkdCAqIGR4O1xuXHRcdGR5ID0gZHQgKiBkeTtcblx0XHR0aGlzLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQpID0+IHtcblx0XHRcdHNlZ21lbnQueCArPSBkeDtcblx0XHRcdHNlZ21lbnQueSArPSBkeTtcblx0XHRcdHNlZ21lbnQuY3AxeCArPSBkeDtcblx0XHRcdHNlZ21lbnQuY3AxeSArPSBkeTtcblx0XHRcdHNlZ21lbnQuY3AyeCArPSBkeDtcblx0XHRcdHNlZ21lbnQuY3AyeSArPSBkeTtcblx0XHRcdHNlZ21lbnQuZW5keCArPSBkeDtcblx0XHRcdHNlZ21lbnQuZW5keSArPSBkeTtcblx0XHR9KTtcblx0fVxufSIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMnXG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLCBhc3NldHMpO1xuXG5cbiFmdW5jdGlvbiB3YWl0Rm9yQ29udGVudCgpe1xuXHQvLyBXYWl0IGZvciBjb250ZW50IHRvIGJlIHJldHJlaXZlZCBieSB0aGUgYnJvd3NlclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG5cdFx0Ly8gVE9ETy4uLlxuXHR9KTtcbn0oKVxuLnRoZW4oZ2FtZS5zdGFydCk7XG5cbmdhbWUuZGVidWcgPSB0cnVlO1xuZ2FtZS5zdGFydCgpOyIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5jb25zdCBHUkFWSVRZID0gLTEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuXHRjb25zdHJ1Y3Rvcihjb25maWcpe1xuXHRcdGxldCB0eXBlID0gJ3BsYXllcic7XG5cdFx0c3VwZXIodHlwZSwgY29uZmlnKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IDA7XG5cdFx0ZHkgPSAwO1xuXHRcdHN1cGVyLnVwZGF0ZShkdCwgZHgsIGR5KTtcblx0fVxufSIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa3kgZXh0ZW5kcyBFbnRpdHkge1xuXG5cdGNvbnN0cnVjdG9yKHNwcml0ZSl7XG5cdFx0c3VwZXIoJ3NreScsIHtzcHJpdGU6IHNwcml0ZX0pXG5cdFx0dGhpcy53ID0gV0lEVEg7XG5cdFx0dGhpcy5oID0gSEVJR0hUO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuXHR9XG5cdFxuXHR1cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpe1xuXHRcdC8vIG5vcFxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIHtcblxuXHRkZW5zaXR5ID0gNTtcblx0eU9mZnNldCA9IDA7XG5cdHpGYWN0b3IgPSAxOyAvLyBTaW11bGF0ZXMgZGlzdGFuY2UsIHJlZHVjaW5nIHRoZSBhcGFyZW50IG1vdmVtZW50IG9mIG9iamVjdHMgdGhhdCBhcmUgZnVydGhlciBhd2F5ICgwIGZvciBubyBtb3ZlbWVudClcblx0ZW50aXRpZXMgPSBbXTtcblx0c3ByaXRlcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKHpGYWN0b3IsIHNwcml0ZXMsIGRlbnNpdHksIHlPZmZzZXQpe1xuXHRcdHRoaXMuekZhY3RvciA9IHpGYWN0b3I7XG5cdFx0dGhpcy5zcHJpdGVzID0gc3ByaXRlcyB8fCBbXTtcblx0XHR0aGlzLmRlbnNpdHkgPSBkZW5zaXR5fDAgfHwgdGhpcy5kZW5zaXR5O1xuXHRcdHRoaXMueU9mZnNldCA9IHlPZmZzZXR8MDtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS54IC09IDEuNSpXSURUSCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXHRcdHdoaWxlKHRoaXMuZW50aXRpZXMubGVuZ3RoIDwgdGhpcy5kZW5zaXR5ICYmIHRoaXMuc3ByaXRlcy5sZW5ndGgpe1xuXHRcdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1soTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpfDBdO1xuXHRcdFx0bGV0IHggPSBXSURUSCArIFdJRFRIICogTWF0aC5yYW5kb20oKTtcblx0XHRcdGxldCB5ID0gSEVJR0hUIC0gdGhpcy55T2Zmc2V0IC0gc3ByaXRlLnNoO1xuXG5cdFx0XHRsZXQgZW50aXR5ID0gbmV3IEVudGl0eSgndGVycmFpbicsIHt4OiB4LCB5OiB5LCBzcHJpdGU6IHNwcml0ZX0pXG5cdFx0XHR0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuZW50aXRpZXMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG5cdFx0XHRpZiAoZW50aXR5LnggKyBlbnRpdHkudyA8IDApe1xuXHRcdFx0XHR0aGlzLmVudGl0aWVzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSl7XG5cblx0XHQvLyBVcGRhdGUgcG9zaXRpb25zXG5cdFx0ZHQgPSBkdCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR4ID0gZHQgKiBzY2VuZUR4O1xuXHRcdHNjZW5lRHkgPSBkdCAqIHNjZW5lRHk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS51cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpKVxuXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxfcmFuZG9tKCkge1xuXHQvLyBTdGFuZGFyZCBOb3JtYWwgdmFyaWF0ZSB1c2luZyBCb3gtTXVsbGVyIHRyYW5zZm9ybS5cbiAgICB2YXIgdSA9IDEgLSBNYXRoLnJhbmRvbSgpOyAvLyBTdWJ0cmFjdGlvbiB0byBmbGlwIFswLCAxKSB0byAoMCwgMV0uXG4gICAgdmFyIHYgPSAxIC0gTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCAtMi4wICogTWF0aC5sb2coIHUgKSApICogTWF0aC5jb3MoIDIuMCAqIE1hdGguUEkgKiB2ICk7XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
