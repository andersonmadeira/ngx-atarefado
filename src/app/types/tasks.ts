export class Task {
  id: string;
  name: string;
  done: boolean;
}

export class Board {
  id: string;
  name: string;
  tasks: Task[] = [];
}
