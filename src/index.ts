import Start from './scenes/Start';
import LevelSelect from './scenes/LevelSelect';
import Phaser from 'phaser';
import VHSShaderPipeline from './VHSShaderPipeline';

const config: Phaser.Core.Config = {
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
    scene: [Start, LevelSelect],
    pipeline: {
        CustomShaderVHS: VHSShaderPipeline // Registrar el pipeline
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
    
};

if (window.location.pathname == "/game"){
    const game = new Phaser.Game(config);
} else {
    game.destroy(true);
}