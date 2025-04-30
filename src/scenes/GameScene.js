import Car from "../scripts/objects/car";
import Slider from "../scripts/objects/slider";
//import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

import background from "../assets/game/carTest/sky_daytime.png";
import ground from "../assets/game/carTest/platform.png";
import car_chasis from "../assets/game/carTest/car_chasis.png";
import car_wheel from "../assets/game/carTest/car_wheel.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import fontHJ from "../assets/game/fonts/Handjet-SemiBold.ttf";









export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerText = null;
        this.timerRunning = false;
        this.playerId = '';
        this.puntaje = 0;
        this.pesoChasis = 0;
        this.pesoPiloto = 0;

    }


    



    init(data) {
        this.playerName = data.playerName || 'Invitado'; // si no viene nada, usar 'Invitado'
    }

    preload() {
        this.load.image('background', background);
        this.load.image('ground', ground);  
        this.load.image('car_chasis' ,  car_chasis);
        this.load.image('car_wheel' , car_wheel);
        this.load.image('btn_play' , btn_play);
        this.load.font("Handjet-Regular", fontHJ, "truetype");
    }



    create() {
        this.matter.world.setBounds(0, 0, 2000, 720);
        /*this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.matter.add.image(100, 300, 'ground', null, {
            isStatic: true,
            angle: Math.PI / 6
        });

        this.matter.add.image(450, 480, 'ground', null, {
            isStatic: true,
            angle: Math.PI / 8
        });

        this.matter.add.image(830, 560, 'ground', null, {
            isStatic: true
        });

        this.matter.add.image(1100, 530, 'ground', null, {
            isStatic: true,
            angle: Math.PI / -8
        });*/


        // Crear la línea de meta como un sensor
        this.goal = this.matter.add.rectangle(1800, 600, 100, 300, {
            isSensor: true, // No colisiona físicamente
            isStatic: true, // No se mueve
            label: 'goal'   // Un nombre para identificarlo
        });

        

        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
        
                // Verifica si uno de los cuerpos es el goal y el otro es el carro
                if ((bodyA.label === 'goal' && this.car.bodies.includes(bodyB)) ||
                    (bodyB.label === 'goal' && this.car.bodies.includes(bodyA))) {
                    
                    console.log('¡Meta alcanzada!');
                    this.onGoalReached();
                }
            });
        });

        this.debugText = this.add.text(0, 0, 'Current Speed: ', {
            fontSize: '32px',
            fontFamily: "Handjet-Regular",
            fill: '#000000'
        });

        this.timerText = this.add.text(1100, 35, 'Time: 0.00', {
            fontSize: '32px',
            fontFamily: "Handjet-Regular",
            fill: '#000'
        }).setScrollFactor(0);
        

        this.pesoChasisSlider = new Slider(this, 'PesoChasis (kg)', 400, 600, 1000, (val) => {
            console.log('Peso Chasis (kg):', val);
            this.pesoChasis = val;
        });

        this.pesoPilotoSlider = new Slider(this, 'PesoPiloto (kg)', 400, 400, 100,(val) => {
            console.log('Peso Piloto (kg)', val);
            this.pesoPiloto = val;
        });







        
        this.hasStarted = false;
        this.startButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_play')
            .setOrigin(1.1, 1) 
            .setInteractive() 
            .setScale(0.6)
            .setDepth(-3)
            .on('pointerdown', () => {
                this.hasStarted = true; 
                this.startTime = this.time.now; // Guarda el tiempo inicial
                this.timerRunning = true; // El timer empieza
                this.startButton.setVisible(false); // Oculta el botón una vez iniciado
                this.car = new Car(this, 200, 500, this.pesoChasis, this.pesoPiloto); // Crea el carro
            });
        this.cameras.main.setBackgroundColor('#ffffff');

        

        

        
    }

    update() {

        if (this.timerRunning) {
            this.elapsedTime = (this.time.now - this.startTime) / 1000; // en segundos
            this.timerText.setText('Time: ' + this.elapsedTime.toFixed(2));
        }


        if (this.hasStarted){
            this.car.update();
            const velocity = this.car.bodies[0].velocity;
            const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

            const carBody = this.car.bodies[0];
            this.cameras.main.centerOn(carBody.position.x + 300, carBody.position.y - 100);
            this.debugText.setText('Current Speed: ' + Math.round((speed) * 100) / 100 + 'km/h'+'\n');
            this.debugText.setPosition(carBody.position.x - 300, carBody.position.y - 430);
        }
        
        //this.cameras.main.centerOn(600,400 );


        this.startButton.setPosition(700+(this.cameras.main.scrollX + this.scale.width / 2),350+ (this.cameras.main.scrollY + this.scale.height / 2));

        

        
        





    }

    onGoalReached() {
    this.matter.world.pause();
    this.timerRunning = false; // Detener el timer
    this.puntaje = 1500 - this.elapsedTime.toFixed(2)*100;

    
    this.add.text(this.cameras.main.scrollX + 400, this.cameras.main.scrollY + 300, 
        'Player: ' + this.playerName + '\n' + '¡Level Complete!\nTime: ' + this.elapsedTime.toFixed(2) + 's' + '\n' + 'Score: ' + this.puntaje, {
        fontSize: '48px',
        fontFamily: "Handjet-Regular",
        fill: '#000000',
        align: 'center'
    }).setOrigin(0.5);

    



}
}