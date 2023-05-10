let _player = sprites.create(assets.image`player_gun1`, SpriteKind.Player)
let current_weapon = 0
controller.moveSprite(_player, 100, 100)
_player.ay = 50
_player.setStayInScreen(true)
