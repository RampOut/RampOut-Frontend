export default class Car {
    

    constructor(
        scene,
        x,
        y,
        masaChasis,
        masaPiloto,
        {
            
            width = 110,//150,//137.5,
            height = 35,//50,
            wheelSize = 12, // tamaño de la rueda en cm
            wheelOffsetX = 20,
            wheelOffsetY = 30,
            //masaPiloto = 30,
            masaMotor = 150,
            //masaChasis = 1400, // kg
            masaLlantas = 120, // densidad específica para las llantas
            potenciaMotor = 12*5, // hp
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
        this.ACCELERATION = 0.002 * 8;
        this.ACCELERATION_BACKWARDS = 0.001;
        this.MAX_SPEED = 0.04 * 40;
        this.MAX_SPEED_BACKWARDS = 0.04;
    
        const Matter = Phaser.Physics.Matter.Matter;
        const group = scene.matter.world.nextGroup(true);
    
        // Chasis
        const body = scene.matter.add.image(x, y, 'car_chasis');
        body.setScale(0.25);
        body.setRectangle(width, height, {
            label: 'carBody',
            collisionFilter: { group },
            chamfer: { radius: height * 0.5 },
            density: densityChasis // ajustamos para Matter.js
        });
    
    // Rueda Delantera
    const wheelA = scene.matter.add.image(x + wheelAOffset, y + wheelOffsetY, 'car_wheel');
    wheelA.setScale(wheelSize / 400);
    wheelA.setCircle(wheelSize, {
        label: 'wheelFront',  // Rueda delantera
        collisionFilter: { group },
        friction: 1,
        density: this.densidadLlantas
    });

    // Rueda Trasera
    const wheelB = scene.matter.add.image(x + wheelBOffset, y + wheelOffsetY, 'car_wheel');
    wheelB.setScale(wheelSize / 400);
    wheelB.setCircle(wheelSize, {
        label: 'wheelRear',  // Rueda trasera
        collisionFilter: { group },
        friction: 1,
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
        //if (this.wheelsDown?.rear && this.wheelsDown?.front) {
        //    Matter.Body.setAngularVelocity(wheelRear, wheelRear.angularVelocity * 0.5);
        //    Matter.Body.setAngularVelocity(wheelFront, wheelFront.angularVelocity * 0.5);
        //}
        //else{
        Matter.Body.setAngularVelocity(wheelFront, wheelFront.angularVelocity);
        Matter.Body.setAngularVelocity(wheelRear, wheelRear.angularVelocity);
        //}

    }
}
