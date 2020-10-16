/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { checkCollision } from './enemyCollide';

export const addBomb = (context, obj, objMain, xMin, xMax, player, active) => {
  obj = objMain.create(Phaser.Math.Between(xMin, xMax), 16, 'bomb');
  obj.setBounce(1);
  obj.setCollideWorldBounds(true);
  obj.setVelocity(Phaser.Math.Between(-200, 200), 20);
  checkCollision(context, player, obj, active, 'bomb');
};
