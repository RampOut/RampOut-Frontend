import "phaser";

// Importar imágenes y sprites
import backgroundGS from "../assets/game/ui/menu/checkersPurple.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import startBtn from "../assets/game/ui/menu/btn_start/btn_start.png"
import startBtn_h from "../assets/game/ui/menu/btn_start/btn_start_h.png"
import startBtn_a from "../assets/game/ui/menu/btn_start/btn_start_a.png"
import { nombreEquipo1, nombreEquipo2, equipo1, equipo2 } from "./LevelStudentTeam";

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export default class LevelGameSetup extends Phaser.Scene {

    constructor() {
        super("LevelGameSetup");
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
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const levelTitle = this.add.image(this.scale.width / 2, 200, 'levelTitleGS').setPosition(320).setScale(0.8).setDepth(-2);

        const userText = this.add.text(950, 635, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet",
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

        let pintarPanelT1 = function (s, arr) {
            let panelScroll = s.rexUI.add.sizer({
                width: 100,
                orientation: 'y',
                space: { item: 0 }
            })

            for (let x = 0; x < arr.length; x++) {
                let desc = `${x + 1}.-  ${arr[x]}`;
                let texto = s.rexUI.add.label({
                    background: s.rexUI.add.roundRectangle({
                        color: COLOR_WHITE,
                        strokeColor: 0x000000,
                        strokeWidth: 2,
                    }),
                    text: s.add.text(0, 0, desc, {
                        fontSize: 32,
                        color: `${COLOR_BLACK}`,
                        fontFamily: "Handjet",
                    }),
                    space: { left: 10, right: 10, top: 5, bottom: 5 },
                    name: desc,
                })
                panelScroll.add(texto, { expand: true });
            }
            return panelScroll;
        }

        this.rexUI.add.roundRectangle({ width: 450, height: 50, color: COLOR_BLACK, strokeColor: COLOR_BLACK, strokeWidth: 2 }).setPosition(350, 215).setDepth(-4);
        this.add.text(300, 193, `${nombreEquipo1}`, {
            fontSize: 40,
            color: "#FFFFFF",
            fontFamily: "Handjet",
        }).setDepth(-3);

        let scrollT1 = this.rexUI.add.scrollablePanel({
            x: 350,
            y: 330,
            width: 450,
            height: 180,
            scrollMode: 0,
            background: this.rexUI.add.roundRectangle({
                color: COLOR_GRAY2,
                strokeColor: COLOR_BLACK,
                strokeWidth: 2
            }),
            panel: {
                child: pintarPanelT1(this, equipo1),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, height: 20, color: COLOR_GRAY2, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
                thumb: this.rexUI.add.roundRectangle({ width: 20, height: 45, color: COLOR_GRAY, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
            },

            space: { panel: 0 }
        })
            .layout().setDepth(-4);

        this.rexUI.add.roundRectangle({ width: 450, height: 50, color: COLOR_BLACK, strokeColor: COLOR_BLACK, strokeWidth: 2 }).setPosition(930, 215).setDepth(-4);
        this.add.text(880, 193, `${nombreEquipo2}`, {
            fontSize: 40,
            color: "#FFFFFF",
            fontFamily: "Handjet",
        }).setDepth(-3);

        let scrollT2 = this.rexUI.add.scrollablePanel({
            x: 930,
            y: 330,
            width: 450,
            height: 180,
            scrollMode: 0,
            background: this.rexUI.add.roundRectangle({
                color: COLOR_GRAY2,
                strokeColor: COLOR_BLACK,
                strokeWidth: 2
            }),
            panel: {
                child: pintarPanelT1(this, equipo2),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, height: 20, color: COLOR_GRAY2, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
                thumb: this.rexUI.add.roundRectangle({ width: 20, height: 45, color: COLOR_GRAY, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
            },

            space: { panel: 0 }
        })
            .layout().setDepth(-4);

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
                                this.scene.start("LevelBuildYourCarTeacher");
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