import e from 'cors'
import React, {useState} from 'react'

function InputTodo({setCallback, callback}) {
  const [description, setDescription] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault()
    const baseURL = "http://localhost:5000"
    try{
      const body = { description }
      const response = await fetch(`${baseURL}/createtodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setCallback(!callback)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      InputTodo
      <form className="d-flex mt-5" onSubmit={e => submitHandler(e)}>
        <input className="form-controller w-100 px-2" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <button className="btn btn-success mr-5">Add</button>
      </form>  
    </div>
  )
}

export default InputTodo