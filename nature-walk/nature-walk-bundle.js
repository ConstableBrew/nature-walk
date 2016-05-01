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
var BASE_LINE = HEIGHT * 0.667;
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
var BASE_LINE = HEIGHT * 0.667;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2t5LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy90ZXJyYWluLmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFXLElBQWYsQUFBZSxBQUFJO0FBQ25CLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsWUFBQSxBQUFZLE1BQVosQUFBa0I7O0FBRWxCLElBQUksVUFBVSxJQUFkLEFBQWMsQUFBSTtBQUNsQixRQUFBLEFBQVEsTUFBUixBQUFjOzs7QUFJZCxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLFNBQVMsSUFBYixBQUFhLEFBQUk7QUFDakIsT0FBQSxBQUFPLE1BQVAsQUFBYTs7OztjQU1ELHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJQUY1QixBQUVILEFBQW1DLEFBQzNDO2dCQUFhLHFCQUFBLEFBQVcsYUFBWCxBQUF3QixHQUF4QixBQUEyQixHQUEzQixBQUE4QixNQUE5QixBQUFvQyxLQUh0QyxBQUdFLEFBQXlDLEFBQ3REO1lBQVMscUJBQUEsQUFBVyxTQUFYLEFBQW9CLEdBQXBCLEFBQXVCLEdBQXZCLEFBQTBCLE1BQTFCLEFBQWdDLEtBSjlCLEFBSUYsQUFBcUMsQUFDOUM7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLEtBQTNCLEFBQWdDLElBTGxDLEFBS0UsQUFBb0MsQUFD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QUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbi8vPT09PT0gQ2xvdWRzPT09PT1cbnZhciBiZ19jbG91ZCA9IG5ldyBJbWFnZSgpO1xuYmdfY2xvdWQuc3JjID0gJy9hc3NldHMvYmctY2xvdWRzLXRyYW5zcGFyZW50LnBuZyc7XG5cbnZhciBiZ19za3kgPSBuZXcgSW1hZ2UoKTtcbmJnX3NreS5zcmMgPSAnL2Fzc2V0cy9iZy1za3kucG5nJztcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpLFxuICAgIEJHX0NMT1VEXzAwOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAwLCAyMTYsIDQ4LCAxKSxcbiAgICBCR19DTE9VRF8wMTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgNDgsIDIxNiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzAyOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDAsIDI4NiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAzOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAyMTYsIDQ4LCAyODYsIDY0LCAxKSxcbiAgICBCR19DTE9VRF8wNDogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTEyLCA1MDIsIDcyLCAxKSxcbiAgICBCR19DTE9VRF8wNTogbmV3IFNwcml0ZShiZ19jbG91ZCwgMCwgMTg0LCA1MDIsIDcyLCAxKSxcbiAgICBCR19TS1k6IG5ldyBTcHJpdGUoYmdfc2t5LCAwLCAwLCAxLCAxLCAxKVxuXG59OyIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuXHR4ID0gMDtcblx0eSA9IDA7XG5cdGR4ID0gMDtcblx0ZHkgPSAwO1xuXHR3ID0gMDtcblx0aCA9IDA7XG5cdHNwcml0ZSA9IG51bGw7XG5cdGFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGUsIGNvbmZpZyl7XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHRcdHRoaXMudHlwZSA9IHR5cGUgKyAnJztcblx0XHR0aGlzLnggPSBjb25maWcueHwwO1xuXHRcdHRoaXMueSA9IGNvbmZpZy55fDA7XG5cdFx0dGhpcy5keCA9IGNvbmZpZy5keHwwO1xuXHRcdHRoaXMuZHkgPSBjb25maWcuZHl8MDtcblx0XHR0aGlzLnNwcml0ZSA9IGNvbmZpZy5zcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuIHt9O1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwga2Yuc3csIGtmLnNoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHR0aGlzLmR4ICs9IGR0ICogZHg7XG5cdFx0dGhpcy5keSArPSBkdCAqIGR5O1xuXHRcdHRoaXMueCAgKz0gZHQgKiB0aGlzLmR4O1xuXHRcdHRoaXMueSAgKz0gZHQgKiB0aGlzLmR5O1xuXHR9XG5cbn0iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdyb3VuZCBmcm9tICcuL2dyb3VuZCc7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuaW1wb3J0IFNreSBmcm9tICcuL3NreSc7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5jb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjY2NztcbmNvbnN0IEJBU0VfTUFSR0lOID0gV0lEVEggKiAwLjI7XG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0bGF5ZXJzID0gW107XG5cdHBsYXllciA9IHt9O1xuXHRhc3NldHMgPSB7fTtcblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNYWluIEdhbWUgTG9vcFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XG5cdGZyYW1lSWQgPSAwfDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdHRoaXMudCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLmR0ICs9IE1hdGgubWluKDEsICh0aGlzLnQgLSB0aGlzLnRwcmV2KSAvIDEwMDApO1xuXHRcdHdoaWxlKHRoaXMuZHQgPiBTVEVQKSB7XG5cdFx0XHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHRcdHRoaXMuZHQgLT0gU1RFUDtcblx0XHRcdHRoaXMudXBkYXRlKFNURVApO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBTZXR1cFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IFdJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IEhFSUdIVDtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eCAgICAgPSB0aGlzLm9mZlNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vblNjcmVlbi53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe3g6IEJBU0VfTUFSR0lOLCB5OkJBU0VfTElORX0pO1xuXHRcdHRoaXMucGxheWVyLnNldEFuaW1hdGlvbih0aGlzLmZyYW1lSWR8MCwgdGhpcy5hc3NldHNbJ0RSVUlEX1JVTiddKVxuXG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgU2t5KHRoaXMuYXNzZXRzWydCR19TS1knXSkpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC41LCBbdGhpcy5hc3NldHNbJ0JHX01PVU5UQUlOJ11dLCAzKSk7XG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgVGVycmFpbigwLjc1LCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0sIDUpKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBHcm91bmQoKSk7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHRsZXQgZHggPSAtTWF0aC5sb2codGhpcy5mcmFtZUlkKSAqIDUwOyAvLyBUaGUgcmF0ZSB0aGF0IHRoaW5ncyBhcmUgc2Nyb2xsaW5nIGxlZnRcblx0XHRsZXQgZHkgPSAwO1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci51cGRhdGUoZHQsIGR4LCBkeSkpO1xuXHR9XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gUmVuZGVyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgY3ZzID0gdGhpcy5vZmZTY3JlZW47XG5cdFx0bGV0IGN0eCA9IHRoaXMub2ZmU2NyZWVuQ3R4O1xuXG5cdFx0bGV0IHNjYWxlID0gTWF0aC5tYXgoXG5cdFx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodC9jdnMuaGVpZ2h0LFxuXHRcdFx0dGhpcy5vblNjcmVlbi53aWR0aC9jdnMud2lkdGhcblx0XHQpO1xuXHRcdGxldCB3ID0gY3ZzLndpZHRoICogc2NhbGU7XG5cdFx0bGV0IGggPSBjdnMuaGVpZ2h0ICogc2NhbGU7XG5cdFx0bGV0IHggPSAwO1xuXHRcdGxldCB5ID0gKHRoaXMub2ZmU2NyZWVuLmhlaWdodCAtIGgpIC8gMjtcblxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KTtcblxuXHRcdHRoaXMucmVuZGVyTGF5ZXJzKCk7XG5cblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC43NSknO1xuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgY3ZzLmhlaWdodCk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ2dvbGQnO1xuXHRcdFx0bGV0IGZvbnRTaXplID0gMzI7XG5cdFx0XHRsZXQgbGluZUhlaWdodCA9IGZvbnRTaXplICogMS4zMztcblx0XHRcdGxldCBsaW5lUG9zID0geTtcblx0XHRcdGN0eC5mb250ID0gZm9udFNpemUgKyAncHggc2Fucy1zZXJpZic7XG5cdFx0XHRjdHguZmlsbFRleHQoJ2ZyYW1lSWQ6ICcgKyB0aGlzLmZyYW1lSWQsIDAsIGxpbmVQb3MgKz0gbGluZUhlaWdodCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vblNjcmVlbkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHQpOztcblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmRyYXdJbWFnZShcblx0XHRcdGN2cyxcblx0XHRcdHgsIHksIHcsIGgsXG5cdFx0XHQwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJMYXllcnMoKXtcblx0XHR0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIucmVuZGVyKHRoaXMuZnJhbWVJZCwgdGhpcy5vZmZTY3JlZW5DdHgpKTtcblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQge25vcm1hbF9yYW5kb219IGZyb20gJy4vdXRpbHMnO1xuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjY2NztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kIHtcblxuXHRzZWdtZW50cyA9IFtdO1xuXG5cdFxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IEJBU0VfTElORSxcblx0XHRcdGNwMXg6IDAsXG5cdFx0XHRjcDF5OiBCQVNFX0xJTkUsXG5cdFx0XHRjcDJ4OiBXSURUSCAqIDAuNjY2Nyxcblx0XHRcdGNwMnk6IEJBU0VfTElORSxcblx0XHRcdGVuZHg6IFdJRFRILFxuXHRcdFx0ZW5keTogQkFTRV9MSU5FXG5cdFx0fTtcblx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0Y29uc29sZS5sb2coc2VnbWVudCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblxuXHRcdGxldCBsYXN0ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aC0xXTtcblx0XHR3aGlsZSAodGhpcy5zZWdtZW50cy5sZW5ndGggPCAzKXtcblx0XHRcdGxldCB4ID0gbGFzdC5lbmR4O1xuXHRcdFx0bGV0IHkgPSBsYXN0LmVuZHk7XG5cdFx0XHRsZXQgY3AxeCA9IHggKyAoeCAtIGxhc3QuY3AyeCk7XG5cdFx0XHRsZXQgY3AxeSA9IHkgKyAoeSAtIGxhc3QuY3AyeSk7XG5cdFx0XHRsZXQgZW5keCA9IHggKyBXSURUSDtcblx0XHRcdGxldCBlbmR5ID0geSArIEhFSUdIVCAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHZhcmlhbmNlID0gKFdJRFRIIC8gNSkgKyAoV0lEVEggLyAzKSAqIG5vcm1hbF9yYW5kb20oKTtcblx0XHRcdGxldCBjcDJ4ID0gZW5keCAtIHZhcmlhbmNlO1xuXHRcdFx0bGV0IGNwMnkgPSBlbmR5IC0gdmFyaWFuY2UgKiBub3JtYWxfcmFuZG9tKCk7XG5cblx0XHRcdGxldCBzZWdtZW50ID0ge1xuXHRcdFx0XHR4OiB4LFxuXHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRjcDF4OiBjcDF4LFxuXHRcdFx0XHRjcDF5OiBjcDF5LFxuXHRcdFx0XHRjcDJ4OiBjcDJ4LFxuXHRcdFx0XHRjcDJ5OiBjcDJ5LFxuXHRcdFx0XHRlbmR4OiBlbmR4LFxuXHRcdFx0XHRlbmR5OiBlbmR5XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXHRcdFx0bGFzdCA9IHNlZ21lbnQ7XG5cdFx0XHRjb25zb2xlLmxvZyhzZWdtZW50KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuc2VnbWVudHMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IHNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdFx0aWYgKHNlZ21lbnQuZW5keCA8IDApe1xuXHRcdFx0XHR0aGlzLnNlZ21lbnRzLnNwbGljZShpLS0sMSk7XG5cdFx0XHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRsZXQgaSA9IDA7XG5cdFx0bGV0IHMgPSB0aGlzLnNlZ21lbnRzW2ldO1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHgubW92ZVRvKHMueCwgcy55KTtcblx0XHR3aGlsZSAocyl7XG5cdFx0XHRjdHguYmV6aWVyQ3VydmVUbyhzLmNwMXgsIHMuY3AxeSwgcy5jcDJ4LCBzLmNwMnksIHMuZW5keCwgcy5lbmR5KTtcblx0XHRcdHMgPSB0aGlzLnNlZ21lbnRzWysraV07XG5cdFx0fVxuXHRcdGN0eC5zdHJva2UoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IGR0ICogZHg7XG5cdFx0ZHkgPSBkdCAqIGR5O1xuXHRcdHRoaXMuc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCkgPT4ge1xuXHRcdFx0c2VnbWVudC54ICs9IGR4O1xuXHRcdFx0c2VnbWVudC55ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDF4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDF5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5jcDJ4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5jcDJ5ICs9IGR5O1xuXHRcdFx0c2VnbWVudC5lbmR4ICs9IGR4O1xuXHRcdFx0c2VnbWVudC5lbmR5ICs9IGR5O1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmNvbnN0IEdSQVZJVFkgPSAtMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0bGV0IHR5cGUgPSAncGxheWVyJztcblx0XHRzdXBlcih0eXBlLCBjb25maWcpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdGR4ID0gMDtcblx0XHRkeSA9IDA7XG5cdFx0c3VwZXIudXBkYXRlKGR0LCBkeCwgZHkpO1xuXHR9XG59IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNreSBleHRlbmRzIEVudGl0eSB7XG5cblx0Y29uc3RydWN0b3Ioc3ByaXRlKXtcblx0XHRzdXBlcignc2t5Jywge3Nwcml0ZTogc3ByaXRlfSlcblx0XHR0aGlzLncgPSBXSURUSDtcblx0XHR0aGlzLmggPSBIRUlHSFQ7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCB0aGlzLncsIHRoaXMuaCk7XG5cdH1cblx0XG5cdHVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSl7XG5cdFx0Ly8gbm9wXG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuXHRrZXlGcmFtZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3RvciAoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBudW1LZXlGcmFtZXMpIHtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy5zeCA9IHN4fDA7XG5cdFx0dGhpcy5zeSA9IHN5fDA7XG5cdFx0dGhpcy5zdyA9IHN3fDA7XG5cdFx0dGhpcy5zaCA9IHNofDA7XG5cdFx0dGhpcy5udW1LZXlGcmFtZXMgPSBNYXRoLm1heChudW1LZXlGcmFtZXN8MCwgMSk7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLm51bUtleUZyYW1lczsgKytpKXtcblx0XHRcdGxldCBrZXlGcmFtZSA9IHtcblx0XHRcdFx0aW1hZ2U6IHRoaXMuaW1hZ2UsXG5cdFx0XHRcdHN4OiB0aGlzLnN4ICsgdGhpcy5zdyAqIGksXG5cdFx0XHRcdHN5OiB0aGlzLnN5LFxuXHRcdFx0XHRzdzogdGhpcy5zdyxcblx0XHRcdFx0c2g6IHRoaXMuc2hcblx0XHRcdH07XG5cdFx0XHR0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcblx0XHR9XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRmcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHJldHVybiB0aGlzLmtleUZyYW1lc1tmcmFtZUlkICUgdGhpcy5udW1LZXlGcmFtZXNdO1xuXHR9XG59XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5JztcblxuXG4vLyBUT0RPOiBNb3ZlIHRoZXNlIHRvIHNvbWUgY29uZmlnIGZpbGVcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcnJhaW4ge1xuXG5cdGRlbnNpdHkgPSA1O1xuXHR5T2Zmc2V0ID0gMDtcblx0ekZhY3RvciA9IDE7IC8vIFNpbXVsYXRlcyBkaXN0YW5jZSwgcmVkdWNpbmcgdGhlIGFwYXJlbnQgbW92ZW1lbnQgb2Ygb2JqZWN0cyB0aGF0IGFyZSBmdXJ0aGVyIGF3YXkgKDAgZm9yIG5vIG1vdmVtZW50KVxuXHRlbnRpdGllcyA9IFtdO1xuXHRzcHJpdGVzID0gW107XG5cblx0Y29uc3RydWN0b3IoekZhY3Rvciwgc3ByaXRlcywgZGVuc2l0eSwgeU9mZnNldCl7XG5cdFx0dGhpcy56RmFjdG9yID0gekZhY3Rvcjtcblx0XHR0aGlzLnNwcml0ZXMgPSBzcHJpdGVzIHx8IFtdO1xuXHRcdHRoaXMuZGVuc2l0eSA9IGRlbnNpdHl8MCB8fCB0aGlzLmRlbnNpdHk7XG5cdFx0dGhpcy55T2Zmc2V0ID0geU9mZnNldHwwO1xuXHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnggLT0gMS41KldJRFRIKTtcblx0fVxuXG5cdGdlbmVyYXRlKCl7XG5cdFx0d2hpbGUodGhpcy5lbnRpdGllcy5sZW5ndGggPCB0aGlzLmRlbnNpdHkgJiYgdGhpcy5zcHJpdGVzLmxlbmd0aCl7XG5cdFx0XHRsZXQgc3ByaXRlID0gdGhpcy5zcHJpdGVzWyhNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aCl8MF07XG5cdFx0XHRsZXQgeCA9IFdJRFRIICsgV0lEVEggKiBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0bGV0IHkgPSBIRUlHSFQgLSB0aGlzLnlPZmZzZXQgLSBzcHJpdGUuc2g7XG5cblx0XHRcdGxldCBlbnRpdHkgPSBuZXcgRW50aXR5KCd0ZXJyYWluJywge3g6IHgsIHk6IHksIHNwcml0ZTogc3ByaXRlfSlcblx0XHRcdHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5lbnRpdGllcy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcblx0XHRcdGlmIChlbnRpdHkueCArIGVudGl0eS53IDwgMCl7XG5cdFx0XHRcdHRoaXMuZW50aXRpZXMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdHRoaXMuZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5KSA9PiBlbnRpdHkucmVuZGVyKGZyYW1lSWQsIGN0eCkpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBzY2VuZUR4LCBzY2VuZUR5KXtcblxuXHRcdC8vIFVwZGF0ZSBwb3NpdGlvbnNcblx0XHRkdCA9IGR0ICogdGhpcy56RmFjdG9yO1xuXHRcdHNjZW5lRHggPSBkdCAqIHNjZW5lRHg7XG5cdFx0c2NlbmVEeSA9IGR0ICogc2NlbmVEeTtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSkpXG5cblx0XHR0aGlzLmdhcmJhZ2VDb2xsZWN0aW9uKCk7XG5cdH1cbn0iLCJmdW5jdGlvbiBhc20oKXtcblx0J3VzZSBhc20nO1xuXHQvLyB0OiBjdXJyZW50IHRpbWVcblx0Ly8gYjogc3RhcnQgdmFsdWVcblx0Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdC8vIGQ6IGR1cmFpdG9uXG5cblx0ZnVuY3Rpb24gbGluZWFyVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHRyZXR1cm4gKyhjKnQvZCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluUXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKyhjKnQqdCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZU91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoLWMqdCoodC0yKSArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCAvPSBkLzI7XG5cdFx0aWYgKHQgPCAxKSByZXR1cm4gKyhjLzIqdCp0ICsgYik7XG5cdFx0LS10O1xuXHRcdHJldHVybiArKC1jLzIgKiAodCoodC0yKSAtIDEpICsgYik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxpbmVhclR3ZWVuOiBsaW5lYXJUd2Vlbixcblx0XHRlYXNlSW5RdWFkVHdlZW46IGVhc2VJblF1YWRUd2Vlbixcblx0XHRlYXNlT3V0UXVhZFR3ZWVuOiBlYXNlT3V0UXVhZFR3ZWVuLFxuXHRcdGVhc2VJbk91dFF1YWRUd2VlbjogZWFzZUluT3V0UXVhZFR3ZWVuXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbF9yYW5kb20oKSB7XG5cdC8vIFN0YW5kYXJkIE5vcm1hbCB2YXJpYXRlIHVzaW5nIEJveC1NdWxsZXIgdHJhbnNmb3JtLlxuICAgIHZhciB1ID0gMSAtIE1hdGgucmFuZG9tKCk7IC8vIFN1YnRyYWN0aW9uIHRvIGZsaXAgWzAsIDEpIHRvICgwLCAxXS5cbiAgICB2YXIgdiA9IDEgLSBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiBNYXRoLnNxcnQoIC0yLjAgKiBNYXRoLmxvZyggdSApICkgKiBNYXRoLmNvcyggMi4wICogTWF0aC5QSSAqIHYgKTtcbn1cblxuZXhwb3J0IHZhciBsaW5lYXJUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluUXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlT3V0UXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5PdXRRdWFkVHdlZW47XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCl7XG5cdHZhciBleHBvcnRlZCA9IGFzbSgpO1xuXHRsaW5lYXJUd2VlbiA9IGV4cG9ydGVkLmxpbmVhclR3ZWVuO1xuXHRlYXNlSW5RdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5RdWFkVHdlZW47XG5cdGVhc2VPdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlT3V0UXVhZFR3ZWVuO1xuXHRlYXNlSW5PdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5PdXRRdWFkVHdlZW47XG5cdHJldHVybiBleHBvcnRlZDtcbn07XG4iXX0=
