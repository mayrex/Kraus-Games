class menu extends Phaser.Scene
{
    constructor()
    {   
        super("menu")
    }


    create()
    {
        this.music = this.sound.add("menu");
        this.music.play();
        this.background = this.add.image(730, 490, "menuBackground").setScale(0.93, 1.088)
    
        this.gioca = this.add.image(config.width/2,config.height/2 + 150,"gioca").setScale(2).setInteractive()
        this.indietro = this.add.image(config.width/2,config.height/2 + 410, "indietro").setScale(2).setInteractive().setVisible(false)
        this.comandi = this.add.image(config.width/2,config.height/2 + 280,"comandi").setScale(2).setInteractive()
        this.riconoscimenti = this.add.image(config.width/2,config.height/2 + 410,"riconoscimenti").setScale(2).setInteractive()
        this.riconoscimentiTesto = this.add.image(config.width / 2, 500, "riconoscimentiTesto").setVisible(false)
        this.comandiTesto = this.add.image(config.width / 2, 500, "comandiTesto").setVisible(false)
        const button = this.add.image(config.width - 100, 50, "fullScreenBUTTON").setScale(0.2).setInteractive(); 
        sendAJAXRequest(object);

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
        this.gioca.on("pointerdown", ()=>
        {
            this.scene.start("introduction")
            this.music.stop();
        })
        this.comandi.on("pointerdown", () =>{
            this.comandiTesto.setVisible(true);
            this.riconoscimenti.setVisible(false)
            this.indietro.setVisible(true)
            this.indietro.on("pointerdown", () =>{
                this.comandiTesto.setVisible(false);
                this.riconoscimenti.setVisible(true)
                this.indietro.setVisible(false)
            })
        })

        this.riconoscimenti.on("pointerdown", () =>{
            this.riconoscimentiTesto.setVisible(true);
            this.riconoscimenti.setVisible(false)
            this.indietro.setVisible(true)
            this.indietro.on("pointerdown", () =>{
                this.riconoscimentiTesto.setVisible(false);
                this.riconoscimenti.setVisible(true)
                this.indietro.setVisible(false)
            })
        })
       

        
    }
}