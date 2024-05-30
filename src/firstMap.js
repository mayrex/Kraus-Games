const Text = ""
let direction = ""
let movePlayer = true;
let computerX = 465;
let computerY = 485;
let prompt = document.getElementById("promptComputer");
let invio = document.getElementById("invio");
let question;
let answer;
let mostra_pensiero=0;
let mostra_dialogo_foglietto=0;
let dialogoNao = "Questo computer potrebbe contenere indizi su cio che e successo qui"


var object  = new Object();
object.url  = "/hello";
object.flag = false;


class firstMap extends Phaser.Scene{
    constructor()
    {
        super("firstMap");
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
    
      this.cameras.main.fadeIn(1000)
      movePlayer = true

      const map =  this.make.tilemap({ key: 'map',tileWidth:16,tileHeight:16 });
      const tileset1 = map.addTilesetImage("tilesFloor", "tile1");
      const tileset2 = map.addTilesetImage("tilesStuff", "tile2");
      const tileset3 = map.addTilesetImage("tilesWalls", "tile3");


      let layer = [tileset1, tileset2, tileset3];
   
      const layer1=map.createLayer("Livello tile 1", layer).setScale(3);
      const layer2=map.createLayer("Livello tile 2", layer).setScale(3);
      const layer3=map.createLayer("Livello tile 3", layer).setScale(3);

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

      //this.player=this.physics.add.sprite(520,360,config.spritesheet).setScale(0.7);
 
      //this.player.play("idle_avanti");
      //Setta la posizione dei bounds quando finisci
      this.monitor_destra=this.physics.add.image(1375,647,"bounds").setScale(0.2, 0.5).setInteractive().setImmovable();
      this.monitor_destra.setVisible(false);

      this.ringhiera=this.physics.add.image(290,659,"bounds");
      this.computer = this.physics.add.sprite(453, 476, "computer").setScale(3.6).setInteractive().setImmovable(true);
      this.computer.anims.play("computer", true)
      
      this.eKey = this.input.keyboard.addKey("e");
      this.wKey = this.input.keyboard.addKey("w");
      this.aKey = this.input.keyboard.addKey("a");
      this.sKey = this.input.keyboard.addKey("s");
      this.dKey = this.input.keyboard.addKey("d");

      this.bounds=this.physics.add.image(1450,900,"bounds")
      this.bounds.setScale(0.5, 3.7);
      this.bounds.setVisible(false);
      this.bounds1=this.physics.add.image(0,600,"bounds").setScale(0.2,3.7).setImmovable().setVisible(false).setInteractive();
      this.monitor_destra.setScale(0.2,0.50)
      this.muro_inf_porta=this.physics.add.image(838,310,"bounds").setInteractive().setImmovable().setScale(0.5,0.18).setVisible(false);
      this.muro_sup_porta=this.physics.add.image(838,140,"bounds").setInteractive().setImmovable().setScale(0.5,0.18).setVisible(false);
      this.server_elemento_mappa=this.physics.add.image(1372,267,"bounds").setScale(0.5,0.5).setImmovable().setVisible(false).setInteractive();
      this.ringhiera.setScale(7.19,0.1);
      this.ringhiera.setVisible(false);
      this.foglietto=this.physics.add.image(259,135,"foglietto").setScale(3).setInteractive();
      this.porta_aperta=this.physics.add.image(1176, 410,"porta_aperta").setScale(2.8,3);
      this.porta_chiusa=this.physics.add.image(1176, 410,"porta_chiusa").setScale(2.8,3).setInteractive().setImmovable(true).setVisible(true);
      this.tastierino=this.physics.add.image(1326,410,"bounds").setInteractive().setImmovable().setScale(0.5,0.15).setVisible(false);
      this.nao=this.physics.add.image(300,300,"NAO").setVisible(false).setInteractive().setImmovable().setScale(0.25);
      this.bounds_porta_chiusa=this.physics.add.image(1176,380,"bounds").setImmovable().setInteractive().setScale(5,0.25).setVisible(false);
      this.codice_binario=this.physics.add.image(700,450,"codice_binario").setVisible(false);
      this.player=this.physics.add.sprite(gameSettings.playerX,gameSettings.playerY,"player").setScale(0.95);
      this.testo_interazione=this.add.text(80,44,"interagire",{fill:"black",fontSize:"25px",fontFamily:"Georgia"}).setVisible(true).setScale(1);
      this.interazione=this.add.image(50,50,"E").setScale(1.2).setVisible(false);


      this.dialogo_computer = createTextBox(this, 100, 1000, {
        wrapWidth:1000,
        fixedWidth:1000,
        fixedHeight:90,
        title: "Kraus Osinao"
      }).start("Questo computer… potrebbe contenere indizi su ciò che è successo qui. Hai ragione, vediamo se riesco ad accenderlo").setVisible(false)
      this.dialogo_foglietto=createTextBox(this,100,750,{
        wrapWidth:1000,
        fixedWidth:1000,
        fixedHeight:90,
        title:'pensiero Kraus'
      }).start("Una combinazione di numeri? Potrebbe essere la chiave per qualcosa di importante.(Kraus si interroga sul suo passato): ‘Ho contribuito a creare queste IA… e ora sono intrappolato in questo incubo. Devo trovare assolutamente il modo per scappare",50);
      this.dialogo_foglietto.setVisible(false);
      this.pensiero=createTextBox(this, 100, 750,{
        wrapWidth: 1000,
        fixedWidth: 1000,
        fixedHeight: 90,
        title: 'Kraus:',
      }).start("Tutto è così silenzioso… troppo silenzioso. Devo stare attento, ogni angolo potrebbe nascondere pericoli",100050);
      this.pensiero.setVisible(false);
      this.screen = this.physics.add.sprite(config.width / 2, config.height / 2, "screen").setScale(4).setVisible(false)
      this.vid1 = this.add.video(417, 190, 'computerVideo').setOrigin(0, 0).setScale(0.503, 0.77);
      this.buttonComputer = this.add.image(1123, 750, "buttonComputer").setScale(0.8).setInteractive().setVisible(false)
      this.codiceBinario = this.add.image(738, 470, "code_binario").setScale(1.1, 0.86).setVisible(false)
      this.indizio = this.add.image(900, 400, "indizio" ).setInteractive().setVisible(false).setScale(1.5);
      this.binario = this.add.image(550, 400, "binario" ).setInteractive().setVisible(false).setScale(1.5);
      
      this.physics.add.collider(this.player,this.muro_inf_porta);
      this.physics.add.collider(this.player,this.muro_sup_porta);
      this.physics.add.collider(this.player,layer2);
      this.physics.add.collider(this.player,layer1);
      this.physics.add.collider(this.player,this.ringhiera);
      this.physics.add.collider(this.player,this.monitor_destra);
      this.physics.add.collider(this.player,this.bounds, this.changeScene, null, this);
      this.physics.add.collider(this.player,this.bounds1, this.changeScene1, null, this);
      this.physics.add.collider(this.player,this.bounds_porta_chiusa);
      this.physics.add.collider(this.player,this.server_elemento_mappa);

      this.bounds.setImmovable(true);
      this.ringhiera.setImmovable(true);
      this.monitor_destra.setImmovable(true);
      
      layer2.setCollisionBetween(867,870);
      layer2.setCollisionBetween(750,753);
      //layer2.setCollisionBetween(759,760);
      //layer2.setCollisionBetween(796,797);
      layer2.setCollisionBetween(833,834);
      layer2.setCollisionBetween(518,519);
      //layer2.setCollisionBetween(116,118);
      layer2.setCollisionBetween(794,795);
      layer2.setCollisionBetween(718,718);
      layer2.setCollisionBetween(824,826);
      layer1.setCollisionBetween(213,222);
      layer1.setCollisionBetween(295,310);
      layer1.setCollisionBetween(228,230);
      layer1.setCollisionBetween(201,202);

      let posX = this.screen.x - (this.screen.x/2) + 60;
      let posY = this.screen.y - (this.screen.y/2) -30;
      
      //this.question = this.add.text(0, 0,"ciao").setVisible(false)
      this.questionTextBox = createTextBox(this, posX, posY,
        {
          wrapWidth: 400,
          fixedWidth: 400,
          fixedHeight: 300,
          title: 'Rispondi',
        }).start(".", 50)
      
      this.questionTextBox.setVisible(false);

      posX += 120;  
      posY += 400;
      this.answerTextField = this.add.text(posX , posY, 'Digita qui la risposta') 
	    this.answerTextField.setOrigin(0.5, 0.5)
      this.answerTextField.setVisible(false);

	    this.answerTextField.setInteractive().on('pointerdown', () => {
		      this.rexUI.edit(this.answerTextField)
	    })   
       
      posX += 0;  
      posY += 30;
      this.nuovoIndizioBtn = this.add.text(posX, posY, 'Nuovo indizio', { fill: '#fff', fontSize: 30 });
      this.nuovoIndizioBtn.setInteractive();
      this.nuovoIndizioBtn.on('pointerdown', () => { 
        console.log('pointerdown'); 
        this.questionTextBox.setVisible(true);
        this.questionTextBox.start(indizio,50);
      });

      this.nuovoIndizioBtn.on('pointerdown', () => { 
        console.log('pointerdown'); 
        this.nuovoIndizioBtn.setStyle({ fill: '#ff0'} );
		   /* requestOpenAI("Proponimi un indizio ").then( (data) => {
          data = data.replaceAll("\"", " ")
		      console.log(data);
		      this.questionTextBox.setText(indizio);
		   //Invia al NAO
        
       object.flag = false;
       object.url = "/speak2?messaggio=" + data;
       sendAJAXRequest(object);
		});
    */
      });
      
      this.nuovoIndizioBtn.setVisible(false);
      

  
      this.cursorKeys= this.input.keyboard.createCursorKeys();
      this.player.setInteractive();
      this.bounds.setInteractive()
      this.player.setCollideWorldBounds(true)

      this.ringhiera.setInteractive();
      this.monitor_destra.setInteractive();

      this.physics.add.overlap(this.player, this.bounds, this.changeScene, null, this);

	  /*requestOpenAI("Proponimi un indizio ").then( (data) => {
      console.log(data);
      
		  this.questionTextBox.setText(data);  


	  });
    */

    
    this.dialogo_computer = createTextBox(this, 100, 750, {
      wrapWidth:1000,
      fixedWidth:1000,
      fixedHeight:90,
      title: "Kraus Osinao"
    }).start("Questo computer… potrebbe contenere indizi su ciò che è successo qui. Hai ragione, vediamo se riesco ad accenderlo").setVisible(false)
 ;
        
    const gameplaymusic = this.sound.add('gameplaysound');

    gameplaymusic.play();

	} 

