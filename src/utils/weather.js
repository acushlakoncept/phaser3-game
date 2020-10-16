/* eslint-disable import/prefer-default-export */
export const setWeather = (weather, gameState) => {
  const weathers = {
    morning: {
      color: 0xecdccc,
      snow: 1,
      wind: 20,
      bgColor: 0xf8c3ac,
    },

    afternoon: {
      color: 0xffffff,
      snow: 1,
      wind: 80,
      bgColor: 0x0571ff,
    },

    twilight: {
      color: 0xccaacc,
      bgColor: 0x18235c,
      snow: 10,
      wind: 200,
    },

    night: {
      color: 0x555555,
      bgColor: 0x000000,
      snow: 0,
      wind: 0,
    },
  };
  const {
    color, bgColor, snow, wind,
  } = weathers[weather];
  gameState.bg1.setTint(color);
  gameState.bg2.setTint(color);
  gameState.bg3.setTint(color);
  gameState.bgColor.fillColor = bgColor;
  gameState.emitter.setQuantity(snow);
  gameState.emitter.setSpeedX(-wind);
  gameState.player.setTint(color);
  // eslint-disable-next-line no-restricted-syntax
  for (const platform of gameState.platforms.getChildren()) {
    platform.setTint(color);
  }
  if (weather === 'night') {
    gameState.stars.forEach((star) => star.setVisible(true));
  } else {
    gameState.stars.forEach((star) => star.setVisible(false));
  }
};
