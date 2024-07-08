import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState(null); // Default to null to require user input
  const [errors, setErrors] = useState({});

  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      dueDate,
    };
    onSave(newTask);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Task</h2>
        <label>Title:</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <div className='des'>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        </div>
        
        <div className='pri'>
        <label>Priority:</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div>
        {errors.priority && <span className="error">{errors.priority}</span>}
        </div>
        </div>
        
          
          <div className='due'>
          <div>Due Date:</div>
        <DatePicker selected={dueDate} onChange={date => setDueDate(date)} />
          <div>{errors.dueDate && <span className="error">{errors.dueDate}</span>}</div>
        
          </div>
       

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

