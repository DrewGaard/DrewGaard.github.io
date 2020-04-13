var timeInSec;
var curEggColor;
var squaresTaken = [0,1,2,3,4,5,6,7,8,9,10,60,62,63];
var bunnySpeed = 200;
var farmerSpeed = 75;
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

        model.gameOver = false;

        //var mediaManager = new MediaManager({scene:this});

        //var sb = new SoundButtons({scene:this});

        this.centerX = game.config.width/2;
        this.centerY = game.config.width/2;

        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);

        this.uiGrid = new AlignGrid({scene:this,rows:15,cols:11});

        var scoreBox = new ScoreBox({scene:this});

        this.bunny = this.physics.add.sprite(this.centerX,this.centerY,'bunny');

        this.farmer = this.physics.add.sprite(this.centerX + 100,this.centerY,'farmer');


        this.bushGroup = this.physics.add.group();

        this.eggGroup = this.physics.add.group();

        this.carrotsGroup = this.physics.add.group();
        

        this.makeObjects();

        this.eggColorText = this.add.text(0,0,"",{fontSize:game.config.width/30,align:"center", backgroundColor: '#9ba832'});
        this.timerText = this.add.text(1,1,"Time: 120",{fontSize:game.config.width/30,align:"center", backgroundColor:'#9ba832'});

        this.uiGrid.placeAtIndex(3,this.eggColorText);
        this.uiGrid.placeAtIndex(0,this.timerText);
        this.uiGrid.placeAtIndex(8,scoreBox);

        //this.uiGrid.showNumbers();

        this.currentEggColor;

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('bunny', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkingFarmer',
            frames: this.anims.generateFrameNumbers('farmer', {start: 0, end: 12}),
            frameRate: 10,
            repeat: -1
        });


        this.bunny.body.collideWorldBounds = true;
        Align.scaleToGameW(this.bunny,.07)

        this.farmer.body.collideWorldBounds = true;
        Align.scaleToGameW(this.farmer,.07)

        this.timeInSec = 120;

        this.timer = this.time.addEvent({delay:1000,callback: this.tick, callbackScope: this, repeat: this.timeInSec});

        this.physics.add.collider(this.eggGroup,this.bunny,this.eggHitBunny,null,this);
        this.physics.add.collider(this.carrotsGroup,this.bunny,this.carrotHitBunny,null,this);
        this.physics.add.collider(this.bushGroup,this.bunny,this.bushHitBunny,null,this);
        this.physics.add.collider(this.bushGroup,this.farmer,this.bushHitFarmer,null,this);
        this.physics.add.collider(this.carrotsGroup,this.farmer,this.carrotHitFarmer,null,this);
        this.physics.add.overlap(this.farmer,this.bunny,this.farmerHitBunny,null,this);



        //console.log(squaresTaken);
        this.pickEggColor();
        //console.log(this.bushGroup);

        this.farmer.play('walkingFarmer', true);


    }
    farmerHitBunny(farmer, bunny)
    {
        if(model.score > 0)
            {
                emitter.emit(G.UP_POINTS,-1);
            }
    }
    makeObjects()
    {
        this.makeBushes();
        this.makeCarrots();
        this.makeEggs();
    }
    
    pickEggColor()
    {
            var eggColor = Math.floor(Math.random() * Math.floor(3));
            curEggColor = eggColor;
            if(eggColor == 0)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Green")
                //console.log(eggColor);
            }
            else if(eggColor == 1)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Yellow")
                //console.log(eggColor);
            }
            else if(eggColor == 2)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Blue")
                //console.log(eggColor);
            }
            else if(eggColor == 3)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Pink")
                //console.log(eggColor);
            }
    }
    tick()
    {   
        this.timeInSec -= 1;
        //console.log(timeInSec);
        var timeString = "" + this.timeInSec;
        //console.log(" " + timeString);
        this.timerText.setText("Time: " + timeString); 

        if(this.timeInSec == 0)
        {
            this.timer.remove();
            model.gameOver = true;
            // timer.remove();
            //this.time.addEvent({delay:2000,callback: this.goGameOver, callbackScope: this.scene, loop: false});
            //Go to game over screen
        }
        else if((this.timeInSec % 15) == 0) //Getting the egg color needs to be its own function
        {
            var eggColor = Math.floor(Math.random() * Math.floor(3));
            curEggColor = eggColor;
            //console.log(curEggColor);
            if(eggColor == 0)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Green")
                //console.log(eggColor);
            }
            else if(eggColor == 1)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Yellow")
                //console.log(eggColor);
            }
            else if(eggColor == 2)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Blue")
                //console.log(eggColor);
            }
            else if(eggColor == 3)
            {
                //this.eggColorText.setText("Egg Color: Green");
                this.eggColorText.setText("Egg Color: Pink")
                //console.log(eggColor);
            }
        }

    }
    makeBushes()
    {
        if(this.bushGroup.getChildren().length == 0)
        {
            this.bushGroup = this.physics.add.group({
                key: 'bush',
                frame: [0],
                frameQuantity: 40,
                angularVelocity: 0,
                collideWorldBounds: true,
                immovable: true
            });
    
            this.bushGroup.children.iterate(function(child){
                var randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;

                while(squaresTaken.includes(randSquare))
                {
                    randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1; 
                    if(!squaresTaken.includes(randSquare))
                    {
                        break;
                    }
                }
                squaresTaken.push(randSquare);
                squaresTaken.push(randSquare+1);
                squaresTaken.push(randSquare-1);
                squaresTaken.push(randSquare+11);
                squaresTaken.push(randSquare-11);
                child.body.setSize(100,50,50,25);
                child.angle = 0;
                //console.log(randSquare);
                Align.scaleToGameW(child,.1);
                this.uiGrid.placeAtIndex(randSquare,child);
            }.bind(this));
        }
    }
    makeCarrots()
    {
        if(this.carrotsGroup.getChildren().length == 0)
        {
            this.carrotsGroup = this.physics.add.group({
                key: 'carrot',
                frame: [0],
                frameQuantity: 10,
                collideWorldBounds: true
            });
    
            this.carrotsGroup.children.iterate(function(child){
                var randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;

                while(squaresTaken.includes(randSquare))
                {
                    randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1; 
                    if(!squaresTaken.includes(randSquare))
                    {
                        break;
                    }  
                }
                squaresTaken.push(randSquare);
                child.squareAt = randSquare;
                //console.log(randSquare);
                Align.scaleToGameW(child,.05);
                var angle = Math.floor(Math.random() * Math.floor(40)) + 50;   
                child.angle = -angle;
                this.uiGrid.placeAtIndex(randSquare,child);
            }.bind(this));
        }
    }
    update() {
        var cursor = this.input.keyboard.createCursorKeys();

        if(cursor.left.isDown)
        {
            this.bunny.setVelocityX(-160);
            this.bunny.body.velocity.normalize().scale(bunnySpeed);
            this.bunny.play('left', true);
            this.physics.moveTo(this.farmer, this.bunny.x, this.bunny.y, farmerSpeed);
        }
        else if(cursor.right.isDown)
        {
            this.bunny.setVelocityX(160);
            this.bunny.body.velocity.normalize().scale(bunnySpeed);
            this.bunny.play('left', true);
            this.physics.moveTo(this.farmer, this.bunny.x, this.bunny.y, farmerSpeed);
        }
        else if(cursor.down.isDown)
        {
            this.bunny.setVelocityY(270);
            this.bunny.body.velocity.normalize().scale(bunnySpeed);
            this.bunny.play('left', true);
            this.physics.moveTo(this.farmer, this.bunny.x, this.bunny.y, farmerSpeed);
        }
        else if(cursor.up.isDown)
        {
            this.bunny.setVelocityY(-270);
            this.bunny.body.velocity.normalize().scale(bunnySpeed);
            this.bunny.play('left', true);
            this.physics.moveTo(this.farmer, this.bunny.x, this.bunny.y, farmerSpeed);
        }
        else
        {
            this.bunny.setVelocityX(0);
            this.bunny.setVelocityY(0);
        }


        if(model.gameOver == true)   
        {
            squaresTaken = [0,1,2,3,4,5,6,7,8,9,10,60,62,63];
            bunnySpeed = 200;
            farmerSpeed = 75;
            this.scene.start("SceneOver");
        }
        
    }
    makeEggs()
    {
        if(this.eggGroup.getChildren().length == 0)
        {
            this.eggGroup = this.physics.add.group({
                key: 'eggs',
                frame: [0,1,2,3],
                frameQuantity: 1,
                collideWorldBounds: true
            });
    
            this.eggGroup.children.iterate(function(child){

                var randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;

                while(squaresTaken.includes(randSquare))
                {
                    randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;   
                    if(!squaresTaken.includes(randSquare))
                    {
                        break;
                    }
                }
                squaresTaken.push(randSquare);
                child.squareAt = randSquare;
                Align.scaleToGameW(child,.1);
                this.uiGrid.placeAtIndex(randSquare,child);
                child.body.immovable = true;
    
            }.bind(this));
        }
    }
    eggHitBunny(bunny, egg)
    {
        var eggFrameNum = egg.frame.name;
        this.deleteFromList(egg.squareAt);
        egg.destroy();


        //Need to respawn egg that got destroyed
        var replacementEgg = this.physics.add.sprite(this.centerX,this.centerY,'eggs');
        replacementEgg.setFrame(egg.frame.name);


        var randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;

        while(squaresTaken.includes(randSquare))
        {
            randSquare = Math.floor(Math.random() * Math.floor(15*11)) + 1;   
        }
        squaresTaken.push(randSquare);
        replacementEgg.squareAt = randSquare;
        Align.scaleToGameW(replacementEgg,.1);
        this.uiGrid.placeAtIndex(randSquare,replacementEgg);
        replacementEgg.body.immovable = true;

        this.eggGroup.add(replacementEgg);

        if(eggFrameNum == curEggColor)
        {
            //console.log("You get a point!");
            emitter.emit(G.UP_POINTS,1);
        }
        else
        {
            if(model.score > 0)
            {
                emitter.emit(G.UP_POINTS,-1);
            }
            this.slowDown();
        }
    }
    slowDown()
    {
        bunnySpeed = 200;
    }
    carrotHitBunny(bunny, carrot)
    {
        carrot.destroy();
        bunnySpeed += 25;
    }
    carrotHitFarmer(farmer, carrot)
    {
        carrot.destroy();
        farmerSpeed += 10;
    }
    deleteFromList(squareNum)
    {
        const index = squaresTaken.indexOf(squareNum);
        if(index > -1)
        {
            squaresTaken.splice(index, 1);
        }
    }
}