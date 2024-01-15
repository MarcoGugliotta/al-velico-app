import Level from "./Level";

class Career {
    id?: string;
    name: string;
    actived: boolean;
    levels: Level[];
    percentageCompletion: number;
    startDate: Date;
    lastUpdate: Date;

    constructor(
        id?: string, 
        name?: string, 
        actived?: boolean,
        levels?: Level[],
        percentageCompletion?: number,
        startDate?: Date, 
        lastUpdate?: Date) {
      this.id = id;
      this.name = name;
      this.actived = actived;
      this.levels = levels;
      this.percentageCompletion = this.percentageCompletion;
      this.startDate = startDate;
      this.lastUpdate = lastUpdate;
    }
  }
  
  export default Career;