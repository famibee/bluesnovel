import { r as __toESM, t as __commonJSMin } from "./chunk.js";
var ENV = /* @__PURE__ */ ((_) => (_[_.WEBGL_LEGACY = 0] = "WEBGL_LEGACY", _[_.WEBGL = 1] = "WEBGL", _[_.WEBGL2 = 2] = "WEBGL2", _))(ENV || {}), RENDERER_TYPE = /* @__PURE__ */ ((_) => (_[_.UNKNOWN = 0] = "UNKNOWN", _[_.WEBGL = 1] = "WEBGL", _[_.CANVAS = 2] = "CANVAS", _))(RENDERER_TYPE || {}), BUFFER_BITS = /* @__PURE__ */ ((_) => (_[_.COLOR = 16384] = "COLOR", _[_.DEPTH = 256] = "DEPTH", _[_.STENCIL = 1024] = "STENCIL", _))(BUFFER_BITS || {}), BLEND_MODES = /* @__PURE__ */ ((_) => (_[_.NORMAL = 0] = "NORMAL", _[_.ADD = 1] = "ADD", _[_.MULTIPLY = 2] = "MULTIPLY", _[_.SCREEN = 3] = "SCREEN", _[_.OVERLAY = 4] = "OVERLAY", _[_.DARKEN = 5] = "DARKEN", _[_.LIGHTEN = 6] = "LIGHTEN", _[_.COLOR_DODGE = 7] = "COLOR_DODGE", _[_.COLOR_BURN = 8] = "COLOR_BURN", _[_.HARD_LIGHT = 9] = "HARD_LIGHT", _[_.SOFT_LIGHT = 10] = "SOFT_LIGHT", _[_.DIFFERENCE = 11] = "DIFFERENCE", _[_.EXCLUSION = 12] = "EXCLUSION", _[_.HUE = 13] = "HUE", _[_.SATURATION = 14] = "SATURATION", _[_.COLOR = 15] = "COLOR", _[_.LUMINOSITY = 16] = "LUMINOSITY", _[_.NORMAL_NPM = 17] = "NORMAL_NPM", _[_.ADD_NPM = 18] = "ADD_NPM", _[_.SCREEN_NPM = 19] = "SCREEN_NPM", _[_.NONE = 20] = "NONE", _[_.SRC_OVER = 0] = "SRC_OVER", _[_.SRC_IN = 21] = "SRC_IN", _[_.SRC_OUT = 22] = "SRC_OUT", _[_.SRC_ATOP = 23] = "SRC_ATOP", _[_.DST_OVER = 24] = "DST_OVER", _[_.DST_IN = 25] = "DST_IN", _[_.DST_OUT = 26] = "DST_OUT", _[_.DST_ATOP = 27] = "DST_ATOP", _[_.ERASE = 26] = "ERASE", _[_.SUBTRACT = 28] = "SUBTRACT", _[_.XOR = 29] = "XOR", _))(BLEND_MODES || {}), DRAW_MODES = /* @__PURE__ */ ((_) => (_[_.POINTS = 0] = "POINTS", _[_.LINES = 1] = "LINES", _[_.LINE_LOOP = 2] = "LINE_LOOP", _[_.LINE_STRIP = 3] = "LINE_STRIP", _[_.TRIANGLES = 4] = "TRIANGLES", _[_.TRIANGLE_STRIP = 5] = "TRIANGLE_STRIP", _[_.TRIANGLE_FAN = 6] = "TRIANGLE_FAN", _))(DRAW_MODES || {}), FORMATS = /* @__PURE__ */ ((_) => (_[_.RGBA = 6408] = "RGBA", _[_.RGB = 6407] = "RGB", _[_.RG = 33319] = "RG", _[_.RED = 6403] = "RED", _[_.RGBA_INTEGER = 36249] = "RGBA_INTEGER", _[_.RGB_INTEGER = 36248] = "RGB_INTEGER", _[_.RG_INTEGER = 33320] = "RG_INTEGER", _[_.RED_INTEGER = 36244] = "RED_INTEGER", _[_.ALPHA = 6406] = "ALPHA", _[_.LUMINANCE = 6409] = "LUMINANCE", _[_.LUMINANCE_ALPHA = 6410] = "LUMINANCE_ALPHA", _[_.DEPTH_COMPONENT = 6402] = "DEPTH_COMPONENT", _[_.DEPTH_STENCIL = 34041] = "DEPTH_STENCIL", _))(FORMATS || {}), TARGETS = /* @__PURE__ */ ((_) => (_[_.TEXTURE_2D = 3553] = "TEXTURE_2D", _[_.TEXTURE_CUBE_MAP = 34067] = "TEXTURE_CUBE_MAP", _[_.TEXTURE_2D_ARRAY = 35866] = "TEXTURE_2D_ARRAY", _[_.TEXTURE_CUBE_MAP_POSITIVE_X = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X", _[_.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X", _[_.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y", _[_.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y", _[_.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z", _[_.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z", _))(TARGETS || {}), TYPES = /* @__PURE__ */ ((_) => (_[_.UNSIGNED_BYTE = 5121] = "UNSIGNED_BYTE", _[_.UNSIGNED_SHORT = 5123] = "UNSIGNED_SHORT", _[_.UNSIGNED_SHORT_5_6_5 = 33635] = "UNSIGNED_SHORT_5_6_5", _[_.UNSIGNED_SHORT_4_4_4_4 = 32819] = "UNSIGNED_SHORT_4_4_4_4", _[_.UNSIGNED_SHORT_5_5_5_1 = 32820] = "UNSIGNED_SHORT_5_5_5_1", _[_.UNSIGNED_INT = 5125] = "UNSIGNED_INT", _[_.UNSIGNED_INT_10F_11F_11F_REV = 35899] = "UNSIGNED_INT_10F_11F_11F_REV", _[_.UNSIGNED_INT_2_10_10_10_REV = 33640] = "UNSIGNED_INT_2_10_10_10_REV", _[_.UNSIGNED_INT_24_8 = 34042] = "UNSIGNED_INT_24_8", _[_.UNSIGNED_INT_5_9_9_9_REV = 35902] = "UNSIGNED_INT_5_9_9_9_REV", _[_.BYTE = 5120] = "BYTE", _[_.SHORT = 5122] = "SHORT", _[_.INT = 5124] = "INT", _[_.FLOAT = 5126] = "FLOAT", _[_.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV", _[_.HALF_FLOAT = 36193] = "HALF_FLOAT", _))(TYPES || {}), SAMPLER_TYPES = /* @__PURE__ */ ((_) => (_[_.FLOAT = 0] = "FLOAT", _[_.INT = 1] = "INT", _[_.UINT = 2] = "UINT", _))(SAMPLER_TYPES || {}), SCALE_MODES = /* @__PURE__ */ ((_) => (_[_.NEAREST = 0] = "NEAREST", _[_.LINEAR = 1] = "LINEAR", _))(SCALE_MODES || {}), WRAP_MODES = /* @__PURE__ */ ((_) => (_[_.CLAMP = 33071] = "CLAMP", _[_.REPEAT = 10497] = "REPEAT", _[_.MIRRORED_REPEAT = 33648] = "MIRRORED_REPEAT", _))(WRAP_MODES || {}), MIPMAP_MODES = /* @__PURE__ */ ((_) => (_[_.OFF = 0] = "OFF", _[_.POW2 = 1] = "POW2", _[_.ON = 2] = "ON", _[_.ON_MANUAL = 3] = "ON_MANUAL", _))(MIPMAP_MODES || {}), ALPHA_MODES = /* @__PURE__ */ ((_) => (_[_.NPM = 0] = "NPM", _[_.UNPACK = 1] = "UNPACK", _[_.PMA = 2] = "PMA", _[_.NO_PREMULTIPLIED_ALPHA = 0] = "NO_PREMULTIPLIED_ALPHA", _[_.PREMULTIPLY_ON_UPLOAD = 1] = "PREMULTIPLY_ON_UPLOAD", _[_.PREMULTIPLIED_ALPHA = 2] = "PREMULTIPLIED_ALPHA", _))(ALPHA_MODES || {}), CLEAR_MODES = /* @__PURE__ */ ((_) => (_[_.NO = 0] = "NO", _[_.YES = 1] = "YES", _[_.AUTO = 2] = "AUTO", _[_.BLEND = 0] = "BLEND", _[_.CLEAR = 1] = "CLEAR", _[_.BLIT = 2] = "BLIT", _))(CLEAR_MODES || {}), GC_MODES = /* @__PURE__ */ ((_) => (_[_.AUTO = 0] = "AUTO", _[_.MANUAL = 1] = "MANUAL", _))(GC_MODES || {}), PRECISION = /* @__PURE__ */ ((_) => (_.LOW = "lowp", _.MEDIUM = "mediump", _.HIGH = "highp", _))(PRECISION || {}), MASK_TYPES = /* @__PURE__ */ ((_) => (_[_.NONE = 0] = "NONE", _[_.SCISSOR = 1] = "SCISSOR", _[_.STENCIL = 2] = "STENCIL", _[_.SPRITE = 3] = "SPRITE", _[_.COLOR = 4] = "COLOR", _))(MASK_TYPES || {}), COLOR_MASK_BITS = /* @__PURE__ */ ((_) => (_[_.RED = 1] = "RED", _[_.GREEN = 2] = "GREEN", _[_.BLUE = 4] = "BLUE", _[_.ALPHA = 8] = "ALPHA", _))(COLOR_MASK_BITS || {}), MSAA_QUALITY = /* @__PURE__ */ ((_) => (_[_.NONE = 0] = "NONE", _[_.LOW = 2] = "LOW", _[_.MEDIUM = 4] = "MEDIUM", _[_.HIGH = 8] = "HIGH", _))(MSAA_QUALITY || {}), BUFFER_TYPE = /* @__PURE__ */ ((_) => (_[_.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER", _[_.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", _[_.UNIFORM_BUFFER = 35345] = "UNIFORM_BUFFER", _))(BUFFER_TYPE || {}), settings = {
	ADAPTER: {
		createCanvas: (_, C) => {
			let T = document.createElement("canvas");
			return T.width = _, T.height = C, T;
		},
		getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
		getWebGLRenderingContext: () => WebGLRenderingContext,
		getNavigator: () => navigator,
		getBaseUrl: () => document.baseURI ?? window.location.href,
		getFontFaceSet: () => document.fonts,
		fetch: (_, C) => fetch(_, C),
		parseXML: (_) => new DOMParser().parseFromString(_, "text/xml")
	},
	RESOLUTION: 1,
	CREATE_IMAGE_BITMAP: !1,
	ROUND_PIXELS: !1
}, appleIphone = /iPhone/i, appleIpod = /iPod/i, appleTablet = /iPad/i, appleUniversal = /\biOS-universal(?:.+)Mac\b/i, androidPhone = /\bAndroid(?:.+)Mobile\b/i, androidTablet = /Android/i, amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, amazonTablet = /Silk/i, windowsPhone = /Windows Phone/i, windowsTablet = /\bWindows(?:.+)ARM\b/i, otherBlackBerry = /BlackBerry/i, otherBlackBerry10 = /BB10/i, otherOpera = /Opera Mini/i, otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i, otherFirefox = /Mobile(?:.+)Firefox\b/i, isAppleTabletOnIos13 = function(_) {
	return _ !== void 0 && _.platform === "MacIntel" && typeof _.maxTouchPoints == "number" && _.maxTouchPoints > 1 && typeof MSStream > "u";
};
function createMatch(_) {
	return function(C) {
		return C.test(_);
	};
}
function isMobile$1(_) {
	var C = {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	};
	!_ && typeof navigator < "u" ? C = {
		userAgent: navigator.userAgent,
		platform: navigator.platform,
		maxTouchPoints: navigator.maxTouchPoints || 0
	} : typeof _ == "string" ? C.userAgent = _ : _ && _.userAgent && (C = {
		userAgent: _.userAgent,
		platform: _.platform,
		maxTouchPoints: _.maxTouchPoints || 0
	});
	var T = C.userAgent, E = T.split("[FBAN");
	E[1] !== void 0 && (T = E[0]), E = T.split("Twitter"), E[1] !== void 0 && (T = E[0]);
	var D = createMatch(T), O = {
		apple: {
			phone: D(appleIphone) && !D(windowsPhone),
			ipod: D(appleIpod),
			tablet: !D(appleIphone) && (D(appleTablet) || isAppleTabletOnIos13(C)) && !D(windowsPhone),
			universal: D(appleUniversal),
			device: (D(appleIphone) || D(appleIpod) || D(appleTablet) || D(appleUniversal) || isAppleTabletOnIos13(C)) && !D(windowsPhone)
		},
		amazon: {
			phone: D(amazonPhone),
			tablet: !D(amazonPhone) && D(amazonTablet),
			device: D(amazonPhone) || D(amazonTablet)
		},
		android: {
			phone: !D(windowsPhone) && D(amazonPhone) || !D(windowsPhone) && D(androidPhone),
			tablet: !D(windowsPhone) && !D(amazonPhone) && !D(androidPhone) && (D(amazonTablet) || D(androidTablet)),
			device: !D(windowsPhone) && (D(amazonPhone) || D(amazonTablet) || D(androidPhone) || D(androidTablet)) || D(/\bokhttp\b/i)
		},
		windows: {
			phone: D(windowsPhone),
			tablet: D(windowsTablet),
			device: D(windowsPhone) || D(windowsTablet)
		},
		other: {
			blackberry: D(otherBlackBerry),
			blackberry10: D(otherBlackBerry10),
			opera: D(otherOpera),
			firefox: D(otherFirefox),
			chrome: D(otherChrome),
			device: D(otherBlackBerry) || D(otherBlackBerry10) || D(otherOpera) || D(otherFirefox) || D(otherChrome)
		},
		any: !1,
		phone: !1,
		tablet: !1
	};
	return O.any = O.apple.device || O.android.device || O.windows.device || O.other.device, O.phone = O.apple.phone || O.android.phone || O.windows.phone, O.tablet = O.apple.tablet || O.android.tablet || O.windows.tablet, O;
}
var isMobile = (isMobile$1.default ?? isMobile$1)(globalThis.navigator);
settings.RETINA_PREFIX = /@([0-9\.]+)x/, settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1;
var require_eventemitter3 = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = Object.prototype.hasOwnProperty, E = "~";
	function D() {}
	Object.create && (D.prototype = Object.create(null), new D().__proto__ || (E = !1));
	function O(_, C, T) {
		this.fn = _, this.context = C, this.once = T || !1;
	}
	function A(_, C, T, D, A) {
		if (typeof T != "function") throw TypeError("The listener must be a function");
		var P = new O(T, D || _, A), F = E ? E + C : C;
		return _._events[F] ? _._events[F].fn ? _._events[F] = [_._events[F], P] : _._events[F].push(P) : (_._events[F] = P, _._eventsCount++), _;
	}
	function P(_, C) {
		--_._eventsCount === 0 ? _._events = new D() : delete _._events[C];
	}
	function F() {
		this._events = new D(), this._eventsCount = 0;
	}
	F.prototype.eventNames = function() {
		var _ = [], C, D;
		if (this._eventsCount === 0) return _;
		for (D in C = this._events) T.call(C, D) && _.push(E ? D.slice(1) : D);
		return Object.getOwnPropertySymbols ? _.concat(Object.getOwnPropertySymbols(C)) : _;
	}, F.prototype.listeners = function(_) {
		var C = E ? E + _ : _, T = this._events[C];
		if (!T) return [];
		if (T.fn) return [T.fn];
		for (var D = 0, O = T.length, A = Array(O); D < O; D++) A[D] = T[D].fn;
		return A;
	}, F.prototype.listenerCount = function(_) {
		var C = E ? E + _ : _, T = this._events[C];
		return T ? T.fn ? 1 : T.length : 0;
	}, F.prototype.emit = function(_, C, T, D, O, A) {
		var P = E ? E + _ : _;
		if (!this._events[P]) return !1;
		var F = this._events[P], I = arguments.length, L, R;
		if (F.fn) {
			switch (F.once && this.removeListener(_, F.fn, void 0, !0), I) {
				case 1: return F.fn.call(F.context), !0;
				case 2: return F.fn.call(F.context, C), !0;
				case 3: return F.fn.call(F.context, C, T), !0;
				case 4: return F.fn.call(F.context, C, T, D), !0;
				case 5: return F.fn.call(F.context, C, T, D, O), !0;
				case 6: return F.fn.call(F.context, C, T, D, O, A), !0;
			}
			for (R = 1, L = Array(I - 1); R < I; R++) L[R - 1] = arguments[R];
			F.fn.apply(F.context, L);
		} else {
			var z = F.length, B;
			for (R = 0; R < z; R++) switch (F[R].once && this.removeListener(_, F[R].fn, void 0, !0), I) {
				case 1:
					F[R].fn.call(F[R].context);
					break;
				case 2:
					F[R].fn.call(F[R].context, C);
					break;
				case 3:
					F[R].fn.call(F[R].context, C, T);
					break;
				case 4:
					F[R].fn.call(F[R].context, C, T, D);
					break;
				default:
					if (!L) for (B = 1, L = Array(I - 1); B < I; B++) L[B - 1] = arguments[B];
					F[R].fn.apply(F[R].context, L);
			}
		}
		return !0;
	}, F.prototype.on = function(_, C, T) {
		return A(this, _, C, T, !1);
	}, F.prototype.once = function(_, C, T) {
		return A(this, _, C, T, !0);
	}, F.prototype.removeListener = function(_, C, T, D) {
		var O = E ? E + _ : _;
		if (!this._events[O]) return this;
		if (!C) return P(this, O), this;
		var A = this._events[O];
		if (A.fn) A.fn === C && (!D || A.once) && (!T || A.context === T) && P(this, O);
		else {
			for (var F = 0, I = [], L = A.length; F < L; F++) (A[F].fn !== C || D && !A[F].once || T && A[F].context !== T) && I.push(A[F]);
			I.length ? this._events[O] = I.length === 1 ? I[0] : I : P(this, O);
		}
		return this;
	}, F.prototype.removeAllListeners = function(_) {
		var C;
		return _ ? (C = E ? E + _ : _, this._events[C] && P(this, C)) : (this._events = new D(), this._eventsCount = 0), this;
	}, F.prototype.off = F.prototype.removeListener, F.prototype.addListener = F.prototype.on, F.prefixed = E, F.EventEmitter = F, C !== void 0 && (C.exports = F);
})), require_earcut = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = T, C.exports.default = T;
	function T(_, C, T) {
		T ||= 2;
		var D = C && C.length, A = D ? C[0] * T : _.length, P = E(_, 0, A, T, !0), F = [];
		if (!P || P.next === P.prev) return F;
		var I, R, z, B, V, U, W;
		if (D && (P = L(_, C, P, T)), _.length > 80 * T) {
			I = z = _[0], R = B = _[1];
			for (var fo = T; fo < A; fo += T) V = _[fo], U = _[fo + 1], V < I && (I = V), U < R && (R = U), V > z && (z = V), U > B && (B = U);
			W = Math.max(z - I, B - R), W = W === 0 ? 0 : 32767 / W;
		}
		return O(P, F, T, I, R, W, 0), F;
	}
	function E(_, C, T, E, D) {
		var O, A;
		if (D === bo(_, C, T, E) > 0) for (O = C; O < T; O += E) A = _o(O, _[O], _[O + 1], A);
		else for (O = T - E; O >= C; O -= E) A = _o(O, _[O], _[O + 1], A);
		return A && Y(A, A.next) && (vo(A), A = A.next), A;
	}
	function D(_, C) {
		if (!_) return _;
		C ||= _;
		var T = _, E;
		do
			if (E = !1, !T.steiner && (Y(T, T.next) || J(T.prev, T, T.next) === 0)) {
				if (vo(T), T = C = T.prev, T === T.next) break;
				E = !0;
			} else T = T.next;
		while (E || T !== C);
		return C;
	}
	function O(_, C, T, E, L, R, z) {
		if (_) {
			!z && R && U(_, E, L, R);
			for (var B = _, V, W; _.prev !== _.next;) {
				if (V = _.prev, W = _.next, R ? P(_, E, L, R) : A(_)) {
					C.push(V.i / T | 0), C.push(_.i / T | 0), C.push(W.i / T | 0), vo(_), _ = W.next, B = W.next;
					continue;
				}
				if (_ = W, _ === B) {
					z ? z === 1 ? (_ = F(D(_), C, T), O(_, C, T, E, L, R, 2)) : z === 2 && I(_, C, T, E, L, R) : O(D(_), C, T, E, L, R, 1);
					break;
				}
			}
		}
	}
	function A(_) {
		var C = _.prev, T = _, E = _.next;
		if (J(C, T, E) >= 0) return !1;
		for (var D = C.x, O = T.x, A = E.x, P = C.y, F = T.y, I = E.y, L = D < O ? D < A ? D : A : O < A ? O : A, R = P < F ? P < I ? P : I : F < I ? F : I, z = D > O ? D > A ? D : A : O > A ? O : A, B = P > F ? P > I ? P : I : F > I ? F : I, V = E.next; V !== C;) {
			if (V.x >= L && V.x <= z && V.y >= R && V.y <= B && K(D, P, O, F, A, I, V.x, V.y) && J(V.prev, V, V.next) >= 0) return !1;
			V = V.next;
		}
		return !0;
	}
	function P(_, C, T, E) {
		var D = _.prev, O = _, A = _.next;
		if (J(D, O, A) >= 0) return !1;
		for (var P = D.x, F = O.x, I = A.x, L = D.y, R = O.y, z = A.y, B = P < F ? P < I ? P : I : F < I ? F : I, V = L < R ? L < z ? L : z : R < z ? R : z, U = P > F ? P > I ? P : I : F > I ? F : I, W = L > R ? L > z ? L : z : R > z ? R : z, G = fo(B, V, C, T, E), q = fo(U, W, C, T, E), Y = _.prevZ, X = _.nextZ; Y && Y.z >= G && X && X.z <= q;) {
			if (Y.x >= B && Y.x <= U && Y.y >= V && Y.y <= W && Y !== D && Y !== A && K(P, L, F, R, I, z, Y.x, Y.y) && J(Y.prev, Y, Y.next) >= 0 || (Y = Y.prevZ, X.x >= B && X.x <= U && X.y >= V && X.y <= W && X !== D && X !== A && K(P, L, F, R, I, z, X.x, X.y) && J(X.prev, X, X.next) >= 0)) return !1;
			X = X.nextZ;
		}
		for (; Y && Y.z >= G;) {
			if (Y.x >= B && Y.x <= U && Y.y >= V && Y.y <= W && Y !== D && Y !== A && K(P, L, F, R, I, z, Y.x, Y.y) && J(Y.prev, Y, Y.next) >= 0) return !1;
			Y = Y.prevZ;
		}
		for (; X && X.z <= q;) {
			if (X.x >= B && X.x <= U && X.y >= V && X.y <= W && X !== D && X !== A && K(P, L, F, R, I, z, X.x, X.y) && J(X.prev, X, X.next) >= 0) return !1;
			X = X.nextZ;
		}
		return !0;
	}
	function F(_, C, T) {
		var E = _;
		do {
			var O = E.prev, A = E.next.next;
			!Y(O, A) && X(O, E, E.next, A) && mo(O, A) && mo(A, O) && (C.push(O.i / T | 0), C.push(E.i / T | 0), C.push(A.i / T | 0), vo(E), vo(E.next), E = _ = A), E = E.next;
		} while (E !== _);
		return D(E);
	}
	function I(_, C, T, E, A, P) {
		var F = _;
		do {
			for (var I = F.next.next; I !== F.prev;) {
				if (F.i !== I.i && q(F, I)) {
					var L = go(F, I);
					F = D(F, F.next), L = D(L, L.next), O(F, C, T, E, A, P, 0), O(L, C, T, E, A, P, 0);
					return;
				}
				I = I.next;
			}
			F = F.next;
		} while (F !== _);
	}
	function L(_, C, T, D) {
		var O = [], A, P, F, I, L;
		for (A = 0, P = C.length; A < P; A++) F = C[A] * D, I = A < P - 1 ? C[A + 1] * D : _.length, L = E(_, F, I, D, !1), L === L.next && (L.steiner = !0), O.push(G(L));
		for (O.sort(R), A = 0; A < O.length; A++) T = z(O[A], T);
		return T;
	}
	function R(_, C) {
		return _.x - C.x;
	}
	function z(_, C) {
		var T = B(_, C);
		if (!T) return C;
		var E = go(T, _);
		return D(E, E.next), D(T, T.next);
	}
	function B(_, C) {
		var T = C, E = _.x, D = _.y, O = -Infinity, A;
		do {
			if (D <= T.y && D >= T.next.y && T.next.y !== T.y) {
				var P = T.x + (D - T.y) * (T.next.x - T.x) / (T.next.y - T.y);
				if (P <= E && P > O && (O = P, A = T.x < T.next.x ? T : T.next, P === E)) return A;
			}
			T = T.next;
		} while (T !== C);
		if (!A) return null;
		var F = A, I = A.x, L = A.y, R = Infinity, z;
		T = A;
		do
			E >= T.x && T.x >= I && E !== T.x && K(D < L ? E : O, D, I, L, D < L ? O : E, D, T.x, T.y) && (z = Math.abs(D - T.y) / (E - T.x), mo(T, _) && (z < R || z === R && (T.x > A.x || T.x === A.x && V(A, T))) && (A = T, R = z)), T = T.next;
		while (T !== F);
		return A;
	}
	function V(_, C) {
		return J(_.prev, _, C.prev) < 0 && J(C.next, _, _.next) < 0;
	}
	function U(_, C, T, E) {
		var D = _;
		do
			D.z === 0 && (D.z = fo(D.x, D.y, C, T, E)), D.prevZ = D.prev, D.nextZ = D.next, D = D.next;
		while (D !== _);
		D.prevZ.nextZ = null, D.prevZ = null, W(D);
	}
	function W(_) {
		var C, T, E, D, O, A, P, F, I = 1;
		do {
			for (T = _, _ = null, O = null, A = 0; T;) {
				for (A++, E = T, P = 0, C = 0; C < I && (P++, E = E.nextZ, E); C++);
				for (F = I; P > 0 || F > 0 && E;) P !== 0 && (F === 0 || !E || T.z <= E.z) ? (D = T, T = T.nextZ, P--) : (D = E, E = E.nextZ, F--), O ? O.nextZ = D : _ = D, D.prevZ = O, O = D;
				T = E;
			}
			O.nextZ = null, I *= 2;
		} while (A > 1);
		return _;
	}
	function fo(_, C, T, E, D) {
		return _ = (_ - T) * D | 0, C = (C - E) * D | 0, _ = (_ | _ << 8) & 16711935, _ = (_ | _ << 4) & 252645135, _ = (_ | _ << 2) & 858993459, _ = (_ | _ << 1) & 1431655765, C = (C | C << 8) & 16711935, C = (C | C << 4) & 252645135, C = (C | C << 2) & 858993459, C = (C | C << 1) & 1431655765, _ | C << 1;
	}
	function G(_) {
		var C = _, T = _;
		do
			(C.x < T.x || C.x === T.x && C.y < T.y) && (T = C), C = C.next;
		while (C !== _);
		return T;
	}
	function K(_, C, T, E, D, O, A, P) {
		return (D - A) * (C - P) >= (_ - A) * (O - P) && (_ - A) * (E - P) >= (T - A) * (C - P) && (T - A) * (O - P) >= (D - A) * (E - P);
	}
	function q(_, C) {
		return _.next.i !== C.i && _.prev.i !== C.i && !Q(_, C) && (mo(_, C) && mo(C, _) && ho(_, C) && (J(_.prev, _, C.prev) || J(_, C.prev, C)) || Y(_, C) && J(_.prev, _, _.next) > 0 && J(C.prev, C, C.next) > 0);
	}
	function J(_, C, T) {
		return (C.y - _.y) * (T.x - C.x) - (C.x - _.x) * (T.y - C.y);
	}
	function Y(_, C) {
		return _.x === C.x && _.y === C.y;
	}
	function X(_, C, T, E) {
		var D = Z(J(_, C, T)), O = Z(J(_, C, E)), A = Z(J(T, E, _)), P = Z(J(T, E, C));
		return !!(D !== O && A !== P || D === 0 && po(_, T, C) || O === 0 && po(_, E, C) || A === 0 && po(T, _, E) || P === 0 && po(T, C, E));
	}
	function po(_, C, T) {
		return C.x <= Math.max(_.x, T.x) && C.x >= Math.min(_.x, T.x) && C.y <= Math.max(_.y, T.y) && C.y >= Math.min(_.y, T.y);
	}
	function Z(_) {
		return _ > 0 ? 1 : _ < 0 ? -1 : 0;
	}
	function Q(_, C) {
		var T = _;
		do {
			if (T.i !== _.i && T.next.i !== _.i && T.i !== C.i && T.next.i !== C.i && X(T, T.next, _, C)) return !0;
			T = T.next;
		} while (T !== _);
		return !1;
	}
	function mo(_, C) {
		return J(_.prev, _, _.next) < 0 ? J(_, C, _.next) >= 0 && J(_, _.prev, C) >= 0 : J(_, C, _.prev) < 0 || J(_, _.next, C) < 0;
	}
	function ho(_, C) {
		var T = _, E = !1, D = (_.x + C.x) / 2, O = (_.y + C.y) / 2;
		do
			T.y > O != T.next.y > O && T.next.y !== T.y && D < (T.next.x - T.x) * (O - T.y) / (T.next.y - T.y) + T.x && (E = !E), T = T.next;
		while (T !== _);
		return E;
	}
	function go(_, C) {
		var T = new yo(_.i, _.x, _.y), E = new yo(C.i, C.x, C.y), D = _.next, O = C.prev;
		return _.next = C, C.prev = _, T.next = D, D.prev = T, E.next = T, T.prev = E, O.next = E, E.prev = O, E;
	}
	function _o(_, C, T, E) {
		var D = new yo(_, C, T);
		return E ? (D.next = E.next, D.prev = E, E.next.prev = D, E.next = D) : (D.prev = D, D.next = D), D;
	}
	function vo(_) {
		_.next.prev = _.prev, _.prev.next = _.next, _.prevZ && (_.prevZ.nextZ = _.nextZ), _.nextZ && (_.nextZ.prevZ = _.prevZ);
	}
	function yo(_, C, T) {
		this.i = _, this.x = C, this.y = T, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
	}
	T.deviation = function(_, C, T, E) {
		var D = C && C.length, O = D ? C[0] * T : _.length, A = Math.abs(bo(_, 0, O, T));
		if (D) for (var P = 0, F = C.length; P < F; P++) {
			var I = C[P] * T, L = P < F - 1 ? C[P + 1] * T : _.length;
			A -= Math.abs(bo(_, I, L, T));
		}
		var R = 0;
		for (P = 0; P < E.length; P += 3) {
			var z = E[P] * T, B = E[P + 1] * T, V = E[P + 2] * T;
			R += Math.abs((_[z] - _[V]) * (_[B + 1] - _[z + 1]) - (_[z] - _[B]) * (_[V + 1] - _[z + 1]));
		}
		return A === 0 && R === 0 ? 0 : Math.abs((R - A) / A);
	};
	function bo(_, C, T, E) {
		for (var D = 0, O = C, A = T - E; O < T; O += E) D += (_[A] - _[O]) * (_[O + 1] + _[A + 1]), A = O;
		return D;
	}
	T.flatten = function(_) {
		for (var C = _[0][0].length, T = {
			vertices: [],
			holes: [],
			dimensions: C
		}, E = 0, D = 0; D < _.length; D++) {
			for (var O = 0; O < _[D].length; O++) for (var A = 0; A < C; A++) T.vertices.push(_[D][O][A]);
			D > 0 && (E += _[D - 1].length, T.holes.push(E));
		}
		return T;
	};
})), require_punycode = /* @__PURE__ */ __commonJSMin(((_, C) => {
	(function(T) {
		var E = typeof _ == "object" && _ && !_.nodeType && _, D = typeof C == "object" && C && !C.nodeType && C, O = typeof global == "object" && global;
		(O.global === O || O.window === O || O.self === O) && (T = O);
		var A, P = 2147483647, F = 36, I = 1, L = 26, R = 38, z = 700, B = 72, V = 128, U = "-", W = /^xn--/, fo = /[^\x20-\x7E]/, G = /[\x2E\u3002\uFF0E\uFF61]/g, K = {
			overflow: "Overflow: input needs wider integers to process",
			"not-basic": "Illegal input >= 0x80 (not a basic code point)",
			"invalid-input": "Invalid input"
		}, q = F - I, J = Math.floor, Y = String.fromCharCode, X;
		function po(_) {
			throw RangeError(K[_]);
		}
		function Z(_, C) {
			for (var T = _.length, E = []; T--;) E[T] = C(_[T]);
			return E;
		}
		function Q(_, C) {
			var T = _.split("@"), E = "";
			T.length > 1 && (E = T[0] + "@", _ = T[1]), _ = _.replace(G, ".");
			var D = Z(_.split("."), C).join(".");
			return E + D;
		}
		function mo(_) {
			for (var C = [], T = 0, E = _.length, D, O; T < E;) D = _.charCodeAt(T++), D >= 55296 && D <= 56319 && T < E ? (O = _.charCodeAt(T++), (O & 64512) == 56320 ? C.push(((D & 1023) << 10) + (O & 1023) + 65536) : (C.push(D), T--)) : C.push(D);
			return C;
		}
		function ho(_) {
			return Z(_, function(_) {
				var C = "";
				return _ > 65535 && (_ -= 65536, C += Y(_ >>> 10 & 1023 | 55296), _ = 56320 | _ & 1023), C += Y(_), C;
			}).join("");
		}
		function go(_) {
			return _ - 48 < 10 ? _ - 22 : _ - 65 < 26 ? _ - 65 : _ - 97 < 26 ? _ - 97 : F;
		}
		function _o(_, C) {
			return _ + 22 + 75 * (_ < 26) - ((C != 0) << 5);
		}
		function vo(_, C, T) {
			var E = 0;
			for (_ = T ? J(_ / z) : _ >> 1, _ += J(_ / C); _ > q * L >> 1; E += F) _ = J(_ / q);
			return J(E + (q + 1) * _ / (_ + R));
		}
		function yo(_) {
			var C = [], T = _.length, E, D = 0, O = V, A = B, R = _.lastIndexOf(U), z, W, fo, G, K, q, Y, X;
			for (R < 0 && (R = 0), z = 0; z < R; ++z) _.charCodeAt(z) >= 128 && po("not-basic"), C.push(_.charCodeAt(z));
			for (W = R > 0 ? R + 1 : 0; W < T;) {
				for (fo = D, G = 1, K = F; W >= T && po("invalid-input"), q = go(_.charCodeAt(W++)), (q >= F || q > J((P - D) / G)) && po("overflow"), D += q * G, Y = K <= A ? I : K >= A + L ? L : K - A, !(q < Y); K += F) X = F - Y, G > J(P / X) && po("overflow"), G *= X;
				E = C.length + 1, A = vo(D - fo, E, fo == 0), J(D / E) > P - O && po("overflow"), O += J(D / E), D %= E, C.splice(D++, 0, O);
			}
			return ho(C);
		}
		function bo(_) {
			var C, T, E, D, O, A, R, z, W, fo, G, K = [], q, X, Z, Q;
			for (_ = mo(_), q = _.length, C = V, T = 0, O = B, A = 0; A < q; ++A) G = _[A], G < 128 && K.push(Y(G));
			for (E = D = K.length, D && K.push(U); E < q;) {
				for (R = P, A = 0; A < q; ++A) G = _[A], G >= C && G < R && (R = G);
				for (X = E + 1, R - C > J((P - T) / X) && po("overflow"), T += (R - C) * X, C = R, A = 0; A < q; ++A) if (G = _[A], G < C && ++T > P && po("overflow"), G == C) {
					for (z = T, W = F; fo = W <= O ? I : W >= O + L ? L : W - O, !(z < fo); W += F) Q = z - fo, Z = F - fo, K.push(Y(_o(fo + Q % Z, 0))), z = J(Q / Z);
					K.push(Y(_o(z, 0))), O = vo(T, X, E == D), T = 0, ++E;
				}
				++T, ++C;
			}
			return K.join("");
		}
		function xo(_) {
			return Q(_, function(_) {
				return W.test(_) ? yo(_.slice(4).toLowerCase()) : _;
			});
		}
		function So(_) {
			return Q(_, function(_) {
				return fo.test(_) ? "xn--" + bo(_) : _;
			});
		}
		if (A = {
			version: "1.4.1",
			ucs2: {
				decode: mo,
				encode: ho
			},
			decode: yo,
			encode: bo,
			toASCII: So,
			toUnicode: xo
		}, typeof define == "function" && typeof define.amd == "object" && define.amd) define("punycode", function() {
			return A;
		});
		else if (E && D) if (C.exports == E) D.exports = A;
		else for (X in A) A.hasOwnProperty(X) && (E[X] = A[X]);
		else T.punycode = A;
	})(_);
})), require_type = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = TypeError;
})), require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = {};
})), require_object_inspect = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = typeof Map == "function" && Map.prototype, E = Object.getOwnPropertyDescriptor && T ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, D = T && E && typeof E.get == "function" ? E.get : null, O = T && Map.prototype.forEach, A = typeof Set == "function" && Set.prototype, P = Object.getOwnPropertyDescriptor && A ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, F = A && P && typeof P.get == "function" ? P.get : null, I = A && Set.prototype.forEach, L = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap.prototype.has : null, R = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet.prototype.has : null, z = typeof WeakRef == "function" && WeakRef.prototype ? WeakRef.prototype.deref : null, B = Boolean.prototype.valueOf, V = Object.prototype.toString, U = Function.prototype.toString, W = String.prototype.match, fo = String.prototype.slice, G = String.prototype.replace, K = String.prototype.toUpperCase, q = String.prototype.toLowerCase, J = RegExp.prototype.test, Y = Array.prototype.concat, X = Array.prototype.join, po = Array.prototype.slice, Z = Math.floor, Q = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, mo = Object.getOwnPropertySymbols, ho = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, go = typeof Symbol == "function" && typeof Symbol.iterator == "object", _o = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === go || "symbol") ? Symbol.toStringTag : null, vo = Object.prototype.propertyIsEnumerable, yo = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(_) {
		return _.__proto__;
	} : null);
	function bo(_, C) {
		if (_ === Infinity || _ === -Infinity || _ !== _ || _ && _ > -1e3 && _ < 1e3 || J.call(/e/, C)) return C;
		var T = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof _ == "number") {
			var E = _ < 0 ? -Z(-_) : Z(_);
			if (E !== _) {
				var D = String(E), O = fo.call(C, D.length + 1);
				return G.call(D, T, "$&_") + "." + G.call(G.call(O, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return G.call(C, T, "$&_");
	}
	var xo = require___vite_browser_external(), So = xo.custom, Co = Lo(So) ? So : null, wo = {
		__proto__: null,
		double: "\"",
		single: "'"
	}, To = {
		__proto__: null,
		double: /(["\\])/g,
		single: /(['\\])/g
	};
	C.exports = function _(C, T, E, A) {
		var P = T || {};
		if (Bo(P, "quoteStyle") && !Bo(wo, P.quoteStyle)) throw TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (Bo(P, "maxStringLength") && (typeof P.maxStringLength == "number" ? P.maxStringLength < 0 && P.maxStringLength !== Infinity : P.maxStringLength !== null)) throw TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var L = Bo(P, "customInspect") ? P.customInspect : !0;
		if (typeof L != "boolean" && L !== "symbol") throw TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (Bo(P, "indent") && P.indent !== null && P.indent !== "	" && !(parseInt(P.indent, 10) === P.indent && P.indent > 0)) throw TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (Bo(P, "numericSeparator") && typeof P.numericSeparator != "boolean") throw TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var R = P.numericSeparator;
		if (C === void 0) return "undefined";
		if (C === null) return "null";
		if (typeof C == "boolean") return C ? "true" : "false";
		if (typeof C == "string") return Xo(C, P);
		if (typeof C == "number") {
			if (C === 0) return Infinity / C > 0 ? "0" : "-0";
			var z = String(C);
			return R ? bo(C, z) : z;
		}
		if (typeof C == "bigint") {
			var V = String(C) + "n";
			return R ? bo(C, V) : V;
		}
		var U = P.depth === void 0 ? 5 : P.depth;
		if (E === void 0 && (E = 0), E >= U && U > 0 && typeof C == "object") return ko(C) ? "[Array]" : "[Object]";
		var W = ns(P, E);
		if (A === void 0) A = [];
		else if (Uo(A, C) >= 0) return "[Circular]";
		function K(C, T, D) {
			if (T && (A = po.call(A), A.push(T)), D) {
				var O = { depth: P.depth };
				return Bo(P, "quoteStyle") && (O.quoteStyle = P.quoteStyle), _(C, O, E + 1, A);
			}
			return _(C, P, E + 1, A);
		}
		if (typeof C == "function" && !jo(C)) {
			var J = Ho(C), Z = is(C, K);
			return "[Function" + (J ? ": " + J : " (anonymous)") + "]" + (Z.length > 0 ? " { " + X.call(Z, ", ") + " }" : "");
		}
		if (Lo(C)) {
			var mo = go ? G.call(String(C), /^(Symbol\(.*\))_[^)]*$/, "$1") : ho.call(C);
			return typeof C == "object" && !go ? Qo(mo) : mo;
		}
		if (Yo(C)) {
			for (var So = "<" + q.call(String(C.nodeName)), To = C.attributes || [], Oo = 0; Oo < To.length; Oo++) So += " " + To[Oo].name + "=" + Eo(Do(To[Oo].value), "double", P);
			return So += ">", C.childNodes && C.childNodes.length && (So += "..."), So += "</" + q.call(String(C.nodeName)) + ">", So;
		}
		if (ko(C)) {
			if (C.length === 0) return "[]";
			var No = is(C, K);
			return W && !ts(No) ? "[" + rs(No, W) + "]" : "[ " + X.call(No, ", ") + " ]";
		}
		if (Mo(C)) {
			var zo = is(C, K);
			return !("cause" in Error.prototype) && "cause" in C && !vo.call(C, "cause") ? "{ [" + String(C) + "] " + X.call(Y.call("[cause]: " + K(C.cause), zo), ", ") + " }" : zo.length === 0 ? "[" + String(C) + "]" : "{ [" + String(C) + "] " + X.call(zo, ", ") + " }";
		}
		if (typeof C == "object" && L) {
			if (Co && typeof C[Co] == "function" && xo) return xo(C, { depth: U - E });
			if (L !== "symbol" && typeof C.inspect == "function") return C.inspect();
		}
		if (Wo(C)) {
			var Zo = [];
			return O && O.call(C, function(_, T) {
				Zo.push(K(T, C, !0) + " => " + K(_, C));
			}), es("Map", D.call(C), Zo, W);
		}
		if (qo(C)) {
			var as = [];
			return I && I.call(C, function(_) {
				as.push(K(_, C));
			}), es("Set", F.call(C), as, W);
		}
		if (Go(C)) return $o("WeakMap");
		if (Jo(C)) return $o("WeakSet");
		if (Ko(C)) return $o("WeakRef");
		if (Fo(C)) return Qo(K(Number(C)));
		if (Ro(C)) return Qo(K(Q.call(C)));
		if (Io(C)) return Qo(B.call(C));
		if (Po(C)) return Qo(K(String(C)));
		if (typeof window < "u" && C === window) return "{ [object Window] }";
		if (typeof globalThis < "u" && C === globalThis || typeof global < "u" && C === global) return "{ [object globalThis] }";
		if (!Ao(C) && !jo(C)) {
			var os = is(C, K), ss = yo ? yo(C) === Object.prototype : C instanceof Object || C.constructor === Object, cs = C instanceof Object ? "" : "null prototype", ls = !ss && _o && Object(C) === C && _o in C ? fo.call(Vo(C), 8, -1) : cs ? "Object" : "", us = (ss || typeof C.constructor != "function" ? "" : C.constructor.name ? C.constructor.name + " " : "") + (ls || cs ? "[" + X.call(Y.call([], ls || [], cs || []), ": ") + "] " : "");
			return os.length === 0 ? us + "{}" : W ? us + "{" + rs(os, W) + "}" : us + "{ " + X.call(os, ", ") + " }";
		}
		return String(C);
	};
	function Eo(_, C, T) {
		var E = wo[T.quoteStyle || C];
		return E + _ + E;
	}
	function Do(_) {
		return G.call(String(_), /"/g, "&quot;");
	}
	function Oo(_) {
		return !_o || !(typeof _ == "object" && (_o in _ || _[_o] !== void 0));
	}
	function ko(_) {
		return Vo(_) === "[object Array]" && Oo(_);
	}
	function Ao(_) {
		return Vo(_) === "[object Date]" && Oo(_);
	}
	function jo(_) {
		return Vo(_) === "[object RegExp]" && Oo(_);
	}
	function Mo(_) {
		return Vo(_) === "[object Error]" && Oo(_);
	}
	function Po(_) {
		return Vo(_) === "[object String]" && Oo(_);
	}
	function Fo(_) {
		return Vo(_) === "[object Number]" && Oo(_);
	}
	function Io(_) {
		return Vo(_) === "[object Boolean]" && Oo(_);
	}
	function Lo(_) {
		if (go) return _ && typeof _ == "object" && _ instanceof Symbol;
		if (typeof _ == "symbol") return !0;
		if (!_ || typeof _ != "object" || !ho) return !1;
		try {
			return ho.call(_), !0;
		} catch {}
		return !1;
	}
	function Ro(_) {
		if (!_ || typeof _ != "object" || !Q) return !1;
		try {
			return Q.call(_), !0;
		} catch {}
		return !1;
	}
	var zo = Object.prototype.hasOwnProperty || function(_) {
		return _ in this;
	};
	function Bo(_, C) {
		return zo.call(_, C);
	}
	function Vo(_) {
		return V.call(_);
	}
	function Ho(_) {
		if (_.name) return _.name;
		var C = W.call(U.call(_), /^function\s*([\w$]+)/);
		return C ? C[1] : null;
	}
	function Uo(_, C) {
		if (_.indexOf) return _.indexOf(C);
		for (var T = 0, E = _.length; T < E; T++) if (_[T] === C) return T;
		return -1;
	}
	function Wo(_) {
		if (!D || !_ || typeof _ != "object") return !1;
		try {
			D.call(_);
			try {
				F.call(_);
			} catch {
				return !0;
			}
			return _ instanceof Map;
		} catch {}
		return !1;
	}
	function Go(_) {
		if (!L || !_ || typeof _ != "object") return !1;
		try {
			L.call(_, L);
			try {
				R.call(_, R);
			} catch {
				return !0;
			}
			return _ instanceof WeakMap;
		} catch {}
		return !1;
	}
	function Ko(_) {
		if (!z || !_ || typeof _ != "object") return !1;
		try {
			return z.call(_), !0;
		} catch {}
		return !1;
	}
	function qo(_) {
		if (!F || !_ || typeof _ != "object") return !1;
		try {
			F.call(_);
			try {
				D.call(_);
			} catch {
				return !0;
			}
			return _ instanceof Set;
		} catch {}
		return !1;
	}
	function Jo(_) {
		if (!R || !_ || typeof _ != "object") return !1;
		try {
			R.call(_, R);
			try {
				L.call(_, L);
			} catch {
				return !0;
			}
			return _ instanceof WeakSet;
		} catch {}
		return !1;
	}
	function Yo(_) {
		return !_ || typeof _ != "object" ? !1 : typeof HTMLElement < "u" && _ instanceof HTMLElement ? !0 : typeof _.nodeName == "string" && typeof _.getAttribute == "function";
	}
	function Xo(_, C) {
		if (_.length > C.maxStringLength) {
			var T = _.length - C.maxStringLength, E = "... " + T + " more character" + (T > 1 ? "s" : "");
			return Xo(fo.call(_, 0, C.maxStringLength), C) + E;
		}
		var D = To[C.quoteStyle || "single"];
		return D.lastIndex = 0, Eo(G.call(G.call(_, D, "\\$1"), /[\x00-\x1f]/g, Zo), "single", C);
	}
	function Zo(_) {
		var C = _.charCodeAt(0), T = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[C];
		return T ? "\\" + T : "\\x" + (C < 16 ? "0" : "") + K.call(C.toString(16));
	}
	function Qo(_) {
		return "Object(" + _ + ")";
	}
	function $o(_) {
		return _ + " { ? }";
	}
	function es(_, C, T, E) {
		var D = E ? rs(T, E) : X.call(T, ", ");
		return _ + " (" + C + ") {" + D + "}";
	}
	function ts(_) {
		for (var C = 0; C < _.length; C++) if (Uo(_[C], "\n") >= 0) return !1;
		return !0;
	}
	function ns(_, C) {
		var T;
		if (_.indent === "	") T = "	";
		else if (typeof _.indent == "number" && _.indent > 0) T = X.call(Array(_.indent + 1), " ");
		else return null;
		return {
			base: T,
			prev: X.call(Array(C + 1), T)
		};
	}
	function rs(_, C) {
		if (_.length === 0) return "";
		var T = "\n" + C.prev + C.base;
		return T + X.call(_, "," + T) + "\n" + C.prev;
	}
	function is(_, C) {
		var T = ko(_), E = [];
		if (T) {
			E.length = _.length;
			for (var D = 0; D < _.length; D++) E[D] = Bo(_, D) ? C(_[D], _) : "";
		}
		var O = typeof mo == "function" ? mo(_) : [], A;
		if (go) {
			A = {};
			for (var P = 0; P < O.length; P++) A["$" + O[P]] = O[P];
		}
		for (var F in _) Bo(_, F) && (T && String(Number(F)) === F && F < _.length || go && A["$" + F] instanceof Symbol || (J.call(/[^\w$]/, F) ? E.push(C(F, _) + ": " + C(_[F], _)) : E.push(F + ": " + C(_[F], _))));
		if (typeof mo == "function") for (var I = 0; I < O.length; I++) vo.call(_, O[I]) && E.push("[" + C(O[I]) + "]: " + C(_[O[I]], _));
		return E;
	}
})), require_side_channel_list = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_object_inspect(), E = require_type(), D = function(_, C, T) {
		for (var E = _, D; (D = E.next) != null; E = D) if (D.key === C) return E.next = D.next, T || (D.next = _.next, _.next = D), D;
	}, O = function(_, C) {
		if (_) {
			var T = D(_, C);
			return T && T.value;
		}
	}, A = function(_, C, T) {
		var E = D(_, C);
		E ? E.value = T : _.next = {
			key: C,
			next: _.next,
			value: T
		};
	}, P = function(_, C) {
		return _ ? !!D(_, C) : !1;
	}, F = function(_, C) {
		if (_) return D(_, C, !0);
	};
	C.exports = function() {
		var _, C = {
			assert: function(_) {
				if (!C.has(_)) throw new E("Side channel does not contain " + T(_));
			},
			delete: function(C) {
				var T = _ && _.next, E = F(_, C);
				return E && T && T === E && (_ = void 0), !!E;
			},
			get: function(C) {
				return O(_, C);
			},
			has: function(C) {
				return P(_, C);
			},
			set: function(C, T) {
				_ ||= { next: void 0 }, A(_, C, T);
			}
		};
		return C;
	};
})), require_es_object_atoms = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Object;
})), require_es_errors = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Error;
})), require_eval = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = EvalError;
})), require_range = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = RangeError;
})), require_ref = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = ReferenceError;
})), require_syntax = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = SyntaxError;
})), require_uri = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = URIError;
})), require_abs = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.abs;
})), require_floor = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.floor;
})), require_max = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.max;
})), require_min = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.min;
})), require_pow = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.pow;
})), require_round = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Math.round;
})), require_isNaN = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Number.isNaN || function(_) {
		return _ !== _;
	};
})), require_sign = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_isNaN();
	C.exports = function(_) {
		return T(_) || _ === 0 ? _ : _ < 0 ? -1 : 1;
	};
})), require_gOPD = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Object.getOwnPropertyDescriptor;
})), require_gopd = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_gOPD();
	if (T) try {
		T([], "length");
	} catch {
		T = null;
	}
	C.exports = T;
})), require_es_define_property = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = Object.defineProperty || !1;
	if (T) try {
		T({}, "a", { value: 1 });
	} catch {
		T = !1;
	}
	C.exports = T;
})), require_shams = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = function() {
		if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
		if (typeof Symbol.iterator == "symbol") return !0;
		var _ = {}, C = Symbol("test"), T = Object(C);
		if (typeof C == "string" || Object.prototype.toString.call(C) !== "[object Symbol]" || Object.prototype.toString.call(T) !== "[object Symbol]") return !1;
		var E = 42;
		for (var D in _[C] = E, _) return !1;
		if (typeof Object.keys == "function" && Object.keys(_).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(_).length !== 0) return !1;
		var O = Object.getOwnPropertySymbols(_);
		if (O.length !== 1 || O[0] !== C || !Object.prototype.propertyIsEnumerable.call(_, C)) return !1;
		if (typeof Object.getOwnPropertyDescriptor == "function") {
			var A = Object.getOwnPropertyDescriptor(_, C);
			if (A.value !== E || A.enumerable !== !0) return !1;
		}
		return !0;
	};
})), require_has_symbols = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = typeof Symbol < "u" && Symbol, E = require_shams();
	C.exports = function() {
		return typeof T != "function" || typeof Symbol != "function" || typeof T("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : E();
	};
})), require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = typeof Reflect < "u" && Reflect.getPrototypeOf || null;
})), require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = require_es_object_atoms().getPrototypeOf || null;
})), require_implementation = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = "Function.prototype.bind called on incompatible ", E = Object.prototype.toString, D = Math.max, O = "[object Function]", A = function(_, C) {
		for (var T = [], E = 0; E < _.length; E += 1) T[E] = _[E];
		for (var D = 0; D < C.length; D += 1) T[D + _.length] = C[D];
		return T;
	}, P = function(_, C) {
		for (var T = [], E = C || 0, D = 0; E < _.length; E += 1, D += 1) T[D] = _[E];
		return T;
	}, F = function(_, C) {
		for (var T = "", E = 0; E < _.length; E += 1) T += _[E], E + 1 < _.length && (T += C);
		return T;
	};
	C.exports = function(_) {
		var C = this;
		if (typeof C != "function" || E.apply(C) !== O) throw TypeError(T + C);
		for (var I = P(arguments, 1), L, R = function() {
			if (this instanceof L) {
				var T = C.apply(this, A(I, arguments));
				return Object(T) === T ? T : this;
			}
			return C.apply(_, A(I, arguments));
		}, z = D(0, C.length - I.length), B = [], V = 0; V < z; V++) B[V] = "$" + V;
		if (L = Function("binder", "return function (" + F(B, ",") + "){ return binder.apply(this,arguments); }")(R), C.prototype) {
			var U = function() {};
			U.prototype = C.prototype, L.prototype = new U(), U.prototype = null;
		}
		return L;
	};
})), require_function_bind = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_implementation();
	C.exports = Function.prototype.bind || T;
})), require_functionCall = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Function.prototype.call;
})), require_functionApply = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = Function.prototype.apply;
})), require_reflectApply = /* @__PURE__ */ __commonJSMin(((_, C) => {
	C.exports = typeof Reflect < "u" && Reflect && Reflect.apply;
})), require_actualApply = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_function_bind(), E = require_functionApply(), D = require_functionCall();
	C.exports = require_reflectApply() || T.call(D, E);
})), require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_function_bind(), E = require_type(), D = require_functionCall(), O = require_actualApply();
	C.exports = function(_) {
		if (_.length < 1 || typeof _[0] != "function") throw new E("a function is required");
		return O(T, D, _);
	};
})), require_get = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_call_bind_apply_helpers(), E = require_gopd(), D;
	try {
		D = [].__proto__ === Array.prototype;
	} catch (_) {
		if (!_ || typeof _ != "object" || !("code" in _) || _.code !== "ERR_PROTO_ACCESS") throw _;
	}
	var O = !!D && E && E(Object.prototype, "__proto__"), A = Object, P = A.getPrototypeOf;
	C.exports = O && typeof O.get == "function" ? T([O.get]) : typeof P == "function" ? function(_) {
		return P(_ == null ? _ : A(_));
	} : !1;
})), require_get_proto = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_Reflect_getPrototypeOf(), E = require_Object_getPrototypeOf(), D = require_get();
	C.exports = T ? function(_) {
		return T(_);
	} : E ? function(_) {
		if (!_ || typeof _ != "object" && typeof _ != "function") throw TypeError("getProto: not an object");
		return E(_);
	} : D ? function(_) {
		return D(_);
	} : null;
})), require_hasown = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = Function.prototype.call, E = Object.prototype.hasOwnProperty;
	C.exports = require_function_bind().call(T, E);
})), require_get_intrinsic = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T, E = require_es_object_atoms(), D = require_es_errors(), O = require_eval(), A = require_range(), P = require_ref(), F = require_syntax(), I = require_type(), L = require_uri(), R = require_abs(), z = require_floor(), B = require_max(), V = require_min(), U = require_pow(), W = require_round(), fo = require_sign(), G = Function, K = function(_) {
		try {
			return G("\"use strict\"; return (" + _ + ").constructor;")();
		} catch {}
	}, q = require_gopd(), J = require_es_define_property(), Y = function() {
		throw new I();
	}, X = q ? function() {
		try {
			return arguments.callee, Y;
		} catch {
			try {
				return q(arguments, "callee").get;
			} catch {
				return Y;
			}
		}
	}() : Y, po = require_has_symbols()(), Z = require_get_proto(), Q = require_Object_getPrototypeOf(), mo = require_Reflect_getPrototypeOf(), ho = require_functionApply(), go = require_functionCall(), _o = {}, vo = typeof Uint8Array > "u" || !Z ? T : Z(Uint8Array), yo = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError > "u" ? T : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer > "u" ? T : ArrayBuffer,
		"%ArrayIteratorPrototype%": po && Z ? Z([][Symbol.iterator]()) : T,
		"%AsyncFromSyncIteratorPrototype%": T,
		"%AsyncFunction%": _o,
		"%AsyncGenerator%": _o,
		"%AsyncGeneratorFunction%": _o,
		"%AsyncIteratorPrototype%": _o,
		"%Atomics%": typeof Atomics > "u" ? T : Atomics,
		"%BigInt%": typeof BigInt > "u" ? T : BigInt,
		"%BigInt64Array%": typeof BigInt64Array > "u" ? T : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array > "u" ? T : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView > "u" ? T : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": D,
		"%eval%": eval,
		"%EvalError%": O,
		"%Float16Array%": typeof Float16Array > "u" ? T : Float16Array,
		"%Float32Array%": typeof Float32Array > "u" ? T : Float32Array,
		"%Float64Array%": typeof Float64Array > "u" ? T : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? T : FinalizationRegistry,
		"%Function%": G,
		"%GeneratorFunction%": _o,
		"%Int8Array%": typeof Int8Array > "u" ? T : Int8Array,
		"%Int16Array%": typeof Int16Array > "u" ? T : Int16Array,
		"%Int32Array%": typeof Int32Array > "u" ? T : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": po && Z ? Z(Z([][Symbol.iterator]())) : T,
		"%JSON%": typeof JSON == "object" ? JSON : T,
		"%Map%": typeof Map > "u" ? T : Map,
		"%MapIteratorPrototype%": typeof Map > "u" || !po || !Z ? T : Z((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": E,
		"%Object.getOwnPropertyDescriptor%": q,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise > "u" ? T : Promise,
		"%Proxy%": typeof Proxy > "u" ? T : Proxy,
		"%RangeError%": A,
		"%ReferenceError%": P,
		"%Reflect%": typeof Reflect > "u" ? T : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set > "u" ? T : Set,
		"%SetIteratorPrototype%": typeof Set > "u" || !po || !Z ? T : Z((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? T : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": po && Z ? Z(""[Symbol.iterator]()) : T,
		"%Symbol%": po ? Symbol : T,
		"%SyntaxError%": F,
		"%ThrowTypeError%": X,
		"%TypedArray%": vo,
		"%TypeError%": I,
		"%Uint8Array%": typeof Uint8Array > "u" ? T : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? T : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array > "u" ? T : Uint16Array,
		"%Uint32Array%": typeof Uint32Array > "u" ? T : Uint32Array,
		"%URIError%": L,
		"%WeakMap%": typeof WeakMap > "u" ? T : WeakMap,
		"%WeakRef%": typeof WeakRef > "u" ? T : WeakRef,
		"%WeakSet%": typeof WeakSet > "u" ? T : WeakSet,
		"%Function.prototype.call%": go,
		"%Function.prototype.apply%": ho,
		"%Object.defineProperty%": J,
		"%Object.getPrototypeOf%": Q,
		"%Math.abs%": R,
		"%Math.floor%": z,
		"%Math.max%": B,
		"%Math.min%": V,
		"%Math.pow%": U,
		"%Math.round%": W,
		"%Math.sign%": fo,
		"%Reflect.getPrototypeOf%": mo
	};
	if (Z) try {
		null.error;
	} catch (_) {
		yo["%Error.prototype%"] = Z(Z(_));
	}
	var bo = function _(C) {
		var T;
		if (C === "%AsyncFunction%") T = K("async function () {}");
		else if (C === "%GeneratorFunction%") T = K("function* () {}");
		else if (C === "%AsyncGeneratorFunction%") T = K("async function* () {}");
		else if (C === "%AsyncGenerator%") {
			var E = _("%AsyncGeneratorFunction%");
			E && (T = E.prototype);
		} else if (C === "%AsyncIteratorPrototype%") {
			var D = _("%AsyncGenerator%");
			D && Z && (T = Z(D.prototype));
		}
		return yo[C] = T, T;
	}, xo = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	}, So = require_function_bind(), Co = require_hasown(), wo = So.call(go, Array.prototype.concat), To = So.call(ho, Array.prototype.splice), Eo = So.call(go, String.prototype.replace), Do = So.call(go, String.prototype.slice), Oo = So.call(go, RegExp.prototype.exec), ko = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, Ao = /\\(\\)?/g, jo = function(_) {
		var C = Do(_, 0, 1), T = Do(_, -1);
		if (C === "%" && T !== "%") throw new F("invalid intrinsic syntax, expected closing `%`");
		if (T === "%" && C !== "%") throw new F("invalid intrinsic syntax, expected opening `%`");
		var E = [];
		return Eo(_, ko, function(_, C, T, D) {
			E[E.length] = T ? Eo(D, Ao, "$1") : C || _;
		}), E;
	}, No = function(_, C) {
		var T = _, E;
		if (Co(xo, T) && (E = xo[T], T = "%" + E[0] + "%"), Co(yo, T)) {
			var D = yo[T];
			if (D === _o && (D = bo(T)), D === void 0 && !C) throw new I("intrinsic " + _ + " exists, but is not available. Please file an issue!");
			return {
				alias: E,
				name: T,
				value: D
			};
		}
		throw new F("intrinsic " + _ + " does not exist!");
	};
	C.exports = function(_, C) {
		if (typeof _ != "string" || _.length === 0) throw new I("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof C != "boolean") throw new I("\"allowMissing\" argument must be a boolean");
		if (Oo(/^%?[^%]*%?$/, _) === null) throw new F("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var T = jo(_), E = T.length > 0 ? T[0] : "", D = No("%" + E + "%", C), O = D.name, A = D.value, P = !1, L = D.alias;
		L && (E = L[0], To(T, wo([0, 1], L)));
		for (var R = 1, z = !0; R < T.length; R += 1) {
			var B = T[R], V = Do(B, 0, 1), U = Do(B, -1);
			if ((V === "\"" || V === "'" || V === "`" || U === "\"" || U === "'" || U === "`") && V !== U) throw new F("property names with quotes must have matching quotes");
			if ((B === "constructor" || !z) && (P = !0), E += "." + B, O = "%" + E + "%", Co(yo, O)) A = yo[O];
			else if (A != null) {
				if (!(B in A)) {
					if (!C) throw new I("base intrinsic for " + _ + " exists, but the property is not available.");
					return;
				}
				if (q && R + 1 >= T.length) {
					var W = q(A, B);
					z = !!W, A = z && "get" in W && !("originalValue" in W.get) ? W.get : A[B];
				} else z = Co(A, B), A = A[B];
				z && !P && (yo[O] = A);
			}
		}
		return A;
	};
})), require_call_bound = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_get_intrinsic(), E = require_call_bind_apply_helpers(), D = E([T("%String.prototype.indexOf%")]);
	C.exports = function(_, C) {
		var O = T(_, !!C);
		return typeof O == "function" && D(_, ".prototype.") > -1 ? E([O]) : O;
	};
})), require_side_channel_map = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_get_intrinsic(), E = require_call_bound(), D = require_object_inspect(), O = require_type(), A = T("%Map%", !0), P = E("Map.prototype.get", !0), F = E("Map.prototype.set", !0), I = E("Map.prototype.has", !0), L = E("Map.prototype.delete", !0), R = E("Map.prototype.size", !0);
	C.exports = !!A && function() {
		var _, C = {
			assert: function(_) {
				if (!C.has(_)) throw new O("Side channel does not contain " + D(_));
			},
			delete: function(C) {
				if (_) {
					var T = L(_, C);
					return R(_) === 0 && (_ = void 0), T;
				}
				return !1;
			},
			get: function(C) {
				if (_) return P(_, C);
			},
			has: function(C) {
				return _ ? I(_, C) : !1;
			},
			set: function(C, T) {
				_ ||= new A(), F(_, C, T);
			}
		};
		return C;
	};
})), require_side_channel_weakmap = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_get_intrinsic(), E = require_call_bound(), D = require_object_inspect(), O = require_side_channel_map(), A = require_type(), P = T("%WeakMap%", !0), F = E("WeakMap.prototype.get", !0), I = E("WeakMap.prototype.set", !0), L = E("WeakMap.prototype.has", !0), R = E("WeakMap.prototype.delete", !0);
	C.exports = P ? function() {
		var _, C, T = {
			assert: function(_) {
				if (!T.has(_)) throw new A("Side channel does not contain " + D(_));
			},
			delete: function(T) {
				if (P && T && (typeof T == "object" || typeof T == "function")) {
					if (_) return R(_, T);
				} else if (O && C) return C.delete(T);
				return !1;
			},
			get: function(T) {
				return P && T && (typeof T == "object" || typeof T == "function") && _ ? F(_, T) : C && C.get(T);
			},
			has: function(T) {
				return P && T && (typeof T == "object" || typeof T == "function") && _ ? L(_, T) : !!C && C.has(T);
			},
			set: function(T, E) {
				P && T && (typeof T == "object" || typeof T == "function") ? (_ ||= new P(), I(_, T, E)) : O && (C ||= O(), C.set(T, E));
			}
		};
		return T;
	} : O;
})), require_side_channel = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_type(), E = require_object_inspect(), D = require_side_channel_list(), O = require_side_channel_map(), A = require_side_channel_weakmap() || O || D;
	C.exports = function() {
		var _, C = {
			assert: function(_) {
				if (!C.has(_)) throw new T("Side channel does not contain " + E(_));
			},
			delete: function(C) {
				return !!_ && _.delete(C);
			},
			get: function(C) {
				return _ && _.get(C);
			},
			has: function(C) {
				return !!_ && _.has(C);
			},
			set: function(C, T) {
				_ ||= A(), _.set(C, T);
			}
		};
		return C;
	};
})), require_formats = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = String.prototype.replace, E = /%20/g, D = {
		RFC1738: "RFC1738",
		RFC3986: "RFC3986"
	};
	C.exports = {
		default: D.RFC3986,
		formatters: {
			RFC1738: function(_) {
				return T.call(_, E, "+");
			},
			RFC3986: function(_) {
				return String(_);
			}
		},
		RFC1738: D.RFC1738,
		RFC3986: D.RFC3986
	};
})), require_utils = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_formats(), E = Object.prototype.hasOwnProperty, D = Array.isArray, O = function() {
		for (var _ = [], C = 0; C < 256; ++C) _.push("%" + ((C < 16 ? "0" : "") + C.toString(16)).toUpperCase());
		return _;
	}(), A = function(_) {
		for (; _.length > 1;) {
			var C = _.pop(), T = C.obj[C.prop];
			if (D(T)) {
				for (var E = [], O = 0; O < T.length; ++O) T[O] !== void 0 && E.push(T[O]);
				C.obj[C.prop] = E;
			}
		}
	}, P = function(_, C) {
		for (var T = C && C.plainObjects ? { __proto__: null } : {}, E = 0; E < _.length; ++E) _[E] !== void 0 && (T[E] = _[E]);
		return T;
	}, F = function _(C, T, O) {
		if (!T) return C;
		if (typeof T != "object" && typeof T != "function") {
			if (D(C)) C.push(T);
			else if (C && typeof C == "object") (O && (O.plainObjects || O.allowPrototypes) || !E.call(Object.prototype, T)) && (C[T] = !0);
			else return [C, T];
			return C;
		}
		if (!C || typeof C != "object") return [C].concat(T);
		var A = C;
		return D(C) && !D(T) && (A = P(C, O)), D(C) && D(T) ? (T.forEach(function(T, D) {
			if (E.call(C, D)) {
				var A = C[D];
				A && typeof A == "object" && T && typeof T == "object" ? C[D] = _(A, T, O) : C.push(T);
			} else C[D] = T;
		}), C) : Object.keys(T).reduce(function(C, D) {
			var A = T[D];
			return E.call(C, D) ? C[D] = _(C[D], A, O) : C[D] = A, C;
		}, A);
	}, I = function(_, C) {
		return Object.keys(C).reduce(function(_, T) {
			return _[T] = C[T], _;
		}, _);
	}, L = function(_, C, T) {
		var E = _.replace(/\+/g, " ");
		if (T === "iso-8859-1") return E.replace(/%[0-9a-f]{2}/gi, unescape);
		try {
			return decodeURIComponent(E);
		} catch {
			return E;
		}
	}, R = 1024;
	C.exports = {
		arrayToObject: P,
		assign: I,
		combine: function(_, C) {
			return [].concat(_, C);
		},
		compact: function(_) {
			for (var C = [{
				obj: { o: _ },
				prop: "o"
			}], T = [], E = 0; E < C.length; ++E) for (var D = C[E], O = D.obj[D.prop], P = Object.keys(O), F = 0; F < P.length; ++F) {
				var I = P[F], L = O[I];
				typeof L == "object" && L && T.indexOf(L) === -1 && (C.push({
					obj: O,
					prop: I
				}), T.push(L));
			}
			return A(C), _;
		},
		decode: L,
		encode: function(_, C, E, D, A) {
			if (_.length === 0) return _;
			var P = _;
			if (typeof _ == "symbol" ? P = Symbol.prototype.toString.call(_) : typeof _ != "string" && (P = String(_)), E === "iso-8859-1") return escape(P).replace(/%u[0-9a-f]{4}/gi, function(_) {
				return "%26%23" + parseInt(_.slice(2), 16) + "%3B";
			});
			for (var F = "", I = 0; I < P.length; I += R) {
				for (var L = P.length >= R ? P.slice(I, I + R) : P, z = [], B = 0; B < L.length; ++B) {
					var V = L.charCodeAt(B);
					if (V === 45 || V === 46 || V === 95 || V === 126 || V >= 48 && V <= 57 || V >= 65 && V <= 90 || V >= 97 && V <= 122 || A === T.RFC1738 && (V === 40 || V === 41)) {
						z[z.length] = L.charAt(B);
						continue;
					}
					if (V < 128) {
						z[z.length] = O[V];
						continue;
					}
					if (V < 2048) {
						z[z.length] = O[192 | V >> 6] + O[128 | V & 63];
						continue;
					}
					if (V < 55296 || V >= 57344) {
						z[z.length] = O[224 | V >> 12] + O[128 | V >> 6 & 63] + O[128 | V & 63];
						continue;
					}
					B += 1, V = 65536 + ((V & 1023) << 10 | L.charCodeAt(B) & 1023), z[z.length] = O[240 | V >> 18] + O[128 | V >> 12 & 63] + O[128 | V >> 6 & 63] + O[128 | V & 63];
				}
				F += z.join("");
			}
			return F;
		},
		isBuffer: function(_) {
			return !_ || typeof _ != "object" ? !1 : !!(_.constructor && _.constructor.isBuffer && _.constructor.isBuffer(_));
		},
		isRegExp: function(_) {
			return Object.prototype.toString.call(_) === "[object RegExp]";
		},
		maybeMap: function(_, C) {
			if (D(_)) {
				for (var T = [], E = 0; E < _.length; E += 1) T.push(C(_[E]));
				return T;
			}
			return C(_);
		},
		merge: F
	};
})), require_stringify = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_side_channel(), E = require_utils(), D = require_formats(), O = Object.prototype.hasOwnProperty, A = {
		brackets: function(_) {
			return _ + "[]";
		},
		comma: "comma",
		indices: function(_, C) {
			return _ + "[" + C + "]";
		},
		repeat: function(_) {
			return _;
		}
	}, P = Array.isArray, F = Array.prototype.push, I = function(_, C) {
		F.apply(_, P(C) ? C : [C]);
	}, L = Date.prototype.toISOString, R = D.default, z = {
		addQueryPrefix: !1,
		allowDots: !1,
		allowEmptyArrays: !1,
		arrayFormat: "indices",
		charset: "utf-8",
		charsetSentinel: !1,
		commaRoundTrip: !1,
		delimiter: "&",
		encode: !0,
		encodeDotInKeys: !1,
		encoder: E.encode,
		encodeValuesOnly: !1,
		filter: void 0,
		format: R,
		formatter: D.formatters[R],
		indices: !1,
		serializeDate: function(_) {
			return L.call(_);
		},
		skipNulls: !1,
		strictNullHandling: !1
	}, B = function(_) {
		return typeof _ == "string" || typeof _ == "number" || typeof _ == "boolean" || typeof _ == "symbol" || typeof _ == "bigint";
	}, V = {}, U = function _(C, D, O, A, F, L, R, U, W, fo, G, K, q, J, Y, X, po, Z) {
		for (var Q = C, mo = Z, ho = 0, go = !1; (mo = mo.get(V)) !== void 0 && !go;) {
			var _o = mo.get(C);
			if (ho += 1, _o !== void 0) {
				if (_o === ho) throw RangeError("Cyclic object value");
				go = !0;
			}
			mo.get(V) === void 0 && (ho = 0);
		}
		if (typeof fo == "function" ? Q = fo(D, Q) : Q instanceof Date ? Q = q(Q) : O === "comma" && P(Q) && (Q = E.maybeMap(Q, function(_) {
			return _ instanceof Date ? q(_) : _;
		})), Q === null) {
			if (L) return W && !X ? W(D, z.encoder, po, "key", J) : D;
			Q = "";
		}
		if (B(Q) || E.isBuffer(Q)) return W ? [Y(X ? D : W(D, z.encoder, po, "key", J)) + "=" + Y(W(Q, z.encoder, po, "value", J))] : [Y(D) + "=" + Y(String(Q))];
		var vo = [];
		if (Q === void 0) return vo;
		var yo;
		if (O === "comma" && P(Q)) X && W && (Q = E.maybeMap(Q, W)), yo = [{ value: Q.length > 0 ? Q.join(",") || null : void 0 }];
		else if (P(fo)) yo = fo;
		else {
			var bo = Object.keys(Q);
			yo = G ? bo.sort(G) : bo;
		}
		var xo = U ? String(D).replace(/\./g, "%2E") : String(D), So = A && P(Q) && Q.length === 1 ? xo + "[]" : xo;
		if (F && P(Q) && Q.length === 0) return So + "[]";
		for (var Co = 0; Co < yo.length; ++Co) {
			var wo = yo[Co], To = typeof wo == "object" && wo && wo.value !== void 0 ? wo.value : Q[wo];
			if (!(R && To === null)) {
				var Eo = K && U ? String(wo).replace(/\./g, "%2E") : String(wo), Do = P(Q) ? typeof O == "function" ? O(So, Eo) : So : So + (K ? "." + Eo : "[" + Eo + "]");
				Z.set(C, ho);
				var Oo = T();
				Oo.set(V, Z), I(vo, _(To, Do, O, A, F, L, R, U, O === "comma" && X && P(Q) ? null : W, fo, G, K, q, J, Y, X, po, Oo));
			}
		}
		return vo;
	}, W = function(_) {
		if (!_) return z;
		if (_.allowEmptyArrays !== void 0 && typeof _.allowEmptyArrays != "boolean") throw TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
		if (_.encodeDotInKeys !== void 0 && typeof _.encodeDotInKeys != "boolean") throw TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
		if (_.encoder !== null && _.encoder !== void 0 && typeof _.encoder != "function") throw TypeError("Encoder has to be a function.");
		var C = _.charset || z.charset;
		if (_.charset !== void 0 && _.charset !== "utf-8" && _.charset !== "iso-8859-1") throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
		var T = D.default;
		if (_.format !== void 0) {
			if (!O.call(D.formatters, _.format)) throw TypeError("Unknown format option provided.");
			T = _.format;
		}
		var E = D.formatters[T], F = z.filter;
		(typeof _.filter == "function" || P(_.filter)) && (F = _.filter);
		var I = _.arrayFormat in A ? _.arrayFormat : "indices" in _ ? _.indices ? "indices" : "repeat" : z.arrayFormat;
		if ("commaRoundTrip" in _ && typeof _.commaRoundTrip != "boolean") throw TypeError("`commaRoundTrip` must be a boolean, or absent");
		var L = _.allowDots === void 0 ? _.encodeDotInKeys === !0 ? !0 : z.allowDots : !!_.allowDots;
		return {
			addQueryPrefix: typeof _.addQueryPrefix == "boolean" ? _.addQueryPrefix : z.addQueryPrefix,
			allowDots: L,
			allowEmptyArrays: typeof _.allowEmptyArrays == "boolean" ? !!_.allowEmptyArrays : z.allowEmptyArrays,
			arrayFormat: I,
			charset: C,
			charsetSentinel: typeof _.charsetSentinel == "boolean" ? _.charsetSentinel : z.charsetSentinel,
			commaRoundTrip: !!_.commaRoundTrip,
			delimiter: _.delimiter === void 0 ? z.delimiter : _.delimiter,
			encode: typeof _.encode == "boolean" ? _.encode : z.encode,
			encodeDotInKeys: typeof _.encodeDotInKeys == "boolean" ? _.encodeDotInKeys : z.encodeDotInKeys,
			encoder: typeof _.encoder == "function" ? _.encoder : z.encoder,
			encodeValuesOnly: typeof _.encodeValuesOnly == "boolean" ? _.encodeValuesOnly : z.encodeValuesOnly,
			filter: F,
			format: T,
			formatter: E,
			serializeDate: typeof _.serializeDate == "function" ? _.serializeDate : z.serializeDate,
			skipNulls: typeof _.skipNulls == "boolean" ? _.skipNulls : z.skipNulls,
			sort: typeof _.sort == "function" ? _.sort : null,
			strictNullHandling: typeof _.strictNullHandling == "boolean" ? _.strictNullHandling : z.strictNullHandling
		};
	};
	C.exports = function(_, C) {
		var E = _, D = W(C), O, F;
		typeof D.filter == "function" ? (F = D.filter, E = F("", E)) : P(D.filter) && (F = D.filter, O = F);
		var L = [];
		if (typeof E != "object" || !E) return "";
		var R = A[D.arrayFormat], z = R === "comma" && D.commaRoundTrip;
		O ||= Object.keys(E), D.sort && O.sort(D.sort);
		for (var B = T(), V = 0; V < O.length; ++V) {
			var fo = O[V], G = E[fo];
			D.skipNulls && G === null || I(L, U(G, fo, R, z, D.allowEmptyArrays, D.strictNullHandling, D.skipNulls, D.encodeDotInKeys, D.encode ? D.encoder : null, D.filter, D.sort, D.allowDots, D.serializeDate, D.format, D.formatter, D.encodeValuesOnly, D.charset, B));
		}
		var K = L.join(D.delimiter), q = D.addQueryPrefix === !0 ? "?" : "";
		return D.charsetSentinel && (D.charset === "iso-8859-1" ? q += "utf8=%26%2310003%3B&" : q += "utf8=%E2%9C%93&"), K.length > 0 ? q + K : "";
	};
})), require_parse = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_utils(), E = Object.prototype.hasOwnProperty, D = Array.isArray, O = {
		allowDots: !1,
		allowEmptyArrays: !1,
		allowPrototypes: !1,
		allowSparse: !1,
		arrayLimit: 20,
		charset: "utf-8",
		charsetSentinel: !1,
		comma: !1,
		decodeDotInKeys: !1,
		decoder: T.decode,
		delimiter: "&",
		depth: 5,
		duplicates: "combine",
		ignoreQueryPrefix: !1,
		interpretNumericEntities: !1,
		parameterLimit: 1e3,
		parseArrays: !0,
		plainObjects: !1,
		strictDepth: !1,
		strictNullHandling: !1,
		throwOnLimitExceeded: !1
	}, A = function(_) {
		return _.replace(/&#(\d+);/g, function(_, C) {
			return String.fromCharCode(parseInt(C, 10));
		});
	}, P = function(_, C, T) {
		if (_ && typeof _ == "string" && C.comma && _.indexOf(",") > -1) return _.split(",");
		if (C.throwOnLimitExceeded && T >= C.arrayLimit) throw RangeError("Array limit exceeded. Only " + C.arrayLimit + " element" + (C.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
		return _;
	}, F = "utf8=%26%2310003%3B", I = "utf8=%E2%9C%93", L = function(_, C) {
		var L = { __proto__: null }, R = C.ignoreQueryPrefix ? _.replace(/^\?/, "") : _;
		R = R.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		var z = C.parameterLimit === Infinity ? void 0 : C.parameterLimit, B = R.split(C.delimiter, C.throwOnLimitExceeded ? z + 1 : z);
		if (C.throwOnLimitExceeded && B.length > z) throw RangeError("Parameter limit exceeded. Only " + z + " parameter" + (z === 1 ? "" : "s") + " allowed.");
		var V = -1, U, W = C.charset;
		if (C.charsetSentinel) for (U = 0; U < B.length; ++U) B[U].indexOf("utf8=") === 0 && (B[U] === I ? W = "utf-8" : B[U] === F && (W = "iso-8859-1"), V = U, U = B.length);
		for (U = 0; U < B.length; ++U) if (U !== V) {
			var fo = B[U], G = fo.indexOf("]="), K = G === -1 ? fo.indexOf("=") : G + 1, q, J;
			K === -1 ? (q = C.decoder(fo, O.decoder, W, "key"), J = C.strictNullHandling ? null : "") : (q = C.decoder(fo.slice(0, K), O.decoder, W, "key"), J = T.maybeMap(P(fo.slice(K + 1), C, D(L[q]) ? L[q].length : 0), function(_) {
				return C.decoder(_, O.decoder, W, "value");
			})), J && C.interpretNumericEntities && W === "iso-8859-1" && (J = A(String(J))), fo.indexOf("[]=") > -1 && (J = D(J) ? [J] : J);
			var Y = E.call(L, q);
			Y && C.duplicates === "combine" ? L[q] = T.combine(L[q], J) : (!Y || C.duplicates === "last") && (L[q] = J);
		}
		return L;
	}, R = function(_, C, E, D) {
		var O = 0;
		if (_.length > 0 && _[_.length - 1] === "[]") {
			var A = _.slice(0, -1).join("");
			O = Array.isArray(C) && C[A] ? C[A].length : 0;
		}
		for (var F = D ? C : P(C, E, O), I = _.length - 1; I >= 0; --I) {
			var L, R = _[I];
			if (R === "[]" && E.parseArrays) L = E.allowEmptyArrays && (F === "" || E.strictNullHandling && F === null) ? [] : T.combine([], F);
			else {
				L = E.plainObjects ? { __proto__: null } : {};
				var z = R.charAt(0) === "[" && R.charAt(R.length - 1) === "]" ? R.slice(1, -1) : R, B = E.decodeDotInKeys ? z.replace(/%2E/g, ".") : z, V = parseInt(B, 10);
				!E.parseArrays && B === "" ? L = { 0: F } : !isNaN(V) && R !== B && String(V) === B && V >= 0 && E.parseArrays && V <= E.arrayLimit ? (L = [], L[V] = F) : B !== "__proto__" && (L[B] = F);
			}
			F = L;
		}
		return F;
	}, z = function(_, C, T, D) {
		if (_) {
			var O = T.allowDots ? _.replace(/\.([^.[]+)/g, "[$1]") : _, A = /(\[[^[\]]*])/, P = /(\[[^[\]]*])/g, F = T.depth > 0 && A.exec(O), I = F ? O.slice(0, F.index) : O, L = [];
			if (I) {
				if (!T.plainObjects && E.call(Object.prototype, I) && !T.allowPrototypes) return;
				L.push(I);
			}
			for (var z = 0; T.depth > 0 && (F = P.exec(O)) !== null && z < T.depth;) {
				if (z += 1, !T.plainObjects && E.call(Object.prototype, F[1].slice(1, -1)) && !T.allowPrototypes) return;
				L.push(F[1]);
			}
			if (F) {
				if (T.strictDepth === !0) throw RangeError("Input depth exceeded depth option of " + T.depth + " and strictDepth is true");
				L.push("[" + O.slice(F.index) + "]");
			}
			return R(L, C, T, D);
		}
	}, B = function(_) {
		if (!_) return O;
		if (_.allowEmptyArrays !== void 0 && typeof _.allowEmptyArrays != "boolean") throw TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
		if (_.decodeDotInKeys !== void 0 && typeof _.decodeDotInKeys != "boolean") throw TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
		if (_.decoder !== null && _.decoder !== void 0 && typeof _.decoder != "function") throw TypeError("Decoder has to be a function.");
		if (_.charset !== void 0 && _.charset !== "utf-8" && _.charset !== "iso-8859-1") throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
		if (_.throwOnLimitExceeded !== void 0 && typeof _.throwOnLimitExceeded != "boolean") throw TypeError("`throwOnLimitExceeded` option must be a boolean");
		var C = _.charset === void 0 ? O.charset : _.charset, E = _.duplicates === void 0 ? O.duplicates : _.duplicates;
		if (E !== "combine" && E !== "first" && E !== "last") throw TypeError("The duplicates option must be either combine, first, or last");
		return {
			allowDots: _.allowDots === void 0 ? _.decodeDotInKeys === !0 ? !0 : O.allowDots : !!_.allowDots,
			allowEmptyArrays: typeof _.allowEmptyArrays == "boolean" ? !!_.allowEmptyArrays : O.allowEmptyArrays,
			allowPrototypes: typeof _.allowPrototypes == "boolean" ? _.allowPrototypes : O.allowPrototypes,
			allowSparse: typeof _.allowSparse == "boolean" ? _.allowSparse : O.allowSparse,
			arrayLimit: typeof _.arrayLimit == "number" ? _.arrayLimit : O.arrayLimit,
			charset: C,
			charsetSentinel: typeof _.charsetSentinel == "boolean" ? _.charsetSentinel : O.charsetSentinel,
			comma: typeof _.comma == "boolean" ? _.comma : O.comma,
			decodeDotInKeys: typeof _.decodeDotInKeys == "boolean" ? _.decodeDotInKeys : O.decodeDotInKeys,
			decoder: typeof _.decoder == "function" ? _.decoder : O.decoder,
			delimiter: typeof _.delimiter == "string" || T.isRegExp(_.delimiter) ? _.delimiter : O.delimiter,
			depth: typeof _.depth == "number" || _.depth === !1 ? +_.depth : O.depth,
			duplicates: E,
			ignoreQueryPrefix: _.ignoreQueryPrefix === !0,
			interpretNumericEntities: typeof _.interpretNumericEntities == "boolean" ? _.interpretNumericEntities : O.interpretNumericEntities,
			parameterLimit: typeof _.parameterLimit == "number" ? _.parameterLimit : O.parameterLimit,
			parseArrays: _.parseArrays !== !1,
			plainObjects: typeof _.plainObjects == "boolean" ? _.plainObjects : O.plainObjects,
			strictDepth: typeof _.strictDepth == "boolean" ? !!_.strictDepth : O.strictDepth,
			strictNullHandling: typeof _.strictNullHandling == "boolean" ? _.strictNullHandling : O.strictNullHandling,
			throwOnLimitExceeded: typeof _.throwOnLimitExceeded == "boolean" ? _.throwOnLimitExceeded : !1
		};
	};
	C.exports = function(_, C) {
		var E = B(C);
		if (_ === "" || _ == null) return E.plainObjects ? { __proto__: null } : {};
		for (var D = typeof _ == "string" ? L(_, E) : _, O = E.plainObjects ? { __proto__: null } : {}, A = Object.keys(D), P = 0; P < A.length; ++P) {
			var F = A[P], I = z(F, D[F], E, typeof _ == "string");
			O = T.merge(O, I, E);
		}
		return E.allowSparse === !0 ? O : T.compact(O);
	};
})), require_lib = /* @__PURE__ */ __commonJSMin(((_, C) => {
	var T = require_stringify(), E = require_parse();
	C.exports = {
		formats: require_formats(),
		parse: E,
		stringify: T
	};
}));
(/* @__PURE__ */ __commonJSMin(((_) => {
	var C = require_punycode();
	function T() {
		this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
	}
	var E = /^([a-z0-9.+-]+:)/i, D = /:[0-9]*$/, O = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, A = [
		"'",
		"{",
		"}",
		"|",
		"\\",
		"^",
		"`",
		"<",
		">",
		"\"",
		"`",
		" ",
		"\r",
		"\n",
		"	"
	], P = [
		"%",
		"/",
		"?",
		";",
		"#"
	].concat(A), F = [
		"/",
		"?",
		"#"
	], I = 255, L = /^[+a-z0-9A-Z_-]{0,63}$/, R = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, z = {
		javascript: !0,
		"javascript:": !0
	}, B = {
		javascript: !0,
		"javascript:": !0
	}, V = {
		http: !0,
		https: !0,
		ftp: !0,
		gopher: !0,
		file: !0,
		"http:": !0,
		"https:": !0,
		"ftp:": !0,
		"gopher:": !0,
		"file:": !0
	}, U = require_lib();
	function W(_, C, E) {
		if (_ && typeof _ == "object" && _ instanceof T) return _;
		var D = new T();
		return D.parse(_, C, E), D;
	}
	T.prototype.parse = function(_, T, D) {
		if (typeof _ != "string") throw TypeError("Parameter 'url' must be a string, not " + typeof _);
		var W = _.indexOf("?"), fo = W !== -1 && W < _.indexOf("#") ? "?" : "#", G = _.split(fo);
		G[0] = G[0].replace(/\\/g, "/"), _ = G.join(fo);
		var K = _;
		if (K = K.trim(), !D && _.split("#").length === 1) {
			var q = O.exec(K);
			if (q) return this.path = K, this.href = K, this.pathname = q[1], q[2] ? (this.search = q[2], T ? this.query = U.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : T && (this.search = "", this.query = {}), this;
		}
		var J = E.exec(K);
		if (J) {
			J = J[0];
			var Y = J.toLowerCase();
			this.protocol = Y, K = K.substr(J.length);
		}
		if (D || J || K.match(/^\/\/[^@/]+@[^@/]+/)) {
			var X = K.substr(0, 2) === "//";
			X && !(J && B[J]) && (K = K.substr(2), this.slashes = !0);
		}
		if (!B[J] && (X || J && !V[J])) {
			for (var po = -1, Z = 0; Z < F.length; Z++) {
				var Q = K.indexOf(F[Z]);
				Q !== -1 && (po === -1 || Q < po) && (po = Q);
			}
			var mo, ho = po === -1 ? K.lastIndexOf("@") : K.lastIndexOf("@", po);
			ho !== -1 && (mo = K.slice(0, ho), K = K.slice(ho + 1), this.auth = decodeURIComponent(mo)), po = -1;
			for (var Z = 0; Z < P.length; Z++) {
				var Q = K.indexOf(P[Z]);
				Q !== -1 && (po === -1 || Q < po) && (po = Q);
			}
			po === -1 && (po = K.length), this.host = K.slice(0, po), K = K.slice(po), this.parseHost(), this.hostname = this.hostname || "";
			var go = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
			if (!go) for (var _o = this.hostname.split(/\./), Z = 0, vo = _o.length; Z < vo; Z++) {
				var yo = _o[Z];
				if (yo && !yo.match(L)) {
					for (var bo = "", xo = 0, So = yo.length; xo < So; xo++) yo.charCodeAt(xo) > 127 ? bo += "x" : bo += yo[xo];
					if (!bo.match(L)) {
						var Co = _o.slice(0, Z), wo = _o.slice(Z + 1), To = yo.match(R);
						To && (Co.push(To[1]), wo.unshift(To[2])), wo.length && (K = "/" + wo.join(".") + K), this.hostname = Co.join(".");
						break;
					}
				}
			}
			this.hostname.length > I ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), go || (this.hostname = C.toASCII(this.hostname));
			var Eo = this.port ? ":" + this.port : "";
			this.host = (this.hostname || "") + Eo, this.href += this.host, go && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), K[0] !== "/" && (K = "/" + K));
		}
		if (!z[Y]) for (var Z = 0, vo = A.length; Z < vo; Z++) {
			var Do = A[Z];
			if (K.indexOf(Do) !== -1) {
				var Oo = encodeURIComponent(Do);
				Oo === Do && (Oo = escape(Do)), K = K.split(Do).join(Oo);
			}
		}
		var ko = K.indexOf("#");
		ko !== -1 && (this.hash = K.substr(ko), K = K.slice(0, ko));
		var Ao = K.indexOf("?");
		if (Ao === -1 ? T && (this.search = "", this.query = {}) : (this.search = K.substr(Ao), this.query = K.substr(Ao + 1), T && (this.query = U.parse(this.query)), K = K.slice(0, Ao)), K && (this.pathname = K), V[Y] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
			var Eo = this.pathname || "";
			this.path = Eo + (this.search || "");
		}
		return this.href = this.format(), this;
	}, T.prototype.format = function() {
		var _ = this.auth || "";
		_ && (_ = encodeURIComponent(_), _ = _.replace(/%3A/i, ":"), _ += "@");
		var C = this.protocol || "", T = this.pathname || "", E = this.hash || "", D = !1, O = "";
		this.host ? D = _ + this.host : this.hostname && (D = _ + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (D += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (O = U.stringify(this.query, {
			arrayFormat: "repeat",
			addQueryPrefix: !1
		}));
		var A = this.search || O && "?" + O || "";
		return C && C.substr(-1) !== ":" && (C += ":"), this.slashes || (!C || V[C]) && D !== !1 ? (D = "//" + (D || ""), T && T.charAt(0) !== "/" && (T = "/" + T)) : D ||= "", E && E.charAt(0) !== "#" && (E = "#" + E), A && A.charAt(0) !== "?" && (A = "?" + A), T = T.replace(/[?#]/g, function(_) {
			return encodeURIComponent(_);
		}), A = A.replace("#", "%23"), C + D + T + A + E;
	}, T.prototype.resolve = function(_) {
		return this.resolveObject(W(_, !1, !0)).format();
	}, T.prototype.resolveObject = function(_) {
		if (typeof _ == "string") {
			var C = new T();
			C.parse(_, !1, !0), _ = C;
		}
		for (var E = new T(), D = Object.keys(this), O = 0; O < D.length; O++) {
			var A = D[O];
			E[A] = this[A];
		}
		if (E.hash = _.hash, _.href === "") return E.href = E.format(), E;
		if (_.slashes && !_.protocol) {
			for (var P = Object.keys(_), F = 0; F < P.length; F++) {
				var I = P[F];
				I !== "protocol" && (E[I] = _[I]);
			}
			return V[E.protocol] && E.hostname && !E.pathname && (E.pathname = "/", E.path = E.pathname), E.href = E.format(), E;
		}
		if (_.protocol && _.protocol !== E.protocol) {
			if (!V[_.protocol]) {
				for (var L = Object.keys(_), R = 0; R < L.length; R++) {
					var z = L[R];
					E[z] = _[z];
				}
				return E.href = E.format(), E;
			}
			if (E.protocol = _.protocol, !_.host && !B[_.protocol]) {
				for (var U = (_.pathname || "").split("/"); U.length && !(_.host = U.shift()););
				_.host ||= "", _.hostname ||= "", U[0] !== "" && U.unshift(""), U.length < 2 && U.unshift(""), E.pathname = U.join("/");
			} else E.pathname = _.pathname;
			return E.search = _.search, E.query = _.query, E.host = _.host || "", E.auth = _.auth, E.hostname = _.hostname || _.host, E.port = _.port, (E.pathname || E.search) && (E.path = (E.pathname || "") + (E.search || "")), E.slashes = E.slashes || _.slashes, E.href = E.format(), E;
		}
		var W = E.pathname && E.pathname.charAt(0) === "/", fo = _.host || _.pathname && _.pathname.charAt(0) === "/", G = fo || W || E.host && _.pathname, K = G, q = E.pathname && E.pathname.split("/") || [], U = _.pathname && _.pathname.split("/") || [], J = E.protocol && !V[E.protocol];
		if (J && (E.hostname = "", E.port = null, E.host && (q[0] === "" ? q[0] = E.host : q.unshift(E.host)), E.host = "", _.protocol && (_.hostname = null, _.port = null, _.host && (U[0] === "" ? U[0] = _.host : U.unshift(_.host)), _.host = null), G &&= U[0] === "" || q[0] === ""), fo) E.host = _.host || _.host === "" ? _.host : E.host, E.hostname = _.hostname || _.hostname === "" ? _.hostname : E.hostname, E.search = _.search, E.query = _.query, q = U;
		else if (U.length) q ||= [], q.pop(), q = q.concat(U), E.search = _.search, E.query = _.query;
		else if (_.search != null) {
			if (J) {
				E.host = q.shift(), E.hostname = E.host;
				var Y = E.host && E.host.indexOf("@") > 0 ? E.host.split("@") : !1;
				Y && (E.auth = Y.shift(), E.hostname = Y.shift(), E.host = E.hostname);
			}
			return E.search = _.search, E.query = _.query, (E.pathname !== null || E.search !== null) && (E.path = (E.pathname ? E.pathname : "") + (E.search ? E.search : "")), E.href = E.format(), E;
		}
		if (!q.length) return E.pathname = null, E.search ? E.path = "/" + E.search : E.path = null, E.href = E.format(), E;
		for (var X = q.slice(-1)[0], po = (E.host || _.host || q.length > 1) && (X === "." || X === "..") || X === "", Z = 0, Q = q.length; Q >= 0; Q--) X = q[Q], X === "." ? q.splice(Q, 1) : X === ".." ? (q.splice(Q, 1), Z++) : Z && (q.splice(Q, 1), Z--);
		if (!G && !K) for (; Z--;) q.unshift("..");
		G && q[0] !== "" && (!q[0] || q[0].charAt(0) !== "/") && q.unshift(""), po && q.join("/").substr(-1) !== "/" && q.push("");
		var mo = q[0] === "" || q[0] && q[0].charAt(0) === "/";
		if (J) {
			E.hostname = mo ? "" : q.length ? q.shift() : "", E.host = E.hostname;
			var Y = E.host && E.host.indexOf("@") > 0 ? E.host.split("@") : !1;
			Y && (E.auth = Y.shift(), E.hostname = Y.shift(), E.host = E.hostname);
		}
		return G ||= E.host && q.length, G && !mo && q.unshift(""), q.length > 0 ? E.pathname = q.join("/") : (E.pathname = null, E.path = null), (E.pathname !== null || E.search !== null) && (E.path = (E.pathname ? E.pathname : "") + (E.search ? E.search : "")), E.auth = _.auth || E.auth, E.slashes = E.slashes || _.slashes, E.href = E.format(), E;
	}, T.prototype.parseHost = function() {
		var _ = this.host, C = D.exec(_);
		C && (C = C[0], C !== ":" && (this.port = C.substr(1)), _ = _.substr(0, _.length - C.length)), _ && (this.hostname = _);
	};
})))(), require_earcut();
var import_eventemitter3 = /* @__PURE__ */ __toESM(require_eventemitter3(), 1), warnings = {};
function deprecation(_, C, T = 3) {
	if (warnings[C]) return;
	let E = (/* @__PURE__ */ Error()).stack;
	typeof E > "u" ? console.warn("PixiJS Deprecation Warning: ", `${C}
Deprecated since v${_}`) : (E = E.split("\n").splice(T).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${C}
Deprecated since v${_}`), console.warn(E), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${C}
Deprecated since v${_}`), console.warn(E))), warnings[C] = !0;
}
function assertPath(_) {
	if (typeof _ != "string") throw TypeError(`Path must be a string. Received ${JSON.stringify(_)}`);
}
function removeUrlParams(_) {
	return _.split("?")[0].split("#")[0];
}
function escapeRegExp(_) {
	return _.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(_, C, T) {
	return _.replace(new RegExp(escapeRegExp(C), "g"), T);
}
function normalizeStringPosix(_, C) {
	let T = "", E = 0, D = -1, O = 0, A = -1;
	for (let P = 0; P <= _.length; ++P) {
		if (P < _.length) A = _.charCodeAt(P);
		else {
			if (A === 47) break;
			A = 47;
		}
		if (A === 47) {
			if (!(D === P - 1 || O === 1)) if (D !== P - 1 && O === 2) {
				if (T.length < 2 || E !== 2 || T.charCodeAt(T.length - 1) !== 46 || T.charCodeAt(T.length - 2) !== 46) {
					if (T.length > 2) {
						let _ = T.lastIndexOf("/");
						if (_ !== T.length - 1) {
							_ === -1 ? (T = "", E = 0) : (T = T.slice(0, _), E = T.length - 1 - T.lastIndexOf("/")), D = P, O = 0;
							continue;
						}
					} else if (T.length === 2 || T.length === 1) {
						T = "", E = 0, D = P, O = 0;
						continue;
					}
				}
				C && (T.length > 0 ? T += "/.." : T = "..", E = 2);
			} else T.length > 0 ? T += `/${_.slice(D + 1, P)}` : T = _.slice(D + 1, P), E = P - D - 1;
			D = P, O = 0;
		} else A === 46 && O !== -1 ? ++O : O = -1;
	}
	return T;
}
var path = {
	toPosix(_) {
		return replaceAll(_, "\\", "/");
	},
	isUrl(_) {
		return /^https?:/.test(this.toPosix(_));
	},
	isDataUrl(_) {
		return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(_);
	},
	isBlobUrl(_) {
		return _.startsWith("blob:");
	},
	hasProtocol(_) {
		return /^[^/:]+:/.test(this.toPosix(_));
	},
	getProtocol(_) {
		assertPath(_), _ = this.toPosix(_);
		let C = /^file:\/\/\//.exec(_);
		if (C) return C[0];
		let T = /^[^/:]+:\/{0,2}/.exec(_);
		return T ? T[0] : "";
	},
	toAbsolute(_, C, T) {
		if (assertPath(_), this.isDataUrl(_) || this.isBlobUrl(_)) return _;
		let E = removeUrlParams(this.toPosix(C ?? settings.ADAPTER.getBaseUrl())), D = removeUrlParams(this.toPosix(T ?? this.rootname(E)));
		return _ = this.toPosix(_), _.startsWith("/") ? path.join(D, _.slice(1)) : this.isAbsolute(_) ? _ : this.join(E, _);
	},
	normalize(_) {
		if (assertPath(_), _.length === 0) return ".";
		if (this.isDataUrl(_) || this.isBlobUrl(_)) return _;
		_ = this.toPosix(_);
		let C = "", T = _.startsWith("/");
		this.hasProtocol(_) && (C = this.rootname(_), _ = _.slice(C.length));
		let E = _.endsWith("/");
		return _ = normalizeStringPosix(_, !1), _.length > 0 && E && (_ += "/"), T ? `/${_}` : C + _;
	},
	isAbsolute(_) {
		return assertPath(_), _ = this.toPosix(_), this.hasProtocol(_) ? !0 : _.startsWith("/");
	},
	join(..._) {
		if (_.length === 0) return ".";
		let C;
		for (let T = 0; T < _.length; ++T) {
			let E = _[T];
			if (assertPath(E), E.length > 0) if (C === void 0) C = E;
			else {
				let D = _[T - 1] ?? "";
				this.joinExtensions.includes(this.extname(D).toLowerCase()) ? C += `/../${E}` : C += `/${E}`;
			}
		}
		return C === void 0 ? "." : this.normalize(C);
	},
	dirname(_) {
		if (assertPath(_), _.length === 0) return ".";
		_ = this.toPosix(_);
		let C = _.charCodeAt(0), T = C === 47, E = -1, D = !0, O = this.getProtocol(_), A = _;
		_ = _.slice(O.length);
		for (let T = _.length - 1; T >= 1; --T) if (C = _.charCodeAt(T), C === 47) {
			if (!D) {
				E = T;
				break;
			}
		} else D = !1;
		return E === -1 ? T ? "/" : this.isUrl(A) ? O + _ : O : T && E === 1 ? "//" : O + _.slice(0, E);
	},
	rootname(_) {
		assertPath(_), _ = this.toPosix(_);
		let C = "";
		if (C = _.startsWith("/") ? "/" : this.getProtocol(_), this.isUrl(_)) {
			let T = _.indexOf("/", C.length);
			C = T === -1 ? _ : _.slice(0, T), C.endsWith("/") || (C += "/");
		}
		return C;
	},
	basename(_, C) {
		assertPath(_), C && assertPath(C), _ = removeUrlParams(this.toPosix(_));
		let T = 0, E = -1, D = !0, O;
		if (C !== void 0 && C.length > 0 && C.length <= _.length) {
			if (C.length === _.length && C === _) return "";
			let A = C.length - 1, P = -1;
			for (O = _.length - 1; O >= 0; --O) {
				let F = _.charCodeAt(O);
				if (F === 47) {
					if (!D) {
						T = O + 1;
						break;
					}
				} else P === -1 && (D = !1, P = O + 1), A >= 0 && (F === C.charCodeAt(A) ? --A === -1 && (E = O) : (A = -1, E = P));
			}
			return T === E ? E = P : E === -1 && (E = _.length), _.slice(T, E);
		}
		for (O = _.length - 1; O >= 0; --O) if (_.charCodeAt(O) === 47) {
			if (!D) {
				T = O + 1;
				break;
			}
		} else E === -1 && (D = !1, E = O + 1);
		return E === -1 ? "" : _.slice(T, E);
	},
	extname(_) {
		assertPath(_), _ = removeUrlParams(this.toPosix(_));
		let C = -1, T = 0, E = -1, D = !0, O = 0;
		for (let A = _.length - 1; A >= 0; --A) {
			let P = _.charCodeAt(A);
			if (P === 47) {
				if (!D) {
					T = A + 1;
					break;
				}
				continue;
			}
			E === -1 && (D = !1, E = A + 1), P === 46 ? C === -1 ? C = A : O !== 1 && (O = 1) : C !== -1 && (O = -1);
		}
		return C === -1 || E === -1 || O === 0 || O === 1 && C === E - 1 && C === T + 1 ? "" : _.slice(C, E);
	},
	parse(_) {
		assertPath(_);
		let C = {
			root: "",
			dir: "",
			base: "",
			ext: "",
			name: ""
		};
		if (_.length === 0) return C;
		_ = removeUrlParams(this.toPosix(_));
		let T = _.charCodeAt(0), E = this.isAbsolute(_), D;
		C.root = this.rootname(_), D = E || this.hasProtocol(_) ? 1 : 0;
		let O = -1, A = 0, P = -1, F = !0, I = _.length - 1, L = 0;
		for (; I >= D; --I) {
			if (T = _.charCodeAt(I), T === 47) {
				if (!F) {
					A = I + 1;
					break;
				}
				continue;
			}
			P === -1 && (F = !1, P = I + 1), T === 46 ? O === -1 ? O = I : L !== 1 && (L = 1) : O !== -1 && (L = -1);
		}
		return O === -1 || P === -1 || L === 0 || L === 1 && O === P - 1 && O === A + 1 ? P !== -1 && (A === 0 && E ? C.base = C.name = _.slice(1, P) : C.base = C.name = _.slice(A, P)) : (A === 0 && E ? (C.name = _.slice(1, O), C.base = _.slice(1, P)) : (C.name = _.slice(A, O), C.base = _.slice(A, P)), C.ext = _.slice(O, P)), C.dir = this.dirname(_), C;
	},
	sep: "/",
	delimiter: ":",
	joinExtensions: [".html"]
}, promise;
async function detectVideoAlphaMode() {
	return promise ??= (async () => {
		let _ = document.createElement("canvas").getContext("webgl");
		if (!_) return ALPHA_MODES.UNPACK;
		let C = await new Promise((_) => {
			let C = document.createElement("video");
			C.onloadeddata = () => _(C), C.onerror = () => _(null), C.autoplay = !1, C.crossOrigin = "anonymous", C.preload = "auto", C.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", C.load();
		});
		if (!C) return ALPHA_MODES.UNPACK;
		let T = _.createTexture();
		_.bindTexture(_.TEXTURE_2D, T);
		let E = _.createFramebuffer();
		_.bindFramebuffer(_.FRAMEBUFFER, E), _.framebufferTexture2D(_.FRAMEBUFFER, _.COLOR_ATTACHMENT0, _.TEXTURE_2D, T, 0), _.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _.pixelStorei(_.UNPACK_COLORSPACE_CONVERSION_WEBGL, _.NONE), _.texImage2D(_.TEXTURE_2D, 0, _.RGBA, _.RGBA, _.UNSIGNED_BYTE, C);
		let D = new Uint8Array(4);
		return _.readPixels(0, 0, 1, 1, _.RGBA, _.UNSIGNED_BYTE, D), _.deleteFramebuffer(E), _.deleteTexture(T), _.getExtension("WEBGL_lose_context")?.loseContext(), D[0] <= D[3] ? ALPHA_MODES.PMA : ALPHA_MODES.UNPACK;
	})(), promise;
}
var supported;
function isWebGLSupported() {
	return typeof supported > "u" && (supported = function() {
		let _ = {
			stencil: !0,
			failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
		};
		try {
			if (!settings.ADAPTER.getWebGLRenderingContext()) return !1;
			let C = settings.ADAPTER.createCanvas(), T = C.getContext("webgl", _) || C.getContext("experimental-webgl", _), E = !!T?.getContextAttributes()?.stencil;
			if (T) {
				let _ = T.getExtension("WEBGL_lose_context");
				_ && _.loseContext();
			}
			return T = null, E;
		} catch {
			return !1;
		}
	}()), supported;
}
var r = {
	grad: .9,
	turn: 360,
	rad: 360 / (2 * Math.PI)
}, t = function(_) {
	return typeof _ == "string" ? _.length > 0 : typeof _ == "number";
}, n = function(_, C, T) {
	return C === void 0 && (C = 0), T === void 0 && (T = 10 ** C), Math.round(T * _) / T + 0;
}, e = function(_, C, T) {
	return C === void 0 && (C = 0), T === void 0 && (T = 1), _ > T ? T : _ > C ? _ : C;
}, u = function(_) {
	return (_ = isFinite(_) ? _ % 360 : 0) > 0 ? _ : _ + 360;
}, a = function(_) {
	return {
		r: e(_.r, 0, 255),
		g: e(_.g, 0, 255),
		b: e(_.b, 0, 255),
		a: e(_.a)
	};
}, o = function(_) {
	return {
		r: n(_.r),
		g: n(_.g),
		b: n(_.b),
		a: n(_.a, 3)
	};
}, i = /^#([0-9a-f]{3,8})$/i, s = function(_) {
	var C = _.toString(16);
	return C.length < 2 ? "0" + C : C;
}, h = function(_) {
	var C = _.r, T = _.g, E = _.b, D = _.a, O = Math.max(C, T, E), A = O - Math.min(C, T, E), P = A ? O === C ? (T - E) / A : O === T ? 2 + (E - C) / A : 4 + (C - T) / A : 0;
	return {
		h: 60 * (P < 0 ? P + 6 : P),
		s: O ? A / O * 100 : 0,
		v: O / 255 * 100,
		a: D
	};
}, b = function(_) {
	var C = _.h, T = _.s, E = _.v, D = _.a;
	C = C / 360 * 6, T /= 100, E /= 100;
	var O = Math.floor(C), A = E * (1 - T), P = E * (1 - (C - O) * T), F = E * (1 - (1 - C + O) * T), I = O % 6;
	return {
		r: 255 * [
			E,
			P,
			A,
			A,
			F,
			E
		][I],
		g: 255 * [
			F,
			E,
			E,
			P,
			A,
			A
		][I],
		b: 255 * [
			A,
			A,
			F,
			E,
			E,
			P
		][I],
		a: D
	};
}, g = function(_) {
	return {
		h: u(_.h),
		s: e(_.s, 0, 100),
		l: e(_.l, 0, 100),
		a: e(_.a)
	};
}, d = function(_) {
	return {
		h: n(_.h),
		s: n(_.s),
		l: n(_.l),
		a: n(_.a, 3)
	};
}, f = function(_) {
	return b((T = (C = _).s, {
		h: C.h,
		s: (T *= ((E = C.l) < 50 ? E : 100 - E) / 100) > 0 ? 2 * T / (E + T) * 100 : 0,
		v: E + T,
		a: C.a
	}));
	var C, T, E;
}, c = function(_) {
	return {
		h: (C = h(_)).h,
		s: (D = (200 - (T = C.s)) * (E = C.v) / 100) > 0 && D < 200 ? T * E / 100 / (D <= 100 ? D : 200 - D) * 100 : 0,
		l: D / 2,
		a: C.a
	};
	var C, T, E, D;
}, l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, y = {
	string: [
		[function(_) {
			var C = i.exec(_);
			return C ? (_ = C[1]).length <= 4 ? {
				r: parseInt(_[0] + _[0], 16),
				g: parseInt(_[1] + _[1], 16),
				b: parseInt(_[2] + _[2], 16),
				a: _.length === 4 ? n(parseInt(_[3] + _[3], 16) / 255, 2) : 1
			} : _.length === 6 || _.length === 8 ? {
				r: parseInt(_.substr(0, 2), 16),
				g: parseInt(_.substr(2, 2), 16),
				b: parseInt(_.substr(4, 2), 16),
				a: _.length === 8 ? n(parseInt(_.substr(6, 2), 16) / 255, 2) : 1
			} : null : null;
		}, "hex"],
		[function(_) {
			var C = v.exec(_) || m.exec(_);
			return C ? C[2] !== C[4] || C[4] !== C[6] ? null : a({
				r: Number(C[1]) / (C[2] ? 100 / 255 : 1),
				g: Number(C[3]) / (C[4] ? 100 / 255 : 1),
				b: Number(C[5]) / (C[6] ? 100 / 255 : 1),
				a: C[7] === void 0 ? 1 : Number(C[7]) / (C[8] ? 100 : 1)
			}) : null;
		}, "rgb"],
		[function(_) {
			var C = l.exec(_) || p.exec(_);
			if (!C) return null;
			var T, E;
			return f(g({
				h: (T = C[1], E = C[2], E === void 0 && (E = "deg"), Number(T) * (r[E] || 1)),
				s: Number(C[3]),
				l: Number(C[4]),
				a: C[5] === void 0 ? 1 : Number(C[5]) / (C[6] ? 100 : 1)
			}));
		}, "hsl"]
	],
	object: [
		[function(_) {
			var C = _.r, T = _.g, E = _.b, D = _.a, O = D === void 0 ? 1 : D;
			return t(C) && t(T) && t(E) ? a({
				r: Number(C),
				g: Number(T),
				b: Number(E),
				a: Number(O)
			}) : null;
		}, "rgb"],
		[function(_) {
			var C = _.h, T = _.s, E = _.l, D = _.a, O = D === void 0 ? 1 : D;
			return !t(C) || !t(T) || !t(E) ? null : f(g({
				h: Number(C),
				s: Number(T),
				l: Number(E),
				a: Number(O)
			}));
		}, "hsl"],
		[function(_) {
			var C = _.h, T = _.s, E = _.v, D = _.a, O = D === void 0 ? 1 : D;
			return !t(C) || !t(T) || !t(E) ? null : b(function(_) {
				return {
					h: u(_.h),
					s: e(_.s, 0, 100),
					v: e(_.v, 0, 100),
					a: e(_.a)
				};
			}({
				h: Number(C),
				s: Number(T),
				v: Number(E),
				a: Number(O)
			}));
		}, "hsv"]
	]
}, N = function(_, C) {
	for (var T = 0; T < C.length; T++) {
		var E = C[T][0](_);
		if (E) return [E, C[T][1]];
	}
	return [null, void 0];
}, x = function(_) {
	return typeof _ == "string" ? N(_.trim(), y.string) : typeof _ == "object" && _ ? N(_, y.object) : [null, void 0];
}, M = function(_, C) {
	var T = c(_);
	return {
		h: T.h,
		s: e(T.s + 100 * C, 0, 100),
		l: T.l,
		a: T.a
	};
}, H = function(_) {
	return (299 * _.r + 587 * _.g + 114 * _.b) / 1e3 / 255;
}, $ = function(_, C) {
	var T = c(_);
	return {
		h: T.h,
		s: T.s,
		l: e(T.l + 100 * C, 0, 100),
		a: T.a
	};
}, j = function() {
	function _(_) {
		this.parsed = x(_)[0], this.rgba = this.parsed || {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
	}
	return _.prototype.isValid = function() {
		return this.parsed !== null;
	}, _.prototype.brightness = function() {
		return n(H(this.rgba), 2);
	}, _.prototype.isDark = function() {
		return H(this.rgba) < .5;
	}, _.prototype.isLight = function() {
		return H(this.rgba) >= .5;
	}, _.prototype.toHex = function() {
		return _ = o(this.rgba), C = _.r, T = _.g, E = _.b, O = (D = _.a) < 1 ? s(n(255 * D)) : "", "#" + s(C) + s(T) + s(E) + O;
		var _, C, T, E, D, O;
	}, _.prototype.toRgb = function() {
		return o(this.rgba);
	}, _.prototype.toRgbString = function() {
		return _ = o(this.rgba), C = _.r, T = _.g, E = _.b, (D = _.a) < 1 ? "rgba(" + C + ", " + T + ", " + E + ", " + D + ")" : "rgb(" + C + ", " + T + ", " + E + ")";
		var _, C, T, E, D;
	}, _.prototype.toHsl = function() {
		return d(c(this.rgba));
	}, _.prototype.toHslString = function() {
		return _ = d(c(this.rgba)), C = _.h, T = _.s, E = _.l, (D = _.a) < 1 ? "hsla(" + C + ", " + T + "%, " + E + "%, " + D + ")" : "hsl(" + C + ", " + T + "%, " + E + "%)";
		var _, C, T, E, D;
	}, _.prototype.toHsv = function() {
		return _ = h(this.rgba), {
			h: n(_.h),
			s: n(_.s),
			v: n(_.v),
			a: n(_.a, 3)
		};
		var _;
	}, _.prototype.invert = function() {
		return w({
			r: 255 - (_ = this.rgba).r,
			g: 255 - _.g,
			b: 255 - _.b,
			a: _.a
		});
		var _;
	}, _.prototype.saturate = function(_) {
		return _ === void 0 && (_ = .1), w(M(this.rgba, _));
	}, _.prototype.desaturate = function(_) {
		return _ === void 0 && (_ = .1), w(M(this.rgba, -_));
	}, _.prototype.grayscale = function() {
		return w(M(this.rgba, -1));
	}, _.prototype.lighten = function(_) {
		return _ === void 0 && (_ = .1), w($(this.rgba, _));
	}, _.prototype.darken = function(_) {
		return _ === void 0 && (_ = .1), w($(this.rgba, -_));
	}, _.prototype.rotate = function(_) {
		return _ === void 0 && (_ = 15), this.hue(this.hue() + _);
	}, _.prototype.alpha = function(_) {
		return typeof _ == "number" ? w({
			r: (C = this.rgba).r,
			g: C.g,
			b: C.b,
			a: _
		}) : n(this.rgba.a, 3);
		var C;
	}, _.prototype.hue = function(_) {
		var C = c(this.rgba);
		return typeof _ == "number" ? w({
			h: _,
			s: C.s,
			l: C.l,
			a: C.a
		}) : n(C.h);
	}, _.prototype.isEqual = function(_) {
		return this.toHex() === w(_).toHex();
	}, _;
}(), w = function(_) {
	return _ instanceof j ? _ : new j(_);
}, S = [], k = function(_) {
	_.forEach(function(_) {
		S.indexOf(_) < 0 && (_(j, y), S.push(_));
	});
};
function names_default(_, C) {
	var T = {
		white: "#ffffff",
		bisque: "#ffe4c4",
		blue: "#0000ff",
		cadetblue: "#5f9ea0",
		chartreuse: "#7fff00",
		chocolate: "#d2691e",
		coral: "#ff7f50",
		antiquewhite: "#faebd7",
		aqua: "#00ffff",
		azure: "#f0ffff",
		whitesmoke: "#f5f5f5",
		papayawhip: "#ffefd5",
		plum: "#dda0dd",
		blanchedalmond: "#ffebcd",
		black: "#000000",
		gold: "#ffd700",
		goldenrod: "#daa520",
		gainsboro: "#dcdcdc",
		cornsilk: "#fff8dc",
		cornflowerblue: "#6495ed",
		burlywood: "#deb887",
		aquamarine: "#7fffd4",
		beige: "#f5f5dc",
		crimson: "#dc143c",
		cyan: "#00ffff",
		darkblue: "#00008b",
		darkcyan: "#008b8b",
		darkgoldenrod: "#b8860b",
		darkkhaki: "#bdb76b",
		darkgray: "#a9a9a9",
		darkgreen: "#006400",
		darkgrey: "#a9a9a9",
		peachpuff: "#ffdab9",
		darkmagenta: "#8b008b",
		darkred: "#8b0000",
		darkorchid: "#9932cc",
		darkorange: "#ff8c00",
		darkslateblue: "#483d8b",
		gray: "#808080",
		darkslategray: "#2f4f4f",
		darkslategrey: "#2f4f4f",
		deeppink: "#ff1493",
		deepskyblue: "#00bfff",
		wheat: "#f5deb3",
		firebrick: "#b22222",
		floralwhite: "#fffaf0",
		ghostwhite: "#f8f8ff",
		darkviolet: "#9400d3",
		magenta: "#ff00ff",
		green: "#008000",
		dodgerblue: "#1e90ff",
		grey: "#808080",
		honeydew: "#f0fff0",
		hotpink: "#ff69b4",
		blueviolet: "#8a2be2",
		forestgreen: "#228b22",
		lawngreen: "#7cfc00",
		indianred: "#cd5c5c",
		indigo: "#4b0082",
		fuchsia: "#ff00ff",
		brown: "#a52a2a",
		maroon: "#800000",
		mediumblue: "#0000cd",
		lightcoral: "#f08080",
		darkturquoise: "#00ced1",
		lightcyan: "#e0ffff",
		ivory: "#fffff0",
		lightyellow: "#ffffe0",
		lightsalmon: "#ffa07a",
		lightseagreen: "#20b2aa",
		linen: "#faf0e6",
		mediumaquamarine: "#66cdaa",
		lemonchiffon: "#fffacd",
		lime: "#00ff00",
		khaki: "#f0e68c",
		mediumseagreen: "#3cb371",
		limegreen: "#32cd32",
		mediumspringgreen: "#00fa9a",
		lightskyblue: "#87cefa",
		lightblue: "#add8e6",
		midnightblue: "#191970",
		lightpink: "#ffb6c1",
		mistyrose: "#ffe4e1",
		moccasin: "#ffe4b5",
		mintcream: "#f5fffa",
		lightslategray: "#778899",
		lightslategrey: "#778899",
		navajowhite: "#ffdead",
		navy: "#000080",
		mediumvioletred: "#c71585",
		powderblue: "#b0e0e6",
		palegoldenrod: "#eee8aa",
		oldlace: "#fdf5e6",
		paleturquoise: "#afeeee",
		mediumturquoise: "#48d1cc",
		mediumorchid: "#ba55d3",
		rebeccapurple: "#663399",
		lightsteelblue: "#b0c4de",
		mediumslateblue: "#7b68ee",
		thistle: "#d8bfd8",
		tan: "#d2b48c",
		orchid: "#da70d6",
		mediumpurple: "#9370db",
		purple: "#800080",
		pink: "#ffc0cb",
		skyblue: "#87ceeb",
		springgreen: "#00ff7f",
		palegreen: "#98fb98",
		red: "#ff0000",
		yellow: "#ffff00",
		slateblue: "#6a5acd",
		lavenderblush: "#fff0f5",
		peru: "#cd853f",
		palevioletred: "#db7093",
		violet: "#ee82ee",
		teal: "#008080",
		slategray: "#708090",
		slategrey: "#708090",
		aliceblue: "#f0f8ff",
		darkseagreen: "#8fbc8f",
		darkolivegreen: "#556b2f",
		greenyellow: "#adff2f",
		seagreen: "#2e8b57",
		seashell: "#fff5ee",
		tomato: "#ff6347",
		silver: "#c0c0c0",
		sienna: "#a0522d",
		lavender: "#e6e6fa",
		lightgreen: "#90ee90",
		orange: "#ffa500",
		orangered: "#ff4500",
		steelblue: "#4682b4",
		royalblue: "#4169e1",
		turquoise: "#40e0d0",
		yellowgreen: "#9acd32",
		salmon: "#fa8072",
		saddlebrown: "#8b4513",
		sandybrown: "#f4a460",
		rosybrown: "#bc8f8f",
		darksalmon: "#e9967a",
		lightgoldenrodyellow: "#fafad2",
		snow: "#fffafa",
		lightgrey: "#d3d3d3",
		lightgray: "#d3d3d3",
		dimgray: "#696969",
		dimgrey: "#696969",
		olivedrab: "#6b8e23",
		olive: "#808000"
	}, E = {};
	for (var D in T) E[T[D]] = D;
	var O = {};
	_.prototype.toName = function(C) {
		if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
		var D, A, P = E[this.toHex()];
		if (P) return P;
		if (C?.closest) {
			var F = this.toRgb(), I = Infinity, L = "black";
			if (!O.length) for (var R in T) O[R] = new _(T[R]).toRgb();
			for (var z in T) {
				var B = (D = F, A = O[z], (D.r - A.r) ** 2 + (D.g - A.g) ** 2 + (D.b - A.b) ** 2);
				B < I && (I = B, L = z);
			}
			return L;
		}
	}, C.string.push([function(C) {
		var E = C.toLowerCase(), D = E === "transparent" ? "#0000" : T[E];
		return D ? new _(D).toRgb() : null;
	}, "name"]);
}
k([names_default]);
var _Color = class _ {
	constructor(_ = 16777215) {
		this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = _;
	}
	get red() {
		return this._components[0];
	}
	get green() {
		return this._components[1];
	}
	get blue() {
		return this._components[2];
	}
	get alpha() {
		return this._components[3];
	}
	setValue(_) {
		return this.value = _, this;
	}
	set value(C) {
		if (C instanceof _) this._value = this.cloneSource(C._value), this._int = C._int, this._components.set(C._components);
		else {
			if (C === null) throw Error("Cannot set PIXI.Color#value to null");
			(this._value === null || !this.isSourceEqual(this._value, C)) && (this.normalize(C), this._value = this.cloneSource(C));
		}
	}
	get value() {
		return this._value;
	}
	cloneSource(_) {
		return typeof _ == "string" || typeof _ == "number" || _ instanceof Number || _ === null ? _ : Array.isArray(_) || ArrayBuffer.isView(_) ? _.slice(0) : typeof _ == "object" && _ ? { ..._ } : _;
	}
	isSourceEqual(_, C) {
		let T = typeof _;
		if (T !== typeof C) return !1;
		if (T === "number" || T === "string" || _ instanceof Number) return _ === C;
		if (Array.isArray(_) && Array.isArray(C) || ArrayBuffer.isView(_) && ArrayBuffer.isView(C)) return _.length === C.length ? _.every((_, T) => _ === C[T]) : !1;
		if (_ !== null && C !== null) {
			let T = Object.keys(_), E = Object.keys(C);
			return T.length === E.length ? T.every((T) => _[T] === C[T]) : !1;
		}
		return _ === C;
	}
	toRgba() {
		let [_, C, T, E] = this._components;
		return {
			r: _,
			g: C,
			b: T,
			a: E
		};
	}
	toRgb() {
		let [_, C, T] = this._components;
		return {
			r: _,
			g: C,
			b: T
		};
	}
	toRgbaString() {
		let [_, C, T] = this.toUint8RgbArray();
		return `rgba(${_},${C},${T},${this.alpha})`;
	}
	toUint8RgbArray(_) {
		let [C, T, E] = this._components;
		return _ ??= [], _[0] = Math.round(C * 255), _[1] = Math.round(T * 255), _[2] = Math.round(E * 255), _;
	}
	toRgbArray(_) {
		_ ??= [];
		let [C, T, E] = this._components;
		return _[0] = C, _[1] = T, _[2] = E, _;
	}
	toNumber() {
		return this._int;
	}
	toLittleEndianNumber() {
		let _ = this._int;
		return (_ >> 16) + (_ & 65280) + ((_ & 255) << 16);
	}
	multiply(C) {
		let [T, E, D, O] = _.temp.setValue(C)._components;
		return this._components[0] *= T, this._components[1] *= E, this._components[2] *= D, this._components[3] *= O, this.refreshInt(), this._value = null, this;
	}
	premultiply(_, C = !0) {
		return C && (this._components[0] *= _, this._components[1] *= _, this._components[2] *= _), this._components[3] = _, this.refreshInt(), this._value = null, this;
	}
	toPremultiplied(_, C = !0) {
		if (_ === 1) return (255 << 24) + this._int;
		if (_ === 0) return C ? 0 : this._int;
		let T = this._int >> 16 & 255, E = this._int >> 8 & 255, D = this._int & 255;
		return C && (T = T * _ + .5 | 0, E = E * _ + .5 | 0, D = D * _ + .5 | 0), (_ * 255 << 24) + (T << 16) + (E << 8) + D;
	}
	toHex() {
		let _ = this._int.toString(16);
		return `#${"000000".substring(0, 6 - _.length) + _}`;
	}
	toHexa() {
		let _ = Math.round(this._components[3] * 255).toString(16);
		return this.toHex() + "00".substring(0, 2 - _.length) + _;
	}
	setAlpha(_) {
		return this._components[3] = this._clamp(_), this;
	}
	round(_) {
		let [C, T, E] = this._components;
		return this._components[0] = Math.round(C * _) / _, this._components[1] = Math.round(T * _) / _, this._components[2] = Math.round(E * _) / _, this.refreshInt(), this._value = null, this;
	}
	toArray(_) {
		_ ??= [];
		let [C, T, E, D] = this._components;
		return _[0] = C, _[1] = T, _[2] = E, _[3] = D, _;
	}
	normalize(C) {
		let T, E, D, O;
		if ((typeof C == "number" || C instanceof Number) && C >= 0 && C <= 16777215) {
			let _ = C;
			T = (_ >> 16 & 255) / 255, E = (_ >> 8 & 255) / 255, D = (_ & 255) / 255, O = 1;
		} else if ((Array.isArray(C) || C instanceof Float32Array) && C.length >= 3 && C.length <= 4) C = this._clamp(C), [T, E, D, O = 1] = C;
		else if ((C instanceof Uint8Array || C instanceof Uint8ClampedArray) && C.length >= 3 && C.length <= 4) C = this._clamp(C, 0, 255), [T, E, D, O = 255] = C, T /= 255, E /= 255, D /= 255, O /= 255;
		else if (typeof C == "string" || typeof C == "object") {
			if (typeof C == "string") {
				let T = _.HEX_PATTERN.exec(C);
				T && (C = `#${T[2]}`);
			}
			let A = w(C);
			A.isValid() && ({r: T, g: E, b: D, a: O} = A.rgba, T /= 255, E /= 255, D /= 255);
		}
		if (T !== void 0) this._components[0] = T, this._components[1] = E, this._components[2] = D, this._components[3] = O, this.refreshInt();
		else throw Error(`Unable to convert color ${C}`);
	}
	refreshInt() {
		this._clamp(this._components);
		let [_, C, T] = this._components;
		this._int = (_ * 255 << 16) + (C * 255 << 8) + (T * 255 | 0);
	}
	_clamp(_, C = 0, T = 1) {
		return typeof _ == "number" ? Math.min(Math.max(_, C), T) : (_.forEach((E, D) => {
			_[D] = Math.min(Math.max(E, C), T);
		}), _);
	}
};
_Color.shared = new _Color(), _Color.temp = new _Color(), _Color.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
var Color = _Color;
function mapPremultipliedBlendModes() {
	let _ = [], C = [];
	for (let T = 0; T < 32; T++) _[T] = T, C[T] = T;
	_[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL, _[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD, _[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN, C[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM, C[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM, C[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
	let T = [];
	return T.push(C), T.push(_), T;
}
var premultiplyBlendMode = mapPremultipliedBlendModes();
function getBufferType(_) {
	if (_.BYTES_PER_ELEMENT === 4) return _ instanceof Float32Array ? "Float32Array" : _ instanceof Uint32Array ? "Uint32Array" : "Int32Array";
	if (_.BYTES_PER_ELEMENT === 2) {
		if (_ instanceof Uint16Array) return "Uint16Array";
	} else if (_.BYTES_PER_ELEMENT === 1 && _ instanceof Uint8Array) return "Uint8Array";
	return null;
}
function nextPow2(_) {
	return _ += _ === 0 ? 1 : 0, --_, _ |= _ >>> 1, _ |= _ >>> 2, _ |= _ >>> 4, _ |= _ >>> 8, _ |= _ >>> 16, _ + 1;
}
function isPow2(_) {
	return !(_ & _ - 1) && !!_;
}
function log2(_) {
	let C = (_ > 65535 ? 1 : 0) << 4;
	_ >>>= C;
	let T = (_ > 255 ? 1 : 0) << 3;
	return _ >>>= T, C |= T, T = (_ > 15 ? 1 : 0) << 2, _ >>>= T, C |= T, T = (_ > 3 ? 1 : 0) << 1, _ >>>= T, C |= T, C | _ >> 1;
}
function removeItems(_, C, T) {
	let E = _.length, D;
	if (C >= E || T === 0) return;
	T = C + T > E ? E - C : T;
	let O = E - T;
	for (D = C; D < O; ++D) _[D] = _[D + T];
	_.length = O;
}
var nextUid = 0;
function uid() {
	return ++nextUid;
}
var _BoundingBox = class {
	constructor(_, C, T, E) {
		this.left = _, this.top = C, this.right = T, this.bottom = E;
	}
	get width() {
		return this.right - this.left;
	}
	get height() {
		return this.bottom - this.top;
	}
	isEmpty() {
		return this.left === this.right || this.top === this.bottom;
	}
};
_BoundingBox.EMPTY = new _BoundingBox(0, 0, 0, 0);
var ProgramCache = {}, TextureCache = /* @__PURE__ */ Object.create(null), BaseTextureCache = /* @__PURE__ */ Object.create(null);
function determineCrossOrigin(_, C = globalThis.location) {
	if (_.startsWith("data:")) return "";
	C ||= globalThis.location;
	let T = new URL(_, document.baseURI);
	return T.hostname !== C.hostname || T.port !== C.port || T.protocol !== C.protocol ? "anonymous" : "";
}
function getResolutionOfUrl(_, C = 1) {
	let T = settings.RETINA_PREFIX?.exec(_);
	return T ? parseFloat(T[1]) : C;
}
var ExtensionType = /* @__PURE__ */ ((_) => (_.Renderer = "renderer", _.Application = "application", _.RendererSystem = "renderer-webgl-system", _.RendererPlugin = "renderer-webgl-plugin", _.CanvasRendererSystem = "renderer-canvas-system", _.CanvasRendererPlugin = "renderer-canvas-plugin", _.Asset = "asset", _.LoadParser = "load-parser", _.ResolveParser = "resolve-parser", _.CacheParser = "cache-parser", _.DetectionParser = "detection-parser", _))(ExtensionType || {}), normalizeExtension = (_) => {
	if (typeof _ == "function" || typeof _ == "object" && _.extension) {
		if (!_.extension) throw Error("Extension class must have an extension object");
		_ = {
			...typeof _.extension == "object" ? _.extension : { type: _.extension },
			ref: _
		};
	}
	if (typeof _ == "object") _ = { ..._ };
	else throw Error("Invalid extension type");
	return typeof _.type == "string" && (_.type = [_.type]), _;
}, normalizePriority = (_, C) => normalizeExtension(_).priority ?? C, extensions = {
	_addHandlers: {},
	_removeHandlers: {},
	_queue: {},
	remove(..._) {
		return _.map(normalizeExtension).forEach((_) => {
			_.type.forEach((C) => this._removeHandlers[C]?.(_));
		}), this;
	},
	add(..._) {
		return _.map(normalizeExtension).forEach((_) => {
			_.type.forEach((C) => {
				let T = this._addHandlers, E = this._queue;
				T[C] ? T[C]?.(_) : (E[C] = E[C] || [], E[C]?.push(_));
			});
		}), this;
	},
	handle(_, C, T) {
		let E = this._addHandlers, D = this._removeHandlers;
		if (E[_] || D[_]) throw Error(`Extension type ${_} already has a handler`);
		E[_] = C, D[_] = T;
		let O = this._queue;
		return O[_] && (O[_]?.forEach((_) => C(_)), delete O[_]), this;
	},
	handleByMap(_, C) {
		return this.handle(_, (_) => {
			_.name && (C[_.name] = _.ref);
		}, (_) => {
			_.name && delete C[_.name];
		});
	},
	handleByList(_, C, T = -1) {
		return this.handle(_, (_) => {
			C.includes(_.ref) || (C.push(_.ref), C.sort((_, C) => normalizePriority(C, T) - normalizePriority(_, T)));
		}, (_) => {
			let T = C.indexOf(_.ref);
			T !== -1 && C.splice(T, 1);
		});
	}
}, ViewableBuffer = class {
	constructor(_) {
		typeof _ == "number" ? this.rawBinaryData = new ArrayBuffer(_) : _ instanceof Uint8Array ? this.rawBinaryData = _.buffer : this.rawBinaryData = _, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData);
	}
	get int8View() {
		return this._int8View ||= new Int8Array(this.rawBinaryData), this._int8View;
	}
	get uint8View() {
		return this._uint8View ||= new Uint8Array(this.rawBinaryData), this._uint8View;
	}
	get int16View() {
		return this._int16View ||= new Int16Array(this.rawBinaryData), this._int16View;
	}
	get uint16View() {
		return this._uint16View ||= new Uint16Array(this.rawBinaryData), this._uint16View;
	}
	get int32View() {
		return this._int32View ||= new Int32Array(this.rawBinaryData), this._int32View;
	}
	view(_) {
		return this[`${_}View`];
	}
	destroy() {
		this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this._uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
	}
	static sizeOf(_) {
		switch (_) {
			case "int8":
			case "uint8": return 1;
			case "int16":
			case "uint16": return 2;
			case "int32":
			case "uint32":
			case "float32": return 4;
			default: throw Error(`${_} isn't a valid view type`);
		}
	}
}, fragTemplate = [
	"precision mediump float;",
	"void main(void){",
	"float test = 0.1;",
	"%forloop%",
	"gl_FragColor = vec4(0.0);",
	"}"
].join("\n");
function generateIfTestSrc(_) {
	let C = "";
	for (let T = 0; T < _; ++T) T > 0 && (C += "\nelse "), T < _ - 1 && (C += `if(test == ${T}.0){}`);
	return C;
}
function checkMaxIfStatementsInShader(_, C) {
	if (_ === 0) throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
	let T = C.createShader(C.FRAGMENT_SHADER);
	for (;;) {
		let E = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(_));
		if (C.shaderSource(T, E), C.compileShader(T), !C.getShaderParameter(T, C.COMPILE_STATUS)) _ = _ / 2 | 0;
		else break;
	}
	return _;
}
var BLEND$1 = 0, OFFSET$1 = 1, CULLING$1 = 2, DEPTH_TEST$1 = 3, WINDING$1 = 4, DEPTH_MASK$1 = 5, State = class _ {
	constructor() {
		this.data = 0, this.blendMode = BLEND_MODES.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
	}
	get blend() {
		return !!(this.data & 1 << BLEND$1);
	}
	set blend(_) {
		!!(this.data & 1 << BLEND$1) !== _ && (this.data ^= 1 << BLEND$1);
	}
	get offsets() {
		return !!(this.data & 1 << OFFSET$1);
	}
	set offsets(_) {
		!!(this.data & 1 << OFFSET$1) !== _ && (this.data ^= 1 << OFFSET$1);
	}
	get culling() {
		return !!(this.data & 1 << CULLING$1);
	}
	set culling(_) {
		!!(this.data & 1 << CULLING$1) !== _ && (this.data ^= 1 << CULLING$1);
	}
	get depthTest() {
		return !!(this.data & 1 << DEPTH_TEST$1);
	}
	set depthTest(_) {
		!!(this.data & 1 << DEPTH_TEST$1) !== _ && (this.data ^= 1 << DEPTH_TEST$1);
	}
	get depthMask() {
		return !!(this.data & 1 << DEPTH_MASK$1);
	}
	set depthMask(_) {
		!!(this.data & 1 << DEPTH_MASK$1) !== _ && (this.data ^= 1 << DEPTH_MASK$1);
	}
	get clockwiseFrontFace() {
		return !!(this.data & 1 << WINDING$1);
	}
	set clockwiseFrontFace(_) {
		!!(this.data & 1 << WINDING$1) !== _ && (this.data ^= 1 << WINDING$1);
	}
	get blendMode() {
		return this._blendMode;
	}
	set blendMode(_) {
		this.blend = _ !== BLEND_MODES.NONE, this._blendMode = _;
	}
	get polygonOffset() {
		return this._polygonOffset;
	}
	set polygonOffset(_) {
		this.offsets = !!_, this._polygonOffset = _;
	}
	static for2d() {
		let C = new _();
		return C.depthTest = !1, C.blend = !0, C;
	}
};
State.prototype.toString = function() {
	return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};
var INSTALLED = [];
function autoDetectResource(_, C) {
	if (!_) return null;
	let T = "";
	if (typeof _ == "string") {
		let C = /\.(\w{3,4})(?:$|\?|#)/i.exec(_);
		C && (T = C[1].toLowerCase());
	}
	for (let E = INSTALLED.length - 1; E >= 0; --E) {
		let D = INSTALLED[E];
		if (D.test && D.test(_, T)) return new D(_, C);
	}
	throw Error("Unrecognized source type to auto-detect Resource");
}
var Runner = class {
	constructor(_) {
		this.items = [], this._name = _, this._aliasCount = 0;
	}
	emit(_, C, T, E, D, O, A, P) {
		if (arguments.length > 8) throw Error("max arguments reached");
		let { name: F, items: I } = this;
		this._aliasCount++;
		for (let L = 0, R = I.length; L < R; L++) I[L][F](_, C, T, E, D, O, A, P);
		return I === this.items && this._aliasCount--, this;
	}
	ensureNonAliasedItems() {
		this._aliasCount > 0 && this.items.length > 1 && (this._aliasCount = 0, this.items = this.items.slice(0));
	}
	add(_) {
		return _[this._name] && (this.ensureNonAliasedItems(), this.remove(_), this.items.push(_)), this;
	}
	remove(_) {
		let C = this.items.indexOf(_);
		return C !== -1 && (this.ensureNonAliasedItems(), this.items.splice(C, 1)), this;
	}
	contains(_) {
		return this.items.includes(_);
	}
	removeAll() {
		return this.ensureNonAliasedItems(), this.items.length = 0, this;
	}
	destroy() {
		this.removeAll(), this.items.length = 0, this._name = "";
	}
	get empty() {
		return this.items.length === 0;
	}
	get name() {
		return this._name;
	}
};
Object.defineProperties(Runner.prototype, {
	dispatch: { value: Runner.prototype.emit },
	run: { value: Runner.prototype.emit }
});
var Resource = class {
	constructor(_ = 0, C = 0) {
		this._width = _, this._height = C, this.destroyed = !1, this.internal = !1, this.onResize = new Runner("setRealSize"), this.onUpdate = new Runner("update"), this.onError = new Runner("onError");
	}
	bind(_) {
		this.onResize.add(_), this.onUpdate.add(_), this.onError.add(_), (this._width || this._height) && this.onResize.emit(this._width, this._height);
	}
	unbind(_) {
		this.onResize.remove(_), this.onUpdate.remove(_), this.onError.remove(_);
	}
	resize(_, C) {
		(_ !== this._width || C !== this._height) && (this._width = _, this._height = C, this.onResize.emit(_, C));
	}
	get valid() {
		return !!this._width && !!this._height;
	}
	update() {
		this.destroyed || this.onUpdate.emit();
	}
	load() {
		return Promise.resolve(this);
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
	style(_, C, T) {
		return !1;
	}
	dispose() {}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.dispose(), this.onError.removeAll(), this.onError = null, this.onResize.removeAll(), this.onResize = null, this.onUpdate.removeAll(), this.onUpdate = null);
	}
	static test(_, C) {
		return !1;
	}
}, BufferResource = class extends Resource {
	constructor(_, C) {
		let { width: T, height: E } = C || {};
		if (!T || !E) throw Error("BufferResource width or height invalid");
		super(T, E), this.data = _, this.unpackAlignment = C.unpackAlignment ?? 4;
	}
	upload(_, C, T) {
		let E = _.gl;
		E.pixelStorei(E.UNPACK_ALIGNMENT, this.unpackAlignment), E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL, C.alphaMode === ALPHA_MODES.UNPACK);
		let D = C.realWidth, O = C.realHeight;
		return T.width === D && T.height === O ? E.texSubImage2D(C.target, 0, 0, 0, D, O, C.format, T.type, this.data) : (T.width = D, T.height = O, E.texImage2D(C.target, 0, T.internalFormat, D, O, 0, C.format, T.type, this.data)), !0;
	}
	dispose() {
		this.data = null;
	}
	static test(_) {
		return _ === null || _ instanceof Int8Array || _ instanceof Uint8Array || _ instanceof Uint8ClampedArray || _ instanceof Int16Array || _ instanceof Uint16Array || _ instanceof Int32Array || _ instanceof Uint32Array || _ instanceof Float32Array;
	}
}, defaultBufferOptions = {
	scaleMode: SCALE_MODES.NEAREST,
	alphaMode: ALPHA_MODES.NPM
}, _BaseTexture = class _ extends import_eventemitter3.default {
	constructor(C = null, T = null) {
		super(), T = Object.assign({}, _.defaultOptions, T);
		let { alphaMode: E, mipmap: D, anisotropicLevel: O, scaleMode: A, width: P, height: F, wrapMode: I, format: L, type: R, target: z, resolution: B, resourceOptions: V } = T;
		C && !(C instanceof Resource) && (C = autoDetectResource(C, V), C.internal = !0), this.resolution = B || settings.RESOLUTION, this.width = Math.round((P || 0) * this.resolution) / this.resolution, this.height = Math.round((F || 0) * this.resolution) / this.resolution, this._mipmap = D, this.anisotropicLevel = O, this._wrapMode = I, this._scaleMode = A, this.format = L, this.type = R, this.target = z, this.alphaMode = E, this.uid = uid(), this.touched = 0, this.isPowerOfTwo = !1, this._refreshPOT(), this._glTextures = {}, this.dirtyId = 0, this.dirtyStyleId = 0, this.cacheId = null, this.valid = P > 0 && F > 0, this.textureCacheIds = [], this.destroyed = !1, this.resource = null, this._batchEnabled = 0, this._batchLocation = 0, this.parentTextureArray = null, this.setResource(C);
	}
	get realWidth() {
		return Math.round(this.width * this.resolution);
	}
	get realHeight() {
		return Math.round(this.height * this.resolution);
	}
	get mipmap() {
		return this._mipmap;
	}
	set mipmap(_) {
		this._mipmap !== _ && (this._mipmap = _, this.dirtyStyleId++);
	}
	get scaleMode() {
		return this._scaleMode;
	}
	set scaleMode(_) {
		this._scaleMode !== _ && (this._scaleMode = _, this.dirtyStyleId++);
	}
	get wrapMode() {
		return this._wrapMode;
	}
	set wrapMode(_) {
		this._wrapMode !== _ && (this._wrapMode = _, this.dirtyStyleId++);
	}
	setStyle(_, C) {
		let T;
		return _ !== void 0 && _ !== this.scaleMode && (this.scaleMode = _, T = !0), C !== void 0 && C !== this.mipmap && (this.mipmap = C, T = !0), T && this.dirtyStyleId++, this;
	}
	setSize(_, C, T) {
		return T ||= this.resolution, this.setRealSize(_ * T, C * T, T);
	}
	setRealSize(_, C, T) {
		return this.resolution = T || this.resolution, this.width = Math.round(_) / this.resolution, this.height = Math.round(C) / this.resolution, this._refreshPOT(), this.update(), this;
	}
	_refreshPOT() {
		this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
	}
	setResolution(_) {
		let C = this.resolution;
		return C === _ ? this : (this.resolution = _, this.valid && (this.width = Math.round(this.width * C) / _, this.height = Math.round(this.height * C) / _, this.emit("update", this)), this._refreshPOT(), this);
	}
	setResource(_) {
		if (this.resource === _) return this;
		if (this.resource) throw Error("Resource can be set only once");
		return _.bind(this), this.resource = _, this;
	}
	update() {
		this.valid ? (this.dirtyId++, this.dirtyStyleId++, this.emit("update", this)) : this.width > 0 && this.height > 0 && (this.valid = !0, this.emit("loaded", this), this.emit("update", this));
	}
	onError(_) {
		this.emit("error", this, _);
	}
	destroy() {
		this.resource &&= (this.resource.unbind(this), this.resource.internal && this.resource.destroy(), null), this.cacheId &&= (delete BaseTextureCache[this.cacheId], delete TextureCache[this.cacheId], null), this.valid = !1, this.dispose(), _.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
	}
	dispose() {
		this.emit("dispose", this);
	}
	castToBaseTexture() {
		return this;
	}
	static from(C, T, E = settings.STRICT_TEXTURE_CACHE) {
		let D = typeof C == "string", O = null;
		D ? O = C : (C._pixiId ||= `${T?.pixiIdPrefix || "pixiid"}_${uid()}`, O = C._pixiId);
		let A = BaseTextureCache[O];
		if (D && E && !A) throw Error(`The cacheId "${O}" does not exist in BaseTextureCache.`);
		return A || (A = new _(C, T), A.cacheId = O, _.addToCache(A, O)), A;
	}
	static fromBuffer(C, T, E, D) {
		C ||= new Float32Array(T * E * 4);
		let O = new BufferResource(C, {
			width: T,
			height: E,
			...D?.resourceOptions
		}), A, F;
		return C instanceof Float32Array ? (A = FORMATS.RGBA, F = TYPES.FLOAT) : C instanceof Int32Array ? (A = FORMATS.RGBA_INTEGER, F = TYPES.INT) : C instanceof Uint32Array ? (A = FORMATS.RGBA_INTEGER, F = TYPES.UNSIGNED_INT) : C instanceof Int16Array ? (A = FORMATS.RGBA_INTEGER, F = TYPES.SHORT) : C instanceof Uint16Array ? (A = FORMATS.RGBA_INTEGER, F = TYPES.UNSIGNED_SHORT) : C instanceof Int8Array ? (A = FORMATS.RGBA, F = TYPES.BYTE) : (A = FORMATS.RGBA, F = TYPES.UNSIGNED_BYTE), O.internal = !0, new _(O, Object.assign({}, defaultBufferOptions, {
			type: F,
			format: A
		}, D));
	}
	static addToCache(_, C) {
		C && (_.textureCacheIds.includes(C) || _.textureCacheIds.push(C), BaseTextureCache[C] && BaseTextureCache[C] !== _ && console.warn(`BaseTexture added to the cache with an id [${C}] that already had an entry`), BaseTextureCache[C] = _);
	}
	static removeFromCache(_) {
		if (typeof _ == "string") {
			let C = BaseTextureCache[_];
			if (C) {
				let T = C.textureCacheIds.indexOf(_);
				return T > -1 && C.textureCacheIds.splice(T, 1), delete BaseTextureCache[_], C;
			}
		} else if (_?.textureCacheIds) {
			for (let C = 0; C < _.textureCacheIds.length; ++C) delete BaseTextureCache[_.textureCacheIds[C]];
			return _.textureCacheIds.length = 0, _;
		}
		return null;
	}
};
_BaseTexture.defaultOptions = {
	mipmap: MIPMAP_MODES.POW2,
	anisotropicLevel: 0,
	scaleMode: SCALE_MODES.LINEAR,
	wrapMode: WRAP_MODES.CLAMP,
	alphaMode: ALPHA_MODES.UNPACK,
	target: TARGETS.TEXTURE_2D,
	format: FORMATS.RGBA,
	type: TYPES.UNSIGNED_BYTE
}, _BaseTexture._globalBatch = 0;
var BaseTexture = _BaseTexture, BatchDrawCall = class {
	constructor() {
		this.texArray = null, this.blend = 0, this.type = DRAW_MODES.TRIANGLES, this.start = 0, this.size = 0, this.data = null;
	}
}, UID$4 = 0, Buffer = class _ {
	constructor(_, C = !0, T = !1) {
		this.data = _ || new Float32Array(1), this._glBuffers = {}, this._updateID = 0, this.index = T, this.static = C, this.id = UID$4++, this.disposeRunner = new Runner("disposeBuffer");
	}
	update(_) {
		_ instanceof Array && (_ = new Float32Array(_)), this.data = _ || this.data, this._updateID++;
	}
	dispose() {
		this.disposeRunner.emit(this, !1);
	}
	destroy() {
		this.dispose(), this.data = null;
	}
	set index(_) {
		this.type = _ ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
	}
	get index() {
		return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
	}
	static from(C) {
		return C instanceof Array && (C = new Float32Array(C)), new _(C);
	}
}, Attribute = class _ {
	constructor(_, C = 0, T = !1, E = TYPES.FLOAT, D, O, A, P = 1) {
		this.buffer = _, this.size = C, this.normalized = T, this.type = E, this.stride = D, this.start = O, this.instance = A, this.divisor = P;
	}
	destroy() {
		this.buffer = null;
	}
	static from(C, T, E, D, O) {
		return new _(C, T, E, D, O);
	}
}, map$1 = {
	Float32Array,
	Uint32Array,
	Int32Array,
	Uint8Array
};
function interleaveTypedArrays(_, C) {
	let T = 0, E = 0, D = {};
	for (let D = 0; D < _.length; D++) E += C[D], T += _[D].length;
	let O = /* @__PURE__ */ new ArrayBuffer(T * 4), A = null, P = 0;
	for (let T = 0; T < _.length; T++) {
		let F = C[T], I = _[T], L = getBufferType(I);
		D[L] || (D[L] = new map$1[L](O)), A = D[L];
		for (let _ = 0; _ < I.length; _++) {
			let C = (_ / F | 0) * E + P, T = _ % F;
			A[C + T] = I[_];
		}
		P += F;
	}
	return new Float32Array(O);
}
var byteSizeMap$1 = {
	5126: 4,
	5123: 2,
	5121: 1
}, UID$3 = 0, map = {
	Float32Array,
	Uint32Array,
	Int32Array,
	Uint8Array,
	Uint16Array
}, Geometry = class _ {
	constructor(_ = [], C = {}) {
		this.buffers = _, this.indexBuffer = null, this.attributes = C, this.glVertexArrayObjects = {}, this.id = UID$3++, this.instanced = !1, this.instanceCount = 1, this.disposeRunner = new Runner("disposeGeometry"), this.refCount = 0;
	}
	addAttribute(_, C, T = 0, E = !1, D, O, A, P = !1) {
		if (!C) throw Error("You must pass a buffer when creating an attribute");
		C instanceof Buffer || (C instanceof Array && (C = new Float32Array(C)), C = new Buffer(C));
		let F = _.split("|");
		if (F.length > 1) {
			for (let _ = 0; _ < F.length; _++) this.addAttribute(F[_], C, T, E, D);
			return this;
		}
		let I = this.buffers.indexOf(C);
		return I === -1 && (this.buffers.push(C), I = this.buffers.length - 1), this.attributes[_] = new Attribute(I, T, E, D, O, A, P), this.instanced = this.instanced || P, this;
	}
	getAttribute(_) {
		return this.attributes[_];
	}
	getBuffer(_) {
		return this.buffers[this.getAttribute(_).buffer];
	}
	addIndex(_) {
		return _ instanceof Buffer || (_ instanceof Array && (_ = new Uint16Array(_)), _ = new Buffer(_)), _.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER, this.indexBuffer = _, this.buffers.includes(_) || this.buffers.push(_), this;
	}
	getIndex() {
		return this.indexBuffer;
	}
	interleave() {
		if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer) return this;
		let _ = [], C = [], T = new Buffer(), E;
		for (E in this.attributes) {
			let T = this.attributes[E], D = this.buffers[T.buffer];
			_.push(D.data), C.push(T.size * byteSizeMap$1[T.type] / 4), T.buffer = 0;
		}
		for (T.data = interleaveTypedArrays(_, C), E = 0; E < this.buffers.length; E++) this.buffers[E] !== this.indexBuffer && this.buffers[E].destroy();
		return this.buffers = [T], this.indexBuffer && this.buffers.push(this.indexBuffer), this;
	}
	getSize() {
		for (let _ in this.attributes) {
			let C = this.attributes[_];
			return this.buffers[C.buffer].data.length / (C.stride / 4 || C.size);
		}
		return 0;
	}
	dispose() {
		this.disposeRunner.emit(this, !1);
	}
	destroy() {
		this.dispose(), this.buffers = null, this.indexBuffer = null, this.attributes = null;
	}
	clone() {
		let C = new _();
		for (let _ = 0; _ < this.buffers.length; _++) C.buffers[_] = new Buffer(this.buffers[_].data.slice(0));
		for (let _ in this.attributes) {
			let T = this.attributes[_];
			C.attributes[_] = new Attribute(T.buffer, T.size, T.normalized, T.type, T.stride, T.start, T.instance);
		}
		return this.indexBuffer && (C.indexBuffer = C.buffers[this.buffers.indexOf(this.indexBuffer)], C.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER), C;
	}
	static merge(C) {
		let T = new _(), E = [], D = [], O = [], A;
		for (let _ = 0; _ < C.length; _++) {
			A = C[_];
			for (let _ = 0; _ < A.buffers.length; _++) D[_] = D[_] || 0, D[_] += A.buffers[_].data.length, O[_] = 0;
		}
		for (let _ = 0; _ < A.buffers.length; _++) E[_] = new map[getBufferType(A.buffers[_].data)](D[_]), T.buffers[_] = new Buffer(E[_]);
		for (let _ = 0; _ < C.length; _++) {
			A = C[_];
			for (let _ = 0; _ < A.buffers.length; _++) E[_].set(A.buffers[_].data, O[_]), O[_] += A.buffers[_].data.length;
		}
		if (T.attributes = A.attributes, A.indexBuffer) {
			T.indexBuffer = T.buffers[A.buffers.indexOf(A.indexBuffer)], T.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
			let _ = 0, E = 0, D = 0, O = 0;
			for (let _ = 0; _ < A.buffers.length; _++) if (A.buffers[_] !== A.indexBuffer) {
				O = _;
				break;
			}
			for (let _ in A.attributes) {
				let C = A.attributes[_];
				(C.buffer | 0) === O && (E += C.size * byteSizeMap$1[C.type] / 4);
			}
			for (let A = 0; A < C.length; A++) {
				let P = C[A].indexBuffer.data;
				for (let C = 0; C < P.length; C++) T.indexBuffer.data[C + D] += _;
				_ += C[A].buffers[O].data.length / E, D += P.length;
			}
		}
		return T;
	}
}, BatchGeometry = class extends Geometry {
	constructor(_ = !1) {
		super(), this._buffer = new Buffer(null, _, !1), this._indexBuffer = new Buffer(null, _, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, TYPES.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, TYPES.FLOAT).addAttribute("aColor", this._buffer, 4, !0, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, TYPES.FLOAT).addIndex(this._indexBuffer);
	}
}, PI_2 = Math.PI * 2;
180 / Math.PI, Math.PI / 180;
var SHAPES = /* @__PURE__ */ ((_) => (_[_.POLY = 0] = "POLY", _[_.RECT = 1] = "RECT", _[_.CIRC = 2] = "CIRC", _[_.ELIP = 3] = "ELIP", _[_.RREC = 4] = "RREC", _))(SHAPES || {}), Point = class _ {
	constructor(_ = 0, C = 0) {
		this.x = 0, this.y = 0, this.x = _, this.y = C;
	}
	clone() {
		return new _(this.x, this.y);
	}
	copyFrom(_) {
		return this.set(_.x, _.y), this;
	}
	copyTo(_) {
		return _.set(this.x, this.y), _;
	}
	equals(_) {
		return _.x === this.x && _.y === this.y;
	}
	set(_ = 0, C = _) {
		return this.x = _, this.y = C, this;
	}
};
Point.prototype.toString = function() {
	return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
};
var tempPoints$1 = [
	new Point(),
	new Point(),
	new Point(),
	new Point()
], Rectangle = class _ {
	constructor(_ = 0, C = 0, T = 0, E = 0) {
		this.x = Number(_), this.y = Number(C), this.width = Number(T), this.height = Number(E), this.type = SHAPES.RECT;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.width;
	}
	get top() {
		return this.y;
	}
	get bottom() {
		return this.y + this.height;
	}
	static get EMPTY() {
		return new _(0, 0, 0, 0);
	}
	clone() {
		return new _(this.x, this.y, this.width, this.height);
	}
	copyFrom(_) {
		return this.x = _.x, this.y = _.y, this.width = _.width, this.height = _.height, this;
	}
	copyTo(_) {
		return _.x = this.x, _.y = this.y, _.width = this.width, _.height = this.height, _;
	}
	contains(_, C) {
		return this.width <= 0 || this.height <= 0 ? !1 : _ >= this.x && _ < this.x + this.width && C >= this.y && C < this.y + this.height;
	}
	intersects(_, C) {
		if (!C) {
			let C = this.x < _.x ? _.x : this.x;
			if ((this.right > _.right ? _.right : this.right) <= C) return !1;
			let T = this.y < _.y ? _.y : this.y;
			return (this.bottom > _.bottom ? _.bottom : this.bottom) > T;
		}
		let T = this.left, E = this.right, D = this.top, O = this.bottom;
		if (E <= T || O <= D) return !1;
		let A = tempPoints$1[0].set(_.left, _.top), P = tempPoints$1[1].set(_.left, _.bottom), F = tempPoints$1[2].set(_.right, _.top), I = tempPoints$1[3].set(_.right, _.bottom);
		if (F.x <= A.x || P.y <= A.y) return !1;
		let L = Math.sign(C.a * C.d - C.b * C.c);
		if (L === 0 || (C.apply(A, A), C.apply(P, P), C.apply(F, F), C.apply(I, I), Math.max(A.x, P.x, F.x, I.x) <= T || Math.min(A.x, P.x, F.x, I.x) >= E || Math.max(A.y, P.y, F.y, I.y) <= D || Math.min(A.y, P.y, F.y, I.y) >= O)) return !1;
		let R = L * (P.y - A.y), z = L * (A.x - P.x), B = R * T + z * D, V = R * E + z * D, U = R * T + z * O, W = R * E + z * O;
		if (Math.max(B, V, U, W) <= R * A.x + z * A.y || Math.min(B, V, U, W) >= R * I.x + z * I.y) return !1;
		let fo = L * (A.y - F.y), G = L * (F.x - A.x), K = fo * T + G * D, q = fo * E + G * D, J = fo * T + G * O, Y = fo * E + G * O;
		return !(Math.max(K, q, J, Y) <= fo * A.x + G * A.y || Math.min(K, q, J, Y) >= fo * I.x + G * I.y);
	}
	pad(_ = 0, C = _) {
		return this.x -= _, this.y -= C, this.width += _ * 2, this.height += C * 2, this;
	}
	fit(_) {
		let C = Math.max(this.x, _.x), T = Math.min(this.x + this.width, _.x + _.width), E = Math.max(this.y, _.y), D = Math.min(this.y + this.height, _.y + _.height);
		return this.x = C, this.width = Math.max(T - C, 0), this.y = E, this.height = Math.max(D - E, 0), this;
	}
	ceil(_ = 1, C = .001) {
		let T = Math.ceil((this.x + this.width - C) * _) / _, E = Math.ceil((this.y + this.height - C) * _) / _;
		return this.x = Math.floor((this.x + C) * _) / _, this.y = Math.floor((this.y + C) * _) / _, this.width = T - this.x, this.height = E - this.y, this;
	}
	enlarge(_) {
		let C = Math.min(this.x, _.x), T = Math.max(this.x + this.width, _.x + _.width), E = Math.min(this.y, _.y), D = Math.max(this.y + this.height, _.y + _.height);
		return this.x = C, this.width = T - C, this.y = E, this.height = D - E, this;
	}
};
Rectangle.prototype.toString = function() {
	return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
var Circle = class _ {
	constructor(_ = 0, C = 0, T = 0) {
		this.x = _, this.y = C, this.radius = T, this.type = SHAPES.CIRC;
	}
	clone() {
		return new _(this.x, this.y, this.radius);
	}
	contains(_, C) {
		if (this.radius <= 0) return !1;
		let T = this.radius * this.radius, E = this.x - _, D = this.y - C;
		return E *= E, D *= D, E + D <= T;
	}
	getBounds() {
		return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	}
};
Circle.prototype.toString = function() {
	return `[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
};
var Ellipse = class _ {
	constructor(_ = 0, C = 0, T = 0, E = 0) {
		this.x = _, this.y = C, this.width = T, this.height = E, this.type = SHAPES.ELIP;
	}
	clone() {
		return new _(this.x, this.y, this.width, this.height);
	}
	contains(_, C) {
		if (this.width <= 0 || this.height <= 0) return !1;
		let T = (_ - this.x) / this.width, E = (C - this.y) / this.height;
		return T *= T, E *= E, T + E <= 1;
	}
	getBounds() {
		return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
	}
};
Ellipse.prototype.toString = function() {
	return `[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
};
var Polygon = class _ {
	constructor(..._) {
		let C = Array.isArray(_[0]) ? _[0] : _;
		if (typeof C[0] != "number") {
			let _ = [];
			for (let T = 0, E = C.length; T < E; T++) _.push(C[T].x, C[T].y);
			C = _;
		}
		this.points = C, this.type = SHAPES.POLY, this.closeStroke = !0;
	}
	clone() {
		let C = new _(this.points.slice());
		return C.closeStroke = this.closeStroke, C;
	}
	contains(_, C) {
		let T = !1, E = this.points.length / 2;
		for (let D = 0, O = E - 1; D < E; O = D++) {
			let E = this.points[D * 2], A = this.points[D * 2 + 1], P = this.points[O * 2], F = this.points[O * 2 + 1];
			A > C != F > C && _ < (P - E) * ((C - A) / (F - A)) + E && (T = !T);
		}
		return T;
	}
};
Polygon.prototype.toString = function() {
	return `[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((_, C) => `${_}, ${C}`, "")}]`;
};
var RoundedRectangle = class _ {
	constructor(_ = 0, C = 0, T = 0, E = 0, D = 20) {
		this.x = _, this.y = C, this.width = T, this.height = E, this.radius = D, this.type = SHAPES.RREC;
	}
	clone() {
		return new _(this.x, this.y, this.width, this.height, this.radius);
	}
	contains(_, C) {
		if (this.width <= 0 || this.height <= 0) return !1;
		if (_ >= this.x && _ <= this.x + this.width && C >= this.y && C <= this.y + this.height) {
			let T = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
			if (C >= this.y + T && C <= this.y + this.height - T || _ >= this.x + T && _ <= this.x + this.width - T) return !0;
			let E = _ - (this.x + T), D = C - (this.y + T), O = T * T;
			if (E * E + D * D <= O || (E = _ - (this.x + this.width - T), E * E + D * D <= O) || (D = C - (this.y + this.height - T), E * E + D * D <= O) || (E = _ - (this.x + T), E * E + D * D <= O)) return !0;
		}
		return !1;
	}
};
RoundedRectangle.prototype.toString = function() {
	return `[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
};
var Matrix = class _ {
	constructor(_ = 1, C = 0, T = 0, E = 1, D = 0, O = 0) {
		this.array = null, this.a = _, this.b = C, this.c = T, this.d = E, this.tx = D, this.ty = O;
	}
	fromArray(_) {
		this.a = _[0], this.b = _[1], this.c = _[3], this.d = _[4], this.tx = _[2], this.ty = _[5];
	}
	set(_, C, T, E, D, O) {
		return this.a = _, this.b = C, this.c = T, this.d = E, this.tx = D, this.ty = O, this;
	}
	toArray(_, C) {
		this.array ||= new Float32Array(9);
		let T = C || this.array;
		return _ ? (T[0] = this.a, T[1] = this.b, T[2] = 0, T[3] = this.c, T[4] = this.d, T[5] = 0, T[6] = this.tx, T[7] = this.ty, T[8] = 1) : (T[0] = this.a, T[1] = this.c, T[2] = this.tx, T[3] = this.b, T[4] = this.d, T[5] = this.ty, T[6] = 0, T[7] = 0, T[8] = 1), T;
	}
	apply(_, C) {
		C ||= new Point();
		let T = _.x, E = _.y;
		return C.x = this.a * T + this.c * E + this.tx, C.y = this.b * T + this.d * E + this.ty, C;
	}
	applyInverse(_, C) {
		C ||= new Point();
		let T = 1 / (this.a * this.d + this.c * -this.b), E = _.x, D = _.y;
		return C.x = this.d * T * E + -this.c * T * D + (this.ty * this.c - this.tx * this.d) * T, C.y = this.a * T * D + -this.b * T * E + (-this.ty * this.a + this.tx * this.b) * T, C;
	}
	translate(_, C) {
		return this.tx += _, this.ty += C, this;
	}
	scale(_, C) {
		return this.a *= _, this.d *= C, this.c *= _, this.b *= C, this.tx *= _, this.ty *= C, this;
	}
	rotate(_) {
		let C = Math.cos(_), T = Math.sin(_), E = this.a, D = this.c, O = this.tx;
		return this.a = E * C - this.b * T, this.b = E * T + this.b * C, this.c = D * C - this.d * T, this.d = D * T + this.d * C, this.tx = O * C - this.ty * T, this.ty = O * T + this.ty * C, this;
	}
	append(_) {
		let C = this.a, T = this.b, E = this.c, D = this.d;
		return this.a = _.a * C + _.b * E, this.b = _.a * T + _.b * D, this.c = _.c * C + _.d * E, this.d = _.c * T + _.d * D, this.tx = _.tx * C + _.ty * E + this.tx, this.ty = _.tx * T + _.ty * D + this.ty, this;
	}
	setTransform(_, C, T, E, D, O, A, P, F) {
		return this.a = Math.cos(A + F) * D, this.b = Math.sin(A + F) * D, this.c = -Math.sin(A - P) * O, this.d = Math.cos(A - P) * O, this.tx = _ - (T * this.a + E * this.c), this.ty = C - (T * this.b + E * this.d), this;
	}
	prepend(_) {
		let C = this.tx;
		if (_.a !== 1 || _.b !== 0 || _.c !== 0 || _.d !== 1) {
			let C = this.a, T = this.c;
			this.a = C * _.a + this.b * _.c, this.b = C * _.b + this.b * _.d, this.c = T * _.a + this.d * _.c, this.d = T * _.b + this.d * _.d;
		}
		return this.tx = C * _.a + this.ty * _.c + _.tx, this.ty = C * _.b + this.ty * _.d + _.ty, this;
	}
	decompose(_) {
		let C = this.a, T = this.b, E = this.c, D = this.d, O = _.pivot, A = -Math.atan2(-E, D), P = Math.atan2(T, C), F = Math.abs(A + P);
		return F < 1e-5 || Math.abs(PI_2 - F) < 1e-5 ? (_.rotation = P, _.skew.x = _.skew.y = 0) : (_.rotation = 0, _.skew.x = A, _.skew.y = P), _.scale.x = Math.sqrt(C * C + T * T), _.scale.y = Math.sqrt(E * E + D * D), _.position.x = this.tx + (O.x * C + O.y * E), _.position.y = this.ty + (O.x * T + O.y * D), _;
	}
	invert() {
		let _ = this.a, C = this.b, T = this.c, E = this.d, D = this.tx, O = _ * E - C * T;
		return this.a = E / O, this.b = -C / O, this.c = -T / O, this.d = _ / O, this.tx = (T * this.ty - E * D) / O, this.ty = -(_ * this.ty - C * D) / O, this;
	}
	identity() {
		return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
	}
	clone() {
		let C = new _();
		return C.a = this.a, C.b = this.b, C.c = this.c, C.d = this.d, C.tx = this.tx, C.ty = this.ty, C;
	}
	copyTo(_) {
		return _.a = this.a, _.b = this.b, _.c = this.c, _.d = this.d, _.tx = this.tx, _.ty = this.ty, _;
	}
	copyFrom(_) {
		return this.a = _.a, this.b = _.b, this.c = _.c, this.d = _.d, this.tx = _.tx, this.ty = _.ty, this;
	}
	static get IDENTITY() {
		return new _();
	}
	static get TEMP_MATRIX() {
		return new _();
	}
};
Matrix.prototype.toString = function() {
	return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
};
var ux = [
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1
], uy = [
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1
], vx = [
	0,
	-1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	1,
	1,
	1,
	0,
	-1,
	-1,
	-1
], vy = [
	1,
	1,
	0,
	-1,
	-1,
	-1,
	0,
	1,
	-1,
	-1,
	0,
	1,
	1,
	1,
	0,
	-1
], rotationCayley = [], rotationMatrices = [], signum = Math.sign;
function init() {
	for (let _ = 0; _ < 16; _++) {
		let C = [];
		rotationCayley.push(C);
		for (let T = 0; T < 16; T++) {
			let E = signum(ux[_] * ux[T] + vx[_] * uy[T]), D = signum(uy[_] * ux[T] + vy[_] * uy[T]), O = signum(ux[_] * vx[T] + vx[_] * vy[T]), A = signum(uy[_] * vx[T] + vy[_] * vy[T]);
			for (let _ = 0; _ < 16; _++) if (ux[_] === E && uy[_] === D && vx[_] === O && vy[_] === A) {
				C.push(_);
				break;
			}
		}
	}
	for (let _ = 0; _ < 16; _++) {
		let C = new Matrix();
		C.set(ux[_], uy[_], vx[_], vy[_], 0, 0), rotationMatrices.push(C);
	}
}
init();
var groupD8 = {
	E: 0,
	SE: 1,
	S: 2,
	SW: 3,
	W: 4,
	NW: 5,
	N: 6,
	NE: 7,
	MIRROR_VERTICAL: 8,
	MAIN_DIAGONAL: 10,
	MIRROR_HORIZONTAL: 12,
	REVERSE_DIAGONAL: 14,
	uX: (_) => ux[_],
	uY: (_) => uy[_],
	vX: (_) => vx[_],
	vY: (_) => vy[_],
	inv: (_) => _ & 8 ? _ & 15 : -_ & 7,
	add: (_, C) => rotationCayley[_][C],
	sub: (_, C) => rotationCayley[_][groupD8.inv(C)],
	rotate180: (_) => _ ^ 4,
	isVertical: (_) => (_ & 3) == 2,
	byDirection: (_, C) => Math.abs(_) * 2 <= Math.abs(C) ? C >= 0 ? groupD8.S : groupD8.N : Math.abs(C) * 2 <= Math.abs(_) ? _ > 0 ? groupD8.E : groupD8.W : C > 0 ? _ > 0 ? groupD8.SE : groupD8.SW : _ > 0 ? groupD8.NE : groupD8.NW,
	matrixAppendRotationInv: (_, C, T = 0, E = 0) => {
		let D = rotationMatrices[groupD8.inv(C)];
		D.tx = T, D.ty = E, _.append(D);
	}
}, ObservablePoint = class _ {
	constructor(_, C, T = 0, E = 0) {
		this._x = T, this._y = E, this.cb = _, this.scope = C;
	}
	clone(C = this.cb, T = this.scope) {
		return new _(C, T, this._x, this._y);
	}
	set(_ = 0, C = _) {
		return (this._x !== _ || this._y !== C) && (this._x = _, this._y = C, this.cb.call(this.scope)), this;
	}
	copyFrom(_) {
		return (this._x !== _.x || this._y !== _.y) && (this._x = _.x, this._y = _.y, this.cb.call(this.scope)), this;
	}
	copyTo(_) {
		return _.set(this._x, this._y), _;
	}
	equals(_) {
		return _.x === this._x && _.y === this._y;
	}
	get x() {
		return this._x;
	}
	set x(_) {
		this._x !== _ && (this._x = _, this.cb.call(this.scope));
	}
	get y() {
		return this._y;
	}
	set y(_) {
		this._y !== _ && (this._y = _, this.cb.call(this.scope));
	}
};
ObservablePoint.prototype.toString = function() {
	return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`;
};
var _Transform = class {
	constructor() {
		this.worldTransform = new Matrix(), this.localTransform = new Matrix(), this.position = new ObservablePoint(this.onChange, this, 0, 0), this.scale = new ObservablePoint(this.onChange, this, 1, 1), this.pivot = new ObservablePoint(this.onChange, this, 0, 0), this.skew = new ObservablePoint(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
	}
	onChange() {
		this._localID++;
	}
	updateSkew() {
		this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
	}
	updateLocalTransform() {
		let _ = this.localTransform;
		this._localID !== this._currentLocalID && (_.a = this._cx * this.scale.x, _.b = this._sx * this.scale.x, _.c = this._cy * this.scale.y, _.d = this._sy * this.scale.y, _.tx = this.position.x - (this.pivot.x * _.a + this.pivot.y * _.c), _.ty = this.position.y - (this.pivot.x * _.b + this.pivot.y * _.d), this._currentLocalID = this._localID, this._parentID = -1);
	}
	updateTransform(_) {
		let C = this.localTransform;
		if (this._localID !== this._currentLocalID && (C.a = this._cx * this.scale.x, C.b = this._sx * this.scale.x, C.c = this._cy * this.scale.y, C.d = this._sy * this.scale.y, C.tx = this.position.x - (this.pivot.x * C.a + this.pivot.y * C.c), C.ty = this.position.y - (this.pivot.x * C.b + this.pivot.y * C.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== _._worldID) {
			let T = _.worldTransform, E = this.worldTransform;
			E.a = C.a * T.a + C.b * T.c, E.b = C.a * T.b + C.b * T.d, E.c = C.c * T.a + C.d * T.c, E.d = C.c * T.b + C.d * T.d, E.tx = C.tx * T.a + C.ty * T.c + T.tx, E.ty = C.tx * T.b + C.ty * T.d + T.ty, this._parentID = _._worldID, this._worldID++;
		}
	}
	setFromMatrix(_) {
		_.decompose(this), this._localID++;
	}
	get rotation() {
		return this._rotation;
	}
	set rotation(_) {
		this._rotation !== _ && (this._rotation = _, this.updateSkew());
	}
};
_Transform.IDENTITY = new _Transform();
var Transform = _Transform;
Transform.prototype.toString = function() {
	return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};
var defaultFragment$2 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}", defaultVertex$2 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";
function compileShader(_, C, T) {
	let E = _.createShader(C);
	return _.shaderSource(E, T), _.compileShader(E), E;
}
function booleanArray(_) {
	let C = Array(_);
	for (let _ = 0; _ < C.length; _++) C[_] = !1;
	return C;
}
function defaultValue(_, C) {
	switch (_) {
		case "float": return 0;
		case "vec2": return new Float32Array(2 * C);
		case "vec3": return new Float32Array(3 * C);
		case "vec4": return new Float32Array(4 * C);
		case "int":
		case "uint":
		case "sampler2D":
		case "sampler2DArray": return 0;
		case "ivec2": return new Int32Array(2 * C);
		case "ivec3": return new Int32Array(3 * C);
		case "ivec4": return new Int32Array(4 * C);
		case "uvec2": return new Uint32Array(2 * C);
		case "uvec3": return new Uint32Array(3 * C);
		case "uvec4": return new Uint32Array(4 * C);
		case "bool": return !1;
		case "bvec2": return booleanArray(2 * C);
		case "bvec3": return booleanArray(3 * C);
		case "bvec4": return booleanArray(4 * C);
		case "mat2": return new Float32Array([
			1,
			0,
			0,
			1
		]);
		case "mat3": return new Float32Array([
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		]);
		case "mat4": return new Float32Array([
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		]);
	}
	return null;
}
var uniformParsers = [
	{
		test: (_) => _.type === "float" && _.size === 1 && !_.isArray,
		code: (_) => `
            if(uv["${_}"] !== ud["${_}"].value)
            {
                ud["${_}"].value = uv["${_}"]
                gl.uniform1f(ud["${_}"].location, uv["${_}"])
            }
            `
	},
	{
		test: (_, C) => (_.type === "sampler2D" || _.type === "samplerCube" || _.type === "sampler2DArray") && _.size === 1 && !_.isArray && (C == null || C.castToBaseTexture !== void 0),
		code: (_) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${_}"], t);

            if(ud["${_}"].value !== t)
            {
                ud["${_}"].value = t;
                gl.uniform1i(ud["${_}"].location, t);
; // eslint-disable-line max-len
            }`
	},
	{
		test: (_, C) => _.type === "mat3" && _.size === 1 && !_.isArray && C.a !== void 0,
		code: (_) => `
            gl.uniformMatrix3fv(ud["${_}"].location, false, uv["${_}"].toArray(true));
            `,
		codeUbo: (_) => `
                var ${_}_matrix = uv.${_}.toArray(true);

                data[offset] = ${_}_matrix[0];
                data[offset+1] = ${_}_matrix[1];
                data[offset+2] = ${_}_matrix[2];
        
                data[offset + 4] = ${_}_matrix[3];
                data[offset + 5] = ${_}_matrix[4];
                data[offset + 6] = ${_}_matrix[5];
        
                data[offset + 8] = ${_}_matrix[6];
                data[offset + 9] = ${_}_matrix[7];
                data[offset + 10] = ${_}_matrix[8];
            `
	},
	{
		test: (_, C) => _.type === "vec2" && _.size === 1 && !_.isArray && C.x !== void 0,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${_}"].location, v.x, v.y);
                }`,
		codeUbo: (_) => `
                v = uv.${_};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
	},
	{
		test: (_) => _.type === "vec2" && _.size === 1 && !_.isArray,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${_}"].location, v[0], v[1]);
                }
            `
	},
	{
		test: (_, C) => _.type === "vec4" && _.size === 1 && !_.isArray && C.width !== void 0,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${_}"].location, v.x, v.y, v.width, v.height)
                }`,
		codeUbo: (_) => `
                    v = uv.${_};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
	},
	{
		test: (_, C) => _.type === "vec4" && _.size === 1 && !_.isArray && C.red !== void 0,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${_}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
		codeUbo: (_) => `
                    v = uv.${_};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
	},
	{
		test: (_, C) => _.type === "vec3" && _.size === 1 && !_.isArray && C.red !== void 0,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${_}"].location, v.red, v.green, v.blue)
                }`,
		codeUbo: (_) => `
                    v = uv.${_};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
	},
	{
		test: (_) => _.type === "vec4" && _.size === 1 && !_.isArray,
		code: (_) => `
                cv = ud["${_}"].value;
                v = uv["${_}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${_}"].location, v[0], v[1], v[2], v[3])
                }`
	}
], GLSL_TO_SINGLE_SETTERS_CACHED = {
	float: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1f(location, v);\n    }",
	vec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2f(location, v[0], v[1])\n    }",
	vec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
	vec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4f(location, v[0], v[1], v[2], v[3]);\n    }",
	int: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	ivec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
	ivec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
	ivec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
	uint: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1ui(location, v);\n    }",
	uvec2: "\n    if (cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2ui(location, v[0], v[1]);\n    }",
	uvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3ui(location, v[0], v[1], v[2]);\n    }",
	uvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);\n    }",
	bool: "\n    if (cv !== v)\n    {\n        cu.value = v;\n        gl.uniform1i(location, v);\n    }",
	bvec2: "\n    if (cv[0] != v[0] || cv[1] != v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n\n        gl.uniform2i(location, v[0], v[1]);\n    }",
	bvec3: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3i(location, v[0], v[1], v[2]);\n    }",
	bvec4: "\n    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n        cv[3] = v[3];\n\n        gl.uniform4i(location, v[0], v[1], v[2], v[3]);\n    }",
	mat2: "gl.uniformMatrix2fv(location, false, v)",
	mat3: "gl.uniformMatrix3fv(location, false, v)",
	mat4: "gl.uniformMatrix4fv(location, false, v)",
	sampler2D: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	samplerCube: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }",
	sampler2DArray: "\n    if (cv !== v)\n    {\n        cu.value = v;\n\n        gl.uniform1i(location, v);\n    }"
}, GLSL_TO_ARRAY_SETTERS = {
	float: "gl.uniform1fv(location, v)",
	vec2: "gl.uniform2fv(location, v)",
	vec3: "gl.uniform3fv(location, v)",
	vec4: "gl.uniform4fv(location, v)",
	mat4: "gl.uniformMatrix4fv(location, false, v)",
	mat3: "gl.uniformMatrix3fv(location, false, v)",
	mat2: "gl.uniformMatrix2fv(location, false, v)",
	int: "gl.uniform1iv(location, v)",
	ivec2: "gl.uniform2iv(location, v)",
	ivec3: "gl.uniform3iv(location, v)",
	ivec4: "gl.uniform4iv(location, v)",
	uint: "gl.uniform1uiv(location, v)",
	uvec2: "gl.uniform2uiv(location, v)",
	uvec3: "gl.uniform3uiv(location, v)",
	uvec4: "gl.uniform4uiv(location, v)",
	bool: "gl.uniform1iv(location, v)",
	bvec2: "gl.uniform2iv(location, v)",
	bvec3: "gl.uniform3iv(location, v)",
	bvec4: "gl.uniform4iv(location, v)",
	sampler2D: "gl.uniform1iv(location, v)",
	samplerCube: "gl.uniform1iv(location, v)",
	sampler2DArray: "gl.uniform1iv(location, v)"
};
function generateUniformsSync(_, C) {
	let T = ["\n        var v = null;\n        var cv = null;\n        var cu = null;\n        var t = 0;\n        var gl = renderer.gl;\n    "];
	for (let E in _.uniforms) {
		let D = C[E];
		if (!D) {
			_.uniforms[E]?.group === !0 && (_.uniforms[E].ubo ? T.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${E}, '${E}');
                    `) : T.push(`
                        renderer.shader.syncUniformGroup(uv.${E}, syncData);
                    `));
			continue;
		}
		let O = _.uniforms[E], A = !1;
		for (let _ = 0; _ < uniformParsers.length; _++) if (uniformParsers[_].test(D, O)) {
			T.push(uniformParsers[_].code(E, O)), A = !0;
			break;
		}
		if (!A) {
			let _ = (D.size === 1 && !D.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS)[D.type].replace("location", `ud["${E}"].location`);
			T.push(`
            cu = ud["${E}"];
            cv = cu.value;
            v = uv["${E}"];
            ${_};`);
		}
	}
	return Function("ud", "uv", "renderer", "syncData", T.join("\n"));
}
var unknownContext = {}, context = unknownContext;
function getTestContext() {
	if (context === unknownContext || context?.isContextLost()) {
		let _ = settings.ADAPTER.createCanvas(), C;
		settings.PREFER_ENV >= ENV.WEBGL2 && (C = _.getContext("webgl2", {})), C || (C = _.getContext("webgl", {}) || _.getContext("experimental-webgl", {}), C ? C.getExtension("WEBGL_draw_buffers") : C = null), context = C;
	}
	return context;
}
var maxFragmentPrecision;
function getMaxFragmentPrecision() {
	if (!maxFragmentPrecision) {
		maxFragmentPrecision = PRECISION.MEDIUM;
		let _ = getTestContext();
		if (_ && _.getShaderPrecisionFormat) {
			let C = _.getShaderPrecisionFormat(_.FRAGMENT_SHADER, _.HIGH_FLOAT);
			C && (maxFragmentPrecision = C.precision ? PRECISION.HIGH : PRECISION.MEDIUM);
		}
	}
	return maxFragmentPrecision;
}
function logPrettyShaderError(_, C) {
	let T = _.getShaderSource(C).split("\n").map((_, C) => `${C}: ${_}`), E = _.getShaderInfoLog(C), D = E.split("\n"), O = {}, A = D.map((_) => parseFloat(_.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((_) => _ && !O[_] ? (O[_] = !0, !0) : !1), P = [""];
	A.forEach((_) => {
		T[_ - 1] = `%c${T[_ - 1]}%c`, P.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
	}), P[0] = T.join("\n"), console.error(E), console.groupCollapsed("click to view full shader code"), console.warn(...P), console.groupEnd();
}
function logProgramError(_, C, T, E) {
	_.getProgramParameter(C, _.LINK_STATUS) || (_.getShaderParameter(T, _.COMPILE_STATUS) || logPrettyShaderError(_, T), _.getShaderParameter(E, _.COMPILE_STATUS) || logPrettyShaderError(_, E), console.error("PixiJS Error: Could not initialize shader."), _.getProgramInfoLog(C) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", _.getProgramInfoLog(C)));
}
var GLSL_TO_SIZE = {
	float: 1,
	vec2: 2,
	vec3: 3,
	vec4: 4,
	int: 1,
	ivec2: 2,
	ivec3: 3,
	ivec4: 4,
	uint: 1,
	uvec2: 2,
	uvec3: 3,
	uvec4: 4,
	bool: 1,
	bvec2: 2,
	bvec3: 3,
	bvec4: 4,
	mat2: 4,
	mat3: 9,
	mat4: 16,
	sampler2D: 1
};
function mapSize(_) {
	return GLSL_TO_SIZE[_];
}
var GL_TABLE = null, GL_TO_GLSL_TYPES = {
	FLOAT: "float",
	FLOAT_VEC2: "vec2",
	FLOAT_VEC3: "vec3",
	FLOAT_VEC4: "vec4",
	INT: "int",
	INT_VEC2: "ivec2",
	INT_VEC3: "ivec3",
	INT_VEC4: "ivec4",
	UNSIGNED_INT: "uint",
	UNSIGNED_INT_VEC2: "uvec2",
	UNSIGNED_INT_VEC3: "uvec3",
	UNSIGNED_INT_VEC4: "uvec4",
	BOOL: "bool",
	BOOL_VEC2: "bvec2",
	BOOL_VEC3: "bvec3",
	BOOL_VEC4: "bvec4",
	FLOAT_MAT2: "mat2",
	FLOAT_MAT3: "mat3",
	FLOAT_MAT4: "mat4",
	SAMPLER_2D: "sampler2D",
	INT_SAMPLER_2D: "sampler2D",
	UNSIGNED_INT_SAMPLER_2D: "sampler2D",
	SAMPLER_CUBE: "samplerCube",
	INT_SAMPLER_CUBE: "samplerCube",
	UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
	SAMPLER_2D_ARRAY: "sampler2DArray",
	INT_SAMPLER_2D_ARRAY: "sampler2DArray",
	UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
};
function mapType(_, C) {
	if (!GL_TABLE) {
		let C = Object.keys(GL_TO_GLSL_TYPES);
		GL_TABLE = {};
		for (let T = 0; T < C.length; ++T) {
			let E = C[T];
			GL_TABLE[_[E]] = GL_TO_GLSL_TYPES[E];
		}
	}
	return GL_TABLE[C];
}
function setPrecision(_, C, T) {
	if (_.substring(0, 9) !== "precision") {
		let E = C;
		return C === PRECISION.HIGH && T !== PRECISION.HIGH && (E = PRECISION.MEDIUM), `precision ${E} float;
${_}`;
	} else if (T !== PRECISION.HIGH && _.substring(0, 15) === "precision highp") return _.replace("precision highp", "precision mediump");
	return _;
}
var unsafeEval;
function unsafeEvalSupported() {
	if (typeof unsafeEval == "boolean") return unsafeEval;
	try {
		unsafeEval = Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
	} catch {
		unsafeEval = !1;
	}
	return unsafeEval;
}
var UID$2 = 0, nameCache = {}, _Program = class _ {
	constructor(C, T, E = "pixi-shader", D = {}) {
		this.extra = {}, this.id = UID$2++, this.vertexSrc = C || _.defaultVertexSrc, this.fragmentSrc = T || _.defaultFragmentSrc, this.vertexSrc = this.vertexSrc.trim(), this.fragmentSrc = this.fragmentSrc.trim(), this.extra = D, this.vertexSrc.substring(0, 8) !== "#version" && (E = E.replace(/\s+/g, "-"), nameCache[E] ? (nameCache[E]++, E += `-${nameCache[E]}`) : nameCache[E] = 1, this.vertexSrc = `#define SHADER_NAME ${E}
${this.vertexSrc}`, this.fragmentSrc = `#define SHADER_NAME ${E}
${this.fragmentSrc}`, this.vertexSrc = setPrecision(this.vertexSrc, _.defaultVertexPrecision, PRECISION.HIGH), this.fragmentSrc = setPrecision(this.fragmentSrc, _.defaultFragmentPrecision, getMaxFragmentPrecision())), this.glPrograms = {}, this.syncUniforms = null;
	}
	static get defaultVertexSrc() {
		return defaultVertex$2;
	}
	static get defaultFragmentSrc() {
		return defaultFragment$2;
	}
	static from(C, T, E) {
		let D = C + T, O = ProgramCache[D];
		return O || (ProgramCache[D] = O = new _(C, T, E)), O;
	}
};
_Program.defaultVertexPrecision = PRECISION.HIGH, _Program.defaultFragmentPrecision = isMobile.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM;
var Program = _Program, UID$1 = 0, UniformGroup = class _ {
	constructor(_, C, T) {
		this.group = !0, this.syncUniforms = {}, this.dirtyId = 0, this.id = UID$1++, this.static = !!C, this.ubo = !!T, _ instanceof Buffer ? (this.buffer = _, this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !1, this.ubo = !0) : (this.uniforms = _, this.ubo && (this.buffer = new Buffer(new Float32Array(1)), this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER, this.autoManage = !0));
	}
	update() {
		this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update();
	}
	add(C, T, E) {
		if (!this.ubo) this.uniforms[C] = new _(T, E);
		else throw Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
	}
	static from(C, T, E) {
		return new _(C, T, E);
	}
	static uboFrom(C, T) {
		return new _(C, T ?? !0, !0);
	}
}, Shader = class _ {
	constructor(_, C) {
		this.uniformBindCount = 0, this.program = _, C ? C instanceof UniformGroup ? this.uniformGroup = C : this.uniformGroup = new UniformGroup(C) : this.uniformGroup = new UniformGroup({}), this.disposeRunner = new Runner("disposeShader");
	}
	checkUniformExists(_, C) {
		if (C.uniforms[_]) return !0;
		for (let T in C.uniforms) {
			let E = C.uniforms[T];
			if (E.group === !0 && this.checkUniformExists(_, E)) return !0;
		}
		return !1;
	}
	destroy() {
		this.uniformGroup = null, this.disposeRunner.emit(this), this.disposeRunner.destroy();
	}
	get uniforms() {
		return this.uniformGroup.uniforms;
	}
	static from(C, T, E) {
		return new _(Program.from(C, T), E);
	}
}, BatchShaderGenerator = class {
	constructor(_, C) {
		if (this.vertexSrc = _, this.fragTemplate = C, this.programCache = {}, this.defaultGroupCache = {}, !C.includes("%count%")) throw Error("Fragment template must contain \"%count%\".");
		if (!C.includes("%forloop%")) throw Error("Fragment template must contain \"%forloop%\".");
	}
	generateShader(_) {
		if (!this.programCache[_]) {
			let C = new Int32Array(_);
			for (let T = 0; T < _; T++) C[T] = T;
			this.defaultGroupCache[_] = UniformGroup.from({ uSamplers: C }, !0);
			let T = this.fragTemplate;
			T = T.replace(/%count%/gi, `${_}`), T = T.replace(/%forloop%/gi, this.generateSampleSrc(_)), this.programCache[_] = new Program(this.vertexSrc, T);
		}
		let C = {
			tint: new Float32Array([
				1,
				1,
				1,
				1
			]),
			translationMatrix: new Matrix(),
			default: this.defaultGroupCache[_]
		};
		return new Shader(this.programCache[_], C);
	}
	generateSampleSrc(_) {
		let C = "";
		C += "\n", C += "\n";
		for (let T = 0; T < _; T++) T > 0 && (C += "\nelse "), T < _ - 1 && (C += `if(vTextureId < ${T}.5)`), C += "\n{", C += `
	color = texture2D(uSamplers[${T}], vTextureCoord);`, C += "\n}";
		return C += "\n", C += "\n", C;
	}
}, BatchTextureArray = class {
	constructor() {
		this.elements = [], this.ids = [], this.count = 0;
	}
	clear() {
		for (let _ = 0; _ < this.count; _++) this.elements[_] = null;
		this.count = 0;
	}
};
function canUploadSameBuffer() {
	return !isMobile.apple.device;
}
function maxRecommendedTextures(_) {
	let C = !0, T = settings.ADAPTER.getNavigator();
	if (isMobile.tablet || isMobile.phone) {
		if (isMobile.apple.device) {
			let _ = T.userAgent.match(/OS (\d+)_(\d+)?/);
			_ && parseInt(_[1], 10) < 11 && (C = !1);
		}
		if (isMobile.android.device) {
			let _ = T.userAgent.match(/Android\s([0-9.]*)/);
			_ && parseInt(_[1], 10) < 7 && (C = !1);
		}
	}
	return C ? _ : 4;
}
var ObjectRenderer = class {
	constructor(_) {
		this.renderer = _;
	}
	flush() {}
	destroy() {
		this.renderer = null;
	}
	start() {}
	stop() {
		this.flush();
	}
	render(_) {}
}, defaultFragment$1 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n", defaultVertex$1 = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n", _BatchRenderer = class _ extends ObjectRenderer {
	constructor(C) {
		super(C), this.setShaderGenerator(), this.geometryClass = BatchGeometry, this.vertexSize = 6, this.state = State.for2d(), this.size = _.defaultBatchSize * 4, this._vertexCount = 0, this._indexCount = 0, this._bufferedElements = [], this._bufferedTextures = [], this._bufferSize = 0, this._shader = null, this._packedGeometries = [], this._packedGeometryPoolSize = 2, this._flushId = 0, this._aBuffers = {}, this._iBuffers = {}, this.maxTextures = 1, this.renderer.on("prerender", this.onPrerender, this), C.runners.contextChange.add(this), this._dcIndex = 0, this._aIndex = 0, this._iIndex = 0, this._attributeBuffer = null, this._indexBuffer = null, this._tempBoundTextures = [];
	}
	static get defaultMaxTextures() {
		return this._defaultMaxTextures = this._defaultMaxTextures ?? maxRecommendedTextures(32), this._defaultMaxTextures;
	}
	static set defaultMaxTextures(_) {
		this._defaultMaxTextures = _;
	}
	static get canUploadSameBuffer() {
		return this._canUploadSameBuffer = this._canUploadSameBuffer ?? canUploadSameBuffer(), this._canUploadSameBuffer;
	}
	static set canUploadSameBuffer(_) {
		this._canUploadSameBuffer = _;
	}
	get MAX_TEXTURES() {
		return deprecation("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"), this.maxTextures;
	}
	static get defaultVertexSrc() {
		return defaultVertex$1;
	}
	static get defaultFragmentTemplate() {
		return defaultFragment$1;
	}
	setShaderGenerator({ vertex: C = _.defaultVertexSrc, fragment: T = _.defaultFragmentTemplate } = {}) {
		this.shaderGenerator = new BatchShaderGenerator(C, T);
	}
	contextChange() {
		let C = this.renderer.gl;
		settings.PREFER_ENV === ENV.WEBGL_LEGACY ? this.maxTextures = 1 : (this.maxTextures = Math.min(C.getParameter(C.MAX_TEXTURE_IMAGE_UNITS), _.defaultMaxTextures), this.maxTextures = checkMaxIfStatementsInShader(this.maxTextures, C)), this._shader = this.shaderGenerator.generateShader(this.maxTextures);
		for (let _ = 0; _ < this._packedGeometryPoolSize; _++) this._packedGeometries[_] = new this.geometryClass();
		this.initFlushBuffers();
	}
	initFlushBuffers() {
		let { _drawCallPool: C, _textureArrayPool: T } = _, E = this.size / 4, D = Math.floor(E / this.maxTextures) + 1;
		for (; C.length < E;) C.push(new BatchDrawCall());
		for (; T.length < D;) T.push(new BatchTextureArray());
		for (let _ = 0; _ < this.maxTextures; _++) this._tempBoundTextures[_] = null;
	}
	onPrerender() {
		this._flushId = 0;
	}
	render(_) {
		_._texture.valid && (this._vertexCount + _.vertexData.length / 2 > this.size && this.flush(), this._vertexCount += _.vertexData.length / 2, this._indexCount += _.indices.length, this._bufferedTextures[this._bufferSize] = _._texture.baseTexture, this._bufferedElements[this._bufferSize++] = _);
	}
	buildTexturesAndDrawCalls() {
		let { _bufferedTextures: C, maxTextures: T } = this, E = _._textureArrayPool, D = this.renderer.batch, O = this._tempBoundTextures, A = this.renderer.textureGC.count, P = ++BaseTexture._globalBatch, F = 0, I = E[0], L = 0;
		D.copyBoundTextures(O, T);
		for (let _ = 0; _ < this._bufferSize; ++_) {
			let R = C[_];
			C[_] = null, R._batchEnabled !== P && (I.count >= T && (D.boundArray(I, O, P, T), this.buildDrawCalls(I, L, _), L = _, I = E[++F], ++P), R._batchEnabled = P, R.touched = A, I.elements[I.count++] = R);
		}
		I.count > 0 && (D.boundArray(I, O, P, T), this.buildDrawCalls(I, L, this._bufferSize), ++F, ++P);
		for (let _ = 0; _ < O.length; _++) O[_] = null;
		BaseTexture._globalBatch = P;
	}
	buildDrawCalls(C, T, E) {
		let { _bufferedElements: D, _attributeBuffer: O, _indexBuffer: A, vertexSize: P } = this, F = _._drawCallPool, I = this._dcIndex, L = this._aIndex, R = this._iIndex, z = F[I];
		z.start = this._iIndex, z.texArray = C;
		for (let _ = T; _ < E; ++_) {
			let E = D[_], B = premultiplyBlendMode[E._texture.baseTexture.alphaMode ? 1 : 0][E.blendMode];
			D[_] = null, T < _ && z.blend !== B && (z.size = R - z.start, T = _, z = F[++I], z.texArray = C, z.start = R), this.packInterleavedGeometry(E, O, A, L, R), L += E.vertexData.length / 2 * P, R += E.indices.length, z.blend = B;
		}
		T < E && (z.size = R - z.start, ++I), this._dcIndex = I, this._aIndex = L, this._iIndex = R;
	}
	bindAndClearTexArray(_) {
		let C = this.renderer.texture;
		for (let T = 0; T < _.count; T++) C.bind(_.elements[T], _.ids[T]), _.elements[T] = null;
		_.count = 0;
	}
	updateGeometry() {
		let { _packedGeometries: C, _attributeBuffer: T, _indexBuffer: E } = this;
		_.canUploadSameBuffer ? (C[this._flushId]._buffer.update(T.rawBinaryData), C[this._flushId]._indexBuffer.update(E), this.renderer.geometry.updateBuffers()) : (this._packedGeometryPoolSize <= this._flushId && (this._packedGeometryPoolSize++, C[this._flushId] = new this.geometryClass()), C[this._flushId]._buffer.update(T.rawBinaryData), C[this._flushId]._indexBuffer.update(E), this.renderer.geometry.bind(C[this._flushId]), this.renderer.geometry.updateBuffers(), this._flushId++);
	}
	drawBatches() {
		let C = this._dcIndex, { gl: T, state: E } = this.renderer, D = _._drawCallPool, O = null;
		for (let _ = 0; _ < C; _++) {
			let { texArray: C, type: A, size: P, start: F, blend: I } = D[_];
			O !== C && (O = C, this.bindAndClearTexArray(C)), this.state.blendMode = I, E.set(this.state), T.drawElements(A, P, T.UNSIGNED_SHORT, F * 2);
		}
	}
	flush() {
		this._vertexCount !== 0 && (this._attributeBuffer = this.getAttributeBuffer(this._vertexCount), this._indexBuffer = this.getIndexBuffer(this._indexCount), this._aIndex = 0, this._iIndex = 0, this._dcIndex = 0, this.buildTexturesAndDrawCalls(), this.updateGeometry(), this.drawBatches(), this._bufferSize = 0, this._vertexCount = 0, this._indexCount = 0);
	}
	start() {
		this.renderer.state.set(this.state), this.renderer.texture.ensureSamplerType(this.maxTextures), this.renderer.shader.bind(this._shader), _.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
	}
	stop() {
		this.flush();
	}
	destroy() {
		for (let _ = 0; _ < this._packedGeometryPoolSize; _++) this._packedGeometries[_] && this._packedGeometries[_].destroy();
		this.renderer.off("prerender", this.onPrerender, this), this._aBuffers = null, this._iBuffers = null, this._packedGeometries = null, this._attributeBuffer = null, this._indexBuffer = null, this._shader &&= (this._shader.destroy(), null), super.destroy();
	}
	getAttributeBuffer(_) {
		let C = nextPow2(Math.ceil(_ / 8)), T = log2(C), E = C * 8;
		this._aBuffers.length <= T && (this._iBuffers.length = T + 1);
		let D = this._aBuffers[E];
		return D || (this._aBuffers[E] = D = new ViewableBuffer(E * this.vertexSize * 4)), D;
	}
	getIndexBuffer(_) {
		let C = nextPow2(Math.ceil(_ / 12)), T = log2(C), E = C * 12;
		this._iBuffers.length <= T && (this._iBuffers.length = T + 1);
		let D = this._iBuffers[T];
		return D || (this._iBuffers[T] = D = new Uint16Array(E)), D;
	}
	packInterleavedGeometry(_, C, T, E, D) {
		let { uint32View: O, float32View: A } = C, P = E / this.vertexSize, F = _.uvs, I = _.indices, L = _.vertexData, R = _._texture.baseTexture._batchLocation, z = Math.min(_.worldAlpha, 1), B = Color.shared.setValue(_._tintRGB).toPremultiplied(z, _._texture.baseTexture.alphaMode > 0);
		for (let _ = 0; _ < L.length; _ += 2) A[E++] = L[_], A[E++] = L[_ + 1], A[E++] = F[_], A[E++] = F[_ + 1], O[E++] = B, A[E++] = R;
		for (let _ = 0; _ < I.length; _++) T[D++] = P + I[_];
	}
};
_BatchRenderer.defaultBatchSize = 4096, _BatchRenderer.extension = {
	name: "batch",
	type: ExtensionType.RendererPlugin
}, _BatchRenderer._drawCallPool = [], _BatchRenderer._textureArrayPool = [];
var BatchRenderer = _BatchRenderer;
extensions.add(BatchRenderer);
var defaultFragment = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n", defaultVertex = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", _Filter = class _ extends Shader {
	constructor(C, T, E) {
		let D = Program.from(C || _.defaultVertexSrc, T || _.defaultFragmentSrc);
		super(D, E), this.padding = 0, this.resolution = _.defaultResolution, this.multisample = _.defaultMultisample, this.enabled = !0, this.autoFit = !0, this.state = new State();
	}
	apply(_, C, T, E, D) {
		_.applyFilter(this, C, T, E);
	}
	get blendMode() {
		return this.state.blendMode;
	}
	set blendMode(_) {
		this.state.blendMode = _;
	}
	get resolution() {
		return this._resolution;
	}
	set resolution(_) {
		this._resolution = _;
	}
	static get defaultVertexSrc() {
		return defaultVertex;
	}
	static get defaultFragmentSrc() {
		return defaultFragment;
	}
};
_Filter.defaultResolution = 1, _Filter.defaultMultisample = MSAA_QUALITY.NONE;
var Filter = _Filter, BackgroundSystem = class {
	constructor() {
		this.clearBeforeRender = !0, this._backgroundColor = new Color(0), this.alpha = 1;
	}
	init(_) {
		this.clearBeforeRender = _.clearBeforeRender;
		let { backgroundColor: C, background: T, backgroundAlpha: E } = _, D = T ?? C;
		D !== void 0 && (this.color = D), this.alpha = E;
	}
	get color() {
		return this._backgroundColor.value;
	}
	set color(_) {
		this._backgroundColor.setValue(_);
	}
	get alpha() {
		return this._backgroundColor.alpha;
	}
	set alpha(_) {
		this._backgroundColor.setAlpha(_);
	}
	get backgroundColor() {
		return this._backgroundColor;
	}
	destroy() {}
};
BackgroundSystem.defaultOptions = {
	backgroundAlpha: 1,
	backgroundColor: 0,
	clearBeforeRender: !0
}, BackgroundSystem.extension = {
	type: [ExtensionType.RendererSystem, ExtensionType.CanvasRendererSystem],
	name: "background"
}, extensions.add(BackgroundSystem);
var BatchSystem = class {
	constructor(_) {
		this.renderer = _, this.emptyRenderer = new ObjectRenderer(_), this.currentRenderer = this.emptyRenderer;
	}
	setObjectRenderer(_) {
		this.currentRenderer !== _ && (this.currentRenderer.stop(), this.currentRenderer = _, this.currentRenderer.start());
	}
	flush() {
		this.setObjectRenderer(this.emptyRenderer);
	}
	reset() {
		this.setObjectRenderer(this.emptyRenderer);
	}
	copyBoundTextures(_, C) {
		let { boundTextures: T } = this.renderer.texture;
		for (let E = C - 1; E >= 0; --E) _[E] = T[E] || null, _[E] && (_[E]._batchLocation = E);
	}
	boundArray(_, C, T, E) {
		let { elements: D, ids: O, count: A } = _, P = 0;
		for (let _ = 0; _ < A; _++) {
			let A = D[_], F = A._batchLocation;
			if (F >= 0 && F < E && C[F] === A) {
				O[_] = F;
				continue;
			}
			for (; P < E;) {
				let E = C[P];
				if (E && E._batchEnabled === T && E._batchLocation === P) {
					P++;
					continue;
				}
				O[_] = P, A._batchLocation = P, C[P] = A;
				break;
			}
		}
	}
	destroy() {
		this.renderer = null;
	}
};
BatchSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "batch"
}, extensions.add(BatchSystem);
var CONTEXT_UID_COUNTER = 0, ContextSystem = class {
	constructor(_) {
		this.renderer = _, this.webGLVersion = 1, this.extensions = {}, this.supports = { uint32Indices: !1 }, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this);
	}
	get isLost() {
		return !this.gl || this.gl.isContextLost();
	}
	contextChange(_) {
		this.gl = _, this.renderer.gl = _, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
	}
	init(_) {
		if (_.context) this.initFromContext(_.context);
		else {
			let C = this.renderer.background.alpha < 1, T = _.premultipliedAlpha;
			this.preserveDrawingBuffer = _.preserveDrawingBuffer, this.useContextAlpha = _.useContextAlpha, this.powerPreference = _.powerPreference, this.initFromOptions({
				alpha: C,
				premultipliedAlpha: T,
				antialias: _.antialias,
				stencil: !0,
				preserveDrawingBuffer: _.preserveDrawingBuffer,
				powerPreference: _.powerPreference
			});
		}
	}
	initFromContext(_) {
		this.gl = _, this.validateContext(_), this.renderer.gl = _, this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++, this.renderer.runners.contextChange.emit(_);
		let C = this.renderer.view;
		C.addEventListener !== void 0 && (C.addEventListener("webglcontextlost", this.handleContextLost, !1), C.addEventListener("webglcontextrestored", this.handleContextRestored, !1));
	}
	initFromOptions(_) {
		let C = this.createContext(this.renderer.view, _);
		this.initFromContext(C);
	}
	createContext(_, C) {
		let E;
		if (settings.PREFER_ENV >= ENV.WEBGL2 && (E = _.getContext("webgl2", C)), E) this.webGLVersion = 2;
		else if (this.webGLVersion = 1, E = _.getContext("webgl", C) || _.getContext("experimental-webgl", C), !E) throw Error("This browser does not support WebGL. Try using the canvas renderer");
		return this.gl = E, this.getExtensions(), this.gl;
	}
	getExtensions() {
		let { gl: _ } = this, C = {
			loseContext: _.getExtension("WEBGL_lose_context"),
			anisotropicFiltering: _.getExtension("EXT_texture_filter_anisotropic"),
			floatTextureLinear: _.getExtension("OES_texture_float_linear"),
			s3tc: _.getExtension("WEBGL_compressed_texture_s3tc"),
			s3tc_sRGB: _.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
			etc: _.getExtension("WEBGL_compressed_texture_etc"),
			etc1: _.getExtension("WEBGL_compressed_texture_etc1"),
			pvrtc: _.getExtension("WEBGL_compressed_texture_pvrtc") || _.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
			atc: _.getExtension("WEBGL_compressed_texture_atc"),
			astc: _.getExtension("WEBGL_compressed_texture_astc"),
			bptc: _.getExtension("EXT_texture_compression_bptc")
		};
		this.webGLVersion === 1 ? Object.assign(this.extensions, C, {
			drawBuffers: _.getExtension("WEBGL_draw_buffers"),
			depthTexture: _.getExtension("WEBGL_depth_texture"),
			vertexArrayObject: _.getExtension("OES_vertex_array_object") || _.getExtension("MOZ_OES_vertex_array_object") || _.getExtension("WEBKIT_OES_vertex_array_object"),
			uint32ElementIndex: _.getExtension("OES_element_index_uint"),
			floatTexture: _.getExtension("OES_texture_float"),
			floatTextureLinear: _.getExtension("OES_texture_float_linear"),
			textureHalfFloat: _.getExtension("OES_texture_half_float"),
			textureHalfFloatLinear: _.getExtension("OES_texture_half_float_linear")
		}) : this.webGLVersion === 2 && Object.assign(this.extensions, C, { colorBufferFloat: _.getExtension("EXT_color_buffer_float") });
	}
	handleContextLost(_) {
		_.preventDefault(), setTimeout(() => {
			this.gl.isContextLost() && this.extensions.loseContext && this.extensions.loseContext.restoreContext();
		}, 0);
	}
	handleContextRestored() {
		this.renderer.runners.contextChange.emit(this.gl);
	}
	destroy() {
		let _ = this.renderer.view;
		this.renderer = null, _.removeEventListener !== void 0 && (_.removeEventListener("webglcontextlost", this.handleContextLost), _.removeEventListener("webglcontextrestored", this.handleContextRestored)), this.gl.useProgram(null), this.extensions.loseContext && this.extensions.loseContext.loseContext();
	}
	postrender() {
		this.renderer.objectRenderer.renderingToScreen && this.gl.flush();
	}
	validateContext(_) {
		let C = _.getContextAttributes(), T = "WebGL2RenderingContext" in globalThis && _ instanceof globalThis.WebGL2RenderingContext;
		T && (this.webGLVersion = 2), C && !C.stencil && console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
		let E = T || !!_.getExtension("OES_element_index_uint");
		this.supports.uint32Indices = E, E || console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
	}
};
ContextSystem.defaultOptions = {
	context: null,
	antialias: !1,
	premultipliedAlpha: !0,
	preserveDrawingBuffer: !1,
	powerPreference: "default"
}, ContextSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "context"
}, extensions.add(ContextSystem);
var Framebuffer = class {
	constructor(_, C) {
		if (this.width = Math.round(_), this.height = Math.round(C), !this.width || !this.height) throw Error("Framebuffer width or height is zero");
		this.stencil = !1, this.depth = !1, this.dirtyId = 0, this.dirtyFormat = 0, this.dirtySize = 0, this.depthTexture = null, this.colorTextures = [], this.glFramebuffers = {}, this.disposeRunner = new Runner("disposeFramebuffer"), this.multisample = MSAA_QUALITY.NONE;
	}
	get colorTexture() {
		return this.colorTextures[0];
	}
	addColorTexture(_ = 0, C) {
		return this.colorTextures[_] = C || new BaseTexture(null, {
			scaleMode: SCALE_MODES.NEAREST,
			resolution: 1,
			mipmap: MIPMAP_MODES.OFF,
			width: this.width,
			height: this.height
		}), this.dirtyId++, this.dirtyFormat++, this;
	}
	addDepthTexture(_) {
		return this.depthTexture = _ || new BaseTexture(null, {
			scaleMode: SCALE_MODES.NEAREST,
			resolution: 1,
			width: this.width,
			height: this.height,
			mipmap: MIPMAP_MODES.OFF,
			format: FORMATS.DEPTH_COMPONENT,
			type: TYPES.UNSIGNED_SHORT
		}), this.dirtyId++, this.dirtyFormat++, this;
	}
	enableDepth() {
		return this.depth = !0, this.dirtyId++, this.dirtyFormat++, this;
	}
	enableStencil() {
		return this.stencil = !0, this.dirtyId++, this.dirtyFormat++, this;
	}
	resize(_, C) {
		if (_ = Math.round(_), C = Math.round(C), !_ || !C) throw Error("Framebuffer width and height must not be zero");
		if (!(_ === this.width && C === this.height)) {
			this.width = _, this.height = C, this.dirtyId++, this.dirtySize++;
			for (let T = 0; T < this.colorTextures.length; T++) {
				let E = this.colorTextures[T], D = E.resolution;
				E.setSize(_ / D, C / D);
			}
			if (this.depthTexture) {
				let T = this.depthTexture.resolution;
				this.depthTexture.setSize(_ / T, C / T);
			}
		}
	}
	dispose() {
		this.disposeRunner.emit(this, !1);
	}
	destroyDepthTexture() {
		this.depthTexture && (this.depthTexture.destroy(), this.depthTexture = null, ++this.dirtyId, ++this.dirtyFormat);
	}
}, BaseRenderTexture = class extends BaseTexture {
	constructor(_ = {}) {
		typeof _ == "number" && (_ = {
			width: arguments[0],
			height: arguments[1],
			scaleMode: arguments[2],
			resolution: arguments[3]
		}), _.width = _.width ?? 100, _.height = _.height ?? 100, _.multisample ??= MSAA_QUALITY.NONE, super(null, _), this.mipmap = MIPMAP_MODES.OFF, this.valid = !0, this._clear = new Color([
			0,
			0,
			0,
			0
		]), this.framebuffer = new Framebuffer(this.realWidth, this.realHeight).addColorTexture(0, this), this.framebuffer.multisample = _.multisample, this.maskStack = [], this.filterStack = [{}];
	}
	set clearColor(_) {
		this._clear.setValue(_);
	}
	get clearColor() {
		return this._clear.value;
	}
	get clear() {
		return this._clear;
	}
	get multisample() {
		return this.framebuffer.multisample;
	}
	set multisample(_) {
		this.framebuffer.multisample = _;
	}
	resize(_, C) {
		this.framebuffer.resize(_ * this.resolution, C * this.resolution), this.setRealSize(this.framebuffer.width, this.framebuffer.height);
	}
	dispose() {
		this.framebuffer.dispose(), super.dispose();
	}
	destroy() {
		super.destroy(), this.framebuffer.destroyDepthTexture(), this.framebuffer = null;
	}
}, BaseImageResource = class extends Resource {
	constructor(_) {
		let C = _, T = C.naturalWidth || C.videoWidth || C.displayWidth || C.width, E = C.naturalHeight || C.videoHeight || C.displayHeight || C.height;
		super(T, E), this.source = _, this.noSubImage = !1;
	}
	static crossOrigin(_, C, T) {
		T === void 0 && !C.startsWith("data:") ? _.crossOrigin = determineCrossOrigin(C) : T !== !1 && (_.crossOrigin = typeof T == "string" ? T : "anonymous");
	}
	upload(_, C, T, E) {
		let D = _.gl, O = C.realWidth, A = C.realHeight;
		if (E ||= this.source, typeof HTMLImageElement < "u" && E instanceof HTMLImageElement) {
			if (!E.complete || E.naturalWidth === 0) return !1;
		} else if (typeof HTMLVideoElement < "u" && E instanceof HTMLVideoElement && E.readyState <= 1) return !1;
		return D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL, C.alphaMode === ALPHA_MODES.UNPACK), !this.noSubImage && C.target === D.TEXTURE_2D && T.width === O && T.height === A ? D.texSubImage2D(D.TEXTURE_2D, 0, 0, 0, C.format, T.type, E) : (T.width = O, T.height = A, D.texImage2D(C.target, 0, T.internalFormat, C.format, T.type, E)), !0;
	}
	update() {
		if (this.destroyed) return;
		let _ = this.source, C = _.naturalWidth || _.videoWidth || _.width, T = _.naturalHeight || _.videoHeight || _.height;
		this.resize(C, T), super.update();
	}
	dispose() {
		this.source = null;
	}
}, ImageResource = class extends BaseImageResource {
	constructor(_, C) {
		if (C ||= {}, typeof _ == "string") {
			let T = new Image();
			BaseImageResource.crossOrigin(T, _, C.crossorigin), T.src = _, _ = T;
		}
		super(_), !_.complete && this._width && this._height && (this._width = 0, this._height = 0), this.url = _.src, this._process = null, this.preserveBitmap = !1, this.createBitmap = (C.createBitmap ?? settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap, this.alphaMode = typeof C.alphaMode == "number" ? C.alphaMode : null, this.bitmap = null, this._load = null, C.autoLoad !== !1 && this.load();
	}
	load(_) {
		return this._load ? this._load : (_ !== void 0 && (this.createBitmap = _), this._load = new Promise((_, C) => {
			let T = this.source;
			this.url = T.src;
			let E = () => {
				this.destroyed || (T.onload = null, T.onerror = null, this.update(), this._load = null, this.createBitmap ? _(this.process()) : _(this));
			};
			T.complete && T.src ? E() : (T.onload = E, T.onerror = (_) => {
				C(_), this.onError.emit(_);
			});
		}), this._load);
	}
	process() {
		let _ = this.source;
		if (this._process !== null) return this._process;
		if (this.bitmap !== null || !globalThis.createImageBitmap) return Promise.resolve(this);
		let C = globalThis.createImageBitmap, T = !_.crossOrigin || _.crossOrigin === "anonymous";
		return this._process = fetch(_.src, { mode: T ? "cors" : "no-cors" }).then((_) => _.blob()).then((T) => C(T, 0, 0, _.width, _.height, { premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none" })).then((_) => this.destroyed ? Promise.reject() : (this.bitmap = _, this.update(), this._process = null, Promise.resolve(this))), this._process;
	}
	upload(_, C, T) {
		if (typeof this.alphaMode == "number" && (C.alphaMode = this.alphaMode), !this.createBitmap) return super.upload(_, C, T);
		if (!this.bitmap && (this.process(), !this.bitmap)) return !1;
		if (super.upload(_, C, T, this.bitmap), !this.preserveBitmap) {
			let _ = !0, E = C._glTextures;
			for (let D in E) {
				let O = E[D];
				if (O !== T && O.dirtyId !== C.dirtyId) {
					_ = !1;
					break;
				}
			}
			_ && (this.bitmap.close && this.bitmap.close(), this.bitmap = null);
		}
		return !0;
	}
	dispose() {
		this.source.onload = null, this.source.onerror = null, super.dispose(), this.bitmap &&= (this.bitmap.close(), null), this._process = null, this._load = null;
	}
	static test(_) {
		return typeof HTMLImageElement < "u" && (typeof _ == "string" || _ instanceof HTMLImageElement);
	}
}, TextureUvs = class {
	constructor() {
		this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
	}
	set(_, C, T) {
		let E = C.width, D = C.height;
		if (T) {
			let C = _.width / 2 / E, O = _.height / 2 / D, A = _.x / E + C, P = _.y / D + O;
			T = groupD8.add(T, groupD8.NW), this.x0 = A + C * groupD8.uX(T), this.y0 = P + O * groupD8.uY(T), T = groupD8.add(T, 2), this.x1 = A + C * groupD8.uX(T), this.y1 = P + O * groupD8.uY(T), T = groupD8.add(T, 2), this.x2 = A + C * groupD8.uX(T), this.y2 = P + O * groupD8.uY(T), T = groupD8.add(T, 2), this.x3 = A + C * groupD8.uX(T), this.y3 = P + O * groupD8.uY(T);
		} else this.x0 = _.x / E, this.y0 = _.y / D, this.x1 = (_.x + _.width) / E, this.y1 = _.y / D, this.x2 = (_.x + _.width) / E, this.y2 = (_.y + _.height) / D, this.x3 = _.x / E, this.y3 = (_.y + _.height) / D;
		this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
	}
};
TextureUvs.prototype.toString = function() {
	return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};
var DEFAULT_UVS = new TextureUvs();
function removeAllHandlers(_) {
	_.destroy = function() {}, _.on = function() {}, _.once = function() {}, _.emit = function() {};
}
var Texture = class _ extends import_eventemitter3.default {
	constructor(C, T, E, D, O, A, P) {
		if (super(), this.noFrame = !1, T ||= (this.noFrame = !0, new Rectangle(0, 0, 1, 1)), C instanceof _ && (C = C.baseTexture), this.baseTexture = C, this._frame = T, this.trim = D, this.valid = !1, this.destroyed = !1, this._uvs = DEFAULT_UVS, this.uvMatrix = null, this.orig = E || T, this._rotate = Number(O || 0), O === !0) this._rotate = 2;
		else if (this._rotate % 2 != 0) throw Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
		this.defaultAnchor = A ? new Point(A.x, A.y) : new Point(0, 0), this.defaultBorders = P, this._updateID = 0, this.textureCacheIds = [], C.valid ? this.noFrame ? C.valid && this.onBaseTextureUpdated(C) : this.frame = T : C.once("loaded", this.onBaseTextureUpdated, this), this.noFrame && C.on("update", this.onBaseTextureUpdated, this);
	}
	update() {
		this.baseTexture.resource && this.baseTexture.resource.update();
	}
	onBaseTextureUpdated(_) {
		if (this.noFrame) {
			if (!this.baseTexture.valid) return;
			this._frame.width = _.width, this._frame.height = _.height, this.valid = !0, this.updateUvs();
		} else this.frame = this._frame;
		this.emit("update", this);
	}
	destroy(C) {
		if (this.baseTexture) {
			if (C) {
				let { resource: C } = this.baseTexture;
				C?.url && TextureCache[C.url] && _.removeFromCache(C.url), this.baseTexture.destroy();
			}
			this.baseTexture.off("loaded", this.onBaseTextureUpdated, this), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture = null;
		}
		this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, _.removeFromCache(this), this.textureCacheIds = null, this.destroyed = !0, this.emit("destroyed", this), this.removeAllListeners();
	}
	clone() {
		let C = this._frame.clone(), T = this._frame === this.orig ? C : this.orig.clone(), E = new _(this.baseTexture, !this.noFrame && C, T, this.trim?.clone(), this.rotate, this.defaultAnchor, this.defaultBorders);
		return this.noFrame && (E._frame = C), E;
	}
	updateUvs() {
		this._uvs === DEFAULT_UVS && (this._uvs = new TextureUvs()), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++;
	}
	static from(C, T = {}, E = settings.STRICT_TEXTURE_CACHE) {
		let D = typeof C == "string", O = null;
		D ? O = C : C instanceof BaseTexture ? (C.cacheId || (C.cacheId = `${T?.pixiIdPrefix || "pixiid"}-${uid()}`, BaseTexture.addToCache(C, C.cacheId)), O = C.cacheId) : (C._pixiId ||= `${T?.pixiIdPrefix || "pixiid"}_${uid()}`, O = C._pixiId);
		let A = TextureCache[O];
		if (D && E && !A) throw Error(`The cacheId "${O}" does not exist in TextureCache.`);
		return !A && !(C instanceof BaseTexture) ? (T.resolution ||= getResolutionOfUrl(C), A = new _(new BaseTexture(C, T)), A.baseTexture.cacheId = O, BaseTexture.addToCache(A.baseTexture, O), _.addToCache(A, O)) : !A && C instanceof BaseTexture && (A = new _(C), _.addToCache(A, O)), A;
	}
	static fromURL(C, T) {
		let E = Object.assign({ autoLoad: !1 }, T?.resourceOptions), D = _.from(C, Object.assign({ resourceOptions: E }, T), !1), O = D.baseTexture.resource;
		return D.baseTexture.valid ? Promise.resolve(D) : O.load().then(() => Promise.resolve(D));
	}
	static fromBuffer(C, T, E, D) {
		return new _(BaseTexture.fromBuffer(C, T, E, D));
	}
	static fromLoader(C, T, E, D) {
		let O = new BaseTexture(C, Object.assign({
			scaleMode: BaseTexture.defaultOptions.scaleMode,
			resolution: getResolutionOfUrl(T)
		}, D)), { resource: A } = O;
		A instanceof ImageResource && (A.url = T);
		let P = new _(O);
		return E ||= T, BaseTexture.addToCache(P.baseTexture, E), _.addToCache(P, E), E !== T && (BaseTexture.addToCache(P.baseTexture, T), _.addToCache(P, T)), P.baseTexture.valid ? Promise.resolve(P) : new Promise((_) => {
			P.baseTexture.once("loaded", () => _(P));
		});
	}
	static addToCache(_, C) {
		C && (_.textureCacheIds.includes(C) || _.textureCacheIds.push(C), TextureCache[C] && TextureCache[C] !== _ && console.warn(`Texture added to the cache with an id [${C}] that already had an entry`), TextureCache[C] = _);
	}
	static removeFromCache(_) {
		if (typeof _ == "string") {
			let C = TextureCache[_];
			if (C) {
				let T = C.textureCacheIds.indexOf(_);
				return T > -1 && C.textureCacheIds.splice(T, 1), delete TextureCache[_], C;
			}
		} else if (_?.textureCacheIds) {
			for (let C = 0; C < _.textureCacheIds.length; ++C) TextureCache[_.textureCacheIds[C]] === _ && delete TextureCache[_.textureCacheIds[C]];
			return _.textureCacheIds.length = 0, _;
		}
		return null;
	}
	get resolution() {
		return this.baseTexture.resolution;
	}
	get frame() {
		return this._frame;
	}
	set frame(_) {
		this._frame = _, this.noFrame = !1;
		let { x: C, y: T, width: E, height: D } = _, O = C + E > this.baseTexture.width, A = T + D > this.baseTexture.height;
		if (O || A) {
			let _ = O && A ? "and" : "or", P = `X: ${C} + ${E} = ${C + E} > ${this.baseTexture.width}`, F = `Y: ${T} + ${D} = ${T + D} > ${this.baseTexture.height}`;
			throw Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${P} ${_} ${F}`);
		}
		this.valid = E && D && this.baseTexture.valid, !this.trim && !this.rotate && (this.orig = _), this.valid && this.updateUvs();
	}
	get rotate() {
		return this._rotate;
	}
	set rotate(_) {
		this._rotate = _, this.valid && this.updateUvs();
	}
	get width() {
		return this.orig.width;
	}
	get height() {
		return this.orig.height;
	}
	castToBaseTexture() {
		return this.baseTexture;
	}
	static get EMPTY() {
		return _._EMPTY || (_._EMPTY = new _(new BaseTexture()), removeAllHandlers(_._EMPTY), removeAllHandlers(_._EMPTY.baseTexture)), _._EMPTY;
	}
	static get WHITE() {
		if (!_._WHITE) {
			let C = settings.ADAPTER.createCanvas(16, 16), T = C.getContext("2d");
			C.width = 16, C.height = 16, T.fillStyle = "white", T.fillRect(0, 0, 16, 16), _._WHITE = new _(BaseTexture.from(C)), removeAllHandlers(_._WHITE), removeAllHandlers(_._WHITE.baseTexture);
		}
		return _._WHITE;
	}
}, RenderTexture = class _ extends Texture {
	constructor(_, C) {
		super(_, C), this.valid = !0, this.filterFrame = null, this.filterPoolKey = null, this.updateUvs();
	}
	get framebuffer() {
		return this.baseTexture.framebuffer;
	}
	get multisample() {
		return this.framebuffer.multisample;
	}
	set multisample(_) {
		this.framebuffer.multisample = _;
	}
	resize(_, C, T = !0) {
		let E = this.baseTexture.resolution, D = Math.round(_ * E) / E, O = Math.round(C * E) / E;
		this.valid = D > 0 && O > 0, this._frame.width = this.orig.width = D, this._frame.height = this.orig.height = O, T && this.baseTexture.resize(D, O), this.updateUvs();
	}
	setResolution(_) {
		let { baseTexture: C } = this;
		C.resolution !== _ && (C.setResolution(_), this.resize(C.width, C.height, !1));
	}
	static create(C) {
		return new _(new BaseRenderTexture(C));
	}
}, RenderTexturePool = class {
	constructor(_) {
		this.texturePool = {}, this.textureOptions = _ || {}, this.enableFullScreen = !1, this._pixelsWidth = 0, this._pixelsHeight = 0;
	}
	createTexture(_, C, T = MSAA_QUALITY.NONE) {
		return new RenderTexture(new BaseRenderTexture(Object.assign({
			width: _,
			height: C,
			resolution: 1,
			multisample: T
		}, this.textureOptions)));
	}
	getOptimalTexture(_, C, T = 1, E = MSAA_QUALITY.NONE) {
		let D;
		_ = Math.max(Math.ceil(_ * T - 1e-6), 1), C = Math.max(Math.ceil(C * T - 1e-6), 1), !this.enableFullScreen || _ !== this._pixelsWidth || C !== this._pixelsHeight ? (_ = nextPow2(_), C = nextPow2(C), D = ((_ & 65535) << 16 | C & 65535) >>> 0, E > 1 && (D += E * 4294967296)) : D = E > 1 ? -E : -1, this.texturePool[D] || (this.texturePool[D] = []);
		let O = this.texturePool[D].pop();
		return O ||= this.createTexture(_, C, E), O.filterPoolKey = D, O.setResolution(T), O;
	}
	getFilterTexture(_, C, T) {
		let E = this.getOptimalTexture(_.width, _.height, C || _.resolution, T || MSAA_QUALITY.NONE);
		return E.filterFrame = _.filterFrame, E;
	}
	returnTexture(_) {
		let C = _.filterPoolKey;
		_.filterFrame = null, this.texturePool[C].push(_);
	}
	returnFilterTexture(_) {
		this.returnTexture(_);
	}
	clear(_) {
		if (_ = _ !== !1, _) for (let _ in this.texturePool) {
			let C = this.texturePool[_];
			if (C) for (let _ = 0; _ < C.length; _++) C[_].destroy(!0);
		}
		this.texturePool = {};
	}
	setScreenSize(_) {
		if (!(_.width === this._pixelsWidth && _.height === this._pixelsHeight)) {
			for (let C in this.enableFullScreen = _.width > 0 && _.height > 0, this.texturePool) {
				if (!(Number(C) < 0)) continue;
				let _ = this.texturePool[C];
				if (_) for (let C = 0; C < _.length; C++) _[C].destroy(!0);
				this.texturePool[C] = [];
			}
			this._pixelsWidth = _.width, this._pixelsHeight = _.height;
		}
	}
};
RenderTexturePool.SCREEN_KEY = -1;
var Quad = class extends Geometry {
	constructor() {
		super(), this.addAttribute("aVertexPosition", new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		])).addIndex([
			0,
			1,
			3,
			2
		]);
	}
}, QuadUv = class extends Geometry {
	constructor() {
		super(), this.vertices = new Float32Array([
			-1,
			-1,
			1,
			-1,
			1,
			1,
			-1,
			1
		]), this.uvs = new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		]), this.vertexBuffer = new Buffer(this.vertices), this.uvBuffer = new Buffer(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([
			0,
			1,
			2,
			0,
			2,
			3
		]);
	}
	map(_, C) {
		let T = 0, E = 0;
		return this.uvs[0] = T, this.uvs[1] = E, this.uvs[2] = T + C.width / _.width, this.uvs[3] = E, this.uvs[4] = T + C.width / _.width, this.uvs[5] = E + C.height / _.height, this.uvs[6] = T, this.uvs[7] = E + C.height / _.height, T = C.x, E = C.y, this.vertices[0] = T, this.vertices[1] = E, this.vertices[2] = T + C.width, this.vertices[3] = E, this.vertices[4] = T + C.width, this.vertices[5] = E + C.height, this.vertices[6] = T, this.vertices[7] = E + C.height, this.invalidate(), this;
	}
	invalidate() {
		return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
	}
}, FilterState = class {
	constructor() {
		this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = MSAA_QUALITY.NONE, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.bindingSourceFrame = new Rectangle(), this.bindingDestinationFrame = new Rectangle(), this.filters = [], this.transform = null;
	}
	clear() {
		this.target = null, this.filters = null, this.renderTexture = null;
	}
}, tempPoints = [
	new Point(),
	new Point(),
	new Point(),
	new Point()
], tempMatrix$1 = new Matrix(), FilterSystem = class {
	constructor(_) {
		this.renderer = _, this.defaultFilterStack = [{}], this.texturePool = new RenderTexturePool(), this.statePool = [], this.quad = new Quad(), this.quadUv = new QuadUv(), this.tempRect = new Rectangle(), this.activeState = {}, this.globalUniforms = new UniformGroup({
			outputFrame: new Rectangle(),
			inputSize: new Float32Array(4),
			inputPixel: new Float32Array(4),
			inputClamp: new Float32Array(4),
			resolution: 1,
			filterArea: new Float32Array(4),
			filterClamp: new Float32Array(4)
		}, !0), this.forceClear = !1, this.useMaxPadding = !1;
	}
	init() {
		this.texturePool.setScreenSize(this.renderer.view);
	}
	push(_, C) {
		let T = this.renderer, E = this.defaultFilterStack, D = this.statePool.pop() || new FilterState(), O = T.renderTexture, A, P;
		if (O.current) {
			let _ = O.current;
			A = _.resolution, P = _.multisample;
		} else A = T.resolution, P = T.multisample;
		let F = C[0].resolution || A, I = C[0].multisample ?? P, L = C[0].padding, R = C[0].autoFit, z = C[0].legacy ?? !0;
		for (let _ = 1; _ < C.length; _++) {
			let T = C[_];
			F = Math.min(F, T.resolution || A), I = Math.min(I, T.multisample ?? P), L = this.useMaxPadding ? Math.max(L, T.padding) : L + T.padding, R &&= T.autoFit, z ||= T.legacy ?? !0;
		}
		E.length === 1 && (this.defaultFilterStack[0].renderTexture = O.current), E.push(D), D.resolution = F, D.multisample = I, D.legacy = z, D.target = _, D.sourceFrame.copyFrom(_.filterArea || _.getBounds(!0)), D.sourceFrame.pad(L);
		let B = this.tempRect.copyFrom(O.sourceFrame);
		T.projection.transform && this.transformAABB(tempMatrix$1.copyFrom(T.projection.transform).invert(), B), R ? (D.sourceFrame.fit(B), (D.sourceFrame.width <= 0 || D.sourceFrame.height <= 0) && (D.sourceFrame.width = 0, D.sourceFrame.height = 0)) : D.sourceFrame.intersects(B) || (D.sourceFrame.width = 0, D.sourceFrame.height = 0), this.roundFrame(D.sourceFrame, O.current ? O.current.resolution : T.resolution, O.sourceFrame, O.destinationFrame, T.projection.transform), D.renderTexture = this.getOptimalFilterTexture(D.sourceFrame.width, D.sourceFrame.height, F, I), D.filters = C, D.destinationFrame.width = D.renderTexture.width, D.destinationFrame.height = D.renderTexture.height;
		let V = this.tempRect;
		V.x = 0, V.y = 0, V.width = D.sourceFrame.width, V.height = D.sourceFrame.height, D.renderTexture.filterFrame = D.sourceFrame, D.bindingSourceFrame.copyFrom(O.sourceFrame), D.bindingDestinationFrame.copyFrom(O.destinationFrame), D.transform = T.projection.transform, T.projection.transform = null, O.bind(D.renderTexture, D.sourceFrame, V), T.framebuffer.clear(0, 0, 0, 0);
	}
	pop() {
		let _ = this.defaultFilterStack, C = _.pop(), T = C.filters;
		this.activeState = C;
		let E = this.globalUniforms.uniforms;
		E.outputFrame = C.sourceFrame, E.resolution = C.resolution;
		let D = E.inputSize, O = E.inputPixel, A = E.inputClamp;
		if (D[0] = C.destinationFrame.width, D[1] = C.destinationFrame.height, D[2] = 1 / D[0], D[3] = 1 / D[1], O[0] = Math.round(D[0] * C.resolution), O[1] = Math.round(D[1] * C.resolution), O[2] = 1 / O[0], O[3] = 1 / O[1], A[0] = .5 * O[2], A[1] = .5 * O[3], A[2] = C.sourceFrame.width * D[2] - .5 * O[2], A[3] = C.sourceFrame.height * D[3] - .5 * O[3], C.legacy) {
			let _ = E.filterArea;
			_[0] = C.destinationFrame.width, _[1] = C.destinationFrame.height, _[2] = C.sourceFrame.x, _[3] = C.sourceFrame.y, E.filterClamp = E.inputClamp;
		}
		this.globalUniforms.update();
		let P = _[_.length - 1];
		if (this.renderer.framebuffer.blit(), T.length === 1) T[0].apply(this, C.renderTexture, P.renderTexture, CLEAR_MODES.BLEND, C), this.returnFilterTexture(C.renderTexture);
		else {
			let _ = C.renderTexture, E = this.getOptimalFilterTexture(_.width, _.height, C.resolution);
			E.filterFrame = _.filterFrame;
			let D = 0;
			for (D = 0; D < T.length - 1; ++D) {
				D === 1 && C.multisample > 1 && (E = this.getOptimalFilterTexture(_.width, _.height, C.resolution), E.filterFrame = _.filterFrame), T[D].apply(this, _, E, CLEAR_MODES.CLEAR, C);
				let O = _;
				_ = E, E = O;
			}
			T[D].apply(this, _, P.renderTexture, CLEAR_MODES.BLEND, C), D > 1 && C.multisample > 1 && this.returnFilterTexture(C.renderTexture), this.returnFilterTexture(_), this.returnFilterTexture(E);
		}
		C.clear(), this.statePool.push(C);
	}
	bindAndClear(_, C = CLEAR_MODES.CLEAR) {
		let { renderTexture: T, state: E } = this.renderer;
		if (_ === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, _?.filterFrame) {
			let C = this.tempRect;
			C.x = 0, C.y = 0, C.width = _.filterFrame.width, C.height = _.filterFrame.height, T.bind(_, _.filterFrame, C);
		} else _ === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.renderTexture.bind(_, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame) : T.bind(_);
		let D = E.stateId & 1 || this.forceClear;
		(C === CLEAR_MODES.CLEAR || C === CLEAR_MODES.BLIT && D) && this.renderer.framebuffer.clear(0, 0, 0, 0);
	}
	applyFilter(_, C, T, E) {
		let D = this.renderer;
		D.state.set(_.state), this.bindAndClear(T, E), _.uniforms.uSampler = C, _.uniforms.filterGlobals = this.globalUniforms, D.shader.bind(_), _.legacy = !!_.program.attributeData.aTextureCoord, _.legacy ? (this.quadUv.map(C._frame, C.filterFrame), D.geometry.bind(this.quadUv), D.geometry.draw(DRAW_MODES.TRIANGLES)) : (D.geometry.bind(this.quad), D.geometry.draw(DRAW_MODES.TRIANGLE_STRIP));
	}
	calculateSpriteMatrix(_, C) {
		let { sourceFrame: T, destinationFrame: E } = this.activeState, { orig: D } = C._texture, O = _.set(E.width, 0, 0, E.height, T.x, T.y), A = C.worldTransform.copyTo(Matrix.TEMP_MATRIX);
		return A.invert(), O.prepend(A), O.scale(1 / D.width, 1 / D.height), O.translate(C.anchor.x, C.anchor.y), O;
	}
	destroy() {
		this.renderer = null, this.texturePool.clear(!1);
	}
	getOptimalFilterTexture(_, C, T = 1, E = MSAA_QUALITY.NONE) {
		return this.texturePool.getOptimalTexture(_, C, T, E);
	}
	getFilterTexture(_, C, T) {
		if (typeof _ == "number") {
			let T = _;
			_ = C, C = T;
		}
		_ ||= this.activeState.renderTexture;
		let E = this.texturePool.getOptimalTexture(_.width, _.height, C || _.resolution, T || MSAA_QUALITY.NONE);
		return E.filterFrame = _.filterFrame, E;
	}
	returnFilterTexture(_) {
		this.texturePool.returnTexture(_);
	}
	emptyPool() {
		this.texturePool.clear(!0);
	}
	resize() {
		this.texturePool.setScreenSize(this.renderer.view);
	}
	transformAABB(_, C) {
		let T = tempPoints[0], E = tempPoints[1], D = tempPoints[2], O = tempPoints[3];
		T.set(C.left, C.top), E.set(C.left, C.bottom), D.set(C.right, C.top), O.set(C.right, C.bottom), _.apply(T, T), _.apply(E, E), _.apply(D, D), _.apply(O, O);
		let A = Math.min(T.x, E.x, D.x, O.x), P = Math.min(T.y, E.y, D.y, O.y), F = Math.max(T.x, E.x, D.x, O.x), I = Math.max(T.y, E.y, D.y, O.y);
		C.x = A, C.y = P, C.width = F - A, C.height = I - P;
	}
	roundFrame(_, C, T, E, D) {
		if (!(_.width <= 0 || _.height <= 0 || T.width <= 0 || T.height <= 0)) {
			if (D) {
				let { a: _, b: C, c: T, d: E } = D;
				if ((Math.abs(C) > 1e-4 || Math.abs(T) > 1e-4) && (Math.abs(_) > 1e-4 || Math.abs(E) > 1e-4)) return;
			}
			D = D ? tempMatrix$1.copyFrom(D) : tempMatrix$1.identity(), D.translate(-T.x, -T.y).scale(E.width / T.width, E.height / T.height).translate(E.x, E.y), this.transformAABB(D, _), _.ceil(C), this.transformAABB(D.invert(), _);
		}
	}
};
FilterSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "filter"
}, extensions.add(FilterSystem);
var GLFramebuffer = class {
	constructor(_) {
		this.framebuffer = _, this.stencil = null, this.dirtyId = -1, this.dirtyFormat = -1, this.dirtySize = -1, this.multisample = MSAA_QUALITY.NONE, this.msaaBuffer = null, this.blitFramebuffer = null, this.mipLevel = 0;
	}
}, tempRectangle = new Rectangle(), FramebufferSystem = class {
	constructor(_) {
		this.renderer = _, this.managedFramebuffers = [], this.unknownFramebuffer = new Framebuffer(10, 10), this.msaaSamples = null;
	}
	contextChange() {
		this.disposeAll(!0);
		let _ = this.gl = this.renderer.gl;
		if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new Rectangle(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
			let C = this.renderer.context.extensions.drawBuffers, E = this.renderer.context.extensions.depthTexture;
			settings.PREFER_ENV === ENV.WEBGL_LEGACY && (C = null, E = null), C ? _.drawBuffers = (_) => C.drawBuffersWEBGL(_) : (this.hasMRT = !1, _.drawBuffers = () => {}), E || (this.writeDepthTexture = !1);
		} else this.msaaSamples = _.getInternalformatParameter(_.RENDERBUFFER, _.RGBA8, _.SAMPLES);
	}
	bind(_, C, T = 0) {
		let { gl: E } = this;
		if (_) {
			let D = _.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(_);
			this.current !== _ && (this.current = _, E.bindFramebuffer(E.FRAMEBUFFER, D.framebuffer)), D.mipLevel !== T && (_.dirtyId++, _.dirtyFormat++, D.mipLevel = T), D.dirtyId !== _.dirtyId && (D.dirtyId = _.dirtyId, D.dirtyFormat === _.dirtyFormat ? D.dirtySize !== _.dirtySize && (D.dirtySize = _.dirtySize, this.resizeFramebuffer(_)) : (D.dirtyFormat = _.dirtyFormat, D.dirtySize = _.dirtySize, this.updateFramebuffer(_, T)));
			for (let C = 0; C < _.colorTextures.length; C++) {
				let T = _.colorTextures[C];
				this.renderer.texture.unbind(T.parentTextureArray || T);
			}
			if (_.depthTexture && this.renderer.texture.unbind(_.depthTexture), C) {
				let _ = C.width >> T, E = C.height >> T, D = _ / C.width;
				this.setViewport(C.x * D, C.y * D, _, E);
			} else {
				let C = _.width >> T, E = _.height >> T;
				this.setViewport(0, 0, C, E);
			}
		} else this.current && (this.current = null, E.bindFramebuffer(E.FRAMEBUFFER, null)), C ? this.setViewport(C.x, C.y, C.width, C.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
	}
	setViewport(_, C, T, E) {
		let D = this.viewport;
		_ = Math.round(_), C = Math.round(C), T = Math.round(T), E = Math.round(E), (D.width !== T || D.height !== E || D.x !== _ || D.y !== C) && (D.x = _, D.y = C, D.width = T, D.height = E, this.gl.viewport(_, C, T, E));
	}
	get size() {
		return this.current ? {
			x: 0,
			y: 0,
			width: this.current.width,
			height: this.current.height
		} : {
			x: 0,
			y: 0,
			width: this.renderer.width,
			height: this.renderer.height
		};
	}
	clear(_, C, T, E, O = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH) {
		let { gl: A } = this;
		A.clearColor(_, C, T, E), A.clear(O);
	}
	initFramebuffer(_) {
		let { gl: C } = this, T = new GLFramebuffer(C.createFramebuffer());
		return T.multisample = this.detectSamples(_.multisample), _.glFramebuffers[this.CONTEXT_UID] = T, this.managedFramebuffers.push(_), _.disposeRunner.add(this), T;
	}
	resizeFramebuffer(_) {
		let { gl: C } = this, T = _.glFramebuffers[this.CONTEXT_UID];
		if (T.stencil) {
			C.bindRenderbuffer(C.RENDERBUFFER, T.stencil);
			let E;
			E = this.renderer.context.webGLVersion === 1 ? C.DEPTH_STENCIL : _.depth && _.stencil ? C.DEPTH24_STENCIL8 : _.depth ? C.DEPTH_COMPONENT24 : C.STENCIL_INDEX8, T.msaaBuffer ? C.renderbufferStorageMultisample(C.RENDERBUFFER, T.multisample, E, _.width, _.height) : C.renderbufferStorage(C.RENDERBUFFER, E, _.width, _.height);
		}
		let E = _.colorTextures, D = E.length;
		C.drawBuffers || (D = Math.min(D, 1));
		for (let O = 0; O < D; O++) {
			let D = E[O], A = D.parentTextureArray || D;
			this.renderer.texture.bind(A, 0), O === 0 && T.msaaBuffer && (C.bindRenderbuffer(C.RENDERBUFFER, T.msaaBuffer), C.renderbufferStorageMultisample(C.RENDERBUFFER, T.multisample, A._glTextures[this.CONTEXT_UID].internalFormat, _.width, _.height));
		}
		_.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(_.depthTexture, 0);
	}
	updateFramebuffer(_, C) {
		let { gl: T } = this, E = _.glFramebuffers[this.CONTEXT_UID], D = _.colorTextures, O = D.length;
		T.drawBuffers || (O = Math.min(O, 1)), E.multisample > 1 && this.canMultisampleFramebuffer(_) ? E.msaaBuffer = E.msaaBuffer || T.createRenderbuffer() : E.msaaBuffer && (T.deleteRenderbuffer(E.msaaBuffer), E.msaaBuffer = null, E.blitFramebuffer &&= (E.blitFramebuffer.dispose(), null));
		let A = [];
		for (let P = 0; P < O; P++) {
			let O = D[P], F = O.parentTextureArray || O;
			this.renderer.texture.bind(F, 0), P === 0 && E.msaaBuffer ? (T.bindRenderbuffer(T.RENDERBUFFER, E.msaaBuffer), T.renderbufferStorageMultisample(T.RENDERBUFFER, E.multisample, F._glTextures[this.CONTEXT_UID].internalFormat, _.width, _.height), T.framebufferRenderbuffer(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0, T.RENDERBUFFER, E.msaaBuffer)) : (T.framebufferTexture2D(T.FRAMEBUFFER, T.COLOR_ATTACHMENT0 + P, O.target, F._glTextures[this.CONTEXT_UID].texture, C), A.push(T.COLOR_ATTACHMENT0 + P));
		}
		if (A.length > 1 && T.drawBuffers(A), _.depthTexture && this.writeDepthTexture) {
			let E = _.depthTexture;
			this.renderer.texture.bind(E, 0), T.framebufferTexture2D(T.FRAMEBUFFER, T.DEPTH_ATTACHMENT, T.TEXTURE_2D, E._glTextures[this.CONTEXT_UID].texture, C);
		}
		if ((_.stencil || _.depth) && !(_.depthTexture && this.writeDepthTexture)) {
			E.stencil = E.stencil || T.createRenderbuffer();
			let C, D;
			this.renderer.context.webGLVersion === 1 ? (C = T.DEPTH_STENCIL_ATTACHMENT, D = T.DEPTH_STENCIL) : _.depth && _.stencil ? (C = T.DEPTH_STENCIL_ATTACHMENT, D = T.DEPTH24_STENCIL8) : _.depth ? (C = T.DEPTH_ATTACHMENT, D = T.DEPTH_COMPONENT24) : (C = T.STENCIL_ATTACHMENT, D = T.STENCIL_INDEX8), T.bindRenderbuffer(T.RENDERBUFFER, E.stencil), E.msaaBuffer ? T.renderbufferStorageMultisample(T.RENDERBUFFER, E.multisample, D, _.width, _.height) : T.renderbufferStorage(T.RENDERBUFFER, D, _.width, _.height), T.framebufferRenderbuffer(T.FRAMEBUFFER, C, T.RENDERBUFFER, E.stencil);
		} else E.stencil &&= (T.deleteRenderbuffer(E.stencil), null);
	}
	canMultisampleFramebuffer(_) {
		return this.renderer.context.webGLVersion !== 1 && _.colorTextures.length <= 1 && !_.depthTexture;
	}
	detectSamples(_) {
		let { msaaSamples: C } = this, T = MSAA_QUALITY.NONE;
		if (_ <= 1 || C === null) return T;
		for (let E = 0; E < C.length; E++) if (C[E] <= _) {
			T = C[E];
			break;
		}
		return T === 1 && (T = MSAA_QUALITY.NONE), T;
	}
	blit(_, C, T) {
		let { current: E, renderer: D, gl: O, CONTEXT_UID: A } = this;
		if (D.context.webGLVersion !== 2 || !E) return;
		let P = E.glFramebuffers[A];
		if (!P) return;
		if (!_) {
			if (!P.msaaBuffer) return;
			let C = E.colorTextures[0];
			if (!C) return;
			P.blitFramebuffer || (P.blitFramebuffer = new Framebuffer(E.width, E.height), P.blitFramebuffer.addColorTexture(0, C)), _ = P.blitFramebuffer, _.colorTextures[0] !== C && (_.colorTextures[0] = C, _.dirtyId++, _.dirtyFormat++), (_.width !== E.width || _.height !== E.height) && (_.width = E.width, _.height = E.height, _.dirtyId++, _.dirtySize++);
		}
		C || (C = tempRectangle, C.width = E.width, C.height = E.height), T ||= C;
		let F = C.width === T.width && C.height === T.height;
		this.bind(_), O.bindFramebuffer(O.READ_FRAMEBUFFER, P.framebuffer), O.blitFramebuffer(C.left, C.top, C.right, C.bottom, T.left, T.top, T.right, T.bottom, O.COLOR_BUFFER_BIT, F ? O.NEAREST : O.LINEAR), O.bindFramebuffer(O.READ_FRAMEBUFFER, _.glFramebuffers[this.CONTEXT_UID].framebuffer);
	}
	disposeFramebuffer(_, C) {
		let T = _.glFramebuffers[this.CONTEXT_UID], E = this.gl;
		if (!T) return;
		delete _.glFramebuffers[this.CONTEXT_UID];
		let D = this.managedFramebuffers.indexOf(_);
		D >= 0 && this.managedFramebuffers.splice(D, 1), _.disposeRunner.remove(this), C || (E.deleteFramebuffer(T.framebuffer), T.msaaBuffer && E.deleteRenderbuffer(T.msaaBuffer), T.stencil && E.deleteRenderbuffer(T.stencil)), T.blitFramebuffer && this.disposeFramebuffer(T.blitFramebuffer, C);
	}
	disposeAll(_) {
		let C = this.managedFramebuffers;
		this.managedFramebuffers = [];
		for (let T = 0; T < C.length; T++) this.disposeFramebuffer(C[T], _);
	}
	forceStencil() {
		let _ = this.current;
		if (!_) return;
		let C = _.glFramebuffers[this.CONTEXT_UID];
		if (!C || C.stencil && _.stencil) return;
		_.stencil = !0;
		let T = _.width, E = _.height, D = this.gl, O = C.stencil = D.createRenderbuffer();
		D.bindRenderbuffer(D.RENDERBUFFER, O);
		let A, P;
		this.renderer.context.webGLVersion === 1 ? (A = D.DEPTH_STENCIL_ATTACHMENT, P = D.DEPTH_STENCIL) : _.depth ? (A = D.DEPTH_STENCIL_ATTACHMENT, P = D.DEPTH24_STENCIL8) : (A = D.STENCIL_ATTACHMENT, P = D.STENCIL_INDEX8), C.msaaBuffer ? D.renderbufferStorageMultisample(D.RENDERBUFFER, C.multisample, P, T, E) : D.renderbufferStorage(D.RENDERBUFFER, P, T, E), D.framebufferRenderbuffer(D.FRAMEBUFFER, A, D.RENDERBUFFER, O);
	}
	reset() {
		this.current = this.unknownFramebuffer, this.viewport = new Rectangle();
	}
	destroy() {
		this.renderer = null;
	}
};
FramebufferSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "framebuffer"
}, extensions.add(FramebufferSystem);
var byteSizeMap = {
	5126: 4,
	5123: 2,
	5121: 1
}, GeometrySystem = class {
	constructor(_) {
		this.renderer = _, this._activeGeometry = null, this._activeVao = null, this.hasVao = !0, this.hasInstance = !0, this.canUseUInt32ElementIndex = !1, this.managedGeometries = {};
	}
	contextChange() {
		this.disposeAll(!0);
		let _ = this.gl = this.renderer.gl, C = this.renderer.context;
		if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, C.webGLVersion !== 2) {
			let C = this.renderer.context.extensions.vertexArrayObject;
			settings.PREFER_ENV === ENV.WEBGL_LEGACY && (C = null), C ? (_.createVertexArray = () => C.createVertexArrayOES(), _.bindVertexArray = (_) => C.bindVertexArrayOES(_), _.deleteVertexArray = (_) => C.deleteVertexArrayOES(_)) : (this.hasVao = !1, _.createVertexArray = () => null, _.bindVertexArray = () => null, _.deleteVertexArray = () => null);
		}
		if (C.webGLVersion !== 2) {
			let C = _.getExtension("ANGLE_instanced_arrays");
			C ? (_.vertexAttribDivisor = (_, T) => C.vertexAttribDivisorANGLE(_, T), _.drawElementsInstanced = (_, T, E, D, O) => C.drawElementsInstancedANGLE(_, T, E, D, O), _.drawArraysInstanced = (_, T, E, D) => C.drawArraysInstancedANGLE(_, T, E, D)) : this.hasInstance = !1;
		}
		this.canUseUInt32ElementIndex = C.webGLVersion === 2 || !!C.extensions.uint32ElementIndex;
	}
	bind(_, C) {
		C ||= this.renderer.shader.shader;
		let { gl: T } = this, E = _.glVertexArrayObjects[this.CONTEXT_UID], D = !1;
		E || (this.managedGeometries[_.id] = _, _.disposeRunner.add(this), _.glVertexArrayObjects[this.CONTEXT_UID] = E = {}, D = !0);
		let O = E[C.program.id] || this.initGeometryVao(_, C, D);
		this._activeGeometry = _, this._activeVao !== O && (this._activeVao = O, this.hasVao ? T.bindVertexArray(O) : this.activateVao(_, C.program)), this.updateBuffers();
	}
	reset() {
		this.unbind();
	}
	updateBuffers() {
		let _ = this._activeGeometry, C = this.renderer.buffer;
		for (let T = 0; T < _.buffers.length; T++) {
			let E = _.buffers[T];
			C.update(E);
		}
	}
	checkCompatibility(_, C) {
		let T = _.attributes, E = C.attributeData;
		for (let _ in E) if (!T[_]) throw Error(`shader and geometry incompatible, geometry missing the "${_}" attribute`);
	}
	getSignature(_, C) {
		let T = _.attributes, E = C.attributeData, D = ["g", _.id];
		for (let _ in T) E[_] && D.push(_, E[_].location);
		return D.join("-");
	}
	initGeometryVao(_, C, T = !0) {
		let E = this.gl, D = this.CONTEXT_UID, O = this.renderer.buffer, A = C.program;
		A.glPrograms[D] || this.renderer.shader.generateProgram(C), this.checkCompatibility(_, A);
		let P = this.getSignature(_, A), F = _.glVertexArrayObjects[this.CONTEXT_UID], I = F[P];
		if (I) return F[A.id] = I, I;
		let L = _.buffers, R = _.attributes, z = {}, B = {};
		for (let _ in L) z[_] = 0, B[_] = 0;
		for (let _ in R) !R[_].size && A.attributeData[_] ? R[_].size = A.attributeData[_].size : R[_].size || console.warn(`PIXI Geometry attribute '${_}' size cannot be determined (likely the bound shader does not have the attribute)`), z[R[_].buffer] += R[_].size * byteSizeMap[R[_].type];
		for (let _ in R) {
			let C = R[_], T = C.size;
			C.stride === void 0 && (z[C.buffer] === T * byteSizeMap[C.type] ? C.stride = 0 : C.stride = z[C.buffer]), C.start === void 0 && (C.start = B[C.buffer], B[C.buffer] += T * byteSizeMap[C.type]);
		}
		I = E.createVertexArray(), E.bindVertexArray(I);
		for (let _ = 0; _ < L.length; _++) {
			let C = L[_];
			O.bind(C), T && C._glBuffers[D].refCount++;
		}
		return this.activateVao(_, A), F[A.id] = I, F[P] = I, E.bindVertexArray(null), O.unbind(BUFFER_TYPE.ARRAY_BUFFER), I;
	}
	disposeGeometry(_, C) {
		if (!this.managedGeometries[_.id]) return;
		delete this.managedGeometries[_.id];
		let T = _.glVertexArrayObjects[this.CONTEXT_UID], E = this.gl, D = _.buffers, O = this.renderer?.buffer;
		if (_.disposeRunner.remove(this), T) {
			if (O) for (let _ = 0; _ < D.length; _++) {
				let T = D[_]._glBuffers[this.CONTEXT_UID];
				T && (T.refCount--, T.refCount === 0 && !C && O.dispose(D[_], C));
			}
			if (!C) {
				for (let _ in T) if (_[0] === "g") {
					let C = T[_];
					this._activeVao === C && this.unbind(), E.deleteVertexArray(C);
				}
			}
			delete _.glVertexArrayObjects[this.CONTEXT_UID];
		}
	}
	disposeAll(_) {
		let C = Object.keys(this.managedGeometries);
		for (let T = 0; T < C.length; T++) this.disposeGeometry(this.managedGeometries[C[T]], _);
	}
	activateVao(_, C) {
		let T = this.gl, E = this.CONTEXT_UID, D = this.renderer.buffer, O = _.buffers, A = _.attributes;
		_.indexBuffer && D.bind(_.indexBuffer);
		let P = null;
		for (let _ in A) {
			let F = A[_], I = O[F.buffer], L = I._glBuffers[E];
			if (C.attributeData[_]) {
				P !== L && (D.bind(I), P = L);
				let E = C.attributeData[_].location;
				if (T.enableVertexAttribArray(E), T.vertexAttribPointer(E, F.size, F.type || T.FLOAT, F.normalized, F.stride, F.start), F.instance) if (this.hasInstance) T.vertexAttribDivisor(E, F.divisor);
				else throw Error("geometry error, GPU Instancing is not supported on this device");
			}
		}
	}
	draw(_, C, T, E) {
		let { gl: D } = this, O = this._activeGeometry;
		if (O.indexBuffer) {
			let A = O.indexBuffer.data.BYTES_PER_ELEMENT, P = A === 2 ? D.UNSIGNED_SHORT : D.UNSIGNED_INT;
			A === 2 || A === 4 && this.canUseUInt32ElementIndex ? O.instanced ? D.drawElementsInstanced(_, C || O.indexBuffer.data.length, P, (T || 0) * A, E || 1) : D.drawElements(_, C || O.indexBuffer.data.length, P, (T || 0) * A) : console.warn("unsupported index buffer type: uint32");
		} else O.instanced ? D.drawArraysInstanced(_, T, C || O.getSize(), E || 1) : D.drawArrays(_, T, C || O.getSize());
		return this;
	}
	unbind() {
		this.gl.bindVertexArray(null), this._activeVao = null, this._activeGeometry = null;
	}
	destroy() {
		this.renderer = null;
	}
};
GeometrySystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "geometry"
}, extensions.add(GeometrySystem);
var tempMat = new Matrix(), TextureMatrix = class {
	constructor(_, C) {
		this._texture = _, this.mapCoord = new Matrix(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, this.clampMargin = typeof C > "u" ? .5 : C, this.isSimple = !1;
	}
	get texture() {
		return this._texture;
	}
	set texture(_) {
		this._texture = _, this._textureID = -1;
	}
	multiplyUvs(_, C) {
		C === void 0 && (C = _);
		let T = this.mapCoord;
		for (let E = 0; E < _.length; E += 2) {
			let D = _[E], O = _[E + 1];
			C[E] = D * T.a + O * T.c + T.tx, C[E + 1] = D * T.b + O * T.d + T.ty;
		}
		return C;
	}
	update(_) {
		let C = this._texture;
		if (!C || !C.valid || !_ && this._textureID === C._updateID) return !1;
		this._textureID = C._updateID, this._updateID++;
		let T = C._uvs;
		this.mapCoord.set(T.x1 - T.x0, T.y1 - T.y0, T.x3 - T.x0, T.y3 - T.y0, T.x0, T.y0);
		let E = C.orig, D = C.trim;
		D && (tempMat.set(E.width / D.width, 0, 0, E.height / D.height, -D.x / D.width, -D.y / D.height), this.mapCoord.append(tempMat));
		let O = C.baseTexture, A = this.uClampFrame, P = this.clampMargin / O.resolution, F = this.clampOffset;
		return A[0] = (C._frame.x + P + F) / O.width, A[1] = (C._frame.y + P + F) / O.height, A[2] = (C._frame.x + C._frame.width - P + F) / O.width, A[3] = (C._frame.y + C._frame.height - P + F) / O.height, this.uClampOffset[0] = F / O.realWidth, this.uClampOffset[1] = F / O.realHeight, this.isSimple = C._frame.width === O.width && C._frame.height === O.height && C.rotate === 0, !0;
	}
}, fragment = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n", vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", SpriteMaskFilter = class extends Filter {
	constructor(_, C, T) {
		let E = null;
		typeof _ != "string" && C === void 0 && T === void 0 && (E = _, _ = void 0, C = void 0, T = void 0), super(_ || vertex, C || fragment, T), this.maskSprite = E, this.maskMatrix = new Matrix();
	}
	get maskSprite() {
		return this._maskSprite;
	}
	set maskSprite(_) {
		this._maskSprite = _, this._maskSprite && (this._maskSprite.renderable = !1);
	}
	apply(_, C, T, E) {
		let D = this._maskSprite, O = D._texture;
		O.valid && (O.uvMatrix ||= new TextureMatrix(O, 0), O.uvMatrix.update(), this.uniforms.npmAlpha = O.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = O, this.uniforms.otherMatrix = _.calculateSpriteMatrix(this.maskMatrix, D).prepend(O.uvMatrix.mapCoord), this.uniforms.alpha = D.worldAlpha, this.uniforms.maskClamp = O.uvMatrix.uClampFrame, _.applyFilter(this, C, T, E));
	}
}, MaskData = class {
	constructor(_ = null) {
		this.type = MASK_TYPES.NONE, this.autoDetect = !0, this.maskObject = _ || null, this.pooled = !1, this.isMaskData = !0, this.resolution = null, this.multisample = Filter.defaultMultisample, this.enabled = !0, this.colorMask = 15, this._filters = null, this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null, this._scissorRectLocal = null, this._colorMask = 15, this._target = null;
	}
	get filter() {
		return this._filters ? this._filters[0] : null;
	}
	set filter(_) {
		_ ? this._filters ? this._filters[0] = _ : this._filters = [_] : this._filters = null;
	}
	reset() {
		this.pooled && (this.maskObject = null, this.type = MASK_TYPES.NONE, this.autoDetect = !0), this._target = null, this._scissorRectLocal = null;
	}
	copyCountersOrReset(_) {
		_ ? (this._stencilCounter = _._stencilCounter, this._scissorCounter = _._scissorCounter, this._scissorRect = _._scissorRect) : (this._stencilCounter = 0, this._scissorCounter = 0, this._scissorRect = null);
	}
}, MaskSystem = class {
	constructor(_) {
		this.renderer = _, this.enableScissor = !0, this.alphaMaskPool = [], this.maskDataPool = [], this.maskStack = [], this.alphaMaskIndex = 0;
	}
	setMaskStack(_) {
		this.maskStack = _, this.renderer.scissor.setMaskStack(_), this.renderer.stencil.setMaskStack(_);
	}
	push(_, C) {
		let T = C;
		if (!T.isMaskData) {
			let _ = this.maskDataPool.pop() || new MaskData();
			_.pooled = !0, _.maskObject = C, T = _;
		}
		let E = this.maskStack.length === 0 ? null : this.maskStack[this.maskStack.length - 1];
		if (T.copyCountersOrReset(E), T._colorMask = E ? E._colorMask : 15, T.autoDetect && this.detect(T), T._target = _, T.type !== MASK_TYPES.SPRITE && this.maskStack.push(T), T.enabled) switch (T.type) {
			case MASK_TYPES.SCISSOR:
				this.renderer.scissor.push(T);
				break;
			case MASK_TYPES.STENCIL:
				this.renderer.stencil.push(T);
				break;
			case MASK_TYPES.SPRITE:
				T.copyCountersOrReset(null), this.pushSpriteMask(T);
				break;
			case MASK_TYPES.COLOR:
				this.pushColorMask(T);
				break;
			default: break;
		}
		T.type === MASK_TYPES.SPRITE && this.maskStack.push(T);
	}
	pop(_) {
		let C = this.maskStack.pop();
		if (!(!C || C._target !== _)) {
			if (C.enabled) switch (C.type) {
				case MASK_TYPES.SCISSOR:
					this.renderer.scissor.pop(C);
					break;
				case MASK_TYPES.STENCIL:
					this.renderer.stencil.pop(C.maskObject);
					break;
				case MASK_TYPES.SPRITE:
					this.popSpriteMask(C);
					break;
				case MASK_TYPES.COLOR:
					this.popColorMask(C);
					break;
				default: break;
			}
			if (C.reset(), C.pooled && this.maskDataPool.push(C), this.maskStack.length !== 0) {
				let _ = this.maskStack[this.maskStack.length - 1];
				_.type === MASK_TYPES.SPRITE && _._filters && (_._filters[0].maskSprite = _.maskObject);
			}
		}
	}
	detect(_) {
		let C = _.maskObject;
		C ? C.isSprite ? _.type = MASK_TYPES.SPRITE : this.enableScissor && this.renderer.scissor.testScissor(_) ? _.type = MASK_TYPES.SCISSOR : _.type = MASK_TYPES.STENCIL : _.type = MASK_TYPES.COLOR;
	}
	pushSpriteMask(_) {
		let { maskObject: C } = _, T = _._target, E = _._filters;
		E || (E = this.alphaMaskPool[this.alphaMaskIndex], E ||= this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()]), E[0].resolution = _.resolution, E[0].multisample = _.multisample, E[0].maskSprite = C;
		let D = T.filterArea;
		T.filterArea = C.getBounds(!0), this.renderer.filter.push(T, E), T.filterArea = D, _._filters || this.alphaMaskIndex++;
	}
	popSpriteMask(_) {
		this.renderer.filter.pop(), _._filters ? _._filters[0].maskSprite = null : (this.alphaMaskIndex--, this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null);
	}
	pushColorMask(_) {
		let C = _._colorMask, T = _._colorMask = C & _.colorMask;
		T !== C && this.renderer.gl.colorMask((T & 1) != 0, (T & 2) != 0, (T & 4) != 0, (T & 8) != 0);
	}
	popColorMask(_) {
		let C = _._colorMask, T = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
		T !== C && this.renderer.gl.colorMask((T & 1) != 0, (T & 2) != 0, (T & 4) != 0, (T & 8) != 0);
	}
	destroy() {
		this.renderer = null;
	}
};
MaskSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "mask"
}, extensions.add(MaskSystem);
var AbstractMaskSystem = class {
	constructor(_) {
		this.renderer = _, this.maskStack = [], this.glConst = 0;
	}
	getStackLength() {
		return this.maskStack.length;
	}
	setMaskStack(_) {
		let { gl: C } = this.renderer, T = this.getStackLength();
		this.maskStack = _;
		let E = this.getStackLength();
		E !== T && (E === 0 ? C.disable(this.glConst) : (C.enable(this.glConst), this._useCurrent()));
	}
	_useCurrent() {}
	destroy() {
		this.renderer = null, this.maskStack = null;
	}
}, tempMatrix = new Matrix(), rectPool = [], _ScissorSystem = class _ extends AbstractMaskSystem {
	constructor(_) {
		super(_), this.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
	}
	getStackLength() {
		let _ = this.maskStack[this.maskStack.length - 1];
		return _ ? _._scissorCounter : 0;
	}
	calcScissorRect(_) {
		if (_._scissorRectLocal) return;
		let C = _._scissorRect, { maskObject: T } = _, { renderer: E } = this, D = E.renderTexture, O = T.getBounds(!0, rectPool.pop() ?? new Rectangle());
		this.roundFrameToPixels(O, D.current ? D.current.resolution : E.resolution, D.sourceFrame, D.destinationFrame, E.projection.transform), C && O.fit(C), _._scissorRectLocal = O;
	}
	static isMatrixRotated(_) {
		if (!_) return !1;
		let { a: C, b: T, c: E, d: D } = _;
		return (Math.abs(T) > 1e-4 || Math.abs(E) > 1e-4) && (Math.abs(C) > 1e-4 || Math.abs(D) > 1e-4);
	}
	testScissor(C) {
		let { maskObject: T } = C;
		if (!T.isFastRect || !T.isFastRect() || _.isMatrixRotated(T.worldTransform) || _.isMatrixRotated(this.renderer.projection.transform)) return !1;
		this.calcScissorRect(C);
		let E = C._scissorRectLocal;
		return E.width > 0 && E.height > 0;
	}
	roundFrameToPixels(C, T, E, D, O) {
		_.isMatrixRotated(O) || (O = O ? tempMatrix.copyFrom(O) : tempMatrix.identity(), O.translate(-E.x, -E.y).scale(D.width / E.width, D.height / E.height).translate(D.x, D.y), this.renderer.filter.transformAABB(O, C), C.fit(D), C.x = Math.round(C.x * T), C.y = Math.round(C.y * T), C.width = Math.round(C.width * T), C.height = Math.round(C.height * T));
	}
	push(_) {
		_._scissorRectLocal || this.calcScissorRect(_);
		let { gl: C } = this.renderer;
		_._scissorRect || C.enable(C.SCISSOR_TEST), _._scissorCounter++, _._scissorRect = _._scissorRectLocal, this._useCurrent();
	}
	pop(_) {
		let { gl: C } = this.renderer;
		_ && rectPool.push(_._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : C.disable(C.SCISSOR_TEST);
	}
	_useCurrent() {
		let _ = this.maskStack[this.maskStack.length - 1]._scissorRect, C;
		C = this.renderer.renderTexture.current ? _.y : this.renderer.height - _.height - _.y, this.renderer.gl.scissor(_.x, C, _.width, _.height);
	}
};
_ScissorSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "scissor"
};
var ScissorSystem = _ScissorSystem;
extensions.add(ScissorSystem);
var StencilSystem = class extends AbstractMaskSystem {
	constructor(_) {
		super(_), this.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
	}
	getStackLength() {
		let _ = this.maskStack[this.maskStack.length - 1];
		return _ ? _._stencilCounter : 0;
	}
	push(_) {
		let C = _.maskObject, { gl: T } = this.renderer, E = _._stencilCounter;
		E === 0 && (this.renderer.framebuffer.forceStencil(), T.clearStencil(0), T.clear(T.STENCIL_BUFFER_BIT), T.enable(T.STENCIL_TEST)), _._stencilCounter++;
		let D = _._colorMask;
		D !== 0 && (_._colorMask = 0, T.colorMask(!1, !1, !1, !1)), T.stencilFunc(T.EQUAL, E, 4294967295), T.stencilOp(T.KEEP, T.KEEP, T.INCR), C.renderable = !0, C.render(this.renderer), this.renderer.batch.flush(), C.renderable = !1, D !== 0 && (_._colorMask = D, T.colorMask((D & 1) != 0, (D & 2) != 0, (D & 4) != 0, (D & 8) != 0)), this._useCurrent();
	}
	pop(_) {
		let C = this.renderer.gl;
		if (this.getStackLength() === 0) C.disable(C.STENCIL_TEST);
		else {
			let T = this.maskStack.length === 0 ? null : this.maskStack[this.maskStack.length - 1], E = T ? T._colorMask : 15;
			E !== 0 && (T._colorMask = 0, C.colorMask(!1, !1, !1, !1)), C.stencilOp(C.KEEP, C.KEEP, C.DECR), _.renderable = !0, _.render(this.renderer), this.renderer.batch.flush(), _.renderable = !1, E !== 0 && (T._colorMask = E, C.colorMask((E & 1) != 0, (E & 2) != 0, (E & 4) != 0, (E & 8) != 0)), this._useCurrent();
		}
	}
	_useCurrent() {
		let _ = this.renderer.gl;
		_.stencilFunc(_.EQUAL, this.getStackLength(), 4294967295), _.stencilOp(_.KEEP, _.KEEP, _.KEEP);
	}
};
StencilSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "stencil"
}, extensions.add(StencilSystem);
var PluginSystem = class {
	constructor(_) {
		this.renderer = _, this.plugins = {}, Object.defineProperties(this.plugins, {
			extract: {
				enumerable: !1,
				get() {
					return deprecation("7.0.0", "renderer.plugins.extract has moved to renderer.extract"), _.extract;
				}
			},
			prepare: {
				enumerable: !1,
				get() {
					return deprecation("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare"), _.prepare;
				}
			},
			interaction: {
				enumerable: !1,
				get() {
					return deprecation("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events"), _.events;
				}
			}
		});
	}
	init() {
		let _ = this.rendererPlugins;
		for (let C in _) this.plugins[C] = new _[C](this.renderer);
	}
	destroy() {
		for (let _ in this.plugins) this.plugins[_].destroy(), this.plugins[_] = null;
	}
};
PluginSystem.extension = {
	type: [ExtensionType.RendererSystem, ExtensionType.CanvasRendererSystem],
	name: "_plugin"
}, extensions.add(PluginSystem);
var ProjectionSystem = class {
	constructor(_) {
		this.renderer = _, this.destinationFrame = null, this.sourceFrame = null, this.defaultFrame = null, this.projectionMatrix = new Matrix(), this.transform = null;
	}
	update(_, C, T, E) {
		this.destinationFrame = _ || this.destinationFrame || this.defaultFrame, this.sourceFrame = C || this.sourceFrame || _, this.calculateProjection(this.destinationFrame, this.sourceFrame, T, E), this.transform && this.projectionMatrix.append(this.transform);
		let D = this.renderer;
		D.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix, D.globalUniforms.update(), D.shader.shader && D.shader.syncUniformGroup(D.shader.shader.uniforms.globals);
	}
	calculateProjection(_, C, T, E) {
		let D = this.projectionMatrix, O = E ? -1 : 1;
		D.identity(), D.a = 1 / C.width * 2, D.d = O * (1 / C.height * 2), D.tx = -1 - C.x * D.a, D.ty = -O - C.y * D.d;
	}
	setTransform(_) {}
	destroy() {
		this.renderer = null;
	}
};
ProjectionSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "projection"
}, extensions.add(ProjectionSystem);
var tempTransform = new Transform(), tempRect$1 = new Rectangle(), GenerateTextureSystem = class {
	constructor(_) {
		this.renderer = _, this._tempMatrix = new Matrix();
	}
	generateTexture(_, C) {
		let { region: T, ...E } = C || {}, D = T?.copyTo(tempRect$1) || _.getLocalBounds(tempRect$1, !0), O = E.resolution || this.renderer.resolution;
		D.width = Math.max(D.width, 1 / O), D.height = Math.max(D.height, 1 / O), E.width = D.width, E.height = D.height, E.resolution = O, E.multisample ??= this.renderer.multisample;
		let A = RenderTexture.create(E);
		this._tempMatrix.tx = -D.x, this._tempMatrix.ty = -D.y;
		let P = _.transform;
		return _.transform = tempTransform, this.renderer.render(_, {
			renderTexture: A,
			transform: this._tempMatrix,
			skipUpdateTransform: !!_.parent,
			blit: !0
		}), _.transform = P, A;
	}
	destroy() {}
};
GenerateTextureSystem.extension = {
	type: [ExtensionType.RendererSystem, ExtensionType.CanvasRendererSystem],
	name: "textureGenerator"
}, extensions.add(GenerateTextureSystem);
var tempRect = new Rectangle(), tempRect2 = new Rectangle(), RenderTextureSystem = class {
	constructor(_) {
		this.renderer = _, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new Rectangle(), this.destinationFrame = new Rectangle(), this.viewportFrame = new Rectangle();
	}
	contextChange() {
		let _ = this.renderer?.gl.getContextAttributes();
		this._rendererPremultipliedAlpha = !!(_ && _.alpha && _.premultipliedAlpha);
	}
	bind(_ = null, C, T) {
		let E = this.renderer;
		this.current = _;
		let D, O, A;
		_ ? (D = _.baseTexture, A = D.resolution, C ||= (tempRect.width = _.frame.width, tempRect.height = _.frame.height, tempRect), T ||= (tempRect2.x = _.frame.x, tempRect2.y = _.frame.y, tempRect2.width = C.width, tempRect2.height = C.height, tempRect2), O = D.framebuffer) : (A = E.resolution, C ||= (tempRect.width = E._view.screen.width, tempRect.height = E._view.screen.height, tempRect), T || (T = tempRect, T.width = C.width, T.height = C.height));
		let P = this.viewportFrame;
		P.x = T.x * A, P.y = T.y * A, P.width = T.width * A, P.height = T.height * A, _ || (P.y = E.view.height - (P.y + P.height)), P.ceil(), this.renderer.framebuffer.bind(O, P), this.renderer.projection.update(T, C, A, !O), _ ? this.renderer.mask.setMaskStack(D.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(C), this.destinationFrame.copyFrom(T);
	}
	clear(_, C) {
		let T = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, E = Color.shared.setValue(_ || T);
		(this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && E.premultiply(E.alpha);
		let D = this.destinationFrame, O = this.current ? this.current.baseTexture : this.renderer._view.screen, A = D.width !== O.width || D.height !== O.height;
		if (A) {
			let { x: _, y: C, width: T, height: E } = this.viewportFrame;
			_ = Math.round(_), C = Math.round(C), T = Math.round(T), E = Math.round(E), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(_, C, T, E);
		}
		this.renderer.framebuffer.clear(E.red, E.green, E.blue, E.alpha, C), A && this.renderer.scissor.pop();
	}
	resize() {
		this.bind(null);
	}
	reset() {
		this.bind(null);
	}
	destroy() {
		this.renderer = null;
	}
};
RenderTextureSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "renderTexture"
}, extensions.add(RenderTextureSystem);
var GLProgram = class {
	constructor(_, C) {
		this.program = _, this.uniformData = C, this.uniformGroups = {}, this.uniformDirtyGroups = {}, this.uniformBufferBindings = {};
	}
	destroy() {
		this.uniformData = null, this.uniformGroups = null, this.uniformDirtyGroups = null, this.uniformBufferBindings = null, this.program = null;
	}
};
function getAttributeData(_, C) {
	let T = {}, E = C.getProgramParameter(_, C.ACTIVE_ATTRIBUTES);
	for (let D = 0; D < E; D++) {
		let E = C.getActiveAttrib(_, D);
		if (E.name.startsWith("gl_")) continue;
		let O = mapType(C, E.type), A = {
			type: O,
			name: E.name,
			size: mapSize(O),
			location: C.getAttribLocation(_, E.name)
		};
		T[E.name] = A;
	}
	return T;
}
function getUniformData(_, C) {
	let T = {}, E = C.getProgramParameter(_, C.ACTIVE_UNIFORMS);
	for (let D = 0; D < E; D++) {
		let E = C.getActiveUniform(_, D), O = E.name.replace(/\[.*?\]$/, ""), A = !!E.name.match(/\[.*?\]$/), P = mapType(C, E.type);
		T[O] = {
			name: O,
			index: D,
			type: P,
			size: E.size,
			isArray: A,
			value: defaultValue(P, E.size)
		};
	}
	return T;
}
function generateProgram(_, C) {
	let T = compileShader(_, _.VERTEX_SHADER, C.vertexSrc), E = compileShader(_, _.FRAGMENT_SHADER, C.fragmentSrc), D = _.createProgram();
	_.attachShader(D, T), _.attachShader(D, E);
	let O = C.extra?.transformFeedbackVaryings;
	if (O && (typeof _.transformFeedbackVaryings == "function" ? _.transformFeedbackVaryings(D, O.names, O.bufferMode === "separate" ? _.SEPARATE_ATTRIBS : _.INTERLEAVED_ATTRIBS) : console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.")), _.linkProgram(D), _.getProgramParameter(D, _.LINK_STATUS) || logProgramError(_, D, T, E), C.attributeData = getAttributeData(D, _), C.uniformData = getUniformData(D, _), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(C.vertexSrc)) {
		let T = Object.keys(C.attributeData);
		T.sort((_, C) => _ > C ? 1 : -1);
		for (let E = 0; E < T.length; E++) C.attributeData[T[E]].location = E, _.bindAttribLocation(D, E, T[E]);
		_.linkProgram(D);
	}
	_.deleteShader(T), _.deleteShader(E);
	let A = {};
	for (let T in C.uniformData) {
		let E = C.uniformData[T];
		A[T] = {
			location: _.getUniformLocation(D, T),
			value: defaultValue(E.type, E.size)
		};
	}
	return new GLProgram(D, A);
}
function uboUpdate(_, C, T, E, D) {
	T.buffer.update(D);
}
var UBO_TO_SINGLE_SETTERS = {
	float: "\n        data[offset] = v;\n    ",
	vec2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n    ",
	vec3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n    ",
	vec4: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n        data[offset+3] = v[3];\n    ",
	mat2: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n\n        data[offset+4] = v[2];\n        data[offset+5] = v[3];\n    ",
	mat3: "\n        data[offset] = v[0];\n        data[offset+1] = v[1];\n        data[offset+2] = v[2];\n\n        data[offset + 4] = v[3];\n        data[offset + 5] = v[4];\n        data[offset + 6] = v[5];\n\n        data[offset + 8] = v[6];\n        data[offset + 9] = v[7];\n        data[offset + 10] = v[8];\n    ",
	mat4: "\n        for(var i = 0; i < 16; i++)\n        {\n            data[offset + i] = v[i];\n        }\n    "
}, GLSL_TO_STD40_SIZE = {
	float: 4,
	vec2: 8,
	vec3: 12,
	vec4: 16,
	int: 4,
	ivec2: 8,
	ivec3: 12,
	ivec4: 16,
	uint: 4,
	uvec2: 8,
	uvec3: 12,
	uvec4: 16,
	bool: 4,
	bvec2: 8,
	bvec3: 12,
	bvec4: 16,
	mat2: 32,
	mat3: 48,
	mat4: 64
};
function createUBOElements(_) {
	let C = _.map((_) => ({
		data: _,
		offset: 0,
		dataLen: 0,
		dirty: 0
	})), T = 0, E = 0, D = 0;
	for (let _ = 0; _ < C.length; _++) {
		let O = C[_];
		if (T = GLSL_TO_STD40_SIZE[O.data.type], O.data.size > 1 && (T = Math.max(T, 16) * O.data.size), O.dataLen = T, E % T !== 0 && E < 16) {
			let _ = E % T % 16;
			E += _, D += _;
		}
		E + T > 16 ? (D = Math.ceil(D / 16) * 16, O.offset = D, D += T, E = T) : (O.offset = D, E += T, D += T);
	}
	return D = Math.ceil(D / 16) * 16, {
		uboElements: C,
		size: D
	};
}
function getUBOData(_, C) {
	let T = [];
	for (let E in _) C[E] && T.push(C[E]);
	return T.sort((_, C) => _.index - C.index), T;
}
function generateUniformBufferSync(_, C) {
	if (!_.autoManage) return {
		size: 0,
		syncFunc: uboUpdate
	};
	let { uboElements: T, size: E } = createUBOElements(getUBOData(_.uniforms, C)), D = ["\n    var v = null;\n    var v2 = null;\n    var cv = null;\n    var t = 0;\n    var gl = renderer.gl\n    var index = 0;\n    var data = buffer.data;\n    "];
	for (let C = 0; C < T.length; C++) {
		let E = T[C], O = _.uniforms[E.data.name], A = E.data.name, P = !1;
		for (let _ = 0; _ < uniformParsers.length; _++) {
			let C = uniformParsers[_];
			if (C.codeUbo && C.test(E.data, O)) {
				D.push(`offset = ${E.offset / 4};`, uniformParsers[_].codeUbo(E.data.name, O)), P = !0;
				break;
			}
		}
		if (!P) if (E.data.size > 1) {
			let _ = mapSize(E.data.type), C = Math.max(GLSL_TO_STD40_SIZE[E.data.type] / 16, 1), T = _ / C, O = (4 - T % 4) % 4;
			D.push(`
                cv = ud.${A}.value;
                v = uv.${A};
                offset = ${E.offset / 4};

                t = 0;

                for(var i=0; i < ${E.data.size * C}; i++)
                {
                    for(var j = 0; j < ${T}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${O};
                }

                `);
		} else {
			let _ = UBO_TO_SINGLE_SETTERS[E.data.type];
			D.push(`
                cv = ud.${A}.value;
                v = uv.${A};
                offset = ${E.offset / 4};
                ${_};
                `);
		}
	}
	return D.push("\n       renderer.buffer.update(buffer);\n    "), {
		size: E,
		syncFunc: Function("ud", "uv", "renderer", "syncData", "buffer", D.join("\n"))
	};
}
var UID = 0, defaultSyncData = {
	textureCount: 0,
	uboCount: 0
}, ShaderSystem = class {
	constructor(_) {
		this.destroyed = !1, this.renderer = _, this.systemCheck(), this.gl = null, this.shader = null, this.program = null, this.cache = {}, this._uboCache = {}, this.id = UID++;
	}
	systemCheck() {
		if (!unsafeEvalSupported()) throw Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
	}
	contextChange(_) {
		this.gl = _, this.reset();
	}
	bind(_, C) {
		_.disposeRunner.add(this), _.uniforms.globals = this.renderer.globalUniforms;
		let T = _.program, E = T.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(_);
		return this.shader = _, this.program !== T && (this.program = T, this.gl.useProgram(E.program)), C || (defaultSyncData.textureCount = 0, defaultSyncData.uboCount = 0, this.syncUniformGroup(_.uniformGroup, defaultSyncData)), E;
	}
	setUniforms(_) {
		let C = this.shader.program, T = C.glPrograms[this.renderer.CONTEXT_UID];
		C.syncUniforms(T.uniformData, _, this.renderer);
	}
	syncUniformGroup(_, C) {
		let T = this.getGlProgram();
		(!_.static || _.dirtyId !== T.uniformDirtyGroups[_.id]) && (T.uniformDirtyGroups[_.id] = _.dirtyId, this.syncUniforms(_, T, C));
	}
	syncUniforms(_, C, T) {
		(_.syncUniforms[this.shader.program.id] || this.createSyncGroups(_))(C.uniformData, _.uniforms, this.renderer, T);
	}
	createSyncGroups(_) {
		let C = this.getSignature(_, this.shader.program.uniformData, "u");
		return this.cache[C] || (this.cache[C] = generateUniformsSync(_, this.shader.program.uniformData)), _.syncUniforms[this.shader.program.id] = this.cache[C], _.syncUniforms[this.shader.program.id];
	}
	syncUniformBufferGroup(_, C) {
		let T = this.getGlProgram();
		if (!_.static || _.dirtyId !== 0 || !T.uniformGroups[_.id]) {
			_.dirtyId = 0;
			let E = T.uniformGroups[_.id] || this.createSyncBufferGroup(_, T, C);
			_.buffer.update(), E(T.uniformData, _.uniforms, this.renderer, defaultSyncData, _.buffer);
		}
		this.renderer.buffer.bindBufferBase(_.buffer, T.uniformBufferBindings[C]);
	}
	createSyncBufferGroup(_, C, T) {
		let { gl: E } = this.renderer;
		this.renderer.buffer.bind(_.buffer);
		let D = this.gl.getUniformBlockIndex(C.program, T);
		C.uniformBufferBindings[T] = this.shader.uniformBindCount, E.uniformBlockBinding(C.program, D, this.shader.uniformBindCount), this.shader.uniformBindCount++;
		let O = this.getSignature(_, this.shader.program.uniformData, "ubo"), A = this._uboCache[O];
		if (A ||= this._uboCache[O] = generateUniformBufferSync(_, this.shader.program.uniformData), _.autoManage) {
			let C = new Float32Array(A.size / 4);
			_.buffer.update(C);
		}
		return C.uniformGroups[_.id] = A.syncFunc, C.uniformGroups[_.id];
	}
	getSignature(_, C, T) {
		let E = _.uniforms, D = [`${T}-`];
		for (let _ in E) D.push(_), C[_] && D.push(C[_].type);
		return D.join("-");
	}
	getGlProgram() {
		return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null;
	}
	generateProgram(_) {
		let C = this.gl, T = _.program, E = generateProgram(C, T);
		return T.glPrograms[this.renderer.CONTEXT_UID] = E, E;
	}
	reset() {
		this.program = null, this.shader = null;
	}
	disposeShader(_) {
		this.shader === _ && (this.shader = null);
	}
	destroy() {
		this.renderer = null, this.destroyed = !0;
	}
};
ShaderSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "shader"
}, extensions.add(ShaderSystem);
var StartupSystem = class {
	constructor(_) {
		this.renderer = _;
	}
	run(_) {
		let { renderer: C } = this;
		C.runners.init.emit(C.options), _.hello && console.log(`PixiJS 7.4.3 - ${C.rendererLogId} - https://pixijs.com`), C.resize(C.screen.width, C.screen.height);
	}
	destroy() {}
};
StartupSystem.defaultOptions = { hello: !1 }, StartupSystem.extension = {
	type: [ExtensionType.RendererSystem, ExtensionType.CanvasRendererSystem],
	name: "startup"
}, extensions.add(StartupSystem);
function mapWebGLBlendModesToPixi(_, C = []) {
	return C[BLEND_MODES.NORMAL] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.ADD] = [_.ONE, _.ONE], C[BLEND_MODES.MULTIPLY] = [
		_.DST_COLOR,
		_.ONE_MINUS_SRC_ALPHA,
		_.ONE,
		_.ONE_MINUS_SRC_ALPHA
	], C[BLEND_MODES.SCREEN] = [
		_.ONE,
		_.ONE_MINUS_SRC_COLOR,
		_.ONE,
		_.ONE_MINUS_SRC_ALPHA
	], C[BLEND_MODES.OVERLAY] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.DARKEN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.LIGHTEN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.COLOR_DODGE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.COLOR_BURN] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.HARD_LIGHT] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.SOFT_LIGHT] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.DIFFERENCE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.EXCLUSION] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.HUE] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.SATURATION] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.COLOR] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.LUMINOSITY] = [_.ONE, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.NONE] = [0, 0], C[BLEND_MODES.NORMAL_NPM] = [
		_.SRC_ALPHA,
		_.ONE_MINUS_SRC_ALPHA,
		_.ONE,
		_.ONE_MINUS_SRC_ALPHA
	], C[BLEND_MODES.ADD_NPM] = [
		_.SRC_ALPHA,
		_.ONE,
		_.ONE,
		_.ONE
	], C[BLEND_MODES.SCREEN_NPM] = [
		_.SRC_ALPHA,
		_.ONE_MINUS_SRC_COLOR,
		_.ONE,
		_.ONE_MINUS_SRC_ALPHA
	], C[BLEND_MODES.SRC_IN] = [_.DST_ALPHA, _.ZERO], C[BLEND_MODES.SRC_OUT] = [_.ONE_MINUS_DST_ALPHA, _.ZERO], C[BLEND_MODES.SRC_ATOP] = [_.DST_ALPHA, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.DST_OVER] = [_.ONE_MINUS_DST_ALPHA, _.ONE], C[BLEND_MODES.DST_IN] = [_.ZERO, _.SRC_ALPHA], C[BLEND_MODES.DST_OUT] = [_.ZERO, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.DST_ATOP] = [_.ONE_MINUS_DST_ALPHA, _.SRC_ALPHA], C[BLEND_MODES.XOR] = [_.ONE_MINUS_DST_ALPHA, _.ONE_MINUS_SRC_ALPHA], C[BLEND_MODES.SUBTRACT] = [
		_.ONE,
		_.ONE,
		_.ONE,
		_.ONE,
		_.FUNC_REVERSE_SUBTRACT,
		_.FUNC_ADD
	], C;
}
var BLEND = 0, OFFSET = 1, CULLING = 2, DEPTH_TEST = 3, WINDING = 4, DEPTH_MASK = 5, _StateSystem = class _ {
	constructor() {
		this.gl = null, this.stateId = 0, this.polygonOffset = 0, this.blendMode = BLEND_MODES.NONE, this._blendEq = !1, this.map = [], this.map[BLEND] = this.setBlend, this.map[OFFSET] = this.setOffset, this.map[CULLING] = this.setCullFace, this.map[DEPTH_TEST] = this.setDepthTest, this.map[WINDING] = this.setFrontFace, this.map[DEPTH_MASK] = this.setDepthMask, this.checks = [], this.defaultState = new State(), this.defaultState.blend = !0;
	}
	contextChange(_) {
		this.gl = _, this.blendModes = mapWebGLBlendModesToPixi(_), this.set(this.defaultState), this.reset();
	}
	set(_) {
		if (_ ||= this.defaultState, this.stateId !== _.data) {
			let C = this.stateId ^ _.data, T = 0;
			for (; C;) C & 1 && this.map[T].call(this, !!(_.data & 1 << T)), C >>= 1, T++;
			this.stateId = _.data;
		}
		for (let C = 0; C < this.checks.length; C++) this.checks[C](this, _);
	}
	forceState(_) {
		_ ||= this.defaultState;
		for (let C = 0; C < this.map.length; C++) this.map[C].call(this, !!(_.data & 1 << C));
		for (let C = 0; C < this.checks.length; C++) this.checks[C](this, _);
		this.stateId = _.data;
	}
	setBlend(C) {
		this.updateCheck(_.checkBlendMode, C), this.gl[C ? "enable" : "disable"](this.gl.BLEND);
	}
	setOffset(C) {
		this.updateCheck(_.checkPolygonOffset, C), this.gl[C ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
	}
	setDepthTest(_) {
		this.gl[_ ? "enable" : "disable"](this.gl.DEPTH_TEST);
	}
	setDepthMask(_) {
		this.gl.depthMask(_);
	}
	setCullFace(_) {
		this.gl[_ ? "enable" : "disable"](this.gl.CULL_FACE);
	}
	setFrontFace(_) {
		this.gl.frontFace(this.gl[_ ? "CW" : "CCW"]);
	}
	setBlendMode(_) {
		if (_ === this.blendMode) return;
		this.blendMode = _;
		let C = this.blendModes[_], T = this.gl;
		C.length === 2 ? T.blendFunc(C[0], C[1]) : T.blendFuncSeparate(C[0], C[1], C[2], C[3]), C.length === 6 ? (this._blendEq = !0, T.blendEquationSeparate(C[4], C[5])) : this._blendEq && (this._blendEq = !1, T.blendEquationSeparate(T.FUNC_ADD, T.FUNC_ADD));
	}
	setPolygonOffset(_, C) {
		this.gl.polygonOffset(_, C);
	}
	reset() {
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.forceState(this.defaultState), this._blendEq = !0, this.blendMode = -1, this.setBlendMode(0);
	}
	updateCheck(_, C) {
		let T = this.checks.indexOf(_);
		C && T === -1 ? this.checks.push(_) : !C && T !== -1 && this.checks.splice(T, 1);
	}
	static checkBlendMode(_, C) {
		_.setBlendMode(C.blendMode);
	}
	static checkPolygonOffset(_, C) {
		_.setPolygonOffset(1, C.polygonOffset);
	}
	destroy() {
		this.gl = null;
	}
};
_StateSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "state"
};
var StateSystem = _StateSystem;
extensions.add(StateSystem);
var SystemManager = class extends import_eventemitter3.default {
	constructor() {
		super(...arguments), this.runners = {}, this._systemsHash = {};
	}
	setup(_) {
		this.addRunners(..._.runners);
		let C = (_.priority ?? []).filter((C) => _.systems[C]), T = [...C, ...Object.keys(_.systems).filter((_) => !C.includes(_))];
		for (let C of T) this.addSystem(_.systems[C], C);
	}
	addRunners(..._) {
		_.forEach((_) => {
			this.runners[_] = new Runner(_);
		});
	}
	addSystem(_, C) {
		let T = new _(this);
		if (this[C]) throw Error(`Whoops! The name "${C}" is already in use`);
		for (let _ in this[C] = T, this._systemsHash[C] = T, this.runners) this.runners[_].add(T);
		return this;
	}
	emitWithCustomOptions(_, C) {
		let T = Object.keys(this._systemsHash);
		_.items.forEach((E) => {
			let D = T.find((_) => this._systemsHash[_] === E);
			E[_.name](C[D]);
		});
	}
	destroy() {
		Object.values(this.runners).forEach((_) => {
			_.destroy();
		}), this._systemsHash = {};
	}
}, _TextureGCSystem = class _ {
	constructor(C) {
		this.renderer = C, this.count = 0, this.checkCount = 0, this.maxIdle = _.defaultMaxIdle, this.checkCountMax = _.defaultCheckCountMax, this.mode = _.defaultMode;
	}
	postrender() {
		this.renderer.objectRenderer.renderingToScreen && (this.count++, this.mode !== GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())));
	}
	run() {
		let _ = this.renderer.texture, C = _.managedTextures, T = !1;
		for (let E = 0; E < C.length; E++) {
			let D = C[E];
			D.resource && this.count - D.touched > this.maxIdle && (_.destroyTexture(D, !0), C[E] = null, T = !0);
		}
		if (T) {
			let _ = 0;
			for (let T = 0; T < C.length; T++) C[T] !== null && (C[_++] = C[T]);
			C.length = _;
		}
	}
	unload(_) {
		let C = this.renderer.texture, T = _._texture;
		T && !T.framebuffer && C.destroyTexture(T);
		for (let C = _.children.length - 1; C >= 0; C--) this.unload(_.children[C]);
	}
	destroy() {
		this.renderer = null;
	}
};
_TextureGCSystem.defaultMode = GC_MODES.AUTO, _TextureGCSystem.defaultMaxIdle = 3600, _TextureGCSystem.defaultCheckCountMax = 600, _TextureGCSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "textureGC"
};
var TextureGCSystem = _TextureGCSystem;
extensions.add(TextureGCSystem);
var GLTexture = class {
	constructor(_) {
		this.texture = _, this.width = -1, this.height = -1, this.dirtyId = -1, this.dirtyStyleId = -1, this.mipmap = !1, this.wrapMode = 33071, this.type = TYPES.UNSIGNED_BYTE, this.internalFormat = FORMATS.RGBA, this.samplerType = 0;
	}
};
function mapInternalFormatToSamplerType(_) {
	let C;
	return C = "WebGL2RenderingContext" in globalThis && _ instanceof globalThis.WebGL2RenderingContext ? {
		[_.RGB]: SAMPLER_TYPES.FLOAT,
		[_.RGBA]: SAMPLER_TYPES.FLOAT,
		[_.ALPHA]: SAMPLER_TYPES.FLOAT,
		[_.LUMINANCE]: SAMPLER_TYPES.FLOAT,
		[_.LUMINANCE_ALPHA]: SAMPLER_TYPES.FLOAT,
		[_.R8]: SAMPLER_TYPES.FLOAT,
		[_.R8_SNORM]: SAMPLER_TYPES.FLOAT,
		[_.RG8]: SAMPLER_TYPES.FLOAT,
		[_.RG8_SNORM]: SAMPLER_TYPES.FLOAT,
		[_.RGB8]: SAMPLER_TYPES.FLOAT,
		[_.RGB8_SNORM]: SAMPLER_TYPES.FLOAT,
		[_.RGB565]: SAMPLER_TYPES.FLOAT,
		[_.RGBA4]: SAMPLER_TYPES.FLOAT,
		[_.RGB5_A1]: SAMPLER_TYPES.FLOAT,
		[_.RGBA8]: SAMPLER_TYPES.FLOAT,
		[_.RGBA8_SNORM]: SAMPLER_TYPES.FLOAT,
		[_.RGB10_A2]: SAMPLER_TYPES.FLOAT,
		[_.RGB10_A2UI]: SAMPLER_TYPES.FLOAT,
		[_.SRGB8]: SAMPLER_TYPES.FLOAT,
		[_.SRGB8_ALPHA8]: SAMPLER_TYPES.FLOAT,
		[_.R16F]: SAMPLER_TYPES.FLOAT,
		[_.RG16F]: SAMPLER_TYPES.FLOAT,
		[_.RGB16F]: SAMPLER_TYPES.FLOAT,
		[_.RGBA16F]: SAMPLER_TYPES.FLOAT,
		[_.R32F]: SAMPLER_TYPES.FLOAT,
		[_.RG32F]: SAMPLER_TYPES.FLOAT,
		[_.RGB32F]: SAMPLER_TYPES.FLOAT,
		[_.RGBA32F]: SAMPLER_TYPES.FLOAT,
		[_.R11F_G11F_B10F]: SAMPLER_TYPES.FLOAT,
		[_.RGB9_E5]: SAMPLER_TYPES.FLOAT,
		[_.R8I]: SAMPLER_TYPES.INT,
		[_.R8UI]: SAMPLER_TYPES.UINT,
		[_.R16I]: SAMPLER_TYPES.INT,
		[_.R16UI]: SAMPLER_TYPES.UINT,
		[_.R32I]: SAMPLER_TYPES.INT,
		[_.R32UI]: SAMPLER_TYPES.UINT,
		[_.RG8I]: SAMPLER_TYPES.INT,
		[_.RG8UI]: SAMPLER_TYPES.UINT,
		[_.RG16I]: SAMPLER_TYPES.INT,
		[_.RG16UI]: SAMPLER_TYPES.UINT,
		[_.RG32I]: SAMPLER_TYPES.INT,
		[_.RG32UI]: SAMPLER_TYPES.UINT,
		[_.RGB8I]: SAMPLER_TYPES.INT,
		[_.RGB8UI]: SAMPLER_TYPES.UINT,
		[_.RGB16I]: SAMPLER_TYPES.INT,
		[_.RGB16UI]: SAMPLER_TYPES.UINT,
		[_.RGB32I]: SAMPLER_TYPES.INT,
		[_.RGB32UI]: SAMPLER_TYPES.UINT,
		[_.RGBA8I]: SAMPLER_TYPES.INT,
		[_.RGBA8UI]: SAMPLER_TYPES.UINT,
		[_.RGBA16I]: SAMPLER_TYPES.INT,
		[_.RGBA16UI]: SAMPLER_TYPES.UINT,
		[_.RGBA32I]: SAMPLER_TYPES.INT,
		[_.RGBA32UI]: SAMPLER_TYPES.UINT,
		[_.DEPTH_COMPONENT16]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH_COMPONENT24]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH_COMPONENT32F]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH_STENCIL]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH24_STENCIL8]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH32F_STENCIL8]: SAMPLER_TYPES.FLOAT
	} : {
		[_.RGB]: SAMPLER_TYPES.FLOAT,
		[_.RGBA]: SAMPLER_TYPES.FLOAT,
		[_.ALPHA]: SAMPLER_TYPES.FLOAT,
		[_.LUMINANCE]: SAMPLER_TYPES.FLOAT,
		[_.LUMINANCE_ALPHA]: SAMPLER_TYPES.FLOAT,
		[_.DEPTH_STENCIL]: SAMPLER_TYPES.FLOAT
	}, C;
}
function mapTypeAndFormatToInternalFormat(_) {
	let C;
	return C = "WebGL2RenderingContext" in globalThis && _ instanceof globalThis.WebGL2RenderingContext ? {
		[TYPES.UNSIGNED_BYTE]: {
			[FORMATS.RGBA]: _.RGBA8,
			[FORMATS.RGB]: _.RGB8,
			[FORMATS.RG]: _.RG8,
			[FORMATS.RED]: _.R8,
			[FORMATS.RGBA_INTEGER]: _.RGBA8UI,
			[FORMATS.RGB_INTEGER]: _.RGB8UI,
			[FORMATS.RG_INTEGER]: _.RG8UI,
			[FORMATS.RED_INTEGER]: _.R8UI,
			[FORMATS.ALPHA]: _.ALPHA,
			[FORMATS.LUMINANCE]: _.LUMINANCE,
			[FORMATS.LUMINANCE_ALPHA]: _.LUMINANCE_ALPHA
		},
		[TYPES.BYTE]: {
			[FORMATS.RGBA]: _.RGBA8_SNORM,
			[FORMATS.RGB]: _.RGB8_SNORM,
			[FORMATS.RG]: _.RG8_SNORM,
			[FORMATS.RED]: _.R8_SNORM,
			[FORMATS.RGBA_INTEGER]: _.RGBA8I,
			[FORMATS.RGB_INTEGER]: _.RGB8I,
			[FORMATS.RG_INTEGER]: _.RG8I,
			[FORMATS.RED_INTEGER]: _.R8I
		},
		[TYPES.UNSIGNED_SHORT]: {
			[FORMATS.RGBA_INTEGER]: _.RGBA16UI,
			[FORMATS.RGB_INTEGER]: _.RGB16UI,
			[FORMATS.RG_INTEGER]: _.RG16UI,
			[FORMATS.RED_INTEGER]: _.R16UI,
			[FORMATS.DEPTH_COMPONENT]: _.DEPTH_COMPONENT16
		},
		[TYPES.SHORT]: {
			[FORMATS.RGBA_INTEGER]: _.RGBA16I,
			[FORMATS.RGB_INTEGER]: _.RGB16I,
			[FORMATS.RG_INTEGER]: _.RG16I,
			[FORMATS.RED_INTEGER]: _.R16I
		},
		[TYPES.UNSIGNED_INT]: {
			[FORMATS.RGBA_INTEGER]: _.RGBA32UI,
			[FORMATS.RGB_INTEGER]: _.RGB32UI,
			[FORMATS.RG_INTEGER]: _.RG32UI,
			[FORMATS.RED_INTEGER]: _.R32UI,
			[FORMATS.DEPTH_COMPONENT]: _.DEPTH_COMPONENT24
		},
		[TYPES.INT]: {
			[FORMATS.RGBA_INTEGER]: _.RGBA32I,
			[FORMATS.RGB_INTEGER]: _.RGB32I,
			[FORMATS.RG_INTEGER]: _.RG32I,
			[FORMATS.RED_INTEGER]: _.R32I
		},
		[TYPES.FLOAT]: {
			[FORMATS.RGBA]: _.RGBA32F,
			[FORMATS.RGB]: _.RGB32F,
			[FORMATS.RG]: _.RG32F,
			[FORMATS.RED]: _.R32F,
			[FORMATS.DEPTH_COMPONENT]: _.DEPTH_COMPONENT32F
		},
		[TYPES.HALF_FLOAT]: {
			[FORMATS.RGBA]: _.RGBA16F,
			[FORMATS.RGB]: _.RGB16F,
			[FORMATS.RG]: _.RG16F,
			[FORMATS.RED]: _.R16F
		},
		[TYPES.UNSIGNED_SHORT_5_6_5]: { [FORMATS.RGB]: _.RGB565 },
		[TYPES.UNSIGNED_SHORT_4_4_4_4]: { [FORMATS.RGBA]: _.RGBA4 },
		[TYPES.UNSIGNED_SHORT_5_5_5_1]: { [FORMATS.RGBA]: _.RGB5_A1 },
		[TYPES.UNSIGNED_INT_2_10_10_10_REV]: {
			[FORMATS.RGBA]: _.RGB10_A2,
			[FORMATS.RGBA_INTEGER]: _.RGB10_A2UI
		},
		[TYPES.UNSIGNED_INT_10F_11F_11F_REV]: { [FORMATS.RGB]: _.R11F_G11F_B10F },
		[TYPES.UNSIGNED_INT_5_9_9_9_REV]: { [FORMATS.RGB]: _.RGB9_E5 },
		[TYPES.UNSIGNED_INT_24_8]: { [FORMATS.DEPTH_STENCIL]: _.DEPTH24_STENCIL8 },
		[TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV]: { [FORMATS.DEPTH_STENCIL]: _.DEPTH32F_STENCIL8 }
	} : {
		[TYPES.UNSIGNED_BYTE]: {
			[FORMATS.RGBA]: _.RGBA,
			[FORMATS.RGB]: _.RGB,
			[FORMATS.ALPHA]: _.ALPHA,
			[FORMATS.LUMINANCE]: _.LUMINANCE,
			[FORMATS.LUMINANCE_ALPHA]: _.LUMINANCE_ALPHA
		},
		[TYPES.UNSIGNED_SHORT_5_6_5]: { [FORMATS.RGB]: _.RGB },
		[TYPES.UNSIGNED_SHORT_4_4_4_4]: { [FORMATS.RGBA]: _.RGBA },
		[TYPES.UNSIGNED_SHORT_5_5_5_1]: { [FORMATS.RGBA]: _.RGBA }
	}, C;
}
var TextureSystem = class {
	constructor(_) {
		this.renderer = _, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new BaseTexture(), this.hasIntegerTextures = !1;
	}
	contextChange() {
		let _ = this.gl = this.renderer.gl;
		this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = mapTypeAndFormatToInternalFormat(_), this.samplerTypes = mapInternalFormatToSamplerType(_);
		let C = _.getParameter(_.MAX_TEXTURE_IMAGE_UNITS);
		this.boundTextures.length = C;
		for (let _ = 0; _ < C; _++) this.boundTextures[_] = null;
		this.emptyTextures = {};
		let T = new GLTexture(_.createTexture());
		_.bindTexture(_.TEXTURE_2D, T.texture), _.texImage2D(_.TEXTURE_2D, 0, _.RGBA, 1, 1, 0, _.RGBA, _.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[_.TEXTURE_2D] = T, this.emptyTextures[_.TEXTURE_CUBE_MAP] = new GLTexture(_.createTexture()), _.bindTexture(_.TEXTURE_CUBE_MAP, this.emptyTextures[_.TEXTURE_CUBE_MAP].texture);
		for (let C = 0; C < 6; C++) _.texImage2D(_.TEXTURE_CUBE_MAP_POSITIVE_X + C, 0, _.RGBA, 1, 1, 0, _.RGBA, _.UNSIGNED_BYTE, null);
		_.texParameteri(_.TEXTURE_CUBE_MAP, _.TEXTURE_MAG_FILTER, _.LINEAR), _.texParameteri(_.TEXTURE_CUBE_MAP, _.TEXTURE_MIN_FILTER, _.LINEAR);
		for (let _ = 0; _ < this.boundTextures.length; _++) this.bind(null, _);
	}
	bind(_, C = 0) {
		let { gl: T } = this;
		if (_ = _?.castToBaseTexture(), _?.valid && !_.parentTextureArray) {
			_.touched = this.renderer.textureGC.count;
			let E = _._glTextures[this.CONTEXT_UID] || this.initTexture(_);
			this.boundTextures[C] !== _ && (this.currentLocation !== C && (this.currentLocation = C, T.activeTexture(T.TEXTURE0 + C)), T.bindTexture(_.target, E.texture)), E.dirtyId === _.dirtyId ? E.dirtyStyleId !== _.dirtyStyleId && this.updateTextureStyle(_) : (this.currentLocation !== C && (this.currentLocation = C, T.activeTexture(T.TEXTURE0 + C)), this.updateTexture(_)), this.boundTextures[C] = _;
		} else this.currentLocation !== C && (this.currentLocation = C, T.activeTexture(T.TEXTURE0 + C)), T.bindTexture(T.TEXTURE_2D, this.emptyTextures[T.TEXTURE_2D].texture), this.boundTextures[C] = null;
	}
	reset() {
		this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
		for (let _ = 0; _ < this.boundTextures.length; _++) this.boundTextures[_] = this.unknownTexture;
	}
	unbind(_) {
		let { gl: C, boundTextures: T } = this;
		if (this._unknownBoundTextures) {
			this._unknownBoundTextures = !1;
			for (let _ = 0; _ < T.length; _++) T[_] === this.unknownTexture && this.bind(null, _);
		}
		for (let E = 0; E < T.length; E++) T[E] === _ && (this.currentLocation !== E && (C.activeTexture(C.TEXTURE0 + E), this.currentLocation = E), C.bindTexture(_.target, this.emptyTextures[_.target].texture), T[E] = null);
	}
	ensureSamplerType(_) {
		let { boundTextures: C, hasIntegerTextures: T, CONTEXT_UID: E } = this;
		if (T) for (let T = _ - 1; T >= 0; --T) {
			let _ = C[T];
			_ && _._glTextures[E].samplerType !== SAMPLER_TYPES.FLOAT && this.renderer.texture.unbind(_);
		}
	}
	initTexture(_) {
		let C = new GLTexture(this.gl.createTexture());
		return C.dirtyId = -1, _._glTextures[this.CONTEXT_UID] = C, this.managedTextures.push(_), _.on("dispose", this.destroyTexture, this), C;
	}
	initTextureType(_, C) {
		C.internalFormat = this.internalFormats[_.type]?.[_.format] ?? _.format, C.samplerType = this.samplerTypes[C.internalFormat] ?? SAMPLER_TYPES.FLOAT, this.webGLVersion === 2 && _.type === TYPES.HALF_FLOAT ? C.type = this.gl.HALF_FLOAT : C.type = _.type;
	}
	updateTexture(_) {
		let C = _._glTextures[this.CONTEXT_UID];
		if (!C) return;
		let T = this.renderer;
		if (this.initTextureType(_, C), _.resource?.upload(T, _, C)) C.samplerType !== SAMPLER_TYPES.FLOAT && (this.hasIntegerTextures = !0);
		else {
			let E = _.realWidth, D = _.realHeight, O = T.gl;
			(C.width !== E || C.height !== D || C.dirtyId < 0) && (C.width = E, C.height = D, O.texImage2D(_.target, 0, C.internalFormat, E, D, 0, _.format, C.type, null));
		}
		_.dirtyStyleId !== C.dirtyStyleId && this.updateTextureStyle(_), C.dirtyId = _.dirtyId;
	}
	destroyTexture(_, C) {
		let { gl: T } = this;
		if (_ = _.castToBaseTexture(), _._glTextures[this.CONTEXT_UID] && (this.unbind(_), T.deleteTexture(_._glTextures[this.CONTEXT_UID].texture), _.off("dispose", this.destroyTexture, this), delete _._glTextures[this.CONTEXT_UID], !C)) {
			let C = this.managedTextures.indexOf(_);
			C !== -1 && removeItems(this.managedTextures, C, 1);
		}
	}
	updateTextureStyle(_) {
		let C = _._glTextures[this.CONTEXT_UID];
		C && ((_.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !_.isPowerOfTwo ? C.mipmap = !1 : C.mipmap = _.mipmap >= 1, this.webGLVersion !== 2 && !_.isPowerOfTwo ? C.wrapMode = WRAP_MODES.CLAMP : C.wrapMode = _.wrapMode, _.resource?.style(this.renderer, _, C) || this.setStyle(_, C), C.dirtyStyleId = _.dirtyStyleId);
	}
	setStyle(_, C) {
		let T = this.gl;
		if (C.mipmap && _.mipmap !== MIPMAP_MODES.ON_MANUAL && T.generateMipmap(_.target), T.texParameteri(_.target, T.TEXTURE_WRAP_S, C.wrapMode), T.texParameteri(_.target, T.TEXTURE_WRAP_T, C.wrapMode), C.mipmap) {
			T.texParameteri(_.target, T.TEXTURE_MIN_FILTER, _.scaleMode === SCALE_MODES.LINEAR ? T.LINEAR_MIPMAP_LINEAR : T.NEAREST_MIPMAP_NEAREST);
			let C = this.renderer.context.extensions.anisotropicFiltering;
			if (C && _.anisotropicLevel > 0 && _.scaleMode === SCALE_MODES.LINEAR) {
				let E = Math.min(_.anisotropicLevel, T.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
				T.texParameterf(_.target, C.TEXTURE_MAX_ANISOTROPY_EXT, E);
			}
		} else T.texParameteri(_.target, T.TEXTURE_MIN_FILTER, _.scaleMode === SCALE_MODES.LINEAR ? T.LINEAR : T.NEAREST);
		T.texParameteri(_.target, T.TEXTURE_MAG_FILTER, _.scaleMode === SCALE_MODES.LINEAR ? T.LINEAR : T.NEAREST);
	}
	destroy() {
		this.renderer = null;
	}
};
TextureSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "texture"
}, extensions.add(TextureSystem);
var TransformFeedbackSystem = class {
	constructor(_) {
		this.renderer = _;
	}
	contextChange() {
		this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
	}
	bind(_) {
		let { gl: C, CONTEXT_UID: T } = this, E = _._glTransformFeedbacks[T] || this.createGLTransformFeedback(_);
		C.bindTransformFeedback(C.TRANSFORM_FEEDBACK, E);
	}
	unbind() {
		let { gl: _ } = this;
		_.bindTransformFeedback(_.TRANSFORM_FEEDBACK, null);
	}
	beginTransformFeedback(_, C) {
		let { gl: T, renderer: E } = this;
		C && E.shader.bind(C), T.beginTransformFeedback(_);
	}
	endTransformFeedback() {
		let { gl: _ } = this;
		_.endTransformFeedback();
	}
	createGLTransformFeedback(_) {
		let { gl: C, renderer: T, CONTEXT_UID: E } = this, D = C.createTransformFeedback();
		_._glTransformFeedbacks[E] = D, C.bindTransformFeedback(C.TRANSFORM_FEEDBACK, D);
		for (let D = 0; D < _.buffers.length; D++) {
			let O = _.buffers[D];
			O && (T.buffer.update(O), O._glBuffers[E].refCount++, C.bindBufferBase(C.TRANSFORM_FEEDBACK_BUFFER, D, O._glBuffers[E].buffer || null));
		}
		return C.bindTransformFeedback(C.TRANSFORM_FEEDBACK, null), _.disposeRunner.add(this), D;
	}
	disposeTransformFeedback(_, C) {
		let T = _._glTransformFeedbacks[this.CONTEXT_UID], E = this.gl;
		_.disposeRunner.remove(this);
		let D = this.renderer.buffer;
		if (D) for (let T = 0; T < _.buffers.length; T++) {
			let E = _.buffers[T];
			if (!E) continue;
			let O = E._glBuffers[this.CONTEXT_UID];
			O && (O.refCount--, O.refCount === 0 && !C && D.dispose(E, C));
		}
		T && (C || E.deleteTransformFeedback(T), delete _._glTransformFeedbacks[this.CONTEXT_UID]);
	}
	destroy() {
		this.renderer = null;
	}
};
TransformFeedbackSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "transformFeedback"
}, extensions.add(TransformFeedbackSystem);
var ViewSystem = class {
	constructor(_) {
		this.renderer = _;
	}
	init(_) {
		this.screen = new Rectangle(0, 0, _.width, _.height), this.element = _.view || settings.ADAPTER.createCanvas(), this.resolution = _.resolution || settings.RESOLUTION, this.autoDensity = !!_.autoDensity;
	}
	resizeView(_, C) {
		this.element.width = Math.round(_ * this.resolution), this.element.height = Math.round(C * this.resolution);
		let T = this.element.width / this.resolution, E = this.element.height / this.resolution;
		this.screen.width = T, this.screen.height = E, this.autoDensity && (this.element.style.width = `${T}px`, this.element.style.height = `${E}px`), this.renderer.emit("resize", T, E), this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
	}
	destroy(_) {
		_ && this.element.parentNode?.removeChild(this.element), this.renderer = null, this.element = null, this.screen = null;
	}
};
ViewSystem.defaultOptions = {
	width: 800,
	height: 600,
	resolution: void 0,
	autoDensity: !1
}, ViewSystem.extension = {
	type: [ExtensionType.RendererSystem, ExtensionType.CanvasRendererSystem],
	name: "_view"
}, extensions.add(ViewSystem), settings.PREFER_ENV = ENV.WEBGL2, settings.STRICT_TEXTURE_CACHE = !1, settings.RENDER_OPTIONS = {
	...ContextSystem.defaultOptions,
	...BackgroundSystem.defaultOptions,
	...ViewSystem.defaultOptions,
	...StartupSystem.defaultOptions
}, Object.defineProperties(settings, {
	WRAP_MODE: {
		get() {
			return BaseTexture.defaultOptions.wrapMode;
		},
		set(_) {
			deprecation("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"), BaseTexture.defaultOptions.wrapMode = _;
		}
	},
	SCALE_MODE: {
		get() {
			return BaseTexture.defaultOptions.scaleMode;
		},
		set(_) {
			deprecation("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"), BaseTexture.defaultOptions.scaleMode = _;
		}
	},
	MIPMAP_TEXTURES: {
		get() {
			return BaseTexture.defaultOptions.mipmap;
		},
		set(_) {
			deprecation("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"), BaseTexture.defaultOptions.mipmap = _;
		}
	},
	ANISOTROPIC_LEVEL: {
		get() {
			return BaseTexture.defaultOptions.anisotropicLevel;
		},
		set(_) {
			deprecation("7.1.0", "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"), BaseTexture.defaultOptions.anisotropicLevel = _;
		}
	},
	FILTER_RESOLUTION: {
		get() {
			return deprecation("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"), Filter.defaultResolution;
		},
		set(_) {
			Filter.defaultResolution = _;
		}
	},
	FILTER_MULTISAMPLE: {
		get() {
			return deprecation("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"), Filter.defaultMultisample;
		},
		set(_) {
			Filter.defaultMultisample = _;
		}
	},
	SPRITE_MAX_TEXTURES: {
		get() {
			return BatchRenderer.defaultMaxTextures;
		},
		set(_) {
			deprecation("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"), BatchRenderer.defaultMaxTextures = _;
		}
	},
	SPRITE_BATCH_SIZE: {
		get() {
			return BatchRenderer.defaultBatchSize;
		},
		set(_) {
			deprecation("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"), BatchRenderer.defaultBatchSize = _;
		}
	},
	CAN_UPLOAD_SAME_BUFFER: {
		get() {
			return BatchRenderer.canUploadSameBuffer;
		},
		set(_) {
			deprecation("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"), BatchRenderer.canUploadSameBuffer = _;
		}
	},
	GC_MODE: {
		get() {
			return TextureGCSystem.defaultMode;
		},
		set(_) {
			deprecation("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"), TextureGCSystem.defaultMode = _;
		}
	},
	GC_MAX_IDLE: {
		get() {
			return TextureGCSystem.defaultMaxIdle;
		},
		set(_) {
			deprecation("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"), TextureGCSystem.defaultMaxIdle = _;
		}
	},
	GC_MAX_CHECK_COUNT: {
		get() {
			return TextureGCSystem.defaultCheckCountMax;
		},
		set(_) {
			deprecation("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"), TextureGCSystem.defaultCheckCountMax = _;
		}
	},
	PRECISION_VERTEX: {
		get() {
			return Program.defaultVertexPrecision;
		},
		set(_) {
			deprecation("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"), Program.defaultVertexPrecision = _;
		}
	},
	PRECISION_FRAGMENT: {
		get() {
			return Program.defaultFragmentPrecision;
		},
		set(_) {
			deprecation("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"), Program.defaultFragmentPrecision = _;
		}
	}
});
var UPDATE_PRIORITY = /* @__PURE__ */ ((_) => (_[_.INTERACTION = 50] = "INTERACTION", _[_.HIGH = 25] = "HIGH", _[_.NORMAL = 0] = "NORMAL", _[_.LOW = -25] = "LOW", _[_.UTILITY = -50] = "UTILITY", _))(UPDATE_PRIORITY || {}), TickerListener = class {
	constructor(_, C = null, T = 0, E = !1) {
		this.next = null, this.previous = null, this._destroyed = !1, this.fn = _, this.context = C, this.priority = T, this.once = E;
	}
	match(_, C = null) {
		return this.fn === _ && this.context === C;
	}
	emit(_) {
		this.fn && (this.context ? this.fn.call(this.context, _) : this.fn(_));
		let C = this.next;
		return this.once && this.destroy(!0), this._destroyed && (this.next = null), C;
	}
	connect(_) {
		this.previous = _, _.next && (_.next.previous = this), this.next = _.next, _.next = this;
	}
	destroy(_ = !1) {
		this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
		let C = this.next;
		return this.next = _ ? null : C, this.previous = null, C;
	}
}, _Ticker = class _ {
	constructor() {
		this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new TickerListener(null, null, Infinity), this.deltaMS = 1 / _.targetFPMS, this.elapsedMS = 1 / _.targetFPMS, this._tick = (_) => {
			this._requestId = null, this.started && (this.update(_), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
		};
	}
	_requestIfNeeded() {
		this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
	}
	_cancelIfNeeded() {
		this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
	}
	_startIfPossible() {
		this.started ? this._requestIfNeeded() : this.autoStart && this.start();
	}
	add(_, C, T = UPDATE_PRIORITY.NORMAL) {
		return this._addListener(new TickerListener(_, C, T));
	}
	addOnce(_, C, T = UPDATE_PRIORITY.NORMAL) {
		return this._addListener(new TickerListener(_, C, T, !0));
	}
	_addListener(_) {
		let C = this._head.next, T = this._head;
		if (!C) _.connect(T);
		else {
			for (; C;) {
				if (_.priority > C.priority) {
					_.connect(T);
					break;
				}
				T = C, C = C.next;
			}
			_.previous || _.connect(T);
		}
		return this._startIfPossible(), this;
	}
	remove(_, C) {
		let T = this._head.next;
		for (; T;) T = T.match(_, C) ? T.destroy() : T.next;
		return this._head.next || this._cancelIfNeeded(), this;
	}
	get count() {
		if (!this._head) return 0;
		let _ = 0, C = this._head;
		for (; C = C.next;) _++;
		return _;
	}
	start() {
		this.started || (this.started = !0, this._requestIfNeeded());
	}
	stop() {
		this.started && (this.started = !1, this._cancelIfNeeded());
	}
	destroy() {
		if (!this._protected) {
			this.stop();
			let _ = this._head.next;
			for (; _;) _ = _.destroy(!0);
			this._head.destroy(), this._head = null;
		}
	}
	update(C = performance.now()) {
		let T;
		if (C > this.lastTime) {
			if (T = this.elapsedMS = C - this.lastTime, T > this._maxElapsedMS && (T = this._maxElapsedMS), T *= this.speed, this._minElapsedMS) {
				let _ = C - this._lastFrame | 0;
				if (_ < this._minElapsedMS) return;
				this._lastFrame = C - _ % this._minElapsedMS;
			}
			this.deltaMS = T, this.deltaTime = this.deltaMS * _.targetFPMS;
			let E = this._head, D = E.next;
			for (; D;) D = D.emit(this.deltaTime);
			E.next || this._cancelIfNeeded();
		} else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
		this.lastTime = C;
	}
	get FPS() {
		return 1e3 / this.elapsedMS;
	}
	get minFPS() {
		return 1e3 / this._maxElapsedMS;
	}
	set minFPS(C) {
		let T = Math.min(this.maxFPS, C);
		this._maxElapsedMS = 1 / Math.min(Math.max(0, T) / 1e3, _.targetFPMS);
	}
	get maxFPS() {
		return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
	}
	set maxFPS(_) {
		_ === 0 ? this._minElapsedMS = 0 : this._minElapsedMS = 1 / (Math.max(this.minFPS, _) / 1e3);
	}
	static get shared() {
		if (!_._shared) {
			let C = _._shared = new _();
			C.autoStart = !0, C._protected = !0;
		}
		return _._shared;
	}
	static get system() {
		if (!_._system) {
			let C = _._system = new _();
			C.autoStart = !0, C._protected = !0;
		}
		return _._system;
	}
};
_Ticker.targetFPMS = .06;
var Ticker = _Ticker;
Object.defineProperties(settings, { TARGET_FPMS: {
	get() {
		return Ticker.targetFPMS;
	},
	set(_) {
		deprecation("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), Ticker.targetFPMS = _;
	}
} });
var TickerPlugin = class {
	static init(_) {
		_ = Object.assign({
			autoStart: !0,
			sharedTicker: !1
		}, _), Object.defineProperty(this, "ticker", {
			set(_) {
				this._ticker && this._ticker.remove(this.render, this), this._ticker = _, _ && _.add(this.render, this, UPDATE_PRIORITY.LOW);
			},
			get() {
				return this._ticker;
			}
		}), this.stop = () => {
			this._ticker.stop();
		}, this.start = () => {
			this._ticker.start();
		}, this._ticker = null, this.ticker = _.sharedTicker ? Ticker.shared : new Ticker(), _.autoStart && this.start();
	}
	static destroy() {
		if (this._ticker) {
			let _ = this._ticker;
			this.ticker = null, _.destroy();
		}
	}
};
TickerPlugin.extension = ExtensionType.Application, extensions.add(TickerPlugin), extensions.handleByList(ExtensionType.Renderer, []);
var MultisampleSystem = class {
	constructor(_) {
		this.renderer = _;
	}
	contextChange(_) {
		let C;
		if (this.renderer.context.webGLVersion === 1) {
			let T = _.getParameter(_.FRAMEBUFFER_BINDING);
			_.bindFramebuffer(_.FRAMEBUFFER, null), C = _.getParameter(_.SAMPLES), _.bindFramebuffer(_.FRAMEBUFFER, T);
		} else {
			let T = _.getParameter(_.DRAW_FRAMEBUFFER_BINDING);
			_.bindFramebuffer(_.DRAW_FRAMEBUFFER, null), C = _.getParameter(_.SAMPLES), _.bindFramebuffer(_.DRAW_FRAMEBUFFER, T);
		}
		C >= MSAA_QUALITY.HIGH ? this.multisample = MSAA_QUALITY.HIGH : C >= MSAA_QUALITY.MEDIUM ? this.multisample = MSAA_QUALITY.MEDIUM : C >= MSAA_QUALITY.LOW ? this.multisample = MSAA_QUALITY.LOW : this.multisample = MSAA_QUALITY.NONE;
	}
	destroy() {}
};
MultisampleSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "_multisample"
}, extensions.add(MultisampleSystem);
var GLBuffer = class {
	constructor(_) {
		this.buffer = _ || null, this.updateID = -1, this.byteLength = -1, this.refCount = 0;
	}
}, BufferSystem = class {
	constructor(_) {
		this.renderer = _, this.managedBuffers = {}, this.boundBufferBases = {};
	}
	destroy() {
		this.renderer = null;
	}
	contextChange() {
		this.disposeAll(!0), this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID;
	}
	bind(_) {
		let { gl: C, CONTEXT_UID: T } = this, E = _._glBuffers[T] || this.createGLBuffer(_);
		C.bindBuffer(_.type, E.buffer);
	}
	unbind(_) {
		let { gl: C } = this;
		C.bindBuffer(_, null);
	}
	bindBufferBase(_, C) {
		let { gl: T, CONTEXT_UID: E } = this;
		if (this.boundBufferBases[C] !== _) {
			let D = _._glBuffers[E] || this.createGLBuffer(_);
			this.boundBufferBases[C] = _, T.bindBufferBase(T.UNIFORM_BUFFER, C, D.buffer);
		}
	}
	bindBufferRange(_, C, T) {
		let { gl: E, CONTEXT_UID: D } = this;
		T ||= 0;
		let O = _._glBuffers[D] || this.createGLBuffer(_);
		E.bindBufferRange(E.UNIFORM_BUFFER, C || 0, O.buffer, T * 256, 256);
	}
	update(_) {
		let { gl: C, CONTEXT_UID: T } = this, E = _._glBuffers[T] || this.createGLBuffer(_);
		if (_._updateID !== E.updateID) if (E.updateID = _._updateID, C.bindBuffer(_.type, E.buffer), E.byteLength >= _.data.byteLength) C.bufferSubData(_.type, 0, _.data);
		else {
			let T = _.static ? C.STATIC_DRAW : C.DYNAMIC_DRAW;
			E.byteLength = _.data.byteLength, C.bufferData(_.type, _.data, T);
		}
	}
	dispose(_, C) {
		if (!this.managedBuffers[_.id]) return;
		delete this.managedBuffers[_.id];
		let T = _._glBuffers[this.CONTEXT_UID], E = this.gl;
		_.disposeRunner.remove(this), T && (C || E.deleteBuffer(T.buffer), delete _._glBuffers[this.CONTEXT_UID]);
	}
	disposeAll(_) {
		let C = Object.keys(this.managedBuffers);
		for (let T = 0; T < C.length; T++) this.dispose(this.managedBuffers[C[T]], _);
	}
	createGLBuffer(_) {
		let { CONTEXT_UID: C, gl: T } = this;
		return _._glBuffers[C] = new GLBuffer(T.createBuffer()), this.managedBuffers[_.id] = _, _.disposeRunner.add(this), _._glBuffers[C];
	}
};
BufferSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "buffer"
}, extensions.add(BufferSystem);
var ObjectRendererSystem = class {
	constructor(_) {
		this.renderer = _;
	}
	render(_, C) {
		let T = this.renderer, E, D, O, A;
		if (C && (E = C.renderTexture, D = C.clear, O = C.transform, A = C.skipUpdateTransform), this.renderingToScreen = !E, T.runners.prerender.emit(), T.emit("prerender"), T.projection.transform = O, !T.context.isLost) {
			if (E || (this.lastObjectRendered = _), !A) {
				let C = _.enableTempParent();
				_.updateTransform(), _.disableTempParent(C);
			}
			T.renderTexture.bind(E), T.batch.currentRenderer.start(), (D ?? T.background.clearBeforeRender) && T.renderTexture.clear(), _.render(T), T.batch.currentRenderer.flush(), E && (C.blit && T.framebuffer.blit(), E.baseTexture.update()), T.runners.postrender.emit(), T.projection.transform = null, T.emit("postrender");
		}
	}
	destroy() {
		this.renderer = null, this.lastObjectRendered = null;
	}
};
ObjectRendererSystem.extension = {
	type: ExtensionType.RendererSystem,
	name: "objectRenderer"
}, extensions.add(ObjectRendererSystem);
var _Renderer = class _ extends SystemManager {
	constructor(C) {
		super(), this.type = RENDERER_TYPE.WEBGL, C = Object.assign({}, settings.RENDER_OPTIONS, C), this.gl = null, this.CONTEXT_UID = 0, this.globalUniforms = new UniformGroup({ projectionMatrix: new Matrix() }, !0);
		let T = {
			runners: [
				"init",
				"destroy",
				"contextChange",
				"resolutionChange",
				"reset",
				"update",
				"postrender",
				"prerender",
				"resize"
			],
			systems: _.__systems,
			priority: [
				"_view",
				"textureGenerator",
				"background",
				"_plugin",
				"startup",
				"context",
				"state",
				"texture",
				"buffer",
				"geometry",
				"framebuffer",
				"transformFeedback",
				"mask",
				"scissor",
				"stencil",
				"projection",
				"textureGC",
				"filter",
				"renderTexture",
				"batch",
				"objectRenderer",
				"_multisample"
			]
		};
		this.setup(T), "useContextAlpha" in C && (deprecation("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"), C.premultipliedAlpha = C.useContextAlpha && C.useContextAlpha !== "notMultiplied", C.backgroundAlpha = C.useContextAlpha === !1 ? 1 : C.backgroundAlpha), this._plugin.rendererPlugins = _.__plugins, this.options = C, this.startup.run(this.options);
	}
	static test(_) {
		return _?.forceCanvas ? !1 : isWebGLSupported();
	}
	render(_, C) {
		this.objectRenderer.render(_, C);
	}
	resize(_, C) {
		this._view.resizeView(_, C);
	}
	reset() {
		return this.runners.reset.emit(), this;
	}
	clear() {
		this.renderTexture.bind(), this.renderTexture.clear();
	}
	destroy(_ = !1) {
		this.runners.destroy.items.reverse(), this.emitWithCustomOptions(this.runners.destroy, { _view: _ }), super.destroy();
	}
	get plugins() {
		return this._plugin.plugins;
	}
	get multisample() {
		return this._multisample.multisample;
	}
	get width() {
		return this._view.element.width;
	}
	get height() {
		return this._view.element.height;
	}
	get resolution() {
		return this._view.resolution;
	}
	set resolution(_) {
		this._view.resolution = _, this.runners.resolutionChange.emit(_);
	}
	get autoDensity() {
		return this._view.autoDensity;
	}
	get view() {
		return this._view.element;
	}
	get screen() {
		return this._view.screen;
	}
	get lastObjectRendered() {
		return this.objectRenderer.lastObjectRendered;
	}
	get renderingToScreen() {
		return this.objectRenderer.renderingToScreen;
	}
	get rendererLogId() {
		return `WebGL ${this.context.webGLVersion}`;
	}
	get clearBeforeRender() {
		return deprecation("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."), this.background.clearBeforeRender;
	}
	get useContextAlpha() {
		return deprecation("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."), this.context.useContextAlpha;
	}
	get preserveDrawingBuffer() {
		return deprecation("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"), this.context.preserveDrawingBuffer;
	}
	get backgroundColor() {
		return deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color;
	}
	set backgroundColor(_) {
		deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead."), this.background.color = _;
	}
	get backgroundAlpha() {
		return deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha;
	}
	set backgroundAlpha(_) {
		deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."), this.background.alpha = _;
	}
	get powerPreference() {
		return deprecation("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"), this.context.powerPreference;
	}
	generateTexture(_, C) {
		return this.textureGenerator.generateTexture(_, C);
	}
};
_Renderer.extension = {
	type: ExtensionType.Renderer,
	priority: 1
}, _Renderer.__plugins = {}, _Renderer.__systems = {};
var Renderer = _Renderer;
extensions.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins), extensions.handleByMap(ExtensionType.RendererSystem, Renderer.__systems), extensions.add(Renderer);
var AbstractMultiResource = class extends Resource {
	constructor(_, C) {
		let { width: T, height: E } = C || {};
		super(T, E), this.items = [], this.itemDirtyIds = [];
		for (let C = 0; C < _; C++) {
			let _ = new BaseTexture();
			this.items.push(_), this.itemDirtyIds.push(-2);
		}
		this.length = _, this._load = null, this.baseTexture = null;
	}
	initFromArray(_, C) {
		for (let T = 0; T < this.length; T++) _[T] && (_[T].castToBaseTexture ? this.addBaseTextureAt(_[T].castToBaseTexture(), T) : _[T] instanceof Resource ? this.addResourceAt(_[T], T) : this.addResourceAt(autoDetectResource(_[T], C), T));
	}
	dispose() {
		for (let _ = 0, C = this.length; _ < C; _++) this.items[_].destroy();
		this.items = null, this.itemDirtyIds = null, this._load = null;
	}
	addResourceAt(_, C) {
		if (!this.items[C]) throw Error(`Index ${C} is out of bounds`);
		return _.valid && !this.valid && this.resize(_.width, _.height), this.items[C].setResource(_), this;
	}
	bind(_) {
		if (this.baseTexture !== null) throw Error("Only one base texture per TextureArray is allowed");
		super.bind(_);
		for (let C = 0; C < this.length; C++) this.items[C].parentTextureArray = _, this.items[C].on("update", _.update, _);
	}
	unbind(_) {
		super.unbind(_);
		for (let C = 0; C < this.length; C++) this.items[C].parentTextureArray = null, this.items[C].off("update", _.update, _);
	}
	load() {
		if (this._load) return this._load;
		let _ = this.items.map((_) => _.resource).filter((_) => _).map((_) => _.load());
		return this._load = Promise.all(_).then(() => {
			let { realWidth: _, realHeight: C } = this.items[0];
			return this.resize(_, C), this.update(), Promise.resolve(this);
		}), this._load;
	}
}, ArrayResource = class extends AbstractMultiResource {
	constructor(_, C) {
		let { width: T, height: E } = C || {}, D, O;
		Array.isArray(_) ? (D = _, O = _.length) : O = _, super(O, {
			width: T,
			height: E
		}), D && this.initFromArray(D, C);
	}
	addBaseTextureAt(_, C) {
		if (_.resource) this.addResourceAt(_.resource, C);
		else throw Error("ArrayResource does not support RenderTexture");
		return this;
	}
	bind(_) {
		super.bind(_), _.target = TARGETS.TEXTURE_2D_ARRAY;
	}
	upload(_, C, T) {
		let { length: E, itemDirtyIds: D, items: O } = this, { gl: A } = _;
		T.dirtyId < 0 && A.texImage3D(A.TEXTURE_2D_ARRAY, 0, T.internalFormat, this._width, this._height, E, 0, C.format, T.type, null);
		for (let _ = 0; _ < E; _++) {
			let E = O[_];
			D[_] < E.dirtyId && (D[_] = E.dirtyId, E.valid && A.texSubImage3D(A.TEXTURE_2D_ARRAY, 0, 0, 0, _, E.resource.width, E.resource.height, 1, C.format, T.type, E.resource.source));
		}
		return !0;
	}
}, CanvasResource = class extends BaseImageResource {
	constructor(_) {
		super(_);
	}
	static test(_) {
		let { OffscreenCanvas: C } = globalThis;
		return C && _ instanceof C ? !0 : globalThis.HTMLCanvasElement && _ instanceof HTMLCanvasElement;
	}
}, _CubeResource = class _ extends AbstractMultiResource {
	constructor(C, T) {
		let { width: E, height: D, autoLoad: O, linkBaseTexture: A } = T || {};
		if (C && C.length !== _.SIDES) throw Error(`Invalid length. Got ${C.length}, expected 6`);
		super(6, {
			width: E,
			height: D
		});
		for (let C = 0; C < _.SIDES; C++) this.items[C].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + C;
		this.linkBaseTexture = A !== !1, C && this.initFromArray(C, T), O !== !1 && this.load();
	}
	bind(_) {
		super.bind(_), _.target = TARGETS.TEXTURE_CUBE_MAP;
	}
	addBaseTextureAt(_, C, T) {
		if (T === void 0 && (T = this.linkBaseTexture), !this.items[C]) throw Error(`Index ${C} is out of bounds`);
		if (!this.linkBaseTexture || _.parentTextureArray || Object.keys(_._glTextures).length > 0) if (_.resource) this.addResourceAt(_.resource, C);
		else throw Error("CubeResource does not support copying of renderTexture.");
		else _.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + C, _.parentTextureArray = this.baseTexture, this.items[C] = _;
		return _.valid && !this.valid && this.resize(_.realWidth, _.realHeight), this.items[C] = _, this;
	}
	upload(C, T, E) {
		let D = this.itemDirtyIds;
		for (let O = 0; O < _.SIDES; O++) {
			let _ = this.items[O];
			(D[O] < _.dirtyId || E.dirtyId < T.dirtyId) && (_.valid && _.resource ? (_.resource.upload(C, _, E), D[O] = _.dirtyId) : D[O] < -1 && (C.gl.texImage2D(_.target, 0, E.internalFormat, T.realWidth, T.realHeight, 0, T.format, E.type, null), D[O] = -1));
		}
		return !0;
	}
	static test(C) {
		return Array.isArray(C) && C.length === _.SIDES;
	}
};
_CubeResource.SIDES = 6;
var CubeResource = _CubeResource, ImageBitmapResource = class _ extends BaseImageResource {
	constructor(C, T) {
		T ||= {};
		let E, D, O;
		typeof C == "string" ? (E = _.EMPTY, D = C, O = !0) : (E = C, D = null, O = !1), super(E), this.url = D, this.crossOrigin = T.crossOrigin ?? !0, this.alphaMode = typeof T.alphaMode == "number" ? T.alphaMode : null, this.ownsImageBitmap = T.ownsImageBitmap ?? O, this._load = null, T.autoLoad !== !1 && this.load();
	}
	load() {
		return this._load ||= new Promise(async (_, C) => {
			if (this.url === null) {
				_(this);
				return;
			}
			try {
				let C = await settings.ADAPTER.fetch(this.url, { mode: this.crossOrigin ? "cors" : "no-cors" });
				if (this.destroyed) return;
				let T = await C.blob();
				if (this.destroyed) return;
				let E = await createImageBitmap(T, { premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none" });
				if (this.destroyed) {
					E.close();
					return;
				}
				this.source = E, this.update(), _(this);
			} catch (_) {
				if (this.destroyed) return;
				C(_), this.onError.emit(_);
			}
		}), this._load;
	}
	upload(_, C, T) {
		return this.source instanceof ImageBitmap ? (typeof this.alphaMode == "number" && (C.alphaMode = this.alphaMode), super.upload(_, C, T)) : (this.load(), !1);
	}
	dispose() {
		this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(), super.dispose(), this._load = null;
	}
	static test(_) {
		return !!globalThis.createImageBitmap && typeof ImageBitmap < "u" && (typeof _ == "string" || _ instanceof ImageBitmap);
	}
	static get EMPTY() {
		return _._EMPTY = _._EMPTY ?? settings.ADAPTER.createCanvas(0, 0), _._EMPTY;
	}
}, _SVGResource = class _ extends BaseImageResource {
	constructor(_, C) {
		C ||= {}, super(settings.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = _, this.scale = C.scale || 1, this._overrideWidth = C.width, this._overrideHeight = C.height, this._resolve = null, this._crossorigin = C.crossorigin, this._load = null, C.autoLoad !== !1 && this.load();
	}
	load() {
		return this._load ||= new Promise((C) => {
			if (this._resolve = () => {
				this.update(), C(this);
			}, _.SVG_XML.test(this.svg.trim())) {
				if (!btoa) throw Error("Your browser doesn't support base64 conversions.");
				this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
			}
			this._loadSvg();
		}), this._load;
	}
	_loadSvg() {
		let _ = new Image();
		BaseImageResource.crossOrigin(_, this.svg, this._crossorigin), _.src = this.svg, _.onerror = (C) => {
			this._resolve && (_.onerror = null, this.onError.emit(C));
		}, _.onload = () => {
			if (!this._resolve) return;
			let C = _.width, T = _.height;
			if (!C || !T) throw Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
			let E = C * this.scale, D = T * this.scale;
			(this._overrideWidth || this._overrideHeight) && (E = this._overrideWidth || this._overrideHeight / T * C, D = this._overrideHeight || this._overrideWidth / C * T), E = Math.round(E), D = Math.round(D);
			let O = this.source;
			O.width = E, O.height = D, O._pixiId = `canvas_${uid()}`, O.getContext("2d").drawImage(_, 0, 0, C, T, 0, 0, E, D), this._resolve(), this._resolve = null;
		};
	}
	static getSize(C) {
		let T = _.SVG_SIZE.exec(C), E = {};
		return T && (E[T[1]] = Math.round(parseFloat(T[3])), E[T[5]] = Math.round(parseFloat(T[7]))), E;
	}
	dispose() {
		super.dispose(), this._resolve = null, this._crossorigin = null;
	}
	static test(C, T) {
		return T === "svg" || typeof C == "string" && C.startsWith("data:image/svg+xml") || typeof C == "string" && _.SVG_XML.test(C);
	}
};
_SVGResource.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, _SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
var SVGResource = _SVGResource, VideoFrameResource = class extends BaseImageResource {
	constructor(_) {
		super(_);
	}
	static test(_) {
		return !!globalThis.VideoFrame && _ instanceof globalThis.VideoFrame;
	}
}, _VideoResource = class _ extends BaseImageResource {
	constructor(C, T) {
		if (T ||= {}, !(C instanceof HTMLVideoElement)) {
			let E = document.createElement("video");
			T.autoLoad !== !1 && E.setAttribute("preload", "auto"), T.playsinline !== !1 && (E.setAttribute("webkit-playsinline", ""), E.setAttribute("playsinline", "")), T.muted === !0 && (E.setAttribute("muted", ""), E.muted = !0), T.loop === !0 && E.setAttribute("loop", ""), T.autoPlay !== !1 && E.setAttribute("autoplay", ""), typeof C == "string" && (C = [C]);
			let D = C[0].src || C[0];
			BaseImageResource.crossOrigin(E, D, T.crossorigin);
			for (let T = 0; T < C.length; ++T) {
				let D = document.createElement("source"), { src: O, mime: A } = C[T];
				if (O ||= C[T], O.startsWith("data:")) A = O.slice(5, O.indexOf(";"));
				else if (!O.startsWith("blob:")) {
					let C = O.split("?").shift().toLowerCase(), T = C.slice(C.lastIndexOf(".") + 1);
					A = A || _.MIME_TYPES[T] || `video/${T}`;
				}
				D.src = O, A && (D.type = A), E.appendChild(D);
			}
			C = E;
		}
		super(C), this.noSubImage = !0, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = T.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = T.autoPlay !== !1, this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), T.autoLoad !== !1 && this.load();
	}
	update(_ = 0) {
		if (!this.destroyed) {
			if (this._updateFPS) {
				let _ = Ticker.shared.elapsedMS * this.source.playbackRate;
				this._msToNextUpdate = Math.floor(this._msToNextUpdate - _);
			}
			(!this._updateFPS || this._msToNextUpdate <= 0) && (super.update(), this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0);
		}
	}
	_videoFrameRequestCallback() {
		this.update(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(this._videoFrameRequestCallback);
	}
	load() {
		if (this._load) return this._load;
		let _ = this.source;
		return (_.readyState === _.HAVE_ENOUGH_DATA || _.readyState === _.HAVE_FUTURE_DATA) && _.width && _.height && (_.complete = !0), _.addEventListener("play", this._onPlayStart), _.addEventListener("pause", this._onPlayStop), _.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._onCanPlay() : (_.addEventListener("canplay", this._onCanPlay), _.addEventListener("canplaythrough", this._onCanPlay), _.addEventListener("error", this._onError, !0)), this._load = new Promise((C, T) => {
			this.valid ? C(this) : (this._resolve = C, this._reject = T, _.load());
		}), this._load;
	}
	_onError(_) {
		this.source.removeEventListener("error", this._onError, !0), this.onError.emit(_), this._reject && (this._reject(_), this._reject = null, this._resolve = null);
	}
	_isSourcePlaying() {
		let _ = this.source;
		return !_.paused && !_.ended;
	}
	_isSourceReady() {
		return this.source.readyState > 2;
	}
	_onPlayStart() {
		this.valid || this._onCanPlay(), this._configureAutoUpdate();
	}
	_onPlayStop() {
		this._configureAutoUpdate();
	}
	_onSeeked() {
		this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0);
	}
	_onCanPlay() {
		let _ = this.source;
		_.removeEventListener("canplay", this._onCanPlay), _.removeEventListener("canplaythrough", this._onCanPlay);
		let C = this.valid;
		this._msToNextUpdate = 0, this.update(), this._msToNextUpdate = 0, !C && this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && _.play();
	}
	dispose() {
		this._configureAutoUpdate();
		let _ = this.source;
		_ && (_.removeEventListener("play", this._onPlayStart), _.removeEventListener("pause", this._onPlayStop), _.removeEventListener("seeked", this._onSeeked), _.removeEventListener("canplay", this._onCanPlay), _.removeEventListener("canplaythrough", this._onCanPlay), _.removeEventListener("error", this._onError, !0), _.pause(), _.src = "", _.load()), super.dispose();
	}
	get autoUpdate() {
		return this._autoUpdate;
	}
	set autoUpdate(_) {
		_ !== this._autoUpdate && (this._autoUpdate = _, this._configureAutoUpdate());
	}
	get updateFPS() {
		return this._updateFPS;
	}
	set updateFPS(_) {
		_ !== this._updateFPS && (this._updateFPS = _, this._configureAutoUpdate());
	}
	_configureAutoUpdate() {
		this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.source.requestVideoFrameCallback ? (this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (Ticker.shared.add(this.update, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (Ticker.shared.remove(this.update, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
	}
	static test(C, T) {
		return globalThis.HTMLVideoElement && C instanceof HTMLVideoElement || _.TYPES.includes(T);
	}
};
_VideoResource.TYPES = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"h264",
	"avi",
	"mov"
], _VideoResource.MIME_TYPES = {
	ogv: "video/ogg",
	mov: "video/quicktime",
	m4v: "video/mp4"
};
var VideoResource = _VideoResource;
INSTALLED.push(ImageBitmapResource, ImageResource, CanvasResource, VideoResource, VideoFrameResource, SVGResource, BufferResource, CubeResource, ArrayResource);
var assetKeyMap = {
	loader: ExtensionType.LoadParser,
	resolver: ExtensionType.ResolveParser,
	cache: ExtensionType.CacheParser,
	detection: ExtensionType.DetectionParser
};
extensions.handle(ExtensionType.Asset, (_) => {
	let C = _.ref;
	Object.entries(assetKeyMap).filter(([_]) => !!C[_]).forEach(([_, T]) => extensions.add(Object.assign(C[_], { extension: C[_].extension ?? T })));
}, (_) => {
	let C = _.ref;
	Object.keys(assetKeyMap).filter((_) => !!C[_]).forEach((_) => extensions.remove(C[_]));
});
var BackgroundLoader = class {
	constructor(_, C = !1) {
		this._loader = _, this._assetList = [], this._isLoading = !1, this._maxConcurrent = 1, this.verbose = C;
	}
	add(_) {
		_.forEach((_) => {
			this._assetList.push(_);
		}), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next();
	}
	async _next() {
		if (this._assetList.length && this._isActive) {
			this._isLoading = !0;
			let _ = [], C = Math.min(this._assetList.length, this._maxConcurrent);
			for (let T = 0; T < C; T++) _.push(this._assetList.pop());
			await this._loader.load(_), this._isLoading = !1, this._next();
		}
	}
	get active() {
		return this._isActive;
	}
	set active(_) {
		this._isActive !== _ && (this._isActive = _, _ && !this._isLoading && this._next());
	}
};
function checkDataUrl(_, C) {
	if (Array.isArray(C)) {
		for (let T of C) if (_.startsWith(`data:${T}`)) return !0;
		return !1;
	}
	return _.startsWith(`data:${C}`);
}
function checkExtension(_, C) {
	let T = _.split("?")[0], E = path.extname(T).toLowerCase();
	return Array.isArray(C) ? C.includes(E) : E === C;
}
var convertToList = (_, C, T = !1) => (Array.isArray(_) || (_ = [_]), C ? _.map((_) => typeof _ == "string" || T ? C(_) : _) : _), copySearchParams = (_, C) => {
	let T = C.split("?")[1];
	return T && (_ += `?${T}`), _;
};
function processX(_, C, T, E, D) {
	let O = C[T];
	for (let A = 0; A < O.length; A++) {
		let P = O[A];
		T < C.length - 1 ? processX(_.replace(E[T], P), C, T + 1, E, D) : D.push(_.replace(E[T], P));
	}
}
function createStringVariations(_) {
	let C = _.match(/\{(.*?)\}/g), T = [];
	if (C) {
		let E = [];
		C.forEach((_) => {
			let C = _.substring(1, _.length - 1).split(",");
			E.push(C);
		}), processX(_, E, 0, C, T);
	} else T.push(_);
	return T;
}
var isSingleItem = (_) => !Array.isArray(_), Cache = new class {
	constructor() {
		this._parsers = [], this._cache = /* @__PURE__ */ new Map(), this._cacheMap = /* @__PURE__ */ new Map();
	}
	reset() {
		this._cacheMap.clear(), this._cache.clear();
	}
	has(_) {
		return this._cache.has(_);
	}
	get(_) {
		let C = this._cache.get(_);
		return C || console.warn(`[Assets] Asset id ${_} was not found in the Cache`), C;
	}
	set(_, C) {
		let T = convertToList(_), E;
		for (let _ = 0; _ < this.parsers.length; _++) {
			let D = this.parsers[_];
			if (D.test(C)) {
				E = D.getCacheableAssets(T, C);
				break;
			}
		}
		E || (E = {}, T.forEach((_) => {
			E[_] = C;
		}));
		let D = Object.keys(E), O = {
			cacheKeys: D,
			keys: T
		};
		if (T.forEach((_) => {
			this._cacheMap.set(_, O);
		}), D.forEach((_) => {
			let T = E ? E[_] : C;
			this._cache.has(_) && this._cache.get(_) !== T && console.warn("[Cache] already has key:", _), this._cache.set(_, E[_]);
		}), C instanceof Texture) {
			let _ = C;
			T.forEach((C) => {
				_.baseTexture !== Texture.EMPTY.baseTexture && BaseTexture.addToCache(_.baseTexture, C), Texture.addToCache(_, C);
			});
		}
	}
	remove(_) {
		if (!this._cacheMap.has(_)) {
			console.warn(`[Assets] Asset id ${_} was not found in the Cache`);
			return;
		}
		let C = this._cacheMap.get(_);
		C.cacheKeys.forEach((_) => {
			this._cache.delete(_);
		}), C.keys.forEach((_) => {
			this._cacheMap.delete(_);
		});
	}
	get parsers() {
		return this._parsers;
	}
}(), Loader = class {
	constructor() {
		this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, { set: (_, C, T) => (this._parsersValidated = !1, _[C] = T, !0) }), this.promiseCache = {};
	}
	reset() {
		this._parsersValidated = !1, this.promiseCache = {};
	}
	_getLoadPromiseAndParser(_, C) {
		let T = {
			promise: null,
			parser: null
		};
		return T.promise = (async () => {
			let E = null, D = null;
			if (C.loadParser && (D = this._parserHash[C.loadParser], D || console.warn(`[Assets] specified load parser "${C.loadParser}" not found while loading ${_}`)), !D) {
				for (let T = 0; T < this.parsers.length; T++) {
					let E = this.parsers[T];
					if (E.load && E.test?.(_, C, this)) {
						D = E;
						break;
					}
				}
				if (!D) return console.warn(`[Assets] ${_} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
			}
			E = await D.load(_, C, this), T.parser = D;
			for (let _ = 0; _ < this.parsers.length; _++) {
				let D = this.parsers[_];
				D.parse && D.parse && await D.testParse?.(E, C, this) && (E = await D.parse(E, C, this) || E, T.parser = D);
			}
			return E;
		})(), T;
	}
	async load(_, C) {
		this._parsersValidated || this._validateParsers();
		let T = 0, E = {}, D = isSingleItem(_), O = convertToList(_, (_) => ({
			alias: [_],
			src: _
		})), A = O.length, P = O.map(async (_) => {
			let D = path.toAbsolute(_.src);
			if (!E[_.src]) try {
				this.promiseCache[D] || (this.promiseCache[D] = this._getLoadPromiseAndParser(D, _)), E[_.src] = await this.promiseCache[D].promise, C && C(++T / A);
			} catch (C) {
				throw delete this.promiseCache[D], delete E[_.src], /* @__PURE__ */ Error(`[Loader.load] Failed to load ${D}.
${C}`);
			}
		});
		return await Promise.all(P), D ? E[O[0].src] : E;
	}
	async unload(_) {
		let C = convertToList(_, (_) => ({
			alias: [_],
			src: _
		})).map(async (_) => {
			let C = path.toAbsolute(_.src), T = this.promiseCache[C];
			if (T) {
				let E = await T.promise;
				delete this.promiseCache[C], T.parser?.unload?.(E, _, this);
			}
		});
		await Promise.all(C);
	}
	_validateParsers() {
		this._parsersValidated = !0, this._parserHash = this._parsers.filter((_) => _.name).reduce((_, C) => (_[C.name] && console.warn(`[Assets] loadParser name conflict "${C.name}"`), {
			..._,
			[C.name]: C
		}), {});
	}
}, LoaderParserPriority = /* @__PURE__ */ ((_) => (_[_.Low = 0] = "Low", _[_.Normal = 1] = "Normal", _[_.High = 2] = "High", _))(LoaderParserPriority || {}), validJSONExtension = ".json", validJSONMIME = "application/json", loadJson = {
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.Low
	},
	name: "loadJson",
	test(_) {
		return checkDataUrl(_, validJSONMIME) || checkExtension(_, validJSONExtension);
	},
	async load(_) {
		return await (await settings.ADAPTER.fetch(_)).json();
	}
};
extensions.add(loadJson);
var validTXTExtension = ".txt", validTXTMIME = "text/plain", loadTxt = {
	name: "loadTxt",
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.Low
	},
	test(_) {
		return checkDataUrl(_, validTXTMIME) || checkExtension(_, validTXTExtension);
	},
	async load(_) {
		return await (await settings.ADAPTER.fetch(_)).text();
	}
};
extensions.add(loadTxt);
var validWeights = [
	"normal",
	"bold",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900"
], validFontExtensions = [
	".ttf",
	".otf",
	".woff",
	".woff2"
], validFontMIMEs = [
	"font/ttf",
	"font/otf",
	"font/woff",
	"font/woff2"
], CSS_IDENT_TOKEN_REGEX = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function getFontFamilyName(_) {
	let C = path.extname(_), T = path.basename(_, C).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((_) => _.charAt(0).toUpperCase() + _.slice(1)), E = T.length > 0;
	for (let _ of T) if (!_.match(CSS_IDENT_TOKEN_REGEX)) {
		E = !1;
		break;
	}
	let D = T.join(" ");
	return E || (D = `"${D.replace(/[\\"]/g, "\\$&")}"`), D;
}
var validURICharactersRegex = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function encodeURIWhenNeeded(_) {
	return validURICharactersRegex.test(_) ? _ : encodeURI(_);
}
var loadWebFont = {
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.Low
	},
	name: "loadWebFont",
	test(_) {
		return checkDataUrl(_, validFontMIMEs) || checkExtension(_, validFontExtensions);
	},
	async load(_, C) {
		let T = settings.ADAPTER.getFontFaceSet();
		if (T) {
			let E = [], D = C.data?.family ?? getFontFamilyName(_), O = C.data?.weights?.filter((_) => validWeights.includes(_)) ?? ["normal"], A = C.data ?? {};
			for (let C = 0; C < O.length; C++) {
				let P = O[C], F = new FontFace(D, `url(${encodeURIWhenNeeded(_)})`, {
					...A,
					weight: P
				});
				await F.load(), T.add(F), E.push(F);
			}
			return E.length === 1 ? E[0] : E;
		}
		return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
	},
	unload(_) {
		(Array.isArray(_) ? _ : [_]).forEach((_) => settings.ADAPTER.getFontFaceSet().delete(_));
	}
};
extensions.add(loadWebFont);
var WORKER_CODE$1 = "(function() {\n  \"use strict\";\n  const WHITE_PNG = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=\";\n  async function checkImageBitmap() {\n    try {\n      if (typeof createImageBitmap != \"function\")\n        return !1;\n      const imageBlob = await (await fetch(WHITE_PNG)).blob(), imageBitmap = await createImageBitmap(imageBlob);\n      return imageBitmap.width === 1 && imageBitmap.height === 1;\n    } catch {\n      return !1;\n    }\n  }\n  checkImageBitmap().then((result) => {\n    self.postMessage(result);\n  });\n})();\n", WORKER_URL$1 = null, WorkerInstance$1 = class {
	constructor() {
		WORKER_URL$1 ||= URL.createObjectURL(new Blob([WORKER_CODE$1], { type: "application/javascript" })), this.worker = new Worker(WORKER_URL$1);
	}
};
WorkerInstance$1.revokeObjectURL = function() {
	WORKER_URL$1 &&= (URL.revokeObjectURL(WORKER_URL$1), null);
};
var WORKER_CODE = "(function() {\n  \"use strict\";\n  async function loadImageBitmap(url) {\n    const response = await fetch(url);\n    if (!response.ok)\n      throw new Error(`[WorkerManager.loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);\n    const imageBlob = await response.blob();\n    return await createImageBitmap(imageBlob);\n  }\n  self.onmessage = async (event) => {\n    try {\n      const imageBitmap = await loadImageBitmap(event.data.data[0]);\n      self.postMessage({\n        data: imageBitmap,\n        uuid: event.data.uuid,\n        id: event.data.id\n      }, [imageBitmap]);\n    } catch (e) {\n      self.postMessage({\n        error: e,\n        uuid: event.data.uuid,\n        id: event.data.id\n      });\n    }\n  };\n})();\n", WORKER_URL = null, WorkerInstance = class {
	constructor() {
		WORKER_URL ||= URL.createObjectURL(new Blob([WORKER_CODE], { type: "application/javascript" })), this.worker = new Worker(WORKER_URL);
	}
};
WorkerInstance.revokeObjectURL = function() {
	WORKER_URL &&= (URL.revokeObjectURL(WORKER_URL), null);
};
var UUID = 0, MAX_WORKERS, WorkerManager = new class {
	constructor() {
		this._initialized = !1, this._createdWorkers = 0, this.workerPool = [], this.queue = [], this.resolveHash = {};
	}
	isImageBitmapSupported() {
		return this._isImageBitmapSupported === void 0 && (this._isImageBitmapSupported = new Promise((_) => {
			let { worker: C } = new WorkerInstance$1();
			C.addEventListener("message", (T) => {
				C.terminate(), WorkerInstance$1.revokeObjectURL(), _(T.data);
			});
		})), this._isImageBitmapSupported;
	}
	loadImageBitmap(_) {
		return this._run("loadImageBitmap", [_]);
	}
	async _initWorkers() {
		this._initialized ||= !0;
	}
	getWorker() {
		MAX_WORKERS === void 0 && (MAX_WORKERS = navigator.hardwareConcurrency || 4);
		let _ = this.workerPool.pop();
		return !_ && this._createdWorkers < MAX_WORKERS && (this._createdWorkers++, _ = new WorkerInstance().worker, _.addEventListener("message", (_) => {
			this.complete(_.data), this.returnWorker(_.target), this.next();
		})), _;
	}
	returnWorker(_) {
		this.workerPool.push(_);
	}
	complete(_) {
		_.error === void 0 ? this.resolveHash[_.uuid].resolve(_.data) : this.resolveHash[_.uuid].reject(_.error), this.resolveHash[_.uuid] = null;
	}
	async _run(_, C) {
		await this._initWorkers();
		let T = new Promise((T, E) => {
			this.queue.push({
				id: _,
				arguments: C,
				resolve: T,
				reject: E
			});
		});
		return this.next(), T;
	}
	next() {
		if (!this.queue.length) return;
		let _ = this.getWorker();
		if (!_) return;
		let C = this.queue.pop(), T = C.id;
		this.resolveHash[UUID] = {
			resolve: C.resolve,
			reject: C.reject
		}, _.postMessage({
			data: C.arguments,
			uuid: UUID++,
			id: T
		});
	}
}();
function createTexture(_, C, T) {
	_.resource.internal = !0;
	let E = new Texture(_), D = () => {
		delete C.promiseCache[T], Cache.has(T) && Cache.remove(T);
	};
	return E.baseTexture.once("destroyed", () => {
		T in C.promiseCache && (console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."), D());
	}), E.once("destroyed", () => {
		_.destroyed || (console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), D());
	}), E;
}
var validImageExtensions = [
	".jpeg",
	".jpg",
	".png",
	".webp",
	".avif"
], validImageMIMEs = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif"
];
async function loadImageBitmap(_) {
	let C = await settings.ADAPTER.fetch(_);
	if (!C.ok) throw Error(`[loadImageBitmap] Failed to fetch ${_}: ${C.status} ${C.statusText}`);
	let T = await C.blob();
	return await createImageBitmap(T);
}
var loadTextures = {
	name: "loadTextures",
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.High
	},
	config: {
		preferWorkers: !0,
		preferCreateImageBitmap: !0,
		crossOrigin: "anonymous"
	},
	test(_) {
		return checkDataUrl(_, validImageMIMEs) || checkExtension(_, validImageExtensions);
	},
	async load(_, C, T) {
		let E = globalThis.createImageBitmap && this.config.preferCreateImageBitmap, D;
		D = E ? this.config.preferWorkers && await WorkerManager.isImageBitmapSupported() ? await WorkerManager.loadImageBitmap(_) : await loadImageBitmap(_) : await new Promise((C, T) => {
			let E = new Image();
			E.crossOrigin = this.config.crossOrigin, E.src = _, E.complete ? C(E) : (E.onload = () => C(E), E.onerror = (_) => T(_));
		});
		let O = { ...C.data };
		O.resolution ??= getResolutionOfUrl(_), E && O.resourceOptions?.ownsImageBitmap === void 0 && (O.resourceOptions = { ...O.resourceOptions }, O.resourceOptions.ownsImageBitmap = !0);
		let A = new BaseTexture(D, O);
		return A.resource.src = _, createTexture(A, T, _);
	},
	unload(_) {
		_.destroy(!0);
	}
};
extensions.add(loadTextures);
var validSVGExtension = ".svg", validSVGMIME = "image/svg+xml", loadSVG = {
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.High
	},
	name: "loadSVG",
	test(_) {
		return checkDataUrl(_, validSVGMIME) || checkExtension(_, validSVGExtension);
	},
	async testParse(_) {
		return SVGResource.test(_);
	},
	async parse(_, C, T) {
		let E = new SVGResource(_, C?.data?.resourceOptions);
		await E.load();
		let D = new BaseTexture(E, {
			resolution: getResolutionOfUrl(_),
			...C?.data
		});
		return D.resource.src = C.src, createTexture(D, T, C.src);
	},
	async load(_, C) {
		return (await settings.ADAPTER.fetch(_)).text();
	},
	unload: loadTextures.unload
};
extensions.add(loadSVG);
var validVideoExtensions = [
	".mp4",
	".m4v",
	".webm",
	".ogv"
], validVideoMIMEs = [
	"video/mp4",
	"video/webm",
	"video/ogg"
], loadVideo = {
	name: "loadVideo",
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.High
	},
	config: {
		defaultAutoPlay: !0,
		defaultUpdateFPS: 0,
		defaultLoop: !1,
		defaultMuted: !1,
		defaultPlaysinline: !0
	},
	test(_) {
		return checkDataUrl(_, validVideoMIMEs) || checkExtension(_, validVideoExtensions);
	},
	async load(_, C, T) {
		let E, D = await (await settings.ADAPTER.fetch(_)).blob(), O = URL.createObjectURL(D);
		try {
			let D = new VideoResource(O, {
				autoPlay: this.config.defaultAutoPlay,
				updateFPS: this.config.defaultUpdateFPS,
				loop: this.config.defaultLoop,
				muted: this.config.defaultMuted,
				playsinline: this.config.defaultPlaysinline,
				...C?.data?.resourceOptions,
				autoLoad: !0
			});
			await D.load();
			let A = new BaseTexture(D, {
				alphaMode: await detectVideoAlphaMode(),
				resolution: getResolutionOfUrl(_),
				...C?.data
			});
			A.resource.src = _, E = createTexture(A, T, _), E.baseTexture.once("destroyed", () => {
				URL.revokeObjectURL(O);
			});
		} catch (_) {
			throw URL.revokeObjectURL(O), _;
		}
		return E;
	},
	unload(_) {
		_.destroy(!0);
	}
};
extensions.add(loadVideo);
var Resolver = class {
	constructor() {
		this._defaultBundleIdentifierOptions = {
			connector: "-",
			createBundleAssetId: (_, C) => `${_}${this._bundleIdConnector}${C}`,
			extractAssetIdFromBundle: (_, C) => C.replace(`${_}${this._bundleIdConnector}`, "")
		}, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
	}
	setBundleIdentifier(_) {
		if (this._bundleIdConnector = _.connector ?? this._bundleIdConnector, this._createBundleAssetId = _.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = _.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar") throw Error("[Resolver] GenerateBundleAssetId are not working correctly");
	}
	prefer(..._) {
		_.forEach((_) => {
			this._preferredOrder.push(_), _.priority ||= Object.keys(_.params);
		}), this._resolverHash = {};
	}
	set basePath(_) {
		this._basePath = _;
	}
	get basePath() {
		return this._basePath;
	}
	set rootPath(_) {
		this._rootPath = _;
	}
	get rootPath() {
		return this._rootPath;
	}
	get parsers() {
		return this._parsers;
	}
	reset() {
		this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
	}
	setDefaultSearchParams(_) {
		if (typeof _ == "string") this._defaultSearchParams = _;
		else {
			let C = _;
			this._defaultSearchParams = Object.keys(C).map((_) => `${encodeURIComponent(_)}=${encodeURIComponent(C[_])}`).join("&");
		}
	}
	getAlias(_) {
		let { alias: C, name: T, src: E, srcs: D } = _;
		return convertToList(C || T || E || D, (_) => typeof _ == "string" ? _ : Array.isArray(_) ? _.map((_) => _?.src ?? _?.srcs ?? _) : _?.src || _?.srcs ? _.src ?? _.srcs : _, !0);
	}
	addManifest(_) {
		this._manifest && console.warn("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = _, _.bundles.forEach((_) => {
			this.addBundle(_.name, _.assets);
		});
	}
	addBundle(_, C) {
		let T = [];
		Array.isArray(C) ? C.forEach((C) => {
			let E = C.src ?? C.srcs, D = C.alias ?? C.name, O;
			if (typeof D == "string") {
				let C = this._createBundleAssetId(_, D);
				T.push(C), O = [D, C];
			} else {
				let C = D.map((C) => this._createBundleAssetId(_, C));
				T.push(...C), O = [...D, ...C];
			}
			this.add({
				...C,
				alias: O,
				src: E
			});
		}) : Object.keys(C).forEach((E) => {
			let D = [E, this._createBundleAssetId(_, E)];
			if (typeof C[E] == "string") this.add({
				alias: D,
				src: C[E]
			});
			else if (Array.isArray(C[E])) this.add({
				alias: D,
				src: C[E]
			});
			else {
				let _ = C[E], T = _.src ?? _.srcs;
				this.add({
					..._,
					alias: D,
					src: Array.isArray(T) ? T : [T]
				});
			}
			T.push(...D);
		}), this._bundles[_] = T;
	}
	add(_, C, T, E, D) {
		let O = [];
		typeof _ == "string" || Array.isArray(_) && typeof _[0] == "string" ? (deprecation("7.2.0", "Assets.add now uses an object instead of individual parameters.\nPlease use Assets.add({ alias, src, data, format, loadParser }) instead."), O.push({
			alias: _,
			src: C,
			data: T,
			format: E,
			loadParser: D
		})) : Array.isArray(_) ? O.push(..._) : O.push(_);
		let A = (_) => {
			this.hasKey(_) && console.warn(`[Resolver] already has key: ${_} overwriting`);
		};
		convertToList(O).forEach((_) => {
			let { src: C, srcs: T } = _, { data: E, format: D, loadParser: O } = _, P = convertToList(C || T).map((_) => typeof _ == "string" ? createStringVariations(_) : Array.isArray(_) ? _ : [_]), F = this.getAlias(_);
			Array.isArray(F) ? F.forEach(A) : A(F);
			let I = [];
			P.forEach((_) => {
				_.forEach((_) => {
					let C = {};
					if (typeof _ != "object") {
						C.src = _;
						for (let T = 0; T < this._parsers.length; T++) {
							let E = this._parsers[T];
							if (E.test(_)) {
								C = E.parse(_);
								break;
							}
						}
					} else E = _.data ?? E, D = _.format ?? D, O = _.loadParser ?? O, C = {
						...C,
						..._
					};
					if (!F) throw Error(`[Resolver] alias is undefined for this asset: ${C.src}`);
					C = this.buildResolvedAsset(C, {
						aliases: F,
						data: E,
						format: D,
						loadParser: O
					}), I.push(C);
				});
			}), F.forEach((_) => {
				this._assetMap[_] = I;
			});
		});
	}
	resolveBundle(_) {
		let C = isSingleItem(_);
		_ = convertToList(_);
		let T = {};
		return _.forEach((_) => {
			let C = this._bundles[_];
			if (C) {
				let E = this.resolve(C), D = {};
				for (let C in E) {
					let T = E[C];
					D[this._extractAssetIdFromBundle(_, C)] = T;
				}
				T[_] = D;
			}
		}), C ? T[_[0]] : T;
	}
	resolveUrl(_) {
		let C = this.resolve(_);
		if (typeof _ != "string") {
			let _ = {};
			for (let T in C) _[T] = C[T].src;
			return _;
		}
		return C.src;
	}
	resolve(_) {
		let C = isSingleItem(_);
		_ = convertToList(_);
		let T = {};
		return _.forEach((_) => {
			if (!this._resolverHash[_]) if (this._assetMap[_]) {
				let C = this._assetMap[_], T = C[0], E = this._getPreferredOrder(C);
				E?.priority.forEach((_) => {
					E.params[_].forEach((T) => {
						let E = C.filter((C) => C[_] ? C[_] === T : !1);
						E.length && (C = E);
					});
				}), this._resolverHash[_] = C[0] ?? T;
			} else this._resolverHash[_] = this.buildResolvedAsset({
				alias: [_],
				src: _
			}, {});
			T[_] = this._resolverHash[_];
		}), C ? T[_[0]] : T;
	}
	hasKey(_) {
		return !!this._assetMap[_];
	}
	hasBundle(_) {
		return !!this._bundles[_];
	}
	_getPreferredOrder(_) {
		for (let C = 0; C < _.length; C++) {
			let C = _[0], T = this._preferredOrder.find((_) => _.params.format.includes(C.format));
			if (T) return T;
		}
		return this._preferredOrder[0];
	}
	_appendDefaultSearchParams(_) {
		return this._defaultSearchParams ? `${_}${/\?/.test(_) ? "&" : "?"}${this._defaultSearchParams}` : _;
	}
	buildResolvedAsset(_, C) {
		let { aliases: T, data: E, loadParser: D, format: O } = C;
		return (this._basePath || this._rootPath) && (_.src = path.toAbsolute(_.src, this._basePath, this._rootPath)), _.alias = T ?? _.alias ?? [_.src], _.src = this._appendDefaultSearchParams(_.src), _.data = {
			...E || {},
			..._.data
		}, _.loadParser = D ?? _.loadParser, _.format = O ?? _.format ?? path.extname(_.src).slice(1), _.srcs = _.src, _.name = _.alias, _;
	}
}, AssetsClass = class {
	constructor() {
		this._detections = [], this._initialized = !1, this.resolver = new Resolver(), this.loader = new Loader(), this.cache = Cache, this._backgroundLoader = new BackgroundLoader(this.loader), this._backgroundLoader.active = !0, this.reset();
	}
	async init(_ = {}) {
		if (this._initialized) {
			console.warn("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
			return;
		}
		if (this._initialized = !0, _.defaultSearchParams && this.resolver.setDefaultSearchParams(_.defaultSearchParams), _.basePath && (this.resolver.basePath = _.basePath), _.bundleIdentifier && this.resolver.setBundleIdentifier(_.bundleIdentifier), _.manifest) {
			let C = _.manifest;
			typeof C == "string" && (C = await this.load(C)), this.resolver.addManifest(C);
		}
		let C = _.texturePreference?.resolution ?? 1, T = typeof C == "number" ? [C] : C, E = await this._detectFormats({
			preferredFormats: _.texturePreference?.format,
			skipDetections: _.skipDetections,
			detections: this._detections
		});
		this.resolver.prefer({ params: {
			format: E,
			resolution: T
		} }), _.preferences && this.setPreferences(_.preferences);
	}
	add(_, C, T, E, D) {
		this.resolver.add(_, C, T, E, D);
	}
	async load(_, C) {
		this._initialized || await this.init();
		let T = isSingleItem(_), E = convertToList(_).map((_) => {
			if (typeof _ != "string") {
				let C = this.resolver.getAlias(_);
				return C.some((_) => !this.resolver.hasKey(_)) && this.add(_), Array.isArray(C) ? C[0] : C;
			}
			return this.resolver.hasKey(_) || this.add({
				alias: _,
				src: _
			}), _;
		}), D = this.resolver.resolve(E), O = await this._mapLoadToResolve(D, C);
		return T ? O[E[0]] : O;
	}
	addBundle(_, C) {
		this.resolver.addBundle(_, C);
	}
	async loadBundle(_, C) {
		this._initialized || await this.init();
		let T = !1;
		typeof _ == "string" && (T = !0, _ = [_]);
		let E = this.resolver.resolveBundle(_), D = {}, O = Object.keys(E), A = 0, P = 0, F = () => {
			C?.(++A / P);
		}, I = O.map((_) => {
			let C = E[_];
			return P += Object.keys(C).length, this._mapLoadToResolve(C, F).then((C) => {
				D[_] = C;
			});
		});
		return await Promise.all(I), T ? D[_[0]] : D;
	}
	async backgroundLoad(_) {
		this._initialized || await this.init(), typeof _ == "string" && (_ = [_]);
		let C = this.resolver.resolve(_);
		this._backgroundLoader.add(Object.values(C));
	}
	async backgroundLoadBundle(_) {
		this._initialized || await this.init(), typeof _ == "string" && (_ = [_]);
		let C = this.resolver.resolveBundle(_);
		Object.values(C).forEach((_) => {
			this._backgroundLoader.add(Object.values(_));
		});
	}
	reset() {
		this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1;
	}
	get(_) {
		if (typeof _ == "string") return Cache.get(_);
		let C = {};
		for (let T = 0; T < _.length; T++) C[T] = Cache.get(_[T]);
		return C;
	}
	async _mapLoadToResolve(_, C) {
		let T = Object.values(_), E = Object.keys(_);
		this._backgroundLoader.active = !1;
		let D = await this.loader.load(T, C);
		this._backgroundLoader.active = !0;
		let O = {};
		return T.forEach((_, C) => {
			let T = D[_.src], A = [_.src];
			_.alias && A.push(..._.alias), O[E[C]] = T, Cache.set(A, T);
		}), O;
	}
	async unload(_) {
		this._initialized || await this.init();
		let C = convertToList(_).map((_) => typeof _ == "string" ? _ : _.src), T = this.resolver.resolve(C);
		await this._unloadFromResolved(T);
	}
	async unloadBundle(_) {
		this._initialized || await this.init(), _ = convertToList(_);
		let C = this.resolver.resolveBundle(_), T = Object.keys(C).map((_) => this._unloadFromResolved(C[_]));
		await Promise.all(T);
	}
	async _unloadFromResolved(_) {
		let C = Object.values(_);
		C.forEach((_) => {
			Cache.remove(_.src);
		}), await this.loader.unload(C);
	}
	async _detectFormats(_) {
		let C = [];
		_.preferredFormats && (C = Array.isArray(_.preferredFormats) ? _.preferredFormats : [_.preferredFormats]);
		for (let T of _.detections) _.skipDetections || await T.test() ? C = await T.add(C) : _.skipDetections || (C = await T.remove(C));
		return C = C.filter((_, T) => C.indexOf(_) === T), C;
	}
	get detections() {
		return this._detections;
	}
	get preferWorkers() {
		return loadTextures.config.preferWorkers;
	}
	set preferWorkers(_) {
		deprecation("7.2.0", "Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."), this.setPreferences({ preferWorkers: _ });
	}
	setPreferences(_) {
		this.loader.parsers.forEach((C) => {
			C.config && Object.keys(C.config).filter((C) => C in _).forEach((T) => {
				C.config[T] = _[T];
			});
		});
	}
}, Assets = new AssetsClass();
extensions.handleByList(ExtensionType.LoadParser, Assets.loader.parsers).handleByList(ExtensionType.ResolveParser, Assets.resolver.parsers).handleByList(ExtensionType.CacheParser, Assets.cache.parsers).handleByList(ExtensionType.DetectionParser, Assets.detections);
var cacheTextureArray = {
	extension: ExtensionType.CacheParser,
	test: (_) => Array.isArray(_) && _.every((_) => _ instanceof Texture),
	getCacheableAssets: (_, C) => {
		let T = {};
		return _.forEach((_) => {
			C.forEach((C, E) => {
				T[_ + (E === 0 ? "" : E + 1)] = C;
			});
		}), T;
	}
};
extensions.add(cacheTextureArray);
async function testImageFormat(_) {
	if ("Image" in globalThis) return new Promise((C) => {
		let T = new Image();
		T.onload = () => {
			C(!0);
		}, T.onerror = () => {
			C(!1);
		}, T.src = _;
	});
	if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
		try {
			let C = await (await fetch(_)).blob();
			await createImageBitmap(C);
		} catch {
			return !1;
		}
		return !0;
	}
	return !1;
}
var detectAvif = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: 1
	},
	test: async () => testImageFormat("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
	add: async (_) => [..._, "avif"],
	remove: async (_) => _.filter((_) => _ !== "avif")
};
extensions.add(detectAvif);
var detectWebp = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: 0
	},
	test: async () => testImageFormat("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),
	add: async (_) => [..._, "webp"],
	remove: async (_) => _.filter((_) => _ !== "webp")
};
extensions.add(detectWebp);
var imageFormats = [
	"png",
	"jpg",
	"jpeg"
], detectDefaults = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: -1
	},
	test: () => Promise.resolve(!0),
	add: async (_) => [..._, ...imageFormats],
	remove: async (_) => _.filter((_) => !imageFormats.includes(_))
};
extensions.add(detectDefaults);
var inWorker = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function testVideoFormat(_) {
	return inWorker ? !1 : document.createElement("video").canPlayType(_) !== "";
}
var detectWebm = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: 0
	},
	test: async () => testVideoFormat("video/webm"),
	add: async (_) => [..._, "webm"],
	remove: async (_) => _.filter((_) => _ !== "webm")
};
extensions.add(detectWebm);
var detectMp4 = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: 0
	},
	test: async () => testVideoFormat("video/mp4"),
	add: async (_) => [
		..._,
		"mp4",
		"m4v"
	],
	remove: async (_) => _.filter((_) => _ !== "mp4" && _ !== "m4v")
};
extensions.add(detectMp4);
var detectOgv = {
	extension: {
		type: ExtensionType.DetectionParser,
		priority: 0
	},
	test: async () => testVideoFormat("video/ogg"),
	add: async (_) => [..._, "ogv"],
	remove: async (_) => _.filter((_) => _ !== "ogv")
};
extensions.add(detectOgv);
var resolveTextureUrl = {
	extension: ExtensionType.ResolveParser,
	test: loadTextures.test,
	parse: (_) => ({
		resolution: parseFloat(settings.RETINA_PREFIX.exec(_)?.[1] ?? "1"),
		format: path.extname(_).slice(1),
		src: _
	})
};
extensions.add(resolveTextureUrl);
export { Assets, AssetsClass, Cache, LoaderParserPriority, cacheTextureArray, checkDataUrl, checkExtension, convertToList, copySearchParams, createStringVariations, createTexture, detectAvif, detectDefaults, detectMp4, detectOgv, detectWebm, detectWebp, getFontFamilyName, isSingleItem, loadImageBitmap, loadJson, loadSVG, loadTextures, loadTxt, loadVideo, loadWebFont, resolveTextureUrl };

//# sourceMappingURL=lib.js.map