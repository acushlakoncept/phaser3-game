export const animateSnowman = (obj, context, xpos, duration) => {
    obj.anims.play('snowmanAlert', true);

    obj.move = context.tweens.add({
      targets: obj,
      x: xpos,
      ease: 'Linear',
      duration: duration,
      repeat: -1,
      yoyo: true
    })
}