import Phaser from "phaser"; 

export default class VHSShaderPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
    constructor(game) {
        super({
            game,
            renderer: game.renderer,
            fragShader: `
                precision mediump float;

                uniform float     time;
                uniform vec2      resolution;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;

                void main(void) {
                    vec2 uv = outTexCoord;
                    float y = sin(uv.y * 10.0 + time * 2.0) * 0.015;
                    gl_FragColor = texture2D(uMainSampler, vec2(uv.x + y, uv.y));
                }
            `
        });
    }

    onPreRender() {
        this.set1f('time', this.game.loop.time / 1000);
        this.set2f('resolution', this.renderer.width, this.renderer.height);
    }
}