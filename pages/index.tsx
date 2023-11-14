import type { NextPage } from "next";
import { useEffect, useState } from "react";
import TaskForm from "../components/TakForm";
import dynamic from "next/dynamic";
import { TaskData, TaskItem } from "../types/items";
import DraggableList from "../components/DraggableList";
import SearchBar from "../components/SearchBar";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

const Home: NextPage = () => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const [itemsTodo, setItemsTodo] = useState<Array<TaskItem>>([
    {
      id: "1",
      name: "Name 1",
      description: "This is a description 1 of name 1",
      date: "2023-11-12",
    },
    {
      id: "2",
      name: "Name 2",
      description: "This is a description 2 of name 2",
    },
    {
      id: "3",
      name: "Name 3",
      description: "This is a description 3 of name 3",
    },
  ]);
  const [filteredTodoItems, setFilteredTodoItems] = useState<
    Array<TaskItem> | undefined
  >();

  const [itemsInProgress, setItemsInProgress] = useState<Array<TaskItem>>([
    {
      id: "4",
      name: "Name 4",
      description: "This is a description 4 of name 4",
    },
    {
      id: "6",
      name: "Name 6",
      description: "This is a description 6 of name 6",
    },
  ]);
  const [filteredInProgress, setFilteredInProgress] = useState();

  const [itemsCompleted, setItemsCompleted] = useState<Array<TaskItem>>([
    {
      id: "5",
      name: "Name 5",
      description: "This is the descriptipon 5 of name 5",
    },
  ]);
  const [filteredItemsCompleted, setFilteredItemsCompleted] = useState();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      console.log("enable again", itemsTodo);
      filterOnSearch(searchValue);
    }
  }, [itemsTodo, itemsInProgress, itemsCompleted]);

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    console.log("src droppableId", source?.droppableId);
    console.log("destination droppableId", destination?.droppableId);
    console.log("src index", source?.index);
    console.log("destination droppableId", destination?.index);

    // If the card was dropped outside of a droppable area
    if (!destination) {
      console.log("case 1");
      return;
    }

    // If the card was dropped in the same column
    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      console.log("cl todo", source.droppableId);
      if (source.droppableId === "todo") {
        const item = itemsTodo[source.index];
        // console.log(item);
        itemsTodo.splice(source.index, 1);
        // console.log(itemsTodo);
        itemsTodo.splice(destination.index, 0, item);
        // console.log(itemsTodo);
        setItemsTodo([...itemsTodo]);
      } else if (source.droppableId === "inProgress") {
        const item = itemsInProgress[source.index];
        itemsInProgress.splice(source.index, 1);
        itemsInProgress.splice(destination.index, 0, item);
        setItemsInProgress([...itemsInProgress]);
      } else if (source.droppableId === "completed") {
        const item = itemsCompleted[source.index];
        itemsCompleted.splice(source.index, 1);
        itemsCompleted.splice(destination.index, 0, item);
        setItemsInProgress([...itemsCompleted]);
      }
      return;
    }

    // Select the appropriate source and destination columns based on droppableIds
    let sourceColumn: Array<any> = [];
    let destinationColumn: Array<any> = [];

    if (source.droppableId === "todo") {
      console.log("case 3");
      sourceColumn = [...itemsTodo];
    } else if (source.droppableId === "inProgress") {
      console.log("case 4");
      sourceColumn = [...itemsInProgress];
    } else if (source.droppableId === "completed") {
      console.log("case 5");
      sourceColumn = [...itemsCompleted];
    }

    if (destination.droppableId === "todo") {
      console.log("case 6");
      destinationColumn = [...itemsTodo];
    } else if (destination.droppableId === "inProgress") {
      console.log("case 7");
      destinationColumn = [...itemsInProgress];
    } else if (destination.droppableId === "completed") {
      console.log("case 8");
      destinationColumn = [...itemsCompleted];
    }

    // Remove the card from the source column
    const [removed] = sourceColumn.splice(source.index, 1);
    console.log("removed", removed);
    // Add item to destination column
    destinationColumn.splice(destination.index, 0, removed);

    console.log("Up source", sourceColumn);
    console.log("up destination", destinationColumn);

    // Update source data
    if (source.droppableId === "todo") {
      setItemsTodo([...sourceColumn]);
    } else if (source.droppableId === "inProgress") {
      setItemsInProgress([...sourceColumn]);
    } else if (source.droppableId === "completed") {
      setItemsCompleted([...sourceColumn]);
    }

    console.log("Up destination", destinationColumn);
    // Update destination column
    if (destination.droppableId === "todo") {
      setItemsTodo([...destinationColumn]);
    } else if (destination.droppableId === "inProgress") {
      setItemsInProgress([...destinationColumn]);
    } else if (destination.droppableId === "completed") {
      setItemsCompleted([...destinationColumn]);
    }
  };

  const onAddTask = (data: TaskData) => {
    console.log(data);
    const newTask: TaskItem = {
      id: (
        itemsTodo.length +
        itemsInProgress.length +
        itemsCompleted.length +
        1
      ).toString(),
      ...data,
    };
    setItemsTodo([newTask, ...itemsTodo]);
  };

  const onCacelForm = () => {
    setDisplayForm(false);
  };

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (!value) {
      setFilteredTodoItems(undefined);
      setFilteredInProgress(undefined);
      setFilteredItemsCompleted(undefined);
      return;
    }
    filterOnSearch(value);
  };

  const filterOnSearch = (value: string) => {
    console.log(value, value.toLocaleLowerCase());
    const todoFilter = itemsTodo.filter((el) =>
      el.name.toLowerCase().includes(value.toLocaleLowerCase())
    );
    console.log("filtered to do ", todoFilter);
    setFilteredTodoItems(todoFilter);

    console.log(itemsInProgress);
    const inProgressFilter: any = itemsInProgress.filter((el) =>
      el.name.toLowerCase().includes(value.toLocaleLowerCase())
    );
    console.log("in progress to do ", inProgressFilter);
    setFilteredInProgress(inProgressFilter);

    const completedFilter: any = itemsCompleted.filter((el) =>
      el.name.toLowerCase().includes(value.toLocaleLowerCase())
    );
    console.log("completed filter to do ", completedFilter);
    setFilteredItemsCompleted(completedFilter);
  };

  const onDelete = (item: any, index: number, status: string) => {
    console.log(item);
    if (status === "TODO") {
      itemsTodo.splice(index, 1);
      setItemsTodo([...itemsTodo]);
    } else if (status === "IN_PROGRESS") {
      itemsInProgress.splice(index, 1);
      setItemsInProgress([...itemsInProgress]);
    } else if (status === "COMPLETED") {
      itemsCompleted.splice(index, 1);
      setItemsCompleted([...itemsCompleted]);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-5">
        {!displayForm && (
          <button
            onClick={() => setDisplayForm(true)}
            className="bg-blue-500 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        )}
        {displayForm && (
          <TaskForm onAddTask={onAddTask} onCacelForm={onCacelForm} />
        )}
      </div>

      <div className="flex justify-center">
        <SearchBar onSearchInput={onSearchInput} />
      </div>

      <div className="flex justify-center mt-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div>
            <DraggableList
              label="To do"
              onDelete={onDelete}
              items={filteredTodoItems || itemsTodo}
              id={"todo"}
              staus={"TODO"}
            />
          </div>

          <div>
            <DraggableList
              label="In progress"
              onDelete={onDelete}
              items={filteredInProgress || itemsInProgress}
              id={"inProgress"}
              staus={"IN_PROGRESS"}
            />
          </div>

          <div>
            <DraggableList
              label="Completed"
              onDelete={onDelete}
              items={filteredItemsCompleted || itemsCompleted}
              id={"completed"}
              staus={"COMPLETED"}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
