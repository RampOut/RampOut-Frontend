import 'phaser';
import Start from './scenes/Start';
import LevelSelect from './scenes/LevelSelect';
import LevelGameSetup from './scenes/LevelGameSetup';
import ArmarCarrito from './scenes/ArmarCarrito';
import LevelBlack from './scenes/LevelBlack';
import Guia from './scenes/Guia';
import EsperandoPartida from './scenes/EsperandoPartida';
import VHSShaderPipeline from './VHSShaderPipeline';
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import RexTextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0.7 },
            debug: true
        }
    },
    scene: [Start, LevelSelect, EsperandoPartida, LevelBlack, Guia, ArmarCarrito],
    pipeline: {
        CustomShaderVHS: VHSShaderPipeline // Registrar el pipeline
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    }
};

const game = new Phaser.Game(config);
export default game;

if (window.location.pathname !== "/game") {
    game.destroy(true);
}