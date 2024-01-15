class VideoTutorial {
    id?: string;
    name: string;
    path: string;

    constructor(id?: string, name?: string, path?: string) {
      this.id = id;
      this.name = name;
      this.path = path;
    }
  }
  
  export default VideoTutorial;