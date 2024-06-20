import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import Checkbox from './Checkbox';
import './TaskList.scss';


function TaskList({ id,title, done,completed, onToggle, onEdit, remove }) {
  const [editMode, setEditMode] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEllipsisClick = () => {
    setShowButtons(!showButtons);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowButtons(false);
  };

  const handleDeleteClick = () => {
    remove(id);
  };

  const handleSaveClick = () => {
    onEdit(editedTitle);
    setEditMode(false);
  };

  return (
    <div className={'task' + (completed ? ' done' : '')}>
        {!editMode && (
            <>
      <Checkbox checked={completed} onClick={() => onToggle(!completed)} />
      
        <div className="task-name" onClick={() => setEditMode(prev => !prev)}>
         {/* <div className="task-name">  */}
          <span>{title}</span>
          
        </div>
        </>
      )}
      {editMode && (
        <form className='edit-add-task ' onSubmit={e => { e.preventDefault(); handleSaveClick(); }}>
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)} 
          />
          <button type="button" onClick={handleSaveClick} className="save-button">Save</button>
        </form>
      )}
      {!editMode && (
       <div className="icon-button-container">
       <button className="icon-button" onClick={handleEllipsisClick}>
         <FaEllipsisH />
       </button>
       {showButtons && (
         <div className='show-button'>
           <div className='edit-delete-buttons'>
             <button className="edit-button" onClick={handleEditClick}>Edit</button>
             <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
           </div>
         </div>
       )}
     </div>
   )}
 </div>
);
}

export default TaskList;
