export const createAnimations = (context) => {
  context.anims.create({
    key: "right",
    frames: context.anims.generateFrameNumbers("guy", { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  context.anims.create({
    key: "left",
    frames: context.anims.generateFrameNumbers("guy", { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  context.anims.create({
    key: "idle",
    frames: context.anims.generateFrameNumbers("guy", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  context.anims.create({
    key: "jump",
    frames: context.anims.generateFrameNumbers("guy", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  context.anims.create({
    key: "playbutton",
    frames: context.anims.generateFrameNumbers("play", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  context.anims.create({
    key: "snowmanAlert",
    frames: context.anims.generateFrameNumbers("snowman", { start: 0, end: 3 }),
    frameRate: 4,
    repeat: -1
  });
};
