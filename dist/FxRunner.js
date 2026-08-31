import { t as e } from "./Fx.js";
import { n as t } from "./fxRegistry.js";
//#region src/ts/fxPresets.ts
var n = "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n	vTextureCoord = (aPos + 1.0) * 0.5;\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}", r = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }", i = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float tick;\nuniform vec2 resolution;", a = {
	wave: `${i}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vTextureCoord;
	uv.x += sin(uv.y * freq * 6.2831853 + tick * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(uSampler, uv);
}`,
	rgbShift: `${i}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(tick * 2.0)));
	float r = texture2D(uSampler, vTextureCoord + vec2(d, 0.0)).r;
	vec4  g = texture2D(uSampler, vTextureCoord);
	float b = texture2D(uSampler, vTextureCoord - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,
	snow: `${i}
uniform float amp;
uniform float freq;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	vec2 uv = vTextureCoord;
	uv.x *= resolution.x / max(resolution.y, 1.0);	// 正方セルにするアスペクト補正
	float layers = clamp(freq, 1.0, 6.0);
	float snow = 0.0;
	for (float i = 0.0; i < 6.0; i++) {
		if (i >= layers) break;
		float scale = 8.0 + i * 6.0;
		vec2 gv = uv * scale;
		gv.y += tick * (0.3 + 0.15 * i) * amp * scale;	// 下へ流す
		gv.x += sin((gv.y + i) * 0.5) * 0.5;				// 横ゆらぎ
		vec2 id = floor(gv);
		float rnd = hash(id + i * 13.0);
		vec2 c = fract(gv) - 0.5 - (vec2(rnd, fract(rnd * 7.0)) - 0.5) * 0.6;
		float flake = smoothstep(0.09 + 0.02 * i, 0.0, length(c)) * (0.4 + 0.6 * rnd);
		snow += flake * (1.0 - i / 8.0);
	}
	snow = clamp(snow, 0.0, 1.0);
	gl_FragColor = vec4(mix(src.rgb, vec3(1.0), snow), max(src.a, snow));
}`,
	rain: `${i}
