import "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import RexTextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js';

// Importar imágenes y sprites
import background from "../assets/game/ui/menu/checkersBG1.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import aplicar from "../assets/game/ui/menu/aplicar.png";
import carmakeBG from "../assets/game/ui/menu/carmakeBG.png";
import armatucarro from "../assets/game/ui/menu/armatucarro.png";
import backBtn from "../assets/game/ui/menu/btn_back/btn_back.png";
import backBtn_h from "../assets/game/ui/menu/btn_back/btn_back_h.png";
import backBtn_a from "../assets/game/ui/menu/btn_back/btn_back_a.png";

//options

import a_white from "../assets/game/ui/menu/options/a.png";
import a_black from "../assets/game/ui/menu/options/a_held.png";

import b_white from "../assets/game/ui/menu/options/b.png";
import b_black from "../assets/game/ui/menu/options/b_held.png";

import c_white from "../assets/game/ui/menu/options/c.png";
import c_black from "../assets/game/ui/menu/options/c_held.png";

//carpsrites
import car0 from "../assets/game/sprites/mediumcar.png";
import car1 from "../assets/game/sprites/oddcar.png";
import car2 from "../assets/game/sprites/van.png";


//the rest
import inputbar from "../assets/game/ui/menu/inputbar.png";

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export let masaPiloto = 0;
export let masaChasis = 0;
export let masaRueda = 0;
export let masaMotor = 0;
export let potenciaMotor = 0;
export let timerBuildCar = 0;

export default class BuildCarStudent extends Phaser.Scene {

    constructor() {
        super("BuildCarStudent");
        this.startTime = 0;
        this.elapsedTime = 0;
    }

    preload() {

        // Cargar imágenes.
        this.load.image('background', background);
        this.load.image('levelTitleGS', lvlTitle);
        this.load.image('aplicar', aplicar);
        this.load.image('carmakeBG', carmakeBG);
        this.load.image('armatucarro', armatucarro);
        
        this.load.image('a_white', a_white);
        this.load.image('b_white', b_white);
        this.load.image('c_white', c_white);

        this.load.image('a_black', a_black);
        this.load.image('b_black', b_black);
        this.load.image('c_black', c_black);

        this.load.image('car0', car0);
        this.load.image('car1', car1);
        this.load.image('car2', car2);

        this.load.image('inputbar', inputbar);

        this.load.image('btn_back', backBtn);
        this.load.image('btn_back_h', backBtn_h);
        this.load.image('btn_back_a', backBtn_a);
    }

