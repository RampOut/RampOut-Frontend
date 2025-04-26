export default class Car {


    constructor(
        scene,
        x,
        y,
        {

            width = 137.5,
            height = 50,
            wheelSize = 22, // tamaño de la rueda en cm
            wheelOffsetX = 20,
            wheelOffsetY = 40,
            masaChasis = 1200, // kg
            masaLlantas = 60, // densidad específica para las llantas
            potenciaMotor = 180, // hp
            rpm = 3000 // revoluciones por minuto
        } = {}
    ) {
        this._scene = scene;
    
        const wheelBase = wheelOffsetX;
        const wheelAOffset = -width * 0.5 + wheelBase;
        const wheelBOffset = width * 0.5 - wheelBase;
    
        this.masaChasis = masaChasis;
        this.potenciaMotor = potenciaMotor*10;
        this.rpm = rpm;
        const wheelRadius = wheelSize * 0.5;
        const wheelArea = Math.PI * Math.pow(wheelRadius, 2);
        this.densidadLlantas = masaLlantas / wheelArea;
    
        const area = width * height;
        const densityChasis = masaChasis / area;
        const friction = 1;
    
        this.gas = { left: false, right: false };
        this.ACCELERATION = 0.002 * 6;
        this.ACCELERATION_BACKWARDS = 0.001;
        this.MAX_SPEED = 0.04 * 16;
        this.MAX_SPEED_BACKWARDS = 0.04;
    
        const Matter = Phaser.Physics.Matter.Matter;
        const group = scene.matter.world.nextGroup(true);
    
        // Chasis
        const body = scene.matter.add.image(x, y, 'car_chasis');
        body.setScale(0.35);
        body.setRectangle(width, height, {
            label: 'carBody',
            collisionFilter: { group },
            chamfer: { radius: height * 0.5 },
            density: densityChasis // ajustamos para Matter.js
        });
    
        // Rueda Trasera
        const wheelA = scene.matter.add.image(x + wheelAOffset, y + wheelOffsetY, 'car_wheel');
        wheelA.setScale(wheelSize / 400);
        wheelA.setCircle(wheelSize, {
            label: 'wheelRear',
            collisionFilter: { group },
            friction,
            density: this.densidadLlantas
        });
    
        // Rueda Delantera
        const wheelB = scene.matter.add.image(x + wheelBOffset, y + wheelOffsetY, 'car_wheel');
        wheelB.setScale(wheelSize / 400);
        wheelB.setCircle(wheelSize, {
            label: 'wheelFront',
            collisionFilter: { group },
            friction,
            density: this.densidadLlantas
        });
        
        
        // Ejes
        const axelA = scene.matter.add.constraint(body.body, wheelA.body, 0, 0.2, {
            pointA: { x: -wheelAOffset, y: wheelOffsetY }
        });
    
        const axelB = scene.matter.add.constraint(body.body, wheelB.body, 0, 0.2, {
            pointA: { x: -wheelBOffset, y: wheelOffsetY }
        });
    
        this.bodies = [body.body, wheelA.body, wheelB.body];
    }


    update() {
        const Matter = Phaser.Physics.Matter.Matter;
        const carBody = this.bodies[0];
        const wheelRear = this.bodies[1];
        const wheelFront = this.bodies[2];
      
        const angularVelocityBase = (this.rpm / 60) * (2 * Math.PI); // rpm -> rad/seg
        const motorForce = (this.potenciaMotor * 745.7) / (angularVelocityBase); // hp -> fuerza
        const wheelTorque = motorForce * 0.1;
        const accelerationFromTorque = wheelTorque / (this.masaChasis * 10);
        

        // Aceleración automática si no se presiona nada
        let autoSpeed = wheelRear.angularSpeed + accelerationFromTorque;
        if (autoSpeed > this.MAX_SPEED) autoSpeed = this.MAX_SPEED;


        // Asignar velocidad a las ruedas
        /*if (this.wheelsDown?.rear && this.wheelsDown?.front) {
            Matter.Body.setAngularVelocity(wheelRear, wheelRear.angularVelocity * 0.9);
            Matter.Body.setAngularVelocity(wheelFront, wheelFront.angularVelocity * 0.9);
        }*/
        //else{
        Matter.Body.setAngularVelocity(wheelRear, autoSpeed);
        Matter.Body.setAngularVelocity(wheelFront, autoSpeed);
        //}

    }
}
