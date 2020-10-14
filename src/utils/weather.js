export const setWeather = (weather, gameState) => {
    const weathers = {

      'morning': {
        'color': 0xecdccc,
        'snow':  1,
        'wind':  20,
        'bgColor': 0xF8c3aC,
      },

      'afternoon': {
        'color': 0xffffff,
        'snow':  1,
        'wind': 80,
        'bgColor': 0x0571FF,
      },

      'twilight': {
        'color': 0xccaacc,
        'bgColor': 0x18235C,
        'snow':  10,
        'wind': 200,
      },

      'night': {
        'color': 0x555555,
        'bgColor': 0x000000,
        'snow':  0,
        'wind': 0,
      },
    }
    let { color, bgColor, snow, wind } = weathers[weather];
    gameState.bg1.setTint(color);
    gameState.bg2.setTint(color);
    gameState.bg3.setTint(color);
    gameState.bgColor.fillColor = bgColor;
    gameState.emitter.setQuantity(snow);
    gameState.emitter.setSpeedX(-wind);
    gameState.player.setTint(color);
    for (let platform of gameState.platforms.getChildren()) {
      platform.setTint(color);
    }
    if (weather === 'night') {
      gameState.stars.forEach(star => star.setVisible(true));
    } else {
      gameState.stars.forEach(star => star.setVisible(false));
    }

    return
  }