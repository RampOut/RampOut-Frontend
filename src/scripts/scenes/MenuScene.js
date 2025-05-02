import VHSShaderPipeline from '../VHSShaderPipeline.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {

        this.load.image('menu_bg', './assets/checkersBG1.png');
        this.load.image('play_button', './assets/play_button.png');
        this.load.image('config_button', './assets/config_button.png');  
        this.load.image('RAMPOUT', './assets/RAMPOUT.png'); 
        this.load.image('rectangleRAMPOUT', './assets/rectangleRAMPOUT.png'); 
        this.load.image('rectangle_bottom', './assets/rectangle_bottom.png'); 
        this.load.image('car_wheel', './assets/car_wheel.png');
        
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
        .setPosition(640,-160)
        .setScale(2)
        .setDepth(-2);
        const RAMPOUT = this.add.image(this.scale.width / 2, this.scale.height / 2, 'RAMPOUT')
        .setPosition(640,110)
        .setScale(0.75);

        



        // Rectangulo Inferior
        const rectangle_bottom = this.add.image(this.scale.width / 2, this.scale.height / 2, 'rectangle_bottom')
        .setPosition(640,650)
        .setScale(0.9);       

        
        

        


        // Botones de Jugar y configuración
        const startButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'play_button')
            .setOrigin(1.1, 1) 
            .setInteractive() 
            .setScale(0.8)
            .setDepth(-3)
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: RAMPOUT,
                    y: -190, // Centro vertical de la pantalla
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: rectangleRAMPOUT,
                            y: 190, // Centro vertical de la pantalla
                            duration: 800,
                            ease: 'Power2',
                            onComplete: () => {
                                this.scene.start('LevelSelectScene'); // Cambia a tu escena del juego
                            }})
                        
                    }}
                    
                
                )
            });
        
        
        


        const configButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'config_button')
            .setOrigin(1.1, -0.1) 
            .setInteractive() 
            .setScale(0.8)
            .setDepth(-3)
            .on('pointerdown', () => {
                this.scene.start('GameScene'); // Cambiar a la escena de juego
            });
        
        this.car_wheel = this.add.image(1050, 360, 'car_wheel')
            .setOrigin(0.5, 0.5) 
            .setInteractive() 
            .setScale(0.8)
            .setDepth(-3);
            
    }

    update(time, delta) {
        
        // Velocidad del scroll del fondo
        let speed = 0.1;
        // Desplazar el fondo hacia la izquierda
        
        this.car_wheel.rotation -= 0.01;

        // Desplazamiento del Fondo

        this.bg.tilePositionX += 1.2;
        this.bg.tilePositionY += 0.2;
        
        
       

    }
}