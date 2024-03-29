﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Reldur_s_Gate.Default" %>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Making your first Phaser 3 Game - Part 10</title>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>
<script type="text/javascript">
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var scale = 1.5;
var game = new Phaser.Game(config);
function preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/mushroom.png');
    //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('zelda', './assets/walk.png', {frameWidth : 16, frameHeight: 24});
}
function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'zelda');
	player.setScale(scale);
    //  Player physics properties. Give the little guy a slight bounce.
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('zelda', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'zelda', frame: 24 } ],
        frameRate: 5
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('zelda', { start: 8, end: 15 }),
        frameRate: 5,
        repeat: -1
    });
	
	this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('zelda', { start: 16, end: 23 }),
        frameRate: 5,
        repeat: -1
    });
	
	this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('zelda', { start: 24, end: 31 }),
        frameRate: 5,
        repeat: -1
    });
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 0,
        setXY: { x: 300, y: 300, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    bombs = this.physics.add.group();
    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}
function update ()
{
    if (gameOver)
    {
        return;
    }
    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);
        player.anims.play('left', true);
		
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);
        player.anims.play('right', true);
    }
	
    //else
    //{
        //player.setVelocityX(0);
		
        //player.anims.play('turn');
    //}
	
	if (cursors.up.isDown )
    {
        player.setVelocityY(-300);
		player.anims.play('up', true);
    }
	
	else if (cursors.down.isDown)
	{
		player.setVelocityY(300);
		player.anims.play('down', true);
	}
	//else
	//{
		//player.setVelocityY(0);
	//}
	if(!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown)
	{
		player.setVelocityX(0);
		player.setVelocityY(0);
        player.anims.play('turn');
	}
	
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {
            child.enableBody(true, Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400), true, true);
        });
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(300, 400), 100);
        bomb.allowGravity = false;
    }
}
function hitBomb (player, bomb)
{
    bomb.disableBody(true, true);
	
	//this.physics.pause();
    //player.setTint(0xff0000);
    //player.anims.play('turn');
    //gameOver = true;
	
	scale *= 1.5;
	
	player.setScale(scale);
}
</script>
</body>
</html>
