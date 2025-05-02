import 'phaser';
import Start from './scenes/Start';
import LevelSelect from './scenes/LevelSelect';
import LevelGameSetup from './scenes/LevelGameSetup';
import GameScene from './scenes/GameScene';
import LevelBlack from './scenes/LevelBlack';
import LevelResults from './scenes/LevelResults';
import LevelBuildYourCarTeacher from './scenes/LevelBuildYourCarTeacher';
import LevelStudentTeam from './scenes/LevelStudentTeam';
import StudentGuide from './scenes/StudentGuide';
import TeacherGuide from './scenes/TeacherGuide';
import BuildCarStudent from './scenes/BuildCarStudent';
import EsperandoPartida from './scenes/EsperandoPartida';
import VHSShaderPipeline from './VHSShaderPipeline';
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import RexTextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js';
import BuildCarStudent from './scenes/BuildCarStudent';


const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    },

    scene: [ Start, LevelSelect, LevelGameSetup, LevelResults, LevelBlack, TeacherGuide,
            StudentGuide, LevelBuildYourCarTeacher, LevelStudentTeam, EsperandoPartida, BuildCarStudent],
    pipeline: {
        CustomShaderVHS: VHSShaderPipeline,
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