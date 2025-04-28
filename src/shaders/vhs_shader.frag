precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D uMainSampler;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    // Añadir ruido aleatorio (para simular interferencia VHS)
    float noise = sin(uv.x * 10.0 + time * 0.2) * 0.1;
    
    // Desfase de la imagen para simular la distorsión del VHS
    uv.x += noise;

    // Obtener el color del píxel original
    vec4 color = texture2D(uMainSampler, uv);
    
    // Simular un filtro de color VHS (puedes jugar con estos valores para obtener diferentes tonos)
    float r = color.r + noise * 0.5;
    float g = color.g - noise * 0.3;
    float b = color.b + noise * 0.2;

    // Añadir un poco de retroalimentación de la señal
    vec4 finalColor = vec4(r, g, b, color.a);
    gl_FragColor = finalColor;
}