class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("title", "images/title.png");
        this.load.image("button1", "images/ui/buttons/1/7.png");
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);

        this.centerX = game.config.width/2;
        this.centerY = game.config.width/2;

        var randImage = Math.floor(Math.random() * Math.floor(2));

        console.log(randImage);

        if(randImage == 0)
        {
            this.bunny = this.physics.add.sprite(this.centerX,this.centerY,'bunny');

            this.anims.create({
                key:'startAnim',
                frames: this.anims.generateFrameNumbers('bunny', {start: 0, end: 9}),
                frameRate: 10,
                repeat: -1
            });

            this.bunny.play("startAnim", true);
        }
        else if(randImage == 1)
        {
            this.farmer = this.physics.add.sprite(this.centerX,this.centerY,'farmer');

            this.anims.create({
                key:'walkingFarmer',
                frames: this.anims.generateFrameNumbers('farmer', {start: 0, end: 12}),
                frameRate: 10,
                repeat: -1
            });

            this.farmer.play("walkingFarmer", true);

        }



        this.alignGrid = new AlignGrid({rows:15,cols:11,scene:this});
        //this.alignGrid.showNumbers();

        var title = this.add.image(0,0,'title');
        Align.scaleToGameW(title,.9);
        this.alignGrid.placeAtIndex(38,title);

        var btnStart = new FlatButton({scene:this,key:'button1',text:'start',event:'start_game'});
        this.alignGrid.placeAtIndex(93,btnStart);

        this.instructionsText = this.add.text(1,1,"Use the arrow keys to hop around the map.\nYou have two minutes to collect the eggs.\nOnly collect the egg color listed at the top of the screen.\nWatch out for the farmer.\nHe will steal your eggs.\nEat carrots to boost your speed.",{fontSize:game.config.width/38, backgroundColor:'#3459eb'});

        this.alignGrid.placeAtIndex(110,this.instructionsText);


        emitter.on('start_game',this.startGame,this);

    }
    startGame()
    {
        this.scene.start('SceneMain');
    }
    update() {

    }
}