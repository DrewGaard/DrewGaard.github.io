class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload()
    {
        this.load.tilemapTiledJSON('map', 'tilemaps/level1.json');
        this.load.spritesheet('objects', 'images/spritesheet_other.png');
        this.load.image('tiles', 'images/tilesheet_complete.png');
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