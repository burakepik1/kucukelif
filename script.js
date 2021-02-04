var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var tilesprite;
var cursors;
var player;
var engel;
var scoreT;
var score = -1;
var game = new Phaser.Game(config);



function preload() {
    this.load.image('starfield', 'assets/back3.png');
    this.load.image('engel', 'assets/engel.png');
    this.load.spritesheet('run', 'assets/bird1.png', {
        frameWidth: 120,
        frameHeight: 80
    });
}

function create() {
    tileSprite = this.add.tileSprite(400, 300, 800, 600, 'starfield');

    player = this.physics.add.sprite(150, 300, 'run');
    player.body.allowGravity = false;
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('run', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    scoreT = this.add.text(16, 16, 'Score: 0', {
        fontSize: '16px',
        fill: '#000'
    });
    scoreT.depth = 100;
    engel = this.physics.add.group();
    engel.create(800, -100, 'engel');
    engel.create(800, 700, 'engel');
    engel.allowGravity = false;
    cursors = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(player, engel);
    this.physics.add.collider(player, engel, hitBomb, null, this);
}
var tileStatu = true;

function update() {
    if (tileStatu) {
        tileSprite.tilePositionX += 4;
    }

    engel.setVelocityX(-300);

    player.anims.play('right', true);


    if (cursors.up.isDown) {
        player.setVelocityY(-200);

    } else if (cursors.down.isDown) {
        player.setVelocityY(200);

    }


    if (engel.getChildren()[engel.getLength() - 1].x < 300) {
        var e = getH();
        engel.create(800, (-100 - e), 'engel');
        engel.create(800, (700 - e), 'engel');
    }

    if (engel.getChildren()[engel.getLength() - 2].x === 590) {
        score += 1;
        scoreT.setText('Score: ' + score);
    }


}

function getH() {
    //return Math.floor(Math.random() * 100);
    //return Math.floor(Math.random() * (200 + 100 + 1) ) - 100;
    return Math.floor(Math.random() * 361) - 180;
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    tileStatu = false;

    gameOver = true;
}

function getRand() {
    let e = Math.floor(Math.random() * 100);
    if (e % 3 === 0) {
        return true;
    }
    return false;
}