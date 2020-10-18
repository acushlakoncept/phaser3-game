/* eslint-disable import/prefer-default-export */
export const mouseOverEffect = (obj, context) => {
  obj.on('pointerover', () => {
    obj.setTint(0xecdccc);
    context.sound.add('mouseover').play();
  });
  obj.on('pointerout', () => {
    obj.setTint();
  });
};
