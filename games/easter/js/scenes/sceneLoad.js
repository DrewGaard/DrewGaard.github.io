class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload()
    {
        this.load.image("toggleBack", "images/ui/toggles/3.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");

        this.load.image("background", "images/background.png");
        this.load.image("bush", "images/bush.png");
        this.load.image("carrot", "images/carrot.png");



        this.load.spritesheet("bunny", "images/bunny.png",{frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("farmer", "images/farmer.png",{frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("eggs", "images/eggs.png",{frameWidth: 64, frameHeight: 64});

    }
    onProgress(value)
    {
        console.log(value);
        this.bar.setPercent(value);
        var per = Math.floor(value*100);
        this.progText.setText(per+"%");
    }
    create()
    {
        this.scene.start("SceneTitle");
    }
}