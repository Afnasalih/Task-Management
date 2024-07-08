import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CLK from '../asset/clock.png'

const Task = ({ task, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setEditedTask({
      ...editedTask,
      dueDate: date,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const getBackgroundColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#f443366a';
      case 'Medium':
        return 'hsla(36, 100%, 50%, 0.482)';
      case 'Low':
        return 'rgba(85, 170, 88, 0.589)';
      default:
        return 'white';
    }
  };

  return (
    <div className="task">
      {!isEditing ? (
        <>
        <div>
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className='tcm' style={{ backgroundColor: getBackgroundColor(task.priority) }}>
              Priority: {task.priority}
            </div>
            <div className='kk'>
              <div className='bla'>
                <img src={CLK} alt=''className='bc'/>
                 </div>
             <div className='dat'>{task.dueDate.toLocaleDateString()}</div> </div>
          </div>
          <div className='bmc'>
          <button onClick={handleEdit} className='btne'>Edit</button>
          <button onClick={handleDelete} className='btnd'>Delete</button>
          </div>
          
        </div>
          
        </>
      ) : (
        <div className="task-editing">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <label>Priority:</label>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Due Date:</label>
          <DatePicker
            selected={editedTask.dueDate}
            onChange={handleDateChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Task;
