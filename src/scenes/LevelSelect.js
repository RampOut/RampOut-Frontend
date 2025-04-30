import "phaser";

// Importar imágenes y sprites
import backBtn from "../assets/game/ui/menu/btn_back/btn_back.png";
import backBtn_h from "../assets/game/ui/menu/btn_back/btn_back_h.png";
import backBtn_a from "../assets/game/ui/menu/btn_back/btn_back_a.png";
import lvlTitle from "../assets/game/ui/menu/LS_title.png";
import displayBtn from "../assets/game/ui/display_st1.png";

export default class LevelSelect extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    preload() {
        this.load.image('btn_back', backBtn);
        this.load.image('btn_back_h', backBtn_h);
        this.load.image('btn_back_a', backBtn_a);
        this.load.image('levelTitle', lvlTitle);
        this.load.image('btn_display', displayBtn);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const levelTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelTitle').setPosition(460, -80).setScale(0.4).setDepth(-2);
        const btn_display1 = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_display').setPosition(640, 300).setScale(0.6).setDepth(-5);
        const btn_display2 = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_display').setPosition(640, 460).setScale(0.6).setDepth(-5);

        const userText = this.add.text(950, 635, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet-Regular",
        });

        const lvl1 = this.add.text(400, 258, "01", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);

        const lvl2 = this.add.text(400, 418, "02", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);

        const setuplvl1 = this.add.text(500, 266, "EMPEZAR", {
            fontSize: 55,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4).setInteractive()
            .on('pointerover', function () {
                setuplvl1.setColor("#95E8E8");
            }).on('pointerout', function () {
                setuplvl1.setColor("#FFFFFF");
            }).on('pointerdown', function () {
                setuplvl1.setColor("#FFFE91");
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
                                this.scene.start("LevelGameSetup"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);

        const setuplvl2 = this.add.text(500, 426, "EMPEZAR", {
            fontSize: 55,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4).setInteractive()
            .on('pointerover', function () {
                setuplvl2.setColor("#95E8E8");
            }).on('pointerout', function () {
                setuplvl2.setColor("#FFFFFF");
            }).on('pointerdown', function () {
                setuplvl2.setColor("#FFFE91");
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
                                this.scene.start("LevelGameSetup"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);

        const VP1 = this.add.text(700, 266, "VER PUNTAJES", {
            fontSize: 55,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4).setInteractive()
            .on('pointerover', function () {
                VP1.setColor("#95E8E8");
            }).on('pointerout', function () {
                VP1.setColor("#FFFFFF");
            }).on('pointerdown', function () {
                VP1.setColor("#FFFE91");
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
                                this.scene.start("LevelResults"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);

        const VP2 = this.add.text(700, 426, "VER PUNTAJES", {
            fontSize: 55,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4).setInteractive()
            .on('pointerover', function () {
                VP2.setColor("#95E8E8");
            }).on('pointerout', function () {
                VP2.setColor("#FFFFFF");
            }).on('pointerdown', function () {
                VP2.setColor("#FFFE91");
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
                                this.scene.start("LevelResults"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);

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
                                this.scene.start("Start"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this)

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
            y: 60, // Centro vertical de la pantalla
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