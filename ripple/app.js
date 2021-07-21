import {frag} from './frag.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.sandbox = new GlslCanvas(this.canvas);
        this.sandbox.load(frag);
        this.sandbox.setUniform("image", "assets/images/r.png");

        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.canvas.addEventListener('click', this.click.bind(this), false);
    }

    resize() {
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;
        const s = Math.min(this.stageWidth, this.stageHeight);
        this.canvas.width = (s / 2)  * this.pixelRatio;
        this.canvas.height = (s / 2) * this.pixelRatio;

        this.cw = s / 2;
        this.ch = s / 2;
        this.canvas.style.width = this.cw + 'px';
        this.canvas.style.height = this.ch + 'px';
    }

    click(e) {
        this.sandbox.setUniform(
            "click_pos",
            (e.clientX - (this.stageWidth - this.cw) / 2) * (this.canvas.width / this.cw),
            this.canvas.height - (e.clientY - (this.stageHeight - this.ch) / 2) * (this.canvas.height / this.ch)
        );
        this.sandbox.setUniform("center", -0.5, -0.5);
    }
}

window.onload = () => {
    new App();
}