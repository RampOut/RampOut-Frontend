import Phaser from "phaser";

import backgroundGS from "../assets/game/ui/menu/checkersPurple.png";
import header from "../assets/game/ui/menu/Header.png";
import guTitle from "../assets/game/ui/menu/G_title.png";
import footer from "../assets/game/ui/menu/footer.png";
import cuadroTxt from "../assets/game/ui/menu/cuadroTXT.png"
import cancelar from "../assets/game/ui/menu/botonCancelar.png"
import aceptar from "../assets/game/ui/menu/botonAceptar.png"
import { nombreEquipo1, nombreEquipo2, equipo1, equipo2 } from "./LevelStudentTeam";

export default class StudentGuide extends Phaser.Scene {
    constructor() {
        super("StudentGuide");
    }

    preload() {
        this.load.image('backgroundGS', backgroundGS);
        this.load.image('header', header);
        this.load.image('footer', footer);
        this.load.image('guiaTitle', guTitle);
        this.load.image('cuadroText', cuadroTxt);
        this.load.image('btn_cancel', cancelar);
        this.load.image('btn_accept', aceptar);
    }

    create() {
        console.log(nombreEquipo1 + "\n" + nombreEquipo2);

        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backgroundGS').setOrigin(0).setDepth(-6);

        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const header = this.add.image(this.scale.width / 2, this.scale.height / 2, 'header').setPosition(640, -160).setScale(2).setDepth(-2);
        const footer = this.add.image(this.scale.width / 2, this.scale.height / 2, 'footer').setPosition(640, 650).setScale(0.9);
        const guiaTitle = this.add.image(this.scale.width / 2, this.scale.height / 2, 'guiaTitle').setPosition(300, -80).setScale(1).setDepth(-2);

        //Se recupera el texto dado por el profe
        const savedText = this.registry.get('guiaText') || "El profesor aún no ha dado indicaciones."; 

        //Se muestra el texo en medio de la pantalla
        this.add.text(300, 180, savedText, {
            fontSize: 50,
            color: "#FFFFFF",
            fontFamily: "Handjet",
            wordWrap: { width: 700 }
        }).setDepth(-3);

        const about = this.add.text(660, 40, "Pistas de tu profesor", {
            fontSize: 70,
            color: "#FFFFFF",
            fontFamily: "Handjet",
        }).setDepth(-1);


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

    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
    }
}