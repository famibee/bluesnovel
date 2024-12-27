var i = /* @__PURE__ */ ((e) => (e.Renderer = "renderer", e.Application = "application", e.RendererSystem = "renderer-webgl-system", e.RendererPlugin = "renderer-webgl-plugin", e.CanvasRendererSystem = "renderer-canvas-system", e.CanvasRendererPlugin = "renderer-canvas-plugin", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e))(i || {});
const o = (e) => {
  if (typeof e == "function" || typeof e == "object" && e.extension) {
    if (!e.extension)
      throw new Error("Extension class must have an extension object");
    e = { ...typeof e.extension != "object" ? { type: e.extension } : e.extension, ref: e };
  }
  if (typeof e == "object")
    e = { ...e };
  else
    throw new Error("Invalid extension type");
  return typeof e.type == "string" && (e.type = [e.type]), e;
}, h = (e, r) => o(e).priority ?? r, c = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */
  remove(...e) {
    return e.map(o).forEach((r) => {
      r.type.forEach((a) => this._removeHandlers[a]?.(r));
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */
  add(...e) {
    return e.map(o).forEach((r) => {
      r.type.forEach((a) => {
        const s = this._addHandlers, n = this._queue;
        s[a] ? s[a]?.(r) : (n[a] = n[a] || [], n[a]?.push(r));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */
  handle(e, r, a) {
    const s = this._addHandlers, n = this._removeHandlers;
    if (s[e] || n[e])
      throw new Error(`Extension type ${e} already has a handler`);
    s[e] = r, n[e] = a;
    const d = this._queue;
    return d[e] && (d[e]?.forEach((l) => r(l)), delete d[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByMap(e, r) {
    return this.handle(
      e,
      (a) => {
        a.name && (r[a.name] = a.ref);
      },
      (a) => {
        a.name && delete r[a.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */
  handleByList(e, r, a = -1) {
    return this.handle(
      e,
      (s) => {
        r.includes(s.ref) || (r.push(s.ref), r.sort((n, d) => h(d, a) - h(n, a)));
      },
      (s) => {
        const n = r.indexOf(s.ref);
        n !== -1 && r.splice(n, 1);
      }
    );
  }
};
export {
  i as ExtensionType,
  c as extensions
};
//# sourceMappingURL=index2.js.map
