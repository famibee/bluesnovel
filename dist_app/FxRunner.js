//#region src/ts/fxPresets.ts
var e = "\nprecision mediump float;\nvarying vec2 vUv;\nuniform sampler2D src;\nuniform float time;\nuniform vec2 resolution;", t = {
	wave: `${e}
uniform float amp;
uniform float freq;
void main() {
	vec2 uv = vUv;
	uv.x += sin(uv.y * freq * 6.2831853 + time * 3.0) * (amp / resolution.x);
	gl_FragColor = texture2D(src, uv);
}`,
	rgbShift: `${e}
uniform float shift;
void main() {
	float d = shift / resolution.x * (0.35 + 0.65 * abs(sin(time * 2.0)));
	float r = texture2D(src, vUv + vec2(d, 0.0)).r;
	vec4  g = texture2D(src, vUv);
	float b = texture2D(src, vUv - vec2(d, 0.0)).b;
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
	let t = await n(e.src), r = Math.max(1, t.naturalWidth), i = Math.max(1, t.naturalHeight), a = e.canvas;
	a.width = r, a.height = i;
	let o = a.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!o) throw Error("WebGLコンテキストが取得できません");
	try {
		return s(o, e.aFx, t, r, i);
	} catch (e) {
		throw o.getExtension("WEBGL_lose_context")?.loseContext(), e;
	}
}
function s(e, n, o, s, c) {
	let l = r(e, e.VERTEX_SHADER, "\nattribute vec2 aPos;\nvarying vec2 vUv;\nvoid main() {\n	vUv = (aPos + 1.0) * 0.5;\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}"), u = (t, n) => {
		let r = i(e, l, t);
		return {
			pg: r,
			fx: n,
			uSrc: e.getUniformLocation(r, "src"),
			uTime: e.getUniformLocation(r, "time"),
			uRes: e.getUniformLocation(r, "resolution"),
			uAmp: e.getUniformLocation(r, "amp"),
			uFreq: e.getUniformLocation(r, "freq"),
			uShift: e.getUniformLocation(r, "shift")
		};
	}, d = n.map((e) => {
		let n = t[e.fx];
		if (!n) throw Error(`未知の fx: ${e.fx}`);
		return u(n, e);
	}), f = u("\nprecision mediump float;\nvarying vec2 vUv;\nuniform sampler2D src;\nvoid main() { gl_FragColor = texture2D(src, vUv); }", {});
	e.deleteShader(l);
	let p = e.createBuffer();
	e.bindBuffer(e.ARRAY_BUFFER, p), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), e.STATIC_DRAW), e.enableVertexAttribArray(0), e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0);
	let m = a(e, o, s, c), h = [0, 1].map(() => {
		let t = a(e, null, s, c), n = e.createFramebuffer();
		return e.bindFramebuffer(e.FRAMEBUFFER, n), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), {
			tex: t,
			fb: n
		};
	});
	e.bindFramebuffer(e.FRAMEBUFFER, null), e.viewport(0, 0, s, c), e.disable(e.DEPTH_TEST), e.disable(e.BLEND);
	let g = (t, n, r, i) => {
		e.bindFramebuffer(e.FRAMEBUFFER, r), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.useProgram(t.pg), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, n), t.uSrc && e.uniform1i(t.uSrc, 0), t.uTime && e.uniform1f(t.uTime, i), t.uRes && e.uniform2f(t.uRes, s, c), t.uAmp && e.uniform1f(t.uAmp, t.fx.params?.amp ?? 0), t.uFreq && e.uniform1f(t.uFreq, t.fx.params?.freq ?? 0), t.uShift && e.uniform1f(t.uShift, t.fx.params?.shift ?? 0), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
	}, _ = performance.now(), v = 0, y = !0, b = () => {
		let e = performance.now() - _, t = !1;
		for (let n = 0; n < d.length; ++n) {
			let r = d[n], i = r.fx.time > 0 && e >= r.fx.time;
			i || (t = !0);
			let a = n === 0 ? m : h[(n - 1) % 2].tex, o = e / 1e3 * (r.fx.speed || 1);
			g(i ? f : r, a, h[n % 2].fb, o);
		}
		return g(f, h[(d.length - 1) % 2].tex, null, 0), t;
	}, x = () => {
		y && b() && (v = requestAnimationFrame(x));
	};
	return b(), v = requestAnimationFrame(x), () => {
		if (y) {
			y = !1, cancelAnimationFrame(v), e.deleteTexture(m);
			for (let { tex: t, fb: n } of h) e.deleteTexture(t), e.deleteFramebuffer(n);
			e.deleteBuffer(p);
			for (let t of d) e.deleteProgram(t.pg);
			e.deleteProgram(f.pg), e.getExtension("WEBGL_lose_context")?.loseContext();
		}
	};
}
//#endregion
export { o as runFx };

//# sourceMappingURL=FxRunner.js.map