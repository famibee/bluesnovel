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
	let t = typeof e.source == "string" ? await n(e.source) : e.source, r = Math.max(1, t instanceof HTMLImageElement ? t.naturalWidth : t.width), i = Math.max(1, t instanceof HTMLImageElement ? t.naturalHeight : t.height), a = e.canvas;
	a.width = r, a.height = i;
	let o = a.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!o) throw Error("WebGLコンテキストが取得できません");
	try {
		return s(o, a, e.aFx, t, r, i, e.active);
	} catch (e) {
		throw o.getExtension("WEBGL_lose_context")?.loseContext(), e;
	}
}
function s(e, n, o, s, c, l, u) {
	let d = r(e, e.VERTEX_SHADER, "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n	vTextureCoord = (aPos + 1.0) * 0.5;\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}"), f = (t, n) => {
		let r = i(e, d, t);
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
	}, p = o.map((e) => {
		let n = e.glsl || t[e.fx];
		if (!n) throw Error(`未知の fx: ${e.fx}`);
		return f(n, e);
	}), m = f("\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }", {});
	e.deleteShader(d);
	let h = e.createBuffer();
	e.bindBuffer(e.ARRAY_BUFFER, h), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), e.STATIC_DRAW), e.enableVertexAttribArray(0), e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0);
	let g = a(e, s, c, l), _ = [0, 1].map(() => {
		let t = a(e, null, c, l), n = e.createFramebuffer();
		return e.bindFramebuffer(e.FRAMEBUFFER, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), {
			tex: t,
			fb: n
		};
	});
	e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, c, l), e.disable(e.DEPTH_TEST), e.disable(e.BLEND);
	let v = (t, n, r, i) => {
		e.bindFramebuffer(e.FRAMEBUFFER, r), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.useProgram(t.pg), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, n), t.uSampler && e.uniform1i(t.uSampler, 0), t.uTick && e.uniform1f(t.uTick, i), t.uRes && e.uniform2f(t.uRes, c, l), t.uAmp && e.uniform1f(t.uAmp, t.fx.params?.amp ?? 0), t.uFreq && e.uniform1f(t.uFreq, t.fx.params?.freq ?? 0), t.uShift && e.uniform1f(t.uShift, t.fx.params?.shift ?? 0), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
	}, y = performance.now(), b = 0, x = !0, S = u, C = (e) => {
		b === 0 != (e === 0) && (n.dataset.fxRunning = e === 0 ? "0" : "1"), b = e;
	}, w = () => {
		let e = performance.now(), t = e - y, n = !1;
		for (let r = 0; r < p.length; ++r) {
			let i = p[r], a = !i.fx.enabled || !S;
			a && i.pausedAt === 0 ? i.pausedAt = e : !a && i.pausedAt !== 0 && (i.pausedAccMs += e - i.pausedAt, i.pausedAt = 0);
			let o = t - i.pausedAccMs - (i.pausedAt === 0 ? 0 : e - i.pausedAt), s = i.fx.time > 0 && o >= i.fx.time;
			!s && !a && (n = !0);
			let c = r === 0 ? g : _[(r - 1) % 2].tex, l = o / 1e3 * (i.fx.speed || 1);
			v(s ? m : i, c, _[r % 2].fb, l);
		}
		return v(m, _[(p.length - 1) % 2].tex, null, 0), n;
	}, T = () => {
		x && C(w() ? requestAnimationFrame(T) : 0);
	};
	return w(), C(requestAnimationFrame(T)), {
		update(e, t) {
			if (x) {
				S = t;
				for (let t = 0; t < p.length; ++t) {
					let n = e[t];
					n && (p[t].fx = n);
				}
				b === 0 && C(requestAnimationFrame(T));
			}
		},
		dispose() {
			if (x) {
				x = !1, cancelAnimationFrame(b), e.deleteTexture(g);
				for (let { tex: t, fb: n } of _) e.deleteTexture(t), e.deleteFramebuffer(n);
				e.deleteBuffer(h);
				for (let t of p) e.deleteProgram(t.pg);
				e.deleteProgram(m.pg), e.getExtension("WEBGL_lose_context")?.loseContext();
			}
		}
	};
}
//#endregion
export { o as runFx };

//# sourceMappingURL=FxRunner.js.map