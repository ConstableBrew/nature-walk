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

		this.layers.push(new _terrain2.default(0.1, [this.assets['BG_MOUNTAIN']]));
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
				var sprite = this.sprites[Math.random() * this.sprites.length];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3BsYXllci5qcyIsInNyYy9zcHJpdGUuanMiLCJzcmMvdGVycmFpbi5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQUVBLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztBQUVmLElBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJO0FBQ3RCLFlBQUEsQUFBWSxNQUFaLEFBQWtCOztBQUVsQixJQUFJLFVBQVUsSUFBZCxBQUFjLEFBQUk7QUFDbEIsUUFBQSxBQUFRLE1BQVIsQUFBYzs7O2NBSUYscUJBQUEsQUFBVyxVQUFYLEFBQXFCLEdBQXJCLEFBQXdCLEdBQXhCLEFBQTJCLElBQTNCLEFBQStCLElBRDVCLEFBQ0gsQUFBbUMsQUFDM0M7Z0JBQWEscUJBQUEsQUFBVyxhQUFYLEFBQXdCLEdBQXhCLEFBQTJCLEdBQTNCLEFBQThCLE1BQTlCLEFBQW9DLEtBRnRDLEFBRUUsQUFBeUMsQUFDdEQ7WUFBUyxxQkFBQSxBQUFXLFNBQVgsQUFBb0IsR0FBcEIsQUFBdUIsR0FBdkIsQUFBMEIsTUFBMUIsQUFBZ0MsSyxBQUg5QixBQUdGLEFBQXFDO0FBSG5DLEFBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRDs7Ozs7Ozs7Ozs7Ozs7SSxBQUVxQixxQkFVcEI7aUJBQUEsQUFBWSxNQUFaLEFBQWtCLFFBQU87d0JBQUE7O09BVHpCLEFBU3lCLElBVHJCLEFBU3FCO09BUnpCLEFBUXlCLElBUnJCLEFBUXFCO09BUHpCLEFBT3lCLEtBUHBCLEFBT29CO09BTnpCLEFBTXlCLEtBTnBCLEFBTW9CO09BTHpCLEFBS3lCLElBTHJCLEFBS3FCO09BSnpCLEFBSXlCLElBSnJC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O0FBRUQ7O1VBQUEsQUFBUyxtQkFBVCxBQUE2QixHQUE3QixBQUFnQyxHQUFoQyxBQUFtQyxHQUFuQyxBQUFzQyxHQUFHLEFBQ3hDO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBRUw7O09BQUssSUFBTCxBQUFPLEFBQ1A7TUFBSSxJQUFKLEFBQVEsR0FBRyxPQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFKLEFBQU0sSUFBZixBQUFPLEFBQVksQUFDOUI7SUFBQSxBQUFFLEFBQ0Y7U0FBTyxFQUFFLENBQUEsQUFBQyxJQUFELEFBQUcsS0FBSyxLQUFHLElBQUgsQUFBSyxLQUFiLEFBQWtCLEtBQTNCLEFBQU8sQUFBeUIsQUFDaEM7QUFFRDs7O2VBQU8sQUFDTyxBQUNiO21CQUZNLEFBRVcsQUFDakI7b0JBSE0sQUFHWSxBQUNsQjtzQkFKRCxBQUFPLEFBSWMsQUFFckI7QUFOTyxBQUNOOzs7QUFPSyxJQUFJLG9DQUFKO0FBQ0EsSUFBSSw0Q0FBSjtBQUNBLElBQUksOENBQUo7QUFDQSxJQUFJLGtEQUFKOztBQUVBLFNBQUEsQUFBUyxPQUFNLEFBQ3JCO0tBQUksV0FBSixBQUFlLEFBQ2Y7U0FQVSxBQU9WLDRCQUFjLFNBQWQsQUFBdUIsQUFDdkI7U0FQVSxBQU9WLG9DQUFrQixTQUFsQixBQUEyQixBQUMzQjtTQVBVLEFBT1Ysc0NBQW1CLFNBQW5CLEFBQTRCLEFBQzVCO1NBUFUsQUFPViwwQ0FBcUIsU0FBckIsQUFBOEIsQUFDOUI7UUFBQSxBQUFPLEFBQ1AiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XG5cbnZhciBkcnVpZFJ1biA9IG5ldyBJbWFnZSgpO1xuZHJ1aWRSdW4uc3JjID0gJy9hc3NldHMvcnVuLWN5Y2xlLXRlc3QucG5nJztcblxudmFyIGJnX21vdW50YWluID0gbmV3IEltYWdlKCk7XG5iZ19tb3VudGFpbi5zcmMgPSAnL2Fzc2V0cy9iZy1tb3VudGFpbi5wbmcnO1xuXG52YXIgYmdfaGlsbCA9IG5ldyBJbWFnZSgpO1xuYmdfaGlsbC5zcmMgPSAnL2Fzc2V0cy9iZy1oaWxsLnBuZyc7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHREUlVJRF9SVU46IG5ldyBTcHJpdGUoZHJ1aWRSdW4sIDAsIDAsIDQ4LCA0OCwgOCksXG4gICAgQkdfTU9VTlRBSU46IG5ldyBTcHJpdGUoYmdfbW91bnRhaW4sIDAsIDAsIDE1MzYsIDc2NywgMSksXG4gICAgQkdfSElMTDogbmV3IFNwcml0ZShiZ19oaWxsLCAwLCAwLCAxMDI0LCAzMDYsIDEpXG59OyIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuXHR4ID0gMDtcblx0eSA9IDA7XG5cdGR4ID0gMDtcblx0ZHkgPSAwO1xuXHR3ID0gMDtcblx0aCA9IDA7XG5cdHNwcml0ZSA9IG51bGw7XG5cdGFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGUsIGNvbmZpZyl7XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHRcdHRoaXMudHlwZSA9IHR5cGUgKyAnJztcblx0XHR0aGlzLnggPSBjb25maWcueHwwO1xuXHRcdHRoaXMueSA9IGNvbmZpZy55fDA7XG5cdFx0dGhpcy5keCA9IGNvbmZpZy5keHwwO1xuXHRcdHRoaXMuZHkgPSBjb25maWcuZHl8MDtcblx0XHR0aGlzLnNwcml0ZSA9IGNvbmZpZy5zcHJpdGUgfHwge307XG5cdFx0dGhpcy53ID0gdGhpcy5zcHJpdGUuc3d8MDtcblx0XHR0aGlzLmggPSB0aGlzLnNwcml0ZS5zaHwwO1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cdH1cblxuXHRzZXRBbmltYXRpb24oZnJhbWVJZCwgc3ByaXRlKXtcblx0XHR0aGlzLnNwcml0ZSA9IHNwcml0ZSB8fCB7fTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSBmcmFtZUlkfDA7XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRpZiAoIXRoaXMuc3ByaXRlIHx8ICF0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuIHt9O1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0bGV0IGtmID0gdGhpcy5nZXRLZXlGcmFtZShmcmFtZUlkKTtcblx0XHRpZiAoIWtmIHx8ICFrZi5pbWFnZSkgcmV0dXJuO1xuXHRcdGN0eC5kcmF3SW1hZ2Uoa2YuaW1hZ2UsIGtmLnN4LCBrZi5zeSwga2Yuc3csIGtmLnNoLCB0aGlzLngsIHRoaXMueSwga2Yuc3csIGtmLnNoKTtcblx0fVxuXG5cdHVwZGF0ZShkdCwgZHgsIGR5KXtcblx0XHR0aGlzLmR4ICs9IGR0ICogZHg7XG5cdFx0dGhpcy5keSArPSBkdCAqIGR5O1xuXHRcdHRoaXMueCAgKz0gZHQgKiB0aGlzLmR4O1xuXHRcdHRoaXMueSAgKz0gZHQgKiB0aGlzLmR5O1xuXG5cdFx0Y29uc29sZS5sb2codGhpcy50eXBlLCB0aGlzLngsIHRoaXMueSk7XG5cdH1cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgVGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xuXG51dGlscy5pbml0KCk7XG5cbi8vIFRPRE86IE1vdmUgdGhlc2UgdG8gc29tZSBjb25maWcgZmlsZVxuY29uc3QgRlBTICA9IDI0O1xuY29uc3QgU1RFUCA9IDEvRlBTO1xuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdGxheWVycyA9IFtdO1xuXHRwbGF5ZXIgPSB7fTtcblx0YXNzZXRzID0ge307XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWFpbiBHYW1lIExvb3Bcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFxuXHRmcmFtZUlkID0gMHwwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHR0aGlzLnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5kdCArPSBNYXRoLm1pbigxLCAodGhpcy50IC0gdGhpcy50cHJldikgLyAxMDAwKTtcblx0XHR3aGlsZSh0aGlzLmR0ID4gU1RFUCkge1xuXHRcdFx0dGhpcy5mcmFtZUlkID0gKHRoaXMuZnJhbWVJZCArIDEpfDA7XG5cdFx0XHR0aGlzLmR0IC09IFNURVA7XG5cdFx0XHR0aGlzLnVwZGF0ZShTVEVQKTtcblx0XHR9XG5cdFx0dGhpcy50cHJldiA9IHRoaXMudDtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFxuXHRcdGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gU2V0dXBcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0Y29uc3RydWN0b3IoY2FudmFzLCBhc3NldHMpe1xuXHRcdHRoaXMub25TY3JlZW4gID0gY2FudmFzO1xuXHRcdHRoaXMub2ZmU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHR0aGlzLm9mZlNjcmVlbi53aWR0aCAgPSBXSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBIRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIFJBVElPICogd2luZG93LmlubmVyV2lkdGgpO1xuXHRcdHRoaXMub25TY3JlZW5DdHggICAgID0gdGhpcy5vblNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub25TY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkICA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hc3NldHMgPSBhc3NldHM7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHt4OiBXSURUSC8yLCB5OkhFSUdIVC8yfSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0QW5pbWF0aW9uKHRoaXMuZnJhbWVJZHwwLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cdFx0XG5cdFx0dGhpcy5sYXllcnMucHVzaChuZXcgVGVycmFpbigwLjEsIFt0aGlzLmFzc2V0c1snQkdfTU9VTlRBSU4nXV0pKTtcblx0XHR0aGlzLmxheWVycy5wdXNoKHRoaXMucGxheWVyKTtcblx0fVxuXG5cdHN0YXJ0KCkge1xuXHRcdC8vIEJlZ2lucyB0aGUgbWFpbiBnYW1lIGxvb3Bcblx0XHR0aGlzLmZyYW1lSWQgPSAwO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lLmJpbmQodGhpcyksIHRoaXMub25TY3JlZW4pO1xuXHR9XG5cblxuXG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gVXBkYXRlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHVwZGF0ZShkdCkge1xuXHRcdGxldCBkeCA9IC1NYXRoLmxvZyh0aGlzLmZyYW1lSWQpICogNzsgLy8gVGhlIHJhdGUgdGhhdCB0aGluZ3MgYXJlIHNjcm9sbGluZyBsZWZ0XG5cdFx0bGV0IGR5ID0gMDtcblx0XHR0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4gbGF5ZXIudXBkYXRlKGR0LCBkeCwgZHkpKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHRsZXQgdyA9IGN2cy53aWR0aCAqIHNjYWxlO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodCAqIHNjYWxlO1xuXHRcdGxldCB4ID0gMDtcblx0XHRsZXQgeSA9ICh0aGlzLm9mZlNjcmVlbi5oZWlnaHQgLSBoKSAvIDI7XG5cblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGN2cy53aWR0aCwgY3ZzLmhlaWdodCk7XG5cblx0XHR0aGlzLnJlbmRlckxheWVycygpO1xuXG5cblx0XHRpZiAodGhpcy5kZWJ1Zykge1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuNzUpJztcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCAzMDAsIGN2cy5oZWlnaHQpO1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9ICdnb2xkJztcblx0XHRcdGxldCBmb250U2l6ZSA9IDMyO1xuXHRcdFx0bGV0IGxpbmVIZWlnaHQgPSBmb250U2l6ZSAqIDEuMzM7XG5cdFx0XHRsZXQgbGluZVBvcyA9IHk7XG5cdFx0XHRjdHguZm9udCA9IGZvbnRTaXplICsgJ3B4IHNhbnMtc2VyaWYnO1xuXHRcdFx0Y3R4LmZpbGxUZXh0KCdmcmFtZUlkOiAnICsgdGhpcy5mcmFtZUlkLCAwLCBsaW5lUG9zICs9IGxpbmVIZWlnaHQpO1xuXHRcdH1cblxuXHRcdHRoaXMub25TY3JlZW5DdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0KTs7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5kcmF3SW1hZ2UoXG5cdFx0XHRjdnMsXG5cdFx0XHR4LCB5LCB3LCBoLFxuXHRcdFx0MCwgMCwgdGhpcy5vblNjcmVlbi53aWR0aCwgdGhpcy5vblNjcmVlbi5oZWlnaHRcblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyTGF5ZXJzKCl7XG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IGxheWVyLnJlbmRlcih0aGlzLmZyYW1lSWQsIHRoaXMub2ZmU2NyZWVuQ3R4KSk7XG5cdH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5cblxuIWZ1bmN0aW9uIHdhaXRGb3JDb250ZW50KCl7XG5cdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcblx0XHQvLyBUT0RPLi4uXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIEVudGl0eSB7XG5cdGNvbnN0cnVjdG9yKGNvbmZpZyl7XG5cdFx0bGV0IHR5cGUgPSAncGxheWVyJztcblx0XHRzdXBlcih0eXBlLCBjb25maWcpO1xuXHR9XG5cblx0dXBkYXRlKGR0LCBkeCwgZHkpe1xuXHRcdGR4ID0gMDtcblx0XHRkeSA9IDA7XG5cdFx0c3VwZXIudXBkYXRlKGR0LCBkeCwgZHkpO1xuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBzb21lIGNvbmZpZyBmaWxlXG5jb25zdCBXSURUSCAgPSAxMDI0OyAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IEhFSUdIVCA9IDc2ODsgIC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJyYWluIHtcblxuXHRkZW5zaXR5ID0gNTtcblx0ekZhY3RvciA9IDAuMTsgLy8gU2ltdWxhdGVzIGRpc3RhbmNlLCByZWR1Y2luZyB0aGUgYXBhcmVudCBtb3ZlbWVudCBvZiBvYmplY3RzIHRoYXQgYXJlIGZ1cnRoZXIgYXdheSAoMCBmb3Igbm8gbW92ZW1lbnQpXG5cdGVudGl0aWVzID0gW107XG5cdHNwcml0ZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3Rvcih6RmFjdG9yLCBzcHJpdGVzLCBkZW5zaXR5KXtcblx0XHR0aGlzLnpGYWN0b3IgPSB6RmFjdG9yO1xuXHRcdHRoaXMuc3ByaXRlcyA9IHNwcml0ZXMgfHwgW107XG5cdFx0dGhpcy5kZW5zaXR5ID0gZGVuc2l0eXwwIHx8IHRoaXMuZGVuc2l0eTtcblx0XHR0aGlzLmdlbmVyYXRlKCk7XG5cdH1cblxuXHRnZW5lcmF0ZSgpe1xuXHRcdHdoaWxlKHRoaXMuZW50aXRpZXMubGVuZ3RoIDwgdGhpcy5kZW5zaXR5ICYmIHRoaXMuc3ByaXRlcy5sZW5ndGgpe1xuXHRcdFx0bGV0IHNwcml0ZSA9IHRoaXMuc3ByaXRlc1tNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aF07XG5cdFx0XHRsZXQgeCA9IFdJRFRIICsgV0lEVEggKiBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0bGV0IHkgPSBIRUlHSFQgLSBzcHJpdGUuc2g7XG5cblx0XHRcdGNvbnNvbGUubG9nKCdHZW5lcmF0aW5nIHRlcnJhaW4nLCB4LCB5LCB0aGlzLnpGYWN0b3IpO1xuXG5cdFx0XHRsZXQgZW50aXR5ID0gbmV3IEVudGl0eSgndGVycmFpbicsIHt4OiB4LCB5OiB5LCBzcHJpdGU6IHNwcml0ZX0pXG5cdFx0XHR0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcblx0XHR9XG5cdH1cblxuXHRnYXJiYWdlQ29sbGVjdGlvbigpe1xuXHRcdGZvcihsZXQgaT0wOyBpPHRoaXMuZW50aXRpZXMubGVuZ3RoOyArK2kpe1xuXHRcdFx0bGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV07XG5cdFx0XHRpZiAoZW50aXR5LnggKyBlbnRpdHkudyA8IDApe1xuXHRcdFx0XHR0aGlzLmVudGl0aWVzLnNwbGljZShpLS0sMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKGZyYW1lSWQsIGN0eCl7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS5yZW5kZXIoZnJhbWVJZCwgY3R4KSk7XG5cdH1cblxuXHR1cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpe1xuXG5cdFx0Ly8gVXBkYXRlIHBvc2l0aW9uc1xuXHRcdGR0ID0gZHQgKiB0aGlzLnpGYWN0b3I7XG5cdFx0c2NlbmVEeCA9IHNjZW5lRHggKiB0aGlzLnpGYWN0b3I7XG5cdFx0c2NlbmVEeSA9IHNjZW5lRHkgKiB0aGlzLnpGYWN0b3I7XG5cdFx0dGhpcy5lbnRpdGllcy5mb3JFYWNoKChlbnRpdHkpID0+IGVudGl0eS51cGRhdGUoZHQsIHNjZW5lRHgsIHNjZW5lRHkpKVxuXG5cdFx0dGhpcy5nYXJiYWdlQ29sbGVjdGlvbigpO1xuXHRcdHRoaXMuZ2VuZXJhdGUoKTtcblx0fVxufSIsImZ1bmN0aW9uIGFzbSgpe1xuXHQndXNlIGFzbSc7XG5cdC8vIHQ6IGN1cnJlbnQgdGltZVxuXHQvLyBiOiBzdGFydCB2YWx1ZVxuXHQvLyBjOiBjaGFuZ2UgaW4gdmFsdWVcblx0Ly8gZDogZHVyYWl0b25cblxuXHRmdW5jdGlvbiBsaW5lYXJUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHJldHVybiArKGMqdC9kICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5RdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKGMqdCp0ICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKygtYyp0Kih0LTIpICsgYik7XG5cdH1cblxuXHRmdW5jdGlvbiBlYXNlSW5PdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0IC89IGQvMjtcblx0XHRpZiAodCA8IDEpIHJldHVybiArKGMvMip0KnQgKyBiKTtcblx0XHQtLXQ7XG5cdFx0cmV0dXJuICsoLWMvMiAqICh0Kih0LTIpIC0gMSkgKyBiKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGluZWFyVHdlZW46IGxpbmVhclR3ZWVuLFxuXHRcdGVhc2VJblF1YWRUd2VlbjogZWFzZUluUXVhZFR3ZWVuLFxuXHRcdGVhc2VPdXRRdWFkVHdlZW46IGVhc2VPdXRRdWFkVHdlZW4sXG5cdFx0ZWFzZUluT3V0UXVhZFR3ZWVuOiBlYXNlSW5PdXRRdWFkVHdlZW5cblx0fVxufVxuXG5leHBvcnQgdmFyIGxpbmVhclR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5RdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VPdXRRdWFkVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJbk91dFF1YWRUd2VlbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKXtcblx0dmFyIGV4cG9ydGVkID0gYXNtKCk7XG5cdGxpbmVhclR3ZWVuID0gZXhwb3J0ZWQubGluZWFyVHdlZW47XG5cdGVhc2VJblF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJblF1YWRUd2Vlbjtcblx0ZWFzZU91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VPdXRRdWFkVHdlZW47XG5cdGVhc2VJbk91dFF1YWRUd2VlbiA9IGV4cG9ydGVkLmVhc2VJbk91dFF1YWRUd2Vlbjtcblx0cmV0dXJuIGV4cG9ydGVkO1xufTtcbiJdfQ==
