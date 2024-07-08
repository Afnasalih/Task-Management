import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';

const priorityOrder = {
    'High': 1,
    'Medium': 2,
    'Low': 3,
  };

const Column = ({ column, tasks, onTaskUpdate, onDelete,initial }) => {

    const sortedTasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task-wrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} onSave={onTaskUpdate} onDelete={onDelete}/>
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

export default Column;

