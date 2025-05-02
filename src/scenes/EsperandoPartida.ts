import "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { getMatchById } from "../api/MatchAPI";
import { getTeamsByMatchIdFromAll } from "../api/TeamAPI";
import { getLevelsByMatchIdFromAll } from "../api/LevelAPI";


// Importar imágenes y sprites
import backgroundGS from "../assets/game/ui/menu/checkersPurple.png";
import lvlTitle from "../assets/game/ui/menu/LGS_title.png";
import regresarBtn from "../assets/game/ui/menu/botonRegresar.png";
import startBtn from "../assets/game/ui/menu/btn_start/btn_start.png"
import startBtn_h from "../assets/game/ui/menu/btn_start/btn_start_h.png"
import startBtn_a from "../assets/game/ui/menu/btn_start/btn_start_a.png"
import cuadroTxt from "../assets/game/ui/menu/cuadroTXT.png"
import aceptar from "../assets/game/ui/menu/botonAceptar.png"

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export let allMotors = [];

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
        this.load.image('cuadroText', cuadroTxt);
        this.load.image('cuadroText', cuadroTxt);
        this.load.image('btn_accept', aceptar);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const cuadrotxt = this.add.image(this.scale.width / 2, this.scale.height / 2, 'cuadroText').setPosition(550, 170).setScale(0.4, 0.2).setDepth(-5);

        //Ingresa ID Input
        //Cuadro de texto con input funcional creado con HTML
        this.inputId = document.createElement('input');
        this.inputId.style.position = 'absolute';
        this.inputId.style.left = '430px';
        this.inputId.style.top = '0px';
        this.inputId.style.width = '720px';
        this.inputId.style.height = '280px';
        this.inputId.style.fontSize = '40px';
        this.inputId.style.color = '#8C8C8C';
        this.inputId.style.backgroundColor = 'transparent';
        this.inputId.style.border = 'none';
        this.inputId.style.fontFamily = 'Handjet';
        this.inputId.style.padding = '10px';
        this.inputId.style.outline = 'none';
        this.inputId.placeholder = 'Ingresa el ID de la partida';
        this.inputId.setAttribute('wrap', 'soft');


        document.body.appendChild(this.inputId);

        //Cancelar reinicia el cuadro de texto
        const btn_cancel = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_cancel').setPosition(470, 500).setScale(0.6).setDepth(-4);

        btn_cancel.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.inputId.value = '';
        });

        const btn_accept = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_accept').setPosition(1000, 180).setScale(0.6)
            .setDepth(-4).setInteractive({ useHandCursor: true })
            .on('pointerdown', async () => {
                let inputId = parseInt(this.inputId.value);
                this.registry.set('guiaText', inputId);
                console.log("Texto guardado: ", inputId);

                try {
                    const teamValues = await getTeamsByMatchIdFromAll(inputId);
                    const levelValues = await getLevelsByMatchIdFromAll(inputId);

                    console.log("Equipos:", teamValues);
                    console.log("Niveles completos:", levelValues);

                    // Imprimir los motors de cada nivel
                    levelValues.forEach((level, index) => {
                        console.log(`Motores del nivel ${index}:`, level.motors);
                    });

                    levelValues.forEach((level) => {
                        if (Array.isArray(level.motors)) {
                            allMotors.push(level.motors); // Cada uno es un array [rpm, diametro]
                        }
                    });

                    document.body.removeChild(this.inputId);
                    this.scene.start("GameScene");

                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                }
            });


        const btn_regresar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'botonRegresar').setPosition(640, 510).setScale(0.3).setDepth(-4)
            .setInteractive({ useHandCursor: true }).on('pointerover', function () {
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
                        document.body.removeChild(this.inputId);
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
