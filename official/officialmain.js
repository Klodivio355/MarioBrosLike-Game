var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.audio('coindrop', 'assets/coin.mp3');
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('explosion', 'assets/explosion.mp3');
    game.load.audio('crack', 'assets/crack.mp3');
    game.load.image('background', 'assets/background.jpg');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('firstwall', 'assets/firstwall.png');
    game.load.image('twocubes' , 'assets/twocubes.png');
    game.load.image('coin', 'assets/coin.gif');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('leftside', 'assets/leftsideplat.png');
    game.load.image('rightside', 'assets/rightsideplat.png');
    game.load.image('onecube', 'assets/onecube.png');
    game.load.image('fire', 'assets/fire.gif');
    game.load.image('rockpack', 'assets/rockpack.png');
    game.load.image('bomb', 'assets/bomb.png');
    game.load.image('plaatform', 'assets/plaatform.jpg')
    game.load.image('bloc', 'assets/bloc.png');
    game.load.image('brokenbloc', 'assets/brokenbloc.png');
    game.load.image('door', 'assets/door.png');
    game.load.image('spike', 'assets/spike.png');
}


var platforms; // PARENT
var player;
var cursors;
var coins;
var spikes;
var bombs; // PARENT
var score = 0;
var scoreText;
var winText;
var music;
var snd;
var coindrop;
var explosion;
var crack;
var brokenbloc;
var bouncingwall;


