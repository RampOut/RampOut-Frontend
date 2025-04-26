import Start from './scenes/Start';
import Phaser from 'phaser';

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
    scene: [Start],
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