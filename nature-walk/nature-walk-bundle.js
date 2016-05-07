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
var GRAVITY = 987;

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

			// Update the player first, then move the player back to the static position. Use the delta of the player to adjust the other layers
			var x = this.player.x;
			var y = this.player.y;
			var ddx = Math.log(this.frameId) * 50; // The rate that player is moving forward
			var ddy = GRAVITY;

			this.player.update(dt, ddx, ddy);

			var dx = x - this.player.x;
			var dy = y - this.player.y;

			this.player.x = x;
			this.player.y = y;

			this.layers.forEach(function (layer) {
				if (layer.type !== 'player') layer.update(dx, dy);
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
		value: function update(dt, ddx, ddy) {
			this.ddx = dt * ddx;
			this.ddy = dt * ddy;
			this.dx += dt * this.ddx;
			this.dy += dt * this.ddy;
			this.x += dt * this.dx;
			this.y += dt * this.dy;
			console.log(this.dx, this.dy, this.x, this.y);
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
		value: function update() {
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
		value: function update(dx, dy) {

			// Update positions
			dx = this.zFactor * dx;
			dy = this.zFactor * dy;
			this.entities.forEach(function (entity) {
				return entity.update(dx, dy);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2dyb3VuZC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9wbGF5ZXIuanMiLCJzcmMvc2t5LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy90ZXJyYWluLmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFXLElBQWYsQUFBZSxBQUFJO0FBQ25CLFNBQUEsQUFBUyxNQUFULEFBQWU7O0FBRWYsSUFBSSxjQUFjLElBQWxCLEFBQWtCLEFBQUk7QUFDdEIsWUFBQSxBQUFZLE1BQVosQUFBa0I7O0FBRWxCLElBQUksVUFBVSxJQUFkLEFBQWMsQUFBSTtBQUNsQixRQUFBLEFBQVEsTUFBUixBQUFjOzs7QUFJZCxJQUFJLFdBQVcsSUFBZixBQUFlLEFBQUk7QUFDbkIsU0FBQSxBQUFTLE1BQVQsQUFBZTs7QUFFZixJQUFJLFNBQVMsSUFBYixBQUFhLEFBQUk7QUFDakIsT0FBQSxBQUFPLE1BQVAsQUFBYTs7OztjQU1ELHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJQUY1QixBQUVILEFBQW1DLEFBQzNDO2dCQUFhLHFCQUFBLEFBQVcsYUFBWCxBQUF3QixHQUF4QixBQUEyQixHQUEzQixBQUE4QixNQUE5QixBQUFvQyxLQUh0QyxBQUdFLEFBQXlDLEFBQ3REO1lBQVMscUJBQUEsQUFBVyxTQUFYLEFBQW9CLEdBQXBCLEFBQXVCLEdBQXZCLEFBQTBCLE1BQTFCLEFBQWdDLEtBSjlCLEFBSUYsQUFBcUMsQUFDOUM7Z0JBQWEscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLEtBQTNCLEFBQWdDLElBTGxDLEFBS0UsQUFBb0MsQUFD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bUJBRk0sQUFFVyxBQUNqQjtvQkFITSxBQUdZLEFBQ2xCO3NCQUpELEFBQU8sQUFJYyxBQUVyQjtBQU5PLEFBQ047OztBQU9LLFNBQUEsQUFBUyxnQkFBZ0IsQUFFNUI7O0tBQUksSUFBSSxJQUFJLEssQUFBWixBQUFZLEFBQUssQUFDakI7S0FBSSxJQUFJLElBQUksS0FBWixBQUFZLEFBQUssQUFDakI7UUFBTyxLQUFBLEFBQUssS0FBTSxDQUFBLEFBQUMsTUFBTSxLQUFBLEFBQUssSUFBdkIsQUFBa0IsQUFBVSxNQUFRLEtBQUEsQUFBSyxJQUFLLE1BQU0sS0FBTixBQUFXLEtBQWhFLEFBQTJDLEFBQTBCLEFBQ3hFOzs7QUFFTSxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVBLFNBQUEsQUFBUyxPQUFNLEFBQ3JCO0tBQUksV0FBSixBQUFlLEFBQ2Y7U0FQVSxBQU9WLDRCQUFjLFNBQWQsQUFBdUIsQUFDdkI7U0FQVSxBQU9WLG9DQUFrQixTQUFsQixBQUEyQixBQUMzQjtTQVBVLEFBT1Ysc0NBQW1CLFNBQW5CLEFBQTRCLEFBQzVCO1NBUFUsQUFPViwwQ0FBcUIsU0FBckIsQUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1AiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuLy89PT09PSBDbG91ZHM9PT09PVxudmFyIGJnX2Nsb3VkID0gbmV3IEltYWdlKCk7XG5iZ19jbG91ZC5zcmMgPSAnL2Fzc2V0cy9iZy1jbG91ZHMtdHJhbnNwYXJlbnQucG5nJztcblxudmFyIGJnX3NreSA9IG5ldyBJbWFnZSgpO1xuYmdfc2t5LnNyYyA9ICcvYXNzZXRzL2JnLXNreS5wbmcnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KSxcbiAgICBCR19NT1VOVEFJTjogbmV3IFNwcml0ZShiZ19tb3VudGFpbiwgMCwgMCwgMTUzNiwgNzY3LCAxKSxcbiAgICBCR19ISUxMOiBuZXcgU3ByaXRlKGJnX2hpbGwsIDAsIDAsIDEwMjQsIDMwNiwgMSksXG4gICAgQkdfQ0xPVURfMDA6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDAsIDAsIDIxNiwgNDgsIDEpLFxuICAgIEJHX0NMT1VEXzAxOiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCA0OCwgMjE2LCA2NCwgMSksXG4gICAgQkdfQ0xPVURfMDI6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgMCwgMjg2LCA0OCwgMSksXG4gICAgQkdfQ0xPVURfMDM6IG5ldyBTcHJpdGUoYmdfY2xvdWQsIDIxNiwgNDgsIDI4NiwgNjQsIDEpLFxuICAgIEJHX0NMT1VEXzA0OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxMTIsIDUwMiwgNzIsIDEpLFxuICAgIEJHX0NMT1VEXzA1OiBuZXcgU3ByaXRlKGJnX2Nsb3VkLCAwLCAxODQsIDUwMiwgNzIsIDEpLFxuICAgIEJHX1NLWTogbmV3IFNwcml0ZShiZ19za3ksIDAsIDAsIDEsIDEsIDEpXG5cbn07IiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG5cdHggPSAwO1xuXHR5ID0gMDtcblx0ZHggPSAwO1xuXHRkeSA9IDA7XG5cdHcgPSAwO1xuXHRoID0gMDtcblx0c3ByaXRlID0gbnVsbDtcblx0YW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cblx0Y29uc3RydWN0b3IodHlwZSwgY29uZmlnKXtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0dGhpcy50eXBlID0gdHlwZSArICcnO1xuXHRcdHRoaXMueCA9IGNvbmZpZy54fDA7XG5cdFx0dGhpcy55ID0gY29uZmlnLnl8MDtcblx0XHR0aGlzLmR4ID0gY29uZmlnLmR4fDA7XG5cdFx0dGhpcy5keSA9IGNvbmZpZy5keXwwO1xuXHRcdHRoaXMuc3ByaXRlID0gY29uZmlnLnNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLncgPSB0aGlzLnNwcml0ZS5zd3wwO1xuXHRcdHRoaXMuaCA9IHRoaXMuc3ByaXRlLnNofDA7XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gMDtcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgfHwgIXRoaXMuc3ByaXRlLmdldEtleUZyYW1lKSByZXR1cm4ge307XG5cblx0XHRyZXR1cm4gdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUoZnJhbWVJZCAtIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHRsZXQga2YgPSB0aGlzLmdldEtleUZyYW1lKGZyYW1lSWQpO1xuXHRcdGlmICgha2YgfHwgIWtmLmltYWdlKSByZXR1cm47XG5cdFx0Y3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIHRoaXMueCwgdGhpcy55LCBrZi5zdywga2Yuc2gpO1xuXHR9XG5cblx0dXBkYXRlKGR4LCBkeSl7XG5cdFx0dGhpcy5keCA9IGR4O1xuXHRcdHRoaXMuZHkgPSBkeTtcblx0XHR0aGlzLnggICs9IHRoaXMuZHg7XG5cdFx0dGhpcy55ICArPSB0aGlzLmR5O1xuXHR9XG5cbn0iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdyb3VuZCBmcm9tICcuL2dyb3VuZCc7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuaW1wb3J0IFNreSBmcm9tICcuL3NreSc7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5jb25zdCBCQVNFX0xJTkUgPSBIRUlHSFQgKiAwLjY2NztcbmNvbnN0IEJBU0VfTUFSR0lOID0gV0lEVEggKiAwLjI7XG5jb25zdCBHUkFWSVRZID0gOTg3O1xuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdGxheWVycyA9IFtdO1xuXHRwbGF5ZXIgPSB7fTtcblx0YXNzZXRzID0ge307XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWFpbiBHYW1lIExvb3Bcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFxuXHRmcmFtZUlkID0gMHwwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHR0aGlzLnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5kdCArPSBNYXRoLm1pbigxLCAodGhpcy50IC0gdGhpcy50cHJldikgLyAxMDAwKTtcblx0XHR3aGlsZSh0aGlzLmR0ID4gU1RFUCkge1xuXHRcdFx0dGhpcy5mcmFtZUlkID0gKHRoaXMuZnJhbWVJZCArIDEpfDA7XG5cdFx0XHR0aGlzLmR0IC09IFNURVA7XG5cdFx0XHR0aGlzLnVwZGF0ZShTVEVQKTtcblx0XHR9XG5cdFx0dGhpcy50cHJldiA9IHRoaXMudDtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFxuXHRcdGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gU2V0dXBcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0Y29uc3RydWN0b3IoY2FudmFzLCBhc3NldHMpe1xuXHRcdHRoaXMub25TY3JlZW4gID0gY2FudmFzO1xuXHRcdHRoaXMub2ZmU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHR0aGlzLm9mZlNjcmVlbi53aWR0aCAgPSBXSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBIRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIFJBVElPICogd2luZG93LmlubmVyV2lkdGgpO1xuXHRcdHRoaXMub25TY3JlZW5DdHggICAgID0gdGhpcy5vblNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub25TY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkICA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hc3NldHMgPSBhc3NldHM7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHt4OiBCQVNFX01BUkdJTiwgeTpCQVNFX0xJTkV9KTtcblx0XHR0aGlzLnBsYXllci5zZXRBbmltYXRpb24odGhpcy5mcmFtZUlkfDAsIHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSlcblxuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFNreSh0aGlzLmFzc2V0c1snQkdfU0tZJ10pKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBUZXJyYWluKDAuNSwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSwgMykpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC43NSwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dLCA1KSk7XG5cdFx0dGhpcy5sYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgR3JvdW5kKCkpO1xuXHR9XG5cblx0c3RhcnQoKSB7XG5cdFx0Ly8gQmVnaW5zIHRoZSBtYWluIGdhbWUgbG9vcFxuXHRcdHRoaXMuZnJhbWVJZCA9IDA7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBVcGRhdGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0dXBkYXRlKGR0KSB7XG5cblx0XHQvLyBVcGRhdGUgdGhlIHBsYXllciBmaXJzdCwgdGhlbiBtb3ZlIHRoZSBwbGF5ZXIgYmFjayB0byB0aGUgc3RhdGljIHBvc2l0aW9uLiBVc2UgdGhlIGRlbHRhIG9mIHRoZSBwbGF5ZXIgdG8gYWRqdXN0IHRoZSBvdGhlciBsYXllcnNcblx0XHRsZXQgeCA9IHRoaXMucGxheWVyLng7XG5cdFx0bGV0IHkgPSB0aGlzLnBsYXllci55O1xuXHRcdGxldCBkZHggPSBNYXRoLmxvZyh0aGlzLmZyYW1lSWQpICogNTA7IC8vIFRoZSByYXRlIHRoYXQgcGxheWVyIGlzIG1vdmluZyBmb3J3YXJkXG5cdFx0bGV0IGRkeSA9IEdSQVZJVFk7XG5cblx0XHR0aGlzLnBsYXllci51cGRhdGUoZHQsIGRkeCwgZGR5KTtcblxuXHRcdGxldCBkeCA9IHggLSB0aGlzLnBsYXllci54O1xuXHRcdGxldCBkeSA9IHkgLSB0aGlzLnBsYXllci55O1xuXG5cdFx0dGhpcy5wbGF5ZXIueCA9IHg7XG5cdFx0dGhpcy5wbGF5ZXIueSA9IHk7XG5cblxuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XG5cdFx0XHRpZiAobGF5ZXIudHlwZSAhPT0gJ3BsYXllcicpXG5cdFx0XHRcdGxheWVyLnVwZGF0ZShkeCwgZHkpXG5cdFx0fSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCB7bm9ybWFsX3JhbmRvbX0gZnJvbSAnLi91dGlscyc7XG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEJBU0VfTElORSA9IEhFSUdIVCAqIDAuNjY3O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmQge1xuXG5cdHNlZ21lbnRzID0gW107XG5cblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHR4OiAwLFxuXHRcdFx0eTogQkFTRV9MSU5FLFxuXHRcdFx0Y3AxeDogMCxcblx0XHRcdGNwMXk6IEJBU0VfTElORSxcblx0XHRcdGNwMng6IFdJRFRIICogMC42NjY3LFxuXHRcdFx0Y3AyeTogQkFTRV9MSU5FLFxuXHRcdFx0ZW5keDogV0lEVEgsXG5cdFx0XHRlbmR5OiBCQVNFX0xJTkVcblx0XHR9O1xuXHRcdHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KTtcblx0XHRjb25zb2xlLmxvZyhzZWdtZW50KTtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXG5cdFx0bGV0IGxhc3QgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoLTFdO1xuXHRcdHdoaWxlICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA8IDMpe1xuXHRcdFx0bGV0IHggPSBsYXN0LmVuZHg7XG5cdFx0XHRsZXQgeSA9IGxhc3QuZW5keTtcblx0XHRcdGxldCBjcDF4ID0geCArICh4IC0gbGFzdC5jcDJ4KTtcblx0XHRcdGxldCBjcDF5ID0geSArICh5IC0gbGFzdC5jcDJ5KTtcblx0XHRcdGxldCBlbmR4ID0geCArIFdJRFRIO1xuXHRcdFx0bGV0IGVuZHkgPSB5ICsgSEVJR0hUICogbm9ybWFsX3JhbmRvbSgpO1xuXG5cdFx0XHRsZXQgdmFyaWFuY2UgPSAoV0lEVEggLyA1KSArIChXSURUSCAvIDMpICogbm9ybWFsX3JhbmRvbSgpO1xuXHRcdFx0bGV0IGNwMnggPSBlbmR4IC0gdmFyaWFuY2U7XG5cdFx0XHRsZXQgY3AyeSA9IGVuZHkgLSB2YXJpYW5jZSAqIG5vcm1hbF9yYW5kb20oKTtcblxuXHRcdFx0bGV0IHNlZ21lbnQgPSB7XG5cdFx0XHRcdHg6IHgsXG5cdFx0XHRcdHk6IHksXG5cdFx0XHRcdGNwMXg6IGNwMXgsXG5cdFx0XHRcdGNwMXk6IGNwMXksXG5cdFx0XHRcdGNwMng6IGNwMngsXG5cdFx0XHRcdGNwMnk6IGNwMnksXG5cdFx0XHRcdGVuZHg6IGVuZHgsXG5cdFx0XHRcdGVuZHk6IGVuZHlcblx0XHRcdH07XG5cdFx0XHR0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cdFx0XHRsYXN0ID0gc2VnbWVudDtcblx0XHRcdGNvbnNvbGUubG9nKHNlZ21lbnQpO1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0XHRpZiAoc2VnbWVudC5lbmR4IDwgMCl7XG5cdFx0XHRcdHRoaXMuc2VnbWVudHMuc3BsaWNlKGktLSwxKTtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHJldHVybjtcblxuXHRcdGxldCBpID0gMDtcblx0XHRsZXQgcyA9IHRoaXMuc2VnbWVudHNbaV07XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8ocy54LCBzLnkpO1xuXHRcdHdoaWxlIChzKXtcblx0XHRcdGN0eC5iZXppZXJDdXJ2ZVRvKHMuY3AxeCwgcy5jcDF5LCBzLmNwMngsIHMuY3AyeSwgcy5lbmR4LCBzLmVuZHkpO1xuXHRcdFx0cyA9IHRoaXMuc2VnbWVudHNbKytpXTtcblx0XHR9XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9XG5cblx0dXBkYXRlKGR4LCBkeSl7XG5cdFx0dGhpcy5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50KSA9PiB7XG5cdFx0XHRzZWdtZW50LnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMXggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMXkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmNwMnggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmNwMnkgKz0gZHk7XG5cdFx0XHRzZWdtZW50LmVuZHggKz0gZHg7XG5cdFx0XHRzZWdtZW50LmVuZHkgKz0gZHk7XG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5pbXBvcnQgYXNzZXRzIGZyb20gJy4vYXNzZXRzJ1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSwgYXNzZXRzKTtcblxuXG4hZnVuY3Rpb24gd2FpdEZvckNvbnRlbnQoKXtcblx0Ly8gV2FpdCBmb3IgY29udGVudCB0byBiZSByZXRyZWl2ZWQgYnkgdGhlIGJyb3dzZXJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuXHRcdC8vIFRPRE8uLi5cblx0fSk7XG59KClcbi50aGVuKGdhbWUuc3RhcnQpO1xuXG5nYW1lLmRlYnVnID0gdHJ1ZTtcbmdhbWUuc3RhcnQoKTsiLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgRW50aXR5IHtcblx0Y29uc3RydWN0b3IoY29uZmlnKXtcblx0XHRsZXQgdHlwZSA9ICdwbGF5ZXInO1xuXHRcdHN1cGVyKHR5cGUsIGNvbmZpZyk7XG5cdH1cblxuXHR1cGRhdGUoZHQsIGRkeCwgZGR5KXtcblx0XHR0aGlzLmRkeCA9IGR0ICogZGR4O1xuXHRcdHRoaXMuZGR5ID0gZHQgKiBkZHk7XG5cdFx0dGhpcy5keCArPSBkdCAqIHRoaXMuZGR4O1xuXHRcdHRoaXMuZHkgKz0gZHQgKiB0aGlzLmRkeTtcblx0XHR0aGlzLnggICs9IGR0ICogdGhpcy5keDtcblx0XHR0aGlzLnkgICs9IGR0ICogdGhpcy5keTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmR4LCB0aGlzLmR5LCB0aGlzLngsIHRoaXMueSlcblx0fVxufSIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa3kgZXh0ZW5kcyBFbnRpdHkge1xuXG5cdGNvbnN0cnVjdG9yKHNwcml0ZSl7XG5cdFx0c3VwZXIoJ3NreScsIHtzcHJpdGU6IHNwcml0ZX0pXG5cdFx0dGhpcy53ID0gV0lEVEg7XG5cdFx0dGhpcy5oID0gSEVJR0hUO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuXHR9XG5cdFxuXHR1cGRhdGUoKXtcblx0XHQvLyBub3Bcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XG5cdGtleUZyYW1lcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yIChpbWFnZSwgc3gsIHN5LCBzdywgc2gsIG51bUtleUZyYW1lcykge1xuXHRcdHRoaXMuaW1hZ2UgPSBpbWFnZTtcblx0XHR0aGlzLnN4ID0gc3h8MDtcblx0XHR0aGlzLnN5ID0gc3l8MDtcblx0XHR0aGlzLnN3ID0gc3d8MDtcblx0XHR0aGlzLnNoID0gc2h8MDtcblx0XHR0aGlzLm51bUtleUZyYW1lcyA9IE1hdGgubWF4KG51bUtleUZyYW1lc3wwLCAxKTtcblxuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMubnVtS2V5RnJhbWVzOyArK2kpe1xuXHRcdFx0bGV0IGtleUZyYW1lID0ge1xuXHRcdFx0XHRpbWFnZTogdGhpcy5pbWFnZSxcblx0XHRcdFx0c3g6IHRoaXMuc3ggKyB0aGlzLnN3ICogaSxcblx0XHRcdFx0c3k6IHRoaXMuc3ksXG5cdFx0XHRcdHN3OiB0aGlzLnN3LFxuXHRcdFx0XHRzaDogdGhpcy5zaFxuXHRcdFx0fTtcblx0XHRcdHRoaXMua2V5RnJhbWVzLnB1c2goa2V5RnJhbWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0cmV0dXJuIHRoaXMua2V5RnJhbWVzW2ZyYW1lSWQgJSB0aGlzLm51bUtleUZyYW1lc107XG5cdH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVycmFpbiB7XG5cblx0ZGVuc2l0eSA9IDU7XG5cdHlPZmZzZXQgPSAwO1xuXHR6RmFjdG9yID0gMTsgLy8gU2ltdWxhdGVzIGRpc3RhbmNlLCByZWR1Y2luZyB0aGUgYXBhcmVudCBtb3ZlbWVudCBvZiBvYmplY3RzIHRoYXQgYXJlIGZ1cnRoZXIgYXdheSAoMCBmb3Igbm8gbW92ZW1lbnQpXG5cdGVudGl0aWVzID0gW107XG5cdHNwcml0ZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3Rvcih6RmFjdG9yLCBzcHJpdGVzLCBkZW5zaXR5LCB5T2Zmc2V0KXtcblx0XHR0aGlzLnpGYWN0b3IgPSB6RmFjdG9yO1xuXHRcdHRoaXMuc3ByaXRlcyA9IHNwcml0ZXMgfHwgW107XG5cdFx0dGhpcy5kZW5zaXR5ID0gZGVuc2l0eXwwIHx8IHRoaXMuZGVuc2l0eTtcblx0XHR0aGlzLnlPZmZzZXQgPSB5T2Zmc2V0fDA7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdHRoaXMuZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5KSA9PiBlbnRpdHkueCAtPSAxLjUqV0lEVEgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHR3aGlsZSh0aGlzLmVudGl0aWVzLmxlbmd0aCA8IHRoaXMuZGVuc2l0eSAmJiB0aGlzLnNwcml0ZXMubGVuZ3RoKXtcblx0XHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRcdGxldCB4ID0gV0lEVEggKyBXSURUSCAqIE1hdGgucmFuZG9tKCk7XG5cdFx0XHRsZXQgeSA9IEhFSUdIVCAtIHRoaXMueU9mZnNldCAtIHNwcml0ZS5zaDtcblxuXHRcdFx0bGV0IGVudGl0eSA9IG5ldyBFbnRpdHkoJ3RlcnJhaW4nLCB7eDogeCwgeTogeSwgc3ByaXRlOiBzcHJpdGV9KVxuXHRcdFx0dGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLmVudGl0aWVzLmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldO1xuXHRcdFx0aWYgKGVudGl0eS54ICsgZW50aXR5LncgPCAwKXtcblx0XHRcdFx0dGhpcy5lbnRpdGllcy5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHgsIGR5KXtcblxuXHRcdC8vIFVwZGF0ZSBwb3NpdGlvbnNcblx0XHRkeCA9IHRoaXMuekZhY3RvciAqIGR4O1xuXHRcdGR5ID0gdGhpcy56RmFjdG9yICogZHk7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS51cGRhdGUoZHgsIGR5KSlcblxuXHRcdHRoaXMuZ2FyYmFnZUNvbGxlY3Rpb24oKTtcblx0fVxufSIsImZ1bmN0aW9uIGFzbSgpe1xuXHQndXNlIGFzbSc7XG5cdC8vIHQ6IGN1cnJlbnQgdGltZVxuXHQvLyBiOiBzdGFydCB2YWx1ZVxuXHQvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0Ly8gZDogZHVyYWl0b25cblxuXHRmdW5jdGlvbiBsaW5lYXJUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHJldHVybiArKGMqdC9kICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5RdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKGMqdCp0ICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKygtYyp0Kih0LTIpICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5PdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0IC89IGQvMjtcblx0XHRpZiAodCA8IDEpIHJldHVybiArKGMvMip0KnQgKyBiKTtcblx0XHQtLXQ7XG5cdFx0cmV0dXJuICsoLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGluZWFyVHdlZW46IGxpbmVhclR3ZWVuLFxuXHRcdGVhc2VJblF1YWRUd2VlbjogZWFzZUluUXVhZFR3ZWVuLFxuXHRcdGVhc2VPdXRRdWFkVHdlZW46IGVhc2VPdXRRdWFkVHdlZW4sXG5cdFx0ZWFzZUluT3V0UXVhZFR3ZWVuOiBlYXNlSW5PdXRRdWFkVHdlZW5cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsX3JhbmRvbSgpIHtcblx0Ly8gU3RhbmRhcmQgTm9ybWFsIHZhcmlhdGUgdXNpbmcgQm94LU11bGxlciB0cmFuc2Zvcm0uXG4gICAgdmFyIHUgPSAxIC0gTWF0aC5yYW5kb20oKTsgLy8gU3VidHJhY3Rpb24gdG8gZmxpcCBbMCwgMSkgdG8gKDAsIDFdLlxuICAgIHZhciB2ID0gMSAtIE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIE1hdGguc3FydCggLTIuMCAqIE1hdGgubG9nKCB1ICkgKSAqIE1hdGguY29zKCAyLjAgKiBNYXRoLlBJICogdiApO1xufVxuXG5leHBvcnQgdmFyIGxpbmVhclR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5RdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VPdXRRdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJbk91dFF1YWRUd2VlbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKXtcblx0dmFyIGV4cG9ydGVkID0gYXNtKCk7XG5cdGxpbmVhclR3ZWVuID0gZXhwb3J0ZWQubGluZWFyVHdlZW47XG5cdGVhc2VJblF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJblF1YWRUd2Vlbjtcblx0ZWFzZU91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VPdXRRdWFkVHdlZW47XG5cdGVhc2VJbk91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJbk91dFF1YWRUd2Vlbjtcblx0cmV0dXJuIGV4cG9ydGVkO1xufTtcbiJdfQ==
