import electron, { BrowserWindow, app, dialog, ipcMain, screen, shell } from "electron";
import process$1 from "node:process";
import path from "node:path";
import { isDeepStrictEqual, promisify } from "node:util";
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert";
import os from "node:os";
import "node:events";
import "node:stream";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (t, s) => () => (t && (s = t(t = 0)), s), __commonJSMin = (t, s) => () => (s || t((s = { exports: {} }).exports, s), s.exports), __export = (t, s) => {
	let c = {};
	for (var l in t) __defProp(c, l, {
		get: t[l],
		enumerable: !0
	});
	return s && __defProp(c, Symbol.toStringTag, { value: "Module" }), c;
}, __copyProps = (t, s, c, l) => {
	if (s && typeof s == "object" || typeof s == "function") for (var u = __getOwnPropNames(s), d = 0, f = u.length, p; d < f; d++) p = u[d], !__hasOwnProp.call(t, p) && p !== c && __defProp(t, p, {
		get: ((t) => s[t]).bind(null, p),
		enumerable: !(l = __getOwnPropDesc(s, p)) || l.enumerable
	});
	return t;
}, __toESM = (t, s, c) => (c = t == null ? {} : __create(__getProtoOf(t)), __copyProps(s || !t || !t.__esModule ? __defProp(c, "default", {
	value: t,
	enumerable: !0
}) : c, t)), __toCommonJS = (t) => __hasOwnProp.call(t, "module.exports") ? t["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: !0 }), t), __require = /* @__PURE__ */ ((t) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(t, { get: (t, s) => (typeof require < "u" ? require : t)[s] }) : t)(function(t) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + t + "\" in an environment that doesn't expose the `require` function.");
}), require_universalify = /* @__PURE__ */ __commonJSMin(((t) => {
	t.fromCallback = function(t) {
		return Object.defineProperty(function(...s) {
			if (typeof s[s.length - 1] == "function") t.apply(this, s);
			else return new Promise((c, l) => {
				s.push((t, s) => t == null ? c(s) : l(t)), t.apply(this, s);
			});
		}, "name", { value: t.name });
	}, t.fromPromise = function(t) {
		return Object.defineProperty(function(...s) {
			let c = s[s.length - 1];
			if (typeof c != "function") return t.apply(this, s);
			s.pop(), t.apply(this, s).then((t) => c(null, t), c);
		}, "name", { value: t.name });
	};
})), require_polyfills = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("constants"), l = process.cwd, u = null, d = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		return u ||= l.call(process), u;
	};
	try {
		process.cwd();
	} catch {}
	if (typeof process.chdir == "function") {
		var f = process.chdir;
		process.chdir = function(t) {
			u = null, f.call(process, t);
		}, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
	}
	s.exports = p;
	function p(t) {
		c.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && s(t), t.lutimes || l(t), t.chown = p(t.chown), t.fchown = p(t.fchown), t.lchown = p(t.lchown), t.chmod = u(t.chmod), t.fchmod = u(t.fchmod), t.lchmod = u(t.lchmod), t.chownSync = m(t.chownSync), t.fchownSync = m(t.fchownSync), t.lchownSync = m(t.lchownSync), t.chmodSync = f(t.chmodSync), t.fchmodSync = f(t.fchmodSync), t.lchmodSync = f(t.lchmodSync), t.stat = h(t.stat), t.fstat = h(t.fstat), t.lstat = h(t.lstat), t.statSync = g(t.statSync), t.fstatSync = g(t.fstatSync), t.lstatSync = g(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(t, s, c) {
			c && process.nextTick(c);
		}, t.lchmodSync = function() {}), t.chown && !t.lchown && (t.lchown = function(t, s, c, l) {
			l && process.nextTick(l);
		}, t.lchownSync = function() {}), d === "win32" && (t.rename = typeof t.rename == "function" ? (function(s) {
			function c(c, l, u) {
				var d = Date.now(), f = 0;
				s(c, l, function p(m) {
					if (m && (m.code === "EACCES" || m.code === "EPERM" || m.code === "EBUSY") && Date.now() - d < 6e4) {
						setTimeout(function() {
							t.stat(l, function(t, d) {
								t && t.code === "ENOENT" ? s(c, l, p) : u(m);
							});
						}, f), f < 100 && (f += 10);
						return;
					}
					u && u(m);
				});
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(c, s), c;
		})(t.rename) : t.rename), t.read = typeof t.read == "function" ? (function(s) {
			function c(c, l, u, d, f, p) {
				var m;
				if (p && typeof p == "function") {
					var h = 0;
					m = function(g, _, v) {
						if (g && g.code === "EAGAIN" && h < 10) return h++, s.call(t, c, l, u, d, f, m);
						p.apply(this, arguments);
					};
				}
				return s.call(t, c, l, u, d, f, m);
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(c, s), c;
		})(t.read) : t.read, t.readSync = typeof t.readSync == "function" ? (function(s) {
			return function(c, l, u, d, f) {
				for (var p = 0;;) try {
					return s.call(t, c, l, u, d, f);
				} catch (t) {
					if (t.code === "EAGAIN" && p < 10) {
						p++;
						continue;
					}
					throw t;
				}
			};
		})(t.readSync) : t.readSync;
		function s(t) {
			t.lchmod = function(s, l, u) {
				t.open(s, c.O_WRONLY | c.O_SYMLINK, l, function(s, c) {
					if (s) {
						u && u(s);
						return;
					}
					t.fchmod(c, l, function(s) {
						t.close(c, function(t) {
							u && u(s || t);
						});
					});
				});
			}, t.lchmodSync = function(s, l) {
				var u = t.openSync(s, c.O_WRONLY | c.O_SYMLINK, l), d = !0, f;
				try {
					f = t.fchmodSync(u, l), d = !1;
				} finally {
					if (d) try {
						t.closeSync(u);
					} catch {}
					else t.closeSync(u);
				}
				return f;
			};
		}
		function l(t) {
			c.hasOwnProperty("O_SYMLINK") && t.futimes ? (t.lutimes = function(s, l, u, d) {
				t.open(s, c.O_SYMLINK, function(s, c) {
					if (s) {
						d && d(s);
						return;
					}
					t.futimes(c, l, u, function(s) {
						t.close(c, function(t) {
							d && d(s || t);
						});
					});
				});
			}, t.lutimesSync = function(s, l, u) {
				var d = t.openSync(s, c.O_SYMLINK), f, p = !0;
				try {
					f = t.futimesSync(d, l, u), p = !1;
				} finally {
					if (p) try {
						t.closeSync(d);
					} catch {}
					else t.closeSync(d);
				}
				return f;
			}) : t.futimes && (t.lutimes = function(t, s, c, l) {
				l && process.nextTick(l);
			}, t.lutimesSync = function() {});
		}
		function u(s) {
			return s && function(c, l, u) {
				return s.call(t, c, l, function(t) {
					_(t) && (t = null), u && u.apply(this, arguments);
				});
			};
		}
		function f(s) {
			return s && function(c, l) {
				try {
					return s.call(t, c, l);
				} catch (t) {
					if (!_(t)) throw t;
				}
			};
		}
		function p(s) {
			return s && function(c, l, u, d) {
				return s.call(t, c, l, u, function(t) {
					_(t) && (t = null), d && d.apply(this, arguments);
				});
			};
		}
		function m(s) {
			return s && function(c, l, u) {
				try {
					return s.call(t, c, l, u);
				} catch (t) {
					if (!_(t)) throw t;
				}
			};
		}
		function h(s) {
			return s && function(c, l, u) {
				typeof l == "function" && (u = l, l = null);
				function d(t, s) {
					s && (s.uid < 0 && (s.uid += 4294967296), s.gid < 0 && (s.gid += 4294967296)), u && u.apply(this, arguments);
				}
				return l ? s.call(t, c, l, d) : s.call(t, c, d);
			};
		}
		function g(s) {
			return s && function(c, l) {
				var u = l ? s.call(t, c, l) : s.call(t, c);
				return u && (u.uid < 0 && (u.uid += 4294967296), u.gid < 0 && (u.gid += 4294967296)), u;
			};
		}
		function _(t) {
			return !t || t.code === "ENOSYS" || (!process.getuid || process.getuid() !== 0) && (t.code === "EINVAL" || t.code === "EPERM");
		}
	}
})), require_legacy_streams = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("stream").Stream;
	s.exports = l;
	function l(t) {
		return {
			ReadStream: s,
			WriteStream: l
		};
		function s(l, u) {
			if (!(this instanceof s)) return new s(l, u);
			c.call(this);
			var d = this;
			this.path = l, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, u ||= {};
			for (var f = Object.keys(u), p = 0, m = f.length; p < m; p++) {
				var h = f[p];
				this[h] = u[h];
			}
			if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if (typeof this.end != "number") throw TypeError("end must be a Number");
				if (this.start > this.end) throw Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					d._read();
				});
				return;
			}
			t.open(this.path, this.flags, this.mode, function(t, s) {
				if (t) {
					d.emit("error", t), d.readable = !1;
					return;
				}
				d.fd = s, d.emit("open", s), d._read();
			});
		}
		function l(s, u) {
			if (!(this instanceof l)) return new l(s, u);
			c.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, u ||= {};
			for (var d = Object.keys(u), f = 0, p = d.length; f < p; f++) {
				var m = d[f];
				this[m] = u[m];
			}
			if (this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.start < 0) throw Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = !1, this._queue = [], this.fd === null && (this._open = t.open, this._queue.push([
				this._open,
				this.path,
				this.flags,
				this.mode,
				void 0
			]), this.flush());
		}
	}
})), require_clone = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = l;
	var c = Object.getPrototypeOf || function(t) {
		return t.__proto__;
	};
	function l(t) {
		if (typeof t != "object" || !t) return t;
		if (t instanceof Object) var s = { __proto__: c(t) };
		else var s = Object.create(null);
		return Object.getOwnPropertyNames(t).forEach(function(c) {
			Object.defineProperty(s, c, Object.getOwnPropertyDescriptor(t, c));
		}), s;
	}
})), require_graceful_fs = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("fs"), l = require_polyfills(), u = require_legacy_streams(), d = require_clone(), f = __require("util"), p, m;
	/* istanbul ignore else - node 0.x polyfill */
	typeof Symbol == "function" && typeof Symbol.for == "function" ? (p = Symbol.for("graceful-fs.queue"), m = Symbol.for("graceful-fs.previous")) : (p = "___graceful-fs.queue", m = "___graceful-fs.previous");
	function h() {}
	function g(t, s) {
		Object.defineProperty(t, p, { get: function() {
			return s;
		} });
	}
	var _ = h;
	f.debuglog ? _ = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (_ = function() {
		var t = f.format.apply(f, arguments);
		t = "GFS4: " + t.split(/\n/).join("\nGFS4: "), console.error(t);
	}), c[p] || (g(c, global[p] || []), c.close = (function(t) {
		function s(s, l) {
			return t.call(c, s, function(t) {
				t || x(), typeof l == "function" && l.apply(this, arguments);
			});
		}
		return Object.defineProperty(s, m, { value: t }), s;
	})(c.close), c.closeSync = (function(t) {
		function s(s) {
			t.apply(c, arguments), x();
		}
		return Object.defineProperty(s, m, { value: t }), s;
	})(c.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
		_(c[p]), __require("assert").equal(c[p].length, 0);
	})), global[p] || g(global, c[p]), s.exports = v(d(c)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !c.__patched && (s.exports = v(c), c.__patched = !0);
	function v(t) {
		l(t), t.gracefulify = v, t.createReadStream = j, t.createWriteStream = M;
		var s = t.readFile;
		t.readFile = c;
		function c(t, c, l) {
			return typeof c == "function" && (l = c, c = null), u(t, c, l);
			function u(t, c, l, d) {
				return s(t, c, function(s) {
					s && (s.code === "EMFILE" || s.code === "ENFILE") ? y([
						u,
						[
							t,
							c,
							l
						],
						s,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var d = t.writeFile;
		t.writeFile = f;
		function f(t, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(t, s, c, l);
			function u(t, s, c, l, f) {
				return d(t, s, c, function(d) {
					d && (d.code === "EMFILE" || d.code === "ENFILE") ? y([
						u,
						[
							t,
							s,
							c,
							l
						],
						d,
						f || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var p = t.appendFile;
		p && (t.appendFile = m);
		function m(t, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(t, s, c, l);
			function u(t, s, c, l, d) {
				return p(t, s, c, function(f) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							t,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var h = t.copyFile;
		h && (t.copyFile = g);
		function g(t, s, c, l) {
			return typeof c == "function" && (l = c, c = 0), u(t, s, c, l);
			function u(t, s, c, l, d) {
				return h(t, s, c, function(f) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							t,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var _ = t.readdir;
		t.readdir = x;
		var b = /^v[0-5]\./;
		function x(t, s, c) {
			typeof s == "function" && (c = s, s = null);
			var l = b.test(process.version) ? function(t, s, c, l) {
				return _(t, u(t, s, c, l));
			} : function(t, s, c, l) {
				return _(t, s, u(t, s, c, l));
			};
			return l(t, s, c);
			function u(t, s, c, u) {
				return function(d, f) {
					d && (d.code === "EMFILE" || d.code === "ENFILE") ? y([
						l,
						[
							t,
							s,
							c
						],
						d,
						u || Date.now(),
						Date.now()
					]) : (f && f.sort && f.sort(), typeof c == "function" && c.call(this, d, f));
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var S = u(t);
			D = S.ReadStream, k = S.WriteStream;
		}
		var C = t.ReadStream;
		C && (D.prototype = Object.create(C.prototype), D.prototype.open = O);
		var w = t.WriteStream;
		w && (k.prototype = Object.create(w.prototype), k.prototype.open = A), Object.defineProperty(t, "ReadStream", {
			get: function() {
				return D;
			},
			set: function(t) {
				D = t;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t, "WriteStream", {
			get: function() {
				return k;
			},
			set: function(t) {
				k = t;
			},
			enumerable: !0,
			configurable: !0
		});
		var T = D;
		Object.defineProperty(t, "FileReadStream", {
			get: function() {
				return T;
			},
			set: function(t) {
				T = t;
			},
			enumerable: !0,
			configurable: !0
		});
		var E = k;
		Object.defineProperty(t, "FileWriteStream", {
			get: function() {
				return E;
			},
			set: function(t) {
				E = t;
			},
			enumerable: !0,
			configurable: !0
		});
		function D(t, s) {
			return this instanceof D ? (C.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
		}
		function O() {
			var t = this;
			P(t.path, t.flags, t.mode, function(s, c) {
				s ? (t.autoClose && t.destroy(), t.emit("error", s)) : (t.fd = c, t.emit("open", c), t.read());
			});
		}
		function k(t, s) {
			return this instanceof k ? (w.apply(this, arguments), this) : k.apply(Object.create(k.prototype), arguments);
		}
		function A() {
			var t = this;
			P(t.path, t.flags, t.mode, function(s, c) {
				s ? (t.destroy(), t.emit("error", s)) : (t.fd = c, t.emit("open", c));
			});
		}
		function j(s, c) {
			return new t.ReadStream(s, c);
		}
		function M(s, c) {
			return new t.WriteStream(s, c);
		}
		var N = t.open;
		t.open = P;
		function P(t, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(t, s, c, l);
			function u(t, s, c, l, d) {
				return N(t, s, c, function(f, p) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							t,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		return t;
	}
	function y(t) {
		_("ENQUEUE", t[0].name, t[1]), c[p].push(t), S();
	}
	var b;
	function x() {
		for (var t = Date.now(), s = 0; s < c[p].length; ++s) c[p][s].length > 2 && (c[p][s][3] = t, c[p][s][4] = t);
		S();
	}
	function S() {
		if (clearTimeout(b), b = void 0, c[p].length !== 0) {
			var t = c[p].shift(), s = t[0], l = t[1], u = t[2], d = t[3], f = t[4];
			if (d === void 0) _("RETRY", s.name, l), s.apply(null, l);
			else if (Date.now() - d >= 6e4) {
				_("TIMEOUT", s.name, l);
				var m = l.pop();
				typeof m == "function" && m.call(null, u);
			} else {
				var h = Date.now() - f, g = Math.max(f - d, 1);
				h >= Math.min(g * 1.2, 100) ? (_("RETRY", s.name, l), s.apply(null, l.concat([d]))) : c[p].push(t);
			}
			b === void 0 && (b = setTimeout(S, 0));
		}
	}
})), require_fs = /* @__PURE__ */ __commonJSMin(((t) => {
	var s = require_universalify().fromCallback, c = require_graceful_fs(), l = (/* @__PURE__ */ "access.appendFile.chmod.chown.close.copyFile.cp.fchmod.fchown.fdatasync.fstat.fsync.ftruncate.futimes.glob.lchmod.lchown.lutimes.link.lstat.mkdir.mkdtemp.open.opendir.readdir.readFile.readlink.realpath.rename.rm.rmdir.stat.statfs.symlink.truncate.unlink.utimes.writeFile".split(".")).filter((t) => typeof c[t] == "function");
	Object.assign(t, c), l.forEach((l) => {
		t[l] = s(c[l]);
	}), t.exists = function(t, s) {
		return typeof s == "function" ? c.exists(t, s) : new Promise((s) => c.exists(t, s));
	}, t.read = function(t, s, l, u, d, f) {
		return typeof f == "function" ? c.read(t, s, l, u, d, f) : new Promise((f, p) => {
			c.read(t, s, l, u, d, (t, s, c) => {
				if (t) return p(t);
				f({
					bytesRead: s,
					buffer: c
				});
			});
		});
	}, t.write = function(t, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.write(t, s, ...l) : new Promise((u, d) => {
			c.write(t, s, ...l, (t, s, c) => {
				if (t) return d(t);
				u({
					bytesWritten: s,
					buffer: c
				});
			});
		});
	}, t.readv = function(t, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.readv(t, s, ...l) : new Promise((u, d) => {
			c.readv(t, s, ...l, (t, s, c) => {
				if (t) return d(t);
				u({
					bytesRead: s,
					buffers: c
				});
			});
		});
	}, t.writev = function(t, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.writev(t, s, ...l) : new Promise((u, d) => {
			c.writev(t, s, ...l, (t, s, c) => {
				if (t) return d(t);
				u({
					bytesWritten: s,
					buffers: c
				});
			});
		});
	}, typeof c.realpath.native == "function" ? t.realpath.native = s(c.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
})), require_utils$3 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("path");
	s.exports.checkPath = function(t) {
		if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(c.parse(t).root, ""))) {
			let s = /* @__PURE__ */ Error(`Path contains invalid characters: ${t}`);
			throw s.code = "EINVAL", s;
		}
	};
})), require_make_dir = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), { checkPath: l } = require_utils$3(), u = (t) => typeof t == "number" ? t : {
		mode: 511,
		...t
	}.mode;
	s.exports.makeDir = async (t, s) => (l(t), c.mkdir(t, {
		mode: u(s),
		recursive: !0
	})), s.exports.makeDirSync = (t, s) => (l(t), c.mkdirSync(t, {
		mode: u(s),
		recursive: !0
	}));
})), require_mkdirs = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, { makeDir: l, makeDirSync: u } = require_make_dir(), d = c(l);
	s.exports = {
		mkdirs: d,
		mkdirsSync: u,
		mkdirp: d,
		mkdirpSync: u,
		ensureDir: d,
		ensureDirSync: u
	};
})), require_path_exists = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = require_fs();
	function u(t) {
		return l.access(t).then(() => !0).catch(() => !1);
	}
	s.exports = {
		pathExists: c(u),
		pathExistsSync: l.existsSync
	};
})), require_utimes = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), l = require_universalify().fromPromise;
	async function u(t, s, l) {
		let u = await c.open(t, "r+"), d = null;
		try {
			await c.futimes(u, s, l);
		} finally {
			try {
				await c.close(u);
			} catch (t) {
				d = t;
			}
		}
		if (d) throw d;
	}
	function d(t, s, l) {
		let u = c.openSync(t, "r+");
		return c.futimesSync(u, s, l), c.closeSync(u);
	}
	s.exports = {
		utimesMillis: l(u),
		utimesMillisSync: d
	};
})), require_stat = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), l = __require("path"), u = require_universalify().fromPromise;
	function d(t, s, l) {
		let u = l.dereference ? (t) => c.stat(t, { bigint: !0 }) : (t) => c.lstat(t, { bigint: !0 });
		return Promise.all([u(t), u(s).catch((t) => {
			if (t.code === "ENOENT") return null;
			throw t;
		})]).then(([t, s]) => ({
			srcStat: t,
			destStat: s
		}));
	}
	function f(t, s, l) {
		let u, d = l.dereference ? (t) => c.statSync(t, { bigint: !0 }) : (t) => c.lstatSync(t, { bigint: !0 }), f = d(t);
		try {
			u = d(s);
		} catch (t) {
			if (t.code === "ENOENT") return {
				srcStat: f,
				destStat: null
			};
			throw t;
		}
		return {
			srcStat: f,
			destStat: u
		};
	}
	async function p(t, s, c, u) {
		let { srcStat: f, destStat: p } = await d(t, s, u);
		if (p) {
			if (_(f, p)) {
				let u = l.basename(t), d = l.basename(s);
				if (c === "move" && u !== d && u.toLowerCase() === d.toLowerCase()) return {
					srcStat: f,
					destStat: p,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (f.isDirectory() && !p.isDirectory()) throw Error(`Cannot overwrite non-directory '${s}' with directory '${t}'.`);
			if (!f.isDirectory() && p.isDirectory()) throw Error(`Cannot overwrite directory '${s}' with non-directory '${t}'.`);
		}
		if (f.isDirectory() && v(t, s)) throw Error(y(t, s, c));
		return {
			srcStat: f,
			destStat: p
		};
	}
	function m(t, s, c, u) {
		let { srcStat: d, destStat: p } = f(t, s, u);
		if (p) {
			if (_(d, p)) {
				let u = l.basename(t), f = l.basename(s);
				if (c === "move" && u !== f && u.toLowerCase() === f.toLowerCase()) return {
					srcStat: d,
					destStat: p,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (d.isDirectory() && !p.isDirectory()) throw Error(`Cannot overwrite non-directory '${s}' with directory '${t}'.`);
			if (!d.isDirectory() && p.isDirectory()) throw Error(`Cannot overwrite directory '${s}' with non-directory '${t}'.`);
		}
		if (d.isDirectory() && v(t, s)) throw Error(y(t, s, c));
		return {
			srcStat: d,
			destStat: p
		};
	}
	async function h(t, s, u, d) {
		let f = l.resolve(l.dirname(t)), p = l.resolve(l.dirname(u));
		if (p === f || p === l.parse(p).root) return;
		let m;
		try {
			m = await c.stat(p, { bigint: !0 });
		} catch (t) {
			if (t.code === "ENOENT") return;
			throw t;
		}
		if (_(s, m)) throw Error(y(t, u, d));
		return h(t, s, p, d);
	}
	function g(t, s, u, d) {
		let f = l.resolve(l.dirname(t)), p = l.resolve(l.dirname(u));
		if (p === f || p === l.parse(p).root) return;
		let m;
		try {
			m = c.statSync(p, { bigint: !0 });
		} catch (t) {
			if (t.code === "ENOENT") return;
			throw t;
		}
		if (_(s, m)) throw Error(y(t, u, d));
		return g(t, s, p, d);
	}
	function _(t, s) {
		return s.ino !== void 0 && s.dev !== void 0 && s.ino === t.ino && s.dev === t.dev;
	}
	function v(t, s) {
		let c = l.resolve(t).split(l.sep).filter((t) => t), u = l.resolve(s).split(l.sep).filter((t) => t);
		return c.every((t, s) => u[s] === t);
	}
	function y(t, s, c) {
		return `Cannot ${c} '${t}' to a subdirectory of itself, '${s}'.`;
	}
	s.exports = {
		checkPaths: u(p),
		checkPathsSync: m,
		checkParentPaths: u(h),
		checkParentPathsSync: g,
		isSrcSubdir: v,
		areIdentical: _
	};
})), require_async = /* @__PURE__ */ __commonJSMin(((t, s) => {
	async function c(t, s) {
		let c = [];
		for await (let l of t) c.push(s(l).then(() => null, (t) => t ?? /* @__PURE__ */ Error("unknown error")));
		await Promise.all(c.map((t) => t.then((t) => {
			if (t !== null) throw t;
		})));
	}
	s.exports = { asyncIteratorConcurrentProcess: c };
})), require_copy$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), l = __require("path"), { mkdirs: u } = require_mkdirs(), { pathExists: d } = require_path_exists(), { utimesMillis: f } = require_utimes(), p = require_stat(), { asyncIteratorConcurrentProcess: m } = require_async();
	async function h(t, s, c = {}) {
		typeof c == "function" && (c = { filter: c }), c.clobber = "clobber" in c ? !!c.clobber : !0, c.overwrite = "overwrite" in c ? !!c.overwrite : c.clobber, c.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		let { srcStat: f, destStat: m } = await p.checkPaths(t, s, "copy", c);
		if (await p.checkParentPaths(t, f, s, "copy"), !await g(t, s, c)) return;
		let h = l.dirname(s);
		await d(h) || await u(h), await _(m, t, s, c);
	}
	async function g(t, s, c) {
		return c.filter ? c.filter(t, s) : !0;
	}
	async function _(t, s, l, u) {
		let d = await (u.dereference ? c.stat : c.lstat)(s);
		if (d.isDirectory()) return S(d, t, s, l, u);
		if (d.isFile() || d.isCharacterDevice() || d.isBlockDevice()) return v(d, t, s, l, u);
		if (d.isSymbolicLink()) return C(t, s, l, u);
		throw d.isSocket() ? Error(`Cannot copy a socket file: ${s}`) : d.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${s}`) : Error(`Unknown file: ${s}`);
	}
	async function v(t, s, l, u, d) {
		if (!s) return y(t, l, u, d);
		if (d.overwrite) return await c.unlink(u), y(t, l, u, d);
		if (d.errorOnExist) throw Error(`'${u}' already exists`);
	}
	async function y(t, s, l, u) {
		if (await c.copyFile(s, l), u.preserveTimestamps) {
			b(t.mode) && await x(l, t.mode);
			let u = await c.stat(s);
			await f(l, u.atime, u.mtime);
		}
		return c.chmod(l, t.mode);
	}
	function b(t) {
		return (t & 128) == 0;
	}
	function x(t, s) {
		return c.chmod(t, s | 128);
	}
	async function S(t, s, u, d, f) {
		s || await c.mkdir(d), await m(await c.opendir(u), async (t) => {
			let s = l.join(u, t.name), c = l.join(d, t.name);
			if (await g(s, c, f)) {
				let { destStat: t } = await p.checkPaths(s, c, "copy", f);
				await _(t, s, c, f);
			}
		}), s || await c.chmod(d, t.mode);
	}
	async function C(t, s, u, d) {
		let f = await c.readlink(s);
		if (d.dereference && (f = l.resolve(process.cwd(), f)), !t) return c.symlink(f, u);
		let m = null;
		try {
			m = await c.readlink(u);
		} catch (t) {
			if (t.code === "EINVAL" || t.code === "UNKNOWN") return c.symlink(f, u);
			throw t;
		}
		if (d.dereference && (m = l.resolve(process.cwd(), m)), f !== m) {
			if (p.isSrcSubdir(f, m)) throw Error(`Cannot copy '${f}' to a subdirectory of itself, '${m}'.`);
			if (p.isSrcSubdir(m, f)) throw Error(`Cannot overwrite '${m}' with '${f}'.`);
		}
		return await c.unlink(u), c.symlink(f, u);
	}
	s.exports = h;
})), require_copy_sync = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_graceful_fs(), l = __require("path"), u = require_mkdirs().mkdirsSync, d = require_utimes().utimesMillisSync, f = require_stat();
	function p(t, s, d) {
		typeof d == "function" && (d = { filter: d }), d ||= {}, d.clobber = "clobber" in d ? !!d.clobber : !0, d.overwrite = "overwrite" in d ? !!d.overwrite : d.clobber, d.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		let { srcStat: p, destStat: h } = f.checkPathsSync(t, s, "copy", d);
		if (f.checkParentPathsSync(t, p, s, "copy"), d.filter && !d.filter(t, s)) return;
		let g = l.dirname(s);
		return c.existsSync(g) || u(g), m(h, t, s, d);
	}
	function m(t, s, l, u) {
		let d = (u.dereference ? c.statSync : c.lstatSync)(s);
		if (d.isDirectory()) return C(d, t, s, l, u);
		if (d.isFile() || d.isCharacterDevice() || d.isBlockDevice()) return h(d, t, s, l, u);
		if (d.isSymbolicLink()) return D(t, s, l, u);
		throw d.isSocket() ? Error(`Cannot copy a socket file: ${s}`) : d.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${s}`) : Error(`Unknown file: ${s}`);
	}
	function h(t, s, c, l, u) {
		return s ? g(t, c, l, u) : _(t, c, l, u);
	}
	function g(t, s, l, u) {
		if (u.overwrite) return c.unlinkSync(l), _(t, s, l, u);
		if (u.errorOnExist) throw Error(`'${l}' already exists`);
	}
	function _(t, s, l, u) {
		return c.copyFileSync(s, l), u.preserveTimestamps && v(t.mode, s, l), x(l, t.mode);
	}
	function v(t, s, c) {
		return y(t) && b(c, t), S(s, c);
	}
	function y(t) {
		return (t & 128) == 0;
	}
	function b(t, s) {
		return x(t, s | 128);
	}
	function x(t, s) {
		return c.chmodSync(t, s);
	}
	function S(t, s) {
		let l = c.statSync(t);
		return d(s, l.atime, l.mtime);
	}
	function C(t, s, c, l, u) {
		return s ? T(c, l, u) : w(t.mode, c, l, u);
	}
	function w(t, s, l, u) {
		return c.mkdirSync(l), T(s, l, u), x(l, t);
	}
	function T(t, s, l) {
		let u = c.opendirSync(t);
		try {
			let c;
			for (; (c = u.readSync()) !== null;) E(c.name, t, s, l);
		} finally {
			u.closeSync();
		}
	}
	function E(t, s, c, u) {
		let d = l.join(s, t), p = l.join(c, t);
		if (u.filter && !u.filter(d, p)) return;
		let { destStat: h } = f.checkPathsSync(d, p, "copy", u);
		return m(h, d, p, u);
	}
	function D(t, s, u, d) {
		let p = c.readlinkSync(s);
		if (d.dereference && (p = l.resolve(process.cwd(), p)), t) {
			let t;
			try {
				t = c.readlinkSync(u);
			} catch (t) {
				if (t.code === "EINVAL" || t.code === "UNKNOWN") return c.symlinkSync(p, u);
				throw t;
			}
			if (d.dereference && (t = l.resolve(process.cwd(), t)), p !== t) {
				if (f.isSrcSubdir(p, t)) throw Error(`Cannot copy '${p}' to a subdirectory of itself, '${t}'.`);
				if (f.isSrcSubdir(t, p)) throw Error(`Cannot overwrite '${t}' with '${p}'.`);
			}
			return O(p, u);
		} else return c.symlinkSync(p, u);
	}
	function O(t, s) {
		return c.unlinkSync(s), c.symlinkSync(t, s);
	}
	s.exports = p;
})), require_copy = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise;
	s.exports = {
		copy: c(require_copy$1()),
		copySync: require_copy_sync()
	};
})), require_remove = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_graceful_fs(), l = require_universalify().fromCallback;
	function u(t, s) {
		c.rm(t, {
			recursive: !0,
			force: !0
		}, s);
	}
	function d(t) {
		c.rmSync(t, {
			recursive: !0,
			force: !0
		});
	}
	s.exports = {
		remove: l(u),
		removeSync: d
	};
})), require_empty = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = require_fs(), u = __require("path"), d = require_mkdirs(), f = require_remove(), p = c(async function(t) {
		let s;
		try {
			s = await l.readdir(t);
		} catch {
			return d.mkdirs(t);
		}
		return Promise.all(s.map((s) => f.remove(u.join(t, s))));
	});
	function m(t) {
		let s;
		try {
			s = l.readdirSync(t);
		} catch {
			return d.mkdirsSync(t);
		}
		s.forEach((s) => {
			s = u.join(t, s), f.removeSync(s);
		});
	}
	s.exports = {
		emptyDirSync: m,
		emptydirSync: m,
		emptyDir: p,
		emptydir: p
	};
})), require_file = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), d = require_mkdirs();
	async function f(t) {
		let s;
		try {
			s = await u.stat(t);
		} catch {}
		if (s && s.isFile()) return;
		let c = l.dirname(t), f = null;
		try {
			f = await u.stat(c);
		} catch (s) {
			if (s.code === "ENOENT") {
				await d.mkdirs(c), await u.writeFile(t, "");
				return;
			} else throw s;
		}
		f.isDirectory() ? await u.writeFile(t, "") : await u.readdir(c);
	}
	function p(t) {
		let s;
		try {
			s = u.statSync(t);
		} catch {}
		if (s && s.isFile()) return;
		let c = l.dirname(t);
		try {
			u.statSync(c).isDirectory() || u.readdirSync(c);
		} catch (t) {
			if (t && t.code === "ENOENT") d.mkdirsSync(c);
			else throw t;
		}
		u.writeFileSync(t, "");
	}
	s.exports = {
		createFile: c(f),
		createFileSync: p
	};
})), require_link = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), d = require_mkdirs(), { pathExists: f } = require_path_exists(), { areIdentical: p } = require_stat();
	async function m(t, s) {
		let c;
		try {
			c = await u.lstat(s);
		} catch {}
		let m;
		try {
			m = await u.lstat(t);
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureLink"), t;
		}
		if (c && p(m, c)) return;
		let h = l.dirname(s);
		await f(h) || await d.mkdirs(h), await u.link(t, s);
	}
	function h(t, s) {
		let c;
		try {
			c = u.lstatSync(s);
		} catch {}
		try {
			let s = u.lstatSync(t);
			if (c && p(s, c)) return;
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureLink"), t;
		}
		let f = l.dirname(s);
		return u.existsSync(f) || d.mkdirsSync(f), u.linkSync(t, s);
	}
	s.exports = {
		createLink: c(m),
		createLinkSync: h
	};
})), require_symlink_paths = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("path"), l = require_fs(), { pathExists: u } = require_path_exists(), d = require_universalify().fromPromise;
	async function f(t, s) {
		if (c.isAbsolute(t)) {
			try {
				await l.lstat(t);
			} catch (t) {
				throw t.message = t.message.replace("lstat", "ensureSymlink"), t;
			}
			return {
				toCwd: t,
				toDst: t
			};
		}
		let d = c.dirname(s), f = c.join(d, t);
		if (await u(f)) return {
			toCwd: f,
			toDst: t
		};
		try {
			await l.lstat(t);
		} catch (t) {
			throw t.message = t.message.replace("lstat", "ensureSymlink"), t;
		}
		return {
			toCwd: t,
			toDst: c.relative(d, t)
		};
	}
	function p(t, s) {
		if (c.isAbsolute(t)) {
			if (!l.existsSync(t)) throw Error("absolute srcpath does not exist");
			return {
				toCwd: t,
				toDst: t
			};
		}
		let u = c.dirname(s), d = c.join(u, t);
		if (l.existsSync(d)) return {
			toCwd: d,
			toDst: t
		};
		if (!l.existsSync(t)) throw Error("relative srcpath does not exist");
		return {
			toCwd: t,
			toDst: c.relative(u, t)
		};
	}
	s.exports = {
		symlinkPaths: d(f),
		symlinkPathsSync: p
	};
})), require_symlink_type = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), l = require_universalify().fromPromise;
	async function u(t, s) {
		if (s) return s;
		let l;
		try {
			l = await c.lstat(t);
		} catch {
			return "file";
		}
		return l && l.isDirectory() ? "dir" : "file";
	}
	function d(t, s) {
		if (s) return s;
		let l;
		try {
			l = c.lstatSync(t);
		} catch {
			return "file";
		}
		return l && l.isDirectory() ? "dir" : "file";
	}
	s.exports = {
		symlinkType: l(u),
		symlinkTypeSync: d
	};
})), require_symlink = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), { mkdirs: d, mkdirsSync: f } = require_mkdirs(), { symlinkPaths: p, symlinkPathsSync: m } = require_symlink_paths(), { symlinkType: h, symlinkTypeSync: g } = require_symlink_type(), { pathExists: _ } = require_path_exists(), { areIdentical: v } = require_stat();
	async function y(t, s, c) {
		let f;
		try {
			f = await u.lstat(s);
		} catch {}
		if (f && f.isSymbolicLink()) {
			let [c, l] = await Promise.all([u.stat(t), u.stat(s)]);
			if (v(c, l)) return;
		}
		let m = await p(t, s);
		t = m.toDst;
		let g = await h(m.toCwd, c), y = l.dirname(s);
		return await _(y) || await d(y), u.symlink(t, s, g);
	}
	function b(t, s, c) {
		let d;
		try {
			d = u.lstatSync(s);
		} catch {}
		if (d && d.isSymbolicLink() && v(u.statSync(t), u.statSync(s))) return;
		let p = m(t, s);
		t = p.toDst, c = g(p.toCwd, c);
		let h = l.dirname(s);
		return u.existsSync(h) || f(h), u.symlinkSync(t, s, c);
	}
	s.exports = {
		createSymlink: c(y),
		createSymlinkSync: b
	};
})), require_ensure = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { createFile: c, createFileSync: l } = require_file(), { createLink: u, createLinkSync: d } = require_link(), { createSymlink: f, createSymlinkSync: p } = require_symlink();
	s.exports = {
		createFile: c,
		createFileSync: l,
		ensureFile: c,
		ensureFileSync: l,
		createLink: u,
		createLinkSync: d,
		ensureLink: u,
		ensureLinkSync: d,
		createSymlink: f,
		createSymlinkSync: p,
		ensureSymlink: f,
		ensureSymlinkSync: p
	};
})), require_utils$2 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	function c(t, { EOL: s = "\n", finalEOL: c = !0, replacer: l = null, spaces: u } = {}) {
		let d = c ? s : "";
		return JSON.stringify(t, l, u).replace(/\n/g, s) + d;
	}
	function l(t) {
		return Buffer.isBuffer(t) && (t = t.toString("utf8")), t.replace(/^\uFEFF/, "");
	}
	s.exports = {
		stringify: c,
		stripBom: l
	};
})), require_jsonfile$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c;
	try {
		c = require_graceful_fs();
	} catch {
		c = __require("fs");
	}
	var l = require_universalify(), { stringify: u, stripBom: d } = require_utils$2();
	async function f(t, s = {}) {
		typeof s == "string" && (s = { encoding: s });
		let u = s.fs || c, f = "throws" in s ? s.throws : !0, p = await l.fromCallback(u.readFile)(t, s);
		p = d(p);
		let m;
		try {
			m = JSON.parse(p, s ? s.reviver : null);
		} catch (s) {
			if (f) throw s.message = `${t}: ${s.message}`, s;
			return null;
		}
		return m;
	}
	var p = l.fromPromise(f);
	function m(t, s = {}) {
		typeof s == "string" && (s = { encoding: s });
		let l = s.fs || c, u = "throws" in s ? s.throws : !0;
		try {
			let c = l.readFileSync(t, s);
			return c = d(c), JSON.parse(c, s.reviver);
		} catch (s) {
			if (u) throw s.message = `${t}: ${s.message}`, s;
			return null;
		}
	}
	async function h(t, s, d = {}) {
		let f = d.fs || c, p = u(s, d);
		await l.fromCallback(f.writeFile)(t, p, d);
	}
	var g = l.fromPromise(h);
	function _(t, s, l = {}) {
		let d = l.fs || c, f = u(s, l);
		return d.writeFileSync(t, f, l);
	}
	s.exports = {
		readFile: p,
		readFileSync: m,
		writeFile: g,
		writeFileSync: _
	};
})), require_jsonfile = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_jsonfile$1();
	s.exports = {
		readJson: c.readFile,
		readJsonSync: c.readFileSync,
		writeJson: c.writeFile,
		writeJsonSync: c.writeFileSync
	};
})), require_output_file = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = require_fs(), u = __require("path"), d = require_mkdirs(), f = require_path_exists().pathExists;
	async function p(t, s, c = "utf-8") {
		let p = u.dirname(t);
		return await f(p) || await d.mkdirs(p), l.writeFile(t, s, c);
	}
	function m(t, ...s) {
		let c = u.dirname(t);
		l.existsSync(c) || d.mkdirsSync(c), l.writeFileSync(t, ...s);
	}
	s.exports = {
		outputFile: c(p),
		outputFileSync: m
	};
})), require_output_json = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { stringify: c } = require_utils$2(), { outputFile: l } = require_output_file();
	async function u(t, s, u = {}) {
		await l(t, c(s, u), u);
	}
	s.exports = u;
})), require_output_json_sync = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { stringify: c } = require_utils$2(), { outputFileSync: l } = require_output_file();
	function u(t, s, u) {
		l(t, c(s, u), u);
	}
	s.exports = u;
})), require_json = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise, l = require_jsonfile();
	l.outputJson = c(require_output_json()), l.outputJsonSync = require_output_json_sync(), l.outputJSON = l.outputJson, l.outputJSONSync = l.outputJsonSync, l.writeJSON = l.writeJson, l.writeJSONSync = l.writeJsonSync, l.readJSON = l.readJson, l.readJSONSync = l.readJsonSync, s.exports = l;
})), require_move$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_fs(), l = __require("path"), { copy: u } = require_copy(), { remove: d } = require_remove(), { mkdirp: f } = require_mkdirs(), { pathExists: p } = require_path_exists(), m = require_stat();
	async function h(t, s, c = {}) {
		let u = c.overwrite || c.clobber || !1, { srcStat: d, isChangingCase: p = !1 } = await m.checkPaths(t, s, "move", c);
		await m.checkParentPaths(t, d, s, "move");
		let h = l.dirname(s);
		return l.parse(h).root !== h && await f(h), g(t, s, u, p);
	}
	async function g(t, s, l, u) {
		if (!u) {
			if (l) await d(s);
			else if (await p(s)) throw Error("dest already exists.");
		}
		try {
			await c.rename(t, s);
		} catch (c) {
			if (c.code !== "EXDEV") throw c;
			await _(t, s, l);
		}
	}
	async function _(t, s, c) {
		return await u(t, s, {
			overwrite: c,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), d(t);
	}
	s.exports = h;
})), require_move_sync = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_graceful_fs(), l = __require("path"), u = require_copy().copySync, d = require_remove().removeSync, f = require_mkdirs().mkdirpSync, p = require_stat();
	function m(t, s, c) {
		c ||= {};
		let u = c.overwrite || c.clobber || !1, { srcStat: d, isChangingCase: m = !1 } = p.checkPathsSync(t, s, "move", c);
		return p.checkParentPathsSync(t, d, s, "move"), h(s) || f(l.dirname(s)), g(t, s, u, m);
	}
	function h(t) {
		let s = l.dirname(t);
		return l.parse(s).root === s;
	}
	function g(t, s, l, u) {
		if (u) return _(t, s, l);
		if (l) return d(s), _(t, s, l);
		if (c.existsSync(s)) throw Error("dest already exists.");
		return _(t, s, l);
	}
	function _(t, s, l) {
		try {
			c.renameSync(t, s);
		} catch (c) {
			if (c.code !== "EXDEV") throw c;
			return v(t, s, l);
		}
	}
	function v(t, s, c) {
		return u(t, s, {
			overwrite: c,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), d(t);
	}
	s.exports = m;
})), require_move = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_universalify().fromPromise;
	s.exports = {
		move: c(require_move$1()),
		moveSync: require_move_sync()
	};
})), import_lib = (/* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = {
		...require_fs(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
})))(), isObject = (t) => {
	let s = typeof t;
	return t !== null && (s === "object" || s === "function");
}, disallowedKeys = new Set([
	"__proto__",
	"prototype",
	"constructor"
]), MAX_ARRAY_INDEX = 1e6, isDigit = (t) => t >= "0" && t <= "9";
function shouldCoerceToNumber(t) {
	if (t === "0") return !0;
	if (/^[1-9]\d*$/.test(t)) {
		let s = Number.parseInt(t, 10);
		return s <= 2 ** 53 - 1 && s <= MAX_ARRAY_INDEX;
	}
	return !1;
}
function processSegment(t, s) {
	return disallowedKeys.has(t) ? !1 : (t && shouldCoerceToNumber(t) ? s.push(Number.parseInt(t, 10)) : s.push(t), !0);
}
function parsePath(t) {
	if (typeof t != "string") throw TypeError(`Expected a string, got ${typeof t}`);
	let s = [], c = "", l = "start", u = !1, d = 0;
	for (let f of t) {
		if (d++, u) {
			c += f, u = !1;
			continue;
		}
		if (f === "\\") {
			if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
			if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
			u = !0, l = l === "start" ? "property" : l;
			continue;
		}
		switch (f) {
			case ".":
				if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") {
					l = "property";
					break;
				}
				if (!processSegment(c, s)) return [];
				c = "", l = "property";
				break;
			case "[":
				if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") {
					l = "index";
					break;
				}
				if (l === "property" || l === "start") {
					if ((c || l === "property") && !processSegment(c, s)) return [];
					c = "";
				}
				l = "index";
				break;
			case "]":
				if (l === "index") {
					if (c === "") c = (s.pop() || "") + "[]", l = "property";
					else {
						let t = Number.parseInt(c, 10);
						!Number.isNaN(t) && Number.isFinite(t) && t >= 0 && t <= 2 ** 53 - 1 && t <= MAX_ARRAY_INDEX && c === String(t) ? s.push(t) : s.push(c), c = "", l = "indexEnd";
					}
					break;
				}
				if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
				c += f;
				break;
			default:
				if (l === "index" && !isDigit(f)) throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
				l === "start" && (l = "property"), c += f;
		}
	}
	switch (u && (c += "\\"), l) {
		case "property":
			if (!processSegment(c, s)) return [];
			break;
		case "index": throw Error("Index was not closed");
		case "start":
			s.push("");
			break;
	}
	return s;
}
function normalizePath(t) {
	if (typeof t == "string") return parsePath(t);
	if (Array.isArray(t)) {
		let s = [];
		for (let [c, l] of t.entries()) {
			if (typeof l != "string" && typeof l != "number") throw TypeError(`Expected a string or number for path segment at index ${c}, got ${typeof l}`);
			if (typeof l == "number" && !Number.isFinite(l)) throw TypeError(`Path segment at index ${c} must be a finite number, got ${l}`);
			if (disallowedKeys.has(l)) return [];
			typeof l == "string" && shouldCoerceToNumber(l) ? s.push(Number.parseInt(l, 10)) : s.push(l);
		}
		return s;
	}
	return [];
}
function getProperty(t, s, c) {
	if (!isObject(t) || typeof s != "string" && !Array.isArray(s)) return c === void 0 ? t : c;
	let l = normalizePath(s);
	if (l.length === 0) return c;
	for (let s = 0; s < l.length; s++) {
		let u = l[s];
		if (t = t[u], t == null) {
			if (s !== l.length - 1) return c;
			break;
		}
	}
	return t === void 0 ? c : t;
}
function setProperty(t, s, c) {
	if (!isObject(t) || typeof s != "string" && !Array.isArray(s)) return t;
	let l = t, u = normalizePath(s);
	if (u.length === 0) return t;
	for (let s = 0; s < u.length; s++) {
		let l = u[s];
		if (s === u.length - 1) t[l] = c;
		else if (!isObject(t[l])) {
			let c = typeof u[s + 1] == "number";
			t[l] = c ? [] : {};
		}
		t = t[l];
	}
	return l;
}
function deleteProperty(t, s) {
	if (!isObject(t) || typeof s != "string" && !Array.isArray(s)) return !1;
	let c = normalizePath(s);
	if (c.length === 0) return !1;
	for (let s = 0; s < c.length; s++) {
		let l = c[s];
		if (s === c.length - 1) return Object.hasOwn(t, l) ? (delete t[l], !0) : !1;
		if (t = t[l], !isObject(t)) return !1;
	}
}
function hasProperty(t, s) {
	if (!isObject(t) || typeof s != "string" && !Array.isArray(s)) return !1;
	let c = normalizePath(s);
	if (c.length === 0) return !1;
	for (let s of c) {
		if (!isObject(t) || !(s in t)) return !1;
		t = t[s];
	}
	return !0;
}
var homedir = os.homedir(), tmpdir = os.tmpdir(), { env } = process$1, macos = (t) => {
	let s = path.join(homedir, "Library");
	return {
		data: path.join(s, "Application Support", t),
		config: path.join(s, "Preferences", t),
		cache: path.join(s, "Caches", t),
		log: path.join(s, "Logs", t),
		temp: path.join(tmpdir, t)
	};
}, windows = (t) => {
	let s = env.APPDATA || path.join(homedir, "AppData", "Roaming"), c = env.LOCALAPPDATA || path.join(homedir, "AppData", "Local");
	return {
		data: path.join(c, t, "Data"),
		config: path.join(s, t, "Config"),
		cache: path.join(c, t, "Cache"),
		log: path.join(c, t, "Log"),
		temp: path.join(tmpdir, t)
	};
}, linux = (t) => {
	let s = path.basename(homedir);
	return {
		data: path.join(env.XDG_DATA_HOME || path.join(homedir, ".local", "share"), t),
		config: path.join(env.XDG_CONFIG_HOME || path.join(homedir, ".config"), t),
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, ".cache"), t),
		log: path.join(env.XDG_STATE_HOME || path.join(homedir, ".local", "state"), t),
		temp: path.join(tmpdir, s, t)
	};
};
function envPaths(t, { suffix: s = "nodejs" } = {}) {
	if (typeof t != "string") throw TypeError(`Expected a string, got ${typeof t}`);
	return s && (t += `-${s}`), process$1.platform === "darwin" ? macos(t) : process$1.platform === "win32" ? windows(t) : linux(t);
}
var attemptify_async_default = (t, s) => {
	let { onError: c } = s;
	return function(...s) {
		return t.apply(void 0, s).catch(c);
	};
}, attemptify_sync_default = (t, s) => {
	let { onError: c } = s;
	return function(...s) {
		try {
			return t.apply(void 0, s);
		} catch (t) {
			return c(t);
		}
	};
}, retryify_async_default = (t, s) => {
	let { isRetriable: c } = s;
	return function(s) {
		let { timeout: l } = s, u = s.interval ?? 250, d = Date.now() + l;
		return function s(...l) {
			return t.apply(void 0, l).catch((t) => {
				if (!c(t) || Date.now() >= d) throw t;
				let f = Math.round(u * Math.random());
				return f > 0 ? new Promise((t) => setTimeout(t, f)).then(() => s.apply(void 0, l)) : s.apply(void 0, l);
			});
		};
	};
}, retryify_sync_default = (t, s) => {
	let { isRetriable: c } = s;
	return function(s) {
		let { timeout: l } = s, u = Date.now() + l;
		return function(...s) {
			for (;;) try {
				return t.apply(void 0, s);
			} catch (t) {
				if (!c(t) || Date.now() >= u) throw t;
				continue;
			}
		};
	};
}, Handlers = {
	isChangeErrorOk: (t) => {
		if (!Handlers.isNodeError(t)) return !1;
		let { code: s } = t;
		return s === "ENOSYS" || !IS_USER_ROOT$1 && (s === "EINVAL" || s === "EPERM");
	},
	isNodeError: (t) => t instanceof Error,
	isRetriableError: (t) => {
		if (!Handlers.isNodeError(t)) return !1;
		let { code: s } = t;
		return s === "EMFILE" || s === "ENFILE" || s === "EAGAIN" || s === "EBUSY" || s === "EACCESS" || s === "EACCES" || s === "EACCS" || s === "EPERM";
	},
	onChangeError: (t) => {
		if (!Handlers.isNodeError(t) || !Handlers.isChangeErrorOk(t)) throw t;
	}
}, handlers_default = Handlers, ATTEMPTIFY_CHANGE_ERROR_OPTIONS = { onError: handlers_default.onChangeError }, ATTEMPTIFY_NOOP_OPTIONS = { onError: () => void 0 }, IS_USER_ROOT$1 = process$1.getuid ? !process$1.getuid() : !1, RETRYIFY_OPTIONS = { isRetriable: handlers_default.isRetriableError }, dist_default = {
	attempt: {
		chmod: attemptify_async_default(promisify(fs.chmod), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chown: attemptify_async_default(promisify(fs.chown), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		close: attemptify_async_default(promisify(fs.close), ATTEMPTIFY_NOOP_OPTIONS),
		fsync: attemptify_async_default(promisify(fs.fsync), ATTEMPTIFY_NOOP_OPTIONS),
		mkdir: attemptify_async_default(promisify(fs.mkdir), ATTEMPTIFY_NOOP_OPTIONS),
		realpath: attemptify_async_default(promisify(fs.realpath), ATTEMPTIFY_NOOP_OPTIONS),
		stat: attemptify_async_default(promisify(fs.stat), ATTEMPTIFY_NOOP_OPTIONS),
		unlink: attemptify_async_default(promisify(fs.unlink), ATTEMPTIFY_NOOP_OPTIONS),
		chmodSync: attemptify_sync_default(fs.chmodSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chownSync: attemptify_sync_default(fs.chownSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		closeSync: attemptify_sync_default(fs.closeSync, ATTEMPTIFY_NOOP_OPTIONS),
		existsSync: attemptify_sync_default(fs.existsSync, ATTEMPTIFY_NOOP_OPTIONS),
		fsyncSync: attemptify_sync_default(fs.fsync, ATTEMPTIFY_NOOP_OPTIONS),
		mkdirSync: attemptify_sync_default(fs.mkdirSync, ATTEMPTIFY_NOOP_OPTIONS),
		realpathSync: attemptify_sync_default(fs.realpathSync, ATTEMPTIFY_NOOP_OPTIONS),
		statSync: attemptify_sync_default(fs.statSync, ATTEMPTIFY_NOOP_OPTIONS),
		unlinkSync: attemptify_sync_default(fs.unlinkSync, ATTEMPTIFY_NOOP_OPTIONS)
	},
	retry: {
		close: retryify_async_default(promisify(fs.close), RETRYIFY_OPTIONS),
		fsync: retryify_async_default(promisify(fs.fsync), RETRYIFY_OPTIONS),
		open: retryify_async_default(promisify(fs.open), RETRYIFY_OPTIONS),
		readFile: retryify_async_default(promisify(fs.readFile), RETRYIFY_OPTIONS),
		rename: retryify_async_default(promisify(fs.rename), RETRYIFY_OPTIONS),
		stat: retryify_async_default(promisify(fs.stat), RETRYIFY_OPTIONS),
		write: retryify_async_default(promisify(fs.write), RETRYIFY_OPTIONS),
		writeFile: retryify_async_default(promisify(fs.writeFile), RETRYIFY_OPTIONS),
		closeSync: retryify_sync_default(fs.closeSync, RETRYIFY_OPTIONS),
		fsyncSync: retryify_sync_default(fs.fsyncSync, RETRYIFY_OPTIONS),
		openSync: retryify_sync_default(fs.openSync, RETRYIFY_OPTIONS),
		readFileSync: retryify_sync_default(fs.readFileSync, RETRYIFY_OPTIONS),
		renameSync: retryify_sync_default(fs.renameSync, RETRYIFY_OPTIONS),
		statSync: retryify_sync_default(fs.statSync, RETRYIFY_OPTIONS),
		writeSync: retryify_sync_default(fs.writeSync, RETRYIFY_OPTIONS),
		writeFileSync: retryify_sync_default(fs.writeFileSync, RETRYIFY_OPTIONS)
	}
}, DEFAULT_WRITE_OPTIONS = {}, DEFAULT_USER_UID = process$1.geteuid ? process$1.geteuid() : -1, DEFAULT_USER_GID = process$1.getegid ? process$1.getegid() : -1, IS_POSIX = !!process$1.getuid;
process$1.getuid && process$1.getuid();
var isException = (t) => t instanceof Error && "code" in t, isString = (t) => typeof t == "string", isUndefined = (t) => t === void 0, browser_default = new class {
	constructor() {
		this.callbacks = /* @__PURE__ */ new Set(), this.exit = () => {
			for (let t of this.callbacks) t();
		}, this.hook = () => {
			window.addEventListener("beforeunload", this.exit);
		}, this.register = (t) => (this.callbacks.add(t), () => {
			this.callbacks.delete(t);
		}), this.hook();
	}
}().register, Temp = {
	store: {},
	create: (t) => {
		let s = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6);
		return `${t}${`.tmp-${Date.now().toString().slice(-10)}${s}`}`;
	},
	get: (t, s, c = !0) => {
		let l = Temp.truncate(s(t));
		return l in Temp.store ? Temp.get(t, s, c) : (Temp.store[l] = c, [l, () => delete Temp.store[l]]);
	},
	purge: (t) => {
		Temp.store[t] && (delete Temp.store[t], dist_default.attempt.unlink(t));
	},
	purgeSync: (t) => {
		Temp.store[t] && (delete Temp.store[t], dist_default.attempt.unlinkSync(t));
	},
	purgeSyncAll: () => {
		for (let t in Temp.store) Temp.purgeSync(t);
	},
	truncate: (t) => {
		let s = path.basename(t);
		if (s.length <= 128) return t;
		let c = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(s);
		if (!c) return t;
		let l = s.length - 128;
		return `${t.slice(0, -s.length)}${c[1]}${c[2].slice(0, -l)}${c[3]}`;
	}
};
browser_default(Temp.purgeSyncAll);
var temp_default = Temp;
function writeFileSync(t, s, c = DEFAULT_WRITE_OPTIONS) {
	if (isString(c)) return writeFileSync(t, s, { encoding: c });
	let l = { timeout: c.timeout ?? 1e3 }, u = null, d = null, f = null;
	try {
		let p = dist_default.attempt.realpathSync(t), h = !!p;
		t = p || t, [d, u] = temp_default.get(t, c.tmpCreate || temp_default.create, c.tmpPurge !== !1);
		let g = IS_POSIX && isUndefined(c.chown), _ = isUndefined(c.mode);
		if (h && (g || _)) {
			let s = dist_default.attempt.statSync(t);
			s && (c = { ...c }, g && (c.chown = {
				uid: s.uid,
				gid: s.gid
			}), _ && (c.mode = s.mode));
		}
		if (!h) {
			let s = path.dirname(t);
			dist_default.attempt.mkdirSync(s, {
				mode: 511,
				recursive: !0
			});
		}
		f = dist_default.retry.openSync(l)(d, "w", c.mode || 438), c.tmpCreated && c.tmpCreated(d), isString(s) ? dist_default.retry.writeSync(l)(f, s, 0, c.encoding || "utf8") : isUndefined(s) || dist_default.retry.writeSync(l)(f, s, 0, s.length, 0), c.fsync !== !1 && (c.fsyncWait === !1 ? dist_default.attempt.fsync(f) : dist_default.retry.fsyncSync(l)(f)), dist_default.retry.closeSync(l)(f), f = null, c.chown && (c.chown.uid !== DEFAULT_USER_UID || c.chown.gid !== DEFAULT_USER_GID) && dist_default.attempt.chownSync(d, c.chown.uid, c.chown.gid), c.mode && c.mode !== 438 && dist_default.attempt.chmodSync(d, c.mode);
		try {
			dist_default.retry.renameSync(l)(d, t);
		} catch (s) {
			if (!isException(s) || s.code !== "ENAMETOOLONG") throw s;
			dist_default.retry.renameSync(l)(d, temp_default.truncate(t));
		}
		u(), d = null;
	} finally {
		f && dist_default.attempt.closeSync(f), d && temp_default.purge(d);
	}
}
var require_code$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
	var s = class {};
	t._CodeOrName = s, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var c = class extends s {
		constructor(s) {
			if (super(), !t.IDENTIFIER.test(s)) throw Error("CodeGen: name must be a valid identifier");
			this.str = s;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			return !1;
		}
		get names() {
			return { [this.str]: 1 };
		}
	};
	t.Name = c;
	var l = class extends s {
		constructor(t) {
			super(), this._items = typeof t == "string" ? [t] : t;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let t = this._items[0];
			return t === "" || t === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((t, s) => `${t}${s}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((t, s) => (s instanceof c && (t[s.str] = (t[s.str] || 0) + 1), t), {});
		}
	};
	t._Code = l, t.nil = new l("");
	function u(t, ...s) {
		let c = [t[0]], u = 0;
		for (; u < s.length;) p(c, s[u]), c.push(t[++u]);
		return new l(c);
	}
	t._ = u;
	var d = new l("+");
	function f(t, ...s) {
		let c = [y(t[0])], u = 0;
		for (; u < s.length;) c.push(d), p(c, s[u]), c.push(d, y(t[++u]));
		return m(c), new l(c);
	}
	t.str = f;
	function p(t, s) {
		s instanceof l ? t.push(...s._items) : s instanceof c ? t.push(s) : t.push(_(s));
	}
	t.addCodeArg = p;
	function m(t) {
		let s = 1;
		for (; s < t.length - 1;) {
			if (t[s] === d) {
				let c = h(t[s - 1], t[s + 1]);
				if (c !== void 0) {
					t.splice(s - 1, 3, c);
					continue;
				}
				t[s++] = "+";
			}
			s++;
		}
	}
	function h(t, s) {
		if (s === "\"\"") return t;
		if (t === "\"\"") return s;
		if (typeof t == "string") return s instanceof c || t[t.length - 1] !== "\"" ? void 0 : typeof s == "string" ? s[0] === "\"" ? t.slice(0, -1) + s.slice(1) : void 0 : `${t.slice(0, -1)}${s}"`;
		if (typeof s == "string" && s[0] === "\"" && !(t instanceof c)) return `"${t}${s.slice(1)}`;
	}
	function g(t, s) {
		return s.emptyStr() ? t : t.emptyStr() ? s : f`${t}${s}`;
	}
	t.strConcat = g;
	function _(t) {
		return typeof t == "number" || typeof t == "boolean" || t === null ? t : y(Array.isArray(t) ? t.join(",") : t);
	}
	function v(t) {
		return new l(y(t));
	}
	t.stringify = v;
	function y(t) {
		return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	t.safeStringify = y;
	function b(s) {
		return typeof s == "string" && t.IDENTIFIER.test(s) ? new l(`.${s}`) : u`[${s}]`;
	}
	t.getProperty = b;
	function x(s) {
		if (typeof s == "string" && t.IDENTIFIER.test(s)) return new l(`${s}`);
		throw Error(`CodeGen: invalid export name: ${s}, use explicit $id name mapping`);
	}
	t.getEsmExportName = x;
	function S(t) {
		return new l(t.toString());
	}
	t.regexpCode = S;
})), require_scope$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
	var s = require_code$3(), c = class extends Error {
		constructor(t) {
			super(`CodeGen: "code" for ${t} not defined`), this.value = t.value;
		}
	}, l;
	(function(t) {
		t[t.Started = 0] = "Started", t[t.Completed = 1] = "Completed";
	})(l || (t.UsedValueState = l = {})), t.varKinds = {
		const: new s.Name("const"),
		let: new s.Name("let"),
		var: new s.Name("var")
	};
	var u = class {
		constructor({ prefixes: t, parent: s } = {}) {
			this._names = {}, this._prefixes = t, this._parent = s;
		}
		toName(t) {
			return t instanceof s.Name ? t : this.name(t);
		}
		name(t) {
			return new s.Name(this._newName(t));
		}
		_newName(t) {
			let s = this._names[t] || this._nameGroup(t);
			return `${t}${s.index++}`;
		}
		_nameGroup(t) {
			if ((this._parent?._prefixes)?.has(t) || this._prefixes && !this._prefixes.has(t)) throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);
			return this._names[t] = {
				prefix: t,
				index: 0
			};
		}
	};
	t.Scope = u;
	var d = class extends s.Name {
		constructor(t, s) {
			super(s), this.prefix = t;
		}
		setValue(t, { property: c, itemIndex: l }) {
			this.value = t, this.scopePath = (0, s._)`.${new s.Name(c)}[${l}]`;
		}
	};
	t.ValueScopeName = d;
	var f = (0, s._)`\n`;
	t.ValueScope = class extends u {
		constructor(t) {
			super(t), this._values = {}, this._scope = t.scope, this.opts = {
				...t,
				_n: t.lines ? f : s.nil
			};
		}
		get() {
			return this._scope;
		}
		name(t) {
			return new d(t, this._newName(t));
		}
		value(t, s) {
			if (s.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let c = this.toName(t), { prefix: l } = c, u = s.key ?? s.ref, d = this._values[l];
			if (d) {
				let t = d.get(u);
				if (t) return t;
			} else d = this._values[l] = /* @__PURE__ */ new Map();
			d.set(u, c);
			let f = this._scope[l] || (this._scope[l] = []), p = f.length;
			return f[p] = s.ref, c.setValue(s, {
				property: l,
				itemIndex: p
			}), c;
		}
		getValue(t, s) {
			let c = this._values[t];
			if (c) return c.get(s);
		}
		scopeRefs(t, c = this._values) {
			return this._reduceValues(c, (c) => {
				if (c.scopePath === void 0) throw Error(`CodeGen: name "${c}" has no value`);
				return (0, s._)`${t}${c.scopePath}`;
			});
		}
		scopeCode(t = this._values, s, c) {
			return this._reduceValues(t, (t) => {
				if (t.value === void 0) throw Error(`CodeGen: name "${t}" has no value`);
				return t.value.code;
			}, s, c);
		}
		_reduceValues(u, d, f = {}, p) {
			let m = s.nil;
			for (let h in u) {
				let g = u[h];
				if (!g) continue;
				let _ = f[h] = f[h] || /* @__PURE__ */ new Map();
				g.forEach((u) => {
					if (_.has(u)) return;
					_.set(u, l.Started);
					let f = d(u);
					if (f) {
						let c = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
						m = (0, s._)`${m}${c} ${u} = ${f};${this.opts._n}`;
					} else if (f = p?.(u)) m = (0, s._)`${m}${f}${this.opts._n}`;
					else throw new c(u);
					_.set(u, l.Completed);
				});
			}
			return m;
		}
	};
})), require_codegen$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
	var s = require_code$3(), c = require_scope$1(), l = require_code$3();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return l._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return l.str;
		}
	}), Object.defineProperty(t, "strConcat", {
		enumerable: !0,
		get: function() {
			return l.strConcat;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return l.nil;
		}
	}), Object.defineProperty(t, "getProperty", {
		enumerable: !0,
		get: function() {
			return l.getProperty;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return l.stringify;
		}
	}), Object.defineProperty(t, "regexpCode", {
		enumerable: !0,
		get: function() {
			return l.regexpCode;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return l.Name;
		}
	});
	var u = require_scope$1();
	Object.defineProperty(t, "Scope", {
		enumerable: !0,
		get: function() {
			return u.Scope;
		}
	}), Object.defineProperty(t, "ValueScope", {
		enumerable: !0,
		get: function() {
			return u.ValueScope;
		}
	}), Object.defineProperty(t, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return u.ValueScopeName;
		}
	}), Object.defineProperty(t, "varKinds", {
		enumerable: !0,
		get: function() {
			return u.varKinds;
		}
	}), t.operators = {
		GT: new s._Code(">"),
		GTE: new s._Code(">="),
		LT: new s._Code("<"),
		LTE: new s._Code("<="),
		EQ: new s._Code("==="),
		NEQ: new s._Code("!=="),
		NOT: new s._Code("!"),
		OR: new s._Code("||"),
		AND: new s._Code("&&"),
		ADD: new s._Code("+")
	};
	var d = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(t, s) {
			return this;
		}
	}, f = class extends d {
		constructor(t, s, c) {
			super(), this.varKind = t, this.name = s, this.rhs = c;
		}
		render({ es5: t, _n: s }) {
			let l = t ? c.varKinds.var : this.varKind, u = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${l} ${this.name}${u};` + s;
		}
		optimizeNames(t, s) {
			if (t[this.name.str]) return this.rhs &&= F(this.rhs, t, s), this;
		}
		get names() {
			return this.rhs instanceof s._CodeOrName ? this.rhs.names : {};
		}
	}, p = class extends d {
		constructor(t, s, c) {
			super(), this.lhs = t, this.rhs = s, this.sideEffects = c;
		}
		render({ _n: t }) {
			return `${this.lhs} = ${this.rhs};` + t;
		}
		optimizeNames(t, c) {
			if (!(this.lhs instanceof s.Name && !t[this.lhs.str] && !this.sideEffects)) return this.rhs = F(this.rhs, t, c), this;
		}
		get names() {
			return P(this.lhs instanceof s.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, m = class extends p {
		constructor(t, s, c, l) {
			super(t, c, l), this.op = s;
		}
		render({ _n: t }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + t;
		}
	}, h = class extends d {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `${this.label}:` + t;
		}
	}, g = class extends d {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `break${this.label ? ` ${this.label}` : ""};` + t;
		}
	}, _ = class extends d {
		constructor(t) {
			super(), this.error = t;
		}
		render({ _n: t }) {
			return `throw ${this.error};` + t;
		}
		get names() {
			return this.error.names;
		}
	}, v = class extends d {
		constructor(t) {
			super(), this.code = t;
		}
		render({ _n: t }) {
			return `${this.code};` + t;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(t, s) {
			return this.code = F(this.code, t, s), this;
		}
		get names() {
			return this.code instanceof s._CodeOrName ? this.code.names : {};
		}
	}, y = class extends d {
		constructor(t = []) {
			super(), this.nodes = t;
		}
		render(t) {
			return this.nodes.reduce((s, c) => s + c.render(t), "");
		}
		optimizeNodes() {
			let { nodes: t } = this, s = t.length;
			for (; s--;) {
				let c = t[s].optimizeNodes();
				Array.isArray(c) ? t.splice(s, 1, ...c) : c ? t[s] = c : t.splice(s, 1);
			}
			return t.length > 0 ? this : void 0;
		}
		optimizeNames(t, s) {
			let { nodes: c } = this, l = c.length;
			for (; l--;) {
				let u = c[l];
				u.optimizeNames(t, s) || (I(t, u.names), c.splice(l, 1));
			}
			return c.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((t, s) => N(t, s.names), {});
		}
	}, b = class extends y {
		render(t) {
			return "{" + t._n + super.render(t) + "}" + t._n;
		}
	}, x = class extends y {}, S = class extends b {};
	S.kind = "else";
	var C = class t extends b {
		constructor(t, s) {
			super(s), this.condition = t;
		}
		render(t) {
			let s = `if(${this.condition})` + super.render(t);
			return this.else && (s += "else " + this.else.render(t)), s;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let s = this.condition;
			if (s === !0) return this.nodes;
			let c = this.else;
			if (c) {
				let t = c.optimizeNodes();
				c = this.else = Array.isArray(t) ? new S(t) : t;
			}
			if (c) return s === !1 ? c instanceof t ? c : c.nodes : this.nodes.length ? this : new t(L(s), c instanceof t ? [c] : c.nodes);
			if (!(s === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(t, s) {
			if (this.else = this.else?.optimizeNames(t, s), super.optimizeNames(t, s) || this.else) return this.condition = F(this.condition, t, s), this;
		}
		get names() {
			let t = super.names;
			return P(t, this.condition), this.else && N(t, this.else.names), t;
		}
	};
	C.kind = "if";
	var w = class extends b {};
	w.kind = "for";
	var T = class extends w {
		constructor(t) {
			super(), this.iteration = t;
		}
		render(t) {
			return `for(${this.iteration})` + super.render(t);
		}
		optimizeNames(t, s) {
			if (super.optimizeNames(t, s)) return this.iteration = F(this.iteration, t, s), this;
		}
		get names() {
			return N(super.names, this.iteration.names);
		}
	}, E = class extends w {
		constructor(t, s, c, l) {
			super(), this.varKind = t, this.name = s, this.from = c, this.to = l;
		}
		render(t) {
			let s = t.es5 ? c.varKinds.var : this.varKind, { name: l, from: u, to: d } = this;
			return `for(${s} ${l}=${u}; ${l}<${d}; ${l}++)` + super.render(t);
		}
		get names() {
			return P(P(super.names, this.from), this.to);
		}
	}, D = class extends w {
		constructor(t, s, c, l) {
			super(), this.loop = t, this.varKind = s, this.name = c, this.iterable = l;
		}
		render(t) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(t);
		}
		optimizeNames(t, s) {
			if (super.optimizeNames(t, s)) return this.iterable = F(this.iterable, t, s), this;
		}
		get names() {
			return N(super.names, this.iterable.names);
		}
	}, O = class extends b {
		constructor(t, s, c) {
			super(), this.name = t, this.args = s, this.async = c;
		}
		render(t) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(t);
		}
	};
	O.kind = "func";
	var k = class extends y {
		render(t) {
			return "return " + super.render(t);
		}
	};
	k.kind = "return";
	var A = class extends b {
		render(t) {
			let s = "try" + super.render(t);
			return this.catch && (s += this.catch.render(t)), this.finally && (s += this.finally.render(t)), s;
		}
		optimizeNodes() {
			var t, s;
			return super.optimizeNodes(), (t = this.catch) == null || t.optimizeNodes(), (s = this.finally) == null || s.optimizeNodes(), this;
		}
		optimizeNames(t, s) {
			var c, l;
			return super.optimizeNames(t, s), (c = this.catch) == null || c.optimizeNames(t, s), (l = this.finally) == null || l.optimizeNames(t, s), this;
		}
		get names() {
			let t = super.names;
			return this.catch && N(t, this.catch.names), this.finally && N(t, this.finally.names), t;
		}
	}, j = class extends b {
		constructor(t) {
			super(), this.error = t;
		}
		render(t) {
			return `catch(${this.error})` + super.render(t);
		}
	};
	j.kind = "catch";
	var M = class extends b {
		render(t) {
			return "finally" + super.render(t);
		}
	};
	M.kind = "finally", t.CodeGen = class {
		constructor(t, s = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...s,
				_n: s.lines ? "\n" : ""
			}, this._extScope = t, this._scope = new c.Scope({ parent: t }), this._nodes = [new x()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(t) {
			return this._scope.name(t);
		}
		scopeName(t) {
			return this._extScope.name(t);
		}
		scopeValue(t, s) {
			let c = this._extScope.value(t, s);
			return (this._values[c.prefix] || (this._values[c.prefix] = /* @__PURE__ */ new Set())).add(c), c;
		}
		getScopeValue(t, s) {
			return this._extScope.getValue(t, s);
		}
		scopeRefs(t) {
			return this._extScope.scopeRefs(t, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(t, s, c, l) {
			let u = this._scope.toName(s);
			return c !== void 0 && l && (this._constants[u.str] = c), this._leafNode(new f(t, u, c)), u;
		}
		const(t, s, l) {
			return this._def(c.varKinds.const, t, s, l);
		}
		let(t, s, l) {
			return this._def(c.varKinds.let, t, s, l);
		}
		var(t, s, l) {
			return this._def(c.varKinds.var, t, s, l);
		}
		assign(t, s, c) {
			return this._leafNode(new p(t, s, c));
		}
		add(s, c) {
			return this._leafNode(new m(s, t.operators.ADD, c));
		}
		code(t) {
			return typeof t == "function" ? t() : t !== s.nil && this._leafNode(new v(t)), this;
		}
		object(...t) {
			let c = ["{"];
			for (let [l, u] of t) c.length > 1 && c.push(","), c.push(l), (l !== u || this.opts.es5) && (c.push(":"), (0, s.addCodeArg)(c, u));
			return c.push("}"), new s._Code(c);
		}
		if(t, s, c) {
			if (this._blockNode(new C(t)), s && c) this.code(s).else().code(c).endIf();
			else if (s) this.code(s).endIf();
			else if (c) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(t) {
			return this._elseNode(new C(t));
		}
		else() {
			return this._elseNode(new S());
		}
		endIf() {
			return this._endBlockNode(C, S);
		}
		_for(t, s) {
			return this._blockNode(t), s && this.code(s).endFor(), this;
		}
		for(t, s) {
			return this._for(new T(t), s);
		}
		forRange(t, s, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.let) {
			let f = this._scope.toName(t);
			return this._for(new E(d, f, s, l), () => u(f));
		}
		forOf(t, l, u, d = c.varKinds.const) {
			let f = this._scope.toName(t);
			if (this.opts.es5) {
				let t = l instanceof s.Name ? l : this.var("_arr", l);
				return this.forRange("_i", 0, (0, s._)`${t}.length`, (c) => {
					this.var(f, (0, s._)`${t}[${c}]`), u(f);
				});
			}
			return this._for(new D("of", d, f, l), () => u(f));
		}
		forIn(t, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(t, (0, s._)`Object.keys(${l})`, u);
			let f = this._scope.toName(t);
			return this._for(new D("in", d, f, l), () => u(f));
		}
		endFor() {
			return this._endBlockNode(w);
		}
		label(t) {
			return this._leafNode(new h(t));
		}
		break(t) {
			return this._leafNode(new g(t));
		}
		return(t) {
			let s = new k();
			if (this._blockNode(s), this.code(t), s.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(k);
		}
		try(t, s, c) {
			if (!s && !c) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let l = new A();
			if (this._blockNode(l), this.code(t), s) {
				let t = this.name("e");
				this._currNode = l.catch = new j(t), s(t);
			}
			return c && (this._currNode = l.finally = new M(), this.code(c)), this._endBlockNode(j, M);
		}
		throw(t) {
			return this._leafNode(new _(t));
		}
		block(t, s) {
			return this._blockStarts.push(this._nodes.length), t && this.code(t).endBlock(s), this;
		}
		endBlock(t) {
			let s = this._blockStarts.pop();
			if (s === void 0) throw Error("CodeGen: not in self-balancing block");
			let c = this._nodes.length - s;
			if (c < 0 || t !== void 0 && c !== t) throw Error(`CodeGen: wrong number of nodes: ${c} vs ${t} expected`);
			return this._nodes.length = s, this;
		}
		func(t, c = s.nil, l, u) {
			return this._blockNode(new O(t, c, l)), u && this.code(u).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(O);
		}
		optimize(t = 1) {
			for (; t-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(t) {
			return this._currNode.nodes.push(t), this;
		}
		_blockNode(t) {
			this._currNode.nodes.push(t), this._nodes.push(t);
		}
		_endBlockNode(t, s) {
			let c = this._currNode;
			if (c instanceof t || s && c instanceof s) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${s ? `${t.kind}/${s.kind}` : t.kind}"`);
		}
		_elseNode(t) {
			let s = this._currNode;
			if (!(s instanceof C)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = s.else = t, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let t = this._nodes;
			return t[t.length - 1];
		}
		set _currNode(t) {
			let s = this._nodes;
			s[s.length - 1] = t;
		}
	};
	function N(t, s) {
		for (let c in s) t[c] = (t[c] || 0) + (s[c] || 0);
		return t;
	}
	function P(t, c) {
		return c instanceof s._CodeOrName ? N(t, c.names) : t;
	}
	function F(t, c, l) {
		if (t instanceof s.Name) return u(t);
		if (!d(t)) return t;
		return new s._Code(t._items.reduce((t, c) => (c instanceof s.Name && (c = u(c)), c instanceof s._Code ? t.push(...c._items) : t.push(c), t), []));
		function u(t) {
			let s = l[t.str];
			return s === void 0 || c[t.str] !== 1 ? t : (delete c[t.str], s);
		}
		function d(t) {
			return t instanceof s._Code && t._items.some((t) => t instanceof s.Name && c[t.str] === 1 && l[t.str] !== void 0);
		}
	}
	function I(t, s) {
		for (let c in s) t[c] = (t[c] || 0) - (s[c] || 0);
	}
	function L(t) {
		return typeof t == "boolean" || typeof t == "number" || t === null ? !t : (0, s._)`!${U(t)}`;
	}
	t.not = L;
	var R = H(t.operators.AND);
	function z(...t) {
		return t.reduce(R);
	}
	t.and = z;
	var B = H(t.operators.OR);
	function V(...t) {
		return t.reduce(B);
	}
	t.or = V;
	function H(t) {
		return (c, l) => c === s.nil ? l : l === s.nil ? c : (0, s._)`${U(c)} ${t} ${U(l)}`;
	}
	function U(t) {
		return t instanceof s.Name ? t : (0, s._)`(${t})`;
	}
})), require_util$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.checkStrictMode = t.getErrorPath = t.Type = t.useFunc = t.setEvaluated = t.evaluatedPropsToName = t.mergeEvaluated = t.eachItem = t.unescapeJsonPointer = t.escapeJsonPointer = t.escapeFragment = t.unescapeFragment = t.schemaRefOrVal = t.schemaHasRulesButRef = t.schemaHasRules = t.checkUnknownRules = t.alwaysValidSchema = t.toHash = void 0;
	var s = require_codegen$1(), c = require_code$3();
	function l(t) {
		let s = {};
		for (let c of t) s[c] = !0;
		return s;
	}
	t.toHash = l;
	function u(t, s) {
		return typeof s == "boolean" ? s : Object.keys(s).length === 0 ? !0 : (d(t, s), !f(s, t.self.RULES.all));
	}
	t.alwaysValidSchema = u;
	function d(t, s = t.schema) {
		let { opts: c, self: l } = t;
		if (!c.strictSchema || typeof s == "boolean") return;
		let u = l.RULES.keywords;
		for (let c in s) u[c] || D(t, `unknown keyword: "${c}"`);
	}
	t.checkUnknownRules = d;
	function f(t, s) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (s[c]) return !0;
		return !1;
	}
	t.schemaHasRules = f;
	function p(t, s) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (c !== "$ref" && s.all[c]) return !0;
		return !1;
	}
	t.schemaHasRulesButRef = p;
	function m({ topSchemaRef: t, schemaPath: c }, l, u, d) {
		if (!d) {
			if (typeof l == "number" || typeof l == "boolean") return l;
			if (typeof l == "string") return (0, s._)`${l}`;
		}
		return (0, s._)`${t}${c}${(0, s.getProperty)(u)}`;
	}
	t.schemaRefOrVal = m;
	function h(t) {
		return v(decodeURIComponent(t));
	}
	t.unescapeFragment = h;
	function g(t) {
		return encodeURIComponent(_(t));
	}
	t.escapeFragment = g;
	function _(t) {
		return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	t.escapeJsonPointer = _;
	function v(t) {
		return t.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	t.unescapeJsonPointer = v;
	function y(t, s) {
		if (Array.isArray(t)) for (let c of t) s(c);
		else s(t);
	}
	t.eachItem = y;
	function b({ mergeNames: t, mergeToName: c, mergeValues: l, resultToName: u }) {
		return (d, f, p, m) => {
			let h = p === void 0 ? f : p instanceof s.Name ? (f instanceof s.Name ? t(d, f, p) : c(d, f, p), p) : f instanceof s.Name ? (c(d, p, f), f) : l(f, p);
			return m === s.Name && !(h instanceof s.Name) ? u(d, h) : h;
		};
	}
	t.mergeEvaluated = {
		props: b({
			mergeNames: (t, c, l) => t.if((0, s._)`${l} !== true && ${c} !== undefined`, () => {
				t.if((0, s._)`${c} === true`, () => t.assign(l, !0), () => t.assign(l, (0, s._)`${l} || {}`).code((0, s._)`Object.assign(${l}, ${c})`));
			}),
			mergeToName: (t, c, l) => t.if((0, s._)`${l} !== true`, () => {
				c === !0 ? t.assign(l, !0) : (t.assign(l, (0, s._)`${l} || {}`), S(t, l, c));
			}),
			mergeValues: (t, s) => t === !0 ? !0 : {
				...t,
				...s
			},
			resultToName: x
		}),
		items: b({
			mergeNames: (t, c, l) => t.if((0, s._)`${l} !== true && ${c} !== undefined`, () => t.assign(l, (0, s._)`${c} === true ? true : ${l} > ${c} ? ${l} : ${c}`)),
			mergeToName: (t, c, l) => t.if((0, s._)`${l} !== true`, () => t.assign(l, c === !0 ? !0 : (0, s._)`${l} > ${c} ? ${l} : ${c}`)),
			mergeValues: (t, s) => t === !0 ? !0 : Math.max(t, s),
			resultToName: (t, s) => t.var("items", s)
		})
	};
	function x(t, c) {
		if (c === !0) return t.var("props", !0);
		let l = t.var("props", (0, s._)`{}`);
		return c !== void 0 && S(t, l, c), l;
	}
	t.evaluatedPropsToName = x;
	function S(t, c, l) {
		Object.keys(l).forEach((l) => t.assign((0, s._)`${c}${(0, s.getProperty)(l)}`, !0));
	}
	t.setEvaluated = S;
	var C = {};
	function w(t, s) {
		return t.scopeValue("func", {
			ref: s,
			code: C[s.code] || (C[s.code] = new c._Code(s.code))
		});
	}
	t.useFunc = w;
	var T;
	(function(t) {
		t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
	})(T || (t.Type = T = {}));
	function E(t, c, l) {
		if (t instanceof s.Name) {
			let u = c === T.Num;
			return l ? u ? (0, s._)`"[" + ${t} + "]"` : (0, s._)`"['" + ${t} + "']"` : u ? (0, s._)`"/" + ${t}` : (0, s._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return l ? (0, s.getProperty)(t).toString() : "/" + _(t);
	}
	t.getErrorPath = E;
	function D(t, s, c = t.opts.strictSchema) {
		if (c) {
			if (s = `strict mode: ${s}`, c === !0) throw Error(s);
			t.self.logger.warn(s);
		}
	}
	t.checkStrictMode = D;
})), require_names$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1();
	t.default = {
		data: new s.Name("data"),
		valCxt: new s.Name("valCxt"),
		instancePath: new s.Name("instancePath"),
		parentData: new s.Name("parentData"),
		parentDataProperty: new s.Name("parentDataProperty"),
		rootData: new s.Name("rootData"),
		dynamicAnchors: new s.Name("dynamicAnchors"),
		vErrors: new s.Name("vErrors"),
		errors: new s.Name("errors"),
		this: new s.Name("this"),
		self: new s.Name("self"),
		scope: new s.Name("scope"),
		json: new s.Name("json"),
		jsonPos: new s.Name("jsonPos"),
		jsonLen: new s.Name("jsonLen"),
		jsonPart: new s.Name("jsonPart")
	};
})), require_errors$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1();
	t.keywordError = { message: ({ keyword: t }) => (0, s.str)`must pass "${t}" keyword validation` }, t.keyword$DataError = { message: ({ keyword: t, schemaType: c }) => c ? (0, s.str)`"${t}" keyword must be ${c} ($data)` : (0, s.str)`"${t}" keyword is invalid ($data)` };
	function u(c, l = t.keywordError, u, d) {
		let { it: f } = c, { gen: p, compositeRule: g, allErrors: v } = f, y = _(c, l, u);
		d ?? (g || v) ? m(p, y) : h(f, (0, s._)`[${y}]`);
	}
	t.reportError = u;
	function d(s, c = t.keywordError, u) {
		let { it: d } = s, { gen: f, compositeRule: p, allErrors: g } = d;
		m(f, _(s, c, u)), p || g || h(d, l.default.vErrors);
	}
	t.reportExtraError = d;
	function f(t, c) {
		t.assign(l.default.errors, c), t.if((0, s._)`${l.default.vErrors} !== null`, () => t.if(c, () => t.assign((0, s._)`${l.default.vErrors}.length`, c), () => t.assign(l.default.vErrors, null)));
	}
	t.resetErrorsCount = f;
	function p({ gen: t, keyword: c, schemaValue: u, data: d, errsCount: f, it: p }) {
		/* istanbul ignore if */
		if (f === void 0) throw Error("ajv implementation error");
		let m = t.name("err");
		t.forRange("i", f, l.default.errors, (f) => {
			t.const(m, (0, s._)`${l.default.vErrors}[${f}]`), t.if((0, s._)`${m}.instancePath === undefined`, () => t.assign((0, s._)`${m}.instancePath`, (0, s.strConcat)(l.default.instancePath, p.errorPath))), t.assign((0, s._)`${m}.schemaPath`, (0, s.str)`${p.errSchemaPath}/${c}`), p.opts.verbose && (t.assign((0, s._)`${m}.schema`, u), t.assign((0, s._)`${m}.data`, d));
		});
	}
	t.extendErrors = p;
	function m(t, c) {
		let u = t.const("err", c);
		t.if((0, s._)`${l.default.vErrors} === null`, () => t.assign(l.default.vErrors, (0, s._)`[${u}]`), (0, s._)`${l.default.vErrors}.push(${u})`), t.code((0, s._)`${l.default.errors}++`);
	}
	function h(t, c) {
		let { gen: l, validateName: u, schemaEnv: d } = t;
		d.$async ? l.throw((0, s._)`new ${t.ValidationError}(${c})`) : (l.assign((0, s._)`${u}.errors`, c), l.return(!1));
	}
	var g = {
		keyword: new s.Name("keyword"),
		schemaPath: new s.Name("schemaPath"),
		params: new s.Name("params"),
		propertyName: new s.Name("propertyName"),
		message: new s.Name("message"),
		schema: new s.Name("schema"),
		parentSchema: new s.Name("parentSchema")
	};
	function _(t, c, l) {
		let { createErrors: u } = t.it;
		return u === !1 ? (0, s._)`{}` : v(t, c, l);
	}
	function v(t, s, c = {}) {
		let { gen: l, it: u } = t, d = [y(u, c), b(t, c)];
		return x(t, s, d), l.object(...d);
	}
	function y({ errorPath: t }, { instancePath: u }) {
		let d = u ? (0, s.str)`${t}${(0, c.getErrorPath)(u, c.Type.Str)}` : t;
		return [l.default.instancePath, (0, s.strConcat)(l.default.instancePath, d)];
	}
	function b({ keyword: t, it: { errSchemaPath: l } }, { schemaPath: u, parentSchema: d }) {
		let f = d ? l : (0, s.str)`${l}/${t}`;
		return u && (f = (0, s.str)`${f}${(0, c.getErrorPath)(u, c.Type.Str)}`), [g.schemaPath, f];
	}
	function x(t, { params: c, message: u }, d) {
		let { keyword: f, data: p, schemaValue: m, it: h } = t, { opts: _, propertyName: v, topSchemaRef: y, schemaPath: b } = h;
		d.push([g.keyword, f], [g.params, typeof c == "function" ? c(t) : c || (0, s._)`{}`]), _.messages && d.push([g.message, typeof u == "function" ? u(t) : u]), _.verbose && d.push([g.schema, m], [g.parentSchema, (0, s._)`${y}${b}`], [l.default.data, p]), v && d.push([g.propertyName, v]);
	}
})), require_boolSchema$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.boolOrEmptySchema = t.topBoolOrEmptySchema = void 0;
	var s = require_errors$2(), c = require_codegen$1(), l = require_names$1(), u = { message: "boolean schema is false" };
	function d(t) {
		let { gen: s, schema: u, validateName: d } = t;
		u === !1 ? p(t, !1) : typeof u == "object" && u.$async === !0 ? s.return(l.default.data) : (s.assign((0, c._)`${d}.errors`, null), s.return(!0));
	}
	t.topBoolOrEmptySchema = d;
	function f(t, s) {
		let { gen: c, schema: l } = t;
		l === !1 ? (c.var(s, !1), p(t)) : c.var(s, !0);
	}
	t.boolOrEmptySchema = f;
	function p(t, c) {
		let { gen: l, data: d } = t, f = {
			gen: l,
			keyword: "false schema",
			data: d,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: t
		};
		(0, s.reportError)(f, u, void 0, c);
	}
})), require_rules$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getRules = t.isJSONType = void 0;
	var s = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function c(t) {
		return typeof t == "string" && s.has(t);
	}
	t.isJSONType = c;
	function l() {
		let t = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...t,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				t.number,
				t.string,
				t.array,
				t.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	t.getRules = l;
})), require_applicability$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.shouldUseRule = t.shouldUseGroup = t.schemaHasRulesForType = void 0;
	function s({ schema: t, self: s }, l) {
		let u = s.RULES.types[l];
		return u && u !== !0 && c(t, u);
	}
	t.schemaHasRulesForType = s;
	function c(t, s) {
		return s.rules.some((s) => l(t, s));
	}
	t.shouldUseGroup = c;
	function l(t, s) {
		return t[s.keyword] !== void 0 || s.definition.implements?.some((s) => t[s] !== void 0);
	}
	t.shouldUseRule = l;
})), require_dataType$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.reportTypeError = t.checkDataTypes = t.checkDataType = t.coerceAndCheckDataType = t.getJSONTypes = t.getSchemaTypes = t.DataType = void 0;
	var s = require_rules$1(), c = require_applicability$1(), l = require_errors$2(), u = require_codegen$1(), d = require_util$2(), f;
	(function(t) {
		t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
	})(f || (t.DataType = f = {}));
	function p(t) {
		let s = m(t.type);
		if (s.includes("null")) {
			if (t.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!s.length && t.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			t.nullable === !0 && s.push("null");
		}
		return s;
	}
	t.getSchemaTypes = p;
	function m(t) {
		let c = Array.isArray(t) ? t : t ? [t] : [];
		if (c.every(s.isJSONType)) return c;
		throw Error("type must be JSONType or JSONType[]: " + c.join(","));
	}
	t.getJSONTypes = m;
	function h(t, s) {
		let { gen: l, data: u, opts: d } = t, p = _(s, d.coerceTypes), m = s.length > 0 && !(p.length === 0 && s.length === 1 && (0, c.schemaHasRulesForType)(t, s[0]));
		if (m) {
			let c = x(s, u, d.strictNumbers, f.Wrong);
			l.if(c, () => {
				p.length ? v(t, s, p) : C(t);
			});
		}
		return m;
	}
	t.coerceAndCheckDataType = h;
	var g = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function _(t, s) {
		return s ? t.filter((t) => g.has(t) || s === "array" && t === "array") : [];
	}
	function v(t, s, c) {
		let { gen: l, data: d, opts: f } = t, p = l.let("dataType", (0, u._)`typeof ${d}`), m = l.let("coerced", (0, u._)`undefined`);
		f.coerceTypes === "array" && l.if((0, u._)`${p} == 'object' && Array.isArray(${d}) && ${d}.length == 1`, () => l.assign(d, (0, u._)`${d}[0]`).assign(p, (0, u._)`typeof ${d}`).if(x(s, d, f.strictNumbers), () => l.assign(m, d))), l.if((0, u._)`${m} !== undefined`);
		for (let t of c) (g.has(t) || t === "array" && f.coerceTypes === "array") && h(t);
		l.else(), C(t), l.endIf(), l.if((0, u._)`${m} !== undefined`, () => {
			l.assign(d, m), y(t, m);
		});
		function h(t) {
			switch (t) {
				case "string":
					l.elseIf((0, u._)`${p} == "number" || ${p} == "boolean"`).assign(m, (0, u._)`"" + ${d}`).elseIf((0, u._)`${d} === null`).assign(m, (0, u._)`""`);
					return;
				case "number":
					l.elseIf((0, u._)`${p} == "boolean" || ${d} === null
              || (${p} == "string" && ${d} && ${d} == +${d})`).assign(m, (0, u._)`+${d}`);
					return;
				case "integer":
					l.elseIf((0, u._)`${p} === "boolean" || ${d} === null
              || (${p} === "string" && ${d} && ${d} == +${d} && !(${d} % 1))`).assign(m, (0, u._)`+${d}`);
					return;
				case "boolean":
					l.elseIf((0, u._)`${d} === "false" || ${d} === 0 || ${d} === null`).assign(m, !1).elseIf((0, u._)`${d} === "true" || ${d} === 1`).assign(m, !0);
					return;
				case "null":
					l.elseIf((0, u._)`${d} === "" || ${d} === 0 || ${d} === false`), l.assign(m, null);
					return;
				case "array": l.elseIf((0, u._)`${p} === "string" || ${p} === "number"
              || ${p} === "boolean" || ${d} === null`).assign(m, (0, u._)`[${d}]`);
			}
		}
	}
	function y({ gen: t, parentData: s, parentDataProperty: c }, l) {
		t.if((0, u._)`${s} !== undefined`, () => t.assign((0, u._)`${s}[${c}]`, l));
	}
	function b(t, s, c, l = f.Correct) {
		let d = l === f.Correct ? u.operators.EQ : u.operators.NEQ, p;
		switch (t) {
			case "null": return (0, u._)`${s} ${d} null`;
			case "array":
				p = (0, u._)`Array.isArray(${s})`;
				break;
			case "object":
				p = (0, u._)`${s} && typeof ${s} == "object" && !Array.isArray(${s})`;
				break;
			case "integer":
				p = m((0, u._)`!(${s} % 1) && !isNaN(${s})`);
				break;
			case "number":
				p = m();
				break;
			default: return (0, u._)`typeof ${s} ${d} ${t}`;
		}
		return l === f.Correct ? p : (0, u.not)(p);
		function m(t = u.nil) {
			return (0, u.and)((0, u._)`typeof ${s} == "number"`, t, c ? (0, u._)`isFinite(${s})` : u.nil);
		}
	}
	t.checkDataType = b;
	function x(t, s, c, l) {
		if (t.length === 1) return b(t[0], s, c, l);
		let f, p = (0, d.toHash)(t);
		if (p.array && p.object) {
			let t = (0, u._)`typeof ${s} != "object"`;
			f = p.null ? t : (0, u._)`!${s} || ${t}`, delete p.null, delete p.array, delete p.object;
		} else f = u.nil;
		for (let t in p.number && delete p.integer, p) f = (0, u.and)(f, b(t, s, c, l));
		return f;
	}
	t.checkDataTypes = x;
	var S = {
		message: ({ schema: t }) => `must be ${t}`,
		params: ({ schema: t, schemaValue: s }) => typeof t == "string" ? (0, u._)`{type: ${t}}` : (0, u._)`{type: ${s}}`
	};
	function C(t) {
		let s = w(t);
		(0, l.reportError)(s, S);
	}
	t.reportTypeError = C;
	function w(t) {
		let { gen: s, data: c, schema: l } = t, u = (0, d.schemaRefOrVal)(t, l, "type");
		return {
			gen: s,
			keyword: "type",
			data: c,
			schema: l.type,
			schemaCode: u,
			schemaValue: u,
			parentSchema: l,
			params: {},
			it: t
		};
	}
})), require_defaults$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.assignDefaults = void 0;
	var s = require_codegen$1(), c = require_util$2();
	function l(t, s) {
		let { properties: c, items: l } = t.schema;
		if (s === "object" && c) for (let s in c) u(t, s, c[s].default);
		else s === "array" && Array.isArray(l) && l.forEach((s, c) => u(t, c, s.default));
	}
	t.assignDefaults = l;
	function u(t, l, u) {
		let { gen: d, compositeRule: f, data: p, opts: m } = t;
		if (u === void 0) return;
		let h = (0, s._)`${p}${(0, s.getProperty)(l)}`;
		if (f) {
			(0, c.checkStrictMode)(t, `default is ignored for: ${h}`);
			return;
		}
		let g = (0, s._)`${h} === undefined`;
		m.useDefaults === "empty" && (g = (0, s._)`${g} || ${h} === null || ${h} === ""`), d.if(g, (0, s._)`${h} = ${(0, s.stringify)(u)}`);
	}
})), require_code$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateUnion = t.validateArray = t.usePattern = t.callValidateCode = t.schemaProperties = t.allSchemaProperties = t.noPropertyInData = t.propertyInData = t.isOwnProperty = t.hasPropFunc = t.reportMissingProp = t.checkMissingProp = t.checkReportMissingProp = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1(), u = require_util$2();
	function d(t, c) {
		let { gen: l, data: u, it: d } = t;
		l.if(_(l, u, c, d.opts.ownProperties), () => {
			t.setParams({ missingProperty: (0, s._)`${c}` }, !0), t.error();
		});
	}
	t.checkReportMissingProp = d;
	function f({ gen: t, data: c, it: { opts: l } }, u, d) {
		return (0, s.or)(...u.map((u) => (0, s.and)(_(t, c, u, l.ownProperties), (0, s._)`${d} = ${u}`)));
	}
	t.checkMissingProp = f;
	function p(t, s) {
		t.setParams({ missingProperty: s }, !0), t.error();
	}
	t.reportMissingProp = p;
	function m(t) {
		return t.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, s._)`Object.prototype.hasOwnProperty`
		});
	}
	t.hasPropFunc = m;
	function h(t, c, l) {
		return (0, s._)`${m(t)}.call(${c}, ${l})`;
	}
	t.isOwnProperty = h;
	function g(t, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} !== undefined`;
		return u ? (0, s._)`${d} && ${h(t, c, l)}` : d;
	}
	t.propertyInData = g;
	function _(t, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} === undefined`;
		return u ? (0, s.or)(d, (0, s.not)(h(t, c, l))) : d;
	}
	t.noPropertyInData = _;
	function v(t) {
		return t ? Object.keys(t).filter((t) => t !== "__proto__") : [];
	}
	t.allSchemaProperties = v;
	function y(t, s) {
		return v(s).filter((l) => !(0, c.alwaysValidSchema)(t, s[l]));
	}
	t.schemaProperties = y;
	function b({ schemaCode: t, data: c, it: { gen: u, topSchemaRef: d, schemaPath: f, errorPath: p }, it: m }, h, g, _) {
		let v = _ ? (0, s._)`${t}, ${c}, ${d}${f}` : c, y = [
			[l.default.instancePath, (0, s.strConcat)(l.default.instancePath, p)],
			[l.default.parentData, m.parentData],
			[l.default.parentDataProperty, m.parentDataProperty],
			[l.default.rootData, l.default.rootData]
		];
		m.opts.dynamicRef && y.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
		let b = (0, s._)`${v}, ${u.object(...y)}`;
		return g === s.nil ? (0, s._)`${h}(${b})` : (0, s._)`${h}.call(${g}, ${b})`;
	}
	t.callValidateCode = b;
	var x = (0, s._)`new RegExp`;
	function S({ gen: t, it: { opts: c } }, l) {
		let d = c.unicodeRegExp ? "u" : "", { regExp: f } = c.code, p = f(l, d);
		return t.scopeValue("pattern", {
			key: p.toString(),
			ref: p,
			code: (0, s._)`${f.code === "new RegExp" ? x : (0, u.useFunc)(t, f)}(${l}, ${d})`
		});
	}
	t.usePattern = S;
	function C(t) {
		let { gen: l, data: u, keyword: d, it: f } = t, p = l.name("valid");
		if (f.allErrors) {
			let t = l.let("valid", !0);
			return m(() => l.assign(t, !1)), t;
		}
		return l.var(p, !0), m(() => l.break()), p;
		function m(f) {
			let m = l.const("len", (0, s._)`${u}.length`);
			l.forRange("i", 0, m, (u) => {
				t.subschema({
					keyword: d,
					dataProp: u,
					dataPropType: c.Type.Num
				}, p), l.if((0, s.not)(p), f);
			});
		}
	}
	t.validateArray = C;
	function w(t) {
		let { gen: l, schema: u, keyword: d, it: f } = t;
		/* istanbul ignore if */
		if (!Array.isArray(u)) throw Error("ajv implementation error");
		if (u.some((t) => (0, c.alwaysValidSchema)(f, t)) && !f.opts.unevaluated) return;
		let p = l.let("valid", !1), m = l.name("_valid");
		l.block(() => u.forEach((c, u) => {
			let f = t.subschema({
				keyword: d,
				schemaProp: u,
				compositeRule: !0
			}, m);
			l.assign(p, (0, s._)`${p} || ${m}`), t.mergeValidEvaluated(f, m) || l.if((0, s.not)(p));
		})), t.result(p, () => t.reset(), () => t.error(!0));
	}
	t.validateUnion = w;
})), require_keyword$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateKeywordUsage = t.validSchemaType = t.funcKeywordCode = t.macroKeywordCode = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_code$2(), u = require_errors$2();
	function d(t, c) {
		let { gen: l, keyword: u, schema: d, parentSchema: f, it: p } = t, m = c.macro.call(p.self, d, f, p), h = g(l, u, m);
		p.opts.validateSchema !== !1 && p.self.validateSchema(m, !0);
		let _ = l.name("valid");
		t.subschema({
			schema: m,
			schemaPath: s.nil,
			errSchemaPath: `${p.errSchemaPath}/${u}`,
			topSchemaRef: h,
			compositeRule: !0
		}, _), t.pass(_, () => t.error(!0));
	}
	t.macroKeywordCode = d;
	function f(t, u) {
		let { gen: d, keyword: f, schema: _, parentSchema: v, $data: y, it: b } = t;
		h(b, u);
		let x = g(d, f, !y && u.compile ? u.compile.call(b.self, _, v, b) : u.validate), S = d.let("valid");
		t.block$data(S, C), t.ok(u.valid ?? S);
		function C() {
			if (u.errors === !1) E(), u.modifying && p(t), D(() => t.error());
			else {
				let s = u.async ? w() : T();
				u.modifying && p(t), D(() => m(t, s));
			}
		}
		function w() {
			let t = d.let("ruleErrs", null);
			return d.try(() => E((0, s._)`await `), (c) => d.assign(S, !1).if((0, s._)`${c} instanceof ${b.ValidationError}`, () => d.assign(t, (0, s._)`${c}.errors`), () => d.throw(c))), t;
		}
		function T() {
			let t = (0, s._)`${x}.errors`;
			return d.assign(t, null), E(s.nil), t;
		}
		function E(f = u.async ? (0, s._)`await ` : s.nil) {
			let p = b.opts.passContext ? c.default.this : c.default.self, m = !("compile" in u && !y || u.schema === !1);
			d.assign(S, (0, s._)`${f}${(0, l.callValidateCode)(t, x, p, m)}`, u.modifying);
		}
		function D(t) {
			d.if((0, s.not)(u.valid ?? S), t);
		}
	}
	t.funcKeywordCode = f;
	function p(t) {
		let { gen: c, data: l, it: u } = t;
		c.if(u.parentData, () => c.assign(l, (0, s._)`${u.parentData}[${u.parentDataProperty}]`));
	}
	function m(t, l) {
		let { gen: d } = t;
		d.if((0, s._)`Array.isArray(${l})`, () => {
			d.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${l} : ${c.default.vErrors}.concat(${l})`).assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`), (0, u.extendErrors)(t);
		}, () => t.error());
	}
	function h({ schemaEnv: t }, s) {
		if (s.async && !t.$async) throw Error("async keyword in sync schema");
	}
	function g(t, c, l) {
		if (l === void 0) throw Error(`keyword "${c}" failed to compile`);
		return t.scopeValue("keyword", typeof l == "function" ? { ref: l } : {
			ref: l,
			code: (0, s.stringify)(l)
		});
	}
	function _(t, s, c = !1) {
		return !s.length || s.some((s) => s === "array" ? Array.isArray(t) : s === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == s || c && t === void 0);
	}
	t.validSchemaType = _;
	function v({ schema: t, opts: s, self: c, errSchemaPath: l }, u, d) {
		/* istanbul ignore if */
		if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d) throw Error("ajv implementation error");
		let f = u.dependencies;
		if (f?.some((s) => !Object.prototype.hasOwnProperty.call(t, s))) throw Error(`parent schema must have dependencies of ${d}: ${f.join(",")}`);
		if (u.validateSchema && !u.validateSchema(t[d])) {
			let t = `keyword "${d}" value is invalid at path "${l}": ` + c.errorsText(u.validateSchema.errors);
			if (s.validateSchema === "log") c.logger.error(t);
			else throw Error(t);
		}
	}
	t.validateKeywordUsage = v;
})), require_subschema$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendSubschemaMode = t.extendSubschemaData = t.getSubschema = void 0;
	var s = require_codegen$1(), c = require_util$2();
	function l(t, { keyword: l, schemaProp: u, schema: d, schemaPath: f, errSchemaPath: p, topSchemaRef: m }) {
		if (l !== void 0 && d !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (l !== void 0) {
			let d = t.schema[l];
			return u === void 0 ? {
				schema: d,
				schemaPath: (0, s._)`${t.schemaPath}${(0, s.getProperty)(l)}`,
				errSchemaPath: `${t.errSchemaPath}/${l}`
			} : {
				schema: d[u],
				schemaPath: (0, s._)`${t.schemaPath}${(0, s.getProperty)(l)}${(0, s.getProperty)(u)}`,
				errSchemaPath: `${t.errSchemaPath}/${l}/${(0, c.escapeFragment)(u)}`
			};
		}
		if (d !== void 0) {
			if (f === void 0 || p === void 0 || m === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: d,
				schemaPath: f,
				topSchemaRef: m,
				errSchemaPath: p
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	t.getSubschema = l;
	function u(t, l, { dataProp: u, dataPropType: d, data: f, dataTypes: p, propertyName: m }) {
		if (f !== void 0 && u !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: h } = l;
		if (u !== void 0) {
			let { errorPath: f, dataPathArr: p, opts: m } = l;
			g(h.let("data", (0, s._)`${l.data}${(0, s.getProperty)(u)}`, !0)), t.errorPath = (0, s.str)`${f}${(0, c.getErrorPath)(u, d, m.jsPropertySyntax)}`, t.parentDataProperty = (0, s._)`${u}`, t.dataPathArr = [...p, t.parentDataProperty];
		}
		f !== void 0 && (g(f instanceof s.Name ? f : h.let("data", f, !0)), m !== void 0 && (t.propertyName = m)), p && (t.dataTypes = p);
		function g(s) {
			t.data = s, t.dataLevel = l.dataLevel + 1, t.dataTypes = [], l.definedProperties = /* @__PURE__ */ new Set(), t.parentData = l.data, t.dataNames = [...l.dataNames, s];
		}
	}
	t.extendSubschemaData = u;
	function d(t, { jtdDiscriminator: s, jtdMetadata: c, compositeRule: l, createErrors: u, allErrors: d }) {
		l !== void 0 && (t.compositeRule = l), u !== void 0 && (t.createErrors = u), d !== void 0 && (t.allErrors = d), t.jtdDiscriminator = s, t.jtdMetadata = c;
	}
	t.extendSubschemaMode = d;
})), require_fast_deep_equal = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = function t(s, c) {
		if (s === c) return !0;
		if (s && c && typeof s == "object" && typeof c == "object") {
			if (s.constructor !== c.constructor) return !1;
			var l, u, d;
			if (Array.isArray(s)) {
				if (l = s.length, l != c.length) return !1;
				for (u = l; u-- !== 0;) if (!t(s[u], c[u])) return !1;
				return !0;
			}
			if (s.constructor === RegExp) return s.source === c.source && s.flags === c.flags;
			if (s.valueOf !== Object.prototype.valueOf) return s.valueOf() === c.valueOf();
			if (s.toString !== Object.prototype.toString) return s.toString() === c.toString();
			if (d = Object.keys(s), l = d.length, l !== Object.keys(c).length) return !1;
			for (u = l; u-- !== 0;) if (!Object.prototype.hasOwnProperty.call(c, d[u])) return !1;
			for (u = l; u-- !== 0;) {
				var f = d[u];
				if (!t(s[f], c[f])) return !1;
			}
			return !0;
		}
		return s !== s && c !== c;
	};
})), require_json_schema_traverse$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = s.exports = function(t, s, c) {
		typeof s == "function" && (c = s, s = {}), c = s.cb || c;
		var u = typeof c == "function" ? c : c.pre || function() {}, d = c.post || function() {};
		l(s, u, d, t, "", t);
	};
	c.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, c.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, c.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, c.skipKeywords = {
		default: !0,
		enum: !0,
		const: !0,
		required: !0,
		maximum: !0,
		minimum: !0,
		exclusiveMaximum: !0,
		exclusiveMinimum: !0,
		multipleOf: !0,
		maxLength: !0,
		minLength: !0,
		pattern: !0,
		format: !0,
		maxItems: !0,
		minItems: !0,
		uniqueItems: !0,
		maxProperties: !0,
		minProperties: !0
	};
	function l(t, s, d, f, p, m, h, g, _, v) {
		if (f && typeof f == "object" && !Array.isArray(f)) {
			for (var y in s(f, p, m, h, g, _, v), f) {
				var b = f[y];
				if (Array.isArray(b)) {
					if (y in c.arrayKeywords) for (var x = 0; x < b.length; x++) l(t, s, d, b[x], p + "/" + y + "/" + x, m, p, y, f, x);
				} else if (y in c.propsKeywords) {
					if (b && typeof b == "object") for (var S in b) l(t, s, d, b[S], p + "/" + y + "/" + u(S), m, p, y, f, S);
				} else (y in c.keywords || t.allKeys && !(y in c.skipKeywords)) && l(t, s, d, b, p + "/" + y, m, p, y, f);
			}
			d(f, p, m, h, g, _, v);
		}
	}
	function u(t) {
		return t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getSchemaRefs = t.resolveUrl = t.normalizeId = t._getFullPath = t.getFullPath = t.inlineRef = void 0;
	var s = require_util$2(), c = require_fast_deep_equal(), l = require_json_schema_traverse$1(), u = new Set([
		"type",
		"format",
		"pattern",
		"maxLength",
		"minLength",
		"maxProperties",
		"minProperties",
		"maxItems",
		"minItems",
		"maximum",
		"minimum",
		"uniqueItems",
		"multipleOf",
		"required",
		"enum",
		"const"
	]);
	function d(t, s = !0) {
		return typeof t == "boolean" ? !0 : s === !0 ? !p(t) : s ? m(t) <= s : !1;
	}
	t.inlineRef = d;
	var f = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function p(t) {
		for (let s in t) {
			if (f.has(s)) return !0;
			let c = t[s];
			if (Array.isArray(c) && c.some(p) || typeof c == "object" && p(c)) return !0;
		}
		return !1;
	}
	function m(t) {
		let c = 0;
		for (let l in t) if (l === "$ref" || (c++, !u.has(l) && (typeof t[l] == "object" && (0, s.eachItem)(t[l], (t) => c += m(t)), c === Infinity))) return Infinity;
		return c;
	}
	function h(t, s = "", c) {
		return c !== !1 && (s = v(s)), g(t, t.parse(s));
	}
	t.getFullPath = h;
	function g(t, s) {
		return t.serialize(s).split("#")[0] + "#";
	}
	t._getFullPath = g;
	var _ = /#\/?$/;
	function v(t) {
		return t ? t.replace(_, "") : "";
	}
	t.normalizeId = v;
	function y(t, s, c) {
		return c = v(c), t.resolve(s, c);
	}
	t.resolveUrl = y;
	var b = /^[a-z_][-a-z0-9._]*$/i;
	function x(t, s) {
		if (typeof t == "boolean") return {};
		let { schemaId: u, uriResolver: d } = this.opts, f = v(t[u] || s), p = { "": f }, m = h(d, f, !1), g = {}, _ = /* @__PURE__ */ new Set();
		return l(t, { allKeys: !0 }, (t, s, c, l) => {
			if (l === void 0) return;
			let d = m + s, f = p[l];
			typeof t[u] == "string" && (f = h.call(this, t[u])), S.call(this, t.$anchor), S.call(this, t.$dynamicAnchor), p[s] = f;
			function h(s) {
				let c = this.opts.uriResolver.resolve;
				if (s = v(f ? c(f, s) : s), _.has(s)) throw x(s);
				_.add(s);
				let l = this.refs[s];
				return typeof l == "string" && (l = this.refs[l]), typeof l == "object" ? y(t, l.schema, s) : s !== v(d) && (s[0] === "#" ? (y(t, g[s], s), g[s] = t) : this.refs[s] = d), s;
			}
			function S(t) {
				if (typeof t == "string") {
					if (!b.test(t)) throw Error(`invalid anchor "${t}"`);
					h.call(this, `#${t}`);
				}
			}
		}), g;
		function y(t, s, l) {
			if (s !== void 0 && !c(t, s)) throw x(l);
		}
		function x(t) {
			return /* @__PURE__ */ Error(`reference "${t}" resolves to more than one schema`);
		}
	}
	t.getSchemaRefs = x;
})), require_validate$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getData = t.KeywordCxt = t.validateFunctionCode = void 0;
	var s = require_boolSchema$1(), c = require_dataType$1(), l = require_applicability$1(), u = require_dataType$1(), d = require_defaults$1(), f = require_keyword$1(), p = require_subschema$1(), m = require_codegen$1(), h = require_names$1(), g = require_resolve$1(), _ = require_util$2(), v = require_errors$2();
	function y(t) {
		if (O(t) && (A(t), D(t))) {
			C(t);
			return;
		}
		b(t, () => (0, s.topBoolOrEmptySchema)(t));
	}
	t.validateFunctionCode = y;
	function b({ gen: t, validateName: s, schema: c, schemaEnv: l, opts: u }, d) {
		u.code.es5 ? t.func(s, (0, m._)`${h.default.data}, ${h.default.valCxt}`, l.$async, () => {
			t.code((0, m._)`"use strict"; ${T(c, u)}`), S(t, u), t.code(d);
		}) : t.func(s, (0, m._)`${h.default.data}, ${x(u)}`, l.$async, () => t.code(T(c, u)).code(d));
	}
	function x(t) {
		return (0, m._)`{${h.default.instancePath}="", ${h.default.parentData}, ${h.default.parentDataProperty}, ${h.default.rootData}=${h.default.data}${t.dynamicRef ? (0, m._)`, ${h.default.dynamicAnchors}={}` : m.nil}}={}`;
	}
	function S(t, s) {
		t.if(h.default.valCxt, () => {
			t.var(h.default.instancePath, (0, m._)`${h.default.valCxt}.${h.default.instancePath}`), t.var(h.default.parentData, (0, m._)`${h.default.valCxt}.${h.default.parentData}`), t.var(h.default.parentDataProperty, (0, m._)`${h.default.valCxt}.${h.default.parentDataProperty}`), t.var(h.default.rootData, (0, m._)`${h.default.valCxt}.${h.default.rootData}`), s.dynamicRef && t.var(h.default.dynamicAnchors, (0, m._)`${h.default.valCxt}.${h.default.dynamicAnchors}`);
		}, () => {
			t.var(h.default.instancePath, (0, m._)`""`), t.var(h.default.parentData, (0, m._)`undefined`), t.var(h.default.parentDataProperty, (0, m._)`undefined`), t.var(h.default.rootData, h.default.data), s.dynamicRef && t.var(h.default.dynamicAnchors, (0, m._)`{}`);
		});
	}
	function C(t) {
		let { schema: s, opts: c, gen: l } = t;
		b(t, () => {
			c.$comment && s.$comment && I(t), N(t), l.let(h.default.vErrors, null), l.let(h.default.errors, 0), c.unevaluated && w(t), j(t), L(t);
		});
	}
	function w(t) {
		let { gen: s, validateName: c } = t;
		t.evaluated = s.const("evaluated", (0, m._)`${c}.evaluated`), s.if((0, m._)`${t.evaluated}.dynamicProps`, () => s.assign((0, m._)`${t.evaluated}.props`, (0, m._)`undefined`)), s.if((0, m._)`${t.evaluated}.dynamicItems`, () => s.assign((0, m._)`${t.evaluated}.items`, (0, m._)`undefined`));
	}
	function T(t, s) {
		let c = typeof t == "object" && t[s.schemaId];
		return c && (s.code.source || s.code.process) ? (0, m._)`/*# sourceURL=${c} */` : m.nil;
	}
	function E(t, c) {
		if (O(t) && (A(t), D(t))) {
			k(t, c);
			return;
		}
		(0, s.boolOrEmptySchema)(t, c);
	}
	function D({ schema: t, self: s }) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (s.RULES.all[c]) return !0;
		return !1;
	}
	function O(t) {
		return typeof t.schema != "boolean";
	}
	function k(t, s) {
		let { schema: c, gen: l, opts: u } = t;
		u.$comment && c.$comment && I(t), P(t), F(t);
		let d = l.const("_errs", h.default.errors);
		j(t, d), l.var(s, (0, m._)`${d} === ${h.default.errors}`);
	}
	function A(t) {
		(0, _.checkUnknownRules)(t), M(t);
	}
	function j(t, s) {
		if (t.opts.jtd) return z(t, [], !1, s);
		let l = (0, c.getSchemaTypes)(t.schema);
		z(t, l, !(0, c.coerceAndCheckDataType)(t, l), s);
	}
	function M(t) {
		let { schema: s, errSchemaPath: c, opts: l, self: u } = t;
		s.$ref && l.ignoreKeywordsWithRef && (0, _.schemaHasRulesButRef)(s, u.RULES) && u.logger.warn(`$ref: keywords ignored in schema at path "${c}"`);
	}
	function N(t) {
		let { schema: s, opts: c } = t;
		s.default !== void 0 && c.useDefaults && c.strictSchema && (0, _.checkStrictMode)(t, "default is ignored in the schema root");
	}
	function P(t) {
		let s = t.schema[t.opts.schemaId];
		s && (t.baseId = (0, g.resolveUrl)(t.opts.uriResolver, t.baseId, s));
	}
	function F(t) {
		if (t.schema.$async && !t.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function I({ gen: t, schemaEnv: s, schema: c, errSchemaPath: l, opts: u }) {
		let d = c.$comment;
		if (u.$comment === !0) t.code((0, m._)`${h.default.self}.logger.log(${d})`);
		else if (typeof u.$comment == "function") {
			let c = (0, m.str)`${l}/$comment`, u = t.scopeValue("root", { ref: s.root });
			t.code((0, m._)`${h.default.self}.opts.$comment(${d}, ${c}, ${u}.schema)`);
		}
	}
	function L(t) {
		let { gen: s, schemaEnv: c, validateName: l, ValidationError: u, opts: d } = t;
		c.$async ? s.if((0, m._)`${h.default.errors} === 0`, () => s.return(h.default.data), () => s.throw((0, m._)`new ${u}(${h.default.vErrors})`)) : (s.assign((0, m._)`${l}.errors`, h.default.vErrors), d.unevaluated && R(t), s.return((0, m._)`${h.default.errors} === 0`));
	}
	function R({ gen: t, evaluated: s, props: c, items: l }) {
		c instanceof m.Name && t.assign((0, m._)`${s}.props`, c), l instanceof m.Name && t.assign((0, m._)`${s}.items`, l);
	}
	function z(t, s, c, d) {
		let { gen: f, schema: p, data: g, allErrors: v, opts: y, self: b } = t, { RULES: x } = b;
		if (p.$ref && (y.ignoreKeywordsWithRef || !(0, _.schemaHasRulesButRef)(p, x))) {
			f.block(() => X(t, "$ref", x.all.$ref.definition));
			return;
		}
		y.jtd || V(t, s), f.block(() => {
			for (let t of x.rules) S(t);
			S(x.post);
		});
		function S(_) {
			(0, l.shouldUseGroup)(p, _) && (_.type ? (f.if((0, u.checkDataType)(_.type, g, y.strictNumbers)), B(t, _), s.length === 1 && s[0] === _.type && c && (f.else(), (0, u.reportTypeError)(t)), f.endIf()) : B(t, _), v || f.if((0, m._)`${h.default.errors} === ${d || 0}`));
		}
	}
	function B(t, s) {
		let { gen: c, schema: u, opts: { useDefaults: f } } = t;
		f && (0, d.assignDefaults)(t, s.type), c.block(() => {
			for (let c of s.rules) (0, l.shouldUseRule)(u, c) && X(t, c.keyword, c.definition, s.type);
		});
	}
	function V(t, s) {
		t.schemaEnv.meta || !t.opts.strictTypes || (H(t, s), t.opts.allowUnionTypes || U(t, s), W(t, t.dataTypes));
	}
	function H(t, s) {
		if (s.length) {
			if (!t.dataTypes.length) {
				t.dataTypes = s;
				return;
			}
			s.forEach((s) => {
				K(t.dataTypes, s) || J(t, `type "${s}" not allowed by context "${t.dataTypes.join(",")}"`);
			}), q(t, s);
		}
	}
	function U(t, s) {
		s.length > 1 && !(s.length === 2 && s.includes("null")) && J(t, "use allowUnionTypes to allow union type keyword");
	}
	function W(t, s) {
		let c = t.self.RULES.all;
		for (let u in c) {
			let d = c[u];
			if (typeof d == "object" && (0, l.shouldUseRule)(t.schema, d)) {
				let { type: c } = d.definition;
				c.length && !c.some((t) => G(s, t)) && J(t, `missing type "${c.join(",")}" for keyword "${u}"`);
			}
		}
	}
	function G(t, s) {
		return t.includes(s) || s === "number" && t.includes("integer");
	}
	function K(t, s) {
		return t.includes(s) || s === "integer" && t.includes("number");
	}
	function q(t, s) {
		let c = [];
		for (let l of t.dataTypes) K(s, l) ? c.push(l) : s.includes("integer") && l === "number" && c.push("integer");
		t.dataTypes = c;
	}
	function J(t, s) {
		let c = t.schemaEnv.baseId + t.errSchemaPath;
		s += ` at "${c}" (strictTypes)`, (0, _.checkStrictMode)(t, s, t.opts.strictTypes);
	}
	var Y = class {
		constructor(t, s, c) {
			if ((0, f.validateKeywordUsage)(t, s, c), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = c, this.data = t.data, this.schema = t.schema[c], this.$data = s.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _.schemaRefOrVal)(t, this.schema, c, this.$data), this.schemaType = s.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = s, this.$data) this.schemaCode = t.gen.const("vSchema", $(this.$data, t));
			else if (this.schemaCode = this.schemaValue, !(0, f.validSchemaType)(this.schema, s.schemaType, s.allowUndefined)) throw Error(`${c} value must be ${JSON.stringify(s.schemaType)}`);
			("code" in s ? s.trackErrors : s.errors !== !1) && (this.errsCount = t.gen.const("_errs", h.default.errors));
		}
		result(t, s, c) {
			this.failResult((0, m.not)(t), s, c);
		}
		failResult(t, s, c) {
			this.gen.if(t), c ? c() : this.error(), s ? (this.gen.else(), s(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(t, s) {
			this.failResult((0, m.not)(t), void 0, s);
		}
		fail(t) {
			if (t === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(t) {
			if (!this.$data) return this.fail(t);
			let { schemaCode: s } = this;
			this.fail((0, m._)`${s} !== undefined && (${(0, m.or)(this.invalid$data(), t)})`);
		}
		error(t, s, c) {
			if (s) {
				this.setParams(s), this._error(t, c), this.setParams({});
				return;
			}
			this._error(t, c);
		}
		_error(t, s) {
			(t ? v.reportExtraError : v.reportError)(this, this.def.error, s);
		}
		$dataError() {
			(0, v.reportError)(this, this.def.$dataError || v.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, v.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(t) {
			this.allErrors || this.gen.if(t);
		}
		setParams(t, s) {
			s ? Object.assign(this.params, t) : this.params = t;
		}
		block$data(t, s, c = m.nil) {
			this.gen.block(() => {
				this.check$data(t, c), s();
			});
		}
		check$data(t = m.nil, s = m.nil) {
			if (!this.$data) return;
			let { gen: c, schemaCode: l, schemaType: u, def: d } = this;
			c.if((0, m.or)((0, m._)`${l} === undefined`, s)), t !== m.nil && c.assign(t, !0), (u.length || d.validateSchema) && (c.elseIf(this.invalid$data()), this.$dataError(), t !== m.nil && c.assign(t, !1)), c.else();
		}
		invalid$data() {
			let { gen: t, schemaCode: s, schemaType: c, def: l, it: d } = this;
			return (0, m.or)(f(), p());
			function f() {
				if (c.length) {
					/* istanbul ignore if */
					if (!(s instanceof m.Name)) throw Error("ajv implementation error");
					let t = Array.isArray(c) ? c : [c];
					return (0, m._)`${(0, u.checkDataTypes)(t, s, d.opts.strictNumbers, u.DataType.Wrong)}`;
				}
				return m.nil;
			}
			function p() {
				if (l.validateSchema) {
					let c = t.scopeValue("validate$data", { ref: l.validateSchema });
					return (0, m._)`!${c}(${s})`;
				}
				return m.nil;
			}
		}
		subschema(t, s) {
			let c = (0, p.getSubschema)(this.it, t);
			(0, p.extendSubschemaData)(c, this.it, t), (0, p.extendSubschemaMode)(c, t);
			let l = {
				...this.it,
				...c,
				items: void 0,
				props: void 0
			};
			return E(l, s), l;
		}
		mergeEvaluated(t, s) {
			let { it: c, gen: l } = this;
			c.opts.unevaluated && (c.props !== !0 && t.props !== void 0 && (c.props = _.mergeEvaluated.props(l, t.props, c.props, s)), c.items !== !0 && t.items !== void 0 && (c.items = _.mergeEvaluated.items(l, t.items, c.items, s)));
		}
		mergeValidEvaluated(t, s) {
			let { it: c, gen: l } = this;
			if (c.opts.unevaluated && (c.props !== !0 || c.items !== !0)) return l.if(s, () => this.mergeEvaluated(t, m.Name)), !0;
		}
	};
	t.KeywordCxt = Y;
	function X(t, s, c, l) {
		let u = new Y(t, c, s);
		"code" in c ? c.code(u, l) : u.$data && c.validate ? (0, f.funcKeywordCode)(u, c) : "macro" in c ? (0, f.macroKeywordCode)(u, c) : (c.compile || c.validate) && (0, f.funcKeywordCode)(u, c);
	}
	var Z = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function $(t, { dataLevel: s, dataNames: c, dataPathArr: l }) {
		let u, d;
		if (t === "") return h.default.rootData;
		if (t[0] === "/") {
			if (!Z.test(t)) throw Error(`Invalid JSON-pointer: ${t}`);
			u = t, d = h.default.rootData;
		} else {
			let f = Q.exec(t);
			if (!f) throw Error(`Invalid JSON-pointer: ${t}`);
			let p = +f[1];
			if (u = f[2], u === "#") {
				if (p >= s) throw Error(g("property/index", p));
				return l[s - p];
			}
			if (p > s) throw Error(g("data", p));
			if (d = c[s - p], !u) return d;
		}
		let f = d, p = u.split("/");
		for (let t of p) t && (d = (0, m._)`${d}${(0, m.getProperty)((0, _.unescapeJsonPointer)(t))}`, f = (0, m._)`${f} && ${d}`);
		return f;
		function g(t, c) {
			return `Cannot access ${t} ${c} levels up, current level is ${s}`;
		}
	}
	t.getData = $;
})), require_validation_error$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = class extends Error {
		constructor(t) {
			super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_resolve$1();
	t.default = class extends Error {
		constructor(t, c, l, u) {
			super(u || `can't resolve reference ${l} from id ${c}`), this.missingRef = (0, s.resolveUrl)(t, c, l), this.missingSchema = (0, s.normalizeId)((0, s.getFullPath)(t, this.missingRef));
		}
	};
})), require_compile$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveSchema = t.getCompilingSchema = t.resolveRef = t.compileSchema = t.SchemaEnv = void 0;
	var s = require_codegen$1(), c = require_validation_error$1(), l = require_names$1(), u = require_resolve$1(), d = require_util$2(), f = require_validate$1(), p = class {
		constructor(t) {
			this.refs = {}, this.dynamicAnchors = {};
			let s;
			typeof t.schema == "object" && (s = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = t.baseId ?? (0, u.normalizeId)(s?.[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = s?.$async, this.refs = {};
		}
	};
	t.SchemaEnv = p;
	function m(t) {
		let d = _.call(this, t);
		if (d) return d;
		let p = (0, u.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: m, lines: h } = this.opts.code, { ownProperties: g } = this.opts, v = new s.CodeGen(this.scope, {
			es5: m,
			lines: h,
			ownProperties: g
		}), y;
		t.$async && (y = v.scopeValue("Error", {
			ref: c.default,
			code: (0, s._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let b = v.scopeName("validate");
		t.validateName = b;
		let x = {
			gen: v,
			allErrors: this.opts.allErrors,
			data: l.default.data,
			parentData: l.default.parentData,
			parentDataProperty: l.default.parentDataProperty,
			dataNames: [l.default.data],
			dataPathArr: [s.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: v.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: t.schema,
				code: (0, s.stringify)(t.schema)
			} : { ref: t.schema }),
			validateName: b,
			ValidationError: y,
			schema: t.schema,
			schemaEnv: t,
			rootId: p,
			baseId: t.baseId || p,
			schemaPath: s.nil,
			errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, s._)`""`,
			opts: this.opts,
			self: this
		}, S;
		try {
			this._compilations.add(t), (0, f.validateFunctionCode)(x), v.optimize(this.opts.code.optimize);
			let c = v.toString();
			S = `${v.scopeRefs(l.default.scope)}return ${c}`, this.opts.code.process && (S = this.opts.code.process(S, t));
			let u = Function(`${l.default.self}`, `${l.default.scope}`, S)(this, this.scope.get());
			if (this.scope.value(b, { ref: u }), u.errors = null, u.schema = t.schema, u.schemaEnv = t, t.$async && (u.$async = !0), this.opts.code.source === !0 && (u.source = {
				validateName: b,
				validateCode: c,
				scopeValues: v._values
			}), this.opts.unevaluated) {
				let { props: t, items: c } = x;
				u.evaluated = {
					props: t instanceof s.Name ? void 0 : t,
					items: c instanceof s.Name ? void 0 : c,
					dynamicProps: t instanceof s.Name,
					dynamicItems: c instanceof s.Name
				}, u.source && (u.source.evaluated = (0, s.stringify)(u.evaluated));
			}
			return t.validate = u, t;
		} catch (s) {
			throw delete t.validate, delete t.validateName, S && this.logger.error("Error compiling schema, function code:", S), s;
		} finally {
			this._compilations.delete(t);
		}
	}
	t.compileSchema = m;
	function h(t, s, c) {
		c = (0, u.resolveUrl)(this.opts.uriResolver, s, c);
		let l = t.refs[c];
		if (l) return l;
		let d = y.call(this, t, c);
		if (d === void 0) {
			let l = t.localRefs?.[c], { schemaId: u } = this.opts;
			l && (d = new p({
				schema: l,
				schemaId: u,
				root: t,
				baseId: s
			}));
		}
		if (d !== void 0) return t.refs[c] = g.call(this, d);
	}
	t.resolveRef = h;
	function g(t) {
		return (0, u.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : m.call(this, t);
	}
	function _(t) {
		for (let s of this._compilations) if (v(s, t)) return s;
	}
	t.getCompilingSchema = _;
	function v(t, s) {
		return t.schema === s.schema && t.root === s.root && t.baseId === s.baseId;
	}
	function y(t, s) {
		let c;
		for (; typeof (c = this.refs[s]) == "string";) s = c;
		return c || this.schemas[s] || b.call(this, t, s);
	}
	function b(t, s) {
		let c = this.opts.uriResolver.parse(s), l = (0, u._getFullPath)(this.opts.uriResolver, c), d = (0, u.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
		if (Object.keys(t.schema).length > 0 && l === d) return S.call(this, c, t);
		let f = (0, u.normalizeId)(l), h = this.refs[f] || this.schemas[f];
		if (typeof h == "string") {
			let s = b.call(this, t, h);
			return typeof s?.schema == "object" ? S.call(this, c, s) : void 0;
		}
		if (typeof h?.schema == "object") {
			if (h.validate || m.call(this, h), f === (0, u.normalizeId)(s)) {
				let { schema: s } = h, { schemaId: c } = this.opts, l = s[c];
				return l && (d = (0, u.resolveUrl)(this.opts.uriResolver, d, l)), new p({
					schema: s,
					schemaId: c,
					root: t,
					baseId: d
				});
			}
			return S.call(this, c, h);
		}
	}
	t.resolveSchema = b;
	var x = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function S(t, { baseId: s, schema: c, root: l }) {
		if (t.fragment?.[0] !== "/") return;
		for (let l of t.fragment.slice(1).split("/")) {
			if (typeof c == "boolean") return;
			let t = c[(0, d.unescapeFragment)(l)];
			if (t === void 0) return;
			c = t;
			let f = typeof c == "object" && c[this.opts.schemaId];
			!x.has(l) && f && (s = (0, u.resolveUrl)(this.opts.uriResolver, s, f));
		}
		let f;
		if (typeof c != "boolean" && c.$ref && !(0, d.schemaHasRulesButRef)(c, this.RULES)) {
			let t = (0, u.resolveUrl)(this.opts.uriResolver, s, c.$ref);
			f = b.call(this, l, t);
		}
		let { schemaId: m } = this.opts;
		if (f ||= new p({
			schema: c,
			schemaId: m,
			root: l,
			baseId: s
		}), f.schema !== f.root.schema) return f;
	}
})), data_exports$1 = /* @__PURE__ */ __export({
	$id: () => $id$10,
	additionalProperties: () => !1,
	default: () => data_default$1,
	description: () => description$1,
	properties: () => properties$10,
	required: () => required$1,
	type: () => type$10
}, 1), $id$10, description$1, type$10, required$1, properties$10, data_default$1, init_data$1 = __esmMin((() => {
	$id$10 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description$1 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$10 = "object", required$1 = ["$data"], properties$10 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default$1 = {
		$id: $id$10,
		description: description$1,
		type: type$10,
		required: required$1,
		properties: properties$10,
		additionalProperties: !1
	};
})), require_utils$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), l = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
	function u(t) {
		let s = "", c = 0, l = 0;
		for (l = 0; l < t.length; l++) if (c = t[l].charCodeAt(0), c !== 48) {
			if (!(c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102)) return "";
			s += t[l];
			break;
		}
		for (l += 1; l < t.length; l++) {
			if (c = t[l].charCodeAt(0), !(c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102)) return "";
			s += t[l];
		}
		return s;
	}
	var d = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
	function f(t) {
		return t.length = 0, !0;
	}
	function p(t, s, c) {
		if (t.length) {
			let l = u(t);
			if (l !== "") s.push(l);
			else return c.error = !0, !1;
			t.length = 0;
		}
		return !0;
	}
	function m(t) {
		let s = 0, c = {
			error: !1,
			address: "",
			zone: ""
		}, l = [], d = [], m = !1, h = !1, g = p;
		for (let u = 0; u < t.length; u++) {
			let p = t[u];
			if (!(p === "[" || p === "]")) if (p === ":") {
				if (m === !0 && (h = !0), !g(d, l, c)) break;
				if (++s > 7) {
					c.error = !0;
					break;
				}
				u > 0 && t[u - 1] === ":" && (m = !0), l.push(":");
				continue;
			} else if (p === "%") {
				if (!g(d, l, c)) break;
				g = f;
			} else {
				d.push(p);
				continue;
			}
		}
		return d.length && (g === f ? c.zone = d.join("") : h ? l.push(d.join("")) : l.push(u(d))), c.address = l.join(""), c;
	}
	function h(t) {
		if (g(t, ":") < 2) return {
			host: t,
			isIPV6: !1
		};
		let s = m(t);
		if (s.error) return {
			host: t,
			isIPV6: !1
		};
		{
			let t = s.address, c = s.address;
			return s.zone && (t += "%" + s.zone, c += "%25" + s.zone), {
				host: t,
				isIPV6: !0,
				escapedHost: c
			};
		}
	}
	function g(t, s) {
		let c = 0;
		for (let l = 0; l < t.length; l++) t[l] === s && c++;
		return c;
	}
	function _(t) {
		let s = t, c = [], l = -1, u = 0;
		for (; u = s.length;) {
			if (u === 1) {
				if (s === ".") break;
				if (s === "/") {
					c.push("/");
					break;
				} else {
					c.push(s);
					break;
				}
			} else if (u === 2) {
				if (s[0] === ".") {
					if (s[1] === ".") break;
					if (s[1] === "/") {
						s = s.slice(2);
						continue;
					}
				} else if (s[0] === "/" && (s[1] === "." || s[1] === "/")) {
					c.push("/");
					break;
				}
			} else if (u === 3 && s === "/..") {
				c.length !== 0 && c.pop(), c.push("/");
				break;
			}
			if (s[0] === ".") {
				if (s[1] === ".") {
					if (s[2] === "/") {
						s = s.slice(3);
						continue;
					}
				} else if (s[1] === "/") {
					s = s.slice(2);
					continue;
				}
			} else if (s[0] === "/" && s[1] === ".") {
				if (s[2] === "/") {
					s = s.slice(2);
					continue;
				} else if (s[2] === "." && s[3] === "/") {
					s = s.slice(3), c.length !== 0 && c.pop();
					continue;
				}
			}
			if ((l = s.indexOf("/", 1)) === -1) {
				c.push(s);
				break;
			} else c.push(s.slice(0, l)), s = s.slice(l);
		}
		return c.join("");
	}
	function v(t, s) {
		let c = s === !0 ? unescape : escape;
		return t.scheme !== void 0 && (t.scheme = c(t.scheme)), t.userinfo !== void 0 && (t.userinfo = c(t.userinfo)), t.host !== void 0 && (t.host = c(t.host)), t.path !== void 0 && (t.path = c(t.path)), t.query !== void 0 && (t.query = c(t.query)), t.fragment !== void 0 && (t.fragment = c(t.fragment)), t;
	}
	function y(t) {
		let s = [];
		if (t.userinfo !== void 0 && (s.push(t.userinfo), s.push("@")), t.host !== void 0) {
			let c = unescape(t.host);
			if (!l(c)) {
				let s = h(c);
				c = s.isIPV6 === !0 ? `[${s.escapedHost}]` : t.host;
			}
			s.push(c);
		}
		return (typeof t.port == "number" || typeof t.port == "string") && (s.push(":"), s.push(String(t.port))), s.length ? s.join("") : void 0;
	}
	s.exports = {
		nonSimpleDomain: d,
		recomposeAuthority: y,
		normalizeComponentEncoding: v,
		removeDotSegments: _,
		isIPv4: l,
		isUUID: c,
		normalizeIPv6: h,
		stringArrayToHexStripped: u
	};
})), require_schemes = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { isUUID: c } = require_utils$1(), l = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu, u = [
		"http",
		"https",
		"ws",
		"wss",
		"urn",
		"urn:uuid"
	];
	function d(t) {
		return u.indexOf(t) !== -1;
	}
	function f(t) {
		return t.secure === !0 ? !0 : t.secure === !1 ? !1 : t.scheme ? t.scheme.length === 3 && (t.scheme[0] === "w" || t.scheme[0] === "W") && (t.scheme[1] === "s" || t.scheme[1] === "S") && (t.scheme[2] === "s" || t.scheme[2] === "S") : !1;
	}
	function p(t) {
		return t.host || (t.error = t.error || "HTTP URIs must have a host."), t;
	}
	function m(t) {
		let s = String(t.scheme).toLowerCase() === "https";
		return (t.port === (s ? 443 : 80) || t.port === "") && (t.port = void 0), t.path ||= "/", t;
	}
	function h(t) {
		return t.secure = f(t), t.resourceName = (t.path || "/") + (t.query ? "?" + t.query : ""), t.path = void 0, t.query = void 0, t;
	}
	function g(t) {
		if ((t.port === (f(t) ? 443 : 80) || t.port === "") && (t.port = void 0), typeof t.secure == "boolean" && (t.scheme = t.secure ? "wss" : "ws", t.secure = void 0), t.resourceName) {
			let [s, c] = t.resourceName.split("?");
			t.path = s && s !== "/" ? s : void 0, t.query = c, t.resourceName = void 0;
		}
		return t.fragment = void 0, t;
	}
	function _(t, s) {
		if (!t.path) return t.error = "URN can not be parsed", t;
		let c = t.path.match(l);
		if (c) {
			let l = s.scheme || t.scheme || "urn";
			t.nid = c[1].toLowerCase(), t.nss = c[2];
			let u = O(`${l}:${s.nid || t.nid}`);
			t.path = void 0, u && (t = u.parse(t, s));
		} else t.error = t.error || "URN can not be parsed.";
		return t;
	}
	function v(t, s) {
		if (t.nid === void 0) throw Error("URN without nid cannot be serialized");
		let c = s.scheme || t.scheme || "urn", l = t.nid.toLowerCase(), u = O(`${c}:${s.nid || l}`);
		u && (t = u.serialize(t, s));
		let d = t, f = t.nss;
		return d.path = `${l || s.nid}:${f}`, s.skipEscape = !0, d;
	}
	function y(t, s) {
		let l = t;
		return l.uuid = l.nss, l.nss = void 0, !s.tolerant && (!l.uuid || !c(l.uuid)) && (l.error = l.error || "UUID is not valid."), l;
	}
	function b(t) {
		let s = t;
		return s.nss = (t.uuid || "").toLowerCase(), s;
	}
	var x = {
		scheme: "http",
		domainHost: !0,
		parse: p,
		serialize: m
	}, S = {
		scheme: "https",
		domainHost: x.domainHost,
		parse: p,
		serialize: m
	}, C = {
		scheme: "ws",
		domainHost: !0,
		parse: h,
		serialize: g
	}, w = {
		scheme: "wss",
		domainHost: C.domainHost,
		parse: C.parse,
		serialize: C.serialize
	}, T = {
		scheme: "urn",
		parse: _,
		serialize: v,
		skipNormalize: !0
	}, E = {
		scheme: "urn:uuid",
		parse: y,
		serialize: b,
		skipNormalize: !0
	}, D = {
		http: x,
		https: S,
		ws: C,
		wss: w,
		urn: T,
		"urn:uuid": E
	};
	Object.setPrototypeOf(D, null);
	function O(t) {
		return t && (D[t] || D[t.toLowerCase()]) || void 0;
	}
	s.exports = {
		wsIsSecure: f,
		SCHEMES: D,
		isValidSchemeName: d,
		getSchemeHandler: O
	};
})), require_fast_uri = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { normalizeIPv6: c, removeDotSegments: l, recomposeAuthority: u, normalizeComponentEncoding: d, isIPv4: f, nonSimpleDomain: p } = require_utils$1(), { SCHEMES: m, getSchemeHandler: h } = require_schemes();
	function g(t, s) {
		return typeof t == "string" ? t = b(S(t, s), s) : typeof t == "object" && (t = S(b(t, s), s)), t;
	}
	function _(t, s, c) {
		let l = c ? Object.assign({ scheme: "null" }, c) : { scheme: "null" }, u = v(S(t, l), S(s, l), l, !0);
		return l.skipEscape = !0, b(u, l);
	}
	function v(t, s, c, u) {
		let d = {};
		return u || (t = S(b(t, c), c), s = S(b(s, c), c)), c ||= {}, !c.tolerant && s.scheme ? (d.scheme = s.scheme, d.userinfo = s.userinfo, d.host = s.host, d.port = s.port, d.path = l(s.path || ""), d.query = s.query) : (s.userinfo !== void 0 || s.host !== void 0 || s.port !== void 0 ? (d.userinfo = s.userinfo, d.host = s.host, d.port = s.port, d.path = l(s.path || ""), d.query = s.query) : (s.path ? (s.path[0] === "/" ? d.path = l(s.path) : ((t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0) && !t.path ? d.path = "/" + s.path : t.path ? d.path = t.path.slice(0, t.path.lastIndexOf("/") + 1) + s.path : d.path = s.path, d.path = l(d.path)), d.query = s.query) : (d.path = t.path, s.query === void 0 ? d.query = t.query : d.query = s.query), d.userinfo = t.userinfo, d.host = t.host, d.port = t.port), d.scheme = t.scheme), d.fragment = s.fragment, d;
	}
	function y(t, s, c) {
		return typeof t == "string" ? (t = unescape(t), t = b(d(S(t, c), !0), {
			...c,
			skipEscape: !0
		})) : typeof t == "object" && (t = b(d(t, !0), {
			...c,
			skipEscape: !0
		})), typeof s == "string" ? (s = unescape(s), s = b(d(S(s, c), !0), {
			...c,
			skipEscape: !0
		})) : typeof s == "object" && (s = b(d(s, !0), {
			...c,
			skipEscape: !0
		})), t.toLowerCase() === s.toLowerCase();
	}
	function b(t, s) {
		let c = {
			host: t.host,
			scheme: t.scheme,
			userinfo: t.userinfo,
			port: t.port,
			path: t.path,
			query: t.query,
			nid: t.nid,
			nss: t.nss,
			uuid: t.uuid,
			fragment: t.fragment,
			reference: t.reference,
			resourceName: t.resourceName,
			secure: t.secure,
			error: ""
		}, d = Object.assign({}, s), f = [], p = h(d.scheme || c.scheme);
		p && p.serialize && p.serialize(c, d), c.path !== void 0 && (d.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), d.reference !== "suffix" && c.scheme && f.push(c.scheme, ":");
		let m = u(c);
		if (m !== void 0 && (d.reference !== "suffix" && f.push("//"), f.push(m), c.path && c.path[0] !== "/" && f.push("/")), c.path !== void 0) {
			let t = c.path;
			!d.absolutePath && (!p || !p.absolutePath) && (t = l(t)), m === void 0 && t[0] === "/" && t[1] === "/" && (t = "/%2F" + t.slice(2)), f.push(t);
		}
		return c.query !== void 0 && f.push("?", c.query), c.fragment !== void 0 && f.push("#", c.fragment), f.join("");
	}
	var x = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
	function S(t, s) {
		let l = Object.assign({}, s), u = {
			scheme: void 0,
			userinfo: void 0,
			host: "",
			port: void 0,
			path: "",
			query: void 0,
			fragment: void 0
		}, d = !1;
		l.reference === "suffix" && (t = l.scheme ? l.scheme + ":" + t : "//" + t);
		let m = t.match(x);
		if (m) {
			if (u.scheme = m[1], u.userinfo = m[3], u.host = m[4], u.port = parseInt(m[5], 10), u.path = m[6] || "", u.query = m[7], u.fragment = m[8], isNaN(u.port) && (u.port = m[5]), u.host) if (f(u.host) === !1) {
				let t = c(u.host);
				u.host = t.host.toLowerCase(), d = t.isIPV6;
			} else d = !0;
			u.scheme === void 0 && u.userinfo === void 0 && u.host === void 0 && u.port === void 0 && u.query === void 0 && !u.path ? u.reference = "same-document" : u.scheme === void 0 ? u.reference = "relative" : u.fragment === void 0 ? u.reference = "absolute" : u.reference = "uri", l.reference && l.reference !== "suffix" && l.reference !== u.reference && (u.error = u.error || "URI is not a " + l.reference + " reference.");
			let s = h(l.scheme || u.scheme);
			if (!l.unicodeSupport && (!s || !s.unicodeSupport) && u.host && (l.domainHost || s && s.domainHost) && d === !1 && p(u.host)) try {
				u.host = URL.domainToASCII(u.host.toLowerCase());
			} catch (t) {
				u.error = u.error || "Host's domain name can not be converted to ASCII: " + t;
			}
			(!s || s && !s.skipNormalize) && (t.indexOf("%") !== -1 && (u.scheme !== void 0 && (u.scheme = unescape(u.scheme)), u.host !== void 0 && (u.host = unescape(u.host))), u.path &&= escape(unescape(u.path)), u.fragment &&= encodeURI(decodeURIComponent(u.fragment))), s && s.parse && s.parse(u, l);
		} else u.error = u.error || "URI can not be parsed.";
		return u;
	}
	var C = {
		SCHEMES: m,
		normalize: g,
		resolve: _,
		resolveComponent: v,
		equal: y,
		serialize: b,
		parse: S
	};
	s.exports = C, s.exports.default = C, s.exports.fastUri = C;
})), require_uri$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_fast_uri();
	s.code = "require(\"ajv/dist/runtime/uri\").default", t.default = s;
})), require_core$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
	var s = require_validate$1();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return s.KeywordCxt;
		}
	});
	var c = require_codegen$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return c._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return c.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return c.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return c.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return c.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return c.CodeGen;
		}
	});
	var l = require_validation_error$1(), u = require_ref_error$1(), d = require_rules$1(), f = require_compile$1(), p = require_codegen$1(), m = require_resolve$1(), h = require_dataType$1(), g = require_util$2(), _ = (init_data$1(), __toCommonJS(data_exports$1).default), v = require_uri$1(), y = (t, s) => new RegExp(t, s);
	y.code = "new RegExp";
	var b = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], x = new Set([
		"validate",
		"serialize",
		"parse",
		"wrapper",
		"root",
		"schema",
		"keyword",
		"pattern",
		"formats",
		"validate$data",
		"func",
		"obj",
		"Error"
	]), S = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, C = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, w = 200;
	function T(t) {
		let s = t.strict, c = t.code?.optimize, l = c === !0 || c === void 0 ? 1 : c || 0, u = t.code?.regExp ?? y, d = t.uriResolver ?? v.default;
		return {
			strictSchema: t.strictSchema ?? s ?? !0,
			strictNumbers: t.strictNumbers ?? s ?? !0,
			strictTypes: t.strictTypes ?? s ?? "log",
			strictTuples: t.strictTuples ?? s ?? "log",
			strictRequired: t.strictRequired ?? s ?? !1,
			code: t.code ? {
				...t.code,
				optimize: l,
				regExp: u
			} : {
				optimize: l,
				regExp: u
			},
			loopRequired: t.loopRequired ?? w,
			loopEnum: t.loopEnum ?? w,
			meta: t.meta ?? !0,
			messages: t.messages ?? !0,
			inlineRefs: t.inlineRefs ?? !0,
			schemaId: t.schemaId ?? "$id",
			addUsedSchema: t.addUsedSchema ?? !0,
			validateSchema: t.validateSchema ?? !0,
			validateFormats: t.validateFormats ?? !0,
			unicodeRegExp: t.unicodeRegExp ?? !0,
			int32range: t.int32range ?? !0,
			uriResolver: d
		};
	}
	var E = class {
		constructor(t = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), t = this.opts = {
				...t,
				...T(t)
			};
			let { es5: s, lines: c } = this.opts.code;
			this.scope = new p.ValueScope({
				scope: {},
				prefixes: x,
				es5: s,
				lines: c
			}), this.logger = F(t.logger);
			let l = t.validateFormats;
			t.validateFormats = !1, this.RULES = (0, d.getRules)(), D.call(this, S, t, "NOT SUPPORTED"), D.call(this, C, t, "DEPRECATED", "warn"), this._metaOpts = N.call(this), t.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), t.keywords && j.call(this, t.keywords), typeof t.meta == "object" && this.addMetaSchema(t.meta), k.call(this), t.validateFormats = l;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: t, meta: s, schemaId: c } = this.opts, l = _;
			c === "id" && (l = { ..._ }, l.id = l.$id, delete l.$id), s && t && this.addMetaSchema(l, l[c], !1);
		}
		defaultMeta() {
			let { meta: t, schemaId: s } = this.opts;
			return this.opts.defaultMeta = typeof t == "object" ? t[s] || t : void 0;
		}
		validate(t, s) {
			let c;
			if (typeof t == "string") {
				if (c = this.getSchema(t), !c) throw Error(`no schema with key or ref "${t}"`);
			} else c = this.compile(t);
			let l = c(s);
			return "$async" in c || (this.errors = c.errors), l;
		}
		compile(t, s) {
			let c = this._addSchema(t, s);
			return c.validate || this._compileSchemaEnv(c);
		}
		compileAsync(t, s) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: c } = this.opts;
			return l.call(this, t, s);
			async function l(t, s) {
				await d.call(this, t.$schema);
				let c = this._addSchema(t, s);
				return c.validate || f.call(this, c);
			}
			async function d(t) {
				t && !this.getSchema(t) && await l.call(this, { $ref: t }, !0);
			}
			async function f(t) {
				try {
					return this._compileSchemaEnv(t);
				} catch (s) {
					if (!(s instanceof u.default)) throw s;
					return p.call(this, s), await m.call(this, s.missingSchema), f.call(this, t);
				}
			}
			function p({ missingSchema: t, missingRef: s }) {
				if (this.refs[t]) throw Error(`AnySchema ${t} is loaded but ${s} cannot be resolved`);
			}
			async function m(t) {
				let c = await h.call(this, t);
				this.refs[t] || await d.call(this, c.$schema), this.refs[t] || this.addSchema(c, t, s);
			}
			async function h(t) {
				let s = this._loading[t];
				if (s) return s;
				try {
					return await (this._loading[t] = c(t));
				} finally {
					delete this._loading[t];
				}
			}
		}
		addSchema(t, s, c, l = this.opts.validateSchema) {
			if (Array.isArray(t)) {
				for (let s of t) this.addSchema(s, void 0, c, l);
				return this;
			}
			let u;
			if (typeof t == "object") {
				let { schemaId: s } = this.opts;
				if (u = t[s], u !== void 0 && typeof u != "string") throw Error(`schema ${s} must be string`);
			}
			return s = (0, m.normalizeId)(s || u), this._checkUnique(s), this.schemas[s] = this._addSchema(t, c, s, l, !0), this;
		}
		addMetaSchema(t, s, c = this.opts.validateSchema) {
			return this.addSchema(t, s, !0, c), this;
		}
		validateSchema(t, s) {
			if (typeof t == "boolean") return !0;
			let c;
			if (c = t.$schema, c !== void 0 && typeof c != "string") throw Error("$schema must be a string");
			if (c = c || this.opts.defaultMeta || this.defaultMeta(), !c) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let l = this.validate(c, t);
			if (!l && s) {
				let t = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(t);
				else throw Error(t);
			}
			return l;
		}
		getSchema(t) {
			let s;
			for (; typeof (s = O.call(this, t)) == "string";) t = s;
			if (s === void 0) {
				let { schemaId: c } = this.opts, l = new f.SchemaEnv({
					schema: {},
					schemaId: c
				});
				if (s = f.resolveSchema.call(this, l, t), !s) return;
				this.refs[t] = s;
			}
			return s.validate || this._compileSchemaEnv(s);
		}
		removeSchema(t) {
			if (t instanceof RegExp) return this._removeAllSchemas(this.schemas, t), this._removeAllSchemas(this.refs, t), this;
			switch (typeof t) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let s = O.call(this, t);
					return typeof s == "object" && this._cache.delete(s.schema), delete this.schemas[t], delete this.refs[t], this;
				}
				case "object": {
					let s = t;
					this._cache.delete(s);
					let c = t[this.opts.schemaId];
					return c && (c = (0, m.normalizeId)(c), delete this.schemas[c], delete this.refs[c]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(t) {
			for (let s of t) this.addKeyword(s);
			return this;
		}
		addKeyword(t, s) {
			let c;
			if (typeof t == "string") c = t, typeof s == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), s.keyword = c);
			else if (typeof t == "object" && s === void 0) {
				if (s = t, c = s.keyword, Array.isArray(c) && !c.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (L.call(this, c, s), !s) return (0, g.eachItem)(c, (t) => R.call(this, t)), this;
			B.call(this, s);
			let l = {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			};
			return (0, g.eachItem)(c, l.type.length === 0 ? (t) => R.call(this, t, l) : (t) => l.type.forEach((s) => R.call(this, t, l, s))), this;
		}
		getKeyword(t) {
			let s = this.RULES.all[t];
			return typeof s == "object" ? s.definition : !!s;
		}
		removeKeyword(t) {
			let { RULES: s } = this;
			delete s.keywords[t], delete s.all[t];
			for (let c of s.rules) {
				let s = c.rules.findIndex((s) => s.keyword === t);
				s >= 0 && c.rules.splice(s, 1);
			}
			return this;
		}
		addFormat(t, s) {
			return typeof s == "string" && (s = new RegExp(s)), this.formats[t] = s, this;
		}
		errorsText(t = this.errors, { separator: s = ", ", dataVar: c = "data" } = {}) {
			return !t || t.length === 0 ? "No errors" : t.map((t) => `${c}${t.instancePath} ${t.message}`).reduce((t, c) => t + s + c);
		}
		$dataMetaSchema(t, s) {
			let c = this.RULES.all;
			t = JSON.parse(JSON.stringify(t));
			for (let l of s) {
				let s = l.split("/").slice(1), u = t;
				for (let t of s) u = u[t];
				for (let t in c) {
					let s = c[t];
					if (typeof s != "object") continue;
					let { $data: l } = s.definition, d = u[t];
					l && d && (u[t] = H(d));
				}
			}
			return t;
		}
		_removeAllSchemas(t, s) {
			for (let c in t) {
				let l = t[c];
				(!s || s.test(c)) && (typeof l == "string" ? delete t[c] : l && !l.meta && (this._cache.delete(l.schema), delete t[c]));
			}
		}
		_addSchema(t, s, c, l = this.opts.validateSchema, u = this.opts.addUsedSchema) {
			let d, { schemaId: p } = this.opts;
			if (typeof t == "object") d = t[p];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof t != "boolean") throw Error("schema must be object or boolean");
			let h = this._cache.get(t);
			if (h !== void 0) return h;
			c = (0, m.normalizeId)(d || c);
			let g = m.getSchemaRefs.call(this, t, c);
			return h = new f.SchemaEnv({
				schema: t,
				schemaId: p,
				meta: s,
				baseId: c,
				localRefs: g
			}), this._cache.set(h.schema, h), u && !c.startsWith("#") && (c && this._checkUnique(c), this.refs[c] = h), l && this.validateSchema(t, !0), h;
		}
		_checkUnique(t) {
			if (this.schemas[t] || this.refs[t]) throw Error(`schema with key or id "${t}" already exists`);
		}
		_compileSchemaEnv(t) {
			/* istanbul ignore if */
			if (t.meta ? this._compileMetaSchema(t) : f.compileSchema.call(this, t), !t.validate) throw Error("ajv implementation error");
			return t.validate;
		}
		_compileMetaSchema(t) {
			let s = this.opts;
			this.opts = this._metaOpts;
			try {
				f.compileSchema.call(this, t);
			} finally {
				this.opts = s;
			}
		}
	};
	E.ValidationError = l.default, E.MissingRefError = u.default, t.default = E;
	function D(t, s, c, l = "error") {
		for (let u in t) {
			let d = u;
			d in s && this.logger[l](`${c}: option ${u}. ${t[d]}`);
		}
	}
	function O(t) {
		return t = (0, m.normalizeId)(t), this.schemas[t] || this.refs[t];
	}
	function k() {
		let t = this.opts.schemas;
		if (t) if (Array.isArray(t)) this.addSchema(t);
		else for (let s in t) this.addSchema(t[s], s);
	}
	function A() {
		for (let t in this.opts.formats) {
			let s = this.opts.formats[t];
			s && this.addFormat(t, s);
		}
	}
	function j(t) {
		if (Array.isArray(t)) {
			this.addVocabulary(t);
			return;
		}
		for (let s in this.logger.warn("keywords option as map is deprecated, pass array"), t) {
			let c = t[s];
			c.keyword ||= s, this.addKeyword(c);
		}
	}
	function N() {
		let t = { ...this.opts };
		for (let s of b) delete t[s];
		return t;
	}
	var P = {
		log() {},
		warn() {},
		error() {}
	};
	function F(t) {
		if (t === !1) return P;
		if (t === void 0) return console;
		if (t.log && t.warn && t.error) return t;
		throw Error("logger must implement log, warn and error methods");
	}
	var I = /^[a-z_$][a-z0-9_$:-]*$/i;
	function L(t, s) {
		let { RULES: c } = this;
		if ((0, g.eachItem)(t, (t) => {
			if (c.keywords[t]) throw Error(`Keyword ${t} is already defined`);
			if (!I.test(t)) throw Error(`Keyword ${t} has invalid name`);
		}), s && s.$data && !("code" in s || "validate" in s)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function R(t, s, c) {
		var l;
		let u = s?.post;
		if (c && u) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: d } = this, f = u ? d.post : d.rules.find(({ type: t }) => t === c);
		if (f || (f = {
			type: c,
			rules: []
		}, d.rules.push(f)), d.keywords[t] = !0, !s) return;
		let p = {
			keyword: t,
			definition: {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			}
		};
		s.before ? z.call(this, f, p, s.before) : f.rules.push(p), d.all[t] = p, (l = s.implements) == null || l.forEach((t) => this.addKeyword(t));
	}
	function z(t, s, c) {
		let l = t.rules.findIndex((t) => t.keyword === c);
		l >= 0 ? t.rules.splice(l, 0, s) : (t.rules.push(s), this.logger.warn(`rule ${c} is not defined`));
	}
	function B(t) {
		let { metaSchema: s } = t;
		s !== void 0 && (t.$data && this.opts.$data && (s = H(s)), t.validateSchema = this.compile(s, !0));
	}
	var V = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function H(t) {
		return { anyOf: [t, V] };
	}
})), require_id$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.callRef = t.getValidate = void 0;
	var s = require_ref_error$1(), c = require_code$2(), l = require_codegen$1(), u = require_names$1(), d = require_compile$1(), f = require_util$2(), p = {
		keyword: "$ref",
		schemaType: "string",
		code(t) {
			let { gen: c, schema: u, it: f } = t, { baseId: p, schemaEnv: g, validateName: _, opts: v, self: y } = f, { root: b } = g;
			if ((u === "#" || u === "#/") && p === b.baseId) return S();
			let x = d.resolveRef.call(y, b, p, u);
			if (x === void 0) throw new s.default(f.opts.uriResolver, p, u);
			if (x instanceof d.SchemaEnv) return C(x);
			return w(x);
			function S() {
				if (g === b) return h(t, _, g, g.$async);
				let s = c.scopeValue("root", { ref: b });
				return h(t, (0, l._)`${s}.validate`, b, b.$async);
			}
			function C(s) {
				h(t, m(t, s), s, s.$async);
			}
			function w(s) {
				let d = c.scopeValue("schema", v.code.source === !0 ? {
					ref: s,
					code: (0, l.stringify)(s)
				} : { ref: s }), f = c.name("valid"), p = t.subschema({
					schema: s,
					dataTypes: [],
					schemaPath: l.nil,
					topSchemaRef: d,
					errSchemaPath: u
				}, f);
				t.mergeEvaluated(p), t.ok(f);
			}
		}
	};
	function m(t, s) {
		let { gen: c } = t;
		return s.validate ? c.scopeValue("validate", { ref: s.validate }) : (0, l._)`${c.scopeValue("wrapper", { ref: s })}.validate`;
	}
	t.getValidate = m;
	function h(t, s, d, p) {
		let { gen: m, it: h } = t, { allErrors: g, schemaEnv: _, opts: v } = h, y = v.passContext ? u.default.this : l.nil;
		p ? b() : x();
		function b() {
			if (!_.$async) throw Error("async schema referenced by sync schema");
			let u = m.let("valid");
			m.try(() => {
				m.code((0, l._)`await ${(0, c.callValidateCode)(t, s, y)}`), C(s), g || m.assign(u, !0);
			}, (t) => {
				m.if((0, l._)`!(${t} instanceof ${h.ValidationError})`, () => m.throw(t)), S(t), g || m.assign(u, !1);
			}), t.ok(u);
		}
		function x() {
			t.result((0, c.callValidateCode)(t, s, y), () => C(s), () => S(s));
		}
		function S(t) {
			let s = (0, l._)`${t}.errors`;
			m.assign(u.default.vErrors, (0, l._)`${u.default.vErrors} === null ? ${s} : ${u.default.vErrors}.concat(${s})`), m.assign(u.default.errors, (0, l._)`${u.default.vErrors}.length`);
		}
		function C(t) {
			if (!h.opts.unevaluated) return;
			let s = d?.validate?.evaluated;
			if (h.props !== !0) if (s && !s.dynamicProps) s.props !== void 0 && (h.props = f.mergeEvaluated.props(m, s.props, h.props));
			else {
				let s = m.var("props", (0, l._)`${t}.evaluated.props`);
				h.props = f.mergeEvaluated.props(m, s, h.props, l.Name);
			}
			if (h.items !== !0) if (s && !s.dynamicItems) s.items !== void 0 && (h.items = f.mergeEvaluated.items(m, s.items, h.items));
			else {
				let s = m.var("items", (0, l._)`${t}.evaluated.items`);
				h.items = f.mergeEvaluated.items(m, s, h.items, l.Name);
			}
		}
	}
	t.callRef = h, t.default = p;
})), require_core$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_id$1(), c = require_ref$1();
	t.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		s.default,
		c.default
	];
})), require_limitNumber$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = s.operators, l = {
		maximum: {
			okStr: "<=",
			ok: c.LTE,
			fail: c.GT
		},
		minimum: {
			okStr: ">=",
			ok: c.GTE,
			fail: c.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: c.LT,
			fail: c.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: c.GT,
			fail: c.LTE
		}
	};
	t.default = {
		keyword: Object.keys(l),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: c }) => (0, s.str)`must be ${l[t].okStr} ${c}`,
			params: ({ keyword: t, schemaCode: c }) => (0, s._)`{comparison: ${l[t].okStr}, limit: ${c}}`
		},
		code(t) {
			let { keyword: c, data: u, schemaCode: d } = t;
			t.fail$data((0, s._)`${u} ${l[c].fail} ${d} || isNaN(${u})`);
		}
	};
})), require_multipleOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1();
	t.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, s.str)`must be multiple of ${t}`,
			params: ({ schemaCode: t }) => (0, s._)`{multipleOf: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, schemaCode: u, it: d } = t, f = d.opts.multipleOfPrecision, p = c.let("res"), m = f ? (0, s._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${f}` : (0, s._)`${p} !== parseInt(${p})`;
			t.fail$data((0, s._)`(${u} === 0 || (${p} = ${l}/${u}, ${m}))`);
		}
	};
})), require_ucs2length$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	function s(t) {
		let s = t.length, c = 0, l = 0, u;
		for (; l < s;) c++, u = t.charCodeAt(l++), u >= 55296 && u <= 56319 && l < s && (u = t.charCodeAt(l), (u & 64512) == 56320 && l++);
		return c;
	}
	t.default = s, s.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_ucs2length$1();
	t.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxLength" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} characters`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: u, data: d, schemaCode: f, it: p } = t, m = u === "maxLength" ? s.operators.GT : s.operators.LT, h = p.opts.unicode === !1 ? (0, s._)`${d}.length` : (0, s._)`${(0, c.useFunc)(t.gen, l.default)}(${d})`;
			t.fail$data((0, s._)`${h} ${m} ${f}`);
		}
	};
})), require_pattern$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1();
	t.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, c.str)`must match pattern "${t}"`,
			params: ({ schemaCode: t }) => (0, c._)`{pattern: ${t}}`
		},
		code(t) {
			let { data: l, $data: u, schema: d, schemaCode: f, it: p } = t, m = p.opts.unicodeRegExp ? "u" : "", h = u ? (0, c._)`(new RegExp(${f}, ${m}))` : (0, s.usePattern)(t, d);
			t.fail$data((0, c._)`!${h}.test(${l})`);
		}
	};
})), require_limitProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1();
	t.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxProperties" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} properties`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u } = t, d = c === "maxProperties" ? s.operators.GT : s.operators.LT;
			t.fail$data((0, s._)`Object.keys(${l}).length ${d} ${u}`);
		}
	};
})), require_required$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_util$2();
	t.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: t } }) => (0, c.str)`must have required property '${t}'`,
			params: ({ params: { missingProperty: t } }) => (0, c._)`{missingProperty: ${t}}`
		},
		code(t) {
			let { gen: u, schema: d, schemaCode: f, data: p, $data: m, it: h } = t, { opts: g } = h;
			if (!m && d.length === 0) return;
			let _ = d.length >= g.loopRequired;
			if (h.allErrors ? v() : y(), g.strictRequired) {
				let s = t.parentSchema.properties, { definedProperties: c } = t.it;
				for (let t of d) if (s?.[t] === void 0 && !c.has(t)) {
					let s = `required property "${t}" is not defined at "${h.schemaEnv.baseId + h.errSchemaPath}" (strictRequired)`;
					(0, l.checkStrictMode)(h, s, h.opts.strictRequired);
				}
			}
			function v() {
				if (_ || m) t.block$data(c.nil, b);
				else for (let c of d) (0, s.checkReportMissingProp)(t, c);
			}
			function y() {
				let c = u.let("missing");
				if (_ || m) {
					let s = u.let("valid", !0);
					t.block$data(s, () => x(c, s)), t.ok(s);
				} else u.if((0, s.checkMissingProp)(t, d, c)), (0, s.reportMissingProp)(t, c), u.else();
			}
			function b() {
				u.forOf("prop", f, (c) => {
					t.setParams({ missingProperty: c }), u.if((0, s.noPropertyInData)(u, p, c, g.ownProperties), () => t.error());
				});
			}
			function x(l, d) {
				t.setParams({ missingProperty: l }), u.forOf(l, f, () => {
					u.assign(d, (0, s.propertyInData)(u, p, l, g.ownProperties)), u.if((0, c.not)(d), () => {
						t.error(), u.break();
					});
				}, c.nil);
			}
		}
	};
})), require_limitItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1();
	t.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxItems" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} items`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u } = t, d = c === "maxItems" ? s.operators.GT : s.operators.LT;
			t.fail$data((0, s._)`${l}.length ${d} ${u}`);
		}
	};
})), require_equal$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_fast_deep_equal();
	s.code = "require(\"ajv/dist/runtime/equal\").default", t.default = s;
})), require_uniqueItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dataType$1(), c = require_codegen$1(), l = require_util$2(), u = require_equal$1();
	t.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: t, j: s } }) => (0, c.str)`must NOT have duplicate items (items ## ${s} and ${t} are identical)`,
			params: ({ params: { i: t, j: s } }) => (0, c._)`{i: ${t}, j: ${s}}`
		},
		code(t) {
			let { gen: d, data: f, $data: p, schema: m, parentSchema: h, schemaCode: g, it: _ } = t;
			if (!p && !m) return;
			let v = d.let("valid"), y = h.items ? (0, s.getSchemaTypes)(h.items) : [];
			t.block$data(v, b, (0, c._)`${g} === false`), t.ok(v);
			function b() {
				let s = d.let("i", (0, c._)`${f}.length`), l = d.let("j");
				t.setParams({
					i: s,
					j: l
				}), d.assign(v, !0), d.if((0, c._)`${s} > 1`, () => (x() ? S : C)(s, l));
			}
			function x() {
				return y.length > 0 && !y.some((t) => t === "object" || t === "array");
			}
			function S(l, u) {
				let p = d.name("item"), m = (0, s.checkDataTypes)(y, p, _.opts.strictNumbers, s.DataType.Wrong), h = d.const("indices", (0, c._)`{}`);
				d.for((0, c._)`;${l}--;`, () => {
					d.let(p, (0, c._)`${f}[${l}]`), d.if(m, (0, c._)`continue`), y.length > 1 && d.if((0, c._)`typeof ${p} == "string"`, (0, c._)`${p} += "_"`), d.if((0, c._)`typeof ${h}[${p}] == "number"`, () => {
						d.assign(u, (0, c._)`${h}[${p}]`), t.error(), d.assign(v, !1).break();
					}).code((0, c._)`${h}[${p}] = ${l}`);
				});
			}
			function C(s, p) {
				let m = (0, l.useFunc)(d, u.default), h = d.name("outer");
				d.label(h).for((0, c._)`;${s}--;`, () => d.for((0, c._)`${p} = ${s}; ${p}--;`, () => d.if((0, c._)`${m}(${f}[${s}], ${f}[${p}])`, () => {
					t.error(), d.assign(v, !1).break(h);
				})));
			}
		}
	};
})), require_const$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_equal$1();
	t.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: t }) => (0, s._)`{allowedValue: ${t}}`
		},
		code(t) {
			let { gen: u, data: d, $data: f, schemaCode: p, schema: m } = t;
			f || m && typeof m == "object" ? t.fail$data((0, s._)`!${(0, c.useFunc)(u, l.default)}(${d}, ${p})`) : t.fail((0, s._)`${m} !== ${d}`);
		}
	};
})), require_enum$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_equal$1();
	t.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: t }) => (0, s._)`{allowedValues: ${t}}`
		},
		code(t) {
			let { gen: u, data: d, $data: f, schema: p, schemaCode: m, it: h } = t;
			if (!f && p.length === 0) throw Error("enum must have non-empty array");
			let g = p.length >= h.opts.loopEnum, _, v = () => _ ??= (0, c.useFunc)(u, l.default), y;
			if (g || f) y = u.let("valid"), t.block$data(y, b);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(p)) throw Error("ajv implementation error");
				let t = u.const("vSchema", m);
				y = (0, s.or)(...p.map((s, c) => x(t, c)));
			}
			t.pass(y);
			function b() {
				u.assign(y, !1), u.forOf("v", m, (t) => u.if((0, s._)`${v()}(${d}, ${t})`, () => u.assign(y, !0).break()));
			}
			function x(t, c) {
				let l = p[c];
				return typeof l == "object" && l ? (0, s._)`${v()}(${d}, ${t}[${c}])` : (0, s._)`${d} === ${l}`;
			}
		}
	};
})), require_validation$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_limitNumber$1(), c = require_multipleOf$1(), l = require_limitLength$1(), u = require_pattern$1(), d = require_limitProperties$1(), f = require_required$1(), p = require_limitItems$1(), m = require_uniqueItems$1(), h = require_const$1(), g = require_enum$1();
	t.default = [
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		p.default,
		m.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		h.default,
		g.default
	];
})), require_additionalItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateAdditionalItems = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, s.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { parentSchema: s, it: l } = t, { items: d } = s;
			if (!Array.isArray(d)) {
				(0, c.checkStrictMode)(l, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			u(t, d);
		}
	};
	function u(t, l) {
		let { gen: u, schema: d, data: f, keyword: p, it: m } = t;
		m.items = !0;
		let h = u.const("len", (0, s._)`${f}.length`);
		if (d === !1) t.setParams({ len: l.length }), t.pass((0, s._)`${h} <= ${l.length}`);
		else if (typeof d == "object" && !(0, c.alwaysValidSchema)(m, d)) {
			let c = u.var("valid", (0, s._)`${h} <= ${l.length}`);
			u.if((0, s.not)(c), () => g(c)), t.ok(c);
		}
		function g(d) {
			u.forRange("i", l.length, h, (l) => {
				t.subschema({
					keyword: p,
					dataProp: l,
					dataPropType: c.Type.Num
				}, d), m.allErrors || u.if((0, s.not)(d), () => u.break());
			});
		}
	}
	t.validateAdditionalItems = u, t.default = l;
})), require_items$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateTuple = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2(), u = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(t) {
			let { schema: s, it: u } = t;
			if (Array.isArray(s)) return d(t, "additionalItems", s);
			u.items = !0, !(0, c.alwaysValidSchema)(u, s) && t.ok((0, l.validateArray)(t));
		}
	};
	function d(t, l, u = t.schema) {
		let { gen: d, parentSchema: f, data: p, keyword: m, it: h } = t;
		v(f), h.opts.unevaluated && u.length && h.items !== !0 && (h.items = c.mergeEvaluated.items(d, u.length, h.items));
		let g = d.name("valid"), _ = d.const("len", (0, s._)`${p}.length`);
		u.forEach((l, u) => {
			(0, c.alwaysValidSchema)(h, l) || (d.if((0, s._)`${_} > ${u}`, () => t.subschema({
				keyword: m,
				schemaProp: u,
				dataProp: u
			}, g)), t.ok(g));
		});
		function v(t) {
			let { opts: s, errSchemaPath: d } = h, f = u.length, p = f === t.minItems && (f === t.maxItems || t[l] === !1);
			if (s.strictTuples && !p) {
				let t = `"${m}" is ${f}-tuple, but minItems or maxItems/${l} are not specified or different at path "${d}"`;
				(0, c.checkStrictMode)(h, t, s.strictTuples);
			}
		}
	}
	t.validateTuple = d, t.default = u;
})), require_prefixItems$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_items$1();
	t.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (t) => (0, s.validateTuple)(t, "items")
	};
})), require_items2020$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2(), u = require_additionalItems$1();
	t.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, s.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { schema: s, parentSchema: d, it: f } = t, { prefixItems: p } = d;
			f.items = !0, !(0, c.alwaysValidSchema)(f, s) && (p ? (0, u.validateAdditionalItems)(t, p) : t.ok((0, l.validateArray)(t)));
		}
	};
})), require_contains$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	t.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: t, max: c } }) => c === void 0 ? (0, s.str)`must contain at least ${t} valid item(s)` : (0, s.str)`must contain at least ${t} and no more than ${c} valid item(s)`,
			params: ({ params: { min: t, max: c } }) => c === void 0 ? (0, s._)`{minContains: ${t}}` : (0, s._)`{minContains: ${t}, maxContains: ${c}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = t, m, h, { minContains: g, maxContains: _ } = d;
			p.opts.next ? (m = g === void 0 ? 1 : g, h = _) : m = 1;
			let v = l.const("len", (0, s._)`${f}.length`);
			if (t.setParams({
				min: m,
				max: h
			}), h === void 0 && m === 0) {
				(0, c.checkStrictMode)(p, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (h !== void 0 && m > h) {
				(0, c.checkStrictMode)(p, "\"minContains\" > \"maxContains\" is always invalid"), t.fail();
				return;
			}
			if ((0, c.alwaysValidSchema)(p, u)) {
				let c = (0, s._)`${v} >= ${m}`;
				h !== void 0 && (c = (0, s._)`${c} && ${v} <= ${h}`), t.pass(c);
				return;
			}
			p.items = !0;
			let y = l.name("valid");
			h === void 0 && m === 1 ? x(y, () => l.if(y, () => l.break())) : m === 0 ? (l.let(y, !0), h !== void 0 && l.if((0, s._)`${f}.length > 0`, b)) : (l.let(y, !1), b()), t.result(y, () => t.reset());
			function b() {
				let t = l.name("_valid"), s = l.let("count", 0);
				x(t, () => l.if(t, () => S(s)));
			}
			function x(s, u) {
				l.forRange("i", 0, v, (l) => {
					t.subschema({
						keyword: "contains",
						dataProp: l,
						dataPropType: c.Type.Num,
						compositeRule: !0
					}, s), u();
				});
			}
			function S(t) {
				l.code((0, s._)`${t}++`), h === void 0 ? l.if((0, s._)`${t} >= ${m}`, () => l.assign(y, !0).break()) : (l.if((0, s._)`${t} > ${h}`, () => l.assign(y, !1).break()), m === 1 ? l.assign(y, !0) : l.if((0, s._)`${t} >= ${m}`, () => l.assign(y, !0)));
			}
		}
	};
})), require_dependencies$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2();
	t.error = {
		message: ({ params: { property: t, depsCount: c, deps: l } }) => {
			let u = c === 1 ? "property" : "properties";
			return (0, s.str)`must have ${u} ${l} when property ${t} is present`;
		},
		params: ({ params: { property: t, depsCount: c, deps: l, missingProperty: u } }) => (0, s._)`{property: ${t},
    missingProperty: ${u},
    depsCount: ${c},
    deps: ${l}}`
	};
	var u = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: t.error,
		code(t) {
			let [s, c] = d(t);
			f(t, s), p(t, c);
		}
	};
	function d({ schema: t }) {
		let s = {}, c = {};
		for (let l in t) {
			if (l === "__proto__") continue;
			let u = Array.isArray(t[l]) ? s : c;
			u[l] = t[l];
		}
		return [s, c];
	}
	function f(t, c = t.schema) {
		let { gen: u, data: d, it: f } = t;
		if (Object.keys(c).length === 0) return;
		let p = u.let("missing");
		for (let m in c) {
			let h = c[m];
			if (h.length === 0) continue;
			let g = (0, l.propertyInData)(u, d, m, f.opts.ownProperties);
			t.setParams({
				property: m,
				depsCount: h.length,
				deps: h.join(", ")
			}), f.allErrors ? u.if(g, () => {
				for (let s of h) (0, l.checkReportMissingProp)(t, s);
			}) : (u.if((0, s._)`${g} && (${(0, l.checkMissingProp)(t, h, p)})`), (0, l.reportMissingProp)(t, p), u.else());
		}
	}
	t.validatePropertyDeps = f;
	function p(t, s = t.schema) {
		let { gen: u, data: d, keyword: f, it: p } = t, m = u.name("valid");
		for (let h in s) (0, c.alwaysValidSchema)(p, s[h]) || (u.if((0, l.propertyInData)(u, d, h, p.opts.ownProperties), () => {
			let s = t.subschema({
				keyword: f,
				schemaProp: h
			}, m);
			t.mergeValidEvaluated(s, m);
		}, () => u.var(m, !0)), t.ok(m));
	}
	t.validateSchemaDeps = p, t.default = u;
})), require_propertyNames$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	t.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: t }) => (0, s._)`{propertyName: ${t.propertyName}}`
		},
		code(t) {
			let { gen: l, schema: u, data: d, it: f } = t;
			if ((0, c.alwaysValidSchema)(f, u)) return;
			let p = l.name("valid");
			l.forIn("key", d, (c) => {
				t.setParams({ propertyName: c }), t.subschema({
					keyword: "propertyNames",
					data: c,
					dataTypes: ["string"],
					propertyName: c,
					compositeRule: !0
				}, p), l.if((0, s.not)(p), () => {
					t.error(!0), f.allErrors || l.break();
				});
			}), t.ok(p);
		}
	};
})), require_additionalProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_names$1(), u = require_util$2();
	t.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: t }) => (0, c._)`{additionalProperty: ${t.additionalProperty}}`
		},
		code(t) {
			let { gen: d, schema: f, parentSchema: p, data: m, errsCount: h, it: g } = t;
			/* istanbul ignore if */
			if (!h) throw Error("ajv implementation error");
			let { allErrors: _, opts: v } = g;
			if (g.props = !0, v.removeAdditional !== "all" && (0, u.alwaysValidSchema)(g, f)) return;
			let y = (0, s.allSchemaProperties)(p.properties), b = (0, s.allSchemaProperties)(p.patternProperties);
			x(), t.ok((0, c._)`${h} === ${l.default.errors}`);
			function x() {
				d.forIn("key", m, (t) => {
					!y.length && !b.length ? w(t) : d.if(S(t), () => w(t));
				});
			}
			function S(l) {
				let f;
				if (y.length > 8) {
					let t = (0, u.schemaRefOrVal)(g, p.properties, "properties");
					f = (0, s.isOwnProperty)(d, t, l);
				} else f = y.length ? (0, c.or)(...y.map((t) => (0, c._)`${l} === ${t}`)) : c.nil;
				return b.length && (f = (0, c.or)(f, ...b.map((u) => (0, c._)`${(0, s.usePattern)(t, u)}.test(${l})`))), (0, c.not)(f);
			}
			function C(t) {
				d.code((0, c._)`delete ${m}[${t}]`);
			}
			function w(s) {
				if (v.removeAdditional === "all" || v.removeAdditional && f === !1) {
					C(s);
					return;
				}
				if (f === !1) {
					t.setParams({ additionalProperty: s }), t.error(), _ || d.break();
					return;
				}
				if (typeof f == "object" && !(0, u.alwaysValidSchema)(g, f)) {
					let l = d.name("valid");
					v.removeAdditional === "failing" ? (T(s, l, !1), d.if((0, c.not)(l), () => {
						t.reset(), C(s);
					})) : (T(s, l), _ || d.if((0, c.not)(l), () => d.break()));
				}
			}
			function T(s, c, l) {
				let d = {
					keyword: "additionalProperties",
					dataProp: s,
					dataPropType: u.Type.Str
				};
				l === !1 && Object.assign(d, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), t.subschema(d, c);
			}
		}
	};
})), require_properties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_validate$1(), c = require_code$2(), l = require_util$2(), u = require_additionalProperties$1();
	t.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: d, schema: f, parentSchema: p, data: m, it: h } = t;
			h.opts.removeAdditional === "all" && p.additionalProperties === void 0 && u.default.code(new s.KeywordCxt(h, u.default, "additionalProperties"));
			let g = (0, c.allSchemaProperties)(f);
			for (let t of g) h.definedProperties.add(t);
			h.opts.unevaluated && g.length && h.props !== !0 && (h.props = l.mergeEvaluated.props(d, (0, l.toHash)(g), h.props));
			let _ = g.filter((t) => !(0, l.alwaysValidSchema)(h, f[t]));
			if (_.length === 0) return;
			let v = d.name("valid");
			for (let s of _) y(s) ? b(s) : (d.if((0, c.propertyInData)(d, m, s, h.opts.ownProperties)), b(s), h.allErrors || d.else().var(v, !0), d.endIf()), t.it.definedProperties.add(s), t.ok(v);
			function y(t) {
				return h.opts.useDefaults && !h.compositeRule && f[t].default !== void 0;
			}
			function b(s) {
				t.subschema({
					keyword: "properties",
					schemaProp: s,
					dataProp: s
				}, v);
			}
		}
	};
})), require_patternProperties$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_util$2(), u = require_util$2();
	t.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: d, schema: f, data: p, parentSchema: m, it: h } = t, { opts: g } = h, _ = (0, s.allSchemaProperties)(f), v = _.filter((t) => (0, l.alwaysValidSchema)(h, f[t]));
			if (_.length === 0 || v.length === _.length && (!h.opts.unevaluated || h.props === !0)) return;
			let y = g.strictSchema && !g.allowMatchingProperties && m.properties, b = d.name("valid");
			h.props !== !0 && !(h.props instanceof c.Name) && (h.props = (0, u.evaluatedPropsToName)(d, h.props));
			let { props: x } = h;
			S();
			function S() {
				for (let t of _) y && C(t), h.allErrors ? w(t) : (d.var(b, !0), w(t), d.if(b));
			}
			function C(t) {
				for (let s in y) new RegExp(t).test(s) && (0, l.checkStrictMode)(h, `property ${s} matches pattern ${t} (use allowMatchingProperties)`);
			}
			function w(l) {
				d.forIn("key", p, (f) => {
					d.if((0, c._)`${(0, s.usePattern)(t, l)}.test(${f})`, () => {
						let s = v.includes(l);
						s || t.subschema({
							keyword: "patternProperties",
							schemaProp: l,
							dataProp: f,
							dataPropType: u.Type.Str
						}, b), h.opts.unevaluated && x !== !0 ? d.assign((0, c._)`${x}[${f}]`, !0) : !s && !h.allErrors && d.if((0, c.not)(b), () => d.break());
					});
				});
			}
		}
	};
})), require_not$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$2();
	t.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(t) {
			let { gen: c, schema: l, it: u } = t;
			if ((0, s.alwaysValidSchema)(u, l)) {
				t.fail();
				return;
			}
			let d = c.name("valid");
			t.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, d), t.failResult(d, () => t.reset(), () => t.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code$2().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	t.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: t }) => (0, s._)`{passingSchemas: ${t.passing}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, it: f } = t;
			/* istanbul ignore if */
			if (!Array.isArray(u)) throw Error("ajv implementation error");
			if (f.opts.discriminator && d.discriminator) return;
			let p = u, m = l.let("valid", !1), h = l.let("passing", null), g = l.name("_valid");
			t.setParams({ passing: h }), l.block(_), t.result(m, () => t.reset(), () => t.error(!0));
			function _() {
				p.forEach((u, d) => {
					let p;
					(0, c.alwaysValidSchema)(f, u) ? l.var(g, !0) : p = t.subschema({
						keyword: "oneOf",
						schemaProp: d,
						compositeRule: !0
					}, g), d > 0 && l.if((0, s._)`${g} && ${m}`).assign(m, !1).assign(h, (0, s._)`[${h}, ${d}]`).else(), l.if(g, () => {
						l.assign(m, !0), l.assign(h, d), p && t.mergeEvaluated(p, s.Name);
					});
				});
			}
		}
	};
})), require_allOf$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$2();
	t.default = {
		keyword: "allOf",
		schemaType: "array",
		code(t) {
			let { gen: c, schema: l, it: u } = t;
			/* istanbul ignore if */
			if (!Array.isArray(l)) throw Error("ajv implementation error");
			let d = c.name("valid");
			l.forEach((c, l) => {
				if ((0, s.alwaysValidSchema)(u, c)) return;
				let f = t.subschema({
					keyword: "allOf",
					schemaProp: l
				}, d);
				t.ok(d), t.mergeEvaluated(f);
			});
		}
	};
})), require_if$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: t }) => (0, s.str)`must match "${t.ifClause}" schema`,
			params: ({ params: t }) => (0, s._)`{failingKeyword: ${t.ifClause}}`
		},
		code(t) {
			let { gen: l, parentSchema: d, it: f } = t;
			d.then === void 0 && d.else === void 0 && (0, c.checkStrictMode)(f, "\"if\" without \"then\" and \"else\" is ignored");
			let p = u(f, "then"), m = u(f, "else");
			if (!p && !m) return;
			let h = l.let("valid", !0), g = l.name("_valid");
			if (_(), t.reset(), p && m) {
				let s = l.let("ifClause");
				t.setParams({ ifClause: s }), l.if(g, v("then", s), v("else", s));
			} else p ? l.if(g, v("then")) : l.if((0, s.not)(g), v("else"));
			t.pass(h, () => t.error(!0));
			function _() {
				let s = t.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, g);
				t.mergeEvaluated(s);
			}
			function v(c, u) {
				return () => {
					let d = t.subschema({ keyword: c }, g);
					l.assign(h, g), t.mergeValidEvaluated(d, h), u ? l.assign(u, (0, s._)`${c}`) : t.setParams({ ifClause: c });
				};
			}
		}
	};
	function u(t, s) {
		let l = t.schema[s];
		return l !== void 0 && !(0, c.alwaysValidSchema)(t, l);
	}
	t.default = l;
})), require_thenElse$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$2();
	t.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: t, parentSchema: c, it: l }) {
			c.if === void 0 && (0, s.checkStrictMode)(l, `"${t}" without "if" is ignored`);
		}
	};
})), require_applicator$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_additionalItems$1(), c = require_prefixItems$1(), l = require_items$1(), u = require_items2020$1(), d = require_contains$1(), f = require_dependencies$1(), p = require_propertyNames$1(), m = require_additionalProperties$1(), h = require_properties$1(), g = require_patternProperties$1(), _ = require_not$1(), v = require_anyOf$1(), y = require_oneOf$1(), b = require_allOf$1(), x = require_if$1(), S = require_thenElse$1();
	function C(t = !1) {
		let C = [
			_.default,
			v.default,
			y.default,
			b.default,
			x.default,
			S.default,
			p.default,
			m.default,
			f.default,
			h.default,
			g.default
		];
		return t ? C.push(c.default, u.default) : C.push(s.default, l.default), C.push(d.default), C;
	}
	t.default = C;
})), require_dynamicAnchor = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.dynamicAnchor = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_compile$1(), u = require_ref$1(), d = {
		keyword: "$dynamicAnchor",
		schemaType: "string",
		code: (t) => f(t, t.schema)
	};
	function f(t, l) {
		let { gen: u, it: d } = t;
		d.schemaEnv.root.dynamicAnchors[l] = !0;
		let f = (0, s._)`${c.default.dynamicAnchors}${(0, s.getProperty)(l)}`, m = d.errSchemaPath === "#" ? d.validateName : p(t);
		u.if((0, s._)`!${f}`, () => u.assign(f, m));
	}
	t.dynamicAnchor = f;
	function p(t) {
		let { schemaEnv: s, schema: c, self: d } = t.it, { root: f, baseId: p, localRefs: m, meta: h } = s.root, { schemaId: g } = d.opts, _ = new l.SchemaEnv({
			schema: c,
			schemaId: g,
			root: f,
			baseId: p,
			localRefs: m,
			meta: h
		});
		return l.compileSchema.call(d, _), (0, u.getValidate)(t, _);
	}
	t.default = d;
})), require_dynamicRef = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.dynamicRef = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_ref$1(), u = {
		keyword: "$dynamicRef",
		schemaType: "string",
		code: (t) => d(t, t.schema)
	};
	function d(t, u) {
		let { gen: d, keyword: f, it: p } = t;
		if (u[0] !== "#") throw Error(`"${f}" only supports hash fragment reference`);
		let m = u.slice(1);
		if (p.allErrors) h();
		else {
			let s = d.let("valid", !1);
			h(s), t.ok(s);
		}
		function h(t) {
			if (p.schemaEnv.root.dynamicAnchors[m]) {
				let l = d.let("_v", (0, s._)`${c.default.dynamicAnchors}${(0, s.getProperty)(m)}`);
				d.if(l, g(l, t), g(p.validateName, t));
			} else g(p.validateName, t)();
		}
		function g(s, c) {
			return c ? () => d.block(() => {
				(0, l.callRef)(t, s), d.let(c, !0);
			}) : () => (0, l.callRef)(t, s);
		}
	}
	t.dynamicRef = d, t.default = u;
})), require_recursiveAnchor = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dynamicAnchor(), c = require_util$2();
	t.default = {
		keyword: "$recursiveAnchor",
		schemaType: "boolean",
		code(t) {
			t.schema ? (0, s.dynamicAnchor)(t, "") : (0, c.checkStrictMode)(t.it, "$recursiveAnchor: false is ignored");
		}
	};
})), require_recursiveRef = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dynamicRef();
	t.default = {
		keyword: "$recursiveRef",
		schemaType: "string",
		code: (t) => (0, s.dynamicRef)(t, t.schema)
	};
})), require_dynamic = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dynamicAnchor(), c = require_dynamicRef(), l = require_recursiveAnchor(), u = require_recursiveRef();
	t.default = [
		s.default,
		c.default,
		l.default,
		u.default
	];
})), require_dependentRequired = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dependencies$1();
	t.default = {
		keyword: "dependentRequired",
		type: "object",
		schemaType: "object",
		error: s.error,
		code: (t) => (0, s.validatePropertyDeps)(t)
	};
})), require_dependentSchemas = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dependencies$1();
	t.default = {
		keyword: "dependentSchemas",
		type: "object",
		schemaType: "object",
		code: (t) => (0, s.validateSchemaDeps)(t)
	};
})), require_limitContains = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$2();
	t.default = {
		keyword: ["maxContains", "minContains"],
		type: "array",
		schemaType: "number",
		code({ keyword: t, parentSchema: c, it: l }) {
			c.contains === void 0 && (0, s.checkStrictMode)(l, `"${t}" without "contains" is ignored`);
		}
	};
})), require_next = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dependentRequired(), c = require_dependentSchemas(), l = require_limitContains();
	t.default = [
		s.default,
		c.default,
		l.default
	];
})), require_unevaluatedProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1();
	t.default = {
		keyword: "unevaluatedProperties",
		type: "object",
		schemaType: ["boolean", "object"],
		trackErrors: !0,
		error: {
			message: "must NOT have unevaluated properties",
			params: ({ params: t }) => (0, s._)`{unevaluatedProperty: ${t.unevaluatedProperty}}`
		},
		code(t) {
			let { gen: u, schema: d, data: f, errsCount: p, it: m } = t;
			/* istanbul ignore if */
			if (!p) throw Error("ajv implementation error");
			let { allErrors: h, props: g } = m;
			g instanceof s.Name ? u.if((0, s._)`${g} !== true`, () => u.forIn("key", f, (t) => u.if(v(g, t), () => _(t)))) : g !== !0 && u.forIn("key", f, (t) => g === void 0 ? _(t) : u.if(y(g, t), () => _(t))), m.props = !0, t.ok((0, s._)`${p} === ${l.default.errors}`);
			function _(l) {
				if (d === !1) {
					t.setParams({ unevaluatedProperty: l }), t.error(), h || u.break();
					return;
				}
				if (!(0, c.alwaysValidSchema)(m, d)) {
					let d = u.name("valid");
					t.subschema({
						keyword: "unevaluatedProperties",
						dataProp: l,
						dataPropType: c.Type.Str
					}, d), h || u.if((0, s.not)(d), () => u.break());
				}
			}
			function v(t, c) {
				return (0, s._)`!${t} || !${t}[${c}]`;
			}
			function y(t, c) {
				let l = [];
				for (let u in t) t[u] === !0 && l.push((0, s._)`${c} !== ${u}`);
				return (0, s.and)(...l);
			}
		}
	};
})), require_unevaluatedItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	t.default = {
		keyword: "unevaluatedItems",
		type: "array",
		schemaType: ["boolean", "object"],
		error: {
			message: ({ params: { len: t } }) => (0, s.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { gen: l, schema: u, data: d, it: f } = t, p = f.items || 0;
			if (p === !0) return;
			let m = l.const("len", (0, s._)`${d}.length`);
			if (u === !1) t.setParams({ len: p }), t.fail((0, s._)`${m} > ${p}`);
			else if (typeof u == "object" && !(0, c.alwaysValidSchema)(f, u)) {
				let c = l.var("valid", (0, s._)`${m} <= ${p}`);
				l.if((0, s.not)(c), () => h(c, p)), t.ok(c);
			}
			f.items = !0;
			function h(u, d) {
				l.forRange("i", d, m, (d) => {
					t.subschema({
						keyword: "unevaluatedItems",
						dataProp: d,
						dataPropType: c.Type.Num
					}, u), f.allErrors || l.if((0, s.not)(u), () => l.break());
				});
			}
		}
	};
})), require_unevaluated = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_unevaluatedProperties(), c = require_unevaluatedItems();
	t.default = [s.default, c.default];
})), require_format$3 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1();
	t.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, s.str)`must match format "${t}"`,
			params: ({ schemaCode: t }) => (0, s._)`{format: ${t}}`
		},
		code(t, c) {
			let { gen: l, data: u, $data: d, schema: f, schemaCode: p, it: m } = t, { opts: h, errSchemaPath: g, schemaEnv: _, self: v } = m;
			if (!h.validateFormats) return;
			d ? y() : b();
			function y() {
				let d = l.scopeValue("formats", {
					ref: v.formats,
					code: h.code.formats
				}), f = l.const("fDef", (0, s._)`${d}[${p}]`), m = l.let("fType"), g = l.let("format");
				l.if((0, s._)`typeof ${f} == "object" && !(${f} instanceof RegExp)`, () => l.assign(m, (0, s._)`${f}.type || "string"`).assign(g, (0, s._)`${f}.validate`), () => l.assign(m, (0, s._)`"string"`).assign(g, f)), t.fail$data((0, s.or)(y(), b()));
				function y() {
					return h.strictSchema === !1 ? s.nil : (0, s._)`${p} && !${g}`;
				}
				function b() {
					let t = _.$async ? (0, s._)`(${f}.async ? await ${g}(${u}) : ${g}(${u}))` : (0, s._)`${g}(${u})`, l = (0, s._)`(typeof ${g} == "function" ? ${t} : ${g}.test(${u}))`;
					return (0, s._)`${g} && ${g} !== true && ${m} === ${c} && !${l}`;
				}
			}
			function b() {
				let d = v.formats[f];
				if (!d) {
					b();
					return;
				}
				if (d === !0) return;
				let [p, m, y] = x(d);
				p === c && t.pass(S());
				function b() {
					if (h.strictSchema === !1) {
						v.logger.warn(t());
						return;
					}
					throw Error(t());
					function t() {
						return `unknown format "${f}" ignored in schema at path "${g}"`;
					}
				}
				function x(t) {
					let c = t instanceof RegExp ? (0, s.regexpCode)(t) : h.code.formats ? (0, s._)`${h.code.formats}${(0, s.getProperty)(f)}` : void 0, u = l.scopeValue("formats", {
						key: f,
						ref: t,
						code: c
					});
					return typeof t == "object" && !(t instanceof RegExp) ? [
						t.type || "string",
						t.validate,
						(0, s._)`${u}.validate`
					] : [
						"string",
						t,
						u
					];
				}
				function S() {
					if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
						if (!_.$async) throw Error("async format in sync schema");
						return (0, s._)`await ${y}(${u})`;
					}
					return typeof m == "function" ? (0, s._)`${y}(${u})` : (0, s._)`${y}.test(${u})`;
				}
			}
		}
	};
})), require_format$2 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = [require_format$3().default];
})), require_metadata$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.contentVocabulary = t.metadataVocabulary = void 0, t.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], t.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft2020 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_core$2(), c = require_validation$1(), l = require_applicator$1(), u = require_dynamic(), d = require_next(), f = require_unevaluated(), p = require_format$2(), m = require_metadata$1();
	t.default = [
		u.default,
		s.default,
		c.default,
		(0, l.default)(!0),
		p.default,
		m.metadataVocabulary,
		m.contentVocabulary,
		d.default,
		f.default
	];
})), require_types$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.DiscrError = void 0;
	var s;
	(function(t) {
		t.Tag = "tag", t.Mapping = "mapping";
	})(s || (t.DiscrError = s = {}));
})), require_discriminator$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_types$1(), l = require_compile$1(), u = require_ref_error$1(), d = require_util$2();
	t.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: t, tagName: s } }) => t === c.DiscrError.Tag ? `tag "${s}" must be string` : `value of tag "${s}" must be in oneOf`,
			params: ({ params: { discrError: t, tag: c, tagName: l } }) => (0, s._)`{error: ${t}, tag: ${l}, tagValue: ${c}}`
		},
		code(t) {
			let { gen: f, data: p, schema: m, parentSchema: h, it: g } = t, { oneOf: _ } = h;
			if (!g.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let v = m.propertyName;
			if (typeof v != "string") throw Error("discriminator: requires propertyName");
			if (m.mapping) throw Error("discriminator: mapping is not supported");
			if (!_) throw Error("discriminator: requires oneOf keyword");
			let y = f.let("valid", !1), b = f.const("tag", (0, s._)`${p}${(0, s.getProperty)(v)}`);
			f.if((0, s._)`typeof ${b} == "string"`, () => x(), () => t.error(!1, {
				discrError: c.DiscrError.Tag,
				tag: b,
				tagName: v
			})), t.ok(y);
			function x() {
				let l = C();
				for (let t in f.if(!1), l) f.elseIf((0, s._)`${b} === ${t}`), f.assign(y, S(l[t]));
				f.else(), t.error(!1, {
					discrError: c.DiscrError.Mapping,
					tag: b,
					tagName: v
				}), f.endIf();
			}
			function S(c) {
				let l = f.name("valid"), u = t.subschema({
					keyword: "oneOf",
					schemaProp: c
				}, l);
				return t.mergeEvaluated(u, s.Name), l;
			}
			function C() {
				let t = {}, s = f(h), c = !0;
				for (let t = 0; t < _.length; t++) {
					let m = _[t];
					if (m?.$ref && !(0, d.schemaHasRulesButRef)(m, g.self.RULES)) {
						let t = m.$ref;
						if (m = l.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, t), m instanceof l.SchemaEnv && (m = m.schema), m === void 0) throw new u.default(g.opts.uriResolver, g.baseId, t);
					}
					let h = m?.properties?.[v];
					if (typeof h != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${v}"`);
					c &&= s || f(m), p(h, t);
				}
				if (!c) throw Error(`discriminator: "${v}" must be required`);
				return t;
				function f({ required: t }) {
					return Array.isArray(t) && t.includes(v);
				}
				function p(t, s) {
					if (t.const) m(t.const, s);
					else if (t.enum) for (let c of t.enum) m(c, s);
					else throw Error(`discriminator: "properties/${v}" must have "const" or "enum"`);
				}
				function m(s, c) {
					if (typeof s != "string" || s in t) throw Error(`discriminator: "${v}" values must be unique strings`);
					t[s] = c;
				}
			}
		}
	};
})), schema_exports = /* @__PURE__ */ __export({
	$comment: () => $comment,
	$dynamicAnchor: () => $dynamicAnchor$7,
	$id: () => $id$9,
	$schema: () => $schema$8,
	$vocabulary: () => $vocabulary$7,
	allOf: () => allOf,
	default: () => schema_default,
	properties: () => properties$9,
	title: () => title$8,
	type: () => type$9
}, 1), $schema$8, $id$9, $vocabulary$7, $dynamicAnchor$7, title$8, allOf, type$9, $comment, properties$9, schema_default, init_schema = __esmMin((() => {
	$schema$8 = "https://json-schema.org/draft/2020-12/schema", $id$9 = "https://json-schema.org/draft/2020-12/schema", $vocabulary$7 = {
		"https://json-schema.org/draft/2020-12/vocab/core": !0,
		"https://json-schema.org/draft/2020-12/vocab/applicator": !0,
		"https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
		"https://json-schema.org/draft/2020-12/vocab/validation": !0,
		"https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
		"https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
		"https://json-schema.org/draft/2020-12/vocab/content": !0
	}, $dynamicAnchor$7 = "meta", title$8 = "Core and Validation specifications meta-schema", allOf = [
		{ $ref: "meta/core" },
		{ $ref: "meta/applicator" },
		{ $ref: "meta/unevaluated" },
		{ $ref: "meta/validation" },
		{ $ref: "meta/meta-data" },
		{ $ref: "meta/format-annotation" },
		{ $ref: "meta/content" }
	], type$9 = ["object", "boolean"], $comment = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", properties$9 = {
		definitions: {
			$comment: "\"definitions\" has been replaced by \"$defs\".",
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			deprecated: !0,
			default: {}
		},
		dependencies: {
			$comment: "\"dependencies\" has been split and replaced by \"dependentSchemas\" and \"dependentRequired\" in order to serve their differing semantics.",
			type: "object",
			additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] },
			deprecated: !0,
			default: {}
		},
		$recursiveAnchor: {
			$comment: "\"$recursiveAnchor\" has been replaced by \"$dynamicAnchor\".",
			$ref: "meta/core#/$defs/anchorString",
			deprecated: !0
		},
		$recursiveRef: {
			$comment: "\"$recursiveRef\" has been replaced by \"$dynamicRef\".",
			$ref: "meta/core#/$defs/uriReferenceString",
			deprecated: !0
		}
	}, schema_default = {
		$schema: $schema$8,
		$id: $id$9,
		$vocabulary: $vocabulary$7,
		$dynamicAnchor: $dynamicAnchor$7,
		title: title$8,
		allOf,
		type: type$9,
		$comment,
		properties: properties$9
	};
})), applicator_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$2,
	$dynamicAnchor: () => $dynamicAnchor$6,
	$id: () => $id$8,
	$schema: () => $schema$7,
	$vocabulary: () => $vocabulary$6,
	default: () => applicator_default,
	properties: () => properties$8,
	title: () => title$7,
	type: () => type$8
}, 1), $schema$7, $id$8, $vocabulary$6, $dynamicAnchor$6, title$7, type$8, properties$8, $defs$2, applicator_default, init_applicator = __esmMin((() => {
	$schema$7 = "https://json-schema.org/draft/2020-12/schema", $id$8 = "https://json-schema.org/draft/2020-12/meta/applicator", $vocabulary$6 = { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 }, $dynamicAnchor$6 = "meta", title$7 = "Applicator vocabulary meta-schema", type$8 = ["object", "boolean"], properties$8 = {
		prefixItems: { $ref: "#/$defs/schemaArray" },
		items: { $dynamicRef: "#meta" },
		contains: { $dynamicRef: "#meta" },
		additionalProperties: { $dynamicRef: "#meta" },
		properties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependentSchemas: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		propertyNames: { $dynamicRef: "#meta" },
		if: { $dynamicRef: "#meta" },
		then: { $dynamicRef: "#meta" },
		else: { $dynamicRef: "#meta" },
		allOf: { $ref: "#/$defs/schemaArray" },
		anyOf: { $ref: "#/$defs/schemaArray" },
		oneOf: { $ref: "#/$defs/schemaArray" },
		not: { $dynamicRef: "#meta" }
	}, $defs$2 = { schemaArray: {
		type: "array",
		minItems: 1,
		items: { $dynamicRef: "#meta" }
	} }, applicator_default = {
		$schema: $schema$7,
		$id: $id$8,
		$vocabulary: $vocabulary$6,
		$dynamicAnchor: $dynamicAnchor$6,
		title: title$7,
		type: type$8,
		properties: properties$8,
		$defs: $defs$2
	};
})), unevaluated_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$5,
	$id: () => $id$7,
	$schema: () => $schema$6,
	$vocabulary: () => $vocabulary$5,
	default: () => unevaluated_default,
	properties: () => properties$7,
	title: () => title$6,
	type: () => type$7
}, 1), $schema$6, $id$7, $vocabulary$5, $dynamicAnchor$5, title$6, type$7, properties$7, unevaluated_default, init_unevaluated = __esmMin((() => {
	$schema$6 = "https://json-schema.org/draft/2020-12/schema", $id$7 = "https://json-schema.org/draft/2020-12/meta/unevaluated", $vocabulary$5 = { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 }, $dynamicAnchor$5 = "meta", title$6 = "Unevaluated applicator vocabulary meta-schema", type$7 = ["object", "boolean"], properties$7 = {
		unevaluatedItems: { $dynamicRef: "#meta" },
		unevaluatedProperties: { $dynamicRef: "#meta" }
	}, unevaluated_default = {
		$schema: $schema$6,
		$id: $id$7,
		$vocabulary: $vocabulary$5,
		$dynamicAnchor: $dynamicAnchor$5,
		title: title$6,
		type: type$7,
		properties: properties$7
	};
})), content_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$4,
	$id: () => $id$6,
	$schema: () => $schema$5,
	$vocabulary: () => $vocabulary$4,
	default: () => content_default,
	properties: () => properties$6,
	title: () => title$5,
	type: () => type$6
}, 1), $schema$5, $id$6, $vocabulary$4, $dynamicAnchor$4, title$5, type$6, properties$6, content_default, init_content = __esmMin((() => {
	$schema$5 = "https://json-schema.org/draft/2020-12/schema", $id$6 = "https://json-schema.org/draft/2020-12/meta/content", $vocabulary$4 = { "https://json-schema.org/draft/2020-12/vocab/content": !0 }, $dynamicAnchor$4 = "meta", title$5 = "Content vocabulary meta-schema", type$6 = ["object", "boolean"], properties$6 = {
		contentEncoding: { type: "string" },
		contentMediaType: { type: "string" },
		contentSchema: { $dynamicRef: "#meta" }
	}, content_default = {
		$schema: $schema$5,
		$id: $id$6,
		$vocabulary: $vocabulary$4,
		$dynamicAnchor: $dynamicAnchor$4,
		title: title$5,
		type: type$6,
		properties: properties$6
	};
})), core_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$1,
	$dynamicAnchor: () => $dynamicAnchor$3,
	$id: () => $id$5,
	$schema: () => $schema$4,
	$vocabulary: () => $vocabulary$3,
	default: () => core_default,
	properties: () => properties$5,
	title: () => title$4,
	type: () => type$5
}, 1), $schema$4, $id$5, $vocabulary$3, $dynamicAnchor$3, title$4, type$5, properties$5, $defs$1, core_default, init_core = __esmMin((() => {
	$schema$4 = "https://json-schema.org/draft/2020-12/schema", $id$5 = "https://json-schema.org/draft/2020-12/meta/core", $vocabulary$3 = { "https://json-schema.org/draft/2020-12/vocab/core": !0 }, $dynamicAnchor$3 = "meta", title$4 = "Core vocabulary meta-schema", type$5 = ["object", "boolean"], properties$5 = {
		$id: {
			$ref: "#/$defs/uriReferenceString",
			$comment: "Non-empty fragments not allowed.",
			pattern: "^[^#]*#?$"
		},
		$schema: { $ref: "#/$defs/uriString" },
		$ref: { $ref: "#/$defs/uriReferenceString" },
		$anchor: { $ref: "#/$defs/anchorString" },
		$dynamicRef: { $ref: "#/$defs/uriReferenceString" },
		$dynamicAnchor: { $ref: "#/$defs/anchorString" },
		$vocabulary: {
			type: "object",
			propertyNames: { $ref: "#/$defs/uriString" },
			additionalProperties: { type: "boolean" }
		},
		$comment: { type: "string" },
		$defs: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" }
		}
	}, $defs$1 = {
		anchorString: {
			type: "string",
			pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
		},
		uriString: {
			type: "string",
			format: "uri"
		},
		uriReferenceString: {
			type: "string",
			format: "uri-reference"
		}
	}, core_default = {
		$schema: $schema$4,
		$id: $id$5,
		$vocabulary: $vocabulary$3,
		$dynamicAnchor: $dynamicAnchor$3,
		title: title$4,
		type: type$5,
		properties: properties$5,
		$defs: $defs$1
	};
})), format_annotation_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$2,
	$id: () => $id$4,
	$schema: () => $schema$3,
	$vocabulary: () => $vocabulary$2,
	default: () => format_annotation_default,
	properties: () => properties$4,
	title: () => title$3,
	type: () => type$4
}, 1), $schema$3, $id$4, $vocabulary$2, $dynamicAnchor$2, title$3, type$4, properties$4, format_annotation_default, init_format_annotation = __esmMin((() => {
	$schema$3 = "https://json-schema.org/draft/2020-12/schema", $id$4 = "https://json-schema.org/draft/2020-12/meta/format-annotation", $vocabulary$2 = { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 }, $dynamicAnchor$2 = "meta", title$3 = "Format vocabulary meta-schema for annotation results", type$4 = ["object", "boolean"], properties$4 = { format: { type: "string" } }, format_annotation_default = {
		$schema: $schema$3,
		$id: $id$4,
		$vocabulary: $vocabulary$2,
		$dynamicAnchor: $dynamicAnchor$2,
		title: title$3,
		type: type$4,
		properties: properties$4
	};
})), meta_data_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$1,
	$id: () => $id$3,
	$schema: () => $schema$2,
	$vocabulary: () => $vocabulary$1,
	default: () => meta_data_default,
	properties: () => properties$3,
	title: () => title$2,
	type: () => type$3
}, 1), $schema$2, $id$3, $vocabulary$1, $dynamicAnchor$1, title$2, type$3, properties$3, meta_data_default, init_meta_data = __esmMin((() => {
	$schema$2 = "https://json-schema.org/draft/2020-12/schema", $id$3 = "https://json-schema.org/draft/2020-12/meta/meta-data", $vocabulary$1 = { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 }, $dynamicAnchor$1 = "meta", title$2 = "Meta-data vocabulary meta-schema", type$3 = ["object", "boolean"], properties$3 = {
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		deprecated: {
			type: "boolean",
			default: !1
		},
		readOnly: {
			type: "boolean",
			default: !1
		},
		writeOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		}
	}, meta_data_default = {
		$schema: $schema$2,
		$id: $id$3,
		$vocabulary: $vocabulary$1,
		$dynamicAnchor: $dynamicAnchor$1,
		title: title$2,
		type: type$3,
		properties: properties$3
	};
})), validation_exports = /* @__PURE__ */ __export({
	$defs: () => $defs,
	$dynamicAnchor: () => $dynamicAnchor,
	$id: () => $id$2,
	$schema: () => $schema$1,
	$vocabulary: () => $vocabulary,
	default: () => validation_default,
	properties: () => properties$2,
	title: () => title$1,
	type: () => type$2
}, 1), $schema$1, $id$2, $vocabulary, $dynamicAnchor, title$1, type$2, properties$2, $defs, validation_default, init_validation = __esmMin((() => {
	$schema$1 = "https://json-schema.org/draft/2020-12/schema", $id$2 = "https://json-schema.org/draft/2020-12/meta/validation", $vocabulary = { "https://json-schema.org/draft/2020-12/vocab/validation": !0 }, $dynamicAnchor = "meta", title$1 = "Validation vocabulary meta-schema", type$2 = ["object", "boolean"], properties$2 = {
		type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/$defs/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		const: !0,
		enum: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/$defs/nonNegativeInteger" },
		minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		maxItems: { $ref: "#/$defs/nonNegativeInteger" },
		minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		maxContains: { $ref: "#/$defs/nonNegativeInteger" },
		minContains: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 1
		},
		maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
		minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		required: { $ref: "#/$defs/stringArray" },
		dependentRequired: {
			type: "object",
			additionalProperties: { $ref: "#/$defs/stringArray" }
		}
	}, $defs = {
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 0
		},
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, validation_default = {
		$schema: $schema$1,
		$id: $id$2,
		$vocabulary,
		$dynamicAnchor,
		title: title$1,
		type: type$2,
		properties: properties$2,
		$defs
	};
})), require_json_schema_2020_12 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = (init_schema(), __toCommonJS(schema_exports).default), c = (init_applicator(), __toCommonJS(applicator_exports).default), l = (init_unevaluated(), __toCommonJS(unevaluated_exports).default), u = (init_content(), __toCommonJS(content_exports).default), d = (init_core(), __toCommonJS(core_exports).default), f = (init_format_annotation(), __toCommonJS(format_annotation_exports).default), p = (init_meta_data(), __toCommonJS(meta_data_exports).default), m = (init_validation(), __toCommonJS(validation_exports).default), h = ["/properties"];
	function g(t) {
		return [
			s,
			c,
			l,
			u,
			d,
			g(this, f),
			p,
			g(this, m)
		].forEach((t) => this.addMetaSchema(t, void 0, !1)), this;
		function g(s, c) {
			return t ? s.$dataMetaSchema(c, h) : c;
		}
	}
	t.default = g;
})), require__2020 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
	var c = require_core$3(), l = require_draft2020(), u = require_discriminator$1(), d = require_json_schema_2020_12(), f = "https://json-schema.org/draft/2020-12/schema", p = class extends c.default {
		constructor(t = {}) {
			super({
				...t,
				dynamicRef: !0,
				next: !0,
				unevaluated: !0
			});
		}
		_addVocabularies() {
			super._addVocabularies(), l.default.forEach((t) => this.addVocabulary(t)), this.opts.discriminator && this.addKeyword(u.default);
		}
		_addDefaultMetaSchema() {
			super._addDefaultMetaSchema();
			let { $data: t, meta: s } = this.opts;
			s && (d.default.call(this, t), this.refs["http://json-schema.org/schema"] = f);
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(f) ? f : void 0);
		}
	};
	t.Ajv2020 = p, s.exports = t = p, s.exports.Ajv2020 = p, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = p;
	var m = require_validate$1();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return m.KeywordCxt;
		}
	});
	var h = require_codegen$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return h._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return h.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return h.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return h.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return h.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return h.CodeGen;
		}
	});
	var g = require_validation_error$1();
	Object.defineProperty(t, "ValidationError", {
		enumerable: !0,
		get: function() {
			return g.default;
		}
	});
	var _ = require_ref_error$1();
	Object.defineProperty(t, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return _.default;
		}
	});
})), require_formats = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.formatNames = t.fastFormats = t.fullFormats = void 0;
	function s(t, s) {
		return {
			validate: t,
			compare: s
		};
	}
	t.fullFormats = {
		date: s(d, f),
		time: s(m(!0), h),
		"date-time": s(v(!0), y),
		"iso-time": s(m(), g),
		"iso-date-time": s(v(), b),
		duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
		uri: C,
		"uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
		"uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
		url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
		email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
		hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
		ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
		ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
		regex: M,
		uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
		"json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
		"json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
		"relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
		byte: T,
		int32: {
			type: "number",
			validate: O
		},
		int64: {
			type: "number",
			validate: k
		},
		float: {
			type: "number",
			validate: A
		},
		double: {
			type: "number",
			validate: A
		},
		password: !0,
		binary: !0
	}, t.fastFormats = {
		...t.fullFormats,
		date: s(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, f),
		time: s(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
		"date-time": s(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, y),
		"iso-time": s(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, g),
		"iso-date-time": s(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, b),
		uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
		"uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
		email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
	}, t.formatNames = Object.keys(t.fullFormats);
	function c(t) {
		return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
	}
	var l = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [
		0,
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	function d(t) {
		let s = l.exec(t);
		if (!s) return !1;
		let d = +s[1], f = +s[2], p = +s[3];
		return f >= 1 && f <= 12 && p >= 1 && p <= (f === 2 && c(d) ? 29 : u[f]);
	}
	function f(t, s) {
		if (t && s) return t > s ? 1 : t < s ? -1 : 0;
	}
	var p = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
	function m(t) {
		return function(s) {
			let c = p.exec(s);
			if (!c) return !1;
			let l = +c[1], u = +c[2], d = +c[3], f = c[4], m = c[5] === "-" ? -1 : 1, h = +(c[6] || 0), g = +(c[7] || 0);
			if (h > 23 || g > 59 || t && !f) return !1;
			if (l <= 23 && u <= 59 && d < 60) return !0;
			let _ = u - g * m, v = l - h * m - (_ < 0 ? 1 : 0);
			return (v === 23 || v === -1) && (_ === 59 || _ === -1) && d < 61;
		};
	}
	function h(t, s) {
		if (!(t && s)) return;
		let c = (/* @__PURE__ */ new Date("2020-01-01T" + t)).valueOf(), l = (/* @__PURE__ */ new Date("2020-01-01T" + s)).valueOf();
		if (c && l) return c - l;
	}
	function g(t, s) {
		if (!(t && s)) return;
		let c = p.exec(t), l = p.exec(s);
		if (c && l) return t = c[1] + c[2] + c[3], s = l[1] + l[2] + l[3], t > s ? 1 : t < s ? -1 : 0;
	}
	var _ = /t|\s/i;
	function v(t) {
		let s = m(t);
		return function(t) {
			let c = t.split(_);
			return c.length === 2 && d(c[0]) && s(c[1]);
		};
	}
	function y(t, s) {
		if (!(t && s)) return;
		let c = new Date(t).valueOf(), l = new Date(s).valueOf();
		if (c && l) return c - l;
	}
	function b(t, s) {
		if (!(t && s)) return;
		let [c, l] = t.split(_), [u, d] = s.split(_), p = f(c, u);
		if (p !== void 0) return p || h(l, d);
	}
	var x = /\/|:/, S = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	function C(t) {
		return x.test(t) && S.test(t);
	}
	var w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
	function T(t) {
		return w.lastIndex = 0, w.test(t);
	}
	var E = -(2 ** 31), D = 2 ** 31 - 1;
	function O(t) {
		return Number.isInteger(t) && t <= D && t >= E;
	}
	function k(t) {
		return Number.isInteger(t);
	}
	function A() {
		return !0;
	}
	var j = /[^\\]\\Z/;
	function M(t) {
		if (j.test(t)) return !1;
		try {
			return new RegExp(t), !0;
		} catch {
			return !1;
		}
	}
})), require_code$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
	var s = class {};
	t._CodeOrName = s, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var c = class extends s {
		constructor(s) {
			if (super(), !t.IDENTIFIER.test(s)) throw Error("CodeGen: name must be a valid identifier");
			this.str = s;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			return !1;
		}
		get names() {
			return { [this.str]: 1 };
		}
	};
	t.Name = c;
	var l = class extends s {
		constructor(t) {
			super(), this._items = typeof t == "string" ? [t] : t;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let t = this._items[0];
			return t === "" || t === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((t, s) => `${t}${s}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((t, s) => (s instanceof c && (t[s.str] = (t[s.str] || 0) + 1), t), {});
		}
	};
	t._Code = l, t.nil = new l("");
	function u(t, ...s) {
		let c = [t[0]], u = 0;
		for (; u < s.length;) p(c, s[u]), c.push(t[++u]);
		return new l(c);
	}
	t._ = u;
	var d = new l("+");
	function f(t, ...s) {
		let c = [y(t[0])], u = 0;
		for (; u < s.length;) c.push(d), p(c, s[u]), c.push(d, y(t[++u]));
		return m(c), new l(c);
	}
	t.str = f;
	function p(t, s) {
		s instanceof l ? t.push(...s._items) : s instanceof c ? t.push(s) : t.push(_(s));
	}
	t.addCodeArg = p;
	function m(t) {
		let s = 1;
		for (; s < t.length - 1;) {
			if (t[s] === d) {
				let c = h(t[s - 1], t[s + 1]);
				if (c !== void 0) {
					t.splice(s - 1, 3, c);
					continue;
				}
				t[s++] = "+";
			}
			s++;
		}
	}
	function h(t, s) {
		if (s === "\"\"") return t;
		if (t === "\"\"") return s;
		if (typeof t == "string") return s instanceof c || t[t.length - 1] !== "\"" ? void 0 : typeof s == "string" ? s[0] === "\"" ? t.slice(0, -1) + s.slice(1) : void 0 : `${t.slice(0, -1)}${s}"`;
		if (typeof s == "string" && s[0] === "\"" && !(t instanceof c)) return `"${t}${s.slice(1)}`;
	}
	function g(t, s) {
		return s.emptyStr() ? t : t.emptyStr() ? s : f`${t}${s}`;
	}
	t.strConcat = g;
	function _(t) {
		return typeof t == "number" || typeof t == "boolean" || t === null ? t : y(Array.isArray(t) ? t.join(",") : t);
	}
	function v(t) {
		return new l(y(t));
	}
	t.stringify = v;
	function y(t) {
		return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	t.safeStringify = y;
	function b(s) {
		return typeof s == "string" && t.IDENTIFIER.test(s) ? new l(`.${s}`) : u`[${s}]`;
	}
	t.getProperty = b;
	function x(s) {
		if (typeof s == "string" && t.IDENTIFIER.test(s)) return new l(`${s}`);
		throw Error(`CodeGen: invalid export name: ${s}, use explicit $id name mapping`);
	}
	t.getEsmExportName = x;
	function S(t) {
		return new l(t.toString());
	}
	t.regexpCode = S;
})), require_scope = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
	var s = require_code$1(), c = class extends Error {
		constructor(t) {
			super(`CodeGen: "code" for ${t} not defined`), this.value = t.value;
		}
	}, l;
	(function(t) {
		t[t.Started = 0] = "Started", t[t.Completed = 1] = "Completed";
	})(l || (t.UsedValueState = l = {})), t.varKinds = {
		const: new s.Name("const"),
		let: new s.Name("let"),
		var: new s.Name("var")
	};
	var u = class {
		constructor({ prefixes: t, parent: s } = {}) {
			this._names = {}, this._prefixes = t, this._parent = s;
		}
		toName(t) {
			return t instanceof s.Name ? t : this.name(t);
		}
		name(t) {
			return new s.Name(this._newName(t));
		}
		_newName(t) {
			let s = this._names[t] || this._nameGroup(t);
			return `${t}${s.index++}`;
		}
		_nameGroup(t) {
			if ((this._parent?._prefixes)?.has(t) || this._prefixes && !this._prefixes.has(t)) throw Error(`CodeGen: prefix "${t}" is not allowed in this scope`);
			return this._names[t] = {
				prefix: t,
				index: 0
			};
		}
	};
	t.Scope = u;
	var d = class extends s.Name {
		constructor(t, s) {
			super(s), this.prefix = t;
		}
		setValue(t, { property: c, itemIndex: l }) {
			this.value = t, this.scopePath = (0, s._)`.${new s.Name(c)}[${l}]`;
		}
	};
	t.ValueScopeName = d;
	var f = (0, s._)`\n`;
	t.ValueScope = class extends u {
		constructor(t) {
			super(t), this._values = {}, this._scope = t.scope, this.opts = {
				...t,
				_n: t.lines ? f : s.nil
			};
		}
		get() {
			return this._scope;
		}
		name(t) {
			return new d(t, this._newName(t));
		}
		value(t, s) {
			if (s.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let c = this.toName(t), { prefix: l } = c, u = s.key ?? s.ref, d = this._values[l];
			if (d) {
				let t = d.get(u);
				if (t) return t;
			} else d = this._values[l] = /* @__PURE__ */ new Map();
			d.set(u, c);
			let f = this._scope[l] || (this._scope[l] = []), p = f.length;
			return f[p] = s.ref, c.setValue(s, {
				property: l,
				itemIndex: p
			}), c;
		}
		getValue(t, s) {
			let c = this._values[t];
			if (c) return c.get(s);
		}
		scopeRefs(t, c = this._values) {
			return this._reduceValues(c, (c) => {
				if (c.scopePath === void 0) throw Error(`CodeGen: name "${c}" has no value`);
				return (0, s._)`${t}${c.scopePath}`;
			});
		}
		scopeCode(t = this._values, s, c) {
			return this._reduceValues(t, (t) => {
				if (t.value === void 0) throw Error(`CodeGen: name "${t}" has no value`);
				return t.value.code;
			}, s, c);
		}
		_reduceValues(u, d, f = {}, p) {
			let m = s.nil;
			for (let h in u) {
				let g = u[h];
				if (!g) continue;
				let _ = f[h] = f[h] || /* @__PURE__ */ new Map();
				g.forEach((u) => {
					if (_.has(u)) return;
					_.set(u, l.Started);
					let f = d(u);
					if (f) {
						let c = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
						m = (0, s._)`${m}${c} ${u} = ${f};${this.opts._n}`;
					} else if (f = p?.(u)) m = (0, s._)`${m}${f}${this.opts._n}`;
					else throw new c(u);
					_.set(u, l.Completed);
				});
			}
			return m;
		}
	};
})), require_codegen = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
	var s = require_code$1(), c = require_scope(), l = require_code$1();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return l._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return l.str;
		}
	}), Object.defineProperty(t, "strConcat", {
		enumerable: !0,
		get: function() {
			return l.strConcat;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return l.nil;
		}
	}), Object.defineProperty(t, "getProperty", {
		enumerable: !0,
		get: function() {
			return l.getProperty;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return l.stringify;
		}
	}), Object.defineProperty(t, "regexpCode", {
		enumerable: !0,
		get: function() {
			return l.regexpCode;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return l.Name;
		}
	});
	var u = require_scope();
	Object.defineProperty(t, "Scope", {
		enumerable: !0,
		get: function() {
			return u.Scope;
		}
	}), Object.defineProperty(t, "ValueScope", {
		enumerable: !0,
		get: function() {
			return u.ValueScope;
		}
	}), Object.defineProperty(t, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return u.ValueScopeName;
		}
	}), Object.defineProperty(t, "varKinds", {
		enumerable: !0,
		get: function() {
			return u.varKinds;
		}
	}), t.operators = {
		GT: new s._Code(">"),
		GTE: new s._Code(">="),
		LT: new s._Code("<"),
		LTE: new s._Code("<="),
		EQ: new s._Code("==="),
		NEQ: new s._Code("!=="),
		NOT: new s._Code("!"),
		OR: new s._Code("||"),
		AND: new s._Code("&&"),
		ADD: new s._Code("+")
	};
	var d = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(t, s) {
			return this;
		}
	}, f = class extends d {
		constructor(t, s, c) {
			super(), this.varKind = t, this.name = s, this.rhs = c;
		}
		render({ es5: t, _n: s }) {
			let l = t ? c.varKinds.var : this.varKind, u = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${l} ${this.name}${u};` + s;
		}
		optimizeNames(t, s) {
			if (t[this.name.str]) return this.rhs &&= F(this.rhs, t, s), this;
		}
		get names() {
			return this.rhs instanceof s._CodeOrName ? this.rhs.names : {};
		}
	}, p = class extends d {
		constructor(t, s, c) {
			super(), this.lhs = t, this.rhs = s, this.sideEffects = c;
		}
		render({ _n: t }) {
			return `${this.lhs} = ${this.rhs};` + t;
		}
		optimizeNames(t, c) {
			if (!(this.lhs instanceof s.Name && !t[this.lhs.str] && !this.sideEffects)) return this.rhs = F(this.rhs, t, c), this;
		}
		get names() {
			return P(this.lhs instanceof s.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, m = class extends p {
		constructor(t, s, c, l) {
			super(t, c, l), this.op = s;
		}
		render({ _n: t }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + t;
		}
	}, h = class extends d {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `${this.label}:` + t;
		}
	}, g = class extends d {
		constructor(t) {
			super(), this.label = t, this.names = {};
		}
		render({ _n: t }) {
			return `break${this.label ? ` ${this.label}` : ""};` + t;
		}
	}, _ = class extends d {
		constructor(t) {
			super(), this.error = t;
		}
		render({ _n: t }) {
			return `throw ${this.error};` + t;
		}
		get names() {
			return this.error.names;
		}
	}, v = class extends d {
		constructor(t) {
			super(), this.code = t;
		}
		render({ _n: t }) {
			return `${this.code};` + t;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(t, s) {
			return this.code = F(this.code, t, s), this;
		}
		get names() {
			return this.code instanceof s._CodeOrName ? this.code.names : {};
		}
	}, y = class extends d {
		constructor(t = []) {
			super(), this.nodes = t;
		}
		render(t) {
			return this.nodes.reduce((s, c) => s + c.render(t), "");
		}
		optimizeNodes() {
			let { nodes: t } = this, s = t.length;
			for (; s--;) {
				let c = t[s].optimizeNodes();
				Array.isArray(c) ? t.splice(s, 1, ...c) : c ? t[s] = c : t.splice(s, 1);
			}
			return t.length > 0 ? this : void 0;
		}
		optimizeNames(t, s) {
			let { nodes: c } = this, l = c.length;
			for (; l--;) {
				let u = c[l];
				u.optimizeNames(t, s) || (I(t, u.names), c.splice(l, 1));
			}
			return c.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((t, s) => N(t, s.names), {});
		}
	}, b = class extends y {
		render(t) {
			return "{" + t._n + super.render(t) + "}" + t._n;
		}
	}, x = class extends y {}, S = class extends b {};
	S.kind = "else";
	var C = class t extends b {
		constructor(t, s) {
			super(s), this.condition = t;
		}
		render(t) {
			let s = `if(${this.condition})` + super.render(t);
			return this.else && (s += "else " + this.else.render(t)), s;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let s = this.condition;
			if (s === !0) return this.nodes;
			let c = this.else;
			if (c) {
				let t = c.optimizeNodes();
				c = this.else = Array.isArray(t) ? new S(t) : t;
			}
			if (c) return s === !1 ? c instanceof t ? c : c.nodes : this.nodes.length ? this : new t(L(s), c instanceof t ? [c] : c.nodes);
			if (!(s === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(t, s) {
			if (this.else = this.else?.optimizeNames(t, s), super.optimizeNames(t, s) || this.else) return this.condition = F(this.condition, t, s), this;
		}
		get names() {
			let t = super.names;
			return P(t, this.condition), this.else && N(t, this.else.names), t;
		}
	};
	C.kind = "if";
	var w = class extends b {};
	w.kind = "for";
	var T = class extends w {
		constructor(t) {
			super(), this.iteration = t;
		}
		render(t) {
			return `for(${this.iteration})` + super.render(t);
		}
		optimizeNames(t, s) {
			if (super.optimizeNames(t, s)) return this.iteration = F(this.iteration, t, s), this;
		}
		get names() {
			return N(super.names, this.iteration.names);
		}
	}, E = class extends w {
		constructor(t, s, c, l) {
			super(), this.varKind = t, this.name = s, this.from = c, this.to = l;
		}
		render(t) {
			let s = t.es5 ? c.varKinds.var : this.varKind, { name: l, from: u, to: d } = this;
			return `for(${s} ${l}=${u}; ${l}<${d}; ${l}++)` + super.render(t);
		}
		get names() {
			return P(P(super.names, this.from), this.to);
		}
	}, D = class extends w {
		constructor(t, s, c, l) {
			super(), this.loop = t, this.varKind = s, this.name = c, this.iterable = l;
		}
		render(t) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(t);
		}
		optimizeNames(t, s) {
			if (super.optimizeNames(t, s)) return this.iterable = F(this.iterable, t, s), this;
		}
		get names() {
			return N(super.names, this.iterable.names);
		}
	}, O = class extends b {
		constructor(t, s, c) {
			super(), this.name = t, this.args = s, this.async = c;
		}
		render(t) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(t);
		}
	};
	O.kind = "func";
	var k = class extends y {
		render(t) {
			return "return " + super.render(t);
		}
	};
	k.kind = "return";
	var A = class extends b {
		render(t) {
			let s = "try" + super.render(t);
			return this.catch && (s += this.catch.render(t)), this.finally && (s += this.finally.render(t)), s;
		}
		optimizeNodes() {
			var t, s;
			return super.optimizeNodes(), (t = this.catch) == null || t.optimizeNodes(), (s = this.finally) == null || s.optimizeNodes(), this;
		}
		optimizeNames(t, s) {
			var c, l;
			return super.optimizeNames(t, s), (c = this.catch) == null || c.optimizeNames(t, s), (l = this.finally) == null || l.optimizeNames(t, s), this;
		}
		get names() {
			let t = super.names;
			return this.catch && N(t, this.catch.names), this.finally && N(t, this.finally.names), t;
		}
	}, j = class extends b {
		constructor(t) {
			super(), this.error = t;
		}
		render(t) {
			return `catch(${this.error})` + super.render(t);
		}
	};
	j.kind = "catch";
	var M = class extends b {
		render(t) {
			return "finally" + super.render(t);
		}
	};
	M.kind = "finally", t.CodeGen = class {
		constructor(t, s = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...s,
				_n: s.lines ? "\n" : ""
			}, this._extScope = t, this._scope = new c.Scope({ parent: t }), this._nodes = [new x()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(t) {
			return this._scope.name(t);
		}
		scopeName(t) {
			return this._extScope.name(t);
		}
		scopeValue(t, s) {
			let c = this._extScope.value(t, s);
			return (this._values[c.prefix] || (this._values[c.prefix] = /* @__PURE__ */ new Set())).add(c), c;
		}
		getScopeValue(t, s) {
			return this._extScope.getValue(t, s);
		}
		scopeRefs(t) {
			return this._extScope.scopeRefs(t, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(t, s, c, l) {
			let u = this._scope.toName(s);
			return c !== void 0 && l && (this._constants[u.str] = c), this._leafNode(new f(t, u, c)), u;
		}
		const(t, s, l) {
			return this._def(c.varKinds.const, t, s, l);
		}
		let(t, s, l) {
			return this._def(c.varKinds.let, t, s, l);
		}
		var(t, s, l) {
			return this._def(c.varKinds.var, t, s, l);
		}
		assign(t, s, c) {
			return this._leafNode(new p(t, s, c));
		}
		add(s, c) {
			return this._leafNode(new m(s, t.operators.ADD, c));
		}
		code(t) {
			return typeof t == "function" ? t() : t !== s.nil && this._leafNode(new v(t)), this;
		}
		object(...t) {
			let c = ["{"];
			for (let [l, u] of t) c.length > 1 && c.push(","), c.push(l), (l !== u || this.opts.es5) && (c.push(":"), (0, s.addCodeArg)(c, u));
			return c.push("}"), new s._Code(c);
		}
		if(t, s, c) {
			if (this._blockNode(new C(t)), s && c) this.code(s).else().code(c).endIf();
			else if (s) this.code(s).endIf();
			else if (c) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(t) {
			return this._elseNode(new C(t));
		}
		else() {
			return this._elseNode(new S());
		}
		endIf() {
			return this._endBlockNode(C, S);
		}
		_for(t, s) {
			return this._blockNode(t), s && this.code(s).endFor(), this;
		}
		for(t, s) {
			return this._for(new T(t), s);
		}
		forRange(t, s, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.let) {
			let f = this._scope.toName(t);
			return this._for(new E(d, f, s, l), () => u(f));
		}
		forOf(t, l, u, d = c.varKinds.const) {
			let f = this._scope.toName(t);
			if (this.opts.es5) {
				let t = l instanceof s.Name ? l : this.var("_arr", l);
				return this.forRange("_i", 0, (0, s._)`${t}.length`, (c) => {
					this.var(f, (0, s._)`${t}[${c}]`), u(f);
				});
			}
			return this._for(new D("of", d, f, l), () => u(f));
		}
		forIn(t, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(t, (0, s._)`Object.keys(${l})`, u);
			let f = this._scope.toName(t);
			return this._for(new D("in", d, f, l), () => u(f));
		}
		endFor() {
			return this._endBlockNode(w);
		}
		label(t) {
			return this._leafNode(new h(t));
		}
		break(t) {
			return this._leafNode(new g(t));
		}
		return(t) {
			let s = new k();
			if (this._blockNode(s), this.code(t), s.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(k);
		}
		try(t, s, c) {
			if (!s && !c) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let l = new A();
			if (this._blockNode(l), this.code(t), s) {
				let t = this.name("e");
				this._currNode = l.catch = new j(t), s(t);
			}
			return c && (this._currNode = l.finally = new M(), this.code(c)), this._endBlockNode(j, M);
		}
		throw(t) {
			return this._leafNode(new _(t));
		}
		block(t, s) {
			return this._blockStarts.push(this._nodes.length), t && this.code(t).endBlock(s), this;
		}
		endBlock(t) {
			let s = this._blockStarts.pop();
			if (s === void 0) throw Error("CodeGen: not in self-balancing block");
			let c = this._nodes.length - s;
			if (c < 0 || t !== void 0 && c !== t) throw Error(`CodeGen: wrong number of nodes: ${c} vs ${t} expected`);
			return this._nodes.length = s, this;
		}
		func(t, c = s.nil, l, u) {
			return this._blockNode(new O(t, c, l)), u && this.code(u).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(O);
		}
		optimize(t = 1) {
			for (; t-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(t) {
			return this._currNode.nodes.push(t), this;
		}
		_blockNode(t) {
			this._currNode.nodes.push(t), this._nodes.push(t);
		}
		_endBlockNode(t, s) {
			let c = this._currNode;
			if (c instanceof t || s && c instanceof s) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${s ? `${t.kind}/${s.kind}` : t.kind}"`);
		}
		_elseNode(t) {
			let s = this._currNode;
			if (!(s instanceof C)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = s.else = t, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let t = this._nodes;
			return t[t.length - 1];
		}
		set _currNode(t) {
			let s = this._nodes;
			s[s.length - 1] = t;
		}
	};
	function N(t, s) {
		for (let c in s) t[c] = (t[c] || 0) + (s[c] || 0);
		return t;
	}
	function P(t, c) {
		return c instanceof s._CodeOrName ? N(t, c.names) : t;
	}
	function F(t, c, l) {
		if (t instanceof s.Name) return u(t);
		if (!d(t)) return t;
		return new s._Code(t._items.reduce((t, c) => (c instanceof s.Name && (c = u(c)), c instanceof s._Code ? t.push(...c._items) : t.push(c), t), []));
		function u(t) {
			let s = l[t.str];
			return s === void 0 || c[t.str] !== 1 ? t : (delete c[t.str], s);
		}
		function d(t) {
			return t instanceof s._Code && t._items.some((t) => t instanceof s.Name && c[t.str] === 1 && l[t.str] !== void 0);
		}
	}
	function I(t, s) {
		for (let c in s) t[c] = (t[c] || 0) - (s[c] || 0);
	}
	function L(t) {
		return typeof t == "boolean" || typeof t == "number" || t === null ? !t : (0, s._)`!${U(t)}`;
	}
	t.not = L;
	var R = H(t.operators.AND);
	function z(...t) {
		return t.reduce(R);
	}
	t.and = z;
	var B = H(t.operators.OR);
	function V(...t) {
		return t.reduce(B);
	}
	t.or = V;
	function H(t) {
		return (c, l) => c === s.nil ? l : l === s.nil ? c : (0, s._)`${U(c)} ${t} ${U(l)}`;
	}
	function U(t) {
		return t instanceof s.Name ? t : (0, s._)`(${t})`;
	}
})), require_util$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.checkStrictMode = t.getErrorPath = t.Type = t.useFunc = t.setEvaluated = t.evaluatedPropsToName = t.mergeEvaluated = t.eachItem = t.unescapeJsonPointer = t.escapeJsonPointer = t.escapeFragment = t.unescapeFragment = t.schemaRefOrVal = t.schemaHasRulesButRef = t.schemaHasRules = t.checkUnknownRules = t.alwaysValidSchema = t.toHash = void 0;
	var s = require_codegen(), c = require_code$1();
	function l(t) {
		let s = {};
		for (let c of t) s[c] = !0;
		return s;
	}
	t.toHash = l;
	function u(t, s) {
		return typeof s == "boolean" ? s : Object.keys(s).length === 0 ? !0 : (d(t, s), !f(s, t.self.RULES.all));
	}
	t.alwaysValidSchema = u;
	function d(t, s = t.schema) {
		let { opts: c, self: l } = t;
		if (!c.strictSchema || typeof s == "boolean") return;
		let u = l.RULES.keywords;
		for (let c in s) u[c] || D(t, `unknown keyword: "${c}"`);
	}
	t.checkUnknownRules = d;
	function f(t, s) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (s[c]) return !0;
		return !1;
	}
	t.schemaHasRules = f;
	function p(t, s) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (c !== "$ref" && s.all[c]) return !0;
		return !1;
	}
	t.schemaHasRulesButRef = p;
	function m({ topSchemaRef: t, schemaPath: c }, l, u, d) {
		if (!d) {
			if (typeof l == "number" || typeof l == "boolean") return l;
			if (typeof l == "string") return (0, s._)`${l}`;
		}
		return (0, s._)`${t}${c}${(0, s.getProperty)(u)}`;
	}
	t.schemaRefOrVal = m;
	function h(t) {
		return v(decodeURIComponent(t));
	}
	t.unescapeFragment = h;
	function g(t) {
		return encodeURIComponent(_(t));
	}
	t.escapeFragment = g;
	function _(t) {
		return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	t.escapeJsonPointer = _;
	function v(t) {
		return t.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	t.unescapeJsonPointer = v;
	function y(t, s) {
		if (Array.isArray(t)) for (let c of t) s(c);
		else s(t);
	}
	t.eachItem = y;
	function b({ mergeNames: t, mergeToName: c, mergeValues: l, resultToName: u }) {
		return (d, f, p, m) => {
			let h = p === void 0 ? f : p instanceof s.Name ? (f instanceof s.Name ? t(d, f, p) : c(d, f, p), p) : f instanceof s.Name ? (c(d, p, f), f) : l(f, p);
			return m === s.Name && !(h instanceof s.Name) ? u(d, h) : h;
		};
	}
	t.mergeEvaluated = {
		props: b({
			mergeNames: (t, c, l) => t.if((0, s._)`${l} !== true && ${c} !== undefined`, () => {
				t.if((0, s._)`${c} === true`, () => t.assign(l, !0), () => t.assign(l, (0, s._)`${l} || {}`).code((0, s._)`Object.assign(${l}, ${c})`));
			}),
			mergeToName: (t, c, l) => t.if((0, s._)`${l} !== true`, () => {
				c === !0 ? t.assign(l, !0) : (t.assign(l, (0, s._)`${l} || {}`), S(t, l, c));
			}),
			mergeValues: (t, s) => t === !0 ? !0 : {
				...t,
				...s
			},
			resultToName: x
		}),
		items: b({
			mergeNames: (t, c, l) => t.if((0, s._)`${l} !== true && ${c} !== undefined`, () => t.assign(l, (0, s._)`${c} === true ? true : ${l} > ${c} ? ${l} : ${c}`)),
			mergeToName: (t, c, l) => t.if((0, s._)`${l} !== true`, () => t.assign(l, c === !0 ? !0 : (0, s._)`${l} > ${c} ? ${l} : ${c}`)),
			mergeValues: (t, s) => t === !0 ? !0 : Math.max(t, s),
			resultToName: (t, s) => t.var("items", s)
		})
	};
	function x(t, c) {
		if (c === !0) return t.var("props", !0);
		let l = t.var("props", (0, s._)`{}`);
		return c !== void 0 && S(t, l, c), l;
	}
	t.evaluatedPropsToName = x;
	function S(t, c, l) {
		Object.keys(l).forEach((l) => t.assign((0, s._)`${c}${(0, s.getProperty)(l)}`, !0));
	}
	t.setEvaluated = S;
	var C = {};
	function w(t, s) {
		return t.scopeValue("func", {
			ref: s,
			code: C[s.code] || (C[s.code] = new c._Code(s.code))
		});
	}
	t.useFunc = w;
	var T;
	(function(t) {
		t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
	})(T || (t.Type = T = {}));
	function E(t, c, l) {
		if (t instanceof s.Name) {
			let u = c === T.Num;
			return l ? u ? (0, s._)`"[" + ${t} + "]"` : (0, s._)`"['" + ${t} + "']"` : u ? (0, s._)`"/" + ${t}` : (0, s._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return l ? (0, s.getProperty)(t).toString() : "/" + _(t);
	}
	t.getErrorPath = E;
	function D(t, s, c = t.opts.strictSchema) {
		if (c) {
			if (s = `strict mode: ${s}`, c === !0) throw Error(s);
			t.self.logger.warn(s);
		}
	}
	t.checkStrictMode = D;
})), require_names = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen();
	t.default = {
		data: new s.Name("data"),
		valCxt: new s.Name("valCxt"),
		instancePath: new s.Name("instancePath"),
		parentData: new s.Name("parentData"),
		parentDataProperty: new s.Name("parentDataProperty"),
		rootData: new s.Name("rootData"),
		dynamicAnchors: new s.Name("dynamicAnchors"),
		vErrors: new s.Name("vErrors"),
		errors: new s.Name("errors"),
		this: new s.Name("this"),
		self: new s.Name("self"),
		scope: new s.Name("scope"),
		json: new s.Name("json"),
		jsonPos: new s.Name("jsonPos"),
		jsonLen: new s.Name("jsonLen"),
		jsonPart: new s.Name("jsonPart")
	};
})), require_errors$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_names();
	t.keywordError = { message: ({ keyword: t }) => (0, s.str)`must pass "${t}" keyword validation` }, t.keyword$DataError = { message: ({ keyword: t, schemaType: c }) => c ? (0, s.str)`"${t}" keyword must be ${c} ($data)` : (0, s.str)`"${t}" keyword is invalid ($data)` };
	function u(c, l = t.keywordError, u, d) {
		let { it: f } = c, { gen: p, compositeRule: g, allErrors: v } = f, y = _(c, l, u);
		d ?? (g || v) ? m(p, y) : h(f, (0, s._)`[${y}]`);
	}
	t.reportError = u;
	function d(s, c = t.keywordError, u) {
		let { it: d } = s, { gen: f, compositeRule: p, allErrors: g } = d;
		m(f, _(s, c, u)), p || g || h(d, l.default.vErrors);
	}
	t.reportExtraError = d;
	function f(t, c) {
		t.assign(l.default.errors, c), t.if((0, s._)`${l.default.vErrors} !== null`, () => t.if(c, () => t.assign((0, s._)`${l.default.vErrors}.length`, c), () => t.assign(l.default.vErrors, null)));
	}
	t.resetErrorsCount = f;
	function p({ gen: t, keyword: c, schemaValue: u, data: d, errsCount: f, it: p }) {
		/* istanbul ignore if */
		if (f === void 0) throw Error("ajv implementation error");
		let m = t.name("err");
		t.forRange("i", f, l.default.errors, (f) => {
			t.const(m, (0, s._)`${l.default.vErrors}[${f}]`), t.if((0, s._)`${m}.instancePath === undefined`, () => t.assign((0, s._)`${m}.instancePath`, (0, s.strConcat)(l.default.instancePath, p.errorPath))), t.assign((0, s._)`${m}.schemaPath`, (0, s.str)`${p.errSchemaPath}/${c}`), p.opts.verbose && (t.assign((0, s._)`${m}.schema`, u), t.assign((0, s._)`${m}.data`, d));
		});
	}
	t.extendErrors = p;
	function m(t, c) {
		let u = t.const("err", c);
		t.if((0, s._)`${l.default.vErrors} === null`, () => t.assign(l.default.vErrors, (0, s._)`[${u}]`), (0, s._)`${l.default.vErrors}.push(${u})`), t.code((0, s._)`${l.default.errors}++`);
	}
	function h(t, c) {
		let { gen: l, validateName: u, schemaEnv: d } = t;
		d.$async ? l.throw((0, s._)`new ${t.ValidationError}(${c})`) : (l.assign((0, s._)`${u}.errors`, c), l.return(!1));
	}
	var g = {
		keyword: new s.Name("keyword"),
		schemaPath: new s.Name("schemaPath"),
		params: new s.Name("params"),
		propertyName: new s.Name("propertyName"),
		message: new s.Name("message"),
		schema: new s.Name("schema"),
		parentSchema: new s.Name("parentSchema")
	};
	function _(t, c, l) {
		let { createErrors: u } = t.it;
		return u === !1 ? (0, s._)`{}` : v(t, c, l);
	}
	function v(t, s, c = {}) {
		let { gen: l, it: u } = t, d = [y(u, c), b(t, c)];
		return x(t, s, d), l.object(...d);
	}
	function y({ errorPath: t }, { instancePath: u }) {
		let d = u ? (0, s.str)`${t}${(0, c.getErrorPath)(u, c.Type.Str)}` : t;
		return [l.default.instancePath, (0, s.strConcat)(l.default.instancePath, d)];
	}
	function b({ keyword: t, it: { errSchemaPath: l } }, { schemaPath: u, parentSchema: d }) {
		let f = d ? l : (0, s.str)`${l}/${t}`;
		return u && (f = (0, s.str)`${f}${(0, c.getErrorPath)(u, c.Type.Str)}`), [g.schemaPath, f];
	}
	function x(t, { params: c, message: u }, d) {
		let { keyword: f, data: p, schemaValue: m, it: h } = t, { opts: _, propertyName: v, topSchemaRef: y, schemaPath: b } = h;
		d.push([g.keyword, f], [g.params, typeof c == "function" ? c(t) : c || (0, s._)`{}`]), _.messages && d.push([g.message, typeof u == "function" ? u(t) : u]), _.verbose && d.push([g.schema, m], [g.parentSchema, (0, s._)`${y}${b}`], [l.default.data, p]), v && d.push([g.propertyName, v]);
	}
})), require_boolSchema = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.boolOrEmptySchema = t.topBoolOrEmptySchema = void 0;
	var s = require_errors$1(), c = require_codegen(), l = require_names(), u = { message: "boolean schema is false" };
	function d(t) {
		let { gen: s, schema: u, validateName: d } = t;
		u === !1 ? p(t, !1) : typeof u == "object" && u.$async === !0 ? s.return(l.default.data) : (s.assign((0, c._)`${d}.errors`, null), s.return(!0));
	}
	t.topBoolOrEmptySchema = d;
	function f(t, s) {
		let { gen: c, schema: l } = t;
		l === !1 ? (c.var(s, !1), p(t)) : c.var(s, !0);
	}
	t.boolOrEmptySchema = f;
	function p(t, c) {
		let { gen: l, data: d } = t, f = {
			gen: l,
			keyword: "false schema",
			data: d,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: t
		};
		(0, s.reportError)(f, u, void 0, c);
	}
})), require_rules = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getRules = t.isJSONType = void 0;
	var s = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function c(t) {
		return typeof t == "string" && s.has(t);
	}
	t.isJSONType = c;
	function l() {
		let t = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...t,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				t.number,
				t.string,
				t.array,
				t.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	t.getRules = l;
})), require_applicability = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.shouldUseRule = t.shouldUseGroup = t.schemaHasRulesForType = void 0;
	function s({ schema: t, self: s }, l) {
		let u = s.RULES.types[l];
		return u && u !== !0 && c(t, u);
	}
	t.schemaHasRulesForType = s;
	function c(t, s) {
		return s.rules.some((s) => l(t, s));
	}
	t.shouldUseGroup = c;
	function l(t, s) {
		return t[s.keyword] !== void 0 || s.definition.implements?.some((s) => t[s] !== void 0);
	}
	t.shouldUseRule = l;
})), require_dataType = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.reportTypeError = t.checkDataTypes = t.checkDataType = t.coerceAndCheckDataType = t.getJSONTypes = t.getSchemaTypes = t.DataType = void 0;
	var s = require_rules(), c = require_applicability(), l = require_errors$1(), u = require_codegen(), d = require_util$1(), f;
	(function(t) {
		t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
	})(f || (t.DataType = f = {}));
	function p(t) {
		let s = m(t.type);
		if (s.includes("null")) {
			if (t.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!s.length && t.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			t.nullable === !0 && s.push("null");
		}
		return s;
	}
	t.getSchemaTypes = p;
	function m(t) {
		let c = Array.isArray(t) ? t : t ? [t] : [];
		if (c.every(s.isJSONType)) return c;
		throw Error("type must be JSONType or JSONType[]: " + c.join(","));
	}
	t.getJSONTypes = m;
	function h(t, s) {
		let { gen: l, data: u, opts: d } = t, p = _(s, d.coerceTypes), m = s.length > 0 && !(p.length === 0 && s.length === 1 && (0, c.schemaHasRulesForType)(t, s[0]));
		if (m) {
			let c = x(s, u, d.strictNumbers, f.Wrong);
			l.if(c, () => {
				p.length ? v(t, s, p) : C(t);
			});
		}
		return m;
	}
	t.coerceAndCheckDataType = h;
	var g = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function _(t, s) {
		return s ? t.filter((t) => g.has(t) || s === "array" && t === "array") : [];
	}
	function v(t, s, c) {
		let { gen: l, data: d, opts: f } = t, p = l.let("dataType", (0, u._)`typeof ${d}`), m = l.let("coerced", (0, u._)`undefined`);
		f.coerceTypes === "array" && l.if((0, u._)`${p} == 'object' && Array.isArray(${d}) && ${d}.length == 1`, () => l.assign(d, (0, u._)`${d}[0]`).assign(p, (0, u._)`typeof ${d}`).if(x(s, d, f.strictNumbers), () => l.assign(m, d))), l.if((0, u._)`${m} !== undefined`);
		for (let t of c) (g.has(t) || t === "array" && f.coerceTypes === "array") && h(t);
		l.else(), C(t), l.endIf(), l.if((0, u._)`${m} !== undefined`, () => {
			l.assign(d, m), y(t, m);
		});
		function h(t) {
			switch (t) {
				case "string":
					l.elseIf((0, u._)`${p} == "number" || ${p} == "boolean"`).assign(m, (0, u._)`"" + ${d}`).elseIf((0, u._)`${d} === null`).assign(m, (0, u._)`""`);
					return;
				case "number":
					l.elseIf((0, u._)`${p} == "boolean" || ${d} === null
              || (${p} == "string" && ${d} && ${d} == +${d})`).assign(m, (0, u._)`+${d}`);
					return;
				case "integer":
					l.elseIf((0, u._)`${p} === "boolean" || ${d} === null
              || (${p} === "string" && ${d} && ${d} == +${d} && !(${d} % 1))`).assign(m, (0, u._)`+${d}`);
					return;
				case "boolean":
					l.elseIf((0, u._)`${d} === "false" || ${d} === 0 || ${d} === null`).assign(m, !1).elseIf((0, u._)`${d} === "true" || ${d} === 1`).assign(m, !0);
					return;
				case "null":
					l.elseIf((0, u._)`${d} === "" || ${d} === 0 || ${d} === false`), l.assign(m, null);
					return;
				case "array": l.elseIf((0, u._)`${p} === "string" || ${p} === "number"
              || ${p} === "boolean" || ${d} === null`).assign(m, (0, u._)`[${d}]`);
			}
		}
	}
	function y({ gen: t, parentData: s, parentDataProperty: c }, l) {
		t.if((0, u._)`${s} !== undefined`, () => t.assign((0, u._)`${s}[${c}]`, l));
	}
	function b(t, s, c, l = f.Correct) {
		let d = l === f.Correct ? u.operators.EQ : u.operators.NEQ, p;
		switch (t) {
			case "null": return (0, u._)`${s} ${d} null`;
			case "array":
				p = (0, u._)`Array.isArray(${s})`;
				break;
			case "object":
				p = (0, u._)`${s} && typeof ${s} == "object" && !Array.isArray(${s})`;
				break;
			case "integer":
				p = m((0, u._)`!(${s} % 1) && !isNaN(${s})`);
				break;
			case "number":
				p = m();
				break;
			default: return (0, u._)`typeof ${s} ${d} ${t}`;
		}
		return l === f.Correct ? p : (0, u.not)(p);
		function m(t = u.nil) {
			return (0, u.and)((0, u._)`typeof ${s} == "number"`, t, c ? (0, u._)`isFinite(${s})` : u.nil);
		}
	}
	t.checkDataType = b;
	function x(t, s, c, l) {
		if (t.length === 1) return b(t[0], s, c, l);
		let f, p = (0, d.toHash)(t);
		if (p.array && p.object) {
			let t = (0, u._)`typeof ${s} != "object"`;
			f = p.null ? t : (0, u._)`!${s} || ${t}`, delete p.null, delete p.array, delete p.object;
		} else f = u.nil;
		for (let t in p.number && delete p.integer, p) f = (0, u.and)(f, b(t, s, c, l));
		return f;
	}
	t.checkDataTypes = x;
	var S = {
		message: ({ schema: t }) => `must be ${t}`,
		params: ({ schema: t, schemaValue: s }) => typeof t == "string" ? (0, u._)`{type: ${t}}` : (0, u._)`{type: ${s}}`
	};
	function C(t) {
		let s = w(t);
		(0, l.reportError)(s, S);
	}
	t.reportTypeError = C;
	function w(t) {
		let { gen: s, data: c, schema: l } = t, u = (0, d.schemaRefOrVal)(t, l, "type");
		return {
			gen: s,
			keyword: "type",
			data: c,
			schema: l.type,
			schemaCode: u,
			schemaValue: u,
			parentSchema: l,
			params: {},
			it: t
		};
	}
})), require_defaults = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.assignDefaults = void 0;
	var s = require_codegen(), c = require_util$1();
	function l(t, s) {
		let { properties: c, items: l } = t.schema;
		if (s === "object" && c) for (let s in c) u(t, s, c[s].default);
		else s === "array" && Array.isArray(l) && l.forEach((s, c) => u(t, c, s.default));
	}
	t.assignDefaults = l;
	function u(t, l, u) {
		let { gen: d, compositeRule: f, data: p, opts: m } = t;
		if (u === void 0) return;
		let h = (0, s._)`${p}${(0, s.getProperty)(l)}`;
		if (f) {
			(0, c.checkStrictMode)(t, `default is ignored for: ${h}`);
			return;
		}
		let g = (0, s._)`${h} === undefined`;
		m.useDefaults === "empty" && (g = (0, s._)`${g} || ${h} === null || ${h} === ""`), d.if(g, (0, s._)`${h} = ${(0, s.stringify)(u)}`);
	}
})), require_code = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateUnion = t.validateArray = t.usePattern = t.callValidateCode = t.schemaProperties = t.allSchemaProperties = t.noPropertyInData = t.propertyInData = t.isOwnProperty = t.hasPropFunc = t.reportMissingProp = t.checkMissingProp = t.checkReportMissingProp = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_names(), u = require_util$1();
	function d(t, c) {
		let { gen: l, data: u, it: d } = t;
		l.if(_(l, u, c, d.opts.ownProperties), () => {
			t.setParams({ missingProperty: (0, s._)`${c}` }, !0), t.error();
		});
	}
	t.checkReportMissingProp = d;
	function f({ gen: t, data: c, it: { opts: l } }, u, d) {
		return (0, s.or)(...u.map((u) => (0, s.and)(_(t, c, u, l.ownProperties), (0, s._)`${d} = ${u}`)));
	}
	t.checkMissingProp = f;
	function p(t, s) {
		t.setParams({ missingProperty: s }, !0), t.error();
	}
	t.reportMissingProp = p;
	function m(t) {
		return t.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, s._)`Object.prototype.hasOwnProperty`
		});
	}
	t.hasPropFunc = m;
	function h(t, c, l) {
		return (0, s._)`${m(t)}.call(${c}, ${l})`;
	}
	t.isOwnProperty = h;
	function g(t, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} !== undefined`;
		return u ? (0, s._)`${d} && ${h(t, c, l)}` : d;
	}
	t.propertyInData = g;
	function _(t, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} === undefined`;
		return u ? (0, s.or)(d, (0, s.not)(h(t, c, l))) : d;
	}
	t.noPropertyInData = _;
	function v(t) {
		return t ? Object.keys(t).filter((t) => t !== "__proto__") : [];
	}
	t.allSchemaProperties = v;
	function y(t, s) {
		return v(s).filter((l) => !(0, c.alwaysValidSchema)(t, s[l]));
	}
	t.schemaProperties = y;
	function b({ schemaCode: t, data: c, it: { gen: u, topSchemaRef: d, schemaPath: f, errorPath: p }, it: m }, h, g, _) {
		let v = _ ? (0, s._)`${t}, ${c}, ${d}${f}` : c, y = [
			[l.default.instancePath, (0, s.strConcat)(l.default.instancePath, p)],
			[l.default.parentData, m.parentData],
			[l.default.parentDataProperty, m.parentDataProperty],
			[l.default.rootData, l.default.rootData]
		];
		m.opts.dynamicRef && y.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
		let b = (0, s._)`${v}, ${u.object(...y)}`;
		return g === s.nil ? (0, s._)`${h}(${b})` : (0, s._)`${h}.call(${g}, ${b})`;
	}
	t.callValidateCode = b;
	var x = (0, s._)`new RegExp`;
	function S({ gen: t, it: { opts: c } }, l) {
		let d = c.unicodeRegExp ? "u" : "", { regExp: f } = c.code, p = f(l, d);
		return t.scopeValue("pattern", {
			key: p.toString(),
			ref: p,
			code: (0, s._)`${f.code === "new RegExp" ? x : (0, u.useFunc)(t, f)}(${l}, ${d})`
		});
	}
	t.usePattern = S;
	function C(t) {
		let { gen: l, data: u, keyword: d, it: f } = t, p = l.name("valid");
		if (f.allErrors) {
			let t = l.let("valid", !0);
			return m(() => l.assign(t, !1)), t;
		}
		return l.var(p, !0), m(() => l.break()), p;
		function m(f) {
			let m = l.const("len", (0, s._)`${u}.length`);
			l.forRange("i", 0, m, (u) => {
				t.subschema({
					keyword: d,
					dataProp: u,
					dataPropType: c.Type.Num
				}, p), l.if((0, s.not)(p), f);
			});
		}
	}
	t.validateArray = C;
	function w(t) {
		let { gen: l, schema: u, keyword: d, it: f } = t;
		/* istanbul ignore if */
		if (!Array.isArray(u)) throw Error("ajv implementation error");
		if (u.some((t) => (0, c.alwaysValidSchema)(f, t)) && !f.opts.unevaluated) return;
		let p = l.let("valid", !1), m = l.name("_valid");
		l.block(() => u.forEach((c, u) => {
			let f = t.subschema({
				keyword: d,
				schemaProp: u,
				compositeRule: !0
			}, m);
			l.assign(p, (0, s._)`${p} || ${m}`), t.mergeValidEvaluated(f, m) || l.if((0, s.not)(p));
		})), t.result(p, () => t.reset(), () => t.error(!0));
	}
	t.validateUnion = w;
})), require_keyword = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateKeywordUsage = t.validSchemaType = t.funcKeywordCode = t.macroKeywordCode = void 0;
	var s = require_codegen(), c = require_names(), l = require_code(), u = require_errors$1();
	function d(t, c) {
		let { gen: l, keyword: u, schema: d, parentSchema: f, it: p } = t, m = c.macro.call(p.self, d, f, p), h = g(l, u, m);
		p.opts.validateSchema !== !1 && p.self.validateSchema(m, !0);
		let _ = l.name("valid");
		t.subschema({
			schema: m,
			schemaPath: s.nil,
			errSchemaPath: `${p.errSchemaPath}/${u}`,
			topSchemaRef: h,
			compositeRule: !0
		}, _), t.pass(_, () => t.error(!0));
	}
	t.macroKeywordCode = d;
	function f(t, u) {
		let { gen: d, keyword: f, schema: _, parentSchema: v, $data: y, it: b } = t;
		h(b, u);
		let x = g(d, f, !y && u.compile ? u.compile.call(b.self, _, v, b) : u.validate), S = d.let("valid");
		t.block$data(S, C), t.ok(u.valid ?? S);
		function C() {
			if (u.errors === !1) E(), u.modifying && p(t), D(() => t.error());
			else {
				let s = u.async ? w() : T();
				u.modifying && p(t), D(() => m(t, s));
			}
		}
		function w() {
			let t = d.let("ruleErrs", null);
			return d.try(() => E((0, s._)`await `), (c) => d.assign(S, !1).if((0, s._)`${c} instanceof ${b.ValidationError}`, () => d.assign(t, (0, s._)`${c}.errors`), () => d.throw(c))), t;
		}
		function T() {
			let t = (0, s._)`${x}.errors`;
			return d.assign(t, null), E(s.nil), t;
		}
		function E(f = u.async ? (0, s._)`await ` : s.nil) {
			let p = b.opts.passContext ? c.default.this : c.default.self, m = !("compile" in u && !y || u.schema === !1);
			d.assign(S, (0, s._)`${f}${(0, l.callValidateCode)(t, x, p, m)}`, u.modifying);
		}
		function D(t) {
			d.if((0, s.not)(u.valid ?? S), t);
		}
	}
	t.funcKeywordCode = f;
	function p(t) {
		let { gen: c, data: l, it: u } = t;
		c.if(u.parentData, () => c.assign(l, (0, s._)`${u.parentData}[${u.parentDataProperty}]`));
	}
	function m(t, l) {
		let { gen: d } = t;
		d.if((0, s._)`Array.isArray(${l})`, () => {
			d.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${l} : ${c.default.vErrors}.concat(${l})`).assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`), (0, u.extendErrors)(t);
		}, () => t.error());
	}
	function h({ schemaEnv: t }, s) {
		if (s.async && !t.$async) throw Error("async keyword in sync schema");
	}
	function g(t, c, l) {
		if (l === void 0) throw Error(`keyword "${c}" failed to compile`);
		return t.scopeValue("keyword", typeof l == "function" ? { ref: l } : {
			ref: l,
			code: (0, s.stringify)(l)
		});
	}
	function _(t, s, c = !1) {
		return !s.length || s.some((s) => s === "array" ? Array.isArray(t) : s === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == s || c && t === void 0);
	}
	t.validSchemaType = _;
	function v({ schema: t, opts: s, self: c, errSchemaPath: l }, u, d) {
		/* istanbul ignore if */
		if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d) throw Error("ajv implementation error");
		let f = u.dependencies;
		if (f?.some((s) => !Object.prototype.hasOwnProperty.call(t, s))) throw Error(`parent schema must have dependencies of ${d}: ${f.join(",")}`);
		if (u.validateSchema && !u.validateSchema(t[d])) {
			let t = `keyword "${d}" value is invalid at path "${l}": ` + c.errorsText(u.validateSchema.errors);
			if (s.validateSchema === "log") c.logger.error(t);
			else throw Error(t);
		}
	}
	t.validateKeywordUsage = v;
})), require_subschema = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.extendSubschemaMode = t.extendSubschemaData = t.getSubschema = void 0;
	var s = require_codegen(), c = require_util$1();
	function l(t, { keyword: l, schemaProp: u, schema: d, schemaPath: f, errSchemaPath: p, topSchemaRef: m }) {
		if (l !== void 0 && d !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (l !== void 0) {
			let d = t.schema[l];
			return u === void 0 ? {
				schema: d,
				schemaPath: (0, s._)`${t.schemaPath}${(0, s.getProperty)(l)}`,
				errSchemaPath: `${t.errSchemaPath}/${l}`
			} : {
				schema: d[u],
				schemaPath: (0, s._)`${t.schemaPath}${(0, s.getProperty)(l)}${(0, s.getProperty)(u)}`,
				errSchemaPath: `${t.errSchemaPath}/${l}/${(0, c.escapeFragment)(u)}`
			};
		}
		if (d !== void 0) {
			if (f === void 0 || p === void 0 || m === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: d,
				schemaPath: f,
				topSchemaRef: m,
				errSchemaPath: p
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	t.getSubschema = l;
	function u(t, l, { dataProp: u, dataPropType: d, data: f, dataTypes: p, propertyName: m }) {
		if (f !== void 0 && u !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: h } = l;
		if (u !== void 0) {
			let { errorPath: f, dataPathArr: p, opts: m } = l;
			g(h.let("data", (0, s._)`${l.data}${(0, s.getProperty)(u)}`, !0)), t.errorPath = (0, s.str)`${f}${(0, c.getErrorPath)(u, d, m.jsPropertySyntax)}`, t.parentDataProperty = (0, s._)`${u}`, t.dataPathArr = [...p, t.parentDataProperty];
		}
		f !== void 0 && (g(f instanceof s.Name ? f : h.let("data", f, !0)), m !== void 0 && (t.propertyName = m)), p && (t.dataTypes = p);
		function g(s) {
			t.data = s, t.dataLevel = l.dataLevel + 1, t.dataTypes = [], l.definedProperties = /* @__PURE__ */ new Set(), t.parentData = l.data, t.dataNames = [...l.dataNames, s];
		}
	}
	t.extendSubschemaData = u;
	function d(t, { jtdDiscriminator: s, jtdMetadata: c, compositeRule: l, createErrors: u, allErrors: d }) {
		l !== void 0 && (t.compositeRule = l), u !== void 0 && (t.createErrors = u), d !== void 0 && (t.allErrors = d), t.jtdDiscriminator = s, t.jtdMetadata = c;
	}
	t.extendSubschemaMode = d;
})), require_json_schema_traverse = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = s.exports = function(t, s, c) {
		typeof s == "function" && (c = s, s = {}), c = s.cb || c;
		var u = typeof c == "function" ? c : c.pre || function() {}, d = c.post || function() {};
		l(s, u, d, t, "", t);
	};
	c.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, c.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, c.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, c.skipKeywords = {
		default: !0,
		enum: !0,
		const: !0,
		required: !0,
		maximum: !0,
		minimum: !0,
		exclusiveMaximum: !0,
		exclusiveMinimum: !0,
		multipleOf: !0,
		maxLength: !0,
		minLength: !0,
		pattern: !0,
		format: !0,
		maxItems: !0,
		minItems: !0,
		uniqueItems: !0,
		maxProperties: !0,
		minProperties: !0
	};
	function l(t, s, d, f, p, m, h, g, _, v) {
		if (f && typeof f == "object" && !Array.isArray(f)) {
			for (var y in s(f, p, m, h, g, _, v), f) {
				var b = f[y];
				if (Array.isArray(b)) {
					if (y in c.arrayKeywords) for (var x = 0; x < b.length; x++) l(t, s, d, b[x], p + "/" + y + "/" + x, m, p, y, f, x);
				} else if (y in c.propsKeywords) {
					if (b && typeof b == "object") for (var S in b) l(t, s, d, b[S], p + "/" + y + "/" + u(S), m, p, y, f, S);
				} else (y in c.keywords || t.allKeys && !(y in c.skipKeywords)) && l(t, s, d, b, p + "/" + y, m, p, y, f);
			}
			d(f, p, m, h, g, _, v);
		}
	}
	function u(t) {
		return t.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getSchemaRefs = t.resolveUrl = t.normalizeId = t._getFullPath = t.getFullPath = t.inlineRef = void 0;
	var s = require_util$1(), c = require_fast_deep_equal(), l = require_json_schema_traverse(), u = new Set([
		"type",
		"format",
		"pattern",
		"maxLength",
		"minLength",
		"maxProperties",
		"minProperties",
		"maxItems",
		"minItems",
		"maximum",
		"minimum",
		"uniqueItems",
		"multipleOf",
		"required",
		"enum",
		"const"
	]);
	function d(t, s = !0) {
		return typeof t == "boolean" ? !0 : s === !0 ? !p(t) : s ? m(t) <= s : !1;
	}
	t.inlineRef = d;
	var f = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function p(t) {
		for (let s in t) {
			if (f.has(s)) return !0;
			let c = t[s];
			if (Array.isArray(c) && c.some(p) || typeof c == "object" && p(c)) return !0;
		}
		return !1;
	}
	function m(t) {
		let c = 0;
		for (let l in t) if (l === "$ref" || (c++, !u.has(l) && (typeof t[l] == "object" && (0, s.eachItem)(t[l], (t) => c += m(t)), c === Infinity))) return Infinity;
		return c;
	}
	function h(t, s = "", c) {
		return c !== !1 && (s = v(s)), g(t, t.parse(s));
	}
	t.getFullPath = h;
	function g(t, s) {
		return t.serialize(s).split("#")[0] + "#";
	}
	t._getFullPath = g;
	var _ = /#\/?$/;
	function v(t) {
		return t ? t.replace(_, "") : "";
	}
	t.normalizeId = v;
	function y(t, s, c) {
		return c = v(c), t.resolve(s, c);
	}
	t.resolveUrl = y;
	var b = /^[a-z_][-a-z0-9._]*$/i;
	function x(t, s) {
		if (typeof t == "boolean") return {};
		let { schemaId: u, uriResolver: d } = this.opts, f = v(t[u] || s), p = { "": f }, m = h(d, f, !1), g = {}, _ = /* @__PURE__ */ new Set();
		return l(t, { allKeys: !0 }, (t, s, c, l) => {
			if (l === void 0) return;
			let d = m + s, f = p[l];
			typeof t[u] == "string" && (f = h.call(this, t[u])), S.call(this, t.$anchor), S.call(this, t.$dynamicAnchor), p[s] = f;
			function h(s) {
				let c = this.opts.uriResolver.resolve;
				if (s = v(f ? c(f, s) : s), _.has(s)) throw x(s);
				_.add(s);
				let l = this.refs[s];
				return typeof l == "string" && (l = this.refs[l]), typeof l == "object" ? y(t, l.schema, s) : s !== v(d) && (s[0] === "#" ? (y(t, g[s], s), g[s] = t) : this.refs[s] = d), s;
			}
			function S(t) {
				if (typeof t == "string") {
					if (!b.test(t)) throw Error(`invalid anchor "${t}"`);
					h.call(this, `#${t}`);
				}
			}
		}), g;
		function y(t, s, l) {
			if (s !== void 0 && !c(t, s)) throw x(l);
		}
		function x(t) {
			return /* @__PURE__ */ Error(`reference "${t}" resolves to more than one schema`);
		}
	}
	t.getSchemaRefs = x;
})), require_validate = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.getData = t.KeywordCxt = t.validateFunctionCode = void 0;
	var s = require_boolSchema(), c = require_dataType(), l = require_applicability(), u = require_dataType(), d = require_defaults(), f = require_keyword(), p = require_subschema(), m = require_codegen(), h = require_names(), g = require_resolve(), _ = require_util$1(), v = require_errors$1();
	function y(t) {
		if (O(t) && (A(t), D(t))) {
			C(t);
			return;
		}
		b(t, () => (0, s.topBoolOrEmptySchema)(t));
	}
	t.validateFunctionCode = y;
	function b({ gen: t, validateName: s, schema: c, schemaEnv: l, opts: u }, d) {
		u.code.es5 ? t.func(s, (0, m._)`${h.default.data}, ${h.default.valCxt}`, l.$async, () => {
			t.code((0, m._)`"use strict"; ${T(c, u)}`), S(t, u), t.code(d);
		}) : t.func(s, (0, m._)`${h.default.data}, ${x(u)}`, l.$async, () => t.code(T(c, u)).code(d));
	}
	function x(t) {
		return (0, m._)`{${h.default.instancePath}="", ${h.default.parentData}, ${h.default.parentDataProperty}, ${h.default.rootData}=${h.default.data}${t.dynamicRef ? (0, m._)`, ${h.default.dynamicAnchors}={}` : m.nil}}={}`;
	}
	function S(t, s) {
		t.if(h.default.valCxt, () => {
			t.var(h.default.instancePath, (0, m._)`${h.default.valCxt}.${h.default.instancePath}`), t.var(h.default.parentData, (0, m._)`${h.default.valCxt}.${h.default.parentData}`), t.var(h.default.parentDataProperty, (0, m._)`${h.default.valCxt}.${h.default.parentDataProperty}`), t.var(h.default.rootData, (0, m._)`${h.default.valCxt}.${h.default.rootData}`), s.dynamicRef && t.var(h.default.dynamicAnchors, (0, m._)`${h.default.valCxt}.${h.default.dynamicAnchors}`);
		}, () => {
			t.var(h.default.instancePath, (0, m._)`""`), t.var(h.default.parentData, (0, m._)`undefined`), t.var(h.default.parentDataProperty, (0, m._)`undefined`), t.var(h.default.rootData, h.default.data), s.dynamicRef && t.var(h.default.dynamicAnchors, (0, m._)`{}`);
		});
	}
	function C(t) {
		let { schema: s, opts: c, gen: l } = t;
		b(t, () => {
			c.$comment && s.$comment && I(t), N(t), l.let(h.default.vErrors, null), l.let(h.default.errors, 0), c.unevaluated && w(t), j(t), L(t);
		});
	}
	function w(t) {
		let { gen: s, validateName: c } = t;
		t.evaluated = s.const("evaluated", (0, m._)`${c}.evaluated`), s.if((0, m._)`${t.evaluated}.dynamicProps`, () => s.assign((0, m._)`${t.evaluated}.props`, (0, m._)`undefined`)), s.if((0, m._)`${t.evaluated}.dynamicItems`, () => s.assign((0, m._)`${t.evaluated}.items`, (0, m._)`undefined`));
	}
	function T(t, s) {
		let c = typeof t == "object" && t[s.schemaId];
		return c && (s.code.source || s.code.process) ? (0, m._)`/*# sourceURL=${c} */` : m.nil;
	}
	function E(t, c) {
		if (O(t) && (A(t), D(t))) {
			k(t, c);
			return;
		}
		(0, s.boolOrEmptySchema)(t, c);
	}
	function D({ schema: t, self: s }) {
		if (typeof t == "boolean") return !t;
		for (let c in t) if (s.RULES.all[c]) return !0;
		return !1;
	}
	function O(t) {
		return typeof t.schema != "boolean";
	}
	function k(t, s) {
		let { schema: c, gen: l, opts: u } = t;
		u.$comment && c.$comment && I(t), P(t), F(t);
		let d = l.const("_errs", h.default.errors);
		j(t, d), l.var(s, (0, m._)`${d} === ${h.default.errors}`);
	}
	function A(t) {
		(0, _.checkUnknownRules)(t), M(t);
	}
	function j(t, s) {
		if (t.opts.jtd) return z(t, [], !1, s);
		let l = (0, c.getSchemaTypes)(t.schema);
		z(t, l, !(0, c.coerceAndCheckDataType)(t, l), s);
	}
	function M(t) {
		let { schema: s, errSchemaPath: c, opts: l, self: u } = t;
		s.$ref && l.ignoreKeywordsWithRef && (0, _.schemaHasRulesButRef)(s, u.RULES) && u.logger.warn(`$ref: keywords ignored in schema at path "${c}"`);
	}
	function N(t) {
		let { schema: s, opts: c } = t;
		s.default !== void 0 && c.useDefaults && c.strictSchema && (0, _.checkStrictMode)(t, "default is ignored in the schema root");
	}
	function P(t) {
		let s = t.schema[t.opts.schemaId];
		s && (t.baseId = (0, g.resolveUrl)(t.opts.uriResolver, t.baseId, s));
	}
	function F(t) {
		if (t.schema.$async && !t.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function I({ gen: t, schemaEnv: s, schema: c, errSchemaPath: l, opts: u }) {
		let d = c.$comment;
		if (u.$comment === !0) t.code((0, m._)`${h.default.self}.logger.log(${d})`);
		else if (typeof u.$comment == "function") {
			let c = (0, m.str)`${l}/$comment`, u = t.scopeValue("root", { ref: s.root });
			t.code((0, m._)`${h.default.self}.opts.$comment(${d}, ${c}, ${u}.schema)`);
		}
	}
	function L(t) {
		let { gen: s, schemaEnv: c, validateName: l, ValidationError: u, opts: d } = t;
		c.$async ? s.if((0, m._)`${h.default.errors} === 0`, () => s.return(h.default.data), () => s.throw((0, m._)`new ${u}(${h.default.vErrors})`)) : (s.assign((0, m._)`${l}.errors`, h.default.vErrors), d.unevaluated && R(t), s.return((0, m._)`${h.default.errors} === 0`));
	}
	function R({ gen: t, evaluated: s, props: c, items: l }) {
		c instanceof m.Name && t.assign((0, m._)`${s}.props`, c), l instanceof m.Name && t.assign((0, m._)`${s}.items`, l);
	}
	function z(t, s, c, d) {
		let { gen: f, schema: p, data: g, allErrors: v, opts: y, self: b } = t, { RULES: x } = b;
		if (p.$ref && (y.ignoreKeywordsWithRef || !(0, _.schemaHasRulesButRef)(p, x))) {
			f.block(() => X(t, "$ref", x.all.$ref.definition));
			return;
		}
		y.jtd || V(t, s), f.block(() => {
			for (let t of x.rules) S(t);
			S(x.post);
		});
		function S(_) {
			(0, l.shouldUseGroup)(p, _) && (_.type ? (f.if((0, u.checkDataType)(_.type, g, y.strictNumbers)), B(t, _), s.length === 1 && s[0] === _.type && c && (f.else(), (0, u.reportTypeError)(t)), f.endIf()) : B(t, _), v || f.if((0, m._)`${h.default.errors} === ${d || 0}`));
		}
	}
	function B(t, s) {
		let { gen: c, schema: u, opts: { useDefaults: f } } = t;
		f && (0, d.assignDefaults)(t, s.type), c.block(() => {
			for (let c of s.rules) (0, l.shouldUseRule)(u, c) && X(t, c.keyword, c.definition, s.type);
		});
	}
	function V(t, s) {
		t.schemaEnv.meta || !t.opts.strictTypes || (H(t, s), t.opts.allowUnionTypes || U(t, s), W(t, t.dataTypes));
	}
	function H(t, s) {
		if (s.length) {
			if (!t.dataTypes.length) {
				t.dataTypes = s;
				return;
			}
			s.forEach((s) => {
				K(t.dataTypes, s) || J(t, `type "${s}" not allowed by context "${t.dataTypes.join(",")}"`);
			}), q(t, s);
		}
	}
	function U(t, s) {
		s.length > 1 && !(s.length === 2 && s.includes("null")) && J(t, "use allowUnionTypes to allow union type keyword");
	}
	function W(t, s) {
		let c = t.self.RULES.all;
		for (let u in c) {
			let d = c[u];
			if (typeof d == "object" && (0, l.shouldUseRule)(t.schema, d)) {
				let { type: c } = d.definition;
				c.length && !c.some((t) => G(s, t)) && J(t, `missing type "${c.join(",")}" for keyword "${u}"`);
			}
		}
	}
	function G(t, s) {
		return t.includes(s) || s === "number" && t.includes("integer");
	}
	function K(t, s) {
		return t.includes(s) || s === "integer" && t.includes("number");
	}
	function q(t, s) {
		let c = [];
		for (let l of t.dataTypes) K(s, l) ? c.push(l) : s.includes("integer") && l === "number" && c.push("integer");
		t.dataTypes = c;
	}
	function J(t, s) {
		let c = t.schemaEnv.baseId + t.errSchemaPath;
		s += ` at "${c}" (strictTypes)`, (0, _.checkStrictMode)(t, s, t.opts.strictTypes);
	}
	var Y = class {
		constructor(t, s, c) {
			if ((0, f.validateKeywordUsage)(t, s, c), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = c, this.data = t.data, this.schema = t.schema[c], this.$data = s.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _.schemaRefOrVal)(t, this.schema, c, this.$data), this.schemaType = s.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = s, this.$data) this.schemaCode = t.gen.const("vSchema", $(this.$data, t));
			else if (this.schemaCode = this.schemaValue, !(0, f.validSchemaType)(this.schema, s.schemaType, s.allowUndefined)) throw Error(`${c} value must be ${JSON.stringify(s.schemaType)}`);
			("code" in s ? s.trackErrors : s.errors !== !1) && (this.errsCount = t.gen.const("_errs", h.default.errors));
		}
		result(t, s, c) {
			this.failResult((0, m.not)(t), s, c);
		}
		failResult(t, s, c) {
			this.gen.if(t), c ? c() : this.error(), s ? (this.gen.else(), s(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(t, s) {
			this.failResult((0, m.not)(t), void 0, s);
		}
		fail(t) {
			if (t === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(t) {
			if (!this.$data) return this.fail(t);
			let { schemaCode: s } = this;
			this.fail((0, m._)`${s} !== undefined && (${(0, m.or)(this.invalid$data(), t)})`);
		}
		error(t, s, c) {
			if (s) {
				this.setParams(s), this._error(t, c), this.setParams({});
				return;
			}
			this._error(t, c);
		}
		_error(t, s) {
			(t ? v.reportExtraError : v.reportError)(this, this.def.error, s);
		}
		$dataError() {
			(0, v.reportError)(this, this.def.$dataError || v.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, v.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(t) {
			this.allErrors || this.gen.if(t);
		}
		setParams(t, s) {
			s ? Object.assign(this.params, t) : this.params = t;
		}
		block$data(t, s, c = m.nil) {
			this.gen.block(() => {
				this.check$data(t, c), s();
			});
		}
		check$data(t = m.nil, s = m.nil) {
			if (!this.$data) return;
			let { gen: c, schemaCode: l, schemaType: u, def: d } = this;
			c.if((0, m.or)((0, m._)`${l} === undefined`, s)), t !== m.nil && c.assign(t, !0), (u.length || d.validateSchema) && (c.elseIf(this.invalid$data()), this.$dataError(), t !== m.nil && c.assign(t, !1)), c.else();
		}
		invalid$data() {
			let { gen: t, schemaCode: s, schemaType: c, def: l, it: d } = this;
			return (0, m.or)(f(), p());
			function f() {
				if (c.length) {
					/* istanbul ignore if */
					if (!(s instanceof m.Name)) throw Error("ajv implementation error");
					let t = Array.isArray(c) ? c : [c];
					return (0, m._)`${(0, u.checkDataTypes)(t, s, d.opts.strictNumbers, u.DataType.Wrong)}`;
				}
				return m.nil;
			}
			function p() {
				if (l.validateSchema) {
					let c = t.scopeValue("validate$data", { ref: l.validateSchema });
					return (0, m._)`!${c}(${s})`;
				}
				return m.nil;
			}
		}
		subschema(t, s) {
			let c = (0, p.getSubschema)(this.it, t);
			(0, p.extendSubschemaData)(c, this.it, t), (0, p.extendSubschemaMode)(c, t);
			let l = {
				...this.it,
				...c,
				items: void 0,
				props: void 0
			};
			return E(l, s), l;
		}
		mergeEvaluated(t, s) {
			let { it: c, gen: l } = this;
			c.opts.unevaluated && (c.props !== !0 && t.props !== void 0 && (c.props = _.mergeEvaluated.props(l, t.props, c.props, s)), c.items !== !0 && t.items !== void 0 && (c.items = _.mergeEvaluated.items(l, t.items, c.items, s)));
		}
		mergeValidEvaluated(t, s) {
			let { it: c, gen: l } = this;
			if (c.opts.unevaluated && (c.props !== !0 || c.items !== !0)) return l.if(s, () => this.mergeEvaluated(t, m.Name)), !0;
		}
	};
	t.KeywordCxt = Y;
	function X(t, s, c, l) {
		let u = new Y(t, c, s);
		"code" in c ? c.code(u, l) : u.$data && c.validate ? (0, f.funcKeywordCode)(u, c) : "macro" in c ? (0, f.macroKeywordCode)(u, c) : (c.compile || c.validate) && (0, f.funcKeywordCode)(u, c);
	}
	var Z = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function $(t, { dataLevel: s, dataNames: c, dataPathArr: l }) {
		let u, d;
		if (t === "") return h.default.rootData;
		if (t[0] === "/") {
			if (!Z.test(t)) throw Error(`Invalid JSON-pointer: ${t}`);
			u = t, d = h.default.rootData;
		} else {
			let f = Q.exec(t);
			if (!f) throw Error(`Invalid JSON-pointer: ${t}`);
			let p = +f[1];
			if (u = f[2], u === "#") {
				if (p >= s) throw Error(g("property/index", p));
				return l[s - p];
			}
			if (p > s) throw Error(g("data", p));
			if (d = c[s - p], !u) return d;
		}
		let f = d, p = u.split("/");
		for (let t of p) t && (d = (0, m._)`${d}${(0, m.getProperty)((0, _.unescapeJsonPointer)(t))}`, f = (0, m._)`${f} && ${d}`);
		return f;
		function g(t, c) {
			return `Cannot access ${t} ${c} levels up, current level is ${s}`;
		}
	}
	t.getData = $;
})), require_validation_error = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = class extends Error {
		constructor(t) {
			super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_resolve();
	t.default = class extends Error {
		constructor(t, c, l, u) {
			super(u || `can't resolve reference ${l} from id ${c}`), this.missingRef = (0, s.resolveUrl)(t, c, l), this.missingSchema = (0, s.normalizeId)((0, s.getFullPath)(t, this.missingRef));
		}
	};
})), require_compile = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.resolveSchema = t.getCompilingSchema = t.resolveRef = t.compileSchema = t.SchemaEnv = void 0;
	var s = require_codegen(), c = require_validation_error(), l = require_names(), u = require_resolve(), d = require_util$1(), f = require_validate(), p = class {
		constructor(t) {
			this.refs = {}, this.dynamicAnchors = {};
			let s;
			typeof t.schema == "object" && (s = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = t.baseId ?? (0, u.normalizeId)(s?.[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = s?.$async, this.refs = {};
		}
	};
	t.SchemaEnv = p;
	function m(t) {
		let d = _.call(this, t);
		if (d) return d;
		let p = (0, u.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: m, lines: h } = this.opts.code, { ownProperties: g } = this.opts, v = new s.CodeGen(this.scope, {
			es5: m,
			lines: h,
			ownProperties: g
		}), y;
		t.$async && (y = v.scopeValue("Error", {
			ref: c.default,
			code: (0, s._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let b = v.scopeName("validate");
		t.validateName = b;
		let x = {
			gen: v,
			allErrors: this.opts.allErrors,
			data: l.default.data,
			parentData: l.default.parentData,
			parentDataProperty: l.default.parentDataProperty,
			dataNames: [l.default.data],
			dataPathArr: [s.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: v.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: t.schema,
				code: (0, s.stringify)(t.schema)
			} : { ref: t.schema }),
			validateName: b,
			ValidationError: y,
			schema: t.schema,
			schemaEnv: t,
			rootId: p,
			baseId: t.baseId || p,
			schemaPath: s.nil,
			errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, s._)`""`,
			opts: this.opts,
			self: this
		}, S;
		try {
			this._compilations.add(t), (0, f.validateFunctionCode)(x), v.optimize(this.opts.code.optimize);
			let c = v.toString();
			S = `${v.scopeRefs(l.default.scope)}return ${c}`, this.opts.code.process && (S = this.opts.code.process(S, t));
			let u = Function(`${l.default.self}`, `${l.default.scope}`, S)(this, this.scope.get());
			if (this.scope.value(b, { ref: u }), u.errors = null, u.schema = t.schema, u.schemaEnv = t, t.$async && (u.$async = !0), this.opts.code.source === !0 && (u.source = {
				validateName: b,
				validateCode: c,
				scopeValues: v._values
			}), this.opts.unevaluated) {
				let { props: t, items: c } = x;
				u.evaluated = {
					props: t instanceof s.Name ? void 0 : t,
					items: c instanceof s.Name ? void 0 : c,
					dynamicProps: t instanceof s.Name,
					dynamicItems: c instanceof s.Name
				}, u.source && (u.source.evaluated = (0, s.stringify)(u.evaluated));
			}
			return t.validate = u, t;
		} catch (s) {
			throw delete t.validate, delete t.validateName, S && this.logger.error("Error compiling schema, function code:", S), s;
		} finally {
			this._compilations.delete(t);
		}
	}
	t.compileSchema = m;
	function h(t, s, c) {
		c = (0, u.resolveUrl)(this.opts.uriResolver, s, c);
		let l = t.refs[c];
		if (l) return l;
		let d = y.call(this, t, c);
		if (d === void 0) {
			let l = t.localRefs?.[c], { schemaId: u } = this.opts;
			l && (d = new p({
				schema: l,
				schemaId: u,
				root: t,
				baseId: s
			}));
		}
		if (d !== void 0) return t.refs[c] = g.call(this, d);
	}
	t.resolveRef = h;
	function g(t) {
		return (0, u.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : m.call(this, t);
	}
	function _(t) {
		for (let s of this._compilations) if (v(s, t)) return s;
	}
	t.getCompilingSchema = _;
	function v(t, s) {
		return t.schema === s.schema && t.root === s.root && t.baseId === s.baseId;
	}
	function y(t, s) {
		let c;
		for (; typeof (c = this.refs[s]) == "string";) s = c;
		return c || this.schemas[s] || b.call(this, t, s);
	}
	function b(t, s) {
		let c = this.opts.uriResolver.parse(s), l = (0, u._getFullPath)(this.opts.uriResolver, c), d = (0, u.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
		if (Object.keys(t.schema).length > 0 && l === d) return S.call(this, c, t);
		let f = (0, u.normalizeId)(l), h = this.refs[f] || this.schemas[f];
		if (typeof h == "string") {
			let s = b.call(this, t, h);
			return typeof s?.schema == "object" ? S.call(this, c, s) : void 0;
		}
		if (typeof h?.schema == "object") {
			if (h.validate || m.call(this, h), f === (0, u.normalizeId)(s)) {
				let { schema: s } = h, { schemaId: c } = this.opts, l = s[c];
				return l && (d = (0, u.resolveUrl)(this.opts.uriResolver, d, l)), new p({
					schema: s,
					schemaId: c,
					root: t,
					baseId: d
				});
			}
			return S.call(this, c, h);
		}
	}
	t.resolveSchema = b;
	var x = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function S(t, { baseId: s, schema: c, root: l }) {
		if (t.fragment?.[0] !== "/") return;
		for (let l of t.fragment.slice(1).split("/")) {
			if (typeof c == "boolean") return;
			let t = c[(0, d.unescapeFragment)(l)];
			if (t === void 0) return;
			c = t;
			let f = typeof c == "object" && c[this.opts.schemaId];
			!x.has(l) && f && (s = (0, u.resolveUrl)(this.opts.uriResolver, s, f));
		}
		let f;
		if (typeof c != "boolean" && c.$ref && !(0, d.schemaHasRulesButRef)(c, this.RULES)) {
			let t = (0, u.resolveUrl)(this.opts.uriResolver, s, c.$ref);
			f = b.call(this, l, t);
		}
		let { schemaId: m } = this.opts;
		if (f ||= new p({
			schema: c,
			schemaId: m,
			root: l,
			baseId: s
		}), f.schema !== f.root.schema) return f;
	}
})), data_exports = /* @__PURE__ */ __export({
	$id: () => $id$1,
	additionalProperties: () => !1,
	default: () => data_default,
	description: () => description,
	properties: () => properties$1,
	required: () => required,
	type: () => type$1
}, 1), $id$1, description, type$1, required, properties$1, data_default, init_data = __esmMin((() => {
	$id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$1 = "object", required = ["$data"], properties$1 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default = {
		$id: $id$1,
		description,
		type: type$1,
		required,
		properties: properties$1,
		additionalProperties: !1
	};
})), require_uri = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_fast_uri();
	s.code = "require(\"ajv/dist/runtime/uri\").default", t.default = s;
})), require_core$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
	var s = require_validate();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return s.KeywordCxt;
		}
	});
	var c = require_codegen();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return c._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return c.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return c.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return c.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return c.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return c.CodeGen;
		}
	});
	var l = require_validation_error(), u = require_ref_error(), d = require_rules(), f = require_compile(), p = require_codegen(), m = require_resolve(), h = require_dataType(), g = require_util$1(), _ = (init_data(), __toCommonJS(data_exports).default), v = require_uri(), y = (t, s) => new RegExp(t, s);
	y.code = "new RegExp";
	var b = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], x = new Set([
		"validate",
		"serialize",
		"parse",
		"wrapper",
		"root",
		"schema",
		"keyword",
		"pattern",
		"formats",
		"validate$data",
		"func",
		"obj",
		"Error"
	]), S = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, C = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, w = 200;
	function T(t) {
		let s = t.strict, c = t.code?.optimize, l = c === !0 || c === void 0 ? 1 : c || 0, u = t.code?.regExp ?? y, d = t.uriResolver ?? v.default;
		return {
			strictSchema: t.strictSchema ?? s ?? !0,
			strictNumbers: t.strictNumbers ?? s ?? !0,
			strictTypes: t.strictTypes ?? s ?? "log",
			strictTuples: t.strictTuples ?? s ?? "log",
			strictRequired: t.strictRequired ?? s ?? !1,
			code: t.code ? {
				...t.code,
				optimize: l,
				regExp: u
			} : {
				optimize: l,
				regExp: u
			},
			loopRequired: t.loopRequired ?? w,
			loopEnum: t.loopEnum ?? w,
			meta: t.meta ?? !0,
			messages: t.messages ?? !0,
			inlineRefs: t.inlineRefs ?? !0,
			schemaId: t.schemaId ?? "$id",
			addUsedSchema: t.addUsedSchema ?? !0,
			validateSchema: t.validateSchema ?? !0,
			validateFormats: t.validateFormats ?? !0,
			unicodeRegExp: t.unicodeRegExp ?? !0,
			int32range: t.int32range ?? !0,
			uriResolver: d
		};
	}
	var E = class {
		constructor(t = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), t = this.opts = {
				...t,
				...T(t)
			};
			let { es5: s, lines: c } = this.opts.code;
			this.scope = new p.ValueScope({
				scope: {},
				prefixes: x,
				es5: s,
				lines: c
			}), this.logger = F(t.logger);
			let l = t.validateFormats;
			t.validateFormats = !1, this.RULES = (0, d.getRules)(), D.call(this, S, t, "NOT SUPPORTED"), D.call(this, C, t, "DEPRECATED", "warn"), this._metaOpts = N.call(this), t.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), t.keywords && j.call(this, t.keywords), typeof t.meta == "object" && this.addMetaSchema(t.meta), k.call(this), t.validateFormats = l;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: t, meta: s, schemaId: c } = this.opts, l = _;
			c === "id" && (l = { ..._ }, l.id = l.$id, delete l.$id), s && t && this.addMetaSchema(l, l[c], !1);
		}
		defaultMeta() {
			let { meta: t, schemaId: s } = this.opts;
			return this.opts.defaultMeta = typeof t == "object" ? t[s] || t : void 0;
		}
		validate(t, s) {
			let c;
			if (typeof t == "string") {
				if (c = this.getSchema(t), !c) throw Error(`no schema with key or ref "${t}"`);
			} else c = this.compile(t);
			let l = c(s);
			return "$async" in c || (this.errors = c.errors), l;
		}
		compile(t, s) {
			let c = this._addSchema(t, s);
			return c.validate || this._compileSchemaEnv(c);
		}
		compileAsync(t, s) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: c } = this.opts;
			return l.call(this, t, s);
			async function l(t, s) {
				await d.call(this, t.$schema);
				let c = this._addSchema(t, s);
				return c.validate || f.call(this, c);
			}
			async function d(t) {
				t && !this.getSchema(t) && await l.call(this, { $ref: t }, !0);
			}
			async function f(t) {
				try {
					return this._compileSchemaEnv(t);
				} catch (s) {
					if (!(s instanceof u.default)) throw s;
					return p.call(this, s), await m.call(this, s.missingSchema), f.call(this, t);
				}
			}
			function p({ missingSchema: t, missingRef: s }) {
				if (this.refs[t]) throw Error(`AnySchema ${t} is loaded but ${s} cannot be resolved`);
			}
			async function m(t) {
				let c = await h.call(this, t);
				this.refs[t] || await d.call(this, c.$schema), this.refs[t] || this.addSchema(c, t, s);
			}
			async function h(t) {
				let s = this._loading[t];
				if (s) return s;
				try {
					return await (this._loading[t] = c(t));
				} finally {
					delete this._loading[t];
				}
			}
		}
		addSchema(t, s, c, l = this.opts.validateSchema) {
			if (Array.isArray(t)) {
				for (let s of t) this.addSchema(s, void 0, c, l);
				return this;
			}
			let u;
			if (typeof t == "object") {
				let { schemaId: s } = this.opts;
				if (u = t[s], u !== void 0 && typeof u != "string") throw Error(`schema ${s} must be string`);
			}
			return s = (0, m.normalizeId)(s || u), this._checkUnique(s), this.schemas[s] = this._addSchema(t, c, s, l, !0), this;
		}
		addMetaSchema(t, s, c = this.opts.validateSchema) {
			return this.addSchema(t, s, !0, c), this;
		}
		validateSchema(t, s) {
			if (typeof t == "boolean") return !0;
			let c;
			if (c = t.$schema, c !== void 0 && typeof c != "string") throw Error("$schema must be a string");
			if (c = c || this.opts.defaultMeta || this.defaultMeta(), !c) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let l = this.validate(c, t);
			if (!l && s) {
				let t = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(t);
				else throw Error(t);
			}
			return l;
		}
		getSchema(t) {
			let s;
			for (; typeof (s = O.call(this, t)) == "string";) t = s;
			if (s === void 0) {
				let { schemaId: c } = this.opts, l = new f.SchemaEnv({
					schema: {},
					schemaId: c
				});
				if (s = f.resolveSchema.call(this, l, t), !s) return;
				this.refs[t] = s;
			}
			return s.validate || this._compileSchemaEnv(s);
		}
		removeSchema(t) {
			if (t instanceof RegExp) return this._removeAllSchemas(this.schemas, t), this._removeAllSchemas(this.refs, t), this;
			switch (typeof t) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let s = O.call(this, t);
					return typeof s == "object" && this._cache.delete(s.schema), delete this.schemas[t], delete this.refs[t], this;
				}
				case "object": {
					let s = t;
					this._cache.delete(s);
					let c = t[this.opts.schemaId];
					return c && (c = (0, m.normalizeId)(c), delete this.schemas[c], delete this.refs[c]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(t) {
			for (let s of t) this.addKeyword(s);
			return this;
		}
		addKeyword(t, s) {
			let c;
			if (typeof t == "string") c = t, typeof s == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), s.keyword = c);
			else if (typeof t == "object" && s === void 0) {
				if (s = t, c = s.keyword, Array.isArray(c) && !c.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (L.call(this, c, s), !s) return (0, g.eachItem)(c, (t) => R.call(this, t)), this;
			B.call(this, s);
			let l = {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			};
			return (0, g.eachItem)(c, l.type.length === 0 ? (t) => R.call(this, t, l) : (t) => l.type.forEach((s) => R.call(this, t, l, s))), this;
		}
		getKeyword(t) {
			let s = this.RULES.all[t];
			return typeof s == "object" ? s.definition : !!s;
		}
		removeKeyword(t) {
			let { RULES: s } = this;
			delete s.keywords[t], delete s.all[t];
			for (let c of s.rules) {
				let s = c.rules.findIndex((s) => s.keyword === t);
				s >= 0 && c.rules.splice(s, 1);
			}
			return this;
		}
		addFormat(t, s) {
			return typeof s == "string" && (s = new RegExp(s)), this.formats[t] = s, this;
		}
		errorsText(t = this.errors, { separator: s = ", ", dataVar: c = "data" } = {}) {
			return !t || t.length === 0 ? "No errors" : t.map((t) => `${c}${t.instancePath} ${t.message}`).reduce((t, c) => t + s + c);
		}
		$dataMetaSchema(t, s) {
			let c = this.RULES.all;
			t = JSON.parse(JSON.stringify(t));
			for (let l of s) {
				let s = l.split("/").slice(1), u = t;
				for (let t of s) u = u[t];
				for (let t in c) {
					let s = c[t];
					if (typeof s != "object") continue;
					let { $data: l } = s.definition, d = u[t];
					l && d && (u[t] = H(d));
				}
			}
			return t;
		}
		_removeAllSchemas(t, s) {
			for (let c in t) {
				let l = t[c];
				(!s || s.test(c)) && (typeof l == "string" ? delete t[c] : l && !l.meta && (this._cache.delete(l.schema), delete t[c]));
			}
		}
		_addSchema(t, s, c, l = this.opts.validateSchema, u = this.opts.addUsedSchema) {
			let d, { schemaId: p } = this.opts;
			if (typeof t == "object") d = t[p];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof t != "boolean") throw Error("schema must be object or boolean");
			let h = this._cache.get(t);
			if (h !== void 0) return h;
			c = (0, m.normalizeId)(d || c);
			let g = m.getSchemaRefs.call(this, t, c);
			return h = new f.SchemaEnv({
				schema: t,
				schemaId: p,
				meta: s,
				baseId: c,
				localRefs: g
			}), this._cache.set(h.schema, h), u && !c.startsWith("#") && (c && this._checkUnique(c), this.refs[c] = h), l && this.validateSchema(t, !0), h;
		}
		_checkUnique(t) {
			if (this.schemas[t] || this.refs[t]) throw Error(`schema with key or id "${t}" already exists`);
		}
		_compileSchemaEnv(t) {
			/* istanbul ignore if */
			if (t.meta ? this._compileMetaSchema(t) : f.compileSchema.call(this, t), !t.validate) throw Error("ajv implementation error");
			return t.validate;
		}
		_compileMetaSchema(t) {
			let s = this.opts;
			this.opts = this._metaOpts;
			try {
				f.compileSchema.call(this, t);
			} finally {
				this.opts = s;
			}
		}
	};
	E.ValidationError = l.default, E.MissingRefError = u.default, t.default = E;
	function D(t, s, c, l = "error") {
		for (let u in t) {
			let d = u;
			d in s && this.logger[l](`${c}: option ${u}. ${t[d]}`);
		}
	}
	function O(t) {
		return t = (0, m.normalizeId)(t), this.schemas[t] || this.refs[t];
	}
	function k() {
		let t = this.opts.schemas;
		if (t) if (Array.isArray(t)) this.addSchema(t);
		else for (let s in t) this.addSchema(t[s], s);
	}
	function A() {
		for (let t in this.opts.formats) {
			let s = this.opts.formats[t];
			s && this.addFormat(t, s);
		}
	}
	function j(t) {
		if (Array.isArray(t)) {
			this.addVocabulary(t);
			return;
		}
		for (let s in this.logger.warn("keywords option as map is deprecated, pass array"), t) {
			let c = t[s];
			c.keyword ||= s, this.addKeyword(c);
		}
	}
	function N() {
		let t = { ...this.opts };
		for (let s of b) delete t[s];
		return t;
	}
	var P = {
		log() {},
		warn() {},
		error() {}
	};
	function F(t) {
		if (t === !1) return P;
		if (t === void 0) return console;
		if (t.log && t.warn && t.error) return t;
		throw Error("logger must implement log, warn and error methods");
	}
	var I = /^[a-z_$][a-z0-9_$:-]*$/i;
	function L(t, s) {
		let { RULES: c } = this;
		if ((0, g.eachItem)(t, (t) => {
			if (c.keywords[t]) throw Error(`Keyword ${t} is already defined`);
			if (!I.test(t)) throw Error(`Keyword ${t} has invalid name`);
		}), s && s.$data && !("code" in s || "validate" in s)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function R(t, s, c) {
		var l;
		let u = s?.post;
		if (c && u) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: d } = this, f = u ? d.post : d.rules.find(({ type: t }) => t === c);
		if (f || (f = {
			type: c,
			rules: []
		}, d.rules.push(f)), d.keywords[t] = !0, !s) return;
		let p = {
			keyword: t,
			definition: {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			}
		};
		s.before ? z.call(this, f, p, s.before) : f.rules.push(p), d.all[t] = p, (l = s.implements) == null || l.forEach((t) => this.addKeyword(t));
	}
	function z(t, s, c) {
		let l = t.rules.findIndex((t) => t.keyword === c);
		l >= 0 ? t.rules.splice(l, 0, s) : (t.rules.push(s), this.logger.warn(`rule ${c} is not defined`));
	}
	function B(t) {
		let { metaSchema: s } = t;
		s !== void 0 && (t.$data && this.opts.$data && (s = H(s)), t.validateSchema = this.compile(s, !0));
	}
	var V = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function H(t) {
		return { anyOf: [t, V] };
	}
})), require_id = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.callRef = t.getValidate = void 0;
	var s = require_ref_error(), c = require_code(), l = require_codegen(), u = require_names(), d = require_compile(), f = require_util$1(), p = {
		keyword: "$ref",
		schemaType: "string",
		code(t) {
			let { gen: c, schema: u, it: f } = t, { baseId: p, schemaEnv: g, validateName: _, opts: v, self: y } = f, { root: b } = g;
			if ((u === "#" || u === "#/") && p === b.baseId) return S();
			let x = d.resolveRef.call(y, b, p, u);
			if (x === void 0) throw new s.default(f.opts.uriResolver, p, u);
			if (x instanceof d.SchemaEnv) return C(x);
			return w(x);
			function S() {
				if (g === b) return h(t, _, g, g.$async);
				let s = c.scopeValue("root", { ref: b });
				return h(t, (0, l._)`${s}.validate`, b, b.$async);
			}
			function C(s) {
				h(t, m(t, s), s, s.$async);
			}
			function w(s) {
				let d = c.scopeValue("schema", v.code.source === !0 ? {
					ref: s,
					code: (0, l.stringify)(s)
				} : { ref: s }), f = c.name("valid"), p = t.subschema({
					schema: s,
					dataTypes: [],
					schemaPath: l.nil,
					topSchemaRef: d,
					errSchemaPath: u
				}, f);
				t.mergeEvaluated(p), t.ok(f);
			}
		}
	};
	function m(t, s) {
		let { gen: c } = t;
		return s.validate ? c.scopeValue("validate", { ref: s.validate }) : (0, l._)`${c.scopeValue("wrapper", { ref: s })}.validate`;
	}
	t.getValidate = m;
	function h(t, s, d, p) {
		let { gen: m, it: h } = t, { allErrors: g, schemaEnv: _, opts: v } = h, y = v.passContext ? u.default.this : l.nil;
		p ? b() : x();
		function b() {
			if (!_.$async) throw Error("async schema referenced by sync schema");
			let u = m.let("valid");
			m.try(() => {
				m.code((0, l._)`await ${(0, c.callValidateCode)(t, s, y)}`), C(s), g || m.assign(u, !0);
			}, (t) => {
				m.if((0, l._)`!(${t} instanceof ${h.ValidationError})`, () => m.throw(t)), S(t), g || m.assign(u, !1);
			}), t.ok(u);
		}
		function x() {
			t.result((0, c.callValidateCode)(t, s, y), () => C(s), () => S(s));
		}
		function S(t) {
			let s = (0, l._)`${t}.errors`;
			m.assign(u.default.vErrors, (0, l._)`${u.default.vErrors} === null ? ${s} : ${u.default.vErrors}.concat(${s})`), m.assign(u.default.errors, (0, l._)`${u.default.vErrors}.length`);
		}
		function C(t) {
			if (!h.opts.unevaluated) return;
			let s = d?.validate?.evaluated;
			if (h.props !== !0) if (s && !s.dynamicProps) s.props !== void 0 && (h.props = f.mergeEvaluated.props(m, s.props, h.props));
			else {
				let s = m.var("props", (0, l._)`${t}.evaluated.props`);
				h.props = f.mergeEvaluated.props(m, s, h.props, l.Name);
			}
			if (h.items !== !0) if (s && !s.dynamicItems) s.items !== void 0 && (h.items = f.mergeEvaluated.items(m, s.items, h.items));
			else {
				let s = m.var("items", (0, l._)`${t}.evaluated.items`);
				h.items = f.mergeEvaluated.items(m, s, h.items, l.Name);
			}
		}
	}
	t.callRef = h, t.default = p;
})), require_core = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_id(), c = require_ref();
	t.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		s.default,
		c.default
	];
})), require_limitNumber = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = s.operators, l = {
		maximum: {
			okStr: "<=",
			ok: c.LTE,
			fail: c.GT
		},
		minimum: {
			okStr: ">=",
			ok: c.GTE,
			fail: c.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: c.LT,
			fail: c.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: c.GT,
			fail: c.LTE
		}
	};
	t.default = {
		keyword: Object.keys(l),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: c }) => (0, s.str)`must be ${l[t].okStr} ${c}`,
			params: ({ keyword: t, schemaCode: c }) => (0, s._)`{comparison: ${l[t].okStr}, limit: ${c}}`
		},
		code(t) {
			let { keyword: c, data: u, schemaCode: d } = t;
			t.fail$data((0, s._)`${u} ${l[c].fail} ${d} || isNaN(${u})`);
		}
	};
})), require_multipleOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen();
	t.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, s.str)`must be multiple of ${t}`,
			params: ({ schemaCode: t }) => (0, s._)`{multipleOf: ${t}}`
		},
		code(t) {
			let { gen: c, data: l, schemaCode: u, it: d } = t, f = d.opts.multipleOfPrecision, p = c.let("res"), m = f ? (0, s._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${f}` : (0, s._)`${p} !== parseInt(${p})`;
			t.fail$data((0, s._)`(${u} === 0 || (${p} = ${l}/${u}, ${m}))`);
		}
	};
})), require_ucs2length = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	function s(t) {
		let s = t.length, c = 0, l = 0, u;
		for (; l < s;) c++, u = t.charCodeAt(l++), u >= 55296 && u <= 56319 && l < s && (u = t.charCodeAt(l), (u & 64512) == 56320 && l++);
		return c;
	}
	t.default = s, s.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_ucs2length();
	t.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxLength" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} characters`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: u, data: d, schemaCode: f, it: p } = t, m = u === "maxLength" ? s.operators.GT : s.operators.LT, h = p.opts.unicode === !1 ? (0, s._)`${d}.length` : (0, s._)`${(0, c.useFunc)(t.gen, l.default)}(${d})`;
			t.fail$data((0, s._)`${h} ${m} ${f}`);
		}
	};
})), require_pattern = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen();
	t.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, c.str)`must match pattern "${t}"`,
			params: ({ schemaCode: t }) => (0, c._)`{pattern: ${t}}`
		},
		code(t) {
			let { data: l, $data: u, schema: d, schemaCode: f, it: p } = t, m = p.opts.unicodeRegExp ? "u" : "", h = u ? (0, c._)`(new RegExp(${f}, ${m}))` : (0, s.usePattern)(t, d);
			t.fail$data((0, c._)`!${h}.test(${l})`);
		}
	};
})), require_limitProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen();
	t.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxProperties" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} properties`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u } = t, d = c === "maxProperties" ? s.operators.GT : s.operators.LT;
			t.fail$data((0, s._)`Object.keys(${l}).length ${d} ${u}`);
		}
	};
})), require_required = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_util$1();
	t.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: t } }) => (0, c.str)`must have required property '${t}'`,
			params: ({ params: { missingProperty: t } }) => (0, c._)`{missingProperty: ${t}}`
		},
		code(t) {
			let { gen: u, schema: d, schemaCode: f, data: p, $data: m, it: h } = t, { opts: g } = h;
			if (!m && d.length === 0) return;
			let _ = d.length >= g.loopRequired;
			if (h.allErrors ? v() : y(), g.strictRequired) {
				let s = t.parentSchema.properties, { definedProperties: c } = t.it;
				for (let t of d) if (s?.[t] === void 0 && !c.has(t)) {
					let s = `required property "${t}" is not defined at "${h.schemaEnv.baseId + h.errSchemaPath}" (strictRequired)`;
					(0, l.checkStrictMode)(h, s, h.opts.strictRequired);
				}
			}
			function v() {
				if (_ || m) t.block$data(c.nil, b);
				else for (let c of d) (0, s.checkReportMissingProp)(t, c);
			}
			function y() {
				let c = u.let("missing");
				if (_ || m) {
					let s = u.let("valid", !0);
					t.block$data(s, () => x(c, s)), t.ok(s);
				} else u.if((0, s.checkMissingProp)(t, d, c)), (0, s.reportMissingProp)(t, c), u.else();
			}
			function b() {
				u.forOf("prop", f, (c) => {
					t.setParams({ missingProperty: c }), u.if((0, s.noPropertyInData)(u, p, c, g.ownProperties), () => t.error());
				});
			}
			function x(l, d) {
				t.setParams({ missingProperty: l }), u.forOf(l, f, () => {
					u.assign(d, (0, s.propertyInData)(u, p, l, g.ownProperties)), u.if((0, c.not)(d), () => {
						t.error(), u.break();
					});
				}, c.nil);
			}
		}
	};
})), require_limitItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen();
	t.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: t, schemaCode: c }) {
				let l = t === "maxItems" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} items`;
			},
			params: ({ schemaCode: t }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { keyword: c, data: l, schemaCode: u } = t, d = c === "maxItems" ? s.operators.GT : s.operators.LT;
			t.fail$data((0, s._)`${l}.length ${d} ${u}`);
		}
	};
})), require_equal = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_fast_deep_equal();
	s.code = "require(\"ajv/dist/runtime/equal\").default", t.default = s;
})), require_uniqueItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_dataType(), c = require_codegen(), l = require_util$1(), u = require_equal();
	t.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: t, j: s } }) => (0, c.str)`must NOT have duplicate items (items ## ${s} and ${t} are identical)`,
			params: ({ params: { i: t, j: s } }) => (0, c._)`{i: ${t}, j: ${s}}`
		},
		code(t) {
			let { gen: d, data: f, $data: p, schema: m, parentSchema: h, schemaCode: g, it: _ } = t;
			if (!p && !m) return;
			let v = d.let("valid"), y = h.items ? (0, s.getSchemaTypes)(h.items) : [];
			t.block$data(v, b, (0, c._)`${g} === false`), t.ok(v);
			function b() {
				let s = d.let("i", (0, c._)`${f}.length`), l = d.let("j");
				t.setParams({
					i: s,
					j: l
				}), d.assign(v, !0), d.if((0, c._)`${s} > 1`, () => (x() ? S : C)(s, l));
			}
			function x() {
				return y.length > 0 && !y.some((t) => t === "object" || t === "array");
			}
			function S(l, u) {
				let p = d.name("item"), m = (0, s.checkDataTypes)(y, p, _.opts.strictNumbers, s.DataType.Wrong), h = d.const("indices", (0, c._)`{}`);
				d.for((0, c._)`;${l}--;`, () => {
					d.let(p, (0, c._)`${f}[${l}]`), d.if(m, (0, c._)`continue`), y.length > 1 && d.if((0, c._)`typeof ${p} == "string"`, (0, c._)`${p} += "_"`), d.if((0, c._)`typeof ${h}[${p}] == "number"`, () => {
						d.assign(u, (0, c._)`${h}[${p}]`), t.error(), d.assign(v, !1).break();
					}).code((0, c._)`${h}[${p}] = ${l}`);
				});
			}
			function C(s, p) {
				let m = (0, l.useFunc)(d, u.default), h = d.name("outer");
				d.label(h).for((0, c._)`;${s}--;`, () => d.for((0, c._)`${p} = ${s}; ${p}--;`, () => d.if((0, c._)`${m}(${f}[${s}], ${f}[${p}])`, () => {
					t.error(), d.assign(v, !1).break(h);
				})));
			}
		}
	};
})), require_const = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_equal();
	t.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: t }) => (0, s._)`{allowedValue: ${t}}`
		},
		code(t) {
			let { gen: u, data: d, $data: f, schemaCode: p, schema: m } = t;
			f || m && typeof m == "object" ? t.fail$data((0, s._)`!${(0, c.useFunc)(u, l.default)}(${d}, ${p})`) : t.fail((0, s._)`${m} !== ${d}`);
		}
	};
})), require_enum = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_equal();
	t.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: t }) => (0, s._)`{allowedValues: ${t}}`
		},
		code(t) {
			let { gen: u, data: d, $data: f, schema: p, schemaCode: m, it: h } = t;
			if (!f && p.length === 0) throw Error("enum must have non-empty array");
			let g = p.length >= h.opts.loopEnum, _, v = () => _ ??= (0, c.useFunc)(u, l.default), y;
			if (g || f) y = u.let("valid"), t.block$data(y, b);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(p)) throw Error("ajv implementation error");
				let t = u.const("vSchema", m);
				y = (0, s.or)(...p.map((s, c) => x(t, c)));
			}
			t.pass(y);
			function b() {
				u.assign(y, !1), u.forOf("v", m, (t) => u.if((0, s._)`${v()}(${d}, ${t})`, () => u.assign(y, !0).break()));
			}
			function x(t, c) {
				let l = p[c];
				return typeof l == "object" && l ? (0, s._)`${v()}(${d}, ${t}[${c}])` : (0, s._)`${d} === ${l}`;
			}
		}
	};
})), require_validation = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_limitNumber(), c = require_multipleOf(), l = require_limitLength(), u = require_pattern(), d = require_limitProperties(), f = require_required(), p = require_limitItems(), m = require_uniqueItems(), h = require_const(), g = require_enum();
	t.default = [
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		p.default,
		m.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		h.default,
		g.default
	];
})), require_additionalItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateAdditionalItems = void 0;
	var s = require_codegen(), c = require_util$1(), l = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, s.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { parentSchema: s, it: l } = t, { items: d } = s;
			if (!Array.isArray(d)) {
				(0, c.checkStrictMode)(l, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			u(t, d);
		}
	};
	function u(t, l) {
		let { gen: u, schema: d, data: f, keyword: p, it: m } = t;
		m.items = !0;
		let h = u.const("len", (0, s._)`${f}.length`);
		if (d === !1) t.setParams({ len: l.length }), t.pass((0, s._)`${h} <= ${l.length}`);
		else if (typeof d == "object" && !(0, c.alwaysValidSchema)(m, d)) {
			let c = u.var("valid", (0, s._)`${h} <= ${l.length}`);
			u.if((0, s.not)(c), () => g(c)), t.ok(c);
		}
		function g(d) {
			u.forRange("i", l.length, h, (l) => {
				t.subschema({
					keyword: p,
					dataProp: l,
					dataPropType: c.Type.Num
				}, d), m.allErrors || u.if((0, s.not)(d), () => u.break());
			});
		}
	}
	t.validateAdditionalItems = u, t.default = l;
})), require_items = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateTuple = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_code(), u = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(t) {
			let { schema: s, it: u } = t;
			if (Array.isArray(s)) return d(t, "additionalItems", s);
			u.items = !0, !(0, c.alwaysValidSchema)(u, s) && t.ok((0, l.validateArray)(t));
		}
	};
	function d(t, l, u = t.schema) {
		let { gen: d, parentSchema: f, data: p, keyword: m, it: h } = t;
		v(f), h.opts.unevaluated && u.length && h.items !== !0 && (h.items = c.mergeEvaluated.items(d, u.length, h.items));
		let g = d.name("valid"), _ = d.const("len", (0, s._)`${p}.length`);
		u.forEach((l, u) => {
			(0, c.alwaysValidSchema)(h, l) || (d.if((0, s._)`${_} > ${u}`, () => t.subschema({
				keyword: m,
				schemaProp: u,
				dataProp: u
			}, g)), t.ok(g));
		});
		function v(t) {
			let { opts: s, errSchemaPath: d } = h, f = u.length, p = f === t.minItems && (f === t.maxItems || t[l] === !1);
			if (s.strictTuples && !p) {
				let t = `"${m}" is ${f}-tuple, but minItems or maxItems/${l} are not specified or different at path "${d}"`;
				(0, c.checkStrictMode)(h, t, s.strictTuples);
			}
		}
	}
	t.validateTuple = d, t.default = u;
})), require_prefixItems = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_items();
	t.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (t) => (0, s.validateTuple)(t, "items")
	};
})), require_items2020 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_code(), u = require_additionalItems();
	t.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: t } }) => (0, s.str)`must NOT have more than ${t} items`,
			params: ({ params: { len: t } }) => (0, s._)`{limit: ${t}}`
		},
		code(t) {
			let { schema: s, parentSchema: d, it: f } = t, { prefixItems: p } = d;
			f.items = !0, !(0, c.alwaysValidSchema)(f, s) && (p ? (0, u.validateAdditionalItems)(t, p) : t.ok((0, l.validateArray)(t)));
		}
	};
})), require_contains = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	t.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: t, max: c } }) => c === void 0 ? (0, s.str)`must contain at least ${t} valid item(s)` : (0, s.str)`must contain at least ${t} and no more than ${c} valid item(s)`,
			params: ({ params: { min: t, max: c } }) => c === void 0 ? (0, s._)`{minContains: ${t}}` : (0, s._)`{minContains: ${t}, maxContains: ${c}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = t, m, h, { minContains: g, maxContains: _ } = d;
			p.opts.next ? (m = g === void 0 ? 1 : g, h = _) : m = 1;
			let v = l.const("len", (0, s._)`${f}.length`);
			if (t.setParams({
				min: m,
				max: h
			}), h === void 0 && m === 0) {
				(0, c.checkStrictMode)(p, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (h !== void 0 && m > h) {
				(0, c.checkStrictMode)(p, "\"minContains\" > \"maxContains\" is always invalid"), t.fail();
				return;
			}
			if ((0, c.alwaysValidSchema)(p, u)) {
				let c = (0, s._)`${v} >= ${m}`;
				h !== void 0 && (c = (0, s._)`${c} && ${v} <= ${h}`), t.pass(c);
				return;
			}
			p.items = !0;
			let y = l.name("valid");
			h === void 0 && m === 1 ? x(y, () => l.if(y, () => l.break())) : m === 0 ? (l.let(y, !0), h !== void 0 && l.if((0, s._)`${f}.length > 0`, b)) : (l.let(y, !1), b()), t.result(y, () => t.reset());
			function b() {
				let t = l.name("_valid"), s = l.let("count", 0);
				x(t, () => l.if(t, () => S(s)));
			}
			function x(s, u) {
				l.forRange("i", 0, v, (l) => {
					t.subschema({
						keyword: "contains",
						dataProp: l,
						dataPropType: c.Type.Num,
						compositeRule: !0
					}, s), u();
				});
			}
			function S(t) {
				l.code((0, s._)`${t}++`), h === void 0 ? l.if((0, s._)`${t} >= ${m}`, () => l.assign(y, !0).break()) : (l.if((0, s._)`${t} > ${h}`, () => l.assign(y, !1).break()), m === 1 ? l.assign(y, !0) : l.if((0, s._)`${t} >= ${m}`, () => l.assign(y, !0)));
			}
		}
	};
})), require_dependencies = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_code();
	t.error = {
		message: ({ params: { property: t, depsCount: c, deps: l } }) => {
			let u = c === 1 ? "property" : "properties";
			return (0, s.str)`must have ${u} ${l} when property ${t} is present`;
		},
		params: ({ params: { property: t, depsCount: c, deps: l, missingProperty: u } }) => (0, s._)`{property: ${t},
    missingProperty: ${u},
    depsCount: ${c},
    deps: ${l}}`
	};
	var u = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: t.error,
		code(t) {
			let [s, c] = d(t);
			f(t, s), p(t, c);
		}
	};
	function d({ schema: t }) {
		let s = {}, c = {};
		for (let l in t) {
			if (l === "__proto__") continue;
			let u = Array.isArray(t[l]) ? s : c;
			u[l] = t[l];
		}
		return [s, c];
	}
	function f(t, c = t.schema) {
		let { gen: u, data: d, it: f } = t;
		if (Object.keys(c).length === 0) return;
		let p = u.let("missing");
		for (let m in c) {
			let h = c[m];
			if (h.length === 0) continue;
			let g = (0, l.propertyInData)(u, d, m, f.opts.ownProperties);
			t.setParams({
				property: m,
				depsCount: h.length,
				deps: h.join(", ")
			}), f.allErrors ? u.if(g, () => {
				for (let s of h) (0, l.checkReportMissingProp)(t, s);
			}) : (u.if((0, s._)`${g} && (${(0, l.checkMissingProp)(t, h, p)})`), (0, l.reportMissingProp)(t, p), u.else());
		}
	}
	t.validatePropertyDeps = f;
	function p(t, s = t.schema) {
		let { gen: u, data: d, keyword: f, it: p } = t, m = u.name("valid");
		for (let h in s) (0, c.alwaysValidSchema)(p, s[h]) || (u.if((0, l.propertyInData)(u, d, h, p.opts.ownProperties), () => {
			let s = t.subschema({
				keyword: f,
				schemaProp: h
			}, m);
			t.mergeValidEvaluated(s, m);
		}, () => u.var(m, !0)), t.ok(m));
	}
	t.validateSchemaDeps = p, t.default = u;
})), require_propertyNames = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	t.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: t }) => (0, s._)`{propertyName: ${t.propertyName}}`
		},
		code(t) {
			let { gen: l, schema: u, data: d, it: f } = t;
			if ((0, c.alwaysValidSchema)(f, u)) return;
			let p = l.name("valid");
			l.forIn("key", d, (c) => {
				t.setParams({ propertyName: c }), t.subschema({
					keyword: "propertyNames",
					data: c,
					dataTypes: ["string"],
					propertyName: c,
					compositeRule: !0
				}, p), l.if((0, s.not)(p), () => {
					t.error(!0), f.allErrors || l.break();
				});
			}), t.ok(p);
		}
	};
})), require_additionalProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_names(), u = require_util$1();
	t.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: t }) => (0, c._)`{additionalProperty: ${t.additionalProperty}}`
		},
		code(t) {
			let { gen: d, schema: f, parentSchema: p, data: m, errsCount: h, it: g } = t;
			/* istanbul ignore if */
			if (!h) throw Error("ajv implementation error");
			let { allErrors: _, opts: v } = g;
			if (g.props = !0, v.removeAdditional !== "all" && (0, u.alwaysValidSchema)(g, f)) return;
			let y = (0, s.allSchemaProperties)(p.properties), b = (0, s.allSchemaProperties)(p.patternProperties);
			x(), t.ok((0, c._)`${h} === ${l.default.errors}`);
			function x() {
				d.forIn("key", m, (t) => {
					!y.length && !b.length ? w(t) : d.if(S(t), () => w(t));
				});
			}
			function S(l) {
				let f;
				if (y.length > 8) {
					let t = (0, u.schemaRefOrVal)(g, p.properties, "properties");
					f = (0, s.isOwnProperty)(d, t, l);
				} else f = y.length ? (0, c.or)(...y.map((t) => (0, c._)`${l} === ${t}`)) : c.nil;
				return b.length && (f = (0, c.or)(f, ...b.map((u) => (0, c._)`${(0, s.usePattern)(t, u)}.test(${l})`))), (0, c.not)(f);
			}
			function C(t) {
				d.code((0, c._)`delete ${m}[${t}]`);
			}
			function w(s) {
				if (v.removeAdditional === "all" || v.removeAdditional && f === !1) {
					C(s);
					return;
				}
				if (f === !1) {
					t.setParams({ additionalProperty: s }), t.error(), _ || d.break();
					return;
				}
				if (typeof f == "object" && !(0, u.alwaysValidSchema)(g, f)) {
					let l = d.name("valid");
					v.removeAdditional === "failing" ? (T(s, l, !1), d.if((0, c.not)(l), () => {
						t.reset(), C(s);
					})) : (T(s, l), _ || d.if((0, c.not)(l), () => d.break()));
				}
			}
			function T(s, c, l) {
				let d = {
					keyword: "additionalProperties",
					dataProp: s,
					dataPropType: u.Type.Str
				};
				l === !1 && Object.assign(d, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), t.subschema(d, c);
			}
		}
	};
})), require_properties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_validate(), c = require_code(), l = require_util$1(), u = require_additionalProperties();
	t.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: d, schema: f, parentSchema: p, data: m, it: h } = t;
			h.opts.removeAdditional === "all" && p.additionalProperties === void 0 && u.default.code(new s.KeywordCxt(h, u.default, "additionalProperties"));
			let g = (0, c.allSchemaProperties)(f);
			for (let t of g) h.definedProperties.add(t);
			h.opts.unevaluated && g.length && h.props !== !0 && (h.props = l.mergeEvaluated.props(d, (0, l.toHash)(g), h.props));
			let _ = g.filter((t) => !(0, l.alwaysValidSchema)(h, f[t]));
			if (_.length === 0) return;
			let v = d.name("valid");
			for (let s of _) y(s) ? b(s) : (d.if((0, c.propertyInData)(d, m, s, h.opts.ownProperties)), b(s), h.allErrors || d.else().var(v, !0), d.endIf()), t.it.definedProperties.add(s), t.ok(v);
			function y(t) {
				return h.opts.useDefaults && !h.compositeRule && f[t].default !== void 0;
			}
			function b(s) {
				t.subschema({
					keyword: "properties",
					schemaProp: s,
					dataProp: s
				}, v);
			}
		}
	};
})), require_patternProperties = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_util$1(), u = require_util$1();
	t.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(t) {
			let { gen: d, schema: f, data: p, parentSchema: m, it: h } = t, { opts: g } = h, _ = (0, s.allSchemaProperties)(f), v = _.filter((t) => (0, l.alwaysValidSchema)(h, f[t]));
			if (_.length === 0 || v.length === _.length && (!h.opts.unevaluated || h.props === !0)) return;
			let y = g.strictSchema && !g.allowMatchingProperties && m.properties, b = d.name("valid");
			h.props !== !0 && !(h.props instanceof c.Name) && (h.props = (0, u.evaluatedPropsToName)(d, h.props));
			let { props: x } = h;
			S();
			function S() {
				for (let t of _) y && C(t), h.allErrors ? w(t) : (d.var(b, !0), w(t), d.if(b));
			}
			function C(t) {
				for (let s in y) new RegExp(t).test(s) && (0, l.checkStrictMode)(h, `property ${s} matches pattern ${t} (use allowMatchingProperties)`);
			}
			function w(l) {
				d.forIn("key", p, (f) => {
					d.if((0, c._)`${(0, s.usePattern)(t, l)}.test(${f})`, () => {
						let s = v.includes(l);
						s || t.subschema({
							keyword: "patternProperties",
							schemaProp: l,
							dataProp: f,
							dataPropType: u.Type.Str
						}, b), h.opts.unevaluated && x !== !0 ? d.assign((0, c._)`${x}[${f}]`, !0) : !s && !h.allErrors && d.if((0, c.not)(b), () => d.break());
					});
				});
			}
		}
	};
})), require_not = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$1();
	t.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(t) {
			let { gen: c, schema: l, it: u } = t;
			if ((0, s.alwaysValidSchema)(u, l)) {
				t.fail();
				return;
			}
			let d = c.name("valid");
			t.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, d), t.failResult(d, () => t.reset(), () => t.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	t.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: t }) => (0, s._)`{passingSchemas: ${t.passing}}`
		},
		code(t) {
			let { gen: l, schema: u, parentSchema: d, it: f } = t;
			/* istanbul ignore if */
			if (!Array.isArray(u)) throw Error("ajv implementation error");
			if (f.opts.discriminator && d.discriminator) return;
			let p = u, m = l.let("valid", !1), h = l.let("passing", null), g = l.name("_valid");
			t.setParams({ passing: h }), l.block(_), t.result(m, () => t.reset(), () => t.error(!0));
			function _() {
				p.forEach((u, d) => {
					let p;
					(0, c.alwaysValidSchema)(f, u) ? l.var(g, !0) : p = t.subschema({
						keyword: "oneOf",
						schemaProp: d,
						compositeRule: !0
					}, g), d > 0 && l.if((0, s._)`${g} && ${m}`).assign(m, !1).assign(h, (0, s._)`[${h}, ${d}]`).else(), l.if(g, () => {
						l.assign(m, !0), l.assign(h, d), p && t.mergeEvaluated(p, s.Name);
					});
				});
			}
		}
	};
})), require_allOf = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$1();
	t.default = {
		keyword: "allOf",
		schemaType: "array",
		code(t) {
			let { gen: c, schema: l, it: u } = t;
			/* istanbul ignore if */
			if (!Array.isArray(l)) throw Error("ajv implementation error");
			let d = c.name("valid");
			l.forEach((c, l) => {
				if ((0, s.alwaysValidSchema)(u, c)) return;
				let f = t.subschema({
					keyword: "allOf",
					schemaProp: l
				}, d);
				t.ok(d), t.mergeEvaluated(f);
			});
		}
	};
})), require_if = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: t }) => (0, s.str)`must match "${t.ifClause}" schema`,
			params: ({ params: t }) => (0, s._)`{failingKeyword: ${t.ifClause}}`
		},
		code(t) {
			let { gen: l, parentSchema: d, it: f } = t;
			d.then === void 0 && d.else === void 0 && (0, c.checkStrictMode)(f, "\"if\" without \"then\" and \"else\" is ignored");
			let p = u(f, "then"), m = u(f, "else");
			if (!p && !m) return;
			let h = l.let("valid", !0), g = l.name("_valid");
			if (_(), t.reset(), p && m) {
				let s = l.let("ifClause");
				t.setParams({ ifClause: s }), l.if(g, v("then", s), v("else", s));
			} else p ? l.if(g, v("then")) : l.if((0, s.not)(g), v("else"));
			t.pass(h, () => t.error(!0));
			function _() {
				let s = t.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, g);
				t.mergeEvaluated(s);
			}
			function v(c, u) {
				return () => {
					let d = t.subschema({ keyword: c }, g);
					l.assign(h, g), t.mergeValidEvaluated(d, h), u ? l.assign(u, (0, s._)`${c}`) : t.setParams({ ifClause: c });
				};
			}
		}
	};
	function u(t, s) {
		let l = t.schema[s];
		return l !== void 0 && !(0, c.alwaysValidSchema)(t, l);
	}
	t.default = l;
})), require_thenElse = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_util$1();
	t.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: t, parentSchema: c, it: l }) {
			c.if === void 0 && (0, s.checkStrictMode)(l, `"${t}" without "if" is ignored`);
		}
	};
})), require_applicator = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_additionalItems(), c = require_prefixItems(), l = require_items(), u = require_items2020(), d = require_contains(), f = require_dependencies(), p = require_propertyNames(), m = require_additionalProperties(), h = require_properties(), g = require_patternProperties(), _ = require_not(), v = require_anyOf(), y = require_oneOf(), b = require_allOf(), x = require_if(), S = require_thenElse();
	function C(t = !1) {
		let C = [
			_.default,
			v.default,
			y.default,
			b.default,
			x.default,
			S.default,
			p.default,
			m.default,
			f.default,
			h.default,
			g.default
		];
		return t ? C.push(c.default, u.default) : C.push(s.default, l.default), C.push(d.default), C;
	}
	t.default = C;
})), require_format$1 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen();
	t.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: t }) => (0, s.str)`must match format "${t}"`,
			params: ({ schemaCode: t }) => (0, s._)`{format: ${t}}`
		},
		code(t, c) {
			let { gen: l, data: u, $data: d, schema: f, schemaCode: p, it: m } = t, { opts: h, errSchemaPath: g, schemaEnv: _, self: v } = m;
			if (!h.validateFormats) return;
			d ? y() : b();
			function y() {
				let d = l.scopeValue("formats", {
					ref: v.formats,
					code: h.code.formats
				}), f = l.const("fDef", (0, s._)`${d}[${p}]`), m = l.let("fType"), g = l.let("format");
				l.if((0, s._)`typeof ${f} == "object" && !(${f} instanceof RegExp)`, () => l.assign(m, (0, s._)`${f}.type || "string"`).assign(g, (0, s._)`${f}.validate`), () => l.assign(m, (0, s._)`"string"`).assign(g, f)), t.fail$data((0, s.or)(y(), b()));
				function y() {
					return h.strictSchema === !1 ? s.nil : (0, s._)`${p} && !${g}`;
				}
				function b() {
					let t = _.$async ? (0, s._)`(${f}.async ? await ${g}(${u}) : ${g}(${u}))` : (0, s._)`${g}(${u})`, l = (0, s._)`(typeof ${g} == "function" ? ${t} : ${g}.test(${u}))`;
					return (0, s._)`${g} && ${g} !== true && ${m} === ${c} && !${l}`;
				}
			}
			function b() {
				let d = v.formats[f];
				if (!d) {
					b();
					return;
				}
				if (d === !0) return;
				let [p, m, y] = x(d);
				p === c && t.pass(S());
				function b() {
					if (h.strictSchema === !1) {
						v.logger.warn(t());
						return;
					}
					throw Error(t());
					function t() {
						return `unknown format "${f}" ignored in schema at path "${g}"`;
					}
				}
				function x(t) {
					let c = t instanceof RegExp ? (0, s.regexpCode)(t) : h.code.formats ? (0, s._)`${h.code.formats}${(0, s.getProperty)(f)}` : void 0, u = l.scopeValue("formats", {
						key: f,
						ref: t,
						code: c
					});
					return typeof t == "object" && !(t instanceof RegExp) ? [
						t.type || "string",
						t.validate,
						(0, s._)`${u}.validate`
					] : [
						"string",
						t,
						u
					];
				}
				function S() {
					if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
						if (!_.$async) throw Error("async format in sync schema");
						return (0, s._)`await ${y}(${u})`;
					}
					return typeof m == "function" ? (0, s._)`${y}(${u})` : (0, s._)`${y}.test(${u})`;
				}
			}
		}
	};
})), require_format = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.default = [require_format$1().default];
})), require_metadata = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.contentVocabulary = t.metadataVocabulary = void 0, t.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], t.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft7 = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_core(), c = require_validation(), l = require_applicator(), u = require_format(), d = require_metadata();
	t.default = [
		s.default,
		c.default,
		(0, l.default)(),
		u.default,
		d.metadataVocabulary,
		d.contentVocabulary
	];
})), require_types = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.DiscrError = void 0;
	var s;
	(function(t) {
		t.Tag = "tag", t.Mapping = "mapping";
	})(s || (t.DiscrError = s = {}));
})), require_discriminator = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_types(), l = require_compile(), u = require_ref_error(), d = require_util$1();
	t.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: t, tagName: s } }) => t === c.DiscrError.Tag ? `tag "${s}" must be string` : `value of tag "${s}" must be in oneOf`,
			params: ({ params: { discrError: t, tag: c, tagName: l } }) => (0, s._)`{error: ${t}, tag: ${l}, tagValue: ${c}}`
		},
		code(t) {
			let { gen: f, data: p, schema: m, parentSchema: h, it: g } = t, { oneOf: _ } = h;
			if (!g.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let v = m.propertyName;
			if (typeof v != "string") throw Error("discriminator: requires propertyName");
			if (m.mapping) throw Error("discriminator: mapping is not supported");
			if (!_) throw Error("discriminator: requires oneOf keyword");
			let y = f.let("valid", !1), b = f.const("tag", (0, s._)`${p}${(0, s.getProperty)(v)}`);
			f.if((0, s._)`typeof ${b} == "string"`, () => x(), () => t.error(!1, {
				discrError: c.DiscrError.Tag,
				tag: b,
				tagName: v
			})), t.ok(y);
			function x() {
				let l = C();
				for (let t in f.if(!1), l) f.elseIf((0, s._)`${b} === ${t}`), f.assign(y, S(l[t]));
				f.else(), t.error(!1, {
					discrError: c.DiscrError.Mapping,
					tag: b,
					tagName: v
				}), f.endIf();
			}
			function S(c) {
				let l = f.name("valid"), u = t.subschema({
					keyword: "oneOf",
					schemaProp: c
				}, l);
				return t.mergeEvaluated(u, s.Name), l;
			}
			function C() {
				let t = {}, s = f(h), c = !0;
				for (let t = 0; t < _.length; t++) {
					let m = _[t];
					if (m?.$ref && !(0, d.schemaHasRulesButRef)(m, g.self.RULES)) {
						let t = m.$ref;
						if (m = l.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, t), m instanceof l.SchemaEnv && (m = m.schema), m === void 0) throw new u.default(g.opts.uriResolver, g.baseId, t);
					}
					let h = m?.properties?.[v];
					if (typeof h != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${v}"`);
					c &&= s || f(m), p(h, t);
				}
				if (!c) throw Error(`discriminator: "${v}" must be required`);
				return t;
				function f({ required: t }) {
					return Array.isArray(t) && t.includes(v);
				}
				function p(t, s) {
					if (t.const) m(t.const, s);
					else if (t.enum) for (let c of t.enum) m(c, s);
					else throw Error(`discriminator: "properties/${v}" must have "const" or "enum"`);
				}
				function m(s, c) {
					if (typeof s != "string" || s in t) throw Error(`discriminator: "${v}" values must be unique strings`);
					t[s] = c;
				}
			}
		}
	};
})), json_schema_draft_07_exports = /* @__PURE__ */ __export({
	$id: () => $id,
	$schema: () => $schema,
	default: () => json_schema_draft_07_default,
	definitions: () => definitions,
	properties: () => properties,
	title: () => title,
	type: () => type
}, 1), $schema, $id, title, definitions, type, properties, json_schema_draft_07_default, init_json_schema_draft_07 = __esmMin((() => {
	$schema = "http://json-schema.org/draft-07/schema#", $id = "http://json-schema.org/draft-07/schema#", title = "Core schema meta-schema", definitions = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: { $ref: "#" }
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, type = ["object", "boolean"], properties = {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		$comment: { type: "string" },
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		readOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/definitions/nonNegativeInteger" },
		minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: { $ref: "#" },
		items: {
			anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
			default: !0
		},
		maxItems: { $ref: "#/definitions/nonNegativeInteger" },
		minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		contains: { $ref: "#" },
		maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
		minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		required: { $ref: "#/definitions/stringArray" },
		additionalProperties: { $ref: "#" },
		definitions: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		properties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependencies: {
			type: "object",
			additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
		},
		propertyNames: { $ref: "#" },
		const: !0,
		enum: {
			type: "array",
			items: !0,
			minItems: 1,
			uniqueItems: !0
		},
		type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/definitions/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		format: { type: "string" },
		contentMediaType: { type: "string" },
		contentEncoding: { type: "string" },
		if: { $ref: "#" },
		then: { $ref: "#" },
		else: { $ref: "#" },
		allOf: { $ref: "#/definitions/schemaArray" },
		anyOf: { $ref: "#/definitions/schemaArray" },
		oneOf: { $ref: "#/definitions/schemaArray" },
		not: { $ref: "#" }
	}, json_schema_draft_07_default = {
		$schema,
		$id,
		title,
		definitions,
		type,
		properties,
		default: !0
	};
})), require_ajv = /* @__PURE__ */ __commonJSMin(((t, s) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
	var c = require_core$1(), l = require_draft7(), u = require_discriminator(), d = (init_json_schema_draft_07(), __toCommonJS(json_schema_draft_07_exports).default), f = ["/properties"], p = "http://json-schema.org/draft-07/schema", m = class extends c.default {
		_addVocabularies() {
			super._addVocabularies(), l.default.forEach((t) => this.addVocabulary(t)), this.opts.discriminator && this.addKeyword(u.default);
		}
		_addDefaultMetaSchema() {
			if (super._addDefaultMetaSchema(), !this.opts.meta) return;
			let t = this.opts.$data ? this.$dataMetaSchema(d, f) : d;
			this.addMetaSchema(t, p, !1), this.refs["http://json-schema.org/schema"] = p;
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(p) ? p : void 0);
		}
	};
	t.Ajv = m, s.exports = t = m, s.exports.Ajv = m, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = m;
	var h = require_validate();
	Object.defineProperty(t, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return h.KeywordCxt;
		}
	});
	var g = require_codegen();
	Object.defineProperty(t, "_", {
		enumerable: !0,
		get: function() {
			return g._;
		}
	}), Object.defineProperty(t, "str", {
		enumerable: !0,
		get: function() {
			return g.str;
		}
	}), Object.defineProperty(t, "stringify", {
		enumerable: !0,
		get: function() {
			return g.stringify;
		}
	}), Object.defineProperty(t, "nil", {
		enumerable: !0,
		get: function() {
			return g.nil;
		}
	}), Object.defineProperty(t, "Name", {
		enumerable: !0,
		get: function() {
			return g.Name;
		}
	}), Object.defineProperty(t, "CodeGen", {
		enumerable: !0,
		get: function() {
			return g.CodeGen;
		}
	});
	var _ = require_validation_error();
	Object.defineProperty(t, "ValidationError", {
		enumerable: !0,
		get: function() {
			return _.default;
		}
	});
	var v = require_ref_error();
	Object.defineProperty(t, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return v.default;
		}
	});
})), require_limit = /* @__PURE__ */ __commonJSMin(((t) => {
	Object.defineProperty(t, "__esModule", { value: !0 }), t.formatLimitDefinition = void 0;
	var s = require_ajv(), c = require_codegen(), l = c.operators, u = {
		formatMaximum: {
			okStr: "<=",
			ok: l.LTE,
			fail: l.GT
		},
		formatMinimum: {
			okStr: ">=",
			ok: l.GTE,
			fail: l.LT
		},
		formatExclusiveMaximum: {
			okStr: "<",
			ok: l.LT,
			fail: l.GTE
		},
		formatExclusiveMinimum: {
			okStr: ">",
			ok: l.GT,
			fail: l.LTE
		}
	};
	t.formatLimitDefinition = {
		keyword: Object.keys(u),
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ keyword: t, schemaCode: s }) => (0, c.str)`should be ${u[t].okStr} ${s}`,
			params: ({ keyword: t, schemaCode: s }) => (0, c._)`{comparison: ${u[t].okStr}, limit: ${s}}`
		},
		code(t) {
			let { gen: l, data: d, schemaCode: f, keyword: p, it: m } = t, { opts: h, self: g } = m;
			if (!h.validateFormats) return;
			let _ = new s.KeywordCxt(m, g.RULES.all.format.definition, "format");
			_.$data ? v() : y();
			function v() {
				let s = l.scopeValue("formats", {
					ref: g.formats,
					code: h.code.formats
				}), u = l.const("fmt", (0, c._)`${s}[${_.schemaCode}]`);
				t.fail$data((0, c.or)((0, c._)`typeof ${u} != "object"`, (0, c._)`${u} instanceof RegExp`, (0, c._)`typeof ${u}.compare != "function"`, b(u)));
			}
			function y() {
				let s = _.schema, u = g.formats[s];
				if (!u || u === !0) return;
				if (typeof u != "object" || u instanceof RegExp || typeof u.compare != "function") throw Error(`"${p}": format "${s}" does not define "compare" function`);
				let d = l.scopeValue("formats", {
					key: s,
					ref: u,
					code: h.code.formats ? (0, c._)`${h.code.formats}${(0, c.getProperty)(s)}` : void 0
				});
				t.fail$data(b(d));
			}
			function b(t) {
				return (0, c._)`${t}.compare(${d}, ${f}) ${u[p].fail} 0`;
			}
		},
		dependencies: ["format"]
	}, t.default = (s) => (s.addKeyword(t.formatLimitDefinition), s);
})), import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, s) => {
	Object.defineProperty(t, "__esModule", { value: !0 });
	var c = require_formats(), l = require_limit(), u = require_codegen(), d = new u.Name("fullFormats"), f = new u.Name("fastFormats"), p = (t, s = { keywords: !0 }) => {
		if (Array.isArray(s)) return m(t, s, c.fullFormats, d), t;
		let [u, p] = s.mode === "fast" ? [c.fastFormats, f] : [c.fullFormats, d];
		return m(t, s.formats || c.formatNames, u, p), s.keywords && (0, l.default)(t), t;
	};
	p.get = (t, s = "full") => {
		let l = (s === "fast" ? c.fastFormats : c.fullFormats)[t];
		if (!l) throw Error(`Unknown format "${t}"`);
		return l;
	};
	function m(t, s, c, l) {
		var d;
		(d = t.opts.code).formats ?? (d.formats = (0, u._)`require("ajv-formats/dist/formats").${l}`);
		for (let l of s) t.addFormat(l, c[l]);
	}
	s.exports = t = p, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = p;
})))(), 1), import__2020 = require__2020(), copyProperty = (t, s, c, l) => {
	if (c === "length" || c === "prototype" || c === "arguments" || c === "caller") return;
	let u = Object.getOwnPropertyDescriptor(t, c), d = Object.getOwnPropertyDescriptor(s, c);
	!canCopyProperty(u, d) && l || Object.defineProperty(t, c, d);
}, canCopyProperty = function(t, s) {
	return t === void 0 || t.configurable || t.writable === s.writable && t.enumerable === s.enumerable && t.configurable === s.configurable && (t.writable || t.value === s.value);
}, changePrototype = (t, s) => {
	let c = Object.getPrototypeOf(s);
	c !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, c);
}, wrappedToString = (t, s) => `/* Wrapped ${t}*/\n${s}`, toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), changeToString = (t, s, c) => {
	let l = c === "" ? "" : `with ${c.trim()}() `, u = wrappedToString.bind(null, l, s.toString());
	Object.defineProperty(u, "name", toStringName);
	let { writable: d, enumerable: f, configurable: p } = toStringDescriptor;
	Object.defineProperty(t, "toString", {
		value: u,
		writable: d,
		enumerable: f,
		configurable: p
	});
};
function mimicFunction(t, s, { ignoreNonConfigurable: c = !1 } = {}) {
	let { name: l } = t;
	for (let l of Reflect.ownKeys(s)) copyProperty(t, s, l, c);
	return changePrototype(t, s), changeToString(t, s, l), t;
}
var debounce_fn_default = (t, s = {}) => {
	if (typeof t != "function") throw TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
	let { wait: c = 0, maxWait: l = Infinity, before: u = !1, after: d = !0 } = s;
	if (c < 0 || l < 0) throw RangeError("`wait` and `maxWait` must not be negative.");
	if (!u && !d) throw Error("Both `before` and `after` are false, function wouldn't be called.");
	let f, p, m, h = function(...s) {
		let h = this, g = () => {
			f = void 0, p &&= (clearTimeout(p), void 0), d && (m = t.apply(h, s));
		}, _ = () => {
			p = void 0, f &&= (clearTimeout(f), void 0), d && (m = t.apply(h, s));
		}, v = u && !f;
		return clearTimeout(f), f = setTimeout(g, c), l > 0 && l !== Infinity && !p && (p = setTimeout(_, l)), v && (m = t.apply(h, s)), m;
	};
	return mimicFunction(h, t), h.cancel = () => {
		f &&= (clearTimeout(f), void 0), p &&= (clearTimeout(p), void 0);
	}, h;
}, require_constants$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = "2.0.0", l = 256;
	s.exports = {
		MAX_LENGTH: l,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: l - 6,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: c,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), require_debug = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {};
})), require_re = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { MAX_SAFE_COMPONENT_LENGTH: c, MAX_SAFE_BUILD_LENGTH: l, MAX_LENGTH: u } = require_constants$1(), d = require_debug();
	t = s.exports = {};
	var f = t.re = [], p = t.safeRe = [], m = t.src = [], h = t.safeSrc = [], g = t.t = {}, _ = 0, v = "[a-zA-Z0-9-]", y = [
		["\\s", 1],
		["\\d", u],
		[v, l]
	], b = (t) => {
		for (let [s, c] of y) t = t.split(`${s}*`).join(`${s}{0,${c}}`).split(`${s}+`).join(`${s}{1,${c}}`);
		return t;
	}, x = (t, s, c) => {
		let l = b(s), u = _++;
		d(t, u, s), g[t] = u, m[u] = s, h[u] = l, f[u] = new RegExp(s, c ? "g" : void 0), p[u] = new RegExp(l, c ? "g" : void 0);
	};
	x("NUMERICIDENTIFIER", "0|[1-9]\\d*"), x("NUMERICIDENTIFIERLOOSE", "\\d+"), x("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${v}*`), x("MAINVERSION", `(${m[g.NUMERICIDENTIFIER]})\\.(${m[g.NUMERICIDENTIFIER]})\\.(${m[g.NUMERICIDENTIFIER]})`), x("MAINVERSIONLOOSE", `(${m[g.NUMERICIDENTIFIERLOOSE]})\\.(${m[g.NUMERICIDENTIFIERLOOSE]})\\.(${m[g.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASEIDENTIFIER", `(?:${m[g.NONNUMERICIDENTIFIER]}|${m[g.NUMERICIDENTIFIER]})`), x("PRERELEASEIDENTIFIERLOOSE", `(?:${m[g.NONNUMERICIDENTIFIER]}|${m[g.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASE", `(?:-(${m[g.PRERELEASEIDENTIFIER]}(?:\\.${m[g.PRERELEASEIDENTIFIER]})*))`), x("PRERELEASELOOSE", `(?:-?(${m[g.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${m[g.PRERELEASEIDENTIFIERLOOSE]})*))`), x("BUILDIDENTIFIER", `${v}+`), x("BUILD", `(?:\\+(${m[g.BUILDIDENTIFIER]}(?:\\.${m[g.BUILDIDENTIFIER]})*))`), x("FULLPLAIN", `v?${m[g.MAINVERSION]}${m[g.PRERELEASE]}?${m[g.BUILD]}?`), x("FULL", `^${m[g.FULLPLAIN]}$`), x("LOOSEPLAIN", `[v=\\s]*${m[g.MAINVERSIONLOOSE]}${m[g.PRERELEASELOOSE]}?${m[g.BUILD]}?`), x("LOOSE", `^${m[g.LOOSEPLAIN]}$`), x("GTLT", "((?:<|>)?=?)"), x("XRANGEIDENTIFIERLOOSE", `${m[g.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), x("XRANGEIDENTIFIER", `${m[g.NUMERICIDENTIFIER]}|x|X|\\*`), x("XRANGEPLAIN", `[v=\\s]*(${m[g.XRANGEIDENTIFIER]})(?:\\.(${m[g.XRANGEIDENTIFIER]})(?:\\.(${m[g.XRANGEIDENTIFIER]})(?:${m[g.PRERELEASE]})?${m[g.BUILD]}?)?)?`), x("XRANGEPLAINLOOSE", `[v=\\s]*(${m[g.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[g.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[g.XRANGEIDENTIFIERLOOSE]})(?:${m[g.PRERELEASELOOSE]})?${m[g.BUILD]}?)?)?`), x("XRANGE", `^${m[g.GTLT]}\\s*${m[g.XRANGEPLAIN]}$`), x("XRANGELOOSE", `^${m[g.GTLT]}\\s*${m[g.XRANGEPLAINLOOSE]}$`), x("COERCEPLAIN", `(^|[^\\d])(\\d{1,${c}})(?:\\.(\\d{1,${c}}))?(?:\\.(\\d{1,${c}}))?`), x("COERCE", `${m[g.COERCEPLAIN]}(?:$|[^\\d])`), x("COERCEFULL", m[g.COERCEPLAIN] + `(?:${m[g.PRERELEASE]})?(?:${m[g.BUILD]})?(?:$|[^\\d])`), x("COERCERTL", m[g.COERCE], !0), x("COERCERTLFULL", m[g.COERCEFULL], !0), x("LONETILDE", "(?:~>?)"), x("TILDETRIM", `(\\s*)${m[g.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", x("TILDE", `^${m[g.LONETILDE]}${m[g.XRANGEPLAIN]}$`), x("TILDELOOSE", `^${m[g.LONETILDE]}${m[g.XRANGEPLAINLOOSE]}$`), x("LONECARET", "(?:\\^)"), x("CARETTRIM", `(\\s*)${m[g.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", x("CARET", `^${m[g.LONECARET]}${m[g.XRANGEPLAIN]}$`), x("CARETLOOSE", `^${m[g.LONECARET]}${m[g.XRANGEPLAINLOOSE]}$`), x("COMPARATORLOOSE", `^${m[g.GTLT]}\\s*(${m[g.LOOSEPLAIN]})$|^$`), x("COMPARATOR", `^${m[g.GTLT]}\\s*(${m[g.FULLPLAIN]})$|^$`), x("COMPARATORTRIM", `(\\s*)${m[g.GTLT]}\\s*(${m[g.LOOSEPLAIN]}|${m[g.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", x("HYPHENRANGE", `^\\s*(${m[g.XRANGEPLAIN]})\\s+-\\s+(${m[g.XRANGEPLAIN]})\\s*$`), x("HYPHENRANGELOOSE", `^\\s*(${m[g.XRANGEPLAINLOOSE]})\\s+-\\s+(${m[g.XRANGEPLAINLOOSE]})\\s*$`), x("STAR", "(<|>)?=?\\s*\\*"), x("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), x("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), require_parse_options = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = Object.freeze({ loose: !0 }), l = Object.freeze({});
	s.exports = (t) => t ? typeof t == "object" ? t : c : l;
})), require_identifiers = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = /^[0-9]+$/, l = (t, s) => {
		if (typeof t == "number" && typeof s == "number") return t === s ? 0 : t < s ? -1 : 1;
		let l = c.test(t), u = c.test(s);
		return l && u && (t = +t, s = +s), t === s ? 0 : l && !u ? -1 : u && !l ? 1 : t < s ? -1 : 1;
	};
	s.exports = {
		compareIdentifiers: l,
		rcompareIdentifiers: (t, s) => l(s, t)
	};
})), require_semver$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_debug(), { MAX_LENGTH: l, MAX_SAFE_INTEGER: u } = require_constants$1(), { safeRe: d, t: f } = require_re(), p = require_parse_options(), { compareIdentifiers: m } = require_identifiers();
	s.exports = class t {
		constructor(s, m) {
			if (m = p(m), s instanceof t) {
				if (s.loose === !!m.loose && s.includePrerelease === !!m.includePrerelease) return s;
				s = s.version;
			} else if (typeof s != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
			if (s.length > l) throw TypeError(`version is longer than ${l} characters`);
			c("SemVer", s, m), this.options = m, this.loose = !!m.loose, this.includePrerelease = !!m.includePrerelease;
			let h = s.trim().match(m.loose ? d[f.LOOSE] : d[f.FULL]);
			if (!h) throw TypeError(`Invalid Version: ${s}`);
			if (this.raw = s, this.major = +h[1], this.minor = +h[2], this.patch = +h[3], this.major > u || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > u || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > u || this.patch < 0) throw TypeError("Invalid patch version");
			h[4] ? this.prerelease = h[4].split(".").map((t) => {
				if (/^[0-9]+$/.test(t)) {
					let s = +t;
					if (s >= 0 && s < u) return s;
				}
				return t;
			}) : this.prerelease = [], this.build = h[5] ? h[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(s) {
			if (c("SemVer.compare", this.version, this.options, s), !(s instanceof t)) {
				if (typeof s == "string" && s === this.version) return 0;
				s = new t(s, this.options);
			}
			return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
		}
		compareMain(s) {
			return s instanceof t || (s = new t(s, this.options)), this.major < s.major ? -1 : this.major > s.major ? 1 : this.minor < s.minor ? -1 : this.minor > s.minor ? 1 : this.patch < s.patch ? -1 : this.patch > s.patch ? 1 : 0;
		}
		comparePre(s) {
			if (s instanceof t || (s = new t(s, this.options)), this.prerelease.length && !s.prerelease.length) return -1;
			if (!this.prerelease.length && s.prerelease.length) return 1;
			if (!this.prerelease.length && !s.prerelease.length) return 0;
			let l = 0;
			do {
				let t = this.prerelease[l], u = s.prerelease[l];
				if (c("prerelease compare", l, t, u), t === void 0 && u === void 0) return 0;
				if (u === void 0) return 1;
				if (t === void 0) return -1;
				if (t === u) continue;
				return m(t, u);
			} while (++l);
		}
		compareBuild(s) {
			s instanceof t || (s = new t(s, this.options));
			let l = 0;
			do {
				let t = this.build[l], u = s.build[l];
				if (c("build compare", l, t, u), t === void 0 && u === void 0) return 0;
				if (u === void 0) return 1;
				if (t === void 0) return -1;
				if (t === u) continue;
				return m(t, u);
			} while (++l);
		}
		inc(t, s, c) {
			if (t.startsWith("pre")) {
				if (!s && c === !1) throw Error("invalid increment argument: identifier is empty");
				if (s) {
					let t = `-${s}`.match(this.options.loose ? d[f.PRERELEASELOOSE] : d[f.PRERELEASE]);
					if (!t || t[1] !== s) throw Error(`invalid identifier: ${s}`);
				}
			}
			switch (t) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", s, c);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", s, c);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", s, c), this.inc("pre", s, c);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", s, c), this.inc("pre", s, c);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let t = Number(c) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [t];
					else {
						let l = this.prerelease.length;
						for (; --l >= 0;) typeof this.prerelease[l] == "number" && (this.prerelease[l]++, l = -2);
						if (l === -1) {
							if (s === this.prerelease.join(".") && c === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(t);
						}
					}
					if (s) {
						let l = [s, t];
						c === !1 && (l = [s]), m(this.prerelease[0], s) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = l) : this.prerelease = l;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${t}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), require_parse = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s, l = !1) => {
		if (t instanceof c) return t;
		try {
			return new c(t, s);
		} catch (t) {
			if (!l) return null;
			throw t;
		}
	};
})), require_valid$1 = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_parse();
	s.exports = (t, s) => {
		let l = c(t, s);
		return l ? l.version : null;
	};
})), require_clean = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_parse();
	s.exports = (t, s) => {
		let l = c(t.trim().replace(/^[=v]+/, ""), s);
		return l ? l.version : null;
	};
})), require_inc = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s, l, u, d) => {
		typeof l == "string" && (d = u, u = l, l = void 0);
		try {
			return new c(t instanceof c ? t.version : t, l).inc(s, u, d).version;
		} catch {
			return null;
		}
	};
})), require_diff = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_parse();
	s.exports = (t, s) => {
		let l = c(t, null, !0), u = c(s, null, !0), d = l.compare(u);
		if (d === 0) return null;
		let f = d > 0, p = f ? l : u, m = f ? u : l, h = !!p.prerelease.length;
		if (m.prerelease.length && !h) {
			if (!m.patch && !m.minor) return "major";
			if (m.compareMain(p) === 0) return m.minor && !m.patch ? "minor" : "patch";
		}
		let g = h ? "pre" : "";
		return l.major === u.major ? l.minor === u.minor ? l.patch === u.patch ? "prerelease" : g + "patch" : g + "minor" : g + "major";
	};
})), require_major = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s) => new c(t, s).major;
})), require_minor = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s) => new c(t, s).minor;
})), require_patch = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s) => new c(t, s).patch;
})), require_prerelease = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_parse();
	s.exports = (t, s) => {
		let l = c(t, s);
		return l && l.prerelease.length ? l.prerelease : null;
	};
})), require_compare = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s, l) => new c(t, l).compare(new c(s, l));
})), require_rcompare = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(s, t, l);
})), require_compare_loose = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s) => c(t, s, !0);
})), require_compare_build = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1();
	s.exports = (t, s, l) => {
		let u = new c(t, l), d = new c(s, l);
		return u.compare(d) || u.compareBuild(d);
	};
})), require_sort = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare_build();
	s.exports = (t, s) => t.sort((t, l) => c(t, l, s));
})), require_rsort = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare_build();
	s.exports = (t, s) => t.sort((t, l) => c(l, t, s));
})), require_gt = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) > 0;
})), require_lt = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) < 0;
})), require_eq = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) === 0;
})), require_neq = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) !== 0;
})), require_gte = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) >= 0;
})), require_lte = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_compare();
	s.exports = (t, s, l) => c(t, s, l) <= 0;
})), require_cmp = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_eq(), l = require_neq(), u = require_gt(), d = require_gte(), f = require_lt(), p = require_lte();
	s.exports = (t, s, m, h) => {
		switch (s) {
			case "===": return typeof t == "object" && (t = t.version), typeof m == "object" && (m = m.version), t === m;
			case "!==": return typeof t == "object" && (t = t.version), typeof m == "object" && (m = m.version), t !== m;
			case "":
			case "=":
			case "==": return c(t, m, h);
			case "!=": return l(t, m, h);
			case ">": return u(t, m, h);
			case ">=": return d(t, m, h);
			case "<": return f(t, m, h);
			case "<=": return p(t, m, h);
			default: throw TypeError(`Invalid operator: ${s}`);
		}
	};
})), require_coerce = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1(), l = require_parse(), { safeRe: u, t: d } = require_re();
	s.exports = (t, s) => {
		if (t instanceof c) return t;
		if (typeof t == "number" && (t = String(t)), typeof t != "string") return null;
		s ||= {};
		let f = null;
		if (!s.rtl) f = t.match(s.includePrerelease ? u[d.COERCEFULL] : u[d.COERCE]);
		else {
			let c = s.includePrerelease ? u[d.COERCERTLFULL] : u[d.COERCERTL], l;
			for (; (l = c.exec(t)) && (!f || f.index + f[0].length !== t.length);) (!f || l.index + l[0].length !== f.index + f[0].length) && (f = l), c.lastIndex = l.index + l[1].length + l[2].length;
			c.lastIndex = -1;
		}
		if (f === null) return null;
		let p = f[2];
		return l(`${p}.${f[3] || "0"}.${f[4] || "0"}${s.includePrerelease && f[5] ? `-${f[5]}` : ""}${s.includePrerelease && f[6] ? `+${f[6]}` : ""}`, s);
	};
})), require_lrucache = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(t) {
			let s = this.map.get(t);
			if (s !== void 0) return this.map.delete(t), this.map.set(t, s), s;
		}
		delete(t) {
			return this.map.delete(t);
		}
		set(t, s) {
			if (!this.delete(t) && s !== void 0) {
				if (this.map.size >= this.max) {
					let t = this.map.keys().next().value;
					this.delete(t);
				}
				this.map.set(t, s);
			}
			return this;
		}
	};
})), require_range = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = /\s+/g;
	s.exports = class t {
		constructor(s, l) {
			if (l = u(l), s instanceof t) return s.loose === !!l.loose && s.includePrerelease === !!l.includePrerelease ? s : new t(s.raw, l);
			if (s instanceof d) return this.raw = s.value, this.set = [[s]], this.formatted = void 0, this;
			if (this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease, this.raw = s.trim().replace(c, " "), this.set = this.raw.split("||").map((t) => this.parseRange(t.trim())).filter((t) => t.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let t = this.set[0];
				if (this.set = this.set.filter((t) => !x(t[0])), this.set.length === 0) this.set = [t];
				else if (this.set.length > 1) {
					for (let t of this.set) if (t.length === 1 && S(t[0])) {
						this.set = [t];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let t = 0; t < this.set.length; t++) {
					t > 0 && (this.formatted += "||");
					let s = this.set[t];
					for (let t = 0; t < s.length; t++) t > 0 && (this.formatted += " "), this.formatted += s[t].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(t) {
			let s = ((this.options.includePrerelease && y) | (this.options.loose && b)) + ":" + t, c = l.get(s);
			if (c) return c;
			let u = this.options.loose, p = u ? m[h.HYPHENRANGELOOSE] : m[h.HYPHENRANGE];
			t = t.replace(p, P(this.options.includePrerelease)), f("hyphen replace", t), t = t.replace(m[h.COMPARATORTRIM], g), f("comparator trim", t), t = t.replace(m[h.TILDETRIM], _), f("tilde trim", t), t = t.replace(m[h.CARETTRIM], v), f("caret trim", t);
			let S = t.split(" ").map((t) => w(t, this.options)).join(" ").split(/\s+/).map((t) => N(t, this.options));
			u && (S = S.filter((t) => (f("loose invalid filter", t, this.options), !!t.match(m[h.COMPARATORLOOSE])))), f("range list", S);
			let C = /* @__PURE__ */ new Map(), T = S.map((t) => new d(t, this.options));
			for (let t of T) {
				if (x(t)) return [t];
				C.set(t.value, t);
			}
			C.size > 1 && C.has("") && C.delete("");
			let E = [...C.values()];
			return l.set(s, E), E;
		}
		intersects(s, c) {
			if (!(s instanceof t)) throw TypeError("a Range is required");
			return this.set.some((t) => C(t, c) && s.set.some((s) => C(s, c) && t.every((t) => s.every((s) => t.intersects(s, c)))));
		}
		test(t) {
			if (!t) return !1;
			if (typeof t == "string") try {
				t = new p(t, this.options);
			} catch {
				return !1;
			}
			for (let s = 0; s < this.set.length; s++) if (F(this.set[s], t, this.options)) return !0;
			return !1;
		}
	};
	var l = new (require_lrucache())(), u = require_parse_options(), d = require_comparator(), f = require_debug(), p = require_semver$1(), { safeRe: m, t: h, comparatorTrimReplace: g, tildeTrimReplace: _, caretTrimReplace: v } = require_re(), { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: b } = require_constants$1(), x = (t) => t.value === "<0.0.0-0", S = (t) => t.value === "", C = (t, s) => {
		let c = !0, l = t.slice(), u = l.pop();
		for (; c && l.length;) c = l.every((t) => u.intersects(t, s)), u = l.pop();
		return c;
	}, w = (t, s) => (t = t.replace(m[h.BUILD], ""), f("comp", t, s), t = O(t, s), f("caret", t), t = E(t, s), f("tildes", t), t = A(t, s), f("xrange", t), t = M(t, s), f("stars", t), t), T = (t) => !t || t.toLowerCase() === "x" || t === "*", E = (t, s) => t.trim().split(/\s+/).map((t) => D(t, s)).join(" "), D = (t, s) => {
		let c = s.loose ? m[h.TILDELOOSE] : m[h.TILDE];
		return t.replace(c, (s, c, l, u, d) => {
			f("tilde", t, s, c, l, u, d);
			let p;
			return T(c) ? p = "" : T(l) ? p = `>=${c}.0.0 <${+c + 1}.0.0-0` : T(u) ? p = `>=${c}.${l}.0 <${c}.${+l + 1}.0-0` : d ? (f("replaceTilde pr", d), p = `>=${c}.${l}.${u}-${d} <${c}.${+l + 1}.0-0`) : p = `>=${c}.${l}.${u} <${c}.${+l + 1}.0-0`, f("tilde return", p), p;
		});
	}, O = (t, s) => t.trim().split(/\s+/).map((t) => k(t, s)).join(" "), k = (t, s) => {
		f("caret", t, s);
		let c = s.loose ? m[h.CARETLOOSE] : m[h.CARET], l = s.includePrerelease ? "-0" : "";
		return t.replace(c, (s, c, u, d, p) => {
			f("caret", t, s, c, u, d, p);
			let m;
			return T(c) ? m = "" : T(u) ? m = `>=${c}.0.0${l} <${+c + 1}.0.0-0` : T(d) ? m = c === "0" ? `>=${c}.${u}.0${l} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.0${l} <${+c + 1}.0.0-0` : p ? (f("replaceCaret pr", p), m = c === "0" ? u === "0" ? `>=${c}.${u}.${d}-${p} <${c}.${u}.${+d + 1}-0` : `>=${c}.${u}.${d}-${p} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.${d}-${p} <${+c + 1}.0.0-0`) : (f("no pr"), m = c === "0" ? u === "0" ? `>=${c}.${u}.${d}${l} <${c}.${u}.${+d + 1}-0` : `>=${c}.${u}.${d}${l} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.${d} <${+c + 1}.0.0-0`), f("caret return", m), m;
		});
	}, A = (t, s) => (f("replaceXRanges", t, s), t.split(/\s+/).map((t) => j(t, s)).join(" ")), j = (t, s) => {
		t = t.trim();
		let c = s.loose ? m[h.XRANGELOOSE] : m[h.XRANGE];
		return t.replace(c, (c, l, u, d, p, m) => {
			f("xRange", t, c, l, u, d, p, m);
			let h = T(u), g = h || T(d), _ = g || T(p), v = _;
			return l === "=" && v && (l = ""), m = s.includePrerelease ? "-0" : "", h ? c = l === ">" || l === "<" ? "<0.0.0-0" : "*" : l && v ? (g && (d = 0), p = 0, l === ">" ? (l = ">=", g ? (u = +u + 1, d = 0, p = 0) : (d = +d + 1, p = 0)) : l === "<=" && (l = "<", g ? u = +u + 1 : d = +d + 1), l === "<" && (m = "-0"), c = `${l + u}.${d}.${p}${m}`) : g ? c = `>=${u}.0.0${m} <${+u + 1}.0.0-0` : _ && (c = `>=${u}.${d}.0${m} <${u}.${+d + 1}.0-0`), f("xRange return", c), c;
		});
	}, M = (t, s) => (f("replaceStars", t, s), t.trim().replace(m[h.STAR], "")), N = (t, s) => (f("replaceGTE0", t, s), t.trim().replace(m[s.includePrerelease ? h.GTE0PRE : h.GTE0], "")), P = (t) => (s, c, l, u, d, f, p, m, h, g, _, v) => (c = T(l) ? "" : T(u) ? `>=${l}.0.0${t ? "-0" : ""}` : T(d) ? `>=${l}.${u}.0${t ? "-0" : ""}` : f ? `>=${c}` : `>=${c}${t ? "-0" : ""}`, m = T(h) ? "" : T(g) ? `<${+h + 1}.0.0-0` : T(_) ? `<${h}.${+g + 1}.0-0` : v ? `<=${h}.${g}.${_}-${v}` : t ? `<${h}.${g}.${+_ + 1}-0` : `<=${m}`, `${c} ${m}`.trim()), F = (t, s, c) => {
		for (let c = 0; c < t.length; c++) if (!t[c].test(s)) return !1;
		if (s.prerelease.length && !c.includePrerelease) {
			for (let c = 0; c < t.length; c++) if (f(t[c].semver), t[c].semver !== d.ANY && t[c].semver.prerelease.length > 0) {
				let l = t[c].semver;
				if (l.major === s.major && l.minor === s.minor && l.patch === s.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), require_comparator = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = Symbol("SemVer ANY");
	s.exports = class t {
		static get ANY() {
			return c;
		}
		constructor(s, u) {
			if (u = l(u), s instanceof t) {
				if (s.loose === !!u.loose) return s;
				s = s.value;
			}
			s = s.trim().split(/\s+/).join(" "), p("comparator", s, u), this.options = u, this.loose = !!u.loose, this.parse(s), this.semver === c ? this.value = "" : this.value = this.operator + this.semver.version, p("comp", this);
		}
		parse(t) {
			let s = this.options.loose ? u[d.COMPARATORLOOSE] : u[d.COMPARATOR], l = t.match(s);
			if (!l) throw TypeError(`Invalid comparator: ${t}`);
			this.operator = l[1] === void 0 ? "" : l[1], this.operator === "=" && (this.operator = ""), l[2] ? this.semver = new m(l[2], this.options.loose) : this.semver = c;
		}
		toString() {
			return this.value;
		}
		test(t) {
			if (p("Comparator.test", t, this.options.loose), this.semver === c || t === c) return !0;
			if (typeof t == "string") try {
				t = new m(t, this.options);
			} catch {
				return !1;
			}
			return f(t, this.operator, this.semver, this.options);
		}
		intersects(s, c) {
			if (!(s instanceof t)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" ? !0 : new h(s.value, c).test(this.value) : s.operator === "" ? s.value === "" ? !0 : new h(this.value, c).test(s.semver) : (c = l(c), c.includePrerelease && (this.value === "<0.0.0-0" || s.value === "<0.0.0-0") || !c.includePrerelease && (this.value.startsWith("<0.0.0") || s.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && s.operator.startsWith(">") || this.operator.startsWith("<") && s.operator.startsWith("<") || this.semver.version === s.semver.version && this.operator.includes("=") && s.operator.includes("=") || f(this.semver, "<", s.semver, c) && this.operator.startsWith(">") && s.operator.startsWith("<") || f(this.semver, ">", s.semver, c) && this.operator.startsWith("<") && s.operator.startsWith(">")));
		}
	};
	var l = require_parse_options(), { safeRe: u, t: d } = require_re(), f = require_cmp(), p = require_debug(), m = require_semver$1(), h = require_range();
})), require_satisfies = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_range();
	s.exports = (t, s, l) => {
		try {
			s = new c(s, l);
		} catch {
			return !1;
		}
		return s.test(t);
	};
})), require_to_comparators = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_range();
	s.exports = (t, s) => new c(t, s).set.map((t) => t.map((t) => t.value).join(" ").trim().split(" "));
})), require_max_satisfying = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1(), l = require_range();
	s.exports = (t, s, u) => {
		let d = null, f = null, p = null;
		try {
			p = new l(s, u);
		} catch {
			return null;
		}
		return t.forEach((t) => {
			p.test(t) && (!d || f.compare(t) === -1) && (d = t, f = new c(d, u));
		}), d;
	};
})), require_min_satisfying = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1(), l = require_range();
	s.exports = (t, s, u) => {
		let d = null, f = null, p = null;
		try {
			p = new l(s, u);
		} catch {
			return null;
		}
		return t.forEach((t) => {
			p.test(t) && (!d || f.compare(t) === 1) && (d = t, f = new c(d, u));
		}), d;
	};
})), require_min_version = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1(), l = require_range(), u = require_gt();
	s.exports = (t, s) => {
		t = new l(t, s);
		let d = new c("0.0.0");
		if (t.test(d) || (d = new c("0.0.0-0"), t.test(d))) return d;
		d = null;
		for (let s = 0; s < t.set.length; ++s) {
			let l = t.set[s], f = null;
			l.forEach((t) => {
				let s = new c(t.semver.version);
				switch (t.operator) {
					case ">": s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
					case "":
					case ">=":
						(!f || u(s, f)) && (f = s);
						break;
					case "<":
					case "<=": break;
					default: throw Error(`Unexpected operation: ${t.operator}`);
				}
			}), f && (!d || u(d, f)) && (d = f);
		}
		return d && t.test(d) ? d : null;
	};
})), require_valid = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_range();
	s.exports = (t, s) => {
		try {
			return new c(t, s).range || "*";
		} catch {
			return null;
		}
	};
})), require_outside = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_semver$1(), l = require_comparator(), { ANY: u } = l, d = require_range(), f = require_satisfies(), p = require_gt(), m = require_lt(), h = require_lte(), g = require_gte();
	s.exports = (t, s, _, v) => {
		t = new c(t, v), s = new d(s, v);
		let y, b, x, S, C;
		switch (_) {
			case ">":
				y = p, b = h, x = m, S = ">", C = ">=";
				break;
			case "<":
				y = m, b = g, x = p, S = "<", C = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (f(t, s, v)) return !1;
		for (let c = 0; c < s.set.length; ++c) {
			let d = s.set[c], f = null, p = null;
			if (d.forEach((t) => {
				t.semver === u && (t = new l(">=0.0.0")), f ||= t, p ||= t, y(t.semver, f.semver, v) ? f = t : x(t.semver, p.semver, v) && (p = t);
			}), f.operator === S || f.operator === C || (!p.operator || p.operator === S) && b(t, p.semver) || p.operator === C && x(t, p.semver)) return !1;
		}
		return !0;
	};
})), require_gtr = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_outside();
	s.exports = (t, s, l) => c(t, s, ">", l);
})), require_ltr = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_outside();
	s.exports = (t, s, l) => c(t, s, "<", l);
})), require_intersects = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_range();
	s.exports = (t, s, l) => (t = new c(t, l), s = new c(s, l), t.intersects(s, l));
})), require_simplify = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_satisfies(), l = require_compare();
	s.exports = (t, s, u) => {
		let d = [], f = null, p = null, m = t.sort((t, s) => l(t, s, u));
		for (let t of m) c(t, s, u) ? (p = t, f ||= t) : (p && d.push([f, p]), p = null, f = null);
		f && d.push([f, null]);
		let h = [];
		for (let [t, s] of d) t === s ? h.push(t) : !s && t === m[0] ? h.push("*") : s ? t === m[0] ? h.push(`<=${s}`) : h.push(`${t} - ${s}`) : h.push(`>=${t}`);
		let g = h.join(" || "), _ = typeof s.raw == "string" ? s.raw : String(s);
		return g.length < _.length ? g : s;
	};
})), require_subset = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_range(), l = require_comparator(), { ANY: u } = l, d = require_satisfies(), f = require_compare(), p = (t, s, l = {}) => {
		if (t === s) return !0;
		t = new c(t, l), s = new c(s, l);
		let u = !1;
		OUTER: for (let c of t.set) {
			for (let t of s.set) {
				let s = g(c, t, l);
				if (u ||= s !== null, s) continue OUTER;
			}
			if (u) return !1;
		}
		return !0;
	}, m = [new l(">=0.0.0-0")], h = [new l(">=0.0.0")], g = (t, s, c) => {
		if (t === s) return !0;
		if (t.length === 1 && t[0].semver === u) {
			if (s.length === 1 && s[0].semver === u) return !0;
			t = c.includePrerelease ? m : h;
		}
		if (s.length === 1 && s[0].semver === u) {
			if (c.includePrerelease) return !0;
			s = h;
		}
		let l = /* @__PURE__ */ new Set(), p, g;
		for (let s of t) s.operator === ">" || s.operator === ">=" ? p = _(p, s, c) : s.operator === "<" || s.operator === "<=" ? g = v(g, s, c) : l.add(s.semver);
		if (l.size > 1) return null;
		let y;
		if (p && g && (y = f(p.semver, g.semver, c), y > 0 || y === 0 && (p.operator !== ">=" || g.operator !== "<="))) return null;
		for (let t of l) {
			if (p && !d(t, String(p), c) || g && !d(t, String(g), c)) return null;
			for (let l of s) if (!d(t, String(l), c)) return !1;
			return !0;
		}
		let b, x, S, C, w = g && !c.includePrerelease && g.semver.prerelease.length ? g.semver : !1, T = p && !c.includePrerelease && p.semver.prerelease.length ? p.semver : !1;
		w && w.prerelease.length === 1 && g.operator === "<" && w.prerelease[0] === 0 && (w = !1);
		for (let t of s) {
			if (C = C || t.operator === ">" || t.operator === ">=", S = S || t.operator === "<" || t.operator === "<=", p) {
				if (T && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === T.major && t.semver.minor === T.minor && t.semver.patch === T.patch && (T = !1), t.operator === ">" || t.operator === ">=") {
					if (b = _(p, t, c), b === t && b !== p) return !1;
				} else if (p.operator === ">=" && !d(p.semver, String(t), c)) return !1;
			}
			if (g) {
				if (w && t.semver.prerelease && t.semver.prerelease.length && t.semver.major === w.major && t.semver.minor === w.minor && t.semver.patch === w.patch && (w = !1), t.operator === "<" || t.operator === "<=") {
					if (x = v(g, t, c), x === t && x !== g) return !1;
				} else if (g.operator === "<=" && !d(g.semver, String(t), c)) return !1;
			}
			if (!t.operator && (g || p) && y !== 0) return !1;
		}
		return !(p && S && !g && y !== 0 || g && C && !p && y !== 0 || T || w);
	}, _ = (t, s, c) => {
		if (!t) return s;
		let l = f(t.semver, s.semver, c);
		return l > 0 ? t : l < 0 || s.operator === ">" && t.operator === ">=" ? s : t;
	}, v = (t, s, c) => {
		if (!t) return s;
		let l = f(t.semver, s.semver, c);
		return l < 0 ? t : l > 0 || s.operator === "<" && t.operator === "<=" ? s : t;
	};
	s.exports = p;
})), import_semver = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_re(), l = require_constants$1(), u = require_semver$1(), d = require_identifiers();
	s.exports = {
		parse: require_parse(),
		valid: require_valid$1(),
		clean: require_clean(),
		inc: require_inc(),
		diff: require_diff(),
		major: require_major(),
		minor: require_minor(),
		patch: require_patch(),
		prerelease: require_prerelease(),
		compare: require_compare(),
		rcompare: require_rcompare(),
		compareLoose: require_compare_loose(),
		compareBuild: require_compare_build(),
		sort: require_sort(),
		rsort: require_rsort(),
		gt: require_gt(),
		lt: require_lt(),
		eq: require_eq(),
		neq: require_neq(),
		gte: require_gte(),
		lte: require_lte(),
		cmp: require_cmp(),
		coerce: require_coerce(),
		Comparator: require_comparator(),
		Range: require_range(),
		satisfies: require_satisfies(),
		toComparators: require_to_comparators(),
		maxSatisfying: require_max_satisfying(),
		minSatisfying: require_min_satisfying(),
		minVersion: require_min_version(),
		validRange: require_valid(),
		outside: require_outside(),
		gtr: require_gtr(),
		ltr: require_ltr(),
		intersects: require_intersects(),
		simplifyRange: require_simplify(),
		subset: require_subset(),
		SemVer: u,
		re: c.re,
		src: c.src,
		tokens: c.t,
		SEMVER_SPEC_VERSION: l.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: l.RELEASE_TYPES,
		compareIdentifiers: d.compareIdentifiers,
		rcompareIdentifiers: d.rcompareIdentifiers
	};
})))(), 1), objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]", arrayBufferStringified = "[object ArrayBuffer]";
function isType(t, s, c) {
	return t ? t.constructor === s ? !0 : objectToString.call(t) === c : !1;
}
function isUint8Array(t) {
	return isType(t, Uint8Array, uint8ArrayStringified);
}
function isArrayBuffer(t) {
	return isType(t, ArrayBuffer, arrayBufferStringified);
}
function isUint8ArrayOrArrayBuffer(t) {
	return isUint8Array(t) || isArrayBuffer(t);
}
function assertUint8Array(t) {
	if (!isUint8Array(t)) throw TypeError(`Expected \`Uint8Array\`, got \`${typeof t}\``);
}
function assertUint8ArrayOrArrayBuffer(t) {
	if (!isUint8ArrayOrArrayBuffer(t)) throw TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof t}\``);
}
function concatUint8Arrays(t, s) {
	if (t.length === 0) return new Uint8Array();
	s ??= t.reduce((t, s) => t + s.length, 0);
	let c = new Uint8Array(s), l = 0;
	for (let s of t) assertUint8Array(s), c.set(s, l), l += s.length;
	return c;
}
var cachedDecoders = { utf8: new globalThis.TextDecoder("utf8") };
function uint8ArrayToString(t, s = "utf8") {
	return assertUint8ArrayOrArrayBuffer(t), cachedDecoders[s] ??= new globalThis.TextDecoder(s), cachedDecoders[s].decode(t);
}
function assertString(t) {
	if (typeof t != "string") throw TypeError(`Expected \`string\`, got \`${typeof t}\``);
}
var cachedEncoder = new globalThis.TextEncoder();
function stringToUint8Array(t) {
	return assertString(t), cachedEncoder.encode(t);
}
Array.from({ length: 256 }, (t, s) => s.toString(16).padStart(2, "0"));
var encryptionAlgorithm = "aes-256-cbc", createPlainObject = () => Object.create(null), isExist = (t) => t !== void 0, checkValueType = (t, s) => {
	let c = new Set([
		"undefined",
		"symbol",
		"function"
	]), l = typeof s;
	if (c.has(l)) throw TypeError(`Setting a value of type \`${l}\` for key \`${t}\` is not allowed as it's not supported by JSON`);
}, INTERNAL_KEY = "__internal__", MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`, Conf = class {
	path;
	events;
	#e;
	#t;
	#n;
	#r = {};
	#i = !1;
	#a;
	#o;
	#s;
	constructor(t = {}) {
		let s = this.#c(t);
		this.#n = s, this.#l(s), this.#d(s), this.#f(s), this.events = new EventTarget(), this.#t = s.encryptionKey, this.path = this.#p(s), this.#m(s), s.watch && this._watch();
	}
	get(t, s) {
		if (this.#n.accessPropertiesByDotNotation) return this._get(t, s);
		let { store: c } = this;
		return t in c ? c[t] : s;
	}
	set(t, s) {
		if (typeof t != "string" && typeof t != "object") throw TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
		if (typeof t != "object" && s === void 0) throw TypeError("Use `delete()` to clear values");
		if (this._containsReservedKey(t)) throw TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
		let { store: c } = this, l = (t, s) => {
			if (checkValueType(t, s), this.#n.accessPropertiesByDotNotation) setProperty(c, t, s);
			else {
				if (t === "__proto__" || t === "constructor" || t === "prototype") return;
				c[t] = s;
			}
		};
		if (typeof t == "object") {
			let s = t;
			for (let [t, c] of Object.entries(s)) l(t, c);
		} else l(t, s);
		this.store = c;
	}
	has(t) {
		return this.#n.accessPropertiesByDotNotation ? hasProperty(this.store, t) : t in this.store;
	}
	appendToArray(t, s) {
		checkValueType(t, s);
		let c = this.#n.accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
		if (!Array.isArray(c)) throw TypeError(`The key \`${t}\` is already set to a non-array value`);
		this.set(t, [...c, s]);
	}
	reset(...t) {
		for (let s of t) isExist(this.#r[s]) && this.set(s, this.#r[s]);
	}
	delete(t) {
		let { store: s } = this;
		this.#n.accessPropertiesByDotNotation ? deleteProperty(s, t) : delete s[t], this.store = s;
	}
	clear() {
		let t = createPlainObject();
		for (let s of Object.keys(this.#r)) isExist(this.#r[s]) && (checkValueType(s, this.#r[s]), this.#n.accessPropertiesByDotNotation ? setProperty(t, s, this.#r[s]) : t[s] = this.#r[s]);
		this.store = t;
	}
	onDidChange(t, s) {
		if (typeof t != "string") throw TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
		if (typeof s != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof s}`);
		return this._handleValueChange(() => this.get(t), s);
	}
	onDidAnyChange(t) {
		if (typeof t != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
		return this._handleStoreChange(t);
	}
	get size() {
		return Object.keys(this.store).filter((t) => !this._isReservedKeyPath(t)).length;
	}
	get store() {
		try {
			let t = fs.readFileSync(this.path, this.#t ? null : "utf8"), s = this._decryptData(t), c = this._deserialize(s);
			return this.#i || this._validate(c), Object.assign(createPlainObject(), c);
		} catch (t) {
			if (t?.code === "ENOENT") return this._ensureDirectory(), createPlainObject();
			if (this.#n.clearInvalidConfig) {
				let s = t;
				if (s.name === "SyntaxError" || s.message?.startsWith("Config schema violation:")) return createPlainObject();
			}
			throw t;
		}
	}
	set store(t) {
		if (this._ensureDirectory(), !hasProperty(t, INTERNAL_KEY)) try {
			let s = fs.readFileSync(this.path, this.#t ? null : "utf8"), c = this._decryptData(s), l = this._deserialize(c);
			hasProperty(l, INTERNAL_KEY) && setProperty(t, INTERNAL_KEY, getProperty(l, INTERNAL_KEY));
		} catch {}
		this.#i || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
	}
	*[Symbol.iterator]() {
		for (let [t, s] of Object.entries(this.store)) this._isReservedKeyPath(t) || (yield [t, s]);
	}
	_closeWatcher() {
		this.#a &&= (this.#a.close(), void 0), this.#o &&= (fs.unwatchFile(this.path), !1), this.#s = void 0;
	}
	_decryptData(t) {
		if (!this.#t) return typeof t == "string" ? t : uint8ArrayToString(t);
		try {
			let s = t.slice(0, 16), c = crypto.pbkdf2Sync(this.#t, s, 1e4, 32, "sha512"), l = crypto.createDecipheriv(encryptionAlgorithm, c, s), u = t.slice(17), d = typeof u == "string" ? stringToUint8Array(u) : u;
			return uint8ArrayToString(concatUint8Arrays([l.update(d), l.final()]));
		} catch {
			try {
				let s = t.slice(0, 16), c = crypto.pbkdf2Sync(this.#t, s.toString(), 1e4, 32, "sha512"), l = crypto.createDecipheriv(encryptionAlgorithm, c, s), u = t.slice(17), d = typeof u == "string" ? stringToUint8Array(u) : u;
				return uint8ArrayToString(concatUint8Arrays([l.update(d), l.final()]));
			} catch {}
		}
		return typeof t == "string" ? t : uint8ArrayToString(t);
	}
	_handleStoreChange(t) {
		let s = this.store, c = () => {
			let c = s, l = this.store;
			isDeepStrictEqual(l, c) || (s = l, t.call(this, l, c));
		};
		return this.events.addEventListener("change", c), () => {
			this.events.removeEventListener("change", c);
		};
	}
	_handleValueChange(t, s) {
		let c = t(), l = () => {
			let l = c, u = t();
			isDeepStrictEqual(u, l) || (c = u, s.call(this, u, l));
		};
		return this.events.addEventListener("change", l), () => {
			this.events.removeEventListener("change", l);
		};
	}
	_deserialize = (t) => JSON.parse(t);
	_serialize = (t) => JSON.stringify(t, void 0, "	");
	_validate(t) {
		if (!this.#e || this.#e(t) || !this.#e.errors) return;
		let s = this.#e.errors.map(({ instancePath: t, message: s = "" }) => `\`${t.slice(1)}\` ${s}`);
		throw Error("Config schema violation: " + s.join("; "));
	}
	_ensureDirectory() {
		fs.mkdirSync(path.dirname(this.path), { recursive: !0 });
	}
	_write(t) {
		let s = this._serialize(t);
		if (this.#t) {
			let t = crypto.randomBytes(16), c = crypto.pbkdf2Sync(this.#t, t, 1e4, 32, "sha512"), l = crypto.createCipheriv(encryptionAlgorithm, c, t);
			s = concatUint8Arrays([
				t,
				stringToUint8Array(":"),
				l.update(stringToUint8Array(s)),
				l.final()
			]);
		}
		if (process$1.env.SNAP) fs.writeFileSync(this.path, s, { mode: this.#n.configFileMode });
		else try {
			writeFileSync(this.path, s, { mode: this.#n.configFileMode });
		} catch (t) {
			if (t?.code === "EXDEV") {
				fs.writeFileSync(this.path, s, { mode: this.#n.configFileMode });
				return;
			}
			throw t;
		}
	}
	_watch() {
		if (this._ensureDirectory(), fs.existsSync(this.path) || this._write(createPlainObject()), process$1.platform === "win32" || process$1.platform === "darwin") {
			this.#s ??= debounce_fn_default(() => {
				this.events.dispatchEvent(new Event("change"));
			}, { wait: 100 });
			let t = path.dirname(this.path), s = path.basename(this.path);
			this.#a = fs.watch(t, {
				persistent: !1,
				encoding: "utf8"
			}, (t, c) => {
				c && c !== s || typeof this.#s == "function" && this.#s();
			});
		} else this.#s ??= debounce_fn_default(() => {
			this.events.dispatchEvent(new Event("change"));
		}, { wait: 1e3 }), fs.watchFile(this.path, { persistent: !1 }, (t, s) => {
			typeof this.#s == "function" && this.#s();
		}), this.#o = !0;
	}
	_migrate(t, s, c) {
		let l = this._get(MIGRATION_KEY, "0.0.0"), u = Object.keys(t).filter((t) => this._shouldPerformMigration(t, l, s)), d = structuredClone(this.store);
		for (let f of u) try {
			c && c(this, {
				fromVersion: l,
				toVersion: f,
				finalVersion: s,
				versions: u
			});
			let p = t[f];
			p?.(this), this._set(MIGRATION_KEY, f), l = f, d = structuredClone(this.store);
		} catch (t) {
			this.store = d;
			try {
				this._write(d);
			} catch {}
			let s = t instanceof Error ? t.message : String(t);
			throw Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${s}`);
		}
		(this._isVersionInRangeFormat(l) || !import_semver.default.eq(l, s)) && this._set(MIGRATION_KEY, s);
	}
	_containsReservedKey(t) {
		return typeof t == "string" ? this._isReservedKeyPath(t) : !t || typeof t != "object" ? !1 : this._objectContainsReservedKey(t);
	}
	_objectContainsReservedKey(t) {
		if (!t || typeof t != "object") return !1;
		for (let [s, c] of Object.entries(t)) if (this._isReservedKeyPath(s) || this._objectContainsReservedKey(c)) return !0;
		return !1;
	}
	_isReservedKeyPath(t) {
		return t === INTERNAL_KEY || t.startsWith(`${INTERNAL_KEY}.`);
	}
	_isVersionInRangeFormat(t) {
		return import_semver.default.clean(t) === null;
	}
	_shouldPerformMigration(t, s, c) {
		return this._isVersionInRangeFormat(t) ? s !== "0.0.0" && import_semver.default.satisfies(s, t) ? !1 : import_semver.default.satisfies(c, t) : !(import_semver.default.lte(t, s) || import_semver.default.gt(t, c));
	}
	_get(t, s) {
		return getProperty(this.store, t, s);
	}
	_set(t, s) {
		let { store: c } = this;
		setProperty(c, t, s), this.store = c;
	}
	#c(t) {
		let s = {
			configName: "config",
			fileExtension: "json",
			projectSuffix: "nodejs",
			clearInvalidConfig: !1,
			accessPropertiesByDotNotation: !0,
			configFileMode: 438,
			...t
		};
		if (!s.cwd) {
			if (!s.projectName) throw Error("Please specify the `projectName` option.");
			s.cwd = envPaths(s.projectName, { suffix: s.projectSuffix }).config;
		}
		return typeof s.fileExtension == "string" && (s.fileExtension = s.fileExtension.replace(/^\.+/, "")), s;
	}
	#l(t) {
		if (!(t.schema ?? t.ajvOptions ?? t.rootSchema)) return;
		if (t.schema && typeof t.schema != "object") throw TypeError("The `schema` option must be an object.");
		let s = import_dist.default.default, c = new import__2020.Ajv2020({
			allErrors: !0,
			useDefaults: !0,
			...t.ajvOptions
		});
		s(c);
		let l = {
			...t.rootSchema,
			type: "object",
			properties: t.schema
		};
		this.#e = c.compile(l), this.#u(t.schema);
	}
	#u(t) {
		let s = Object.entries(t ?? {});
		for (let [t, c] of s) {
			if (!c || typeof c != "object" || !Object.hasOwn(c, "default")) continue;
			let { default: s } = c;
			s !== void 0 && (this.#r[t] = s);
		}
	}
	#d(t) {
		t.defaults && Object.assign(this.#r, t.defaults);
	}
	#f(t) {
		t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
	}
	#p(t) {
		let s = typeof t.fileExtension == "string" ? t.fileExtension : void 0, c = s ? `.${s}` : "";
		return path.resolve(t.cwd, `${t.configName ?? "config"}${c}`);
	}
	#m(t) {
		if (t.migrations) {
			this.#h(t), this._validate(this.store);
			return;
		}
		let s = this.store, c = Object.assign(createPlainObject(), t.defaults ?? {}, s);
		this._validate(c);
		try {
			assert.deepEqual(s, c);
		} catch {
			this.store = c;
		}
	}
	#h(t) {
		let { migrations: s, projectVersion: c } = t;
		if (s) {
			if (!c) throw Error("Please specify the `projectVersion` option.");
			this.#i = !0;
			try {
				let l = this.store, u = Object.assign(createPlainObject(), t.defaults ?? {}, l);
				try {
					assert.deepEqual(l, u);
				} catch {
					this._write(u);
				}
				this._migrate(s, c, t.beforeEachMigration);
			} finally {
				this.#i = !1;
			}
		}
	}
}, { app: app$1, ipcMain: ipcMain$1, shell: shell$1 } = electron, isInitialized = !1, initDataListener = () => {
	if (!ipcMain$1 || !app$1) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
	let t = {
		defaultCwd: app$1.getPath("userData"),
		appVersion: app$1.getVersion()
	};
	return isInitialized ? t : (ipcMain$1.on("electron-store-get-data", (s) => {
		s.returnValue = t;
	}), isInitialized = !0, t);
}, ElectronStore = class extends Conf {
	constructor(s) {
		let c, l;
		if (process$1.type === "renderer") {
			let s = electron.ipcRenderer.sendSync("electron-store-get-data");
			if (!s) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
			({defaultCwd: c, appVersion: l} = s);
		} else ipcMain$1 && app$1 && ({defaultCwd: c, appVersion: l} = initDataListener());
		s = {
			name: "config",
			...s
		}, s.projectVersion ||= l, s.cwd ? s.cwd = path.isAbsolute(s.cwd) ? s.cwd : path.join(c, s.cwd) : s.cwd = c, s.configName = s.name, delete s.name, super(s);
	}
	static initRenderer() {
		initDataListener();
	}
	async openInEditor() {
		let t = await shell$1.openPath(this.path);
		if (t) throw Error(t);
	}
}, require_constants = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = {
		LOCHDR: 30,
		LOCSIG: 67324752,
		LOCVER: 4,
		LOCFLG: 6,
		LOCHOW: 8,
		LOCTIM: 10,
		LOCCRC: 14,
		LOCSIZ: 18,
		LOCLEN: 22,
		LOCNAM: 26,
		LOCEXT: 28,
		EXTSIG: 134695760,
		EXTHDR: 16,
		EXTCRC: 4,
		EXTSIZ: 8,
		EXTLEN: 12,
		CENHDR: 46,
		CENSIG: 33639248,
		CENVEM: 4,
		CENVER: 6,
		CENFLG: 8,
		CENHOW: 10,
		CENTIM: 12,
		CENCRC: 16,
		CENSIZ: 20,
		CENLEN: 24,
		CENNAM: 28,
		CENEXT: 30,
		CENCOM: 32,
		CENDSK: 34,
		CENATT: 36,
		CENATX: 38,
		CENOFF: 42,
		ENDHDR: 22,
		ENDSIG: 101010256,
		ENDSUB: 8,
		ENDTOT: 10,
		ENDSIZ: 12,
		ENDOFF: 16,
		ENDCOM: 20,
		END64HDR: 20,
		END64SIG: 117853008,
		END64START: 4,
		END64OFF: 8,
		END64NUMDISKS: 16,
		ZIP64SIG: 101075792,
		ZIP64HDR: 56,
		ZIP64LEAD: 12,
		ZIP64SIZE: 4,
		ZIP64VEM: 12,
		ZIP64VER: 14,
		ZIP64DSK: 16,
		ZIP64DSKDIR: 20,
		ZIP64SUB: 24,
		ZIP64TOT: 32,
		ZIP64SIZB: 40,
		ZIP64OFF: 48,
		ZIP64EXTRA: 56,
		STORED: 0,
		SHRUNK: 1,
		REDUCED1: 2,
		REDUCED2: 3,
		REDUCED3: 4,
		REDUCED4: 5,
		IMPLODED: 6,
		DEFLATED: 8,
		ENHANCED_DEFLATED: 9,
		PKWARE: 10,
		BZIP2: 12,
		LZMA: 14,
		IBM_TERSE: 18,
		IBM_LZ77: 19,
		AES_ENCRYPT: 99,
		FLG_ENC: 1,
		FLG_COMP1: 2,
		FLG_COMP2: 4,
		FLG_DESC: 8,
		FLG_ENH: 16,
		FLG_PATCH: 32,
		FLG_STR: 64,
		FLG_EFS: 2048,
		FLG_MSK: 4096,
		FILE: 2,
		BUFFER: 1,
		NONE: 0,
		EF_ID: 0,
		EF_SIZE: 2,
		ID_ZIP64: 1,
		ID_AVINFO: 7,
		ID_PFS: 8,
		ID_OS2: 9,
		ID_NTFS: 10,
		ID_OPENVMS: 12,
		ID_UNIX: 13,
		ID_FORK: 14,
		ID_PATCH: 15,
		ID_X509_PKCS7: 20,
		ID_X509_CERTID_F: 21,
		ID_X509_CERTID_C: 22,
		ID_STRONGENC: 23,
		ID_RECORD_MGT: 24,
		ID_X509_PKCS7_RL: 25,
		ID_IBM1: 101,
		ID_IBM2: 102,
		ID_POSZIP: 18064,
		EF_ZIP64_OR_32: 4294967295,
		EF_ZIP64_OR_16: 65535,
		EF_ZIP64_SUNCOMP: 0,
		EF_ZIP64_SCOMP: 8,
		EF_ZIP64_RHO: 16,
		EF_ZIP64_DSN: 24
	};
})), require_errors = /* @__PURE__ */ __commonJSMin(((t) => {
	var s = {
		INVALID_LOC: "Invalid LOC header (bad signature)",
		INVALID_CEN: "Invalid CEN header (bad signature)",
		INVALID_END: "Invalid END header (bad signature)",
		DESCRIPTOR_NOT_EXIST: "No descriptor present",
		DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
		DESCRIPTOR_FAULTY: "Descriptor data is malformed",
		NO_DATA: "Nothing to decompress",
		BAD_CRC: "CRC32 checksum failed {0}",
		FILE_IN_THE_WAY: "There is a file in the way: {0}",
		UNKNOWN_METHOD: "Invalid/unsupported compression method",
		AVAIL_DATA: "inflate::Available inflate data did not terminate",
		INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
		TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
		INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
		INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
		INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
		INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
		INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
		INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
		INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
		CANT_EXTRACT_FILE: "Could not extract the file",
		CANT_OVERRIDE: "Target file already exists",
		DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
		NO_ZIP: "No zip file was loaded",
		NO_ENTRY: "Entry doesn't exist",
		DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
		FILE_NOT_FOUND: "File not found: \"{0}\"",
		NOT_IMPLEMENTED: "Not implemented",
		INVALID_FILENAME: "Invalid filename",
		INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
		INVALID_PASS_PARAM: "Incompatible password parameter",
		WRONG_PASSWORD: "Wrong Password",
		COMMENT_TOO_LONG: "Comment is too long",
		EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
	};
	function c(t) {
		return function(...s) {
			return s.length && (t = t.replace(/\{(\d)\}/g, (t, c) => s[c] || "")), /* @__PURE__ */ Error("ADM-ZIP: " + t);
		};
	}
	for (let l of Object.keys(s)) t[l] = c(s[l]);
})), require_utils = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("fs"), l = __require("path"), u = require_constants(), d = require_errors(), f = typeof process == "object" && process.platform === "win32", p = (t) => typeof t == "object" && !!t, m = new Uint32Array(256).map((t, s) => {
		for (let t = 0; t < 8; t++) s & 1 ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
		return s >>> 0;
	});
	function h(t) {
		this.sep = l.sep, this.fs = c, p(t) && p(t.fs) && typeof t.fs.statSync == "function" && (this.fs = t.fs);
	}
	s.exports = h, h.prototype.makeDir = function(t) {
		let s = this;
		function c(t) {
			let c = t.split(s.sep)[0];
			t.split(s.sep).forEach(function(t) {
				if (!(!t || t.substr(-1, 1) === ":")) {
					c += s.sep + t;
					var l;
					try {
						l = s.fs.statSync(c);
					} catch {
						s.fs.mkdirSync(c);
					}
					if (l && l.isFile()) throw d.FILE_IN_THE_WAY(`"${c}"`);
				}
			});
		}
		c(t);
	}, h.prototype.writeFileTo = function(t, s, c, u) {
		let d = this;
		if (d.fs.existsSync(t) && (!c || d.fs.statSync(t).isDirectory())) return !1;
		var f = l.dirname(t);
		d.fs.existsSync(f) || d.makeDir(f);
		var p;
		try {
			p = d.fs.openSync(t, "w", 438);
		} catch {
			d.fs.chmodSync(t, 438), p = d.fs.openSync(t, "w", 438);
		}
		if (p) try {
			d.fs.writeSync(p, s, 0, s.length, 0);
		} finally {
			d.fs.closeSync(p);
		}
		return d.fs.chmodSync(t, u || 438), !0;
	}, h.prototype.writeFileToAsync = function(t, s, c, u, d) {
		typeof u == "function" && (d = u, u = void 0);
		let f = this;
		f.fs.exists(t, function(p) {
			if (p && !c) return d(!1);
			f.fs.stat(t, function(c, m) {
				if (p && m.isDirectory()) return d(!1);
				var h = l.dirname(t);
				f.fs.exists(h, function(c) {
					c || f.makeDir(h), f.fs.open(t, "w", 438, function(c, l) {
						c ? f.fs.chmod(t, 438, function() {
							f.fs.open(t, "w", 438, function(c, l) {
								f.fs.write(l, s, 0, s.length, 0, function() {
									f.fs.close(l, function() {
										f.fs.chmod(t, u || 438, function() {
											d(!0);
										});
									});
								});
							});
						}) : l ? f.fs.write(l, s, 0, s.length, 0, function() {
							f.fs.close(l, function() {
								f.fs.chmod(t, u || 438, function() {
									d(!0);
								});
							});
						}) : f.fs.chmod(t, u || 438, function() {
							d(!0);
						});
					});
				});
			});
		});
	}, h.prototype.findFiles = function(t) {
		let s = this;
		function c(t, u, d) {
			typeof u == "boolean" && (d = u, u = void 0);
			let f = [];
			return s.fs.readdirSync(t).forEach(function(p) {
				let m = l.join(t, p), h = s.fs.statSync(m);
				(!u || u.test(m)) && f.push(l.normalize(m) + (h.isDirectory() ? s.sep : "")), h.isDirectory() && d && (f = f.concat(c(m, u, d)));
			}), f;
		}
		return c(t, void 0, !0);
	}, h.prototype.findFilesAsync = function(t, s) {
		let c = this, u = [];
		c.fs.readdir(t, function(d, f) {
			if (d) return s(d);
			let p = f.length;
			if (!p) return s(null, u);
			f.forEach(function(d) {
				d = l.join(t, d), c.fs.stat(d, function(t, f) {
					if (t) return s(t);
					f && (u.push(l.normalize(d) + (f.isDirectory() ? c.sep : "")), f.isDirectory() ? c.findFilesAsync(d, function(t, c) {
						if (t) return s(t);
						u = u.concat(c), --p || s(null, u);
					}) : --p || s(null, u));
				});
			});
		});
	}, h.prototype.getAttributes = function() {}, h.prototype.setAttributes = function() {}, h.crc32update = function(t, s) {
		return m[(t ^ s) & 255] ^ t >>> 8;
	}, h.crc32 = function(t) {
		typeof t == "string" && (t = Buffer.from(t, "utf8"));
		let s = t.length, c = -1;
		for (let l = 0; l < s;) c = h.crc32update(c, t[l++]);
		return ~c >>> 0;
	}, h.methodToString = function(t) {
		switch (t) {
			case u.STORED: return "STORED (" + t + ")";
			case u.DEFLATED: return "DEFLATED (" + t + ")";
			default: return "UNSUPPORTED (" + t + ")";
		}
	}, h.canonical = function(t) {
		if (!t) return "";
		let s = l.posix.normalize("/" + t.split("\\").join("/"));
		return l.join(".", s);
	}, h.zipnamefix = function(t) {
		if (!t) return "";
		let s = l.posix.normalize("/" + t.split("\\").join("/"));
		return l.posix.join(".", s);
	}, h.findLast = function(t, s) {
		if (!Array.isArray(t)) throw TypeError("arr is not array");
		let c = t.length >>> 0;
		for (let l = c - 1; l >= 0; l--) if (s(t[l], l, t)) return t[l];
	}, h.sanitize = function(t, s) {
		t = l.resolve(l.normalize(t));
		for (var c = s.split("/"), u = 0, d = c.length; u < d; u++) {
			var f = l.normalize(l.join(t, c.slice(u, d).join(l.sep)));
			if (f.indexOf(t) === 0) return f;
		}
		return l.normalize(l.join(t, l.basename(s)));
	}, h.toBuffer = function(t, s) {
		return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? s(t) : Buffer.alloc(0);
	}, h.readBigUInt64LE = function(t, s) {
		var c = Buffer.from(t.slice(s, s + 8));
		return c.swap64(), parseInt(`0x${c.toString("hex")}`);
	}, h.fromDOS2Date = function(t) {
		return new Date((t >> 25 & 127) + 1980, Math.max((t >> 21 & 15) - 1, 0), Math.max(t >> 16 & 31, 1), t >> 11 & 31, t >> 5 & 63, (t & 31) << 1);
	}, h.fromDate2DOS = function(t) {
		let s = 0, c = 0;
		return t.getFullYear() > 1979 && (s = (t.getFullYear() - 1980 & 127) << 9 | t.getMonth() + 1 << 5 | t.getDate(), c = t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1), s << 16 | c;
	}, h.isWin = f, h.crcTable = m;
})), require_fattr = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = __require("path");
	s.exports = function(t, { fs: s }) {
		var l = t || "", u = f(), d = null;
		function f() {
			return {
				directory: !1,
				readonly: !1,
				hidden: !1,
				executable: !1,
				mtime: 0,
				atime: 0
			};
		}
		return l && s.existsSync(l) ? (d = s.statSync(l), u.directory = d.isDirectory(), u.mtime = d.mtime, u.atime = d.atime, u.executable = (73 & d.mode) != 0, u.readonly = (128 & d.mode) == 0, u.hidden = c.basename(l)[0] === ".") : console.warn("Invalid path: " + l), {
			get directory() {
				return u.directory;
			},
			get readOnly() {
				return u.readonly;
			},
			get hidden() {
				return u.hidden;
			},
			get mtime() {
				return u.mtime;
			},
			get atime() {
				return u.atime;
			},
			get executable() {
				return u.executable;
			},
			decodeAttributes: function() {},
			encodeAttributes: function() {},
			toJSON: function() {
				return {
					path: l,
					isDirectory: u.directory,
					isReadOnly: u.readonly,
					isHidden: u.hidden,
					isExecutable: u.executable,
					mTime: u.mtime,
					aTime: u.atime
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_decoder = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = {
		efs: !0,
		encode: (t) => Buffer.from(t, "utf8"),
		decode: (t) => t.toString("utf8")
	};
})), require_util = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = require_utils(), s.exports.Constants = require_constants(), s.exports.Errors = require_errors(), s.exports.FileAttr = require_fattr(), s.exports.decoder = require_decoder();
})), require_entryHeader = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_util(), l = c.Constants;
	s.exports = function() {
		var t = 20, s = 10, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0, S = 0;
		t |= c.isWin ? 2560 : 768, u |= l.FLG_EFS;
		let C = { extraLen: 0 }, w = (t) => Math.max(0, t) >>> 0, T = (t) => Math.max(0, t) & 255;
		return f = c.fromDate2DOS(/* @__PURE__ */ new Date()), {
			get made() {
				return t;
			},
			set made(s) {
				t = s;
			},
			get version() {
				return s;
			},
			set version(t) {
				s = t;
			},
			get flags() {
				return u;
			},
			set flags(t) {
				u = t;
			},
			get flags_efs() {
				return (u & l.FLG_EFS) > 0;
			},
			set flags_efs(t) {
				t ? u |= l.FLG_EFS : u &= ~l.FLG_EFS;
			},
			get flags_desc() {
				return (u & l.FLG_DESC) > 0;
			},
			set flags_desc(t) {
				t ? u |= l.FLG_DESC : u &= ~l.FLG_DESC;
			},
			get method() {
				return d;
			},
			set method(t) {
				switch (t) {
					case l.STORED: this.version = 10;
					case l.DEFLATED:
					default: this.version = 20;
				}
				d = t;
			},
			get time() {
				return c.fromDOS2Date(this.timeval);
			},
			set time(t) {
				this.timeval = c.fromDate2DOS(t);
			},
			get timeval() {
				return f;
			},
			set timeval(t) {
				f = w(t);
			},
			get timeHighByte() {
				return T(f >>> 8);
			},
			get crc() {
				return p;
			},
			set crc(t) {
				p = w(t);
			},
			get compressedSize() {
				return m;
			},
			set compressedSize(t) {
				m = w(t);
			},
			get size() {
				return h;
			},
			set size(t) {
				h = w(t);
			},
			get fileNameLength() {
				return g;
			},
			set fileNameLength(t) {
				g = t;
			},
			get extraLength() {
				return _;
			},
			set extraLength(t) {
				_ = t;
			},
			get extraLocalLength() {
				return C.extraLen;
			},
			set extraLocalLength(t) {
				C.extraLen = t;
			},
			get commentLength() {
				return v;
			},
			set commentLength(t) {
				v = t;
			},
			get diskNumStart() {
				return y;
			},
			set diskNumStart(t) {
				y = w(t);
			},
			get inAttr() {
				return b;
			},
			set inAttr(t) {
				b = w(t);
			},
			get attr() {
				return x;
			},
			set attr(t) {
				x = w(t);
			},
			get fileAttr() {
				return (x || 0) >> 16 & 4095;
			},
			get offset() {
				return S;
			},
			set offset(t) {
				S = w(t);
			},
			get encrypted() {
				return (u & l.FLG_ENC) === l.FLG_ENC;
			},
			get centralHeaderSize() {
				return l.CENHDR + g + _ + v;
			},
			get realDataOffset() {
				return S + l.LOCHDR + C.fnameLen + C.extraLen;
			},
			get localHeader() {
				return C;
			},
			loadLocalHeaderFromBinary: function(t) {
				var s = t.slice(S, S + l.LOCHDR);
				if (s.readUInt32LE(0) !== l.LOCSIG) throw c.Errors.INVALID_LOC();
				C.version = s.readUInt16LE(l.LOCVER), C.flags = s.readUInt16LE(l.LOCFLG), C.method = s.readUInt16LE(l.LOCHOW), C.time = s.readUInt32LE(l.LOCTIM), C.crc = s.readUInt32LE(l.LOCCRC), C.compressedSize = s.readUInt32LE(l.LOCSIZ), C.size = s.readUInt32LE(l.LOCLEN), C.fnameLen = s.readUInt16LE(l.LOCNAM), C.extraLen = s.readUInt16LE(l.LOCEXT);
				let u = S + l.LOCHDR + C.fnameLen, d = u + C.extraLen;
				return t.slice(u, d);
			},
			loadFromBinary: function(C) {
				if (C.length !== l.CENHDR || C.readUInt32LE(0) !== l.CENSIG) throw c.Errors.INVALID_CEN();
				t = C.readUInt16LE(l.CENVEM), s = C.readUInt16LE(l.CENVER), u = C.readUInt16LE(l.CENFLG), d = C.readUInt16LE(l.CENHOW), f = C.readUInt32LE(l.CENTIM), p = C.readUInt32LE(l.CENCRC), m = C.readUInt32LE(l.CENSIZ), h = C.readUInt32LE(l.CENLEN), g = C.readUInt16LE(l.CENNAM), _ = C.readUInt16LE(l.CENEXT), v = C.readUInt16LE(l.CENCOM), y = C.readUInt16LE(l.CENDSK), b = C.readUInt16LE(l.CENATT), x = C.readUInt32LE(l.CENATX), S = C.readUInt32LE(l.CENOFF);
			},
			localHeaderToBinary: function() {
				var t = Buffer.alloc(l.LOCHDR);
				return t.writeUInt32LE(l.LOCSIG, 0), t.writeUInt16LE(s, l.LOCVER), t.writeUInt16LE(u, l.LOCFLG), t.writeUInt16LE(d, l.LOCHOW), t.writeUInt32LE(f, l.LOCTIM), t.writeUInt32LE(p, l.LOCCRC), t.writeUInt32LE(m, l.LOCSIZ), t.writeUInt32LE(h, l.LOCLEN), t.writeUInt16LE(g, l.LOCNAM), t.writeUInt16LE(C.extraLen, l.LOCEXT), t;
			},
			centralHeaderToBinary: function() {
				var c = Buffer.alloc(l.CENHDR + g + _ + v);
				return c.writeUInt32LE(l.CENSIG, 0), c.writeUInt16LE(t, l.CENVEM), c.writeUInt16LE(s, l.CENVER), c.writeUInt16LE(u, l.CENFLG), c.writeUInt16LE(d, l.CENHOW), c.writeUInt32LE(f, l.CENTIM), c.writeUInt32LE(p, l.CENCRC), c.writeUInt32LE(m, l.CENSIZ), c.writeUInt32LE(h, l.CENLEN), c.writeUInt16LE(g, l.CENNAM), c.writeUInt16LE(_, l.CENEXT), c.writeUInt16LE(v, l.CENCOM), c.writeUInt16LE(y, l.CENDSK), c.writeUInt16LE(b, l.CENATT), c.writeUInt32LE(x, l.CENATX), c.writeUInt32LE(S, l.CENOFF), c;
			},
			toJSON: function() {
				let f = function(t) {
					return t + " bytes";
				};
				return {
					made: t,
					version: s,
					flags: u,
					method: c.methodToString(d),
					time: this.time,
					crc: "0x" + p.toString(16).toUpperCase(),
					compressedSize: f(m),
					size: f(h),
					fileNameLength: f(g),
					extraLength: f(_),
					commentLength: f(v),
					diskNumStart: y,
					inAttr: b,
					attr: x,
					offset: S,
					centralHeaderSize: f(l.CENHDR + g + _ + v)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_mainHeader = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_util(), l = c.Constants;
	s.exports = function() {
		var t = 0, s = 0, u = 0, d = 0, f = 0;
		return {
			get diskEntries() {
				return t;
			},
			set diskEntries(c) {
				t = s = c;
			},
			get totalEntries() {
				return s;
			},
			set totalEntries(c) {
				s = t = c;
			},
			get size() {
				return u;
			},
			set size(t) {
				u = t;
			},
			get offset() {
				return d;
			},
			set offset(t) {
				d = t;
			},
			get commentLength() {
				return f;
			},
			set commentLength(t) {
				f = t;
			},
			get mainHeaderSize() {
				return l.ENDHDR + f;
			},
			loadFromBinary: function(p) {
				if ((p.length !== l.ENDHDR || p.readUInt32LE(0) !== l.ENDSIG) && (p.length < l.ZIP64HDR || p.readUInt32LE(0) !== l.ZIP64SIG)) throw c.Errors.INVALID_END();
				p.readUInt32LE(0) === l.ENDSIG ? (t = p.readUInt16LE(l.ENDSUB), s = p.readUInt16LE(l.ENDTOT), u = p.readUInt32LE(l.ENDSIZ), d = p.readUInt32LE(l.ENDOFF), f = p.readUInt16LE(l.ENDCOM)) : (t = c.readBigUInt64LE(p, l.ZIP64SUB), s = c.readBigUInt64LE(p, l.ZIP64TOT), u = c.readBigUInt64LE(p, l.ZIP64SIZE), d = c.readBigUInt64LE(p, l.ZIP64OFF), f = 0);
			},
			toBinary: function() {
				var c = Buffer.alloc(l.ENDHDR + f);
				return c.writeUInt32LE(l.ENDSIG, 0), c.writeUInt32LE(0, 4), c.writeUInt16LE(t, l.ENDSUB), c.writeUInt16LE(s, l.ENDTOT), c.writeUInt32LE(u, l.ENDSIZ), c.writeUInt32LE(d, l.ENDOFF), c.writeUInt16LE(f, l.ENDCOM), c.fill(" ", l.ENDHDR), c;
			},
			toJSON: function() {
				return {
					diskEntries: t,
					totalEntries: s,
					size: u + " bytes",
					offset: function(t, s) {
						let c = t.toString(16).toUpperCase();
						for (; c.length < s;) c = "0" + c;
						return "0x" + c;
					}(d, 4),
					commentLength: f
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_headers = /* @__PURE__ */ __commonJSMin(((t) => {
	t.EntryHeader = require_entryHeader(), t.MainHeader = require_mainHeader();
})), require_deflater = /* @__PURE__ */ __commonJSMin(((t, s) => {
	s.exports = function(t) {
		var s = __require("zlib"), c = { chunkSize: (parseInt(t.length / 1024) + 1) * 1024 };
		return {
			deflate: function() {
				return s.deflateRawSync(t, c);
			},
			deflateAsync: function(l) {
				var u = s.createDeflateRaw(c), d = [], f = 0;
				u.on("data", function(t) {
					d.push(t), f += t.length;
				}), u.on("end", function() {
					var t = Buffer.alloc(f), s = 0;
					t.fill(0);
					for (var c = 0; c < d.length; c++) {
						var u = d[c];
						u.copy(t, s), s += u.length;
					}
					l && l(t);
				}), u.end(t);
			}
		};
	};
})), require_inflater = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
	s.exports = function(t, s) {
		var l = __require("zlib");
		let u = c >= 15 && s > 0 ? { maxOutputLength: s } : {};
		return {
			inflate: function() {
				return l.inflateRawSync(t, u);
			},
			inflateAsync: function(s) {
				var c = l.createInflateRaw(u), d = [], f = 0;
				c.on("data", function(t) {
					d.push(t), f += t.length;
				}), c.on("end", function() {
					var t = Buffer.alloc(f), c = 0;
					t.fill(0);
					for (var l = 0; l < d.length; l++) {
						var u = d[l];
						u.copy(t, c), c += u.length;
					}
					s && s(t);
				}), c.end(t);
			}
		};
	};
})), require_zipcrypto = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var { randomFillSync: c } = __require("crypto"), l = require_errors(), u = new Uint32Array(256).map((t, s) => {
		for (let t = 0; t < 8; t++) s & 1 ? s = s >>> 1 ^ 3988292384 : s >>>= 1;
		return s >>> 0;
	}), d = (t, s) => Math.imul(t, s) >>> 0, f = (t, s) => u[(t ^ s) & 255] ^ t >>> 8, p = () => typeof c == "function" ? c(Buffer.alloc(12)) : p.node();
	p.node = () => {
		let t = Buffer.alloc(12), s = t.length;
		for (let c = 0; c < s; c++) t[c] = Math.random() * 256 & 255;
		return t;
	};
	var m = { genSalt: p };
	function h(t) {
		let s = Buffer.isBuffer(t) ? t : Buffer.from(t);
		this.keys = new Uint32Array([
			305419896,
			591751049,
			878082192
		]);
		for (let t = 0; t < s.length; t++) this.updateKeys(s[t]);
	}
	h.prototype.updateKeys = function(t) {
		let s = this.keys;
		return s[0] = f(s[0], t), s[1] += s[0] & 255, s[1] = d(s[1], 134775813) + 1, s[2] = f(s[2], s[1] >>> 24), t;
	}, h.prototype.next = function() {
		let t = (this.keys[2] | 2) >>> 0;
		return d(t, t ^ 1) >> 8 & 255;
	};
	function g(t) {
		let s = new h(t);
		return function(t) {
			let c = Buffer.alloc(t.length), l = 0;
			for (let u of t) c[l++] = s.updateKeys(u ^ s.next());
			return c;
		};
	}
	function _(t) {
		let s = new h(t);
		return function(t, c, l = 0) {
			c ||= Buffer.alloc(t.length);
			for (let u of t) {
				let t = s.next();
				c[l++] = u ^ t, s.updateKeys(u);
			}
			return c;
		};
	}
	function v(t, s, c) {
		if (!t || !Buffer.isBuffer(t) || t.length < 12) return Buffer.alloc(0);
		let u = g(c), d = u(t.slice(0, 12)), f = (s.flags & 8) == 8 ? s.timeHighByte : s.crc >>> 24;
		if (d[11] !== f) throw l.WRONG_PASSWORD();
		return u(t.slice(12));
	}
	function y(t) {
		Buffer.isBuffer(t) && t.length >= 12 ? m.genSalt = function() {
			return t.slice(0, 12);
		} : t === "node" ? m.genSalt = p.node : m.genSalt = p;
	}
	function b(t, s, c, l = !1) {
		t ??= Buffer.alloc(0), Buffer.isBuffer(t) || (t = Buffer.from(t.toString()));
		let u = _(c), d = m.genSalt();
		d[11] = s.crc >>> 24 & 255, l && (d[10] = s.crc >>> 16 & 255);
		let f = Buffer.alloc(t.length + 12);
		return u(d, f), u(t, f, 12);
	}
	s.exports = {
		decrypt: v,
		encrypt: b,
		_salter: y
	};
})), require_methods = /* @__PURE__ */ __commonJSMin(((t) => {
	t.Deflater = require_deflater(), t.Inflater = require_inflater(), t.ZipCrypto = require_zipcrypto();
})), require_zipEntry = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_util(), l = require_headers(), u = c.Constants, d = require_methods();
	s.exports = function(t, s) {
		var f = new l.EntryHeader(), p = Buffer.alloc(0), m = Buffer.alloc(0), h = !1, g = null, _ = Buffer.alloc(0), v = Buffer.alloc(0), y = !0;
		let b = t, x = typeof b.decoder == "object" ? b.decoder : c.decoder;
		y = x.hasOwnProperty("efs") ? x.efs : !1;
		function S() {
			return !s || !(s instanceof Uint8Array) ? Buffer.alloc(0) : (v = f.loadLocalHeaderFromBinary(s), s.slice(f.realDataOffset, f.realDataOffset + f.compressedSize));
		}
		function C(t) {
			if (f.flags_desc) {
				let l = {}, d = f.realDataOffset + f.compressedSize;
				if (s.readUInt32LE(d) == u.LOCSIG || s.readUInt32LE(d) == u.CENSIG) throw c.Errors.DESCRIPTOR_NOT_EXIST();
				if (s.readUInt32LE(d) == u.EXTSIG) l.crc = s.readUInt32LE(d + u.EXTCRC), l.compressedSize = s.readUInt32LE(d + u.EXTSIZ), l.size = s.readUInt32LE(d + u.EXTLEN);
				else if (s.readUInt16LE(d + 12) === 19280) l.crc = s.readUInt32LE(d + u.EXTCRC - 4), l.compressedSize = s.readUInt32LE(d + u.EXTSIZ - 4), l.size = s.readUInt32LE(d + u.EXTLEN - 4);
				else throw c.Errors.DESCRIPTOR_UNKNOWN();
				if (l.compressedSize !== f.compressedSize || l.size !== f.size || l.crc !== f.crc) throw c.Errors.DESCRIPTOR_FAULTY();
				if (c.crc32(t) !== l.crc) return !1;
			} else if (c.crc32(t) !== f.localHeader.crc) return !1;
			return !0;
		}
		function w(t, s, l) {
			if (s === void 0 && typeof t == "string" && (l = t, t = void 0), h) return t && s && s(Buffer.alloc(0), c.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
			var u = S();
			if (u.length === 0) return t && s && s(u), u;
			if (f.encrypted) {
				if (typeof l != "string" && !Buffer.isBuffer(l)) throw c.Errors.INVALID_PASS_PARAM();
				u = d.ZipCrypto.decrypt(u, f, l);
			}
			var m = Buffer.alloc(f.size);
			switch (f.method) {
				case c.Constants.STORED:
					if (u.copy(m), C(m)) return t && s && s(m), m;
					throw t && s && s(m, c.Errors.BAD_CRC()), c.Errors.BAD_CRC();
				case c.Constants.DEFLATED:
					var g = new d.Inflater(u, f.size);
					if (t) g.inflateAsync(function(t) {
						t.copy(t, 0), s && (C(t) ? s(t) : s(t, c.Errors.BAD_CRC()));
					});
					else {
						if (g.inflate(m).copy(m, 0), !C(m)) throw c.Errors.BAD_CRC(`"${x.decode(p)}"`);
						return m;
					}
					break;
				default: throw t && s && s(Buffer.alloc(0), c.Errors.UNKNOWN_METHOD()), c.Errors.UNKNOWN_METHOD();
			}
		}
		function T(t, l) {
			if ((!g || !g.length) && Buffer.isBuffer(s)) return t && l && l(S()), S();
			if (g.length && !h) {
				var u;
				switch (f.method) {
					case c.Constants.STORED: return f.compressedSize = f.size, u = Buffer.alloc(g.length), g.copy(u), t && l && l(u), u;
					default:
					case c.Constants.DEFLATED:
						var p = new d.Deflater(g);
						if (t) p.deflateAsync(function(t) {
							u = Buffer.alloc(t.length), f.compressedSize = t.length, t.copy(u), l && l(u);
						});
						else {
							var m = p.deflate();
							return f.compressedSize = m.length, m;
						}
						p = null;
						break;
				}
			} else if (t && l) l(Buffer.alloc(0));
			else return Buffer.alloc(0);
		}
		function E(t, s) {
			return (t.readUInt32LE(s + 4) << 4) + t.readUInt32LE(s);
		}
		function D(t) {
			try {
				for (var s = 0, l, d, f; s + 4 < t.length;) l = t.readUInt16LE(s), s += 2, d = t.readUInt16LE(s), s += 2, f = t.slice(s, s + d), s += d, u.ID_ZIP64 === l && O(f);
			} catch {
				throw c.Errors.EXTRA_FIELD_PARSE_ERROR();
			}
		}
		function O(t) {
			var s, c, l, d;
			t.length >= u.EF_ZIP64_SCOMP && (s = E(t, u.EF_ZIP64_SUNCOMP), f.size === u.EF_ZIP64_OR_32 && (f.size = s)), t.length >= u.EF_ZIP64_RHO && (c = E(t, u.EF_ZIP64_SCOMP), f.compressedSize === u.EF_ZIP64_OR_32 && (f.compressedSize = c)), t.length >= u.EF_ZIP64_DSN && (l = E(t, u.EF_ZIP64_RHO), f.offset === u.EF_ZIP64_OR_32 && (f.offset = l)), t.length >= u.EF_ZIP64_DSN + 4 && (d = t.readUInt32LE(u.EF_ZIP64_DSN), f.diskNumStart === u.EF_ZIP64_OR_16 && (f.diskNumStart = d));
		}
		return {
			get entryName() {
				return x.decode(p);
			},
			get rawEntryName() {
				return p;
			},
			set entryName(t) {
				p = c.toBuffer(t, x.encode);
				var s = p[p.length - 1];
				h = s === 47 || s === 92, f.fileNameLength = p.length;
			},
			get efs() {
				return typeof y == "function" ? y(this.entryName) : y;
			},
			get extra() {
				return _;
			},
			set extra(t) {
				_ = t, f.extraLength = t.length, D(t);
			},
			get comment() {
				return x.decode(m);
			},
			set comment(t) {
				if (m = c.toBuffer(t, x.encode), f.commentLength = m.length, m.length > 65535) throw c.Errors.COMMENT_TOO_LONG();
			},
			get name() {
				var t = x.decode(p);
				return h ? t.substr(t.length - 1).split("/").pop() : t.split("/").pop();
			},
			get isDirectory() {
				return h;
			},
			getCompressedData: function() {
				return T(!1, null);
			},
			getCompressedDataAsync: function(t) {
				T(!0, t);
			},
			setData: function(t) {
				g = c.toBuffer(t, c.decoder.encode), !h && g.length ? (f.size = g.length, f.method = c.Constants.DEFLATED, f.crc = c.crc32(t), f.changed = !0) : f.method = c.Constants.STORED;
			},
			getData: function(t) {
				return f.changed ? g : w(!1, null, t);
			},
			getDataAsync: function(t, s) {
				f.changed ? t(g) : w(!0, t, s);
			},
			set attr(t) {
				f.attr = t;
			},
			get attr() {
				return f.attr;
			},
			set header(t) {
				f.loadFromBinary(t);
			},
			get header() {
				return f;
			},
			packCentralHeader: function() {
				f.flags_efs = this.efs, f.extraLength = _.length;
				var t = f.centralHeaderToBinary(), s = c.Constants.CENHDR;
				return p.copy(t, s), s += p.length, _.copy(t, s), s += f.extraLength, m.copy(t, s), t;
			},
			packLocalHeader: function() {
				let t = 0;
				f.flags_efs = this.efs, f.extraLocalLength = v.length;
				let s = f.localHeaderToBinary(), c = Buffer.alloc(s.length + p.length + f.extraLocalLength);
				return s.copy(c, t), t += s.length, p.copy(c, t), t += p.length, v.copy(c, t), t += v.length, c;
			},
			toJSON: function() {
				let t = function(t) {
					return "<" + (t && t.length + " bytes buffer" || "null") + ">";
				};
				return {
					entryName: this.entryName,
					name: this.name,
					comment: this.comment,
					isDirectory: this.isDirectory,
					header: f.toJSON(),
					compressedData: t(s),
					data: t(g)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_zipFile = /* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_zipEntry(), l = require_headers(), u = require_util();
	s.exports = function(t, s) {
		var d = [], f = {}, p = Buffer.alloc(0), m = new l.MainHeader(), h = !1;
		let g = /* @__PURE__ */ new Set(), _ = s, { noSort: v, decoder: y } = _;
		t ? S(_.readEntries) : h = !0;
		function b() {
			let t = /* @__PURE__ */ new Set();
			for (let s of Object.keys(f)) {
				let c = s.split("/");
				if (c.pop(), c.length) for (let s = 0; s < c.length; s++) {
					let l = c.slice(0, s + 1).join("/") + "/";
					t.add(l);
				}
			}
			for (let s of t) if (!(s in f)) {
				let t = new c(_);
				t.entryName = s, t.attr = 16, t.temporary = !0, d.push(t), f[t.entryName] = t, g.add(t);
			}
		}
		function x() {
			if (h = !0, f = {}, m.diskEntries > (t.length - m.offset) / u.Constants.CENHDR) throw u.Errors.DISK_ENTRY_TOO_LARGE();
			d = Array(m.diskEntries);
			for (var s = m.offset, l = 0; l < d.length; l++) {
				var p = s, v = new c(_, t);
				v.header = t.slice(p, p += u.Constants.CENHDR), v.entryName = t.slice(p, p += v.header.fileNameLength), v.header.extraLength && (v.extra = t.slice(p, p += v.header.extraLength)), v.header.commentLength && (v.comment = t.slice(p, p + v.header.commentLength)), s += v.header.centralHeaderSize, d[l] = v, f[v.entryName] = v;
			}
			g.clear(), b();
		}
		function S(s) {
			var c = t.length - u.Constants.ENDHDR, l = Math.max(0, c - 65535), d = l, f = t.length, h = -1, g = 0;
			for (typeof _.trailingSpace == "boolean" && _.trailingSpace && (l = 0); c >= d; c--) if (t[c] === 80) {
				if (t.readUInt32LE(c) === u.Constants.ENDSIG) {
					h = c, g = c, f = c + u.Constants.ENDHDR, d = c - u.Constants.END64HDR;
					continue;
				}
				if (t.readUInt32LE(c) === u.Constants.END64SIG) {
					d = l;
					continue;
				}
				if (t.readUInt32LE(c) === u.Constants.ZIP64SIG) {
					h = c, f = c + u.readBigUInt64LE(t, c + u.Constants.ZIP64SIZE) + u.Constants.ZIP64LEAD;
					break;
				}
			}
			if (h == -1) throw u.Errors.INVALID_FORMAT();
			m.loadFromBinary(t.slice(h, f)), m.commentLength && (p = t.slice(g + u.Constants.ENDHDR)), s && x();
		}
		function C() {
			d.length > 1 && !v && d.sort((t, s) => t.entryName.toLowerCase().localeCompare(s.entryName.toLowerCase()));
		}
		return {
			get entries() {
				return h || x(), d.filter((t) => !g.has(t));
			},
			get comment() {
				return y.decode(p);
			},
			set comment(t) {
				p = u.toBuffer(t, y.encode), m.commentLength = p.length;
			},
			getEntryCount: function() {
				return h ? d.length : m.diskEntries;
			},
			forEach: function(t) {
				this.entries.forEach(t);
			},
			getEntry: function(t) {
				return h || x(), f[t] || null;
			},
			setEntry: function(t) {
				h || x(), d.push(t), f[t.entryName] = t, m.totalEntries = d.length;
			},
			deleteFile: function(t, s = !0) {
				h || x();
				let c = f[t];
				this.getEntryChildren(c, s).map((t) => t.entryName).forEach(this.deleteEntry);
			},
			deleteEntry: function(t) {
				h || x();
				let s = f[t], c = d.indexOf(s);
				c >= 0 && (d.splice(c, 1), delete f[t], m.totalEntries = d.length);
			},
			getEntryChildren: function(t, s = !0) {
				if (h || x(), typeof t == "object") if (t.isDirectory && s) {
					let s = [], c = t.entryName;
					for (let t of d) t.entryName.startsWith(c) && s.push(t);
					return s;
				} else return [t];
				return [];
			},
			getChildCount: function(t) {
				if (t && t.isDirectory) {
					let s = this.getEntryChildren(t);
					return s.includes(t) ? s.length - 1 : s.length;
				}
				return 0;
			},
			compressToBuffer: function() {
				h || x(), C();
				let s = [], c = [], l = 0, d = 0;
				m.size = 0, m.offset = 0;
				let f = 0;
				for (let t of this.entries) {
					let u = t.getCompressedData();
					t.header.offset = d;
					let p = t.packLocalHeader(), h = p.length + u.length;
					d += h, s.push(p), s.push(u);
					let g = t.packCentralHeader();
					c.push(g), m.size += g.length, l += h + g.length, f++;
				}
				l += m.mainHeaderSize, m.offset = d, m.totalEntries = f, d = 0;
				let g = Buffer.alloc(l);
				for (let t of s) t.copy(g, d), d += t.length;
				for (let t of c) t.copy(g, d), d += t.length;
				let _ = m.toBinary();
				return p && p.copy(_, u.Constants.ENDHDR), _.copy(g, d), t = g, h = !1, g;
			},
			toAsyncBuffer: function(s, c, l, d) {
				try {
					h || x(), C();
					let c = [], f = [], g = 0, _ = 0, v = 0;
					m.size = 0, m.offset = 0;
					let y = function(b) {
						if (b.length > 0) {
							let t = b.shift(), s = t.entryName + t.extra.toString();
							l && l(s), t.getCompressedDataAsync(function(l) {
								d && d(s), t.header.offset = _;
								let u = t.packLocalHeader(), p = u.length + l.length;
								_ += p, c.push(u), c.push(l);
								let h = t.packCentralHeader();
								f.push(h), m.size += h.length, g += p + h.length, v++, y(b);
							});
						} else {
							g += m.mainHeaderSize, m.offset = _, m.totalEntries = v, _ = 0;
							let l = Buffer.alloc(g);
							c.forEach(function(t) {
								t.copy(l, _), _ += t.length;
							}), f.forEach(function(t) {
								t.copy(l, _), _ += t.length;
							});
							let d = m.toBinary();
							p && p.copy(d, u.Constants.ENDHDR), d.copy(l, _), t = l, h = !1, s(l);
						}
					};
					y(Array.from(this.entries));
				} catch (t) {
					c(t);
				}
			}
		};
	};
})), import_adm_zip = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((t, s) => {
	var c = require_util(), l = __require("path"), u = require_zipEntry(), d = require_zipFile(), f = (...t) => c.findLast(t, (t) => typeof t == "boolean"), p = (...t) => c.findLast(t, (t) => typeof t == "string"), m = (...t) => c.findLast(t, (t) => typeof t == "function"), h = {
		noSort: !1,
		readEntries: !1,
		method: c.Constants.NONE,
		fs: null
	};
	s.exports = function(t, s) {
		let g = null, _ = Object.assign(Object.create(null), h);
		t && typeof t == "object" && (t instanceof Uint8Array || (Object.assign(_, t), t = _.input ? _.input : void 0, _.input && delete _.input), Buffer.isBuffer(t) && (g = t, _.method = c.Constants.BUFFER, t = void 0)), Object.assign(_, s);
		let v = new c(_);
		if ((typeof _.decoder != "object" || typeof _.decoder.encode != "function" || typeof _.decoder.decode != "function") && (_.decoder = c.decoder), t && typeof t == "string") if (v.fs.existsSync(t)) _.method = c.Constants.FILE, _.filename = t, g = v.fs.readFileSync(t);
		else throw c.Errors.INVALID_FILENAME();
		let y = new d(g, _), { canonical: b, sanitize: x, zipnamefix: S } = c;
		function C(t) {
			if (t && y) {
				var s;
				if (typeof t == "string" && (s = y.getEntry(l.posix.normalize(t))), typeof t == "object" && t.entryName !== void 0 && t.header !== void 0 && (s = y.getEntry(t.entryName)), s) return s;
			}
			return null;
		}
		function w(t) {
			let { join: s, normalize: c, sep: u } = l.posix;
			return s(".", c(u + t.split("\\").join(u) + u));
		}
		function T(t) {
			return t instanceof RegExp ? (function(t) {
				return function(s) {
					return t.test(s);
				};
			})(t) : typeof t == "function" ? t : () => !0;
		}
		let E = (t, s) => {
			let c = s.slice(-1);
			return c = c === v.sep ? v.sep : "", l.relative(t, s) + c;
		};
		return {
			readFile: function(t, s) {
				var c = C(t);
				return c && c.getData(s) || null;
			},
			childCount: function(t) {
				let s = C(t);
				if (s) return y.getChildCount(s);
			},
			readFileAsync: function(t, s) {
				var c = C(t);
				c ? c.getDataAsync(s) : s(null, "getEntry failed for:" + t);
			},
			readAsText: function(t, s) {
				var c = C(t);
				if (c) {
					var l = c.getData();
					if (l && l.length) return l.toString(s || "utf8");
				}
				return "";
			},
			readAsTextAsync: function(t, s, c) {
				var l = C(t);
				l ? l.getDataAsync(function(t, l) {
					if (l) {
						s(t, l);
						return;
					}
					t && t.length ? s(t.toString(c || "utf8")) : s("");
				}) : s("");
			},
			deleteFile: function(t, s = !0) {
				var c = C(t);
				c && y.deleteFile(c.entryName, s);
			},
			deleteEntry: function(t) {
				var s = C(t);
				s && y.deleteEntry(s.entryName);
			},
			addZipComment: function(t) {
				y.comment = t;
			},
			getZipComment: function() {
				return y.comment || "";
			},
			addZipEntryComment: function(t, s) {
				var c = C(t);
				c && (c.comment = s);
			},
			getZipEntryComment: function(t) {
				var s = C(t);
				return s && s.comment || "";
			},
			updateFile: function(t, s) {
				var c = C(t);
				c && c.setData(s);
			},
			addLocalFile: function(t, s, u, d) {
				if (v.fs.existsSync(t)) {
					s = s ? w(s) : "";
					let c = l.win32.basename(l.win32.normalize(t));
					s += u || c;
					let f = v.fs.statSync(t), p = f.isFile() ? v.fs.readFileSync(t) : Buffer.alloc(0);
					f.isDirectory() && (s += v.sep), this.addFile(s, p, d, f);
				} else throw c.Errors.FILE_NOT_FOUND(t);
			},
			addLocalFileAsync: function(t, s) {
				t = typeof t == "object" ? t : { localPath: t };
				let c = l.resolve(t.localPath), { comment: u } = t, { zipPath: d, zipName: f } = t, p = this;
				v.fs.stat(c, function(t, m) {
					if (t) return s(t, !1);
					d = d ? w(d) : "";
					let h = l.win32.basename(l.win32.normalize(c));
					if (d += f || h, m.isFile()) v.fs.readFile(c, function(t, c) {
						return t ? s(t, !1) : (p.addFile(d, c, u, m), setImmediate(s, void 0, !0));
					});
					else if (m.isDirectory()) return d += v.sep, p.addFile(d, Buffer.alloc(0), u, m), setImmediate(s, void 0, !0);
				});
			},
			addLocalFolder: function(t, s, u) {
				if (u = T(u), s = s ? w(s) : "", t = l.normalize(t), v.fs.existsSync(t)) {
					let c = v.findFiles(t), d = this;
					if (c.length) for (let f of c) {
						let c = l.join(s, E(t, f));
						u(c) && d.addLocalFile(f, l.dirname(c));
					}
				} else throw c.Errors.FILE_NOT_FOUND(t);
			},
			addLocalFolderAsync: function(t, s, u, d) {
				d = T(d), u = u ? w(u) : "", t = l.normalize(t);
				var f = this;
				v.fs.open(t, "r", function(l) {
					if (l && l.code === "ENOENT") s(void 0, c.Errors.FILE_NOT_FOUND(t));
					else if (l) s(void 0, l);
					else {
						var p = v.findFiles(t), m = -1, h = function() {
							if (m += 1, m < p.length) {
								var c = p[m], l = E(t, c).split("\\").join("/");
								l = l.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), d(l) ? v.fs.stat(c, function(t, d) {
									t && s(void 0, t), d.isFile() ? v.fs.readFile(c, function(t, c) {
										t ? s(void 0, t) : (f.addFile(u + l, c, "", d), h());
									}) : (f.addFile(u + l + "/", Buffer.alloc(0), "", d), h());
								}) : process.nextTick(() => {
									h();
								});
							} else s(!0, void 0);
						};
						h();
					}
				});
			},
			addLocalFolderAsync2: function(t, s) {
				let u = this;
				t = typeof t == "object" ? t : { localPath: t }, localPath = l.resolve(w(t.localPath));
				let { zipPath: d, filter: f, namefix: p } = t;
				f instanceof RegExp ? f = (function(t) {
					return function(s) {
						return t.test(s);
					};
				})(f) : typeof f != "function" && (f = function() {
					return !0;
				}), d = d ? w(d) : "", p == "latin1" && (p = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof p != "function" && (p = (t) => t);
				let m = (t) => l.join(d, p(E(localPath, t))), h = (t) => l.win32.basename(l.win32.normalize(p(t)));
				v.fs.open(localPath, "r", function(t) {
					t && t.code === "ENOENT" ? s(void 0, c.Errors.FILE_NOT_FOUND(localPath)) : t ? s(void 0, t) : v.findFilesAsync(localPath, function(t, c) {
						if (t) return s(t);
						c = c.filter((t) => f(m(t))), c.length || s(void 0, !1), setImmediate(c.reverse().reduce(function(t, s) {
							return function(c, d) {
								if (c || d === !1) return setImmediate(t, c, !1);
								u.addLocalFileAsync({
									localPath: s,
									zipPath: l.dirname(m(s)),
									zipName: h(s)
								}, t);
							};
						}, s));
					});
				});
			},
			addLocalFolderPromise: function(t, s) {
				return new Promise((c, l) => {
					this.addLocalFolderAsync2(Object.assign({ localPath: t }, s), (t, s) => {
						t && l(t), s && c(this);
					});
				});
			},
			addFile: function(t, s, c, l) {
				t = S(t);
				let d = C(t), f = d != null;
				f || (d = new u(_), d.entryName = t), d.comment = c || "";
				let p = typeof l == "object" && l instanceof v.fs.Stats;
				p && (d.header.time = l.mtime);
				var m = d.isDirectory ? 16 : 0;
				let h = d.isDirectory ? 16384 : 32768;
				return p ? h |= 4095 & l.mode : typeof l == "number" ? h |= 4095 & l : h |= d.isDirectory ? 493 : 420, m = (m | h << 16) >>> 0, d.attr = m, d.setData(s), f || y.setEntry(d), d;
			},
			getEntries: function(t) {
				return y.password = t, y ? y.entries : [];
			},
			getEntry: function(t) {
				return C(t);
			},
			getEntryCount: function() {
				return y.getEntryCount();
			},
			forEach: function(t) {
				return y.forEach(t);
			},
			extractEntryTo: function(t, s, u, d, m, h) {
				d = f(!1, d), m = f(!1, m), u = f(!0, u), h = p(m, h);
				var g = C(t);
				if (!g) throw c.Errors.NO_ENTRY();
				var _ = b(g.entryName), S = x(s, h && !g.isDirectory ? h : u ? _ : l.basename(_));
				if (g.isDirectory) return y.getEntryChildren(g).forEach(function(t) {
					if (t.isDirectory) return;
					var f = t.getData();
					if (!f) throw c.Errors.CANT_EXTRACT_FILE();
					var p = b(t.entryName), h = x(s, u ? p : l.basename(p));
					let g = m ? t.header.fileAttr : void 0;
					v.writeFileTo(h, f, d, g);
				}), !0;
				var w = g.getData(y.password);
				if (!w) throw c.Errors.CANT_EXTRACT_FILE();
				if (v.fs.existsSync(S) && !d) throw c.Errors.CANT_OVERRIDE();
				let T = m ? t.header.fileAttr : void 0;
				return v.writeFileTo(S, w, d, T), !0;
			},
			test: function(t) {
				if (!y) return !1;
				for (var s in y.entries) try {
					if (s.isDirectory) continue;
					if (!y.entries[s].getData(t)) return !1;
				} catch {
					return !1;
				}
				return !0;
			},
			extractAllTo: function(t, s, l, u) {
				if (l = f(!1, l), u = p(l, u), s = f(!1, s), !y) throw c.Errors.NO_ZIP();
				y.entries.forEach(function(d) {
					var f = x(t, b(d.entryName));
					if (d.isDirectory) {
						v.makeDir(f);
						return;
					}
					var p = d.getData(u);
					if (!p) throw c.Errors.CANT_EXTRACT_FILE();
					let m = l ? d.header.fileAttr : void 0;
					v.writeFileTo(f, p, s, m);
					try {
						v.fs.utimesSync(f, d.header.time, d.header.time);
					} catch {
						throw c.Errors.CANT_EXTRACT_FILE();
					}
				});
			},
			extractAllToAsync: function(t, s, u, d) {
				if (d = m(s, u, d), u = f(!1, u), s = f(!1, s), !d) return new Promise((c, l) => {
					this.extractAllToAsync(t, s, u, function(t) {
						t ? l(t) : c(this);
					});
				});
				if (!y) {
					d(c.Errors.NO_ZIP());
					return;
				}
				t = l.resolve(t);
				let p = (s) => x(t, l.normalize(b(s.entryName))), h = (t, s) => /* @__PURE__ */ Error(t + ": \"" + s + "\""), g = [], _ = [];
				y.entries.forEach((t) => {
					t.isDirectory ? g.push(t) : _.push(t);
				});
				for (let t of g) {
					let s = p(t), c = u ? t.header.fileAttr : void 0;
					try {
						v.makeDir(s), c && v.fs.chmodSync(s, c), v.fs.utimesSync(s, t.header.time, t.header.time);
					} catch {
						d(h("Unable to create folder", s));
					}
				}
				_.reverse().reduce(function(d, f) {
					return function(p) {
						if (p) d(p);
						else {
							let p = l.normalize(b(f.entryName)), m = x(t, p);
							f.getDataAsync(function(t, l) {
								if (l) d(l);
								else if (!t) d(c.Errors.CANT_EXTRACT_FILE());
								else {
									let c = u ? f.header.fileAttr : void 0;
									v.writeFileToAsync(m, t, s, c, function(t) {
										t || d(h("Unable to write file", m)), v.fs.utimes(m, f.header.time, f.header.time, function(t) {
											t ? d(h("Unable to set times", m)) : d();
										});
									});
								}
							});
						}
					};
				}, d)();
			},
			writeZip: function(t, s) {
				if (arguments.length === 1 && typeof t == "function" && (s = t, t = ""), !t && _.filename && (t = _.filename), t) {
					var c = y.compressToBuffer();
					if (c) {
						var l = v.writeFileTo(t, c, !0);
						typeof s == "function" && s(l ? null : /* @__PURE__ */ Error("failed"), "");
					}
				}
			},
			writeZipPromise: function(t, s) {
				let { overwrite: c, perm: l } = Object.assign({ overwrite: !0 }, s);
				return new Promise((s, u) => {
					!t && _.filename && (t = _.filename), t || u("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((d) => {
						v.writeFileToAsync(t, d, c, l, (t) => t ? s(t) : u("ADM-ZIP: Wasn't able to write zip file"));
					}, u);
				});
			},
			toBufferPromise: function() {
				return new Promise((t, s) => {
					y.toAsyncBuffer(t, s);
				});
			},
			toBuffer: function(t, s, c, l) {
				return typeof t == "function" ? (y.toAsyncBuffer(t, s, c, l), null) : y.compressToBuffer();
			}
		};
	};
})))(), 1), appMain_cmn = class t {
	static init(s) {
		t.#e = s, ElectronStore.initRenderer();
	}
	static #e;
	#t;
	#n = {
		getAppPath: app.getAppPath(),
		isPackaged: app.isPackaged,
		downloads: app.getPath("downloads"),
		userData: app.getPath("userData"),
		getVersion: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(s, c) {
		this.bw = s, this.version = c;
		let u = t.#e;
		this.#t = process.platform === "win32", s.webContents.on("devtools-opened", () => this.#l()), u.handle("openDevTools", () => s.webContents.openDevTools()), this.#n.getVersion = c, u.handle("getInfo", () => this.#n), u.handle("inited", (t, s, c) => this.#s(s, c)), u.handle("fetch", async (t, s) => {
			let c = await fetch(s, { cache: "no-store" });
			return {
				ok: c.ok,
				txt: await c.text()
			};
		}), u.handle("fetchAb", async (t, s) => {
			let c = await fetch(s, { cache: "no-store" });
			return {
				ok: c.ok,
				ab: await c.arrayBuffer()
			};
		}), u.handle("existsSync", (t, s) => (0, import_lib.existsSync)(s)), u.handle("copy", (t, s, c) => (0, import_lib.copy)(s, c)), u.handle("remove", (t, s) => (0, import_lib.remove)(s)), u.handle("ensureFile", (t, s) => (0, import_lib.ensureFile)(s)), u.handle("readFile", (t, s, c) => (0, import_lib.readFile)(s, c)), u.handle("writeFile", (t, s, c, l) => (0, import_lib.writeFile)(s, c, l)), u.handle("appendFile", (t, s, c) => (0, import_lib.appendFile)(s, c).catch((t) => console.error(t))), u.handle("outputFile", (t, s, c) => (0, import_lib.outputFile)(s, c).catch((t) => console.error(t))), u.handle("win_close", () => s.close()), u.handle("win_setTitle", (t, c) => s.setTitle(c)), u.handle("showMessageBox", (t, c) => dialog.showMessageBox(s, c)), u.handle("showOpenDialog", (t, c) => dialog.showOpenDialog(s, c)), u.handle("capturePage", (t, c, l, u) => s.webContents.capturePage().then(async (t) => {
			await (0, import_lib.ensureFile)(c);
			let s = t.resize({
				width: l,
				height: u,
				quality: "best"
			});
			await (0, import_lib.writeFile)(c, c.endsWith(".png") ? s.toPNG() : s.toJPEG(80));
		})), u.handle("navigate_to", (t, s) => shell.openExternal(s));
		let d;
		u.handle("Store", (t, s) => {
			d = new ElectronStore(s);
		}), u.handle("flush", (t, s) => {
			d.store = s;
		}), u.handle("Store_isEmpty", () => d.size === 0), u.handle("Store_get", () => d.store), u.handle("zip", async (t, s, c) => {
			let l = new import_adm_zip.default();
			l.addLocalFolder(s), await l.writeZipPromise(c);
		}), u.handle("unzip", async (t, s, c) => {
			await (0, import_lib.remove)(c), await (0, import_lib.ensureDir)(c), new import_adm_zip.default(s).extractAllTo(c, !0);
		}), u.handle("isSimpleFullScreen", () => s.simpleFullScreen), this.#t ? (u.handle("setSimpleFullScreen", (t, c) => {
			this.#f = () => {}, s.setSimpleFullScreen(c), c || (s.setPosition(this.#r, this.#i), s.setContentSize(this.#a, this.#o)), this.#f = () => this.#p();
		}), s.on("enter-full-screen", () => {
			this.#f = () => {}, s.setContentSize(this.#d.width, this.#d.height), this.#f = () => this.#p();
		}), s.on("leave-full-screen", () => {
			this.#h(!1, this.#r, this.#i, this.#a, this.#o);
		})) : u.handle("setSimpleFullScreen", (t, c) => {
			s.setSimpleFullScreen(c), !c && s.setContentSize(this.#a, this.#o);
		}), u.handle("window", (t, s, c, l, u, d) => this.#h(s, c, l, u, d)), s.on("move", () => this.#f()), s.on("resize", () => this.#f()), this.#u();
	}
	#s(t, s) {
		let { width: c, height: l } = t.window, { c: u, x: d, y: f, w: p } = s;
		this.#c = c / l;
		let m = p === c ? l : p / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#h(u, d, f, p, m), this.bw.show(), this.#f = () => this.#p(), t.debug.devtool) {
			this.#l = () => {}, this.openDevTools = () => this.bw.webContents.openDevTools({ mode: "detach" }), this.openDevTools();
			return;
		}
		this.#l = () => {
			this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.sendShutdown();
		};
	}
	#c = 0;
	#l = () => this.bw.webContents.closeDevTools();
	#u() {
		let t = screen.getCursorScreenPoint();
		this.#d = screen.getDisplayNearestPoint(t).workAreaSize;
	}
	#d;
	#f = () => {};
	#p() {
		if (this.#m) return;
		this.#f = () => {};
		let [t, s] = this.bw.getPosition(), [c, l] = this.bw.getContentSize();
		this.#m = setTimeout(() => {
			this.#m = void 0;
			let [u = 0, d = 0] = this.bw.getPosition(), [f = 0, p = 0] = this.bw.getContentSize();
			if (t !== u || s !== d || c !== f || l !== p) {
				this.#p();
				return;
			}
			this.#f = () => this.#p();
			let m = f, h = p;
			this.#t && (c === f ? h = f / this.#c : m = p * this.#c), this.#h(!1, u, d, m, h);
		}, 1e3 / 60 * 10);
	}
	#m = void 0;
	#h(t, s, c, l, u) {
		if (this.bw.simpleFullScreen) return;
		console.log(`fn:appMain.ts window c:${String(t)} (${String(s)},${String(c)},${String(l)},${String(u)}) scr(${String(this.#d.width)},${String(this.#d.height)})`), this.#f = () => {};
		let d = this.#r = Math.round(t ? (this.#d.width - l) * .5 : s), f = this.#i = Math.round(t ? (this.#d.height - u) * .5 : c);
		this.bw.setPosition(d, f);
		let p = this.#a = Math.round(l), m = this.#o = Math.round(u);
		this.bw.setContentSize(p, m), t || this.#u(), this.sendSaveWinInf({
			x: d,
			y: f,
			w: p,
			h: m
		}), this.#f = () => this.#p();
	}
	sendShutdown() {}
	sendSaveWinInf(t) {}
	openDevTools = () => {};
}, IpcListener = class {
	constructor() {
		this.listeners = [], this.handlers = [];
	}
	on(t, s) {
		this.listeners.push(t), ipcMain.on(t, s);
	}
	handle(t, s) {
		this.handlers.push(t), ipcMain.handle(t, s);
	}
	dispose() {
		this.listeners.forEach((t) => ipcMain.removeAllListeners(t)), this.listeners = [], this.handlers.forEach((t) => ipcMain.removeHandler(t)), this.handlers = [];
	}
}, IpcEmitter = class {
	send(t, s, ...c) {
		t.send(s, ...c);
	}
}, appMain = class t extends appMain_cmn {
	static initRenderer(c, l) {
		let u, d = () => {};
		try {
			appMain_cmn.init(new IpcListener()), u = new BrowserWindow({
				show: !1,
				minWidth: 300,
				minHeight: 300,
				acceptFirstMouse: !0,
				maximizable: !1,
				webPreferences: {
					preload: c,
					sandbox: !1
				}
			});
			let f = new t(u, l);
			d = () => f.openDevTools();
		} catch (t) {
			throw console.error(`early err:${String(t)}`), d(), "initRenderer error";
		}
		return u;
	}
	#e = new IpcEmitter();
	sendShutdown() {
		this.#e.send(this.bw.webContents, "shutdown");
	}
	sendSaveWinInf(t) {
		this.#e.send(this.bw.webContents, "save_win_inf", t);
	}
};
export { appMain };

//# sourceMappingURL=appMain.js.map