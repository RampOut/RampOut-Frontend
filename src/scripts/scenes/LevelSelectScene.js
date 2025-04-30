import VHSShaderPipeline from '../VHSShaderPipeline.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    preload() {

        this.load.image('menu_bg', './assets/checkersBG1.png');

        this.load.image('rectangleRAMPOUT', './assets/rectangleRAMPOUT.png'); 
        this.load.image('rectangle_bottom', './assets/rectangle_bottom.png'); 
        this.load.image('levelSelect', './assets/seleccionNivel.png'); 

        
    }

    create() {
        
        this.renderer.pipelines.add('VHSShader', new VHSShaderPipeline(this.game));

        
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'menu_bg')
        .setOrigin(0)
        .setDepth(-4);


        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.bg.setPipeline('VHSShader');

        // Rectangulo Superior y Titulo Rampout
        const rectangleRAMPOUT = this.add.image(this.scale.width / 2, this.scale.height / 2, 'rectangleRAMPOUT')
        .setPosition(640,160)
        .setScale(2)
        .setDepth(-2);


        // Rectangulo Inferior
        const rectangle_bottom = this.add.image(this.scale.width / 2, this.scale.height / 2, 'rectangle_bottom')
        .setPosition(640,650)
        .setScale(0.9);       

        // Rectangulo Superior y Titulo Rampout
        const levelSelectText = this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelSelect')
        .setPosition(360,-80)
        .setScale(0.4)
        .setDepth(-2);
        

        


        // Botones de Jugar y configuración
        
        this.tweens.add({
            targets: rectangleRAMPOUT,
            y: -240, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: rectangle_bottom,
            y: 680, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });

        this.tweens.add({
            targets: levelSelectText,
            y: 60, // Centro vertical de la pantalla
            duration: 400,
            ease: 'Power2',
        });
                    
                
                
            
        
        
        




            
    }

    update(time, delta) {
        
        // Velocidad del scroll del fondo
        let speed = 0.1;

        // Desplazamiento del Fondo

        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
        
        
       

    }
}