// In case we forget to take out console statements. IE becomes very unhappy when we forget. Let's not make IE unhappy

//console.log("==================== console not polyfilled! ");
if (typeof(console) === 'undefined') {
    var console = {};
    var consolearray = [];
    console.log = console.groupCollapsed = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function(msg) {consolearray.push(msg)};
}

// new browsers have Date.now(), old IE doesnt. Fix that.
if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}



if (!Array.prototype.frontToBack) {
	Array.prototype.frontToBack = function() {
		this.push(this.shift());
	}
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}


function padToLength(str, len, pad, front) {
	str = str.toString();
	while (str.length < len) {
		if (!front) {
			str = str + pad;
		} else {
			str = pad + str;
		}
	}
	return str;
}


function loadImages(src, callback, callbackArg) {
	src instanceof Array || (src = [src]);
	for (var e = src.length, f = 0, g = e; g--;) {
		console.log("loading " + src[g]);
		var b = document.createElement("img");
		b.onload = function() {
			f++; 
			f >= e && isFunction(callback) && callback(callbackArg)
		};
		b.src = src[g];
	}
}

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
}


function randOrd(){
	return (Math.round(Math.random())-0.5);
}
function shuffle(a) {
	return a.sort(randOrd)
}



function sortArrayOn($arr, $key) {
	return $arr.sort(
		function(a, b) {
			return (a[$key] > b[$key]) - (a[$key] < b[$key]);
		}
	);
};


function sortArrayOnFauxY($arr) {
	return $arr.sort(
		function(a, b) {
			if (parseInt(a.y) > parseInt(b.y)) return 1;
			if (parseInt(a.y) < parseInt(b.y)) return -1;
			return 0;
			
			//return ((a.y) > (b.y)) - ((a.y) < (b.y));
			//return ((a.y + a.z + a.r) > (b.y + b.z + b.r)) - ((a.y + a.z + a.r) < (b.y + b.z + b.r));
		}
	);
};




function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}


function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == c_name) {
			return unescape(y);
		}
	}
}



function d2r(d) {
	return d * (Math.PI/180);
}




function _GET(k) {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    if (vars[k]) return vars[k];
    return;
}



String.prototype.trim = function () {
	return this.replace( /^\\s*(\\S*(\\s+\\S+)*)\\s*$/, "$1");
}


/*
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
*/

function removeFromArrayByIndex(array, index) {
	array.splice(index, 1);
}

// fix to allow filter method in old IE
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp*/) {
    'use strict';

    if (this == null) {
      throw new TypeError();
    }

    var t = Object(this),
        len = t.length >>> 0,
        res, thisp, i, val;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    res = [];
    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t) {
        val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

// allow indexOf in old IE
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}