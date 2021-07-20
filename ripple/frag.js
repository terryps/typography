export const frag = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

uniform sampler2D image;
uniform vec2 click_pos;

varying vec2 v_texcoord;

vec2 ripple(vec2 uv, float delay) {
    float radius = length(uv);
    return v_texcoord + (uv / radius) * cos(radius * 12.0 - u_time * 4.0 + delay) * 0.03;
}

void main(void)
{   
    vec2 uv = v_texcoord;
    
    vec4 allChannel = texture2D(image, ripple(uv, 0.0));
    
    vec4 redChannel = texture2D(image, ripple(uv, 0.5));
    redChannel.g = 0.0;
    redChannel.b = 0.0;
    
    vec4 yellowChannel = texture2D(image, ripple(uv, 0.25));
    yellowChannel.b = 0.0;
    
    vec4 cyanChannel = texture2D(image, ripple(uv, -0.25));
    cyanChannel.r = 0.0;
    
    vec4 blueChannel = texture2D(image, ripple(uv, -0.5));
    blueChannel.r = 0.0;
    blueChannel.g = 0.0;
    
    // gl_FragColor = allChannel + redChannel +yellowChannel + cyanChannel + blueChannel;
    
    vec4 color = texture2D(image, ripple(uv - click_pos / u_resolution, 0.0));
    // vec4 color = texture2D(image, uv);
    gl_FragColor = color;
}
`;
