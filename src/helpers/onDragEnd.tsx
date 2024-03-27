
export const onDragEnd = (result: any, columns: any, setColumns: any) => {
	if (!result.destination) return;

	const { source, destination } = result;	
    const updatedColumns = { ...columns };

 // Perform the drag and drop operation
 if (source.droppableId === destination.droppableId) {
	const column = updatedColumns[source.droppableId];
	const copiedItems = [...column.items];
	const [removed] = copiedItems.splice(source.index, 1);
	copiedItems.splice(destination.index, 0, removed);

	updatedColumns[source.droppableId] = { ...column, items: copiedItems };
} else {
	const sourceColumn = updatedColumns[source.droppableId];
	const destColumn = updatedColumns[destination.droppableId];
	const sourceItems = [...sourceColumn.items];
	const destItems = [...destColumn.items];
	const [removed] = sourceItems.splice(source.index, 1);
	destItems.splice(destination.index, 0, removed);

	updatedColumns[source.droppableId] = { ...sourceColumn, items: sourceItems };
	updatedColumns[destination.droppableId] = { ...destColumn, items: destItems };
}

// Update state and save data to local storage
setColumns(updatedColumns);
localStorage.setItem("columns", JSON.stringify(updatedColumns));
};

  
    
