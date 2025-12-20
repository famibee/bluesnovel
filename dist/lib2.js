var ExtensionType = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))(ExtensionType || {}), normalizeExtension = (e) => {
	if (typeof e == "function" || typeof e == "object" && e.extension) {
		if (!e.extension) throw Error("Extension class must have an extension object");
		e = {
			...typeof e.extension == "object" ? e.extension : { type: e.extension },
			ref: e
		};
	}
	if (typeof e == "object") e = { ...e };
	else throw Error("Invalid extension type");
	return typeof e.type == "string" && (e.type = [e.type]), e;
}, normalizePriority = (e, n) => normalizeExtension(e).priority ?? n, extensions = {
	_addHandlers: {},
	_removeHandlers: {},
	_queue: {},
	remove(...e) {
		return e.map(normalizeExtension).forEach((e) => {
			e.type.forEach((t) => this._removeHandlers[t]?.(e));
		}), this;
	},
	add(...e) {
		return e.map(normalizeExtension).forEach((e) => {
			e.type.forEach((t) => {
				let n = this._addHandlers, r = this._queue;
				n[t] ? n[t]?.(e) : (r[t] = r[t] || [], r[t]?.push(e));
			});
		}), this;
	},
	handle(e, t, n) {
		let r = this._addHandlers, i = this._removeHandlers;
		if (r[e] || i[e]) throw Error(`Extension type ${e} already has a handler`);
		r[e] = t, i[e] = n;
		let a = this._queue;
		return a[e] && (a[e]?.forEach((e) => t(e)), delete a[e]), this;
	},
	handleByMap(e, t) {
		return this.handle(e, (e) => {
			e.name && (t[e.name] = e.ref);
		}, (e) => {
			e.name && delete t[e.name];
		});
	},
	handleByList(e, t, r = -1) {
		return this.handle(e, (e) => {
			t.includes(e.ref) || (t.push(e.ref), t.sort((e, t) => normalizePriority(t, r) - normalizePriority(e, r)));
		}, (e) => {
			let n = t.indexOf(e.ref);
			n !== -1 && t.splice(n, 1);
		});
	}
};
export { extensions as n, ExtensionType as t };

//# sourceMappingURL=lib2.js.map