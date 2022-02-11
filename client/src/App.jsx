import React, {useState} from 'react'
import './App.css'
import ShowTodo from './components/ShowTodo'
import InputTodo from './components/InputTodo'

function App() {
  const [callback, setCallback] = useState(false)
  return (
    <div className="container text-center">
      <h2>TodoList</h2>
      <InputTodo setCallback={setCallback} callback={callback} />
      <ShowTodo setCallback={setCallback} callback={callback} />
    </div>
  )
}

export default App
