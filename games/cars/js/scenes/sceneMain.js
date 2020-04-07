class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.road = new Road({scene:this});
        this.road.x = this.game.config.width/2;

        
        model.gameOver = false;

        model.speed = 1;
        model.score = 0;
        console.log(model.score);

        this.road.makeLines();

        var gridConfig = {rows:5,cols:5,scene:this};
        this.alignGrid = new AlignGrid(gridConfig);
        //this.alignGrid.showNumbers();

        //this.alignGrid.placeAtIndex(4,this.sb);

        var sb = new SoundButtons({scene:this});

        emitter.on('button_pressed',this.buttonPressed,this);


        this.sb = new ScoreBox({scene:this});
        this.sb.x = game.config.width/2;
        this.sb.y = 50;
        emitter.on(G.SCORE_UPDATED,this.scoreUpdated,this);
    }
    scoreUpdated()
    {
        if(model.score/5==Math.floor(model.score/5))
        {
            model.speed+=.25;
            if(model.speed>1.5)
            {
                model.speed = 1.5;
            }
        }
    }
    buttonPressed(params)
    {
        console.log(params);
        emitter.emit(G.PLAY_SOUND, 'cat');
        this.scene.start("SceneOver");
    }
    update() {
        this.road.moveLines();
        this.road.moveObject();
    }
}