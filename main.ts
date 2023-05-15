namespace SpriteKind {
    export const Platform = SpriteKind.create()
    export const Superplatform = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cooldown == 0) {
        _player.vy = -50
        cooldown = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Platform, function (sprite, otherSprite) {
    if (sprite.x >= otherSprite.y - 2) {
        sprite.setPosition(sprite.x, otherSprite.y - 15)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Superplatform, function (sprite, otherSprite) {
    sprite.setPosition(otherSprite.x, otherSprite.y - 45)
    sprites.destroy(otherSprite)
})
let currentPlatform: Sprite = null
let platformRNG = 0
let currentEnemy: Sprite = null
let enemyRNG = 0
let cooldown = 0
let _player: Sprite = null
_player = sprites.create(assets.image`player_gun1`, SpriteKind.Player)
controller.moveSprite(_player, 60, 0)
let current_weapon = 0
_player.ay = 50
_player.setStayInScreen(true)
scene.setBackgroundColor(0)
game.onUpdateInterval(2000, function () {
    cooldown = 0
})
game.onUpdateInterval(500, function () {
    enemyRNG = randint(0, 100)
    if (enemyRNG < 15) {
        currentEnemy = sprites.create(img`
            . . f f f f . . 
            . f 1 1 1 1 f . 
            f 9 9 1 1 1 1 f 
            f 1 9 1 1 1 1 f 
            f 8 9 1 1 1 1 f 
            f 9 9 1 1 1 1 f 
            . f 1 1 1 1 f . 
            . . f f f f . . 
            `, SpriteKind.Enemy)
        currentEnemy.setPosition(150, randint(40, 120))
    } else if (enemyRNG >= 40 && enemyRNG <= 100) {
        currentEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
    } else if (enemyRNG >= 40 && enemyRNG <= 100) {
        currentEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
    }
    currentEnemy.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(300, function () {
    platformRNG = randint(0, 100)
    if (platformRNG < 33) {
        currentPlatform = sprites.create(assets.image`Vpipe`, SpriteKind.Platform)
        currentPlatform.setPosition(160, 115)
    } else if (platformRNG >= 33 && platformRNG < 40) {
        currentPlatform = sprites.create(assets.image`Springboard`, SpriteKind.Superplatform)
        currentPlatform.setPosition(160, randint(40, 120))
    } else if (platformRNG >= 40 && platformRNG <= 100) {
        currentPlatform = sprites.create(assets.image`Hpipe`, SpriteKind.Platform)
        currentPlatform.setPosition(160, randint(40, 120))
    } else {
        currentPlatform = sprites.create(assets.image`undefined`, SpriteKind.Platform)
    }
    currentPlatform.setVelocity(-50, 0)
    currentPlatform.setFlag(SpriteFlag.AutoDestroy, true)
})
