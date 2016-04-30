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

			return this.sprite.getKeyFrame(frameId - this.animationFrameid);
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
		this.player = new _entity2.default('player');
		this.player.setAnimation(this.frameId, this.assets['DRUID_RUN']);
	}

	_createClass(Game, [{
		key: 'start',
		value: function start() {
			// Begins the main game loop
			requestAnimationFrame(this.frame.bind(this), this.onScreen);
		}
	}, {
		key: 'waitForContent',
		value: function waitForContent() {
			// Wait for content to be retreived by the browser
			return new Promise(function (resolve, reject) {
				spritesheet.src = 'joust-spritesheet.png'; // Should wait for this too... TODO
				var req = new XMLHttpRequest();
				req.addEventListener('load', resolve);
				req.open('GET', '/resume.html');
				req.send();
			});
		}

		// ========================================================================
		// Main Game Loop
		// ========================================================================

	}, {
		key: 'frame',
		value: function frame() {
			this.t = window.performance.now();
			this.dt += Math.min(1, (this.t - this.tprev) / 1000);
			while (this.dt > STEP) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzLmpzIiwic3JjL2VudGl0eS5qcyIsInNyYy9nYW1lLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3Nwcml0ZS5qcyIsInNyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7OztBQUVBLElBQUksV0FBVyxJQUFmLEFBQWUsQUFBSTtBQUNuQixTQUFBLEFBQVMsTUFBVCxBQUFlOztZQUVILHFCQUFBLEFBQVcsVUFBWCxBQUFxQixHQUFyQixBQUF3QixHQUF4QixBQUEyQixJQUEzQixBQUErQixJLEFBRDVCLEFBQ0gsQUFBbUM7QUFEaEMsQUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xEOzs7Ozs7Ozs7Ozs7OztJLEFBRXFCLHFCQVFwQjtpQkFBQSxBQUFZLE1BQVosQUFBa0IsUUFBTzt3QkFBQTs7T0FQekIsQUFPeUIsSUFQckIsQUFPcUI7T0FOekIsQUFNeUIsSUFOckIsQUFNcUI7T0FMekIsQUFLeUIsS0FMcEIsQUFLb0I7T0FKekIsQUFJeUIsS0FKcEIsQUFJb0I7T0FIekIsQUFHeUIsU0FIaEIsQUFHZ0I7T0FGekIsQUFFeUIsbUJBRk4sQUFFTSxBQUN4Qjs7V0FBUyxVQUFULEFBQW1CLEFBQ25CO09BQUEsQUFBSyxPQUFPLE9BQVosQUFBbUIsQUFDbkI7T0FBQSxBQUFLLElBQUksT0FBQSxBQUFPLElBQWhCLEFBQWtCLEFBQ2xCO09BQUEsQUFBSyxJQUFJLE9BQUEsQUFBTyxJQUFoQixBQUFrQixBQUNsQjtPQUFBLEFBQUssS0FBSyxPQUFBLEFBQU8sS0FBakIsQUFBb0IsQUFDcEI7T0FBQSxBQUFLLEtBQUssT0FBQSxBQUFPLEtBQWpCLEFBQW9CLEFBQ3BCO09BQUEsQUFBSyxTQUFTLE9BQWQsQUFBcUIsQUFDckI7Ozs7OytCLEFBRVksUyxBQUFTLFFBQU8sQUFDNUI7UUFBQSxBQUFLLFNBQVMsVUFBZCxBQUF3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QUljLEFBRXJCO0FBTk8sQUFDTjs7O0FBT0ssSUFBSSxvQ0FBSjtBQUNBLElBQUksNENBQUo7QUFDQSxJQUFJLDhDQUFKO0FBQ0EsSUFBSSxrREFBSjs7QUFFQSxTQUFBLEFBQVMsT0FBTSxBQUNyQjtLQUFJLFdBQUosQUFBZSxBQUNmO1NBUFUsQUFPViw0QkFBYyxTQUFkLEFBQXVCLEFBQ3ZCO1NBUFUsQUFPVixvQ0FBa0IsU0FBbEIsQUFBMkIsQUFDM0I7U0FQVSxBQU9WLHNDQUFtQixTQUFuQixBQUE0QixBQUM1QjtTQVBVLEFBT1YsMENBQXFCLFNBQXJCLEFBQThCLEFBQzlCO1FBQUEsQUFBTyxBQUNQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnO1xuXG52YXIgZHJ1aWRSdW4gPSBuZXcgSW1hZ2UoKTtcbmRydWlkUnVuLnNyYyA9ICcvYXNzZXRzL3J1bi1jeWNsZS10ZXN0LnBuZyc7XG5leHBvcnQgZGVmYXVsdCB7XG5cdERSVUlEX1JVTjogbmV3IFNwcml0ZShkcnVpZFJ1biwgMCwgMCwgNDgsIDQ4LCA4KVxufTsiLCJpbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcblx0eCA9IDA7XG5cdHkgPSAwO1xuXHRkeCA9IDA7XG5cdGR5ID0gMDtcblx0c3ByaXRlID0gbnVsbDtcblx0YW5pbWF0aW9uRnJhbWVJZCA9IDA7XG5cblx0Y29uc3RydWN0b3IodHlwZSwgY29uZmlnKXtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0dGhpcy50eXBlID0gdHlwZSArICcnO1xuXHRcdHRoaXMueCA9IGNvbmZpZy54fDA7XG5cdFx0dGhpcy55ID0gY29uZmlnLnl8MDtcblx0XHR0aGlzLmR4ID0gY29uZmlnLmR4fDA7XG5cdFx0dGhpcy5keSA9IGNvbmZpZy5keXwwO1xuXHRcdHRoaXMuc3ByaXRlID0gY29uZmlnLnNwcml0ZTtcblx0fVxuXG5cdHNldEFuaW1hdGlvbihmcmFtZUlkLCBzcHJpdGUpe1xuXHRcdHRoaXMuc3ByaXRlID0gc3ByaXRlIHx8IHt9O1xuXHRcdHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IGZyYW1lSWR8MDtcblx0fVxuXG5cdGdldEtleUZyYW1lKGZyYW1lSWQpe1xuXHRcdGlmICghdGhpcy5zcHJpdGUgJiYgdGhpcy5zcHJpdGUuZ2V0S2V5RnJhbWUpIHJldHVybiB7fTtcblxuXHRcdHJldHVybiB0aGlzLnNwcml0ZS5nZXRLZXlGcmFtZShmcmFtZUlkIC0gdGhpcy5hbmltYXRpb25GcmFtZWlkKTtcblx0fVxuXG5cbn0iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG51dGlscy5pbml0KCk7XG5cbmNvbnN0IEZQUyAgPSAyNDtcbmNvbnN0IFNURVAgPSAxL0ZQUztcbmNvbnN0IFdJRFRIICA9IDEwMjQ7IC8vIE9mZnNjcmVlbiByZW5kZXJpbmcgc2l6ZVxuY29uc3QgSEVJR0hUID0gNzY4OyAgLy8gT2Zmc2NyZWVuIHJlbmRlcmluZyBzaXplXG5jb25zdCBSQVRJTyAgPSBIRUlHSFQgLyBXSURUSDtcblxuY2xhc3MgR2FtZSB7XG5cdGdhbWVSZWFkeSA9IGZhbHNlO1xuXHRwYXVzZWQgPSBmYWxzZTtcblx0ZGVidWcgID0gZmFsc2U7XG5cblx0b25TY3JlZW4gID0gbnVsbDtcblx0b2ZmU2NyZWVuID0gbnVsbDtcblx0b25TY3JlZW5DdHggID0gbnVsbDtcblx0b2ZmU2NyZWVuQ3R4ID0gbnVsbDtcblxuXHRwbGF5ZXIgPSB7fTtcblx0ZW50aXRpZXMgPSBbXTtcblx0YXNzZXRzID0ge307XG5cblx0Y29uc3RydWN0b3IoY2FudmFzLCBhc3NldHMpe1xuXHRcdHRoaXMub25TY3JlZW4gID0gY2FudmFzO1xuXHRcdHRoaXMub2ZmU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cblx0XHR0aGlzLm9mZlNjcmVlbi53aWR0aCAgPSBXSURUSDtcblx0XHR0aGlzLm9mZlNjcmVlbi5oZWlnaHQgPSBIRUlHSFQ7XG5cdFx0dGhpcy5vZmZTY3JlZW5DdHggICAgID0gdGhpcy5vZmZTY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTtcblx0XHR0aGlzLm9mZlNjcmVlbkN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMub25TY3JlZW4ud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5vblNjcmVlbi5oZWlnaHQgPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIFJBVElPICogd2luZG93LmlubmVyV2lkdGgpO1xuXHRcdHRoaXMub25TY3JlZW5DdHggICAgID0gdGhpcy5vblNjcmVlbi5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMub25TY3JlZW5DdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkICA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hc3NldHMgPSBhc3NldHM7XG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgRW50aXR5KCdwbGF5ZXInKTtcblx0XHR0aGlzLnBsYXllci5zZXRBbmltYXRpb24odGhpcy5mcmFtZUlkLCB0aGlzLmFzc2V0c1snRFJVSURfUlVOJ10pXG5cdH1cblxuXHRzdGFydCgpIHtcblx0XHQvLyBCZWdpbnMgdGhlIG1haW4gZ2FtZSBsb29wXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXHR3YWl0Rm9yQ29udGVudCgpe1xuXHRcdC8vIFdhaXQgZm9yIGNvbnRlbnQgdG8gYmUgcmV0cmVpdmVkIGJ5IHRoZSBicm93c2VyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuXHRcdFx0c3ByaXRlc2hlZXQuc3JjID0gJ2pvdXN0LXNwcml0ZXNoZWV0LnBuZyc7IC8vIFNob3VsZCB3YWl0IGZvciB0aGlzIHRvby4uLiBUT0RPXG5cdFx0XHR2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRyZXEuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUpO1xuXHRcdFx0cmVxLm9wZW4oJ0dFVCcsICcvcmVzdW1lLmh0bWwnKTtcblx0XHRcdHJlcS5zZW5kKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTWFpbiBHYW1lIExvb3Bcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdFxuXHRmcmFtZUlkID0gMHwwO1xuXHR0cHJldiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0dCA9IHRoaXMudHByZXY7XG5cdGR0ID0gMDtcblxuXHRmcmFtZSgpIHtcblx0XHR0aGlzLnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cdFx0dGhpcy5kdCArPSBNYXRoLm1pbigxLCAodGhpcy50IC0gdGhpcy50cHJldikgLyAxMDAwKTtcblx0XHR3aGlsZSh0aGlzLmR0ID4gU1RFUCkge1xuXHRcdFx0dGhpcy5kdCAtPSBTVEVQO1xuXHRcdFx0Ly90aGlzLnVwZGF0ZShTVEVQKTtcblx0XHRcdHRoaXMuZnJhbWVJZCA9ICh0aGlzLmZyYW1lSWQgKyAxKXwwO1xuXHRcdH1cblx0XHR0aGlzLnRwcmV2ID0gdGhpcy50O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XG5cdFx0aWYgKHRoaXMucGF1c2VkKSByZXR1cm47XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUuYmluZCh0aGlzKSwgdGhpcy5vblNjcmVlbik7XG5cdH1cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyKCkge1xuXHRcdGxldCBjdnMgPSB0aGlzLm9mZlNjcmVlbjtcblx0XHRsZXQgY3R4ID0gdGhpcy5vZmZTY3JlZW5DdHg7XG5cblx0XHRsZXQgc2NhbGUgPSBNYXRoLm1heChcblx0XHRcdHRoaXMub25TY3JlZW4uaGVpZ2h0L2N2cy5oZWlnaHQsXG5cdFx0XHR0aGlzLm9uU2NyZWVuLndpZHRoL2N2cy53aWR0aFxuXHRcdCk7XG5cdFx0bGV0IHcgPSBjdnMud2lkdGggKiBzY2FsZTtcblx0XHRsZXQgaCA9IGN2cy5oZWlnaHQgKiBzY2FsZTtcblx0XHRsZXQgeCA9IDA7XG5cdFx0bGV0IHkgPSAodGhpcy5vZmZTY3JlZW4uaGVpZ2h0IC0gaCkgLyAyO1xuXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5yZW5kZXJQbGF5ZXIoKTtcblxuXHRcdGlmICh0aGlzLmRlYnVnKSB7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC43NSknO1xuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIDMwMCwgY3ZzLmhlaWdodCk7XG5cdFx0XHRjdHguZmlsbFN0eWxlID0gJ2dvbGQnO1xuXHRcdFx0bGV0IGZvbnRTaXplID0gMzI7XG5cdFx0XHRsZXQgbGluZUhlaWdodCA9IGZvbnRTaXplICogMS4zMztcblx0XHRcdGxldCBsaW5lUG9zID0geTtcblx0XHRcdGN0eC5mb250ID0gZm9udFNpemUgKyAncHggc2Fucy1zZXJpZic7XG5cdFx0XHRjdHguZmlsbFRleHQoJ2ZyYW1lSWQ6ICcgKyB0aGlzLmZyYW1lSWQsIDAsIGxpbmVQb3MgKz0gbGluZUhlaWdodCk7XG5cdFx0fVxuXG5cblx0XHR0aGlzLm9uU2NyZWVuQ3R4LmRyYXdJbWFnZShcblx0XHRcdGN2cyxcblx0XHRcdHgsIHksIHcsIGgsXG5cdFx0XHQwLCAwLCB0aGlzLm9uU2NyZWVuLndpZHRoLCB0aGlzLm9uU2NyZWVuLmhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJQbGF5ZXIoKXtcblx0XHR0aGlzLnJlbmRlckNyZWF0dXJlKHRoaXMucGxheWVyKTtcblx0fVxuXG5cdHJlbmRlckNyZWF0dXJlKGVudGl0eSkge1xuXHRcdGxldCBrZiA9IGVudGl0eS5nZXRLZXlGcmFtZSh0aGlzLmZyYW1lSWQpO1xuXHRcdFxuXHRcdHRoaXMub2ZmU2NyZWVuQ3R4LmRyYXdJbWFnZShrZi5pbWFnZSwga2Yuc3gsIGtmLnN5LCBrZi5zdywga2Yuc2gsIGVudGl0eS54LCBlbnRpdHkueSwga2Yuc3csIGtmLnNoKTtcblx0XHRcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJ1xuaW1wb3J0IGFzc2V0cyBmcm9tICcuL2Fzc2V0cydcblxubGV0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyksIGFzc2V0cyk7XG5nYW1lLmRlYnVnID0gdHJ1ZTtcbmdhbWUuc3RhcnQoKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUge1xuXHRrZXlGcmFtZXMgPSBbXTtcblxuXHRjb25zdHJ1Y3RvciAoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBudW1LZXlGcmFtZXMpIHtcblx0XHR0aGlzLmltYWdlID0gaW1hZ2U7XG5cdFx0dGhpcy5zeCA9IHN4fDA7XG5cdFx0dGhpcy5zeSA9IHN5fDA7XG5cdFx0dGhpcy5zdyA9IHN3fDA7XG5cdFx0dGhpcy5zaCA9IHNofDA7XG5cdFx0dGhpcy5udW1LZXlGcmFtZXMgPSBNYXRoLm1heChudW1LZXlGcmFtZXN8MCwgMSk7XG5cblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLm51bUtleUZyYW1lczsgKytpKXtcblx0XHRcdGxldCBrZXlGcmFtZSA9IHtcblx0XHRcdFx0aW1hZ2U6IHRoaXMuaW1hZ2UsXG5cdFx0XHRcdHN4OiB0aGlzLnN4ICsgdGhpcy5zdyAqIGksXG5cdFx0XHRcdHN5OiB0aGlzLnN5LFxuXHRcdFx0XHRzdzogdGhpcy5zdyxcblx0XHRcdFx0c2g6IHRoaXMuc2hcblx0XHRcdH07XG5cdFx0XHR0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcblx0XHR9XG5cdH1cblxuXHRnZXRLZXlGcmFtZShmcmFtZUlkKXtcblx0XHRmcmFtZUlkID0gZnJhbWVJZHwwO1xuXHRcdHJldHVybiB0aGlzLmtleUZyYW1lc1tmcmFtZUlkICUgdGhpcy5udW1LZXlGcmFtZXNdO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBhc20oKXtcblx0J3VzZSBhc20nO1xuXHQvLyB0OiBjdXJyZW50IHRpbWVcblx0Ly8gYjogc3RhcnQgdmFsdWVcblx0Ly8gYzogY2hhbmdlIGluIHZhbHVlXG5cdC8vIGQ6IGR1cmFpdG9uXG5cblx0ZnVuY3Rpb24gbGluZWFyVHdlZW4gKHQsIGIsIGMsIGQpIHtcblx0XHR0ID0gK3Q7XG5cdFx0YiA9ICtiO1xuXHRcdGMgPSArYztcblx0XHRkID0gK2Q7XG5cblx0XHRyZXR1cm4gKyhjKnQvZCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluUXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCA9IHQvZDtcblx0XHRyZXR1cm4gKyhjKnQqdCArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZU91dFF1YWRUd2VlbiAodCwgYiwgYywgZCkge1xuXHRcdHQgPSArdDtcblx0XHRiID0gK2I7XG5cdFx0YyA9ICtjO1xuXHRcdGQgPSArZDtcblxuXHRcdHQgPSB0L2Q7XG5cdFx0cmV0dXJuICsoLWMqdCoodC0yKSArIGIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZWFzZUluT3V0UXVhZFR3ZWVuICh0LCBiLCBjLCBkKSB7XG5cdFx0dCA9ICt0O1xuXHRcdGIgPSArYjtcblx0XHRjID0gK2M7XG5cdFx0ZCA9ICtkO1xuXG5cdFx0dCAvPSBkLzI7XG5cdFx0aWYgKHQgPCAxKSByZXR1cm4gKyhjLzIqdCp0ICsgYik7XG5cdFx0LS10O1xuXHRcdHJldHVybiArKC1jLzIgKiAodCoodC0yKSAtIDEpICsgYik7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxpbmVhclR3ZWVuOiBsaW5lYXJUd2Vlbixcblx0XHRlYXNlSW5RdWFkVHdlZW46IGVhc2VJblF1YWRUd2Vlbixcblx0XHRlYXNlT3V0UXVhZFR3ZWVuOiBlYXNlT3V0UXVhZFR3ZWVuLFxuXHRcdGVhc2VJbk91dFF1YWRUd2VlbjogZWFzZUluT3V0UXVhZFR3ZWVuXG5cdH1cbn1cblxuZXhwb3J0IHZhciBsaW5lYXJUd2VlbjtcbmV4cG9ydCB2YXIgZWFzZUluUXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlT3V0UXVhZFR3ZWVuO1xuZXhwb3J0IHZhciBlYXNlSW5PdXRRdWFkVHdlZW47XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCl7XG5cdHZhciBleHBvcnRlZCA9IGFzbSgpO1xuXHRsaW5lYXJUd2VlbiA9IGV4cG9ydGVkLmxpbmVhclR3ZWVuO1xuXHRlYXNlSW5RdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5RdWFkVHdlZW47XG5cdGVhc2VPdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlT3V0UXVhZFR3ZWVuO1xuXHRlYXNlSW5PdXRRdWFkVHdlZW4gPSBleHBvcnRlZC5lYXNlSW5PdXRRdWFkVHdlZW47XG5cdHJldHVybiBleHBvcnRlZDtcbn07XG4iXX0=