  //TODO: INGRANDISCI BOTTONI COMPUTER
    
    movePlayerManager(movePlayer){
      if(movePlayer===true)
      {
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
      else
      {
        this.player.setVelocity(0);
      }

    }
    changeScene()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        movePlayer = false;
        if(progress===1)
        {
          gameSettings.playerX = 50,
          gameSettings.playerY = this.player.y
          this.scene.start("secondMap");
        }
      })
    } 
    changeScene1()
    {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
        movePlayer = false;
        if(progress===1)
        {
          gameSettings.playerX = 920,
          gameSettings.playerY = 300
          this.scene.start("fourthMap");
        }
      })
    } 
    mostra_foglietto(){
    
      if(this.eKey.isDown){
        if(this.player.x>200  && 300 > this.player.x && this.player.y>120 &&  220>this.player.y ){


          mostra_dialogo_foglietto+=1;
          if(mostra_dialogo_foglietto==1)
          {
            object.url = "/ballo2";
            sendAJAXRequest(object);
            this.dialogo_foglietto.setVisible(true);
            this.dialogo_foglietto.start("Una combinazione di numeri? Potrebbe essere la chiave per qualcosa di importante.(Kraus si interroga sul suo passato): ‘Ho contribuito a creare queste IA… e ora sono intrappolato in questo incubo. Devo trovare assolutamente il modo per scappare",50);
          }
          this.codice_binario.setVisible(true);
      }else if(this.codice_binario.visible==true){
        if(this.eKey.isDown){
          this.dialogo_foglietto.setVisible(false);
          this.codice_binario.setVisible(false);
        }
      }
     }
     else{
      object.flag = false
     }
     }

     bottone_interazione(){
      if(this.player.x>200  && 300 > this.player.x && this.player.y>120 &&  220>this.player.y ||this.player.x>1250 && this.player.x<1340 &&  this.player.y>400 && this.player.y<550 || this.player.y>280 && this.player.x<1340  && this.player.x>1250   && this.player.y<310 || this.player.x > 403 && this.player.y > 476 && this.player.x < computerX  && this.player.y < computerY ){
        this.interazione.setVisible(true);
        this.interazione.setX(this.player.x);
        this.interazione.setY(this.player.y-60);
        this.interazione.setVisible(true);
      }else{
        this.interazione.setVisible(false);
        this.testo_interazione.setVisible(false);
      }
     }
     chiusura_porta(){
      if(this.player.y<280 && this.player.x>1000){
        console.log("domenico gay");
         
          if(mostra_pensiero==1){
            this.pensiero.setVisible(true),
            this.pensiero.start("\nTutto è così silenzioso… troppo silenzioso.\n\n Devo stare attento, ogni angolo potrebbe nascondere pericoli",50);
          }
          mostra_pensiero+=1;
          this.bounds_porta_chiusa.setScale(5,0.25);
          this.bounds_porta_chiusa.setX(1176);
          this.bounds_porta_chiusa.setY(380);
          this.porta_chiusa.setVisible(true);
          this.bounds_porta_chiusa.setVisible(false);
 
       //this.porta_chiusa.setVisible(true);
       
      }else{
        this.pensiero.setVisible(false);
      }

      } 
     apertura_porta(){
      if(this.player.x>1250 && this.player.x<1340 &&  this.player.y>400 && this.player.y<550 || this.player.y>280 && this.player.x<1340  && this.player.x>1250 && this.player.y<310 ){
        if(this.eKey.isDown){
          setTimeout(() => {
            this.porta_chiusa.setVisible(false);
            this.bounds_porta_chiusa.setScale(0.000001,0.000001);
            this.bounds_porta_chiusa.setX(1);
            this.bounds_porta_chiusa.setY(1);
        },1000)
        console.log("cazzo");
       
        }
      }
     }
    
    update()
    { 
      this.bottone_interazione();
      this.mostra_foglietto();
      this.chiusura_porta();
      this.apertura_porta();
      this.movePlayerManager(movePlayer);
      if(this.eKey.isDown)
      {
        if(this.player.x > 403 && this.player.y > 476 && this.player.x < computerX  && this.player.y < computerY)
        {
          this.dialogo_computer.setVisible(true)
          this.dialogo_computer.start("Osinao: Questo computer… potrebbe contenere indizi su ciò che è successo qui. Kraus: Hai ragione, vediamo se riesco ad accenderlo", 50).setInteractive()
          this.dialogo_computer.on("pointerdown", ()=>
        {
          this.dialogo_computer.setVisible(false)
        })
          this.buttonComputer.setVisible(true)
          this.screen.setVisible(true);
          object.url = "/speak2?messaggio=" + dialogoNao;
          sendAJAXRequest(object);

          this.buttonComputer.on('pointerdown', () => { 
            this.indizio.setVisible(true).on('pointerdown', () =>{
              this.indizio.setVisible(false)
              this.questionTextBox.setVisible(true);
              this.nuovoIndizioBtn.setVisible(true);
              this.binario.setVisible(false);

            }); 
            this.binario.setVisible(true).on('pointerdown', () =>
          {
            this.indizio.setVisible(false)
            this.binario.setVisible(false)
            this.codiceBinario.setVisible(true)
          });

            //this.answerTextField.setVisible(true);

          });
        }
        else
        {
          object.flag = false
          this.dialogo_computer.setVisible(false)
          this.questionTextBox.setVisible(false);
          this.answerTextField.setVisible(false);
          this.nuovoIndizioBtn.setVisible(false);
          this.indizio.setVisible(false)
          this.binario.setVisible(false)
          this.buttonComputer.setVisible(false)
          this.codiceBinario.setVisible(false)
          this.screen.setVisible(false); 
        }
  
      }
    }

   
}

