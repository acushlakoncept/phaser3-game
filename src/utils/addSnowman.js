import { animateSnowman } from "./snowmanTween";
import { checkCollision } from "./enemyCollide";

export const addSnowman = (
  context,
  obj,
  objCollider,
  xpos,
  animx,
  animy,
  player,
  active
) => {
  obj = context.physics.add.sprite(xpos, 100, "snowman");
  context.physics.add.collider(obj, objCollider);
  animateSnowman(obj, context, animx, animy);
  checkCollision(context, player, obj, active);
};
