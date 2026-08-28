//#region src/ts/fxPresets.ts
var e = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float tick;\nuniform vec2 resolution;", t = {
	wave: `${e}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vTextureCoord;
	uv.x += sin(uv.y * freq * 6.2831853 + tick * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(uSampler, uv);
}`,
	rgbShift: `${e}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(tick * 2.0)));
	float r = texture2D(uSampler, vTextureCoord + vec2(d, 0.0)).r;
	vec4  g = texture2D(uSampler, vTextureCoord);
	float b = texture2D(uSampler, vTextureCoord - vec2(d, 0.0)).b;
	gl_FragColor = vec4(r, g.g, b, g.a);
}`,
	snow: `${e}
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
	rain: `${e}
uniform float amp;
uniform float freq;
float hash(float x) { return fract(sin(x * 41.3) * 43758.5453); }
void main() {
	vec4 src = texture2D(uSampler, vTextureCoord);
	vec2 uv = vTextureCoord;
	uv.x *= resolution.x / max(resolution.y, 1.0);
	float bands = 40.0 + freq * 20.0;
	float col_id = floor(uv.x * bands);
	float x = fract(uv.x * bands) - 0.5;
	float rnd = hash(col_id);
	float y = fract(uv.y * (2.0 + rnd) - tick * (1.2 + rnd) * amp);
	float streak = smoothstep(1.0, 0.0, abs(x) * 12.0)
		* smoothstep(0.0, 0.15, y) * smoothstep(0.9, 0.35, y);
	gl_FragColor = vec4(mix(src.rgb, vec3(0.75, 0.80, 0.92), streak * 0.5), src.a);
}`
};
//#endregion
//#region src/ts/FxRunner.ts
function n(e) {
	return new Promise((t, n) => {
		let r = new Image();
		r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error(`画像が読めません: ${e.slice(0, 64)}`)), r.src = e;
	});
}
function r(e, t, n) {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`シェーダのコンパイルに失敗: ${t ?? ""}`);
	}
	return r;
}
function i(e, t, n) {
	let i = r(e, e.FRAGMENT_SHADER, n), a = e.createProgram();
	if (e.attachShader(a, t), e.attachShader(a, i), e.bindAttribLocation(a, 0, "aPos"), e.linkProgram(a), e.detachShader(a, i), e.deleteShader(i), !e.getProgramParameter(a, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(a);
		throw e.deleteProgram(a), Error(`シェーダのリンクに失敗: ${t ?? ""}`);
	}
	return a;
}
function a(e, t, n, r) {
	let i = e.createTexture();
	return e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), t ? (e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1)) : e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, n, r, 0, e.RGBA, e.UNSIGNED_BYTE, null), i;
}
async function o(e) {
	let t = e.source, r;
	r = typeof t == "function" ? t() : typeof t == "string" ? await n(t) : t;
	let i = typeof t == "function" ? t : null, a = Math.max(1, r instanceof HTMLImageElement ? r.naturalWidth : r.width), o = Math.max(1, r instanceof HTMLImageElement ? r.naturalHeight : r.height), c = e.canvas;
	c.width = a, c.height = o;
	let l = c.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!l) throw Error("WebGLコンテキストが取得できません");
	try {
		return s(l, c, e.aFx, r, a, o, e.active, i);
	} catch (e) {
		throw l.getExtension("WEBGL_lose_context")?.loseContext(), e;
	}
}
function s(e, n, o, s, c, l, u, d) {
	let f = r(e, e.VERTEX_SHADER, "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n	vTextureCoord = (aPos + 1.0) * 0.5;\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}"), p = (t, n) => {
		let r = i(e, f, t);
		return {
			pg: r,
			fx: n,
			pausedAccMs: 0,
			pausedAt: 0,
			uSampler: e.getUniformLocation(r, "uSampler"),
			uTick: e.getUniformLocation(r, "tick"),
			uRes: e.getUniformLocation(r, "resolution"),
			uAmp: e.getUniformLocation(r, "amp"),
			uFreq: e.getUniformLocation(r, "freq"),
			uShift: e.getUniformLocation(r, "shift")
		};
	}, m = (e) => {
		let n = e.glsl || t[e.fx];
		if (!n) throw Error(`未知の fx: ${e.fx}`);
		return n;
	}, h = (e) => e.map((e) => `${e.fx}${e.glsl}`).join(""), g = o.map((e) => p(m(e), e)), _ = h(o), v = p("\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }", {}), y = e.createBuffer();
	e.bindBuffer(e.ARRAY_BUFFER, y), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), e.STATIC_DRAW), e.enableVertexAttribArray(0), e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0);
	let b = a(e, s, c, l), x = [0, 1].map(() => {
		let t = a(e, null, c, l), n = e.createFramebuffer();
		return e.bindFramebuffer(e.FRAMEBUFFER, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), {
			tex: t,
			fb: n
		};
	});
	e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, c, l), e.disable(e.DEPTH_TEST), e.disable(e.BLEND);
	let S = (t, n, r, i) => {
		e.bindFramebuffer(e.FRAMEBUFFER, r), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.useProgram(t.pg), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, n), t.uSampler && e.uniform1i(t.uSampler, 0), t.uTick && e.uniform1f(t.uTick, i), t.uRes && e.uniform2f(t.uRes, c, l), t.uAmp && e.uniform1f(t.uAmp, t.fx.params?.amp ?? 0), t.uFreq && e.uniform1f(t.uFreq, t.fx.params?.freq ?? 0), t.uShift && e.uniform1f(t.uShift, t.fx.params?.shift ?? 0), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
	}, C = performance.now(), w = 0, T = !0, E = u, D = (e) => {
		w === 0 != (e === 0) && (n.dataset.fxRunning = e === 0 ? "0" : "1"), w = e;
	}, O = () => {
		let t = performance.now(), n = t - C, r = !1;
		d && E && (e.bindTexture(e.TEXTURE_2D, b), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, d()), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), r = !0);
		for (let e = 0; e < g.length; ++e) {
			let i = g[e], a = !i.fx.enabled || !E;
			a && i.pausedAt === 0 ? i.pausedAt = t : !a && i.pausedAt !== 0 && (i.pausedAccMs += t - i.pausedAt, i.pausedAt = 0);
			let o = n - i.pausedAccMs - (i.pausedAt === 0 ? 0 : t - i.pausedAt), s = i.fx.time > 0 && o >= i.fx.time;
			!s && !a && (r = !0);
			let c = e === 0 ? b : x[(e - 1) % 2].tex, l = o / 1e3 * (i.fx.speed || 1);
			S(s ? v : i, c, x[e % 2].fb, l);
		}
		return S(v, x[(g.length - 1) % 2].tex, null, 0), r;
	}, k = () => {
		T && D(O() ? requestAnimationFrame(k) : 0);
	};
	return O(), D(requestAnimationFrame(k)), {
		update(t, n) {
			if (!T) return;
			E = n;
			let r = h(t);
			if (r !== _) try {
				let n = t.map((e) => p(m(e), e));
				for (let t of g) e.deleteProgram(t.pg);
				let i = performance.now() - C;
				for (let e of n) e.pausedAccMs = i;
				g = n, _ = r;
			} catch (e) {
				console.error(`[add_fx] ${String(e)}`);
			}
			else for (let e = 0; e < g.length; ++e) {
				let n = t[e];
				n && (g[e].fx = n);
			}
			w === 0 && D(requestAnimationFrame(k));
		},
		dispose() {
			if (T) {
				T = !1, cancelAnimationFrame(w), e.deleteShader(f), e.deleteTexture(b);
				for (let { tex: t, fb: n } of x) e.deleteTexture(t), e.deleteFramebuffer(n);
				e.deleteBuffer(y);
				for (let t of g) e.deleteProgram(t.pg);
				e.deleteProgram(v.pg), e.getExtension("WEBGL_lose_context")?.loseContext(), d?.dispose?.();
			}
		}
	};
}
//#endregion
export { o as runFx };

//# sourceMappingURL=FxRunner.js.map