function create() {
    // background
    game.world.setBounds(0, 0, 2000, 400);
    var background = game.add.image(0,0, 'background');
    background.scale.setTo(1.14, 1.14);
    background = game.add.image(1167.36,0, 'background');
    background.scale.setTo(1.14, 1.14);
    // end-gane door
    door = game.add.image(1935, 190, 'door');
    door.scale.setTo(0.3,0.3);
    // physics builtin up
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // platforms settings
    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.immovable = true;
    for (var i = 0; i<32; i++){
        var ground = platforms.create(i * 64, 385, 'ground');
        ground.body.immovable = true;
    }

    var firstwall = platforms.create(150,105,'firstwall');
    firstwall.body.immovable = true;
    firstwall = platforms.create(300,0, 'firstwall');
    firstwall.body.immovable = true;
    firstwall = platforms.create(1355, 105, 'firstwall');
    firstwall.body.immovable = true;

    bouncingwall = game.add.group();
    bouncingwall.enableBody = true;
    var bouncinwall = bouncingwall.create(981,25, 'firstwall');
    bouncinwall.body.gravity.y = 400;
    bouncinwall.body.bounce.y = 1;

    var onecube = platforms.create(0, 230, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(250, 330, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1300, 315, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1327, 300, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1300, 215, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1327, 200, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1327, 70, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1500, 250, 'onecube');
    onecube.body.immovable = true;
    onecube = platforms.create(1610, 300, 'onecube');


    var twocubes = platforms.create(95, 360, 'twocubes');
    twocubes.body.immovable = true;
    twocubes = platforms.create(0, 290, 'twocubes');
    twocubes.body.immovable = true;
    twocubes = platforms.create(1235, 130, 'twocubes');
    twocubes.body.immovable = true;
    twocubes = platforms.create(1400, 130, 'twocubes');
    twocubes = platforms.create(1526, 250, 'twocubes');
    twocubes = platforms.create(1700, 320, 'twocubes');
    twocubes.body.immovable = true


    var leftsideplat = platforms.create(169, 105, 'leftside');
    leftsideplat.scale.setTo(0.5, 0.5);
    leftsideplat.body.immovable = true;
    leftsideplat = platforms.create(169, 300, 'leftside');
    leftsideplat.scale.setTo(0.5, 0.5);

    var rightsideplat = platforms.create(95, 160, 'rightside');
    rightsideplat.scale.setTo(0.5, 0.5);
    rightsideplat.body.immovable = true;
    rightsideplat = platforms.create(246, 207, 'rightside');
    rightsideplat.scale.setTo(0.5, 0.5);
    rightsideplat.body.immovable = true;

    var rockpack = platforms.create(290, 329, 'rockpack');
    rockpack.scale.setTo(0.80, 0.6);
    rockpack.body.immovable = true;

    var plaatform = platforms.create(1000, 290, 'plaatform');
    plaatform.scale.setTo(0.15, 0.10);
    plaatform.body.immovable = true;
    plaatform = platforms.create(1085, 290, 'plaatform');
    plaatform.scale.setTo(0.15, 0.10);
    plaatform.body.immovable = true;
    plaatform = platforms.create(1820, 260, 'plaatform');
    plaatform.scale.setTo(0.15, 0.10);
    plaatform.body.immovable = true;
    plaatform = platforms.create(1920, 260, 'plaatform');
    plaatform.scale.setTo(0.15, 0.10);
    plaatform.body.immovable = true;

    var bloc = platforms.create(1169, 290, 'bloc');
    bloc.body.immovable = true;
    bloc.scale.setTo(0.7,0.7);
    bloc = platforms.create(1211, 290, 'bloc');
    bloc.body.immovable = true;
    bloc.scale.setTo(0.7,0.7);

    brokenbloc = game.add.group();
    brokenbloc.enableBody = true;
    var brokenblocc = brokenbloc.create(1253, 290, 'brokenbloc');
    brokenblocc.body.immovable = true;
    brokenblocc.scale.setTo(0.7,0.7);

    // COINS
    coins = game.add.group();
    coins.enableBody = true;
    coins.scale.setTo(0.8,0.8);
    var coin = coins.create(270, 20, 'coin');
    coin = coins.create(370, 370, 'coin');
    coin = coins.create(495, 450, 'coin');
    coin = coins.create(685, 370, 'coin');
    coin = coins.create(875, 450, 'coin');
    coin = coins.create(1050, 370, 'coin');
    coin = coins.create(1280, 320, 'coin');
    coin = coins.create(1540, 120, 'coin');
    coin = coins.create(1890, 280, 'coin');
    coin = coins.create(2220, 300, 'coin');

    // SPIKES
    spikes = game.add.group();
    spikes.enableBody = true;
    var spike = spikes.create(200, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(173, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1400, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1427, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1454, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1481, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1508, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1535, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1562, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1589, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1616, 355, 'spike');
    spike.scale.setTo(0.2,0.2);
    spike = spikes.create(1643, 355, 'spike');
    spike.scale.setTo(0.2,0.2);


    // PLAYER SETTINGS
    player = game.add.sprite(32, 250, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(30, 30, 'SCORE: 0', { fontSize: '40px', fill: '#cc000d' });
    winText = game.add.text(1830, 180, 'Next Level here!', {fontSize: '20px', fill: '#cc000d'});

    // BOMBS
    bombs = game.add.group();
    bombs.enableBody = true;
    var bomb = bombs.create(400, 250, 'bomb');
    bomb.scale.setTo(0.5,0.5);
    bomb.body.gravity.y = 250;
    bomb.body.bounce.y = 1;
    bomb = bombs.create(550, 350, 'bomb');
    bomb.scale.setTo(0.5,0.5);
    bomb.body.gravity.y = 250;
    bomb.body.bounce.y = 1;
    bomb = bombs.create(700, 250, 'bomb');
    bomb.scale.setTo(0.5,0.5);
    bomb.body.gravity.y = 250;
    bomb.body.bounce.y = 1;
    bomb = bombs.create(850, 350, 'bomb');
    bomb.scale.setTo(0.5,0.5);
    bomb.body.gravity.y = 250;
    bomb.body.bounce.y = 1;

    // sounds set-up
    snd = game.add.audio('jump');
    coindrop = game.add.audio('coindrop');
    explosion = game.add.audio('explosion');
    crack = game.add.audio('crack');
}


function update() {
   var hitPlatform = game.physics.arcade.collide(player, platforms);
   game.physics.arcade.collide(bombs, platforms);
   game.physics.arcade.collide(bouncingwall, platforms);
   game.physics.arcade.overlap(player, coins, collectCoin, null, this);
   game.physics.arcade.overlap(brokenbloc, player, blockill, null, this);
   game.physics.arcade.overlap(bombs, player, bombkill, null, this);
   game.physics.arcade.overlap(bouncingwall, player, wallkill, null, this);
   game.physics.arcade.overlap(spikes, player, spikekill, null, this);

     player.body.velocity.x = 0;

    if (cursors.left.isDown && player.x <400)
    {
        player.body.velocity.x = -120;
        player.animations.play('left');
    }
    else if (cursors.left.isDown && player.x >= 400)
    {
        player.body.velocity.x = -120
        player.animations.play('left');
        game.camera.x -= 2;
        scoreText.x -= 2;
    }
    else if (cursors.right.isDown && player.x <400)
    {
        player.body.velocity.x = 120;
        player.animations.play('right');
    }
    else if (player.x >= 400 && cursors.right.isDown)
    {
        player.body.velocity.x = 120;
        player.animations.play('right');
        game.camera.x += 2;
        scoreText.x += 2;
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -300;
        snd.play();
    }

    else if (game.camera.x >= 1200){
        scoreText.x = 1200;
    }

    else if(player.x >= 1600 && cursors.left.isDown){
        game.camera.x = 1600;
        scoreText.x = 1200;
    }
}

function bombkill (player, bomb) {
    player.kill();
    explosion.play();
}

function blockill (player, brokenblocc){
    brokenblocc.kill();
    crack.play();
}

function collectCoin (player, coin) {
    coin.kill();
    coindrop.play();
    score += 10;
    scoreText.text = 'SCORE: ' + score;
}

function wallkill (player, bouncinwall){
    player.kill();
}
function spikekill (player, spike){
    player.kill();
}
