import { animateSnowman } from './snowmanTween'; 
import { checkCollision } from './enemyCollide'; 

export const addSnowman = (context, obj, objCollider, xpos, ypos, animx, animy, player, active) => {
    obj = context.physics.add.sprite(xpos, ypos, 'snowman');
    context.physics.add.collider(obj, objCollider);
    animateSnowman(obj, context, animx, animy)
    checkCollision(context, player, obj, active)
}