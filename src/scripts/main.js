import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import LevelSelectScene from './scenes/LevelSelectScene.js';
import VHSShaderPipeline from './VHSShaderPipeline.js'; 


const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#DDDDDD',
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0.7 },
            debug: true
        }
    },
    scene: [MenuScene, GameScene, LevelSelectScene],
    
    pipeline: {
        CustomShaderVHS: VHSShaderPipeline // Registrar el pipeline
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
    
};

const game = new Phaser.Game(config);