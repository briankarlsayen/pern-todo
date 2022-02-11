import React,{ Fragment, useState } from 'react'

function EditTodo({todo, callback, setCallback}) {
  const [editDescription, setEditDescription] = useState(todo.description)
  const baseURL = "http://localhost:5000"

  const updateDescription = async() => {
    const body = {description: editDescription}
    console.log(body)
    try {
      const updatedTodo = await fetch(`${baseURL}/updatetodo/${todo.todo_id}`,{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      })
      console.log(updatedTodo)
      setCallback(!callback)
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
        Edit
      </button>

      <div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit description</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <input type="text" className='form-control' value={editDescription} 
                onChange={(e)=>setEditDescription(e.target.value)} 
                />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateDescription}>Save Edit</button>
              <button id="cancel-btn" type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditTodo