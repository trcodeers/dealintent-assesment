import type { NextPage } from "next";
import { useState } from "react";
import TaskForm from "../components/TakForm";
import KanbanCard from "../components/KanbanCard";
import dynamic from "next/dynamic";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

const Home: NextPage = () => {
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const [itemsTodo, setItemsTodo] = useState<Array<any>>([
    {
      id: "1",
      name: "Name 1",
      description: "This is a description 1 of name 1",
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
  const [filteredTodoItems, setFilteredTodoItems] = useState<Array<any> | undefined>()

  const [itemsInProgress, setItemsInProgress] = useState<Array<any>>([
    {
      id: "4",
      name: "Name 4",
      description: "This is a description 4 of name 4",
    },
  ]);
  const [filteredInProgress, setFilteredInProgress] = useState()

  const [itemsCompleted, setItemsCompleted] = useState<Array<any>>([
    {
      id: "5",
      name: "Name 5",
      description: "This is the descriptipon 5 of name 5",
    },
  ]);
  const [filteredItemsCompleted, setFilteredItemsCompleted] = useState()


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
        console.log(item);
        itemsTodo.splice(source.index, 1);
        console.log(itemsTodo);
        itemsTodo.splice(destination.index, 0, item);
        console.log(itemsTodo);
        setItemsTodo([...itemsTodo]);
      } else {
        const item = itemsInProgress[source.index];
        itemsInProgress.splice(source.index, 1);
        itemsInProgress[source.index] = item;
        setItemsInProgress([...itemsInProgress]);
      }
      return;
    }

    // Select the appropriate source and destination columns based on droppableIds
    let sourceColumn: Array<any> = [],
      destinationColumn: Array<any> = [];

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

  const getItemStyle = (isDragging: any, draggableStyle: any): any => ({
    userSelect: "none",
    margin: `0 0 ${8}px 0`,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: any): any => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 280,
    minHeight: "600px",
    float: "left",
    marginRight: 30,
  });

  const onAddTask = (data: any) => {
    console.log(data);
    const newTask = {
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

  const onSearchInput = (e: any) => {
    const { value } = e.target;
    if(!value){
      setFilteredTodoItems(undefined)
      setFilteredInProgress(undefined)
      setFilteredItemsCompleted(undefined)
      return
    }
    
    const todoFilter = itemsTodo.filter((el) => el.name.toLowerCase().includes(value))
    setFilteredTodoItems(todoFilter)

    const inProgressFilter: any = itemsInProgress.filter((el) => el.name.toLowerCase().includes(value))
    setFilteredInProgress(inProgressFilter)

    const completedFilter: any = itemsCompleted.filter((el) => el.name.toLowerCase().includes(value))
    setFilteredItemsCompleted(completedFilter)
 
  };

  const onDelete = (item: any, index: number, status: string) => {
    console.log(item);
    if(status === 'TODO'){
      itemsTodo.splice(index, 1)
      setItemsTodo([ ...itemsTodo ])
    }
    else if('IN_PROGRESS'){
      itemsInProgress.splice(index, 1)
      setItemsInProgress([ ...itemsInProgress ])
    }
    else if('COMPLETED'){
      itemsCompleted.splice(index, 1)
      setItemsCompleted([ ...itemsCompleted ])
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          className="border rounded-md mt-4 py-2 px-4 outline-none focus:border-blue-500"
          type="text"
          placeholder="Search by name"
          onChange={onSearchInput}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          
          <div>
            <div className="bg-pink-50 50px text-black text-center font-bold py-1">
              To do
            </div>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {(filteredTodoItems || itemsTodo).map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <KanbanCard
                            item={item}
                            onDelete={onDelete}
                            index={index}
                            status={'TODO'}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <div>In Progress</div>
            <Droppable droppableId="inProgress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {(filteredInProgress || itemsInProgress).map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <KanbanCard
                            item={item}
                            onDelete={onDelete}
                            index={index}
                            status={'IN_PROGRESS'}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <div>Completed</div>
            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {(filteredItemsCompleted || itemsCompleted).map((item: any, index: number) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <KanbanCard
                            item={item}
                            onDelete={onDelete}
                            index={index}
                            status={'COMPLETED'}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