async function requestOpenAI(userMessage) {
  //addMessage(userMessage, true);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-proj-tFnrYolEJ2eg4ziVnK3MT3BlbkFJ47esOqMGtTfO6cEfsHIi' // Sostituisci con la tua chiave API OpenAI
      },  
      body: JSON.stringify({
        //errore 429 model: 'gpt-3.5-turbo',
        model: 'gpt-3.5-turbo',
        messages: [{"role": "system", "content": "Sto programmando un gioco con tema gli enigmi. Ora ti passerò il primo enigma: Il protagonista deve cercare nel laboratorio indizi per decifrare un messaggio in codice binario. Gli indizi potrebbero essere nascosti in graffiti sui muri del laboratorio o in vecchi documenti sparsi per il laboratorio. Una volta decifrato, il messaggio potrebbe rivelare la posizione di un pezzo delEnigma o fornire informazioni cruciali sulla storia delle IA. Soluzione: Il messaggio in codice binario viene decifrato utilizzando un libro di codici binario nascosto nel laboratorio. In base a quello che ti ho scritto, ti chiederò di generarmi degli indizi per risolvere l'enigma. In base a quello che ti ho scritto, ti chiederò di generarmi degli indizi per risolvere l'enigma. Nella risposta evita l'uso di apici, apostrofi e virgolette  ", },{"role": "user", "content": userMessage}],
        /*temperature: 0.7*/
      })
    });

    const data = await response.json();
    const responseJson = data.choices[0].message.content;
    return responseJson;  //Resolve Promise

  } catch (error) {
    console.error('Errore durante la richiesta al servizio OpenAI:', error.message);
    //addMessage('Ci dispiace, si è verificato un errore nel server. Per favore, riprova più tardi.', false);
  }
}

function sendAJAXRequest(obj){
			
	if(!obj.flag){
		// Esempio di richiesta AJAX per caricare un file di dati JSON
		var xhr = new XMLHttpRequest();
		xhr.open('GET', obj.url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// Gestisci i dati qui
				var dati = JSON.parse(xhr.responseText);
				console.log("Messaggio JSON ricevuto: "+  dati);
			}
		};
		
		xhr.send();
		obj.flag = true;
		
	}

}