class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        // this.load.image("road", "images/road.jpg");
        // this.load.image("line", "images/line.png");
        // this.load.image("pcar1", "images/pcar1.png");
        // this.load.image("pcar2", "images/pcar2.png");
        // this.load.image("cone", "images/cone.png");
        // this.load.image("barrier", "images/barrier.png");

        // this.load.image("button1", "images/ui/buttons/1/1.png");
        this.load.tilemapTiledJSON('map', 'tilemaps/level1.json');
        this.load.spritesheet('objects', 'images/spritesheet_other.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('tiles', 'images/tilesheet_complete.png');
        this.load.image('spike', 'images/spike.png');
        this.load.spritesheet('skeletonwalk', 'images/skeletonwalk.png', {frameWidth: 214, frameHeight: 364});
    
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        var mediaManager = new MediaManager({scene:this});

        //var sb = new SoundButtons({scene:this});

        const map = this.make.tilemap({ key: 'map' });

        const tileset = map.addTilesetImage('simple_platformer', 'tiles');

        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);

        platforms.setCollisionByExclusion(-1,true);

        this.player = this.physics.add.sprite(60, 360, 'skeletonwalk'); //372
        
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(platforms, this.player);



        Align.scaleToGameW(this.player,.125);

        this.anims.create({
            key: 'walkright',
            frames: this.anims.generateFrameNames('skeletonwalk', {
                start: 0, end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walkleft',
            frames: this.anims.generateFrameNames('skeletonwalk', {
                start: 3, end: 0,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'skeletonwalk', frame: 0}],
            frameRate: 10
        });

        this.cursor = this.input.keyboard.createCursorKeys();

        this.player.setGravityY(200);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        const spikeObjects = map.getObjectLayer('Spikes')['objects'];

        spikeObjects.forEach(spikeObject => {
            const spike = this.spikes.create(spikeObject.x, spikeObject.y + 200 - spikeObject.height, 'spike').setOrigin(0,0);
            spike.body.setSize(spike.width, spike.height - 20).setOffset(0, 30);
        });

        this.physics.add.collider(this.player, this.spikes, this.playerHit, null, this);
    }
    playerHit()
    {
        this.player.setVelocity(0,0);
        this.player.setX(60);
        this.player.setY(360);
        this.player.setAlpha(0);
        let tw = this.tweens.add({
            targets: this.player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }
    buttonPressed(params)
    {
        console.log(params);
        this.scene.start("SceneOver");
    }
    update() {
        if(this.cursor.left.isDown)
        {
            this.player.anims.play("walkleft", true);
            this.player.setVelocityX(-160);
        }
        else if(this.cursor.right.isDown)
        {
            this.player.anims.play("walkright", true);
            this.player.setVelocityX(160);
        }
        else
        {
            this.player.anims.play("idle", true);
            this.player.setVelocityX(0);
        }

        if(this.cursor.space.isDown && this.player.body.onFloor()) //&& this.player.body.onFloor()
        {
            this.player.setVelocityY(-250);
        }

        if(this.player.body.velocity.x > 0)
        {
            this.player.setFlipX(true);
        } 
        else if (this.player.body.velocity.x < 0)
        {
            this.player.setFlipX(false);
        }

    }
}