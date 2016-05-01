function asm(){
	'use asm';
	// t: current time
	// b: start value
	// c: change in value
	// d: duraiton

	function linearTween (t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		return +(c*t/d + b);
	}

	function easeInQuadTween (t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t = t/d;
		return +(c*t*t + b);
	}

	function easeOutQuadTween (t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t = t/d;
		return +(-c*t*(t-2) + b);
	}

	function easeInOutQuadTween (t, b, c, d) {
		t = +t;
		b = +b;
		c = +c;
		d = +d;

		t /= d/2;
		if (t < 1) return +(c/2*t*t + b);
		--t;
		return +(-c/2 * (t*(t-2) - 1) + b);
	}

	return {
		linearTween: linearTween,
		easeInQuadTween: easeInQuadTween,
		easeOutQuadTween: easeOutQuadTween,
		easeInOutQuadTween: easeInOutQuadTween
	}
}

export function normal_random() {
	// Standard Normal variate using Box-Muller transform.
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

export var linearTween;
export var easeInQuadTween;
export var easeOutQuadTween;
export var easeInOutQuadTween;

export function init(){
	var exported = asm();
	linearTween = exported.linearTween;
	easeInQuadTween = exported.easeInQuadTween;
	easeOutQuadTween = exported.easeOutQuadTween;
	easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
};
