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

exports.default = {
   DRUID_RUN: new _sprite2.default(druidRun, 0, 0, 48, 48, 8),
   BG_MOUNTAIN: new _sprite2.default(bg_mountain, 0, 0, 1536, 767, 1),
   BG_HILL: new _sprite2.default(bg_hill, 0, 0, 1024, 306, 1)
};

},{"./sprite":6}],2:[function(require,module,exports){
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

},{"./sprite":6}],3:[function(require,module,exports){
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

			console.log(dx, dy);
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

},{"./player":5,"./terrain":7,"./utils":8}],4:[function(require,module,exports){
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

},{"./assets":1,"./game":3}],5:[function(require,module,exports){
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

},{"./entity":2}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./entity":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3BsYXllci5qcyIsInNyYy9zcHJpdGUuanMiLCJzcmMvdGVycmFpbi5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQUVBLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJO0FBQ3RCLFlBQUEsQUFBWSxNQUFaLEFBQWtCOztBQUVsQixJQUFJLFVBQVUsSUFBZCxBQUFjLEFBQUk7QUFDbEIsUUFBQSxBQUFRLE1BQVIsQUFBYzs7O2NBSUYscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRDVCLEFBQ0gsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBRnRDLEFBRUUsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsSyxBQUg5QixBQUdGLEFBQXFDO0FBSG5DLEFBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRDs7Ozs7Ozs7Ozs7Ozs7SSxBQUVxQixxQkFVcEI7aUJBQUEsQUFBWSxNQUFaLEFBQWtCLFFBQU87d0JBQUE7O09BVHpCLEFBU3lCLElBVHJCLEFBU3FCO09BUnpCLEFBUXlCLElBUnJCLEFBUXFCO09BUHpCLEFBT3lCLEtBUHBCLEFBT29CO09BTnpCLEFBTXlCLEtBTnBCLEFBTW9CO09BTHpCLEFBS3lCLElBTHJCLEFBS3FCO09BSnpCLEFBSXlCLElBSnJC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TyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5cbnZhciBiZ19tb3VudGFpbiA9IG5ldyBJbWFnZSgpO1xuYmdfbW91bnRhaW4uc3JjID0gJy9hc3NldHMvYmctbW91bnRhaW4ucG5nJztcblxudmFyIGJnX2hpbGwgPSBuZXcgSW1hZ2UoKTtcbmJnX2hpbGwuc3JjID0gJy9hc3NldHMvYmctaGlsbC5wbmcnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0RFJVSURfUlVOOiBuZXcgU3ByaXRlKGRydWlkUnVuLCAwLCAwLCA0OCwgNDgsIDgpLFxuICAgIEJHX01PVU5UQUlOOiBuZXcgU3ByaXRlKGJnX21vdW50YWluLCAwLCAwLCAxNTM2LCA3NjcsIDEpLFxuICAgIEJHX0hJTEw6IG5ldyBTcHJpdGUoYmdfaGlsbCwgMCwgMCwgMTAyNCwgMzA2LCAxKVxufTsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcblx0eCA9IDA7XG5cdHkgPSAwO1xuXHRkeCA9IDA7XG5cdGR5ID0gMDtcblx0dyA9IDA7XG5cdGggPSAwO1xuXHRzcHJpdGUgPSBudWxsO1xuXHRhbmltYXRpb25GcmFtZUlkID0gMDtcblxuXHRjb25zdHJ1Y3Rvcih0eXBlLCBjb25maWcpe1xuXHRcdGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0XHR0aGlzLnR5cGUgPSB0eXBlICsgJyc7XG5cdFx0dGhpcy54ID0gY29uZmlnLnh8MDtcblx0XHR0aGlzLnkgPSBjb25maWcueXwwO1xuXHRcdHRoaXMuZHggPSBjb25maWcuZHh8MDtcblx0XHR0aGlzLmR5ID0gY29uZmlnLmR5fDA7XG5cdFx0dGhpcy5zcHJpdGUgPSBjb25maWcuc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMudyA9IHRoaXMuc3ByaXRlLnN3fDA7XG5cdFx0dGhpcy5oID0gdGhpcy5zcHJpdGUuc2h8MDtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSB8fCAhdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybiB7fTtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZUlkKTtcblx0fVxuXG5cdHJlbmRlcihmcmFtZUlkLCBjdHgpe1xuXHRcdGxldCBrZiA9IHRoaXMuZ2V0S2V5RnJhbWUoZnJhbWVJZCk7XG5cdFx0aWYgKCFrZiB8fCAha2YuaW1hZ2UpIHJldHVybjtcblx0XHRjdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgdGhpcy54LCB0aGlzLnksIGtmLnN3LCBrZi5zaCk7XG5cdH1cblxuXHR1cGRhdGUoZHQsIGR4LCBkeSl7XG5cdFx0dGhpcy5keCArPSBkdCAqIGR4O1xuXHRcdHRoaXMuZHkgKz0gZHQgKiBkeTtcblx0XHR0aGlzLnggICs9IGR0ICogdGhpcy5keDtcblx0XHR0aGlzLnkgICs9IGR0ICogdGhpcy5keTtcblx0fVxuXG59IiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBUZXJyYWluIGZyb20gJy4vdGVycmFpbic7XG5cbnV0aWxzLmluaXQoKTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBGUFMgID0gMjQ7XG5jb25zdCBTVEVQID0gMS9GUFM7XG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgUkFUSU8gID0gSEVJR0hUIC8gV0lEVEg7XG5cbmNsYXNzIEdhbWUge1xuXHRnYW1lUmVhZHkgPSBmYWxzZTtcblx0cGF1c2VkID0gZmFsc2U7XG5cdGRlYnVnICA9IGZhbHNlO1xuXG5cdG9uU2NyZWVuICA9IG51bGw7XG5cdG9mZlNjcmVlbiA9IG51bGw7XG5cdG9uU2NyZWVuQ3R4ICA9IG51bGw7XG5cdG9mZlNjcmVlbkN0eCA9IG51bGw7XG5cblx0bGF5ZXJzID0gW107XG5cdHBsYXllciA9IHt9O1xuXHRhc3NldHMgPSB7fTtcblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNYWluIEdhbWUgTG9vcFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0XG5cdGZyYW1lSWQgPSAwfDA7XG5cdHRwcmV2ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHR0ID0gdGhpcy50cHJldjtcblx0ZHQgPSAwO1xuXG5cdGZyYW1lKCkge1xuXHRcdHRoaXMudCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHR0aGlzLmR0ICs9IE1hdGgubWluKDEsICh0aGlzLnQgLSB0aGlzLnRwcmV2KSAvIDEwMDApO1xuXHRcdHdoaWxlKHRoaXMuZHQgPiBTVEVQKSB7XG5cdFx0XHR0aGlzLmZyYW1lSWQgPSAodGhpcy5mcmFtZUlkICsgMSl8MDtcblx0XHRcdHRoaXMuZHQgLT0gU1RFUDtcblx0XHRcdHRoaXMudXBkYXRlKFNURVApO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBTZXR1cFxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IFdJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IEhFSUdIVDtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eCAgICAgPSB0aGlzLm9mZlNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vblNjcmVlbi53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoe3g6IFdJRFRILzIsIHk6SEVJR0hULzJ9KTtcblx0XHR0aGlzLnBsYXllci5zZXRBbmltYXRpb24odGhpcy5mcmFtZUlkfDAsIHRoaXMuYXNzZXRzWydEUlVJRF9SVU4nXSlcblxuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC43NSwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSwgMykpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC45LCBbdGhpcy5hc3NldHNbJ0JHX0hJTEwnXV0sIDUpKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0fVxuXG5cdHN0YXJ0KCkge1xuXHRcdC8vIEJlZ2lucyB0aGUgbWFpbiBnYW1lIGxvb3Bcblx0XHR0aGlzLmZyYW1lSWQgPSAwO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gVXBkYXRlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHVwZGF0ZShkdCkge1xuXHRcdGxldCBkeCA9IC1NYXRoLmxvZyh0aGlzLmZyYW1lSWQpICogNzsgLy8gVGhlIHJhdGUgdGhhdCB0aGluZ3MgYXJlIHNjcm9sbGluZyBsZWZ0XG5cdFx0bGV0IGR5ID0gMDtcblxuXHRcdGNvbnNvbGUubG9nKGR4LCBkeSk7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnVwZGF0ZShkdCwgZHgsIGR5KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMnXG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLCBhc3NldHMpO1xuXG5cbiFmdW5jdGlvbiB3YWl0Rm9yQ29udGVudCgpe1xuXHQvLyBXYWl0IGZvciBjb250ZW50IHRvIGJlIHJldHJlaXZlZCBieSB0aGUgYnJvd3NlclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG5cdFx0Ly8gVE9ETy4uLlxuXHR9KTtcbn0oKVxuLnRoZW4oZ2FtZS5zdGFydCk7XG5cbmdhbWUuZGVidWcgPSB0cnVlO1xuZ2FtZS5zdGFydCgpOyIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuXHRjb25zdHJ1Y3Rvcihjb25maWcpe1xuXHRcdGxldCB0eXBlID0gJ3BsYXllcic7XG5cdFx0c3VwZXIodHlwZSwgY29uZmlnKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IDA7XG5cdFx0ZHkgPSAwO1xuXHRcdHN1cGVyLnVwZGF0ZShkdCwgZHgsIGR5KTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XG5cdGtleUZyYW1lcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yIChpbWFnZSwgc3gsIHN5LCBzdywgc2gsIG51bUtleUZyYW1lcykge1xuXHRcdHRoaXMuaW1hZ2UgPSBpbWFnZTtcblx0XHR0aGlzLnN4ID0gc3h8MDtcblx0XHR0aGlzLnN5ID0gc3l8MDtcblx0XHR0aGlzLnN3ID0gc3d8MDtcblx0XHR0aGlzLnNoID0gc2h8MDtcblx0XHR0aGlzLm51bUtleUZyYW1lcyA9IE1hdGgubWF4KG51bUtleUZyYW1lc3wwLCAxKTtcblxuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMubnVtS2V5RnJhbWVzOyArK2kpe1xuXHRcdFx0bGV0IGtleUZyYW1lID0ge1xuXHRcdFx0XHRpbWFnZTogdGhpcy5pbWFnZSxcblx0XHRcdFx0c3g6IHRoaXMuc3ggKyB0aGlzLnN3ICogaSxcblx0XHRcdFx0c3k6IHRoaXMuc3ksXG5cdFx0XHRcdHN3OiB0aGlzLnN3LFxuXHRcdFx0XHRzaDogdGhpcy5zaFxuXHRcdFx0fTtcblx0XHRcdHRoaXMua2V5RnJhbWVzLnB1c2goa2V5RnJhbWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0cmV0dXJuIHRoaXMua2V5RnJhbWVzW2ZyYW1lSWQgJSB0aGlzLm51bUtleUZyYW1lc107XG5cdH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVycmFpbiB7XG5cblx0ZGVuc2l0eSA9IDU7XG5cdHlPZmZzZXQgPSAwO1xuXHR6RmFjdG9yID0gMTsgLy8gU2ltdWxhdGVzIGRpc3RhbmNlLCByZWR1Y2luZyB0aGUgYXBhcmVudCBtb3ZlbWVudCBvZiBvYmplY3RzIHRoYXQgYXJlIGZ1cnRoZXIgYXdheSAoMCBmb3Igbm8gbW92ZW1lbnQpXG5cdGVudGl0aWVzID0gW107XG5cdHNwcml0ZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3Rvcih6RmFjdG9yLCBzcHJpdGVzLCBkZW5zaXR5LCB5T2Zmc2V0KXtcblx0XHR0aGlzLnpGYWN0b3IgPSB6RmFjdG9yO1xuXHRcdHRoaXMuc3ByaXRlcyA9IHNwcml0ZXMgfHwgW107XG5cdFx0dGhpcy5kZW5zaXR5ID0gZGVuc2l0eXwwIHx8IHRoaXMuZGVuc2l0eTtcblx0XHR0aGlzLnlPZmZzZXQgPSB5T2Zmc2V0fDA7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHRcdHRoaXMuZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5KSA9PiBlbnRpdHkueCAtPSAxLjUqV0lEVEgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHR3aGlsZSh0aGlzLmVudGl0aWVzLmxlbmd0aCA8IHRoaXMuZGVuc2l0eSAmJiB0aGlzLnNwcml0ZXMubGVuZ3RoKXtcblx0XHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRcdGxldCB4ID0gV0lEVEggKyBXSURUSCAqIE1hdGgucmFuZG9tKCk7XG5cdFx0XHRsZXQgeSA9IEhFSUdIVCAtIHRoaXMueU9mZnNldCAtIHNwcml0ZS5zaDtcblxuXHRcdFx0bGV0IGVudGl0eSA9IG5ldyBFbnRpdHkoJ3RlcnJhaW4nLCB7eDogeCwgeTogeSwgc3ByaXRlOiBzcHJpdGV9KVxuXHRcdFx0dGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG5cdFx0fVxuXHR9XG5cblx0Z2FyYmFnZUNvbGxlY3Rpb24oKXtcblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLmVudGl0aWVzLmxlbmd0aDsgKytpKXtcblx0XHRcdGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldO1xuXHRcdFx0aWYgKGVudGl0eS54ICsgZW50aXR5LncgPCAwKXtcblx0XHRcdFx0dGhpcy5lbnRpdGllcy5zcGxpY2UoaS0tLDEpO1xuXHRcdFx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpe1xuXG5cdFx0Ly8gVXBkYXRlIHBvc2l0aW9uc1xuXHRcdGR0ID0gZHQgKiB0aGlzLnpGYWN0b3I7XG5cdFx0c2NlbmVEeCA9IHNjZW5lRHggKiB0aGlzLnpGYWN0b3I7XG5cdFx0c2NlbmVEeSA9IHNjZW5lRHkgKiB0aGlzLnpGYWN0b3I7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS51cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpKVxuXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
