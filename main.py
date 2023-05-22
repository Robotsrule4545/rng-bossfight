@namespace
class SpriteKind:
    Platform = SpriteKind.create()
    Superplatform = SpriteKind.create()
    enemyProjectile = SpriteKind.create()
    bossShard = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    if current_weapon == 0:
        sprites.destroy(sprite, effects.ashes, 500)
        statusbar.value += -3
    elif current_weapon == 1:
        sprites.destroy(sprite, effects.star_field, 500)
        statusbar.value += -2
sprites.on_overlap(SpriteKind.enemyProjectile, SpriteKind.player, on_on_overlap)

def on_b_pressed():
    global current_weapon
    if current_weapon == 1:
        current_weapon = 0
    elif current_weapon == 0:
        current_weapon = 1
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global cooldown
    if cooldown == 0:
        _player.vy = -50
        cooldown = 1
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap2(sprite2, otherSprite2):
    sprite2.set_position(sprite2.x, otherSprite2.y - 15)
sprites.on_overlap(SpriteKind.player, SpriteKind.Platform, on_on_overlap2)

def on_on_zero(status):
    game.game_over(False)
    game.set_game_over_message(False, "GAME OVER!")
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_on_overlap3(sprite3, otherSprite3):
    sprite3.set_position(otherSprite3.x, otherSprite3.y - 45)
    sprites.destroy(otherSprite3)
sprites.on_overlap(SpriteKind.player, SpriteKind.Superplatform, on_on_overlap3)

def on_on_created(sprite4):
    if current_weapon == 1:
        
        def on_background():
            pause(400)
            sprites.destroy(sprite4)
        timer.background(on_background)
        
sprites.on_created(SpriteKind.projectile, on_on_created)

def on_on_overlap4(sprite5, otherSprite4):
    global shardDropChance, shard
    sprites.destroy(sprite5, effects.fire, 500)
    sprites.destroy(otherSprite4, effects.fire, 500)
    info.change_score_by(1)
    shardDropChance = randint(0, 3)
    if game.runtime() > 5000:
        if shardDropChance == 2:
            shard = sprites.create(img("""
                    . . . . . . 1 1 
                                    . . . 1 1 1 3 1 
                                    . 1 1 4 4 4 3 1 
                                    1 4 4 4 4 4 3 1 
                                    . 1 4 4 4 4 3 1 
                                    . 1 4 4 4 4 3 1 
                                    . . 1 1 1 4 3 1 
                                    . . . . . 1 1 .
                """),
                SpriteKind.bossShard)
            shard.set_position(otherSprite4.x, otherSprite4.y)
            shard.set_flag(SpriteFlag.AUTO_DESTROY, True)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap4)

"""

<------ On start

Initialize sprites, add moving, add gravity, add rules

"""
enemyRNG = 0
currentPlatform: Sprite = None
platformRNG = 0
bullet: Sprite = None
currentEnemy: Sprite = None
enemylaser: Sprite = None
initenemies = 0
shard: Sprite = None
shardDropChance = 0
cooldown = 0
current_weapon = 0
_player: Sprite = None
statusbar: StatusBarSprite = None
currentenemies = 0
info.set_score(0)
statusbar = statusbars.create(10, 2, StatusBarKind.health)
_player = sprites.create(assets.image("""
    player_gun1
"""), SpriteKind.player)
statusbar.attach_to_sprite(_player)
statusbar.max = 10
controller.move_sprite(_player, 60, 0)
current_weapon = 0
_player.ay = 50
_player.set_stay_in_screen(True)
scroller.scroll_background_with_speed(-50, 0)
scene.set_background_image(img("""
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
"""))
scene.set_background_color(15)

def on_on_update():
    if current_weapon == 1:
        _player.set_image(assets.image("""
            player_sword
        """))
    elif current_weapon == 0:
        _player.set_image(assets.image("""
            player_gun1
        """))
game.on_update(on_on_update)

def on_update_interval():
    global currentenemies
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    currentenemies = 0
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global enemylaser
    if 0 < initenemies:
        for index in range(2):
            enemylaser = sprites.create(img("""
                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                                    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                                    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
                                    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
                """),
                SpriteKind.enemyProjectile)
            enemylaser.set_position(currentEnemy.x, currentEnemy.y)
            enemylaser.set_velocity(randint(-100, -150), 0)
            enemylaser.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(2000, on_update_interval2)

def on_update_interval3():
    statusbar.value += 1
game.on_update_interval(2000, on_update_interval3)

