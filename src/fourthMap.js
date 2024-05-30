
class fourthMap extends Phaser.Scene
{
    constructor(){
        super("fourthMap");
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

        this.cameras.main.fadeIn(1000);
        const map4=this.make.tilemap({key:'map4',tileWidth:16,tileHeight:16});
        const tilesFloor = map4.addTilesetImage("tilesFloor", "tile1");
        const tilesStuff = map4.addTilesetImage("tilesStuff", "tile2");
        const tilesWalls = map4.addTilesetImage("tilesWalls", "tile3");
        const giblet = map4.addTilesetImage("giblet_variations","giblet");
        const libreria =map4.addTilesetImage("TileSet v1.0","tile5");

        let tiles1 =[tilesFloor,tilesWalls];
        let tiles2 =[tilesStuff,libreria,giblet];
        let tiles3 =[tilesStuff];

        const layer1 = map4.createLayer("Livello tile 1", tiles1).setScale(3);
        const layer2 = map4.createLayer("Livello tile 2", tiles2).setScale(3);
        const layer3 = map4.createLayer("Livello tile 3", tiles3).setScale(3);
        
        this.eKey = this.input.keyboard.addKey("e");
        //this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95);
        this.librofucsia=this.physics.add.image(104,122,"librofucsia").setScale(1.1,1.05).setImmovable().setVisible(true).setInteractive();
        this.libroverde=this.physics.add.image(218,161,"libroverde").setScale(1.5,1.1).setImmovable().setVisible(true).setInteractive();
        this.libroarancione=this.physics.add.image(327,119,"libroarancione").setScale(1.5,1.1).setImmovable().setVisible(true).setInteractive();
        this.libreria=this.physics.add.image(240,112,"bounds").setScale(6.8,0.05).setImmovable().setVisible(false).setInteractive();
        this.tavolo=this.physics.add.image(114,279,"bounds").setScale(0.69,0.33).setImmovable().setVisible(false).setInteractive();
        
        this.muro_sinistro=this.physics.add.image(25,200,"bounds").setScale(0.3,2).setImmovable().setVisible(false).setInteractive();
        this.muro_destro=this.physics.add.image(979,200,"bounds").setScale(0.3,2).setImmovable().setVisible(false).setInteractive();
        this.muro_sotto=this.physics.add.image(500,458,"bounds").setScale(23,0.2).setImmovable().setVisible(false).setInteractive();
        this.muro_sopra=this.physics.add.image(500,62,"bounds").setScale(23,0.1).setImmovable().setVisible(false).setInteractive();
        this.scaffale1=this.physics.add.image(480,75,"bounds").setScale(1.7,0.1).setImmovable().setVisible(false).setInteractive();
        this.scaffale2=this.physics.add.image(792,75,"bounds").setScale(2.95,0.1).setImmovable().setVisible(false).setInteractive();
        this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95);

        this.physics.add.collider(this.player,this.scaffale2);
        this.physics.add.collider(this.player,this.scaffale1);
        this.physics.add.collider(this.player,this.muro_sopra);
        this.physics.add.collider(this.player,this.muro_sinistro);
        this.physics.add.collider(this.player,this.muro_destro, this.changeScene, null, this);
        this.physics.add.collider(this.player,this.muro_sotto);
        this.physics.add.collider(this.player,this.tavolo);
        this.physics.add.collider(this.player,this.libreria);
        
        this.physics.add.overlap(this.player, this.muro_destro, this.changeScene, null, this);

