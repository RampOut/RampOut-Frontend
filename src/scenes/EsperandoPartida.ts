import "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

// Importar imágenes y sprites
import backgroundGS from "../assets/game/ui/menu/checkersPurple.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import regresarBtn from "../assets/game/ui/menu/botonRegresar.png";
import startBtn from "../assets/game/ui/menu/btn_start/btn_start.png"
import startBtn_h from "../assets/game/ui/menu/btn_start/btn_start_h.png"
import startBtn_a from "../assets/game/ui/menu/btn_start/btn_start_a.png"

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export default class EsperandoPartida extends Phaser.Scene {

    constructor() {
        super("EsperandoPartida");
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
        this.load.image('botonRegresar', regresarBtn);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);

        // Center the title at the middle of the screen
        const levelTitle = this.add.text(this.scale.width / 2, this.scale.height / 2, 'ESPERANDO A QUE EL PROFESOR\nINICIE LA PARTIDA...', {
            fontSize: 75,
            fontFamily: "Handjet",
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.8).setDepth(-3);

        // Ensure it stays centered by setting position directly
        levelTitle.setPosition(this.scale.width / 2, this.scale.height / 2);


        const btn_regresar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'botonRegresar').setPosition(640, 510).setScale(0.3).setDepth(-4)
            .setInteractive({useHandCursor: true}).on('pointerover', function () {
                btn_regresar.setTexture("botonRegresar");
                btn_regresar.setScale(0.35)
            }, this).on('pointerout', function () {
                btn_regresar.setTexture("botonRegresar");
                btn_regresar.setScale(0.3)
            }, this).on('pointerdown', function () {
                btn_regresar.setTexture("botonRegresar");

                this.tweens.add({
                    targets: header,
                    y: 340, // Centro vertical de la pantalla
                    duration: 800,
                    ease: 'Power2',
                    onComplete: () => {
                        this.scene.start("Start"); // Cambia a tu escena del juego
                    }
                });
            }, this);

        this.tweens.add({
            targets: header,
            y: -380, // Centro vertical de la pantalla
            duration: 430,
            ease: 'Power2',
        });


        // Removed unnecessary tween for levelTitle since it's already centered
    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }
}
