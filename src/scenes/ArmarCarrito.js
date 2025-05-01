import "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

// Importar imágenes y sprites
import backgroundGS from "../assets/game/ui/menu/checkersBG1.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import startBtn from "../assets/game/ui/menu/btn_start/btn_start.png"
import startBtn_h from "../assets/game/ui/menu/btn_start/btn_start_h.png"
import startBtn_a from "../assets/game/ui/menu/btn_start/btn_start_a.png"
import carmakeBG from "../assets/game/ui/menu/carmakeBG.png"

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export default class ArmarCarrito extends Phaser.Scene {

    constructor() {
        super("ArmarCarrito");
    }

    preload() {
        // Cargar RexUI Plugin
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);

        // Cargar imágenes.
        this.load.image('backgroundGS', backgroundGS);
        this.load.image('levelTitleGS', lvlTitle);
        this.load.image('btn_start', startBtn);
        this.load.image('btn_start_h', startBtn_h);
        this.load.image('btn_start_a', startBtn_a);
        this.load.image('carmakeBG', carmakeBG);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const levelTitle = this.add.image(this.scale.width / 2, 200, 'levelTitleGS').setPosition(320).setScale(0.8).setDepth(-2);
        const carmakeBG = this.add.image(this.scale.width / 2, this.scale.height*2 , 'carmakeBG')
            .setPosition(300, this.scale.height / 2)
            .setScale(0.5)
            .setDepth(-5);

        const userText = this.add.text(800, 20, "Selecciona el carro que usaras\npara completar el reto.", {
            fontSize: 45,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
            align: 'right'
        });

        const btn_back = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_back').setPosition(100, 75).setScale(1).setDepth(-2).setInteractive()
            .on('pointerover', function () {
                btn_back.setTexture("btn_back_h");
                btn_back.setScale(1.1)
            }, this).on('pointerout', function () {
                btn_back.setTexture("btn_back");
                btn_back.setScale(1)
            }, this).on('pointerdown', function () {
                btn_back.setTexture("btn_back_a");
                userText.text = "";

                this.tweens.add({
                    targets: [levelTitle, btn_back],
                    y: -190, // Centro vertical de la pantalla
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: header,
                            y: 190, // Centro vertical de la pantalla
                            duration: 800,
                            ease: 'Power2',
                            onComplete: () => {
                                this.scene.start("LevelSelect"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);


        const btn_start = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_start').setPosition(640, 485).setScale(0.6).setDepth(-4)
            .setInteractive().on('pointerover', function () {
                btn_start.setTexture("btn_start_h");
                btn_start.setScale(0.75)
            }, this).on('pointerout', function () {
                btn_start.setTexture("btn_start");
                btn_start.setScale(0.6)
            }, this).on('pointerdown', function () {
                btn_start.setTexture("btn_start_a");
                userText.text = "";

                this.tweens.add({
                    targets: [levelTitle, btn_back],
                    y: -190, // Centro vertical de la pantalla
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: header,
                            y: 190, // Centro vertical de la pantalla
                            duration: 800,
                            ease: 'Power2',
                            onComplete: () => {
                                this.scene.start("LevelBlack"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);

        this.tweens.add({
            targets: header,
            y: -240, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: footer,
            y: 650, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: levelTitle,
            y: 70, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: btn_back,
            y: 75, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }

}