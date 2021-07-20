import {frag} from './frag.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.sandbox = new GlslCanvas(this.canvas);
        this.sandbox.load(frag);
        this.sandbox.setUniform("image", "assets/images/r.png");
        this.sandbox.setUniform("click_pos", 200.0, 100.0);

        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        this.canvas.addEventListener('click', this.click.bind(this), false);
    }

    resize() {
        this.stageWidth = window.innerWidth / 2;
        this.stageHeight = window.innerHeight / 2;
        const s = Math.min(this.stageWidth, this.stageHeight);
        this.canvas.width = s * this.pixelRatio;
        this.canvas.height = s * this.pixelRatio;
        this.canvas.style.width = s + 'px';
        this.canvas.style.height = s + 'px';
    }

    click(e) {
        const s = Math.min(this.stageWidth, this.stageHeight);
        this.sandbox.setUniform(
            "click_pos",
            (e.clientX - (this.stageWidth - this.canvas.width / 2)),
            this.stageHeight * 2 - (e.clientY - this.stageHeight / 2) * (this.canvas.height / s)
        );
    }
}

window.onload = () => {
    new App();
}