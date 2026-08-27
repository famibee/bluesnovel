import { t as e } from "./CmnLib.js";
import { a as t } from "./Snapshot.js";
//#region src/ts/TransGlsl.ts
function n(e, t, n) {
	if (!e || t.length === 0) return Promise.resolve();
	let r = performance.now();
	return new Promise((i) => {
		let a = () => {
			let o = new Set([...e.querySelectorAll("img")].filter((e) => e.complete && e.naturalWidth > 0).map((e) => e.getAttribute("src")));
			t.every((e) => o.has(e)) || performance.now() - r > n ? i() : requestAnimationFrame(a);
		};
		a();
	});
}
var r = "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n	vTextureCoord = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);\n	gl_Position = vec4(aPos, 0.0, 1.0);\n}", i = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }";
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
function c(e, t) {
	let n = e.createTexture();
	return e.bindTexture(e.TEXTURE_2D, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), t ? e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t) : e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array([
		0,
		0,
		0,
		0
	])), n;
}
async function l(r) {
	let { stageW: i, stageH: o, bgColor: s } = e, c = (e) => t({
		el: r.stageEl,
		sw: i,
		sh: o,
		width: i,
		height: o,
		bgColor: s,
		page: e,
		aLayNm: null,
		mime: "image/png",
		smoothing: !0
	});
	await n(r.stageEl.querySelector("[data-page=\"back\"]"), r.backSrcs, 800);
	let [l, d] = await Promise.all([c("fore"), c("back")]), [f, p, m] = await Promise.all([
		a(l),
		a(d),
		r.ruleSrc ? a(r.ruleSrc).catch(() => null) : Promise.resolve(null)
	]), h = document.createElement("canvas");
	h.width = i, h.height = o, h.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
	let g = h.getContext("webgl", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0,
		alpha: !0
	});
	if (!g) throw Error("WebGLコンテキストが取得できません");
	try {
		return u(g, h, r, {
			foreImg: f,
			backImg: p,
			ruleImg: m
		});
	} catch (e) {
		throw g.getExtension("WEBGL_lose_context")?.loseContext(), h.remove(), e;
	}
}
function u(t, n, a, l) {
	let { stageW: u, stageH: d } = e, { foreImg: f, backImg: p, ruleImg: m } = l, h = o(t, t.VERTEX_SHADER, r), g = s(t, h, i), _ = s(t, h, a.glslSrc);
	t.deleteShader(h);
	let v = t.createBuffer();
	t.bindBuffer(t.ARRAY_BUFFER, v), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, 0);
	let y = c(t, f), b = c(t, p), x = c(t, m);
	t.viewport(0, 0, u, d), t.disable(t.DEPTH_TEST);
	let S = t.getUniformLocation(g, "uSampler"), C = {
		uSampler: t.getUniformLocation(_, "uSampler"),
		tick: t.getUniformLocation(_, "tick"),
		rule: t.getUniformLocation(_, "rule"),
		vague: t.getUniformLocation(_, "vague")
	}, w = (e) => {
		t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.disable(t.BLEND), t.useProgram(g), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, b), t.uniform1i(S, 0), t.drawArrays(t.TRIANGLE_STRIP, 0, 4), t.enable(t.BLEND), t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA), t.useProgram(_), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, y), C.uSampler && t.uniform1i(C.uSampler, 0), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, x), C.rule && t.uniform1i(C.rule, 1), C.tick && t.uniform1f(C.tick, e), C.vague && t.uniform1f(C.vague, a.vague), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
	}, T = 0, E = !0, D = () => {
		if (!E) return;
		let e = a.time <= 0 ? 1 : Math.min((performance.now() - a.t0) / a.time, 1);
		w(e), e < 1 && (T = requestAnimationFrame(D));
	};
	return w(0), a.holder.appendChild(n), T = requestAnimationFrame(D), () => {
		E && (E = !1, cancelAnimationFrame(T), t.deleteTexture(y), t.deleteTexture(b), t.deleteTexture(x), t.deleteBuffer(v), t.deleteProgram(g), t.deleteProgram(_), t.getExtension("WEBGL_lose_context")?.loseContext(), n.remove());
	};
}
//#endregion
export { l as runGlslTrans };

//# sourceMappingURL=TransGlsl.js.map