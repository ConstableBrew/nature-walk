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
exports.default = {
	DRUID_RUN: new _sprite2.default(druidRun, 0, 0, 48, 48, 8)
};

},{"./sprite":5}],2:[function(require,module,exports){
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
		this.sprite = null;
		this.animationFrameId = 0;

		config = config || {};
		this.type = type + '';
		this.x = config.x | 0;
		this.y = config.y | 0;
		this.dx = config.dx | 0;
		this.dy = config.dy | 0;
		this.sprite = config.sprite;
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
			if (!this.sprite && this.sprite.getKeyFrame) return {};

			return this.sprite.getKeyFrame(frameId - this.animationFrameId);
		}
	}]);

	return Entity;
}();

exports.default = Entity;

},{"./sprite":5}],3:[function(require,module,exports){
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

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

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

var FPS = 24;
var STEP = 1 / FPS;
var WIDTH = 1024; // Offscreen rendering size
var HEIGHT = 768; // Offscreen rendering size
var RATIO = HEIGHT / WIDTH;

var Game = function () {
	function Game(canvas, assets) {
		_classCallCheck(this, Game);

		this.gameReady = false;
		this.paused = false;
		this.debug = false;
		this.onScreen = null;
		this.offScreen = null;
		this.onScreenCtx = null;
		this.offScreenCtx = null;
		this.player = {};
		this.entities = [];
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
		this.player = new _entity2.default('player', { x: WIDTH / 2, y: HEIGHT / 2 });
		this.player.setAnimation(this.frameId | 0, this.assets['DRUID_RUN']);
	}

	_createClass(Game, [{
		key: 'start',
		value: function start() {
			// Begins the main game loop
			requestAnimationFrame(this.frame.bind(this), this.onScreen);
		}

		// ========================================================================
		// Main Game Loop
		// ========================================================================

	}, {
		key: 'frame',
		value: function frame() {
			this.t = window.performance.now();
			this.dt += Math.min(1, (this.t - this.tprev) / 1000);
			console.clear();
			while (this.dt > STEP) {
				console.log(this.dt, this.frameId);
				this.dt -= STEP;
				//this.update(STEP);
				this.frameId = this.frameId + 1 | 0;
			}
			this.tprev = this.t;
			this.render();

			if (this.paused) return;
			requestAnimationFrame(this.frame.bind(this), this.onScreen);
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

			this.renderPlayer();

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
		key: 'renderPlayer',
		value: function renderPlayer() {
			this.renderCreature(this.player);
		}
	}, {
		key: 'renderCreature',
		value: function renderCreature(entity) {
			var kf = entity.getKeyFrame(this.frameId);

			this.offScreenCtx.drawImage(kf.image, kf.sx, kf.sy, kf.sw, kf.sh, entity.x, entity.y, kf.sw, kf.sh);
		}
	}]);

	return Game;
}();

exports.default = Game;

},{"./entity":2,"./utils":6}],4:[function(require,module,exports){
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
	return new Promise(function (resolve, reject) {});
}().then(game.start);

game.debug = true;
game.start();

},{"./assets":1,"./game":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQUVBLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztZQUVILHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJLEFBRDVCLEFBQ0gsQUFBbUM7QUFEaEMsQUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xEOzs7Ozs7Ozs7Ozs7OztJLEFBRXFCLHFCQVFwQjtpQkFBQSxBQUFZLE1BQVosQUFBa0IsUUFBTzt3QkFBQTs7T0FQekIsQUFPeUIsSUFQckIsQUFPcUI7T0FOekIsQUFNeUIsSUFOckIsQUFNcUI7T0FMekIsQUFLeUIsS0FMcEIsQUFLb0I7T0FKekIsQUFJeUIsS0FKcEIsQUFJb0I7T0FIekIsQUFHeUIsU0FIaEIsQUFHZ0I7T0FGekIsQUFFeUIsbUJBRk4sQUFFTSxBQUN4Qjs7V0FBUyxVQUFULEFBQW1CLEFBQ25CO09BQUEsQUFBSyxPQUFPLE9BQVosQUFBbUIsQUFDbkI7T0FBQSxBQUFLLElBQUksT0FBQSxBQUFPLElBQWhCLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxJQUFJLE9BQUEsQUFBTyxJQUFoQixBQUFrQixBQUNsQjtPQUFBLEFBQUssS0FBSyxPQUFBLEFBQU8sS0FBakIsQUFBb0IsQUFDcEI7T0FBQSxBQUFLLEtBQUssT0FBQSxBQUFPLEtBQWpCLEFBQW9CLEFBQ3BCO09BQUEsQUFBSyxTQUFTLE9BQWQsQUFBcUIsQUFDckI7T0FBQSxBQUFLLG1CQUFMLEFBQXdCLEFBQ3hCOzs7OzsrQixBQUVZLFMsQUFBUyxRQUFPLEFBQzVCO1FBQUEsQUFBSyxTQUFTLFVBQWQsQUFBd0IsQUFDeEI7UUFBQSxBQUFLLG1CQUFtQixVQUF4QixBQUFnQyxBQUNoQzs7Ozs4QixBQUVXLFNBQVEsQUFDbkI7T0FBSSxDQUFDLEtBQUQsQUFBTSxVQUFVLEtBQUEsQUFBSyxPQUF6QixBQUFnQyxhQUFhLE9BQUEsQUFBTyxBQUVwRDs7VUFBTyxLQUFBLEFBQUssT0FBTCxBQUFZLFlBQVksVUFBVSxLQUF6QyxBQUFPLEFBQXVDLEFBQzlDOzs7Ozs7O2tCLEFBNUJtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZyQjs7SSxBQUFZOztBQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQUEsQUFBTTs7QUFFTixJQUFNLE1BQU4sQUFBYTtBQUNiLElBQU0sT0FBTyxJQUFiLEFBQWU7QUFDZixJQUFNLFEsQUFBTixBQUFlO0FBQ2YsSUFBTSxTLEFBQU4sQUFBZTtBQUNmLElBQU0sUUFBUyxTQUFmLEFBQXdCOztJLEFBRWxCLG1CQWNMO2VBQUEsQUFBWSxRQUFaLEFBQW9CLFFBQU87d0JBQUE7O09BYjNCLEFBYTJCLFlBYmYsQUFhZTtPQVozQixBQVkyQixTQVpsQixBQVlrQjtPQVgzQixBQVcyQixRQVhsQixBQVdrQjtPQVQzQixBQVMyQixXQVRmLEFBU2U7T0FSM0IsQUFRMkIsWUFSZixBQVFlO09BUDNCLEFBTzJCLGNBUFosQUFPWTtPQU4zQixBQU0yQixlQU5aLEFBTVk7T0FKM0IsQUFJMkIsU0FKbEIsQUFJa0I7T0FIM0IsQUFHMkIsV0FIaEIsQUFHZ0I7T0FGM0IsQUFFMkIsU0FGbEIsQUFFa0I7T0FBQSxBQTRCM0IsVUFBVSxJQTVCaUIsQUE0QmY7T0E1QmUsQUE2QjNCLFFBQVEsT0FBQSxBQUFPLFlBN0JZLEFBNkJuQixBQUFtQjtPQTdCQSxBQThCM0IsSUFBSSxLQTlCdUIsQUE4QmxCO09BOUJrQixBQStCM0IsS0EvQjJCLEFBQzFCLEFBOEJJOztPQTlCSixBQUFLLFdBQUwsQUFBaUIsQUFDakI7T0FBQSxBQUFLLFlBQVksU0FBQSxBQUFTLGNBQTFCLEFBQWlCLEFBQXVCLEFBRXhDOztPQUFBLEFBQUssVUFBTCxBQUFlLFFBQWYsQUFBd0IsQUFDeEI7T0FBQSxBQUFLLFVBQUwsQUFBZSxTQUFmLEFBQXdCLEFBQ3hCO09BQUEsQUFBSyxlQUFtQixLQUFBLEFBQUssVUFBTCxBQUFlLFdBQXZDLEFBQXdCLEFBQTBCLEFBQ2xEO09BQUEsQUFBSyxhQUFMLEFBQWtCLHdCQUFsQixBQUEwQyxBQUUxQzs7T0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFTLE9BQXZCLEFBQThCLEFBQzlCO09BQUEsQUFBSyxTQUFMLEFBQWMsU0FBUyxLQUFBLEFBQUssSUFBSSxPQUFULEFBQWdCLGFBQWEsUUFBUSxPQUE1RCxBQUF1QixBQUE0QyxBQUNuRTtPQUFBLEFBQUssY0FBa0IsS0FBQSxBQUFLLFNBQUwsQUFBYyxXQUFyQyxBQUF1QixBQUF5QixBQUNoRDtPQUFBLEFBQUssWUFBTCxBQUFpQix3QkFBakIsQUFBMEMsQUFFMUM7O09BQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDtPQUFBLEFBQUssU0FBUyxxQkFBQSxBQUFXLFVBQVUsRUFBQyxHQUFHLFFBQUosQUFBVSxHQUFHLEdBQUUsU0FBbEQsQUFBYyxBQUFxQixBQUFzQixBQUN6RDtPQUFBLEFBQUssT0FBTCxBQUFZLGFBQWEsS0FBQSxBQUFLLFVBQTlCLEFBQXNDLEdBQUcsS0FBQSxBQUFLLE9BQTlDLEFBQXlDLEFBQVksQUFDckQ7Ozs7OzBCQUVPLEFBRVA7O3lCQUFzQixLQUFBLEFBQUssTUFBTCxBQUFXLEtBQWpDLEFBQXNCLEFBQWdCLE9BQU8sS0FBN0MsQUFBa0QsQUFDbEQ7Ozs7Ozs7OzswQkFXTyxBQUNQO1FBQUEsQUFBSyxJQUFJLE9BQUEsQUFBTyxZQUFoQixBQUFTLEFBQW1CLEFBQzVCO1FBQUEsQUFBSyxNQUFNLEtBQUEsQUFBSyxJQUFMLEFBQVMsR0FBRyxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQVYsQUFBZSxTQUF0QyxBQUFXLEFBQW9DLEFBQy9DO1dBQUEsQUFBUSxBQUNSO1VBQU0sS0FBQSxBQUFLLEtBQVgsQUFBZ0IsTUFBTSxBQUNyQjtZQUFBLEFBQVEsSUFBSSxLQUFaLEFBQWlCLElBQUksS0FBckIsQUFBMEIsQUFDMUI7U0FBQSxBQUFLLE1BQUwsQUFBVyxBQUVYOztTQUFBLEFBQUssVUFBVyxLQUFBLEFBQUssVUFBTixBQUFnQixJQUEvQixBQUFrQyxBQUNsQztBQUNEO1FBQUEsQUFBSyxRQUFRLEtBQWIsQUFBa0IsQUFDbEI7UUFBQSxBQUFLLEFBRUw7O09BQUksS0FBSixBQUFTLFFBQVEsQUFDakI7eUJBQXNCLEtBQUEsQUFBSyxNQUFMLEFBQVcsS0FBakMsQUFBc0IsQUFBZ0IsT0FBTyxLQUE3QyxBQUFrRCxBQUNsRDs7Ozs7Ozs7OzJCQU9RLEFBQ1I7T0FBSSxNQUFNLEtBQVYsQUFBZSxBQUNmO09BQUksTUFBTSxLQUFWLEFBQWUsQUFFZjs7T0FBSSxRQUFRLEtBQUEsQUFBSyxJQUNoQixLQUFBLEFBQUssU0FBTCxBQUFjLFNBQU8sSUFEVixBQUNjLFFBQ3pCLEtBQUEsQUFBSyxTQUFMLEFBQWMsUUFBTSxJQUZyQixBQUFZLEFBRWEsQUFFekI7T0FBSSxJQUFJLElBQUEsQUFBSSxRQUFaLEFBQW9CLEFBQ3BCO09BQUksSUFBSSxJQUFBLEFBQUksU0FBWixBQUFxQixBQUNyQjtPQUFJLElBQUosQUFBUSxBQUNSO09BQUksSUFBSSxDQUFDLEtBQUEsQUFBSyxVQUFMLEFBQWUsU0FBaEIsQUFBeUIsS0FBakMsQUFBc0MsQUFFdEM7O09BQUEsQUFBSSxVQUFKLEFBQWMsR0FBZCxBQUFpQixHQUFHLElBQXBCLEFBQXdCLE9BQU8sSUFBL0IsQUFBbUMsQUFFbkM7O1FBQUEsQUFBSyxBQUVMOztPQUFJLEtBQUosQUFBUyxPQUFPLEFBQ2Y7UUFBQSxBQUFJLFlBQUosQUFBZ0IsQUFDaEI7UUFBQSxBQUFJLFNBQUosQUFBYSxHQUFiLEFBQWdCLEdBQWhCLEFBQW1CLEtBQUssSUFBeEIsQUFBNEIsQUFDNUI7UUFBQSxBQUFJLFlBQUosQUFBZ0IsQUFDaEI7UUFBSSxXQUFKLEFBQWUsQUFDZjtRQUFJLGFBQWEsV0FBakIsQUFBNEIsQUFDNUI7UUFBSSxVQUFKLEFBQWMsQUFDZDtRQUFBLEFBQUksT0FBTyxXQUFYLEFBQXNCLEFBQ3RCO1FBQUEsQUFBSSxTQUFTLGNBQWMsS0FBM0IsQUFBZ0MsU0FBaEMsQUFBeUMsR0FBRyxXQUE1QyxBQUF1RCxBQUN2RDtBQUVEOztRQUFBLEFBQUssWUFBTCxBQUFpQixVQUFqQixBQUEyQixHQUEzQixBQUE4QixHQUFHLEtBQUEsQUFBSyxTQUF0QyxBQUErQyxPQUFPLEtBQUEsQUFBSyxTQUEzRCxBQUFvRSxRQUFRLEFBQzVFO1FBQUEsQUFBSyxZQUFMLEFBQWlCLFVBQWpCLEFBQ0MsS0FERCxBQUVDLEdBRkQsQUFFSSxHQUZKLEFBRU8sR0FGUCxBQUVVLEdBRlYsQUFHQyxHQUhELEFBR0ksR0FBRyxLQUFBLEFBQUssU0FIWixBQUdxQixPQUFPLEtBQUEsQUFBSyxTQUhqQyxBQUcwQyxBQUUxQzs7OztpQ0FFYSxBQUNiO1FBQUEsQUFBSyxlQUFlLEtBQXBCLEFBQXlCLEFBQ3pCOzs7O2lDLEFBRWMsUUFBUSxBQUN0QjtPQUFJLEtBQUssT0FBQSxBQUFPLFlBQVksS0FBNUIsQUFBUyxBQUF3QixBQUVqQzs7UUFBQSxBQUFLLGFBQUwsQUFBa0IsVUFBVSxHQUE1QixBQUErQixPQUFPLEdBQXRDLEFBQXlDLElBQUksR0FBN0MsQUFBZ0QsSUFBSSxHQUFwRCxBQUF1RCxJQUFJLEdBQTNELEFBQThELElBQUksT0FBbEUsQUFBeUUsR0FBRyxPQUE1RSxBQUFtRixHQUFHLEdBQXRGLEFBQXlGLElBQUksR0FBN0YsQUFBZ0csQUFFaEc7Ozs7Ozs7a0IsQUFJYTs7Ozs7QUNqSWY7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLE9BQU8sbUJBQVMsU0FBQSxBQUFTLGVBQWxCLEFBQVMsQUFBd0Isb0JBQTVDOztBQUdBLENBQUMsU0FBQSxBQUFTLGlCQUFnQixBQUV6Qjs7UUFBTyxJQUFBLEFBQUksUUFBUSxVQUFBLEFBQVUsU0FBVixBQUFtQixRQUFPLEFBRTVDLENBRkQsQUFBTyxBQUdQO0FBTEEsSUFBQSxBQU1BLEtBQUssS0FOTixBQUFDLEFBTVU7O0FBRVgsS0FBQSxBQUFLLFFBQUwsQUFBYTtBQUNiLEtBQUEsQUFBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFDZmdCLHFCQUdwQjtpQkFBQSxBQUFhLE9BQWIsQUFBb0IsSUFBcEIsQUFBd0IsSUFBeEIsQUFBNEIsSUFBNUIsQUFBZ0MsSUFBaEMsQUFBb0MsY0FBYzt3QkFBQTs7T0FGbEQsQUFFa0QsWUFGdEMsQUFFc0MsQUFDakQ7O09BQUEsQUFBSyxRQUFMLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssS0FBSyxLQUFWLEFBQWEsQUFDYjtPQUFBLEFBQUssZUFBZSxLQUFBLEFBQUssSUFBSSxlQUFULEFBQXNCLEdBQTFDLEFBQW9CLEFBQXlCLEFBRTdDOztPQUFJLElBQUksSUFBUixBQUFVLEdBQUcsSUFBRSxLQUFmLEFBQW9CLGNBQWMsRUFBbEMsQUFBb0MsR0FBRSxBQUNyQztPQUFJO1dBQ0ksS0FETyxBQUNGLEFBQ1o7UUFBSSxLQUFBLEFBQUssS0FBSyxLQUFBLEFBQUssS0FGTCxBQUVVLEFBQ3hCO1FBQUksS0FIVSxBQUdMLEFBQ1Q7UUFBSSxLQUpVLEFBSUwsQUFDVDtRQUFJLEtBTEwsQUFBZSxBQUtMLEFBRVY7QUFQZSxBQUNkO1FBTUQsQUFBSyxVQUFMLEFBQWUsS0FBZixBQUFvQixBQUNwQjtBQUNEOzs7Ozs4QixBQUVXLFNBQVEsQUFDbkI7YUFBVSxVQUFWLEFBQWtCLEFBQ2xCO1VBQU8sS0FBQSxBQUFLLFVBQVUsVUFBVSxLQUFoQyxBQUFPLEFBQThCLEFBQ3JDOzs7Ozs7O2tCLEFBMUJtQjs7Ozs7Ozs7USxBQzZETCxPLEFBQUE7QUE3RGhCLFNBQUEsQUFBUyxNQUFLLEFBQ2I7QUFNQTs7Ozs7O1VBQUEsQUFBUyxZQUFULEFBQXNCLEdBQXRCLEFBQXlCLEdBQXpCLEFBQTRCLEdBQTVCLEFBQStCLEdBQUcsQUFDakM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7U0FBTyxFQUFFLElBQUEsQUFBRSxJQUFGLEFBQUksSUFBYixBQUFPLEFBQVUsQUFDakI7QUFFRDs7VUFBQSxBQUFTLGdCQUFULEFBQTBCLEdBQTFCLEFBQTZCLEdBQTdCLEFBQWdDLEdBQWhDLEFBQW1DLEdBQUcsQUFDckM7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFFTDs7TUFBSSxJQUFKLEFBQU0sQUFDTjtTQUFPLEVBQUUsSUFBQSxBQUFFLElBQUYsQUFBSSxJQUFiLEFBQU8sQUFBVSxBQUNqQjtBQUVEOztVQUFBLEFBQVMsaUJBQVQsQUFBMkIsR0FBM0IsQUFBOEIsR0FBOUIsQUFBaUMsR0FBakMsQUFBb0MsR0FBRyxBQUN0QztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztNQUFJLElBQUosQUFBTSxBQUNOO1NBQU8sRUFBRSxDQUFBLEFBQUMsSUFBRCxBQUFHLEtBQUcsSUFBTixBQUFRLEtBQWpCLEFBQU8sQUFBZSxBQUN0QjtBQUVEOztVQUFBLEFBQVMsbUJBQVQsQUFBNkIsR0FBN0IsQUFBZ0MsR0FBaEMsQUFBbUMsR0FBbkMsQUFBc0MsR0FBRyxBQUN4QztNQUFJLENBQUosQUFBSyxBQUNMO01BQUksQ0FBSixBQUFLLEFBQ0w7TUFBSSxDQUFKLEFBQUssQUFDTDtNQUFJLENBQUosQUFBSyxBQUVMOztPQUFLLElBQUwsQUFBTyxBQUNQO01BQUksSUFBSixBQUFRLEdBQUcsT0FBTyxFQUFFLElBQUEsQUFBRSxJQUFGLEFBQUksSUFBSixBQUFNLElBQWYsQUFBTyxBQUFZLEFBQzlCO0lBQUEsQUFBRSxBQUNGO1NBQU8sRUFBRSxDQUFBLEFBQUMsSUFBRCxBQUFHLEtBQUssS0FBRyxJQUFILEFBQUssS0FBYixBQUFrQixLQUEzQixBQUFPLEFBQXlCLEFBQ2hDO0FBRUQ7OztlQUFPLEFBQ08sQUFDYjttQkFGTSxBQUVXLEFBQ2pCO29CQUhNLEFBR1ksQUFDbEI7c0JBSkQsQUFBTyxBQUljLEFBRXJCO0FBTk8sQUFDTjs7O0FBT0ssSUFBSSxvQ0FBSjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFQSxTQUFBLEFBQVMsT0FBTSxBQUNyQjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5leHBvcnQgZGVmYXVsdCB7XG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KVxufTsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcblx0eCA9IDA7XG5cdHkgPSAwO1xuXHRkeCA9IDA7XG5cdGR5ID0gMDtcblx0c3ByaXRlID0gbnVsbDtcblx0YW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cblx0Y29uc3RydWN0b3IodHlwZSwgY29uZmlnKXtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0dGhpcy50eXBlID0gdHlwZSArICcnO1xuXHRcdHRoaXMueCA9IGNvbmZpZy54fDA7XG5cdFx0dGhpcy55ID0gY29uZmlnLnl8MDtcblx0XHR0aGlzLmR4ID0gY29uZmlnLmR4fDA7XG5cdFx0dGhpcy5keSA9IGNvbmZpZy5keXwwO1xuXHRcdHRoaXMuc3ByaXRlID0gY29uZmlnLnNwcml0ZTtcblx0XHR0aGlzLmFuaW1hdGlvbkZyYW1lSWQgPSAwO1xuXHR9XG5cblx0c2V0QW5pbWF0aW9uKGZyYW1lSWQsIHNwcml0ZSl7XG5cdFx0dGhpcy5zcHJpdGUgPSBzcHJpdGUgfHwge307XG5cdFx0dGhpcy5hbmltYXRpb25GcmFtZUlkID0gZnJhbWVJZHwwO1xuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0aWYgKCF0aGlzLnNwcml0ZSAmJiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZSkgcmV0dXJuIHt9O1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ByaXRlLmdldEtleUZyYW1lKGZyYW1lSWQgLSB0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuXHR9XG5cblxufSIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbnV0aWxzLmluaXQoKTtcblxuY29uc3QgRlBTICA9IDI0O1xuY29uc3QgU1RFUCA9IDEvRlBTO1xuY29uc3QgV0lEVEggID0gMTAyNDsgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBIRUlHSFQgPSA3Njg7ICAvLyBPZmZzY3JlZW4gcmVuZGVyaW5nIHNpemVcbmNvbnN0IFJBVElPICA9IEhFSUdIVCAvIFdJRFRIO1xuXG5jbGFzcyBHYW1lIHtcblx0Z2FtZVJlYWR5ID0gZmFsc2U7XG5cdHBhdXNlZCA9IGZhbHNlO1xuXHRkZWJ1ZyAgPSBmYWxzZTtcblxuXHRvblNjcmVlbiAgPSBudWxsO1xuXHRvZmZTY3JlZW4gPSBudWxsO1xuXHRvblNjcmVlbkN0eCAgPSBudWxsO1xuXHRvZmZTY3JlZW5DdHggPSBudWxsO1xuXG5cdHBsYXllciA9IHt9O1xuXHRlbnRpdGllcyA9IFtdO1xuXHRhc3NldHMgPSB7fTtcblxuXHRjb25zdHJ1Y3RvcihjYW52YXMsIGFzc2V0cyl7XG5cdFx0dGhpcy5vblNjcmVlbiAgPSBjYW52YXM7XG5cdFx0dGhpcy5vZmZTY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuXHRcdHRoaXMub2ZmU2NyZWVuLndpZHRoICA9IFdJRFRIO1xuXHRcdHRoaXMub2ZmU2NyZWVuLmhlaWdodCA9IEhFSUdIVDtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eCAgICAgPSB0aGlzLm9mZlNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vblNjcmVlbi53aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLm9uU2NyZWVuLmhlaWdodCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgUkFUSU8gKiB3aW5kb3cuaW5uZXJXaWR0aCk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eCAgICAgPSB0aGlzLm9uU2NyZWVuLmdldENvbnRleHQoJzJkJyk7XG5cdFx0dGhpcy5vblNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgID0gZmFsc2U7XG5cblx0XHR0aGlzLmFzc2V0cyA9IGFzc2V0cztcblx0XHR0aGlzLnBsYXllciA9IG5ldyBFbnRpdHkoJ3BsYXllcicsIHt4OiBXSURUSC8yLCB5OkhFSUdIVC8yfSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0QW5pbWF0aW9uKHRoaXMuZnJhbWVJZHwwLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWFpbiBHYW1lIExvb3Bcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFxuXHRmcmFtZUlkID0gMHwwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHR0aGlzLnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5kdCArPSBNYXRoLm1pbigxLCAodGhpcy50IC0gdGhpcy50cHJldikgLyAxMDAwKTtcblx0XHRjb25zb2xlLmNsZWFyKCk7XG5cdFx0d2hpbGUodGhpcy5kdCA+IFNURVApIHtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuZHQsIHRoaXMuZnJhbWVJZCk7XG5cdFx0XHR0aGlzLmR0IC09IFNURVA7XG5cdFx0XHQvL3RoaXMudXBkYXRlKFNURVApO1xuXHRcdFx0dGhpcy5mcmFtZUlkID0gKHRoaXMuZnJhbWVJZCArIDEpfDA7XG5cdFx0fVxuXHRcdHRoaXMudHByZXYgPSB0aGlzLnQ7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRcblx0XHRpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZS5iaW5kKHRoaXMpLCB0aGlzLm9uU2NyZWVuKTtcblx0fVxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJlbmRlclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IGN2cyA9IHRoaXMub2ZmU2NyZWVuO1xuXHRcdGxldCBjdHggPSB0aGlzLm9mZlNjcmVlbkN0eDtcblxuXHRcdGxldCBzY2FsZSA9IE1hdGgubWF4KFxuXHRcdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQvY3ZzLmhlaWdodCxcblx0XHRcdHRoaXMub25TY3JlZW4ud2lkdGgvY3ZzLndpZHRoXG5cdFx0KTtcblx0XHRsZXQgdyA9IGN2cy53aWR0aCAqIHNjYWxlO1xuXHRcdGxldCBoID0gY3ZzLmhlaWdodCAqIHNjYWxlO1xuXHRcdGxldCB4ID0gMDtcblx0XHRsZXQgeSA9ICh0aGlzLm9mZlNjcmVlbi5oZWlnaHQgLSBoKSAvIDI7XG5cblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGN2cy53aWR0aCwgY3ZzLmhlaWdodCk7XG5cblx0XHR0aGlzLnJlbmRlclBsYXllcigpO1xuXG5cdFx0aWYgKHRoaXMuZGVidWcpIHtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjc1KSc7XG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCBjdnMuaGVpZ2h0KTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSAnZ29sZCc7XG5cdFx0XHRsZXQgZm9udFNpemUgPSAzMjtcblx0XHRcdGxldCBsaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xuXHRcdFx0bGV0IGxpbmVQb3MgPSB5O1xuXHRcdFx0Y3R4LmZvbnQgPSBmb250U2l6ZSArICdweCBzYW5zLXNlcmlmJztcblx0XHRcdGN0eC5maWxsVGV4dCgnZnJhbWVJZDogJyArIHRoaXMuZnJhbWVJZCwgMCwgbGluZVBvcyArPSBsaW5lSGVpZ2h0KTtcblx0XHR9XG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodCk7O1xuXHRcdHRoaXMub25TY3JlZW5DdHguZHJhd0ltYWdlKFxuXHRcdFx0Y3ZzLFxuXHRcdFx0eCwgeSwgdywgaCxcblx0XHRcdDAsIDAsIHRoaXMub25TY3JlZW4ud2lkdGgsIHRoaXMub25TY3JlZW4uaGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllcigpe1xuXHRcdHRoaXMucmVuZGVyQ3JlYXR1cmUodGhpcy5wbGF5ZXIpO1xuXHR9XG5cblx0cmVuZGVyQ3JlYXR1cmUoZW50aXR5KSB7XG5cdFx0bGV0IGtmID0gZW50aXR5LmdldEtleUZyYW1lKHRoaXMuZnJhbWVJZCk7XG5cdFx0XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHguZHJhd0ltYWdlKGtmLmltYWdlLCBrZi5zeCwga2Yuc3ksIGtmLnN3LCBrZi5zaCwgZW50aXR5LngsIGVudGl0eS55LCBrZi5zdywga2Yuc2gpO1xuXHRcdFxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnXG5pbXBvcnQgYXNzZXRzIGZyb20gJy4vYXNzZXRzJ1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSwgYXNzZXRzKTtcblxuXG4hZnVuY3Rpb24gd2FpdEZvckNvbnRlbnQoKXtcblx0Ly8gV2FpdCBmb3IgY29udGVudCB0byBiZSByZXRyZWl2ZWQgYnkgdGhlIGJyb3dzZXJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuXG5cdH0pO1xufSgpXG4udGhlbihnYW1lLnN0YXJ0KTtcblxuZ2FtZS5kZWJ1ZyA9IHRydWU7XG5nYW1lLnN0YXJ0KCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIHtcblx0a2V5RnJhbWVzID0gW107XG5cblx0Y29uc3RydWN0b3IgKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgbnVtS2V5RnJhbWVzKSB7XG5cdFx0dGhpcy5pbWFnZSA9IGltYWdlO1xuXHRcdHRoaXMuc3ggPSBzeHwwO1xuXHRcdHRoaXMuc3kgPSBzeXwwO1xuXHRcdHRoaXMuc3cgPSBzd3wwO1xuXHRcdHRoaXMuc2ggPSBzaHwwO1xuXHRcdHRoaXMubnVtS2V5RnJhbWVzID0gTWF0aC5tYXgobnVtS2V5RnJhbWVzfDAsIDEpO1xuXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5udW1LZXlGcmFtZXM7ICsraSl7XG5cdFx0XHRsZXQga2V5RnJhbWUgPSB7XG5cdFx0XHRcdGltYWdlOiB0aGlzLmltYWdlLFxuXHRcdFx0XHRzeDogdGhpcy5zeCArIHRoaXMuc3cgKiBpLFxuXHRcdFx0XHRzeTogdGhpcy5zeSxcblx0XHRcdFx0c3c6IHRoaXMuc3csXG5cdFx0XHRcdHNoOiB0aGlzLnNoXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5rZXlGcmFtZXMucHVzaChrZXlGcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0S2V5RnJhbWUoZnJhbWVJZCl7XG5cdFx0ZnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0XHRyZXR1cm4gdGhpcy5rZXlGcmFtZXNbZnJhbWVJZCAlIHRoaXMubnVtS2V5RnJhbWVzXTtcblx0fVxufVxuIiwiZnVuY3Rpb24gYXNtKCl7XG5cdCd1c2UgYXNtJztcblx0Ly8gdDogY3VycmVudCB0aW1lXG5cdC8vIGI6IHN0YXJ0IHZhbHVlXG5cdC8vIGM6IGNoYW5nZSBpbiB2YWx1ZVxuXHQvLyBkOiBkdXJhaXRvblxuXG5cdGZ1bmN0aW9uIGxpbmVhclR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0cmV0dXJuICsoYyp0L2QgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJblF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoYyp0KnQgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VPdXRRdWFkVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHR0ID0gdC9kO1xuXHRcdHJldHVybiArKC1jKnQqKHQtMikgKyBiKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVhc2VJbk91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgLz0gZC8yO1xuXHRcdGlmICh0IDwgMSkgcmV0dXJuICsoYy8yKnQqdCArIGIpO1xuXHRcdC0tdDtcblx0XHRyZXR1cm4gKygtYy8yICogKHQqKHQtMikgLSAxKSArIGIpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsaW5lYXJUd2VlbjogbGluZWFyVHdlZW4sXG5cdFx0ZWFzZUluUXVhZFR3ZWVuOiBlYXNlSW5RdWFkVHdlZW4sXG5cdFx0ZWFzZU91dFF1YWRUd2VlbjogZWFzZU91dFF1YWRUd2Vlbixcblx0XHRlYXNlSW5PdXRRdWFkVHdlZW46IGVhc2VJbk91dFF1YWRUd2VlblxuXHR9XG59XG5cbmV4cG9ydCB2YXIgbGluZWFyVHdlZW47XG5leHBvcnQgdmFyIGVhc2VJblF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZU91dFF1YWRUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluT3V0UXVhZFR3ZWVuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpe1xuXHR2YXIgZXhwb3J0ZWQgPSBhc20oKTtcblx0bGluZWFyVHdlZW4gPSBleHBvcnRlZC5saW5lYXJUd2Vlbjtcblx0ZWFzZUluUXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluUXVhZFR3ZWVuO1xuXHRlYXNlT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZU91dFF1YWRUd2Vlbjtcblx0ZWFzZUluT3V0UXVhZFR3ZWVuID0gZXhwb3J0ZWQuZWFzZUluT3V0UXVhZFR3ZWVuO1xuXHRyZXR1cm4gZXhwb3J0ZWQ7XG59O1xuIl19
