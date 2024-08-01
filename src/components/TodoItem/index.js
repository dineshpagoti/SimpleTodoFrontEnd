import React from 'react';
import './index.css'; // Ensure this is the path to your CSS file

const TodoItem = (props) => {
  const {
    todoItem,
    deleteTodo,
    editTodo,
    saveTodo,
    editingTodoId,
    editedTodoTitle,
    onChangeEditedTodoTitle,
  } = props;

  const isEditing = todoItem.id === editingTodoId;

  return (
    <li className="list-container">
      {isEditing ? (
        <div className="todo-container">
          <input
            type="text"
            className="input-element1"
            value={editedTodoTitle}
            onChange={onChangeEditedTodoTitle}
          />
          <button
            type="button"
            className="button"
            onClick={saveTodo}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="todo-container">
          <span className="title">{todoItem.description}</span>
          <button
            type="button"
            className="button1"
            onClick={() => editTodo(todoItem.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="button1"
            onClick={() => deleteTodo(todoItem.id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
