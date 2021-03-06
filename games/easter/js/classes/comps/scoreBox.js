class ScoreBox extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;

        this.text1 = this.scene.add.text(0,0,"Score: 0",{fontSize:game.config.width/30,align:"center", backgroundColor:'#9ba832'});

        this.text1.setOrigin(0, 0);
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED,this.scoreUpdated,this);
    }
    scoreUpdated()
    {
        this.text1.setText("Score: " + model.score);
    }
}