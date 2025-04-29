import Phaser from "phaser";

export default class LevelDemo extends Phaser.Scene {

    constructor() {
        super('Demo');
    }

    preload() {
        this.load.image('bg', 'assets/bg_demo.gif');
        this.load.image('logo', 'assets/RAMPOUT_logo.png');
        this.load.image('carro', 'assets/carro.png');
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'bg');

        const logo = this.add.image(640, 150, 'logo');

        const carro = this.add.image(640, 450, 'carro');
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}