import Car from '../objects/car.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('background', './assets/sky_daytime.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('car_chasis', './assets/car_chasis.png');
        this.load.image('car_wheel', './assets/car_wheel.png');
    }

    create() {
        this.matter.world.setBounds(0, 0, 10000, 720);
        this.add.image(0, 0, 'background').setOrigin(0, 0);

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
        });

        this.car = new Car(this, 400, 300);

        this.debugText = this.add.text(0, 0, 'Current Speed: ', {
            fontSize: '24px',
            fill: '#000000'
        });
    }

    update() {
        this.car.update();
        const velocity = this.car.bodies[0].velocity;
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

        const carBody = this.car.bodies[0];
        this.cameras.main.centerOn(carBody.position.x + 300, carBody.position.y - 100);

        this.debugText.setText('Current Speed: ' + Math.round((speed) * 100) / 100 + '\n');
        this.debugText.setPosition(carBody.position.x - 330, carBody.position.y - 430);
    }
}
