import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/Column';
import Modal from '../components/Modal';
import './Todo.css'; 

const initialTasks = {
  'task-1':
  { 
  id: 'task-1',
  title: 'Header Task', 
  description: 'This is the first task', 
  priority: 'Low', dueDate: new Date() 
},
  'task-2': 
  { id: 'task-2',
    title: 'Footer task',
    description: 'This is the second task', 
    priority: 'Medium', dueDate: new Date() 
  },
  'task-3': { id: 'task-3', title: 'Hero  task', description: 'This is the third task', priority: 'High', dueDate: new Date() },
  'task-4': { id: 'task-4', title: 'Home task', description: 'This is the fourth task', priority: 'Low', dueDate: new Date() }
};

const initialColumns = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task-1', 'task-2']
  },
  'onprogress': {
    id: 'onprogress',
    title: 'On Progress',
    taskIds: ['task-2']
  },
  'inreview': {
    id: 'inreview',
    title: 'In Review',
    taskIds: ['task-2','task-1']
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: ['task-3', 'task-4']
  }
};

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [taskCounter, setTaskCounter] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const addTask = (newTask) => {
    const newTaskId = `task-${taskCounter}`;
    const task = { id: newTaskId, ...newTask };
    setTasks({ ...tasks, [newTaskId]: task });
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        taskIds: [...columns.todo.taskIds, newTaskId],
      },
    });
    setTaskCounter(taskCounter + 1);
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
  
    // Remove the task from all columns
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(id => id !== taskId);
    });
  
    setTasks(updatedTasks);
    setColumns(updatedColumns);
  };

  const updateTask = (updatedTask) => {
    setTasks({
      ...tasks,
      [updatedTask.id]: updatedTask,
    });
  };

  

  return (
    <>
    <button className='ab' onClick={() => setIsModalOpen(true)}>Add Task</button>
    <div className={`board ${isModalOpen ? 'blur' : ''}`}>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {Object.keys(columns).map(columnId => {
            const column = columns[columnId];
            const tasksArray = column.taskIds.map(taskId => tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasksArray} onTaskUpdate={updateTask} onDelete={deleteTask} initial={initialColumns}/>;
          })}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTask} />
      </DragDropContext>
      
    </div>
    </>
    
  );
};

export default Board;
