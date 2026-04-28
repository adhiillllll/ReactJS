import React from 'react'
import binIcon from "../assets/bin.png"  


export default function Todo({ todo, toggleTodo, deleteTodo }) {

  return (
    <div className="todo-item">
        <label>
         <input  type="checkbox"  checked={todo.complete}
          onChange={() => toggleTodo(todo.id)}/>
        {todo.name}
        </label>

        <button onClick={() => deleteTodo(todo.id)}>
         <img src={binIcon} alt="delete"  className="delete-icon" />
         </button>
    </div>
    )
}
 