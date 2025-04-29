import Phaser from "phaser";
import VHSShaderPipeline from "../VHSShaderPipeline";

import background from "../assets/game/ui/menu/checkersBG1.png";
import header from "../assets/game/ui/menu/Header.png";
import backBtn from "../assets/game/ui/menu/btn_back/btn_back.png";
import backBtn_h from "../assets/game/ui/menu/btn_back/btn_back_h.png";
import backBtn_a from "../assets/game/ui/menu/btn_back/btn_back_a.png";
import guTitle from "../assets/game/ui/menu/G_title.png";
import footer from "../assets/game/ui/menu/footer.png";
import cuadroTxt from "../assets/game/ui/menu/cuadroTXT.png"
import cancelar from "../assets/game/ui/menu/botonCancelar.png"
import aceptar from "../assets/game/ui/menu/botonAceptar.png"
import fontHJ from "../assets/game/fonts/Handjet-Regular.ttf";

export default class Guia extends Phaser.Scene {
    constructor() {
        super("Guia");
    }

    preload() {
        this.load.image('background', background);
        this.load.image('header', header);
        this.load.image('footer', footer);
        this.load.image('guiaTitle', guTitle);
        this.load.image('btn_back', backBtn);
        this.load.image('btn_back_h', backBtn_h);
        this.load.image('btn_back_a', backBtn_a);
        this.load.image('cuadroText', cuadroTxt);
        this.load.image('btn_cancel', cancelar);
        this.load.image('btn_accept', aceptar);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-6);

        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const guiaTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, 'guiaTitle').setPosition(300, -80).setScale(1).setDepth(-2);
        const cuadrotxt = this.add.image(this.scale.width / 2, this.scale.height / 2, 'cuadroText').setPosition(640, 300).setScale(0.6).setDepth(-5);
        const btn_cancel = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_cancel').setPosition(470, 500).setScale(0.6).setDepth(0.6);
        const btn_accept = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_accept').setPosition(810, 500).setScale(0.6).setDepth(0.6);


        const userText = this.add.text(950, 630, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet-Regular",
        });
    
        const explicacion = this.add.text(450, 35, "Aqui puedes escribir instrucciones", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-1);


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
                targets: [guiaTitle, btn_back],
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
            targets: guiaTitle,
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