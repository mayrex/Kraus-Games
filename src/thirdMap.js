let risposta1 = ""
let risposta_aggiornata;
let risposta_comparazione;
let risposta_aggiornata_numerica;
let mostra_pensiero1=0;
let risposta2=""
class thirdMap extends Phaser.Scene
{
    constructor(){
        super("thirdMap");
    }
    preload()
    {
      this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
      })
      
      this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
      this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create(){
      this.eKey = this.input.keyboard.addKey("e");
      this.wKey = this.input.keyboard.addKey("w");
      this.aKey = this.input.keyboard.addKey("a");
      this.sKey = this.input.keyboard.addKey("s");
      this.dKey = this.input.keyboard.addKey("d");

        this.cameras.main.fadeIn(1000);
        const map3=this.make.tilemap({key:'map3',tilesWidth:16,tilesHeight:16});
        const tilesFloor = map3.addTilesetImage("tilesFloor", "tile1");
        const tilesStuff = map3.addTilesetImage("tilesStuff", "tile2");
        const tilesWalls = map3.addTilesetImage("tilesWalls", "tile3");
        const giblet = map3.addTilesetImage("giblet_variations","giblet");
        const spider = map3.addTilesetImage("Spider", "spider");
        const neko = map3.addTilesetImage("neko-office-furniture","tile4");
        const libreria =map3.addTilesetImage("TileSet v1.0","tile5");
        let tiles1=[tilesFloor,tilesWalls];
        let tiles2=[tilesStuff,libreria,giblet];
        let tiles3=[tilesStuff,neko];
        

        const layer1 = map3.createLayer("Livello tile 1", tiles1).setScale(3);
        const layer2 = map3.createLayer("Livello tile 2", tiles2).setScale(3);
        const layer3 = map3.createLayer("Livello tile 3", tiles3).setScale(3);

        this.eKey = this.input.keyboard.addKey("e");

        this.porta_rossa_aperta=this.physics.add.image(434,410,"porta_aperta").setScale(3.3,3.15).setImmovable().setInteractive().setVisible(false);
        this.porta_rossa_chiusa=this.physics.add.image(432,410,"porta_chiusa").setScale(3.39,3.1).setImmovable().setInteractive().setVisible(true);
        this.bounds_porta_rossa=this.physics.add.image(434,380,"bounds").setScale(5.5,0.2).setImmovable().setInteractive().setVisible(false);
        this.porta_rossa1_aperta=this.physics.add.image(1129,416,"porta_aperta").setScale(2.75,3).setImmovable().setVisible(false).setInteractive();
        this.porta_rossa1_chiusa=this.physics.add.image(1129,416,"porta_chiusa").setScale(2.75,3).setImmovable().setVisible(true).setInteractive();
        this.porta_rossa1_bounds=this.physics.add.image(1129,380,"bounds").setScale(5,0.27).setImmovable().setInteractive().setVisible(false);
        this.porta_blu_aperta=this.physics.add.image(1129,78,"porta_blu_aperta").setScale(2.81,3).setImmovable().setInteractive().setVisible(true);
        this.porta_blu_chiusa=this.physics.add.image(1129,78,"porta_blu_chiusa").setScale(2.81,3).setImmovable().setInteractive().setVisible(true);

        //sthis.porta_blu_aperta=this.physics.add.image(1129,70,"porta_blu_aperta").setScale(2.8,3).setImmovable().setInteractive().setVisible(true);
        this.passaggio_stanza_boss=this.physics.add.image(1150,10,"bounds").setScale(7,0.1).setImmovable().setInteractive().setVisible(false);
        this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95).setInteractive().setCollideWorldBounds(true);
        this.bounds1=this.physics.add.image(0,600,"bounds").setScale(0.3, 5.7).setImmovable().setInteractive().setVisible(false);
        this.schermo_tastierino=this.physics.add.image(config.width/2,config.height/2,"schermo_tastierino").setScale(10,15).setImmovable().setInteractive().setVisible(false);
        this.scritta1_tastierino=this.add.text(200,300,"Inserire la Password:",{fill:"black",fontSize:"29px",fontFamily:"Georgia"}).setVisible(false);
        this.Password = this.add.text(210 , 370, 'Digita qui la Password ',{fill:"black",fontSize:"26px"}).setVisible(false);
        this.tavolo=this.physics.add.image(410,210,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo1=this.physics.add.image(216,887,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo2=this.physics.add.image(695,887,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo3=this.physics.add.image(1128,887,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.scaffali_muro_destro_lv5=this.physics.add.image(1383,642,"bounds").setScale(0.6,0.55).setImmovable().setVisible(false).setInteractive();
        this.muro_destro=this.physics.add.image(1409,500,"bounds").setImmovable().setScale(0.2,4).setVisible(false).setInteractive();
        this.muro_centrale=this.physics.add.image(840,200,"bounds").setScale(0.52,1.5).setImmovable().setVisible(false).setInteractive();
        this.server_elemento_mappa=this.physics.add.image(146,440,"bounds").setScale(3.93,0.2).setImmovable().setVisible(false).setInteractive();
        this.server_elemento1_mappa=this.physics.add.image(798,264,"bounds").setScale(0.5,0.5).setImmovable().setVisible(false).setInteractive();
        this.testo_interazione=this.add.text(80,34,"interagire",{fill:"black",fontSize:"25px",fontFamily:"Georgia"}).setVisible(true).setScale(1);
        this.interazione=this.add.image(50,50,"E").setScale(1.2).setVisible(false);
        this.bounds_porta_blu=this.physics.add.image(1150,50,"bounds").setScale(6,0.1).setInteractive().setImmovable().setVisible(false);
        this.computer=this.physics.add.image(400,230,"bounds").setVisible(false).setScale(0.5,0.1);
        this.screen = this.physics.add.sprite(config.width / 2, config.height / 2, "screen").setScale(4).setVisible(false);
        this.serie_di_fibonacci=this.add.text(470,230,"1,2,3,5,8,...",{fill:"white",fontSize:"25px"}).setScale(1).setVisible(false);
        this.risposta=this.add.text(470,270,"Digita il prossimo numero:",{fill:"white",fontSize:"27px"}).setScale(1).setVisible(false);
        this.answerTextField = this.add.text(470 , 330, 'Digita qui la risposta',{fill:"white",fontSize:"23px"}).setVisible(false);
        this.answerBtn = this.add.text(480, 500, 'Rispondi', { fill: '#fff',fontSize:"25px" }).setVisible(false);
        this.answerBtn.setInteractive();
        this.PasswordBtn = this.add.text(200, 410, 'Rispondi', { fill: '#0x00000' ,fontSize:"20px"}).setVisible(false).setInteractive();

        this.answerTextField.setInteractive().on('pointerdown', () => {
		      this.rexUI.edit(this.answerTextField);
          //this.answerTextField.setVisible(true);
	    })     
      this.Password.setInteractive().on('pointerdown', () => {
        this.rexUI.edit(this.Password);
        //this.answerTextField.setVisible(true);
    })     
        this.risposta_sbagliata=this.add.text(470,360,"Risposta errata",{fill:"white",fontSize:"22px"}).setScale(1).setVisible(false);
        this.risposta_giusta=this.add.text(470,360,"Risposta corrretta ,\n\nhai risolto l'enigma di questa stanza",{fill:"white",fontSize:"22px"}).setVisible(false)
        this.risposta_sbagliata1=this.add.text(200,460,"Risposta errata",{fill:"black",fontSize:"29px"}).setScale(1).setVisible(false);
        this.risposta_giusta1=this.add.text(200,460,"Risposta corrretta ,\n\n ora puoi accedere alla stanza finale",{fill:"black",fontSize:"29px"}).setVisible(false);
        console.log(this.answerTextField);
        
        this.DialogoComputerTextBox= createTextBox(this, 100, 750,
          {
            wrapWidth: 1000,
            fixedWidth: 1000,
            fixedHeight: 90,
            title: 'Kraus:',
          }).start("Kraus: Cos'è questa sequenza.Non ricordo assolutamente l'ultimo numero... Osinao: dovremo tornare sui nostri passi forse hai lasciato qualche indizio in giro, se non sbaglio non abbiamo ancora controllato la libreria", 1000050);

        this.DialogoComputerTextBox.setVisible(false);
        this.cursorKeys= this.input.keyboard.createCursorKeys();
       
        this.physics.add.collider(this.player,this.bounds_porta_blu);
        this.physics.add.collider(this.player,layer1);
        this.physics.add.collider(this.player,layer2);
        this.physics.add.collider(this.player,layer3);
        this.physics.add.collider(this.player,this.tavolo);
        this.physics.add.collider(this.player,this.tavolo1);
        this.physics.add.collider(this.player,this.tavolo2);
        this.physics.add.collider(this.player,this.tavolo3);
        this.physics.add.collider(this.player,this.scaffali_muro_destro_lv5);
        this.physics.add.collider(this.player,this.muro_destro);
        this.physics.add.collider(this.player,this.muro_centrale);
        this.physics.add.collider(this.player,this.server_elemento_mappa);
        this.physics.add.collider(this.player,this.server_elemento1_mappa);
        this.physics.add.collider(this.player,this.bounds_porta_rossa);
        this.physics.add.collider(this.player,this.bounds1, this.changeScene, null, this);
        this.physics.add.collider(this.player,this.porta_rossa1_bounds);
        this.physics.add.collider(this.player,this.passaggio_stanza_boss,this.changeScene1,null,this);


        layer1.setCollisionBetween(212,213);
        //layer1.setCollisionBetween(240,242);
        layer1.setCollisionBetween(228,230);
        layer1.setCollisionBetween(308,309);
        //layer1.setCollisionBetween(238,239);
        //layer2.setCollisionBetween(794,795);
        layer2.setCollisionBetween(718,718);



        const button = this.add.image(config.width - 100, 50, "fullScreenBUTTON").setScale(0.2).setInteractive(); 

        button.on('pointerup', function ()
        {
  
            if (this.scale.isFullscreen)
            {  
              this.scale.stopFullscreen();
            }
            else
            {             
              this.scale.startFullscreen();
            }
  
        }, this);

        this.physics.add.overlap(this.player, this.bounds1, this.changeScene, null, this);
        this.physics.add.overlap(this.player,this.passaggio_stanza_boss,this.changeScene1,null,this);
      
        this.cursorKeys= this.input.keyboard.createCursorKeys();
        risposta_aggiornata=this.answerTextField._text;
        risposta_comparazione="13";
        
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
        moveplayer = false;
        if(progress==1)
        {
          gameSettings.playerX = 1400,
          gameSettings.playerY = this.player.y
          this.scene.start("secondMap");
        }
      })
    }
    compareStrings(risposta_aggiornata, risposta_comparazione){
   
      // This condition will return true only if s1 and s2 hold true from equality
      if(risposta_aggiornata== risposta_comparazione){
          return 'Both strings are equal';
      }
      
      return 'Both strings are not equal';
  }
    apertura_porta(){
      if(this.player.x>400 && this.player.x<550 &&  this.player.y>400 && this.player.y<500 || this.player.x>300 && this.player.x<650   && this.player.y<450 && this.player.y>300){
        if(this.eKey.isDown){
          setTimeout(() => {
            this.porta_rossa_chiusa.setVisible(false);
            this.bounds_porta_rossa.setScale(0.000001,0.000001);
            this.bounds_porta_rossa.setX(1);
            this.bounds_porta_rossa.setY(1);
            this.porta_rossa_aperta.setVisible(true);
        },1000)
        console.log("cazzo");
       
        }
      }
     }
    
     apertura_porta1(){
      if(this.player.x>1100 && this.player.x<1160 &&  this.player.y>400 && this.player.y<500 || this.player.x>1100 && this.player.x<1200   && this.player.y<450 && this.player.y>300){
        if(this.eKey.isDown){
          setTimeout(() => {
            this.porta_rossa1_chiusa.setVisible(false);
            this.porta_rossa1_bounds.setScale(0.00001,0.000001);
            this.porta_rossa1_bounds.setX(1);
            this.porta_rossa1_bounds.setY(1);
            this.porta_rossa1_bounds.setVisible(false);
            this.porta_rossa1_aperta.setVisible(true);
            console.log("entra")
        },1000)
        console.log("cazzo");
       
        }
      }
     }
     apertura_porta_blu(){
      if(risposta2=="KOT13"){
        
          setTimeout(() => {
            this.porta_blu_chiusa.setVisible(false);
            this.bounds_porta_blu.setScale(0.00001,0.000001);
            this.bounds_porta_blu.setX(1);
            this.bounds_porta_blu.setY(1);
            this.bounds_porta_blu.setVisible(false);
            this.porta_blu_aperta.setVisible(true);
            console.log("entra")
        },1000)
        console.log("cazzo");
       
        
      }
     }
     metti_password(){
      if(this.eKey.isDown){
        if(this.player.x>1230 && this.player.x<1300 && this.player.y>10 && this.player.y<170){
          this.scritta1_tastierino.setVisible(true);
          this.schermo_tastierino.setVisible(true);
          this.Password.setVisible(true);
          this.PasswordBtn.setVisible(true);
          
          this.PasswordBtn.on('pointerdown', () => { 
            risposta2 = this.Password._text;
            if(risposta2 == "KOT13")
            {
              console.log("entra dal boss");
              this.risposta_giusta1.setVisible(true);
              this.risposta_sbagliata1.setVisible(false);
            }
            else{
              this.risposta_sbagliata1.setVisible(true);
              this.risposta_giusta1.setVisible(false);
            }
          })
        }else{
          this.scritta1_tastierino.setVisible(false);
          this.schermo_tastierino.setVisible(false);
          this.Password.setVisible(false);
          this.PasswordBtn.setVisible(false);
          this.risposta_giusta1.setVisible(false);
          this.risposta_sbagliata1.setVisible(false);
        }
      }
     }
     accensione_computer(){
      if(this.eKey.isDown){
        if(this.player.x>390 && this.player.x<440 && this.player.y<230 && this.player.y>100){
          mostra_pensiero1+=1;
          if(mostra_pensiero1==1){
            this.DialogoComputerTextBox.setVisible(true);
            this.DialogoComputerTextBox.start("Kraus: Cos'è questa sequenza.Non ricordo assolutamente l'ultimo numero... Osinao: dovremo tornare sui nostri passi forse hai lasciato qualche indizio in giro, se non sbaglio non abbiamo ancora controllato la libreria", 1000050)
          }
          this.screen.setVisible(true);
          this.serie_di_fibonacci.setVisible(true);
          this.answerTextField.setVisible(true); //questo è per rispondere
          this.answerBtn.setVisible(true);
          this.risposta.setVisible(true); //cosa è?? 
          //this.DialogoComputerTextBox.setVisible(true);
          //this.DialogoComputerTextBox.start("\n\nCos'è questa sequenza.Non ricordo assolutamente l'ultimo numero...",200);
          this.answerBtn.on('pointerdown', () => { 
            risposta1 = this.answerTextField._text
            if(risposta1 == "13")
            {
              this.risposta_giusta.setVisible(true);
              this.risposta_sbagliata.setVisible(false);
            }
            else{
              this.risposta_sbagliata.setVisible(true);
              this.risposta_giusta.setVisible(false);
            }
            
            //this.answerBtn.setStyle({ fill: '#ff0'} ) 
          });

          /*
          if(risposta_aggiornata_numerica==13){

            console.log("il pisellone")
            this.risposta_giusta.setVisible(true);
            this.risposta_sbagliata.setVisible(false);
          }else{
            //this.risposta_sbagliata.setVisible(true);
            this.risposta_giusta.setVisible(false);
          }
          */
        }else{
          this.screen.setVisible(false);
          this.serie_di_fibonacci.setVisible(false);
          this.answerTextField.setVisible(false);
          this.risposta.setVisible(false);
          this.DialogoComputerTextBox.setVisible(false);
          this.risposta_giusta.setVisible(false);
          this.risposta_sbagliata.setVisible(false);
          this.answerBtn.setVisible(false);
        }
      }
     }
     chiusura_porta(){
      if(this.player.y<290 && this.player.x<1000){
        //console.log(this.answerTextField._text);
        //console.log(risposta_aggiornata_numerica);
          this.bounds_porta_rossa.setScale(5,0.27);
          this.bounds_porta_rossa.setX(434);
          this.bounds_porta_rossa.setY(380);
          this.porta_rossa_chiusa.setVisible(true);
          this.porta_rossa_aperta.setVisible(false);
    

          
 
       //this.porta_chiusa.setVisible(true);
       
      }
      }
      chiusura_porta1(){
        if(this.player.y<290 && this.player.x>1000){
          //console.log(this.answerTextField._text);
          //console.log(risposta_aggiornata_numerica);
            this.porta_rossa1_bounds.setScale(5,0.27);
            this.porta_rossa1_bounds.setX(1129);
            this.porta_rossa1_bounds.setY(380);
            this.porta_rossa1_chiusa.setVisible(true);
            this.porta_rossa1_aperta.setVisible(false);
      
  
            
   
         //this.porta_chiusa.setVisible(true);
         
        }
      }
      bottone_interazione(){
        if(this.player.x>400 && this.player.x<550 &&  this.player.y>400 && this.player.y<500 || this.player.x>300 && this.player.x<650   && this.player.y<450 && this.player.y>300 || this.player.x>390 && this.player.x<440 && this.player.y<230 && this.player.y>100 || this.player.x>1100 && this.player.x<1160 &&  this.player.y>400 && this.player.y<500 || this.player.x>1100 && this.player.x<1200   && this.player.y<450 && this.player.y>300 || this.player.x>1230 && this.player.x<1300 &&  this.player.y>50 && this.player.y<180){
          
          this.interazione.setX(this.player.x);
          this.interazione.setY(this.player.y-50);
          this.interazione.setVisible(true);
          this.testo_interazione.setVisible(false);
        }else{
          this.testo_interazione.setVisible(false);
          this.interazione.setVisible(false);
        }
      }
      changeScene1()
      {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
          movePlayer = false;
          if(progress===1)
          {
            gameSettings.playerX = this.player.x
            gameSettings.playerY = 900,
            this.scene.start("fifthMap");
          }
        })
      } 
                                                         
      update()
      {
        risposta_aggiornata=this.answerTextField._text;
        risposta_aggiornata_numerica=Number(risposta_aggiornata);
        //console.log(risposta_aggiornata_numerica);
        this.metti_password();
        this.apertura_porta_blu();
        this.accensione_computer();
        this.apertura_porta1();
        this.chiusura_porta1();
        this.bottone_interazione();
        this.apertura_porta();
        this.chiusura_porta();
        this.movePlayerManager();
      }
}