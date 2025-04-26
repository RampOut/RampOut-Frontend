import Phaser from "phaser";
import VHSShaderPipeline from "../VHSShaderPipeline";

// Importar imágenes y sprites
import background from "../assets/game/ui/menu/checkersBG1.png";
import header from "../assets/game/ui/menu/Header.png";
import backBtn from "../assets/game/ui/menu/btn_back/btn_back.png";
import backBtn_h from "../assets/game/ui/menu/btn_back/btn_back_h.png";
import backBtn_a from "../assets/game/ui/menu/btn_back/btn_back_a.png";
import lvlTitle from "../assets/game/ui/menu/LS_title.png";
import footer from "../assets/game/ui/menu/footer.png";
import displayBtn from "../assets/game/ui/display_st1.png";
import fontHJ from "../assets/game/fonts/Handjet-Regular.ttf";

export default class LevelSelect extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    preload() {
        this.load.image('background', background);
        this.load.image('header', header);
        this.load.image('footer', footer);
        this.load.image('btn_back', backBtn);
        this.load.image('btn_back_h', backBtn_h);
        this.load.image('btn_back_a', backBtn_a);
        this.load.image('levelTitle', lvlTitle);
        this.load.image('btn_display', displayBtn);
        this.load.font("Handjet-Regular", fontHJ, "truetype");
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
        
        const userText = this.add.text(950, 630, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet-Regular",
        });

        const lvl1 = this.add.text(400, 260, "01", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);

        const lvl2 = this.add.text(400, 420, "02", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);

        const VP1 = this.add.text(620, 260, "VER PUNTAJES", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);
        
        const VP2 = this.add.text(620, 420, "VER PUNTAJES", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet-Regular",
        }).setDepth(-4);
        
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