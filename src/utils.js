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

	var heap64 = new stdlib.Float64Array(buffer);
	var heap32 = new stdlib.Int32Array(buffer);
	var heap_$base = 0;
	var heap_BLOCK_SIZE = 4 << 2; // $prev, $next, isFree, length
	var _prev = 0 << 2;
	var _next = 1 << 2;
	var _free = 2 << 2;
	var _size = 3 << 2;
	var _data = 4 << 2;

	heap32[(heap_$base + _prev) >> 2] = -1;
	heap32[(heap_$base + _next) >> 2] = -1;
	heap32[(heap_$base + _free) >> 2] =  1;
	heap32[(heap_$base + _size) >> 2] = heap.length - heap_BLOCK_SIZE;

	// Tween function parameters
	// t: current time
	// b: start value
	// c: change in value
	// d: duration

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

	/*computes intersection between a cubic spline and a line segment*/
	function computeIntersections(px,py,lx,ly) {
		var X=Array();

		var A=ly[1]-ly[0];	    //A=y2-y1
		var B=lx[0]-lx[1];	    //B=x1-x2
		var C=lx[0]*(ly[0]-ly[1]) + 
		ly[0]*(lx[1]-lx[0]);	//C=x1*(y1-y2)+y1*(x2-x1)

		var bx = bezierCoeffs(px[0],px[1],px[2],px[3]);
		var by = bezierCoeffs(py[0],py[1],py[2],py[3]);

		var P = Array();
		P[0] = A*bx[0]+B*by[0];		/*t^3*/
		P[1] = A*bx[1]+B*by[1];		/*t^2*/
		P[2] = A*bx[2]+B*by[2];		/*t*/
		P[3] = A*bx[3]+B*by[3] + C;	/*1*/

		var r=cubicRoots(P);

		/*verify the roots are in bounds of the linear segment*/
		for (var i=0;i<3;i++)
		{
		t=r[i];

		X[0]=bx[0]*t*t*t+bx[1]*t*t+bx[2]*t+bx[3];
		X[1]=by[0]*t*t*t+by[1]*t*t+by[2]*t+by[3];            

		/*above is intersection point assuming infinitely long line segment,
		make sure we are also in bounds of the line*/
		var s;
		if ((lx[1]-lx[0])!=0)           /*if not vertical line*/
		s=(X[0]-lx[0])/(lx[1]-lx[0]);
		else
		s=(X[1]-ly[0])/(ly[1]-ly[0]);

		/*in bounds?*/    
		if (t<0 || t>1.0 || s<0 || s>1.0)
		{
		X[0]=-100;  /*move off screen*/
		X[1]=-100;
		}

		/*move intersection point*/
		I[i].setAttributeNS(null,"cx",X[0]);
		I[i].setAttributeNS(null,"cy",X[1]);
		}
	}

	/* based on http://mysite.verizon.net/res148h4j/javascript/script_exact_cubic.html#the%20source%20code */
	function cubicRoots(P){
	}

	
	function bezierCoeffs(P0,P1,P2,P3){
		P0 = +P0;
		P1 = +P1;
		P2 = +P2;
		P3 = +P3;
		var $Z = alloc(4);
		heap64[($Z + (0 << 3)) >> 3] = +(-P0 + 3.0*P1 + -3.0*P2 + P3); 
		heap64[($Z + (1 << 3)) >> 3] = +(3.0*P0 - 6.0*P1 + 3.0*P2);
		heap64[($Z + (2 << 3)) >> 3] = +(-3.0*P0 + 3.0*P1);
		heap64[($Z + (3 << 3)) >> 3] = +(P0);
		return Z;
	}

	/* sorts $array in place, ascending, except negative values are moved to the end. */
	function sortSpecial($array, length) {
		$array = $array|0;
		length = length|0;
		var flip = 0;
		var i = 0;
		var $a = 0;
		var $b = 0;
		var a = 0.0;
		var b = 0.0;
		var limit = 0;
		limit = (length - 1)|0;

		do {
			flip = 0;
			for (i=0; i<limit; i=(i+1)|0) {
				$a = ((i << 3) + $array)|0;
				$b = (((i + 1) << 3) + $array)|0;
				a = +heap64[$a >> 3];
				b = +heap64[$b >> 3];

				if ((b >= 0 && a > b) || (a < 0 && b >= 0)) {
					flip = 1;
					heap64[$a >> 3] = +b;
					heap64[$b >> 3] = +a;
				}
			}
		} while (flip === 1);
		return;
	}
	



	// ========================================================================
	// Heap management
	// ========================================================================


	function alloc(length){
		// Allocates a block of space on the heap
		length = length|0;
		var $block = 0;
		var $data = 0;

		$block = heap_findFirstFreeBlock(length)|0;

		if ($block > -1) {
			heap_splitBlock($block, length);
			heap32[($block + _free) >> 2] = 0;
		}
		$data = ($block + _data)|0;
		return $data;
	}

	function free($data){
		$data = $data|0;
		var $block = 0;

		$block = ($data - _data)|0;
		heap32[($block + _free) >> 2] = 1; // isFree?
		heap_fusion($block);
	}

	function heap_findFirstFreeBlock(length){
		// Returns address of large enough data block or -1 if none.
		length = length|0;
		var len = 0;
		var $block = 0;
		len = length << 3; // Float64 data blocks (8 bytes)
		$block = heap_$base|0;
		while ($block !== -1 && !(
			heap32[($block + _free) >> 2]|0 // isFree?
			&& len <= heap32[($block + _size) >> 2]|0 // length
		)) {
			$block = heap32[($block + _next) >> 2]|0; // $next
		} 
		return $block|0;
	}

	function heap_splitBlock($block, length){
		// Splits a block into two parts at the specified length
		$block = $block|0;
		length = length|0;
		var $new = 0;
		var len = 0;

		$new = $block + heap_BLOCK_SIZE + length;
		len = length << 3; // Float64 data blocks (8 bytes)

		heap32[($new + _prev) >> 2] = $block|0; // $prev
		heap32[($new + _next) >> 2] = heap32[($block + _next) >> 2]|0; // $next
		heap32[($new + _free) >> 2] = 1; // isFree?
		heap32[($new + _size) >> 2] = heap32[($block + _size) >> 2]|0 - len - heap_BLOCK_SIZE; // length
		heap32[($block + _next) >> 2] = $new; // $next
		heap32[($block + _size) >> 2] = len;
		return;
	}

	function heap_fusion($block){
		// Merges neighboring free blocks
		$block = $block|0;
		var $next = 0;
		var $prev = 0;

		$next = heap32[($block + _next) >> 2]|0;
		$prev = heap32[($block + _prev) >> 2]|0;

		if ($next > -1 && heap32[($next + _free) >> 2]|0 !== 0) {
			heap32[($block + _next) >> 2] = heap32[($next + _next) >> 2]|0;
			heap32[($block + _size) >> 2] = heap32[($block + _size) >> 2]|0 + heap32[($next + _size) >> 2]|0 + heap_BLOCK_SIZE;
		}
		if ($prev > -1 && heap32[($prev + _free) >> 2]|0 !== 0) {
			$block = heap_fusion($block)|0;
		}
		return $block|0;
	}







	return {
		linearTween: linearTween,
		easeInQuadTween: easeInQuadTween,
		easeOutQuadTween: easeOutQuadTween,
		easeInOutQuadTween: easeInOutQuadTween
	};
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
	var buffer = new ArrayBuffer(0x10000);
	var exported = asm(window, null, buffer);
	linearTween = exported.linearTween;
	easeInQuadTween = exported.easeInQuadTween;
	easeOutQuadTween = exported.easeOutQuadTween;
	easeInOutQuadTween = exported.easeInOutQuadTween;
	return exported;
}();