uniform float amp;
uniform float freq;
uniform float shift;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }	// snow と同じ流儀
float rainLayer(vec2 uv, float density, float speed, float tail, float seed) {
	float aspect = resolution.x / max(resolution.y, 1.0);
	float cols = floor(18.0 + density * 10.0);
	float gx = uv.x * cols * aspect;
	float id = floor(gx);
	float lane = fract(gx) - 0.5;
	float h0 = hash(vec2(id, seed));
	float h1 = hash(vec2(id, seed + 7.0));
	float on = step(h0, clamp(0.08 + density * 0.06, 0.0, 0.9));	// 一部の帯だけ雨脚
	float segs = 1.5 + h1 * 2.5;
	float y = fract(uv.y * segs + tick * speed * (0.7 + h1) + h0 * 6.2831);	// y-up＝+tick で下へ
	float body = smoothstep(tail, 0.0, y) * smoothstep(0.0, 0.02, y);		// 先端が明・上へ尾
	float thin = smoothstep(0.5, 0.0, abs(lane) * (2.4 + density * 0.15));
	return on * body * thin * (0.4 + 0.6 * h0);
}
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	float heavy = clamp((freq - 2.0) / 6.0, 0.0, 1.0);	// 0=弱雨 … 1=豪雨（freq 2→8）
	float tail = clamp(0.05 + shift * 0.02, 0.06, 0.6);
	vec2 uv = vTextureCoord;
	uv.x += uv.y * mix(0.06, 0.16, heavy);				// 風のシア（豪雨ほど寝かせる）
	float r = rainLayer(uv, freq * 0.6, amp * 0.8, tail * 1.4, 11.0)		// 奥
		+ rainLayer(uv, freq, amp * 1.2, tail, 23.0)						// 中
		+ rainLayer(uv, freq * 0.5, amp * 1.7, tail * 0.7, 41.0) * mix(0.6, 1.1, heavy);	// 手前
	r = clamp(r, 0.0, 1.0);
	vec3 col = mix(src.rgb, src.rgb * 0.80, heavy);		// 曇天で暗く
	col += vec3(0.03, 0.04, 0.05) * heavy;				// うっすら雨幕
	col += vec3(0.80, 0.86, 1.0) * r * mix(0.5, 0.85, heavy);	// 雨脚のハイライト
	gl_FragColor = vec4(col, src.a);
}`
};
//#endregion
//#region src/ts/FxRunner.ts
function o(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error(`画像が読めません: ${e.slice(0, 64)}`)), r.src = e;
	});
}
function s(e, t, n) {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`シェーダのコンパイルに失敗: ${t ?? ""}`);
	}
	return r;
}
function c(e, t, n) {
	let r = s(e, e.FRAGMENT_SHADER, n), i = e.createProgram();
	if (e.attachShader(i, t), e.attachShader(i, r), e.bindAttribLocation(i, 0, "aPos"), e.linkProgram(i), e.detachShader(i, r), e.deleteShader(r), !e.getProgramParameter(i, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(i);
		throw e.deleteProgram(i), Error(`シェーダのリンクに失敗: ${t ?? ""}`);
	}
	return i;
}
function l(e, t, n, r) {
	let i = e.createTexture();
	return e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), t ? (e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1)) : e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, n, r, 0, e.RGBA, e.UNSIGNED_BYTE, null), i;
}
async function u(e) {
	let t = e.source, n;
	n = typeof t == "function" ? t() : typeof t == "string" ? await o(t) : t;
	let r = typeof t == "function" ? t : null, i = Math.max(1, n instanceof HTMLImageElement ? n.naturalWidth : n.width), a = Math.max(1, n instanceof HTMLImageElement ? n.naturalHeight : n.height), s = e.canvas;
	s.width = i, s.height = a;
	let c = s.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!c) throw Error("WebGLコンテキストが取得できません");
	try {
		return d(c, s, e.aFx, n, i, a, e.active, r);
	} catch (e) {
		throw c.getExtension("WEBGL_lose_context")?.loseContext(), e;
	}
}
function d(o, u, d, f, p, m, h, g) {
	let _ = s(o, o.VERTEX_SHADER, n), v = (t, n) => {
		let r = c(o, _, t);
		return {
			pg: r,
			fx: n,
			pausedAccMs: 0,
			pausedAt: 0,
			uSampler: o.getUniformLocation(r, "uSampler"),
			uTick: o.getUniformLocation(r, "tick"),
			uRes: o.getUniformLocation(r, "resolution"),
			uParam: Object.fromEntries(e.map((e) => [e, o.getUniformLocation(r, e)])),
			uColor: o.getUniformLocation(r, "color")
		};
	}, y = (e) => {
		let n = a[e.fx];
		if (n) return n;
		let r = t(e.fx);
		if (r !== void 0) return `${i}\n${r}`;
		throw Error(`未知の fx: ${e.fx}（[def_fx] 未定義？）`);
	}, b = (e) => e.map((e) => e.fx).join(""), x = d.map((e) => v(y(e), e)), S = b(d), C = v(r, {}), w = o.createBuffer();
	o.bindBuffer(o.ARRAY_BUFFER, w), o.bufferData(o.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), o.STATIC_DRAW), o.enableVertexAttribArray(0), o.vertexAttribPointer(0, 2, o.FLOAT, !1, 0, 0);
	let T = l(o, f, p, m), E = [0, 1].map(() => {
		let e = l(o, null, p, m), t = o.createFramebuffer();
		return o.bindFramebuffer(o.FRAMEBUFFER, t), o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, e, 0), {
			tex: e,
			fb: t
		};
	});
	o.bindFramebuffer(o.FRAMEBUFFER, null), o.viewport(0, 0, p, m), o.disable(o.DEPTH_TEST), o.disable(o.BLEND);
	let D = (t, n, r, i) => {
		o.bindFramebuffer(o.FRAMEBUFFER, r), o.clearColor(0, 0, 0, 0), o.clear(o.COLOR_BUFFER_BIT), o.useProgram(t.pg), o.activeTexture(o.TEXTURE0), o.bindTexture(o.TEXTURE_2D, n), t.uSampler && o.uniform1i(t.uSampler, 0), t.uTick && o.uniform1f(t.uTick, i), t.uRes && o.uniform2f(t.uRes, p, m);
		for (let n of e) {
			let e = t.uParam[n];
			e && o.uniform1f(e, t.fx.params?.[n] ?? 0);
		}
		if (t.uColor) {
			let e = t.fx.color ?? [
				0,
				0,
				0
			];
			o.uniform3f(t.uColor, e[0], e[1], e[2]);
		}
		o.drawArrays(o.TRIANGLE_STRIP, 0, 4);
	}, O = performance.now(), k = 0, A = !0, j = h, M = (e) => {
		k === 0 != (e === 0) && (u.dataset.fxRunning = e === 0 ? "0" : "1"), k = e;
	}, N = () => {
		let e = performance.now(), t = e - O, n = !1;
		g && j && (o.bindTexture(o.TEXTURE_2D, T), o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, !0), o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, g()), o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, !1), n = !0);
		for (let r = 0; r < x.length; ++r) {
			let i = x[r], a = !i.fx.enabled || !j;
			a && i.pausedAt === 0 ? i.pausedAt = e : !a && i.pausedAt !== 0 && (i.pausedAccMs += e - i.pausedAt, i.pausedAt = 0);
			let o = t - i.pausedAccMs - (i.pausedAt === 0 ? 0 : e - i.pausedAt), s = i.fx.time > 0 && o >= i.fx.time;
			!s && !a && (n = !0);
			let c = r === 0 ? T : E[(r - 1) % 2].tex, l = o / 1e3 * (i.fx.speed || 1);
			D(s ? C : i, c, E[r % 2].fb, l);
		}
		return D(C, E[(x.length - 1) % 2].tex, null, 0), n;
	}, P = () => {
		A && M(N() ? requestAnimationFrame(P) : 0);
	};
	return N(), M(requestAnimationFrame(P)), {
		update(e, t) {
			if (!A) return;
			j = t;
			let n = b(e);
			if (n !== S) try {
				let t = e.map((e) => v(y(e), e));
				for (let e of x) o.deleteProgram(e.pg);
				let r = performance.now() - O;
				for (let e of t) e.pausedAccMs = r;
				x = t, S = n;
			} catch (e) {
				console.error(`[add_fx] ${String(e)}`);
			}
			else for (let t = 0; t < x.length; ++t) {
				let n = e[t];
				n && (x[t].fx = n);
			}
			k === 0 && M(requestAnimationFrame(P));
		},
		dispose() {
			if (A) {
				A = !1, cancelAnimationFrame(k), o.deleteShader(_), o.deleteTexture(T);
				for (let { tex: e, fb: t } of E) o.deleteTexture(e), o.deleteFramebuffer(t);
				o.deleteBuffer(w);
				for (let e of x) o.deleteProgram(e.pg);
				o.deleteProgram(C.pg), o.getExtension("WEBGL_lose_context")?.loseContext(), g?.dispose?.();
			}
		}
	};
}
//#endregion
export { u as runFx };

//# sourceMappingURL=FxRunner.js.map