import Slider from "../scripts/objects/slider";
import background from "../assets/game/carTest/sky_daytime.png";
import ground from "../assets/game/carTest/platform.png";
import car_chasis from "../assets/game/carTest/car_chasis.png";
import car_test from "../assets/game/carTest/car_test.png";
import car_wheel from "../assets/game/carTest/car_wheel.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import fontHJ from "../assets/game/fonts/Handjet-SemiBold.ttf";
import Car from "../scripts/objects/car"; // Importa la clase Car

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerText = null;
        this.timerRunning = false;
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
        this.load.font("Handjet-Regular", fontHJ, "truetype");
        console.log('Recursos cargados');
    }

    create() {
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
            fontFamily: "Handjet-Regular",
            fill: '#000000'
        });

        this.timerText = this.add.text(1100, 35, 'Time: 0.00', {
            fontSize: '32px',
            fontFamily: "Handjet-Regular",
            fill: '#000'
        }).setScrollFactor(0);
        

        //Sliders para ajustar las propiedades del carro (PlaceHolder para la escena de configuracion)
        this.pesoChasisSlider = new Slider(this, 'Peso Chasis (kg)', 400, 200, 1000, (val) => {
            console.log('Peso Chasis (kg):', val);
            this.pesoChasis = val;
        });

        this.pesoPilotoSlider = new Slider(this, 'Peso Piloto (kg)', 400, 300, 100, (val) => {
            console.log('Peso Piloto (kg)', val);
            this.pesoPiloto = val;
        });

        this.pesoMotorSlider = new Slider(this, 'Peso Motor (kg)', 400, 400, 100, (val) => {
            console.log('Peso Motor (kg)', val);
            this.pesoMotor = val;
        });

        this.pesoLlantasSlider = new Slider(this, 'Peso Llantas (kg)', 400, 500, 100, (val) => {
            console.log('Peso Llantas (kg)', val);
            this.pesoLlantas = val;
        });

        this.potenciaSlider = new Slider(this, 'Potencia (hp)', 750, 200, 300, (val) => {
            console.log('Potencia (hp)', val);
            this.potencia = val;
        });
        this.rpmSlider = new Slider(this, 'rpm', 750, 300, 6000, (val) => {
            console.log('rpm', val);
            this.rpm = val;
        });
        this.diametroLlantasSlider = new Slider(this, 'Diametro Llantas (cm)', 750, 400, 60, (val) => {
            console.log('diametroLlantas', val);
            this.diametroLlantas = val;
        });





        //debug
        console.log('Peso Chasis:', this.pesoChasis);
        console.log('Peso Piloto:', this.pesoPiloto);
        console.log('Peso Motor:', this.pesoMotor);


      
        


        
        this.startButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'btn_play')
            .setOrigin(1.1, 1)
            .setInteractive()
            .setScale(0.6)
            .setDepth(-3)
            .on('pointerdown', () => {
                this.hasStarted = true; 
                this.startTime = this.time.now; 
                this.timerRunning = true; 
                this.startButton.setVisible(false);

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
    
        // Actualizar posición del botón de inicio
        this.startButton.setPosition(
            this.car ? this.car.x : 1300 + this.cameras.main.scrollX,
            this.car ? this.car.y - 150 : 700 + this.cameras.main.scrollY
        );
    }

    onGoalReached() {
        this.matter.world.pause();
        this.timerRunning = false; // Detener el timer
        this.puntaje = 1500 - this.elapsedTime.toFixed(2) * 100;

        this.add.text(this.cameras.main.scrollX + 400, this.cameras.main.scrollY + 300, 
            'Player: ' + this.playerName + '\n' + '¡Level Complete!\nTime: ' + this.elapsedTime.toFixed(2) + 's' + '\n' + 'Score: ' + this.puntaje, {
            fontSize: '48px',
            fontFamily: "Handjet-Regular",
            fill: '#000000',
            align: 'center'
        }).setOrigin(0.5);
    }
}
