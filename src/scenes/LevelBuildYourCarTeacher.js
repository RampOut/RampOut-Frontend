import "phaser";
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';



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
import transpImg from "../assets/game/blank.png"
import acceptBtn from "../assets/game/ui/menu/botonAceptar.png"
import cancelBtn from "../assets/game/ui/menu/botonCancelar.png"
import inputBox from "../assets/game/ui/menu/input.png"
import Slider from "../scripts/objects/slider"
import { equipo1, nombreEquipo1, equipo2, nombreEquipo2  } from "./LevelStudentTeam";


export let rpm = 3000;
export let diametroLlantas = 40;

export default class LevelBuildYourCarTeacher extends Phaser.Scene {
    
    constructor() {
        super("LevelBuildYourCarTeacher");
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
        this.load.image('transpImg', transpImg);
        this.load.image('btn_accept', acceptBtn);
        this.load.image('btn_cancel', cancelBtn);
        this.load.image('input_box', inputBox);
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
            fontFamily: "Handjet",
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
                document.body.removeChild(this.inputRPM);
                document.body.removeChild(this.inputDiam);

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
                                this.scene.start(""); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this)
        
        const optionText = this.add.text(90, 165, "OPCIÓN", {
            fontSize: 44,
            color: "#000000",
            fontFamily: "Handjet",
        }).setDepth(-3)

        const linea1 = this.add.image(this.scale.width / 2, this.scale.height / 2, 'line').setPosition(335, 245).setScale(0.9, 1).setDepth(-3);

        const noCar = this.add.text(95, 340, "Presione uno de los tres botones\npara escoger uno de los carros.", {
            fontSize: 44,
            color: "#000000",
            fontFamily: "Handjet",
            align: "center",
        }).setDepth(-3)

        const carName = this.add.text(245, 270, "", {
            fontSize: 64,
            color: "#000000",
            fontFamily: "Handjet",
        }).setDepth(-3)

        const carImg = this.add.image(335, 430, "transpImg").setScale(1).setDepth(-3);

        const btn_accept = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_accept').setPosition(1020, 445).setScale(0.6)
            .setDepth(-4).setInteractive({useHandCursor: true})
            .on('pointerdown', () => { 
                console.log(rpm)
                console.log(diametroLlantas)
                
                let jugadores = [];
                /*
                for (let i = 0; i < equipo1.length; i++) {
                    jugadores.push({
                        matricula: equipo1[i],
                        teamTempId: 1
                    });
                }

                for (let i = 0; i < equipo2.length; i++) {
                    jugadores.push({
                        matricula: equipo2[i],
                        teamTempId: 2
                    });
                }

                CreateMatch({
                    teams: [
                        {tempId: 1, name: nombreEquipo1, scoreTotal: 0, scorePerRound: []},
                        {tempId: 2, name: nombreEquipo2, scoreTotal: 0, scorePerRound: []},
                    ],
                    players: [
                        jugadores,
                    ],
                    levels:[
                        {levelVariables: [rpm, diametroLlantas], clue: ""}
                    ]
                })
                */

            });
        
        const btn_cancel = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_cancel').setPosition(1020, 520).setScale(0.6)
            .setDepth(-4).setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            });

        const optA = this.add.text(280, 160, "a)", {
            fontFamily: "Handjet",
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
                noCar.setText("");
                carName.setText("CARRO A");
                carImg.setTexture("carA");
            }, 250);
        }, this);

        const optB = this.add.text(388, 160, "b)", {
            fontFamily: "Handjet",
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
                noCar.setText("");
                carName.setText("CARRO B");
                carImg.setTexture("carB");
            }, 250);
        }, this);

        const optC = this.add.text(495, 160, "c)", {
            fontFamily: "Handjet",
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
                noCar.setText("");
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

        //Sliders para ajustar las propiedades del carro (PlaceHolder para la escena de configuracion)
        this.RPMSlider = new Slider(this, 'RPM', 1000, 200, 6000, (val) => {
            rpm = val;
        });

        //Sliders para ajustar las propiedades del carro (PlaceHolder para la escena de configuracion)
        this.diametroSlider = new Slider(this, 'DIÁMETRO LLANTAS (CM)', 1000, 300, 80, (val) => {
            diametroLlantas = val;
        });
    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }
}