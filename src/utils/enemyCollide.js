
export const checkCollision = (context, player, obj, active, objType = null) => {
    context.physics.add.overlap(player, obj, () => {
        context.add.text(player.x, 50, 'Game Over!', { fontFamily: 'Arial', fontSize: 36, color: '#000000' });
        player.setTint(0xab1f08)
        context.physics.pause();
        active = false;
        context.anims.pauseAll();
        if(objType == null) {
            obj.move.stop();
        }
        setTimeout(() => { 
          context.scene.stop(context.levelKey);
          context.scene.start('GameOver');
         }, 1500);
        
    });
}