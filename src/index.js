
var gameSettings={
    playerSpeed:300,
    playerX: 200,
    playerY: 525
}

var config={

    parent: main_game,
    type: Phaser.AUTO,
    width: 1450,    
    height: 960,
    backgroundColor: 0x00000,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [load, menu, introduction, firstMap, secondMap,thirdMap,fourthMap,fifthMap],
    physics:{
        default:"arcade",
        arcade:{
            debug:false,
        }
    },
    dom: {
        createContainer: true
    },


    render: {
        pixelArt: true
    }

}
var game = new Phaser.Game(config)