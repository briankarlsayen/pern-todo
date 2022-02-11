import React, {useEffect, useState} from 'react'
import EditTodo from './EditTodo'
function ShowTodo({callback, setCallback}) {
  const [todo, setTodos] = useState([])
  
  const baseURL = "http://localhost:5000"

  const getTodos = async() => {
    const datas = await fetch(`${baseURL}/displaytodos`)
    const jsonData = await datas.json()
    setTodos(jsonData.result)
  }

  const deleteTodo = async(id) => {
    const deleted = await fetch(`${baseURL}/deletetodo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(deleted)
    setCallback(!callback)
  }

  useEffect(() => {
    getTodos() 
  }, [callback])

  
  return (
    <div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            todo && todo.map((item) => {
              return(
                <tr key={item.todo_id}>
                  <td>{item.description ? item.description : "null"}</td>
                  <td><EditTodo todo={item} callback={callback} setCallback={setCallback}/></td>
                  <td><button className='btn btn-danger' onClick={() => deleteTodo(item.todo_id)}>Delete</button></td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </div>
  )
}

export default ShowTodo