// Shadertoy形式のシンプルな降雪フラグメントシェーダー例
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    vec3 col = vec3(0.1, 0.1, 0.2); // 夜空や暗めの背景色
    
    float t = iTime * 0.5;
    for(float i = 0.0; i < 5.0; i++) {
        vec2 p = uv + vec2(sin(t + i) * 0.5, -t * (i + 1.0) * 0.2);
        p = fract(p * 2.0) - 0.5;
        float d = length(p);
        float m = smoothstep(0.05, 0.0, d);
        col += vec3(m);
    }
    
    fragColor = vec4(col, 1.0);
}