def on_update_interval4():
    global bullet
    if current_weapon == 1:
        bullet = sprites.create_projectile_from_sprite(img("""
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
            """),
            _player,
            46,
            0)
        bullet.set_flag(SpriteFlag.AUTO_DESTROY, True)
        
        def on_background2():
            global bullet
            pause(200)
            bullet = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . 1 9 9 8 . . 
                                    . . . . . . . . . 1 1 9 8 . . . 
                                    . . . . . . . . 1 9 9 8 . . . . 
                                    . . . . . . 1 1 9 8 8 . . . . . 
                                    . . . 1 1 1 9 9 8 . . . . . . . 
                                    . 1 1 9 9 9 8 8 . . . . . . . . 
                                    1 9 9 8 8 8 . . . . . . . . . . 
                                    9 8 8 . . . . . . . . . . . . . 
                                    8 . . . . . . . . . . . . . . .
                """),
                _player,
                46,
                0)
            bullet.set_flag(SpriteFlag.AUTO_DESTROY, True)
        timer.background(on_background2)
        
        
        def on_after():
            sprites.destroy(bullet)
        timer.after(150, on_after)
        
game.on_update_interval(400, on_update_interval4)

def on_update_interval5():
    global bullet
    if current_weapon == 0:
        for index2 in range(6):
            bullet = sprites.create_projectile_from_sprite(img("""
                    . 1 . 
                                    1 1 1 
                                    . 1 .
                """),
                _player,
                randint(50, 80),
                randint(-15, 15))
            bullet.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1500, on_update_interval5)

def on_update_interval6():
    global cooldown
    cooldown = 0
game.on_update_interval(500, on_update_interval6)

def on_update_interval7():
    global platformRNG, currentPlatform
    platformRNG = randint(0, 100)
    if platformRNG < 33:
        currentPlatform = sprites.create(assets.image("""
            Vpipe
        """), SpriteKind.Platform)
        currentPlatform.set_position(160, 115)
    elif platformRNG >= 33 and platformRNG < 40:
        currentPlatform = sprites.create(assets.image("""
                Springboard
            """),
            SpriteKind.Superplatform)
        currentPlatform.set_position(160, randint(40, 120))
    elif platformRNG >= 40 and platformRNG <= 100:
        currentPlatform = sprites.create(assets.image("""
            Hpipe
        """), SpriteKind.Platform)
        currentPlatform.set_position(160, randint(40, 120))
    else:
        currentPlatform = sprites.create(assets.image("""
            undefined
        """), SpriteKind.Platform)
    currentPlatform.set_velocity(-50, 0)
    currentPlatform.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(500, on_update_interval7)

def on_update_interval8():
    global enemyRNG, currentEnemy, currentenemies, initenemies
    if currentenemies <= 3:
        enemyRNG = randint(0, 100)
        if enemyRNG < 33:
            currentEnemy = sprites.create(img("""
                    . . f f f f . . 
                                    . f 1 1 1 1 f . 
                                    f 9 9 1 1 1 1 f 
                                    f 1 9 1 1 1 1 f 
                                    f 8 9 1 1 1 1 f 
                                    f 9 9 1 1 1 1 f 
                                    . f 1 1 1 1 f . 
                                    . . f f f f . .
                """),
                SpriteKind.enemy)
            currentEnemy.set_position(150, randint(5, 100))
        elif enemyRNG >= 33 and enemyRNG <= 66:
            currentEnemy = sprites.create(img("""
                    . . f f f f . . 
                                    . f 1 1 1 1 f . 
                                    f 3 3 1 1 1 1 f 
                                    f 1 3 1 1 1 1 f 
                                    f a 3 1 1 1 1 f 
                                    f 3 3 1 1 1 1 f 
                                    . f 1 1 1 1 f . 
                                    . . f f f f . .
                """),
                SpriteKind.enemy)
            currentEnemy.set_position(150, randint(40, 110))
        elif enemyRNG >= 66 and enemyRNG <= 99:
            currentEnemy = sprites.create(img("""
                    . . f f f f . . 
                                    . f 1 1 1 1 f . 
                                    f 4 4 1 1 1 1 f 
                                    f 1 4 1 1 1 1 f 
                                    f 2 4 1 1 1 1 f 
                                    f 4 4 1 1 1 1 f 
                                    . f 1 1 1 1 f . 
                                    . . f f f f . .
                """),
                SpriteKind.enemy)
            currentEnemy.set_position(150, randint(110, 160))
        elif enemyRNG == 100:
            currentEnemy = sprites.create(img("""
                    . . f f f f . . 
                                    . f 3 3 3 3 f . 
                                    f 5 5 3 3 3 3 f 
                                    f 1 5 3 3 3 3 f 
                                    f 4 5 3 3 3 3 f 
                                    f 5 5 3 3 3 3 f 
                                    . f 3 3 3 3 f . 
                                    . . f f f f . .
                """),
                SpriteKind.enemy)
            currentEnemy.set_position(150, randint(10, 160))
        currentEnemy.set_flag(SpriteFlag.AUTO_DESTROY, True)
        currentenemies += 1
    initenemies += 1
game.on_update_interval(500, on_update_interval8)
