class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/1/7.png");
    }
    create() {

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);

        this.alignGrid = new AlignGrid({rows:11,cols:11,scene:this});
        //this.alignGrid.showNumbers();

        this.centerX = game.config.width/2;
        this.centerY = game.config.width/2;

        var title = this.add.image(0,0,'title');
        Align.scaleToGameW(title,.8);
        this.alignGrid.placeAtIndex(38,title);

        var btnStart = new FlatButton({scene:this,key:'button1',text:'Play Again!',event:'start_game'});
        this.alignGrid.placeAtIndex(93,btnStart);

        this.bunny = this.physics.add.sprite(this.centerX,this.centerY,'bunny');

            this.anims.create({
                key:'startAnim',
                frames: this.anims.generateFrameNumbers('bunny', {start: 0, end: 9}),
                frameRate: 10,
                repeat: -1
            });

            this.bunny.play("startAnim", true);



        var scoreBtn = new FlatButton({scene:this,key:'button1',text:'Score: ' + model.score});
        this.alignGrid.placeAtIndex(115,scoreBtn);


        emitter.on('start_game',this.startGame,this);
    }
    startGame()
    {
        this.scene.start('SceneMain');
    }
    update() {

    }
}