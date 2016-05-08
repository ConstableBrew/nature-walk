function asm(stdlib, foreign, buffer){
	'use asm';


	var exp = stdlib.Math.exp;
	var log = stdlib.Math.log;
	var sqrt = stdlib.Math.sqrt;
	var pow = stdlib.Math.pow;
	var abs = stdlib.Math.abs;
	var acos = stdlib.Math.acos;
	var cos = stdlib.Math.cos;
	var PI = stdlib.Math.PI;
	var heap = new stdlib.Float64Array(buffer);

	// Tween function parameters
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


	/* based on http://mysite.verizon.net/res148h4j/javascript/script_exact_cubic.html#the%20source%20code */
	function cubicRoots(P0, P1, P2, P3){
		var a=+P0;
		var b=+P1;
		var c=+P2;
		var d=+P3;

		var A=+b/a;
		var B=+c/a;
		var C=+d/a;

		var Q=0.0;
		var R=0.0;
		var D=0.0;
		var S=0.0;
		var T=0.0;
		var Im=0.0;

		Q = +(3*B - +pow(A, 2))/9;
		R = +(9*A*B - 27*C - 2*+pow(A, 3))/54;
		D = +pow(Q, 3) + +pow(R, 2); // polynomial discriminant

		var t = new stdlib.Float64Array(4);
		var A3 = +(-A/3);

		if (D >= 0) {
			// complex or duplicate roots
			var sqrtD = +sqrt(D);
			var S = +sgn(R + +sqrtD)*+pow(+abs(R + +sqrtD),0.3333333333333333);
			var T = +sgn(R - +sqrtD)*+pow(+abs(R - +sqrtD),0.3333333333333333);
			var ST = +(S + T);

			t[0] = A3 + ST;                    // real root
			t[1] = A3 - ST/2;                  // real part of complex root
			t[2] = A3 - ST/2;                  // real part of complex root
			Im = +abs(0.8660254037844386*(S - T)); // complex part of root pair (0.866... is == sqrt(3)/2 ) 

			/*discard complex roots*/
			if (Im!=0) {
				t[1]=-1;
				t[2]=-1;
			}

		} else {
			// distinct real roots
			var th = +acos(R/+sqrt(-pow(Q, 3)));
			var sqrtQ = +sqrt(-Q);

			t[0] = 2*sqrtQ*cos(th/3) + A3;
			t[1] = 2*sqrtQ*cos((th + 2*PI)/3) + A3;
			t[2] = 2*sqrtQ*cos((th + 4*PI)/3) + A3;
			Im = 0.0;
		}

		/*discard out of spec roots*/
		var p = 0, q = 0;
		for (p = 0 << 3, q = 3 << 3; (p|0) < (q|0); p = (p + 8)|0) {
			if (+t[p>>3]<0.0 || +t[p>>3]>1.0)
				t[p>>3]=-1.0;
		}

		/*sort but place -1 at the end*/
		t=sortSpecial(t);
		return t;
	}

function sortSpecial(A) {
	var a = new stdlib.Float64Array(A);
	var flip = 0;
	var temp = 0.0;

	do {
		flip = 0;

		var p = 0, q = 0, r = 0;
		for (p = 0 << 3, q = (a.length|0) << 3; (p|0) < (q|0); p = (p + 8)|0) {
			r = (p + 8)|0;
			if ((+a[r>>3] >= 0.0 && +a[p>>3] > +a[r>>3]) ||
				(+a[p>>3] < 0.0 && +a[r>>3] >= 0.0)
			){
				flip = 1;
				temp = +a[p>>3];
				a[p>>3] = +a[r>>3];
				a[r>>3] = +temp;
			}
		}
	} while (flip != 0);
	return a;
}

	return {
		linearTween: linearTween,
		easeInQuadTween: easeInQuadTween,
		easeOutQuadTween: easeOutQuadTween,
		easeInOutQuadTween: easeInOutQuadTween,
		cubicRoots: cubicRoots
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

!function init(){
	var heap = new ArrayBuffer(0x10000);
	var exported = asm(window, null, heap);
	linearTween = exported.linearTween;
	easeInQuadTween = exported.easeInQuadTween;
	easeOutQuadTween = exported.easeOutQuadTween;
	easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
}();
