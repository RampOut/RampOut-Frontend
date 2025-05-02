import "phaser";
import VHSShaderPipeline from "../VHSShaderPipeline";

// Importar imágenes y sprites
import background from "../assets/game/ui/menu/checkersGreen.png";
import layout from "../assets/game/ui/menu/layout_Register.png";
import input from "../assets/game/ui/menu/input.png";
import submitBtn from "../assets/game/ui/menu/btn_iniciar_R.png";
import BtnBackTeam from "../assets/game/ui/menu/btn_back_light.png"
import BtnNextTeam from "../assets/game/ui/menu/btn_nextTeam.png"

export let nombreEquipo1 = null;
export let nombreEquipo2 = null;
export let equipo1 = [];
export let equipo2 = [];

let contadorEquipos = 1;

export default class LevelStudentTeam extends Phaser.Scene {
    constructor() {
        super("LevelStudentTeam");
    }

    preload() {
        this.load.image('backgroundGreen', background);
        this.load.image('layout', layout);
        this.load.image('inputR', input);
        this.load.image('btn_submit', submitBtn);
        this.load.image('btn_back_team', BtnBackTeam);
        this.load.image('btn_nextTeam', BtnNextTeam);
    }

    create() {

        this.renderer.pipelines.add('VHSShader', new VHSShaderPipeline(this.game));

        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundGreen").setOrigin(0).setDepth(-5);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        const layout = this.add.image(this.scale.width / 2, this.scale.height / 2, "layout").setOrigin(0).setPosition(300, 50).setScale(0.75).setDepth(-4);

        const labelEquipo = this.add.text(490, 140, "PRIMER EQUIPO", {
            fontSize: 48,
            fontFamily: "Handjet",
            color: "#6C6C6C",
        });

        const labelMatriculas = this.add.text(450, 310, "MATRÍCULAS DE ALUMNOS", {
            fontSize: 48,
            fontFamily: "Handjet",
            color: "#6C6C6C",
        });

        const input1 = this.add.image(this.scale.width / 2, this.scale.height / 2, "inputR").setOrigin(0).setPosition(410, 190).setScale(1.5, 1).setDepth(-4);
        const input2 = this.add.image(this.scale.width / 2, this.scale.height / 2, "inputR").setOrigin(0).setPosition(410, 360).setScale(1.5, 1).setDepth(-4);

        this.inputNE = document.createElement("input");
        this.inputNE.style.position = 'absolute';
        this.inputNE.style.left = '38%';
        this.inputNE.style.top = '28%';
        this.inputNE.style.width = '300px';
        this.inputNE.style.height = '64px';
        this.inputNE.style.fontSize = '32px';
        this.inputNE.style.color = '#8C8C8C';
        this.inputNE.style.backgroundColor = 'transparent';
        this.inputNE.style.border = 'none';
        this.inputNE.style.fontFamily = 'Handjet';
        this.inputNE.style.padding = '10px';
        this.inputNE.style.outline = 'none';
        this.inputNE.placeholder = 'Inserta el nombre de tu equipo...';
        this.inputNE.setAttribute('wrap', 'soft');

        document.body.appendChild(this.inputNE);

        this.inputM = document.createElement("input");
        this.inputM.style.position = 'absolute';
        this.inputM.style.left = '38%';
        this.inputM.style.top = '51%';
        this.inputM.style.width = '300px';
        this.inputM.style.height = '64px';
        this.inputM.style.fontSize = '32px';
        this.inputM.style.color = '#8C8C8C';
        this.inputM.style.backgroundColor = 'transparent';
        this.inputM.style.border = 'none';
        this.inputM.style.fontFamily = 'Handjet';
        this.inputM.style.padding = '10px';
        this.inputM.style.outline = 'none';
        this.inputM.placeholder = 'Inserte matrícula...';
        this.inputM.setAttribute('wrap', 'soft');

        document.body.appendChild(this.inputM);

        const addMember = this.add.text(350, 360, "+", {
            fontSize: 160,
            backgroundColor: "#3F48CC",
            fontFamily: "Handjet",
        }).setOrigin(0).setPadding(10,0,10,0).setScale(0.6).setDepth(-4)
        .setInteractive({useHandCursor: true})
        .on("pointerdown",()=>{
            if (contadorEquipos == 1){
                equipo1.push(this.inputM.value);
                console.log(equipo1);
                this.inputM.value = "";
            } else {
                equipo2.push(this.inputM.value);
                console.log(equipo2);
                this.inputM.value = "";
            }
        }, this);
        
        const btn_submit = this.add.image(this.scale.width / 2, this.scale.height / 2, "btn_submit").setOrigin(0).setPosition(420, 500).setScale(0.6).setDepth(-4)
        .setInteractive({useHandCursor: true})
        .on("pointerdown",()=>{
            if (nombreEquipo2 != null && nombreEquipo2 != ""){
                document.body.removeChild(this.inputNE);
                document.body.removeChild(this.inputM);
                this.scene.start("TeacherGuide");
            }
        },this);

        const btn_nextTeam = this.add.image(this.scale.width / 2, this.scale.height / 2, "btn_nextTeam").setOrigin(0).setPosition(420, 500).setScale(0.6).setDepth(-3)
        .setInteractive({useHandCursor: true})
        .on("pointerdown",()=>{
            if (nombreEquipo1 != null && nombreEquipo1 != ""){
                contadorEquipos += 1;
                labelEquipo.setText("SEGUNDO EQUIPO");
                this.inputNE.value = null;
                this.inputM.value = null;
                btn_nextTeam.destroy();
            }
        },this);

        const btn_back = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_back_team').setPosition(100, 75).setScale(1).setDepth(-2)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', function () {
            document.body.removeChild(this.inputNE);
            document.body.removeChild(this.inputM);
            this.scene.start("Start");
        }, this)
    }

    update() {
        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;

        if (contadorEquipos == 1){
            nombreEquipo1 = this.inputNE.value;
        } else {
            nombreEquipo2 = this.inputNE.value;
        }
    }
}