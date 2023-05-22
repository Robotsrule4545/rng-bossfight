namespace SpriteKind {
    export const Platform = SpriteKind.create()
    export const Superplatform = SpriteKind.create()
    export const enemyProjectile = SpriteKind.create()
    export const bossShard = SpriteKind.create()
    export const killbrick = SpriteKind.create()
}
/**
 * <------ On start
 * 
 * Initialize sprites, add moving, add gravity, add rules
 */
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite5, otherSprite4) {
    sprites.destroy(sprite5, effects.fire, 500)
    sprites.destroy(otherSprite4, effects.fire, 500)
    info.changeScoreBy(1)
    shardDropChance = randint(0, 3)
    if (game.runtime() > 7000) {
        if (shardDropChance == 2) {
            killbrick = sprites.create(img`
                . . . . . . 1 1 
                . . . 1 1 1 3 1 
                . 1 1 4 4 4 3 1 
                1 4 4 4 4 4 3 1 
                . 1 4 4 4 4 3 1 
                . 1 4 4 4 4 3 1 
                . . 1 1 1 4 3 1 
                . . . . . 1 1 . 
                `, SpriteKind.bossShard)
            killbrick.setPosition(otherSprite4.x, otherSprite4.y)
            killbrick.setFlag(SpriteFlag.AutoDestroy, true)
        }
        sprites.destroy(sprite5, effects.fire, 500)
        sprites.destroy(otherSprite4, effects.fire, 500)
        info.changeScoreBy(1)
        shardDropChance = randint(0, 3)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.killbrick, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.enemyProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (current_weapon == 0) {
        sprites.destroy(sprite, effects.ashes, 500)
        statusbar.value += -3
    } else if (current_weapon == 1) {
        sprites.destroy(sprite, effects.starField, 500)
        statusbar.value += -2
    }
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Superplatform, function (sprite3, otherSprite3) {
    sprite3.setPosition(otherSprite3.x, otherSprite3.y - 45)
    sprites.destroy(otherSprite3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Platform, function (sprite2, otherSprite2) {
    sprite2.setPosition(sprite2.x, otherSprite2.y - 15)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverMessage(false, endgamemessages[randint(1, 5)])
    game.gameOver(false)
})
sprites.onCreated(SpriteKind.Projectile, function (sprite4) {
    if (current_weapon == 1) {
        timer.background(function () {
            pause(400)
            sprites.destroy(sprite4)
        })
    }
})
let enemyRNG = 0
let currentPlatform: Sprite = null
let platformRNG = 0
let bullet: Sprite = null
let currentEnemy: Sprite = null
let enemylaser: Sprite = null
let initenemies = 0
let currentenemies = 0
let cooldown = 0
let shardDropChance = 0
let killbrick: Sprite = null
let current_weapon = 0
let endgamemessages: string[] = []
let _player: Sprite = null
let statusbar: StatusBarSprite = null
info.setScore(0)
statusbar = statusbars.create(10, 2, StatusBarKind.Health)
_player = sprites.create(assets.image`player_gun1`, SpriteKind.Player)
statusbar.attachToSprite(_player)
statusbar.max = 10
endgamemessages = [
"Press E to switch weapons!",
"Press SPACE to jump!",
"Watch out, platforms may be buggy!",
"P.S You're in a cave.",
"Use A and D to move back and forth!"
]
controller.moveSprite(_player, 60, 0)
current_weapon = 0
_player.ay = 50
_player.setStayInScreen(true)
scroller.scrollBackgroundWithSpeed(-50, 0)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffffaaaafffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffaaffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffaafffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffaaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaffffffffffffffffffffffffffaaaaaaafffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaafffffffffffffffffffaaaaaaaaaaaaaaffffffffffffff
    fffffffffffffffffffffffffffffaaafffffffaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaafffffffffffffffffaaaaaaaaaaaaaaaffffffffffffff
    fffffffffffffffffffffffffffffaaafffffffaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffaaaaaaaaaaaaaaaaaaaffffffffffff
    fffffffffffffffffffffffffffffaaaafffffaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffaaaaaaaaaaaaaaaaaaaaaafffffffffff
    ffffffffffffffffffffffffffffffaaafffffaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffff
    ffffffffffffffffffffffffffffffaaafffffaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffaaaaaaaaaaaaaafffff
    ffffffffffffffffffffffffffffffaaafffffaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaffff
    ffffffffffffffffffffffffffffffaaaafffaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaafff
    ffffffffffffffffffffffffffffffaaaafaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaf
    ffffffffffffffffffffffffffffffaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaa
    aaaaaaaffffffffffffffffffffffffaaaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaafffffffffffffffffffffffffffffffffffffaaaaaaaaaa
    aaaaaaaaaaaafffffffffffffffffffaaaaaaaffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaafffffffffffaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffaaaaaaaa
    aaaaaaaaaaaaaaaaffffffffffffffffaaaafffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaffffaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffaaaaaaa
    aaaaaaaaaaaaaaaaaaafffffffffffffaaaaaffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaffffffffffaaaafffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffaaaaa
    fffaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaafffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffaaaaaaaaaaaaaaaaaaaaafffffaaaafffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffaaaaaaaaaaaaaaaaaaafffaaaafffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffaafffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffaaffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffaafffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffaaaaaffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffaafaafffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffaaffaafffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffafffaafffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffaafffafffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaafffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaafffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaafffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaafffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffff
    ffffffffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffff
    ffffffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffff
    ffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffff
    ffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeff
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    `)
scene.setBackgroundColor(15)
killbrick = sprites.create(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 f 2 2 2 2 2 2 2 f 2 2 2 
    2 2 2 2 f 2 2 2 2 2 2 2 f 2 2 2 
    2 2 2 2 f 2 2 2 2 2 2 2 f 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 f f f f f f f f f 2 2 2 
    2 2 2 2 2 2 2 2 f 2 2 2 f 2 2 2 
    2 2 2 2 2 2 2 2 f f f f f 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.killbrick)
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
game.onUpdateInterval(5000, function () {
    statusbar.value += 1
})
game.onUpdateInterval(2000, function () {
    if (0 < initenemies) {
        for (let index = 0; index < 2; index++) {
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
game.onUpdateInterval(400, function () {
    if (current_weapon == 1) {
        bullet = sprites.createProjectileFromSprite(img`
            1 8 . . . . . . . 
            1 9 8 . . . . . . 
            . 1 9 8 8 . . . . 
            . . 1 1 9 8 . . . 
            . . . 1 9 9 8 . . 
            . . . . 1 9 8 . . 
            . . . . 1 9 8 . . 
            . . . . 1 9 8 . . 
            . . . . . 1 9 8 . 
            . . . . . 1 9 8 . 
            . . . . . 1 9 8 . 
            . . . . 1 9 8 . . 
            . . . 1 9 9 8 . . 
            . . 1 1 9 8 . . . 
            . 1 9 9 8 . . . . 
            1 9 8 . . . . . . 
            `, _player, 46, 0)
        bullet.setFlag(SpriteFlag.AutoDestroy, true)
        timer.background(function () {
            pause(200)
            bullet = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . 1 9 9 8 . . 
                . . . . . . . . . 1 1 9 8 . . . 
                . . . . . . . . 1 9 9 8 . . . . 
                . . . . . . 1 1 9 8 8 . . . . . 
                . . . 1 1 1 9 9 8 . . . . . . . 
                . 1 1 9 9 9 8 8 . . . . . . . . 
                1 9 9 8 8 8 . . . . . . . . . . 
                9 8 8 . . . . . . . . . . . . . 
                8 . . . . . . . . . . . . . . . 
                `, _player, 46, 0)
            bullet.setFlag(SpriteFlag.AutoDestroy, true)
        })
        timer.after(150, function () {
            sprites.destroy(bullet)
        })
    }
})
game.onUpdateInterval(1500, function () {
    if (current_weapon == 0) {
        for (let index = 0; index < 6; index++) {
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
game.onUpdateInterval(500, function () {
    cooldown = 0
})
