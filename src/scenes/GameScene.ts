import background from "../assets/game/carTest/sky_daytime.png";
import ground from "../assets/game/carTest/platform.png";
import car_chasis from "../assets/game/carTest/car_chasis.png";
import car_test from "../assets/game/carTest/car_test.png";
import car_wheel from "../assets/game/carTest/car_wheel.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import fontHJ from "../assets/game/fonts/Handjet-SemiBold.ttf";
import Car from "../scripts/objects/car"; // Importa la clase Car
import carBtn from "../assets/game/carro_ui.png"
import { masaPiloto, masaChasis, masaRueda, masaMotor, potenciaMotor } from "./BuildCarStudent";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");

        this.timerRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerText = null;
        this.playerId = '';
        this.puntaje = 0;

        this.pesoChasis = 500;
        this.pesoPiloto = 50;
        this.pesoMotor = 50;
        this.pesoLlantas = 50;
        this.diametroLlantas = 40; // en cm

        this.potencia = 150;
        this.rpm = 3000;
        this.car = null; // Inicializa la variable car
        this.hasStarted = false;   
    }

    init(data) {
        this.playerName = data.playerName || 'Invitado'; // si no viene nada, usar 'Invitado'
    }

    preload() {
        this.load.image('background', background);
        this.load.image('ground', ground);  
        this.load.image('car_chasis' ,  car_chasis);
        this.load.image('car_wheel' , car_wheel);
        this.load.image('car_test' , car_test);
        this.load.image('btn_play' , btn_play);
        this.load.image('carBtn' , carBtn);
        this.load.font("Handjet", fontHJ, "truetype");
    }

    create() {
        console.log(${masaPiloto}, ${masaChasis}, ${masaRueda}, ${masaMotor}, ${potenciaMotor}); 
        
        this.matter.world.setBounds(0, 0, 2000, 720);
        this.cameras.main.setBackgroundColor('#ffffff');

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
        
                // Verifica si uno de los cuerpos es el goal y el otro es el cuerpo del carro
                if (
                    (bodyA.label === 'goal' && bodyB === this.car.body) ||
                    (bodyB.label === 'goal' && bodyA === this.car.body)
                ) {
                    console.log('¡Meta alcanzada!');
                    this.onGoalReached();
                }
            });
        });

        this.debugText = this.add.text(0, 0, 'Current Speed: ', {
            fontSize: '32px',
            fontFamily: "Handjet",
            fill: '#000000'
        });

        this.timerText = this.add.text(1100, 35, 'Time: 0.00', {
            fontSize: '32px',
            fontFamily: "Handjet",
            fill: '#000'
        }).setScrollFactor(0);

        const btn_car = this.add.image(this.scale.width / 2, this.scale.height / 2, 'carBtn').setOrigin(1.1,1)
        .setPosition(440, 640).setScale(0.7).setDepth(-3).setInteractive()
        .on("pointerdown", () => {
            this.scene.sleep("GameScene");
            this.scene.start("BuildCarStudent");
        }, this);
        
        const startButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_play')
            .setOrigin(1.1, 1)
            .setPosition(450, 550)
            .setInteractive()
            .setScale(0.6)
            .setDepth(-3)
            .on('pointerdown', () => {
                this.hasStarted = true; 

                this.startTime = this.time.now; 
                this.timerRunning = false;

                // Crear el carro al presionar el botón
                this.carConfig = {
                    hp: this.potencia,
                    rpm: this.rpm,
                    diametroLlantasCM: this.diametroLlantas,
                    piloto: this.pesoPiloto,
                    chasis: this.pesoChasis,
                    motor: this.pesoMotor,
                    llantas: this.pesoLlantas,
                    escala: 0.1 // o el valor que desees
                }

                this.car = new Car(this, 200, 500, 'car_test', this.carConfig);
                
                startButton.destroy();
            });
            

        this.matter.add.image(830, 700, 'ground', null, {
            isStatic: true,
            angle: Math.PI / -8
        });

        
    }

    update(time, delta) {
        if (this.timerRunning) {
            this.elapsedTime = (this.time.now - this.startTime) / 1000;
            this.timerText.setText('Time: ' + this.elapsedTime.toFixed(2));
        }
    
        if (this.hasStarted && this.car) {
            this.car.update(time, delta);
    
            // Centramos la cámara en el sprite del carro
            this.cameras.main.centerOn(this.car.x, this.car.y);
    
            // Mostrar velocidad
            const velocity = this.car.body.velocity;
            const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
            this.debugText.setText('Current Speed: ' + Math.round(speed * 100) / 100 + ' km/h');
            this.debugText.setPosition(this.car.x - 300, this.car.y - 430);
        }
    }

    onGoalReached() {
        this.matter.world.pause();
        this.timerRunning = false; // Detener el timer
        this.puntaje = 1500 - this.elapsedTime.toFixed(2) * 100;

        this.add.text(this.cameras.main.scrollX + 400, this.cameras.main.scrollY + 300, 
            'Player: ' + this.playerName + '\n' + '¡Nivel Completado!\nTiempo: ' + this.elapsedTime.toFixed(2) + 's' + '\n' + 'Puntos: ' + this.puntaje, {
            fontSize: '48px',
            fontFamily: "Handjet",
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);
    }
}