        this.LibrofucsiaTextBox = createTextBox(this, 0, 600,
          {
            wrapWidth: 1000,
            fixedWidth: 1000,
            fixedHeight: 190,
            title: 'Il genio di Pisa: Fibonacci'
          }).start(" Fibonacci, nato a Pisa intorno al 1170, ha rivoluzionato la matematica europea con il suo libro 'Liber Abaci', che introdusse i numeri arabi e il sistema decimale. Grazie ai suoi viaggi commerciali, ha ampliato le sue conoscenze e ha contribuito alla diffusione dei numeri indiani in Europa. La sua sequenza di numeri, chiamata sequenza di Fibonacci, è ancora oggi fondamentale in molti ambiti della scienza e della natura. La sua eredità include anche importanti contributi alla geometria, all'algebra e all'aritmetica.La sequenza di Fibonacci è una serie di numeri in cui ogni numero è la somma dei due numeri precedenti. Inizia con 0 e 1, e procede indefinitamente come segue: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... Quindi, ogni numero successivo è ottenuto sommando i due numeri precedenti. Ad esempio: 1 + 1 = 2,1 + 2 = 3,    2 + 3 = 5,  3 + 5 = 8, e così via.", 1000050)
        this.cursorKeys= this.input.keyboard.createCursorKeys();
        this.LibroarancioneTextBox = createTextBox(this, 0, 600,
          {
            wrapWidth: 1000,
            fixedWidth: 1000,
            fixedHeight: 190,
            title: 'PLUTO',
          }).start("Qualcuno (o qualcosa) sta eliminando i sette robot più forti del pianeta; quelli che potrebbero trasformarsi in armi di distruzione di massa. Nell'epoca in cui è ambientata la storia i robot possono avere un aspetto umanoide; essi pensano in termini umani e coltivano le stesse aspettative di vita. Sono in grado di simulare la maggior parte delle attività umane di tutti i giorni come il mangiare e il bere; sentono l'esigenza di sposarsi, di adottare bambini robot per soddisfare gli impulsi genitoriali; di avere una famiglia. Si pongono domande etiche, fanno sogni, rispettano l'ambiente. Inoltre, leggi recenti tutelano i diritti dei cittadini meccanici, cosa che non tutti approvano", 1000050)
        this.cursorKeys= this.input.keyboard.createCursorKeys();
        this.LibroverdeTextBox = createTextBox(this, 0,600,
          {
            wrapWidth: 1000,
            fixedWidth: 1000,
            fixedHeight: 190,
            title: 'La Divina Armonia: Alla Scoperta della Sezione Aurea',
          }).start("La sezione aurea, nota anche come proporzione aurea, rapporto aureo o divina proporzione, è un concetto matematico e estetico che ha affascinato artisti, architetti, matematici e filosofi per secoli. Si basa su un rapporto speciale tra due parti, in cui la proporzione della somma delle due parti rispetto alla parte più grande è uguale alla proporzione della parte più grande rispetto alla parte più piccola. Questo rapporto è approssimativamente di 1,6180339887 e viene spesso rappresentato dalla lettera greca φ (phi). È stato scoperto e studiato fin dall'antichità, con riferimenti a questa proporzione che risalgono a civilizzazioni come gli antichi Greci e gli Egizi   In sintesi, la sezione aurea è un concetto matematico ed estetico che esprime un rapporto armonioso e bilanciato tra le parti, ed è stata ampiamente utilizzata nell'arte, nell'architettura e nell'interpretazione della natura. La sua presenza è associata a una percezione di bellezza e armonia.  ", 1000050);
          
          
          const button = this.add.image(900, 50, "fullScreenBUTTON").setScale(0.2).setInteractive(); 
          this.interazione=this.add.image(50,50,"E").setScale(1.2).setVisible(false);
          this.testo_interazione=this.add.text(80,44,"interagire",{fill:"black",fontSize:"25px",fontFamily:"Georgia"}).setVisible(true).setScale(1);
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
        this.cursorKeys= this.input.keyboard.createCursorKeys();

