import dynamic from "next/dynamic";
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
import KanbanCard from "./KanbanCard";

const DraggableList = ({ onDelete, label, items, id, staus }: any) => {
  const getItemStyle = (isDragging: boolean, draggableStyle: any): any => ({
    userSelect: "none",
    margin: `0 0 ${8}px 0`,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean): { [key: string]: any } => ({
    padding: 8,
    width: 280,
    minHeight: "600px",
    float: "left",
    marginRight: 30,
  });

  return (
    <div>
      <div className="w-40 ml-16 bg-green-300 mb-1 text-gray-700 text-center font-bold py-1">
        {label}
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item: any, index: any) => (
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
                      status={staus}
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
  );
};

export default DraggableList;
