import "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

// Importar imágenes y sprites
import background from "../assets/game/ui/menu/checkersBG1.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import aplicar from "../assets/game/ui/menu/aplicar.png";
import cancelar from "../assets/game/ui/menu/cancelar.png";
import carmakeBG from "../assets/game/ui/menu/carmakeBG.png";
import armatucarro from "../assets/game/ui/menu/armatucarro.png";

//options

import a_white from "../assets/game/ui/menu/options/a.png";
import a_black from "../assets/game/ui/menu/options/a_held.png";

import b_white from "../assets/game/ui/menu/options/b.png";
import b_black from "../assets/game/ui/menu/options/b_held.png";

import c_white from "../assets/game/ui/menu/options/b.png";
import c_black from "../assets/game/ui/menu/options/b_held.png";

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
        this.load.image('background', background);
        this.load.image('levelTitleGS', lvlTitle);
        this.load.image('aplicar', aplicar);
        this.load.image('cancelar', cancelar);
        this.load.image('carmakeBG', carmakeBG);
        this.load.image('armatucarro', armatucarro);
        
        this.load.image('a_white', a_white);
        this.load.image('b_white', b_white);
        this.load.image('c_white', c_white);

        this.load.image('a_black', a_black);
        this.load.image('b_black', b_black);
        this.load.image('c_black', c_black);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const armatucarro = this.add.image(this.scale.width / 2, 200, 'armatucarro').setPosition(390,320).setScale(0.8).setDepth(-2);
        const carmakeBG = this.add.image(this.scale.width / 2, this.scale.height/2 , 'carmakeBG')
            .setPosition(275, this.scale.height / 2)
            .setScale(0.5,15)
            .setDepth(-5);

        const opciontext = this.add.text(780, 20, "OPCIÓN", {
            font: '700 40px Handjet-Regular',
            color: "#252525",
            align: 'right'
        }).setPosition(30, 185);
            

        const userText = this.add.text(780, 20, "Aqui puedes armar las opciones\nde los estudiantes.", {
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
                    targets: [armatucarro, btn_back],
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


        const cancelar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'cancelar').setPosition(960, 520).setScale(0.3).setDepth(-4)
            .setInteractive().on('pointerover', function () {
                cancelar.setTexture("cancelar");
                cancelar.setScale(0.35)
            }, this).on('pointerout', function () {
                cancelar.setTexture("cancelar");
                cancelar.setScale(0.3)
            }, this).on('pointerdown', function () {
                cancelar.setTexture("cancelar");
                userText.text = "";

                this.tweens.add({
                    targets: header,
                    y: 190, // Centro vertical de la pantalla
                    duration: 800,
                    ease: 'Power2',
                    onComplete: () => {
                        this.scene.start("LevelBlack"); // Cambia a tu escena del juego
                    }
                });
            }, this);


            const aplicar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'aplicar').setPosition(960, 450).setScale(0.3).setDepth(-4)
            .setInteractive().on('pointerover', function () {
                aplicar.setTexture("aplicar");
                aplicar.setScale(0.35)
            }, this).on('pointerout', function () {
                aplicar.setTexture("aplicar");
                aplicar.setScale(0.3)
            }, this).on('pointerdown', function () {
                aplicar.setTexture("aplicar");
                userText.text = "";

                this.tweens.add({
                    targets: header,
                    y: 190, // Centro vertical de la pantalla
                    duration: 800,
                    ease: 'Power2',
                    onComplete: () => {
                        this.scene.start("LevelBlack"); // Cambia a tu escena del juego
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
            targets: armatucarro,
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