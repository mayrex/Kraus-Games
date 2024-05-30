let moveplayer = true;
let ragni = 0;
let ragnoR = 0;
let ragnoB = 0;
let ragnoG = 0;
let indovinato = false
let Nao = "Hai ragione ma sarà meglio pensare a quei ragni proviamo a interagire con loro, quel sopravvissuto ha detto che nascondono una parte del codice."


class secondMap extends Phaser.Scene
{
    constructor()
    {
        super("secondMap");
    }

    preload()
    {
      this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
      })
      
      this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
    }
    create()
    {
      this.eKey = this.input.keyboard.addKey("e");
      this.wKey = this.input.keyboard.addKey("w");
      this.aKey = this.input.keyboard.addKey("a");
      this.sKey = this.input.keyboard.addKey("s");
      this.dKey = this.input.keyboard.addKey("d");

        this.cameras.main.fadeIn(1000)
        const map2 = this.make.tilemap({key: "map2", tileWidth: 16, tileHeight: 16});
        const tilesFloor = map2.addTilesetImage("tilesFloor", "tile1");
        const tilesStuff = map2.addTilesetImage("tilesStuff", "tile2");
        const tilesWalls = map2.addTilesetImage("tilesWalls", "tile3");
        const spider = map2.addTilesetImage("Spider", "spider");
        const ragni = map2.addTilesetImage("ragni", "ragni");
        const npc = map2.addTilesetImage("LabNPCs (1)", "labNpc");
        const giblet = map2.addTilesetImage("giblet_variations", "giblet");

        //this.bounds1 =this.physics.add.image(500,500,"bounds");

        let tiles1 = [tilesFloor, tilesWalls, ragni];
        let tiles2 = [tilesStuff, ragni];
        let tiles3 = [tilesStuff, ragni, spider, npc, giblet, ];

        const layer1 = map2.createLayer("Livello tile 1", tiles1).setScale(3);
        const layer2 = map2.createLayer("Livello tile 2", tiles2).setScale(3);
        const layer3 = map2.createLayer("Livello tile 3", tiles3).setScale(3);

        this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95);
        this.player.setCollideWorldBounds(true);
        this.player.setInteractive();

        this.bounds1=this.physics.add.image(0,900,"bounds").setScale(0.5, 3.7).setImmovable().setInteractive().setVisible(false)

        this.eKey = this.input.keyboard.addKey("e");
        this.bounds1=this.physics.add.image(0,900,"bounds").setScale(0.5, 3.7).setImmovable().setInteractive().setVisible(false);
        this.bounds2=this.physics.add.image(1450,500,"bounds").setScale(0.5, 5.7).setImmovable().setInteractive().setVisible(false);
        this.tavolo=this.physics.add.image(175,320,"bounds").setScale(3.01,0.18).setImmovable().setVisible(false).setInteractive();
        this.tavolo1=this.physics.add.image(791,455,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo2=this.physics.add.image(1032,455,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo3=this.physics.add.image(1273,455,"bounds").setScale(3.01,0.1).setImmovable().setVisible(false).setInteractive();
        this.tavolo4=this.physics.add.image(647,190,"bounds").setScale(1.3,0.3).setImmovable().setVisible(false).setInteractive();

        this.RagnoBlu=this.physics.add.image(595,630,"bounds").setScale(0.8,0.1).setImmovable().setVisible(false).setInteractive();
        this.ragno2=this.physics.add.image(705,630,"bounds").setScale(0.8,0.1).setImmovable().setVisible(false).setInteractive();
        this.ragno3=this.physics.add.image(925,630,"bounds").setScale(0.8,0.1).setImmovable().setVisible(false).setInteractive();
        this.ragno4=this.physics.add.image(1025,678,"bounds").setScale(0.8,0.05).setImmovable().setVisible(false).setInteractive();
        this.ragno5=this.physics.add.image(1135,667,"bounds").setScale(0.8,0.05).setImmovable().setVisible(false).setInteractive();
        this.ragno6=this.physics.add.image(1135,776,"bounds").setScale(0.8,0.05).setImmovable().setVisible(false).setInteractive();
        this.RagnoRosso=this.physics.add.image(850,775,"bounds").setScale(0.7,0.05).setImmovable().setVisible(false).setInteractive();
        this.RagnoGiallo=this.physics.add.image(738,775,"bounds").setScale(0.6,0.05).setImmovable().setVisible(false).setInteractive();
        this.ragno9=this.physics.add.image(160,295,"bounds").setScale(0.4,0.04).setImmovable().setVisible(false).setInteractive();
        this.npc=this.physics.add.image(280,296,"bounds").setScale(1,0.08).setImmovable().setInteractive().setVisible(false);
        this.interazione=this.add.image(50,50,"E").setScale(1.2).setVisible(false);
        this.sangueTextBox=createTextBox(this,30,800,{
          wrapWidth:1000,
          fixedHeight:50,
          fixedWidth:1000,
          title:'sangue',
        }).start("una volta erano miei colleghi… ora sono stati tutti massacrati per colpa mia, devo assolutamente evitare di fare la loro fine.",50).setVisible(false);
        this.DialogoNpcTextBox=createTextBox(this, 30, 700,
          {
            wrapWidth: 1000,
            fixedWidth: 1000,
            fixedHeight: 190,
            title: '',
            maxLines:1,
          }).start("Kraus: diamine credevo di esser rimasto l’unico umano qui dentro…cosa puoi dirmi su quei ragni e perché tutto quel sangue..? Sopravvissuto: io e il mio collega stavamo cercando di scappare ma Eva-cerbero ci ha trovati, io sono riuscito a nascondermi ma il mio collega è stato completamente massacrato da quel mostro.. sono ormai ore che sono bloccato in questa stanza con quei ragni robot che continuano a ripetere parole a caso. Da quel che so dovrebbero contenere un enigma per uno dei codici per aprire il portellone dell’ultima stanza ma non sono mai stato bravo in questi rompicapo, spero che tu possa riuscirci…",100000);
        this.DialogoNpcTextBox.setVisible(false);

        this.scaffali1=this.physics.add.image(745,160,"bounds").setScale(0.6,0.55).setImmovable().setVisible(false).setInteractive();
        this.eKey = this.input.keyboard.addKey("e");
        this.wKey = this.input.keyboard.addKey("w");
        this.aKey = this.input.keyboard.addKey("a");
        this.sKey = this.input.keyboard.addKey("s");
        this.dKey = this.input.keyboard.addKey("d");

        this.physics.add.collider(this.player,layer1);
        this.physics.add.collider(this.player,layer2);
        this.physics.add.collider(this.player,layer3);
        this.physics.add.collider(this.player,this.npc);

        this.physics.add.collider(this.player,this.tavolo);
        this.physics.add.collider(this.player,this.tavolo1);
        this.physics.add.collider(this.player,this.tavolo2);
        this.physics.add.collider(this.player,this.tavolo3);
        this.physics.add.collider(this.player,this.tavolo4);
        this.physics.add.collider(this.player,this.RagnoBlu);
        this.physics.add.collider(this.player,this.ragno2);
        this.physics.add.collider(this.player,this.ragno3);
        this.physics.add.collider(this.player,this.ragno4);
        this.physics.add.collider(this.player,this.ragno5);
        this.physics.add.collider(this.player,this.ragno6);
        this.physics.add.collider(this.player,this.RagnoRosso);
        this.physics.add.collider(this.player,this.RagnoGiallo);
        this.physics.add.collider(this.player,this.ragno9);
        this.physics.add.collider(this.player,this.scaffali1);

        this.physics.add.collider(this.player,this.bounds1, this.changeScene, null, this);
        this.physics.add.collider(this.player,this.bounds2, this.changeScene1, null, this);

        layer1.setCollisionBetween(211,212);
        layer1.setCollisionBetween(235,247);
        layer1.setCollisionBetween(213,214);
        layer1.setCollisionBetween(201,201);
        layer1.setCollisionBetween(221,222);
        layer1.setCollisionBetween(215,216);
        layer1.setCollisionBetween(261,262);
        layer1.setCollisionBetween(213,214);
        layer1.setCollisionBetween(218,218);
        //layer2.setCollisionBetween(754,755);
        layer2.setCollisionBetween(899,901);
        layer2.setCollisionBetween(713,713);
        layer3.setCollisionBetween(794,795);


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

        this.ragno_blu = createTextBox(this, config.width / 2 - 200, 800,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 70,
            title: 'Ragno Blu',
          }).setVisible(false).start("Rosso mente sempre", 30).setInteractive()

          this.Indovina = createTextBox(this, config.width / 2 - 200, 400,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 190,
            title: 'Chi ha ragione?',
          }).setVisible(false).start("Quale dei tre ragni ha ragione?", 30).setInteractive()

          this.ragno_giallo = createTextBox(this, config.width / 2 - 200, 800,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 70,
            title: 'Ragno Giallo',
          }).setVisible(false).start("Io dico sempre la verità", 30).setInteractive()

          this.ragno_rosso = createTextBox(this, config.width / 2 - 200, 800,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 70,
            title: 'Ragno Rosso',
          }).setVisible(false).start("Blu dice sempre la verità.", 30).setInteractive()

        this.cursorKeys= this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.bounds1, this.changeScene, null, this)

        this.giallo = this.add.image(750, 600, "giallo").setScale(0.4).setInteractive().setVisible(false)
        this.rosso = this.add.image(850, 600, "rosso").setScale(0.4, 0.5).setInteractive().setVisible(false)
        this.blu = this.add.image(650, 600, "blu").setScale(0.4, 0.38).setInteractive().setVisible(false)



        this.giallo.on("pointerdown", () =>
      {
        this.ragno_blu.setVisible(false)
        this.ragno_rosso.setVisible(false)
        this.ragno_giallo.setVisible(false)
        indovinato = true
        ragnoR = 0;
        ragnoB = 0
        ragnoG = 0;
        this.giallo.setVisible(false)
        this.blu.setVisible(false)
        this.rosso.setVisible(false)
        this.Indovina.start("Bravo! Hai risolto l'enigma. Interagisci con il ragno giallo")
  

      })
      this.rosso.on("pointerdown", () =>
      {
        this.ragno_blu.setVisible(false)
        this.ragno_rosso.setVisible(false)
        this.ragno_giallo.setVisible(false)
        this.Indovina.start("Hai sbagliato :/, riprova");
        ragnoR = 0;
        ragnoB = 0
        ragnoG = 0;
        this.giallo.setVisible(false)
        this.blu.setVisible(false)
        this.rosso.setVisible(false)

      })
      this.blu.on("pointerdown", () =>
      {
        this.ragno_blu.setVisible(false)
        this.ragno_rosso.setVisible(false)
        this.ragno_giallo.setVisible(false)
        this.Indovina.start("Hai sbagliato :/, riprova");
        ragnoR = 0;
        ragnoB = 0
        ragnoG = 0;
        this.giallo.setVisible(false)
        this.blu.setVisible(false)
        this.rosso.setVisible(false)
      })

      this.Indovina.on("pointerdown", ()=>{
        this.Indovina.setVisible(false)
      })

      this.dialogoNao = createTextBox(this, 30, 650,{
        wrapWidth: 350, 
        fixedWidth: 350,
        fixedHeight: 230,
        title: '',
      }).start("Kraus: Non credo che ci sarà d’aiuto è completamente scioccato e spaventato, come biasimarlo… NAO: Hai ragione ma sarà meglio pensare a quei ragni proviamo a interagire con loro, quel sopravvissuto ha detto che nascondono una parte del codice. ", 50).setVisible(false)


    }

    changeScene()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        moveplayer = false;
        if(progress==1)
        {
          gameSettings.playerX = 1400,
          gameSettings.playerY = this.player.y
          this.scene.start("firstMap");
        }
      })
    }

    interazione_sangue(){
      
      if(this.eKey.isDown){
        if(this.player.x<380 && this.player.x>320 && this.player.y<840 && this.player.y>750){
        
          this.sangueTextBox.setVisible(true);
          this.sangueTextBox.start("Una volta erano miei colleghi… ora sono stati tutti massacrati per colpa mia, devo assolutamente evitare di fare la loro fine.",50);
      
      }else
      {
          this.sangueTextBox.setVisible(false);
      }
    }
  
    }
    changeScene1()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        moveplayer = false;
        if(progress==1)
        {
          gameSettings.playerX = 50,
          gameSettings.playerY = this.player.y
          this.scene.start("thirdMap");
        }
      })
    }
    dialogo_npc(){
      if (this.eKey.isDown){
        if(this.player.x>250 && this.player.x<300 && this.player.y <390 && this.player.y>250){
          this.DialogoNpcTextBox.setVisible(true);
          this.DialogoNpcTextBox.start("Kraus: \ndiamine credevo di esser rimasto l’unico umano qui dentro…cosa puoi dirmi su quei ragni e perché tutto quel sangue..? \nSopravvissuto: \nio e il mio collega stavamo cercando di scappare ma Eva-cerbero ci ha trovati, io sono riuscito a nascondermi ma il mio collega è stato completamente massacrato da quel mostro.. sono ormai ore che sono bloccato in questa stanza con quei ragni robot che continuano a ripetere parole a caso. Da quel che so dovrebbero contenere un enigma per uno dei codici per aprire il portellone dell’ultima stanza ma non sono mai stato bravo in questi rompicapo, spero che tu possa riuscirci…",50);
          
        }else if(this.player.x < 500)
        {
          this.DialogoNpcTextBox.setVisible(false);
          this.dialogoNao.setVisible(true)
          this.dialogoNao.start("Kraus: Non credo che ci sarà d’aiuto è completamente scioccato e spaventato, come biasimarlo… NAO: Hai ragione ma sarà meglio pensare a quei ragni proviamo a interagire con loro, quel sopravvissuto ha detto che nascondono una parte del codice. ", 50)
          this.dialogoNao.on("pointerdown", ()=>{
            this.dialogoNao.setVisible(false)
          })
          object.url= "/speak2?messaggio=" + Nao
          sendAJAXRequest(object)
        }
      
      }
  
      
    }
    mostra_bottone(){
      if(this.player.x>250 && this.player.x<300 && this.player.y <390 && this.player.y>250 || this.player.x<380 && this.player.x>320 && this.player.y<840 && this.player.y>750 || this.player.x>=765 && this.player.x <= 897 && this.player.y >= 698 && this.player.y <= 845 || this.player.x>=679 && this.player.x <= 758 && this.player.y >= 690 && this.player.y <= 800 || this.player.x>=506 && this.player.x <= 679 && this.player.y >= 572 && this.player.y <= 694){
        this.interazione.setVisible(true);
        this.interazione.setX(this.player.x);
        this.interazione.setY(this.player.y-60);
      }else{
        this.interazione.setVisible(false);
      }
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
      
      ragnoBlu()
      {

        if(this.eKey.isDown){
          if(this.player.x>=506 && this.player.x <= 679 && this.player.y >= 572 && this.player.y <= 694 ){
            this.ragno_blu.setVisible(true).start("Rosso mente sempre", 50)
            this.ragno_giallo.setVisible(false)
            this.ragno_rosso.setVisible(false)
            ragnoB = 1;

            this.ragno_blu.on("pointerdown", () =>
          {
            this.ragno_blu.setVisible(false)
          })

       }
      }    
    }
    ragnoGiallo()
    {
      if(this.eKey.isDown){

        if(this.player.x>=679 && this.player.x <= 758 && this.player.y >= 690 && this.player.y <= 800 ){
          if(!indovinato)
          {
            this.ragno_giallo.setVisible(true).start("Io dico sempre la verità", 50)
            this.ragno_blu.setVisible(false)
            this.ragno_rosso.setVisible(false)
            ragnoG = 1;
            this.ragno_giallo.on("pointerdown", () =>
          {
            this.ragno_giallo.setVisible(false)
          })
          }
          else
          { 
            /*
              this.ragno_rosso = createTextBox(this, config.width / 2 - 200, 800,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 70,
            title: 'Ragno Rosso',
          }).setVisible(false).start("Blu dice sempre la verità.", 30).setInteractive()
          */
            this.Indovina.setVisible(false)
          this.ragno_giallo = createTextBox(this, config.width / 2 - 200, 600,
          {
            wrapWidth: 200,
            fixedWidth: 300,
            fixedHeight: 200,
            title: 'Ragno giallo',
          }).start("Grazie per avermi creduto e per esserti fidato di me. In cambio, ti do altre 2 lettere per sbloccare la porta: OT", 30).setInteractive()
            //this.ragno_giallo = creasetVisible(true).start("Grazie per avermi creduto e per esserti fidato di me. In cambio, ti do altre 2 lettere per sbloccare la porta: dr", 40)
          }

     }
    }    
  }
  ragnoRosso()
  {
    if(this.eKey.isDown){
      if(this.player.x>=765 && this.player.x <= 897 && this.player.y >= 698 && this.player.y <= 845 ){
        this.ragno_rosso.setVisible(true).start("Blu dice sempre la verità.", 30).setInteractive()
        this.ragno_blu.setVisible(false)
        this.ragno_giallo.setVisible(false)
        ragnoR = 1;
        this.ragno_rosso.on("pointerdown", () =>
      {
        this.ragno_rosso.setVisible(false)
      })
   }
  }    
}

  indovina()
  {
      ragni = ragnoR +ragnoB + ragnoG;
      if(ragni == 3)
      {
        this.Indovina.setVisible(true)
        this.giallo.setVisible(true)
        this.rosso.setVisible(true)
        this.blu.setVisible(true)
      }
  }

  

      update()
      {
        this.interazione_sangue();
        this.mostra_bottone();
        this.dialogo_npc();
        this.ragnoBlu();
        this.ragnoGiallo()
        this.ragnoRosso()
        this.indovina()

        this.movePlayerManager();
      }
  }