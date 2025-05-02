import "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

// Importar imágenes y sprites
import backgroundGS from "../assets/game/ui/menu/checkersPurple.png";
import lvlTitle from "../assets/game/ui/menu/LR_title.png";
import dRBtn from "../assets/game/ui/menu/btn_downloadReport/btn_dReport.png"
import dRBtn_h from "../assets/game/ui/menu/btn_downloadReport/btn_dReport_h.png"
import dRBtn_a from "../assets/game/ui/menu/btn_downloadReport/btn_dReport_a.png"

const COLOR_WHITE = 0xffffff;
const COLOR_GRAY = 0xbbbbbb;
const COLOR_GRAY2 = 0x333333;
const COLOR_BLACK = 0x000000;

export default class LevelResults extends Phaser.Scene {

    constructor() {
        super("LevelResults");
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
        this.load.image('levelTitleR', lvlTitle);
        this.load.image('btn_dR', dRBtn);
        this.load.image('btn_dR_h', dRBtn_h);
        this.load.image('btn_dR_a', dRBtn_a);
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const levelTitle = this.add.image(this.scale.width / 2, 200, 'levelTitleR').setPosition(340).setScale(0.8).setDepth(-2);

        const userText = this.add.text(950, 635, "SESIÓN ACTIVA", {
            fontSize: 64,
            color: "#00FFB7",
            fontFamily: "Handjet",
        });

        const btn_back = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_back').setPosition(100, 75).setScale(1).setDepth(-2)
        .setInteractive({useHandCursor: true})
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
        
        let scoreT1 = [100, 100, 100, 100, 100];
        let scoreT2 = [100, 100, 100, 100, 100];

        let scorePanel = function (s, arr) {
            let panelScroll = s.rexUI.add.sizer({
                width: 100,
                orientation: 'y',
                space: { item: 0 }
            })

            for (let x = 0; x < 5; x++) {
                let desc = `RONDA ${x + 1}:  ${arr[x]}`;
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

        let totalT1 = 0;
        let totalT2 = 0;

        scoreT1.forEach(i => totalT1 += i);
        scoreT2.forEach(i => totalT2 += i);

        this.rexUI.add.roundRectangle({ width: 450, height: 50, color: COLOR_BLACK, strokeColor: COLOR_BLACK, strokeWidth: 2 }).setPosition(350, 215).setDepth(-4);
        this.add.text(168, 193, `EQUIPO 1 - TOTAL: ${totalT1}`, {
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
                child: scorePanel(this, scoreT1),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, height: 20, color: COLOR_GRAY2, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
                thumb: this.rexUI.add.roundRectangle({ width: 20, height: 45, color: COLOR_GRAY, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
            },

            space: { panel: 0 }
        })
            .layout().setDepth(-4);

        this.rexUI.add.roundRectangle({ width: 450, height: 50, color: COLOR_BLACK, strokeColor: COLOR_BLACK, strokeWidth: 2 }).setPosition(930, 215).setDepth(-4);
        this.add.text(748, 193, `EQUIPO 2 - TOTAL: ${totalT2}`, {
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
                child: scorePanel(this, scoreT2),
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, height: 20, color: COLOR_GRAY2, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
                thumb: this.rexUI.add.roundRectangle({ width: 20, height: 45, color: COLOR_GRAY, strokeColor: COLOR_BLACK, strokeWidth: 2 }),
            },

            space: { panel: 0 }
        })
            .layout().setDepth(-4);

        const btn_dR = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_dR').setPosition(640, 485).setScale(0.6).setDepth(-4)
            .setInteractive({useHandCursor: true}).on('pointerover', function () {
                btn_dR.setTexture("btn_dR_h");
            }, this).on('pointerout', function () {
                btn_dR.setTexture("btn_dR");
            }, this).on('pointerdown', function () {
                btn_dR.setTexture("btn_dR_a");
                setTimeout(() => {
                    btn_dR.setTexture("btn_dR");
                    exportarPuntos(5, scoreT1, scoreT2);
                }, 250)
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

function exportarPuntos(rondas, arr1, arr2){

    const date = new Date();
    
    let totalPuntosT1 = 0;
    let totalPuntosT2 = 0;

    let contenido = `<!DOCTYPE html>
                        <html>
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
                                <title>RAMPOUT - Puntuación de Equipos</title>
                            </head>
                            <body class="bg-dark">
                                <div class="container-fluid text-center mb-5">
                                    <img class="mt-5 img-fluid w-50" src="https://imagizer.imageshack.com/img924/2694/RtEo7y.png" alt="RAMPOUT Logo">
                                    <h1 class="pt-5 text-white">Reporte de la Puntuación del Nivel</h1>
                                    <p class="pt-3 text-white"><strong><em>Fecha de último acceso:</em></strong> ${date}</p>
                                    
                                    <table class="table table-dark table-hover w-75 mt-5 mx-auto">
                                        <thead>
                                            <th scope="column" class="bg-danger">Ronda</th>
                                            <th scope="column" class="bg-danger">Puntos del Equipo 1</th>
                                            <th scope="column" class="bg-danger">Puntos del Equipo 2</th>
                                        </thead>
                                        <tbody>
                    `;
    
    for (let i = 0; i < rondas; i++) {
        contenido += `                      <tr><th scope="row">${i+1}</th><td>${arr1[i]}</td><td>${arr2[i]}</td></tr>`;
        totalPuntosT1 += arr1[i];
        totalPuntosT2 += arr2[i];
    }
     
        contenido += `              <tr><th scope="row" class="bg-danger">Total</th><th class="bg-danger">${totalPuntosT1}</th class="bg-danger"><th class="bg-danger">${totalPuntosT2}</th></tr>
                                  </tbody>
                                </table>
                            </div>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
                        </body>
                    </html>`;
    
    let a = document.createElement("a");
    let blob = new Blob([contenido], {type: "html;charset=utf-8"});
    let link = window.URL.createObjectURL(blob);

    a.href = link;
    a.download = "RAMPOUT_Resultados.html"
    a.click();
    window.URL.revokeObjectURL(link);
}