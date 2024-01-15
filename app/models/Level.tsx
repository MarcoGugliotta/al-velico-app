import Movement from "./Movement";

class Level {
    id?: string;
    name: string;
    movements: Movement[];

    constructor(id?: string, name?: string, movements?: Movement[]) {
      this.id = id;
      this.name = name;
      this.movements = movements;
    }
  }
  
  export default Level;