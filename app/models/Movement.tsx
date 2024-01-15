import VideoTutorial from "./VideoTutorial";

class Movement {
    id?: string;
    name: string;
    difficulty: string;
    videoTutorial: VideoTutorial;

    constructor(id?: string, name?: string, difficulty?: string, videoTutorial?: VideoTutorial) {
      this.id = id;
      this.name = name;
      this.difficulty = difficulty;
      this.videoTutorial = videoTutorial;
    }
  }
  
  export default Movement;