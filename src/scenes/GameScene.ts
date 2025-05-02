import car_chasis from "../assets/game/carTest/car_chasis.png";
import car_test from "../assets/game/carTest/car_test.png";
import car_wheel from "../assets/game/carTest/car_wheel.png";
import btn_play from "../assets/game/ui/menu/btn_play/btn_play.png";
import fontHJ from "../assets/game/fonts/Handjet-SemiBold.ttf";
import Car from "../scripts/objects/car"; // Importa la clase Car
import carBtn from "../assets/game/carro_ui.png"
import ground from "../assets/game/carTest/platform.png";
import Background from "../assets/game/carTest/Background.jpg";

// Variables
import { masaPiloto, masaChasis, masaRueda, masaMotor, potenciaMotor,
         carSprite, rpmVARIABLE, ruedasizeVARIABLE } from "./BuildCarStudent";


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
        this.load.image('ground', ground);
        this.load.image('car_chasis', car_chasis);
        this.load.image('car_wheel', car_wheel);
        this.load.image('car_test', car_test);
        this.load.image('btn_play', btn_play);
        this.load.image('carBtn', carBtn);
        this.load.font("Handjet", fontHJ, "truetype");
    }

    create() {
        console.log(`${masaPiloto}, ${masaChasis}, ${masaRueda}, ${masaMotor}, ${potenciaMotor}`);

        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0).setDepth(-4);

        // Asegurar que el fondo no se mueva con la cámara
        this.bg.setScrollFactor(0);

        this.matter.world.setBounds(0, 0, 2000, 720);
        this.cameras.main.setBackgroundColor('#ffffff');

        // Crear la línea de meta como un sensor
        this.goal = this.matter.add.rectangle(1950, 500, 100, 300, {
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

        const btn_car = this.add.image(this.scale.width / 2, this.scale.height / 2, 'carBtn').setOrigin(1.1, 1)
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
                this.timerRunning = true;

                // Crear el carro al presionar el botón
                this.carConfig = {
                    hp: potenciaMotor,
                    rpm: rpmVARIABLE,
                    diametroLlantasCM: ruedasizeVARIABLE,
                    piloto: masaPiloto,
                    chasis: masaChasis,
                    motor: masaMotor,
                    llantas: masaRueda,
                    escala: 0.4 // o el valor que desees
                }

                this.car = new Car(this, 200, 500, carSprite, this.carConfig);

                startButton.destroy();
                btn_car.destroy();
            });


        // Define level dimensions based on the sketch image - EXTENDIDO A BORDES
        const baseY = 700;
        const leftPlatformX = 0; // Extendido al borde izquierdo
        const leftPlatformWidth = 800;
        const rampStartX = leftPlatformX + leftPlatformWidth;
        const rampWidth = 400;
        const rampHeight = 252;
        const rightPlatformX = rampStartX + rampWidth;
        const rightPlatformY = baseY - rampHeight;
        const rightPlatformWidth = 720; // Extendido al borde derecho (1920 - rightPlatformX)

        // Create container for all level elements
        this.levelContainer = this.add.container(0, 0);

        // Create minimalist terrain matching the sketch
        this.createMinimalistTerrain(leftPlatformX, baseY, leftPlatformWidth,
            rampWidth, rampHeight,
            rightPlatformX, rightPlatformY, rightPlatformWidth);

        // Create physics colliders for the platforms - now perfectly aligned with visuals
        this.createPhysicsColliders(leftPlatformX, baseY, leftPlatformWidth,
            rampWidth, rampHeight,
            rightPlatformX, rightPlatformY, rightPlatformWidth);

        // Add entry animation
        this.tweenEntryAnimation();
    }

    createMinimalistTerrain(leftX, baseY, leftWidth, rampWidth, rampHeight, rightX, rightY, rightWidth) {
        // Create main graphics for platforms
        const graphics = this.add.graphics();
        this.levelContainer.add(graphics);

        // Draw platforms in dark gray color to match sketch
        const platformColor = 0x444444;

        // Left platform - extendida al borde izquierdo
        graphics.fillStyle(platformColor);
        graphics.fillRect(leftX, baseY, leftWidth, 1080 - baseY); // Fill to bottom of screen

        // Ramp slope
        graphics.fillStyle(platformColor);
        graphics.beginPath();
        graphics.moveTo(leftX + leftWidth, baseY);
        graphics.lineTo(rightX, rightY);
        graphics.lineTo(rightX, baseY);
        graphics.lineTo(leftX + leftWidth, baseY);
        graphics.closePath();
        graphics.fillPath();

        // Fill below ramp
        graphics.fillRect(leftX + leftWidth, baseY, rampWidth, 1080 - baseY);

        // Right platform - extendida al borde derecho
        graphics.fillStyle(platformColor);
        graphics.fillRect(rightX, rightY, rightWidth, 1080 - rightY);

        // Add subtle platform edges - slightly lighter gray
        graphics.lineStyle(2, 0x666666);

        // Top edge of left platform
        graphics.beginPath();
        graphics.moveTo(leftX, baseY);
        graphics.lineTo(leftX + leftWidth, baseY);
        graphics.strokePath();

        // Top edge of ramp
        graphics.beginPath();
        graphics.moveTo(leftX + leftWidth, baseY);
        graphics.lineTo(rightX, rightY);
        graphics.strokePath();

        // Top edge of right platform
        graphics.beginPath();
        graphics.moveTo(rightX, rightY);
        graphics.lineTo(rightX + rightWidth, rightY);
        graphics.strokePath();
    }

    createPhysicsColliders(leftX, baseY, leftWidth, rampWidth, rampHeight, rightX, rightY, rightWidth) {
        // COLISIONES MEJORADAS - Extendidas a los bordes

        // LEFT PLATFORM - Create thin surface collider just at the top
        this.leftPlatformTopCollider = this.matter.add.rectangle(
            leftX + leftWidth / 2,
            baseY,
            leftWidth,
            10, // Thin collision surface
            { isStatic: true, friction: 0.3 }
        );

        // LEFT PLATFORM SIDE - Ya no es necesario el borde izquierdo porque está en el límite del mundo

        // RAMP - Using vertices for exact shape match
        const rampColliderVertices = [
            { x: leftX + leftWidth - 5, y: baseY - 5 }, // Slightly adjusted for better physics
            { x: rightX + 5, y: rightY - 5 },
            { x: rightX + 5, y: rightY + 10 }, // Small thickness for stable physics
            { x: leftX + leftWidth - 5, y: baseY + 10 }
        ];

        this.rampCollider = this.matter.add.fromVertices(0, 0, rampColliderVertices, {
            isStatic: true,
            friction: 0.2 // Slightly less friction for the ramp
        });

        // Calculate centroid for proper positioning
        const centroid = { x: 0, y: 0 };
        rampColliderVertices.forEach(vertex => {
            centroid.x += vertex.x;
            centroid.y += vertex.y;
        });
        centroid.x /= rampColliderVertices.length;
        centroid.y /= rampColliderVertices.length;

        this.matter.body.setPosition(this.rampCollider, centroid);

        // RIGHT PLATFORM - Only top surface collider
        this.rightPlatformTopCollider = this.matter.add.rectangle(
            rightX + rightWidth / 2,
            rightY + 5,
            rightWidth,
            10, // Thin collision surface
            { isStatic: true, friction: 0.3 }
        );

        // RIGHT PLATFORM RIGHT EDGE - Ya no es necesario el borde derecho porque está en el límite del mundo

        // INVISIBLE FLOOR - Add a floor at the bottom to prevent player falling forever
        this.floorCollider = this.matter.add.rectangle(
            960, // Center of screen
            1070, // Near bottom of screen
            1920, // Full width
            20,   // Thin floor
            { isStatic: true, friction: 0.3 }
        );

        // Add world edge walls to keep player within bounds
        this.worldBoundsLeft = this.matter.add.rectangle(
            -10, // Just outside visible area
            540, // Middle of screen height
            20, // Thickness
            1080, // Full height
            { isStatic: true, friction: 0.3 }
        );

        this.worldBoundsRight = this.matter.add.rectangle(
            1930, // Just outside visible area on right
            540, // Middle of screen height
            20, // Thickness
            1080, // Full height
            { isStatic: true, friction: 0.3 }
        );
    }

    tweenEntryAnimation() {
        // Set initial state
        this.levelContainer.setAlpha(0);
        this.levelContainer.setScale(0.95);
        this.levelContainer.y = 30;

        // Animate entry
        this.tweens.add({
            targets: this.levelContainer,
            alpha: 1,
            scale: 1,
            y: 0,
            duration: 1000,
            ease: 'Power2'
        });
    }

    update(time, delta) {
        if (this.timerRunning) {
            this.elapsedTime = (this.time.now - this.startTime) / 1000;
            this.timerText.setText('Tiempo: ' + this.elapsedTime.toFixed(2));
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