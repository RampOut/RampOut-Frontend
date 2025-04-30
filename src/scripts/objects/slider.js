export default class Slider {
    constructor(scene, name, x, y, constante, onChange = null) {
        this.scene = scene;
        this.name = name;
        this.x = x;
        this.y = y;
        this.constante = constante; 
        this.value = constante / 2;  // valor inicial

        // Etiqueta
        this.label = scene.add.text(x - 130, y - 30, name + ':', {
            fontSize: '20px',
            fontFamily: "Handjet-Regular",
            color: '#000'
        });

        // Barra
        this.bar = scene.add.rectangle(x, y, 200, 10, 0xcccccc).setOrigin(0.5);

        // Botón
        this.knob = scene.add.circle(x, y, 10, 0x0077ff)
            .setInteractive({ useHandCursor: true, draggable: true });

        // Valor numérico
        this.valueText = scene.add.text(x + 120, y - 10, this.value.toString(), {
            fontSize: '20px',
            fontFamily: "Handjet-Regular",
            color: '#000'
        });

        scene.input.setDraggable(this.knob);

        this.knob.on('drag', (pointer, dragX) => {
            const minX = x - 100;
            const maxX = x + 100;
            this.knob.x = Phaser.Math.Clamp(dragX, minX, maxX);

            this.value = parseFloat((constante*((this.knob.x - minX) / (maxX - minX))).toFixed(2));
            this.valueText.setText(this.value);

            if (onChange) {
                onChange(this.value);
            }
        });
    }

    // Método para obtener el valor actual
    getValue() {
        return this.value;
    }
}