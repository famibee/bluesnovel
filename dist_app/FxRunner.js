import { n as e } from "./fxRegistry.js";
//#region src/ts/fxPresets.ts
var t = "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n	vTextureCoord = (aPos + 1.0) * 0.5;\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}", n = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }", r = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float tick;\nuniform vec2 resolution;", i = {
	wave: `${r}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vTextureCoord;
	uv.x += sin(uv.y * freq * 6.2831853 + tick * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(uSampler, uv);
}`,
	rgbShift: `${r}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(tick * 2.0)));
	float r = texture2D(uSampler, vTextureCoord + vec2(d, 0.0)).r;
	vec4  g = texture2D(uSampler, vTextureCoord);
	float b = texture2D(uSampler, vTextureCoord - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,
	snow: `${r}
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
	rain: `${r}
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
function a(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error(`画像が読めません: ${e.slice(0, 64)}`)), r.src = e;
	});
}
function o(e, t, n) {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`シェーダのコンパイルに失敗: ${t ?? ""}`);
	}
	return r;
}
function s(e, t, n) {
	let r = o(e, e.FRAGMENT_SHADER, n), i = e.createProgram();
	if (e.attachShader(i, t), e.attachShader(i, r), e.bindAttribLocation(i, 0, "aPos"), e.linkProgram(i), e.detachShader(i, r), e.deleteShader(r), !e.getProgramParameter(i, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(i);
		throw e.deleteProgram(i), Error(`シェーダのリンクに失敗: ${t ?? ""}`);
	}
	return i;
}
function c(e, t, n, r) {
	let i = e.createTexture();
	return e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), t ? (e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1)) : e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, n, r, 0, e.RGBA, e.UNSIGNED_BYTE, null), i;
}
async function l(e) {
	let t = e.source, n;
	n = typeof t == "function" ? t() : typeof t == "string" ? await a(t) : t;
	let r = typeof t == "function" ? t : null, i = Math.max(1, n instanceof HTMLImageElement ? n.naturalWidth : n.width), o = Math.max(1, n instanceof HTMLImageElement ? n.naturalHeight : n.height), s = e.canvas;
	s.width = i, s.height = o;
	let c = s.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!c) throw Error("WebGLコンテキストが取得できません");
	try {
		return u(c, s, e.aFx, n, i, o, e.active, r);
	} catch (e) {
		throw c.getExtension("WEBGL_lose_context")?.loseContext(), e;
	}
}
function u(a, l, u, d, f, p, m, h) {
	let g = o(a, a.VERTEX_SHADER, t), _ = (e, t) => {
		let n = s(a, g, e);
		return {
			pg: n,
			fx: t,
			pausedAccMs: 0,
			pausedAt: 0,
			uSampler: a.getUniformLocation(n, "uSampler"),
			uTick: a.getUniformLocation(n, "tick"),
			uRes: a.getUniformLocation(n, "resolution"),
			uAmp: a.getUniformLocation(n, "amp"),
			uFreq: a.getUniformLocation(n, "freq"),
			uShift: a.getUniformLocation(n, "shift")
		};
	}, v = (t) => {
		let n = i[t.fx];
		if (n) return n;
		let a = e(t.fx);
		if (a !== void 0) return `${r}\n${a}`;
		throw Error(`未知の fx: ${t.fx}（[def_fx] 未定義？）`);
	}, y = (e) => e.map((e) => e.fx).join(""), b = u.map((e) => _(v(e), e)), x = y(u), S = _(n, {}), C = a.createBuffer();
	a.bindBuffer(a.ARRAY_BUFFER, C), a.bufferData(a.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), a.STATIC_DRAW), a.enableVertexAttribArray(0), a.vertexAttribPointer(0, 2, a.FLOAT, !1, 0, 0);
	let w = c(a, d, f, p), T = [0, 1].map(() => {
		let e = c(a, null, f, p), t = a.createFramebuffer();
		return a.bindFramebuffer(a.FRAMEBUFFER, t), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, e, 0), {
			tex: e,
			fb: t
		};
	});
	a.bindFramebuffer(a.FRAMEBUFFER, null), a.viewport(0, 0, f, p), a.disable(a.DEPTH_TEST), a.disable(a.BLEND);
	let E = (e, t, n, r) => {
		a.bindFramebuffer(a.FRAMEBUFFER, n), a.clearColor(0, 0, 0, 0), a.clear(a.COLOR_BUFFER_BIT), a.useProgram(e.pg), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, t), e.uSampler && a.uniform1i(e.uSampler, 0), e.uTick && a.uniform1f(e.uTick, r), e.uRes && a.uniform2f(e.uRes, f, p), e.uAmp && a.uniform1f(e.uAmp, e.fx.params?.amp ?? 0), e.uFreq && a.uniform1f(e.uFreq, e.fx.params?.freq ?? 0), e.uShift && a.uniform1f(e.uShift, e.fx.params?.shift ?? 0), a.drawArrays(a.TRIANGLE_STRIP, 0, 4);
	}, D = performance.now(), O = 0, k = !0, A = m, j = (e) => {
		O === 0 != (e === 0) && (l.dataset.fxRunning = e === 0 ? "0" : "1"), O = e;
	}, M = () => {
		let e = performance.now(), t = e - D, n = !1;
		h && A && (a.bindTexture(a.TEXTURE_2D, w), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, h()), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !1), n = !0);
		for (let r = 0; r < b.length; ++r) {
			let i = b[r], a = !i.fx.enabled || !A;
			a && i.pausedAt === 0 ? i.pausedAt = e : !a && i.pausedAt !== 0 && (i.pausedAccMs += e - i.pausedAt, i.pausedAt = 0);
			let o = t - i.pausedAccMs - (i.pausedAt === 0 ? 0 : e - i.pausedAt), s = i.fx.time > 0 && o >= i.fx.time;
			!s && !a && (n = !0);
			let c = r === 0 ? w : T[(r - 1) % 2].tex, l = o / 1e3 * (i.fx.speed || 1);
			E(s ? S : i, c, T[r % 2].fb, l);
		}
		return E(S, T[(b.length - 1) % 2].tex, null, 0), n;
	}, N = () => {
		k && j(M() ? requestAnimationFrame(N) : 0);
	};
	return M(), j(requestAnimationFrame(N)), {
		update(e, t) {
			if (!k) return;
			A = t;
			let n = y(e);
			if (n !== x) try {
				let t = e.map((e) => _(v(e), e));
				for (let e of b) a.deleteProgram(e.pg);
				let r = performance.now() - D;
				for (let e of t) e.pausedAccMs = r;
				b = t, x = n;
			} catch (e) {
				console.error(`[add_fx] ${String(e)}`);
			}
			else for (let t = 0; t < b.length; ++t) {
				let n = e[t];
				n && (b[t].fx = n);
			}
			O === 0 && j(requestAnimationFrame(N));
		},
		dispose() {
			if (k) {
				k = !1, cancelAnimationFrame(O), a.deleteShader(g), a.deleteTexture(w);
				for (let { tex: e, fb: t } of T) a.deleteTexture(e), a.deleteFramebuffer(t);
				a.deleteBuffer(C);
				for (let e of b) a.deleteProgram(e.pg);
				a.deleteProgram(S.pg), a.getExtension("WEBGL_lose_context")?.loseContext(), h?.dispose?.();
			}
		}
	};
}
//#endregion
export { l as runFx };

//# sourceMappingURL=FxRunner.js.map