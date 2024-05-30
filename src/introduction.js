var content =`Benvenuto nel mondo in IRON RIDDLE 
Ti svegli in un laboratorio sconosciuto, la testa ronza e 
la memoria è annebbiata. Sei il Dr. Kraus, uno dei principali sviluppatori di Intelligenza Artificiale. Un giorno, le tue creazioni si sono ribellate e ora ti trovi intrappolato nel tuo stesso laboratorio. 
Non ricordi nulla, nemmeno i codici che ti servono per avanzare.
 Devi esplorare il laboratorio, risolvere enigmi e puzzle per recuperare i pezzi della password che ti permetteranno di avanzare. Ogni passo ti avvicina alla verità, ma anche al pericolo.
Per aiutarti nel tuo viaggio, avrai un assistente vocale di nome 
Aida(Artificial Intelligence Digital Assistant). Aida ti seguirà e ti darà indizi per aiutarti a risolvere gli enigmi e a recuperare la tua memoria.
Il tuo ultimo ostacolo sarà Eva-Cerbero, un robot militare che 
protegge l'uscita. Riuscirai a superarlo e a liberarti dal laboratorio?
Buona fortuna, Dr. Kraus. Il tuo viaggio inizia ora.
`

class introduction extends Phaser.Scene
{
    constructor()
    {
        super("introduction")
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

    create()
    {
        createTextBox(this, config.width / 2 -  300, config.height / 2 -100, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 200,
            title: 'Introduzione'
        })
            .start(content, 40);

        this.continua = this.add.text( config.width / 2 -250, config.height / 2 + 300, "clicca per continuare...",
        {
            fontSize: 40,
        }).setInteractive().setVisible(false)

        this.continua.on("pointerup", () =>{
            this.scene.start("firstMap")
        });

        //hello stabilisce connessione
	

        object.flag = false;
        object.url  = "/speakBenvenuto";
        sendAJAXRequest(object);

    }


    update(time)
    {   
        if(time>5000)
        {
            this.continua.setVisible(true)
        }
    }


    
}