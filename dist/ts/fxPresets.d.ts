export declare const V_SRC = "\nattribute vec2 aPos;\nvarying vec2 vTextureCoord;\nvoid main() {\n\tvTextureCoord = (aPos + 1.0) * 0.5;\n\tgl_Position = vec4(aPos, 0.0, 1.0);\n}";
export declare const PASSTHRU_SRC = "\nprecision mediump float;\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main() { gl_FragColor = texture2D(uSampler, vTextureCoord); }";
export declare const H_FX_FRAG: {
    readonly [fx: string]: string;
};
