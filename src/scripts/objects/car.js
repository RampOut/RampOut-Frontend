export default class Car extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, config) {
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this);

        // Escala del vehículo (default 1 si no se define)
        this.escala = config.escala || 1;
        this.setScale(this.escala);
        this.setFriction(0.7);
        this.setFrictionAir(0.05);
        this.setBounce(0.2);
        
        // Parámetros de entrada
        this.hp = config.hp || 150;
        this.rpm = config.rpm || 5000;
        this.diametroLlantasCM = config.diametroLlantasCM || 50.8; // 20 pulgadas en cm

        // Pesos (en kg)
        this.piloto = config.piloto || 70;
        this.chasis = config.chasis || 200;
        this.motor = config.motor || 150;
        this.llantas = config.llantas || 40;

        // Masa total del sistema
        this.mSistema = this.piloto + this.chasis + this.motor + this.llantas;
        
        // Establecer la masa en el motor de física de Matter
        this.setMass(this.mSistema);

        // Parámetros físicos y cálculos
        this.radioLlanta = (this.diametroLlantasCM / 100) / 2; // metros
        this.mMuerta = 1; // kg

        // Torque a partir de potencia (Nm)
        this.torque = (this.hp * 745.7) / (2 * Math.PI * (this.rpm / 60));

        // Parámetros del eje
        this.rEje = 0.2; // radio del eje en metros
        this.dEje = 0.2; // distancia del eje en metros

        // Calcular omega usando la fórmula proporcionada
        this.omega = Math.sqrt(this.torque / (4 * Math.pow(this.radioLlanta, 2) * this.mSistema));

        // Fuerza del motor usando la fórmula exacta proporcionada
        this.fMotor = (Math.pow(this.rEje, 2) * this.mMuerta * Math.pow(this.omega, 2)) / 
                     (this.dEje * 4);
        
        // Fuerza GoKart
        this.fGoKart = (3 * this.mSistema * Math.pow(this.omega, 2)) / (4 * this.dEje);
        
        // Fuerza neta del vehículo (restando la fricción)
        this.fVehiculo = this.fGoKart - (this.mSistema * 9.81 * 0.1); // 0.1 como coeficiente de fricción
        
        // Aceleración
        this.aceleracion = this.fVehiculo / this.mSistema;

        this.prevVelocity = 0;
        this.prevDistance = 0;
        this.deltaT = 0;
        this.tiempo = 0;
    }

    update(time, delta) {
        // Convertir delta de ms a segundos
        const dt = delta / 1000;
        this.deltaT = dt;
        this.tiempo += dt;

        // Verificar si está en el suelo
        const velocity = this.body.velocity;
        const onGround = Math.abs(velocity.y) < 0.5 && Math.abs(this.body.angle) < 0.5;

        if (onGround) {
            // Calcular la nueva velocidad usando v(t) = A∆t + v(t-1)
            const newVelocity = this.aceleracion * dt + this.prevVelocity;
            
            // Calcular la nueva distancia usando d(t) = v∆t + (A(∆t)²)/2 + d(t-1)
            const distanceIncrement = this.prevVelocity * dt + 
                                     (this.aceleracion * Math.pow(dt, 2)) / 2;
            
            // Aplicar la velocidad calculada
            this.setVelocityX(newVelocity);
            
            // Actualizar los valores previos para el siguiente frame
            this.prevVelocity = newVelocity;
            this.prevDistance += distanceIncrement;
        }
        else {
            // Si no está en el suelo, aplicar una fuerza de frenado
            this.setVelocityX(this.body.velocity.x * 0.95); // Reducir la velocidad un 5%
        }
        
        // Estabilizar el coche para evitar caídas o vuelcos
        /*if (Math.abs(this.body.angle) > 0.1) {
            this.setAngularVelocity(this.body.angle > 0 ? -0.05 : 0.05);
        } else {
            //this.setAngularVelocity(0);
            //this.setAngle(0);
        }*/
    }
}