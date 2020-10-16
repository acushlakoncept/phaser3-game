import { Level } from "./levelScene";

export class Level4 extends Level {
  constructor() {
    super("Level4");
    this.heights = [4, null, 3, 6, null, 6, null, 5, 4];
    this.weather = "morning";
  }
}
