import { TimeOutline, TrashBinOutline, OpenOutline, CheckmarkDoneOutline, CloseCircleOutline } from "react-ionicons";
import { TaskT } from "../../types/index";
import { useEffect, useState } from "react";

interface TaskProps {
  task: TaskT;
  provided: any;
  columns: any;
  setColumns: (value: any) => void; 
}

const Task = ({ task, provided, columns, setColumns }: TaskProps) => {
  const { title, description, priority, deadline, image, alt, tags } = task;

  const deleteTask = (taskId: string) => {
    const updatedColumns = { ...columns };
    for (let key in updatedColumns) {
      if (updatedColumns[key].items) {
        updatedColumns[key].items = updatedColumns[key].items.filter(
          (item: any) => item.id !== taskId
        );
      }
    }
    console.log("Updated columns:", updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    setColumns(updatedColumns);
  };

  useEffect(() => {
    const storedColumns = localStorage.getItem("columns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    } else {
      localStorage.setItem("columns", JSON.stringify(columns));
    }
  }, []);
  const [editedTitle, setEditedTitle] = useState(task.title);
const [editedDescription, setEditedDescription] = useState(task.description);


  const editTask = () => {
    setEditing(true);
  };
  const [editing, setEditing] = useState(false); 

  const saveChanges = () => {
    const updatedColumns = { ...columns };
    for (let key in updatedColumns) {
      if (updatedColumns[key].items) {
        updatedColumns[key].items = updatedColumns[key].items.map((item: any) => {
          if (item.id === task.id) {
            return {
              ...item,
              title: editedTitle, 
              description: editedDescription, 
            };
          }
          return item;
        });
      }
    }
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    setColumns(updatedColumns);
    setEditing(false);
  };

const cancelEditing = () => {
    setEditing(false);
    setEditedTitle(title); 
    setEditedDescription(description); 
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#5087a3d3] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {image && alt && (
        <img src={image} alt={alt} className="w-full h-[170px] rounded-lg" />
      )}
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag.title}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        {editing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-[15.5px] font-medium mb-2 w-full text-[#333] border border-gray-500 outline-none rounded-lg p-1"
              placeholder="Edit Title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-[13.5px] text-[#333] h-[60px] w-full border border-gray-400 rounded-md p-2 resize-none outline-none"
              placeholder="Edit Description"
            />
          </>
        ) : (
          <>
            <span className="text-[15.5px] font-medium text-[#fff]">{title}</span>
            <span className="text-[13.5px] text-gray-300">{description}</span>
          </>
        )}
      </div>

      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#ddd"} width="19px" height="19px" />
          <span className="text-[13px] text-gray-300 mt-1">{deadline} mins</span>
        </div>
        <div className="flex justify-between w-28">
          <div className="w-[40px] pt-[3px]  rounded-full bg-[#9a7c49] border border-[#66666670] flex items-center justify-center text-white">
            {priority === "low" ? "P0" : priority === "medium" ? "P1" : "P2"}
          </div>
          <div className="flex justify-between w-14">
            {editing ? (
              <div className="flex gap-1">
                <button
                  className="rounded-md bg-green-400 text-white px-1 py-1 text-[12px] font-medium"
                  onClick={saveChanges}
                >
                 <CheckmarkDoneOutline
                    color={'#000000'} 
                    height="20px"
                    width="20px"
/>
                </button>
                <button
                  className="rounded-md bg-red-400 text-white px-1 py-1 text-[12px] font-medium"
                  onClick={cancelEditing}
                >
                 <CloseCircleOutline
                    color={'#000000'}
                    height="20px"
                    width="20px"
/>
                </button>
              </div>
            ) :(
            <div className=" rounded-md h-[30px] w-[50px] cursor-default flex items-center justify-center">
              <div className="flex items-center justify-center ">
              <div className="hover:bg-[#719291] rounded-md h-[30px] w-[30px] cursor-default flex items-center justify-center "
               onClick={editTask}

              ><OpenOutline
                  color={'#ffffff'}
                  height="20px"
                  width="20px"
                />
                </div>
              <div
                className="hover:bg-red-400 rounded-md h-[30px] w-[30px] cursor-default flex items-center justify-center"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                <TrashBinOutline color={"#ffffff"} height="20px" width="20px" />
              </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

