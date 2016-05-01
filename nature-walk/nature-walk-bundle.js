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

			console.log(this.type, this.x, this.y);
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

		this.layers.push(new _terrain2.default(0.5, [this.assets['BG_MOUNTAIN']]));
		this.layers.push(new _terrain2.default(0.75, [this.assets['BG_HILL']]));
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

	function Terrain(zFactor, sprites, density) {
		_classCallCheck(this, Terrain);

		this.density = 5;
		this.zFactor = 0.1;
		this.entities = [];
		this.sprites = [];

		this.zFactor = zFactor;
		this.sprites = sprites || [];
		this.density = density | 0 || this.density;
		this.generate();
	}

	_createClass(Terrain, [{
		key: 'generate',
		value: function generate() {
			while (this.entities.length < this.density && this.sprites.length) {
				var sprite = this.sprites[Math.random() * this.sprites.length | 0];
				var x = WIDTH + WIDTH * Math.random();
				var y = HEIGHT - sprite.sh;

				console.log('Generating terrain', x, y, this.zFactor);

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
			this.generate();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3BsYXllci5qcyIsInNyYy9zcHJpdGUuanMiLCJzcmMvdGVycmFpbi5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQUVBLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJO0FBQ3RCLFlBQUEsQUFBWSxNQUFaLEFBQWtCOztBQUVsQixJQUFJLFVBQVUsSUFBZCxBQUFjLEFBQUk7QUFDbEIsUUFBQSxBQUFRLE1BQVIsQUFBYzs7O2NBSUYscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRDVCLEFBQ0gsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBRnRDLEFBRUUsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsSyxBQUg5QixBQUdGLEFBQXFDO0FBSG5DLEFBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRDs7Ozs7Ozs7Ozs7Ozs7SSxBQUVxQixxQkFVcEI7aUJBQUEsQUFBWSxNQUFaLEFBQWtCLFFBQU87d0JBQUE7O09BVHpCLEFBU3lCLElBVHJCLEFBU3FCO09BUnpCLEFBUXlCLElBUnJCLEFBUXFCO09BUHpCLEFBT3lCLEtBUHBCLEFBT29CO09BTnpCLEFBTXlCLEtBTnBCLEFBTW9CO09BTHpCLEFBS3lCLElBTHJCLEFBS3FCO09BSnpCLEFBSXlCLElBSnJC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Q0FBSixBQUFLLEFBRUw7O01BQUksSUFBSixBQUFNLEFBQ047U0FBTyxFQUFFLENBQUEsQUFBQyxJQUFELEFBQUcsS0FBRyxJQUFOLEFBQVEsS0FBakIsQUFBTyxBQUFlLEFBQ3RCO0FBRUQ7O1VBQUEsQUFBUyxtQkFBVCxBQUE2QixHQUE3QixBQUFnQyxHQUFoQyxBQUFtQyxHQUFuQyxBQUFzQyxHQUFHLEFBQ3hDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O09BQUssSUFBTCxBQUFPLEFBQ1A7TUFBSSxJQUFKLEFBQVEsR0FBRyxPQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFKLEFBQU0sSUFBZixBQUFPLEFBQVksQUFDOUI7SUFBQSxBQUFFLEFBQ0Y7U0FBTyxFQUFFLENBQUEsQUFBQyxJQUFELEFBQUcsS0FBSyxLQUFHLElBQUgsQUFBSyxLQUFiLEFBQWtCLEtBQTNCLEFBQU8sQUFBeUIsQUFDaEM7QUFFRDs7O2VBQU8sQUFDTyxBQUNiO21CQUZNLEFBRVcsQUFDakI7b0JBSE0sQUFHWSxBQUNsQjtzQkFKRCxBQUFPLEFBSWMsQUFFckI7QUFOTyxBQUNOOzs7QUFPSyxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVBLFNBQUEsQUFBUyxPQUFNLEFBQ3JCO0tBQUksV0FBSixBQUFlLEFBQ2Y7U0FQVSxBQU9WLDRCQUFjLFNBQWQsQUFBdUIsQUFDdkI7U0FQVSxBQU9WLG9DQUFrQixTQUFsQixBQUEyQixBQUMzQjtTQVBVLEFBT1Ysc0NBQW1CLFNBQW5CLEFBQTRCLEFBQzVCO1NBUFUsQUFPViwwQ0FBcUIsU0FBckIsQUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1AiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpXG59OyIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuXHR4ID0gMDtcblx0eSA9IDA7XG5cdGR4ID0gMDtcblx0ZHkgPSAwO1xuXHR3ID0gMDtcblx0aCA9IDA7XG5cdHNwcml0ZSA9IG51bGw7XG5cdGFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGUsIGNvbmZpZyl7XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHRcdHRoaXMudHlwZSA9IHR5cGUgKyAnJztcblx0XHR0aGlzLnggPSBjb25maWcueHwwO1xuXHRcdHRoaXMueSA9IGNvbmZpZy55fDA7XG5cdFx0dGhpcy5keCA9IGNvbmZpZy5keHwwO1xuXHRcdHRoaXMuZHkgPSBjb25maWcuZHl8MDtcblx0XHR0aGlzLnNwcml0ZSA9IGNvbmZpZy5zcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuIHt9O1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwga2Yuc3csIGtmLnNoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHR0aGlzLmR4ICs9IGR0ICogZHg7XG5cdFx0dGhpcy5keSArPSBkdCAqIGR5O1xuXHRcdHRoaXMueCAgKz0gZHQgKiB0aGlzLmR4O1xuXHRcdHRoaXMueSAgKz0gZHQgKiB0aGlzLmR5O1xuXG5cdFx0Y29uc29sZS5sb2codGhpcy50eXBlLCB0aGlzLngsIHRoaXMueSk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuXG51dGlscy5pbml0KCk7XG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgRlBTICA9IDI0O1xuY29uc3QgU1RFUCA9IDEvRlBTO1xuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdGxheWVycyA9IFtdO1xuXHRwbGF5ZXIgPSB7fTtcblx0YXNzZXRzID0ge307XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWFpbiBHYW1lIExvb3Bcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFxuXHRmcmFtZUlkID0gMHwwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHR0aGlzLnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5kdCArPSBNYXRoLm1pbigxLCAodGhpcy50IC0gdGhpcy50cHJldikgLyAxMDAwKTtcblx0XHR3aGlsZSh0aGlzLmR0ID4gU1RFUCkge1xuXHRcdFx0dGhpcy5mcmFtZUlkID0gKHRoaXMuZnJhbWVJZCArIDEpfDA7XG5cdFx0XHR0aGlzLmR0IC09IFNURVA7XG5cdFx0XHR0aGlzLnVwZGF0ZShTVEVQKTtcblx0XHR9XG5cdFx0dGhpcy50cHJldiA9IHRoaXMudDtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFxuXHRcdGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gU2V0dXBcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0Y29uc3RydWN0b3IoY2FudmFzLCBhc3NldHMpe1xuXHRcdHRoaXMub25TY3JlZW4gID0gY2FudmFzO1xuXHRcdHRoaXMub2ZmU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHR0aGlzLm9mZlNjcmVlbi53aWR0aCAgPSBXSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBIRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIFJBVElPICogd2luZG93LmlubmVyV2lkdGgpO1xuXHRcdHRoaXMub25TY3JlZW5DdHggICAgID0gdGhpcy5vblNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub25TY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkICA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hc3NldHMgPSBhc3NldHM7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHt4OiBXSURUSC8yLCB5OkhFSUdIVC8yfSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0QW5pbWF0aW9uKHRoaXMuZnJhbWVJZHwwLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cblx0XHR0aGlzLmxheWVycy5wdXNoKG5ldyBUZXJyYWluKDAuNSwgW3RoaXMuYXNzZXRzWydCR19NT1VOVEFJTiddXSkpO1xuXHRcdHRoaXMubGF5ZXJzLnB1c2gobmV3IFRlcnJhaW4oMC43NSwgW3RoaXMuYXNzZXRzWydCR19ISUxMJ11dKSk7XG5cdFx0dGhpcy5sYXllcnMucHVzaCh0aGlzLnBsYXllcik7XG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0dGhpcy5mcmFtZUlkID0gMDtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFVwZGF0ZVxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHR1cGRhdGUoZHQpIHtcblx0XHRsZXQgZHggPSAtTWF0aC5sb2codGhpcy5mcmFtZUlkKSAqIDc7IC8vIFRoZSByYXRlIHRoYXQgdGhpbmdzIGFyZSBzY3JvbGxpbmcgbGVmdFxuXHRcdGxldCBkeSA9IDA7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnVwZGF0ZShkdCwgZHgsIGR5KSk7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJMYXllcnMoKTtcblxuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxheWVycygpe1xuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiBsYXllci5yZW5kZXIodGhpcy5mcmFtZUlkLCB0aGlzLm9mZlNjcmVlbkN0eCkpO1xuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSdcbmltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldHMnXG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLCBhc3NldHMpO1xuXG5cbiFmdW5jdGlvbiB3YWl0Rm9yQ29udGVudCgpe1xuXHQvLyBXYWl0IGZvciBjb250ZW50IHRvIGJlIHJldHJlaXZlZCBieSB0aGUgYnJvd3NlclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG5cdFx0Ly8gVE9ETy4uLlxuXHR9KTtcbn0oKVxuLnRoZW4oZ2FtZS5zdGFydCk7XG5cbmdhbWUuZGVidWcgPSB0cnVlO1xuZ2FtZS5zdGFydCgpOyIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuXHRjb25zdHJ1Y3Rvcihjb25maWcpe1xuXHRcdGxldCB0eXBlID0gJ3BsYXllcic7XG5cdFx0c3VwZXIodHlwZSwgY29uZmlnKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHRkeCA9IDA7XG5cdFx0ZHkgPSAwO1xuXHRcdHN1cGVyLnVwZGF0ZShkdCwgZHgsIGR5KTtcblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XG5cdGtleUZyYW1lcyA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yIChpbWFnZSwgc3gsIHN5LCBzdywgc2gsIG51bUtleUZyYW1lcykge1xuXHRcdHRoaXMuaW1hZ2UgPSBpbWFnZTtcblx0XHR0aGlzLnN4ID0gc3h8MDtcblx0XHR0aGlzLnN5ID0gc3l8MDtcblx0XHR0aGlzLnN3ID0gc3d8MDtcblx0XHR0aGlzLnNoID0gc2h8MDtcblx0XHR0aGlzLm51bUtleUZyYW1lcyA9IE1hdGgubWF4KG51bUtleUZyYW1lc3wwLCAxKTtcblxuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMubnVtS2V5RnJhbWVzOyArK2kpe1xuXHRcdFx0bGV0IGtleUZyYW1lID0ge1xuXHRcdFx0XHRpbWFnZTogdGhpcy5pbWFnZSxcblx0XHRcdFx0c3g6IHRoaXMuc3ggKyB0aGlzLnN3ICogaSxcblx0XHRcdFx0c3k6IHRoaXMuc3ksXG5cdFx0XHRcdHN3OiB0aGlzLnN3LFxuXHRcdFx0XHRzaDogdGhpcy5zaFxuXHRcdFx0fTtcblx0XHRcdHRoaXMua2V5RnJhbWVzLnB1c2goa2V5RnJhbWUpO1xuXHRcdH1cblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdFx0cmV0dXJuIHRoaXMua2V5RnJhbWVzW2ZyYW1lSWQgJSB0aGlzLm51bUtleUZyYW1lc107XG5cdH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVycmFpbiB7XG5cblx0ZGVuc2l0eSA9IDU7XG5cdHpGYWN0b3IgPSAwLjE7IC8vIFNpbXVsYXRlcyBkaXN0YW5jZSwgcmVkdWNpbmcgdGhlIGFwYXJlbnQgbW92ZW1lbnQgb2Ygb2JqZWN0cyB0aGF0IGFyZSBmdXJ0aGVyIGF3YXkgKDAgZm9yIG5vIG1vdmVtZW50KVxuXHRlbnRpdGllcyA9IFtdO1xuXHRzcHJpdGVzID0gW107XG5cblx0Y29uc3RydWN0b3IoekZhY3Rvciwgc3ByaXRlcywgZGVuc2l0eSl7XG5cdFx0dGhpcy56RmFjdG9yID0gekZhY3Rvcjtcblx0XHR0aGlzLnNwcml0ZXMgPSBzcHJpdGVzIHx8IFtdO1xuXHRcdHRoaXMuZGVuc2l0eSA9IGRlbnNpdHl8MCB8fCB0aGlzLmRlbnNpdHk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG5cblx0Z2VuZXJhdGUoKXtcblx0XHR3aGlsZSh0aGlzLmVudGl0aWVzLmxlbmd0aCA8IHRoaXMuZGVuc2l0eSAmJiB0aGlzLnNwcml0ZXMubGVuZ3RoKXtcblx0XHRcdGxldCBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKXwwXTtcblx0XHRcdGxldCB4ID0gV0lEVEggKyBXSURUSCAqIE1hdGgucmFuZG9tKCk7XG5cdFx0XHRsZXQgeSA9IEhFSUdIVCAtIHNwcml0ZS5zaDtcblxuXHRcdFx0Y29uc29sZS5sb2coJ0dlbmVyYXRpbmcgdGVycmFpbicsIHgsIHksIHRoaXMuekZhY3Rvcik7XG5cblx0XHRcdGxldCBlbnRpdHkgPSBuZXcgRW50aXR5KCd0ZXJyYWluJywge3g6IHgsIHk6IHksIHNwcml0ZTogc3ByaXRlfSlcblx0XHRcdHRoaXMuZW50aXRpZXMucHVzaChlbnRpdHkpO1xuXHRcdH1cblx0fVxuXG5cdGdhcmJhZ2VDb2xsZWN0aW9uKCl7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5lbnRpdGllcy5sZW5ndGg7ICsraSl7XG5cdFx0XHRsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcblx0XHRcdGlmIChlbnRpdHkueCArIGVudGl0eS53IDwgMCl7XG5cdFx0XHRcdHRoaXMuZW50aXRpZXMuc3BsaWNlKGktLSwxKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoZnJhbWVJZCwgY3R4KXtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnJlbmRlcihmcmFtZUlkLCBjdHgpKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSl7XG5cblx0XHQvLyBVcGRhdGUgcG9zaXRpb25zXG5cdFx0ZHQgPSBkdCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR4ID0gc2NlbmVEeCAqIHRoaXMuekZhY3Rvcjtcblx0XHRzY2VuZUR5ID0gc2NlbmVEeSAqIHRoaXMuekZhY3Rvcjtcblx0XHR0aGlzLmVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4gZW50aXR5LnVwZGF0ZShkdCwgc2NlbmVEeCwgc2NlbmVEeSkpXG5cblx0XHR0aGlzLmdhcmJhZ2VDb2xsZWN0aW9uKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZSgpO1xuXHR9XG59IiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