    create() {
        this.startTime = this.time.now; 
        this.timerRunning = true; 

        const masapilotoindex = ['???', 75, 100, 80];
        const masachasisindex = ['???', 800, 1200, 500];
        const masaruedaindex = ['???', 20, 25, 10];
        const masamotorindex = ['???', 180, 250, 140];
        const potenciaindex = ['???', 300, 450, 250];

        const carindex = ['car0', 'car1', 'car2', 'car0'];

        //DIVIDER

        this.add.rectangle(300, 275, 550, 8, 0x474747, 1);

        //DIVIDER

        const carPLACEHOLDER = [0, 0, 0, 0, 0, 0];
        const carOPTIONA = [0, 0, 0, 0, 0, 0];
        const carOPTIONB = [0, 0, 0, 0, 0, 0];
        const carOPTIONC = [0, 0, 0, 0, 0, 0];

        const carMODELS = [carPLACEHOLDER, carOPTIONA,carOPTIONB,carOPTIONC];
        
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(1);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const armatucarro = this.add.image(this.scale.width / 2, 200, 'armatucarro').setPosition(390,320).setScale(0.8).setDepth(2);

        const carmakeBG = this.add.image(this.scale.width / 2, this.scale.height/2 , 'carmakeBG')
            .setPosition(275, this.scale.height / 2)
            .setScale(0.5,15)
            .setDepth(-5);

        const opciontext = this.add.text(780, 20, "OPCIÓN:", {
            fontSize: 50,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(30, 185);

        const motortext = this.add.text(780, 20, "MOTOR:", {
            fontSize: 50,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(30, 280);

        // ATRIBUTOS DE OPCIONES:

        const rpmlabl = this.add.text(780, 20, "RPM:", {
            fontSize: 40,
            fontFamily: "Handjet",
            color: "#6C6C6C",
            align: 'left'
        }).setPosition(225, 420);

        const ruedalabl = this.add.text(780, 20, "diam. RUEDA(cm):", {
            fontSize: 40,
            fontFamily: "Handjet",
            color: "#6C6C6C",
            align: 'left'
        }).setPosition(225, 460);

        const rpmVARIABLE:number = 0;
        const ruedasizeVARIABLE:number = 0;

        const rpmvalue = this.add.text(780, 20, rpmVARIABLE.toString(), {
            fontSize: 40,
            fontFamily: "Handjet",
            color: "#6C6C6C",
            align: 'right'
        }).setPosition(550, 420);

        const ruedasizevalue = this.add.text(780, 20, ruedasizeVARIABLE.toString(), {
            fontSize: 40,
            fontFamily: "Handjet",
            color: "#6C6C6C",
            align: 'right'
        }).setPosition(550, 460);

        //OPCIONES
            
            // BOTON DE OPCION A

        let selectedOptionIndex: number | null = 0 || null; // starts with no selection
        let MOTORselectedOptionIndex: number | null = null; // starts with no selection

        const a_button = this.add.image(this.scale.width / 2, this.scale.height / 2, 'a_white')
            .setPosition(230, 215)
            .setScale(0.4)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                a_button.setScale(0.45);
            }, this)
            .on('pointerout', function () {
                a_button.setScale(0.4);
            }, this)
            .on('pointerdown', function () {
                
                if (selectedOptionIndex === 1) {
                    selectedOptionIndex = 0;
                } else {
                    selectedOptionIndex = 1;
                }

                // Update appearance
                a_button.setTexture(selectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_button.setTexture(selectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_button.setTexture(selectedOptionIndex === 3 ? 'c_black' : 'c_white');
                console.log("Trying to switch to:", carindex[selectedOptionIndex]);
                carro.setTexture(carindex[selectedOptionIndex]);
                
                masaPiloto = parseInt(masapilotoindex[selectedOptionIndex]);
                masaChasis = parseInt(masachasisindex[selectedOptionIndex]);
                masaRueda = parseInt(masaruedaindex[selectedOptionIndex]);

                masaPilotoDISPLAY.setText(${masaPiloto});
                masaChasisDISPLAY.setText(${masaChasis});
                masaRuedaDISPLAY.setText(${masaRueda});
            }, this);


            //BOTON DE OPCION B

        const b_button = this.add.image(this.scale.width / 2, this.scale.height / 2, 'b_white')
            .setPosition(370, 215)
            .setScale(0.4)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                b_button.setScale(0.45);
            }, this)
            .on('pointerout', function () {
                b_button.setScale(0.4);
            }, this)
            .on('pointerdown', function () {
                
                if (selectedOptionIndex === 2) {
                    selectedOptionIndex = 0;
                } else {
                    selectedOptionIndex = 2;
                }

                // Update appearance
                a_button.setTexture(selectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_button.setTexture(selectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_button.setTexture(selectedOptionIndex === 3 ? 'c_black' : 'c_white');
                console.log("Trying to switch to:", carindex[selectedOptionIndex]);
                carro.setTexture(carindex[selectedOptionIndex]);

                masaPiloto = parseInt(masapilotoindex[selectedOptionIndex]);
                masaChasis = parseInt(masachasisindex[selectedOptionIndex]);
                masaRueda = parseInt(masaruedaindex[selectedOptionIndex]);

                masaPilotoDISPLAY.setText(${masaPiloto});
                masaChasisDISPLAY.setText(${masaChasis});
                masaRuedaDISPLAY.setText(${masaRueda});
            }, this);

        const c_button = this.add.image(this.scale.width / 2, this.scale.height / 2, 'c_white')
            .setPosition(510, 215)
            .setScale(0.4)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                c_button.setScale(0.45);
            }, this)
            .on('pointerout', function () {
                c_button.setScale(0.4);
            }, this)
            .on('pointerdown', function () {
                
                if (selectedOptionIndex === 3) {
                    selectedOptionIndex = 0;
                } else {
                    selectedOptionIndex = 3;
                }

                // Update appearance
                a_button.setTexture(selectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_button.setTexture(selectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_button.setTexture(selectedOptionIndex === 3 ? 'c_black' : 'c_white');
                console.log("Trying to switch to:", carindex[selectedOptionIndex]);
                carro.setTexture(carindex[selectedOptionIndex]);

                masaPiloto = parseInt(masapilotoindex[selectedOptionIndex]);
                masaChasis = parseInt(masachasisindex[selectedOptionIndex]);
                masaRueda = parseInt(masaruedaindex[selectedOptionIndex]);

                masaPilotoDISPLAY.setText(${masaPiloto});
                masaChasisDISPLAY.setText(${masaChasis});
                masaRuedaDISPLAY.setText(${masaRueda});
            }, this);
        
        //OPCIONES DE MOTOR

        const a_buttonMOTOR = this.add.image(this.scale.width / 2, this.scale.height / 2, 'a_white')
            .setPosition(80, 365)
            .setScale(0.3)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                a_buttonMOTOR.setScale(0.35);
            }, this)
            .on('pointerout', function () {
                a_buttonMOTOR.setScale(0.3);
            }, this)
            .on('pointerdown', function () {
                if (MOTORselectedOptionIndex === 1) {
                    MOTORselectedOptionIndex = 0;
                } else {
                    MOTORselectedOptionIndex = 1;
                }

                // Update appearance
                a_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 3 ? 'c_black' : 'c_white');

                masaMotor = parseInt(masamotorindex[MOTORselectedOptionIndex]);
                potenciaMotor = parseInt(potenciaindex[MOTORselectedOptionIndex]);

                masamotorDISPLAY.setText(masamotorindex[MOTORselectedOptionIndex]);
                potenciaDISPLAY.setText(potenciaindex[MOTORselectedOptionIndex]);
            }, this);


            //BOTON DE OPCION B

        const b_buttonMOTOR = this.add.image(this.scale.width / 2, this.scale.height / 2, 'b_white')
            .setPosition(80, 440)
            .setScale(0.3)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                b_buttonMOTOR.setScale(0.35);
            }, this)
            .on('pointerout', function () {
                b_buttonMOTOR.setScale(0.3);
            }, this)
            .on('pointerdown', function () {
                
                if (MOTORselectedOptionIndex === 2) {
                    MOTORselectedOptionIndex = 0;
                } else {
                    MOTORselectedOptionIndex = 2;
                }

                // Update appearance
                a_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 3 ? 'c_black' : 'c_white');

                masaMotor = parseInt(masamotorindex[MOTORselectedOptionIndex]);
                potenciaMotor = parseInt(potenciaindex[MOTORselectedOptionIndex]);

                masamotorDISPLAY.setText(masamotorindex[MOTORselectedOptionIndex]);
                potenciaDISPLAY.setText(potenciaindex[MOTORselectedOptionIndex]);

            }, this);

        const c_buttonMOTOR = this.add.image(this.scale.width / 2, this.scale.height / 2, 'c_white')
            .setPosition(80, 515)
            .setScale(0.3)
            .setDepth(-2)
            .setInteractive()
            .on('pointerover', function () {
                c_buttonMOTOR.setScale(0.35);
            }, this)
            .on('pointerout', function () {
                c_buttonMOTOR.setScale(0.3);
            }, this)
            .on('pointerdown', function () {
                
                if (MOTORselectedOptionIndex === 3) {
                    MOTORselectedOptionIndex = 0;
                } else {
                    MOTORselectedOptionIndex = 3;
                }

                // Update appearance
                a_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 1 ? 'a_black' : 'a_white');
                b_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 2 ? 'b_black' : 'b_white');
                c_buttonMOTOR.setTexture(MOTORselectedOptionIndex === 3 ? 'c_black' : 'c_white');

                masaMotor = parseInt(masamotorindex[MOTORselectedOptionIndex]);
                potenciaMotor = parseInt(potenciaindex[MOTORselectedOptionIndex]);

                masamotorDISPLAY.setText(masamotorindex[MOTORselectedOptionIndex]);
                potenciaDISPLAY.setText(potenciaindex[MOTORselectedOptionIndex]);

            }, this);

        const carro = this.add.image(this.scale.width / 2, this.scale.height / 2 , 'car0').setPosition(320, this.scale.height / 2).setScale(0.6).setDepth(-2);
            

        const userText = this.add.text(780, 20, "Configura el carro que usaras\npara completar el reto.", {
            fontSize: 45,
            color: "#FFFFFF",
            fontFamily: "Handjet",
            align: 'right'
        });

        const btn_back = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_back').setPosition(100, 75).setScale(1).setDepth(2).setInteractive()
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
                                this.scene.start("GameScene"); // Cambia a tu escena del juego
                            }
                        });
                    }
                });
            }, this);



            const aplicar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'aplicar').setPosition(960, 520).setScale(0.3).setDepth(-4)
            .setInteractive().on('pointerover', function () {
                aplicar.setTexture("aplicar");
                aplicar.setScale(0.35)
            }, this).on('pointerout', function () {
                aplicar.setTexture("aplicar");
                aplicar.setScale(0.3)
            }, this).on('pointerdown', function () {
                aplicar.setTexture("aplicar");
                this.scene.start("GameScene");
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

        //PLAYERINPUTS//

        const labelStyle = {
            fontSize: 32, // smaller font
            fontFamily: "Handjet",
            color: "#252525",
            align: 'left'
        };
        
        let startY = 165;
        let spacingY = 50; // reduced spacing
        
        const inputs = [
            "MASA PILOTO(kg):",
            "MASA CHASIS(kg):",
            "MASA RUEDA(kg):",
            "MASA MOTOR(kg):",
            "POTENCIA(Hp):"
        ];
        
        inputs.forEach((label, index) => {
            const y = startY + index * spacingY;
        
            this.add.text(650, y, label, labelStyle);
        
        });

        const masaPilotoDISPLAY = this.add.text(380, 20, "???", {
            fontSize: 32,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(1140, 175);

        const masaChasisDISPLAY = this.add.text(780, 20, "???", {
            fontSize: 32,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(1140, 225);

        const masaRuedaDISPLAY = this.add.text(780, 20, "???", {
            fontSize: 32,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(1140, 270);

        const masamotorDISPLAY = this.add.text(780, 20, "???", {
            fontSize: 32,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(1140, 315);

        const potenciaDISPLAY = this.add.text(780, 20, "???", {
            fontSize: 32,
            fontFamily: "Handjet",
            color: "#252525",
            align: 'right'
        }).setPosition(1140, 365);

    }

    update(time, delta) {
        if (this.timerRunning) {
            timerBuildCar = this.elapsedTime = (this.time.now - this.startTime) / 1000;
        }
        
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }

}