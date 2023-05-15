namespace SpriteKind {
    export const Platform = SpriteKind.create()
    export const Superplatform = SpriteKind.create()
    export const enemyProjectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.enemyProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.ashes, 500)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (current_weapon == 1) {
        current_weapon = 0
    } else if (current_weapon == 0) {
        current_weapon = 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cooldown == 0) {
        _player.vy = -50
        cooldown = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Platform, function (sprite, otherSprite) {
    sprite.setPosition(sprite.x, otherSprite.y - 15)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Superplatform, function (sprite, otherSprite) {
    sprite.setPosition(otherSprite.x, otherSprite.y - 45)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeScoreBy(1)
})
let enemyRNG = 0
let currentPlatform: Sprite = null
let platformRNG = 0
let bullet: Sprite = null
let currentEnemy: Sprite = null
let enemylaser: Sprite = null
let initenemies = 0
let cooldown = 0
let current_weapon = 0
let _player: Sprite = null
info.setLife(3)
let currentenemies = 0
info.setScore(0)
_player = sprites.create(assets.image`player_gun1`, SpriteKind.Player)
controller.moveSprite(_player, 60, 0)
current_weapon = 0
_player.ay = 50
_player.setStayInScreen(true)
scene.setBackgroundColor(15)
scene.setBackgroundImage(img`
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    aaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    aaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    bbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaaaaaaacccccccccccccccccccccccccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaccccaaaaaaaaaaaccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccaaaaaaaaaaaccccaaaaaaaaabbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaacccccccccccccccccccccaaaaaaaaaaaaaaabbbbbbbbabbbbbbbbbbbbbbbbaaaaaaabbbbbbbbaaaacccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaacccccbbbbbbbbaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaa
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaa
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    22222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    2222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    2222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb2222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    22222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb2222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    2222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    22222222222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbb22222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    ...22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbbbbbb
    ...................22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbbb
    .....................................................................................222222222222222222222222222222222222222222222222222222bbbbbbbbbbbbbbbbbbbbb
    ...........................................................................................................22222222222222222222222222222222222bbbbbbbbbbbbbbbbbb
    ................................................................................................................................222222222222222bbbbbbbbbbbbbbbbb
    .....................................................................................................................................222222222222bbbbbbbbbbbbbbb
    ..........................................................................................................................................2222222222bbbbbbbbbbbb
    ...............................................................................................................................................222222222bbbbbbbb
    ...................................................................................................................................................222222222bbbb
    ......................................................................................................................................................2222222222
    ............................................................................................................................................................bbbb
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
game.onUpdate(function () {
    if (current_weapon == 1) {
        _player.setImage(assets.image`player_sword`)
    } else if (current_weapon == 0) {
        _player.setImage(assets.image`player_gun1`)
    }
})
game.onUpdateInterval(5000, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    currentenemies = 0
})
game.onUpdateInterval(2000, function () {
    cooldown = 0
})
game.onUpdateInterval(1000, function () {
    if (0 < initenemies) {
        for (let index = 0; index < 5; index++) {
            enemylaser = sprites.create(img`
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                `, SpriteKind.enemyProjectile)
            enemylaser.setPosition(currentEnemy.x, currentEnemy.y)
            enemylaser.setVelocity(randint(-100, -150), 0)
            enemylaser.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(1500, function () {
    if (current_weapon == 1) {
        for (let index = 0; index < 3; index++) {
            bullet = sprites.createProjectileFromSprite(img`
                . 9 . . . . . . . 
                . 9 9 . . . . . . 
                . . 9 9 9 . . . . 
                . . . . 9 9 . . . 
                . . . . 9 9 9 . . 
                . . . . . 9 9 . . 
                . . . . . 9 9 . . 
                . . . . . 9 9 . . 
                . . . . . . 9 9 . 
                . . . . . . 9 9 9 
                . . . . . . 9 9 . 
                . . . . . 9 9 . . 
                . . . . 9 9 9 . . 
                . . . . 9 9 . . . 
                . . 9 9 9 . . . . 
                . 9 9 . . . . . . 
                `, _player, randint(100, 500), 0)
            bullet.setFlag(SpriteFlag.AutoDestroy, true)
        }
    } else if (current_weapon == 0) {
        for (let index = 0; index < 8; index++) {
            bullet = sprites.createProjectileFromSprite(img`
                . 1 . 
                1 1 1 
                . 1 . 
                `, _player, randint(50, 80), randint(-15, 15))
            bullet.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
})
game.onUpdateInterval(500, function () {
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
game.onUpdateInterval(500, function () {
    if (currentenemies <= 3) {
        enemyRNG = randint(0, 100)
        if (enemyRNG < 33) {
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
            currentEnemy.setPosition(150, randint(5, 100))
        } else if (enemyRNG >= 33 && enemyRNG <= 66) {
            currentEnemy = sprites.create(img`
                . . f f f f . . 
                . f 1 1 1 1 f . 
                f 3 3 1 1 1 1 f 
                f 1 3 1 1 1 1 f 
                f a 3 1 1 1 1 f 
                f 3 3 1 1 1 1 f 
                . f 1 1 1 1 f . 
                . . f f f f . . 
                `, SpriteKind.Enemy)
            currentEnemy.setPosition(150, randint(40, 110))
        } else if (enemyRNG >= 66 && enemyRNG <= 99) {
            currentEnemy = sprites.create(img`
                . . f f f f . . 
                . f 1 1 1 1 f . 
                f 4 4 1 1 1 1 f 
                f 1 4 1 1 1 1 f 
                f 2 4 1 1 1 1 f 
                f 4 4 1 1 1 1 f 
                . f 1 1 1 1 f . 
                . . f f f f . . 
                `, SpriteKind.Enemy)
            currentEnemy.setPosition(150, randint(110, 160))
        } else if (enemyRNG == 100) {
            currentEnemy = sprites.create(img`
                . . f f f f . . 
                . f 3 3 3 3 f . 
                f 5 5 3 3 3 3 f 
                f 1 5 3 3 3 3 f 
                f 4 5 3 3 3 3 f 
                f 5 5 3 3 3 3 f 
                . f 3 3 3 3 f . 
                . . f f f f . . 
                `, SpriteKind.Enemy)
            currentEnemy.setPosition(150, randint(10, 160))
        }
        currentEnemy.setFlag(SpriteFlag.AutoDestroy, true)
        currentenemies += 1
    }
    initenemies += 1
})
