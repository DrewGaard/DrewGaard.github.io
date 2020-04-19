class SoundButtons extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;
        var musicButton = new ToggleButton({scene:this.scene,backKey:'toggleBack',onIcon:'musicOn',offIcon:'musicOff',event:G.TOGGLE_MUSIC});
        var sfxButton = new ToggleButton({scene:this.scene,backKey:'toggleBack',onIcon:'sfxOn',offIcon:'sfxOff',event:G.TOGGLE_SOUND});

        console.log(musicButton);

        musicButton.y = musicButton.height/2;
        musicButton.x = musicButton.width/2;

        sfxButton.x = game.config.width - sfxButton.width/2;
        sfxButton.y = musicButton.y;

        sfxButton.setScrollFactor(0);
        musicButton.setScrollFactor(0);

        if (model.musicOn == false)
        {
            this.musicButton.toggle();
        }
        if (model.soundOn == false)
        {
            this.sfxButton.toggle();
        }

        this.scene.add.existing(this);
    }
}