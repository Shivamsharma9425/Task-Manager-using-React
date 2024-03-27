/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../../data/board";
import { Columns } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

const Home = () => {
	const [columns, setColumns] = useState<Columns>(Board);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");

	const openModal = (columnId: any) => {
		setSelectedColumn(columnId);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleAddTask = (taskData: any) => {
		const newBoard: any = { ...columns };
		newBoard[selectedColumn].items.push(taskData);
		localStorage.setItem("columns", JSON.stringify(columns));
	};

	

	return (
		<>
			<DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
				<div className="border-2 border-gray-700 rounded-lg grid w-full justify-center px-5 pb-8 mb-4 pr-3 md:gap-8 grid-cols-1 sm:grid-cols-2 llg:grid-cols-3 xxl:grid-cols-4 lxl:grid-cols-5 gap-5  overflow-x-auto sm:place-content-between">
					{Object.entries(columns).map(([columnId, column]: any) => (
						<div
							className="w-full flex flex-col gap-0"
							key={columnId}
						>
							<Droppable
								droppableId={columnId}
								key={columnId}
							>
								{(provided: any) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
									>
										<div className="flex items-center justify-center py-[10px] w-full bg-[#4b69d4] rounded-lg shadow-sm text-[#fff] font-medium text-[18px]">
											{column.name}
										</div>
										{column.items.map((task: any, index: any) => (
											<Draggable
												key={task.id.toString()}
												draggableId={task.id.toString()}
												index={index}
											>
												{(provided: any) => (
													<>
														<Task
															provided={provided}
															task={task}
															columns={columns}
															setColumns={setColumns}
															
														/>
													</>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div
								onClick={() => openModal(columnId)}
								className="flex cursor-pointer items-center justify-center gap-1 py-[10px] opacity-90 bg-[#47b5e8] rounded-lg shadow-sm text-[#fff] font-medium text-[15px] md:w-[290px] w-[250px]"
							>
								<AddOutline color={"#fff"} width={"30px"}
					height={"30px"} />
								Add Task
							</div>
						</div>
					))}
				</div>
			</DragDropContext>

			<AddModal
				isOpen={modalOpen}
				onClose={closeModal}
				setOpen={setModalOpen}
				handleAddTask={handleAddTask}
			/>
		</>
	);
};



export default Home;