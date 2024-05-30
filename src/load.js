var indizio = "Prova ad interagire con gli elementi nel laboratorio. Potresti trovare la soluzione in foglietti nascosti..."

var object  = new Object();
object.url  = "/hello";
object.flag = false;
class load extends Phaser.Scene{
    constructor()
    {
        super("bootGame");
        }
    
    preload()
    {
        this.load.image("rosso", "assets/map/rosso.jpeg")
        this.load.image("giallo", "assets/map/giallo.jpeg")
        this.load.image("blu", "assets/map/blu.jpg")

        this.load.image("binario", "assets/map/binario.png")
        this.load.image("indizio", "assets/map/indizio.png")
        this.load.image("gioca", "assets/buttons/gioca.png")
        this.load.image("riconoscimenti", "assets/buttons/riconoscimenti.png")
        this.load.image("comandi", "assets/buttons/comandi.png")
        this.load.image("riconoscimentiTesto", "assets/menu/riconoscimentiTesti.png")
        this.load.image("comandiTesto", "assets/menu/comandiTesto.png")
        this.load.image("indietro", "assets/buttons/indietro.png")
        this.load.image("buttonComputer", "assets/buttons/power.png")
        this.load.video("computerVideo", "assets/map/computer.mp4", true)
        this.load.image("screen", "assets/map/screen.png")
        this.load.image("foglietto","assets/foglietto1.png");
        this.load.image("libroarancione","assets/map/libroarancione.png");
        this.load.image("libroverde","assets/map/libroverde.png");
        this.load.image("E","assets/buttons/tastointerazione2.png");
        this.load.image("librofucsia","assets/map/librofucsia.png");
        this.load.image("porta_blu_aperta","assets/map/porta5.png",{
            frameWidth:88,
            frameHeight:46
        });
        this.load.image("porta_blu_chiusa","assets/map/porta4.png",{
            frameWidth:88,
            frameHeight:46
        }
    );
        this.load.image("porta_aperta","assets/map/porta3.png",{
            frameWidth:88,
            frameHeight:46
        })
        this.load.image("porta_chiusa","assets/map/porta1.png",{
            frameWidth:88,
            frameHeight:46
        })
        this.load.image("codice_binario","assets/enigmi/codice_binario.png",{
            frameWidth:455,
            frameHeight:549
        });
        this.load.image("fullScreenBUTTON", "assets/buttons/fullscreen.png");
        this.load.image("tile1", "Assets/map/tilesFloor.png");
        this.load.image("menuBackground", "assets/menu/background.jpg")

        this.load.audio('menu', 'assets/audio/menu.mp3', {
            repeat: 0
        });
        this.load.audio('gameplaysound', 'assets/audio/gameplaysound.mp3', {
            repeat: 0
        });
        this.load.image("NAO","assets/map/NAO1.png");
        this.load.image("schermo_tastierino","assets/map/screen_tastierino.png");
        this.load.image("tile2", "assets/map/tilesStuff.png");
        this.load.image("tile3", "assets/map/tilesWalls.png");
        this.load.image("tile4","assets/map/neko.png");
        this.load.image("tile5","assets/map/TileSet_v1.0.png");
        this.load.image("spider", "assets/map/Spider.png")
        this.load.image("ragni", "assets/map/ragni.png");
        this.load.image("giblet", "assets/map/giblet_variations.png");
        this.load.image("labNpc", "assets/map/LabNPCs_1.png");
        this.load.image("code_binario", "assets/map/codiceBinario.jpg");
        this.load.tilemapTiledJSON("map2", "assets/map/mappa2.tmj");
        this.load.tilemapTiledJSON("map3", "assets/map/mappa3.tmj");
        this.load.tilemapTiledJSON("map4", "assets/map/mappa4.tmj");
        this.load.tilemapTiledJSON("map5", "assets/map/mappa5.tmj");
        this.load.tilemapTiledJSON('map', "assets/map/mappa_laboratorio.tmj");
        this.load.image("freccia_giù","assets/map/freccia_giù.png");
        this.load.image("bounds","assets/collisioni/bounds3.jpg",{
            frameWidth:16,
            frameHeight:16
        });

        this.load.spritesheet("player", "assets/personaggio/spriteshee.png", 
    {
        frameWidth: 70,
        frameHeight: 93 
    })

    

    this.load.spritesheet("computer", "assets/map/computer_spritesheet.png",{

        frameWidth: 16,
        frameHeight: 16
    });
        
    this.load.on("progress", (percent)=>{
        console.log(percent);
    })
    this.load.on("complete", () =>
{
    this.scene.start("menu")
})
    
    }
    create()
    {
        this.anims.create({
            key: "computer",
            frames: this.anims.generateFrameNumbers("computer"),
            frameRate: 3,
            repeat: -1

        })
        this.anims.create({
            key: "idle_avanti",
            frames: this.anims.generateFrameNumbers("player", {frames : [1]}),
            frameRate: 4,
            repeat: 0
        })
        this.anims.create({
            key: "idle_dietro",
            frames: this.anims.generateFrameNumbers("player", {frames : [2]}),
            frameRate: 8,
            repeat: 0
        })
        this.anims.create({
            key: "idle_sinistra",
            frames: this.anims.generateFrameNumbers("player", {frames : [5]}),
            frameRate: 8,
            repeat: 0
        })
        this.anims.create({
            key: "idle_destra",
            frames: this.anims.generateFrameNumbers("player", {frames : [7]}),
            frameRate: 8,
            repeat: 0
        })
        this.anims.create({
            key: "mov_avanti",
            frames: this.anims.generateFrameNumbers("player", {frames : [8, 9, 10, 11]}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "mov_destra",
            frames: this.anims.generateFrameNumbers("player", {frames : [12, 13, 14, 15]}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "mov_dietro",
            frames: this.anims.generateFrameNumbers("player", {frames : [16, 17, 18, 19]}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "mov_sinistra",
            frames: this.anims.generateFrameNumbers("player", {frames : [23, 22, 21, 20]}),
            frameRate: 8,
            repeat: -1
        })        
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
          model: 'gpt-3.5-turbo',
          messages: [{"role": "system", "content": "Sto programmando un gioco con tema gli enigmi. Ora ti passerò il primo enigma: Il protagonista deve cercare nel laboratorio indizi per decifrare un messaggio in codice binario. Gli indizi potrebbero essere nascosti in graffiti sui muri del laboratorio o in vecchi documenti sparsi per il laboratorio. Una volta decifrato, il messaggio potrebbe rivelare la posizione di un pezzo delEnigma o fornire informazioni cruciali sulla storia delle IA. Soluzione: Il messaggio in codice binario viene decifrato utilizzando un libro di codici binario nascosto nel laboratorio. In base a quello che ti ho scritto, ti chiederò di generarmi degli indizi per risolvere l'enigma."},{"role": "user", "content": userMessage}],
          //temperature: 0.7
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