        this.LibroarancioneTextBox.setVisible(false);
        this.LibrofucsiaTextBox.setVisible(false);
        this.LibroverdeTextBox.setVisible(false);
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
      esamina_libro_verde(){
        if(this.eKey.isDown){
          if(this.player.x>205 && this.player.x<245 && this.player.y>140 && this.player.y<200){
            this.LibroverdeTextBox.setVisible(true);
            this.LibroverdeTextBox.start("La sezione aurea, nota anche come proporzione aurea, rapporto aureo o divina proporzione, è un concetto matematico e estetico che ha affascinato artisti, architetti, matematici e filosofi per secoli. Si basa su un rapporto speciale tra due parti, in cui la proporzione della somma delle due parti rispetto alla parte più grande è uguale alla proporzione della parte più grande rispetto alla parte più piccola. Questo rapporto è approssimativamente di 1,6180339887 e viene spesso rappresentato dalla lettera greca φ (phi). È stato scoperto e studiato fin dall'antichità, con riferimenti a questa proporzione che risalgono a civilizzazioni come gli antichi Greci e gli Egizi   In sintesi, la sezione aurea è un concetto matematico ed estetico che esprime un rapporto armonioso e bilanciato tra le parti, ed è stata ampiamente utilizzata nell'arte, nell'architettura e nell'interpretazione della natura. La sua presenza è associata a una percezione di bellezza e armonia. ",50);
          }else{
            this.LibroverdeTextBox.setVisible(false);
          }
        }
      }
      bottone_interazione(){
        if(this.player.x>205 && this.player.x<245 && this.player.y>140 && this.player.y<200 ||this.player.x>100 && this.player.x<130 && this.player.y>115 && this.player.y<200 ||this.player.x>315 && this.player.x<340 && this.player.y>110 && this.player.y<200){
          this.interazione.setVisible(true);
          this.interazione.setX(this.player.x);
          this.interazione.setY(this.player.y-60);
          console.log("il cazzone negro");
        }else{
          this.interazione.setVisible(false);
          this.testo_interazione.setVisible(false);
        }
      }
      
      esamina_libro_fucsia(){
        if(this.eKey.isDown){
          if(this.player.x>100 && this.player.x<130 && this.player.y>115 && this.player.y<200 ){
                this.LibrofucsiaTextBox.setVisible(true);
                this.LibrofucsiaTextBox.start("Fibonacci, nato a Pisa intorno al 1170, ha rivoluzionato la matematica europea con il suo libro 'Liber Abaci', che introdusse i numeri arabi e il sistema decimale. Grazie ai suoi viaggi commerciali, ha ampliato le sue conoscenze e ha contribuito alla diffusione dei numeri indiani in Europa. La sua sequenza di numeri, chiamata sequenza di Fibonacci, è ancora oggi fondamentale in molti ambiti della scienza e della natura. La sua eredità include anche importanti contributi alla geometria, all'algebra e all'aritmetica.La sequenza di Fibonacci è una serie di numeri in cui ogni numero è la somma dei due numeri precedenti. Inizia con 0 e 1, e procede indefinitamente come segue: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... Quindi, ogni numero successivo è ottenuto sommando i due numeri precedenti. Ad esempio: 1 + 1 = 2,1 + 2 = 3,    2 + 3 = 5,  3 + 5 = 8, e così via",50);
          }else{
                this.LibrofucsiaTextBox.setVisible(false);
          }
        }
      }
      esamina_libro_arancione(){
        if(this.eKey.isDown){
          
          if(this.player.x>315 && this.player.x<340 && this.player.y>110 && this.player.y<200){
              console.log("il cazzone negro");
              this.LibroarancioneTextBox.setVisible(true)
              this.LibroarancioneTextBox.start("Qualcuno (o qualcosa) sta eliminando i sette robot più forti del pianeta; quelli che potrebbero trasformarsi in armi di distruzione di massa. Nell'epoca in cui è ambientata la storia i robot possono avere un aspetto umanoide; essi pensano in termini umani e coltivano le stesse aspettative di vita. Sono in grado di simulare la maggior parte delle attività umane di tutti i giorni come il mangiare e il bere; sentono l'esigenza di sposarsi, di adottare bambini robot per soddisfare gli impulsi genitoriali; di avere una famiglia. Si pongono domande etiche, fanno sogni, rispettano l'ambiente. Inoltre, leggi recenti tutelano i diritti dei cittadini meccanici, cosa che non tutti approvano ",50);
          }else{
              this.LibroarancioneTextBox.setVisible(false);
          }
        }
      }
      
    
      changeScene()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        movePlayer = false;
        if(progress===1)
        {
          gameSettings.playerX = 50,
          gameSettings.playerY = this.player.y+400
          this.scene.start("firstMap");
        }
      })
    } 
                                                         
      update()
      {
        this.bottone_interazione();
        this.esamina_libro_arancione();
        this.esamina_libro_fucsia();
        this.esamina_libro_verde();
        this.movePlayerManager();
      }
}