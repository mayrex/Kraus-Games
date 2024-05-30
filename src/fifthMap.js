class fifthMap extends Phaser.Scene
{
    constructor(){
        super("fifthMap");
    }
    

    create(){
      this.eKey = this.input.keyboard.addKey("e");
      this.wKey = this.input.keyboard.addKey("w");
      this.aKey = this.input.keyboard.addKey("a");
      this.sKey = this.input.keyboard.addKey("s");
      this.dKey = this.input.keyboard.addKey("d");


        this.cameras.main.fadeIn(1000);
        const map5=this.make.tilemap({key:'map5',tilesWidth:16,tilesHeight:16 });
        const tilesFloor = map5.addTilesetImage("tilesFloor", "tile1");
        const tilesStuff = map5.addTilesetImage("tilesStuff", "tile2");
        const tilesWalls = map5.addTilesetImage("tilesWalls", "tile3");
        const giblet = map5.addTilesetImage("giblet_variations","giblet");
        let tiles1 = [tilesFloor,tilesWalls,tilesStuff];
        let tiles2 = [tilesStuff,giblet];
        let tiles3 = [tilesStuff];

        const layer1 = map5.createLayer("Livello tile 1", tiles1).setScale(3);
        const layer2 = map5.createLayer("Livello tile 2", tiles2).setScale(3);
        const layer3 = map5.createLayer("Livello tile 3", tiles3).setScale(3);

        this.passaggio_stanza3=this.physics.add.image(1146,963,"bounds").setScale(5.3,0.1).setImmovable().setInteractive().setVisible(false);
        this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95).setInteractive().setCollideWorldBounds(false);
        this.muro_sinistro=this.physics.add.image(26,500,"bounds").setScale(0.4,4).setImmovable().setVisible(false).setInteractive();
        this.muro_sopra_sinistro=this.physics.add.image(550,65,"bounds").setScale(25,0.1).setImmovable().setVisible(false).setInteractive();
        this.muro_sopra_destro=this.physics.add.image(1400,65,"bounds").setScale(5,0.1).setImmovable().setVisible(false).setInteractive();
        this.muro_destro=this.physics.add.image(1413,500,"bounds").setScale(0.4,4).setImmovable().setVisible(false).setInteractive();
        this.freccia_giù=this.physics.add.image(1150,850,"freccia_giù").setScale(0.15).setImmovable().setVisible(false).setImmovable();


        this.physics.add.collider(this.player,this.muro_sinistro);
        this.physics.add.collider(this.player,this.muro_destro);
        this.physics.add.collider(this.player,this.muro_sopra_sinistro);
        this.physics.add.collider(this.player,this.muro_sopra_destro);
        this.physics.add.collider(this.player,this.passaggio_stanza3,this.changeScene,null,this);
        this.physics.add.collider(this.player,layer1);
        this.physics.add.collider(this.player,layer2);
        this.physics.add.collider(this.player,layer3);
        //layer1.setCollisionBetween(211,212);
        //layer1.setCollisionBetween(215,216);
        //layer1.setCollisionBetween(199,201);
        layer2.setCollisionBetween(718,718);
        
        this.physics.add.overlap(this.player, this.passaggio_stanza3, this.changeScene, null, this)
        this.cursorKeys= this.input.keyboard.createCursorKeys();
    }

    movePlayerManager(){
        this.player.setVelocity(0);
    
        if(this.cursorKeys.left.isDown || this.aKey.isDown){
          this.player.setVelocityX(-gameSettings.playerSpeed);
          this.player.anims.play("mov_sinistra", true);
          direction = "left";
        }      
        else if(this.cursorKeys.right.isDown || this.dKey.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.anims.play("mov_destra", true);
            direction = "right"
        }
        else if(this.cursorKeys.up.isDown  || this.wKey.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
            this.player.anims.play("mov_dietro", true);
            direction = "up"
        }  
        else if(this.cursorKeys.down.isDown || this.sKey.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            this.player.anims.play("mov_avanti", true);
            direction = "down"
  
        }
        else
        {
          this.player.stop();
          if(direction == "left")
          {
            this.player.anims.play("idle_sinistra")
          }
          if(direction == "right")
          {
            this.player.anims.play("idle_destra");
          }
          if(direction == "down")
          {
            this.player.anims.play("idle_avanti")
          }
          if(direction == "up")
          {
            this.player.anims.play("idle_dietro")
          }
        }
      }
      changeScene()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        movePlayer = false;
        if(progress===1)
        {
          gameSettings.playerX = this.player.x,
          gameSettings.playerY = 120
          this.scene.start("thirdMap");
        }
      })
    } 
    mostra_freccia_giù(){
      if(this.player.x<1300 && this.player.x>1000 && this.player.y<1000 && this.player.y>800){
        this.freccia_giù.setVisible(true);
      }else{
        this.freccia_giù.setVisible(false);
      }

    }
                                                         
      update()
      {
        this.mostra_freccia_giù();
        this.movePlayerManager();
      }
}