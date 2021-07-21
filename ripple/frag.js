export const frag = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

uniform sampler2D image;
uniform vec2 click_pos;
uniform vec2 center;

varying vec2 v_texcoord;

float frequency(float max_f) {
    float turn = floor(sqrt(max_f));
    
    if(u_time < turn) {
        return max_f - pow(u_time - turn, 2.0);
    }
    else {
        return max_f;
    }
}

vec2 ripple(vec2 uv, float delay) {
    float radius = length(uv);
    return v_texcoord + (uv / radius) * cos(radius * frequency(60.0) - u_time * 4.0 + delay) * 0.03;
}

void main(void)
{   
    vec2 uv = v_texcoord;   
    uv -= click_pos / u_resolution;
    uv -= 0.5 + center;
     
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
    
    gl_FragColor = allChannel + redChannel + yellowChannel + cyanChannel + blueChannel;
}
`;
