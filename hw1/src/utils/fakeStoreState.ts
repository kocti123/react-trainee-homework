import { State } from "../types";

export function getFakeStoreState(): State {
  return {
    tasks: {
      isLoaded: true,
      lastId: 1,
      currentFilter: "all",
      tasks: [
        {
          id: 1,
          body: "test",
          completed: false,
          favourite: false,
          isEdit: false,
          newBody: "",
          creationDate: new Date(1635696113017),
        },
      ],
      filtredTasks: [
        {
          id: 1,
          body: "test",
          completed: false,
          favourite: false,
          isEdit: false,
          newBody: "",
          creationDate: new Date(1635696113017),
        },
      ],
    },
  };
}
