import "phaser";

// Importar imágenes y sprites
import backBtn from "../assets/game/ui/menu/btn_back/btn_back.png";
import backBtn_h from "../assets/game/ui/menu/btn_back/btn_back_h.png";
import backBtn_a from "../assets/game/ui/menu/btn_back/btn_back_a.png";
import lvlTitle from "../assets/game/ui/menu/LBYC_title.png";
import displayBtn from "../assets/game/ui/display_st1.png";
import line from "../assets/game/ui/menu/line.png"
import carA from "../assets/game/cars/carroA.png"
import carB from "../assets/game/cars/carroB.png"
import carC from "../assets/game/cars/carroC.png"

export default class LevelBuildYourCar extends Phaser.Scene {
    constructor() {
        super("LevelBuildYourCar");
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
        this.load.image('btn_back', backBtn);
        this.load.image('btn_back_h', backBtn_h);
        this.load.image('btn_back_a', backBtn_a);
        this.load.image('levelBYCTitle', lvlTitle);
        this.load.image('btn_display', displayBtn);
        this.load.image('line', line);
        this.load.image('carA', carA);
        this.load.image('carB', carB);
        this.load.image('carC', carC);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-7);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        
        const layout1 = this.rexUI.add.roundRectangle({
            width: 1550,
            height: 600,
            color: 0xffffff,
        }).setPosition(0, 288).setDepth(-6);

        const levelTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelBYCTitle').setPosition(460, -80).setScale(1).setDepth(-2);

        const userText = this.add.text(950, 635, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet-Regular",
        });

        const btn_back = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_back').setPosition(100, 75).setScale(1)
        .setDepth(-2).setInteractive({useHandCursor: true})
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
            }, this)
        
        const optionText = this.add.text(90, 165, "OPCIÓN", {
            fontSize: 44,
            color: "#000000",
            fontFamily: "Handjet-Regular",
        }).setDepth(-3)

        const linea1 = this.add.image(this.scale.width / 2, this.scale.height / 2, 'line').setPosition(335, 245).setScale(0.9, 1).setDepth(-3);
        const linea2 = this.add.image(this.scale.width / 2, this.scale.height / 2, 'line').setPosition(335, 390).setScale(0.9, 1).setDepth(-3);

        const carName = this.add.text(90, 290, "", {
            fontSize: 44,
            color: "#000000",
            fontFamily: "Handjet-Regular",
        }).setDepth(-3)

        const carImg = this.add.image(375, 318, "").setScale(0.7).setDepth(-3);

        const optA = this.add.text(280, 160, "a)", {
            fontFamily: "Handjet-Regular",
            fontSize: 44,
            color: "#ffffff",
            fixedWidth: 80,
            backgroundColor: "#000000",
            align: "center",
        }).setPadding(0,3,0,3).setDepth(-3).setInteractive({useHandCursor: true})
        .on("pointerover", () => {
            optA.setColor("#95E8E8");
        }, this)
        .on("pointerout", () => {
            optA.setColor("#FFFFFF");
        }, this)
        .on("pointerdown", () => {
            optA.setColor("#FFFE91");
            setTimeout(()=>{
                optA.setColor("#95E8E8");
                carName.setText("CARRO A");
                carImg.setTexture("carA");
            }, 250);
        }, this);

        const optB = this.add.text(388, 160, "b)", {
            fontFamily: "Handjet-Regular",
            fontSize: 44,
            color: "#ffffff",
            fixedWidth: 80,
            backgroundColor: "#000000",
            align: "center",
        }).setPadding(0,3,0,3).setDepth(-3).setInteractive({useHandCursor: true})
        .on("pointerover", () => {
            optB.setColor("#95E8E8");
        }, this)
        .on("pointerout", () => {
            optB.setColor("#FFFFFF");
        }, this)
        .on("pointerdown", () => {
            optB.setColor("#FFFE91");
            setTimeout(()=>{
                optB.setColor("#95E8E8");
                carName.setText("CARRO B");
                carImg.setTexture("carB");
            }, 250);
        }, this);

        const optC = this.add.text(495, 160, "c)", {
            fontFamily: "Handjet-Regular",
            fontSize: 44,
            color: "#ffffff",
            fixedWidth: 80,
            backgroundColor: "#000000",
            align: "center",
        }).setPadding(0,3,0,3).setDepth(-3).setInteractive({useHandCursor: true})
        .on("pointerover", () => {
            optC.setColor("#95E8E8");
        }, this)
        .on("pointerout", () => {
            optC.setColor("#FFFFFF");
        }, this)
        .on("pointerdown", () => {
            optC.setColor("#FFFE91");
            setTimeout(()=>{
                optC.setColor("#95E8E8");
                carName.setText("CARRO C");
                carImg.setTexture("carC");
            }, 250);
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