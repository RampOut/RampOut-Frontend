import Phaser from "phaser";
import LevelDemo from "./LevelDemo";

// Importar imágenes y sprites
import background from "../assets/game/bg.png";
import header from "../assets/game/ui/menu/Header.png";
import logo from "../assets/game/ui/menu/RAMPOUT_logo.png";
import footer from "../assets/game/ui/menu/footer.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import btn_play_h from "../assets/game/ui/menu/btn_play/btn_play_hover.png";
import btn_play_a from "../assets/game/ui/menu/btn_play/btn_play_active.png";
import btn_exit from "../assets/game/ui/menu/btn_exit/btn_exit.png";
import carro from "../assets/game/carro.png";

export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', background);
        this.load.image('header', header);
        this.load.image('logo', logo);
        this.load.image('footer', footer);
        this.load.image('btn_play', btn_play);
        this.load.image('btn_play_hover', btn_play_h);
        this.load.image('btn_play_active', btn_play_a);
        this.load.image('btn_exit', btn_exit);
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        this.add.image(640, 5, 'header');
        this.add.image(640, 120, 'logo').setScale(0.6);
        const btn_play = this.add.image(1280/2, 280, 'btn_play').setScale(0.75);
        const btn_config = this.add.image(1280/2, 380, 'btn_play').setScale(0.75);
        const btn_exit = this.add.image(1280/2, 480, 'btn_exit').setScale(0.75);
        const footer = this.add.image(1280/2, 640, 'footer').setScale(1,0.9);
        
        btn_play.setInteractive();
        btn_config.setInteractive();
        btn_exit.setInteractive();

        btn_play.on('pointerover', function(){
            btn_play.setTexture("btn_play_hover");
            btn_play.setScale(0.85)
        }, this)

        btn_play.on('pointerout', function(){
            btn_play.setTexture("btn_play");
            btn_play.setScale(0.75)
        }, this)

        btn_play.on('pointerdown', function(){
            btn_play.setTexture("btn_play_active");
            setTimeout(() => {
                this.scene.add("Demo", LevelDemo);
                this.scene.start("Demo");
            }, 250);
        }, this)

        btn_exit.on('pointerdown', function(){
            setTimeout(() => {
                window.location.href = "/login"
            }, 250);
        }, this)
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}