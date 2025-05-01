import "phaser";
import VHSShaderPipeline from "../VHSShaderPipeline";

// Importar imágenes y sprites
import background from "../assets/game/ui/menu/checkersBG1.png";
import header from "../assets/game/ui/menu/Header.png";
import logo from "../assets/game/ui/menu/RAMPOUT_logo.png";
import footer from "../assets/game/ui/menu/footer.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import btn_play_h from "../assets/game/ui/menu/btn_play/btn_play_hover.png";
import btn_play_a from "../assets/game/ui/menu/btn_play/btn_play_active.png";
import btn_exit from "../assets/game/ui/menu/btn_exit/btn_exit.png";
import btn_exit_h from "../assets/game/ui/menu/btn_exit/btn_exit_h.png";
import btn_exit_a from "../assets/game/ui/menu/btn_exit/btn_exit_a.png";
import btn_config from "../assets/game/ui/menu/btn_config/btn_config.png";
import btn_config_h from "../assets/game/ui/menu/btn_config/btn_config_h.png";
import btn_config_a from "../assets/game/ui/menu/btn_config/btn_config_a.png";
import fontHJ from "../assets/game/fonts/Handjet-Regular.ttf";
import fontHJsb from "../assets/game/fonts/Handjet-SemiBold.ttf";

export default class Start extends Phaser.Scene {
    constructor() {
        super("Start");
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
        this.load.image('btn_exit_hover', btn_exit_h);
        this.load.image('btn_exit_active', btn_exit_a);
        this.load.image('btn_config', btn_config);
        this.load.image('btn_config_hover', btn_config_h);
        this.load.image('btn_config_active', btn_config_a);
        this.load.font("Handjet-Regular", fontHJ, "truetype");
        this.load.font("Handjet-SemiBold", fontHJsb, "truetype");

    }

    create() {
        this.renderer.pipelines.add('VHSShader', new VHSShaderPipeline(this.game));

        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-4);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, 190).setScale(2).setDepth(-2);
        const logo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo').setPosition(640, -190).setScale(0.75);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const userText = this.add.text(950, 635, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet-Regular",
        });

        const btn_play = this.add.image(this.scale.width / 2, 300, 'btn_play').setScale(0.75).setDepth(-3)
            .setInteractive().on('pointerover', function () {
                btn_play.setTexture("btn_play_hover");
                btn_play.setScale(0.85)
            }, this).on('pointerout', function () {
                btn_play.setTexture("btn_play");
                btn_play.setScale(0.75)
            }, this).on('pointerdown', function () {
                btn_play.setTexture("btn_play_active");
                userText.setDepth(-4);

                this.tweens.add({
                    targets: logo,
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
            }, this)

            const btn_config = this.add.image(this.scale.width / 2, 400, 'btn_config').setScale(0.75).setDepth(-3)
            .setInteractive()
            .on('pointerover', function () {
                btn_config.setTexture("btn_config_hover");
                btn_config.setScale(0.85)
            }, this)
            .on('pointerout', function () {
                btn_config.setTexture("btn_config");
                btn_config.setScale(0.75)
            }, this)
            .on('pointerdown', function () {
                btn_config.setTexture("btn_config_active");
                userText.setDepth(-4);

                this.tweens.add({
                    targets: logo,
                    y: -190,
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: header,
                            y: 190,
                            duration: 800,
                            ease: 'Power2',
                            onComplete: () => {
                                this.scene.start("ArmarCarrito"); // Aquí el hechizo, la puerta, el pasaje.
                            }
                        });
                    }
                });
            }, this);

        const btn_exit = this.add.image(this.scale.width / 2, 500, 'btn_exit').setScale(0.75).setDepth(-3)
            .setInteractive().on('pointerover', function () {
                btn_exit.setTexture("btn_exit_hover");
                btn_exit.setScale(0.85)
            }, this).on('pointerout', function () {
                btn_exit.setTexture("btn_exit");
                btn_exit.setScale(0.75)
            }, this).on('pointerdown', function () {
                btn_exit.setTexture("btn_exit_active");
                setTimeout(() => {
                    window.location.href = "/"
                }, 300);
            }, this);

        this.tweens.add({
            targets: header,
            y: -160, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: logo,
            y: 110, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });
    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }
}