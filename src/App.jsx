import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import addIcon from './assets/add.png'

const LOCAL_STORAGE_KEY = 'todoApp=todos'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  function handleAddTodo() {
    if (input.trim() === '') return

    setTodos(prev => [
      ...prev,
      { id: uuidv4(), name: input, complete: false }
    ])

    setInput('')
  }

  function handleClearTodos() {
    setTodos(prev => prev.filter(todo => !todo.complete))
  }

  return (
    <div className="container">
      <h2>Todo App</h2>

      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add today's task..."
        />
        <button onClick={handleAddTodo} className="add-btn">
          <img src={addIcon} alt="add" />
        </button>
      </div>

      <TodoList  todos={todos}   toggleTodo={toggleTodo}  deleteTodo={deleteTodo} />

      <p>{todos.filter(t => !t.complete).length} tasks left</p>

      <button onClick={handleClearTodos}>
        Clear Completed
      </button>
    </div>
  )
}

export default App